// webpack module 4
export default function (module, __webpack_exports__, __webpack_require__) {
  'use strict'

  __webpack_require__.d(__webpack_exports__, 'a', function () {
    return BasePrintElement
  })
  var _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17),
    _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1),
    _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(9),
    _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
    _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8),
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2),
    BasePrintElement = (function () {
      function BasePrintElement(t) {
        ;((this.printElementType = t),
          (this.id = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.guid()))
      }
      return (
        (BasePrintElement.prototype.getConfigOptionsByName = function (t) {
          return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance[t]
        }),
        (BasePrintElement.prototype.getProxyTarget = function (t) {
          t && this.SetProxyTargetOption(t)
          var e = this.getData(),
            n = this.createTarget(this.getTitle(), e)
          return (this.updateTargetSize(n), this.css(n, e), n)
        }),
        (BasePrintElement.prototype.SetProxyTargetOption = function (t) {
          this.options.getPrintElementOptionEntity()
          $.extend(this.options, t)
        }),
        (BasePrintElement.prototype.showInPage = function (t, e) {
          var n = this.options.showInPage,
            i = this.options.unShowInPage
          if (n) {
            if ('first' == n) return 0 == t
            if (t == e - 1 && 'last' == i) return !1
            if ('odd' == n) return (0 != t || 'first' != i) && t % 2 == 0
            if ('even' == n) return t % 2 == 1
            if ('last' == n) return t == e - 1
          }
          return (0 != t || 'first' != i) && (t != e - 1 || 'last' != i)
        }),
        (BasePrintElement.prototype.setTemplateId = function (t) {
          this.templateId = t
        }),
        (BasePrintElement.prototype.setPanel = function (t) {
          this.panel = t
        }),
        (BasePrintElement.prototype.getField = function () {
          return this.options.field || this.printElementType.field
        }),
        (BasePrintElement.prototype.getTitle = function () {
          return this.printElementType.title
        }),
        (BasePrintElement.prototype.updateSizeAndPositionOptions = function (t, e, n, i) {
          ;(this.options.setLeft(t),
            this.options.setTop(e),
            this.options.copyDesignTopFromTop(),
            this.options.setWidth(n),
            this.options.setHeight(i),
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__.a.event.trigger(
              'hiprintTemplateDataChanged_' + this.templateId,
            ))
        }),
        (BasePrintElement.prototype.initSizeByHtml = function (t) {
          if (t && t.length) {
            this.createTempContainer()
            var e = t.clone()
            ;(this.getTempContainer().append(e),
              this.options.initSizeByHtml(
                parseInt(
                  _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__.a.px
                    .toPt(e.width())
                    .toString(),
                ),
                parseInt(
                  _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__.a.px
                    .toPt(e.height())
                    .toString(),
                ),
              ),
              this.removeTempContainer())
          }
        }),
        (BasePrintElement.prototype.updateTargetSize = function (t) {
          ;(t.css('width', this.options.displayWidth()),
            t.css('height', this.options.displayHeight()))
        }),
        (BasePrintElement.prototype.updateTargetWidth = function (t) {
          t.css('width', this.options.displayWidth())
        }),
        (BasePrintElement.prototype.getDesignTarget = function (t) {
          var e = this
          return (
            (this.designTarget = this.getHtml(t)[0].target),
            (this.designPaper = t),
            this.designTarget.click(function () {
              _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__.a.event.trigger(
                e.getPrintElementSelectEventKey(),
                {
                  printElement: e,
                },
              )
            }),
            this.designTarget
          )
        }),
        (BasePrintElement.prototype.getPrintElementSelectEventKey = function () {
          return 'PrintElementSelectEventKey_' + this.templateId
        }),
        (BasePrintElement.prototype.design = function (t, e) {
          var n = this
          ;(this.designTarget.hidraggable({
            axis: n.options.axis && t && t.axisEnabled ? n.options.axis : void 0,
            onDrag: function onDrag(t, i, o) {
              ;(n.updateSizeAndPositionOptions(i, o), n.createLineOfPosition(e))
            },
            moveUnit: 'pt',
            minMove: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(t) {
              ;((_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0),
                n.designTarget.focus(),
                n.createLineOfPosition(e))
            },
            onStopDrag: function onStopDrag(t) {
              ;((_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !1),
                n.removeLineOfPosition())
            },
          }),
            this.designTarget.hireizeable({
              showPoints: n.getReizeableShowPoints(),
              onBeforeResize: function onBeforeResize() {
                _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0
              },
              onResize: function onResize(t, i, o, r, a) {
                ;(n.onResize(t, i, o, r, a), n.createLineOfPosition(e))
              },
              onStopResize: function onStopResize() {
                ;((_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !1),
                  n.removeLineOfPosition())
              },
            }),
            this.bingCopyEvent(this.designTarget),
            this.bingKeyboardMoveEvent(this.designTarget, e))
        }),
        (BasePrintElement.prototype.getPrintElementEntity = function (t) {
          return t
            ? new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(
                void 0,
                this.options.getPrintElementOptionEntity(),
                this.printElementType.getPrintElementTypeEntity(),
              )
            : new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(
                this.printElementType.tid,
                this.options.getPrintElementOptionEntity(),
              )
        }),
        (BasePrintElement.prototype.submitOption = function () {
          var t = this
          ;(this.getPrintElementOptionItems().forEach(function (e) {
            var n = e.getValue()
            n && 'object' == _typeof(n)
              ? Object.keys(n).forEach(function (e) {
                  t.options[e] = n[e]
                })
              : (t.options[e.name] = n)
          }),
            this.updateDesignViewFromOptions(),
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__.a.event.trigger(
              'hiprintTemplateDataChanged_' + this.templateId,
            ))
        }),
        (BasePrintElement.prototype.getReizeableShowPoints = function () {
          return ['s', 'e']
        }),
        (BasePrintElement.prototype.onResize = function (t, e, n, i, o) {
          this.updateSizeAndPositionOptions(o, i, n, e)
        }),
        (BasePrintElement.prototype.getOrderIndex = function () {
          return this.options.getTop()
        }),
        (BasePrintElement.prototype.getHtml = function (t, e, n) {
          var i = 0
          this.setCurrenttemplateData(e)
          var o = [],
            r = this.getBeginPrintTopInPaperByReferenceElement(t),
            a = t.getPaperFooter(i)
          this.isHeaderOrFooter() ||
            this.isFixed() ||
            (r > a &&
              (o.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                  target: void 0,
                  printLine: void 0,
                }),
              ),
              (r = r - a + t.paperHeader),
              i++,
              (a = t.getPaperFooter(i))))
          var p = this.getData(e),
            s = this.createTarget(this.getTitle(), p, n)
          return (
            this.updateTargetSize(s),
            this.css(s, p),
            s.css('position', 'absolute'),
            s.css('left', this.options.displayLeft()),
            s.css('top', r + 'pt'),
            o.push(
              new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                target: s,
                printLine: r + this.options.getHeight(),
              }),
            ),
            o
          )
        }),
        (BasePrintElement.prototype.getHtml2 = function (t, e, n) {
          var i = 0
          this.setCurrenttemplateData(e)
          var o = [],
            r = this.getBeginPrintTopInPaperByReferenceElement(t),
            a = t.getPaperFooter(i)
          this.isHeaderOrFooter() ||
            this.isFixed() ||
            (r > a &&
              (o.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                  target: void 0,
                  printLine: void 0,
                }),
              ),
              (r = r - a + t.paperHeader),
              i++,
              (a = t.getPaperFooter(i))),
            r <= a &&
              r + this.options.getHeight() > a &&
              (o.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                  target: void 0,
                  printLine: void 0,
                }),
              ),
              (r = t.paperHeader),
              i++,
              (a = t.getPaperFooter(i))))
          var p = this.getData(e),
            s = this.createTarget(this.getTitle(), p)
          return (
            this.updateTargetSize(s),
            this.css(s, p),
            s.css('position', 'absolute'),
            s.css('left', this.options.displayLeft()),
            s.css('top', r + 'pt'),
            o.push(
              new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                target: s,
                printLine: r + this.options.getHeight(),
                referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
                  top: this.options.getTop(),
                  left: this.options.getLeft(),
                  height: this.options.getHeight(),
                  width: this.options.getWidth(),
                  beginPrintPaperIndex: t.index,
                  bottomInLastPaper: r + this.options.getHeight(),
                  printTopInPaper: r,
                }),
              }),
            ),
            o
          )
        }),
        (BasePrintElement.prototype.getBeginPrintTopInPaperByReferenceElement = function (t) {
          var e = this.options.getTop()
          return this.isHeaderOrFooter() || this.isFixed()
            ? e
            : t.referenceElement.isPositionLeftOrRight(e)
              ? t.referenceElement.printTopInPaper + (e - t.referenceElement.top)
              : t.referenceElement.bottomInLastPaper +
                (e - (t.referenceElement.top + t.referenceElement.height))
        }),
        (BasePrintElement.prototype.css = function (t, e) {
          var n = this,
            i = [],
            o = this.getConfigOptions()
          if (o) {
            var r = o.supportOptions
            r &&
              r.forEach(function (e) {
                var o =
                  _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                    e.name,
                  )
                if (o && o.css) {
                  var r = o.css(t, n.options.getValueFromOptionsOrDefault(e.name))
                  r && i.push(r)
                }
              })
          }
          this.stylerCss(t, e)
        }),
        (BasePrintElement.prototype.stylerCss = function (t, e) {
          var n = this.getStyler()
          if (n) {
            var i = n(e, this.options, t, this._currenttemplateData)
            if (i)
              Object.keys(i).forEach(function (e) {
                t.css(e, i[e])
              })
          }
        }),
        (BasePrintElement.prototype.getData = function (t) {
          return t ? t[this.getField()] || '' : this.printElementType.getData()
        }),
        (BasePrintElement.prototype.getPrintElementOptionItems = function () {
          if (this._printElementOptionItems) return this._printElementOptionItems
          var t = [],
            e = this.getConfigOptions()
          if (e) {
            var n = e.supportOptions
            n &&
              n
                .filter(function (t) {
                  return !t.hidden
                })
                .forEach(function (e) {
                  var n =
                    _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                      e.name,
                    )
                  t.push(n)
                })
          }
          return (
            (this._printElementOptionItems = this.filterOptionItems(t.concat())),
            this._printElementOptionItems
          )
        }),
        (BasePrintElement.prototype.getPrintElementOptionItemsByName = function (t) {
          var e = [],
            n = this.getConfigOptionsByName(t)
          if (n) {
            var i = n.supportOptions
            i &&
              i
                .filter(function (t) {
                  return !t.hidden
                })
                .forEach(function (t) {
                  var n =
                    _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                      t.name,
                    )
                  e.push(n)
                })
          }
          return e.concat()
        }),
        (BasePrintElement.prototype.filterOptionItems = function (t) {
          return this.printElementType.field
            ? t.filter(function (t) {
                return 'field' != t.name
              })
            : t
        }),
        (BasePrintElement.prototype.createTempContainer = function () {
          ;(this.removeTempContainer(),
            $('body').append(
              $(
                '<div class="hiprint_temp_Container hiprint-printPaper" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>',
              ),
            ))
        }),
        (BasePrintElement.prototype.removeTempContainer = function () {
          $('.hiprint_temp_Container').remove()
        }),
        (BasePrintElement.prototype.getTempContainer = function () {
          return $('.hiprint_temp_Container')
        }),
        (BasePrintElement.prototype.isHeaderOrFooter = function () {
          return (
            this.options.getTopInDesign() < this.panel.paperHeader ||
            this.options.getTopInDesign() >= this.panel.paperFooter
          )
        }),
        (BasePrintElement.prototype.delete = function () {
          this.designTarget && this.designTarget.remove()
        }),
        (BasePrintElement.prototype.setCurrenttemplateData = function (t) {
          this._currenttemplateData = t
        }),
        (BasePrintElement.prototype.isFixed = function () {
          return this.options.fixed
        }),
        (BasePrintElement.prototype.onRendered = function (t, e) {
          this.printElementType &&
            this.printElementType.onRendered &&
            this.printElementType.onRendered(e, this.options, t.getTarget())
        }),
        (BasePrintElement.prototype.createLineOfPosition = function (t) {
          var e = $('.toplineOfPosition' + this.id),
            n = $('.leftlineOfPosition' + this.id),
            i = $('.rightlineOfPosition' + this.id),
            o = $('.bottomlineOfPosition' + this.id)
          if (
            (e.length
              ? e.css('top', this.options.displayTop())
              : ((e = $(
                  '<div class="toplineOfPosition' +
                    this.id +
                    '" style="border:0;border-top:1px dashed  rgb(169, 169, 169);position: absolute; width: 100%;"></div>',
                )).css('top', this.options.displayTop()),
                e.css('width', t.displayWidth()),
                this.designTarget.parents('.hiprint-printPaper-content').append(e)),
            n.length)
          )
            n.css('left', this.options.displayLeft())
          else {
            var r = $(
              '<div class="leftlineOfPosition' +
                this.id +
                '" style="border:0;border-left:1px dashed  rgb(169, 169, 169);position: absolute;height: 100%;"></div>',
            )
            ;(r.css('left', this.options.displayLeft()),
              r.css('height', t.displayHeight()),
              this.designTarget.parents('.hiprint-printPaper-content').append(r))
          }
          if (i.length) i.css('left', this.options.getLeft() + this.options.getWidth() + 'pt')
          else {
            var a = $(
              '<div class="rightlineOfPosition' +
                this.id +
                '" style="border:0;border-left:1px dashed  rgb(169, 169, 169);position: absolute;height: 100%;"></div>',
            )
            ;(a.css('left', this.options.getLeft() + this.options.getWidth() + 'pt'),
              a.css('height', t.displayHeight()),
              this.designTarget.parents('.hiprint-printPaper-content').append(a))
          }
          if (o.length) o.css('top', this.options.getTop() + this.options.getHeight() + 'pt')
          else {
            var p = $(
              '<div class="bottomlineOfPosition' +
                this.id +
                '" style="border:0;border-top:1px dashed  rgb(169, 169, 169);position: absolute;width: 100%;"></div>',
            )
            ;(p.css('top', this.options.getTop() + this.options.getHeight() + 'pt'),
              p.css('width', t.displayWidth()),
              this.designTarget.parents('.hiprint-printPaper-content').append(p))
          }
        }),
        (BasePrintElement.prototype.removeLineOfPosition = function () {
          ;($('.toplineOfPosition' + this.id).remove(),
            $('.leftlineOfPosition' + this.id).remove(),
            $('.rightlineOfPosition' + this.id).remove(),
            $('.bottomlineOfPosition' + this.id).remove())
        }),
        (BasePrintElement.prototype.getFields = function () {
          var t = this.printElementType.getFields()
          return (
            t ||
            (t = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance
              .getPrintTemplateById(this.templateId)
              .getFields())
          )
        }),
        (BasePrintElement.prototype.bingCopyEvent = function (t) {}),
        (BasePrintElement.prototype.getFormatter = function () {
          var formatter = void 0
          if (
            (this.printElementType.formatter && (formatter = this.printElementType.formatter),
            this.options.formatter)
          )
            try {
              var s = 'formatter=' + this.options.formatter
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return formatter
        }),
        (BasePrintElement.prototype.getStyler = function () {
          var fnstyler = void 0
          if (
            (this.printElementType.styler && (fnstyler = this.printElementType.styler),
            this.options.styler)
          )
            try {
              var s = 'fnstyler=' + this.options.styler
              eval(s)
            } catch (t) {
              console.log(t)
            }
          return fnstyler
        }),
        (BasePrintElement.prototype.bingKeyboardMoveEvent = function (t, e) {
          var n = this,
            i = void 0,
            o = void 0
          ;(t.attr('tabindex', '1'),
            t.keydown(function (r) {
              switch (r.keyCode) {
                case 37:
                  ;((i = n.options.getLeft()),
                    n.updateSizeAndPositionOptions(
                      i - _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
                    ),
                    t.css('left', n.options.displayLeft()),
                    n.createLineOfPosition(e),
                    r.preventDefault())
                  break
                case 38:
                  ;((o = n.options.getTop()),
                    n.updateSizeAndPositionOptions(
                      void 0,
                      o - _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
                    ),
                    t.css('top', n.options.displayTop()),
                    n.createLineOfPosition(e),
                    r.preventDefault())
                  break
                case 39:
                  ;((i = n.options.getLeft()),
                    n.updateSizeAndPositionOptions(
                      i + _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
                    ),
                    t.css('left', n.options.displayLeft()),
                    n.createLineOfPosition(e),
                    r.preventDefault())
                  break
                case 40:
                  ;((o = n.options.getTop()),
                    n.updateSizeAndPositionOptions(
                      void 0,
                      o + _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
                    ),
                    t.css('top', n.options.displayTop()),
                    n.createLineOfPosition(e),
                    r.preventDefault())
              }
            }))
        }),
        (BasePrintElement.prototype.inRect = function (t) {
          var e = this.designTarget.offset().left,
            n = this.designTarget.offset().top
          return t.minX < e && t.minY < n && t.maxX > e && t.maxY > n
        }),
        (BasePrintElement.prototype.multipleSelect = function (t) {
          t
            ? this.designTarget.addClass('multipleSelect')
            : this.designTarget.removeClass('multipleSelect')
        }),
        (BasePrintElement.prototype.updatePositionByMultipleSelect = function (t, e) {
          ;(this.updateSizeAndPositionOptions(
            t + this.options.getLeft(),
            e + this.options.getTop(),
          ),
            this.designTarget.css('left', this.options.displayLeft()),
            this.designTarget.css('top', this.options.displayTop()))
        }),
        BasePrintElement
      )
    })()
}
