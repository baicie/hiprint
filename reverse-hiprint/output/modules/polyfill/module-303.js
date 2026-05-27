// browserify module 303
// deps: {
//   107: 107,
//   118: 118,
//   152: 152,
//   164: 164,
//   70: 70,
//   72: 72,
//   88: 88
// }
export default function (t, n, r) {
  for (
    var e = t(164),
      i = t(107),
      o = t(118),
      u = t(70),
      c = t(72),
      a = t(88),
      f = t(152),
      s = f('iterator'),
      l = f('toStringTag'),
      h = a.Array,
      p = {
        CSSRuleList: !0,
        CSSStyleDeclaration: !1,
        CSSValueList: !1,
        ClientRectList: !1,
        DOMRectList: !1,
        DOMStringList: !1,
        DOMTokenList: !0,
        DataTransferItemList: !1,
        FileList: !1,
        HTMLAllCollection: !1,
        HTMLCollection: !1,
        HTMLFormElement: !1,
        HTMLSelectElement: !1,
        MediaList: !0,
        MimeTypeArray: !1,
        NamedNodeMap: !1,
        NodeList: !0,
        PaintRequestList: !1,
        Plugin: !1,
        PluginArray: !1,
        SVGLengthList: !1,
        SVGNumberList: !1,
        SVGPathSegList: !1,
        SVGPointList: !1,
        SVGStringList: !1,
        SVGTransformList: !1,
        SourceBufferList: !1,
        StyleSheetList: !0,
        TextTrackCueList: !1,
        TextTrackList: !1,
        TouchList: !1,
      },
      v = i(p),
      y = 0;
    y < v.length;
    y++
  ) {
    var g,
      d = v[y],
      x = p[d],
      m = u[d],
      b = m && m.prototype
    if (b && (b[s] || c(b, s, h), b[l] || c(b, l, d), (a[d] = h), x))
      for (g in e) b[g] || o(b, g, e[g], !0)
  }
}
