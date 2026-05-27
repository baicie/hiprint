// browserify module 203
// deps: {
//   62: 62,
//   70: 70
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(70).isFinite
  e(e.S, 'Number', {
    isFinite: function isFinite(t) {
      return 'number' == typeof t && i(t)
    },
  })
}
