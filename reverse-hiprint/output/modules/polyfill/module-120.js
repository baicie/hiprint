// browserify module 120
// deps: {
//   66: 66
// }
export default function (t, n, r) {
  'use strict'

  var e,
    i,
    u = t(66),
    c = RegExp.prototype.exec,
    a = String.prototype.replace,
    o = c,
    f = 'lastIndex',
    s = ((e = /a/), (i = /b*/g), c.call(e, 'a'), c.call(i, 'a'), 0 !== e[f] || 0 !== i[f]),
    l = void 0 !== /()??/.exec('')[1]
  ;((s || l) &&
    (o = function exec(t) {
      var n,
        r,
        e,
        i,
        o = this
      return (
        l && (r = new RegExp('^' + o.source + '$(?!\\s)', u.call(o))),
        s && (n = o[f]),
        (e = c.call(o, t)),
        s && e && (o[f] = o.global ? e.index + e[0].length : n),
        l &&
          e &&
          1 < e.length &&
          a.call(e[0], r, function () {
            for (i = 1; i < arguments.length - 2; i++) void 0 === arguments[i] && (e[i] = void 0)
          }),
        e
      )
    }),
    (n.exports = o))
}
