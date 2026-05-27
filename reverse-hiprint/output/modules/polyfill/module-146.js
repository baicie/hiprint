// browserify module 146
// deps: {
//   147: 147,
//   70: 70,
//   72: 72
// }
export default function (t, n, r) {
  for (
    var e,
      i = t(70),
      o = t(72),
      u = t(147),
      c = u('typed_array'),
      a = u('view'),
      f = !(!i.ArrayBuffer || !i.DataView),
      s = f,
      l = 0,
      h =
        'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(
          ',',
        );
    l < 9;
  )
    (e = i[h[l++]]) ? (o(e.prototype, c, !0), o(e.prototype, a, !0)) : (s = !1)
  n.exports = {
    ABV: f,
    CONSTR: s,
    TYPED: c,
    VIEW: a,
  }
}
