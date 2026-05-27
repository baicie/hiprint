// browserify module 183
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
    'Map',
    function (t) {
      return function Map() {
        return t(this, 0 < arguments.length ? arguments[0] : void 0)
      }
    },
    {
      get: function get(t) {
        var n = e.getEntry(i(this, 'Map'), t)
        return n && n.v
      },
      set: function set(t, n) {
        return e.def(i(this, 'Map'), 0 === t ? 0 : t, n)
      },
    },
    e,
    !0,
  )
}
