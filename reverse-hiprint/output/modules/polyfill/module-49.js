// browserify module 49
// deps: {
//   117: 117,
//   123: 123,
//   149: 149,
//   37: 37,
//   54: 54,
//   58: 58,
//   68: 68,
//   85: 85,
//   87: 87,
//   94: 94,
//   98: 98,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  var u = t(99).f,
    c = t(98),
    a = t(117),
    f = t(54),
    s = t(37),
    l = t(68),
    e = t(85),
    i = t(87),
    o = t(123),
    h = t(58),
    p = t(94).fastKey,
    v = t(149),
    y = h ? '_s' : 'size',
    g = function (t, n) {
      var r,
        e = p(n)
      if ('F' !== e) return t._i[e]
      for (r = t._f; r; r = r.n) if (r.k == n) return r
    }
  n.exports = {
    getConstructor: function (t, o, r, e) {
      var i = t(function (t, n) {
        ;(s(t, i, o, '_i'),
          (t._t = o),
          (t._i = c(null)),
          (t._f = void 0),
          (t._l = void 0),
          (t[y] = 0),
          null != n && l(n, r, t[e], t))
      })
      return (
        a(i.prototype, {
          clear: function clear() {
            for (var t = v(this, o), n = t._i, r = t._f; r; r = r.n)
              ((r.r = !0), r.p && (r.p = r.p.n = void 0), delete n[r.i])
            ;((t._f = t._l = void 0), (t[y] = 0))
          },
          delete: function (t) {
            var n = v(this, o),
              r = g(n, t)
            if (r) {
              var e = r.n,
                i = r.p
              ;(delete n._i[r.i],
                (r.r = !0),
                i && (i.n = e),
                e && (e.p = i),
                n._f == r && (n._f = e),
                n._l == r && (n._l = i),
                n[y]--)
            }
            return !!r
          },
          forEach: function forEach(t) {
            v(this, o)
            for (
              var n, r = f(t, 1 < arguments.length ? arguments[1] : void 0, 3);
              (n = n ? n.n : this._f);
            )
              for (r(n.v, n.k, this); n && n.r; ) n = n.p
          },
          has: function has(t) {
            return !!g(v(this, o), t)
          },
        }),
        h &&
          u(i.prototype, 'size', {
            get: function () {
              return v(this, o)[y]
            },
          }),
        i
      )
    },
    def: function (t, n, r) {
      var e,
        i,
        o = g(t, n)
      return (
        o
          ? (o.v = r)
          : ((t._l = o =
              {
                i: (i = p(n, !0)),
                k: n,
                v: r,
                p: (e = t._l),
                n: void 0,
                r: !1,
              }),
            t._f || (t._f = o),
            e && (e.n = o),
            t[y]++,
            'F' !== i && (t._i[i] = o)),
        t
      )
    },
    getEntry: g,
    setStrong: function (t, r, n) {
      ;(e(
        t,
        r,
        function (t, n) {
          ;((this._t = v(t, r)), (this._k = n), (this._l = void 0))
        },
        function () {
          for (var t = this, n = t._k, r = t._l; r && r.r; ) r = r.p
          return t._t && (t._l = r = r ? r.n : t._t._f)
            ? i(0, 'keys' == n ? r.k : 'values' == n ? r.v : [r.k, r.v])
            : ((t._t = void 0), i(1))
        },
        n ? 'entries' : 'values',
        !n,
        !0,
      ),
        o(r))
    },
  }
}
