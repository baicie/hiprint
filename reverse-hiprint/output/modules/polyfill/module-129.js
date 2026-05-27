// browserify module 129
// deps: {
//   139: 139,
//   57: 57
// }
export default function (t, n, r) {
  var a = t(139),
    f = t(57)
  n.exports = function (c) {
    return function (t, n) {
      var r,
        e,
        i = String(f(t)),
        o = a(n),
        u = i.length
      return o < 0 || u <= o
        ? c
          ? ''
          : void 0
        : (r = i.charCodeAt(o)) < 55296 ||
            56319 < r ||
            o + 1 === u ||
            (e = i.charCodeAt(o + 1)) < 56320 ||
            57343 < e
          ? c
            ? i.charAt(o)
            : r
          : c
            ? i.slice(o, o + 2)
            : e - 56320 + ((r - 55296) << 10) + 65536
    }
  }
}
