// browserify module 111
// deps: {
//   103: 103,
//   104: 104,
//   38: 38,
//   70: 70
// }
export default function (t, n, r) {
  var e = t(103),
    i = t(104),
    o = t(38),
    u = t(70).Reflect
  n.exports =
    (u && u.ownKeys) ||
    function ownKeys(t) {
      var n = e.f(o(t)),
        r = i.f
      return r ? n.concat(r(t)) : n
    }
}
