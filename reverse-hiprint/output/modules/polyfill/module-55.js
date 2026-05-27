// browserify module 55
// deps: {
//   64: 64
// }
export default function (t, n, r) {
  'use strict'

  var e = t(64),
    i = Date.prototype.getTime,
    o = Date.prototype.toISOString,
    u = function (t) {
      return 9 < t ? t : '0' + t
    }
  n.exports =
    e(function () {
      return '0385-07-25T07:06:39.999Z' != o.call(new Date(-5e13 - 1))
    }) ||
    !e(function () {
      o.call(new Date(NaN))
    })
      ? function toISOString() {
          if (!isFinite(i.call(this))) throw RangeError('Invalid time value')
          var t = this,
            n = t.getUTCFullYear(),
            r = t.getUTCMilliseconds(),
            e = n < 0 ? '-' : 9999 < n ? '+' : ''
          return (
            e +
            ('00000' + Math.abs(n)).slice(e ? -6 : -4) +
            '-' +
            u(t.getUTCMonth() + 1) +
            '-' +
            u(t.getUTCDate()) +
            'T' +
            u(t.getUTCHours()) +
            ':' +
            u(t.getUTCMinutes()) +
            ':' +
            u(t.getUTCSeconds()) +
            '.' +
            (99 < r ? r : '0' + u(r)) +
            'Z'
          )
        }
      : o
}
