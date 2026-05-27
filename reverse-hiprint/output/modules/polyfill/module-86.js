// browserify module 86
// deps: {
//   152: 152
// }
export default function (t, n, r) {
  var o = t(152)('iterator'),
    u = !1
  try {
    var e = [7][o]()
    ;((e.return = function () {
      u = !0
    }),
      Array.from(e, function () {
        throw 2
      }))
  } catch (t) {}
  n.exports = function (t, n) {
    if (!n && !u) return !1
    var r = !1
    try {
      var e = [7],
        i = e[o]()
      ;((i.next = function () {
        return {
          done: (r = !0),
        }
      }),
        (e[o] = function () {
          return i
        }),
        t(e))
    } catch (t) {}
    return r
  }
}
