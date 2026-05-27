// browserify module 61
// deps: {
//   104: 104,
//   107: 107,
//   108: 108
// }
export default function (t, n, r) {
  var c = t(107),
    a = t(104),
    f = t(108)
  n.exports = function (t) {
    var n = c(t),
      r = a.f
    if (r)
      for (var e, i = r(t), o = f.f, u = 0; i.length > u; ) o.call(t, (e = i[u++])) && n.push(e)
    return n
  }
}
