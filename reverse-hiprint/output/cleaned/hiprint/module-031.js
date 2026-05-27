// webpack module 31
export default function (t, e) {
  t.exports = function (t) {
    var e = 'undefined' != typeof window && window.location
    if (!e) throw new Error('fixUrls requires window.location')
    if (!t || 'string' != typeof t) return t
    var n = e.protocol + '//' + e.host,
      i = n + e.pathname.replace(/\/[^\/]*$/, '/')
    return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (t, e) {
      var o,
        r = e
          .trim()
          .replace(/^"(.*)"$/, function (t, e) {
            return e
          })
          .replace(/^'(.*)'$/, function (t, e) {
            return e
          })
      return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)
        ? t
        : ((o =
            0 === r.indexOf('//') ? r : 0 === r.indexOf('/') ? n + r : i + r.replace(/^\.\//, '')),
          'url(' + JSON.stringify(o) + ')')
    })
  }
}
