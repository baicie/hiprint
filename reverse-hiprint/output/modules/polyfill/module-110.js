// browserify module 110
// deps: {
//   107: 107,
//   108: 108,
//   140: 140
// }
export default function (t, n, r) {
  var a = t(107),
    f = t(140),
    s = t(108).f
  n.exports = function (c) {
    return function (t) {
      for (var n, r = f(t), e = a(r), i = e.length, o = 0, u = []; o < i; )
        s.call(r, (n = e[o++])) && u.push(c ? [n, r[n]] : r[n])
      return u
    }
  }
}
