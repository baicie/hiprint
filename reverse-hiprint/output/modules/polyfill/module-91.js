// browserify module 91
// deps: {
//   93: 93
// }
export default function (t, n, r) {
  var o = t(93),
    e = Math.pow,
    u = e(2, -52),
    c = e(2, -23),
    a = e(2, 127) * (2 - c),
    f = e(2, -126)
  n.exports =
    Math.fround ||
    function fround(t) {
      var n,
        r,
        e = Math.abs(t),
        i = o(t)
      return e < f
        ? i * (e / f / c + 1 / u - 1 / u) * f * c
        : a < (r = (n = (1 + c / u) * e) - (n - e)) || r != r
          ? i * (1 / 0)
          : i * r
    }
}
