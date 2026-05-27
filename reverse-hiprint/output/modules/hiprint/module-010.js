// webpack module 10
export default function (t, e, n) {
  'use strict'

  ;(n.d(e, 'a', function () {
    return o
  }),
    n.d(e, 'b', function () {
      return r
    }))
  var i = n(14),
    o = (function () {
      function t(t, e) {
        ;((this.selectedCells = []), (this.rows = t), (this.tableTatget = e))
      }
      return (
        (t.prototype.clear = function () {
          this.tableTatget.find('td').removeClass('selected')
        }),
        (t.prototype.setSingleSelect = function (t) {
          ;((this.startCell = t), (this.selectedCells = []))
        }),
        (t.prototype.getSingleSelect = function () {
          if (this.selectedCells.length) {
            if (1 == this.selectedCells.length)
              return 1 == this.selectedCells[0].length ? this.selectedCells[0][0] : void 0
            if (this.selectedCells.length > 1) return
          }
          return this.startCell
        }),
        (t.prototype.singleSelectByXY = function (t, e) {
          var n = this.getCellByXY(t, e)
          n &&
            (this.clear(), n && (n.cell.select(), (this.startCell = n), (this.selectedCells = [])))
        }),
        (t.prototype.multipleSelectByXY = function (t, e) {
          this.clear()
          var n = []
          if (this.startCell) {
            var o = this.getCellByXY(t, e)
            if (o) {
              var r = i.a.mergeRect(this.startCell.cell.getTableRect(), o.cell.getTableRect())
              this.selectByRect(new a(r), n)
            }
          }
          this.selectedCells = n
        }),
        (t.prototype.selectByRect = function (t, e) {
          ;(this.rows.forEach(function (n, i) {
            var o = []
            ;(n.columns.forEach(function (e) {
              e.isInRect(t) && (o.push(new p(i, e)), e.select())
            }),
              o.length && e.push(o))
          }),
            t.changed && ((t.changed = !1), e.splice(0, e.length), this.selectByRect(t, e)))
        }),
        (t.prototype.getSelectedCells = function () {
          return this.selectedCells
        }),
        (t.prototype.getCellByXY = function (t, e) {
          var n
          return (
            this.rows.forEach(function (i, o) {
              var r = i.columns.filter(function (n) {
                return n.isXYinCell(t, e)
              })
              r.length && (n = new p(o, r[0]))
            }),
            n
          )
        }),
        t
      )
    })(),
    r = (function () {
      return function (t) {
        ;((this.x = t.x), (this.y = t.y), (this.height = t.height), (this.width = t.width))
      }
    })(),
    a = (function () {
      return function (t) {
        this.rect = t
      }
    })(),
    p = (function () {
      return function (t, e) {
        ;((this.rowIndex = t), (this.cell = e))
      }
    })()
}
