// browserify module 237
// deps: {
//   38: 38,
//   62: 62,
//   84: 84
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(38),
    o = function (t) {
      ;((this._t = i(t)), (this._i = 0))
      var n,
        r = (this._k = [])
      for (n in t) r.push(n)
    }
  ;(t(84)(o, 'Object', function () {
    var t,
      n = this._k
    do {
      if (this._i >= n.length)
        return {
          value: void 0,
          done: !0,
        }
    } while (!((t = n[this._i++]) in this._t))
    return {
      value: t,
      done: !1,
    }
  }),
    e(e.S, 'Reflect', {
      enumerate: function enumerate(t) {
        return new o(t)
      },
    }))
}
