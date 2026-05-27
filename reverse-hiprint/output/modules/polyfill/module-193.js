// browserify module 193
// deps: {
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  var e = t(62),
    i = Math.imul
  e(
    e.S +
      e.F *
        t(64)(function () {
          return -5 != i(4294967295, 5) || 2 != i.length
        }),
    'Math',
    {
      imul: function imul(t, n) {
        var r = 65535,
          e = +t,
          i = +n,
          o = r & e,
          u = r & i
        return 0 | (o * u + ((((r & (e >>> 16)) * u + o * (r & (i >>> 16))) << 16) >>> 0))
      },
    },
  )
}
