// browserify module 127
// deps: {
//   152: 152,
//   33: 33,
//   38: 38
// }
export default function (t, n, r) {
  var i = t(38),
    o = t(33),
    u = t(152)('species')
  n.exports = function (t, n) {
    var r,
      e = i(t).constructor
    return void 0 === e || null == (r = i(e)[u]) ? n : o(r)
  }
}
