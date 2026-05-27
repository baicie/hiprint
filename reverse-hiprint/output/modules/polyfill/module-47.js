// browserify module 47
// deps: {
//   152: 152,
//   48: 48
// }
export default function (t, n, r) {
  var i = t(48),
    o = t(152)('toStringTag'),
    u =
      'Arguments' ==
      i(
        (function () {
          return arguments
        })(),
      )
  n.exports = function (t) {
    var n, r, e
    return void 0 === t
      ? 'Undefined'
      : null === t
        ? 'Null'
        : 'string' ==
            typeof (r = (function (t, n) {
              try {
                return t[n]
              } catch (t) {}
            })((n = Object(t)), o))
          ? r
          : u
            ? i(n)
            : 'Object' == (e = i(n)) && 'function' == typeof n.callee
              ? 'Arguments'
              : e
  }
}
