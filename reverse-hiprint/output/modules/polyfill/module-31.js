// browserify module 31
// deps: {
//   28: 28
// }
export default function (t, n, r) {
  var i = t(28)
  n.exports = function (t, n) {
    if (!i(t)) return t
    var r, e
    if (n && 'function' == typeof (r = t.toString) && !i((e = r.call(t)))) return e
    if ('function' == typeof (r = t.valueOf) && !i((e = r.call(t)))) return e
    if (!n && 'function' == typeof (r = t.toString) && !i((e = r.call(t)))) return e
    throw TypeError("Can't convert object to primitive value")
  }
}
