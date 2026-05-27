// browserify module 145
// deps: {
//   103: 103,
//   117: 117,
//   124: 124,
//   138: 138,
//   139: 139,
//   141: 141,
//   146: 146,
//   37: 37,
//   40: 40,
//   58: 58,
//   64: 64,
//   70: 70,
//   72: 72,
//   89: 89,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  var e = t(70),
    i = t(58),
    o = t(89),
    u = t(146),
    c = t(72),
    a = t(117),
    f = t(64),
    s = t(37),
    l = t(139),
    h = t(141),
    p = t(138),
    v = t(103).f,
    y = t(99).f,
    g = t(40),
    d = t(124),
    x = 'ArrayBuffer',
    m = 'DataView',
    b = 'prototype',
    S = 'Wrong index!',
    w = e[x],
    _ = e[m],
    E = e.Math,
    F = e.RangeError,
    I = e.Infinity,
    O = w,
    P = E.abs,
    A = E.pow,
    M = E.floor,
    k = E.log,
    N = E.LN2,
    j = 'byteLength',
    T = 'byteOffset',
    R = i ? '_b' : 'buffer',
    L = i ? '_l' : j,
    C = i ? '_o' : T
  function packIEEE754(t, n, r) {
    var e,
      i,
      o,
      u = new Array(r),
      c = 8 * r - n - 1,
      a = (1 << c) - 1,
      f = a >> 1,
      s = 23 === n ? A(2, -24) - A(2, -77) : 0,
      l = 0,
      h = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0
    for (
      (t = P(t)) != t || t === I
        ? ((i = t != t ? 1 : 0), (e = a))
        : ((e = M(k(t) / N)),
          t * (o = A(2, -e)) < 1 && (e--, (o *= 2)),
          2 <= (t += 1 <= e + f ? s / o : s * A(2, 1 - f)) * o && (e++, (o /= 2)),
          a <= e + f
            ? ((i = 0), (e = a))
            : 1 <= e + f
              ? ((i = (t * o - 1) * A(2, n)), (e += f))
              : ((i = t * A(2, f - 1) * A(2, n)), (e = 0)));
      8 <= n;
      u[l++] = 255 & i, i /= 256, n -= 8
    );
    for (e = (e << n) | i, c += n; 0 < c; u[l++] = 255 & e, e /= 256, c -= 8);
    return ((u[--l] |= 128 * h), u)
  }
  function unpackIEEE754(t, n, r) {
    var e,
      i = 8 * r - n - 1,
      o = (1 << i) - 1,
      u = o >> 1,
      c = i - 7,
      a = r - 1,
      f = t[a--],
      s = 127 & f
    for (f >>= 7; 0 < c; s = 256 * s + t[a], a--, c -= 8);
    for (e = s & ((1 << -c) - 1), s >>= -c, c += n; 0 < c; e = 256 * e + t[a], a--, c -= 8);
    if (0 === s) s = 1 - u
    else {
      if (s === o) return e ? NaN : f ? -I : I
      ;((e += A(2, n)), (s -= u))
    }
    return (f ? -1 : 1) * e * A(2, s - n)
  }
  function unpackI32(t) {
    return (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0]
  }
  function packI8(t) {
    return [255 & t]
  }
  function packI16(t) {
    return [255 & t, (t >> 8) & 255]
  }
  function packI32(t) {
    return [255 & t, (t >> 8) & 255, (t >> 16) & 255, (t >> 24) & 255]
  }
  function packF64(t) {
    return packIEEE754(t, 52, 8)
  }
  function packF32(t) {
    return packIEEE754(t, 23, 4)
  }
  function addGetter(t, n, r) {
    y(t[b], n, {
      get: function () {
        return this[r]
      },
    })
  }
  function get(t, n, r, e) {
    var i = p(+r)
    if (i + n > t[L]) throw F(S)
    var o = t[R]._b,
      u = i + t[C],
      c = o.slice(u, u + n)
    return e ? c : c.reverse()
  }
  function set(t, n, r, e, i, o) {
    var u = p(+r)
    if (u + n > t[L]) throw F(S)
    for (var c = t[R]._b, a = u + t[C], f = e(+i), s = 0; s < n; s++)
      c[a + s] = f[o ? s : n - s - 1]
  }
  if (u.ABV) {
    if (
      !f(function () {
        w(1)
      }) ||
      !f(function () {
        new w(-1)
      }) ||
      f(function () {
        return (new w(), new w(1.5), new w(NaN), w.name != x)
      })
    ) {
      for (
        var G,
          D = ((w = function ArrayBuffer(t) {
            return (s(this, w), new O(p(t)))
          })[b] = O[b]),
          U = v(O),
          W = 0;
        U.length > W;
      )
        (G = U[W++]) in w || c(w, G, O[G])
      o || (D.constructor = w)
    }
    var V = new _(new w(2)),
      B = _[b].setInt8
    ;(V.setInt8(0, 2147483648),
      V.setInt8(1, 2147483649),
      (!V.getInt8(0) && V.getInt8(1)) ||
        a(
          _[b],
          {
            setInt8: function setInt8(t, n) {
              B.call(this, t, (n << 24) >> 24)
            },
            setUint8: function setUint8(t, n) {
              B.call(this, t, (n << 24) >> 24)
            },
          },
          !0,
        ))
  } else
    ((w = function ArrayBuffer(t) {
      s(this, w, x)
      var n = p(t)
      ;((this._b = g.call(new Array(n), 0)), (this[L] = n))
    }),
      (_ = function DataView(t, n, r) {
        ;(s(this, _, m), s(t, w, m))
        var e = t[L],
          i = l(n)
        if (i < 0 || e < i) throw F('Wrong offset!')
        if (e < i + (r = void 0 === r ? e - i : h(r))) throw F('Wrong length!')
        ;((this[R] = t), (this[C] = i), (this[L] = r))
      }),
      i &&
        (addGetter(w, j, '_l'),
        addGetter(_, 'buffer', '_b'),
        addGetter(_, j, '_l'),
        addGetter(_, T, '_o')),
      a(_[b], {
        getInt8: function getInt8(t) {
          return (get(this, 1, t)[0] << 24) >> 24
        },
        getUint8: function getUint8(t) {
          return get(this, 1, t)[0]
        },
        getInt16: function getInt16(t) {
          var n = get(this, 2, t, arguments[1])
          return (((n[1] << 8) | n[0]) << 16) >> 16
        },
        getUint16: function getUint16(t) {
          var n = get(this, 2, t, arguments[1])
          return (n[1] << 8) | n[0]
        },
        getInt32: function getInt32(t) {
          return unpackI32(get(this, 4, t, arguments[1]))
        },
        getUint32: function getUint32(t) {
          return unpackI32(get(this, 4, t, arguments[1])) >>> 0
        },
        getFloat32: function getFloat32(t) {
          return unpackIEEE754(get(this, 4, t, arguments[1]), 23, 4)
        },
        getFloat64: function getFloat64(t) {
          return unpackIEEE754(get(this, 8, t, arguments[1]), 52, 8)
        },
        setInt8: function setInt8(t, n) {
          set(this, 1, t, packI8, n)
        },
        setUint8: function setUint8(t, n) {
          set(this, 1, t, packI8, n)
        },
        setInt16: function setInt16(t, n) {
          set(this, 2, t, packI16, n, arguments[2])
        },
        setUint16: function setUint16(t, n) {
          set(this, 2, t, packI16, n, arguments[2])
        },
        setInt32: function setInt32(t, n) {
          set(this, 4, t, packI32, n, arguments[2])
        },
        setUint32: function setUint32(t, n) {
          set(this, 4, t, packI32, n, arguments[2])
        },
        setFloat32: function setFloat32(t, n) {
          set(this, 4, t, packF32, n, arguments[2])
        },
        setFloat64: function setFloat64(t, n) {
          set(this, 8, t, packF64, n, arguments[2])
        },
      }))
  ;(d(w, x), d(_, m), c(_[b], u.VIEW, !0), (r[x] = w), (r[m] = _))
}
