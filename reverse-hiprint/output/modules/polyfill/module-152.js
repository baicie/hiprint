// browserify module 152
// deps: {
//   126: 126,
//   147: 147,
//   70: 70
// }
export default function (t, n, r) {
  var e = t(126)('wks'),
    i = t(147),
    o = t(70).Symbol,
    u = 'function' == typeof o
  ;(n.exports = function (t) {
    return e[t] || (e[t] = (u && o[t]) || (u ? o : i)('Symbol.' + t))
  }).store = e
}
