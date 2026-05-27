// browserify module 132
// deps: {
//   133: 133,
//   141: 141,
//   57: 57
// }
export default function (t, n, r) {
  var s = t(141),
    l = t(133),
    h = t(57)
  n.exports = function (t, n, r, e) {
    var i = String(h(t)),
      o = i.length,
      u = void 0 === r ? ' ' : String(r),
      c = s(n)
    if (c <= o || '' == u) return i
    var a = c - o,
      f = l.call(u, Math.ceil(a / u.length))
    return (f.length > a && (f = f.slice(0, a)), e ? f + i : i + f)
  }
}
