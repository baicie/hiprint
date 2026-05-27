// browserify module 278
// deps: {
//   101: 101,
//   102: 102,
//   103: 103,
//   104: 104,
//   107: 107,
//   108: 108,
//   116: 116,
//   118: 118,
//   124: 124,
//   126: 126,
//   140: 140,
//   143: 143,
//   147: 147,
//   150: 150,
//   151: 151,
//   152: 152,
//   38: 38,
//   58: 58,
//   61: 61,
//   62: 62,
//   64: 64,
//   70: 70,
//   71: 71,
//   72: 72,
//   79: 79,
//   81: 81,
//   89: 89,
//   94: 94,
//   98: 98,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  var e = t(70),
    u = t(71),
    i = t(58),
    o = t(62),
    c = t(118),
    a = t(94).KEY,
    f = t(64),
    s = t(126),
    l = t(124),
    h = t(147),
    p = t(152),
    v = t(151),
    y = t(150),
    g = t(61),
    d = t(79),
    x = t(38),
    m = t(81),
    b = t(140),
    S = t(143),
    w = t(116),
    _ = t(98),
    E = t(102),
    F = t(101),
    I = t(99),
    O = t(107),
    P = F.f,
    A = I.f,
    M = E.f,
    k = e.Symbol,
    N = e.JSON,
    j = N && N.stringify,
    T = 'prototype',
    R = p('_hidden'),
    L = p('toPrimitive'),
    C = {}.propertyIsEnumerable,
    G = s('symbol-registry'),
    D = s('symbols'),
    U = s('op-symbols'),
    W = Object[T],
    V = 'function' == typeof k,
    B = e.QObject,
    z = !B || !B[T] || !B[T].findChild,
    q =
      i &&
      f(function () {
        return (
          7 !=
          _(
            A({}, 'a', {
              get: function () {
                return A(this, 'a', {
                  value: 7,
                }).a
              },
            }),
          ).a
        )
      })
        ? function (t, n, r) {
            var e = P(W, n)
            ;(e && delete W[n], A(t, n, r), e && t !== W && A(W, n, e))
          }
        : A,
    Y = function (t) {
      var n = (D[t] = _(k[T]))
      return ((n._k = t), n)
    },
    K =
      V && 'symbol' == typeof k.iterator
        ? function (t) {
            return 'symbol' == typeof t
          }
        : function (t) {
            return t instanceof k
          },
    $ = function defineProperty(t, n, r) {
      return (
        t === W && $(U, n, r),
        x(t),
        (n = S(n, !0)),
        x(r),
        u(D, n)
          ? (r.enumerable
              ? (u(t, R) && t[R][n] && (t[R][n] = !1),
                (r = _(r, {
                  enumerable: w(0, !1),
                })))
              : (u(t, R) || A(t, R, w(1, {})), (t[R][n] = !0)),
            q(t, n, r))
          : A(t, n, r)
      )
    },
    J = function defineProperties(t, n) {
      x(t)
      for (var r, e = g((n = b(n))), i = 0, o = e.length; i < o; ) $(t, (r = e[i++]), n[r])
      return t
    },
    X = function propertyIsEnumerable(t) {
      var n = C.call(this, (t = S(t, !0)))
      return (
        !(this === W && u(D, t) && !u(U, t)) &&
        (!(n || !u(this, t) || !u(D, t) || (u(this, R) && this[R][t])) || n)
      )
    },
    H = function getOwnPropertyDescriptor(t, n) {
      if (((t = b(t)), (n = S(n, !0)), t !== W || !u(D, n) || u(U, n))) {
        var r = P(t, n)
        return (!r || !u(D, n) || (u(t, R) && t[R][n]) || (r.enumerable = !0), r)
      }
    },
    Z = function getOwnPropertyNames(t) {
      for (var n, r = M(b(t)), e = [], i = 0; r.length > i; )
        u(D, (n = r[i++])) || n == R || n == a || e.push(n)
      return e
    },
    Q = function getOwnPropertySymbols(t) {
      for (var n, r = t === W, e = M(r ? U : b(t)), i = [], o = 0; e.length > o; )
        !u(D, (n = e[o++])) || (r && !u(W, n)) || i.push(D[n])
      return i
    }
  ;(V ||
    (c(
      (k = function Symbol() {
        if (this instanceof k) throw TypeError('Symbol is not a constructor!')
        var n = h(0 < arguments.length ? arguments[0] : void 0),
          r = function (t) {
            ;(this === W && r.call(U, t),
              u(this, R) && u(this[R], n) && (this[R][n] = !1),
              q(this, n, w(1, t)))
          }
        return (
          i &&
            z &&
            q(W, n, {
              configurable: !0,
              set: r,
            }),
          Y(n)
        )
      })[T],
      'toString',
      function toString() {
        return this._k
      },
    ),
    (F.f = H),
    (I.f = $),
    (t(103).f = E.f = Z),
    (t(108).f = X),
    (t(104).f = Q),
    i && !t(89) && c(W, 'propertyIsEnumerable', X, !0),
    (v.f = function (t) {
      return Y(p(t))
    })),
    o(o.G + o.W + o.F * !V, {
      Symbol: k,
    }))
  for (
    var tt =
        'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
          ',',
        ),
      nt = 0;
    tt.length > nt;
  )
    p(tt[nt++])
  for (var rt = O(p.store), et = 0; rt.length > et; ) y(rt[et++])
  ;(o(o.S + o.F * !V, 'Symbol', {
    for: function (t) {
      return u(G, (t += '')) ? G[t] : (G[t] = k(t))
    },
    keyFor: function keyFor(t) {
      if (!K(t)) throw TypeError(t + ' is not a symbol!')
      for (var n in G) if (G[n] === t) return n
    },
    useSetter: function () {
      z = !0
    },
    useSimple: function () {
      z = !1
    },
  }),
    o(o.S + o.F * !V, 'Object', {
      create: function create(t, n) {
        return void 0 === n ? _(t) : J(_(t), n)
      },
      defineProperty: $,
      defineProperties: J,
      getOwnPropertyDescriptor: H,
      getOwnPropertyNames: Z,
      getOwnPropertySymbols: Q,
    }),
    N &&
      o(
        o.S +
          o.F *
            (!V ||
              f(function () {
                var t = k()
                return (
                  '[null]' != j([t]) ||
                  '{}' !=
                    j({
                      a: t,
                    }) ||
                  '{}' != j(Object(t))
                )
              })),
        'JSON',
        {
          stringify: function stringify(t) {
            for (var n, r, e = [t], i = 1; arguments.length > i; ) e.push(arguments[i++])
            if (((r = n = e[1]), (m(n) || void 0 !== t) && !K(t)))
              return (
                d(n) ||
                  (n = function (t, n) {
                    if (('function' == typeof r && (n = r.call(this, t, n)), !K(n))) return n
                  }),
                (e[1] = n),
                j.apply(N, e)
              )
          },
        },
      ),
    k[T][L] || t(72)(k[T], L, k[T].valueOf),
    l(k, 'Symbol'),
    l(Math, 'Math', !0),
    l(e.JSON, 'JSON', !0))
}
