export function getNumberText(num) {
  if (num > 10000) {
    const integer = Math.floor(num / 1000);
    const temp = Math.round((num % 1000) / 100);
    return '' + integer + '.' + temp + 'k'
  } else {
    return num
  }
}

//source:[{valueKey:xxx}] 或{aa:{valueKey:xxx}}
export function findItem(value, valueKey, source) {
  if (Array.isArray(source) && isStrOrNum(value) && isStrOrNum(valueKey)) {
    for (let key in source) {
      const item = source[key];
      if (item[valueKey] === value) {
        return key
      }
    }
    return null
  } else {
    console.error('参数异常');
  }
}
export function isStr(value) {
  return typeof value === 'string'
}

export function isStrOrNum(value) {
  return isStr(value) || isNum(value)
}

export function isNum(value) {
  return typeof value === 'number'
}





//节流
export function throttle(fn, limit = 250) {
  let lastRun;
  let timeid;
  return function (...args) {
    const context = this;
    if (lastRun) {
      clearTimeout(timeid)

      timeid = setTimeout(() => {
        if (Date.now() - lastRun >= limit) {
          fn.apply(context, args);
          lastRun = Date.now()
        }
      }, limit - (Date.now() - lastRun));
    } else {
      fn.apply(context, args);
      lastRun = Date.now()
    }
  }
}



//防抖
export function debounce(fn, wait, immediate) {
  let timeid;

  return function (...args) {
    const context = this;

    if (immediate && timeid === undefined) {
      timeid = -1
      return fn.apply(context, args);
    }
    clearTimeout(timeid)
    timeid = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
}