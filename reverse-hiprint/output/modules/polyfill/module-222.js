// browserify module 222
// deps: {
//   109: 109,
//   81: 81
// }
export default function (t, n, r) {
  var e = t(81)
  t(109)('isFrozen', function (n) {
    return function isFrozen(t) {
      return !e(t) || (!!n && n(t))
    }
  })
}
