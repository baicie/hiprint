// browserify module 66
// deps: {
//   38: 38
// }
export default function (t, n, r) {
  'use strict'

  var e = t(38)
  n.exports = function () {
    var t = e(this),
      n = ''
    return (
      t.global && (n += 'g'),
      t.ignoreCase && (n += 'i'),
      t.multiline && (n += 'm'),
      t.unicode && (n += 'u'),
      t.sticky && (n += 'y'),
      n
    )
  }
}
