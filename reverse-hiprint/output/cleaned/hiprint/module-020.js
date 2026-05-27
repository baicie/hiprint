// webpack module 20
export default function (t, e, n) {
  'use strict'

  n.d(e, 'a', function () {
    return i
  })
  var i = (function () {
    function t(t, e) {
      ;((this.gridColumns = t), (this.target = e))
    }
    return (
      (t.prototype.getByIndex = function (t) {
        return this.target.find('.hi-grid-col:eq(' + t + ')')
      }),
      t
    )
  })()
}
