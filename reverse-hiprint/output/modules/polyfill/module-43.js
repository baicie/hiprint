// browserify module 43
// deps: {
//   141: 141,
//   142: 142,
//   33: 33,
//   77: 77
// }
export default function (t, n, r) {
  var s = t(33),
    l = t(142),
    h = t(77),
    p = t(141)
  n.exports = function (t, n, r, e, i) {
    s(n)
    var o = l(t),
      u = h(o),
      c = p(o.length),
      a = i ? c - 1 : 0,
      f = i ? -1 : 1
    if (r < 2)
      for (;;) {
        if (a in u) {
          ;((e = u[a]), (a += f))
          break
        }
        if (((a += f), i ? a < 0 : c <= a))
          throw TypeError('Reduce of empty array with no initial value')
      }
    for (; i ? 0 <= a : a < c; a += f) a in u && (e = n(e, u[a], a, o))
    return e
  }
}
