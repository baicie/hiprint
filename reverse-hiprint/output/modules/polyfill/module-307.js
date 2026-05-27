// browserify module 307
// deps: {}
export default function (t, n, r) {
  var e = (function (o) {
    'use strict'

    var c,
      t = Object.prototype,
      a = t.hasOwnProperty,
      n = 'function' == typeof Symbol ? Symbol : {},
      i = n.iterator || '@@iterator',
      r = n.asyncIterator || '@@asyncIterator',
      e = n.toStringTag || '@@toStringTag'
    function wrap(t, n, r, e) {
      var i = n && n.prototype instanceof Generator ? n : Generator,
        o = Object.create(i.prototype),
        u = new Context(e || [])
      return (
        (o._invoke = (function makeInvokeMethod(o, u, c) {
          var a = f
          return function invoke(t, n) {
            if (a === l) throw new Error('Generator is already running')
            if (a === h) {
              if ('throw' === t) throw n
              return doneResult()
            }
            for (c.method = t, c.arg = n; ; ) {
              var r = c.delegate
              if (r) {
                var e = maybeInvokeDelegate(r, c)
                if (e) {
                  if (e === p) continue
                  return e
                }
              }
              if ('next' === c.method) c.sent = c._sent = c.arg
              else if ('throw' === c.method) {
                if (a === f) throw ((a = h), c.arg)
                c.dispatchException(c.arg)
              } else 'return' === c.method && c.abrupt('return', c.arg)
              a = l
              var i = tryCatch(o, u, c)
              if ('normal' === i.type) {
                if (((a = c.done ? h : s), i.arg === p)) continue
                return {
                  value: i.arg,
                  done: c.done,
                }
              }
              'throw' === i.type && ((a = h), (c.method = 'throw'), (c.arg = i.arg))
            }
          }
        })(t, r, u)),
        o
      )
    }
    function tryCatch(t, n, r) {
      try {
        return {
          type: 'normal',
          arg: t.call(n, r),
        }
      } catch (t) {
        return {
          type: 'throw',
          arg: t,
        }
      }
    }
    o.wrap = wrap
    var f = 'suspendedStart',
      s = 'suspendedYield',
      l = 'executing',
      h = 'completed',
      p = {}
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var u = {}
    u[i] = function () {
      return this
    }
    var v = Object.getPrototypeOf,
      y = v && v(v(values([])))
    y && y !== t && a.call(y, i) && (u = y)
    var g = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u))
    function defineIteratorMethods(t) {
      ;['next', 'throw', 'return'].forEach(function (n) {
        t[n] = function (t) {
          return this._invoke(n, t)
        }
      })
    }
    function AsyncIterator(c) {
      var t
      this._invoke = function enqueue(r, e) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (t, n) {
            !(function invoke(t, n, r, e) {
              var i = tryCatch(c[t], c, n)
              if ('throw' !== i.type) {
                var o = i.arg,
                  u = o.value
                return u && 'object' == typeof u && a.call(u, '__await')
                  ? Promise.resolve(u.__await).then(
                      function (t) {
                        invoke('next', t, r, e)
                      },
                      function (t) {
                        invoke('throw', t, r, e)
                      },
                    )
                  : Promise.resolve(u).then(
                      function (t) {
                        ;((o.value = t), r(o))
                      },
                      function (t) {
                        return invoke('throw', t, r, e)
                      },
                    )
              }
              e(i.arg)
            })(r, e, t, n)
          })
        }
        return (t = t
          ? t.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
          : callInvokeWithMethodAndArg())
      }
    }
    function maybeInvokeDelegate(t, n) {
      var r = t.iterator[n.method]
      if (r === c) {
        if (((n.delegate = null), 'throw' === n.method)) {
          if (
            t.iterator.return &&
            ((n.method = 'return'), (n.arg = c), maybeInvokeDelegate(t, n), 'throw' === n.method)
          )
            return p
          ;((n.method = 'throw'),
            (n.arg = new TypeError("The iterator does not provide a 'throw' method")))
        }
        return p
      }
      var e = tryCatch(r, t.iterator, n.arg)
      if ('throw' === e.type) return ((n.method = 'throw'), (n.arg = e.arg), (n.delegate = null), p)
      var i = e.arg
      return i
        ? i.done
          ? ((n[t.resultName] = i.value),
            (n.next = t.nextLoc),
            'return' !== n.method && ((n.method = 'next'), (n.arg = c)),
            (n.delegate = null),
            p)
          : i
        : ((n.method = 'throw'),
          (n.arg = new TypeError('iterator result is not an object')),
          (n.delegate = null),
          p)
    }
    function pushTryEntry(t) {
      var n = {
        tryLoc: t[0],
      }
      ;(1 in t && (n.catchLoc = t[1]),
        2 in t && ((n.finallyLoc = t[2]), (n.afterLoc = t[3])),
        this.tryEntries.push(n))
    }
    function resetTryEntry(t) {
      var n = t.completion || {}
      ;((n.type = 'normal'), delete n.arg, (t.completion = n))
    }
    function Context(t) {
      ;((this.tryEntries = [
        {
          tryLoc: 'root',
        },
      ]),
        t.forEach(pushTryEntry, this),
        this.reset(!0))
    }
    function values(t) {
      if (t) {
        var n = t[i]
        if (n) return n.call(t)
        if ('function' == typeof t.next) return t
        if (!isNaN(t.length)) {
          var r = -1,
            e = function next() {
              for (; ++r < t.length; )
                if (a.call(t, r)) return ((next.value = t[r]), (next.done = !1), next)
              return ((next.value = c), (next.done = !0), next)
            }
          return (e.next = e)
        }
      }
      return {
        next: doneResult,
      }
    }
    function doneResult() {
      return {
        value: c,
        done: !0,
      }
    }
    return (
      (GeneratorFunction.prototype = g.constructor = GeneratorFunctionPrototype),
      (GeneratorFunctionPrototype.constructor = GeneratorFunction),
      (GeneratorFunctionPrototype[e] = GeneratorFunction.displayName = 'GeneratorFunction'),
      (o.isGeneratorFunction = function (t) {
        var n = 'function' == typeof t && t.constructor
        return !!n && (n === GeneratorFunction || 'GeneratorFunction' === (n.displayName || n.name))
      }),
      (o.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, GeneratorFunctionPrototype)
            : ((t.__proto__ = GeneratorFunctionPrototype), e in t || (t[e] = 'GeneratorFunction')),
          (t.prototype = Object.create(g)),
          t
        )
      }),
      (o.awrap = function (t) {
        return {
          __await: t,
        }
      }),
      defineIteratorMethods(AsyncIterator.prototype),
      (AsyncIterator.prototype[r] = function () {
        return this
      }),
      (o.AsyncIterator = AsyncIterator),
      (o.async = function (t, n, r, e) {
        var i = new AsyncIterator(wrap(t, n, r, e))
        return o.isGeneratorFunction(n)
          ? i
          : i.next().then(function (t) {
              return t.done ? t.value : i.next()
            })
      }),
      defineIteratorMethods(g),
      (g[e] = 'Generator'),
      (g[i] = function () {
        return this
      }),
      (g.toString = function () {
        return '[object Generator]'
      }),
      (o.keys = function (n) {
        var r = []
        for (var t in n) r.push(t)
        return (
          r.reverse(),
          function next() {
            for (; r.length; ) {
              var t = r.pop()
              if (t in n) return ((next.value = t), (next.done = !1), next)
            }
            return ((next.done = !0), next)
          }
        )
      }),
      (o.values = values),
      (Context.prototype = {
        constructor: Context,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = c),
            (this.done = !1),
            (this.delegate = null),
            (this.method = 'next'),
            (this.arg = c),
            this.tryEntries.forEach(resetTryEntry),
            !t)
          )
            for (var n in this)
              't' === n.charAt(0) && a.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = c)
        },
        stop: function () {
          this.done = !0
          var t = this.tryEntries[0].completion
          if ('throw' === t.type) throw t.arg
          return this.rval
        },
        dispatchException: function (r) {
          if (this.done) throw r
          var e = this
          function handle(t, n) {
            return (
              (i.type = 'throw'),
              (i.arg = r),
              (e.next = t),
              n && ((e.method = 'next'), (e.arg = c)),
              !!n
            )
          }
          for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
            var n = this.tryEntries[t],
              i = n.completion
            if ('root' === n.tryLoc) return handle('end')
            if (n.tryLoc <= this.prev) {
              var o = a.call(n, 'catchLoc'),
                u = a.call(n, 'finallyLoc')
              if (o && u) {
                if (this.prev < n.catchLoc) return handle(n.catchLoc, !0)
                if (this.prev < n.finallyLoc) return handle(n.finallyLoc)
              } else if (o) {
                if (this.prev < n.catchLoc) return handle(n.catchLoc, !0)
              } else {
                if (!u) throw new Error('try statement without catch or finally')
                if (this.prev < n.finallyLoc) return handle(n.finallyLoc)
              }
            }
          }
        },
        abrupt: function (t, n) {
          for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
            var e = this.tryEntries[r]
            if (e.tryLoc <= this.prev && a.call(e, 'finallyLoc') && this.prev < e.finallyLoc) {
              var i = e
              break
            }
          }
          i &&
            ('break' === t || 'continue' === t) &&
            i.tryLoc <= n &&
            n <= i.finallyLoc &&
            (i = null)
          var o = i ? i.completion : {}
          return (
            (o.type = t),
            (o.arg = n),
            i ? ((this.method = 'next'), (this.next = i.finallyLoc), p) : this.complete(o)
          )
        },
        complete: function (t, n) {
          if ('throw' === t.type) throw t.arg
          return (
            'break' === t.type || 'continue' === t.type
              ? (this.next = t.arg)
              : 'return' === t.type
                ? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
                : 'normal' === t.type && n && (this.next = n),
            p
          )
        },
        finish: function (t) {
          for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
            var r = this.tryEntries[n]
            if (r.finallyLoc === t)
              return (this.complete(r.completion, r.afterLoc), resetTryEntry(r), p)
          }
        },
        catch: function (t) {
          for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
            var r = this.tryEntries[n]
            if (r.tryLoc === t) {
              var e = r.completion
              if ('throw' === e.type) {
                var i = e.arg
                resetTryEntry(r)
              }
              return i
            }
          }
          throw new Error('illegal catch attempt')
        },
        delegateYield: function (t, n, r) {
          return (
            (this.delegate = {
              iterator: values(t),
              resultName: n,
              nextLoc: r,
            }),
            'next' === this.method && (this.arg = c),
            p
          )
        },
      }),
      o
    )
  })('object' == typeof n ? n.exports : {})
  try {
    regeneratorRuntime = e
  } catch (t) {
    Function('r', 'regeneratorRuntime = r')(e)
  }
}
