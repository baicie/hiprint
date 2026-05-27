// browserify module 249
// deps: {
//   58: 58,
//   66: 66,
//   99: 99
// }
export default function (t, n, r) {
  t(58) &&
    'g' != /./g.flags &&
    t(99).f(RegExp.prototype, 'flags', {
      configurable: !0,
      get: t(66),
    })
}
