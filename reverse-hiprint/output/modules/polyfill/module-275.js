// browserify module 275
// deps: {
//   131: 131
// }
export default function (t, n, r) {
  'use strict'

  t(131)('sub', function (t) {
    return function sub() {
      return t(this, 'sub', '', '')
    }
  })
}
