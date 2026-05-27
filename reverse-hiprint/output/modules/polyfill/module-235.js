// browserify module 235
// deps: {
//   143: 143,
//   38: 38,
//   62: 62,
//   64: 64,
//   99: 99
// }
export default function (t, n, r) {
  var e = t(99),
    i = t(62),
    o = t(38),
    u = t(143)
  i(
    i.S +
      i.F *
        t(64)(function () {
          Reflect.defineProperty(
            e.f({}, 1, {
              value: 1,
            }),
            1,
            {
              value: 2,
            },
          )
        }),
    'Reflect',
    {
      defineProperty: function defineProperty(t, n, r) {
        ;(o(t), (n = u(n, !0)), o(r))
        try {
          return (e.f(t, n, r), !0)
        } catch (t) {
          return !1
        }
      },
    },
  )
}
