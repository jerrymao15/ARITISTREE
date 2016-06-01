function cloneDeep(value) {
  let arrResult = [],
  objectResult = {};
   if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (typeof value[i] === 'object') {
        arrResult.push(cloneDeep(value[i]))
      } else {
        arrResult.push(value[i]);
      }
    }
    return arrResult;
   } else {
    for (let key in value) {
      if (typeof value[key] === 'object') {
        objectResult[key] = cloneDeep(value[key]);
      } else {
        objectResult[key] = value[key];
      }
     }
     return objectResult;
   }
}

export default cloneDeep;
