/** DCT函数。平均耗时 60ms */
export function dctTransform_fast(matrix) {
  let N = matrix.length;
  let result = new Float64Array(N * N); // 使用一维数组和类型化数组以提高性能

  // 预计算 cos 值
  let cosValues = new Float64Array(N * N);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      cosValues[i * N + j] = Math.cos(((2 * i + 1) * j * Math.PI) / (2 * N));
    }
  }

  for (let u = 0; u < N; u++) {
    for (let v = 0; v < N; v++) {
      let sum = 0;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          // 使用预计算的 cos 值
          sum += matrix[i][j] * cosValues[u * N + i] * cosValues[v * N + j];
        }
      }
      let scaleFactor = ((u === 0 ? 1 : 2) * (v === 0 ? 1 : 2)) / (2 * N);
      result[u * N + v] = sum * scaleFactor;
    }
  }

  // 转换回二维数组格式，如果需要
  let twoDResult: any[] = [];
  for (let u = 0; u < N; u++) {
    let row: any[] = [];
    for (let v = 0; v < N; v++) {
      row.push(result[u * N + v]);
    }
    twoDResult.push(row);
  }

  return twoDResult;
}
