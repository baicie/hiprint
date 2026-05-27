// browserify module 105
// deps: {
//   125: 125,
//   142: 142,
//   71: 71
// }
export default function (t, n, r) {
  var e = t(71),
    i = t(142),
    o = t(125)('IE_PROTO'),
    u = Object.prototype
  n.exports =
    Object.getPrototypeOf ||
    function (t) {
      return (
        (t = i(t)),
        e(t, o)
          ? t[o]
          : 'function' == typeof t.constructor && t instanceof t.constructor
            ? t.constructor.prototype
            : t instanceof Object
              ? u
              : null
      )
    }
}
