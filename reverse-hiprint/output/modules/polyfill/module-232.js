// browserify module 232
// deps: {
//   114: 114,
//   115: 115,
//   117: 117,
//   123: 123,
//   124: 124,
//   127: 127,
//   136: 136,
//   148: 148,
//   152: 152,
//   33: 33,
//   37: 37,
//   47: 47,
//   52: 52,
//   54: 54,
//   62: 62,
//   68: 68,
//   70: 70,
//   81: 81,
//   86: 86,
//   89: 89,
//   95: 95,
//   96: 96
// }
export default function (r, t, n) {
  'use strict'

  var e,
    i,
    o,
    u,
    c = r(89),
    a = r(70),
    f = r(54),
    s = r(47),
    l = r(62),
    h = r(81),
    p = r(33),
    v = r(37),
    y = r(68),
    g = r(127),
    d = r(136).set,
    x = r(95)(),
    m = r(96),
    b = r(114),
    S = r(148),
    w = r(115),
    _ = 'Promise',
    E = a.TypeError,
    F = a.process,
    I = F && F.versions,
    O = (I && I.v8) || '',
    P = a[_],
    A = 'process' == s(F),
    M = function () {},
    k = (i = m.f),
    N = !!(function () {
      try {
        var t = P.resolve(1),
          n = ((t.constructor = {})[r(152)('species')] = function (t) {
            t(M, M)
          })
        return (
          (A || 'function' == typeof PromiseRejectionEvent) &&
          t.then(M) instanceof n &&
          0 !== O.indexOf('6.6') &&
          -1 === S.indexOf('Chrome/66')
        )
      } catch (t) {}
    })(),
    j = function (t) {
      var n
      return !(!h(t) || 'function' != typeof (n = t.then)) && n
    },
    T = function (s, r) {
      if (!s._n) {
        s._n = !0
        var e = s._c
        x(function () {
          for (
            var a = s._v,
              f = 1 == s._s,
              t = 0,
              n = function (t) {
                var n,
                  r,
                  e,
                  i = f ? t.ok : t.fail,
                  o = t.resolve,
                  u = t.reject,
                  c = t.domain
                try {
                  i
                    ? (f || (2 == s._h && C(s), (s._h = 1)),
                      !0 === i ? (n = a) : (c && c.enter(), (n = i(a)), c && (c.exit(), (e = !0))),
                      n === t.promise
                        ? u(E('Promise-chain cycle'))
                        : (r = j(n))
                          ? r.call(n, o, u)
                          : o(n))
                    : u(a)
                } catch (t) {
                  ;(c && !e && c.exit(), u(t))
                }
              };
            e.length > t;
          )
            n(e[t++])
          ;((s._c = []), (s._n = !1), r && !s._h && R(s))
        })
      }
    },
    R = function (o) {
      d.call(a, function () {
        var t,
          n,
          r,
          e = o._v,
          i = L(o)
        if (
          (i &&
            ((t = b(function () {
              A
                ? F.emit('unhandledRejection', e, o)
                : (n = a.onunhandledrejection)
                  ? n({
                      promise: o,
                      reason: e,
                    })
                  : (r = a.console) && r.error && r.error('Unhandled promise rejection', e)
            })),
            (o._h = A || L(o) ? 2 : 1)),
          (o._a = void 0),
          i && t.e)
        )
          throw t.v
      })
    },
    L = function (t) {
      return 1 !== t._h && 0 === (t._a || t._c).length
    },
    C = function (n) {
      d.call(a, function () {
        var t
        A
          ? F.emit('rejectionHandled', n)
          : (t = a.onrejectionhandled) &&
            t({
              promise: n,
              reason: n._v,
            })
      })
    },
    G = function (t) {
      var n = this
      n._d ||
        ((n._d = !0), ((n = n._w || n)._v = t), (n._s = 2), n._a || (n._a = n._c.slice()), T(n, !0))
    },
    D = function (t) {
      var r,
        e = this
      if (!e._d) {
        ;((e._d = !0), (e = e._w || e))
        try {
          if (e === t) throw E("Promise can't be resolved itself")
          ;(r = j(t))
            ? x(function () {
                var n = {
                  _w: e,
                  _d: !1,
                }
                try {
                  r.call(t, f(D, n, 1), f(G, n, 1))
                } catch (t) {
                  G.call(n, t)
                }
              })
            : ((e._v = t), (e._s = 1), T(e, !1))
        } catch (t) {
          G.call(
            {
              _w: e,
              _d: !1,
            },
            t,
          )
        }
      }
    }
  ;(N ||
    ((P = function Promise(t) {
      ;(v(this, P, _, '_h'), p(t), e.call(this))
      try {
        t(f(D, this, 1), f(G, this, 1))
      } catch (t) {
        G.call(this, t)
      }
    }),
    ((e = function Promise(t) {
      ;((this._c = []),
        (this._a = void 0),
        (this._s = 0),
        (this._d = !1),
        (this._v = void 0),
        (this._h = 0),
        (this._n = !1))
    }).prototype = r(117)(P.prototype, {
      then: function then(t, n) {
        var r = k(g(this, P))
        return (
          (r.ok = 'function' != typeof t || t),
          (r.fail = 'function' == typeof n && n),
          (r.domain = A ? F.domain : void 0),
          this._c.push(r),
          this._a && this._a.push(r),
          this._s && T(this, !1),
          r.promise
        )
      },
      catch: function (t) {
        return this.then(void 0, t)
      },
    })),
    (o = function () {
      var t = new e()
      ;((this.promise = t), (this.resolve = f(D, t, 1)), (this.reject = f(G, t, 1)))
    }),
    (m.f = k =
      function (t) {
        return t === P || t === u ? new o(t) : i(t)
      })),
    l(l.G + l.W + l.F * !N, {
      Promise: P,
    }),
    r(124)(P, _),
    r(123)(_),
    (u = r(52)[_]),
    l(l.S + l.F * !N, _, {
      reject: function reject(t) {
        var n = k(this)
        return ((0, n.reject)(t), n.promise)
      },
    }),
    l(l.S + l.F * (c || !N), _, {
      resolve: function resolve(t) {
        return w(c && this === u ? P : this, t)
      },
    }),
    l(
      l.S +
        l.F *
          !(
            N &&
            r(86)(function (t) {
              P.all(t).catch(M)
            })
          ),
      _,
      {
        all: function all(t) {
          var u = this,
            n = k(u),
            c = n.resolve,
            a = n.reject,
            r = b(function () {
              var e = [],
                i = 0,
                o = 1
              ;(y(t, !1, function (t) {
                var n = i++,
                  r = !1
                ;(e.push(void 0),
                  o++,
                  u.resolve(t).then(function (t) {
                    r || ((r = !0), (e[n] = t), --o || c(e))
                  }, a))
              }),
                --o || c(e))
            })
          return (r.e && a(r.v), n.promise)
        },
        race: function race(t) {
          var n = this,
            r = k(n),
            e = r.reject,
            i = b(function () {
              y(t, !1, function (t) {
                n.resolve(t).then(r.resolve, e)
              })
            })
          return (i.e && e(i.v), r.promise)
        },
      },
    ))
}
