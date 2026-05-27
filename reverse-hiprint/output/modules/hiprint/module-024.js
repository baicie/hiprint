// webpack module 24
export default function (t, e) {
  var n
  ;(((n = jQuery).hiprintparser = {
    parseOptions: function parseOptions(t, e) {
      var i = n(t),
        o = {},
        r = n.trim(i.attr('data-options'))
      if (
        (r &&
          ('{' != r.substring(0, 1) && (r = '{' + r + '}'), (o = new Function('return ' + r)())),
        e)
      ) {
        for (var a = {}, p = 0; p < e.length; p++) {
          var s = e[p]
          if ('string' == typeof s)
            a[s] =
              'width' == s || 'height' == s || 'left' == s || 'top' == s
                ? parseInt(t.style[s]) || void 0
                : i.attr(s)
          else
            for (var l in s) {
              var u = s[l]
              'boolean' == u
                ? (a[l] = i.attr(l) ? 'true' == i.attr(l) : void 0)
                : 'number' == u && (a[l] = '0' == i.attr(l) ? 0 : parseFloat(i.attr(l)) || void 0)
            }
        }
        n.extend(o, a)
      }
      return o
    },
  }),
    (n.fn.dragLengthC = function (t, e) {
      return 'pt' == e.moveUnit ? n.fn.dragLengthCNum(t, e) + 'pt' : n.fn.dragLengthCNum(t, e)
    }),
    (n.fn.dragLengthCNum = function (t, e) {
      var n = 3
      if ('pt' == e.moveUnit) {
        var i = 0.75 * t
        return (e.minMove && (n = e.minMove), Math.round(i / n) * n)
      }
      return Math.round(i / n) * n
    }))
}
