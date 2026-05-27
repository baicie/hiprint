// webpack module 33
export default function (t, e, n) {
  'use strict'

  n.r(e)
  ;(n(22), n(23), n(24), n(25))
  var i,
    o = n(0)
  n(26)
  window.hiLocalStorage =
    ((i = window.localStorage || null),
    {
      saveLocalData: function saveLocalData(t, e) {
        return !(!i || !e || (i.setItem(t, e), 0))
      },
      getLocalData: function getLocalData(t) {
        return i ? i.getItem(t) : null
      },
      removeItem: function removeItem(t) {
        i && i.removeItem(t)
      },
    })
  ;(n(27), n(32))
  var _r,
    a = (function () {
      function t() {
        this.allElementTypes = []
      }
      return (
        Object.defineProperty(t, 'instance', {
          get: function get() {
            return (t._instance || (t._instance = new t()), t._instance)
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.addPrintElementTypes = function (t, e) {
          var n = this
          ;(this[t] ? (this[t] = this[t].concat(e)) : (this[t] = e),
            e.forEach(function (t) {
              n.allElementTypes = n.allElementTypes.concat(t.printElementTypes)
            }))
        }),
        (t.prototype.getElementTypeGroups = function (t) {
          return this[this.formatterModule(t)] || []
        }),
        (t.prototype.getElementType = function (t) {
          var e = this.allElementTypes.filter(function (e) {
            return e.tid == t
          })
          if (e.length > 0) return e[0]
        }),
        (t.prototype.formatterModule = function (t) {
          return t || '_default'
        }),
        t
      )
    })(),
    p = n(1),
    s = n(2),
    l = (function () {
      function t() {}
      return (
        (t.prototype.createPrintElementTypeHtml = function (t, e) {
          var n = $('<ul class="hiprint-printElement-type"></ul>')
          return (
            e.forEach(function (t) {
              var e = $('<li></li>')
              e.append('<span class="title">' + t.name + '</span>')
              var i = $('<ul></ul>')
              ;(e.append(i),
                t.printElementTypes.forEach(function (t) {
                  i.append(
                    '<li><a class="ep-draggable-item" tid="' +
                      t.tid +
                      '">  ' +
                      t.getText() +
                      ' </a></li>',
                  )
                }),
                n.append(e))
            }),
            $(t).append(n),
            n.find('.ep-draggable-item')
          )
        }),
        t
      )
    })(),
    u = n(5),
    d = n(15),
    c = (function () {
      return function (t) {
        ;((this.field = t.field),
          (this.title = t.title),
          (this.type = t.type),
          (this.columns = t.columns))
      }
    })(),
    h = (function () {
      function t(t) {
        var e = this
        ;((this.text = t.text),
          (this.field = t.field),
          (this.fields = t.fields),
          (this.title = t.title),
          (this.tid = t.tid),
          (this.data = t.data),
          (this.styler = t.styler),
          (this.formatter = t.formatter),
          (this.type = t.type),
          (this.options = t.options),
          (this.editable = t.editable),
          (this.columnDisplayEditable = t.columnDisplayEditable),
          (this.columnDisplayIndexEditable = t.columnDisplayIndexEditable),
          (this.columnTitleEditable = t.columnTitleEditable),
          (this.columnResizable = t.columnResizable),
          (this.columnAlignEditable = t.columnAlignEditable),
          (this.columns = []),
          (t.columns || []).forEach(function (t, n) {
            e.columns.push(e.createTableColumnArray(t))
          }),
          (this.rowStyler = t.rowStyler),
          (this.striped = t.striped),
          (this.groupFields = t.groupFields || []),
          (this.groupFormatter = t.groupFormatter),
          (this.groupFooterFormatter = t.groupFooterFormatter),
          (this.footerFormatter = t.footerFormatter),
          (this.gridColumnsFooterFormatter = t.gridColumnsFooterFormatter),
          (this.columnObj = this.makeColumnObj()))
      }
      return (
        (t.prototype.getText = function () {
          return this.text || this.title || ''
        }),
        (t.prototype.createPrintElement = function (t) {
          var e = this
          return (
            this.columns &&
              0 == this.columns.length &&
              (t.columns || []).forEach(function (t, n) {
                e.columns.push(e.createTableColumnArray(t))
              }),
            new d.a(this, t)
          )
        }),
        (t.prototype.getData = function () {
          return [{}]
        }),
        (t.prototype.createTableColumnArray = function (t) {
          var e = []
          return (
            t.forEach(function (t, n) {
              e.push(new u.a(t))
            }),
            e
          )
        }),
        (t.prototype.getPrintElementTypeEntity = function () {
          return new c({
            title: this.title,
            type: this.type,
          })
        }),
        (t.prototype.getFields = function () {
          return this.fields
        }),
        (t.prototype.getOptions = function () {
          return this.options || {}
        }),
        (t.prototype.getColumnByColumnId = function (t) {
          return this.columnObj[t]
        }),
        (t.prototype.makeColumnObj = function () {
          var t = {}
          return (
            this.columns &&
              this.columns.forEach(function (e) {
                e.forEach(function (e) {
                  e.columnId && (t[e.columnId] = e)
                })
              }),
            t
          )
        }),
        t
      )
    })(),
    f = n(4),
    g = n(3),
    m =
      ((_r = function r(t, e) {
        return (_r =
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
        ;(_r(t, e),
          (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n())))
      }),
    v = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(new g.a(p.a.instance.image.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        m(e, t),
        (e.prototype.getReizeableShowPoints = function () {
          return ['se']
        }),
        (e.prototype.getData = function (t) {
          var e = ''
          t
            ? (e = this.getField()
                ? t[this.getField()] || ''
                : this.options.src || this.printElementType.getData())
            : (e = this.options.src || this.printElementType.getData())
          var n = this.getFormatter()
          return (n && (e = n(e, this.options, this._currenttemplateData)), e || '')
        }),
        (e.prototype.createTarget = function (t, e) {
          var n = $(
            '<div  class="hiprint-printElement hiprint-printElement-image" style="position: absolute;"><div class="hiprint-printElement-image-content" style="height:100%;width:100%"></div></div>',
          )
          return (this.updateTargetImage(n, t, e), n)
        }),
        (e.prototype.initSizeByHtml = function (e) {
          ;(t.prototype.initSizeByHtml.call(this, e), this.css(e, this.getData()))
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.image
        }),
        (e.prototype.updateDesignViewFromOptions = function () {
          this.designTarget &&
            (this.css(this.designTarget, this.getData()),
            this.updateTargetImage(this.designTarget, this.getTitle(), this.getData()))
        }),
        (e.prototype.updateTargetImage = function (t, e, n) {
          var i = t.find('.hiprint-printElement-image-content')
          i.find('img').length
            ? i.find('img').attr('src', n)
            : i.html('<img style="width:100%;height:100%;" src="' + n + '">')
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n)
        }),
        e
      )
    })(f.a),
    y = (function () {
      var _t4 = function t(e, n) {
        return (_t4 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t4(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    b = (function (t) {
      function e(e) {
        var n = this
        return (
          (e = e || {}),
          ((n = t.call(this, e) || this).leftSpaceRemoved = e.leftSpaceRemoved),
          n
        )
      }
      return (
        y(e, t),
        (e.prototype.getHideTitle = function () {
          return null == this.hideTitle ? this.defaultOptions.hideTitle : this.hideTitle
        }),
        e
      )
    })(g.a),
    E = n(8),
    T = (function () {
      function t(t, e, n, i, r, a, p, s, l, u, d) {
        ;((this.defaultPaperNumberFormat = 'paperNo-paperCount'),
          (this.printLine = 0),
          (this.templateId = t),
          (this.width = o.a.mm.toPt(e)),
          (this.height = o.a.mm.toPt(n)),
          (this.mmwidth = e),
          (this.mmheight = n),
          (this.paperHeader = i),
          (this.paperFooter = r),
          (this.contentHeight = r - i),
          this.createTarget(),
          (this.index = u),
          (this.paperNumberLeft = a || parseInt((this.width - 30).toString())),
          (this.paperNumberTop = p || parseInt((this.height - 22).toString())),
          (this.paperNumberDisabled = s),
          (this.paperNumberFormat = l),
          (this.referenceElement = d
            ? $.extend({}, d)
            : new E.a({
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                bottomInLastPaper: 0,
                beginPrintPaperIndex: 0,
                printTopInPaper: 0,
                endPrintPaperIndex: 0,
              })))
      }
      return (
        (t.prototype.subscribePaperBaseInfoChanged = function (t) {
          this.onPaperBaseInfoChanged = t
        }),
        (t.prototype.triggerOnPaperBaseInfoChanged = function () {
          this.onPaperBaseInfoChanged &&
            this.onPaperBaseInfoChanged({
              paperHeader: this.paperHeader,
              paperFooter: this.paperFooter,
              paperNumberLeft: this.paperNumberLeft,
              paperNumberTop: this.paperNumberTop,
              paperNumberDisabled: this.paperNumberDisabled,
              paperNumberFormat: this.paperNumberFormat,
            })
        }),
        (t.prototype.setFooter = function (t, e, n, i) {
          ;((this.firstPaperFooter = t),
            (this.evenPaperFooter = e),
            (this.oddPaperFooter = n),
            (this.lastPaperFooter = i))
        }),
        (t.prototype.setOffset = function (t, e) {
          ;(this.setLeftOffset(t), this.setTopOffset(e))
        }),
        (t.prototype.setLeftOffset = function (t) {
          t
            ? this.paperContentTarget.css('left', t + 'pt')
            : (this.paperContentTarget[0].style.left = '')
        }),
        (t.prototype.setTopOffset = function (t) {
          t
            ? this.paperContentTarget.css('top', t + 'pt')
            : (this.paperContentTarget[0].style.top = '')
        }),
        (t.prototype.createTarget = function () {
          ;((this.target = $(
            '<div class="hiprint-printPaper"><div class="hiprint-printPaper-content"></div></div>',
          )),
            (this.paperContentTarget = this.target.find('.hiprint-printPaper-content')),
            this.target.css('width', this.mmwidth + 'mm'),
            this.target.css('height', this.mmheight - p.a.instance.paperHeightTrim + 'mm'),
            this.target.attr('original-height', this.mmheight))
        }),
        (t.prototype.createHeaderLine = function () {
          var t = this
          ;((this.headerLinetarget = $(
            '<div class="hiprint-headerLine"  style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>',
          )),
            this.headerLinetarget.css('top', (this.paperHeader || -1) + 'pt'),
            0 == this.paperHeader && this.headerLinetarget.addClass('hideheaderLinetarget'),
            this.paperContentTarget.append(this.headerLinetarget),
            this.dragHeadLineOrFootLine(this.headerLinetarget, function (e, n) {
              ;((t.paperHeader = n), t.triggerOnPaperBaseInfoChanged())
            }))
        }),
        (t.prototype.createFooterLine = function () {
          var t = this
          ;((this.footerLinetarget = $(
            '<div class="hiprint-footerLine"  style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>',
          )),
            this.footerLinetarget.css('top', parseInt(this.paperFooter.toString()) + 'pt'),
            this.paperFooter == this.height &&
              (this.footerLinetarget.css(
                'top',
                this.mmheight - p.a.instance.paperHeightTrim + 'mm',
              ),
              this.footerLinetarget.addClass('hidefooterLinetarget')),
            this.paperContentTarget.append(this.footerLinetarget),
            this.dragHeadLineOrFootLine(this.footerLinetarget, function (e, n) {
              ;((t.paperFooter = n), t.triggerOnPaperBaseInfoChanged())
            }))
        }),
        (t.prototype.createPaperNumber = function (t) {
          var e = this,
            n = this.target.find('.hiprint-paperNumber')
          if (n.length) return (n.html(t), n)
          var i = $(
            '<span class="hiprint-paperNumber"  style="position: absolute">' + t + '</span>',
          )
          return (
            i.css('top', this.paperNumberTop + 'pt'),
            i.css('left', this.paperNumberLeft + 'pt'),
            this.paperContentTarget.append(i),
            this.dragHeadLineOrFootLine(
              i,
              function (t, n) {
                ;((e.paperNumberTop = n),
                  (e.paperNumberLeft = t),
                  e.triggerOnPaperBaseInfoChanged())
              },
              !0,
            ),
            i
          )
        }),
        (t.prototype.getTarget = function () {
          return this.target
        }),
        (t.prototype.append = function (t) {
          this.paperContentTarget.append(t)
        }),
        (t.prototype.updateReferenceElement = function (t) {
          t && (this.referenceElement = t)
        }),
        (t.prototype.updatePrintLine = function (t) {
          t >= this.printLine && (this.printLine = t)
        }),
        (t.prototype.design = function (t) {
          var e = this
          ;(this.createHeaderLine(),
            this.createFooterLine(),
            this.target.addClass('design'),
            (this.paperNumberTarget = this.createPaperNumber(this.formatPaperNumber(1, 1))),
            this.createRuler(),
            this.resetPaperNumber(this.paperNumberTarget),
            $(this.paperNumberTarget).bind('dblclick.hiprint', function () {
              ;(null == e.paperNumberDisabled && (e.paperNumberDisabled = !1),
                (e.paperNumberDisabled = !e.paperNumberDisabled),
                e.resetPaperNumber(e.paperNumberTarget),
                e.triggerOnPaperBaseInfoChanged())
            }),
            $(this.paperNumberTarget).bind('click.hiprint', function () {
              o.a.event.trigger('BuildCustomOptionSettingEventKey_' + e.templateId, {
                options: {
                  paperNumberFormat: e.paperNumberFormat,
                  paperNumberDisabled: e.paperNumberDisabled,
                },
                callback: function callback(t) {
                  ;((e.paperNumberDisabled = !!t.paperNumberDisabled || void 0),
                    (e.paperNumberFormat = t.paperNumberFormat ? t.paperNumberFormat : void 0),
                    e.createPaperNumber(e.formatPaperNumber(1, 1)),
                    e.resetPaperNumber(e.paperNumberTarget),
                    e.triggerOnPaperBaseInfoChanged())
                },
              })
            }))
        }),
        (t.prototype.resetPaperNumber = function (t) {
          this.paperNumberDisabled
            ? t.addClass('hiprint-paperNumber-disabled')
            : t.removeClass('hiprint-paperNumber-disabled')
        }),
        (t.prototype.updatePaperNumber = function (t, e, n) {
          var i = this.createPaperNumber(this.formatPaperNumber(t, e))
          this.paperNumberDisabled
            ? i.hide()
            : n &&
              this.index % 2 == 1 &&
              ((i[0].style.left = ''), i.css('right', this.paperNumberLeft + 'pt'))
        }),
        (t.prototype.formatPaperNumber = function (t, e) {
          return (this.paperNumberFormat ? this.paperNumberFormat : this.defaultPaperNumberFormat)
            .replace('paperNo', t.toString())
            .replace('paperCount', e.toString())
        }),
        (t.prototype.dragHeadLineOrFootLine = function (t, e, n) {
          var i = this
          t.hidraggable({
            axis: n ? void 0 : 'v',
            onDrag: function onDrag(t, n, i) {
              e(n, i)
            },
            moveUnit: 'pt',
            minMove: p.a.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(t) {
              s.a.instance.draging = !0
            },
            onStopDrag: function onStopDrag(t) {
              ;((s.a.instance.draging = !1),
                i.footerLinetarget.removeClass('hidefooterLinetarget'),
                i.headerLinetarget.removeClass('hideheaderLinetarget'))
            },
          })
        }),
        (t.prototype.resize = function (t, e) {
          ;((this.width = o.a.mm.toPt(t)),
            (this.height = o.a.mm.toPt(e)),
            (this.mmwidth = t),
            (this.mmheight = e),
            this.target.css('width', t + 'mm'),
            this.target.css('height', e - p.a.instance.paperHeightTrim + 'mm'),
            this.target.attr('original-height', this.mmheight),
            (this.paperFooter = this.height),
            this.footerLinetarget.css('top', this.height + 'pt'),
            (this.contentHeight = this.paperFooter - this.paperHeader),
            (this.paperNumberLeft = parseInt((this.width - 30).toString())),
            (this.paperNumberTop = parseInt((this.height - 22).toString())),
            this.paperNumberTarget.css('top', this.paperNumberTop + 'pt'),
            this.paperNumberTarget.css('left', this.paperNumberLeft + 'pt'),
            this.triggerOnPaperBaseInfoChanged())
        }),
        (t.prototype.getPaperFooter = function (t) {
          var e = this.index + t
          return 0 == e
            ? this.firstPaperFooter
              ? this.firstPaperFooter
              : this.oddPaperFooter
                ? this.oddPaperFooter
                : this.paperFooter
            : e % 2 == 0
              ? this.oddPaperFooter
                ? this.oddPaperFooter
                : this.paperFooter
              : e % 2 == 1
                ? this.evenPaperFooter
                  ? this.evenPaperFooter
                  : this.paperFooter
                : void 0
        }),
        (t.prototype.getContentHeight = function (t) {
          return this.getPaperFooter(t) - this.paperHeader
        }),
        (t.prototype.createRuler = function () {
          this.target.append(
            '<div class="hiprint_rul_wrapper">\n                     <img class="h_img" src="data:image/png;base64,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" />\n                     <img class="v_img" src="data:image/png;base64,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9X6eqmP080QdMz9Prcfo56n1GP08UcfMzxN1bN1vT1sfvAtmztM+TPh2MsUAI9/g+OqMOgj2ybUbWok6GHTtD/C3BZFUHdyAa2MMEnW0NpE8rjjx5WdA0nXQd9pE+1mTRB0E++TajepEHf3n1arjatbHUQdwjHxjNR3Q5nH/kz70uemC1XXM6sE2rR7HxhXR+p6qo+030nT07fRxhUek66Df9J820XwvsR5safefw4k66C/tvXzuNh39WGuvSdBBv5kXHINUHWxpp9ejjSuC/WQdbR8SdfTt9HE1+nmijr7PBJpS68GWdvPzVB178cFRR/8atrQTdND33s9TdbClnV6P0c+TdbR9SNTRt9PH1ejniTrod/MKon1upekAtrSbn6fq2IsPznS088XGajr+Z/YiRB1roY61UMdaqGMt1LEW6lgLdayFOtZCHWuhjrVQx1qoYy3UsRbqWAt1rIU61kIda6GOtVDHWtzxb6CLiIiIiIiIiIiIiIiIiIgU9x22e+CPh2066lgLdayFOtZCHWuhjrVQx1qoYy3UsRbqWAt1rIU61kIda6GOtVDHWqhjLdSxFupYC3WshTqW4dat/wKB2hwSL8nDjQAAAABJRU5ErkJggg==" />\n                    </div>',
          )
        }),
        (t.prototype.displayHeight = function () {
          return this.mmheight - p.a.instance.paperHeightTrim + 'mm'
        }),
        (t.prototype.displayWidth = function () {
          return this.mmwidth + 'mm'
        }),
        (t.prototype.getPanelTarget = function () {
          return this.target.parent('.hiprint-printPanel ')
        }),
        t
      )
    })(),
    P = n(6),
    _ = (function () {
      var _t5 = function t(e, n) {
        return (_t5 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t5(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    w = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new b(n)),
          i.options.setDefault(new b(p.a.instance.longText.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        _(e, t),
        (e.prototype.getDesignTarget = function (e) {
          var n = t.prototype.getDesignTarget.call(this, e)
          return (
            n.find('.hiprint-printElement-longText-content').css('border', '1px dashed #cebcbc'),
            n
          )
        }),
        (e.prototype.getProxyTarget = function (t) {
          t && this.SetProxyTargetOption(t)
          var e = this.getData(),
            n = this.createTarget(this.printElementType.getText(!0), e)
          return (this.updateTargetSize(n), this.css(n, e), n)
        }),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData(),
              e = this.getHtml(this.designPaper)[0].target
            ;(this.designTarget
              .find('.hiprint-printElement-longText-content')
              .html(e.find('.hiprint-printElement-longText-content').html()),
              this.css(this.designTarget, t))
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.longText
        }),
        (e.prototype.getTitle = function () {
          return this.options.title || this.printElementType.title
        }),
        (e.prototype.getData = function (t) {
          return t
            ? t[this.getField()] || ''
            : this.options.testData || this.printElementType.getData() || ''
        }),
        (e.prototype.updateTargetText = function (t, e, n) {
          var i = t.find('.hiprint-printElement-longText-content'),
            o = this.getText(e, n)
          i.html(o)
        }),
        (e.prototype.createTarget = function (t, e) {
          var n = $(
            '<div  class="hiprint-printElement hiprint-printElement-longText" style="position: absolute;"><div class="hiprint-printElement-longText-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>',
          )
          return (this.updateTargetText(n, t, e), n)
        }),
        (e.prototype.getText = function (t, e) {
          var n = this.getFormatter()
          e && (e = 0 != this.options.leftSpaceRemoved ? e.toString().replace(/^\s*/, '') : e)
          return (
            (this.getField()
              ? (this.options.getHideTitle() ? '' : t ? t + '：' : '') +
                (n ? n(t, e, this.options, this._currenttemplateData) : e)
              : n
                ? n(t, t, this.options, this._currenttemplateData)
                : t || '') || ''
          )
        }),
        (e.prototype.getHtml = function (t, e) {
          ;(this.setCurrenttemplateData(e), this.createTempContainer())
          var n = this.getPaperHtmlResult(t, e)
          return (this.removeTempContainer(), n)
        }),
        (e.prototype.getHeightByData = function (t) {
          this.createTempContainer()
          var e = this.getPaperHtmlResult(
            new T('', 1e3, 1e3, 0, 25e3, 0, 0, !0, void 0, 0, void 0),
            {},
            t,
          )
          return (
            this.removeTempContainer(),
            e[0].referenceElement.bottomInLastPaper - e[0].referenceElement.printTopInPaper
          )
        }),
        (e.prototype.getLongTextIndent = function () {
          return this.options.longTextIndent
            ? '<span class="long-text-indent" style="margin-left:' +
                this.options.longTextIndent +
                'pt"></span>'
            : '<span class="long-text-indent"></span>'
        }),
        (e.prototype.getPaperHtmlResult = function (t, e, n) {
          var i = this,
            o = [],
            r = 0,
            a = n || this.getData(e),
            p = this.getText(this.getTitle(), a),
            s = this.createTarget(this.getTitle(), this.options.testData || '')
          ;(this.css(s, a),
            e ? this.updateTargetWidth(s) : this.updateTargetSize(s),
            this.getTempContainer().html(''),
            this.getTempContainer().append(s))
          var l = [this.getLongTextIndent()],
            u = p.split(new RegExp('\r|\n', 'g'))
          if (
            (u.forEach(function (t, e) {
              var n = 0 != i.options.leftSpaceRemoved ? (t || '').toString().replace(/^\s*/, '') : t
              ;((l = l.concat(n.split(''))),
                e < u.length - 1 && l.push('<br/>' + i.getLongTextIndent()))
            }),
            0 == l.length && (l = ['']),
            this.isHeaderOrFooter() || this.isFixed() || !e)
          )
            return (
              (f = this.getStringBySpecificHeight(l, 25e3, s)).target.css(
                'left',
                this.options.displayLeft(),
              ),
              f.target.css('top', this.options.displayTop()),
              (f.target[0].height = ''),
              o.push(
                new P.a({
                  target: f.target,
                  printLine: this.options.displayTop() + f.height,
                  referenceElement: new E.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: this.options.getTop() + f.height,
                    printTopInPaper: this.options.getTop(),
                  }),
                }),
              ),
              o
            )
          for (var d = this.getBeginPrintTopInPaperByReferenceElement(t); l.length > 0; ) {
            var c = 0,
              h = t.getPaperFooter(r)
            0 == r &&
              d > h &&
              ((d = d - h + t.paperHeader),
              o.push(
                new P.a({
                  target: void 0,
                  printLine: void 0,
                }),
              ),
              r++,
              (c = t.getContentHeight(r) - (d - t.paperHeader)),
              (h = t.getPaperFooter(r)))
            var f = this.getStringBySpecificHeight(
              l,
              c > 0 ? c : 0 == r ? h - d : t.getContentHeight(r),
              s,
            )
            l.splice(0, f.length)
            var g = void 0,
              m = void 0
            ;(f.target.css('left', this.options.displayLeft()),
              (f.target[0].height = ''),
              0 == r || c > 0
                ? ((m = d),
                  f.target.css('top', m + 'pt'),
                  (g =
                    l.length > 0
                      ? d + f.height
                      : null != this.options.lHeight
                        ? d + (f.height > this.options.lHeight ? f.height : this.options.lHeight)
                        : d + f.height))
                : ((m = t.paperHeader), f.target.css('top', m + 'pt'), (g = m + f.height)),
              o.push(
                new P.a({
                  target: f.target,
                  printLine: g,
                  referenceElement: new E.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: g,
                    printTopInPaper: m,
                  }),
                }),
              ),
              r++)
          }
          return o
        }),
        (e.prototype.getStringBySpecificHeight = function (t, e, n) {
          var i = o.a.pt.toPx(e),
            r = this.IsPaginationIndex(t, t.length - 1, i, n)
          return r.IsPagination ? r : this.BinarySearch(t, 0, t.length - 1, i, n)
        }),
        (e.prototype.BinarySearch = function (t, e, n, i, o) {
          var r = Math.floor((e + n) / 2)
          if (e > n)
            return (
              o.find('.hiprint-printElement-longText-content').html(''),
              {
                IsPagination: !0,
                height: 0,
                length: 0,
                target: o.clone(),
              }
            )
          var a = this.IsPaginationIndex(t, r, i, o)
          return a.IsPagination
            ? a
            : 'l' == a.move
              ? this.BinarySearch(t, e, r - 1, i, o)
              : this.BinarySearch(t, r + 1, n, i, o)
        }),
        (e.prototype.IsPaginationIndex = function (t, e, n, i) {
          i.find('.hiprint-printElement-longText-content').html(t.slice(0, e + 2).join(''))
          var r = i.height()
          i.find('.hiprint-printElement-longText-content').html(t.slice(0, e + 1).join(''))
          var a = i.height()
          return e >= t.length - 1 && a < n
            ? {
                IsPagination: !0,
                height: o.a.px.toPt(a),
                length: t.length,
                target: i.clone(),
              }
            : a <= n && r >= n
              ? {
                  IsPagination: !0,
                  height: a,
                  length: e + 1,
                  target: i.clone(),
                }
              : a >= n
                ? {
                    IsPagination: !1,
                    move: 'l',
                  }
                : r <= n
                  ? {
                      IsPagination: !1,
                      move: 'r',
                    }
                  : {
                      IsPagination: !0,
                      result: 1,
                    }
        }),
        e
      )
    })(f.a),
    x = (function () {
      function t() {}
      return (
        (t.replaceEnterAndNewline = function (t, e) {
          return t.replace(new RegExp('\r|\n|/g', 'g'), e)
        }),
        (t.replaceTab = function (t, e) {
          return t.replace(new RegExp('\t/g', 'g'), e)
        }),
        (t.replaceEnterAndNewlineAndTab = function (t, e) {
          return t.replace(new RegExp('\r|\n|\t|/g', 'g'), e)
        }),
        t
      )
    })(),
    C = (function () {
      var _t6 = function t(e, n) {
        return (_t6 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t6(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    O = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this
        return (n.title && (n.title = x.replaceEnterAndNewlineAndTab(n.title, '')), n)
      }
      return (
        C(e, t),
        (e.prototype.getHideTitle = function () {
          return null == this.hideTitle ? this.defaultOptions.hideTitle : this.hideTitle
        }),
        (e.prototype.getTextType = function () {
          return (null == this.textType ? this.defaultOptions.textType : this.textType) || 'text'
        }),
        (e.prototype.getFontSize = function () {
          return (null == this.fontSize ? this.defaultOptions.fontSize : this.fontSize) || 9
        }),
        (e.prototype.getbarcodeMode = function () {
          return (
            (null == this.barcodeMode ? this.defaultOptions.barcodeMode : this.barcodeMode) ||
            'CODE128'
          )
        }),
        e
      )
    })(g.a),
    H = (function () {
      var _t7 = function t(e, n) {
        return (_t7 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t7(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    D = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new O(n)),
          i.options.setDefault(new O(p.a.instance.text.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        H(e, t),
        (e.prototype.getDesignTarget = function (e) {
          return t.prototype.getDesignTarget.call(this, e)
        }),
        (e.prototype.getProxyTarget = function (t) {
          t && this.SetProxyTargetOption(t)
          var e = this.getData(),
            n = this.createTarget(this.printElementType.getText(!0), e)
          return (this.updateTargetSize(n), this.css(n, e), n)
        }),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData()
            ;(this.css(this.designTarget, t),
              this.updateTargetText(this.designTarget, this.getTitle(), t))
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.text
        }),
        (e.prototype.getTitle = function () {
          var t = this.options.title || this.printElementType.title || ''
          return (t && (t = x.replaceEnterAndNewlineAndTab(t, '')), t)
        }),
        (e.prototype.getData = function (t) {
          var e = void 0
          if (
            ((e = t
              ? t[this.getField()] || ''
              : this.options.testData || this.printElementType.getData() || ''),
            this.options.format)
          ) {
            if ('datetime' == this.options.dataType) return o.a.dateFormat(e, this.options.format)
            if ('boolen' == this.options.dataType) {
              var n = this.options.format.split(':')
              if (n.length > 0) return !0 === e || 'true' === e ? n[0] : n[1]
            }
          }
          return e
        }),
        (e.prototype.updateTargetText = function (t, e, n, i) {
          var r = this.getFormatter(),
            a = t.find('.hiprint-printElement-text-content'),
            p = ''
          p = this.getField()
            ? (this.options.getHideTitle() ? '' : e ? e + '：' : '') +
              (r ? r(e, n, this.options, this._currenttemplateData, t) : n)
            : (n = r ? r(e, e, this.options, this._currenttemplateData, t) : e)
          var s = this.options.getTextType()
          if ('text' == s) a.html(p)
          else {
            if ('barcode' == s) {
              a.html(
                '<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg ><div class="hibarcode_displayValue"></div>',
              )
              try {
                n
                  ? (JsBarcode(a.find('.hibarcode_imgcode')[0], n, {
                      format: this.options.getbarcodeMode(),
                      width: 1,
                      textMargin: -1,
                      lineColor: this.options.color || '#000000',
                      margin: 0,
                      height: parseInt(o.a.pt.toPx(this.options.getHeight() || 10).toString()),
                      displayValue: !1,
                    }),
                    a.find('.hibarcode_imgcode').attr('height', '100%'),
                    a.find('.hibarcode_imgcode').attr('width', '100%'),
                    this.options.hideTitle || a.find('.hibarcode_displayValue').html(n))
                  : a.html('')
              } catch (t) {
                ;(console.log(t), a.html('此格式不支持该文本'))
              }
            }
            if ('qrcode' == s) {
              a.html('')
              try {
                if (n) {
                  var l = parseInt(o.a.pt.toPx(this.options.getWidth() || 20)),
                    u = parseInt(o.a.pt.toPx(this.options.getHeight() || 20))
                  new QRCode(a[0], {
                    width: l,
                    height: u,
                    colorDark: this.options.color || '#000000',
                    useSVG: !0,
                  }).makeCode(n)
                }
              } catch (t) {
                ;(console.log(t), a.html('二维码生成失败'))
              }
            }
          }
        }),
        (e.prototype.onResize = function (e, n, i, o, r) {
          t.prototype.onResize.call(this, e, n, i, o, r)
          ;('barcode' != this.options.getTextType() && 'qrcode' != this.options.getTextType()) ||
            this.updateTargetText(this.designTarget, this.getTitle(), this.getData())
        }),
        (e.prototype.createTarget = function (t, e, n) {
          var i = $(
            '<div tabindex="1" class="hiprint-printElement hiprint-printElement-text" style="position: absolute;"><div class="hiprint-printElement-text-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>',
          )
          return (this.updateTargetText(i, t, e, n), i)
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n)
        }),
        e
      )
    })(f.a),
    I = (function () {
      var _t8 = function t(e, n) {
        return (_t8 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t8(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    R = (function (t) {
      function e(e) {
        return t.call(this, e) || this
      }
      return (I(e, t), e)
    })(g.a),
    M = (function () {
      var _t9 = function t(e, n) {
        return (_t9 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t9(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    S = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new R(n)),
          i.options.setDefault(new R(p.a.instance.html.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        M(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData()
            ;(this.css(this.designTarget, t), this.updateTargetHtml())
          }
        }),
        (e.prototype.updateTargetHtml = function () {
          var t = this.getFormatter()
          if (t) {
            var e = t(this.getData(), this.options, this._currenttemplateData)
            this.designTarget.find('.hiprint-printElement-html-content').html(e)
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.html
        }),
        (e.prototype.createTarget = function (t, e) {
          var n = $(
              '<div  class="hiprint-printElement hiprint-printElement-html" style="position: absolute;"><div class="hiprint-printElement-html-content" style="height:100%;width:100%"></div></div>',
            ),
            i = this.getFormatter()
          if (i) {
            var o = i(this.getData(), this.options, this._currenttemplateData)
            n.find('.hiprint-printElement-html-content').append(o)
          } else
            this.options.content &&
              n.find('.hiprint-printElement-html-content').append(this.options.content)
          return n
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n)
        }),
        e
      )
    })(f.a),
    B = (function () {
      var _t10 = function t(e, n) {
        return (_t10 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t10(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    F = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(new g.a(p.a.instance.vline.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        B(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData()
            this.css(this.designTarget, t)
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.hline
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-vline" style="border-left:1px solid;position: absolute;"></div>',
          )
        }),
        (e.prototype.getReizeableShowPoints = function () {
          return ['s']
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n)
        }),
        e
      )
    })(f.a),
    L = (function () {
      var _t11 = function t(e, n) {
        return (_t11 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t11(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    A = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(new g.a(p.a.instance.hline.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        L(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData()
            this.css(this.designTarget, t)
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.hline
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-hline" style="border-top:1px solid;position: absolute;"></div>',
          )
        }),
        (e.prototype.getReizeableShowPoints = function () {
          return ['e']
        }),
        e
      )
    })(f.a),
    z = (function () {
      var _t12 = function t(e, n) {
        return (_t12 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t12(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    k = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(new g.a(p.a.instance.rect.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        z(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData()
            this.css(this.designTarget, t)
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.hline
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-rect" style="border:1px solid;position: absolute;"></div>',
          )
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n)
        }),
        e
      )
    })(f.a),
    N = (function () {
      var _t13 = function t(e, n) {
        return (_t13 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t13(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    V = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(new g.a(p.a.instance.oval.default).getPrintElementOptionEntity()),
          i
        )
      }
      return (
        N(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData()
            this.css(this.designTarget, t)
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.hline
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-oval" style="border:1px solid;position: absolute;border-radius: 50%;"></div>',
          )
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n)
        }),
        e
      )
    })(f.a),
    W = (function () {
      function t() {}
      return (
        (t.createPrintElement = function (t, e) {
          return 'text' == t.type
            ? new D(t, e)
            : 'image' == t.type
              ? new v(t, e)
              : 'longText' == t.type
                ? new w(t, e)
                : 'table' == t.type
                  ? new d.a(t, e)
                  : 'html' == t.type
                    ? new S(t, e)
                    : 'vline' == t.type
                      ? new F(t, e)
                      : 'hline' == t.type
                        ? new A(t, e)
                        : 'rect' == t.type
                          ? new k(t, e)
                          : 'oval' == t.type
                            ? new V(t, e)
                            : void 0
        }),
        t
      )
    })(),
    j = (function () {
      function t(t) {
        ;((this.field = t.field),
          (this.fields = t.fields),
          (this.title = t.title),
          (this.text = t.text),
          (this.tid = t.tid),
          (this.data = t.data),
          (this.styler = t.styler),
          (this.formatter = t.formatter),
          (this.type = t.type),
          (this.onRendered = t.onRendered),
          (this.options = t.options))
      }
      return (
        (t.prototype.getText = function (t) {
          return t ? this.title || this.text || '' : this.text || this.title || ''
        }),
        (t.prototype.getData = function () {
          return this.data
        }),
        (t.prototype.createPrintElement = function (t) {
          var e = {}
          return ($.extend(e, t || {}), W.createPrintElement(this, e))
        }),
        (t.prototype.getPrintElementTypeEntity = function () {
          return new c({
            title: this.title,
            type: this.type,
          })
        }),
        (t.prototype.getFields = function () {
          return this.fields
        }),
        (t.prototype.getOptions = function () {
          return this.options || {}
        }),
        t
      )
    })(),
    U = n(16),
    K = n(12),
    G = (function () {
      var _t14 = function t(e, n) {
        return (_t14 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t14(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    q = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this
        ;(e = e || {}).columns
          ? ((n.columns = []),
            e.columns.forEach(function (t) {
              n.columns.push(new K.a(t))
            }))
          : (n.columns = [
              new K.a({
                columns: [
                  new u.a({
                    width: 100,
                  }),
                  new u.a({
                    width: 100,
                  }),
                ],
              }),
            ])
        return (
          (n.lHeight = e.lHeight),
          (n.autoCompletion = e.autoCompletion),
          (n.tableFooterRepeat = e.tableFooterRepeat),
          n
        )
      }
      return (
        G(e, t),
        (e.prototype.getPrintElementOptionEntity = function () {
          var e = t.prototype.getPrintElementOptionEntity.call(this)
          return (
            (e.columns = []),
            this.columns.forEach(function (t) {
              e.columns.push(t.getPrintElementOptionEntity())
            }),
            e
          )
        }),
        e
      )
    })(g.a),
    X = n(7),
    Y = (function () {
      var _t15 = function t(e, n) {
        return (_t15 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t15(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    J = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this
        return (
          (i.options = new q(n)),
          i.options.setDefault(
            new q(p.a.instance.tableCustom.default).getPrintElementOptionEntity(),
          ),
          (i.columns = i.options.columns),
          i
        )
      }
      return (
        Y(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            this.css(this.designTarget, this.getData())
            var t = this.designTarget.find('.hiprint-printElement-table-content'),
              e = this.getHtml(this.designPaper)
            ;(t.html(''),
              t.append(e[0].target.find('.hiprint-printElement-tableTarget')),
              this.setHiReizeable())
          }
        }),
        (e.prototype.getDesignTarget = function (t) {
          var e = this
          return (
            (this.designTarget = this.getHtml(t)[0].target),
            (this.designPaper = t),
            this.designTarget.click(function () {
              o.a.event.trigger(e.getPrintElementSelectEventKey(), {
                printElement: e,
              })
            }),
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
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.tableCustom
        }),
        (e.prototype.createTarget = function (t, e, n) {
          var i = $(
            '<div class="hiprint-printElement hiprint-printElement-table" style="position: absolute;"><div class="hiprint-printElement-table-handle"></div><div class="hiprint-printElement-table-content" style="height:100%;width:100%"></span></div>',
          )
          return (i.find('.hiprint-printElement-table-content').append(this.getTableHtml(e, n)), i)
        }),
        (e.prototype.getTableHtml = function (t, e) {
          var n = $(
            '<table class="hiprint-printElement-tableTarget" style="border-collapse: collapse;width:100%;"></table>',
          )
          return (
            n.append(X.a.createTableHead(this.columns, this.options.getWidth())),
            n.append(X.a.createTableRow(this.columns, t, this.options, this.printElementType)),
            this.printElementType.footerFormatter &&
              ('no' == this.options.tableFooterRepeat ||
                ('last' == this.options.tableFooterRepeat
                  ? n
                      .find('tbody')
                      .append(
                        X.a
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
                  : n.append(
                      X.a.createTableFooter(
                        this.printElementType.columns,
                        t,
                        this.options,
                        this.printElementType,
                        e,
                        [],
                      ),
                    ))),
            n
          )
        }),
        (e.prototype.getHtml = function (t, e) {
          ;(this.setCurrenttemplateData(e), this.createTempContainer())
          var n = this.getPaperHtmlResult(t, e)
          return (this.removeTempContainer(), n)
        }),
        (e.prototype.getPaperHtmlResult = function (t, e) {
          var n = [],
            i = this.getData(e),
            o = this.getTableHtml(i, e),
            r = this.createTarget(this.printElementType.title, [], e)
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
                new P.a({
                  target: void 0,
                  printLine: void 0,
                }),
              ),
              s++,
              (u = t.getContentHeight(s) - (p - t.paperHeader)),
              (d = t.getPaperFooter(s)))
            var c = n.length > 0 ? n[n.length - 1].target : void 0,
              h = this.getRowsInSpecificHeight(
                u > 0 ? u : 0 == s ? d - p : t.getContentHeight(s),
                r,
                o,
                s,
                c,
                e,
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
                new P.a({
                  target: h.target,
                  printLine: f,
                  referenceElement: new E.a({
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
        (e.prototype.getRowsInSpecificHeight = function (t, e, n, i, r, a) {
          var p = void 0,
            s = n.find('tbody'),
            l = o.a.pt.toPx(t)
          e.find('tbody').html('')
          for (var u = e.outerHeight(), d = []; ; ) {
            if (u <= l) {
              if (0 == s.find('tr').length) {
                ;(a &&
                  this.options.autoCompletion &&
                  (this.autoCompletion(l, e), (u = e.outerHeight())),
                  (p = {
                    target: e.clone(),
                    length: e.find('tbody tr').length,
                    height: o.a.px.toPt(u),
                    isEnd: !0,
                  }),
                  0 == e.find('tbody tr').length &&
                    r &&
                    (p = {
                      target: void 0,
                      length: 0,
                      height: 0,
                      isEnd: !0,
                    }))
              } else {
                var c = s.find('tr:lt(1)')
                ;(e.find('tbody').append(c), (u = e.outerHeight()))
                var h = c.data('rowData')
                ;(d.push(h),
                  u > l &&
                    (s.prepend(c),
                    d.pop(),
                    (u = e.outerHeight()),
                    (p = {
                      target: e.clone(),
                      length: e.find('tbody tr').length,
                      height: o.a.px.toPt(u),
                      isEnd: !1,
                    })))
              }
            } else
              p = {
                target: void 0,
                length: 0,
                height: 0,
                isEnd: !1,
              }
            if (p) {
              this.printElementType.footerFormatter &&
                e.find('tfoot') &&
                p.target
                  .find('tfoot')
                  .html(
                    X.a
                      .createTableFooter(
                        this.printElementType.columns,
                        this.getData(a),
                        this.options,
                        this.printElementType,
                        a,
                        d,
                      )
                      .html(),
                  )
              break
            }
          }
          return p
        }),
        (e.prototype.getData = function (t) {
          if (!t) return [{}]
          var e = t[this.getField()]
          return e ? JSON.parse(JSON.stringify(e)) : []
        }),
        (e.prototype.autoCompletion = function (t, e) {
          for (var n, i = this.getEmptyRowTarget(), o = e.outerHeight(); t > o; ) {
            ;((n = i.clone()), e.find('tbody').append(n), (o = e.outerHeight()))
          }
          n && n.remove()
        }),
        (e.prototype.getEmptyRowTarget = function () {
          return X.a.createEmptyRowTarget(this.columns)
        }),
        (e.prototype.onResize = function (e, n, i, o, r) {
          ;(t.prototype.updateSizeAndPositionOptions.call(this, r, o, i, n),
            X.a.resizeTableCellWidth(this.designTarget, this.columns, this.options.getWidth()))
        }),
        (e.prototype.getReizeableShowPoints = function () {
          return ['s', 'e']
        }),
        (e.prototype.design = function (t, e) {
          var n = this
          ;(this.designTarget.hidraggable({
            handle: this.designTarget.find('.hiprint-printElement-table-handle'),
            axis: n.options.axis && t && t.axisEnabled ? n.options.axis : void 0,
            onDrag: function onDrag(t, i, o) {
              ;(n.updateSizeAndPositionOptions(i, o), n.createLineOfPosition(e))
            },
            moveUnit: 'pt',
            minMove: p.a.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(t) {
              ;((s.a.instance.draging = !0), n.createLineOfPosition(e))
            },
            onStopDrag: function onStopDrag(t) {
              ;((s.a.instance.draging = !1), n.removeLineOfPosition())
            },
          }),
            this.setHiReizeable(),
            this.designTarget.hireizeable({
              showPoints: n.getReizeableShowPoints(),
              noContainer: !0,
              onBeforeResize: function onBeforeResize() {
                s.a.instance.draging = !0
              },
              onResize: function onResize(t, i, o, r, a) {
                ;(n.onResize(t, i, o, r, a),
                  n.hitable.updateColumnGrips(),
                  n.createLineOfPosition(e))
              },
              onStopResize: function onStopResize() {
                ;((s.a.instance.draging = !1), n.removeLineOfPosition())
              },
            }),
            this.bingKeyboardMoveEvent(this.designTarget, e))
        }),
        (e.prototype.setHiReizeable = function () {
          var t = this
          ;((this.hitable = new U.a({
            table: this.designTarget.find('table'),
            rows: this.columns,
            resizeRow: !1,
            resizeColumn: !0,
            trs: $(this.designTarget).find('tbody tr'),
            handle: this.designTarget.find('table thead'),
            columnDisplayEditable: !0,
            columnDisplayIndexEditable: !0,
            columnResizable: !0,
            columnAlignEditable: !0,
            isEnableEdit: !0,
            isEnableEditText: !0,
            isEnableEditField: !0,
            isEnableContextMenu: !0,
            isEnableInsertRow: !0,
            isEnableDeleteRow: !0,
            isEnableInsertColumn: !0,
            isEnableDeleteColumn: !0,
            isEnableMergeCell: !0,
          })),
            o.a.event.on('updateTable' + this.hitable.id, function () {
              t.updateDesignViewFromOptions()
            }))
        }),
        e
      )
    })(f.a),
    Q = (function () {
      var _t16 = function t(e, n) {
        return (_t16 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t16(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    Z = (function (t) {
      function e(e) {
        return t.call(this, e) || this
      }
      return (
        Q(e, t),
        (e.prototype.createPrintElement = function (t) {
          return new J(this, t)
        }),
        e
      )
    })(h),
    tt = (function () {
      var _t17 = function t(e, n) {
        return (_t17 =
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
          })(e, n)
      }
      return function (e, n) {
        function i() {
          this.constructor = e
        }
        ;(_t17(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i())))
      }
    })(),
    et = (function (t) {
      function e(e) {
        return t.call(this, e) || this
      }
      return (
        tt(e, t),
        (e.prototype.createPrintElement = function (t) {
          var e = {}
          return ($.extend(e, t || {}), W.createPrintElement(this, e))
        }),
        (e.prototype.getPrintElementTypeEntity = function () {
          return new c({
            title: this.title,
            type: this.type,
          })
        }),
        e
      )
    })(j),
    nt = (function () {
      function t() {}
      return (
        (t.createPrintElementType = function (t) {
          return (
            (t.type = t.type || 'text'),
            'text' == t.type
              ? new et(t)
              : 'table' == t.type
                ? new h(t)
                : 'tableCustom' == t.type
                  ? new Z(t)
                  : new j(t)
          )
        }),
        t
      )
    })(),
    it = (function () {
      function t() {}
      return (
        (t.getElementTypeGroups = function (e) {
          var n = t.formatterModule(e)
          return a.instance[n] || []
        }),
        (t.getElementType = function (t, e) {
          if (t) return a.instance.getElementType(t)
          nt.createPrintElementType({
            type: e,
          })
        }),
        (t.build = function (e, n) {
          var i = t.formatterModule(n),
            o = new l().createPrintElementTypeHtml(e, this.getElementTypeGroups(i))
          this.enableDrag(o)
        }),
        (t.buildByHtml = function (t) {
          this.enableDrag(t)
        }),
        (t.enableDrag = function (e) {
          e.hidraggable({
            revert: !0,
            proxy: function proxy(t) {
              var e = s.a.instance.getDragingPrintElement(),
                n = e.printElement.getProxyTarget(e.printElement.printElementType.getOptions())
              return (n.appendTo('body'), n.css('z-index', '9999'), n)
            },
            moveUnit: 'pt',
            minMove: 4,
            onBeforeDrag: function onBeforeDrag(e) {
              s.a.instance.draging = !0
              var n = t.getElementType($(e.data.target).attr('tid'), $(e.data.target).attr('ptype'))
              return (s.a.instance.setDragingPrintElement(n.createPrintElement()), !0)
            },
            onDrag: function onDrag(t, e, n) {
              s.a.instance.getDragingPrintElement().updatePosition(e, n)
            },
            onStopDrag: function onStopDrag(t) {
              s.a.instance.draging = !1
            },
          })
        }),
        (t.formatterModule = function (t) {
          return t || '_default'
        }),
        t
      )
    })(),
    ot = (function () {
      return function (t, e) {
        var n = this
        ;((this.name = t),
          (this.printElementTypes = []),
          e.forEach(function (t) {
            n.printElementTypes.push(nt.createPrintElementType(t))
          }))
      }
    })(),
    rt = (function () {
      return function (t) {
        if (((this.index = t.index), (this.paperType = t.paperType), this.paperType)) {
          var e = s.a.instance[this.paperType]
          t.height
            ? ((this.height = t.height), (this.width = t.width))
            : ((this.height = e.height), (this.width = e.width))
        } else ((this.height = t.height), (this.width = t.width))
        ;((this.paperHeader = t.paperHeader || 0),
          (this.paperFooter = t.paperFooter || o.a.mm.toPt(this.height)),
          (this.printElements = t.printElements || []),
          (this.paperNumberLeft = t.paperNumberLeft),
          (this.paperNumberTop = t.paperNumberTop),
          (this.paperNumberDisabled = t.paperNumberDisabled),
          (this.paperNumberFormat = t.paperNumberFormat),
          (this.panelPaperRule = t.panelPaperRule),
          (this.rotate = t.rotate || void 0),
          (this.firstPaperFooter = t.firstPaperFooter),
          (this.evenPaperFooter = t.evenPaperFooter),
          (this.oddPaperFooter = t.oddPaperFooter),
          (this.lastPaperFooter = t.lastPaperFooter),
          (this.topOffset = t.topOffset),
          (this.fontFamily = t.fontFamily),
          (this.leftOffset = t.leftOffset),
          (this.orient = t.orient))
      }
    })(),
    at = (function () {
      function t(t, e, n, i) {
        ;((this.startX = this.minX = t),
          (this.startY = this.minY = e),
          (this.maxX = t),
          (this.maxY = e),
          (this.lastLeft = n),
          (this.lastTop = i))
      }
      return (
        (t.prototype.updateRect = function (t, e) {
          ;((this.minX = this.startX < t ? this.startX : t),
            (this.minY = this.startY < e ? this.startY : e),
            (this.maxX = this.startX < t ? t : this.startX),
            (this.maxY = this.startY < e ? e : this.startY))
        }),
        (t.prototype.updatePositionByMultipleSelect = function (t, e) {
          ;(null != t && (this.lastLeft = this.lastLeft + t),
            null != e && (this.lastTop = this.lastTop + e),
            this.target.css({
              left: this.lastLeft + 'pt',
              top: this.lastTop + 'pt',
            }))
        }),
        t
      )
    })(),
    pt = (function () {
      function t(t, e) {
        ;((this.templateId = e),
          (this.index = t.index),
          (this.width = t.width),
          (this.height = t.height),
          (this.paperType = t.paperType),
          (this.paperHeader = t.paperHeader),
          (this.paperFooter = t.paperFooter),
          this.initPrintElements(t.printElements),
          (this.paperNumberLeft = t.paperNumberLeft),
          (this.paperNumberTop = t.paperNumberTop),
          (this.paperNumberDisabled = t.paperNumberDisabled),
          (this.paperNumberFormat = t.paperNumberFormat),
          (this.panelPaperRule = t.panelPaperRule),
          (this.firstPaperFooter = t.firstPaperFooter),
          (this.evenPaperFooter = t.evenPaperFooter),
          (this.oddPaperFooter = t.oddPaperFooter),
          (this.lastPaperFooter = t.lastPaperFooter),
          (this.topOffset = t.topOffset),
          (this.leftOffset = t.leftOffset),
          (this.fontFamily = t.fontFamily),
          (this.orient = t.orient),
          (this.target = this.createTarget()),
          (this.rotate = t.rotate))
      }
      return (
        (t.prototype.design = function (t) {
          var e = this
          ;(this.orderPrintElements(),
            (this.designPaper = this.createNewPage(0)),
            this.target.html(''),
            this.target.append(this.designPaper.getTarget()),
            this.droppablePaper(this.designPaper),
            this.designPaper.design(t),
            this.designPaper.subscribePaperBaseInfoChanged(function (t) {
              ;((e.paperHeader = t.paperHeader),
                (e.paperFooter = t.paperFooter),
                (e.paperNumberLeft = t.paperNumberLeft),
                (e.paperNumberTop = t.paperNumberTop),
                (e.paperNumberDisabled = t.paperNumberDisabled),
                (e.paperNumberFormat = t.paperNumberFormat))
            }),
            this.printElements.forEach(function (n) {
              ;(e.appendDesignPrintElement(e.designPaper, n), n.design(t, e.designPaper))
            }),
            this.target.bind('click.hiprint', function (t) {
              o.a.event.trigger('BuildCustomOptionSettingEventKey_' + e.templateId, {
                options: {
                  panelPaperRule: e.panelPaperRule,
                  firstPaperFooter: e.firstPaperFooter,
                  evenPaperFooter: e.evenPaperFooter,
                  oddPaperFooter: e.oddPaperFooter,
                  lastPaperFooter: e.lastPaperFooter,
                  leftOffset: e.leftOffset,
                  topOffset: e.topOffset,
                  fontFamily: e.fontFamily,
                  orient: e.orient,
                  paperNumberFormat: e.paperNumberFormat,
                },
                callback: function callback(t) {
                  ;((e.panelPaperRule = t.panelPaperRule),
                    (e.firstPaperFooter = t.firstPaperFooter),
                    (e.evenPaperFooter = t.evenPaperFooter),
                    (e.oddPaperFooter = t.oddPaperFooter),
                    (e.lastPaperFooter = t.lastPaperFooter),
                    (e.leftOffset = t.leftOffset),
                    (e.topOffset = t.topOffset),
                    (e.fontFamily = t.fontFamily),
                    (e.orient = t.orient),
                    (e.paperNumberFormat = t.paperNumberFormat),
                    e.designPaper.setOffset(e.leftOffset, e.topOffset),
                    e.css(e.target))
                },
              })
            }),
            this.bindBatchMoveElement())
        }),
        (t.prototype.css = function (t) {
          this.fontFamily && t.css('fontFamily', this.fontFamily)
        }),
        (t.prototype.getHtml = function (t, e, n, i, o) {
          var r = this
          this.orderPrintElements()
          var a,
            p = n || [],
            s = i || this,
            l = void 0
          if (
            (i
              ? ((l = p[p.length - 1]),
                (a = l.getPanelTarget()),
                l.updateReferenceElement(
                  new E.a({
                    top: this.paperHeader,
                    left: 0,
                    height: 0,
                    width: 0,
                    bottomInLastPaper: l.referenceElement.bottomInLastPaper,
                    beginPrintPaperIndex: p.length - 1,
                    printTopInPaper: l.referenceElement.bottomInLastPaper,
                    endPrintPaperIndex: p.length - 1,
                  }),
                ))
              : ((a = s.createTarget()),
                (l = s.createNewPage(p.length)),
                p.push(l),
                a.append(l.getTarget())),
            this.printElements
              .filter(function (t) {
                return !t.isFixed() && !t.isHeaderOrFooter()
              })
              .forEach(function (e) {
                var n = [],
                  i = p[p.length - 1]
                ;(i.referenceElement.isPositionLeftOrRight(e.options.getTop())
                  ? ((l = p[i.referenceElement.beginPrintPaperIndex]), (n = e.getHtml(l, t)))
                  : ((l = p[i.referenceElement.endPrintPaperIndex]), (n = e.getHtml(l, t))),
                  n.forEach(function (t, i) {
                    ;(t.referenceElement &&
                      (t.referenceElement.endPrintPaperIndex =
                        t.referenceElement.beginPrintPaperIndex + n.length - 1),
                      i > 0 &&
                        (l.index < p.length - 1
                          ? (l = p[l.index + 1])
                          : ((l = s.createNewPage(p.length, l.referenceElement)), p.push(l)),
                        a.append(l.getTarget())),
                      t.target &&
                        (l.append(t.target),
                        l.updatePrintLine(t.printLine),
                        e.onRendered(l, t.target)),
                      i == n.length - 1 &&
                        t.referenceElement &&
                        l.updateReferenceElement(t.referenceElement))
                  }))
              }),
            o &&
              o.templates.forEach(function (t, e) {
                var i = t.data || {},
                  o = t.options || {}
                t.template.printPanels.forEach(function (t) {
                  t.getHtml(i, o, n, r)
                })
              }),
            !i)
          ) {
            if (this.lastPaperFooter)
              p[p.length - 1].printLine > this.lastPaperFooter &&
                ((l = s.createNewPage(p.length, l.referenceElement)),
                p.push(l),
                a.append(l.getTarget()))
            ;(this.panelPaperRule &&
              ('odd' == this.panelPaperRule &&
                p.length % 2 == 0 &&
                ((l = s.createNewPage(p.length, l.referenceElement)),
                p.push(l),
                a.append(l.getTarget())),
              'even' == this.panelPaperRule &&
                p.length % 2 == 1 &&
                ((l = s.createNewPage(p.length, l.referenceElement)),
                p.push(l),
                a.append(l.getTarget()))),
              p.forEach(function (n) {
                ;(n.updatePaperNumber(n.index + 1, p.length, e.paperNumberToggleInEven),
                  r.fillPaperHeaderAndFooter(n, t, p.length),
                  e &&
                    (null != e.leftOffset && n.setLeftOffset(e.leftOffset),
                    null != e.topOffset && n.setTopOffset(e.topOffset)))
              }),
              a.prepend(this.getPrintStyle()))
          }
          return a
        }),
        (t.prototype.resize = function (t, e, n, i) {
          ;((this.width = e),
            (this.height = n),
            (this.paperType = t),
            (this.rotate = i),
            this.designPaper.resize(e, n))
        }),
        (t.prototype.rotatePaper = function () {
          ;(null == this.rotate && (this.rotate = !1),
            (this.rotate = !this.rotate),
            this.resize(this.paperType, this.height, this.width, this.rotate))
        }),
        (t.prototype.getTarget = function () {
          return this.target
        }),
        (t.prototype.enable = function () {
          this.target.removeClass('hipanel-disable')
        }),
        (t.prototype.disable = function () {
          this.target.addClass('hipanel-disable')
        }),
        (t.prototype.getPanelEntity = function (t) {
          var e = []
          return (
            this.printElements.forEach(function (n) {
              e.push(n.getPrintElementEntity(t))
            }),
            new rt({
              index: this.index,
              width: this.width,
              height: this.height,
              paperType: this.paperType,
              paperHeader: this.paperHeader,
              paperFooter: this.paperFooter,
              paperNumberDisabled: !!this.paperNumberDisabled || void 0,
              paperNumberFormat: this.paperNumberFormat ? this.paperNumberFormat : void 0,
              panelPaperRule: this.panelPaperRule ? this.panelPaperRule : void 0,
              paperNumberLeft: this.paperNumberLeft,
              paperNumberTop: this.paperNumberTop,
              printElements: e,
              rotate: this.rotate,
              firstPaperFooter: this.firstPaperFooter,
              evenPaperFooter: this.evenPaperFooter,
              oddPaperFooter: this.oddPaperFooter,
              lastPaperFooter: this.lastPaperFooter,
              topOffset: this.topOffset,
              fontFamily: this.fontFamily,
              orient: this.orient,
              leftOffset: this.leftOffset,
            })
          )
        }),
        (t.prototype.createTarget = function () {
          var t = $('<div class="hiprint-printPanel panel-index-' + this.index + '"></div>')
          return (this.css(t), t)
        }),
        (t.prototype.droppablePaper = function (t) {
          var e = this
          t.getTarget().hidroppable({
            accept: '.ep-draggable-item',
            onDrop: function onDrop(n, i) {
              var r = s.a.instance.getDragingPrintElement(),
                a = r.printElement
              ;(a.updateSizeAndPositionOptions(
                e.mathroundToporleft(r.left - o.a.px.toPt(e.target.offset().left)),
                e.mathroundToporleft(r.top - o.a.px.toPt(e.target.offset().top)),
              ),
                a.setTemplateId(e.templateId),
                a.setPanel(e),
                e.appendDesignPrintElement(e.designPaper, a, !0),
                e.printElements.push(a),
                a.design(void 0, t))
            },
          })
        }),
        (t.prototype.initPrintElements = function (t) {
          var e = this
          ;((this.printElements = []),
            t &&
              t.forEach(function (n) {
                var i
                if (
                  (i = n.printElementType
                    ? nt.createPrintElementType(n.printElementType)
                    : a.instance.getElementType(n.tid))
                ) {
                  var o = i.createPrintElement(n.options)
                  ;(o.setTemplateId(e.templateId), o.setPanel(e), e.printElements.push(o))
                } else console.log('miss ' + JSON.stringify(t))
              }))
        }),
        (t.prototype.mathroundToporleft = function (t) {
          var e = p.a.instance.movingDistance
          return Math.round(t / e) * e
        }),
        (t.prototype.appendDesignPrintElement = function (t, e, n) {
          e.setCurrenttemplateData(void 0)
          var i = e.getDesignTarget(t)
          ;(i.addClass('design'), n && e.initSizeByHtml(i), t.append(i))
        }),
        (t.prototype.createNewPage = function (t, e) {
          var n = new T(
            this.templateId,
            this.width,
            this.height,
            this.paperHeader,
            this.paperFooter,
            this.paperNumberLeft,
            this.paperNumberTop,
            this.paperNumberDisabled,
            this.paperNumberFormat,
            t,
            e,
          )
          return (
            n.setFooter(
              this.firstPaperFooter,
              this.evenPaperFooter,
              this.oddPaperFooter,
              this.lastPaperFooter,
            ),
            n.setOffset(this.leftOffset, this.topOffset),
            n
          )
        }),
        (t.prototype.orderPrintElements = function () {
          ;((this.printElements = o.a.orderBy(this.printElements, function (t) {
            return t.options.getLeft()
          })),
            (this.printElements = o.a.orderBy(this.printElements, function (t) {
              return t.options.getTop()
            })))
        }),
        (t.prototype.fillPaperHeaderAndFooter = function (t, e, n) {
          this.printElements
            .filter(function (t) {
              return t.isFixed() || t.isHeaderOrFooter()
            })
            .forEach(function (i) {
              if ((i.isFixed(), i.showInPage(t.index, n))) {
                var o = i.getHtml(t, e)
                o.length && t.append(o[0].target)
              }
            })
        }),
        (t.prototype.clear = function () {
          ;(this.printElements.forEach(function (t) {
            t.designTarget && t.designTarget.length && t.designTarget.remove()
          }),
            (this.printElements = []))
        }),
        (t.prototype.insertPrintElementToPanel = function (t) {
          var e = this.getPrintElementTypeByEntity(t)
          if (e) {
            var n = e.createPrintElement(t.options)
            ;(n.setTemplateId(this.templateId), n.setPanel(this), this.printElements.push(n))
          }
        }),
        (t.prototype.addPrintText = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'text'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.addPrintHtml = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'html'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.addPrintTable = function (t) {
          if (
            ((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'table'),
            t.options && t.options.columns)
          ) {
            var e = $.extend({}, t.options.columns)
            ;((t.printElementType.columns = e.columns), (e.columns = void 0))
          }
          this.insertPrintElementToPanel(t)
        }),
        (t.prototype.addPrintImage = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'image'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.addPrintLongText = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'longText'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.addPrintVline = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'vline'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.addPrintHline = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'hline'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.addPrintRect = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'rect'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.addPrintOval = function (t) {
          ;((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = 'oval'),
            this.insertPrintElementToPanel(t))
        }),
        (t.prototype.getPrintElementTypeByEntity = function (t) {
          var e
          return (
            (e = t.tid
              ? a.instance.getElementType(t.tid)
              : nt.createPrintElementType(t.printElementType)) ||
              console.log('miss ' + JSON.stringify(t)),
            e
          )
        }),
        (t.prototype.getPrintStyle = function () {
          return (
            ' <style printStyle>\n        @page\n        {\n             border:0;\n             padding:0cm;\n             margin:0cm;\n             ' +
            this.getPrintSizeStyle() +
            '\n        }\n        </style>\n        '
          )
        }),
        (t.prototype.getPrintSizeStyle = function () {
          return this.paperType
            ? 'size:' +
                this.paperType +
                ' ' +
                (this.height > this.width ? 'portrait' : 'landscape') +
                ';'
            : 'size:' +
                this.width +
                'mm ' +
                this.height +
                'mm ' +
                (this.orient ? (1 == this.orient ? 'portrait' : 'landscape') : '') +
                ';'
        }),
        (t.prototype.deletePrintElement = function (t) {
          var e = this
          this.printElements.filter(function (n, i) {
            n.id == t.id && (t.delete(), e.printElements.splice(i, 1))
          })
        }),
        (t.prototype.getElementByTid = function (t) {
          return this.printElements
            .filter(function (e) {
              return e.printElementType.tid === t
            })
            .map(function (t, e) {
              return t
            })
        }),
        (t.prototype.getElementByName = function (t) {
          return this.printElements
            .filter(function (e) {
              return e.options.name === t
            })
            .map(function (t, e) {
              return t
            })
        }),
        (t.prototype.getFieldsInPanel = function () {
          var t = []
          return (
            this.printElements.forEach(function (e) {
              e.options && e.options.field
                ? t.push(e.options.field)
                : e.printElementType.field && t.push(e.printElementType.field)
            }),
            t
          )
        }),
        (t.prototype.bindBatchMoveElement = function () {
          var t = this
          this.designPaper
            .getTarget()
            .on('mousemove', function (e) {
              s.a.instance.draging ||
                (1 === e.buttons &&
                  (t.mouseRect.updateRect(e.pageX, e.pageY), t.updateRectPanel(t.mouseRect)))
            })
            .on('mousedown', function (e) {
              s.a.instance.draging ||
                (t.mouseRect && t.mouseRect.target && t.mouseRect.target.remove(),
                1 === e.buttons &&
                  (t.mouseRect = new at(
                    e.pageX,
                    e.pageY,
                    s.a.instance.dragLengthCNum(
                      e.pageX - t.designPaper.getTarget().offset().left,
                      p.a.instance.movingDistance,
                    ),
                    s.a.instance.dragLengthCNum(
                      e.pageY - t.designPaper.getTarget().offset().top,
                      p.a.instance.movingDistance,
                    ),
                  )))
            })
        }),
        (t.prototype.getElementInRect = function (t) {
          var e = []
          return (
            this.printElements.forEach(function (n) {
              n.inRect(t) && e.push(n)
            }),
            e
          )
        }),
        (t.prototype.updateRectPanel = function (t) {
          var e = this,
            n = this.designPaper.getTarget()
          ;(this.mouseRect.target ||
            ((this.mouseRect.target = $(
              '<div tabindex="1" style="z-index:2;position: absolute;opacity:0.2;border: 1px dashed #000;background-color:#31676f;"><span></span></div>',
            )),
            n.find('.hiprint-printPaper-content').append(this.mouseRect.target),
            this.mouseRect.target.focus(),
            this.bingKeyboardMoveEvent(this.mouseRect.target),
            this.mouseRect.target.hidraggable({
              onDrag: function onDrag(t, n, i) {
                ;((e.mouseRect.lastLeft = e.mouseRect.lastLeft ? e.mouseRect.lastLeft : n),
                  (e.mouseRect.lastTop = e.mouseRect.lastTop ? e.mouseRect.lastTop : i),
                  (e.mouseRect.mouseRectSelectedElement || []).forEach(function (t) {
                    t.updatePositionByMultipleSelect(
                      n - e.mouseRect.lastLeft,
                      i - e.mouseRect.lastTop,
                    )
                  }),
                  (e.mouseRect.lastLeft = n),
                  (e.mouseRect.lastTop = i))
              },
              moveUnit: 'pt',
              minMove: p.a.instance.movingDistance,
              onBeforeDrag: function onBeforeDrag(t) {
                ;(e.mouseRect.target.focus(),
                  (s.a.instance.draging = !0),
                  e.mouseRect.mouseRectSelectedElement ||
                    (e.mouseRect.mouseRectSelectedElement = e.getElementInRect(e.mouseRect)))
              },
              onStopDrag: function onStopDrag(t) {
                s.a.instance.draging = !1
              },
            })),
            this.mouseRect.target.css({
              height: t.maxY - t.minY + 'px',
              width: t.maxX - t.minX + 'px',
              left: t.lastLeft + 'pt',
              top: t.lastTop + 'pt',
            }))
        }),
        (t.prototype.bingKeyboardMoveEvent = function (t) {
          var e = this
          ;(t.attr('tabindex', '1'),
            t.keydown(function (t) {
              e.mouseRect.mouseRectSelectedElement ||
                (e.mouseRect.mouseRectSelectedElement = e.getElementInRect(e.mouseRect))
              var n = e.mouseRect.mouseRectSelectedElement || []
              switch (t.keyCode) {
                case 37:
                  ;(e.mouseRect.updatePositionByMultipleSelect(0 - p.a.instance.movingDistance, 0),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(0 - p.a.instance.movingDistance, 0)
                    }),
                    t.preventDefault())
                  break
                case 38:
                  ;(e.mouseRect.updatePositionByMultipleSelect(0, 0 - p.a.instance.movingDistance),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(0, 0 - p.a.instance.movingDistance)
                    }),
                    t.preventDefault())
                  break
                case 39:
                  ;(e.mouseRect.updatePositionByMultipleSelect(p.a.instance.movingDistance, 0),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(p.a.instance.movingDistance, 0)
                    }),
                    t.preventDefault())
                  break
                case 40:
                  ;(e.mouseRect.updatePositionByMultipleSelect(0, p.a.instance.movingDistance),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(0, p.a.instance.movingDistance)
                    }),
                    t.preventDefault())
              }
            }))
        }),
        t
      )
    })(),
    st = (function () {
      return function (t) {
        if (t)
          if (t.panels) {
            this.panels = []
            for (var e = 0; e < t.panels.length; e++) {
              this.panels.push(new rt(t.panels[e]))
            }
          } else this.panels = []
      }
    })(),
    lt = n(9),
    ut = (function () {
      function t(t, e) {
        var n = this
        ;((this.printElementOptionSettingPanel = {}),
          (this.printTemplate = t),
          (this.settingContainer = $(e)),
          o.a.event.on(t.getPrintElementSelectEventKey(), function (t) {
            n.buildSetting(t)
          }),
          o.a.event.on(t.getBuildCustomOptionSettingEventKey(), function (t) {
            n.buildSettingByCustomOptions(t)
          }))
      }
      return (
        (t.prototype.init = function () {}),
        (t.prototype.buildSetting = function (t) {
          var e = this,
            n = this,
            i = t.printElement,
            o = t.customOptionsInput
          this.lastPrintElement &&
            this.lastPrintElement.getPrintElementOptionItems().forEach(function (t) {
              t.destroy()
            })
          ;((this.lastPrintElement = void 0), this.settingContainer.html(''))
          var r = $('<div class="hiprint-option-items"></div>')
          i.getPrintElementOptionItems().forEach(function (t) {
            t.submit = function (t) {
              i.submitOption()
            }
            var n = t.createTarget(i, i.options, i.printElementType)
            ;((e.printElementOptionSettingPanel[t.name] = n),
              r.append(n),
              t.setValue(i.options[t.name], i.options, i.printElementType))
          })
          var a = $(
              '<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">确定</button>',
            ),
            p = $(
              '<button  class="hiprint-option-item-settingBtn hiprint-option-item-deleteBtn"\n        type="button">删除</button>',
            )
          ;(r.append(a),
            r.append(p),
            a.bind('click.submitOption', function () {
              i.submitOption()
            }),
            p.bind('click.deleteBtn', function () {
              n.printTemplate.deletePrintElement(i)
            }),
            r.find('.auto-submit').change(function (t) {
              i.submitOption()
            }),
            r.find('.auto-submit:input').bind('keydown.submitOption', function (t) {
              13 == t.keyCode && i.submitOption()
            }),
            this.settingContainer.append(r),
            o &&
              o.forEach(function (t) {
                var n = t.callback
                ;((t.callback = function (t) {
                  n && (n(t), i.submitOption())
                }),
                  e.buildSettingByCustomOptions(t, e.settingContainer))
              }),
            (this.lastPrintElement = i))
        }),
        (t.prototype.buildSettingByCustomOptions = function (t, e) {
          var n = this
          this.lastPrintElement &&
            this.lastPrintElement.getPrintElementOptionItems().forEach(function (t) {
              t.destroy()
            })
          this.lastPrintElement = void 0
          var i = e || this.settingContainer
          e || this.settingContainer.html('')
          var o = []
          t.optionItems
            ? (o = t.optionItems)
            : Object.keys(t.options).forEach(function (t) {
                var e = lt.a.getItem(t)
                e && o.push(e)
              })
          var r = $('<div class="hiprint-option-items"></div>')
          ;(t.title &&
            r.append(
              '<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' +
                t.title +
                '\n            </div>\n        </div>',
            ),
            o.forEach(function (e) {
              ;((e.submit = function (e) {
                t.callback(n.getValueByOptionItems(o))
              }),
                r.append(e.createTarget(void 0, t.options, void 0)),
                e.setValue(t.options[e.name], t.options, void 0))
            }))
          var a = $(
            '<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">确定</button>',
          )
          ;(r.append(a),
            a.bind('click.submitOption', function () {
              t.callback(n.getValueByOptionItems(o))
            }),
            r.find('.auto-submit').change(function (e) {
              t.callback(n.getValueByOptionItems(o))
            }),
            r.find('.auto-submit:input').bind('keydown.submitOption', function (e) {
              13 == e.keyCode && t.callback(n.getValueByOptionItems(o))
            }),
            i.append(r))
        }),
        (t.prototype.getValueByOptionItems = function (t) {
          var e = {}
          return (
            t.forEach(function (t) {
              e[t.name] = t.getValue()
            }),
            e
          )
        }),
        t
      )
    })(),
    dt = (function () {
      function t(t, e) {
        ;((this.paginationContainer = t),
          (this.jqPaginationContainer = $(this.paginationContainer)),
          (this.template = e))
      }
      return (
        (t.prototype.buildPagination = function (t) {
          var e = this.template.getPaneltotal(),
            n = this
          this.jqPaginationContainer.html('')
          for (
            var i = $('<ul class="hiprint-pagination"></ul>'),
              o = function o() {
                var t = r,
                  e = $('<li><span>' + (t + 1) + '</span><a href="javascript:void(0);">x</a></li>')
                ;(e.find('span').click(function () {
                  ;(n.template.selectPanel(t),
                    e.removeClass('selected'),
                    $(this).parent('li').addClass('selected'))
                }),
                  e.find('a').click(function () {
                    ;(n.template.deletePanel(t), n.buildPagination())
                  }),
                  i.append(e))
              },
              r = 0;
            r < e;
            r++
          ) {
            o()
          }
          var a = $('<li><span>+</span></li>')
          ;(i.append(a),
            this.jqPaginationContainer.append(i),
            a.click(function () {
              ;(n.template.addPrintPanel(void 0, !0), n.buildPagination())
            }))
        }),
        t
      )
    })(),
    ct = (function () {
      function t(t) {
        var e = this
        ;((this.tempimageBase64 = {}),
          (this.id = s.a.instance.guid()),
          s.a.instance.setPrintTemplateById(this.id, this))
        var n = t || {}
        this.printPanels = []
        var i = new st(n.template || [])
        ;(n.template &&
          i.panels.forEach(function (t) {
            e.printPanels.push(new pt(t, e.id))
          }),
          n.fields && (this.fields = n.fields),
          n.settingContainer && new ut(this, n.settingContainer),
          n.paginationContainer &&
            ((this.printPaginationCreator = new dt(n.paginationContainer, this)),
            this.printPaginationCreator.buildPagination()),
          this.initAutoSave())
      }
      return (
        (t.prototype.design = function (t, e) {
          var n = this
          if ((e || (e = {}), 0 == this.printPanels.length)) {
            var i = this.createDefaultPanel()
            this.printPanels.push(i)
          }
          if (!t) throw new Error('options.container can not be empty')
          ;(this.createContainer(t),
            this.printPanels.forEach(function (t, i) {
              ;(n.container.append(t.getTarget()), i > 0 && t.disable(), t.design(e))
            }),
            this.selectPanel(0))
        }),
        (t.prototype.getSimpleHtml = function (t, e) {
          var n = this
          e || (e = {})
          var i = $('<div class="hiprint-printTemplate"></div>')
          t && t.constructor === Array
            ? t.forEach(function (t) {
                t &&
                  n.printPanels.forEach(function (n, o) {
                    i.append(n.getHtml(t, e))
                  })
              })
            : this.printPanels.forEach(function (n, o) {
                i.append(n.getHtml(t, e))
              })
          return (e && e.imgToBase64 && this.transformImg(i.find('img')), i)
        }),
        (t.prototype.getHtml = function (t, e) {
          return (t || (t = {}), this.getSimpleHtml(t, e))
        }),
        (t.prototype.getJointHtml = function (t, e, n) {
          var i = $('<div class="hiprint-printTemplate"></div>'),
            o = []
          return (
            this.printPanels.forEach(function (r, a) {
              i.append(r.getHtml(t, e, o, void 0, n))
            }),
            i
          )
        }),
        (t.prototype.setPaper = function (t, e) {
          if (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(t))
            this.editingPanel.resize(void 0, parseFloat(t), parseFloat(e), !1)
          else {
            var n = s.a.instance[t]
            if (!n) throw new Error('not found pagetype:' + (t || ''))
            this.editingPanel.resize(t, n.width, n.height, !1)
          }
        }),
        (t.prototype.rotatePaper = function () {
          this.editingPanel.rotatePaper()
        }),
        (t.prototype.addPrintPanel = function (t, e) {
          var n = t ? new pt(new rt(t), this.id) : this.createDefaultPanel()
          return (
            t && (t.index = this.printPanels.length),
            e && (this.container.append(n.getTarget()), n.design()),
            this.printPanels.push(n),
            e && this.selectPanel(n.index),
            n
          )
        }),
        (t.prototype.selectPanel = function (t) {
          var e = this
          this.printPanels.forEach(function (n, i) {
            t == i ? (n.enable(), (e.editingPanel = n)) : n.disable()
          })
        }),
        (t.prototype.deletePanel = function (t) {
          ;(this.printPanels[t].clear(),
            this.printPanels[t].getTarget().remove(),
            this.printPanels.splice(t, 1))
        }),
        (t.prototype.getPaneltotal = function () {
          return this.printPanels.length
        }),
        (t.prototype.createDefaultPanel = function () {
          return new pt(
            new rt({
              index: this.printPanels.length,
              paperType: 'A4',
            }),
            this.id,
          )
        }),
        (t.prototype.createContainer = function (t) {
          t
            ? ((this.container = $(t)), this.container.addClass('hiprint-printTemplate'))
            : (this.container = $('<div class="hiprint-printTemplate"></div>'))
        }),
        (t.prototype.getJsonTid = function () {
          var t = []
          return (
            this.printPanels.forEach(function (e) {
              e.getPanelEntity().printElements.length && t.push(e.getPanelEntity())
            }),
            new st({
              panels: t,
            })
          )
        }),
        (t.prototype.getJson = function () {
          var t = []
          return (
            this.printPanels.forEach(function (e) {
              t.push(e.getPanelEntity(!0))
            }),
            new st({
              panels: t,
            })
          )
        }),
        (t.prototype.getPrintElementSelectEventKey = function () {
          return 'PrintElementSelectEventKey_' + this.id
        }),
        (t.prototype.getBuildCustomOptionSettingEventKey = function () {
          return 'BuildCustomOptionSettingEventKey_' + this.id
        }),
        (t.prototype.clear = function () {
          ;(this.printPanels.forEach(function (t) {
            if ((t.clear(), t.index > 0)) {
              var e = t.getTarget()
              e && e.length && e.remove()
            }
          }),
            (this.printPanels = [this.printPanels[0]]),
            this.printPaginationCreator && this.printPaginationCreator.buildPagination())
        }),
        (t.prototype.getPaperType = function (t) {
          return (null == t && (t = 0), this.printPanels[0].paperType)
        }),
        (t.prototype.getOrient = function (t) {
          return (
            null == t && (t = 0),
            this.printPanels[t].height > this.printPanels[t].width ? 1 : 2
          )
        }),
        (t.prototype.getPrintStyle = function (t) {
          return this.printPanels[t].getPrintStyle()
        }),
        (t.prototype.print = function (t, e) {
          ;(t || (t = {}), this.getHtml(t, e).hiwprint())
        }),
        (t.prototype.print2 = function (t, e) {
          if ((t || (t = {}), e || (e = {}), this.clientIsOpened())) {
            var n = this,
              i = 0,
              o = {},
              r = $('link[media=print]').length > 0 ? $('link[media=print]') : $('link')
            r.each(function (a, p) {
              var s = new XMLHttpRequest()
              ;(s.open('GET', $(p).attr('href')),
                (s.onreadystatechange = function () {
                  if (
                    4 === s.readyState &&
                    200 === s.status &&
                    ((o[a + ''] =
                      '<style rel="stylesheet" type="text/css">' + s.responseText + '</style>'),
                    ++i == r.length)
                  ) {
                    for (var p = '', l = 0; l < r.length; l++) {
                      p += o[l + '']
                    }
                    n.sentToClient(p, t, e)
                  }
                }),
                s.send())
            })
          } else alert('连接客户端失败')
        }),
        (t.prototype.imageToBase64 = function (t) {
          var e = $(t).attr('src')
          if (-1 == e.indexOf('base64'))
            try {
              if (!this.tempimageBase64[e]) {
                var n = document.createElement('canvas'),
                  i = new Image()
                ;((i.src = t.attr('src')),
                  (n.width = i.width),
                  (n.height = i.height),
                  n.getContext('2d').drawImage(i, 0, 0),
                  e && (this.tempimageBase64[e] = n.toDataURL('image/png')))
              }
              t.attr('src', this.tempimageBase64[e])
            } catch (e) {
              try {
                this.xhrLoadImage(t)
              } catch (t) {
                console.log(t)
              }
            }
        }),
        (t.prototype.xhrLoadImage = function (t) {}),
        (t.prototype.sentToClient = function (t, e, n) {
          e || (e = {})
          var i = $.extend({}, n || {})
          i.imgToBase64 = !0
          var o = t + this.getHtml(e, i)[0].outerHTML
          ;((i.id = s.a.instance.guid()),
            (i.html = o),
            (i.templateId = this.id),
            hiwebSocket.send(i))
        }),
        (t.prototype.printByHtml = function (t) {
          $(t).hiwprint()
        }),
        (t.prototype.printByHtml2 = function (t, e) {
          if ((e || (e = {}), this.clientIsOpened())) {
            var n = this,
              i = 0,
              o = {},
              r = $('link[media=print]').length > 0 ? $('link[media=print]') : $('link')
            r.each(function (a, p) {
              var l = new XMLHttpRequest()
              ;(l.open('GET', $(p).attr('href')),
                (l.onreadystatechange = function () {
                  if (
                    4 === l.readyState &&
                    200 === l.status &&
                    ((o[a + ''] =
                      '<style rel="stylesheet" type="text/css">' + l.responseText + '</style>'),
                    ++i == r.length)
                  ) {
                    for (var p = '', u = 0; u < r.length; u++) {
                      p += o[u + '']
                    }
                    var d = p + $(t)[0].outerHTML,
                      c = $.extend({}, e || {})
                    ;((c.id = s.a.instance.guid()),
                      (c.html = d),
                      (c.templateId = n.id),
                      hiwebSocket.send(c))
                  }
                }),
                l.send())
            })
          } else alert('连接客户端失败')
        }),
        (t.prototype.deletePrintElement = function (t) {
          this.printPanels.forEach(function (e) {
            e.deletePrintElement(t)
          })
        }),
        (t.prototype.transformImg = function (t) {
          var e = this
          t.map(function (t, n) {
            e.imageToBase64($(n))
          })
        }),
        (t.prototype.toPdf = function (t, e, n) {
          var i = this
          if (this.printPanels.length) {
            var r = o.a.mm.toPt(this.printPanels[0].width),
              a = o.a.mm.toPt(this.printPanels[0].height),
              p = $.extend(
                {
                  scale: 2,
                  width: o.a.pt.toPx(r),
                  x: 0,
                  y: 0,
                  useCORS: !0,
                },
                n || {},
              ),
              s = new jsPDF({
                orientation: 1 == this.getOrient(0) ? 'portrait' : 'landscape',
                unit: 'pt',
                format: this.printPanels[0].paperType
                  ? this.printPanels[0].paperType.toLocaleLowerCase()
                  : [r, a],
              }),
              l = this.getHtml(t, n)
            this.createTempContainer()
            var u = this.getTempContainer()
            ;(this.svg2canvas(l), u.html(l[0]))
            var d = u.find('.hiprint-printPanel .hiprint-printPaper').length
            ;($(l).css('position:fixed'),
              html2canvas(l[0], p).then(function (t) {
                var n = t.getContext('2d')
                ;((n.mozImageSmoothingEnabled = !1),
                  (n.webkitImageSmoothingEnabled = !1),
                  (n.msImageSmoothingEnabled = !1),
                  (n.imageSmoothingEnabled = !1))
                for (var o = t.toDataURL('image/jpeg'), p = 0; p < d; p++) {
                  ;(s.addImage(o, 'JPEG', 0, 0 - p * a, r, d * a), p < d - 1 && s.addPage())
                }
                ;(i.removeTempContainer(), e.indexOf('.pdf') > -1 ? s.save(e) : s.save(e + '.pdf'))
              }))
          }
        }),
        (t.prototype.createTempContainer = function () {
          ;(this.removeTempContainer(),
            $('body').prepend(
              $(
                '<div class="hiprint_temp_Container" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>',
              ),
            ))
        }),
        (t.prototype.removeTempContainer = function () {
          $('.hiprint_temp_Container').remove()
        }),
        (t.prototype.getTempContainer = function () {
          return $('.hiprint_temp_Container')
        }),
        (t.prototype.svg2canvas = function (t) {
          t.find('svg').each(function (t, e) {
            var n = e.parentNode,
              i = document.createElement('canvas'),
              o = new XMLSerializer().serializeToString(e)
            ;(canvg(i, o),
              $(e).before(i),
              n.removeChild(e),
              $(i).css('width', '100%'),
              $(i).css('height', '100%'))
          })
        }),
        (t.prototype.on = function (t, e) {
          o.a.event.on(t + '_' + this.id, e)
        }),
        (t.prototype.clientIsOpened = function () {
          return hiwebSocket.opened
        }),
        (t.prototype.getPrinterList = function () {
          var t = hiwebSocket.getPrinterList()
          return t || []
        }),
        (t.prototype.getElementByTid = function (t, e) {
          return (null == e && (e = 0), this.printPanels[e].getElementByTid(t))
        }),
        (t.prototype.getElementByName = function (t, e) {
          return (null == e && (e = 0), this.printPanels[e].getElementByName(t))
        }),
        (t.prototype.getPanel = function (t) {
          return (null == t && (t = 0), this.printPanels[t])
        }),
        (t.prototype.loadAllImages = function (t, e, n) {
          var i = this
          null == n && (n = 0)
          for (var o = t[0].getElementsByTagName('img'), r = !0, a = 0; a < o.length; a++) {
            var p = o[a]
            p.src &&
              p.src !== window.location.href &&
              -1 == p.src.indexOf('base64') &&
              ((p && void 0 !== p.naturalWidth && 0 !== p.naturalWidth && p.complete) || (r = !1))
          }
          ;(n++,
            !r && n < 10
              ? setTimeout(function () {
                  i.loadAllImages(t, e, n)
                }, 500)
              : e())
        }),
        (t.prototype.setFields = function (t) {
          this.fields = t
        }),
        (t.prototype.getFields = function () {
          return this.fields
        }),
        (t.prototype.getFieldsInPanel = function () {
          var t = []
          return (
            this.printPanels.forEach(function (e) {
              t = t.concat(e.getFieldsInPanel())
            }),
            t
          )
        }),
        (t.prototype.initAutoSave = function () {
          var t = this
          this.autoSave &&
            o.a.event.on('hiprintTemplateDataChanged_' + this.id, function () {
              hiLocalStorage.saveLocalData(
                t.autoSaveKey || 'hiprintAutoSave',
                JSON.stringify(1 == t.autoSaveMode ? t.getJson() : t.getJsonTid()),
              )
            })
        }),
        t
      )
    })()
  function ht(t) {
    this.getHtml(t).hiwprint()
  }
  function ft(t, e, n) {
    $.extend({}, t || {}).imgToBase64 = !0
    var i = new ct({})
    ;(i.on('printSuccess', e), i.on('printError', n), i.printByHtml2(this.getHtml(t), t.options))
  }
  function gt(t) {
    var e = void 0
    return (
      t &&
        t.templates.forEach(function (n, i) {
          var o = $.extend({}, n.options || {})
          ;(t.imgToBase64 && (o.imgToBase64 = !0),
            e
              ? e.append(n.template.getHtml(n.data, o).html())
              : (e = n.template.getHtml(n.data, o)))
        }),
      e
    )
  }
  function mt(t) {
    ;(p.a.instance.init(t),
      p.a.instance.providers.forEach(function (t) {
        t.addElementTypes(a.instance)
      }))
  }
  ;(n.d(e, 'init', function () {
    return mt
  }),
    n.d(e, 'PrintElementTypeManager', function () {
      return it
    }),
    n.d(e, 'PrintElementTypeGroup', function () {
      return ot
    }),
    n.d(e, 'PrintTemplate', function () {
      return ct
    }),
    n.d(e, 'print', function () {
      return ht
    }),
    n.d(e, 'print2', function () {
      return ft
    }),
    n.d(e, 'getHtml', function () {
      return gt
    }),
    $(document).ready(function () {
      hiwebSocket.hasIo() && hiwebSocket.start()
    }))
}
