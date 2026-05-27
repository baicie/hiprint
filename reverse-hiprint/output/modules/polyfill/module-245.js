// browserify module 245
// deps: {
//   122: 122,
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(122)
  i &&
    e(e.S, 'Reflect', {
      setPrototypeOf: function setPrototypeOf(t, n) {
        i.check(t, n)
        try {
          return (i.set(t, n), !0)
        } catch (t) {
          return !1
        }
      },
    })
}
