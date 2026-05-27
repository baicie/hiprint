// browserify module 121
// deps: {}
export default function (t, n, r) {
  n.exports =
    Object.is ||
    function is(t, n) {
      return t === n ? 0 !== t || 1 / t == 1 / n : t != t && n != n
    }
}
