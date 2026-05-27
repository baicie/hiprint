// browserify module 23
// deps: {}
export default function (t, n, r) {
  n.exports = function (t) {
    try {
      return !!t()
    } catch (t) {
      return !0
    }
  }
}
