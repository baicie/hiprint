// browserify module 37
// deps: {}
export default function (t, n, r) {
  n.exports = function (t, n, r, e) {
    if (!(t instanceof n) || (void 0 !== e && e in t))
      throw TypeError(r + ': incorrect invocation!')
    return t
  }
}
