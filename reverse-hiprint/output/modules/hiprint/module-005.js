// webpack module 5
export default function (t, e, n) {
  'use strict'

  var i = (function () {
      function t() {}
      return (
        (t.prototype.init = function (t) {
          ;((this.target = $('<input type="text" class="hitable-editor-text" value="" />')),
            t.getTarget().append(this.target),
            this.target.focus())
        }),
        (t.prototype.getValue = function () {
          return this.target.val()
        }),
        (t.prototype.setValue = function (t) {
          this.target.val(t)
        }),
        (t.prototype.destroy = function () {
          this.target.remove()
        }),
        t
      )
    })(),
    o = (function () {
      function t() {
        this.text = new i()
      }
      return (
        Object.defineProperty(t, 'Instance', {
          get: function get() {
            return (t._instance || (t._instance = new t()), t._instance)
          },
          enumerable: !0,
          configurable: !0,
        }),
        t
      )
    })(),
    r = (function () {
      function t() {}
      return (
        Object.defineProperty(t, 'Instance', {
          get: function get() {
            return (o._instance || (t._instance = new t()), t._instance)
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.createEditor = function (t) {
          return $.extend({}, o.Instance[t])
        }),
        t
      )
    })(),
    a = n(10),
    p = n(14),
    s = n(11),
    l = (function () {
      function t() {}
      return (
        (t.prototype.init = function (t, e) {
          var n = this
          ;((this.tableOptions = e),
            (this.title = t.title),
            (this.field = t.field),
            t
              .getTarget()
              .unbind('dblclick.hitable')
              .bind('dblclick.hitable', function () {
                ;((t.isEditing = !0), n.beginEdit(t))
              }))
        }),
        (t.prototype.getDisplayHtml = function () {
          return this.title
        }),
        (t.prototype.beginEdit = function (t) {
          var e = this
          ;((this.editor = r.Instance.createEditor('text')),
            t.getTarget().html(''),
            this.editor.init(t),
            (this.title || this.field) &&
              (this.tableOptions.options.isEnableEditField
                ? this.editor.setValue((this.title || '') + '#' + (this.field || ''))
                : this.editor.setValue(this.title || '')),
            $(this.editor.target).keydown(function (n) {
              13 == n.keyCode && e.endEdit(t)
            }),
            $(this.editor.target).blur(function (n) {
              e.endEdit(t)
            }),
            this.tableOptions.editingCell &&
              this.tableOptions.editingCell.id != t.id &&
              this.tableOptions.editingCell.innerElement.endEdit(this.tableOptions.editingCell),
            (this.tableOptions.editingCell = t))
        }),
        (t.prototype.endEdit = function (t) {
          var e = this.editor.getValue()
          if (e) {
            if (this.tableOptions.options.isEnableEditField) {
              var n = e.split('#')
              ;((t.title = this.title = n[0]), n.length > 0 && (t.field = this.field = n[1]))
            } else t.title = this.title = e
          } else
            this.tableOptions.options.isEnableEditField
              ? ((t.title = this.title = ''), (t.field = this.field = ''))
              : (t.title = this.title = '')
          ;(this.editor.destroy(), t.getTarget().html(this.title))
        }),
        t
      )
    })(),
    u = (function () {
      return function (t) {
        ;((this.title = t.title),
          (this.field = t.field),
          (this.width = t.width),
          (this.align = t.align),
          (this.halign = t.halign),
          (this.vAlign = t.vAlign),
          (this.colspan = t.colspan),
          (this.rowspan = t.rowspan),
          (this.checked = t.checked),
          (this.columnId = t.columnId),
          (this.formatter2 = t.formatter2),
          (this.styler2 = t.styler2))
      }
    })(),
    d = (function () {
      function t() {
        this.id = s.a.createId()
      }
      return (
        (t.prototype.init = function (t, e, n, i) {
          ;((this.isHead = i), (this.rowId = n), (this.isEditing = !1))
          var o = /^[0-9]*$/
          ;((this.target = t), (this.tableOptions = e))
          var r = this.target.attr('colspan')
          this.colspan = o.test(r) ? parseInt(r) : 1
          var a = this.target.attr('rowspan')
          ;((this.rowspan = o.test(a) ? parseInt(a) : 1),
            this.initEvent(),
            this.isHead && this.initInnerEelement())
        }),
        (t.prototype.beginEdit = function () {
          if (
            !this.isEditing &&
            this.tableOptions.isEnableEdit &&
            this.tableOptions.onBeforEdit(this)
          ) {
            var t = this.getValue()
            ;((this.editor = r.Instance.createEditor('text')),
              (this.isEditing = !0),
              (this.tableOptions.editingCell = this),
              this.target.html(''),
              this.editor.init(this),
              this.editor.setValue(t))
          }
        }),
        (t.prototype.endEdit = function () {
          this.isEditing = !1
          var t = this.editor.getValue()
          ;(this.editor.destroy(), this.target.html(t))
        }),
        (t.prototype.getTarget = function () {
          return this.target
        }),
        (t.prototype.getValue = function () {
          return this.target.html()
        }),
        (t.prototype.setValue = function (t) {}),
        (t.prototype.initInnerEelement = function () {
          ;((this.innerElement = new l()), this.innerElement.init(this, this.tableOptions))
        }),
        (t.prototype.initEvent = function () {}),
        (t.prototype.isXYinCell = function (t, e) {
          var n = new a.b({
            x: t,
            y: e,
            height: 0,
            width: 0,
          })
          return this.isOverlap(n)
        }),
        (t.prototype.getTableRect = function () {
          return new a.b({
            x: this.target.offset().left,
            y: this.target.offset().top,
            height: this.target[0].offsetHeight,
            width: this.target[0].offsetWidth,
          })
        }),
        (t.prototype.isOverlap = function (t) {
          var e = this.getTableRect()
          return (
            t.x + t.width > e.x &&
            e.x + e.width > t.x &&
            t.y + t.height > e.y &&
            e.y + e.height > t.y
          )
        }),
        (t.prototype.isInRect = function (t) {
          var e = t.rect,
            n = this.getTableRect()
          if (
            e.x + e.width > n.x &&
            n.x + n.width > e.x &&
            e.y + e.height > n.y &&
            n.y + n.height > e.y
          ) {
            var i = p.a.mergeRect(e, n)
            return JSON.stringify(e) == JSON.stringify(i) || ((t.changed = !0), (t.rect = i), !0)
          }
          return !1
        }),
        (t.prototype.isSelected = function () {
          return this.target.hasClass('selected')
        }),
        (t.prototype.select = function () {
          this.target.addClass('selected')
        }),
        (t.prototype.isHeader = function () {
          return !1
        }),
        (t.prototype.setAlign = function (t) {
          ;((this.align = t),
            t ? this.target.css('text-align', t) : (this.target[0].style.textAlign = ''))
        }),
        (t.prototype.setVAlign = function (t) {
          ;((this.vAlign = t),
            t ? this.target.css('vertical-align', t) : (this.target[0].style.verticalAlign = ''))
        }),
        (t.prototype.getEntity = function () {
          return new u(this)
        }),
        t
      )
    })()
  n.d(e, 'a', function () {
    return f
  })
  var _c,
    h =
      ((_c = function c(t, e) {
        return (_c =
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
        ;(_c(t, e),
          (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n())))
      }),
    f = (function (t) {
      function e(e) {
        var n = this
        return (
          (e = e || {}),
          ((n = t.call(this) || this).width = e.width ? parseFloat(e.width.toString()) : 100),
          (n.title = e.title),
          (n.descTitle = e.descTitle),
          (n.field = e.field),
          (n.fixed = e.fixed),
          (n.rowspan = e.rowspan ? parseInt(e.rowspan) : 1),
          (n.colspan = e.colspan ? parseInt(e.colspan) : 1),
          (n.align = e.align),
          (n.halign = e.halign),
          (n.vAlign = e.vAlign),
          (n.formatter = e.formatter),
          (n.styler = e.styler),
          (n.formatter2 = e.formatter2),
          (n.styler2 = e.styler2),
          (n.checkbox = e.checkbox),
          (n.checked = 0 != e.checked),
          (n.columnId = e.columnId || e.field),
          n
        )
      }
      return (h(e, t), (e.prototype.css = function (t) {}), e)
    })(d)
}
