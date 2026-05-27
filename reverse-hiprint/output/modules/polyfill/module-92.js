// browserify module 92
// deps: {}
export default function (t, n, r) {
  n.exports =
    Math.log1p ||
    function log1p(t) {
      return -1e-8 < (t = +t) && t < 1e-8 ? t - (t * t) / 2 : Math.log(1 + t)
    }
}
