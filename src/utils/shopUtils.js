export const isUnequalParams =(param1, param2) => {
    if(!param1 || !param1) return true;

    const keys1 = Object.keys(param1);
  const keys2 = Object.keys(param2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (param1[key] !== param2[key]) {
      return false;
    }
  }
}