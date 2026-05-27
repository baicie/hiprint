// browserify module 113
// deps: {
//   134: 134,
//   135: 135,
//   70: 70
// }
export default function (t, n, r) {
  var e = t(70).parseInt,
    i = t(134).trim,
    o = t(135),
    u = /^[-+]?0[xX]/
  n.exports =
    8 !== e(o + '08') || 22 !== e(o + '0x16')
      ? function parseInt(t, n) {
          var r = i(String(t), 3)
          return e(r, n >>> 0 || (u.test(r) ? 16 : 10))
        }
      : e
}
