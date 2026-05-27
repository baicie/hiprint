// browserify module 298
// deps: {
//   132: 132,
//   148: 148,
//   62: 62
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(132),
    o = t(148),
    u = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o)
  e(e.P + e.F * u, 'String', {
    padEnd: function padEnd(t) {
      return i(this, t, 1 < arguments.length ? arguments[1] : void 0, !1)
    },
  })
}
