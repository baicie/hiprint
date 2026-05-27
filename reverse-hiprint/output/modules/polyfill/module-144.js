// browserify module 144
// deps: {
//   101: 101,
//   103: 103,
//   105: 105,
//   116: 116,
//   117: 117,
//   123: 123,
//   127: 127,
//   137: 137,
//   138: 138,
//   139: 139,
//   141: 141,
//   142: 142,
//   143: 143,
//   145: 145,
//   146: 146,
//   147: 147,
//   152: 152,
//   153: 153,
//   164: 164,
//   37: 37,
//   39: 39,
//   40: 40,
//   41: 41,
//   42: 42,
//   47: 47,
//   54: 54,
//   58: 58,
//   62: 62,
//   64: 64,
//   70: 70,
//   71: 71,
//   72: 72,
//   78: 78,
//   81: 81,
//   86: 86,
//   88: 88,
//   89: 89,
//   98: 98,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  if (t(58)) {
    var d = t(89),
      x = t(70),
      m = t(64),
      b = t(62),
      S = t(146),
      e = t(145),
      h = t(54),
      w = t(37),
      i = t(116),
      _ = t(72),
      o = t(117),
      u = t(139),
      E = t(141),
      F = t(138),
      c = t(137),
      a = t(143),
      f = t(71),
      I = t(47),
      O = t(81),
      p = t(142),
      v = t(78),
      P = t(98),
      A = t(105),
      M = t(103).f,
      y = t(153),
      s = t(147),
      l = t(152),
      g = t(42),
      k = t(41),
      N = t(127),
      j = t(164),
      T = t(88),
      R = t(86),
      L = t(123),
      C = t(40),
      G = t(39),
      D = t(99),
      U = t(101),
      W = D.f,
      V = U.f,
      B = x.RangeError,
      z = x.TypeError,
      q = x.Uint8Array,
      Y = 'ArrayBuffer',
      K = 'Shared' + Y,
      $ = 'BYTES_PER_ELEMENT',
      J = 'prototype',
      X = Array[J],
      H = e.ArrayBuffer,
      Z = e.DataView,
      Q = g(0),
      tt = g(2),
      nt = g(3),
      rt = g(4),
      et = g(5),
      it = g(6),
      ot = k(!0),
      ut = k(!1),
      ct = j.values,
      at = j.keys,
      ft = j.entries,
      st = X.lastIndexOf,
      lt = X.reduce,
      ht = X.reduceRight,
      pt = X.join,
      vt = X.sort,
      yt = X.slice,
      gt = X.toString,
      dt = X.toLocaleString,
      xt = l('iterator'),
      mt = l('toStringTag'),
      bt = s('typed_constructor'),
      St = s('def_constructor'),
      wt = S.CONSTR,
      _t = S.TYPED,
      Et = S.VIEW,
      Ft = 'Wrong length!',
      It = g(1, function (t, n) {
        return kt(N(t, t[St]), n)
      }),
      Ot = m(function () {
        return 1 === new q(new Uint16Array([1]).buffer)[0]
      }),
      Pt =
        !!q &&
        !!q[J].set &&
        m(function () {
          new q(1).set({})
        }),
      At = function (t, n) {
        var r = u(t)
        if (r < 0 || r % n) throw B('Wrong offset!')
        return r
      },
      Mt = function (t) {
        if (O(t) && _t in t) return t
        throw z(t + ' is not a typed array!')
      },
      kt = function (t, n) {
        if (!(O(t) && bt in t)) throw z('It is not a typed array constructor!')
        return new t(n)
      },
      Nt = function (t, n) {
        return jt(N(t, t[St]), n)
      },
      jt = function (t, n) {
        for (var r = 0, e = n.length, i = kt(t, e); r < e; ) i[r] = n[r++]
        return i
      },
      Tt = function (t, n, r) {
        W(t, n, {
          get: function () {
            return this._d[r]
          },
        })
      },
      Rt = function from(t) {
        var n,
          r,
          e,
          i,
          o,
          u,
          c = p(t),
          a = arguments.length,
          f = 1 < a ? arguments[1] : void 0,
          s = void 0 !== f,
          l = y(c)
        if (null != l && !v(l)) {
          for (u = l.call(c), e = [], n = 0; !(o = u.next()).done; n++) e.push(o.value)
          c = e
        }
        for (
          s && 2 < a && (f = h(f, arguments[2], 2)), n = 0, r = E(c.length), i = kt(this, r);
          n < r;
          n++
        )
          i[n] = s ? f(c[n], n) : c[n]
        return i
      },
      Lt = function of() {
        for (var t = 0, n = arguments.length, r = kt(this, n); t < n; ) r[t] = arguments[t++]
        return r
      },
      Ct =
        !!q &&
        m(function () {
          dt.call(new q(1))
        }),
      Gt = function toLocaleString() {
        return dt.apply(Ct ? yt.call(Mt(this)) : Mt(this), arguments)
      },
      Dt = {
        copyWithin: function copyWithin(t, n) {
          return G.call(Mt(this), t, n, 2 < arguments.length ? arguments[2] : void 0)
        },
        every: function every(t) {
          return rt(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        fill: function fill(t) {
          return C.apply(Mt(this), arguments)
        },
        filter: function filter(t) {
          return Nt(this, tt(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0))
        },
        find: function find(t) {
          return et(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        findIndex: function findIndex(t) {
          return it(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        forEach: function forEach(t) {
          Q(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        indexOf: function indexOf(t) {
          return ut(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        includes: function includes(t) {
          return ot(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        join: function join(t) {
          return pt.apply(Mt(this), arguments)
        },
        lastIndexOf: function lastIndexOf(t) {
          return st.apply(Mt(this), arguments)
        },
        map: function map(t) {
          return It(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        reduce: function reduce(t) {
          return lt.apply(Mt(this), arguments)
        },
        reduceRight: function reduceRight(t) {
          return ht.apply(Mt(this), arguments)
        },
        reverse: function reverse() {
          for (var t, n = this, r = Mt(n).length, e = Math.floor(r / 2), i = 0; i < e; )
            ((t = n[i]), (n[i++] = n[--r]), (n[r] = t))
          return n
        },
        some: function some(t) {
          return nt(Mt(this), t, 1 < arguments.length ? arguments[1] : void 0)
        },
        sort: function sort(t) {
          return vt.call(Mt(this), t)
        },
        subarray: function subarray(t, n) {
          var r = Mt(this),
            e = r.length,
            i = c(t, e)
          return new (N(r, r[St]))(
            r.buffer,
            r.byteOffset + i * r.BYTES_PER_ELEMENT,
            E((void 0 === n ? e : c(n, e)) - i),
          )
        },
      },
      Ut = function slice(t, n) {
        return Nt(this, yt.call(Mt(this), t, n))
      },
      Wt = function set(t) {
        Mt(this)
        var n = At(arguments[1], 1),
          r = this.length,
          e = p(t),
          i = E(e.length),
          o = 0
        if (r < i + n) throw B(Ft)
        for (; o < i; ) this[n + o] = e[o++]
      },
      Vt = {
        entries: function entries() {
          return ft.call(Mt(this))
        },
        keys: function keys() {
          return at.call(Mt(this))
        },
        values: function values() {
          return ct.call(Mt(this))
        },
      },
      Bt = function (t, n) {
        return O(t) && t[_t] && 'symbol' != typeof n && n in t && String(+n) == String(n)
      },
      zt = function getOwnPropertyDescriptor(t, n) {
        return Bt(t, (n = a(n, !0))) ? i(2, t[n]) : V(t, n)
      },
      qt = function defineProperty(t, n, r) {
        return !(Bt(t, (n = a(n, !0))) && O(r) && f(r, 'value')) ||
          f(r, 'get') ||
          f(r, 'set') ||
          r.configurable ||
          (f(r, 'writable') && !r.writable) ||
          (f(r, 'enumerable') && !r.enumerable)
          ? W(t, n, r)
          : ((t[n] = r.value), t)
      }
    ;(wt || ((U.f = zt), (D.f = qt)),
      b(b.S + b.F * !wt, 'Object', {
        getOwnPropertyDescriptor: zt,
        defineProperty: qt,
      }),
      m(function () {
        gt.call({})
      }) &&
        (gt = dt =
          function toString() {
            return pt.call(this)
          }))
    var Yt = o({}, Dt)
    ;(o(Yt, Vt),
      _(Yt, xt, Vt.values),
      o(Yt, {
        slice: Ut,
        set: Wt,
        constructor: function () {},
        toString: gt,
        toLocaleString: Gt,
      }),
      Tt(Yt, 'buffer', 'b'),
      Tt(Yt, 'byteOffset', 'o'),
      Tt(Yt, 'byteLength', 'l'),
      Tt(Yt, 'length', 'e'),
      W(Yt, mt, {
        get: function () {
          return this[_t]
        },
      }),
      (n.exports = function (t, l, n, o) {
        var h = t + ((o = !!o) ? 'Clamped' : '') + 'Array',
          r = 'get' + t,
          u = 'set' + t,
          p = x[h],
          c = p || {},
          e = p && A(p),
          i = !p || !S.ABV,
          a = {},
          f = p && p[J],
          v = function (t, i) {
            W(t, i, {
              get: function () {
                return ((t = i), (n = this._d).v[r](t * l + n.o, Ot))
                var t, n
              },
              set: function (t) {
                return (
                  (n = i),
                  (r = t),
                  (e = this._d),
                  o && (r = (r = Math.round(r)) < 0 ? 0 : 255 < r ? 255 : 255 & r),
                  void e.v[u](n * l + e.o, r, Ot)
                )
                var n, r, e
              },
              enumerable: !0,
            })
          }
        i
          ? ((p = n(function (t, n, r, e) {
              w(t, p, h, '_d')
              var i,
                o,
                u,
                c,
                a = 0,
                f = 0
              if (O(n)) {
                if (!(n instanceof H || (c = I(n)) == Y || c == K))
                  return _t in n ? jt(p, n) : Rt.call(p, n)
                ;((i = n), (f = At(r, l)))
                var s = n.byteLength
                if (void 0 === e) {
                  if (s % l) throw B(Ft)
                  if ((o = s - f) < 0) throw B(Ft)
                } else if (s < (o = E(e) * l) + f) throw B(Ft)
                u = o / l
              } else ((u = F(n)), (i = new H((o = u * l))))
              for (
                _(t, '_d', {
                  b: i,
                  o: f,
                  l: o,
                  e: u,
                  v: new Z(i),
                });
                a < u;
              )
                v(t, a++)
            })),
            (f = p[J] = P(Yt)),
            _(f, 'constructor', p))
          : (m(function () {
              p(1)
            }) &&
              m(function () {
                new p(-1)
              }) &&
              R(function (t) {
                ;(new p(), new p(null), new p(1.5), new p(t))
              }, !0)) ||
            ((p = n(function (t, n, r, e) {
              var i
              return (
                w(t, p, h),
                O(n)
                  ? n instanceof H || (i = I(n)) == Y || i == K
                    ? void 0 !== e
                      ? new c(n, At(r, l), e)
                      : void 0 !== r
                        ? new c(n, At(r, l))
                        : new c(n)
                    : _t in n
                      ? jt(p, n)
                      : Rt.call(p, n)
                  : new c(F(n))
              )
            })),
            Q(e !== Function.prototype ? M(c).concat(M(e)) : M(c), function (t) {
              t in p || _(p, t, c[t])
            }),
            (p[J] = f),
            d || (f.constructor = p))
        var s = f[xt],
          y = !!s && ('values' == s.name || null == s.name),
          g = Vt.values
        ;(_(p, bt, !0),
          _(f, _t, h),
          _(f, Et, !0),
          _(f, St, p),
          (o ? new p(1)[mt] == h : mt in f) ||
            W(f, mt, {
              get: function () {
                return h
              },
            }),
          (a[h] = p),
          b(b.G + b.W + b.F * (p != c), a),
          b(b.S, h, {
            BYTES_PER_ELEMENT: l,
          }),
          b(
            b.S +
              b.F *
                m(function () {
                  c.of.call(p, 1)
                }),
            h,
            {
              from: Rt,
              of: Lt,
            },
          ),
          $ in f || _(f, $, l),
          b(b.P, h, Dt),
          L(h),
          b(b.P + b.F * Pt, h, {
            set: Wt,
          }),
          b(b.P + b.F * !y, h, Vt),
          d || f.toString == gt || (f.toString = gt),
          b(
            b.P +
              b.F *
                m(function () {
                  new p(1).slice()
                }),
            h,
            {
              slice: Ut,
            },
          ),
          b(
            b.P +
              b.F *
                (m(function () {
                  return [1, 2].toLocaleString() != new p([1, 2]).toLocaleString()
                }) ||
                  !m(function () {
                    f.toLocaleString.call([1, 2])
                  })),
            h,
            {
              toLocaleString: Gt,
            },
          ),
          (T[h] = y ? s : g),
          d || y || _(f, xt, g))
      }))
  } else n.exports = function () {}
}
