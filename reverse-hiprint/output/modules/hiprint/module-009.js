// webpack module 9
export default function (t, e, n) {
  'use strict'

  var i = (function () {
      function t() {
        this.name = 'lineHeight'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('line-height', e + 'pt'), 'line-height:' + e + 'pt')
            t[0].style.lineHeight = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        字体行高\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    o = (function () {
      function t() {
        this.name = 'fontFamily'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        字体\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="SimSun" >宋体</option>\n            <option value="Microsoft YaHei" >微软雅黑</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('font-family', e), 'font-family:' + e)
            t[0].style.fontFamily = ''
          }
          return null
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    r = (function () {
      function t() {
        this.name = 'fontSize'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('font-size', e + 'pt'), 'font-size:' + e + 'pt')
            t[0].style.fontSize = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        字体大小\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    a = (function () {
      function t() {
        this.name = 'fontWeight'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('font-weight', e), 'font-weight:' + e)
            t[0].style.fontWeight = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        字体粗细\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="lighter" >更细</option>\n        <option value="bold" >粗体</option>\n        <option value="bolder" >粗体+</option>\n            <option value="100" >100</option>\n            <option value="200" >200</option>\n            <option value="300" >300</option>\n            <option value="400" >400</option>\n            <option value="500" >500</option>\n            <option value="600" >600</option>\n            <option value="700" >700</option>\n            <option value="800" >800</option>\n            <option value="900" >900</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    p = (function () {
      function t() {
        this.name = 'letterSpacing'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('letter-spacing', e + 'pt'), 'letter-spacing:' + e + 'pt')
            t[0].style.letterSpacing = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        字间距\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    s = (function () {
      function t() {
        this.name = 'textAlign'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                t.css('text-align', e),
                'justify' == e
                  ? (t.css('text-align-last', 'justify'),
                    t.css('text-justify', 'distribute-all-lines'))
                  : ((t[0].style.textAlignLast = ''), (t[0].style.textJustify = '')),
                'text-align:' + e
              )
            ;((t[0].style.textAlign = ''),
              (t[0].style.textAlignLast = ''),
              (t[0].style.textJustify = ''))
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        左右对齐\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="" >居左</option>\n        <option value="center" >居中</option>\n        <option value="right" >居右</option>\n        <option value="justify" >两端对齐</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    l = (function () {
      function t() {
        this.name = 'hideTitle'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        标题显示隐藏\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="false" >显示</option>\n            <option value="true" >隐藏</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          if ('true' == this.target.find('select').val()) return !0
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val((null == t ? '' : t).toString())
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    u = (function () {
      function t() {
        this.name = 'tableBorder'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('table').length) {
            if ('border' == e)
              return (t.find('table').css('border', '1px solid'), 'border:1px solid')
            'noBorder' == e
              ? t.find('table').css('border', '0px solid')
              : (t.find('table')[0].style.border = '')
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表格边框\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >默认</option>\n            <option value="border" >有边框</option>\n            <option value="noBorder" >无边框</option>\n            </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    d = (function () {
      function t() {
        this.name = 'tableHeaderBorder'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('thead tr').length) {
            if ('border' == e)
              return (t.find('thead tr').css('border', '1px solid'), 'border:1pt solid')
            'noBorder' == e
              ? t.find('thead tr').css('border', '0px solid')
              : 'topBorder' == e
                ? (t.find('thead tr').css('border', '0px solid'),
                  t.find('thead tr').css('border-top', '1px solid'))
                : 'bottomBorder' == e
                  ? (t.find('thead tr').css('border', '0px solid'),
                    t.find('thead tr').css('border-bottom', '1px solid'))
                  : 'topBottomBorder' == e
                    ? (t.find('thead tr').css('border', '0px solid'),
                      t.find('thead tr').css('border-top', '1px solid'),
                      t.find('thead tr').css('border-bottom', '1px solid'))
                    : t.find('thead tr').map(function (t, e) {
                        e.style.border = ''
                      })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表头边框\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>    \n        <option value="border" >有边框</option>\n        <option value="noBorder" >无边框</option>\n        <option value="topBorder" >上边框</option>\n        <option value="bottomBorder" >下边框</option>\n        <option value="topBottomBorder" >上下边框</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    c = (function () {
      function t() {
        this.name = 'tableHeaderCellBorder'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('thead tr td').length) {
            if ('border' == e)
              return (t.find('thead tr td').css('border', '1px solid'), 'border:1px solid')
            'noBorder' == e
              ? t.find('thead tr td').css('border', '0px solid')
              : t.find('thead tr td').map(function (t, e) {
                  e.style.border = ''
                })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表头单元格边框\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>    \n        <option value="border" >有边框</option>\n        <option value="noBorder" >无边框</option>\n      \n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    h = (function () {
      function t() {
        this.name = 'tableHeaderRowHeight'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('thead tr td').length) {
            if (e)
              return (
                t.find('thead tr td:not([rowspan])').css('height', e + 'pt'),
                'height:' + e + 'pt'
              )
            t.find('thead tr td').map(function (t, e) {
              e.style.height = ''
            })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表头行高\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n       \n        <option value="" >默认</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    f = (function () {
      function t() {
        this.name = 'tableHeaderFontSize'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('thead').length) {
            if (e) return (t.find('thead').css('font-size', e + 'pt'), 'font-size:' + e + 'pt')
            t.find('thead').map(function (t, e) {
              e.style.fontSize = ''
            })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表头字体大小\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    g = (function () {
      function t() {
        this.name = 'tableHeaderFontWeight'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('thead').length) {
            if (e) return (t.find('thead tr td').css('font-weight', e), 'font-weight:' + e)
            t.find('thead tr td').map(function (t, e) {
              e.style.fontWeight = ''
            })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表头字体粗细\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit"> \n        <option value="" >默认</option>\n        <option value="lighter" >更细</option>\n        <option value="bold" >粗体</option>\n        <option value="bolder" >粗体+</option>\n        <option value="100" >100</option>\n        <option value="200" >200</option>\n        <option value="300" >300</option>\n        <option value="400" >400</option>\n        <option value="500" >500</option>\n        <option value="600" >600</option>\n        <option value="700" >700</option>\n        <option value="800" >800</option>\n        <option value="900" >900</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    m = (function () {
      function t() {
        this.name = 'tableBodyCellBorder'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('tbody tr td').length) {
            if ('border' == e)
              return (t.find('tbody tr td').css('border', '1px solid'), 'border:1px solid')
            'noBorder' == e
              ? t.find('tbody tr td').css('border', '0px solid')
              : t.find('tbody tr td').map(function (t, e) {
                  e.style.border = ''
                })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n            表体单元格\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >默认</option>\n            <option value="border" >有边框</option>\n            <option value="noBorder" >无边框</option>\n            </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    v = (function () {
      function t() {
        this.name = 'tableBodyRowHeight'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('tbody tr td').length) {
            if (e)
              return (
                t.find('tbody tr td:not([rowspan])').css('height', e + 'pt'),
                'height:' + e + 'pt'
              )
            t.find('tbody tr td').map(function (t, e) {
              e.style.height = ''
            })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n            表体行高\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >默认</option>\n            <option value="6" >6pt</option>\n            <option value="6.75" >6.75pt</option>\n            <option value="7.5" >7.5pt</option>\n            <option value="8.25" >8.25pt</option>\n            <option value="9" >9pt</option>\n            <option value="9.75" >9.75pt</option>\n            <option value="10.5" >10.5pt</option>\n            <option value="11.25" >11.25pt</option>\n            <option value="12" >12pt</option>\n            <option value="12.75" >12.75pt</option>\n            <option value="13.5" >13.5pt</option>\n            <option value="14.25" >14.25pt</option>\n            <option value="15" >15pt</option>\n            <option value="15.75" >15.75pt</option>\n            <option value="16.5" >16.5pt</option>\n            <option value="17.25" >17.25pt</option>\n            <option value="18" >18pt</option>\n            <option value="18.75" >18.75pt</option>\n            <option value="19.5" >19.5pt</option>\n            <option value="20.25" >20.25pt</option>\n            <option value="21" >21pt</option>\n            <option value="21.75" >21.75pt</option>\n            <option value="22.5" >22.5pt</option>\n            <option value="23.25" >23.25pt</option>\n            <option value="24" >24pt</option>\n            <option value="24.75" >24.75pt</option>\n            <option value="25.5" >25.5pt</option>\n            <option value="26.25" >26.25pt</option>\n            <option value="27" >27pt</option>\n            <option value="27.75" >27.75pt</option>\n            <option value="28.5" >28.5pt</option>\n            <option value="29.25" >29.25pt</option>\n            <option value="30" >30pt</option>\n            <option value="30.75" >30.75pt</option>\n            <option value="31.5" >31.5pt</option>\n            <option value="32.25" >32.25pt</option>\n            <option value="33" >33pt</option>\n            <option value="33.75" >33.75pt</option>\n            <option value="34.5" >34.5pt</option>\n            <option value="35.25" >35.25pt</option>\n            <option value="36" >36pt</option>\n            </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    y = (function () {
      function t() {
        this.name = 'tableHeaderBackground'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('thead').length) {
            if (e) return (t.find('thead').css('background', e), 'background:' + e)
            t.find('thead').map(function (t, e) {
              e.style.background = ''
            })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表头背景\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit" />\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          ;(this.target.find('input').minicolors({
            defaultValue: t || '',
            theme: 'bootstrap',
          }),
            this.target.find('input').val(t))
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    b = (function () {
      function t() {
        this.name = 'borderWidth'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        边框大小\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('border-width', e + 'pt'), 'border-width:' + e + 'pt')
            t[0].style.borderWidth = ''
          }
          return null
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    E = (function () {
      function t() {
        this.name = 'barcodeMode'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        条形码格式\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="CODE128A" >CODE128A</option>\n        <option value="CODE128B" >CODE128B</option>\n        <option value="CODE128C" >CODE128C</option>\n        <option value="CODE39" >CODE39</option>\n        <option value="EAN-13" >EAN-13</option>\n        <option value="EAN-8" >EAN-8</option>\n        <option value="EAN-5" >EAN-5</option>\n        <option value="EAN-2" >EAN-2</option>\n        <option value="UPC（A）" >UPC（A）</option>\n        <option value="ITF" >ITF</option>\n        <option value="ITF-14" >ITF-14</option>\n        <option value="MSI" >MSI</option>\n            <option value="MSI10" >MSI10</option>\n            <option value="MSI11" >MSI11</option>\n            <option value="MSI1010" >MSI1010</option>\n            <option value="MSI1110" >MSI1110</option>\n            <option value="Pharmacode" >Pharmacode</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          return t || void 0
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    T = (function () {
      function t() {
        this.name = 'color'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('color', e), 'color:' + e)
            t[0].style.color = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        字体颜色\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          ;(this.target.find('input').minicolors({
            defaultValue: t || '',
            theme: 'bootstrap',
          }),
            this.target.find('input').val(t))
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    P = (function () {
      function t() {
        this.name = 'textDecoration'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        文本修饰\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="underline" >下划线。</option>\n            <option value="overline" >上划线</option>\n            <option value="line-through" >穿梭线</option>\n           \n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('text-decoration', e), 'text-decoration:' + e)
            t[0].style.textDecoration = ''
          }
          return null
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    _ = (function () {
      function t() {
        this.name = 'field'
      }
      return (
        (t.prototype.createTarget = function (t) {
          var e = void 0
          if ((t && (e = t.getFields()), e)) {
            this.isSelect = !0
            var n =
              ' <div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            字段名\n            </div>\n            <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n                <option value="" >请选择字段</option>'
            ;(e.forEach(function (t, e) {
              n += ' <option value="' + (t.field || '') + '" >' + (t.text || '') + '</option>'
            }),
              (n += ' </select>\n            </div>\n        </div>'),
              (this.target = $(n)))
          } else {
            this.isSelect = !1
            this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            字段名\n            </div>\n            <div class="hiprint-option-item-field">\n            <input type="text" placeholder="请输入字段名" class="auto-submit">\n            </div>\n        </div>',
            )
          }
          return this.target
        }),
        (t.prototype.getValue = function () {
          return (
            (this.isSelect ? this.target.find('select').val() : this.target.find('input').val()) ||
            void 0
          )
        }),
        (t.prototype.setValue = function (t) {
          this.isSelect
            ? t &&
              (this.target.find('option[value="' + t + '"]').length ||
                this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'),
              this.target.find('select').val(t))
            : this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    w = (function () {
      function t() {
        this.name = 'title'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        标题\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:50px;" placeholder="请输入标题" class="auto-submit"></textarea>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    x = (function () {
      function t() {
        this.name = 'testData'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        测试数据\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="仅字段名称存在时有效" class="auto-submit" >\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    C = (function () {
      function t() {
        this.name = 'src'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        图片地址\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="请输入图片地址" class="auto-submit">\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    O = (function () {
      function t() {
        this.name = 'borderColor'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('border-color', e), 'border-color:' + e)
            t[0].style.borderColor = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        边框颜色\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit" />\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          ;(this.target.find('input').minicolors({
            defaultValue: t || '',
            theme: 'bootstrap',
          }),
            this.target.find('input').val(t))
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    H = (function () {
      function t() {
        this.name = 'paperNumberFormat'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        页码格式\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="paperNo-paperCount" class="auto-submit">\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    D = (function () {
      function t() {
        this.name = 'paperNumberDisabled'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        启用/禁用\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="false" >启用</option>\n        <option value="true" >禁用</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          if ('true' == this.target.find('select').val()) return !0
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    I = (function () {
      function t() {
        this.name = 'longTextIndent'
      }
      return (
        (t.prototype.css = function (t, e) {
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        每行缩进\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    R = (function () {
      function t() {
        this.name = 'showInPage'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        显示规则\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="first" >首页</option>\n            <option value="odd" >奇数页</option>\n            <option value="even" >偶数页</option>\n            <option value="last" >尾页</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    M = (function () {
      function t() {
        this.name = 'panelPaperRule'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        打印规则\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="odd" >保持奇数</option>\n            <option value="even" >保持偶数</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    S = (function () {
      function t() {
        this.name = 'leftSpaceRemoved'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        移除段落左侧空白\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="true" >移除</option>\n            <option value="false" >不移除</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          if ('false' == this.target.find('select').val()) return !1
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val((null == t ? '' : t).toString())
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    B = (function () {
      function t() {
        this.name = 'firstPaperFooter'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        首页页尾\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="首页页尾" class="auto-submit">\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    F = (function () {
      function t() {
        this.name = 'lastPaperFooter'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        尾页页尾\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="尾页页尾" class="auto-submit">\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    L = (function () {
      function t() {
        this.name = 'evenPaperFooter'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        偶数页页尾\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="偶数页页尾" class="auto-submit">\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    A = (function () {
      function t() {
        this.name = 'oddPaperFooter'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        奇数页页尾\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="奇数页页尾" class="auto-submit" >\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    z = (function () {
      function t() {
        this.name = 'fixed'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        位置固定\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="false" >否</option>\n            <option value="true" >是</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          if ('true' == this.target.find('select').val()) return !0
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val((null == t ? '' : t).toString())
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    k = (function () {
      function t() {
        this.name = 'axis'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        拖动方向\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="v" >横向</option>\n        <option value="h" >竖向</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          return t || void 0
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    N = (function () {
      function t() {
        this.name = 'leftOffset'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        左偏移\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="偏移量pt" class="auto-submit" >\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    V = (function () {
      function t() {
        this.name = 'lHeight'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        最低高度\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="文本过短或为空时的高度" class="auto-submit">\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    W = (function () {
      function t() {
        this.name = 'unShowInPage'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        隐藏规则\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n            <option value="first" >首页</option>\n            <option value="last" >尾页</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    j = (function () {
      function t() {
        this.name = 'tableBodyRowBorder'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t.find('tbody tr').length) {
            if ('border' == e)
              return (t.find('tbody tr').css('border', '1px solid'), 'border:1pt solid')
            'noBorder' == e
              ? t.find('tbody tr').css('border', '0px solid')
              : 'topBorder' == e
                ? (t.find('tbody tr').css('border', '0px solid'),
                  t.find('tbody tr').css('border-top', '1px solid'))
                : 'bottomBorder' == e
                  ? (t.find('tbody tr').css('border', '0px solid'),
                    t.find('tbody tr').css('border-bottom', '1px solid'))
                  : 'topBottomBorder' == e
                    ? (t.find('tbody tr').css('border', '0px solid'),
                      t.find('tbody tr').css('border-top', '1px solid'),
                      t.find('tbody tr').css('border-bottom', '1px solid'))
                    : t.find('tbody tr').map(function (t, e) {
                        e.style.border = ''
                      })
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表体行边框\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>    \n        <option value="border" >有边框</option>\n        <option value="noBorder" >无边框</option>\n        <option value="topBorder" >上边框</option>\n        <option value="bottomBorder" >下边框</option>\n        <option value="topBottomBorder" >上下边框</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    U = (function () {
      function t() {
        this.name = 'transform'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            var n = t.find('.hiprint-printElement-content')
            if (e)
              return (
                n.css('transform', 'rotate(' + e + 'deg)'),
                n.css('-ms-transform', 'rotate(' + e + 'deg)'),
                n.css('-moz-transform', 'rotate(' + e + 'deg)'),
                n.css('-webkit-transform', 'rotate(' + e + 'deg)'),
                n.css('-o-transform', 'rotate(' + e + 'deg)'),
                'transform:rotate(' + e + 'deg)'
              )
            n.length && (n[0].style.transform = '')
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              '<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        旋转角度\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    K = (function () {
      function t() {
        this.name = 'optionsGroup'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        边框设置\n        </div>\n       \n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {}),
        (t.prototype.setValue = function (t) {}),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    G = (function () {
      function t() {
        this.name = 'borderTop'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('border-top-style', e), 'border-top:1px')
            ;((t[0].style.borderTopStyle = ''), (t[0].style.borderTopWidth = ''))
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        上边框\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >否</option>\n            <option value="solid" >实线</option>\n            <option value="dotted" >虚线</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    q = (function () {
      function t() {
        this.name = 'borderLeft'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('border-left-style', e), 'border-left:1px')
            ;((t[0].style.borderLeftStyle = ''), (t[0].style.borderLeftWidth = ''))
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        左边框\n        </div>\n        <div class="hiprint-option-item-field">\n        <select>\n        <option value="" >否</option>\n        <option value="solid" >实线</option>\n        <option value="dotted" >虚线</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    X = (function () {
      function t() {
        this.name = 'borderRight'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('border-right-style', e), 'border-right:1px')
            ;((t[0].style.borderRightStyle = ''), (t[0].style.borderRightWidth = ''))
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        右边框\n        </div>\n        <div class="hiprint-option-item-field">\n        <select>\n        <option value="" >否</option>\n        <option value="solid" >实线</option>\n        <option value="dotted" >虚线</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    Y = (function () {
      function t() {
        this.name = 'borderBottom'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('border-bottom-style', e), 'border-bottom-style:1px solid')
            ;((t[0].style.borderBottomStyle = ''), (t[0].style.borderBottomWidth = ''))
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        下边框\n        </div>\n        <div class="hiprint-option-item-field">\n        <select>\n        <option value="" >否</option>\n        <option value="solid" >实线</option>\n        <option value="dotted" >虚线</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    J = (function () {
      function t() {
        this.name = 'contentPaddingLeft'
      }
      return (
        (t.prototype.css = function (t, e) {
          var n = t.find('.hiprint-printElement-content')
          if (n && n.length) {
            if (e) return (n.css('padding-left', e + 'pt'), 'padding-left')
            n[0].style.paddingLeft = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        左内边距\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    Q = (function () {
      function t() {
        this.name = 'contentPaddingTop'
      }
      return (
        (t.prototype.css = function (t, e) {
          var n = t.find('.hiprint-printElement-content')
          if (n && n.length) {
            if (e) return (n.css('padding-top', e + 'pt'), 'padding-top')
            n[0].style.paddingTop = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        上内边距\n        </div>\n        <div class="hiprint-option-item-field">\n        <select>\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    Z = (function () {
      function t() {
        this.name = 'contentPaddingRight'
      }
      return (
        (t.prototype.css = function (t, e) {
          var n = t.find('.hiprint-printElement-content')
          if (n && n.length) {
            if (e) return (n.css('padding-right', e + 'pt'), 'padding-right')
            n[0].style.paddingRight = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        右内边距\n        </div>\n        <div class="hiprint-option-item-field">\n        <select>\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    tt = (function () {
      function t() {
        this.name = 'contentPaddingBottom'
      }
      return (
        (t.prototype.css = function (t, e) {
          var n = t.find('.hiprint-printElement-content')
          if (n && n.length) {
            if (e) return (n.css('padding-bottom', e + 'pt'), 'padding-bottom')
            n[0].style.paddingBottom = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        下内边距\n        </div>\n        <div class="hiprint-option-item-field">\n        <select>\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    et = (function () {
      function t() {
        this.name = 'borderStyle'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('border-style', e), 'border-style:1px')
            t[0].style.borderStyle = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n       边框样式\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >默认</option>\n            <option value="solid" >实线</option>\n            <option value="dotted" >虚线</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    nt = (function () {
      function t() {
        this.name = 'backgroundColor'
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return (t.css('background-color', e), 'background-color:' + e)
            t[0].style.backgroundColor = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        背景颜色\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          ;(this.target.find('input').minicolors({
            defaultValue: t || '',
            theme: 'bootstrap',
          }),
            this.target.find('input').val(t))
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    it = (function () {
      function t() {
        this.name = 'orient'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        纸张方向(仅自定义纸质有效)\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="1" >纵向</option>\n        <option value="2" >横向</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    ot = (function () {
      function t() {
        this.name = 'textContentVerticalAlign'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        上下对齐\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="middle" >垂直居中</option>\n        <option value="bottom" >底部</option>\n       \n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                'middle' === e && t.addClass('hiprint-text-content-middle'),
                'bottom' === e && t.addClass('hiprint-text-content-bottom'),
                ''
              )
            ;(t.removeClass('hiprint-text-content-middle'),
              t.removeClass('hiprint-text-content-bottom'))
          }
          return null
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    rt = n(5),
    at = (function () {
      function t() {
        this.name = 'columns'
      }
      return (
        (t.prototype.createTarget = function () {
          $('<div class="indicator"></div>').appendTo('body')
          return (
            ' </ul>\n       </div>\n    </div>',
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n       <div>\n            <ul class="hiprint-option-table-selected-columns"> </ul>\n       </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          return this.buildData()
        }),
        (t.prototype.setValue = function (t, e, n) {
          var i = this,
            o = this
          ;((this.value = t), (this.options = e), (this.printElementType = n))
          var r = n.columns[0]
            .filter(function (e) {
              return (
                0 ==
                t[0].columns.filter(function (t) {
                  return e.columnId == t.columnId
                }).length
              )
            })
            .map(function (t) {
              var e = new rt.a(t)
              return ((e.checked = !1), e)
            })
          ;((this.allColumns = t[0].columns.concat(r)),
            t &&
              1 == t.length &&
              (this.target.find('ul').html(
                this.allColumns
                  .map(function (t, e) {
                    return (
                      '<li  class="hiprint-option-table-selected-item"> <div class="hi-pretty p-default">\n                ' +
                      (t.checked
                        ? '<input type="checkbox"   checked column-id="' +
                          (t.columnId || '') +
                          '" />'
                        : '<input type="checkbox"  column-id="' + (t.columnId || '') + '" />') +
                      '\n                <div class="state">\n                    <label></label>\n                </div>\n            </div><span class="column-title">' +
                      (t.title || t.descTitle || '') +
                      '</span></li>'
                    )
                  })
                  .join(''),
              ),
              this.target.find('input').change(function () {
                i.submit()
              }),
              this.printElementType.columnDisplayIndexEditable &&
                this.target
                  .find('li')
                  .hidraggable({
                    revert: !0,
                    handle: '.column-title',
                    moveUnit: 'pt',
                    deltaX: 0,
                    deltaY: 0,
                  })
                  .hidroppable({
                    onDragOver: function onDragOver(t, e) {
                      $(this).css('border-bottom-color', 'red')
                    },
                    onDragLeave: function onDragLeave(t, e) {
                      $(this).css('border-bottom-color', '')
                    },
                    onDrop: function onDrop(t, e) {
                      ;($(e).insertAfter(this), $(this).css('border-bottom-color', ''), o.submit())
                    },
                  })))
        }),
        (t.prototype.buildData = function () {
          var t = this,
            e = []
          return (
            this.allColumns.filter(function (t) {
              t.checked = !1
            }),
            (this.printElementType.columnDisplayEditable
              ? this.target.find('input:checked')
              : this.target.find('input')
            ).map(function (n, i) {
              var o = $(i).attr('column-id'),
                r = t.options.makeColumnObj()
              if (r[o]) ((r[o].checked = !0), e.push(r[o]))
              else {
                var a = t.printElementType.getColumnByColumnId(o)
                if (a) {
                  var p = new rt.a(a)
                  ;((p.checked = !0), e.push(p))
                }
              }
            }),
            (this.value[0].columns = e),
            this.value
          )
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    pt = (function () {
      function t() {
        this.name = 'textType'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        打印类型\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="" >文本</option>\n        <option value="barcode" >条形码</option>\n        <option value="qrcode" >二维码</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    st = (function () {
      function t() {
        this.name = 'topOffset'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        顶部偏移\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="偏移量pt" class="auto-submit">\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('input').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('input').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    lt = (function () {
      function t() {
        this.name = 'gridColumns'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        一行多组\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="2" >一行二列</option>\n        <option value="3" >一行三列</option>\n        <option value="4" >一行四列</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    ut = (function () {
      function t() {
        this.name = 'gridColumnsGutter'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        一行多组间隔\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.25" >7.25pt</option>\n        <option value="8.5" >8.5pt</option>\n        <option value="9" >9pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                t
                  .find('.table-grid-row')
                  .css('margin-left', '-' + e + 'pt')
                  .css('margin-right', '-' + e + 'pt'),
                t
                  .find('.tableGridColumnsGutterRow')
                  .css('padding-left', e + 'pt')
                  .css('padding-right', e + 'pt'),
                null
              )
            ;(t.find('.table-grid-row').map(function (t, e) {
              ;((e.style.marginLeft = ''), (e.style.marginRight = ''))
            }),
              t.find('.tableGridColumnsGutterRow').map(function (t, e) {
                ;((e.style.paddingLeft = ''), (e.style.paddingRight = ''))
              }))
          }
          return null
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    dt = (function () {
      function t() {
        this.name = 'paddingLeft'
      }
      return (
        (t.prototype.css = function (t, e) {
          var n = t
          if (n && n.length) {
            if (e) return (n.css('padding-left', e + 'pt'), 'padding-left')
            n[0].style.paddingLeft = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        左内边距\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    ct = (function () {
      function t() {
        this.name = 'paddingRight'
      }
      return (
        (t.prototype.css = function (t, e) {
          var n = t
          if (n && n.length) {
            if (e) return (n.css('padding-right', e + 'pt'), 'padding-right')
            n[0].style.paddingRight = ''
          }
          return null
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        右内边距\n        </div>\n        <div class="hiprint-option-item-field">\n        <select>\n        <option value="" >默认</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return parseFloat(t.toString())
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target.find('select').prepend('<option value="' + t + '" >' + t + '</option>'))
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    ht = (function () {
      function t() {
        this.name = 'dataType'
      }
      return (
        (t.prototype.createTarget = function () {
          var t = this
          return (
            (this.target = $(
              '\n        <div class="hiprint-option-item-row">\n        <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        数据类型\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="hiprint-option-item-datatype">\n        <option value="" >默认</option>\n        <option value="datetime" >日期时间</option>\n        <option value="boolean" >布尔</option>\n        </select>\n        </div>\n    </div>\n    <div class="hiprint-option-item ">\n        <div class="hiprint-option-item-label ">\n        格式\n        </div>\n        <div class="hiprint-option-item-field">\n        <select  class="auto-submit hiprint-option-item-datatype-select-format">\n        <option value="" >默认</option>\n        \n        </select>\n        <input class="auto-submit  hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">\n        </div>\n    </div>\n        </div>\n        ',
            )),
            $(this.target.find('.hiprint-option-item-datatype')).change(function () {
              var e = $(t.target.find('.hiprint-option-item-datatype')).val()
              ;(t.loadFormatSelectByDataType(e), t.submit(t.getValue()))
            }),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('.hiprint-option-item-datatype').val()
          if (t) {
            var e = this.target.find('.hiprint-option-item-datatype-format').val()
            return {
              dataType: t,
              format: e || void 0,
            }
          }
          return {
            dataType: void 0,
            format: void 0,
          }
        }),
        (t.prototype.setValue = function (t, e) {
          ;(this.target.find('.hiprint-option-item-datatype').val(e.dataType || ''),
            this.loadFormatSelectByDataType(e.dataType),
            this.target.find('.hiprint-option-item-datatype-format').val(e.format || ''))
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        (t.prototype.loadFormatSelectByDataType = function (t) {
          'boolean' === t
            ? (this.target
                .find('.hiprint-option-item-datatype-select-format')
                .removeClass('hiprint-option-item-datatype-format')
                .hide()
                .val(''),
              this.target
                .find('.hiprint-option-item-datatype-input-format')
                .addClass('hiprint-option-item-datatype-format')
                .show())
            : 'datetime' === t
              ? (this.target
                  .find('.hiprint-option-item-datatype-select-format')
                  .addClass('hiprint-option-item-datatype-format')
                  .show(),
                this.target
                  .find('.hiprint-option-item-datatype-input-format')
                  .removeClass('hiprint-option-item-datatype-format')
                  .hide()
                  .val(''),
                this.target
                  .find('.hiprint-option-item-datatype-select-format')
                  .html(
                    '\n            <option value="" >默认</option>\n            <option value="M/d" >M/d</option>\n            <option value="MM/dd" >MM/dd</option>\n            <option value="yy/M/d" >yy/M/d</option>\n            <option value="yy/MM/dd" >yy/MM/dd</option>\n            <option value="yyyy/M/d" >yyyy/M/d</option>\n            <option value="yyyy/MM/dd" >yyyy/MM/dd</option>\n            <option value="yy/M/d H:m" >yy/M/d H:m</option>\n            <option value="yy/M/d H:m:s" >yy/M/d H:m:s</option>\n            <option value="yy/M/d HH:mm" >yy/M/d HH:mm</option>\n            <option value="yy/M/d HH:mm:ss" >yy/M/d HH:mm:ss</option>\n            <option value="yy/MM/dd H:m" >yy/MM/dd H:m</option>\n            <option value="yy/MM/dd H:m:s" >yy/MM/dd H:m:s</option>\n            <option value="yy/MM/dd HH:mm" >yy/MM/dd HH:mm</option>\n            <option value="yy/MM/dd HH:mm:ss" >yy/MM/dd HH:mm:ss</option>\n            <option value="yyyy/M/d H:m" >yyyy/M/dd H:m</option>\n            <option value="yyyy/M/d H:m:s" >yyyy/M/d H:m:s</option>\n            <option value="yyyy/M/d HH:mm" >yyyy/M/d HH:mm</option>\n            <option value="yyyy/M/d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>\n            <option value="yyyy/MM/dd H:m" >yyyy/MM/dd H:m</option>\n            <option value="yyyy/MM/dd H:m:s" >yyyy/MM/dd H:m:s</option>\n            <option value="yyyy/MM/dd HH:mm" >yyyy/MM/dd HH:mm</option>\n            <option value="yyyy/MM/dd HH:mm:ss" >yyyy/MM/dd HH:mm:ss</option>\n\n            <option value="M-d" >M-d</option>\n            <option value="MM-dd" >MM-dd</option>\n            <option value="yy-M-d" >yy-M-d</option>\n            <option value="yy-MM-dd" >yy-MM-dd</option>\n            <option value="yyyy-M-d" >yyyy-M-d</option>\n            <option value="yyyy-MM-dd" >yyyy-MM-dd</option>\n            <option value="yy-M-d H:m" >yy-M-d H:m</option>\n            <option value="yy-M-d H:m:s" >yy-M-d H:m:s</option>\n            <option value="yy-M-d HH:mm" >yy-M-d HH:mm</option>\n            <option value="yy-M-d HH:mm:ss" >yy-M-d HH:mm:ss</option>\n            <option value="yy-MM-dd H:m" >yy-MM-dd H:m</option>\n            <option value="yy-MM-dd H:m:s" >yy-MM-dd H:m:s</option>\n            <option value="yy-MM-dd HH:mm" >yy-MM-dd HH:mm</option>\n            <option value="yy-MM-dd HH:mm:ss" >yy-MM-dd HH:mm:ss</option>\n            <option value="yyyy-M-d H:m" >yyyy-M-d H:m</option>\n            <option value="yyyy-M-d H:m:s" >yyyy-M-d H:m:s</option>\n            <option value="yyyy-M-d HH:mm" >yyyy-M-d HH:mm</option>\n            <option value="yyyy-M-d HH:mm:ss" >yyyy-M-d HH:mm:ss</option>\n            <option value="yyyy-MM-dd H:m" >yyyy-MM-dd H:m</option>\n            <option value="yyyy-MM-dd H:m:s" >yyyy-MM-dd H:m:s</option>\n            <option value="yyyy-MM-dd HH:mm" >yyyy-MM-dd HH:mm</option>\n            <option value="yyyy-MM-dd HH:mm:ss" >yyyy-MM-dd HH:mm:ss</option>\n        ',
                  ))
              : (this.target.find('.hiprint-option-item-datatype-select-format').show(),
                this.target.find('.hiprint-option-item-datatype-input-format').hide().val(''),
                this.target
                  .find('.hiprint-option-item-datatype-format')
                  .html('\n            <option value="" >默认</option>\n        '))
        }),
        t
      )
    })(),
    ft = (function () {
      function t() {
        this.name = 'formatter'
      }
      return (
        (t.prototype.createTarget = function () {
          var t =
            ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        格式化函数\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="' +
            (this.placeholder || '') +
            '" class="auto-submit"></textarea>\n        </div>\n    </div>'
          return ((this.target = $(t)), this.target)
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    gt = (function () {
      function t() {
        this.name = 'styler'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        样式函数\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value, options, target,templateData){}" class="auto-submit"></textarea>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    mt = (function () {
      function t() {
        this.name = 'footerFormatter'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        表格脚函数\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data){ return \'<tr></tr>\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    vt = (function () {
      function t() {
        this.name = 'gridColumnsFooterFormatter'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        多组表格脚函数\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data){ return \'\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    yt = (function () {
      function t() {
        this.name = 'rowStyler'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        行样式函数\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="请输入标题" class="auto-submit"></textarea>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    bt = (function () {
      function t() {
        this.name = 'align'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        单元格左右对齐\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="left" >居左</option>\n        <option value="center" >居中</option>\n        <option value="right" >居右</option>\n        <option value="justify" >两端对齐</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    Et = (function () {
      function t() {
        this.name = 'vAlign'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        单元格上下对齐\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="top" >上</option>\n        <option value="middle" >中</option>\n        <option value="bottom" >居右</option>\n        \n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    Tt = (function () {
      function t() {
        this.name = 'halign'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表格头单元格左右对齐\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="left" >居左</option>\n        <option value="center" >居中</option>\n        <option value="right" >居右</option>\n        <option value="justify" >两端对齐</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    Pt = (function () {
      function t() {
        this.name = 'styler2'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        单元格样式函数\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return {color:\'red\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    _t = (function () {
      function t() {
        this.name = 'formatter2'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        单元格格式化函数\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return \'\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('textarea').val()
          if (t) return t
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('textarea').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    wt = (function () {
      function t() {
        this.name = 'autoCompletion'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        自动补全\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="true" >是</option>\n        <option value="false" >否</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          if ('true' == this.target.find('select').val()) return !0
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val((null == t ? '' : t).toString())
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    xt = (function () {
      function t() {
        this.name = 'tableFooterRepeat'
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ' <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        表格脚显示\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >默认</option>\n        <option value="no" >不显示</option>\n        <option value="page" >每页显示</option>\n        <option value="last" >最后显示</option>\n        </select>\n        </div>\n    </div>',
            )),
            this.target
          )
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find('select').val()
          if (t) return t.toString()
        }),
        (t.prototype.setValue = function (t) {
          this.target.find('select').val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })()
  n.d(e, 'a', function () {
    return Ct
  })
  var Ct = (function () {
    function t() {}
    return (
      (t.init = function () {
        t.printElementOptionItems ||
          ((t.printElementOptionItems = {}),
          t._printElementOptionItems.forEach(function (e) {
            t.printElementOptionItems[e.name] = e
          }))
      }),
      (t.registerItem = function (e) {
        if (!e.name) throw new Error('styleItem must have name')
        ;(t.init(), (t.printElementOptionItems[e.name] = e))
      }),
      (t.getItem = function (e) {
        return (t.init(), t.printElementOptionItems[e])
      }),
      (t._printElementOptionItems = [
        new o(),
        new r(),
        new a(),
        new p(),
        new i(),
        new s(),
        new l(),
        new pt(),
        new u(),
        new d(),
        new c(),
        new h(),
        new f(),
        new g(),
        new m(),
        new v(),
        new y(),
        new b(),
        new E(),
        new T(),
        new P(),
        new _(),
        new w(),
        new x(),
        new C(),
        new O(),
        new H(),
        new D(),
        new I(),
        new R(),
        new M(),
        new S(),
        new B(),
        new F(),
        new L(),
        new A(),
        new z(),
        new k(),
        new st(),
        new N(),
        new V(),
        new W(),
        new j(),
        new U(),
        new K(),
        new G(),
        new q(),
        new X(),
        new Y(),
        new Q(),
        new J(),
        new Z(),
        new tt(),
        new et(),
        new nt(),
        new it(),
        new ot(),
        new at(),
        new lt(),
        new ut(),
        new dt(),
        new ct(),
        new ht(),
        new ft(),
        new gt(),
        new mt(),
        new vt(),
        new yt(),
        new bt(),
        new Tt(),
        new Et(),
        new Pt(),
        new _t(),
        new wt(),
        new xt(),
      ]),
      t
    )
  })()
}
