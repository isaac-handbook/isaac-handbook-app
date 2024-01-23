// 比较两个哈希值并计算汉明距离
export function hammingDistance(hash1: bigint, hash2: bigint) {
  let difference = 0n;
  let xor = hash1 ^ hash2;
  while (xor) {
    difference += xor & 1n;
    xor >>= 1n;
  }
  return Number(difference); // 将BigInt转换为普通的数字
}
