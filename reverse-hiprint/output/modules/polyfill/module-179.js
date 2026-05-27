// browserify module 179
// deps: {
//   118: 118
// }
export default function (t, n, r) {
  var e = Date.prototype,
    i = 'Invalid Date',
    o = 'toString',
    u = e[o],
    c = e.getTime
  new Date(NaN) + '' != i &&
    t(118)(e, o, function toString() {
      var t = c.call(this)
      return t == t ? u.call(this) : i
    })
}
