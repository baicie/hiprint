// browserify module 44
// deps: {
//   152: 152,
//   79: 79,
//   81: 81
// }
export default function (t, n, r) {
  var e = t(81),
    i = t(79),
    o = t(152)('species')
  n.exports = function (t) {
    var n
    return (
      i(t) &&
        ('function' != typeof (n = t.constructor) ||
          (n !== Array && !i(n.prototype)) ||
          (n = void 0),
        e(n) && null === (n = n[o]) && (n = void 0)),
      void 0 === n ? Array : n
    )
  }
}
