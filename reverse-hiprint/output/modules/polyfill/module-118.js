// browserify module 118
// deps: {
//   147: 147,
//   52: 52,
//   69: 69,
//   70: 70,
//   71: 71,
//   72: 72
// }
export default function (t, n, r) {
  var o = t(70),
    u = t(72),
    c = t(71),
    a = t(147)('src'),
    e = t(69),
    i = 'toString',
    f = ('' + e).split(i)
  ;((t(52).inspectSource = function (t) {
    return e.call(t)
  }),
    (n.exports = function (t, n, r, e) {
      var i = 'function' == typeof r
      ;(i && (c(r, 'name') || u(r, 'name', n)),
        t[n] !== r &&
          (i && (c(r, a) || u(r, a, t[n] ? '' + t[n] : f.join(String(n)))),
          t === o ? (t[n] = r) : e ? (t[n] ? (t[n] = r) : u(t, n, r)) : (delete t[n], u(t, n, r))))
    })(Function.prototype, i, function toString() {
      return ('function' == typeof this && this[a]) || e.call(this)
    }))
}
