// browserify module 279
// deps: {
//   123: 123,
//   127: 127,
//   137: 137,
//   141: 141,
//   145: 145,
//   146: 146,
//   38: 38,
//   62: 62,
//   64: 64,
//   70: 70,
//   81: 81
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(146),
    o = t(145),
    f = t(38),
    s = t(137),
    l = t(141),
    u = t(81),
    c = t(70).ArrayBuffer,
    h = t(127),
    p = o.ArrayBuffer,
    v = o.DataView,
    a = i.ABV && c.isView,
    y = p.prototype.slice,
    g = i.VIEW,
    d = 'ArrayBuffer'
  ;(e(e.G + e.W + e.F * (c !== p), {
    ArrayBuffer: p,
  }),
    e(e.S + e.F * !i.CONSTR, d, {
      isView: function isView(t) {
        return (a && a(t)) || (u(t) && g in t)
      },
    }),
    e(
      e.P +
        e.U +
        e.F *
          t(64)(function () {
            return !new p(2).slice(1, void 0).byteLength
          }),
      d,
      {
        slice: function slice(t, n) {
          if (void 0 !== y && void 0 === n) return y.call(f(this), t)
          for (
            var r = f(this).byteLength,
              e = s(t, r),
              i = s(void 0 === n ? r : n, r),
              o = new (h(this, p))(l(i - e)),
              u = new v(this),
              c = new v(o),
              a = 0;
            e < i;
          )
            c.setUint8(a++, u.getUint8(e++))
          return o
        },
      },
    ),
    t(123)(d))
}
