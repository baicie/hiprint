// browserify module 265
// deps: {
//   137: 137,
//   62: 62
// }
export default function (t, n, r) {
  var e = t(62),
    o = t(137),
    u = String.fromCharCode,
    i = String.fromCodePoint
  e(e.S + e.F * (!!i && 1 != i.length), 'String', {
    fromCodePoint: function fromCodePoint(t) {
      for (var n, r = [], e = arguments.length, i = 0; i < e; ) {
        if (((n = +arguments[i++]), o(n, 1114111) !== n))
          throw RangeError(n + ' is not a valid code point')
        r.push(n < 65536 ? u(n) : u(55296 + ((n -= 65536) >> 10), (n % 1024) + 56320))
      }
      return r.join('')
    },
  })
}
