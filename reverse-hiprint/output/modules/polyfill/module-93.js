// browserify module 93
// deps: {}
export default function (t, n, r) {
  n.exports =
    Math.sign ||
    function sign(t) {
      return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1
    }
}
