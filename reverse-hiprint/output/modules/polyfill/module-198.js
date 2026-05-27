// browserify module 198
// deps: {
//   62: 62,
//   64: 64,
//   90: 90
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(90),
    o = Math.exp
  e(
    e.S +
      e.F *
        t(64)(function () {
          return -2e-17 != !Math.sinh(-2e-17)
        }),
    'Math',
    {
      sinh: function sinh(t) {
        return Math.abs((t = +t)) < 1 ? (i(t) - i(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2)
      },
    },
  )
}
