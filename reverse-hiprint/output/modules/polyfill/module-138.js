// browserify module 138
// deps: {
//   139: 139,
//   141: 141
// }
export default function (t, n, r) {
  var e = t(139),
    i = t(141)
  n.exports = function (t) {
    if (void 0 === t) return 0
    var n = e(t),
      r = i(n)
    if (n !== r) throw RangeError('Wrong length!')
    return r
  }
}
