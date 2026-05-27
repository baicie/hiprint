// browserify module 114
// deps: {}
export default function (t, n, r) {
  n.exports = function (t) {
    try {
      return {
        e: !1,
        v: t(),
      }
    } catch (t) {
      return {
        e: !0,
        v: t,
      }
    }
  }
}
