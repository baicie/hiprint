// browserify module 305
// deps: {
//   148: 148,
//   62: 62,
//   70: 70
// }
export default function (t, n, r) {
  var e = t(70),
    i = t(62),
    o = t(148),
    u = [].slice,
    c = /MSIE .\./.test(o),
    a = function (i) {
      return function (t, n) {
        var r = 2 < arguments.length,
          e = !!r && u.call(arguments, 2)
        return i(
          r
            ? function () {
                ;('function' == typeof t ? t : Function(t)).apply(this, e)
              }
            : t,
          n,
        )
      }
    }
  i(i.G + i.B + i.F * c, {
    setTimeout: a(e.setTimeout),
    setInterval: a(e.setInterval),
  })
}
