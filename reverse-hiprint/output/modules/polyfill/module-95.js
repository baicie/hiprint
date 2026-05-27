// browserify module 95
// deps: {
//   136: 136,
//   48: 48,
//   70: 70
// }
export default function (t, n, r) {
  var c = t(70),
    a = t(136).set,
    f = c.MutationObserver || c.WebKitMutationObserver,
    s = c.process,
    l = c.Promise,
    h = 'process' == t(48)(s)
  n.exports = function () {
    var r,
      e,
      i,
      t = function () {
        var t, n
        for (h && (t = s.domain) && t.exit(); r; ) {
          ;((n = r.fn), (r = r.next))
          try {
            n()
          } catch (t) {
            throw (r ? i() : (e = void 0), t)
          }
        }
        ;((e = void 0), t && t.enter())
      }
    if (h)
      i = function () {
        s.nextTick(t)
      }
    else if (!f || (c.navigator && c.navigator.standalone)) {
      if (l && l.resolve) {
        var n = l.resolve(void 0)
        i = function () {
          n.then(t)
        }
      } else
        i = function () {
          a.call(c, t)
        }
    } else {
      var o = !0,
        u = document.createTextNode('')
      ;(new f(t).observe(u, {
        characterData: !0,
      }),
        (i = function () {
          u.data = o = !o
        }))
    }
    return function (t) {
      var n = {
        fn: t,
        next: void 0,
      }
      ;(e && (e.next = n), r || ((r = n), i()), (e = n))
    }
  }
}
