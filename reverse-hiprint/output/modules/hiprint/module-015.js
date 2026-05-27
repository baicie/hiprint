// webpack module 15
export default function (module, __webpack_exports__, __webpack_require__) {
  'use strict'

  __webpack_require__.d(__webpack_exports__, 'a', function () {
    return TablePrintElement
  })
  var _BasePrintElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4),
    _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1),
    _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0),
    _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8),
    _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18),
    _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7),
    _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16),
    _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(20),
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2),
    __extends =
      ((_extendStatics = function extendStatics(t, e) {
        return (_extendStatics =
          Object.setPrototypeOf ||
          (_instanceof(
            {
              __proto__: [],
            },
            Array,
          ) &&
            function (t, e) {
              t.__proto__ = e
            }) ||
          function (t, e) {
            for (var n in e) {
              e.hasOwnProperty(n) && (t[n] = e[n])
            }
          })(t, e)
      }),
      function (t, e) {
        function n() {
          this.constructor = t
        }
        ;(_extendStatics(t, e),
          (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n())))
      }),
    _extendStatics,
    TablePrintElement = (function (_super) {
      function TablePrintElement(t, e) {
        var n = _super.call(this, t) || this
        return (
          (n.gridColumnsFooterCss = 'hiprint-gridColumnsFooter'),
          (n.tableGridRowCss = 'table-grid-row'),
          (n.options = new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(
            e,
            n.printElementType,
          )),
          n.options.setDefault(
            new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(
              _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table.default,
            ).getPrintElementOptionEntity(),
          ),
          n
        )
      }
      return (
        __extends(TablePrintElement, _super),
        (TablePrintElement.prototype.getColumns = function () {
          return this.options.columns
        }),
        (TablePrintElement.prototype.getColumnByColumnId = function (t) {
          return this.options.getColumnByColumnId(t)
        }),
        (TablePrintElement.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            this.css(this.designTarget, this.getData())
            var t = this.designTarget.find('.hiprint-printElement-table-content'),
              e = this.getHtml(this.designPaper)
            ;(t.html(''),
              t.append(e[0].target.find('.table-grid-row')),
              this.printElementType.editable && this.setHitable(),
              this.setColumnsOptions())
          }
        }),
        (TablePrintElement.prototype.css = function (t, e) {
          if ((this.getField() || !this.options.content) && !this.printElementType.formatter)
            return _super.prototype.css.call(this, t, e)
        }),
        (TablePrintElement.prototype.getDesignTarget = function (t) {
          return (
            (this.designTarget = this.getHtml(t)[0].target),
            (this.designPaper = t),
            this.designTarget.find('td').hidroppable({
              accept: '.rn-draggable-item',
              onDrop: function onDrop(t, e) {},
              onDragEnter: function onDragEnter(t, e) {
                $(e).removeClass('rn-draggable-item')
              },
              onDragLeave: function onDragLeave(t, e) {
                $(e).addClass('rn-draggable-item')
              },
            }),
            this.designTarget
          )
        }),
        (TablePrintElement.prototype.getConfigOptions = function () {
          return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table
        }),
        (TablePrintElement.prototype.createTarget = function (t, e, n) {
          for (
            var i = $(
                '<div class="hiprint-printElement hiprint-printElement-table" style="position: absolute;"><div class="hiprint-printElement-table-handle"></div><div class="hiprint-printElement-table-content" style="height:100%;width:100%"></span></div>',
              ),
              o = this.createGridColumnsStructure(n),
              r = 0;
            r < o.gridColumns;
            r++
          ) {
            o.getByIndex(r).append(this.getTableHtml(e, n))
          }
          return (i.find('.hiprint-printElement-table-content').append(o.target), i)
        }),
        (TablePrintElement.prototype.createGridColumnsStructure = function (t) {
          for (
            var e = $('<div class="hi-grid-row table-grid-row"></div>'), n = 0;
            n < this.options.getGridColumns();
            n++
          ) {
            var i = $(
              '<div class="tableGridColumnsGutterRow hi-grid-col" style="width:' +
                100 / this.options.getGridColumns() +
                '%;"></div>',
            )
            e.append(i)
          }
          var o = this.getGridColumnsFooterFormatter()
          if (o) {
            var r = $('<div class="hiprint-gridColumnsFooter"></div>')
            ;(r.append(o(this.options, this.getData(t), t, [])), e.append(r))
          }
          return new _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__.a(
            this.options.getGridColumns(),
            e,
          )
        }),
        (TablePrintElement.prototype.createtempEmptyRowsTargetStructure = function (t) {
          if (this.getField()) return this.createTarget(this.printElementType.title, [])
          var e = this.createTarget(this.printElementType.title, []).clone()
          return (e.find('.hiprint-printElement-tableTarget tbody tr').remove(), e)
        }),
        (TablePrintElement.prototype.getTableHtml = function (t, e) {
          var n, i
          if (!this.getField() && this.options.content)
            return (
              (n = $('<div></div>')).append(this.options.content),
              (i = n.find('table')).addClass('hiprint-printElement-tableTarget'),
              i
            )
          if (this.printElementType.formatter)
            return (
              (n = $('<div></div>')).append(this.printElementType.formatter(t)),
              (i = n.find('table')).addClass('hiprint-printElement-tableTarget'),
              i
            )
          var o = $(
            '<table class="hiprint-printElement-tableTarget" style="border-collapse: collapse;"></table>',
          )
          return (
            o.append(
              _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableHead(
                this.getColumns(),
                this.options.getWidth() / this.options.getGridColumns(),
              ),
            ),
            o.append(
              _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableRow(
                this.getColumns(),
                t,
                this.options,
                this.printElementType,
              ),
            ),
            this.getFooterFormatter() &&
              ('no' == this.options.tableFooterRepeat ||
                ('last' == this.options.tableFooterRepeat
                  ? o
                      .find('tbody')
                      .append(
                        _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
                          .createTableFooter(
                            this.printElementType.columns,
                            t,
                            this.options,
                            this.printElementType,
                            e,
                            t,
                          )
                          .html(),
                      )
                  : o.append(
                      _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableFooter(
                        this.printElementType.columns,
                        t,
                        this.options,
                        this.printElementType,
                        e,
                        [],
                      ),
                    ))),
            o
          )
        }),
        (TablePrintElement.prototype.getEmptyRowTarget = function () {
          return _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createEmptyRowTarget(
            this.getColumns(),
          )
        }),
        (TablePrintElement.prototype.getHtml = function (t, e) {
          this.createTempContainer()
          var n = this.getPaperHtmlResult(t, e)
          return (this.removeTempContainer(), n)
        }),
        (TablePrintElement.prototype.getPaperHtmlResult = function (t, e) {
          var n = [],
            i = this.getData(e),
            o = this.getTableHtml(i, e),
            r = this.createtempEmptyRowsTargetStructure(e)
          ;(e ? this.updateTargetWidth(r) : this.updateTargetSize(r),
            this.css(r, i),
            this.css(o, i),
            this.getTempContainer().html(''),
            this.getTempContainer().append(r))
          for (var a, p = this.getBeginPrintTopInPaperByReferenceElement(t), s = 0, l = !1; !l; ) {
            var u = 0,
              d = t.getPaperFooter(s)
            0 == s &&
              p > d &&
              ((p = p - d + t.paperHeader),
              n.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
                  target: void 0,
                  printLine: void 0,
                }),
              ),
              (u = t.getContentHeight(s) - (p - t.paperHeader)),
              s++,
              (d = t.getPaperFooter(s)))
            var c = n.length > 0 ? n[n.length - 1].target : void 0,
              h = this.getRowsInSpecificHeight(
                e,
                u > 0 ? u : 0 == s ? d - p : t.getContentHeight(s),
                r,
                o,
                s,
                c,
              )
            l = h.isEnd
            var f = void 0
            ;(h.target &&
              (h.target.css('left', this.options.displayLeft()), (h.target[0].height = '')),
              0 == s || u > 0
                ? (h.target && ((a = p), h.target.css('top', p + 'pt')),
                  (f =
                    l && null != this.options.lHeight
                      ? p + (h.height > this.options.lHeight ? h.height : this.options.lHeight)
                      : p + h.height))
                : (h.target && ((a = t.paperHeader), h.target.css('top', t.paperHeader + 'pt')),
                  (f = t.paperHeader + h.height)),
              n.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
                  target: h.target,
                  printLine: f,
                  referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: f,
                    printTopInPaper: a,
                  }),
                }),
              ),
              s++)
          }
          return n
        }),
        (TablePrintElement.prototype.getRowsInSpecificHeight = function (t, e, n, i, o, r) {
          var a = i.find('tbody'),
            p = _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.pt.toPx(e)
          n.find('.hiprint-printElement-tableTarget tbody').html('')
          var s = n.outerHeight()
          if (s > p)
            return {
              target: void 0,
              length: 0,
              height: 0,
              isEnd: !1,
            }
          for (var l = [], u = 0; u < this.options.getGridColumns(); u++) {
            for (
              var d = n.find('.hiprint-printElement-tableTarget:eq(' + u + ')'), c = void 0, h = [];
              ;
            ) {
              console.log(u)
              if (s <= p)
                if (0 == a.find('tr').length)
                  ((c = {
                    height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(s),
                    isEnd: !0,
                  }),
                    t &&
                      this.options.autoCompletion &&
                      (this.autoCompletion(p, d), (s = n.outerHeight())))
                else {
                  var f = a.find('tr:lt(1)')
                  d.find('tbody').append(f)
                  var g = f.data('rowData')
                  ;(l.push(g),
                    h.push(g),
                    (s = n.outerHeight()) > p &&
                      (a.prepend(f),
                      l.pop(),
                      h.pop(),
                      (s = n.outerHeight()),
                      (c = {
                        height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(s),
                        isEnd: !1,
                      })))
                }
              if (c) {
                if (this.getFooterFormatter())
                  d.find('tfoot').length &&
                    d
                      .find('tfoot')
                      .html(
                        _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
                          .createTableFooter(
                            this.printElementType.columns,
                            this.getData(t),
                            this.options,
                            this.printElementType,
                            t,
                            h,
                          )
                          .html(),
                      )
                break
              }
            }
          }
          var m = n.find('.hiprint-printElement-tableTarget tbody tr').length,
            v = this.getGridColumnsFooterFormatter()
          return (
            v && n.find(this.gridColumnsFooterCss).html(v(this.options, this.getData(t), t, l)),
            0 == a.find('tr').length
              ? 0 == m && r
                ? {
                    target: void 0,
                    length: 0,
                    height: 0,
                    isEnd: !0,
                  }
                : {
                    target: n.clone(),
                    length: m,
                    height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(s),
                    isEnd: !0,
                  }
              : {
                  target: n.clone(),
                  length: m,
                  height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(s),
                  isEnd: !1,
                }
          )
        }),
        (TablePrintElement.prototype.autoCompletion = function (t, e) {
          for (var n, i = this.getEmptyRowTarget(), o = e.outerHeight(); t > o; ) {
            ;((n = i.clone()), e.find('tbody').append(n), (o = e.outerHeight()))
          }
          n && n.remove()
        }),
        (TablePrintElement.prototype.getData = function (t) {
          if (!t) return [{}]
          var e = t[this.getField()]
          return e ? JSON.parse(JSON.stringify(e)) : []
        }),
        (TablePrintElement.prototype.onResize = function (t, e, n, i, o) {
          ;(_super.prototype.updateSizeAndPositionOptions.call(this, o, i, n, e),
            _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.resizeTableCellWidth(
              this.designTarget,
              this.getColumns(),
              this.options.getWidth(),
            ))
        }),
        (TablePrintElement.prototype.getReizeableShowPoints = function () {
          return ['s', 'e']
        }),
        (TablePrintElement.prototype.design = function (t, e) {
          var n = this
          ;(this.designTarget.hidraggable({
            handle: this.designTarget.find('.hiprint-printElement-table-handle'),
            axis: n.options.axis && t && t.axisEnabled ? n.options.axis : void 0,
            onDrag: function onDrag(t, i, o) {
              ;(n.updateSizeAndPositionOptions(i, o), n.createLineOfPosition(e))
            },
            moveUnit: 'pt',
            minMove: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(t) {
              ;((_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !0),
                n.createLineOfPosition(e))
            },
            onStopDrag: function onStopDrag(t) {
              ;((_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !1),
                n.removeLineOfPosition())
            },
          }),
            this.printElementType.editable && this.setHitable(),
            this.setColumnsOptions(),
            this.designTarget.hireizeable({
              showPoints: n.getReizeableShowPoints(),
              noContainer: !0,
              onBeforeResize: function onBeforeResize() {
                _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !0
              },
              onResize: function onResize(t, i, o, r, a) {
                ;(n.onResize(t, i, o, r, a),
                  n.hitable && n.hitable.updateColumnGrips(),
                  n.createLineOfPosition(e))
              },
              onStopResize: function onStopResize() {
                ;((_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !1),
                  n.removeLineOfPosition())
              },
            }),
            this.bingKeyboardMoveEvent(this.designTarget, e))
        }),
        (TablePrintElement.prototype.setHitable = function () {
          var t = this
          ;((this.hitable = new _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__.a({
            table: this.designTarget.find('.hiprint-printElement-tableTarget:eq(0)'),
            rows: this.getColumns(),
            resizeRow: !1,
            resizeColumn: !0,
            trs: this.designTarget.find('.hiprint-printElement-tableTarget:eq(0)').find('tbody tr'),
            handle: this.designTarget.find('.hiprint-printElement-tableTarget:eq(0)').find('thead'),
            isEnableEdit: this.printElementType.editable,
            columnDisplayEditable: this.printElementType.columnDisplayEditable,
            columnDisplayIndexEditable: this.printElementType.columnDisplayIndexEditable,
            columnResizable: this.printElementType.columnResizable,
            columnAlignEditable: this.printElementType.columnAlignEditable,
            isEnableEditText: this.printElementType.columnTitleEditable,
            isEnableEditField: !1,
            isEnableContextMenu: !0,
            isEnableInsertRow: !1,
            isEnableDeleteRow: !1,
            isEnableInsertColumn: !1,
            isEnableDeleteColumn: !1,
            isEnableMergeCell: !1,
          })),
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.on(
              'updateTable' + this.hitable.id,
              function () {
                t.updateDesignViewFromOptions()
              },
            ))
        }),
        (TablePrintElement.prototype.setColumnsOptions = function () {
          var t = this
          this.designTarget
            .find('.hiprint-printElement-tableTarget:eq(0)')
            .find('thead td')
            .bind('click.hiprint', function (e) {
              var n = $(e.target).attr('column-id'),
                i = t.getColumnByColumnId(n)
              if (i) {
                var o = t.getPrintElementOptionItemsByName('tableColumn')
                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
                  t.getPrintElementSelectEventKey(),
                  {
                    printElement: t,
                    customOptionsInput: [
                      {
                        title: i.title + '-列属性',
                        optionItems: o,
                        options: i,
                        callback: function callback(t) {
                          o.forEach(function (t) {
                            var e = t.getValue()
                            i[t.name] = e
                          })
                        },
                      },
                    ],
                  },
                )
              } else
                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
                  t.getPrintElementSelectEventKey(),
                  {
                    printElement: t,
                  },
                )
            })
        }),
        (TablePrintElement.prototype.filterOptionItems = function (t) {
          var e = _super.prototype.filterOptionItems.call(this, t)
          return this.printElementType.editable && 1 == this.options.columns.length
            ? e
            : t.filter(function (t) {
                return 'columns' != t.name
              })
        }),
        (TablePrintElement.prototype.getFooterFormatter = function () {
          var footerFormatter = void 0
          if (
            (this.printElementType.footerFormatter &&
              (footerFormatter = this.printElementType.footerFormatter),
            this.options.footerFormatter)
          )
            try {
              var s = 'footerFormatter=' + this.options.footerFormatter
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return footerFormatter
        }),
        (TablePrintElement.prototype.getGridColumnsFooterFormatter = function () {
          var gridColumnsFooterFormatter = void 0
          if (
            (this.printElementType.gridColumnsFooterFormatter &&
              (gridColumnsFooterFormatter = this.printElementType.gridColumnsFooterFormatter),
            this.options.gridColumnsFooterFormatter)
          )
            try {
              var s = 'gridColumnsFooterFormatter=' + this.options.gridColumnsFooterFormatter
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return gridColumnsFooterFormatter
        }),
        TablePrintElement
      )
    })(_BasePrintElement__WEBPACK_IMPORTED_MODULE_0__.a)
}
