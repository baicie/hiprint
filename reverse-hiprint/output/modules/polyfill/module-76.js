// browserify module 76
// deps: {}
export default function (t, n, r) {
  n.exports = function (t, n, r) {
    var e = void 0 === r
    switch (n.length) {
      case 0:
        return e ? t() : t.call(r)
      case 1:
        return e ? t(n[0]) : t.call(r, n[0])
      case 2:
        return e ? t(n[0], n[1]) : t.call(r, n[0], n[1])
      case 3:
        return e ? t(n[0], n[1], n[2]) : t.call(r, n[0], n[1], n[2])
      case 4:
        return e ? t(n[0], n[1], n[2], n[3]) : t.call(r, n[0], n[1], n[2], n[3])
    }
    return t.apply(r, n)
  }
}
