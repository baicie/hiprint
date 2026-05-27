// webpack module 14
export default function (t, e, n) {
  'use strict'

  n.d(e, 'a', function () {
    return o
  })
  var i = n(10),
    o = (function () {
      function t() {}
      return (
        (t.mergeRect = function (t, e) {
          var n = Math.min(t.x, e.x),
            o = Math.min(t.y, e.y)
          return new i.b({
            x: n,
            y: o,
            height: Math.max(t.y + t.height, e.y + e.height) - o,
            width: Math.max(t.x + t.width, e.x + e.width) - n,
          })
        }),
        (t.Rect = function (t, e, n, i) {
          return {
            minX: t < n ? t : n,
            minY: e < i ? e : i,
            maxX: t < n ? n : t,
            maxY: e < i ? i : e,
          }
        }),
        t
      )
    })()
}
