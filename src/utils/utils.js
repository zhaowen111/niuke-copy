export function getNumberText(num) {
  if (num > 10000) {
    const integer = Math.floor(num / 1000);
    const temp = Math.round((num % 1000) / 100);
    return '' + integer + '.' + temp + 'k'
  } else {
    return num
  }
}
