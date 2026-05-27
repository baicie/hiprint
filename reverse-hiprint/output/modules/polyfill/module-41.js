// browserify module 41
// deps: {
//   137: 137,
//   140: 140,
//   141: 141
// }
export default function (t, n, r) {
  var a = t(140),
    f = t(141),
    s = t(137)
  n.exports = function (c) {
    return function (t, n, r) {
      var e,
        i = a(t),
        o = f(i.length),
        u = s(r, o)
      if (c && n != n) {
        for (; u < o; ) if ((e = i[u++]) != e) return !0
      } else for (; u < o; u++) if ((c || u in i) && i[u] === n) return c || u || 0
      return !c && -1
    }
  }
}
