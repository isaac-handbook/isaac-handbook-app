import Taro from '@tarojs/taro';

/** 裁剪帧图片 */
export const resizeFrameImage = (frame: any, scale: number) => {
  const { windowWidth, windowHeight } = Taro.getSystemInfoSync();
  // 这个偏移量 by 实践
  const amazingOffset = 20;
  // x轴偏移量
  const xOffset = Math.round((frame.width - windowWidth) / amazingOffset);
  // y轴偏移量
  const yOffset = Math.round((frame.height - windowHeight) / amazingOffset);

  // 裁剪 Uint8ClampedArray 形式的图片
  const scale3 = 3 * ((scale * 2) / 100);
  const x = Math.round((frame.width - frame.width / scale3) / 2) + xOffset;
  const y =
    Math.round((frame.height - frame.width / scale3) / 2) -
    Math.round(frame.height * 0.15) +
    yOffset;
  const width = Math.round(frame.width / scale3);
  const height = Math.round(frame.width / scale3);

  const data = new Uint8Array(frame.data);
  const clamped = new Uint8ClampedArray(data);

  const croped = cropImage(
    clamped,
    frame.width,
    frame.height,
    width,
    height,
    x,
    y,
  );
  return { croped, width, height, x, y };
};

/** 裁剪 Uint8ClampedArray 格式的图片 */
export function cropImage(
  imageData: Uint8ClampedArray,
  imgWidth: number,
  imgHeight: number,
  cropWidth: number,
  cropHeight: number,
  startX: number,
  startY: number,
): Uint8ClampedArray {
  // 确保裁剪区域不会超出图像边界
  if (startX + cropWidth > imgWidth || startY + cropHeight > imgHeight) {
    throw new Error('裁剪区域超出图像边界');
  }

  const croppedData = new Uint8ClampedArray(cropWidth * cropHeight * 4);

  for (let row = 0; row < cropHeight; row++) {
    for (let col = 0; col < cropWidth; col++) {
      const srcIndex = ((startY + row) * imgWidth + (startX + col)) * 4;
      const destIndex = (row * cropWidth + col) * 4;

      // 复制像素值
      croppedData[destIndex] = imageData[srcIndex]; // R
      croppedData[destIndex + 1] = imageData[srcIndex + 1]; // G
      croppedData[destIndex + 2] = imageData[srcIndex + 2]; // B
      croppedData[destIndex + 3] = imageData[srcIndex + 3]; // A
    }
  }

  return croppedData;
}
