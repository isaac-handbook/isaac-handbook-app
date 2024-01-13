import { Camera, Canvas, View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';
import { imagePHash } from './utils/phash';
import { useAsyncEffect, useDebounceFn } from 'ahooks';
import { Range } from '@nutui/nutui-react-taro';
import hashDic from './data/hashDic.json';
import { ResultList } from './components/ResultList';
import { requestCameraPermission } from './utils/permission';
import { Loading } from './components/Loading';
import { sleep } from '@utils/sleep';
import { resizeFrameImage } from './utils/resizeFrameImage';
import { hammingDistance } from './utils/hamming';
import { cosineSimilarity } from './utils/cosine';
import { saveImgByFailPath } from '@utils/img/saveImg';
// import { saveImgByFailPath } from '@utils/img/saveImg';

// 间隔时长，单位：毫秒
const INTERVAL = 500;
// 生成多少个结果（6、12、18）
const RESULT_COUNT = 18;

function Scan() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const [canScan, setCanScan] = useState(false);
  const cameraRef = useRef<any>();

  const [scale, setScale] = useState(60);
  const scaleRef = useRef(scale);

  const [tmpImgPath, setTmpImgPath] = useState('');
  // 最终计算结果前 RESULT_COUNT 个
  const [otpItems, setOtpItems] = useState<[string, number][]>([]);

  const hide = useRef(false);

  useDidHide(() => {
    hide.current = true;
  });

  useDidShow(() => {
    hide.current = false;
    startCapturing();
  });

  // 更新 scaleRef
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  // 通过当前图片的 hash 计算与所有道具的汉明距离，得出结果
  const handleHashedImg = (
    resList: Awaited<ReturnType<typeof imagePHash>>[],
  ) => {
    if (hide.current) return;
    if (!resList.length) return;
    const res: [string, number][] = [];
    for (let i = 0; i < resList.length; i++) {
      const { phash: curPHash, colorFin: curColorFin } = resList[i];

      const pHashHammingOtp: Record<string, number> = {};
      const colorCosineOtp: Record<string, number> = {};

      // 计算与所有道具的相似度
      Object.keys(hashDic).forEach((itemId) => {
        for (let ihash = 0; ihash < hashDic[itemId].phash.length; ihash++) {
          // 汉明距离 计算 感知哈希
          const distance = hammingDistance(
            curPHash,
            BigInt(hashDic[itemId].phash[ihash]),
          );
          if (pHashHammingOtp[itemId]) {
            // 汉明距离越小越相似
            if (distance < pHashHammingOtp[itemId]) {
              pHashHammingOtp[itemId] = distance;
            }
          } else {
            pHashHammingOtp[itemId] = distance;
          }
          // 余弦相似度 计算 颜色分布
          const cosine = cosineSimilarity(
            curColorFin,
            hashDic[itemId].color[ihash],
          );
          if (colorCosineOtp[itemId]) {
            // 余弦值越大越相似
            if (cosine > colorCosineOtp[itemId]) {
              colorCosineOtp[itemId] = cosine;
            }
          } else {
            colorCosineOtp[itemId] = cosine;
          }
        }
      });
      const mergedArr: [string, number][] = [];
      Object.entries(pHashHammingOtp).forEach((item) => {
        const [itemId, hummimgValue] = item;
        mergedArr.push([itemId, hummimgValue * (1 - colorCosineOtp[itemId])]);
      });
      res.push(...mergedArr);
      // res.push(...Object.entries(colorCosineOtp));
      // res.push(...Object.entries(pHashHammingOtp));
    }
    // 计算 res 中综合最小的 RESULT_COUNT 个值
    const resMap = new Map<string, number>();
    res.forEach((item) => {
      const [itemId, value] = item;
      if (resMap.has(itemId)) {
        if (value < resMap.get(itemId)!) {
          resMap.set(itemId, value);
        }
      } else {
        resMap.set(itemId, value);
      }
    });
    const resArr2 = Array.from(resMap.entries());
    resArr2.sort((a, b) => a[1] - b[1]);
    console.log('resArr2', resArr2);
    const otpItems = resArr2.slice(0, RESULT_COUNT);
    // console.log('综合计算结果', otpItems);
    setOtpItems(otpItems);
    // 进下一轮
    startCapturing();
  };

  useEffect(() => {
    // 校验权限, 必须开启摄像头权限
    Taro.getSetting({
      success: async (res) => {
        if (!res.authSetting['scope.camera']) {
          // 权限封装
          requestCameraPermission();
        } else {
          setCanScan(true);
        }
      },
    });
  }, []);

  // 走一轮相机帧数据捕捉
  const { run: startCapturing } = useDebounceFn(
    async () => {
      if (hide.current) return;
      const context = Taro.createCameraContext();
      if (!context.onCameraFrame) {
        Taro.showToast({
          title: '您的微信版本过低，无法使用本功能',
          icon: 'none',
          duration: 5000,
        });
        return;
      }
      cameraRef.current = context.onCameraFrame(async function (res) {
        stopCapturing();
        // onCameraFrame 获取的是未经过编码的原始 RGBA 格式的图像数据，接下来转为图片
        handleFrameImage(res);
      });
      // start
      await sleep(INTERVAL);
      cameraRef.current.start();
    },
    { wait: INTERVAL },
  );

  const stopCapturing = () => {
    cameraRef.current.stop();
  };

  /** 通过 tmpImgPath 绘制图片、缩小尺寸、计算 hash */
  const hashTmpImg = async (cut = 0) => {
    const size = 32 + cut * 2;
    return new Promise<Awaited<ReturnType<typeof imagePHash>>>(
      (resolve, reject) => {
        const query = Taro.createSelectorQuery();
        query
          .select('#tmpFileCanvas')
          .fields({
            node: true,
            size: true,
          })
          .exec((res) => {
            try {
              const canvas = res[0].node;
              const ctx = canvas.getContext('2d');
              // 先清空
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              const img = canvas.createImage();
              img.src = tmpImgPath;
              img.onload = async () => {
                ctx.drawImage(img, 0, 0, size, size);
                // if (!tmpFileCanvasScaled.current) {
                //   tmpFileCanvasScaled.current = true;
                //   ctx.scale(2, 2);
                // }
                const res = await imagePHash(ctx, canvas, cut);
                // console.log('当前图片 hash = ', String(hash));
                resolve(res);
              };
            } catch (error) {
              console.log('hash 计算异常', error);
              reject(error);
            }
          });
      },
    );
  };

  // tmpImgPath 变化时，计算 hash
  useAsyncEffect(async () => {
    if (!tmpImgPath) return;
    if (hide.current) return;
    // hash 两轮结果
    const res0 = await hashTmpImg(0);
    // await sleep(INTERVAL / 10);
    // const res1 = await hashTmpImg(1);
    // await sleep(INTERVAL / 10);
    // const res2 = await hashTmpImg(2);
    // await sleep(INTERVAL / 10);
    const res3 = await hashTmpImg(3);
    // await sleep(INTERVAL / 10);
    // const res4 = await hashTmpImg(4);
    // await sleep(INTERVAL / 10);
    // const res5 = await hashTmpImg(5);
    // await sleep(INTERVAL / 10);
    const res6 = await hashTmpImg(6);
    handleHashedImg([res0, res3, res6]);
  }, [tmpImgPath]);

  /** 处理图片帧数据 */
  const handleFrameImage = async (frame: any) => {
    if (hide.current) return;

    const { croped, width, height } = resizeFrameImage(frame, scaleRef.current);

    // 将当前的图片帧绘制到 canvas 上
    const query = Taro.createSelectorQuery();
    query
      .select('#frameCanvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(async (res) => {
        try {
          if (hide.current) return;
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');

          // 先清空
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const imgData = canvas.createImageData(croped, width, height);
          ctx.putImageData(imgData, 0, 0);
          // 将当前 canvas 保存到临时路径
          // await sleep(INTERVAL / 10);
          Taro.canvasToTempFilePath({
            x: 0,
            y: 0,
            width,
            height,
            canvas: canvas,
            fileType: 'png',
            quality: 1, // 精度修改。只支持 jpg
            success(res: any) {
              setTmpImgPath(res.tempFilePath);
              // saveImgByFailPath(res.tempFilePath);
            },
            fail(err) {
              console.log('canvasToTempFilePath 失败', err);
            },
          });
        } catch (error) {
          console.log('handleFrameImage 失败', error);
        }
      });
  };

  if (!canScan) {
    return <Loading />;
  }

  // console.log('scanLocatioin', scanLocatioin);

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <Camera className={styles.camera} mode="normal" flash="auto"></Camera>

        <View
          className={styles.scanBox}
          style={
            {
              '--scale': 3 * ((scale * 2) / 100),
            } as any
          }
        ></View>

        <View className={styles.range}>
          <Range
            min={50}
            max={110}
            value={scale}
            vertical
            onChange={(val) => {
              setScale(val as any);
            }}
            currentDescription={null}
            maxDescription={'缩小'}
            minDescription={'放大'}
          />
        </View>

        <ResultList otpItems={otpItems} />

        <Canvas
          className={styles.frameCanvas}
          type="2d"
          id="frameCanvas"
          canvasId="frameCanvas"
        ></Canvas>

        <Canvas
          type="2d"
          className={styles.tmpFileCanvas}
          id="tmpFileCanvas"
          canvasId="tmpFileCanvas"
        ></Canvas>

        <Canvas
          className={styles.greyCanvas}
          type="2d"
          id="greyCanvas"
          canvasId="greyCanvas"
          // style="width: 32px; height: 32px;"
        ></Canvas>
      </View>
    </ErrorBoundary>
  );
}

export default Scan;
