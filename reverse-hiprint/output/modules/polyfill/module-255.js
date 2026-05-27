// browserify module 255
// deps: {
//   149: 149,
//   49: 49,
//   51: 51
// }
export default function (t, n, r) {
  'use strict'

  var e = t(49),
    i = t(149)
  n.exports = t(51)(
    'Set',
    function (t) {
      return function Set() {
        return t(this, 0 < arguments.length ? arguments[0] : void 0)
      }
    },
    {
      add: function add(t) {
        return e.def(i(this, 'Set'), (t = 0 === t ? 0 : t), t)
      },
    },
    e,
  )
}
