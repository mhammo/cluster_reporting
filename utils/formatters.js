export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const kFormatter = (x) =>
  Math.abs(x) > 999
    ? Math.sign(x) * (Math.abs(x) / 1000).toFixed(1) + 'k'
    : Math.sign(x) * Math.abs(x)
