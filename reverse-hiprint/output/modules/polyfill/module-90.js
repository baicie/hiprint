// browserify module 90
// deps: {}
export default function (t, n, r) {
  var e = Math.expm1
  n.exports =
    !e || 22025.465794806718 < e(10) || e(10) < 22025.465794806718 || -2e-17 != e(-2e-17)
      ? function expm1(t) {
          return 0 == (t = +t) ? t : -1e-6 < t && t < 1e-6 ? t + (t * t) / 2 : Math.exp(t) - 1
        }
      : e
}
