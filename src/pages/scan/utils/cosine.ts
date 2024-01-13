export function cosineSimilarity(
  sampleFingerprint: number[],
  targetFingerprint: number[],
) {
  const length = sampleFingerprint.length;
  let innerProduct = 0;
  for (let i = 0; i < length; i++) {
    innerProduct += sampleFingerprint[i] * targetFingerprint[i];
  }
  let vecA = 0;
  let vecB = 0;
  for (let i = 0; i < length; i++) {
    vecA += sampleFingerprint[i] ** 2;
    vecB += targetFingerprint[i] ** 2;
  }
  const outerProduct = Math.sqrt(vecA) * Math.sqrt(vecB);
  return innerProduct / outerProduct;
}
