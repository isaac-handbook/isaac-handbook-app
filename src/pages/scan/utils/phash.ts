import Taro from '@tarojs/taro';
import { getcolorFin } from './colorDis';

// DCT函数
function dctTransform(matrix) {
  let N = matrix.length;
  let result = new Array(N).fill(0).map(() => new Array(N).fill(0));

  for (let u = 0; u < N; u++) {
    for (let v = 0; v < N; v++) {
      let sum = 0;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          sum +=
            matrix[i][j] *
            Math.cos(((2 * i + 1) * u * Math.PI) / (2 * N)) *
            Math.cos(((2 * j + 1) * v * Math.PI) / (2 * N));
        }
      }
      sum *= ((u === 0 ? 1 : 2) * (v === 0 ? 1 : 2)) / (2 * N);
      result[u][v] = sum;
    }
  }
  return result;
}

// pHash函数
export async function imagePHash(ctx: any, x: number, y: number) {
  // 简化色彩
  const imageData = ctx.getImageData(x, y, 32, 32).data;

  let grayMatrix = new Array(32).fill(0).map(() => new Array(32).fill(0));
  for (let i = 0; i < imageData.length; i += 4) {
    const gray = Math.floor(
      (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3,
    );
    let row = Math.floor(i / 4 / 32);
    let col = (i / 4) % 32;
    grayMatrix[row][col] = gray;
  }

  // 提高对比度，但不要变成黑白的
  // let threshold = 0;
  // for (let i = 0; i < grayMatrix.length; i++) {
  //   for (let j = 0; j < grayMatrix[i].length; j++) {
  //     threshold += grayMatrix[i][j];
  //   }
  // }
  // threshold /= 1024;
  // for (let i = 0; i < grayMatrix.length; i++) {
  //   for (let j = 0; j < grayMatrix[i].length; j++) {
  //     grayMatrix[i][j] = grayMatrix[i][j] > threshold ? grayMatrix[i][j] : 0;
  //   }
  // }

  // 提高对比度
  // let threshold = 0;
  // for (let i = 0; i < grayMatrix.length; i++) {
  //   for (let j = 0; j < grayMatrix[i].length; j++) {
  //     threshold += grayMatrix[i][j];
  //   }
  // }
  // threshold /= 1024;
  // for (let i = 0; i < grayMatrix.length; i++) {
  //   for (let j = 0; j < grayMatrix[i].length; j++) {
  //     grayMatrix[i][j] = grayMatrix[i][j] > threshold ? 255 : 0;
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
  let dctMatrix = dctTransform(grayMatrix);

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
