// browserify module 246
// deps: {
//   101: 101,
//   105: 105,
//   116: 116,
//   38: 38,
//   62: 62,
//   71: 71,
//   81: 81,
//   99: 99
// }
export default function (t, n, r) {
  var c = t(99),
    a = t(101),
    f = t(105),
    s = t(71),
    e = t(62),
    l = t(116),
    h = t(38),
    p = t(81)
  e(e.S, 'Reflect', {
    set: function set(t, n, r) {
      var e,
        i,
        o = arguments.length < 4 ? t : arguments[3],
        u = a.f(h(t), n)
      if (!u) {
        if (p((i = f(t)))) return set(i, n, r, o)
        u = l(0)
      }
      if (s(u, 'value')) {
        if (!1 === u.writable || !p(o)) return !1
        if ((e = a.f(o, n))) {
          if (e.get || e.set || !1 === e.writable) return !1
          ;((e.value = r), c.f(o, n, e))
        } else c.f(o, n, l(0, r))
        return !0
      }
      return void 0 !== u.set && (u.set.call(o, r), !0)
    },
  })
}
