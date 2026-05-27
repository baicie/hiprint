// browserify module 186
// deps: {
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    i = Math.atanh
  e(e.S + e.F * !(i && 1 / i(-0) < 0), 'Math', {
    atanh: function atanh(t) {
      return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2
    },
  })
}
