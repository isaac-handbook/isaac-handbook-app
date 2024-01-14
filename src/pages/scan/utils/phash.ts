import Taro from '@tarojs/taro';
import { getcolorFin } from './colorDis';
import { dctTransform_fast } from './dtc/dct_fast';
// import { twoDimensionalDCT, dct, fft } from './dtc/dct_fft';
// import { getPHashFingerprint } from './dct';

// pHash函数
export async function imagePHash(ctx: any, x: number, y: number) {
  // 简化色彩
  const imageData = ctx.getImageData(x, y, 32, 32).data;

  // 测试新 dct 算法
  // try {
  //   const testDct = getPHashFingerprint(imageData);
  //   console.log('testDct', testDct);
  // } catch (error) {
  //   console.log('testDct error', error);
  // }

  let grayMatrix = new Array(32).fill(0).map(() => new Array(32).fill(0));
  for (let i = 0; i < imageData.length; i += 4) {
    const gray = Math.floor(
      (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 4,
    );
    let row = Math.floor(i / 4 / 32);
    let col = (i / 4) % 32;
    grayMatrix[row][col] = gray;
  }

  // 降低对比度，提高鲁棒性
  // for (let i = 0; i < grayMatrix.length; i++) {
  //   for (let j = 0; j < grayMatrix[i].length; j++) {
  //     grayMatrix[i][j] = Math.floor(grayMatrix[i][j] / 2);
  //   }
  // }

  // 绘制灰度化后的图片
  const query = Taro.createSelectorQuery();
  query
    .select('#greyCanvas')
    .fields({
      node: true,
      size: true,
    })
    .exec(async (res) => {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      // 先清空
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const imageData = ctx.createImageData(32, 32);
      for (let i = 0; i < grayMatrix.length; i++) {
        for (let j = 0; j < grayMatrix[i].length; j++) {
          const gray = grayMatrix[i][j];
          const index = (i * 32 + j) * 4;
          imageData.data[index] = gray;
          imageData.data[index + 1] = gray;
          imageData.data[index + 2] = gray;
          imageData.data[index + 3] = 255;
        }
      }
      // 绘制
      ctx.putImageData(imageData, 0, 0);
    });

  // 计算DCT
  // let dctMatrix = dctTransform_stand(grayMatrix);
  let dctMatrix = dctTransform_fast(grayMatrix);
  // let dctMatrix = twoDimensionalDCT(grayMatrix);

  // 缩小DCT
  let dctLowFreq = dctMatrix.slice(0, 8).map((row) => row.slice(0, 8));

  // 计算平均值
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      sum += dctLowFreq[i][j];
    }
  }
  let average = sum / 64;

  // 计算哈希值
  let phash = 0n;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      phash <<= 1n;
      if (dctLowFreq[i][j] >= average) {
        phash |= 1n;
      }
    }
  }

  // 计算颜色分布指纹
  const colorFin = getcolorFin(imageData);

  return { phash, colorFin };
}
