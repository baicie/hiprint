// browserify module 98
// deps: {
//   100: 100,
//   125: 125,
//   38: 38,
//   59: 59,
//   60: 60,
//   73: 73
// }
export default function (e, t, n) {
  var i = e(38),
    o = e(100),
    u = e(60),
    c = e(125)('IE_PROTO'),
    a = function () {},
    f = 'prototype',
    s = function () {
      var t,
        n = e(59)('iframe'),
        r = u.length
      for (
        n.style.display = 'none',
          e(73).appendChild(n),
          n.src = 'javascript:',
          (t = n.contentWindow.document).open(),
          t.write('<script>document.F=Object<\/script>'),
          t.close(),
          s = t.F;
        r--;
      )
        delete s[f][u[r]]
      return s()
    }
  t.exports =
    Object.create ||
    function create(t, n) {
      var r
      return (
        null !== t ? ((a[f] = i(t)), (r = new a()), (a[f] = null), (r[c] = t)) : (r = s()),
        void 0 === n ? r : o(r, n)
      )
    }
}
