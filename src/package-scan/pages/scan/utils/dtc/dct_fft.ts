export function fft(re, im) {
  const N = re.length;
  const levels = Math.log2(N);

  // 位反转排序
  for (let i = 0; i < N; i++) {
    const j = reverseBits(i, levels);
    if (j > i) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }

  // 蝶形操作
  for (let size = 2; size <= N; size *= 2) {
    const halfsize = size / 2;
    const tablestep = N / size;
    for (let i = 0; i < N; i += size) {
      for (let j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
        const l = j + halfsize;
        const tpre =
          re[l] * Math.cos((Math.PI * k) / N) +
          im[l] * Math.sin((Math.PI * k) / N);
        const tpim =
          -re[l] * Math.sin((Math.PI * k) / N) +
          im[l] * Math.cos((Math.PI * k) / N);

        re[l] = re[j] - tpre;
        im[l] = im[j] - tpim;
        re[j] += tpre;
        im[j] += tpim;
      }
    }
  }
}

function reverseBits(x, n) {
  let result = 0;
  for (let i = 0; i < n; i++, x >>= 1) {
    result = (result << 1) | (x & 1);
  }
  return result;
}

function dct(input) {
  const N = input.length;
  let re = new Float64Array(2 * N); // 注意：分配长度为2N的数组
  let im = new Float64Array(2 * N); // 同上

  // 扩展输入数组
  for (let i = 0; i < N; i++) {
    re[i] = input[i];
  }
  for (let i = N; i < 2 * N; i++) {
    re[i] = input[2 * N - i - 1];
  }

  // 应用 FFT
  fft(re, im);

  // 计算 DCT
  const factor = Math.sqrt(2 / N);
  const result = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    result[i] =
      re[i] *
      Math.cos((Math.PI * i) / (2 * N)) *
      (i == 0 ? factor / Math.sqrt(2) : factor);
  }

  return result;
}

function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = new Array(cols).fill(null).map(() => new Array(rows));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      transposed[j][i] = matrix[i][j];
    }
  }
  return transposed;
}

function applyDCTtoRows(matrix) {
  return matrix.map((row) => dct(row));
}

export function twoDimensionalDCT(matrix) {
  // 对每一行应用 DCT
  let tempResult = applyDCTtoRows(matrix);

  // 转置矩阵
  tempResult = transpose(tempResult);

  // 再次对每一行（原始矩阵的每一列）应用 DCT
  tempResult = applyDCTtoRows(tempResult);

  // 最后再次转置以得到最终结果
  return transpose(tempResult);
}
