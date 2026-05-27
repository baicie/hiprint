// browserify module 200
// deps: {
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62)
  e(e.S, 'Math', {
    trunc: function trunc(t) {
      return (0 < t ? Math.floor : Math.ceil)(t)
    },
  })
}
