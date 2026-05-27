// browserify module 126
// deps: {
//   52: 52,
//   70: 70,
//   89: 89
// }
export default function (t, n, r) {
  var e = t(52),
    i = t(70),
    o = '__core-js_shared__',
    u = i[o] || (i[o] = {})
  ;(n.exports = function (t, n) {
    return u[t] || (u[t] = void 0 !== n ? n : {})
  })('versions', []).push({
    version: e.version,
    mode: t(89) ? 'pure' : 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)',
  })
}
