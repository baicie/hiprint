// browserify module 295
// deps: {
//   101: 101,
//   111: 111,
//   140: 140,
//   53: 53,
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    a = t(111),
    f = t(140),
    s = t(101),
    l = t(53)
  e(e.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
      for (var n, r, e = f(t), i = s.f, o = a(e), u = {}, c = 0; o.length > c; )
        void 0 !== (r = i(e, (n = o[c++]))) && l(u, n, r)
      return u
    },
  })
}
