// webpack module 13
export default function (t, e, n) {
  'use strict'

  n.d(e, 'a', function () {
    return r
  })
  var i = n(11),
    o = n(5),
    r = (function () {
      function t() {
        this.id = i.a.createId()
      }
      return (
        (t.prototype.init = function (t, e, n) {
          ;((this.isHead = n),
            (this.target = e || $('<tr></tr>')),
            (this.tableOptions = t),
            this.initCells(this.columns))
        }),
        (t.prototype.getTarget = function () {
          return this.target
        }),
        (t.prototype.initCells = function (t) {
          var e = this
          t
            ? t.forEach(function (t, n) {
                t.init(e.target.find('td:eq(' + n + ')'), e.tableOptions, e.id, e.isHead)
              })
            : ((this.columns = []),
              this.target.find('td').map(function (t, n) {
                var i = new o.a()
                ;(i.init($(n), e.tableOptions, e.id, e.isHead), e.columns.push(i))
              }))
        }),
        (t.prototype.removeCell = function (t) {
          var e = this.columns.indexOf(t)
          ;(this.columns[e].getTarget().remove(), this.columns.splice(e, 1))
        }),
        (t.prototype.createTableCell = function (t, e) {
          var n = new o.a()
          return (
            n.init($('<td></td>'), this.tableOptions, this.id, this.isHead),
            t > 1 && (n.getTarget().attr('rowspan', t), (n.rowspan = t)),
            e > 1 && (n.getTarget().attr('colspan', e), (n.colspan = e)),
            n
          )
        }),
        (t.prototype.insertToTargetCellLeft = function (t, e) {
          var n = this.columns.indexOf(t)
          ;(t.getTarget().before(e.getTarget()), this.columns.splice(n, 0, e))
        }),
        (t.prototype.insertToTargetCellRight = function (t, e) {
          var n = this.columns.indexOf(t)
          ;(this.columns[n].getTarget().after(e.getTarget()), this.columns.splice(n + 1, 0, e))
        }),
        (t.prototype.insertCellToFirst = function (t) {
          ;(this.target.prepend(t.getTarget()), this.columns.splice(0, 0, t))
        }),
        (t.prototype.insertCellToLast = function (t) {
          ;(this.columns.push(t), this.target.append(t.getTarget()))
        }),
        (t.prototype.getPrintElementOptionEntity = function () {
          var t = []
          return (
            this.columns.forEach(function (e) {
              t.push(e.getEntity())
            }),
            t
          )
        }),
        t
      )
    })()
}
