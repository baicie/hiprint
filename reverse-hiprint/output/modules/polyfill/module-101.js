// browserify module 101
// deps: {
//   108: 108,
//   116: 116,
//   140: 140,
//   143: 143,
//   58: 58,
//   71: 71,
//   74: 74
// }
export default function (t, n, r) {
  var e = t(108),
    i = t(116),
    o = t(140),
    u = t(143),
    c = t(71),
    a = t(74),
    f = Object.getOwnPropertyDescriptor
  r.f = t(58)
    ? f
    : function getOwnPropertyDescriptor(t, n) {
        if (((t = o(t)), (n = u(n, !0)), a))
          try {
            return f(t, n)
          } catch (t) {}
        if (c(t, n)) return i(!e.f.call(t, n), t[n])
      }
}
