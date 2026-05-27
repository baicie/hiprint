// browserify module 206
// deps: {
//   62: 62,
//   80: 80
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(80),
    o = Math.abs
  e(e.S, 'Number', {
    isSafeInteger: function isSafeInteger(t) {
      return i(t) && o(t) <= 9007199254740991
    },
  })
}
