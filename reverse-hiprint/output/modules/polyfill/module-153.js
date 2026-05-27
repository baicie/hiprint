// browserify module 153
// deps: {
//   152: 152,
//   47: 47,
//   52: 52,
//   88: 88
// }
export default function (t, n, r) {
  var e = t(47),
    i = t(152)('iterator'),
    o = t(88)
  n.exports = t(52).getIteratorMethod = function (t) {
    if (null != t) return t[i] || t['@@iterator'] || o[e(t)]
  }
}
