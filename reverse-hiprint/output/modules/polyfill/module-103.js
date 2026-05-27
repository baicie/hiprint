// browserify module 103
// deps: {
//   106: 106,
//   60: 60
// }
export default function (t, n, r) {
  var e = t(106),
    i = t(60).concat('length', 'prototype')
  r.f =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(t) {
      return e(t, i)
    }
}
