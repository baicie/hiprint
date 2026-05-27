// browserify module 20
// deps: {
//   23: 23
// }
export default function (t, n, r) {
  n.exports = !t(23)(function () {
    return (
      7 !=
      Object.defineProperty({}, 'a', {
        get: function () {
          return 7
        },
      }).a
    )
  })
}
