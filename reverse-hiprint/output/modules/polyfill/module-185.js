// browserify module 185
// deps: {
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    i = Math.asinh
  e(e.S + e.F * !(i && 0 < 1 / i(0)), 'Math', {
    asinh: function asinh(t) {
      return isFinite((t = +t)) && 0 != t
        ? t < 0
          ? -asinh(-t)
          : Math.log(t + Math.sqrt(t * t + 1))
        : t
    },
  })
}
