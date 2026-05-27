// browserify module 199
// deps: {
//   62: 62,
//   90: 90
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(90),
    o = Math.exp
  e(e.S, 'Math', {
    tanh: function tanh(t) {
      var n = i((t = +t)),
        r = i(-t)
      return n == 1 / 0 ? 1 : r == 1 / 0 ? -1 : (n - r) / (o(t) + o(-t))
    },
  })
}
