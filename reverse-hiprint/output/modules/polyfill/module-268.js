// browserify module 268
// deps: {
//   129: 129,
//   85: 85
// }
export default function (t, n, r) {
  'use strict'

  var e = t(129)(!0)
  t(85)(
    String,
    'String',
    function (t) {
      ;((this._t = String(t)), (this._i = 0))
    },
    function () {
      var t,
        n = this._t,
        r = this._i
      return r >= n.length
        ? {
            value: void 0,
            done: !0,
          }
        : ((t = e(n, r)),
          (this._i += t.length),
          {
            value: t,
            done: !1,
          })
    },
  )
}
