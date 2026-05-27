// browserify module 233
// deps: {
//   33: 33,
//   38: 38,
//   62: 62,
//   64: 64,
//   70: 70
// }
export default function (t, n, r) {
  var e = t(62),
    o = t(33),
    u = t(38),
    c = (t(70).Reflect || {}).apply,
    a = Function.apply
  e(
    e.S +
      e.F *
        !t(64)(function () {
          c(function () {})
        }),
    'Reflect',
    {
      apply: function apply(t, n, r) {
        var e = o(t),
          i = u(r)
        return c ? c(e, n, i) : a.call(e, n, i)
      },
    },
  )
}
