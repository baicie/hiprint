// browserify module 297
// deps: {
//   115: 115,
//   127: 127,
//   52: 52,
//   62: 62,
//   70: 70
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(52),
    o = t(70),
    u = t(127),
    c = t(115)
  e(e.P + e.R, 'Promise', {
    finally: function (n) {
      var r = u(this, i.Promise || o.Promise),
        t = 'function' == typeof n
      return this.then(
        t
          ? function (t) {
              return c(r, n()).then(function () {
                return t
              })
            }
          : n,
        t
          ? function (t) {
              return c(r, n()).then(function () {
                throw t
              })
            }
          : n,
      )
    },
  })
}
