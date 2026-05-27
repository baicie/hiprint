// browserify module 27
// deps: {
//   20: 20,
//   21: 21,
//   23: 23
// }
export default function (t, n, r) {
  n.exports =
    !t(20) &&
    !t(23)(function () {
      return (
        7 !=
        Object.defineProperty(t(21)('div'), 'a', {
          get: function () {
            return 7
          },
        }).a
      )
    })
}
