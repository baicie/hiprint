// browserify module 188
// deps: {
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62)
  e(e.S, 'Math', {
    clz32: function clz32(t) {
      return (t >>>= 0) ? 31 - Math.floor(Math.log(t + 0.5) * Math.LOG2E) : 32
    },
  })
}
