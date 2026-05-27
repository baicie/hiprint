// webpack module 0
export default function (t, e, n) {
  'use strict'

  var i
  ;(n.d(e, 'a', function () {
    return hinnn
  }),
    (window.hinnn = {}),
    (hinnn.event =
      ((i = {}),
      {
        on: function on(t, e) {
          ;(i[t] || (i[t] = []), i[t].push(e))
        },
        id: 0,
        off: function off(t, e) {
          var n = i[t]
          if (n) {
            for (var o = -1, r = 0; r < n.length; r++) {
              if (n[r] === e) {
                o = r
                break
              }
            }
            o < 0 || i[t].splice(o, 1)
          }
        },
        trigger: function trigger(t) {
          var e = i[t]
          if (e && e.length)
            for (var n = Array.prototype.slice.call(arguments, 1), o = 0; o < e.length; o++) {
              e[o].apply(this, n)
            }
        },
        clear: function clear(t) {
          i[t] = []
        },
        getId: function getId() {
          return ((this.id += 1), this.id)
        },
        getNameWithId: function getNameWithId(t) {
          return t + '-' + this.getId()
        },
      })),
    (hinnn.form = {
      serialize: function serialize(t) {
        var e = $(t).serializeArray(),
          n = {}
        return (
          $.each(e, function () {
            n[this.name]
              ? '[object Array]' == Object.prototype.toString.call(n[this.name])
                ? n[this.name].push(this.value)
                : (n[this.name] = [n[this.name], this.value])
              : (n[this.name] = this.value)
          }),
          n
        )
      },
    }),
    (hinnn.pt = {
      toPx: function toPx(t) {
        return t * (this.getDpi() / 72)
      },
      dpi: 0,
      getDpi: function getDpi() {
        if (!this.dpi) {
          var _t2 = document.createElement('DIV')
          ;((_t2.style.cssText =
            'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'),
            document.body.appendChild(_t2),
            (this.dpi = _t2.offsetHeight))
        }
        return this.dpi
      },
    }),
    (hinnn.px = {
      toPt: function toPt(t) {
        return t * (72 / this.getDpi())
      },
      dpi: 0,
      getDpi: function getDpi() {
        if (!this.dpi) {
          var _t3 = document.createElement('DIV')
          ;((_t3.style.cssText =
            'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'),
            document.body.appendChild(_t3),
            (this.dpi = _t3.offsetHeight))
        }
        return this.dpi
      },
    }),
    (hinnn.mm = {
      toPt: function toPt(t) {
        return (72 / 25.4) * t
      },
      toPx: function toPx(t) {
        return hinnn.pt.toPx(hinnn.mm.toPt(t))
      },
    }),
    (hinnn.throttle = function (t, e, n) {
      var i,
        o,
        r,
        a = null,
        p = 0
      n || (n = {})
      var s = function s() {
        ;((p = !1 === n.leading ? 0 : _.now()),
          (a = null),
          (r = t.apply(i, o)),
          a || (i = o = null))
      }
      return function () {
        var l = _.now()
        p || !1 !== n.leading || (p = l)
        var u = e - (l - p)
        return (
          (i = this),
          (o = arguments),
          u <= 0 || u > e
            ? (a && (clearTimeout(a), (a = null)),
              (p = l),
              (r = t.apply(i, o)),
              a || (i = o = null))
            : a || !1 === n.trailing || (a = setTimeout(s, u)),
          r
        )
      }
    }),
    (hinnn.debounce = function (t, e, n) {
      var i,
        o,
        r,
        a,
        p,
        s = function s() {
          var l = _.now() - a
          l < e && l >= 0
            ? (i = setTimeout(s, e - l))
            : ((i = null), n || ((p = t.apply(r, o)), i || (r = o = null)))
        }
      return function () {
        ;((r = this), (o = arguments), (a = _.now()))
        var l = n && !i
        return (i || (i = setTimeout(s, e)), l && ((p = t.apply(r, o)), (r = o = null)), p)
      }
    }),
    (hinnn.toUtf8 = function (t) {
      var e, n, i, o
      for (e = '', i = t.length, n = 0; n < i; n++) {
        ;(o = t.charCodeAt(n)) >= 1 && o <= 127
          ? (e += t.charAt(n))
          : o > 2047
            ? ((e += String.fromCharCode(224 | ((o >> 12) & 15))),
              (e += String.fromCharCode(128 | ((o >> 6) & 63))),
              (e += String.fromCharCode(128 | ((o >> 0) & 63))))
            : ((e += String.fromCharCode(192 | ((o >> 6) & 31))),
              (e += String.fromCharCode(128 | ((o >> 0) & 63))))
      }
      return e
    }),
    (hinnn.groupBy = function (t, e, n) {
      var i = {}
      return (
        t.forEach(function (t) {
          var o = JSON.stringify(n(t))
          ;(i[o] ||
            ((i[o] = {
              rows: [],
            }),
            e.forEach(function (e) {
              i[o][e] = t[e]
            })),
            i[o].rows.push(t))
        }),
        Object.keys(i).map(function (t) {
          return i[t]
        })
      )
    }),
    (hinnn.orderBy = function (t, e) {
      if (t.length <= 1) return t
      var n = Math.floor(t.length / 2),
        i = t.splice(n, 1)[0],
        o = [],
        r = []
      var _iteratorNormalCompletion = true
      var _didIteratorError = false
      var _iteratorError = undefined
      try {
        for (
          var _iterator = t[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var _n = _step.value
          e(_n) < e(i) ? o.push(_n) : r.push(_n)
        }
      } catch (err) {
        _didIteratorError = true
        _iteratorError = err
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return()
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError
          }
        }
      }
      return this.orderBy(o, e).concat([i], this.orderBy(r, e))
    }),
    (hinnn.dateFormat = function (t, e) {
      if (t)
        try {
          var o = 'string' == typeof t ? new Date(t) : t
          var n = {
            'M+': o.getMonth() + 1,
            'd+': o.getDate(),
            'H+': o.getHours(),
            'm+': o.getMinutes(),
            's+': o.getSeconds(),
            'q+': Math.floor((o.getMonth() + 3) / 3),
            S: o.getMilliseconds(),
          }
          for (var i in (/(y+)/.test(e) &&
            (e = e.replace(RegExp.$1, (o.getFullYear() + '').substr(4 - RegExp.$1.length))),
          n)) {
            new RegExp('(' + i + ')').test(e) &&
              (e = e.replace(
                RegExp.$1,
                1 == RegExp.$1.length ? n[i] : ('00' + n[i]).substr(('' + n[i]).length),
              ))
          }
          return e
        } catch (t) {
          return (console.log(t), '')
        }
      return ''
    }))
}
