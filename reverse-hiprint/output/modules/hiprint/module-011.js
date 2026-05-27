// webpack module 11
export default function (t, e, n) {
  'use strict'

  n.d(e, 'a', function () {
    return i
  })
  var i = (function () {
    function t() {}
    return (
      (t.createId = function () {
        return ((this.id += 1), this.id)
      }),
      (t.id = 1),
      t
    )
  })()
}
