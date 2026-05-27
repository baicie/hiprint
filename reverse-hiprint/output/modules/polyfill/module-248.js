// browserify module 248
// deps: {
//   120: 120,
//   62: 62
// }
export default function (t, n, r) {
  'use strict'

  var e = t(120)
  t(62)(
    {
      target: 'RegExp',
      proto: !0,
      forced: e !== /./.exec,
    },
    {
      exec: e,
    },
  )
}
