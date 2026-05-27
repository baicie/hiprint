// browserify module 244
// deps: {
//   38: 38,
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(38),
    o = Object.preventExtensions
  e(e.S, 'Reflect', {
    preventExtensions: function preventExtensions(t) {
      i(t)
      try {
        return (o && o(t), !0)
      } catch (t) {
        return !1
      }
    },
  })
}
