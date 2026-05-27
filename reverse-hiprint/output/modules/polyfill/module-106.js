// browserify module 106
// deps: {
//   125: 125,
//   140: 140,
//   41: 41,
//   71: 71
// }
export default function (t, n, r) {
  var u = t(71),
    c = t(140),
    a = t(41)(!1),
    f = t(125)('IE_PROTO')
  n.exports = function (t, n) {
    var r,
      e = c(t),
      i = 0,
      o = []
    for (r in e) r != f && u(e, r) && o.push(r)
    for (; n.length > i; ) u(e, (r = n[i++])) && (~a(o, r) || o.push(r))
    return o
  }
}
