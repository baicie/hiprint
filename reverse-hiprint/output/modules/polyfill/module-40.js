// browserify module 40
// deps: {
//   137: 137,
//   141: 141,
//   142: 142
// }
export default function (t, n, r) {
  'use strict'

  var c = t(142),
    a = t(137),
    f = t(141)
  n.exports = function fill(t) {
    for (
      var n = c(this),
        r = f(n.length),
        e = arguments.length,
        i = a(1 < e ? arguments[1] : void 0, r),
        o = 2 < e ? arguments[2] : void 0,
        u = void 0 === o ? r : a(o, r);
      i < u;
    )
      n[i++] = t
    return n
  }
}
