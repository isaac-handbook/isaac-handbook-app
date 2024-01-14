/** DCT函数。平均耗时 150ms */
export function dctTransform_stand(matrix) {
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
