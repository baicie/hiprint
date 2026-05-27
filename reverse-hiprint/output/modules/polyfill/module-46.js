// browserify module 46
// deps: {
//   33: 33,
//   76: 76,
//   81: 81
// }
export default function (t, n, r) {
  'use strict'

  var o = t(33),
    u = t(81),
    c = t(76),
    a = [].slice,
    f = {}
  n.exports =
    Function.bind ||
    function bind(n) {
      var r = o(this),
        e = a.call(arguments, 1),
        i = function () {
          var t = e.concat(a.call(arguments))
          return this instanceof i
            ? (function (t, n, r) {
                if (!(n in f)) {
                  for (var e = [], i = 0; i < n; i++) e[i] = 'a[' + i + ']'
                  f[n] = Function('F,a', 'return new F(' + e.join(',') + ')')
                }
                return f[n](t, r)
              })(r, t.length, t)
            : c(r, t, n)
        }
      return (u(r.prototype) && (i.prototype = r.prototype), i)
    }
}
