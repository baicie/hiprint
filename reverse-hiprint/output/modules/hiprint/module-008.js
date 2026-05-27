// webpack module 8
export default function (t, e, n) {
  'use strict'

  n.d(e, 'a', function () {
    return i
  })
  var i = (function () {
    function t(t) {
      ;((this.top = t.top),
        (this.left = t.left),
        (this.height = t.height),
        (this.width = t.width),
        (this.bottomInLastPaper = t.bottomInLastPaper),
        (this.beginPrintPaperIndex = t.beginPrintPaperIndex),
        (this.printTopInPaper = t.printTopInPaper),
        (this.endPrintPaperIndex = t.endPrintPaperIndex))
    }
    return (
      (t.prototype.isPositionLeftOrRight = function (t) {
        return this.top <= t && this.top + this.height > t
      }),
      t
    )
  })()
}
