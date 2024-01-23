export function simplifyColorData(
  imgData: ImageData['data'],
  zoneAmount: number = 4,
) {
  const colorZoneDataList: number[] = [];
  const zoneStep = 256 / zoneAmount;
  const zoneBorder = [0]; // 区间边界
  for (let i = 1; i <= zoneAmount; i++) {
    zoneBorder.push(zoneStep * i - 1);
  }
  imgData.forEach((data, index) => {
    if ((index + 1) % 4 !== 0) {
      for (let i = 0; i < zoneBorder.length; i++) {
        if (data > zoneBorder[i] && data <= zoneBorder[i + 1]) {
          data = i;
        }
      }
    }
    colorZoneDataList.push(data);
  });
  return colorZoneDataList;
}

export function seperateListToColorZone(simplifiedDataList: number[]) {
  const zonedList: string[] = [];
  let tempZone: number[] = [];
  simplifiedDataList.forEach((data, index) => {
    if ((index + 1) % 4 !== 0) {
      tempZone.push(data);
    } else {
      zonedList.push(JSON.stringify(tempZone));
      tempZone = [];
    }
  });
  return zonedList;
}

export function getFingerprint(zonedList: string[], zoneAmount: number = 4) {
  const colorSeperateMap: {
    [key: string]: number;
  } = {};
  for (let i = 0; i < zoneAmount; i++) {
    for (let j = 0; j < zoneAmount; j++) {
      for (let k = 0; k < zoneAmount; k++) {
        colorSeperateMap[JSON.stringify([i, j, k])] = 0;
      }
    }
  }
  zonedList.forEach((zone) => {
    colorSeperateMap[zone]++;
  });
  return Object.values(colorSeperateMap);
}

export const getcolorFin = (imgData: ImageData['data']) => {
  const simplifiedDataList = simplifyColorData(imgData);
  const zonedList = seperateListToColorZone(simplifiedDataList);
  const fingerprint = getFingerprint(zonedList);
  return fingerprint;
};
