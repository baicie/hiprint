// browserify module 291
// deps: {
//   149: 149,
//   50: 50,
//   51: 51
// }
export default function (t, n, r) {
  'use strict'

  var e = t(50),
    i = t(149),
    o = 'WeakSet'
  t(51)(
    o,
    function (t) {
      return function WeakSet() {
        return t(this, 0 < arguments.length ? arguments[0] : void 0)
      }
    },
    {
      add: function add(t) {
        return e.def(i(this, o), t, !0)
      },
    },
    e,
    !1,
    !0,
  )
}
