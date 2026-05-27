// browserify module 122
// deps: {
//   101: 101,
//   38: 38,
//   54: 54,
//   81: 81
// }
export default function (n, t, r) {
  var e = n(81),
    i = n(38),
    o = function (t, n) {
      if ((i(t), !e(n) && null !== n)) throw TypeError(n + ": can't set as prototype!")
    }
  t.exports = {
    set:
      Object.setPrototypeOf ||
      ('__proto__' in {}
        ? (function (t, r, e) {
            try {
              ;((e = n(54)(Function.call, n(101).f(Object.prototype, '__proto__').set, 2))(t, []),
                (r = !(t instanceof Array)))
            } catch (t) {
              r = !0
            }
            return function setPrototypeOf(t, n) {
              return (o(t, n), r ? (t.__proto__ = n) : e(t, n), t)
            }
          })({}, !1)
        : void 0),
    check: o,
  }
}
