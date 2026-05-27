// browserify module 96
// deps: {
//   33: 33
// }
export default function (t, n, r) {
  'use strict'

  var i = t(33)
  function PromiseCapability(t) {
    var r, e
    ;((this.promise = new t(function (t, n) {
      if (void 0 !== r || void 0 !== e) throw TypeError('Bad Promise constructor')
      ;((r = t), (e = n))
    })),
      (this.resolve = i(r)),
      (this.reject = i(e)))
  }
  n.exports.f = function (t) {
    return new PromiseCapability(t)
  }
}
