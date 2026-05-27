// browserify module 234
// deps: {
//   33: 33,
//   38: 38,
//   46: 46,
//   62: 62,
//   64: 64,
//   70: 70,
//   81: 81,
//   98: 98
// }
export default function (t, n, r) {
  var e = t(62),
    c = t(98),
    a = t(33),
    f = t(38),
    s = t(81),
    i = t(64),
    l = t(46),
    h = (t(70).Reflect || {}).construct,
    p = i(function () {
      function F() {}
      return !(h(function () {}, [], F) instanceof F)
    }),
    v = !i(function () {
      h(function () {})
    })
  e(e.S + e.F * (p || v), 'Reflect', {
    construct: function construct(t, n) {
      ;(a(t), f(n))
      var r = arguments.length < 3 ? t : a(arguments[2])
      if (v && !p) return h(t, n, r)
      if (t == r) {
        switch (n.length) {
          case 0:
            return new t()
          case 1:
            return new t(n[0])
          case 2:
            return new t(n[0], n[1])
          case 3:
            return new t(n[0], n[1], n[2])
          case 4:
            return new t(n[0], n[1], n[2], n[3])
        }
        var e = [null]
        return (e.push.apply(e, n), new (l.apply(t, e))())
      }
      var i = r.prototype,
        o = c(s(i) ? i : Object.prototype),
        u = Function.apply.call(t, o, n)
      return s(u) ? u : o
    },
  })
}
