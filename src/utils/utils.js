export function getNumberText(num) {
  if (num > 10000) {
    const integer = Math.floor(num / 1000);
    const temp = Math.round((num % 1000) / 100);
    return '' + integer + '.' + temp + 'k'
  } else {
    return num
  }
}

export function getNumberTextWan(num) {
  if (num > 10000) {
    const integer = Math.floor(num / 10000);
    const temp = Math.round((num % 10000) / 1000);
    return '' + integer + '.' + temp + 'w'
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

export function isStrNotNull(value) {
  return isStr(value) && value.length > 0
}

export function isNumNotNull(value) {
  return isNum(value) && value > 0
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
export function debounce(fn, wait = 250, immediate) {
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

export function adapt(designWidth, rem2px) {
  var d = window.document.createElement('div');
  d.style.width = '1rem';
  d.style.display = "none";
  var head = window.document.getElementsByTagName('head')[0];
  head.appendChild(d);
  var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
  // d.remove();
  // document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
  var st = document.createElement('style');
  var portrait = "@media screen and (min-width: " + window.innerWidth + "px) {html{font-size:" + ((window.innerWidth / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}";
  var landscape = "@media screen and (min-width: " + window.innerHeight + "px) {html{font-size:" + ((window.innerHeight / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}"
  st.innerHTML = portrait + landscape;
  head.appendChild(st);
  return defaultFontSize
};



export function fullscreen(dom) {
  window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
      if (dom.requestFullscreen) {
        dom.requestFullscreen()
      }
      else if (dom.webkitRequestFullscreen) {
        dom.webkitRequestFullscreen()
      }
    }
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  })
}