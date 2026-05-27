// browserify module 177
// deps: {
//   142: 142,
//   143: 143,
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(142),
    o = t(143)
  e(
    e.P +
      e.F *
        t(64)(function () {
          return (
            null !== new Date(NaN).toJSON() ||
            1 !==
              Date.prototype.toJSON.call({
                toISOString: function () {
                  return 1
                },
              })
          )
        }),
    'Date',
    {
      toJSON: function toJSON(t) {
        var n = i(this),
          r = o(n)
        return 'number' != typeof r || isFinite(r) ? n.toISOString() : null
      },
    },
  )
}
