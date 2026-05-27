// browserify module 192
// deps: {
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    a = Math.abs
  e(e.S, 'Math', {
    hypot: function hypot(t, n) {
      for (var r, e, i = 0, o = 0, u = arguments.length, c = 0; o < u; )
        c < (r = a(arguments[o++]))
          ? ((i = i * (e = c / r) * e + 1), (c = r))
          : (i += 0 < r ? (e = r / c) * e : r)
      return c === 1 / 0 ? 1 / 0 : c * Math.sqrt(i)
    },
  })
}
