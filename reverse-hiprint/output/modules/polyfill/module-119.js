// browserify module 119
// deps: {
//   47: 47
// }
export default function (t, n, r) {
  'use strict'

  var i = t(47),
    o = RegExp.prototype.exec
  n.exports = function (t, n) {
    var r = t.exec
    if ('function' == typeof r) {
      var e = r.call(t, n)
      if ('object' != typeof e)
        throw new TypeError('RegExp exec method returned something other than an Object or null')
      return e
    }
    if ('RegExp' !== i(t)) throw new TypeError('RegExp#exec called on incompatible receiver')
    return o.call(t, n)
  }
}
