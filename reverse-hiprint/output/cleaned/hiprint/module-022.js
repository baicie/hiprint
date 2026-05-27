// webpack module 22
export default function (t, e) {
  !(function (t) {
    function e(e) {
      var n = t.data(e.data.target, 'hidraggable'),
        i = n.options,
        o = n.proxy,
        r = e.data,
        a = r.startLeft + e.pageX - r.startX,
        p = r.startTop + e.pageY - r.startY
      ;(o &&
        (o.parent()[0] == document.body
          ? ((a =
              null != i.deltaX && null != i.deltaX
                ? e.pageX + i.deltaX
                : e.pageX - e.data.offsetWidth),
            (p =
              null != i.deltaY && null != i.deltaY
                ? e.pageY + i.deltaY
                : e.pageY - e.data.offsetHeight))
          : (null != i.deltaX && null != i.deltaX && (a += e.data.offsetWidth + i.deltaX),
            null != i.deltaY && null != i.deltaY && (p += e.data.offsetHeight + i.deltaY))),
        e.data.parent != document.body &&
          ((a += t(e.data.parent).scrollLeft()), (p += t(e.data.parent).scrollTop())),
        'h' == i.axis ? (r.left = a) : 'v' == i.axis ? (r.top = p) : ((r.left = a), (r.top = p)))
    }
    function n(e) {
      var n = t.data(e.data.target, 'hidraggable'),
        i = n.options,
        o = n.proxy
      ;(o || (o = t(e.data.target)),
        o.css({
          left: t.fn.dragLengthC(e.data.left, i),
          top: t.fn.dragLengthC(e.data.top, i),
        }),
        t('body').css('cursor', i.cursor))
    }
    function i(i) {
      t.fn.hidraggable.isDragging = !0
      var o = t.data(i.data.target, 'hidraggable'),
        r = o.options,
        a = t('.hidroppable')
          .filter(function () {
            return i.data.target != this
          })
          .filter(function () {
            var e = t.data(this, 'hidroppable').options.accept
            return (
              !e ||
              t(e).filter(function () {
                return this == i.data.target
              }).length > 0
            )
          })
      o.hidroppables = a
      var p = o.proxy
      return (
        p ||
          (r.proxy
            ? ((p =
                'clone' == r.proxy
                  ? t(i.data.target).clone().insertAfter(i.data.target)
                  : r.proxy.call(i.data.target, i.data.target)),
              (o.proxy = p))
            : (p = t(i.data.target))),
        p.css('position', 'absolute'),
        e(i),
        n(i),
        r.onStartDrag.call(i.data.target, i),
        !1
      )
    }
    function o(i) {
      var o = t.data(i.data.target, 'hidraggable')
      ;(e(i),
        0 !=
          o.options.onDrag.call(
            i.data.target,
            i,
            t.fn.dragLengthCNum(i.data.left, o.options),
            t.fn.dragLengthCNum(i.data.top, o.options),
          ) && n(i))
      var r = i.data.target
      return (
        o.hidroppables.each(function () {
          var e = t(this)
          if (!e.hidroppable('options').disabled) {
            var n = e.offset()
            i.pageX > n.left &&
            i.pageX < n.left + e.outerWidth() &&
            i.pageY > n.top &&
            i.pageY < n.top + e.outerHeight()
              ? (this.entered || (t(this).trigger('_dragenter', [r]), (this.entered = !0)),
                t(this).trigger('_dragover', [r]))
              : this.entered && (t(this).trigger('_dragleave', [r]), (this.entered = !1))
          }
        }),
        !1
      )
    }
    function r(e) {
      ;((t.fn.hidraggable.isDragging = !1), o(e))
      var n,
        i,
        r = t.data(e.data.target, 'hidraggable'),
        a = r.proxy,
        p = r.options
      p.revert
        ? 1 == l()
          ? t(e.data.target).css({
              position: e.data.startPosition,
              left: e.data.startLeft,
              top: e.data.startTop,
            })
          : a
            ? (a.parent()[0] == document.body
                ? ((n = e.data.startX - e.data.offsetWidth),
                  (i = e.data.startY - e.data.offsetHeight))
                : ((n = e.data.startLeft), (i = e.data.startTop)),
              a.animate(
                {
                  left: n,
                  top: i,
                },
                function () {
                  s()
                },
              ))
            : t(e.data.target).animate(
                {
                  left: e.data.startLeft,
                  top: e.data.startTop,
                },
                function () {
                  t(e.data.target).css('position', e.data.startPosition)
                },
              )
        : (t(e.data.target).css({
            position: 'absolute',
            left: t.fn.dragLengthC(e.data.left, p),
            top: t.fn.dragLengthC(e.data.top, p),
          }),
          l())
      function s() {
        ;(a && a.remove(), (r.proxy = null))
      }
      function l() {
        var n = !1
        return (
          r.hidroppables.each(function () {
            var i = t(this)
            if (!i.hidroppable('options').disabled) {
              var o = i.offset()
              return e.pageX > o.left &&
                e.pageX < o.left + i.outerWidth() &&
                e.pageY > o.top &&
                e.pageY < o.top + i.outerHeight()
                ? (p.revert &&
                    t(e.data.target).css({
                      position: e.data.startPosition,
                      left: e.data.startLeft,
                      top: e.data.startTop,
                    }),
                  t(this).trigger('_drop', [e.data.target]),
                  s(),
                  (n = !0),
                  (this.entered = !1),
                  !1)
                : void 0
            }
          }),
          n || p.revert || s(),
          n
        )
      }
      return (
        p.onStopDrag.call(e.data.target, e),
        t(document).unbind('.hidraggable'),
        setTimeout(function () {
          t('body').css('cursor', '')
        }, 100),
        !1
      )
    }
    ;((t.fn.hidraggable = function (e, n) {
      return 'string' == typeof e
        ? t.fn.hidraggable.methods[e](this, n)
        : this.each(function () {
            var n,
              a = t.data(this, 'hidraggable')
            a
              ? (a.handle.unbind('.hidraggable'), (n = t.extend(a.options, e)))
              : (n = t.extend(
                  {},
                  t.fn.hidraggable.defaults,
                  t.fn.hidraggable.parseOptions(this),
                  e || {},
                ))
            var p = n.handle
              ? 'string' == typeof n.handle
                ? t(n.handle, this)
                : n.handle
              : t(this)
            function s(e) {
              var n = t.data(e.data.target, 'hidraggable'),
                i = n.handle,
                o = t(i).offset(),
                r = t(i).outerWidth(),
                a = t(i).outerHeight(),
                p = e.pageY - o.top,
                s = o.left + r - e.pageX,
                l = o.top + a - e.pageY,
                u = e.pageX - o.left
              return Math.min(p, s, l, u) > n.options.edge
            }
            ;(t.data(this, 'hidraggable', {
              options: n,
              handle: p,
            }),
              n.disabled
                ? t(this).css('cursor', '')
                : p
                    .unbind('.hidraggable')
                    .bind(
                      'mousemove.hidraggable',
                      {
                        target: this,
                      },
                      function (e) {
                        if (!t.fn.hidraggable.isDragging) {
                          var n = t.data(e.data.target, 'hidraggable').options
                          s(e) ? t(this).css('cursor', n.cursor) : t(this).css('cursor', '')
                        }
                      },
                    )
                    .bind(
                      'mouseleave.hidraggable',
                      {
                        target: this,
                      },
                      function (e) {
                        t(this).css('cursor', '')
                      },
                    )
                    .bind(
                      'mousedown.hidraggable',
                      {
                        target: this,
                      },
                      function (e) {
                        if (0 != s(e)) {
                          t(this).css('cursor', '')
                          var n = t(e.data.target).position(),
                            a = t(e.data.target).offset(),
                            p = {
                              startPosition: t(e.data.target).css('position'),
                              startLeft: n.left,
                              startTop: n.top,
                              left: n.left,
                              top: n.top,
                              startX: e.pageX,
                              startY: e.pageY,
                              offsetWidth: e.pageX - a.left,
                              offsetHeight: e.pageY - a.top,
                              target: e.data.target,
                              parent: t(e.data.target).parent()[0],
                            }
                          ;(t.extend(e.data, p),
                            0 !=
                              t
                                .data(e.data.target, 'hidraggable')
                                .options.onBeforeDrag.call(e.data.target, e) &&
                              (t(document).bind('mousedown.hidraggable', e.data, i),
                              t(document).bind('mousemove.hidraggable', e.data, o),
                              t(document).bind('mouseup.hidraggable', e.data, r)))
                        }
                      },
                    ))
          })
    }),
      (t.fn.hidraggable.methods = {
        options: function options(e) {
          return t.data(e[0], 'hidraggable').options
        },
        proxy: function proxy(e) {
          return t.data(e[0], 'hidraggable').proxy
        },
        enable: function enable(e) {
          return e.each(function () {
            t(this).hidraggable({
              disabled: !1,
            })
          })
        },
        disable: function disable(e) {
          return e.each(function () {
            t(this).hidraggable({
              disabled: !0,
            })
          })
        },
      }),
      (t.fn.hidraggable.parseOptions = function (e) {
        var n = t(e)
        return t.extend(
          {},
          t.hiprintparser.parseOptions(e, [
            'cursor',
            'handle',
            'axis',
            {
              revert: 'boolean',
              deltaX: 'number',
              deltaY: 'number',
              edge: 'number',
            },
          ]),
          {
            disabled: !!n.attr('disabled') || void 0,
          },
        )
      }),
      (t.fn.hidraggable.defaults = {
        proxy: null,
        revert: !1,
        cursor: 'move',
        deltaX: null,
        deltaY: null,
        handle: null,
        disabled: !1,
        edge: 0,
        axis: null,
        onBeforeDrag: function onBeforeDrag(t) {},
        onStartDrag: function onStartDrag(t) {},
        onDrag: function onDrag(t) {},
        onStopDrag: function onStopDrag(t) {},
      }),
      (t.fn.hidraggable.isDragging = !1))
  })(jQuery)
}
