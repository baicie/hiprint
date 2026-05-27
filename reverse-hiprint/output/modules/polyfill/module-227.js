// browserify module 227
// deps: {
//   109: 109,
//   81: 81,
//   94: 94
// }
export default function (t, n, r) {
  var e = t(81),
    i = t(94).onFreeze
  t(109)('seal', function (n) {
    return function seal(t) {
      return n && e(t) ? n(i(t)) : t
    }
  })
}
