export function getIconStyle(url, size = 20) {
  return {
    background: `center/contain no-repeat url('${url}')`,
    width: size + 'px',
    height: size + 'px',
  }
}