// browserify module 29
// deps: {
//   17: 17,
//   20: 20,
//   27: 27,
//   31: 31
// }
export default function (t, n, r) {
  var e = t(17),
    i = t(27),
    o = t(31),
    u = Object.defineProperty
  r.f = t(20)
    ? Object.defineProperty
    : function defineProperty(t, n, r) {
        if ((e(t), (n = o(n, !0)), e(r), i))
          try {
            return u(t, n, r)
          } catch (t) {}
        if ('get' in r || 'set' in r) throw TypeError('Accessors not supported!')
        return ('value' in r && (t[n] = r.value), t)
      }
}
