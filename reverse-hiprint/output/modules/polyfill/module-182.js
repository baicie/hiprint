// browserify module 182
// deps: {
//   58: 58,
//   99: 99
// }
export default function (t, n, r) {
  var e = t(99).f,
    i = Function.prototype,
    o = /^\s*function ([^ (]*)/
  'name' in i ||
    (t(58) &&
      e(i, 'name', {
        configurable: !0,
        get: function () {
          try {
            return ('' + this).match(o)[1]
          } catch (t) {
            return ''
          }
        },
      }))
}
