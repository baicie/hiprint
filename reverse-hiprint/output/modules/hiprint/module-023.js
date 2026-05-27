// webpack module 23
export default function (t, e) {
  !(function (t) {
    ;((t.fn.hidroppable = function (e, n) {
      return 'string' == typeof e
        ? t.fn.hidroppable.methods[e](this, n)
        : ((e = e || {}),
          this.each(function () {
            var n,
              i = t.data(this, 'hidroppable')
            i
              ? t.extend(i.options, e)
              : (t((n = this)).addClass('hidroppable'),
                t(n).bind('_dragenter', function (e, i) {
                  t.data(n, 'hidroppable').options.onDragEnter.apply(n, [e, i])
                }),
                t(n).bind('_dragleave', function (e, i) {
                  t.data(n, 'hidroppable').options.onDragLeave.apply(n, [e, i])
                }),
                t(n).bind('_dragover', function (e, i) {
                  t.data(n, 'hidroppable').options.onDragOver.apply(n, [e, i])
                }),
                t(n).bind('_drop', function (e, i) {
                  t.data(n, 'hidroppable').options.onDrop.apply(n, [e, i])
                }),
                t.data(this, 'hidroppable', {
                  options: t.extend(
                    {},
                    t.fn.hidroppable.defaults,
                    t.fn.hidroppable.parseOptions(this),
                    e,
                  ),
                }))
          }))
    }),
      (t.fn.hidroppable.methods = {
        options: function options(e) {
          return t.data(e[0], 'hidroppable').options
        },
        enable: function enable(e) {
          return e.each(function () {
            t(this).hidroppable({
              disabled: !1,
            })
          })
        },
        disable: function disable(e) {
          return e.each(function () {
            t(this).hidroppable({
              disabled: !0,
            })
          })
        },
      }),
      (t.fn.hidroppable.parseOptions = function (e) {
        var n = t(e)
        return t.extend({}, t.hiprintparser.parseOptions(e, ['accept']), {
          disabled: !!n.attr('disabled') || void 0,
        })
      }),
      (t.fn.hidroppable.defaults = {
        accept: null,
        disabled: !1,
        onDragEnter: function onDragEnter(t, e) {},
        onDragOver: function onDragOver(t, e) {},
        onDragLeave: function onDragLeave(t, e) {},
        onDrop: function onDrop(t, e) {},
      }))
  })(jQuery)
}
