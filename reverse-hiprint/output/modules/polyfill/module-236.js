// browserify module 236
// deps: {
//   101: 101,
//   38: 38,
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(101).f,
    o = t(38)
  e(e.S, 'Reflect', {
    deleteProperty: function deleteProperty(t, n) {
      var r = i(o(t), n)
      return !(r && !r.configurable) && delete t[n]
    },
  })
}
