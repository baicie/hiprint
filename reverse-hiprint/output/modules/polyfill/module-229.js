// browserify module 229
// deps: {
//   118: 118,
//   152: 152,
//   47: 47
// }
export default function (t, n, r) {
  'use strict'

  var e = t(47),
    i = {}
  ;((i[t(152)('toStringTag')] = 'z'),
    i + '' != '[object z]' &&
      t(118)(
        Object.prototype,
        'toString',
        function toString() {
          return '[object ' + e(this) + ']'
        },
        !0,
      ))
}
