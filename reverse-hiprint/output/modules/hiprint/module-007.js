// webpack module 7
export default function (module, __webpack_exports__, __webpack_require__) {
  'use strict'

  __webpack_require__.d(__webpack_exports__, 'a', function () {
    return TableExcelHelper
  })
  var _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
    TableExcelHelper = (function () {
      function TableExcelHelper() {}
      return (
        (TableExcelHelper.createTableHead = function (t, e) {
          for (
            var n = TableExcelHelper.reconsitutionTableColumnTree(t),
              i = $('<thead></thead>'),
              o = TableExcelHelper.getColumnsWidth(n, e),
              r = function r(t) {
                var e = $('<tr></tr>')
                ;(n[t].forEach(function (t) {
                  var n = $('<td></td>')
                  ;(t.id && n.attr('id', t.id),
                    t.columnId && n.attr('column-id', t.columnId),
                    (t.align || t.halign) && n.css('text-align', t.halign || t.align),
                    t.vAlign && n.css('vertical-align', t.vAlign),
                    t.colspan > 1 && n.attr('colspan', t.colspan),
                    t.rowspan > 1 && n.attr('rowspan', t.rowspan),
                    n.html(t.title),
                    o[t.id]
                      ? ((t.hasWidth = !0),
                        (t.targetWidth = o[t.id]),
                        n.attr('haswidth', 'haswidth'),
                        n.css('width', o[t.id] + 'pt'))
                      : (t.hasWidth = !1),
                    e.append(n))
                }),
                  i.append(e))
              },
              a = 0;
            a < n.totalLayer;
            a++
          ) {
            r(a)
          }
          return (TableExcelHelper.syncTargetWidthToOption(t), i)
        }),
        (TableExcelHelper.createTableFooter = function (t, e, n, i, o, r) {
          var a = $('<tfoot></tfoot>'),
            p = this.getFooterFormatter(n, i)
          return (p && a.append(p(n, e, o, r)), a)
        }),
        (TableExcelHelper.createTableRow = function (t, e, n, i) {
          var o = TableExcelHelper.reconsitutionTableColumnTree(t),
            r = $('<tbody></tbody>')
          ;(e || (e = []), i.groupFields.length)
            ? _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a
                .groupBy(e, i.groupFields, function (t) {
                  var e = {}
                  return (
                    i.groupFields.forEach(function (n) {
                      return (e[n] = t[n])
                    }),
                    e
                  )
                })
                .forEach(function (t) {
                  if (i.groupFormatter) {
                    var e = $('<tr><td colspan=' + o.colspan + '></td></tr>')
                    ;(e.find('td').append(i.groupFormatter(t, n)), r.append(e))
                  }
                  if (
                    (t.rows.forEach(function (t) {
                      var e = TableExcelHelper.createRowTarget(o, t, n, i)
                      r.append(e)
                    }),
                    i.groupFooterFormatter)
                  ) {
                    var a = $('<tr><td colspan=' + o.colspan + '></td></tr>')
                    ;(a.find('td').append(i.groupFooterFormatter(t, n)), r.append(a))
                  }
                })
            : e.forEach(function (t) {
                var e = TableExcelHelper.createRowTarget(o, t, n, i)
                r.append(e)
              })
          return r
        }),
        (TableExcelHelper.createRowTarget = function (t, e, n, i) {
          var o = $('<tr></tr>')
          ;(o.data('rowData', e),
            t.rowColumns.forEach(function (t, i) {
              var r = $('<td></td>')
              ;(t.field && r.attr('field', t.field),
                t.align && r.css('text-align', t.align),
                t.vAlign && r.css('vertical-align', t.vAlign))
              var a = TableExcelHelper.getColumnFormatter(t),
                p = a ? a(e[t.field], e, i, n) : e[t.field]
              r.html(p)
              var s = TableExcelHelper.getColumnStyler(t)
              if (s) {
                var l = s(e[t.field], e, i, n)
                if (l)
                  Object.keys(l).forEach(function (t) {
                    r.css(t, l[t])
                  })
              }
              o.append(r)
            }))
          var r = TableExcelHelper.getRowStyler(n, i)
          if (r) {
            var a = r(e, n)
            if (a)
              Object.keys(a).forEach(function (t) {
                o.css(t, a[t])
              })
          }
          return o
        }),
        (TableExcelHelper.createEmptyRowTarget = function (t) {
          var e = TableExcelHelper.reconsitutionTableColumnTree(t),
            n = $('<tr></tr>')
          return (
            e.rowColumns.forEach(function (t, e) {
              var i = $('<td></td>')
              ;(t.field && i.attr('field', t.field),
                t.align && i.css('text-align', t.align),
                t.vAlign && i.css('vertical-align', t.vAlign),
                n.append(i))
            }),
            n
          )
        }),
        (TableExcelHelper.getColumnsWidth = function (t, e) {
          var n = {},
            i = TableExcelHelper.allAutoWidth(t),
            o = TableExcelHelper.allFixedWidth(t)
          return (
            t.rowColumns.forEach(function (t) {
              if (t.fixed) n[t.id] = t.width
              else {
                var r = e - o,
                  a = (t.width / i) * (r > 0 ? r : 0)
                n[t.id] = a
              }
            }),
            n
          )
        }),
        (TableExcelHelper.resizeTableCellWidth = function (t, e, n) {
          var i = TableExcelHelper.reconsitutionTableColumnTree(e),
            o = TableExcelHelper.getColumnsWidth(i, n)
          t.find('thead tr td[haswidth]').map(function (t, e) {
            var n = $(e).attr('id'),
              i = o[n]
            $(e).css('width', i + 'pt')
          })
        }),
        (TableExcelHelper.allAutoWidth = function (t) {
          var e = 0
          return (
            t.rowColumns.forEach(function (t) {
              e += t.fixed ? 0 : t.width
            }),
            e
          )
        }),
        (TableExcelHelper.allFixedWidth = function (t) {
          var e = 0
          return (
            t.rowColumns.forEach(function (t) {
              e += t.fixed ? t.width : 0
            }),
            e
          )
        }),
        (TableExcelHelper.reconsitutionTableColumnTree = function (t, e, n) {
          var i = e || new _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__.a()
          i.colspan = 0
          for (
            var o = function o(e) {
                ;((i.totalLayer = e + 1),
                  (i[e] = t[e].columns),
                  0 == e &&
                    t[e].columns.forEach(function (t) {
                      0 == e && (i.colspan += t.colspan)
                    }))
              },
              r = 0;
            r < t.length;
            r++
          ) {
            o(r)
          }
          return ((i.rowColumns = TableExcelHelper.getOrderdColumns(i)), i)
        }),
        (TableExcelHelper.syncTargetWidthToOption = function (t) {
          t.forEach(function (t) {
            t.columns.forEach(function (t) {
              t.hasWidth && (t.width = t.targetWidth)
            })
          })
        }),
        (TableExcelHelper.getFooterFormatter = function (options, tablePrintElementType) {
          var footerFormatter = void 0
          if (
            (tablePrintElementType.footerFormatter &&
              (footerFormatter = tablePrintElementType.footerFormatter),
            options.footerFormatter)
          )
            try {
              var s = 'footerFormatter=' + options.footerFormatter
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return footerFormatter
        }),
        (TableExcelHelper.getRowStyler = function (options, tablePrintElementType) {
          var rowStyler = void 0
          if (
            (tablePrintElementType.rowStyler && (rowStyler = tablePrintElementType.rowStyler),
            options.rowStyler)
          )
            try {
              var s = 'rowStyler=' + options.rowStyler
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return rowStyler
        }),
        (TableExcelHelper.getColumnStyler = function (column) {
          var styler = void 0
          if ((column.styler && (styler = column.styler), column.styler2))
            try {
              var s = 'styler=' + column.styler2
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return styler
        }),
        (TableExcelHelper.getColumnFormatter = function (column) {
          var formatter = void 0
          if ((column.formatter && (formatter = column.formatter), column.formatter2))
            try {
              var s = 'formatter=' + column.formatter2
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return formatter
        }),
        (TableExcelHelper.getOrderdColumns = function (t) {
          for (
            var e = {},
              n = function n(_n2) {
                t[_n2].forEach(function (t) {
                  for (var i = 0; i < t.rowspan; i++) {
                    ;((e[_n2 + i] = e[_n2 + i] ? e[_n2 + i] : []), e[_n2 + i].push(t))
                  }
                })
              },
              i = 0;
            i < t.totalLayer;
            i++
          ) {
            n(i)
          }
          return e[t.totalLayer - 1]
        }),
        TableExcelHelper
      )
    })()
}
