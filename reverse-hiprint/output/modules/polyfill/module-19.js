// browserify module 19
// deps: {
//   16: 16
// }
export default function (t, n, r) {
  var o = t(16)
  n.exports = function (e, i, t) {
    if ((o(e), void 0 === i)) return e
    switch (t) {
      case 1:
        return function (t) {
          return e.call(i, t)
        }
      case 2:
        return function (t, n) {
          return e.call(i, t, n)
        }
      case 3:
        return function (t, n, r) {
          return e.call(i, t, n, r)
        }
    }
    return function () {
      return e.apply(i, arguments)
    }
  }
}
