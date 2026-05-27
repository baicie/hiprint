// browserify module 50
// deps: {
//   117: 117,
//   149: 149,
//   37: 37,
//   38: 38,
//   42: 42,
//   68: 68,
//   71: 71,
//   81: 81,
//   94: 94
// }
export default function (t, n, r) {
  'use strict'

  var u = t(117),
    c = t(94).getWeak,
    i = t(38),
    a = t(81),
    f = t(37),
    s = t(68),
    e = t(42),
    l = t(71),
    h = t(149),
    o = e(5),
    p = e(6),
    v = 0,
    y = function (t) {
      return t._l || (t._l = new g())
    },
    g = function () {
      this.a = []
    },
    d = function (t, n) {
      return o(t.a, function (t) {
        return t[0] === n
      })
    }
  ;((g.prototype = {
    get: function (t) {
      var n = d(this, t)
      if (n) return n[1]
    },
    has: function (t) {
      return !!d(this, t)
    },
    set: function (t, n) {
      var r = d(this, t)
      r ? (r[1] = n) : this.a.push([t, n])
    },
    delete: function (n) {
      var t = p(this.a, function (t) {
        return t[0] === n
      })
      return (~t && this.a.splice(t, 1), !!~t)
    },
  }),
    (n.exports = {
      getConstructor: function (t, r, e, i) {
        var o = t(function (t, n) {
          ;(f(t, o, r, '_i'),
            (t._t = r),
            (t._i = v++),
            (t._l = void 0),
            null != n && s(n, e, t[i], t))
        })
        return (
          u(o.prototype, {
            delete: function (t) {
              if (!a(t)) return !1
              var n = c(t)
              return !0 === n ? y(h(this, r)).delete(t) : n && l(n, this._i) && delete n[this._i]
            },
            has: function has(t) {
              if (!a(t)) return !1
              var n = c(t)
              return !0 === n ? y(h(this, r)).has(t) : n && l(n, this._i)
            },
          }),
          o
        )
      },
      def: function (t, n, r) {
        var e = c(i(n), !0)
        return (!0 === e ? y(t).set(n, r) : (e[t._i] = r), t)
      },
      ufstore: y,
    }))
}
