// browserify module 254
// deps: {
//   118: 118,
//   249: 249,
//   38: 38,
//   58: 58,
//   64: 64,
//   66: 66
// }
export default function (n, t, r) {
  'use strict'

  n(249)
  var e = n(38),
    i = n(66),
    o = n(58),
    u = 'toString',
    c = /./[u],
    a = function (t) {
      n(118)(RegExp.prototype, u, t, !0)
    }
  n(64)(function () {
    return (
      '/a/b' !=
      c.call({
        source: 'a',
        flags: 'b',
      })
    )
  })
    ? a(function toString() {
        var t = e(this)
        return '/'.concat(
          t.source,
          '/',
          'flags' in t ? t.flags : !o && t instanceof RegExp ? i.call(t) : void 0,
        )
      })
    : c.name != u &&
      a(function toString() {
        return c.call(this)
      })
}
