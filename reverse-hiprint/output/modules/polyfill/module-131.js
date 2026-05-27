// browserify module 131
// deps: {
//   57: 57,
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  var e = t(62),
    i = t(64),
    u = t(57),
    c = /"/g,
    o = function (t, n, r, e) {
      var i = String(u(t)),
        o = '<' + n
      return (
        '' !== r && (o += ' ' + r + '="' + String(e).replace(c, '&quot;') + '"'),
        o + '>' + i + '</' + n + '>'
      )
    }
  n.exports = function (n, t) {
    var r = {}
    ;((r[n] = t(o)),
      e(
        e.P +
          e.F *
            i(function () {
              var t = ''[n]('"')
              return t !== t.toLowerCase() || 3 < t.split('"').length
            }),
        'String',
        r,
      ))
  }
}
