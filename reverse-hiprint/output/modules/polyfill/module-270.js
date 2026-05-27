// browserify module 270
// deps: {
//   140: 140,
//   141: 141,
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    u = t(140),
    c = t(141)
  e(e.S, 'String', {
    raw: function raw(t) {
      for (var n = u(t.raw), r = c(n.length), e = arguments.length, i = [], o = 0; o < r; )
        (i.push(String(n[o++])), o < e && i.push(String(arguments[o])))
      return i.join('')
    },
  })
}
