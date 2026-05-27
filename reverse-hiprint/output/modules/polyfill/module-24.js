// browserify module 24
// deps: {}
export default function (t, n, r) {
  var e = (n.exports =
    'undefined' != typeof window && window.Math == Math
      ? window
      : 'undefined' != typeof self && self.Math == Math
        ? self
        : Function('return this')())
  'number' == typeof __g && (__g = e)
}
