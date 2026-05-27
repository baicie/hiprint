// browserify module 242
// deps: {
//   38: 38,
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(38),
    o = Object.isExtensible
  e(e.S, 'Reflect', {
    isExtensible: function isExtensible(t) {
      return (i(t), !o || o(t))
    },
  })
}
