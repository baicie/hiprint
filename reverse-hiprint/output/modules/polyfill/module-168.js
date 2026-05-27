// browserify module 168
// deps: {
//   53: 53,
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(53)
  e(
    e.S +
      e.F *
        t(64)(function () {
          function F() {}
          return !(Array.of.call(F) instanceof F)
        }),
    'Array',
    {
      of: function of() {
        for (
          var t = 0, n = arguments.length, r = new ('function' == typeof this ? this : Array)(n);
          t < n;
        )
          i(r, t, arguments[t++])
        return ((r.length = n), r)
      },
    },
  )
}
