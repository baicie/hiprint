// webpack module 25
export default function (t, e) {
  var n, i, o
  ;((n = jQuery),
    (i = {
      maxPanelIndex: 0,
    }),
    ((o = function o(t) {
      ;((this.options = n.data(t.target, 'hireizeable').options), this.init(t.target))
    }).prototype = {
      numHandlerText: function numHandlerText(t) {
        return this.numHandler(t) + 'pt'
      },
      numHandler: function numHandler(t) {
        var e = 1.5,
          n = 0.75 * t
        return (this.options.minResize && (e = this.options.minResize), Math.round(n / e) * e)
      },
      init: function init(t) {
        this.initResizeBox(t)
      },
      initResizeBox: function initResizeBox(t) {
        var e = this
        ;(n(t).each(function () {
          var o
          ;((i.maxPanelIndex += 1),
            e.options.noContainer
              ? (o = n(t))
              : (o = n('<div panelIndex=' + i.maxPanelIndex + ' class="resize-panel"></div>')).css({
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  position: 'absolute',
                  'background-color': 'rgba(0,0,0,0.5)',
                  cursor: 'move',
                  display: 'none',
                }),
            e.appendHandler(o, n(this)))
          var r = {
              name: 'n',
              target: n(
                '<div class="n resizebtn" style="cursor: n-resize;top: -12px;margin-left: -4px;left: 50%;"></div>',
              ),
            },
            a = {
              name: 's',
              target: n(
                '<div class="s resizebtn" style="cursor: s-resize;bottom: -12px;margin-left: -4px;left: 50%;"></div>',
              ),
            },
            p = {
              name: 'w',
              target: n(
                '<div class="w resizebtn" style="cursor: w-resize;left: -12px;margin-top: -4px;top: 50%;"></div>',
              ),
            },
            s = {
              name: 'e',
              target: n(
                '<div class="e resizebtn" style="cursor: e-resize; top: 50%; margin-top:-4px;right: -12px;"></div>',
              ),
            },
            l = {
              name: 'ne',
              target: n(
                '<div class="ne resizebtn" style="cursor: ne-resize;top: -12px;right: -12px;"></div>',
              ),
            },
            u = {
              name: 'nw',
              target: n(
                '<div class="nw resizebtn" style=" cursor: nw-resize;top: -12px;left:-12px;"></div>',
              ),
            },
            d = {
              name: 'se',
              target: n(
                '<div class="se resizebtn" style="cursor: se-resize;bottom:-12px;right: -12px;"></div>',
              ),
            },
            c = {
              name: 'sw',
              target: n(
                '<div class="sw resizebtn" style="cursor: sw-resize;bottom: -12px;left: -12px;"></div>',
              ),
            },
            h = function h() {
              var t = [],
                i = e.options.showPoints
              return (
                n.each([r, a, p, s, l, u, d, c], function (e, o) {
                  n.inArray(o.name, i) > -1 && t.push(o.target)
                }),
                t
              )
            }
          ;(e.addHandlerCss(h()), e.appendHandler(h(), o), e.bindResizeEvent(o, n(this)))
          var f = n(this)
          ;(n(o).on('mousedown', '.resizebtn', function () {
            f.addClass('resizeing')
          }),
            n('.easyui-droppable').on('mouseup', function () {
              f.removeClass('resizeing')
            }),
            e.bindTrigger(n(this)))
        }),
          e.bindHidePanel())
      },
      addHandlerCss: function addHandlerCss(t) {
        for (var e = 0; e < t.length; e++) {
          t[e].css({
            position: 'absolute',
            width: '8px',
            height: '8px',
            background: '#ff6600',
            'border-radius': '50%',
          })
        }
      },
      appendHandler: function appendHandler(t, e) {
        for (var n = 0; n < t.length; n++) {
          e.append(t[n])
        }
      },
      triggerResize: function triggerResize(t) {
        ;(t.siblings().children('div[panelindex]').css({
          display: 'none',
        }),
          t.children('div[panelindex]').css({
            display: 'block',
          }))
      },
      bindResizeEvent: function bindResizeEvent(t, e) {
        var i = this,
          o = 0,
          r = 0,
          a = t.width(),
          p = t.height(),
          s = t.offset().left,
          l = t.offset().top,
          u = i.options.noContainer ? n(e) : t.parent(),
          d = !1
        t.on('mousedown', '.e', function (e) {
          ;((o = e.pageX), (a = t.width()), (d = !0))
        })
        var c = !1
        t.on('mousedown', '.s', function (e) {
          ;((r = e.pageY), (p = t.height()), (c = !0))
        })
        var h = !1
        t.on('mousedown', '.w', function (e) {
          ;((o = e.pageX), (a = t.width()), (h = !0), (s = u.offset().left))
        })
        var f = !1
        t.on('mousedown', '.n', function (e) {
          ;((r = e.pageY), (p = t.height()), (f = !0), (l = u.offset().top))
        })
        var g = !1
        t.on('mousedown', '.ne', function (e) {
          ;((o = e.pageX),
            (r = e.pageY),
            (a = t.width()),
            (p = t.height()),
            (g = !0),
            (l = u.offset().top))
        })
        var m = !1
        t.on('mousedown', '.nw', function (e) {
          ;((o = e.pageX),
            (r = e.pageY),
            (a = t.width()),
            (p = t.height()),
            (l = u.offset().top),
            (s = u.offset().left),
            (m = !0))
        })
        var v = !1
        t.on('mousedown', '.se', function (e) {
          ;((o = e.pageX), (r = e.pageY), (a = t.width()), (p = t.height()), (v = !0))
        })
        var y = !1
        t.on('mousedown', '.sw', function (e) {
          ;((o = e.pageX),
            (r = e.pageY),
            (a = t.width()),
            (p = t.height()),
            (y = !0),
            (s = u.offset().left))
        })
        var b = !1
        ;(t.on('mousedown', function (t) {
          ;(i.options.onBeforeResize(),
            (o = t.pageX),
            (r = t.pageY),
            (l = u.offset().top),
            (s = u.offset().left),
            (b = !1))
        }),
          n(i.options.stage)
            .on('mousemove', function (e) {
              if (d) {
                var n = e.pageX - o
                ;(t.css({
                  width: '100%',
                }),
                  u.css({
                    width: i.numHandlerText(a + n),
                  }),
                  i.options.onResize(e, void 0, i.numHandler(a + n), void 0, void 0))
              } else if (c) {
                var E = e.pageY - r
                ;(t.css({
                  height: '100%',
                }),
                  u.css({
                    height: i.numHandlerText(p + E),
                  }),
                  i.options.onResize(e, i.numHandler(p + E), void 0, void 0, void 0))
              } else
                h
                  ? ((n = e.pageX - o),
                    t.css({
                      width: '100%',
                    }),
                    u.css({
                      width: i.numHandlerText(a - n),
                      left: i.numHandlerText(i.options.noDrag ? void 0 : i.numHandler(s + n)),
                    }),
                    i.options.onResize(
                      e,
                      void 0,
                      i.numHandler(a - n),
                      void 0,
                      i.options.noDrag ? void 0 : i.numHandler(s + n),
                    ))
                  : f
                    ? ((E = e.pageY - r),
                      t.css({
                        height: '100%',
                      }),
                      u.css({
                        height: i.numHandlerText(p - E),
                        top: i.numHandlerText(i.options.noDrag ? void 0 : l + E),
                      }),
                      i.options.onResize(
                        e,
                        i.numHandler(p - E),
                        void 0,
                        i.options.noDrag ? void 0 : i.numHandler(l + E),
                        void 0,
                      ))
                    : g
                      ? ((n = e.pageX - o),
                        (E = e.pageY - r),
                        t.css({
                          height: '100%',
                          width: '100%',
                        }),
                        u.css({
                          height: i.numHandlerText(p - E),
                          top: i.numHandlerText(i.options.noDrag ? void 0 : l + E),
                          width: i.numHandlerText(a + n),
                        }),
                        i.options.onResize(
                          e,
                          i.numHandler(p - E),
                          i.numHandler(a + n),
                          i.options.noDrag ? void 0 : i.numHandler(l + E),
                          void 0,
                        ))
                      : m
                        ? ((n = e.pageX - o),
                          (E = e.pageY - r),
                          t.css({
                            height: '100%',
                            width: '100%',
                          }),
                          u.css({
                            height: i.numHandlerText(p - E),
                            top: i.numHandlerText(i.options.noDrag ? void 0 : l + E),
                            width: i.numHandlerText(a - n),
                            left: i.numHandlerText(i.options.noDrag ? void 0 : s + n),
                          }),
                          i.options.onResize(
                            e,
                            i.numHandler(p - E),
                            i.numHandler(a - n),
                            i.options.noDrag ? void 0 : i.numHandler(l + E),
                            i.options.noDrag ? void 0 : i.numHandler(s + n),
                          ))
                        : v
                          ? ((n = e.pageX - o),
                            (E = e.pageY - r),
                            t.css({
                              width: '100%',
                              height: '100%',
                            }),
                            u.css({
                              width: i.numHandlerText(a + n),
                              height: i.numHandlerText(p + E),
                            }),
                            i.options.onResize(
                              e,
                              i.numHandler(p + E),
                              i.numHandler(a + n),
                              void 0,
                              void 0,
                            ))
                          : y
                            ? ((n = e.pageX - o),
                              (E = e.pageY - r),
                              t.css({
                                width: '100%',
                                height: '100%',
                              }),
                              u.css({
                                width: i.numHandlerText(a - n),
                                left: i.numHandlerText(i.options.noDrag ? void 0 : s + n),
                                height: i.numHandlerText(p + E),
                              }),
                              i.options.onResize(
                                e,
                                i.numHandler(p + E),
                                i.numHandler(a - n),
                                i.numHandler(otundefinedop),
                                i.options.noDrag ? void 0 : i.numHandler(s + n),
                              ))
                            : b &&
                              ((n = e.pageX - o),
                              (E = e.pageY - r),
                              u.css({
                                left: i.numHandlerText(i.options.noDrag ? void 0 : s + n),
                                top: i.numHandlerText(i.options.noDrag ? void 0 : l + E),
                              }),
                              i.options.onResize(
                                e,
                                void 0,
                                void 0,
                                i.options.noDrag ? void 0 : i.numHandler(l + E),
                                i.options.noDrag ? void 0 : i.numHandler(s + n),
                              ))
            })
            .on('mouseup', function (t) {
              ;((d = !1),
                (c = !1),
                (h = !1),
                (f = !1),
                (g = !1),
                (m = !1),
                (y = !1),
                (v = !1),
                (b = !1),
                i.options.onStopResize())
            }))
      },
      bindTrigger: function bindTrigger(t) {
        var e = this
        t.on('click', function (n) {
          ;(n.stopPropagation(), e.triggerResize(t))
        })
      },
      bindHidePanel: function bindHidePanel(t) {
        if (i.maxPanelIndex < 2) {
          var e = this.options.stage
          n(e).bind('click', function (t) {
            ;(t.stopPropagation(),
              n('div[panelindex]').css({
                display: 'none',
              }))
          })
        }
      },
    }),
    n.fn.extend({
      hireizeable: function hireizeable(t) {
        return this.each(function () {
          var e,
            i = n.data(this, 'hireizeable')
          ;((e = i ? n.extend(i.options, _1f) : n.extend({}, n.fn.hireizeable.defaults, t || {})),
            n.data(this, 'hireizeable', {
              options: e,
            }),
            new o({
              target: this,
              onResize: function onResize(t, e, n, i, o) {},
              onStopResize: function onStopResize(t, e, n, i, o) {},
            }))
        })
      },
    }),
    (n.fn.hireizeable.defaults = {
      stage: document,
      reizeUnit: 'pt',
      minResize: 1.5,
      showPoints: ['s', 'e'],
      noContainer: !1,
      onBeforeResize: function onBeforeResize(t, e, n, i, o) {},
      onResize: function onResize(t, e, n, i, o) {},
      onStopResize: function onStopResize(t, e, n, i, o) {},
      noDrag: !1,
    }))
}
