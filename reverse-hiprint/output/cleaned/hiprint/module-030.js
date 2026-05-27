// webpack module 30
export default function (t, e, n) {
  var i,
    o,
    r = {},
    a =
      ((i = function i() {
        return window && document && document.all && !window.atob
      }),
      function () {
        return (void 0 === o && (o = i.apply(this, arguments)), o)
      }),
    p = (function (t) {
      var e = {}
      return function (t, n) {
        if ('function' == typeof t) return t()
        if (void 0 === e[t]) {
          var i = function (t, e) {
            return e ? e.querySelector(t) : document.querySelector(t)
          }.call(this, t, n)
          if (window.HTMLIFrameElement && _instanceof(i, window.HTMLIFrameElement))
            try {
              i = i.contentDocument.head
            } catch (t) {
              i = null
            }
          e[t] = i
        }
        return e[t]
      }
    })(),
    s = null,
    l = 0,
    u = [],
    d = n(31)
  function c(t, e) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n],
        o = r[i.id]
      if (o) {
        o.refs++
        for (var a = 0; a < o.parts.length; a++) {
          o.parts[a](i.parts[a])
        }
        for (; a < i.parts.length; a++) {
          o.parts.push(y(i.parts[a], e))
        }
      } else {
        var p = []
        for (a = 0; a < i.parts.length; a++) {
          p.push(y(i.parts[a], e))
        }
        r[i.id] = {
          id: i.id,
          refs: 1,
          parts: p,
        }
      }
    }
  }
  function h(t, e) {
    for (var n = [], i = {}, o = 0; o < t.length; o++) {
      var r = t[o],
        a = e.base ? r[0] + e.base : r[0],
        p = {
          css: r[1],
          media: r[2],
          sourceMap: r[3],
        }
      i[a]
        ? i[a].parts.push(p)
        : n.push(
            (i[a] = {
              id: a,
              parts: [p],
            }),
          )
    }
    return n
  }
  function f(t, e) {
    var n = p(t.insertInto)
    if (!n)
      throw new Error(
        "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.",
      )
    var i = u[u.length - 1]
    if ('top' === t.insertAt)
      (i
        ? i.nextSibling
          ? n.insertBefore(e, i.nextSibling)
          : n.appendChild(e)
        : n.insertBefore(e, n.firstChild),
        u.push(e))
    else if ('bottom' === t.insertAt) n.appendChild(e)
    else {
      if ('object' != _typeof(t.insertAt) || !t.insertAt.before)
        throw new Error(
          "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n",
        )
      var o = p(t.insertAt.before, n)
      n.insertBefore(e, o)
    }
  }
  function g(t) {
    if (null === t.parentNode) return !1
    t.parentNode.removeChild(t)
    var e = u.indexOf(t)
    e >= 0 && u.splice(e, 1)
  }
  function m(t) {
    var e = document.createElement('style')
    if ((void 0 === t.attrs.type && (t.attrs.type = 'text/css'), void 0 === t.attrs.nonce)) {
      var i = (function () {
        0
        return n.nc
      })()
      i && (t.attrs.nonce = i)
    }
    return (v(e, t.attrs), f(t, e), e)
  }
  function v(t, e) {
    Object.keys(e).forEach(function (n) {
      t.setAttribute(n, e[n])
    })
  }
  function y(t, e) {
    var n, i, o, r
    if (e.transform && t.css) {
      if (!(r = 'function' == typeof e.transform ? e.transform(t.css) : e.transform.default(t.css)))
        return function () {}
      t.css = r
    }
    if (e.singleton) {
      var a = l++
      ;((n = s || (s = m(e))), (i = T.bind(null, n, a, !1)), (o = T.bind(null, n, a, !0)))
    } else
      t.sourceMap &&
      'function' == typeof URL &&
      'function' == typeof URL.createObjectURL &&
      'function' == typeof URL.revokeObjectURL &&
      'function' == typeof Blob &&
      'function' == typeof btoa
        ? ((n = (function (t) {
            var e = document.createElement('link')
            return (
              void 0 === t.attrs.type && (t.attrs.type = 'text/css'),
              (t.attrs.rel = 'stylesheet'),
              v(e, t.attrs),
              f(t, e),
              e
            )
          })(e)),
          (i = function (t, e, n) {
            var i = n.css,
              o = n.sourceMap,
              r = void 0 === e.convertToAbsoluteUrls && o
            ;(e.convertToAbsoluteUrls || r) && (i = d(i))
            o &&
              (i +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                btoa(unescape(encodeURIComponent(JSON.stringify(o)))) +
                ' */')
            var a = new Blob([i], {
                type: 'text/css',
              }),
              p = t.href
            ;((t.href = URL.createObjectURL(a)), p && URL.revokeObjectURL(p))
          }.bind(null, n, e)),
          (o = function o() {
            ;(g(n), n.href && URL.revokeObjectURL(n.href))
          }))
        : ((n = m(e)),
          (i = function (t, e) {
            var n = e.css,
              i = e.media
            i && t.setAttribute('media', i)
            if (t.styleSheet) t.styleSheet.cssText = n
            else {
              for (; t.firstChild; ) {
                t.removeChild(t.firstChild)
              }
              t.appendChild(document.createTextNode(n))
            }
          }.bind(null, n)),
          (o = function o() {
            g(n)
          }))
    return (
      i(t),
      function (e) {
        if (e) {
          if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return
          i((t = e))
        } else o()
      }
    )
  }
  t.exports = function (t, e) {
    if (
      'undefined' != typeof DEBUG &&
      DEBUG &&
      'object' != (typeof document === 'undefined' ? 'undefined' : _typeof(document))
    )
      throw new Error('The style-loader cannot be used in a non-browser environment')
    ;(((e = e || {}).attrs = 'object' == _typeof(e.attrs) ? e.attrs : {}),
      e.singleton || 'boolean' == typeof e.singleton || (e.singleton = a()),
      e.insertInto || (e.insertInto = 'head'),
      e.insertAt || (e.insertAt = 'bottom'))
    var n = h(t, e)
    return (
      c(n, e),
      function (t) {
        for (var i = [], o = 0; o < n.length; o++) {
          var a = n[o]
          ;((p = r[a.id]).refs--, i.push(p))
        }
        t && c(h(t, e), e)
        for (o = 0; o < i.length; o++) {
          var p
          if (0 === (p = i[o]).refs) {
            for (var s = 0; s < p.parts.length; s++) {
              p.parts[s]()
            }
            delete r[p.id]
          }
        }
      }
    )
  }
  var b,
    E =
      ((b = []),
      function (t, e) {
        return ((b[t] = e), b.filter(Boolean).join('\n'))
      })
  function T(t, e, n, i) {
    var o = n ? '' : i.css
    if (t.styleSheet) t.styleSheet.cssText = E(e, o)
    else {
      var r = document.createTextNode(o),
        a = t.childNodes
      ;(a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(r, a[e]) : t.appendChild(r))
    }
  }
}
