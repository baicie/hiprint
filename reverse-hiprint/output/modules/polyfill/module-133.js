// browserify module 133
// deps: {
//   139: 139,
//   57: 57
// }
export default function (t, n, r) {
  'use strict'

  var i = t(139),
    o = t(57)
  n.exports = function repeat(t) {
    var n = String(o(this)),
      r = '',
      e = i(t)
    if (e < 0 || e == 1 / 0) throw RangeError("Count can't be negative")
    for (; 0 < e; (e >>>= 1) && (n += n)) 1 & e && (r += n)
    return r
  }
}
