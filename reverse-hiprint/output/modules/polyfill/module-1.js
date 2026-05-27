// browserify module 1
// deps: {
//   15: 15,
//   2: 2
// }
export default function (t, n, r) {
  'use strict'

  t(2)
  var e = (function _interopRequireDefault(t) {
    return t && t.__esModule
      ? t
      : {
          default: t,
        }
  })(t(15))
  ;(e.default._babelPolyfill &&
    'undefined' != typeof console &&
    console.warn &&
    console.warn(
      '@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning.',
    ),
    (e.default._babelPolyfill = !0))
}
