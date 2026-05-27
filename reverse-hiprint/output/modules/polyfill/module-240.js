// browserify module 240
// deps: {
//   101: 101,
//   105: 105,
//   38: 38,
//   62: 62,
//   71: 71,
//   81: 81
// }
export default function (t, n, r) {
  var o = t(101),
    u = t(105),
    c = t(71),
    e = t(62),
    a = t(81),
    f = t(38)
  e(e.S, 'Reflect', {
    get: function get(t, n) {
      var r,
        e,
        i = arguments.length < 3 ? t : arguments[2]
      return f(t) === i
        ? t[n]
        : (r = o.f(t, n))
          ? c(r, 'value')
            ? r.value
            : void 0 !== r.get
              ? r.get.call(i)
              : void 0
          : a((e = u(t)))
            ? get(e, n, i)
            : void 0
    },
  })
}
