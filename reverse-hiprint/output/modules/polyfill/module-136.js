// browserify module 136
// deps: {
//   48: 48,
//   54: 54,
//   59: 59,
//   70: 70,
//   73: 73,
//   76: 76
// }
export default function (t, n, r) {
  var e,
    i,
    o,
    u = t(54),
    c = t(76),
    a = t(73),
    f = t(59),
    s = t(70),
    l = s.process,
    h = s.setImmediate,
    p = s.clearImmediate,
    v = s.MessageChannel,
    y = s.Dispatch,
    g = 0,
    d = {},
    x = 'onreadystatechange',
    m = function () {
      var t = +this
      if (d.hasOwnProperty(t)) {
        var n = d[t]
        ;(delete d[t], n())
      }
    },
    b = function (t) {
      m.call(t.data)
    }
  ;((h && p) ||
    ((h = function setImmediate(t) {
      for (var n = [], r = 1; arguments.length > r; ) n.push(arguments[r++])
      return (
        (d[++g] = function () {
          c('function' == typeof t ? t : Function(t), n)
        }),
        e(g),
        g
      )
    }),
    (p = function clearImmediate(t) {
      delete d[t]
    }),
    'process' == t(48)(l)
      ? (e = function (t) {
          l.nextTick(u(m, t, 1))
        })
      : y && y.now
        ? (e = function (t) {
            y.now(u(m, t, 1))
          })
        : v
          ? ((o = (i = new v()).port2), (i.port1.onmessage = b), (e = u(o.postMessage, o, 1)))
          : s.addEventListener && 'function' == typeof postMessage && !s.importScripts
            ? ((e = function (t) {
                s.postMessage(t + '', '*')
              }),
              s.addEventListener('message', b, !1))
            : (e =
                x in f('script')
                  ? function (t) {
                      a.appendChild(f('script'))[x] = function () {
                        ;(a.removeChild(this), m.call(t))
                      }
                    }
                  : function (t) {
                      setTimeout(u(m, t, 1), 0)
                    })),
    (n.exports = {
      set: h,
      clear: p,
    }))
}
