/**
 * Number formatting
 * 10000 => 10k
 * @param {num}  Number
 * @param {digits} Number
 */
export function numberFormatter(num, digits) {
  const si = [{
      value: 1e18,
      symbol: 'E',
    },
    {
      value: 1e15,
      symbol: 'P',
    },
    {
      value: 1e12,
      symbol: 'T',
    },
    {
      value: 1e9,
      symbol: 'G',
    },
    {
      value: 1e6,
      symbol: 'M',
    },
    {
      value: 1e3,
      symbol: 'k',
    },
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}



/**
 * Number formatting
 * 10000 => "10,000"
 * @param {num} Number
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}


/**
 * Upper case first char
 * apple => Apple
 * @param {string} String
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}