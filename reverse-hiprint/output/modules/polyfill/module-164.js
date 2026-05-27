// browserify module 164
// deps: {
//   140: 140,
//   35: 35,
//   85: 85,
//   87: 87,
//   88: 88
// }
export default function (t, n, r) {
  'use strict'

  var e = t(35),
    i = t(87),
    o = t(88),
    u = t(140)
  ;((n.exports = t(85)(
    Array,
    'Array',
    function (t, n) {
      ;((this._t = u(t)), (this._i = 0), (this._k = n))
    },
    function () {
      var t = this._t,
        n = this._k,
        r = this._i++
      return !t || r >= t.length
        ? ((this._t = void 0), i(1))
        : i(0, 'keys' == n ? r : 'values' == n ? t[r] : [r, t[r]])
    },
    'values',
  )),
    (o.Arguments = o.Array),
    e('keys'),
    e('values'),
    e('entries'))
}
