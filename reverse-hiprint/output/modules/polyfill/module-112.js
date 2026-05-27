// browserify module 112
// deps: {
//   134: 134,
//   135: 135,
//   70: 70
// }
export default function (t, n, r) {
  var e = t(70).parseFloat,
    i = t(134).trim
  n.exports =
    1 / e(t(135) + '-0') != -1 / 0
      ? function parseFloat(t) {
          var n = i(String(t), 3),
            r = e(n)
          return 0 === r && '-' == n.charAt(0) ? -0 : r
        }
      : e
}
