// browserify module 184
// deps: {
//   62: 62,
//   92: 92
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(92),
    o = Math.sqrt,
    u = Math.acosh
  e(e.S + e.F * !(u && 710 == Math.floor(u(Number.MAX_VALUE)) && u(1 / 0) == 1 / 0), 'Math', {
    acosh: function acosh(t) {
      return (t = +t) < 1
        ? NaN
        : 94906265.62425156 < t
          ? Math.log(t) + Math.LN2
          : i(t - 1 + o(t - 1) * o(t + 1))
    },
  })
}
