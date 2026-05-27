// browserify module 223
// deps: {
//   109: 109,
//   81: 81
// }
export default function (t, n, r) {
  var e = t(81)
  t(109)('isSealed', function (n) {
    return function isSealed(t) {
      return !e(t) || (!!n && n(t))
    }
  })
}
