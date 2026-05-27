// browserify module 290
// deps: {
//   118: 118,
//   149: 149,
//   42: 42,
//   50: 50,
//   51: 51,
//   70: 70,
//   81: 81,
//   94: 94,
//   97: 97
// }
export default function (t, n, r) {
  'use strict'

  var o,
    e = t(70),
    i = t(42)(0),
    u = t(118),
    c = t(94),
    a = t(97),
    f = t(50),
    s = t(81),
    l = t(149),
    h = t(149),
    p = !e.ActiveXObject && 'ActiveXObject' in e,
    v = 'WeakMap',
    y = c.getWeak,
    g = Object.isExtensible,
    d = f.ufstore,
    x = function (t) {
      return function WeakMap() {
        return t(this, 0 < arguments.length ? arguments[0] : void 0)
      }
    },
    m = {
      get: function get(t) {
        if (s(t)) {
          var n = y(t)
          return !0 === n ? d(l(this, v)).get(t) : n ? n[this._i] : void 0
        }
      },
      set: function set(t, n) {
        return f.def(l(this, v), t, n)
      },
    },
    b = (n.exports = t(51)(v, x, m, f, !0, !0))
  h &&
    p &&
    (a((o = f.getConstructor(x, v)).prototype, m),
    (c.NEED = !0),
    i(['delete', 'has', 'get', 'set'], function (e) {
      var t = b.prototype,
        i = t[e]
      u(t, e, function (t, n) {
        if (!s(t) || g(t)) return i.call(this, t, n)
        this._f || (this._f = new o())
        var r = this._f[e](t, n)
        return 'set' == e ? this : r
      })
    }))
}
