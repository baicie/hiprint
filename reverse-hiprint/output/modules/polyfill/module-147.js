// browserify module 147
// deps: {}
export default function (t, n, r) {
  var e = 0,
    i = Math.random()
  n.exports = function (t) {
    return 'Symbol('.concat(void 0 === t ? '' : t, ')_', (++e + i).toString(36))
  }
}
