export function check(array1, array2) {
  if (array1.length !== array2.length) {
    console.log("false");
    return false;
  } else {
    for (let i = 0; array1.length > i; i++) {
      const length1 = Object.values(array1[i]).length;
      const length2 = Object.values(array2[i]).length;
      if (length1 !== length2) {
        console.log("false");
        return false;
      } else {
        for (let j = 0; length1 > j; j++) {
          if (Object.values(array1[i])[j] !== Object.values(array2[i])[j]) {
            console.log("false");
            return false;
          }
        }
      }
    }
  }
  console.log("true");
  return true;
}
