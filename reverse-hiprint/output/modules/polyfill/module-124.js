// browserify module 124
// deps: {
//   152: 152,
//   71: 71,
//   99: 99
// }
export default function (t, n, r) {
  var e = t(99).f,
    i = t(71),
    o = t(152)('toStringTag')
  n.exports = function (t, n, r) {
    t &&
      !i((t = r ? t : t.prototype), o) &&
      e(t, o, {
        configurable: !0,
        value: n,
      })
  }
}
