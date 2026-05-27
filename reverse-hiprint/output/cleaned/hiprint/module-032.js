// webpack module 32
export default function (t, e) {
  var n, i
  ;(window,
    document,
    (n = jQuery),
    ((i = function i(t, e) {
      this.init(t, e)
    }).prototype = {
      init: function init(t, e) {
        ;((this.ele = t),
          (this.defaults = {
            menu: [
              {
                text: 'text',
                menus: [{}, {}],
                callback: function callback() {},
              },
            ],
            target: function target(t) {},
            width: 100,
            itemHeight: 28,
            bgColor: '#fff',
            color: '#333',
            fontSize: 14,
            hoverBgColor: '#f5f5f5',
          }),
          (this.opts = n.extend(!0, {}, this.defaults, e)),
          (this.random = new Date().getTime() + parseInt(1e3 * Math.random())),
          this.eventBind())
      },
      renderMenu: function renderMenu(t, e) {
        var n = this,
          i = e
        if (t && t.length) {
          var o = $('<ul class="hicontextmenu" ></ul>')
          ;(i || (i = o).addClass('hicontextmenuroot'),
            $.each(t, function (t, e) {
              var i = !!e.disable && e.disable(),
                r = $(
                  '<li class="hicontextmenuitem"><a href="javascript:void(0);"><span>' +
                    (e.text || '') +
                    '</span></a></li>',
                )
              ;(i && r.addClass('disable'),
                e.borderBottom && r.addClass('borderBottom'),
                e.menus && (r.addClass('hicontextsubmenu'), n.renderMenu(e.menus, r)),
                e.callback &&
                  r.click(function (t) {
                    $(this).hasClass('disable')
                      ? t.stopPropagation()
                      : ($('.hicontextmenuroot').remove(), e.callback(), t.stopPropagation())
                  }),
                o.append(r))
            }),
            e && e.append(o))
        }
        e || $('body').append(i).find('.hicontextmenuroot').hide()
      },
      setPosition: function setPosition(t) {
        $('.hicontextmenuroot')
          .css({
            left: t.pageX + 2,
            top: t.pageY + 2,
          })
          .show()
      },
      eventBind: function eventBind() {
        var t = this
        ;(this.ele.on('contextmenu', function (e) {
          ;($('.hicontextmenuroot').remove(),
            e.preventDefault(),
            t.renderMenu(t.opts.menus),
            t.setPosition(e),
            t.opts.target && 'function' == typeof t.opts.target && t.opts.target(n(this)))
        }),
          n('body').on('click', function () {
            n('.hicontextmenuroot').remove()
          }))
      },
    }),
    (n.fn.hicontextMenu = function (t) {
      return (new i(this, t), this)
    }))
}
