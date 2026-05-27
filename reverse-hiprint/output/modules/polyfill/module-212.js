// browserify module 212
// deps: {
//   34: 34,
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(64),
    o = t(34),
    u = (1).toPrecision
  e(
    e.P +
      e.F *
        (i(function () {
          return '1' !== u.call(1, void 0)
        }) ||
          !i(function () {
            u.call({})
          })),
    'Number',
    {
      toPrecision: function toPrecision(t) {
        var n = o(this, 'Number#toPrecision: incorrect invocation!')
        return void 0 === t ? u.call(n) : u.call(n, t)
      },
    },
  )
}
