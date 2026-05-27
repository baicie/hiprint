// browserify module 56
// deps: {
//   143: 143,
//   38: 38
// }
export default function (t, n, r) {
  'use strict'

  var e = t(38),
    i = t(143)
  n.exports = function (t) {
    if ('string' !== t && 'number' !== t && 'default' !== t) throw TypeError('Incorrect hint')
    return i(e(this), 'number' != t)
  }
}
