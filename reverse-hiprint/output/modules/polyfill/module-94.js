// browserify module 94
// deps: {
//   147: 147,
//   64: 64,
//   71: 71,
//   81: 81,
//   99: 99
// }
export default function (t, n, r) {
  var e = t(147)('meta'),
    i = t(81),
    o = t(71),
    u = t(99).f,
    c = 0,
    a =
      Object.isExtensible ||
      function () {
        return !0
      },
    f = !t(64)(function () {
      return a(Object.preventExtensions({}))
    }),
    s = function (t) {
      u(t, e, {
        value: {
          i: 'O' + ++c,
          w: {},
        },
      })
    },
    l = (n.exports = {
      KEY: e,
      NEED: !1,
      fastKey: function (t, n) {
        if (!i(t)) return 'symbol' == typeof t ? t : ('string' == typeof t ? 'S' : 'P') + t
        if (!o(t, e)) {
          if (!a(t)) return 'F'
          if (!n) return 'E'
          s(t)
        }
        return t[e].i
      },
      getWeak: function (t, n) {
        if (!o(t, e)) {
          if (!a(t)) return !0
          if (!n) return !1
          s(t)
        }
        return t[e].w
      },
      onFreeze: function (t) {
        return (f && l.NEED && a(t) && !o(t, e) && s(t), t)
      },
    })
}
