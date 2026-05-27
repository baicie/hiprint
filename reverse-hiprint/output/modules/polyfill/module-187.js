// browserify module 187
// deps: {
//   62: 62,
//   93: 93
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(93)
  e(e.S, 'Math', {
    cbrt: function cbrt(t) {
      return i((t = +t)) * Math.pow(Math.abs(t), 1 / 3)
    },
  })
}
