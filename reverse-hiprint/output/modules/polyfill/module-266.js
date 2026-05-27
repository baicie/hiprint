// browserify module 266
// deps: {
//   130: 130,
//   62: 62,
//   63: 63
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(130),
    o = 'includes'
  e(e.P + e.F * t(63)(o), 'String', {
    includes: function includes(t) {
      return !!~i(this, t, o).indexOf(t, 1 < arguments.length ? arguments[1] : void 0)
    },
  })
}
