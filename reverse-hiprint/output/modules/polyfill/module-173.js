// browserify module 173
// deps: {
//   128: 128,
//   142: 142,
//   33: 33,
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(33),
    o = t(142),
    u = t(64),
    c = [].sort,
    a = [1, 2, 3]
  e(
    e.P +
      e.F *
        (u(function () {
          a.sort(void 0)
        }) ||
          !u(function () {
            a.sort(null)
          }) ||
          !t(128)(c)),
    'Array',
    {
      sort: function sort(t) {
        return void 0 === t ? c.call(o(this)) : c.call(o(this), i(t))
      },
    },
  )
}
