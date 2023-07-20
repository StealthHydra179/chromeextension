!(function t (e, r) {
  typeof exports === 'object' && typeof module === 'object'
    ? (module.exports = r())
    : typeof define === 'function' && define.amd
      ? define([], r)
      : typeof exports === 'object'
        ? (exports.Raphael = r())
        : (e.Raphael = r())
})(this, function () {
  return (function (t) {
    function e (i) {
      if (r[i]) return r[i].exports
      const n = (r[i] = { exports: {}, id: i, loaded: !1 })
      return t[i].call(n.exports, n, n.exports, e), (n.loaded = !0), n.exports
    }
    var r = {}
    return (e.m = t), (e.c = r), (e.p = ''), e(0)
  })([
    function (t, e, r) {
      let i, n;
      (i = [r(1), r(3), r(4)]),
      (n = (function (t) {
        return t
      }.apply(e, i))),
      !(void 0 !== n && (t.exports = n))
    },
    function (t, e, r) {
      let i, n;
      (i = [r(2)]),
      (n = (function (t) {
        function e (r) {
          if (e.is(r, 'function')) { return w ? r() : t.on('raphael.DOMload', r) }
          if (e.is(r, Q)) {
            return e._engine.create[z](e, r.splice(0, 3 + e.is(r[0], $))).add(
              r
            )
          }
          const i = Array.prototype.slice.call(arguments, 0)
          if (e.is(i[i.length - 1], 'function')) {
            const n = i.pop()
            return w
              ? n.call(e._engine.create[z](e, i))
              : t.on('raphael.DOMload', function () {
                n.call(e._engine.create[z](e, i))
              })
          }
          return e._engine.create[z](e, arguments)
        }
        function r (t) {
          if (typeof t === 'function' || Object(t) !== t) return t
          const e = new t.constructor()
          for (const i in t) t[A](i) && (e[i] = r(t[i]))
          return e
        }
        function i (t, e) {
          for (let r = 0, i = t.length; r < i; r++) { if (t[r] === e) return t.push(t.splice(r, 1)[0]) }
        }
        function n (t, e, r) {
          function n () {
            const a = Array.prototype.slice.call(arguments, 0)
            const s = a.join('␀')
            const o = (n.cache = n.cache || {})
            const l = (n.count = n.count || [])
            return o[A](s)
              ? (i(l, s), r ? r(o[s]) : o[s])
              : (l.length >= 1e3 && delete o[l.shift()],
                l.push(s),
                (o[s] = t[z](e, a)),
                r ? r(o[s]) : o[s])
          }
          return n
        }
        function a () {
          return this.hex
        }
        function s (t, e) {
          for (var r = [], i = 0, n = t.length; n - 2 * !e > i; i += 2) {
            const a = [
              { x: +t[i - 2], y: +t[i - 1] },
              { x: +t[i], y: +t[i + 1] },
              { x: +t[i + 2], y: +t[i + 3] },
              { x: +t[i + 4], y: +t[i + 5] }
            ]
            e
              ? i
                ? n - 4 == i
                  ? (a[3] = { x: +t[0], y: +t[1] })
                  : n - 2 == i &&
                      ((a[2] = { x: +t[0], y: +t[1] }),
                      (a[3] = { x: +t[2], y: +t[3] }))
                : (a[0] = { x: +t[n - 2], y: +t[n - 1] })
              : n - 4 == i
                ? (a[3] = a[2])
                : i || (a[0] = { x: +t[i], y: +t[i + 1] }),
            r.push([
              'C',
              (-a[0].x + 6 * a[1].x + a[2].x) / 6,
              (-a[0].y + 6 * a[1].y + a[2].y) / 6,
              (a[1].x + 6 * a[2].x - a[3].x) / 6,
              (a[1].y + 6 * a[2].y - a[3].y) / 6,
              a[2].x,
              a[2].y
            ])
          }
          return r
        }
        function o (t, e, r, i, n) {
          const a = -3 * e + 9 * r - 9 * i + 3 * n
          const s = t * a + 6 * e - 12 * r + 6 * i
          return t * s - 3 * e + 3 * r
        }
        function l (t, e, r, i, n, a, s, l, h) {
          h == null && (h = 1), (h = h > 1 ? 1 : h < 0 ? 0 : h)
          for (
            var u = h / 2,
              c = 12,
              f = [
                -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699,
                0.7699, -0.9041, 0.9041, -0.9816, 0.9816
              ],
              p = [
                0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601,
                0.1601, 0.1069, 0.1069, 0.0472, 0.0472
              ],
              d = 0,
              g = 0;
            g < c;
            g++
          ) {
            const v = u * f[g] + u
            const x = o(v, t, r, n, s)
            const y = o(v, e, i, a, l)
            const m = x * x + y * y
            d += p[g] * Y.sqrt(m)
          }
          return u * d
        }
        function h (t, e, r, i, n, a, s, o, h) {
          if (!(h < 0 || l(t, e, r, i, n, a, s, o) < h)) {
            const u = 1
            let c = u / 2
            let f = u - c
            let p
            const d = 0.01
            for (p = l(t, e, r, i, n, a, s, o, f); H(p - h) > d;) {
              (c /= 2),
              (f += (p < h ? 1 : -1) * c),
              (p = l(t, e, r, i, n, a, s, o, f))
            }
            return f
          }
        }
        function u (t, e, r, i, n, a, s, o) {
          if (
            !(
              W(t, r) < G(n, s) ||
                G(t, r) > W(n, s) ||
                W(e, i) < G(a, o) ||
                G(e, i) > W(a, o)
            )
          ) {
            const l = (t * i - e * r) * (n - s) - (t - r) * (n * o - a * s)
            const h = (t * i - e * r) * (a - o) - (e - i) * (n * o - a * s)
            const u = (t - r) * (a - o) - (e - i) * (n - s)
            if (u) {
              const c = l / u
              const f = h / u
              const p = +c.toFixed(2)
              const d = +f.toFixed(2)
              if (
                !(
                  p < +G(t, r).toFixed(2) ||
                    p > +W(t, r).toFixed(2) ||
                    p < +G(n, s).toFixed(2) ||
                    p > +W(n, s).toFixed(2) ||
                    d < +G(e, i).toFixed(2) ||
                    d > +W(e, i).toFixed(2) ||
                    d < +G(a, o).toFixed(2) ||
                    d > +W(a, o).toFixed(2)
                )
              ) { return { x: c, y: f } }
            }
          }
        }
        function c (t, e) {
          return p(t, e)
        }
        function f (t, e) {
          return p(t, e, 1)
        }
        function p (t, r, i) {
          const n = e.bezierBBox(t)
          const a = e.bezierBBox(r)
          if (!e.isBBoxIntersect(n, a)) return i ? 0 : []
          for (
            var s = l.apply(0, t),
              o = l.apply(0, r),
              h = W(~~(s / 5), 1),
              c = W(~~(o / 5), 1),
              f = [],
              p = [],
              d = {},
              g = i ? 0 : [],
              v = 0;
            v < h + 1;
            v++
          ) {
            var x = e.findDotsAtSegment.apply(e, t.concat(v / h))
            f.push({ x: x.x, y: x.y, t: v / h })
          }
          for (v = 0; v < c + 1; v++) {
            (x = e.findDotsAtSegment.apply(e, r.concat(v / c))),
            p.push({ x: x.x, y: x.y, t: v / c })
          }
          for (v = 0; v < h; v++) {
            for (let y = 0; y < c; y++) {
              const m = f[v]
              const b = f[v + 1]
              const _ = p[y]
              const w = p[y + 1]
              const k = H(b.x - m.x) < 0.001 ? 'y' : 'x'
              const B = H(w.x - _.x) < 0.001 ? 'y' : 'x'
              const C = u(m.x, m.y, b.x, b.y, _.x, _.y, w.x, w.y)
              if (C) {
                if (d[C.x.toFixed(4)] == C.y.toFixed(4)) continue
                d[C.x.toFixed(4)] = C.y.toFixed(4)
                const S = m.t + H((C[k] - m[k]) / (b[k] - m[k])) * (b.t - m.t)
                const A = _.t + H((C[B] - _[B]) / (w[B] - _[B])) * (w.t - _.t)
                S >= 0 &&
                    S <= 1.001 &&
                    A >= 0 &&
                    A <= 1.001 &&
                    (i
                      ? g++
                      : g.push({ x: C.x, y: C.y, t1: G(S, 1), t2: G(A, 1) }))
              }
            }
          }
          return g
        }
        function d (t, r, i) {
          (t = e._path2curve(t)), (r = e._path2curve(r))
          for (
            var n,
              a,
              s,
              o,
              l,
              h,
              u,
              c,
              f,
              d,
              g = i ? 0 : [],
              v = 0,
              x = t.length;
            v < x;
            v++
          ) {
            const y = t[v]
            if (y[0] == 'M') (n = l = y[1]), (a = h = y[2])
            else {
              y[0] == 'C'
                ? ((f = [n, a].concat(y.slice(1))), (n = f[6]), (a = f[7]))
                : ((f = [n, a, n, a, l, h, l, h]), (n = l), (a = h))
              for (let m = 0, b = r.length; m < b; m++) {
                const _ = r[m]
                if (_[0] == 'M') (s = u = _[1]), (o = c = _[2])
                else {
                  _[0] == 'C'
                    ? ((d = [s, o].concat(_.slice(1))),
                      (s = d[6]),
                      (o = d[7]))
                    : ((d = [s, o, s, o, u, c, u, c]), (s = u), (o = c))
                  const w = p(f, d, i)
                  if (i) g += w
                  else {
                    for (let k = 0, B = w.length; k < B; k++) {
                      (w[k].segment1 = v),
                      (w[k].segment2 = m),
                      (w[k].bez1 = f),
                      (w[k].bez2 = d)
                    }
                    g = g.concat(w)
                  }
                }
              }
            }
          }
          return g
        }
        function g (t, e, r, i, n, a) {
          t != null
            ? ((this.a = +t),
              (this.b = +e),
              (this.c = +r),
              (this.d = +i),
              (this.e = +n),
              (this.f = +a))
            : ((this.a = 1),
              (this.b = 0),
              (this.c = 0),
              (this.d = 1),
              (this.e = 0),
              (this.f = 0))
        }
        function v () {
          return this.x + j + this.y
        }
        function x () {
          return this.x + j + this.y + j + this.width + ' × ' + this.height
        }
        function y (t, e, r, i, n, a) {
          function s (t) {
            return ((c * t + u) * t + h) * t
          }
          function o (t, e) {
            const r = l(t, e)
            return ((d * r + p) * r + f) * r
          }
          function l (t, e) {
            let r, i, n, a, o, l
            for (n = t, l = 0; l < 8; l++) {
              if (((a = s(n) - t), H(a) < e)) return n
              if (((o = (3 * c * n + 2 * u) * n + h), H(o) < 1e-6)) break
              n -= a / o
            }
            if (((r = 0), (i = 1), (n = t), n < r)) return r
            if (n > i) return i
            for (; r < i;) {
              if (((a = s(n)), H(a - t) < e)) return n
              t > a ? (r = n) : (i = n), (n = (i - r) / 2 + r)
            }
            return n
          }
          var h = 3 * e
          var u = 3 * (i - e) - h
          var c = 1 - h - u
          var f = 3 * r
          var p = 3 * (n - r) - f
          var d = 1 - f - p
          return o(t, 1 / (200 * a))
        }
        function m (t, e) {
          const r = []
          const i = {}
          if (((this.ms = e), (this.times = 1), t)) {
            for (const n in t) t[A](n) && ((i[ht(n)] = t[n]), r.push(ht(n)))
            r.sort(Bt)
          }
          (this.anim = i), (this.top = r[r.length - 1]), (this.percents = r)
        }
        function b (r, i, n, a, s, o) {
          n = ht(n)
          let l
          let h
          let u
          const c = []
          let f
          let p
          let d
          let v = r.ms
          const x = {}
          const m = {}
          const b = {}
          if (a) {
            for (w = 0, B = Ee.length; w < B; w++) {
              var _ = Ee[w]
              if (_.el.id == i.id && _.anim == r) {
                _.percent != n ? (Ee.splice(w, 1), (u = 1)) : (h = _),
                i.attr(_.totalOrigin)
                break
              }
            }
          } else a = +m
          for (var w = 0, B = r.percents.length; w < B; w++) {
            if (r.percents[w] == n || r.percents[w] > a * r.top) {
              (n = r.percents[w]),
              (p = r.percents[w - 1] || 0),
              (v = (v / r.top) * (n - p)),
              (f = r.percents[w + 1]),
              (l = r.anim[n])
              break
            }
            a && i.attr(r.anim[r.percents[w]])
          }
          if (l) {
            if (h) (h.initstatus = a), (h.start = new Date() - h.ms * a)
            else {
              for (const C in l) {
                if (l[A](C) && (pt[A](C) || i.paper.customAttributes[A](C))) {
                  switch (
                    ((x[C] = i.attr(C)),
                    x[C] == null && (x[C] = ft[C]),
                    (m[C] = l[C]),
                    pt[C])
                  ) {
                    case $:
                      b[C] = (m[C] - x[C]) / v
                      break
                    case 'colour':
                      x[C] = e.getRGB(x[C])
                      var S = e.getRGB(m[C])
                      b[C] = {
                        r: (S.r - x[C].r) / v,
                        g: (S.g - x[C].g) / v,
                        b: (S.b - x[C].b) / v
                      }
                      break
                    case 'path':
                      var T = Qt(x[C], m[C])
                      var E = T[1]
                      for (
                        x[C] = T[0], b[C] = [], w = 0, B = x[C].length;
                        w < B;
                        w++
                      ) {
                        b[C][w] = [0]
                        for (var M = 1, N = x[C][w].length; M < N; M++) { b[C][w][M] = (E[w][M] - x[C][w][M]) / v }
                      }
                      break
                    case 'transform':
                      var L = i._
                      var z = le(L[C], m[C])
                      if (z) {
                        for (
                          x[C] = z.from,
                          m[C] = z.to,
                          b[C] = [],
                          b[C].real = !0,
                          w = 0,
                          B = x[C].length;
                          w < B;
                          w++
                        ) {
                          for (
                            b[C][w] = [x[C][w][0]], M = 1, N = x[C][w].length;
                            M < N;
                            M++
                          ) { b[C][w][M] = (m[C][w][M] - x[C][w][M]) / v }
                        }
                      } else {
                        const F = i.matrix || new g()
                        const R = {
                          _: { transform: L.transform },
                          getBBox: function () {
                            return i.getBBox(1)
                          }
                        };
                        (x[C] = [F.a, F.b, F.c, F.d, F.e, F.f]),
                        se(R, m[C]),
                        (m[C] = R._.transform),
                        (b[C] = [
                          (R.matrix.a - F.a) / v,
                          (R.matrix.b - F.b) / v,
                          (R.matrix.c - F.c) / v,
                          (R.matrix.d - F.d) / v,
                          (R.matrix.e - F.e) / v,
                          (R.matrix.f - F.f) / v
                        ])
                      }
                      break
                    case 'csv':
                      var j = I(l[C])[q](k)
                      var D = I(x[C])[q](k)
                      if (C == 'clip-rect') {
                        for (x[C] = D, b[C] = [], w = D.length; w--;) { b[C][w] = (j[w] - x[C][w]) / v }
                      }
                      m[C] = j
                      break
                    default:
                      for (
                        j = [][P](l[C]),
                        D = [][P](x[C]),
                        b[C] = [],
                        w = i.paper.customAttributes[C].length;
                        w--;

                      ) { b[C][w] = ((j[w] || 0) - (D[w] || 0)) / v }
                  }
                }
              }
              const V = l.easing
              let O = e.easing_formulas[V]
              if (!O) {
                if (((O = I(V).match(st)), O && O.length == 5)) {
                  const Y = O
                  O = function (t) {
                    return y(t, +Y[1], +Y[2], +Y[3], +Y[4], v)
                  }
                } else O = St
              }
              if (
                ((d = l.start || r.start || +new Date()),
                (_ = {
                  anim: r,
                  percent: n,
                  timestamp: d,
                  start: d + (r.del || 0),
                  status: 0,
                  initstatus: a || 0,
                  stop: !1,
                  ms: v,
                  easing: O,
                  from: x,
                  diff: b,
                  to: m,
                  el: i,
                  callback: l.callback,
                  prev: p,
                  next: f,
                  repeat: o || r.times,
                  origin: i.attr(),
                  totalOrigin: s
                }),
                Ee.push(_),
                a &&
                    !h &&
                    !u &&
                    ((_.stop = !0),
                    (_.start = new Date() - v * a),
                    Ee.length == 1))
              ) { return Ne() }
              u && (_.start = new Date() - _.ms * a),
              Ee.length == 1 && Me(Ne)
            }
            t('raphael.anim.start.' + i.id, i, r)
          }
        }
        function _ (t) {
          for (let e = 0; e < Ee.length; e++) { Ee[e].el.paper == t && Ee.splice(e--, 1) }
        }
        (e.version = '2.2.0'), (e.eve = t)
        let w
        var k = /[, ]+/
        const B = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 }
        const C = /\{(\d+)\}/g
        const S = 'prototype'
        var A = 'hasOwnProperty'
        const T = { doc: document, win: window }
        const E = {
          was: Object.prototype[A].call(T.win, 'Raphael'),
          is: T.win.Raphael
        }
        const M = function () {
          this.ca = this.customAttributes = {}
        }
        let N
        const L = 'appendChild'
        var z = 'apply'
        var P = 'concat'
        const F =
              'ontouchstart' in T.win ||
              (T.win.DocumentTouch && T.doc instanceof DocumentTouch)
        const R = ''
        var j = ' '
        var I = String
        var q = 'split'
        const D =
              'click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel'[
                q
              ](j)
        const V = {
          mousedown: 'touchstart',
          mousemove: 'touchmove',
          mouseup: 'touchend'
        }
        const O = I.prototype.toLowerCase
        var Y = Math
        var W = Y.max
        var G = Y.min
        var H = Y.abs
        const X = Y.pow
        const U = Y.PI
        var $ = 'number'
        const Z = 'string'
        var Q = 'array'
        const J = 'toString'
        const K = 'fill'
        const tt = Object.prototype.toString
        const et = {}
        const rt = 'push'
        const it = (e._ISURL = /^url\(['"]?(.+?)['"]?\)$/i)
        const nt =
              /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i
        const at = { NaN: 1, Infinity: 1, '-Infinity': 1 }
        var st = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/
        const ot = Y.round
        const lt = 'setAttribute'
        var ht = parseFloat
        const ut = parseInt
        const ct = I.prototype.toUpperCase
        var ft = (e._availableAttrs = {
          'arrow-end': 'none',
          'arrow-start': 'none',
          blur: 0,
          'clip-rect': '0 0 1e9 1e9',
          cursor: 'default',
          cx: 0,
          cy: 0,
          fill: '#fff',
          'fill-opacity': 1,
          font: '10px "Arial"',
          'font-family': '"Arial"',
          'font-size': '10',
          'font-style': 'normal',
          'font-weight': 400,
          gradient: 0,
          height: 0,
          href: 'http://raphaeljs.com/',
          'letter-spacing': 0,
          opacity: 1,
          path: 'M0,0',
          r: 0,
          rx: 0,
          ry: 0,
          src: '',
          stroke: '#000',
          'stroke-dasharray': '',
          'stroke-linecap': 'butt',
          'stroke-linejoin': 'butt',
          'stroke-miterlimit': 0,
          'stroke-opacity': 1,
          'stroke-width': 1,
          target: '_blank',
          'text-anchor': 'middle',
          title: 'Raphael',
          transform: '',
          width: 0,
          x: 0,
          y: 0,
          class: ''
        })
        var pt = (e._availableAnimAttrs = {
          blur: $,
          'clip-rect': 'csv',
          cx: $,
          cy: $,
          fill: 'colour',
          'fill-opacity': $,
          'font-size': $,
          height: $,
          opacity: $,
          path: 'path',
          r: $,
          rx: $,
          ry: $,
          stroke: 'colour',
          'stroke-opacity': $,
          'stroke-width': $,
          transform: 'transform',
          width: $,
          x: $,
          y: $
        })
        const dt =
              /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g
        const gt =
              /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/
        const vt = { hs: 1, rg: 1 }
        const xt = /,?([achlmqrstvxz]),?/gi
        const yt =
              /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi
        const mt =
              /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi
        const bt =
              /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi
        const _t = (e._radial_gradient =
              /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/)
        const wt = {}
        const kt = function (t, e) {
          return t.key - e.key
        }
        var Bt = function (t, e) {
          return ht(t) - ht(e)
        }
        const Ct = function () {}
        var St = function (t) {
          return t
        }
        const At = (e._rectPath = function (t, e, r, i, n) {
          return n
            ? [
                ['M', t + n, e],
                ['l', r - 2 * n, 0],
                ['a', n, n, 0, 0, 1, n, n],
                ['l', 0, i - 2 * n],
                ['a', n, n, 0, 0, 1, -n, n],
                ['l', 2 * n - r, 0],
                ['a', n, n, 0, 0, 1, -n, -n],
                ['l', 0, 2 * n - i],
                ['a', n, n, 0, 0, 1, n, -n],
                ['z']
              ]
            : [['M', t, e], ['l', r, 0], ['l', 0, i], ['l', -r, 0], ['z']]
        })
        const Tt = function (t, e, r, i) {
          return (
            i == null && (i = r),
            [
              ['M', t, e],
              ['m', 0, -i],
              ['a', r, i, 0, 1, 1, 0, 2 * i],
              ['a', r, i, 0, 1, 1, 0, -2 * i],
              ['z']
            ]
          )
        }
        const Et = (e._getPath = {
          path: function (t) {
            return t.attr('path')
          },
          circle: function (t) {
            const e = t.attrs
            return Tt(e.cx, e.cy, e.r)
          },
          ellipse: function (t) {
            const e = t.attrs
            return Tt(e.cx, e.cy, e.rx, e.ry)
          },
          rect: function (t) {
            const e = t.attrs
            return At(e.x, e.y, e.width, e.height, e.r)
          },
          image: function (t) {
            const e = t.attrs
            return At(e.x, e.y, e.width, e.height)
          },
          text: function (t) {
            const e = t._getBBox()
            return At(e.x, e.y, e.width, e.height)
          },
          set: function (t) {
            const e = t._getBBox()
            return At(e.x, e.y, e.width, e.height)
          }
        })
        const Mt = (e.mapPath = function (t, e) {
          if (!e) return t
          let r, i, n, a, s, o, l
          for (t = Qt(t), n = 0, s = t.length; n < s; n++) {
            for (l = t[n], a = 1, o = l.length; a < o; a += 2) {
              (r = e.x(l[a], l[a + 1])),
              (i = e.y(l[a], l[a + 1])),
              (l[a] = r),
              (l[a + 1] = i)
            }
          }
          return t
        })
        if (
          ((e._g = T),
          (e.type =
              T.win.SVGAngle ||
              T.doc.implementation.hasFeature(
                'http://www.w3.org/TR/SVG11/feature#BasicStructure',
                '1.1'
              )
                ? 'SVG'
                : 'VML'),
          e.type == 'VML')
        ) {
          let Nt = T.doc.createElement('div')
          let Lt
          if (
            ((Nt.innerHTML = '<v:shape adj="1"/>'),
            (Lt = Nt.firstChild),
            (Lt.style.behavior = 'url(#default#VML)'),
            !Lt || typeof Lt.adj !== 'object')
          ) { return (e.type = R) }
          Nt = null
        }
        (e.svg = !(e.vml = e.type == 'VML')),
        (e._Paper = M),
        (e.fn = N = M.prototype = e.prototype),
        (e._id = 0),
        (e.is = function (t, e) {
          return (
            (e = O.call(e)),
            e == 'finite'
              ? !at[A](+t)
              : e == 'array'
                ? t instanceof Array
                : (e == 'null' && t === null) ||
                    (e === typeof t && t !== null) ||
                    (e == 'object' && t === Object(t)) ||
                    (e == 'array' && Array.isArray && Array.isArray(t)) ||
                    tt.call(t).slice(8, -1).toLowerCase() == e
          )
        }),
        (e.angle = function (t, r, i, n, a, s) {
          if (a == null) {
            const o = t - i
            const l = r - n
            return o || l
              ? (180 + (180 * Y.atan2(-l, -o)) / U + 360) % 360
              : 0
          }
          return e.angle(t, r, a, s) - e.angle(i, n, a, s)
        }),
        (e.rad = function (t) {
          return ((t % 360) * U) / 180
        }),
        (e.deg = function (t) {
          return Math.round((((180 * t) / U) % 360) * 1e3) / 1e3
        }),
        (e.snapTo = function (t, r, i) {
          if (((i = e.is(i, 'finite') ? i : 10), e.is(t, Q))) {
            for (let n = t.length; n--;) if (H(t[n] - r) <= i) return t[n]
          } else {
            t = +t
            const a = r % t
            if (a < i) return r - a
            if (a > t - i) return r - a + t
          }
          return r
        })
        const zt = (e.createUUID = (function (t, e) {
          return function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
              .replace(t, e)
              .toUpperCase()
          }
        })(/[xy]/g, function (t) {
          const e = (16 * Y.random()) | 0
          const r = t == 'x' ? e : (3 & e) | 8
          return r.toString(16)
        }))
        e.setWindow = function (r) {
          t('raphael.setWindow', e, T.win, r),
          (T.win = r),
          (T.doc = T.win.document),
          e._engine.initWin && e._engine.initWin(T.win)
        }
        let Pt = function (t) {
          if (e.vml) {
            const r = /^\s+|\s+$/g
            let i
            try {
              const a = new ActiveXObject('htmlfile')
              a.write('<body>'), a.close(), (i = a.body)
            } catch (s) {
              i = createPopup().document.body
            }
            const o = i.createTextRange()
            Pt = n(function (t) {
              try {
                i.style.color = I(t).replace(r, R)
                let e = o.queryCommandValue('ForeColor')
                return (
                  (e =
                        ((255 & e) << 16) |
                        (65280 & e) |
                        ((16711680 & e) >>> 16)),
                  '#' + ('000000' + e.toString(16)).slice(-6)
                )
              } catch (n) {
                return 'none'
              }
            })
          } else {
            const l = T.doc.createElement('i');
            (l.title = 'Raphaël Colour Picker'),
            (l.style.display = 'none'),
            T.doc.body.appendChild(l),
            (Pt = n(function (t) {
              return (
                (l.style.color = t),
                T.doc.defaultView
                  .getComputedStyle(l, R)
                  .getPropertyValue('color')
              )
            }))
          }
          return Pt(t)
        }
        const Ft = function () {
          return 'hsb(' + [this.h, this.s, this.b] + ')'
        }
        const Rt = function () {
          return 'hsl(' + [this.h, this.s, this.l] + ')'
        }
        const jt = function () {
          return this.hex
        }
        const It = function (t, r, i) {
          if (
            (r == null &&
                  e.is(t, 'object') &&
                  'r' in t &&
                  'g' in t &&
                  'b' in t &&
                  ((i = t.b), (r = t.g), (t = t.r)),
            r == null && e.is(t, Z))
          ) {
            const n = e.getRGB(t);
            (t = n.r), (r = n.g), (i = n.b)
          }
          return (
            (t > 1 || r > 1 || i > 1) &&
                  ((t /= 255), (r /= 255), (i /= 255)),
            [t, r, i]
          )
        }
        const qt = function (t, r, i, n) {
          (t *= 255), (r *= 255), (i *= 255)
          const a = { r: t, g: r, b: i, hex: e.rgb(t, r, i), toString: jt }
          return e.is(n, 'finite') && (a.opacity = n), a
        };
        (e.color = function (t) {
          let r
          return (
            e.is(t, 'object') && 'h' in t && 's' in t && 'b' in t
              ? ((r = e.hsb2rgb(t)),
                (t.r = r.r),
                (t.g = r.g),
                (t.b = r.b),
                (t.hex = r.hex))
              : e.is(t, 'object') && 'h' in t && 's' in t && 'l' in t
                ? ((r = e.hsl2rgb(t)),
                  (t.r = r.r),
                  (t.g = r.g),
                  (t.b = r.b),
                  (t.hex = r.hex))
                : (e.is(t, 'string') && (t = e.getRGB(t)),
                  e.is(t, 'object') && 'r' in t && 'g' in t && 'b' in t
                    ? ((r = e.rgb2hsl(t)),
                      (t.h = r.h),
                      (t.s = r.s),
                      (t.l = r.l),
                      (r = e.rgb2hsb(t)),
                      (t.v = r.b))
                    : ((t = { hex: 'none' }),
                      (t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1))),
            (t.toString = jt),
            t
          )
        }),
        (e.hsb2rgb = function (t, e, r, i) {
          this.is(t, 'object') &&
                'h' in t &&
                's' in t &&
                'b' in t &&
                ((r = t.b), (e = t.s), (i = t.o), (t = t.h)),
          (t *= 360)
          let n, a, s, o, l
          return (
            (t = (t % 360) / 60),
            (l = r * e),
            (o = l * (1 - H((t % 2) - 1))),
            (n = a = s = r - l),
            (t = ~~t),
            (n += [l, o, 0, 0, o, l][t]),
            (a += [o, l, l, o, 0, 0][t]),
            (s += [0, 0, o, l, l, o][t]),
            qt(n, a, s, i)
          )
        }),
        (e.hsl2rgb = function (t, e, r, i) {
          this.is(t, 'object') &&
                'h' in t &&
                's' in t &&
                'l' in t &&
                ((r = t.l), (e = t.s), (t = t.h)),
          (t > 1 || e > 1 || r > 1) &&
                  ((t /= 360), (e /= 100), (r /= 100)),
          (t *= 360)
          let n, a, s, o, l
          return (
            (t = (t % 360) / 60),
            (l = 2 * e * (r < 0.5 ? r : 1 - r)),
            (o = l * (1 - H((t % 2) - 1))),
            (n = a = s = r - l / 2),
            (t = ~~t),
            (n += [l, o, 0, 0, o, l][t]),
            (a += [o, l, l, o, 0, 0][t]),
            (s += [0, 0, o, l, l, o][t]),
            qt(n, a, s, i)
          )
        }),
        (e.rgb2hsb = function (t, e, r) {
          (r = It(t, e, r)), (t = r[0]), (e = r[1]), (r = r[2])
          let i, n, a, s
          return (
            (a = W(t, e, r)),
            (s = a - G(t, e, r)),
            (i =
                  s == 0
                    ? null
                    : a == t
                      ? (e - r) / s
                      : a == e
                        ? (r - t) / s + 2
                        : (t - e) / s + 4),
            (i = (((i + 360) % 6) * 60) / 360),
            (n = s == 0 ? 0 : s / a),
            { h: i, s: n, b: a, toString: Ft }
          )
        }),
        (e.rgb2hsl = function (t, e, r) {
          (r = It(t, e, r)), (t = r[0]), (e = r[1]), (r = r[2])
          let i, n, a, s, o, l
          return (
            (s = W(t, e, r)),
            (o = G(t, e, r)),
            (l = s - o),
            (i =
                  l == 0
                    ? null
                    : s == t
                      ? (e - r) / l
                      : s == e
                        ? (r - t) / l + 2
                        : (t - e) / l + 4),
            (i = (((i + 360) % 6) * 60) / 360),
            (a = (s + o) / 2),
            (n = l == 0 ? 0 : a < 0.5 ? l / (2 * a) : l / (2 - 2 * a)),
            { h: i, s: n, l: a, toString: Rt }
          )
        }),
        (e._path2string = function () {
          return this.join(',').replace(xt, '$1')
        })
        const Dt = (e._preload = function (t, e) {
          const r = T.doc.createElement('img');
          (r.style.cssText = 'position:absolute;left:-9999em;top:-9999em'),
          (r.onload = function () {
            e.call(this),
            (this.onload = null),
            T.doc.body.removeChild(this)
          }),
          (r.onerror = function () {
            T.doc.body.removeChild(this)
          }),
          T.doc.body.appendChild(r),
          (r.src = t)
        });
        (e.getRGB = n(function (t) {
          if (!t || (t = I(t)).indexOf('-') + 1) {
            return {
              r: -1,
              g: -1,
              b: -1,
              hex: 'none',
              error: 1,
              toString: a
            }
          }
          if (t == 'none') { return { r: -1, g: -1, b: -1, hex: 'none', toString: a } }
          !(vt[A](t.toLowerCase().substring(0, 2)) || t.charAt() == '#') &&
              (t = Pt(t))
          let r
          let i
          let n
          let s
          let o
          let l
          let h
          let u = t.match(nt)
          return u
            ? (u[2] &&
                  ((s = ut(u[2].substring(5), 16)),
                  (n = ut(u[2].substring(3, 5), 16)),
                  (i = ut(u[2].substring(1, 3), 16))),
              u[3] &&
                  ((s = ut((l = u[3].charAt(3)) + l, 16)),
                  (n = ut((l = u[3].charAt(2)) + l, 16)),
                  (i = ut((l = u[3].charAt(1)) + l, 16))),
              u[4] &&
                  ((h = u[4][q](gt)),
                  (i = ht(h[0])),
                  h[0].slice(-1) == '%' && (i *= 2.55),
                  (n = ht(h[1])),
                  h[1].slice(-1) == '%' && (n *= 2.55),
                  (s = ht(h[2])),
                  h[2].slice(-1) == '%' && (s *= 2.55),
                  u[1].toLowerCase().slice(0, 4) == 'rgba' && (o = ht(h[3])),
                  h[3] && h[3].slice(-1) == '%' && (o /= 100)),
              u[5]
                ? ((h = u[5][q](gt)),
                  (i = ht(h[0])),
                  h[0].slice(-1) == '%' && (i *= 2.55),
                  (n = ht(h[1])),
                  h[1].slice(-1) == '%' && (n *= 2.55),
                  (s = ht(h[2])),
                  h[2].slice(-1) == '%' && (s *= 2.55),
                  (h[0].slice(-3) == 'deg' || h[0].slice(-1) == '°') &&
                      (i /= 360),
                  u[1].toLowerCase().slice(0, 4) == 'hsba' && (o = ht(h[3])),
                  h[3] && h[3].slice(-1) == '%' && (o /= 100),
                  e.hsb2rgb(i, n, s, o))
                : u[6]
                  ? ((h = u[6][q](gt)),
                    (i = ht(h[0])),
                    h[0].slice(-1) == '%' && (i *= 2.55),
                    (n = ht(h[1])),
                    h[1].slice(-1) == '%' && (n *= 2.55),
                    (s = ht(h[2])),
                    h[2].slice(-1) == '%' && (s *= 2.55),
                    (h[0].slice(-3) == 'deg' || h[0].slice(-1) == '°') &&
                      (i /= 360),
                    u[1].toLowerCase().slice(0, 4) == 'hsla' && (o = ht(h[3])),
                    h[3] && h[3].slice(-1) == '%' && (o /= 100),
                    e.hsl2rgb(i, n, s, o))
                  : ((u = { r: i, g: n, b: s, toString: a }),
                    (u.hex =
                      '#' +
                      (16777216 | s | (n << 8) | (i << 16))
                        .toString(16)
                        .slice(1)),
                    e.is(o, 'finite') && (u.opacity = o),
                    u))
            : { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: a }
        }, e)),
        (e.hsb = n(function (t, r, i) {
          return e.hsb2rgb(t, r, i).hex
        })),
        (e.hsl = n(function (t, r, i) {
          return e.hsl2rgb(t, r, i).hex
        })),
        (e.rgb = n(function (t, e, r) {
          function i (t) {
            return (t + 0.5) | 0
          }
          return (
            '#' +
                (16777216 | i(r) | (i(e) << 8) | (i(t) << 16))
                  .toString(16)
                  .slice(1)
          )
        })),
        (e.getColor = function (t) {
          const e = (this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: t || 0.75
          })
          const r = this.hsb2rgb(e.h, e.s, e.b)
          return (
            (e.h += 0.075),
            e.h > 1 &&
                  ((e.h = 0),
                  (e.s -= 0.2),
                  e.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: e.b })),
            r.hex
          )
        }),
        (e.getColor.reset = function () {
          delete this.start
        }),
        (e.parsePathString = function (t) {
          if (!t) return null
          const r = Vt(t)
          if (r.arr) return Yt(r.arr)
          const i = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
          }
          let n = []
          return (
            e.is(t, Q) && e.is(t[0], Q) && (n = Yt(t)),
            n.length ||
                  I(t).replace(yt, function (t, e, r) {
                    const a = []
                    let s = e.toLowerCase()
                    if (
                      (r.replace(bt, function (t, e) {
                        e && a.push(+e)
                      }),
                      s == 'm' &&
                        a.length > 2 &&
                        (n.push([e][P](a.splice(0, 2))),
                        (s = 'l'),
                        (e = e == 'm' ? 'l' : 'L')),
                      s == 'r')
                    ) { n.push([e][P](a)) } else {
                      for (
                        ;
                        a.length >= i[s] &&
                        (n.push([e][P](a.splice(0, i[s]))), i[s]);

                      );
                    }
                  }),
            (n.toString = e._path2string),
            (r.arr = Yt(n)),
            n
          )
        }),
        (e.parseTransformString = n(function (t) {
          if (!t) return null
          const r = { r: 3, s: 4, t: 2, m: 6 }
          let i = []
          return (
            e.is(t, Q) && e.is(t[0], Q) && (i = Yt(t)),
            i.length ||
                  I(t).replace(mt, function (t, e, r) {
                    const n = []
                    const a = O.call(e)
                    r.replace(bt, function (t, e) {
                      e && n.push(+e)
                    }),
                    i.push([e][P](n))
                  }),
            (i.toString = e._path2string),
            i
          )
        }))
        var Vt = function (t) {
          const e = (Vt.ps = Vt.ps || {})
          return (
            e[t] ? (e[t].sleep = 100) : (e[t] = { sleep: 100 }),
            setTimeout(function () {
              for (const r in e) {
                e[A](r) &&
                    r != t &&
                    (e[r].sleep--, !e[r].sleep && delete e[r])
              }
            }),
            e[t]
          )
        };
        (e.findDotsAtSegment = function (t, e, r, i, n, a, s, o, l) {
          const h = 1 - l
          const u = X(h, 3)
          const c = X(h, 2)
          const f = l * l
          const p = f * l
          const d = u * t + 3 * c * l * r + 3 * h * l * l * n + p * s
          const g = u * e + 3 * c * l * i + 3 * h * l * l * a + p * o
          const v = t + 2 * l * (r - t) + f * (n - 2 * r + t)
          const x = e + 2 * l * (i - e) + f * (a - 2 * i + e)
          const y = r + 2 * l * (n - r) + f * (s - 2 * n + r)
          const m = i + 2 * l * (a - i) + f * (o - 2 * a + i)
          const b = h * t + l * r
          const _ = h * e + l * i
          const w = h * n + l * s
          const k = h * a + l * o
          let B = 90 - (180 * Y.atan2(v - y, x - m)) / U
          return (
            (v > y || x < m) && (B += 180),
            {
              x: d,
              y: g,
              m: { x: v, y: x },
              n: { x: y, y: m },
              start: { x: b, y: _ },
              end: { x: w, y: k },
              alpha: B
            }
          )
        }),
        (e.bezierBBox = function (t, r, i, n, a, s, o, l) {
          e.is(t, 'array') || (t = [t, r, i, n, a, s, o, l])
          const h = Zt.apply(null, t)
          return {
            x: h.min.x,
            y: h.min.y,
            x2: h.max.x,
            y2: h.max.y,
            width: h.max.x - h.min.x,
            height: h.max.y - h.min.y
          }
        }),
        (e.isPointInsideBBox = function (t, e, r) {
          return e >= t.x && e <= t.x2 && r >= t.y && r <= t.y2
        }),
        (e.isBBoxIntersect = function (t, r) {
          const i = e.isPointInsideBBox
          return (
            i(r, t.x, t.y) ||
                i(r, t.x2, t.y) ||
                i(r, t.x, t.y2) ||
                i(r, t.x2, t.y2) ||
                i(t, r.x, r.y) ||
                i(t, r.x2, r.y) ||
                i(t, r.x, r.y2) ||
                i(t, r.x2, r.y2) ||
                (((t.x < r.x2 && t.x > r.x) || (r.x < t.x2 && r.x > t.x)) &&
                  ((t.y < r.y2 && t.y > r.y) || (r.y < t.y2 && r.y > t.y)))
          )
        }),
        (e.pathIntersection = function (t, e) {
          return d(t, e)
        }),
        (e.pathIntersectionNumber = function (t, e) {
          return d(t, e, 1)
        }),
        (e.isPointInsidePath = function (t, r, i) {
          const n = e.pathBBox(t)
          return (
            e.isPointInsideBBox(n, r, i) &&
                d(
                  t,
                  [
                    ['M', r, i],
                    ['H', n.x2 + 10]
                  ],
                  1
                ) %
                  2 ==
                  1
          )
        }),
        (e._removedFactory = function (e) {
          return function () {
            t(
              'raphael.log',
              null,
              'Raphaël: you are calling to method “' +
                    e +
                    '” of removed object',
              e
            )
          }
        })
        const Ot = (e.pathBBox = function (t) {
          const e = Vt(t)
          if (e.bbox) return r(e.bbox)
          if (!t) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 }
          t = Qt(t)
          for (
            var i = 0, n = 0, a = [], s = [], o, l = 0, h = t.length;
            l < h;
            l++
          ) {
            if (((o = t[l]), o[0] == 'M')) { (i = o[1]), (n = o[2]), a.push(i), s.push(n) } else {
              const u = Zt(i, n, o[1], o[2], o[3], o[4], o[5], o[6]);
              (a = a[P](u.min.x, u.max.x)),
              (s = s[P](u.min.y, u.max.y)),
              (i = o[5]),
              (n = o[6])
            }
          }
          const c = G[z](0, a)
          const f = G[z](0, s)
          const p = W[z](0, a)
          const d = W[z](0, s)
          const g = p - c
          const v = d - f
          const x = {
            x: c,
            y: f,
            x2: p,
            y2: d,
            width: g,
            height: v,
            cx: c + g / 2,
            cy: f + v / 2
          }
          return (e.bbox = r(x)), x
        })
        var Yt = function (t) {
          const i = r(t)
          return (i.toString = e._path2string), i
        }
        const Wt = (e._pathToRelative = function (t) {
          const r = Vt(t)
          if (r.rel) return Yt(r.rel);
          (e.is(t, Q) && e.is(t && t[0], Q)) || (t = e.parsePathString(t))
          const i = []
          let n = 0
          let a = 0
          let s = 0
          let o = 0
          let l = 0
          t[0][0] == 'M' &&
                ((n = t[0][1]),
                (a = t[0][2]),
                (s = n),
                (o = a),
                l++,
                i.push(['M', n, a]))
          for (let h = l, u = t.length; h < u; h++) {
            let c = (i[h] = [])
            const f = t[h]
            if (f[0] != O.call(f[0])) {
              switch (((c[0] = O.call(f[0])), c[0])) {
                case 'a':
                  (c[1] = f[1]),
                  (c[2] = f[2]),
                  (c[3] = f[3]),
                  (c[4] = f[4]),
                  (c[5] = f[5]),
                  (c[6] = +(f[6] - n).toFixed(3)),
                  (c[7] = +(f[7] - a).toFixed(3))
                  break
                case 'v':
                  c[1] = +(f[1] - a).toFixed(3)
                  break
                case 'm':
                  (s = f[1]), (o = f[2])
                default:
                  for (let p = 1, d = f.length; p < d; p++) { c[p] = +(f[p] - (p % 2 ? n : a)).toFixed(3) }
              }
            } else {
              (c = i[h] = []),
              f[0] == 'm' && ((s = f[1] + n), (o = f[2] + a))
              for (let g = 0, v = f.length; g < v; g++) i[h][g] = f[g]
            }
            const x = i[h].length
            switch (i[h][0]) {
              case 'z':
                (n = s), (a = o)
                break
              case 'h':
                n += +i[h][x - 1]
                break
              case 'v':
                a += +i[h][x - 1]
                break
              default:
                (n += +i[h][x - 2]), (a += +i[h][x - 1])
            }
          }
          return (i.toString = e._path2string), (r.rel = Yt(i)), i
        })
        const Gt = (e._pathToAbsolute = function (t) {
          const r = Vt(t)
          if (r.abs) return Yt(r.abs)
          if (
            ((e.is(t, Q) && e.is(t && t[0], Q)) ||
                  (t = e.parsePathString(t)),
            !t || !t.length)
          ) { return [['M', 0, 0]] }
          let i = []
          let n = 0
          let a = 0
          let o = 0
          let l = 0
          let h = 0
          t[0][0] == 'M' &&
                ((n = +t[0][1]),
                (a = +t[0][2]),
                (o = n),
                (l = a),
                h++,
                (i[0] = ['M', n, a]))
          for (
            var u =
                    t.length == 3 &&
                    t[0][0] == 'M' &&
                    t[1][0].toUpperCase() == 'R' &&
                    t[2][0].toUpperCase() == 'Z',
              c,
              f,
              p = h,
              d = t.length;
            p < d;
            p++
          ) {
            if ((i.push((c = [])), (f = t[p]), f[0] != ct.call(f[0]))) {
              switch (((c[0] = ct.call(f[0])), c[0])) {
                case 'A':
                  (c[1] = f[1]),
                  (c[2] = f[2]),
                  (c[3] = f[3]),
                  (c[4] = f[4]),
                  (c[5] = f[5]),
                  (c[6] = +(f[6] + n)),
                  (c[7] = +(f[7] + a))
                  break
                case 'V':
                  c[1] = +f[1] + a
                  break
                case 'H':
                  c[1] = +f[1] + n
                  break
                case 'R':
                  for (
                    var g = [n, a][P](f.slice(1)), v = 2, x = g.length;
                    v < x;
                    v++
                  ) { (g[v] = +g[v] + n), (g[++v] = +g[v] + a) }
                  i.pop(), (i = i[P](s(g, u)))
                  break
                case 'M':
                  (o = +f[1] + n), (l = +f[2] + a)
                default:
                  for (v = 1, x = f.length; v < x; v++) { c[v] = +f[v] + (v % 2 ? n : a) }
              }
            } else if (f[0] == 'R') {
              (g = [n, a][P](f.slice(1))),
              i.pop(),
              (i = i[P](s(g, u))),
              (c = ['R'][P](f.slice(-2)))
            } else for (let y = 0, m = f.length; y < m; y++) c[y] = f[y]
            switch (c[0]) {
              case 'Z':
                (n = o), (a = l)
                break
              case 'H':
                n = c[1]
                break
              case 'V':
                a = c[1]
                break
              case 'M':
                (o = c[c.length - 2]), (l = c[c.length - 1])
              default:
                (n = c[c.length - 2]), (a = c[c.length - 1])
            }
          }
          return (i.toString = e._path2string), (r.abs = Yt(i)), i
        })
        const Ht = function (t, e, r, i) {
          return [t, e, r, i, r, i]
        }
        const Xt = function (t, e, r, i, n, a) {
          const s = 1 / 3
          const o = 2 / 3
          return [
            s * t + o * r,
            s * e + o * i,
            s * n + o * r,
            s * a + o * i,
            n,
            a
          ]
        }
        const Ut = function (t, e, r, i, a, s, o, l, h, u) {
          const c = (120 * U) / 180
          const f = (U / 180) * (+a || 0)
          let p = []
          let d
          const g = n(function (t, e, r) {
            const i = t * Y.cos(r) - e * Y.sin(r)
            const n = t * Y.sin(r) + e * Y.cos(r)
            return { x: i, y: n }
          })
          if (u) (S = u[0]), (A = u[1]), (B = u[2]), (C = u[3])
          else {
            (d = g(t, e, -f)),
            (t = d.x),
            (e = d.y),
            (d = g(l, h, -f)),
            (l = d.x),
            (h = d.y)
            const v = Y.cos((U / 180) * a)
            const x = Y.sin((U / 180) * a)
            const y = (t - l) / 2
            const m = (e - h) / 2
            let b = (y * y) / (r * r) + (m * m) / (i * i)
            b > 1 && ((b = Y.sqrt(b)), (r = b * r), (i = b * i))
            const _ = r * r
            const w = i * i
            const k =
                    (s == o ? -1 : 1) *
                    Y.sqrt(
                      H(
                        (_ * w - _ * m * m - w * y * y) /
                          (_ * m * m + w * y * y)
                      )
                    )
            var B = (k * r * m) / i + (t + l) / 2
            var C = (k * -i * y) / r + (e + h) / 2
            var S = Y.asin(((e - C) / i).toFixed(9))
            var A = Y.asin(((h - C) / i).toFixed(9));
            (S = t < B ? U - S : S),
            (A = l < B ? U - A : A),
            S < 0 && (S = 2 * U + S),
            A < 0 && (A = 2 * U + A),
            o && S > A && (S -= 2 * U),
            !o && A > S && (A -= 2 * U)
          }
          let T = A - S
          if (H(T) > c) {
            const E = A
            const M = l
            const N = h;
            (A = S + c * (o && A > S ? 1 : -1)),
            (l = B + r * Y.cos(A)),
            (h = C + i * Y.sin(A)),
            (p = Ut(l, h, r, i, a, 0, o, M, N, [A, E, B, C]))
          }
          T = A - S
          const L = Y.cos(S)
          const z = Y.sin(S)
          const F = Y.cos(A)
          const R = Y.sin(A)
          const j = Y.tan(T / 4)
          const I = (4 / 3) * r * j
          const D = (4 / 3) * i * j
          const V = [t, e]
          const O = [t + I * z, e - D * L]
          const W = [l + I * R, h - D * F]
          const G = [l, h]
          if (((O[0] = 2 * V[0] - O[0]), (O[1] = 2 * V[1] - O[1]), u)) { return [O, W, G][P](p) }
          p = [O, W, G][P](p).join()[q](',')
          for (var X = [], $ = 0, Z = p.length; $ < Z; $++) { X[$] = $ % 2 ? g(p[$ - 1], p[$], f).y : g(p[$], p[$ + 1], f).x }
          return X
        }
        const $t = function (t, e, r, i, n, a, s, o, l) {
          const h = 1 - l
          return {
            x:
                  X(h, 3) * t +
                  3 * X(h, 2) * l * r +
                  3 * h * l * l * n +
                  X(l, 3) * s,
            y:
                  X(h, 3) * e +
                  3 * X(h, 2) * l * i +
                  3 * h * l * l * a +
                  X(l, 3) * o
          }
        }
        var Zt = n(function (t, e, r, i, n, a, s, o) {
          let l = n - 2 * r + t - (s - 2 * n + r)
          let h = 2 * (r - t) - 2 * (n - r)
          let u = t - r
          let c = (-h + Y.sqrt(h * h - 4 * l * u)) / 2 / l
          let f = (-h - Y.sqrt(h * h - 4 * l * u)) / 2 / l
          const p = [e, o]
          const d = [t, s]
          let g
          return (
            H(c) > '1e12' && (c = 0.5),
            H(f) > '1e12' && (f = 0.5),
            c > 0 &&
                  c < 1 &&
                  ((g = $t(t, e, r, i, n, a, s, o, c)),
                  d.push(g.x),
                  p.push(g.y)),
            f > 0 &&
                  f < 1 &&
                  ((g = $t(t, e, r, i, n, a, s, o, f)),
                  d.push(g.x),
                  p.push(g.y)),
            (l = a - 2 * i + e - (o - 2 * a + i)),
            (h = 2 * (i - e) - 2 * (a - i)),
            (u = e - i),
            (c = (-h + Y.sqrt(h * h - 4 * l * u)) / 2 / l),
            (f = (-h - Y.sqrt(h * h - 4 * l * u)) / 2 / l),
            H(c) > '1e12' && (c = 0.5),
            H(f) > '1e12' && (f = 0.5),
            c > 0 &&
                  c < 1 &&
                  ((g = $t(t, e, r, i, n, a, s, o, c)),
                  d.push(g.x),
                  p.push(g.y)),
            f > 0 &&
                  f < 1 &&
                  ((g = $t(t, e, r, i, n, a, s, o, f)),
                  d.push(g.x),
                  p.push(g.y)),
            {
              min: { x: G[z](0, d), y: G[z](0, p) },
              max: { x: W[z](0, d), y: W[z](0, p) }
            }
          )
        })
        var Qt = (e._path2curve = n(
          function (t, e) {
            const r = !e && Vt(t)
            if (!e && r.curve) return Yt(r.curve)
            for (
              var i = Gt(t),
                n = e && Gt(e),
                a = {
                  x: 0,
                  y: 0,
                  bx: 0,
                  by: 0,
                  X: 0,
                  Y: 0,
                  qx: null,
                  qy: null
                },
                s = {
                  x: 0,
                  y: 0,
                  bx: 0,
                  by: 0,
                  X: 0,
                  Y: 0,
                  qx: null,
                  qy: null
                },
                o = function (t, e, r) {
                  let i
                  let n
                  const a = { T: 1, Q: 1 }
                  if (!t) return ['C', e.x, e.y, e.x, e.y, e.x, e.y]
                  switch ((!(t[0] in a) && (e.qx = e.qy = null), t[0])) {
                    case 'M':
                      (e.X = t[1]), (e.Y = t[2])
                      break
                    case 'A':
                      t = ['C'][P](Ut[z](0, [e.x, e.y][P](t.slice(1))))
                      break
                    case 'S':
                      r == 'C' || r == 'S'
                        ? ((i = 2 * e.x - e.bx), (n = 2 * e.y - e.by))
                        : ((i = e.x), (n = e.y)),
                      (t = ['C', i, n][P](t.slice(1)))
                      break
                    case 'T':
                      r == 'Q' || r == 'T'
                        ? ((e.qx = 2 * e.x - e.qx), (e.qy = 2 * e.y - e.qy))
                        : ((e.qx = e.x), (e.qy = e.y)),
                      (t = ['C'][P](
                        Xt(e.x, e.y, e.qx, e.qy, t[1], t[2])
                      ))
                      break
                    case 'Q':
                      (e.qx = t[1]),
                      (e.qy = t[2]),
                      (t = ['C'][P](
                        Xt(e.x, e.y, t[1], t[2], t[3], t[4])
                      ))
                      break
                    case 'L':
                      t = ['C'][P](Ht(e.x, e.y, t[1], t[2]))
                      break
                    case 'H':
                      t = ['C'][P](Ht(e.x, e.y, t[1], e.y))
                      break
                    case 'V':
                      t = ['C'][P](Ht(e.x, e.y, e.x, t[1]))
                      break
                    case 'Z':
                      t = ['C'][P](Ht(e.x, e.y, e.X, e.Y))
                  }
                  return t
                },
                l = function (t, e) {
                  if (t[e].length > 7) {
                    t[e].shift()
                    for (let r = t[e]; r.length;) {
                      (u[e] = 'A'),
                      n && (c[e] = 'A'),
                      t.splice(e++, 0, ['C'][P](r.splice(0, 6)))
                    }
                    t.splice(e, 1), (g = W(i.length, (n && n.length) || 0))
                  }
                },
                h = function (t, e, r, a, s) {
                  t &&
                        e &&
                        t[s][0] == 'M' &&
                        e[s][0] != 'M' &&
                        (e.splice(s, 0, ['M', a.x, a.y]),
                        (r.bx = 0),
                        (r.by = 0),
                        (r.x = t[s][1]),
                        (r.y = t[s][2]),
                        (g = W(i.length, (n && n.length) || 0)))
                },
                u = [],
                c = [],
                f = '',
                p = '',
                d = 0,
                g = W(i.length, (n && n.length) || 0);
              d < g;
              d++
            ) {
              i[d] && (f = i[d][0]),
              f != 'C' && ((u[d] = f), d && (p = u[d - 1])),
              (i[d] = o(i[d], a, p)),
              u[d] != 'A' && f == 'C' && (u[d] = 'C'),
              l(i, d),
              n &&
                      (n[d] && (f = n[d][0]),
                      f != 'C' && ((c[d] = f), d && (p = c[d - 1])),
                      (n[d] = o(n[d], s, p)),
                      c[d] != 'A' && f == 'C' && (c[d] = 'C'),
                      l(n, d)),
              h(i, n, a, s, d),
              h(n, i, s, a, d)
              const v = i[d]
              const x = n && n[d]
              const y = v.length
              const m = n && x.length;
              (a.x = v[y - 2]),
              (a.y = v[y - 1]),
              (a.bx = ht(v[y - 4]) || a.x),
              (a.by = ht(v[y - 3]) || a.y),
              (s.bx = n && (ht(x[m - 4]) || s.x)),
              (s.by = n && (ht(x[m - 3]) || s.y)),
              (s.x = n && x[m - 2]),
              (s.y = n && x[m - 1])
            }
            return n || (r.curve = Yt(i)), n ? [i, n] : i
          },
          null,
          Yt
        ))
        const Jt = (e._parseDots = n(function (t) {
          for (var r = [], i = 0, n = t.length; i < n; i++) {
            const a = {}
            const s = t[i].match(/^([^:]*):?([\d\.]*)/)
            if (((a.color = e.getRGB(s[1])), a.color.error)) return null;
            (a.opacity = a.color.opacity),
            (a.color = a.color.hex),
            s[2] && (a.offset = s[2] + '%'),
            r.push(a)
          }
          for (i = 1, n = r.length - 1; i < n; i++) {
            if (!r[i].offset) {
              for (
                var o = ht(r[i - 1].offset || 0), l = 0, h = i + 1;
                h < n;
                h++
              ) {
                if (r[h].offset) {
                  l = r[h].offset
                  break
                }
              }
              l || ((l = 100), (h = n)), (l = ht(l))
              for (let u = (l - o) / (h - i + 1); i < h; i++) { (o += u), (r[i].offset = o + '%') }
            }
          }
          return r
        }))
        const Kt = (e._tear = function (t, e) {
          t == e.top && (e.top = t.prev),
          t == e.bottom && (e.bottom = t.next),
          t.next && (t.next.prev = t.prev),
          t.prev && (t.prev.next = t.next)
        })
        const te = (e._tofront = function (t, e) {
          e.top !== t &&
                (Kt(t, e),
                (t.next = null),
                (t.prev = e.top),
                (e.top.next = t),
                (e.top = t))
        })
        const ee = (e._toback = function (t, e) {
          e.bottom !== t &&
                (Kt(t, e),
                (t.next = e.bottom),
                (t.prev = null),
                (e.bottom.prev = t),
                (e.bottom = t))
        })
        const re = (e._insertafter = function (t, e, r) {
          Kt(t, r),
          e == r.top && (r.top = t),
          e.next && (e.next.prev = t),
          (t.next = e.next),
          (t.prev = e),
          (e.next = t)
        })
        const ie = (e._insertbefore = function (t, e, r) {
          Kt(t, r),
          e == r.bottom && (r.bottom = t),
          e.prev && (e.prev.next = t),
          (t.prev = e.prev),
          (e.prev = t),
          (t.next = e)
        })
        const ne = (e.toMatrix = function (t, e) {
          const r = Ot(t)
          const i = {
            _: { transform: R },
            getBBox: function () {
              return r
            }
          }
          return se(i, e), i.matrix
        })
        const ae = (e.transformPath = function (t, e) {
          return Mt(t, ne(t, e))
        })
        var se = (e._extractTransform = function (t, r) {
          if (r == null) return t._.transform
          r = I(r).replace(/\.{3}|\u2026/g, t._.transform || R)
          const i = e.parseTransformString(r)
          let n = 0
          let a = 0
          let s = 0
          let o = 1
          let l = 1
          const h = t._
          const u = new g()
          if (((h.transform = i || []), i)) {
            for (let c = 0, f = i.length; c < f; c++) {
              const p = i[c]
              const d = p.length
              const v = I(p[0]).toLowerCase()
              const x = p[0] != v
              const y = x ? u.invert() : 0
              var m
              var b
              var _
              var w
              var k
              v == 't' && d == 3
                ? x
                  ? ((m = y.x(0, 0)),
                    (b = y.y(0, 0)),
                    (_ = y.x(p[1], p[2])),
                    (w = y.y(p[1], p[2])),
                    u.translate(_ - m, w - b))
                  : u.translate(p[1], p[2])
                : v == 'r'
                  ? d == 2
                    ? ((k = k || t.getBBox(1)),
                      u.rotate(p[1], k.x + k.width / 2, k.y + k.height / 2),
                      (n += p[1]))
                    : d == 4 &&
                        (x
                          ? ((_ = y.x(p[2], p[3])),
                            (w = y.y(p[2], p[3])),
                            u.rotate(p[1], _, w))
                          : u.rotate(p[1], p[2], p[3]),
                        (n += p[1]))
                  : v == 's'
                    ? d == 2 || d == 3
                      ? ((k = k || t.getBBox(1)),
                        u.scale(
                          p[1],
                          p[d - 1],
                          k.x + k.width / 2,
                          k.y + k.height / 2
                        ),
                        (o *= p[1]),
                        (l *= p[d - 1]))
                      : d == 5 &&
                        (x
                          ? ((_ = y.x(p[3], p[4])),
                            (w = y.y(p[3], p[4])),
                            u.scale(p[1], p[2], _, w))
                          : u.scale(p[1], p[2], p[3], p[4]),
                        (o *= p[1]),
                        (l *= p[2]))
                    : v == 'm' &&
                      d == 7 &&
                      u.add(p[1], p[2], p[3], p[4], p[5], p[6]),
              (h.dirtyT = 1),
              (t.matrix = u)
            }
          }
          (t.matrix = u),
          (h.sx = o),
          (h.sy = l),
          (h.deg = n),
          (h.dx = a = u.e),
          (h.dy = s = u.f),
          o == 1 && l == 1 && !n && h.bbox
            ? ((h.bbox.x += +a), (h.bbox.y += +s))
            : (h.dirtyT = 1)
        })
        const oe = function (t) {
          const e = t[0]
          switch (e.toLowerCase()) {
            case 't':
              return [e, 0, 0]
            case 'm':
              return [e, 1, 0, 0, 1, 0, 0]
            case 'r':
              return t.length == 4 ? [e, 0, t[2], t[3]] : [e, 0]
            case 's':
              return t.length == 5
                ? [e, 1, 1, t[3], t[4]]
                : t.length == 3
                  ? [e, 1, 1]
                  : [e, 1]
          }
        }
        var le = (e._equaliseTransform = function (t, r) {
          (r = I(r).replace(/\.{3}|\u2026/g, t)),
          (t = e.parseTransformString(t) || []),
          (r = e.parseTransformString(r) || [])
          for (
            var i = W(t.length, r.length),
              n = [],
              a = [],
              s = 0,
              o,
              l,
              h,
              u;
            s < i;
            s++
          ) {
            if (
              ((h = t[s] || oe(r[s])),
              (u = r[s] || oe(h)),
              h[0] != u[0] ||
                    (h[0].toLowerCase() == 'r' &&
                      (h[2] != u[2] || h[3] != u[3])) ||
                    (h[0].toLowerCase() == 's' &&
                      (h[3] != u[3] || h[4] != u[4])))
            ) { return }
            for (
              n[s] = [], a[s] = [], o = 0, l = W(h.length, u.length);
              o < l;
              o++
            ) { o in h && (n[s][o] = h[o]), o in u && (a[s][o] = u[o]) }
          }
          return { from: n, to: a }
        });
        (e._getContainer = function (t, r, i, n) {
          let a
          if (
            ((a =
                n != null || e.is(t, 'object') ? t : T.doc.getElementById(t)),
            a != null)
          ) {
            return a.tagName
              ? r == null
                ? {
                    container: a,
                    width: a.style.pixelWidth || a.offsetWidth,
                    height: a.style.pixelHeight || a.offsetHeight
                  }
                : { container: a, width: r, height: i }
              : { container: 1, x: t, y: r, width: i, height: n }
          }
        }),
        (e.pathToRelative = Wt),
        (e._engine = {}),
        (e.path2curve = Qt),
        (e.matrix = function (t, e, r, i, n, a) {
          return new g(t, e, r, i, n, a)
        }),
        (function (t) {
          function r (t) {
            return t[0] * t[0] + t[1] * t[1]
          }
          function i (t) {
            const e = Y.sqrt(r(t))
            t[0] && (t[0] /= e), t[1] && (t[1] /= e)
          }
          (t.add = function (t, e, r, i, n, a) {
            const s = [[], [], []]
            const o = [
              [this.a, this.c, this.e],
              [this.b, this.d, this.f],
              [0, 0, 1]
            ]
            let l = [
              [t, r, n],
              [e, i, a],
              [0, 0, 1]
            ]
            let h
            let u
            let c
            let f
            for (
              t &&
                    t instanceof g &&
                    (l = [
                      [t.a, t.c, t.e],
                      [t.b, t.d, t.f],
                      [0, 0, 1]
                    ]),
              h = 0;
              h < 3;
              h++
            ) {
              for (u = 0; u < 3; u++) {
                for (f = 0, c = 0; c < 3; c++) f += o[h][c] * l[c][u]
                s[h][u] = f
              }
            }
            (this.a = s[0][0]),
            (this.b = s[1][0]),
            (this.c = s[0][1]),
            (this.d = s[1][1]),
            (this.e = s[0][2]),
            (this.f = s[1][2])
          }),
          (t.invert = function () {
            const t = this
            const e = t.a * t.d - t.b * t.c
            return new g(
              t.d / e,
              -t.b / e,
              -t.c / e,
              t.a / e,
              (t.c * t.f - t.d * t.e) / e,
              (t.b * t.e - t.a * t.f) / e
            )
          }),
          (t.clone = function () {
            return new g(this.a, this.b, this.c, this.d, this.e, this.f)
          }),
          (t.translate = function (t, e) {
            this.add(1, 0, 0, 1, t, e)
          }),
          (t.scale = function (t, e, r, i) {
            e == null && (e = t),
            (r || i) && this.add(1, 0, 0, 1, r, i),
            this.add(t, 0, 0, e, 0, 0),
            (r || i) && this.add(1, 0, 0, 1, -r, -i)
          }),
          (t.rotate = function (t, r, i) {
            (t = e.rad(t)), (r = r || 0), (i = i || 0)
            const n = +Y.cos(t).toFixed(9)
            const a = +Y.sin(t).toFixed(9)
            this.add(n, a, -a, n, r, i), this.add(1, 0, 0, 1, -r, -i)
          }),
          (t.x = function (t, e) {
            return t * this.a + e * this.c + this.e
          }),
          (t.y = function (t, e) {
            return t * this.b + e * this.d + this.f
          }),
          (t.get = function (t) {
            return +this[I.fromCharCode(97 + t)].toFixed(4)
          }),
          (t.toString = function () {
            return e.svg
              ? 'matrix(' +
                        [
                          this.get(0),
                          this.get(1),
                          this.get(2),
                          this.get(3),
                          this.get(4),
                          this.get(5)
                        ].join() +
                        ')'
              : [
                  this.get(0),
                  this.get(2),
                  this.get(1),
                  this.get(3),
                  0,
                  0
                ].join()
          }),
          (t.toFilter = function () {
            return (
              'progid:DXImageTransform.Microsoft.Matrix(M11=' +
                    this.get(0) +
                    ', M12=' +
                    this.get(2) +
                    ', M21=' +
                    this.get(1) +
                    ', M22=' +
                    this.get(3) +
                    ', Dx=' +
                    this.get(4) +
                    ', Dy=' +
                    this.get(5) +
                    ", sizingmethod='auto expand')"
            )
          }),
          (t.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)]
          }),
          (t.split = function () {
            const t = {};
            (t.dx = this.e), (t.dy = this.f)
            const n = [
              [this.a, this.c],
              [this.b, this.d]
            ];
            (t.scalex = Y.sqrt(r(n[0]))),
            i(n[0]),
            (t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1]),
            (n[1] = [
              n[1][0] - n[0][0] * t.shear,
              n[1][1] - n[0][1] * t.shear
            ]),
            (t.scaley = Y.sqrt(r(n[1]))),
            i(n[1]),
            (t.shear /= t.scaley)
            const a = -n[0][1]
            const s = n[1][1]
            return (
              s < 0
                ? ((t.rotate = e.deg(Y.acos(s))),
                  a < 0 && (t.rotate = 360 - t.rotate))
                : (t.rotate = e.deg(Y.asin(a))),
              (t.isSimple = !(
                +t.shear.toFixed(9) ||
                      (t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate)
              )),
              (t.isSuperSimple =
                      !+t.shear.toFixed(9) &&
                      t.scalex.toFixed(9) == t.scaley.toFixed(9) &&
                      !t.rotate),
              (t.noRotation = !+t.shear.toFixed(9) && !t.rotate),
              t
            )
          }),
          (t.toTransformString = function (t) {
            const e = t || this[q]()
            return e.isSimple
              ? ((e.scalex = +e.scalex.toFixed(4)),
                (e.scaley = +e.scaley.toFixed(4)),
                (e.rotate = +e.rotate.toFixed(4)),
                (e.dx || e.dy ? 't' + [e.dx, e.dy] : R) +
                        (e.scalex != 1 || e.scaley != 1
                          ? 's' + [e.scalex, e.scaley, 0, 0]
                          : R) +
                        (e.rotate ? 'r' + [e.rotate, 0, 0] : R))
              : 'm' +
                        [
                          this.get(0),
                          this.get(1),
                          this.get(2),
                          this.get(3),
                          this.get(4),
                          this.get(5)
                        ]
          })
        })(g.prototype)
        for (
          var he = function () {
              this.returnValue = !1
            },
            ue = function () {
              return this.originalEvent.preventDefault()
            },
            ce = function () {
              this.cancelBubble = !0
            },
            fe = function () {
              return this.originalEvent.stopPropagation()
            },
            pe = function (t) {
              const e = T.doc.documentElement.scrollTop || T.doc.body.scrollTop
              const r = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft
              return { x: t.clientX + r, y: t.clientY + e }
            },
            de = (function () {
              return T.doc.addEventListener
                ? function (t, e, r, i) {
                  const n = function (t) {
                    const e = pe(t)
                    return r.call(i, t, e.x, e.y)
                  }
                  if ((t.addEventListener(e, n, !1), F && V[e])) {
                    var a = function (e) {
                      for (
                        var n = pe(e),
                          a = e,
                          s = 0,
                          o = e.targetTouches && e.targetTouches.length;
                        s < o;
                        s++
                      ) {
                        if (e.targetTouches[s].target == t) {
                          (e = e.targetTouches[s]),
                          (e.originalEvent = a),
                          (e.preventDefault = ue),
                          (e.stopPropagation = fe)
                          break
                        }
                      }
                      return r.call(i, e, n.x, n.y)
                    }
                    t.addEventListener(V[e], a, !1)
                  }
                  return function () {
                    return (
                      t.removeEventListener(e, n, !1),
                      F && V[e] && t.removeEventListener(V[e], a, !1),
                      !0
                    )
                  }
                }
                : T.doc.attachEvent
                  ? function (t, e, r, i) {
                    const n = function (t) {
                      t = t || T.win.event
                      const e =
                            T.doc.documentElement.scrollTop ||
                            T.doc.body.scrollTop
                      const n =
                            T.doc.documentElement.scrollLeft ||
                            T.doc.body.scrollLeft
                      const a = t.clientX + n
                      const s = t.clientY + e
                      return (
                        (t.preventDefault = t.preventDefault || he),
                        (t.stopPropagation = t.stopPropagation || ce),
                        r.call(i, t, a, s)
                      )
                    }
                    t.attachEvent('on' + e, n)
                    const a = function () {
                      return t.detachEvent('on' + e, n), !0
                    }
                    return a
                  }
                  : void 0
            })(),
            ge = [],
            ve = function (e) {
              for (
                var r = e.clientX,
                  i = e.clientY,
                  n = T.doc.documentElement.scrollTop || T.doc.body.scrollTop,
                  a =
                      T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft,
                  s,
                  o = ge.length;
                o--;

              ) {
                if (((s = ge[o]), F && e.touches)) {
                  for (var l = e.touches.length, h; l--;) {
                    if (((h = e.touches[l]), h.identifier == s.el._drag.id)) {
                      (r = h.clientX),
                      (i = h.clientY),
                      (e.originalEvent
                        ? e.originalEvent
                        : e
                      ).preventDefault()
                      break
                    }
                  }
                } else e.preventDefault()
                const u = s.el.node
                var c
                const f = u.nextSibling
                const p = u.parentNode
                const d = u.style.display
                T.win.opera && p.removeChild(u),
                (u.style.display = 'none'),
                (c = s.el.paper.getElementByPoint(r, i)),
                (u.style.display = d),
                T.win.opera &&
                      (f ? p.insertBefore(u, f) : p.appendChild(u)),
                c && t('raphael.drag.over.' + s.el.id, s.el, c),
                (r += a),
                (i += n),
                t(
                  'raphael.drag.move.' + s.el.id,
                  s.move_scope || s.el,
                  r - s.el._drag.x,
                  i - s.el._drag.y,
                  r,
                  i,
                  e
                )
              }
            },
            xe = function (r) {
              e.unmousemove(ve).unmouseup(xe)
              for (var i = ge.length, n; i--;) {
                (n = ge[i]),
                (n.el._drag = {}),
                t(
                  'raphael.drag.end.' + n.el.id,
                  n.end_scope || n.start_scope || n.move_scope || n.el,
                  r
                )
              }
              ge = []
            },
            ye = (e.el = {}),
            me = D.length;
          me--;

        ) {
          !(function (t) {
            (e[t] = ye[t] =
                function (r, i) {
                  return (
                    e.is(r, 'function') &&
                      ((this.events = this.events || []),
                      this.events.push({
                        name: t,
                        f: r,
                        unbind: de(
                          this.shape || this.node || T.doc,
                          t,
                          r,
                          i || this
                        )
                      })),
                    this
                  )
                }),
            (e['un' + t] = ye['un' + t] =
                  function (r) {
                    for (let i = this.events || [], n = i.length; n--;) {
                      i[n].name != t ||
                        (!e.is(r, 'undefined') && i[n].f != r) ||
                        (i[n].unbind(),
                        i.splice(n, 1),
                        !i.length && delete this.events)
                    }
                    return this
                  })
          })(D[me])
        }
        (ye.data = function (r, i) {
          const n = (wt[this.id] = wt[this.id] || {})
          if (arguments.length == 0) return n
          if (arguments.length == 1) {
            if (e.is(r, 'object')) {
              for (const a in r) r[A](a) && this.data(a, r[a])
              return this
            }
            return t('raphael.data.get.' + this.id, this, n[r], r), n[r]
          }
          return (
            (n[r] = i), t('raphael.data.set.' + this.id, this, i, r), this
          )
        }),
        (ye.removeData = function (t) {
          return (
            t == null
              ? (wt[this.id] = {})
              : wt[this.id] && delete wt[this.id][t],
            this
          )
        }),
        (ye.getData = function () {
          return r(wt[this.id] || {})
        }),
        (ye.hover = function (t, e, r, i) {
          return this.mouseover(t, r).mouseout(e, i || r)
        }),
        (ye.unhover = function (t, e) {
          return this.unmouseover(t).unmouseout(e)
        })
        const be = [];
        (ye.drag = function (r, i, n, a, s, o) {
          function l (l) {
            (l.originalEvent || l).preventDefault()
            let h = l.clientX
            let u = l.clientY
            const c = T.doc.documentElement.scrollTop || T.doc.body.scrollTop
            const f = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft
            if (((this._drag.id = l.identifier), F && l.touches)) {
              for (var p = l.touches.length, d; p--;) {
                if (
                  ((d = l.touches[p]),
                  (this._drag.id = d.identifier),
                  d.identifier == this._drag.id)
                ) {
                  (h = d.clientX), (u = d.clientY)
                  break
                }
              }
            }
            (this._drag.x = h + f),
            (this._drag.y = u + c),
            !ge.length && e.mousemove(ve).mouseup(xe),
            ge.push({
              el: this,
              move_scope: a,
              start_scope: s,
              end_scope: o
            }),
            i && t.on('raphael.drag.start.' + this.id, i),
            r && t.on('raphael.drag.move.' + this.id, r),
            n && t.on('raphael.drag.end.' + this.id, n),
            t(
              'raphael.drag.start.' + this.id,
              s || a || this,
              l.clientX + f,
              l.clientY + c,
              l
            )
          }
          return (
            (this._drag = {}),
            be.push({ el: this, start: l }),
            this.mousedown(l),
            this
          )
        }),
        (ye.onDragOver = function (e) {
          e
            ? t.on('raphael.drag.over.' + this.id, e)
            : t.unbind('raphael.drag.over.' + this.id)
        }),
        (ye.undrag = function () {
          for (let r = be.length; r--;) {
            be[r].el == this &&
                  (this.unmousedown(be[r].start),
                  be.splice(r, 1),
                  t.unbind('raphael.drag.*.' + this.id))
          }
          !be.length && e.unmousemove(ve).unmouseup(xe), (ge = [])
        }),
        (N.circle = function (t, r, i) {
          const n = e._engine.circle(this, t || 0, r || 0, i || 0)
          return this.__set__ && this.__set__.push(n), n
        }),
        (N.rect = function (t, r, i, n, a) {
          const s = e._engine.rect(
            this,
            t || 0,
            r || 0,
            i || 0,
            n || 0,
            a || 0
          )
          return this.__set__ && this.__set__.push(s), s
        }),
        (N.ellipse = function (t, r, i, n) {
          const a = e._engine.ellipse(this, t || 0, r || 0, i || 0, n || 0)
          return this.__set__ && this.__set__.push(a), a
        }),
        (N.path = function (t) {
          t && !e.is(t, Z) && !e.is(t[0], Q) && (t += R)
          const r = e._engine.path(e.format[z](e, arguments), this)
          return this.__set__ && this.__set__.push(r), r
        }),
        (N.image = function (t, r, i, n, a) {
          const s = e._engine.image(
            this,
            t || 'about:blank',
            r || 0,
            i || 0,
            n || 0,
            a || 0
          )
          return this.__set__ && this.__set__.push(s), s
        }),
        (N.text = function (t, r, i) {
          const n = e._engine.text(this, t || 0, r || 0, I(i))
          return this.__set__ && this.__set__.push(n), n
        }),
        (N.set = function (t) {
          !e.is(t, 'array') &&
                (t = Array.prototype.splice.call(
                  arguments,
                  0,
                  arguments.length
                ))
          const r = new ze(t)
          return (
            this.__set__ && this.__set__.push(r),
            (r.paper = this),
            (r.type = 'set'),
            r
          )
        }),
        (N.setStart = function (t) {
          this.__set__ = t || this.set()
        }),
        (N.setFinish = function (t) {
          const e = this.__set__
          return delete this.__set__, e
        }),
        (N.getSize = function () {
          const t = this.canvas.parentNode
          return { width: t.offsetWidth, height: t.offsetHeight }
        }),
        (N.setSize = function (t, r) {
          return e._engine.setSize.call(this, t, r)
        }),
        (N.setViewBox = function (t, r, i, n, a) {
          return e._engine.setViewBox.call(this, t, r, i, n, a)
        }),
        (N.top = N.bottom = null),
        (N.raphael = e)
        const _e = function (t) {
          const e = t.getBoundingClientRect()
          const r = t.ownerDocument
          const i = r.body
          const n = r.documentElement
          const a = n.clientTop || i.clientTop || 0
          const s = n.clientLeft || i.clientLeft || 0
          const o = e.top + (T.win.pageYOffset || n.scrollTop || i.scrollTop) - a
          const l =
                e.left +
                (T.win.pageXOffset || n.scrollLeft || i.scrollLeft) -
                s
          return { y: o, x: l }
        };
        (N.getElementByPoint = function (t, e) {
          const r = this
          const i = r.canvas
          let n = T.doc.elementFromPoint(t, e)
          if (T.win.opera && n.tagName == 'svg') {
            const a = _e(i)
            const s = i.createSVGRect();
            (s.x = t - a.x), (s.y = e - a.y), (s.width = s.height = 1)
            const o = i.getIntersectionList(s, null)
            o.length && (n = o[o.length - 1])
          }
          if (!n) return null
          for (; n.parentNode && n != i.parentNode && !n.raphael;) { n = n.parentNode }
          return (
            n == r.canvas.parentNode && (n = i),
            (n = n && n.raphael ? r.getById(n.raphaelid) : null)
          )
        }),
        (N.getElementsByBBox = function (t) {
          const r = this.set()
          return (
            this.forEach(function (i) {
              e.isBBoxIntersect(i.getBBox(), t) && r.push(i)
            }),
            r
          )
        }),
        (N.getById = function (t) {
          for (let e = this.bottom; e;) {
            if (e.id == t) return e
            e = e.next
          }
          return null
        }),
        (N.forEach = function (t, e) {
          for (let r = this.bottom; r;) {
            if (t.call(e, r) === !1) return this
            r = r.next
          }
          return this
        }),
        (N.getElementsByPoint = function (t, e) {
          const r = this.set()
          return (
            this.forEach(function (i) {
              i.isPointInside(t, e) && r.push(i)
            }),
            r
          )
        }),
        (ye.isPointInside = function (t, r) {
          let i = (this.realPath = Et[this.type](this))
          return (
            this.attr('transform') &&
                  this.attr('transform').length &&
                  (i = e.transformPath(i, this.attr('transform'))),
            e.isPointInsidePath(i, t, r)
          )
        }),
        (ye.getBBox = function (t) {
          if (this.removed) return {}
          const e = this._
          return t
            ? ((!e.dirty && e.bboxwt) ||
                    ((this.realPath = Et[this.type](this)),
                    (e.bboxwt = Ot(this.realPath)),
                    (e.bboxwt.toString = x),
                    (e.dirty = 0)),
              e.bboxwt)
            : ((e.dirty || e.dirtyT || !e.bbox) &&
                    ((!e.dirty && this.realPath) ||
                      ((e.bboxwt = 0), (this.realPath = Et[this.type](this))),
                    (e.bbox = Ot(Mt(this.realPath, this.matrix))),
                    (e.bbox.toString = x),
                    (e.dirty = e.dirtyT = 0)),
              e.bbox)
        }),
        (ye.clone = function () {
          if (this.removed) return null
          const t = this.paper[this.type]().attr(this.attr())
          return this.__set__ && this.__set__.push(t), t
        }),
        (ye.glow = function (t) {
          if (this.type == 'text') return null
          t = t || {}
          const e = {
            width: (t.width || 10) + (+this.attr('stroke-width') || 1),
            fill: t.fill || !1,
            opacity: t.opacity == null ? 0.5 : t.opacity,
            offsetx: t.offsetx || 0,
            offsety: t.offsety || 0,
            color: t.color || '#000'
          }
          const r = e.width / 2
          const i = this.paper
          const n = i.set()
          let a = this.realPath || Et[this.type](this)
          a = this.matrix ? Mt(a, this.matrix) : a
          for (let s = 1; s < r + 1; s++) {
            n.push(
              i.path(a).attr({
                stroke: e.color,
                fill: e.fill ? e.color : 'none',
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round',
                'stroke-width': +((e.width / r) * s).toFixed(3),
                opacity: +(e.opacity / r).toFixed(3)
              })
            )
          }
          return n.insertBefore(this).translate(e.offsetx, e.offsety)
        })
        const we = {}
        const ke = function (t, r, i, n, a, s, o, u, c) {
          return c == null
            ? l(t, r, i, n, a, s, o, u)
            : e.findDotsAtSegment(
              t,
              r,
              i,
              n,
              a,
              s,
              o,
              u,
              h(t, r, i, n, a, s, o, u, c)
            )
        }
        const Be = function (t, r) {
          return function (i, n, a) {
            i = Qt(i)
            for (
              var s, o, l, h, u = '', c = {}, f, p = 0, d = 0, g = i.length;
              d < g;
              d++
            ) {
              if (((l = i[d]), l[0] == 'M')) (s = +l[1]), (o = +l[2])
              else {
                if (
                  ((h = ke(s, o, l[1], l[2], l[3], l[4], l[5], l[6])),
                  p + h > n)
                ) {
                  if (r && !c.start) {
                    if (
                      ((f = ke(
                        s,
                        o,
                        l[1],
                        l[2],
                        l[3],
                        l[4],
                        l[5],
                        l[6],
                        n - p
                      )),
                      (u += [
                        'C' + f.start.x,
                        f.start.y,
                        f.m.x,
                        f.m.y,
                        f.x,
                        f.y
                      ]),
                      a)
                    ) { return u }
                    (c.start = u),
                    (u = [
                      'M' + f.x,
                      f.y + 'C' + f.n.x,
                      f.n.y,
                      f.end.x,
                      f.end.y,
                      l[5],
                      l[6]
                    ].join()),
                    (p += h),
                    (s = +l[5]),
                    (o = +l[6])
                    continue
                  }
                  if (!t && !r) {
                    return (
                      (f = ke(
                        s,
                        o,
                        l[1],
                        l[2],
                        l[3],
                        l[4],
                        l[5],
                        l[6],
                        n - p
                      )),
                      { x: f.x, y: f.y, alpha: f.alpha }
                    )
                  }
                }
                (p += h), (s = +l[5]), (o = +l[6])
              }
              u += l.shift() + l
            }
            return (
              (c.end = u),
              (f = t
                ? p
                : r
                  ? c
                  : e.findDotsAtSegment(
                    s,
                    o,
                    l[0],
                    l[1],
                    l[2],
                    l[3],
                    l[4],
                    l[5],
                    1
                  )),
              f.alpha && (f = { x: f.x, y: f.y, alpha: f.alpha }),
              f
            )
          }
        }
        const Ce = Be(1)
        const Se = Be()
        const Ae = Be(0, 1);
        (e.getTotalLength = Ce),
        (e.getPointAtLength = Se),
        (e.getSubpath = function (t, e, r) {
          if (this.getTotalLength(t) - r < 1e-6) return Ae(t, e).end
          const i = Ae(t, r, 1)
          return e ? Ae(i, e).end : i
        }),
        (ye.getTotalLength = function () {
          const t = this.getPath()
          if (t) {
            return this.node.getTotalLength
              ? this.node.getTotalLength()
              : Ce(t)
          }
        }),
        (ye.getPointAtLength = function (t) {
          const e = this.getPath()
          if (e) return Se(e, t)
        }),
        (ye.getPath = function () {
          let t
          const r = e._getPath[this.type]
          if (this.type != 'text' && this.type != 'set') { return r && (t = r(this)), t }
        }),
        (ye.getSubpath = function (t, r) {
          const i = this.getPath()
          if (i) return e.getSubpath(i, t, r)
        })
        const Te = (e.easing_formulas = {
          linear: function (t) {
            return t
          },
          '<': function (t) {
            return X(t, 1.7)
          },
          '>': function (t) {
            return X(t, 0.48)
          },
          '<>': function (t) {
            const e = 0.48 - t / 1.04
            const r = Y.sqrt(0.1734 + e * e)
            const i = r - e
            const n = X(H(i), 1 / 3) * (i < 0 ? -1 : 1)
            const a = -r - e
            const s = X(H(a), 1 / 3) * (a < 0 ? -1 : 1)
            const o = n + s + 0.5
            return 3 * (1 - o) * o * o + o * o * o
          },
          backIn: function (t) {
            const e = 1.70158
            return t * t * ((e + 1) * t - e)
          },
          backOut: function (t) {
            t -= 1
            const e = 1.70158
            return t * t * ((e + 1) * t + e) + 1
          },
          elastic: function (t) {
            return t == !!t
              ? t
              : X(2, -10 * t) * Y.sin(((t - 0.075) * (2 * U)) / 0.3) + 1
          },
          bounce: function (t) {
            const e = 7.5625
            const r = 2.75
            let i
            return (
              t < 1 / r
                ? (i = e * t * t)
                : t < 2 / r
                  ? ((t -= 1.5 / r), (i = e * t * t + 0.75))
                  : t < 2.5 / r
                    ? ((t -= 2.25 / r), (i = e * t * t + 0.9375))
                    : ((t -= 2.625 / r), (i = e * t * t + 0.984375)),
              i
            )
          }
        });
        (Te.easeIn = Te['ease-in'] = Te['<']),
        (Te.easeOut = Te['ease-out'] = Te['>']),
        (Te.easeInOut = Te['ease-in-out'] = Te['<>']),
        (Te['back-in'] = Te.backIn),
        (Te['back-out'] = Te.backOut)
        var Ee = []
        var Me =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function (t) {
                setTimeout(t, 16)
              }
        var Ne = function () {
          for (let r = +new Date(), i = 0; i < Ee.length; i++) {
            const n = Ee[i]
            if (!n.el.removed && !n.paused) {
              let a = r - n.start
              var s = n.ms
              const o = n.easing
              var l = n.from
              var h = n.diff
              const u = n.to
              const c = n.t
              const f = n.el
              const p = {}
              var d
              const g = {}
              var v
              if (
                (n.initstatus
                  ? ((a =
                          ((n.initstatus * n.anim.top - n.prev) /
                            (n.percent - n.prev)) *
                          s),
                    (n.status = n.initstatus),
                    delete n.initstatus,
                    n.stop && Ee.splice(i--, 1))
                  : (n.status =
                          (n.prev + (n.percent - n.prev) * (a / s)) /
                          n.anim.top),
                !(a < 0))
              ) {
                if (a < s) {
                  var x = o(a / s)
                  for (var y in l) {
                    if (l[A](y)) {
                      switch (pt[y]) {
                        case $:
                          d = +l[y] + x * s * h[y]
                          break
                        case 'colour':
                          d =
                                'rgb(' +
                                [
                                  Le(ot(l[y].r + x * s * h[y].r)),
                                  Le(ot(l[y].g + x * s * h[y].g)),
                                  Le(ot(l[y].b + x * s * h[y].b))
                                ].join(',') +
                                ')'
                          break
                        case 'path':
                          d = []
                          for (var m = 0, _ = l[y].length; m < _; m++) {
                            d[m] = [l[y][m][0]]
                            for (var w = 1, k = l[y][m].length; w < k; w++) { d[m][w] = +l[y][m][w] + x * s * h[y][m][w] }
                            d[m] = d[m].join(j)
                          }
                          d = d.join(j)
                          break
                        case 'transform':
                          if (h[y].real) {
                            for (d = [], m = 0, _ = l[y].length; m < _; m++) {
                              for (
                                d[m] = [l[y][m][0]],
                                w = 1,
                                k = l[y][m].length;
                                w < k;
                                w++
                              ) { d[m][w] = l[y][m][w] + x * s * h[y][m][w] }
                            }
                          } else {
                            const B = function (t) {
                              return +l[y][t] + x * s * h[y][t]
                            }
                            d = [['m', B(0), B(1), B(2), B(3), B(4), B(5)]]
                          }
                          break
                        case 'csv':
                          if (y == 'clip-rect') {
                            for (d = [], m = 4; m--;) { d[m] = +l[y][m] + x * s * h[y][m] }
                          }
                          break
                        default:
                          var C = [][P](l[y])
                          for (
                            d = [], m = f.paper.customAttributes[y].length;
                            m--;

                          ) { d[m] = +C[m] + x * s * h[y][m] }
                      }
                      p[y] = d
                    }
                  }
                  f.attr(p),
                  (function (e, r, i) {
                    setTimeout(function () {
                      t('raphael.anim.frame.' + e, r, i)
                    })
                  })(f.id, f, n.anim)
                } else {
                  if (
                    ((function (r, i, n) {
                      setTimeout(function () {
                        t('raphael.anim.frame.' + i.id, i, n),
                        t('raphael.anim.finish.' + i.id, i, n),
                        e.is(r, 'function') && r.call(i)
                      })
                    })(n.callback, f, n.anim),
                    f.attr(u),
                    Ee.splice(i--, 1),
                    n.repeat > 1 && !n.next)
                  ) {
                    for (v in u) u[A](v) && (g[v] = n.totalOrigin[v])
                    n.el.attr(g),
                    b(
                      n.anim,
                      n.el,
                      n.anim.percents[0],
                      null,
                      n.totalOrigin,
                      n.repeat - 1
                    )
                  }
                  n.next &&
                        !n.stop &&
                        b(n.anim, n.el, n.next, null, n.totalOrigin, n.repeat)
                }
              }
            }
          }
          Ee.length && Me(Ne)
        }
        var Le = function (t) {
          return t > 255 ? 255 : t < 0 ? 0 : t
        };
        (ye.animateWith = function (t, r, i, n, a, s) {
          const o = this
          if (o.removed) return s && s.call(o), o
          const l = i instanceof m ? i : e.animation(i, n, a, s)
          let h
          let u
          b(l, o, l.percents[0], null, o.attr())
          for (let c = 0, f = Ee.length; c < f; c++) {
            if (Ee[c].anim == r && Ee[c].el == t) {
              Ee[f - 1].start = Ee[c].start
              break
            }
          }
          return o
        }),
        (ye.onAnimation = function (e) {
          return (
            e
              ? t.on('raphael.anim.frame.' + this.id, e)
              : t.unbind('raphael.anim.frame.' + this.id),
            this
          )
        }),
        (m.prototype.delay = function (t) {
          const e = new m(this.anim, this.ms)
          return (e.times = this.times), (e.del = +t || 0), e
        }),
        (m.prototype.repeat = function (t) {
          const e = new m(this.anim, this.ms)
          return (e.del = this.del), (e.times = Y.floor(W(t, 0)) || 1), e
        }),
        (e.animation = function (t, r, i, n) {
          if (t instanceof m) return t;
          (!e.is(i, 'function') && i) || ((n = n || i || null), (i = null)),
          (t = Object(t)),
          (r = +r || 0)
          const a = {}
          let s
          let o
          for (o in t) {
            t[A](o) &&
                  ht(o) != o &&
                  ht(o) + '%' != o &&
                  ((s = !0), (a[o] = t[o]))
          }
          if (s) {
            return (
              i && (a.easing = i),
              n && (a.callback = n),
              new m({ 100: a }, r)
            )
          }
          if (n) {
            let l = 0
            for (const h in t) {
              const u = ut(h)
              t[A](h) && u > l && (l = u)
            }
            (l += '%'), !t[l].callback && (t[l].callback = n)
          }
          return new m(t, r)
        }),
        (ye.animate = function (t, r, i, n) {
          const a = this
          if (a.removed) return n && n.call(a), a
          const s = t instanceof m ? t : e.animation(t, r, i, n)
          return b(s, a, s.percents[0], null, a.attr()), a
        }),
        (ye.setTime = function (t, e) {
          return t && e != null && this.status(t, G(e, t.ms) / t.ms), this
        }),
        (ye.status = function (t, e) {
          const r = []
          let i = 0
          let n
          let a
          if (e != null) return b(t, this, -1, G(e, 1)), this
          for (n = Ee.length; i < n; i++) {
            if (((a = Ee[i]), a.el.id == this.id && (!t || a.anim == t))) {
              if (t) return a.status
              r.push({ anim: a.anim, status: a.status })
            }
          }
          return t ? 0 : r
        }),
        (ye.pause = function (e) {
          for (let r = 0; r < Ee.length; r++) {
            Ee[r].el.id != this.id ||
                  (e && Ee[r].anim != e) ||
                  (t('raphael.anim.pause.' + this.id, this, Ee[r].anim) !==
                    !1 &&
                    (Ee[r].paused = !0))
          }
          return this
        }),
        (ye.resume = function (e) {
          for (let r = 0; r < Ee.length; r++) {
            if (Ee[r].el.id == this.id && (!e || Ee[r].anim == e)) {
              const i = Ee[r]
              t('raphael.anim.resume.' + this.id, this, i.anim) !== !1 &&
                    (delete i.paused, this.status(i.anim, i.status))
            }
          }
          return this
        }),
        (ye.stop = function (e) {
          for (let r = 0; r < Ee.length; r++) {
            Ee[r].el.id != this.id ||
                  (e && Ee[r].anim != e) ||
                  (t('raphael.anim.stop.' + this.id, this, Ee[r].anim) !== !1 &&
                    Ee.splice(r--, 1))
          }
          return this
        }),
        t.on('raphael.remove', _),
        t.on('raphael.clear', _),
        (ye.toString = function () {
          return 'Raphaël’s object'
        })
        var ze = function (t) {
          if (
            ((this.items = []), (this.length = 0), (this.type = 'set'), t)
          ) {
            for (let e = 0, r = t.length; e < r; e++) {
              !t[e] ||
                    (t[e].constructor != ye.constructor &&
                      t[e].constructor != ze) ||
                    ((this[this.items.length] = this.items[this.items.length] =
                      t[e]),
                    this.length++)
            }
          }
        }
        const Pe = ze.prototype;
        (Pe.push = function () {
          for (var t, e, r = 0, i = arguments.length; r < i; r++) {
            (t = arguments[r]),
            !t ||
                  (t.constructor != ye.constructor && t.constructor != ze) ||
                  ((e = this.items.length),
                  (this[e] = this.items[e] = t),
                  this.length++)
          }
          return this
        }),
        (Pe.pop = function () {
          return (
            this.length && delete this[this.length--], this.items.pop()
          )
        }),
        (Pe.forEach = function (t, e) {
          for (let r = 0, i = this.items.length; r < i; r++) { if (t.call(e, this.items[r], r) === !1) return this }
          return this
        })
        for (const Fe in ye) {
          ye[A](Fe) &&
              (Pe[Fe] = (function (t) {
                return function () {
                  const e = arguments
                  return this.forEach(function (r) {
                    r[t][z](r, e)
                  })
                }
              })(Fe))
        }
        return (
          (Pe.attr = function (t, r) {
            if (t && e.is(t, Q) && e.is(t[0], 'object')) {
              for (let i = 0, n = t.length; i < n; i++) { this.items[i].attr(t[i]) }
            } else {
              for (let a = 0, s = this.items.length; a < s; a++) { this.items[a].attr(t, r) }
            }
            return this
          }),
          (Pe.clear = function () {
            for (; this.length;) this.pop()
          }),
          (Pe.splice = function (t, e, r) {
            (t = t < 0 ? W(this.length + t, 0) : t),
            (e = W(0, G(this.length - t, e)))
            const i = []
            const n = []
            const a = []
            let s
            for (s = 2; s < arguments.length; s++) a.push(arguments[s])
            for (s = 0; s < e; s++) n.push(this[t + s])
            for (; s < this.length - t; s++) i.push(this[t + s])
            const o = a.length
            for (s = 0; s < o + i.length; s++) { this.items[t + s] = this[t + s] = s < o ? a[s] : i[s - o] }
            for (s = this.items.length = this.length -= e - o; this[s];) { delete this[s++] }
            return new ze(n)
          }),
          (Pe.exclude = function (t) {
            for (let e = 0, r = this.length; e < r; e++) { if (this[e] == t) return this.splice(e, 1), !0 }
          }),
          (Pe.animate = function (t, r, i, n) {
            (e.is(i, 'function') || !i) && (n = i || null)
            let a = this.items.length
            let s = a
            let o
            const l = this
            let h
            if (!a) return this
            n &&
                (h = function () {
                  !--a && n.call(l)
                }),
            (i = e.is(i, Z) ? i : h)
            const u = e.animation(t, r, i, h)
            for (o = this.items[--s].animate(u); s--;) {
              this.items[s] &&
                  !this.items[s].removed &&
                  this.items[s].animateWith(o, u, u),
              (this.items[s] && !this.items[s].removed) || a--
            }
            return this
          }),
          (Pe.insertAfter = function (t) {
            for (let e = this.items.length; e--;) { this.items[e].insertAfter(t) }
            return this
          }),
          (Pe.getBBox = function () {
            for (
              var t = [], e = [], r = [], i = [], n = this.items.length;
              n--;

            ) {
              if (!this.items[n].removed) {
                const a = this.items[n].getBBox()
                t.push(a.x),
                e.push(a.y),
                r.push(a.x + a.width),
                i.push(a.y + a.height)
              }
            }
            return (
              (t = G[z](0, t)),
              (e = G[z](0, e)),
              (r = W[z](0, r)),
              (i = W[z](0, i)),
              { x: t, y: e, x2: r, y2: i, width: r - t, height: i - e }
            )
          }),
          (Pe.clone = function (t) {
            t = this.paper.set()
            for (let e = 0, r = this.items.length; e < r; e++) { t.push(this.items[e].clone()) }
            return t
          }),
          (Pe.toString = function () {
            return 'Raphaël‘s set'
          }),
          (Pe.glow = function (t) {
            const e = this.paper.set()
            return (
              this.forEach(function (r, i) {
                const n = r.glow(t)
                n != null &&
                    n.forEach(function (t, r) {
                      e.push(t)
                    })
              }),
              e
            )
          }),
          (Pe.isPointInside = function (t, e) {
            let r = !1
            return (
              this.forEach(function (i) {
                if (i.isPointInside(t, e)) return (r = !0), !1
              }),
              r
            )
          }),
          (e.registerFont = function (t) {
            if (!t.face) return t
            this.fonts = this.fonts || {}
            const e = { w: t.w, face: {}, glyphs: {} }
            const r = t.face['font-family']
            for (const i in t.face) t.face[A](i) && (e.face[i] = t.face[i])
            if (
              (this.fonts[r] ? this.fonts[r].push(e) : (this.fonts[r] = [e]),
              !t.svg)
            ) {
              e.face['units-per-em'] = ut(t.face['units-per-em'], 10)
              for (const n in t.glyphs) {
                if (t.glyphs[A](n)) {
                  const a = t.glyphs[n]
                  if (
                    ((e.glyphs[n] = {
                      w: a.w,
                      k: {},
                      d:
                          a.d &&
                          'M' +
                            a.d.replace(/[mlcxtrv]/g, function (t) {
                              return (
                                {
                                  l: 'L',
                                  c: 'C',
                                  x: 'z',
                                  t: 'm',
                                  r: 'l',
                                  v: 'c'
                                }[t] || 'M'
                              )
                            }) +
                            'z'
                    }),
                    a.k)
                  ) { for (const s in a.k) a[A](s) && (e.glyphs[n].k[s] = a.k[s]) }
                }
              }
            }
            return t
          }),
          (N.getFont = function (t, r, i, n) {
            if (
              ((n = n || 'normal'),
              (i = i || 'normal'),
              (r =
                  +r ||
                  { normal: 400, bold: 700, lighter: 300, bolder: 800 }[r] ||
                  400),
              e.fonts)
            ) {
              let a = e.fonts[t]
              if (!a) {
                const s = new RegExp(
                  '(^|\\s)' + t.replace(/[^\w\d\s+!~.:_-]/g, R) + '(\\s|$)',
                  'i'
                )
                for (const o in e.fonts) {
                  if (e.fonts[A](o) && s.test(o)) {
                    a = e.fonts[o]
                    break
                  }
                }
              }
              let l
              if (a) {
                for (
                  let h = 0, u = a.length;
                  h < u &&
                    ((l = a[h]),
                    l.face['font-weight'] != r ||
                      (l.face['font-style'] != i && l.face['font-style']) ||
                      l.face['font-stretch'] != n);
                  h++
                );
              }
              return l
            }
          }),
          (N.print = function (t, r, i, n, a, s, o, l) {
            (s = s || 'middle'),
            (o = W(G(o || 0, 1), -1)),
            (l = W(G(l || 1, 3), 1))
            const h = I(i)[q](R)
            let u = 0
            let c = 0
            let f = R
            let p
            if ((e.is(n, 'string') && (n = this.getFont(n)), n)) {
              p = (a || 16) / n.face['units-per-em']
              for (
                let d = n.face.bbox[q](k),
                  g = +d[0],
                  v = d[3] - d[1],
                  x = 0,
                  y = +d[1] + (s == 'baseline' ? v + +n.face.descent : v / 2),
                  m = 0,
                  b = h.length;
                m < b;
                m++
              ) {
                if (h[m] == '\n') (u = 0), (w = 0), (c = 0), (x += v * l)
                else {
                  const _ = (c && n.glyphs[h[m - 1]]) || {}
                  var w = n.glyphs[h[m]];
                  (u += c
                    ? (_.w || n.w) + ((_.k && _.k[h[m]]) || 0) + n.w * o
                    : 0),
                  (c = 1)
                }
                w &&
                    w.d &&
                    (f += e.transformPath(w.d, [
                      't',
                      u * p,
                      x * p,
                      's',
                      p,
                      p,
                      g,
                      y,
                      't',
                      (t - g) / p,
                      (r - y) / p
                    ]))
              }
            }
            return this.path(f).attr({ fill: '#000', stroke: 'none' })
          }),
          (N.add = function (t) {
            if (e.is(t, 'array')) {
              for (var r = this.set(), i = 0, n = t.length, a; i < n; i++) {
                (a = t[i] || {}),
                B[A](a.type) && r.push(this[a.type]().attr(a))
              }
            }
            return r
          }),
          (e.format = function (t, r) {
            const i = e.is(r, Q) ? [0][P](r) : arguments
            return (
              t &&
                  e.is(t, Z) &&
                  i.length - 1 &&
                  (t = t.replace(C, function (t, e) {
                    return i[++e] == null ? R : i[e]
                  })),
              t || R
            )
          }),
          (e.fullfill = (function () {
            const t = /\{([^\}]+)\}/g
            const e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g
            const r = function (t, r, i) {
              let n = i
              return (
                r.replace(e, function (t, e, r, i, a) {
                  (e = e || i),
                  n &&
                          (e in n && (n = n[e]),
                          typeof n === 'function' && a && (n = n()))
                }),
                (n = (n == null || n == i ? t : n) + '')
              )
            }
            return function (e, i) {
              return String(e).replace(t, function (t, e) {
                return r(t, e, i)
              })
            }
          })()),
          (e.ninja = function () {
            if (E.was) T.win.Raphael = E.is
            else {
              window.Raphael = void 0
              try {
                delete window.Raphael
              } catch (t) {}
            }
            return e
          }),
          (e.st = Pe),
          t.on('raphael.DOMload', function () {
            w = !0
          }),
          (function (t, r, i) {
            function n () {
              /in/.test(t.readyState)
                ? setTimeout(n, 9)
                : e.eve('raphael.DOMload')
            }
            t.readyState == null &&
                t.addEventListener &&
                (t.addEventListener(
                  r,
                  (i = function () {
                    t.removeEventListener(r, i, !1),
                    (t.readyState = 'complete')
                  }),
                  !1
                ),
                (t.readyState = 'loading')),
            n()
          })(document, 'DOMContentLoaded'),
          e
        )
      }.apply(e, i))),
      !(void 0 !== n && (t.exports = n))
    },
    function (t, e, r) {
      let i, n
      !(function (r) {
        const a = '0.5.0'
        const s = 'hasOwnProperty'
        let o = /[\.\/]/
        const l = /\s*,\s*/
        const h = '*'
        const u = function () {}
        const c = function (t, e) {
          return t - e
        }
        let f
        let p
        let d = { n: {} }
        const g = function () {
          for (let t = 0, e = this.length; t < e; t++) { if (typeof this[t] !== 'undefined') return this[t] }
        }
        const v = function () {
          for (let t = this.length; --t;) { if (typeof this[t] !== 'undefined') return this[t] }
        }
        const x = Object.prototype.toString
        const y = String
        const m =
            Array.isArray ||
            function (t) {
              return t instanceof Array || x.call(t) == '[object Array]'
            };
        (eve = function (t, e) {
          const r = d
          const i = p
          const n = Array.prototype.slice.call(arguments, 2)
          const a = eve.listeners(t)
          let s = 0
          const o = !1
          let l
          const h = []
          const u = {}
          const x = []
          const y = f
          const m = [];
          (x.firstDefined = g), (x.lastDefined = v), (f = t), (p = 0)
          for (var b = 0, _ = a.length; b < _; b++) {
            'zIndex' in a[b] &&
              (h.push(a[b].zIndex), a[b].zIndex < 0 && (u[a[b].zIndex] = a[b]))
          }
          for (h.sort(c); h[s] < 0;) { if (((l = u[h[s++]]), x.push(l.apply(e, n)), p)) return (p = i), x }
          for (b = 0; b < _; b++) {
            if (((l = a[b]), 'zIndex' in l)) {
              if (l.zIndex == h[s]) {
                if ((x.push(l.apply(e, n)), p)) break
                do {
                  if ((s++, (l = u[h[s]]), l && x.push(l.apply(e, n)), p)) { break }
                }
                while (l)
              } else u[l.zIndex] = l
            } else if ((x.push(l.apply(e, n)), p)) break
          }
          return (p = i), (f = y), x
        }),
        (eve._events = d),
        (eve.listeners = function (t) {
          const e = m(t) ? t : t.split(o)
          let r = d
          let i
          let n
          let a
          let s
          let l
          let u
          let c
          let f
          let p = [r]
          let g = []
          for (s = 0, l = e.length; s < l; s++) {
            for (f = [], u = 0, c = p.length; u < c; u++) {
              for (r = p[u].n, n = [r[e[s]], r[h]], a = 2; a--;) { (i = n[a]), i && (f.push(i), (g = g.concat(i.f || []))) }
            }
            p = f
          }
          return g
        }),
        (eve.separator = function (t) {
          t
            ? ((t = y(t).replace(/(?=[\.\^\]\[\-])/g, '\\')),
              (t = '[' + t + ']'),
              (o = new RegExp(t)))
            : (o = /[\.\/]/)
        }),
        (eve.on = function (t, e) {
          if (typeof e !== 'function') return function () {}
          for (
            let r = m(t) ? (m(t[0]) ? t : [t]) : y(t).split(l),
              i = 0,
              n = r.length;
            i < n;
            i++
          ) {
            !(function (t) {
              for (
                var r = m(t) ? t : y(t).split(o),
                  i = d,
                  n,
                  a = 0,
                  s = r.length;
                a < s;
                a++
              ) {
                (i = i.n),
                (i =
                      (i.hasOwnProperty(r[a]) && i[r[a]]) ||
                      (i[r[a]] = { n: {} }))
              }
              for (i.f = i.f || [], a = 0, s = i.f.length; a < s; a++) {
                if (i.f[a] == e) {
                  n = !0
                  break
                }
              }
              !n && i.f.push(e)
            })(r[i])
          }
          return function (t) {
            +t == +t && (e.zIndex = +t)
          }
        }),
        (eve.f = function (t) {
          const e = [].slice.call(arguments, 1)
          return function () {
            eve.apply(
              null,
              [t, null].concat(e).concat([].slice.call(arguments, 0))
            )
          }
        }),
        (eve.stop = function () {
          p = 1
        }),
        (eve.nt = function (t) {
          const e = m(f) ? f.join('.') : f
          return t
            ? new RegExp('(?:\\.|\\/|^)' + t + '(?:\\.|\\/|$)').test(e)
            : e
        }),
        (eve.nts = function () {
          return m(f) ? f : f.split(o)
        }),
        (eve.off = eve.unbind =
            function (t, e) {
              if (!t) return void (eve._events = d = { n: {} })
              let r = m(t) ? (m(t[0]) ? t : [t]) : y(t).split(l)
              if (r.length > 1) { for (var i = 0, n = r.length; i < n; i++) eve.off(r[i], e) } else {
                r = m(t) ? t : y(t).split(o)
                let a
                let u
                let c
                var i
                var n
                let f
                let p
                const g = [d]
                for (i = 0, n = r.length; i < n; i++) {
                  for (f = 0; f < g.length; f += c.length - 2) {
                    if (((c = [f, 1]), (a = g[f].n), r[i] != h)) { a[r[i]] && c.push(a[r[i]]) } else for (u in a) a[s](u) && c.push(a[u])
                    g.splice.apply(g, c)
                  }
                }
                for (i = 0, n = g.length; i < n; i++) {
                  for (a = g[i]; a.n;) {
                    if (e) {
                      if (a.f) {
                        for (f = 0, p = a.f.length; f < p; f++) {
                          if (a.f[f] == e) {
                            a.f.splice(f, 1)
                            break
                          }
                        }
                        !a.f.length && delete a.f
                      }
                      for (u in a.n) {
                        if (a.n[s](u) && a.n[u].f) {
                          const v = a.n[u].f
                          for (f = 0, p = v.length; f < p; f++) {
                            if (v[f] == e) {
                              v.splice(f, 1)
                              break
                            }
                          }
                          !v.length && delete a.n[u].f
                        }
                      }
                    } else {
                      delete a.f
                      for (u in a.n) a.n[s](u) && a.n[u].f && delete a.n[u].f
                    }
                    a = a.n
                  }
                }
              }
            }),
        (eve.once = function (t, e) {
          const r = function () {
            return eve.off(t, r), e.apply(this, arguments)
          }
          return eve.on(t, r)
        }),
        (eve.version = a),
        (eve.toString = function () {
          return 'You are running Eve ' + a
        }),
        typeof t !== 'undefined' && t.exports
          ? (t.exports = eve)
          : ((i = []),
            (n = (function () {
              return eve
            }.apply(e, i))),
            !(void 0 !== n && (t.exports = n)))
      })(this)
    },
    function (t, e, r) {
      let i, n;
      (i = [r(1)]),
      (n = (function (t) {
        if (!t || t.svg) {
          const e = 'hasOwnProperty'
          const r = String
          const i = parseFloat
          const n = parseInt
          const a = Math
          const s = a.max
          const o = a.abs
          const l = a.pow
          const h = /[, ]+/
          const u = t.eve
          const c = ''
          const f = ' '
          const p = 'http://www.w3.org/1999/xlink'
          const d = {
            block: 'M5,0 0,2.5 5,5z',
            classic: 'M5,0 0,2.5 5,5 3.5,3 3.5,2z',
            diamond: 'M2.5,0 5,2.5 2.5,5 0,2.5z',
            open: 'M6,1 1,3.5 6,6',
            oval: 'M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z'
          }
          const g = {}
          t.toString = function () {
            return (
              'Your browser supports SVG.\nYou are running Raphaël ' +
                this.version
            )
          }
          const v = function (i, n) {
            if (n) {
              typeof i === 'string' && (i = v(i))
              for (const a in n) {
                n[e](a) &&
                      (a.substring(0, 6) == 'xlink:'
                        ? i.setAttributeNS(p, a.substring(6), r(n[a]))
                        : i.setAttribute(a, r(n[a])))
              }
            } else {
              (i = t._g.doc.createElementNS(
                'http://www.w3.org/2000/svg',
                i
              )),
              i.style &&
                      (i.style.webkitTapHighlightColor = 'rgba(0,0,0,0)')
            }
            return i
          }
          const x = function (e, n) {
            let h = 'linear'
            let u = e.id + n
            let f = 0.5
            let p = 0.5
            const d = e.node
            const g = e.paper
            const x = d.style
            let y = t._g.doc.getElementById(u)
            if (!y) {
              if (
                ((n = r(n).replace(t._radial_gradient, function (t, e, r) {
                  if (((h = 'radial'), e && r)) {
                    (f = i(e)), (p = i(r))
                    const n = 2 * (p > 0.5) - 1
                    l(f - 0.5, 2) + l(p - 0.5, 2) > 0.25 &&
                          (p = a.sqrt(0.25 - l(f - 0.5, 2)) * n + 0.5) &&
                          p != 0.5 &&
                          (p = p.toFixed(5) - 1e-5 * n)
                  }
                  return c
                })),
                (n = n.split(/\s*\-\s*/)),
                h == 'linear')
              ) {
                let b = n.shift()
                if (((b = -i(b)), isNaN(b))) return null
                var _ = [0, 0, a.cos(t.rad(b)), a.sin(t.rad(b))]
                const w = 1 / (s(o(_[2]), o(_[3])) || 1);
                (_[2] *= w),
                (_[3] *= w),
                _[2] < 0 && ((_[0] = -_[2]), (_[2] = 0)),
                _[3] < 0 && ((_[1] = -_[3]), (_[3] = 0))
              }
              const k = t._parseDots(n)
              if (!k) return null
              if (
                ((u = u.replace(/[\(\)\s,\xb0#]/g, '_')),
                e.gradient &&
                      u != e.gradient.id &&
                      (g.defs.removeChild(e.gradient), delete e.gradient),
                !e.gradient)
              ) {
                (y = v(h + 'Gradient', { id: u })),
                (e.gradient = y),
                v(
                  y,
                  h == 'radial'
                    ? { fx: f, fy: p }
                    : {
                        x1: _[0],
                        y1: _[1],
                        x2: _[2],
                        y2: _[3],
                        gradientTransform: e.matrix.invert()
                      }
                ),
                g.defs.appendChild(y)
                for (let B = 0, C = k.length; B < C; B++) {
                  y.appendChild(
                    v('stop', {
                      offset: k[B].offset ? k[B].offset : B ? '100%' : '0%',
                      'stop-color': k[B].color || '#fff',
                      'stop-opacity': isFinite(k[B].opacity)
                        ? k[B].opacity
                        : 1
                    })
                  )
                }
              }
            }
            return (
              v(d, { fill: m(u), opacity: 1, 'fill-opacity': 1 }),
              (x.fill = c),
              (x.opacity = 1),
              (x.fillOpacity = 1),
              1
            )
          }
          const y = function () {
            const t = document.documentMode
            return t && (t === 9 || t === 10)
          }
          var m = function (t) {
            if (y()) return "url('#" + t + "')"
            const e = document.location
            const r = e.protocol + '//' + e.host + e.pathname + e.search
            return "url('" + r + '#' + t + "')"
          }
          const b = function (t) {
            const e = t.getBBox(1)
            v(t.pattern, {
              patternTransform:
                    t.matrix.invert() + ' translate(' + e.x + ',' + e.y + ')'
            })
          }
          const _ = function (i, n, a) {
            if (i.type == 'path') {
              for (
                var s = r(n).toLowerCase().split('-'),
                  o = i.paper,
                  l = a ? 'end' : 'start',
                  h = i.node,
                  u = i.attrs,
                  f = u['stroke-width'],
                  p = s.length,
                  x = 'classic',
                  y,
                  m,
                  b,
                  _,
                  w,
                  k = 3,
                  B = 3,
                  C = 5;
                p--;

              ) {
                switch (s[p]) {
                  case 'block':
                  case 'classic':
                  case 'oval':
                  case 'diamond':
                  case 'open':
                  case 'none':
                    x = s[p]
                    break
                  case 'wide':
                    B = 5
                    break
                  case 'narrow':
                    B = 2
                    break
                  case 'long':
                    k = 5
                    break
                  case 'short':
                    k = 2
                }
              }
              if (
                (x == 'open'
                  ? ((k += 2),
                    (B += 2),
                    (C += 2),
                    (b = 1),
                    (_ = a ? 4 : 1),
                    (w = { fill: 'none', stroke: u.stroke }))
                  : ((_ = b = k / 2),
                    (w = { fill: u.stroke, stroke: 'none' })),
                i._.arrows
                  ? a
                    ? (i._.arrows.endPath && g[i._.arrows.endPath]--,
                      i._.arrows.endMarker && g[i._.arrows.endMarker]--)
                    : (i._.arrows.startPath && g[i._.arrows.startPath]--,
                      i._.arrows.startMarker && g[i._.arrows.startMarker]--)
                  : (i._.arrows = {}),
                x != 'none')
              ) {
                const S = 'raphael-marker-' + x
                const A = 'raphael-marker-' + l + x + k + B + '-obj' + i.id
                t._g.doc.getElementById(S)
                  ? g[S]++
                  : (o.defs.appendChild(
                      v(v('path'), {
                        'stroke-linecap': 'round',
                        d: d[x],
                        id: S
                      })
                    ),
                    (g[S] = 1))
                let T = t._g.doc.getElementById(A)
                let E
                T
                  ? (g[A]++, (E = T.getElementsByTagName('use')[0]))
                  : ((T = v(v('marker'), {
                      id: A,
                      markerHeight: B,
                      markerWidth: k,
                      orient: 'auto',
                      refX: _,
                      refY: B / 2
                    })),
                    (E = v(v('use'), {
                      'xlink:href': '#' + S,
                      transform:
                            (a
                              ? 'rotate(180 ' + k / 2 + ' ' + B / 2 + ') '
                              : c) +
                            'scale(' +
                            k / C +
                            ',' +
                            B / C +
                            ')',
                      'stroke-width': (1 / ((k / C + B / C) / 2)).toFixed(
                        4
                      )
                    })),
                    T.appendChild(E),
                    o.defs.appendChild(T),
                    (g[A] = 1)),
                v(E, w)
                const M = b * (x != 'diamond' && x != 'oval')
                a
                  ? ((y = i._.arrows.startdx * f || 0),
                    (m = t.getTotalLength(u.path) - M * f))
                  : ((y = M * f),
                    (m =
                          t.getTotalLength(u.path) -
                          (i._.arrows.enddx * f || 0))),
                (w = {}),
                (w['marker-' + l] = 'url(#' + A + ')'),
                (m || y) && (w.d = t.getSubpath(u.path, y, m)),
                v(h, w),
                (i._.arrows[l + 'Path'] = S),
                (i._.arrows[l + 'Marker'] = A),
                (i._.arrows[l + 'dx'] = M),
                (i._.arrows[l + 'Type'] = x),
                (i._.arrows[l + 'String'] = n)
              } else {
                a
                  ? ((y = i._.arrows.startdx * f || 0),
                    (m = t.getTotalLength(u.path) - y))
                  : ((y = 0),
                    (m =
                          t.getTotalLength(u.path) -
                          (i._.arrows.enddx * f || 0))),
                i._.arrows[l + 'Path'] &&
                        v(h, { d: t.getSubpath(u.path, y, m) }),
                delete i._.arrows[l + 'Path'],
                delete i._.arrows[l + 'Marker'],
                delete i._.arrows[l + 'dx'],
                delete i._.arrows[l + 'Type'],
                delete i._.arrows[l + 'String']
              }
              for (w in g) {
                if (g[e](w) && !g[w]) {
                  const N = t._g.doc.getElementById(w)
                  N && N.parentNode.removeChild(N)
                }
              }
            }
          }
          const w = {
            '-': [3, 1],
            '.': [1, 1],
            '-.': [3, 1, 1, 1],
            '-..': [3, 1, 1, 1, 1, 1],
            '. ': [1, 3],
            '- ': [4, 3],
            '--': [8, 3],
            '- .': [4, 3, 1, 3],
            '--.': [8, 3, 1, 3],
            '--..': [8, 3, 1, 3, 1, 3]
          }
          const k = function (t, e, i) {
            if ((e = w[r(e).toLowerCase()])) {
              for (
                var n = t.attrs['stroke-width'] || '1',
                  a =
                        { round: n, square: n, butt: 0 }[
                          t.attrs['stroke-linecap'] || i['stroke-linecap']
                        ] || 0,
                  s = [],
                  o = e.length;
                o--;

              ) { s[o] = e[o] * n + (o % 2 ? 1 : -1) * a }
              v(t.node, { 'stroke-dasharray': s.join(',') })
            } else v(t.node, { 'stroke-dasharray': 'none' })
          }
          const B = function (i, a) {
            const l = i.node
            const u = i.attrs
            const f = l.style.visibility
            l.style.visibility = 'hidden'
            for (let d in a) {
              if (a[e](d)) {
                if (!t._availableAttrs[e](d)) continue
                let g = a[d]
                switch (((u[d] = g), d)) {
                  case 'blur':
                    i.blur(g)
                    break
                  case 'title':
                    var y = l.getElementsByTagName('title')
                    if (y.length && (y = y[0])) y.firstChild.nodeValue = g
                    else {
                      y = v('title')
                      const m = t._g.doc.createTextNode(g)
                      y.appendChild(m), l.appendChild(y)
                    }
                    break
                  case 'href':
                  case 'target':
                    var w = l.parentNode
                    if (w.tagName.toLowerCase() != 'a') {
                      const B = v('a')
                      w.insertBefore(B, l), B.appendChild(l), (w = B)
                    }
                    d == 'target'
                      ? w.setAttributeNS(
                        p,
                        'show',
                        g == 'blank' ? 'new' : g
                      )
                      : w.setAttributeNS(p, d, g)
                    break
                  case 'cursor':
                    l.style.cursor = g
                    break
                  case 'transform':
                    i.transform(g)
                    break
                  case 'arrow-start':
                    _(i, g)
                    break
                  case 'arrow-end':
                    _(i, g, 1)
                    break
                  case 'clip-rect':
                    var C = r(g).split(h)
                    if (C.length == 4) {
                      i.clip &&
                            i.clip.parentNode.parentNode.removeChild(
                              i.clip.parentNode
                            )
                      var A = v('clipPath')
                      const T = v('rect');
                      (A.id = t.createUUID()),
                      v(T, {
                        x: C[0],
                        y: C[1],
                        width: C[2],
                        height: C[3]
                      }),
                      A.appendChild(T),
                      i.paper.defs.appendChild(A),
                      v(l, { 'clip-path': 'url(#' + A.id + ')' }),
                      (i.clip = T)
                    }
                    if (!g) {
                      const E = l.getAttribute('clip-path')
                      if (E) {
                        const M = t._g.doc.getElementById(
                          E.replace(/(^url\(#|\)$)/g, c)
                        )
                        M && M.parentNode.removeChild(M),
                        v(l, { 'clip-path': c }),
                        delete i.clip
                      }
                    }
                    break
                  case 'path':
                    i.type == 'path' &&
                          (v(l, {
                            d: g ? (u.path = t._pathToAbsolute(g)) : 'M0,0'
                          }),
                          (i._.dirty = 1),
                          i._.arrows &&
                            ('startString' in i._.arrows &&
                              _(i, i._.arrows.startString),
                            'endString' in i._.arrows &&
                              _(i, i._.arrows.endString, 1)))
                    break
                  case 'width':
                    if ((l.setAttribute(d, g), (i._.dirty = 1), !u.fx)) { break }
                    (d = 'x'), (g = u.x)
                  case 'x':
                    u.fx && (g = -u.x - (u.width || 0))
                  case 'rx':
                    if (d == 'rx' && i.type == 'rect') break
                  case 'cx':
                    l.setAttribute(d, g),
                    i.pattern && b(i),
                    (i._.dirty = 1)
                    break
                  case 'height':
                    if ((l.setAttribute(d, g), (i._.dirty = 1), !u.fy)) { break }
                    (d = 'y'), (g = u.y)
                  case 'y':
                    u.fy && (g = -u.y - (u.height || 0))
                  case 'ry':
                    if (d == 'ry' && i.type == 'rect') break
                  case 'cy':
                    l.setAttribute(d, g),
                    i.pattern && b(i),
                    (i._.dirty = 1)
                    break
                  case 'r':
                    i.type == 'rect'
                      ? v(l, { rx: g, ry: g })
                      : l.setAttribute(d, g),
                    (i._.dirty = 1)
                    break
                  case 'src':
                    i.type == 'image' && l.setAttributeNS(p, 'href', g)
                    break
                  case 'stroke-width':
                    (i._.sx == 1 && i._.sy == 1) ||
                          (g /= s(o(i._.sx), o(i._.sy)) || 1),
                    l.setAttribute(d, g),
                    u['stroke-dasharray'] &&
                            k(i, u['stroke-dasharray'], a),
                    i._.arrows &&
                            ('startString' in i._.arrows &&
                              _(i, i._.arrows.startString),
                            'endString' in i._.arrows &&
                              _(i, i._.arrows.endString, 1))
                    break
                  case 'stroke-dasharray':
                    k(i, g, a)
                    break
                  case 'fill':
                    var N = r(g).match(t._ISURL)
                    if (N) {
                      A = v('pattern')
                      var L = v('image');
                      (A.id = t.createUUID()),
                      v(A, {
                        x: 0,
                        y: 0,
                        patternUnits: 'userSpaceOnUse',
                        height: 1,
                        width: 1
                      }),
                      v(L, { x: 0, y: 0, 'xlink:href': N[1] }),
                      A.appendChild(L),
                      (function (e) {
                        t._preload(N[1], function () {
                          const t = this.offsetWidth
                          const r = this.offsetHeight
                          v(e, { width: t, height: r }),
                          v(L, { width: t, height: r })
                        })
                      })(A),
                      i.paper.defs.appendChild(A),
                      v(l, { fill: 'url(#' + A.id + ')' }),
                      (i.pattern = A),
                      i.pattern && b(i)
                      break
                    }
                    var z = t.getRGB(g)
                    if (z.error) {
                      if (
                        (i.type == 'circle' ||
                              i.type == 'ellipse' ||
                              r(g).charAt() != 'r') &&
                            x(i, g)
                      ) {
                        if ('opacity' in u || 'fill-opacity' in u) {
                          var P = t._g.doc.getElementById(
                            l
                              .getAttribute('fill')
                              .replace(/^url\(#|\)$/g, c)
                          )
                          if (P) {
                            var F = P.getElementsByTagName('stop')
                            v(F[F.length - 1], {
                              'stop-opacity':
                                    ('opacity' in u ? u.opacity : 1) *
                                    ('fill-opacity' in u
                                      ? u['fill-opacity']
                                      : 1)
                            })
                          }
                        }
                        (u.gradient = g), (u.fill = 'none')
                        break
                      }
                    } else {
                      delete a.gradient,
                      delete u.gradient,
                      !t.is(u.opacity, 'undefined') &&
                              t.is(a.opacity, 'undefined') &&
                              v(l, { opacity: u.opacity }),
                      !t.is(u['fill-opacity'], 'undefined') &&
                              t.is(a['fill-opacity'], 'undefined') &&
                              v(l, { 'fill-opacity': u['fill-opacity'] })
                    }
                    z[e]('opacity') &&
                          v(l, {
                            'fill-opacity':
                              z.opacity > 1 ? z.opacity / 100 : z.opacity
                          })
                  case 'stroke':
                    (z = t.getRGB(g)),
                    l.setAttribute(d, z.hex),
                    d == 'stroke' &&
                            z[e]('opacity') &&
                            v(l, {
                              'stroke-opacity':
                                z.opacity > 1 ? z.opacity / 100 : z.opacity
                            }),
                    d == 'stroke' &&
                            i._.arrows &&
                            ('startString' in i._.arrows &&
                              _(i, i._.arrows.startString),
                            'endString' in i._.arrows &&
                              _(i, i._.arrows.endString, 1))
                    break
                  case 'gradient':
                    (i.type == 'circle' ||
                          i.type == 'ellipse' ||
                          r(g).charAt() != 'r') &&
                          x(i, g)
                    break
                  case 'opacity':
                    u.gradient &&
                          !u[e]('stroke-opacity') &&
                          v(l, { 'stroke-opacity': g > 1 ? g / 100 : g })
                  case 'fill-opacity':
                    if (u.gradient) {
                      (P = t._g.doc.getElementById(
                        l.getAttribute('fill').replace(/^url\(#|\)$/g, c)
                      )),
                      P &&
                              ((F = P.getElementsByTagName('stop')),
                              v(F[F.length - 1], { 'stop-opacity': g }))
                      break
                    }
                  default:
                    d == 'font-size' && (g = n(g, 10) + 'px')
                    var R = d.replace(/(\-.)/g, function (t) {
                      return t.substring(1).toUpperCase()
                    });
                    (l.style[R] = g), (i._.dirty = 1), l.setAttribute(d, g)
                }
              }
            }
            S(i, a), (l.style.visibility = f)
          }
          const C = 1.2
          var S = function (i, a) {
            if (
              i.type == 'text' &&
                  (a[e]('text') ||
                    a[e]('font') ||
                    a[e]('font-size') ||
                    a[e]('x') ||
                    a[e]('y'))
            ) {
              const s = i.attrs
              const o = i.node
              const l = o.firstChild
                ? n(
                  t._g.doc.defaultView
                    .getComputedStyle(o.firstChild, c)
                    .getPropertyValue('font-size'),
                  10
                )
                : 10
              if (a[e]('text')) {
                for (s.text = a.text; o.firstChild;) { o.removeChild(o.firstChild) }
                for (
                  var h = r(a.text).split('\n'),
                    u = [],
                    f,
                    p = 0,
                    d = h.length;
                  p < d;
                  p++
                ) {
                  (f = v('tspan')),
                  p && v(f, { dy: l * C, x: s.x }),
                  f.appendChild(t._g.doc.createTextNode(h[p])),
                  o.appendChild(f),
                  (u[p] = f)
                }
              } else {
                for (
                  u = o.getElementsByTagName('tspan'), p = 0, d = u.length;
                  p < d;
                  p++
                ) { p ? v(u[p], { dy: l * C, x: s.x }) : v(u[0], { dy: 0 }) }
              }
              v(o, { x: s.x, y: s.y }), (i._.dirty = 1)
              const g = i._getBBox()
              const x = s.y - (g.y + g.height / 2)
              x && t.is(x, 'finite') && v(u[0], { dy: x })
            }
          }
          const A = function (t) {
            return t.parentNode &&
                  t.parentNode.tagName.toLowerCase() === 'a'
              ? t.parentNode
              : t
          }
          const T = function (e, r) {
            function i () {
              return (
                '0000' +
                    ((Math.random() * Math.pow(36, 5)) << 0).toString(36)
              ).slice(-5)
            }
            const n = 0
            const a = 0;
            (this[0] = this.node = e),
            (e.raphael = !0),
            (this.id = i()),
            (e.raphaelid = this.id),
            (this.matrix = t.matrix()),
            (this.realPath = null),
            (this.paper = r),
            (this.attrs = this.attrs || {}),
            (this._ = {
              transform: [],
              sx: 1,
              sy: 1,
              deg: 0,
              dx: 0,
              dy: 0,
              dirty: 1
            }),
            !r.bottom && (r.bottom = this),
            (this.prev = r.top),
            r.top && (r.top.next = this),
            (r.top = this),
            (this.next = null)
          }
          const E = t.el;
          (T.prototype = E),
          (E.constructor = T),
          (t._engine.path = function (t, e) {
            const r = v('path')
            e.canvas && e.canvas.appendChild(r)
            const i = new T(r, e)
            return (
              (i.type = 'path'),
              B(i, { fill: 'none', stroke: '#000', path: t }),
              i
            )
          }),
          (E.rotate = function (t, e, n) {
            if (this.removed) return this
            if (
              ((t = r(t).split(h)),
              t.length - 1 && ((e = i(t[1])), (n = i(t[2]))),
              (t = i(t[0])),
              n == null && (e = n),
              e == null || n == null)
            ) {
              const a = this.getBBox(1);
              (e = a.x + a.width / 2), (n = a.y + a.height / 2)
            }
            return (
              this.transform(this._.transform.concat([['r', t, e, n]])),
              this
            )
          }),
          (E.scale = function (t, e, n, a) {
            if (this.removed) return this
            if (
              ((t = r(t).split(h)),
              t.length - 1 && ((e = i(t[1])), (n = i(t[2])), (a = i(t[3]))),
              (t = i(t[0])),
              e == null && (e = t),
              a == null && (n = a),
              n == null || a == null)
            ) { var s = this.getBBox(1) }
            return (
              (n = n == null ? s.x + s.width / 2 : n),
              (a = a == null ? s.y + s.height / 2 : a),
              this.transform(this._.transform.concat([['s', t, e, n, a]])),
              this
            )
          }),
          (E.translate = function (t, e) {
            return this.removed
              ? this
              : ((t = r(t).split(h)),
                t.length - 1 && (e = i(t[1])),
                (t = i(t[0]) || 0),
                (e = +e || 0),
                this.transform(this._.transform.concat([['t', t, e]])),
                this)
          }),
          (E.transform = function (r) {
            const i = this._
            if (r == null) return i.transform
            if (
              (t._extractTransform(this, r),
              this.clip &&
                    v(this.clip, { transform: this.matrix.invert() }),
              this.pattern && b(this),
              this.node && v(this.node, { transform: this.matrix }),
              i.sx != 1 || i.sy != 1)
            ) {
              const n = this.attrs[e]('stroke-width')
                ? this.attrs['stroke-width']
                : 1
              this.attr({ 'stroke-width': n })
            }
            return this
          }),
          (E.hide = function () {
            return this.removed || (this.node.style.display = 'none'), this
          }),
          (E.show = function () {
            return this.removed || (this.node.style.display = ''), this
          }),
          (E.remove = function () {
            const e = A(this.node)
            if (!this.removed && e.parentNode) {
              const r = this.paper
              r.__set__ && r.__set__.exclude(this),
              u.unbind('raphael.*.*.' + this.id),
              this.gradient && r.defs.removeChild(this.gradient),
              t._tear(this, r),
              e.parentNode.removeChild(e),
              this.removeData()
              for (const i in this) {
                this[i] =
                      typeof this[i] === 'function'
                        ? t._removedFactory(i)
                        : null
              }
              this.removed = !0
            }
          }),
          (E._getBBox = function () {
            if (this.node.style.display == 'none') {
              this.show()
              var t = !0
            }
            let e = !1
            let r
            this.paper.canvas.parentElement
              ? (r = this.paper.canvas.parentElement.style)
              : this.paper.canvas.parentNode &&
                    (r = this.paper.canvas.parentNode.style),
            r && r.display == 'none' && ((e = !0), (r.display = ''))
            let i = {}
            try {
              i = this.node.getBBox()
            } catch (n) {
              i = {
                x: this.node.clientLeft,
                y: this.node.clientTop,
                width: this.node.clientWidth,
                height: this.node.clientHeight
              }
            } finally {
              (i = i || {}), e && (r.display = 'none')
            }
            return t && this.hide(), i
          }),
          (E.attr = function (r, i) {
            if (this.removed) return this
            if (r == null) {
              const n = {}
              for (const a in this.attrs) { this.attrs[e](a) && (n[a] = this.attrs[a]) }
              return (
                n.gradient &&
                      n.fill == 'none' &&
                      (n.fill = n.gradient) &&
                      delete n.gradient,
                (n.transform = this._.transform),
                n
              )
            }
            if (i == null && t.is(r, 'string')) {
              if (
                r == 'fill' &&
                    this.attrs.fill == 'none' &&
                    this.attrs.gradient
              ) { return this.attrs.gradient }
              if (r == 'transform') return this._.transform
              for (
                var s = r.split(h), o = {}, l = 0, c = s.length;
                l < c;
                l++
              ) {
                (r = s[l]),
                r in this.attrs
                  ? (o[r] = this.attrs[r])
                  : t.is(this.paper.customAttributes[r], 'function')
                    ? (o[r] = this.paper.customAttributes[r].def)
                    : (o[r] = t._availableAttrs[r])
              }
              return c - 1 ? o : o[s[0]]
            }
            if (i == null && t.is(r, 'array')) {
              for (o = {}, l = 0, c = r.length; l < c; l++) { o[r[l]] = this.attr(r[l]) }
              return o
            }
            if (i != null) {
              var f = {}
              f[r] = i
            } else r != null && t.is(r, 'object') && (f = r)
            for (var p in f) { u('raphael.attr.' + p + '.' + this.id, this, f[p]) }
            for (p in this.paper.customAttributes) {
              if (
                this.paper.customAttributes[e](p) &&
                    f[e](p) &&
                    t.is(this.paper.customAttributes[p], 'function')
              ) {
                const d = this.paper.customAttributes[p].apply(
                  this,
                  [].concat(f[p])
                )
                this.attrs[p] = f[p]
                for (const g in d) d[e](g) && (f[g] = d[g])
              }
            }
            return B(this, f), this
          }),
          (E.toFront = function () {
            if (this.removed) return this
            const e = A(this.node)
            e.parentNode.appendChild(e)
            const r = this.paper
            return r.top != this && t._tofront(this, r), this
          }),
          (E.toBack = function () {
            if (this.removed) return this
            const e = A(this.node)
            const r = e.parentNode
            r.insertBefore(e, r.firstChild), t._toback(this, this.paper)
            const i = this.paper
            return this
          }),
          (E.insertAfter = function (e) {
            if (this.removed || !e) return this
            const r = A(this.node)
            const i = A(e.node || e[e.length - 1].node)
            return (
              i.nextSibling
                ? i.parentNode.insertBefore(r, i.nextSibling)
                : i.parentNode.appendChild(r),
              t._insertafter(this, e, this.paper),
              this
            )
          }),
          (E.insertBefore = function (e) {
            if (this.removed || !e) return this
            const r = A(this.node)
            const i = A(e.node || e[0].node)
            return (
              i.parentNode.insertBefore(r, i),
              t._insertbefore(this, e, this.paper),
              this
            )
          }),
          (E.blur = function (e) {
            const r = this
            if (+e !== 0) {
              const i = v('filter')
              const n = v('feGaussianBlur');
              (r.attrs.blur = e),
              (i.id = t.createUUID()),
              v(n, { stdDeviation: +e || 1.5 }),
              i.appendChild(n),
              r.paper.defs.appendChild(i),
              (r._blur = i),
              v(r.node, { filter: 'url(#' + i.id + ')' })
            } else {
              r._blur &&
                    (r._blur.parentNode.removeChild(r._blur),
                    delete r._blur,
                    delete r.attrs.blur),
              r.node.removeAttribute('filter')
            }
            return r
          }),
          (t._engine.circle = function (t, e, r, i) {
            const n = v('circle')
            t.canvas && t.canvas.appendChild(n)
            const a = new T(n, t)
            return (
              (a.attrs = {
                cx: e,
                cy: r,
                r: i,
                fill: 'none',
                stroke: '#000'
              }),
              (a.type = 'circle'),
              v(n, a.attrs),
              a
            )
          }),
          (t._engine.rect = function (t, e, r, i, n, a) {
            const s = v('rect')
            t.canvas && t.canvas.appendChild(s)
            const o = new T(s, t)
            return (
              (o.attrs = {
                x: e,
                y: r,
                width: i,
                height: n,
                rx: a || 0,
                ry: a || 0,
                fill: 'none',
                stroke: '#000'
              }),
              (o.type = 'rect'),
              v(s, o.attrs),
              o
            )
          }),
          (t._engine.ellipse = function (t, e, r, i, n) {
            const a = v('ellipse')
            t.canvas && t.canvas.appendChild(a)
            const s = new T(a, t)
            return (
              (s.attrs = {
                cx: e,
                cy: r,
                rx: i,
                ry: n,
                fill: 'none',
                stroke: '#000'
              }),
              (s.type = 'ellipse'),
              v(a, s.attrs),
              s
            )
          }),
          (t._engine.image = function (t, e, r, i, n, a) {
            const s = v('image')
            v(s, {
              x: r,
              y: i,
              width: n,
              height: a,
              preserveAspectRatio: 'none'
            }),
            s.setAttributeNS(p, 'href', e),
            t.canvas && t.canvas.appendChild(s)
            const o = new T(s, t)
            return (
              (o.attrs = { x: r, y: i, width: n, height: a, src: e }),
              (o.type = 'image'),
              o
            )
          }),
          (t._engine.text = function (e, r, i, n) {
            const a = v('text')
            e.canvas && e.canvas.appendChild(a)
            const s = new T(a, e)
            return (
              (s.attrs = {
                x: r,
                y: i,
                'text-anchor': 'middle',
                text: n,
                'font-family': t._availableAttrs['font-family'],
                'font-size': t._availableAttrs['font-size'],
                stroke: 'none',
                fill: '#000'
              }),
              (s.type = 'text'),
              B(s, s.attrs),
              s
            )
          }),
          (t._engine.setSize = function (t, e) {
            return (
              (this.width = t || this.width),
              (this.height = e || this.height),
              this.canvas.setAttribute('width', this.width),
              this.canvas.setAttribute('height', this.height),
              this._viewBox && this.setViewBox.apply(this, this._viewBox),
              this
            )
          }),
          (t._engine.create = function () {
            const e = t._getContainer.apply(0, arguments)
            let r = e && e.container
            let i = e.x
            let n = e.y
            let a = e.width
            let s = e.height
            if (!r) throw new Error('SVG container not found.')
            const o = v('svg')
            const l = 'overflow:hidden;'
            let h
            return (
              (i = i || 0),
              (n = n || 0),
              (a = a || 512),
              (s = s || 342),
              v(o, {
                height: s,
                version: 1.1,
                width: a,
                xmlns: 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink'
              }),
              r == 1
                ? ((o.style.cssText =
                        l +
                        'position:absolute;left:' +
                        i +
                        'px;top:' +
                        n +
                        'px'),
                  t._g.doc.body.appendChild(o),
                  (h = 1))
                : ((o.style.cssText = l + 'position:relative'),
                  r.firstChild
                    ? r.insertBefore(o, r.firstChild)
                    : r.appendChild(o)),
              (r = new t._Paper()),
              (r.width = a),
              (r.height = s),
              (r.canvas = o),
              r.clear(),
              (r._left = r._top = 0),
              h && (r.renderfix = function () {}),
              r.renderfix(),
              r
            )
          }),
          (t._engine.setViewBox = function (t, e, r, i, n) {
            u('raphael.setViewBox', this, this._viewBox, [t, e, r, i, n])
            const a = this.getSize()
            let o = s(r / a.width, i / a.height)
            let l = this.top
            const h = n ? 'xMidYMid meet' : 'xMinYMin'
            let c
            let p
            for (
              t == null
                ? (this._vbSize && (o = 1),
                  delete this._vbSize,
                  (c = '0 0 ' + this.width + f + this.height))
                : ((this._vbSize = o), (c = t + f + e + f + r + f + i)),
              v(this.canvas, { viewBox: c, preserveAspectRatio: h });
              o && l;

            ) {
              (p = 'stroke-width' in l.attrs ? l.attrs['stroke-width'] : 1),
              l.attr({ 'stroke-width': p }),
              (l._.dirty = 1),
              (l._.dirtyT = 1),
              (l = l.prev)
            }
            return (this._viewBox = [t, e, r, i, !!n]), this
          }),
          (t.prototype.renderfix = function () {
            const t = this.canvas
            const e = t.style
            let r
            try {
              r = t.getScreenCTM() || t.createSVGMatrix()
            } catch (i) {
              r = t.createSVGMatrix()
            }
            const n = -r.e % 1
            const a = -r.f % 1;
            (n || a) &&
                  (n &&
                    ((this._left = (this._left + n) % 1),
                    (e.left = this._left + 'px')),
                  a &&
                    ((this._top = (this._top + a) % 1),
                    (e.top = this._top + 'px')))
          }),
          (t.prototype.clear = function () {
            t.eve('raphael.clear', this)
            for (var e = this.canvas; e.firstChild;) { e.removeChild(e.firstChild) }
            (this.bottom = this.top = null),
            (this.desc = v('desc')).appendChild(
              t._g.doc.createTextNode(
                'Created with Raphaël ' + t.version
              )
            ),
            e.appendChild(this.desc),
            e.appendChild((this.defs = v('defs')))
          }),
          (t.prototype.remove = function () {
            u('raphael.remove', this),
            this.canvas.parentNode &&
                    this.canvas.parentNode.removeChild(this.canvas)
            for (const e in this) {
              this[e] =
                    typeof this[e] === 'function' ? t._removedFactory(e) : null
            }
          })
          const M = t.st
          for (const N in E) {
            E[e](N) &&
                !M[e](N) &&
                (M[N] = (function (t) {
                  return function () {
                    const e = arguments
                    return this.forEach(function (r) {
                      r[t].apply(r, e)
                    })
                  }
                })(N))
          }
        }
      }.apply(e, i))),
      !(void 0 !== n && (t.exports = n))
    },
    function (t, e, r) {
      let i, n;
      (i = [r(1)]),
      (n = (function (t) {
        if (!t || t.vml) {
          const e = 'hasOwnProperty'
          const r = String
          const i = parseFloat
          const n = Math
          const a = n.round
          const s = n.max
          const o = n.min
          const l = n.abs
          const h = 'fill'
          const u = /[, ]+/
          const c = t.eve
          const f = ' progid:DXImageTransform.Microsoft'
          const p = ' '
          const d = ''
          const g = {
            M: 'm',
            L: 'l',
            C: 'c',
            Z: 'x',
            m: 't',
            l: 'r',
            c: 'v',
            z: 'x'
          }
          const v = /([clmz]),?([^clmz]*)/gi
          const x = / progid:\S+Blur\([^\)]+\)/g
          const y = /-?[^,\s-]+/g
          const m =
                'position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)'
          const b = 21600
          const _ = { path: 1, rect: 1, image: 1 }
          const w = { circle: 1, ellipse: 1 }
          const k = function (e) {
            let i = /[ahqstv]/gi
            let n = t._pathToAbsolute
            if (
              (r(e).match(i) && (n = t._path2curve),
              (i = /[clmz]/g),
              n == t._pathToAbsolute && !r(e).match(i))
            ) {
              var s = r(e).replace(v, function (t, e, r) {
                let i = []
                const n = e.toLowerCase() == 'm'
                let s = g[e]
                return (
                  r.replace(y, function (t) {
                    n &&
                          i.length == 2 &&
                          ((s += i + g[e == 'm' ? 'l' : 'L']), (i = [])),
                    i.push(a(t * b))
                  }),
                  s + i
                )
              })
              return s
            }
            const o = n(e)
            let l
            let h
            s = []
            for (let u = 0, c = o.length; u < c; u++) {
              (l = o[u]),
              (h = o[u][0].toLowerCase()),
              h == 'z' && (h = 'x')
              for (let f = 1, x = l.length; f < x; f++) { h += a(l[f] * b) + (f != x - 1 ? ',' : d) }
              s.push(h)
            }
            return s.join(p)
          }
          const B = function (e, r, i) {
            const n = t.matrix()
            return n.rotate(-e, 0.5, 0.5), { dx: n.x(r, i), dy: n.y(r, i) }
          }
          const C = function (t, e, r, i, n, a) {
            const s = t._
            const o = t.matrix
            const u = s.fillpos
            const c = t.node
            const f = c.style
            let d = 1
            let g = ''
            let v
            const x = b / e
            const y = b / r
            if (((f.visibility = 'hidden'), e && r)) {
              if (
                ((c.coordsize = l(x) + p + l(y)),
                (f.rotation = a * (e * r < 0 ? -1 : 1)),
                a)
              ) {
                var m = B(a, i, n);
                (i = m.dx), (n = m.dy)
              }
              if (
                (e < 0 && (g += 'x'),
                r < 0 && (g += ' y') && (d = -1),
                (f.flip = g),
                (c.coordorigin = i * -x + p + n * -y),
                u || s.fillsize)
              ) {
                let _ = c.getElementsByTagName(h);
                (_ = _ && _[0]),
                c.removeChild(_),
                u &&
                        ((m = B(a, o.x(u[0], u[1]), o.y(u[0], u[1]))),
                        (_.position = m.dx * d + p + m.dy * d)),
                s.fillsize &&
                        (_.size =
                          s.fillsize[0] * l(e) + p + s.fillsize[1] * l(r)),
                c.appendChild(_)
              }
              f.visibility = 'visible'
            }
          }
          t.toString = function () {
            return (
              'Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël ' +
                this.version
            )
          }
          const S = function (t, e, i) {
            for (
              var n = r(e).toLowerCase().split('-'),
                a = i ? 'end' : 'start',
                s = n.length,
                o = 'classic',
                l = 'medium',
                h = 'medium';
              s--;

            ) {
              switch (n[s]) {
                case 'block':
                case 'classic':
                case 'oval':
                case 'diamond':
                case 'open':
                case 'none':
                  o = n[s]
                  break
                case 'wide':
                case 'narrow':
                  h = n[s]
                  break
                case 'long':
                case 'short':
                  l = n[s]
              }
            }
            const u = t.node.getElementsByTagName('stroke')[0];
            (u[a + 'arrow'] = o),
            (u[a + 'arrowlength'] = l),
            (u[a + 'arrowwidth'] = h)
          }
          const A = function (n, l) {
            n.attrs = n.attrs || {}
            const c = n.node
            const f = n.attrs
            let g = c.style
            let v
            const x =
                    _[n.type] &&
                    (l.x != f.x ||
                      l.y != f.y ||
                      l.width != f.width ||
                      l.height != f.height ||
                      l.cx != f.cx ||
                      l.cy != f.cy ||
                      l.rx != f.rx ||
                      l.ry != f.ry ||
                      l.r != f.r)
            const y =
                    w[n.type] &&
                    (f.cx != l.cx ||
                      f.cy != l.cy ||
                      f.r != l.r ||
                      f.rx != l.rx ||
                      f.ry != l.ry)
            const m = n
            for (const B in l) l[e](B) && (f[B] = l[B])
            if (
              (x && ((f.path = t._getPath[n.type](n)), (n._.dirty = 1)),
              l.href && (c.href = l.href),
              l.title && (c.title = l.title),
              l.target && (c.target = l.target),
              l.cursor && (g.cursor = l.cursor),
              'blur' in l && n.blur(l.blur),
              ((l.path && n.type == 'path') || x) &&
                    ((c.path = k(
                      ~r(f.path).toLowerCase().indexOf('r')
                        ? t._pathToAbsolute(f.path)
                        : f.path
                    )),
                    (n._.dirty = 1),
                    n.type == 'image' &&
                      ((n._.fillpos = [f.x, f.y]),
                      (n._.fillsize = [f.width, f.height]),
                      C(n, 1, 1, 0, 0, 0))),
              'transform' in l && n.transform(l.transform),
              y)
            ) {
              const A = +f.cx
              const E = +f.cy
              const M = +f.rx || +f.r || 0
              const L = +f.ry || +f.r || 0;
              (c.path = t.format(
                'ar{0},{1},{2},{3},{4},{1},{4},{1}x',
                a((A - M) * b),
                a((E - L) * b),
                a((A + M) * b),
                a((E + L) * b),
                a(A * b)
              )),
              (n._.dirty = 1)
            }
            if ('clip-rect' in l) {
              const z = r(l['clip-rect']).split(u)
              if (z.length == 4) {
                (z[2] = +z[2] + +z[0]), (z[3] = +z[3] + +z[1])
                const P = c.clipRect || t._g.doc.createElement('div')
                const F = P.style;
                (F.clip = t.format('rect({1}px {2}px {3}px {0}px)', z)),
                c.clipRect ||
                        ((F.position = 'absolute'),
                        (F.top = 0),
                        (F.left = 0),
                        (F.width = n.paper.width + 'px'),
                        (F.height = n.paper.height + 'px'),
                        c.parentNode.insertBefore(P, c),
                        P.appendChild(c),
                        (c.clipRect = P))
              }
              l['clip-rect'] ||
                    (c.clipRect && (c.clipRect.style.clip = 'auto'))
            }
            if (n.textpath) {
              const R = n.textpath.style
              l.font && (R.font = l.font),
              l['font-family'] &&
                      (R.fontFamily =
                        '"' +
                        l['font-family']
                          .split(',')[0]
                          .replace(/^['"]+|['"]+$/g, d) +
                        '"'),
              l['font-size'] && (R.fontSize = l['font-size']),
              l['font-weight'] && (R.fontWeight = l['font-weight']),
              l['font-style'] && (R.fontStyle = l['font-style'])
            }
            if (
              ('arrow-start' in l && S(m, l['arrow-start']),
              'arrow-end' in l && S(m, l['arrow-end'], 1),
              l.opacity != null ||
                    l.fill != null ||
                    l.src != null ||
                    l.stroke != null ||
                    l['stroke-width'] != null ||
                    l['stroke-opacity'] != null ||
                    l['fill-opacity'] != null ||
                    l['stroke-dasharray'] != null ||
                    l['stroke-miterlimit'] != null ||
                    l['stroke-linejoin'] != null ||
                    l['stroke-linecap'] != null)
            ) {
              let j = c.getElementsByTagName(h)
              let I = !1
              if (
                ((j = j && j[0]),
                !j && (I = j = N(h)),
                n.type == 'image' && l.src && (j.src = l.src),
                l.fill && (j.on = !0),
                (j.on != null && l.fill != 'none' && l.fill !== null) ||
                      (j.on = !1),
                j.on && l.fill)
              ) {
                const q = r(l.fill).match(t._ISURL)
                if (q) {
                  j.parentNode == c && c.removeChild(j),
                  (j.rotate = !0),
                  (j.src = q[1]),
                  (j.type = 'tile')
                  const D = n.getBBox(1);
                  (j.position = D.x + p + D.y),
                  (n._.fillpos = [D.x, D.y]),
                  t._preload(q[1], function () {
                    n._.fillsize = [this.offsetWidth, this.offsetHeight]
                  })
                } else {
                  (j.color = t.getRGB(l.fill).hex),
                  (j.src = d),
                  (j.type = 'solid'),
                  t.getRGB(l.fill).error &&
                          (m.type in { circle: 1, ellipse: 1 } ||
                            r(l.fill).charAt() != 'r') &&
                          T(m, l.fill, j) &&
                          ((f.fill = 'none'),
                          (f.gradient = l.fill),
                          (j.rotate = !1))
                }
              }
              if ('fill-opacity' in l || 'opacity' in l) {
                var V =
                      ((+f['fill-opacity'] + 1 || 2) - 1) *
                      ((+f.opacity + 1 || 2) - 1) *
                      ((+t.getRGB(l.fill).o + 1 || 2) - 1);
                (V = o(s(V, 0), 1)),
                (j.opacity = V),
                j.src && (j.color = 'none')
              }
              c.appendChild(j)
              let O =
                      c.getElementsByTagName('stroke') &&
                      c.getElementsByTagName('stroke')[0]
              let Y = !1
              !O && (Y = O = N('stroke')),
              ((l.stroke && l.stroke != 'none') ||
                      l['stroke-width'] ||
                      l['stroke-opacity'] != null ||
                      l['stroke-dasharray'] ||
                      l['stroke-miterlimit'] ||
                      l['stroke-linejoin'] ||
                      l['stroke-linecap']) &&
                      (O.on = !0),
              (l.stroke == 'none' ||
                      l.stroke === null ||
                      O.on == null ||
                      l.stroke == 0 ||
                      l['stroke-width'] == 0) &&
                      (O.on = !1)
              const W = t.getRGB(l.stroke)
              O.on && l.stroke && (O.color = W.hex),
              (V =
                      ((+f['stroke-opacity'] + 1 || 2) - 1) *
                      ((+f.opacity + 1 || 2) - 1) *
                      ((+W.o + 1 || 2) - 1))
              let G = 0.75 * (i(l['stroke-width']) || 1)
              if (
                ((V = o(s(V, 0), 1)),
                l['stroke-width'] == null && (G = f['stroke-width']),
                l['stroke-width'] && (O.weight = G),
                G && G < 1 && (V *= G) && (O.weight = 1),
                (O.opacity = V),
                l['stroke-linejoin'] &&
                      (O.joinstyle = l['stroke-linejoin'] || 'miter'),
                (O.miterlimit = l['stroke-miterlimit'] || 8),
                l['stroke-linecap'] &&
                      (O.endcap =
                        l['stroke-linecap'] == 'butt'
                          ? 'flat'
                          : l['stroke-linecap'] == 'square'
                            ? 'square'
                            : 'round'),
                'stroke-dasharray' in l)
              ) {
                const H = {
                  '-': 'shortdash',
                  '.': 'shortdot',
                  '-.': 'shortdashdot',
                  '-..': 'shortdashdotdot',
                  '. ': 'dot',
                  '- ': 'dash',
                  '--': 'longdash',
                  '- .': 'dashdot',
                  '--.': 'longdashdot',
                  '--..': 'longdashdotdot'
                }
                O.dashstyle = H[e](l['stroke-dasharray'])
                  ? H[l['stroke-dasharray']]
                  : d
              }
              Y && c.appendChild(O)
            }
            if (m.type == 'text') {
              m.paper.canvas.style.display = d
              const X = m.paper.span
              const U = 100
              let $ = f.font && f.font.match(/\d+(?:\.\d*)?(?=px)/);
              (g = X.style),
              f.font && (g.font = f.font),
              f['font-family'] && (g.fontFamily = f['font-family']),
              f['font-weight'] && (g.fontWeight = f['font-weight']),
              f['font-style'] && (g.fontStyle = f['font-style']),
              ($ = i(f['font-size'] || ($ && $[0])) || 10),
              (g.fontSize = $ * U + 'px'),
              m.textpath.string &&
                      (X.innerHTML = r(m.textpath.string)
                        .replace(/</g, '&#60;')
                        .replace(/&/g, '&#38;')
                        .replace(/\n/g, '<br>'))
              const Z = X.getBoundingClientRect();
              (m.W = f.w = (Z.right - Z.left) / U),
              (m.H = f.h = (Z.bottom - Z.top) / U),
              (m.X = f.x),
              (m.Y = f.y + m.H / 2),
              ('x' in l || 'y' in l) &&
                      (m.path.v = t.format(
                        'm{0},{1}l{2},{1}',
                        a(f.x * b),
                        a(f.y * b),
                        a(f.x * b) + 1
                      ))
              for (
                let Q = [
                    'x',
                    'y',
                    'text',
                    'font',
                    'font-family',
                    'font-weight',
                    'font-style',
                    'font-size'
                  ],
                  J = 0,
                  K = Q.length;
                J < K;
                J++
              ) {
                if (Q[J] in l) {
                  m._.dirty = 1
                  break
                }
              }
              switch (f['text-anchor']) {
                case 'start':
                  (m.textpath.style['v-text-align'] = 'left'),
                  (m.bbx = m.W / 2)
                  break
                case 'end':
                  (m.textpath.style['v-text-align'] = 'right'),
                  (m.bbx = -m.W / 2)
                  break
                default:
                  (m.textpath.style['v-text-align'] = 'center'),
                  (m.bbx = 0)
              }
              m.textpath.style['v-text-kern'] = !0
            }
          }
          var T = function (e, a, s) {
            e.attrs = e.attrs || {}
            const o = e.attrs
            const l = Math.pow
            let h
            let u
            let c = 'linear'
            let f = '.5 .5'
            if (
              ((e.attrs.gradient = a),
              (a = r(a).replace(t._radial_gradient, function (t, e, r) {
                return (
                  (c = 'radial'),
                  e &&
                        r &&
                        ((e = i(e)),
                        (r = i(r)),
                        l(e - 0.5, 2) + l(r - 0.5, 2) > 0.25 &&
                          (r =
                            n.sqrt(0.25 - l(e - 0.5, 2)) * (2 * (r > 0.5) - 1) +
                            0.5),
                        (f = e + p + r)),
                  d
                )
              })),
              (a = a.split(/\s*\-\s*/)),
              c == 'linear')
            ) {
              var g = a.shift()
              if (((g = -i(g)), isNaN(g))) return null
            }
            const v = t._parseDots(a)
            if (!v) return null
            if (((e = e.shape || e.node), v.length)) {
              e.removeChild(s),
              (s.on = !0),
              (s.method = 'none'),
              (s.color = v[0].color),
              (s.color2 = v[v.length - 1].color)
              for (var x = [], y = 0, m = v.length; y < m; y++) { v[y].offset && x.push(v[y].offset + p + v[y].color) }
              (s.colors = x.length ? x.join() : '0% ' + s.color),
              c == 'radial'
                ? ((s.type = 'gradientTitle'),
                  (s.focus = '100%'),
                  (s.focussize = '0 0'),
                  (s.focusposition = f),
                  (s.angle = 0))
                : ((s.type = 'gradient'), (s.angle = (270 - g) % 360)),
              e.appendChild(s)
            }
            return 1
          }
          const E = function (e, r) {
            (this[0] = this.node = e),
            (e.raphael = !0),
            (this.id = t._oid++),
            (e.raphaelid = this.id),
            (this.X = 0),
            (this.Y = 0),
            (this.attrs = {}),
            (this.paper = r),
            (this.matrix = t.matrix()),
            (this._ = {
              transform: [],
              sx: 1,
              sy: 1,
              dx: 0,
              dy: 0,
              deg: 0,
              dirty: 1,
              dirtyT: 1
            }),
            !r.bottom && (r.bottom = this),
            (this.prev = r.top),
            r.top && (r.top.next = this),
            (r.top = this),
            (this.next = null)
          }
          const M = t.el;
          (E.prototype = M),
          (M.constructor = E),
          (M.transform = function (e) {
            if (e == null) return this._.transform
            const i = this.paper._viewBoxShift
            const n = i ? 's' + [i.scale, i.scale] + '-1-1t' + [i.dx, i.dy] : d
            let a
            i &&
                  (a = e =
                    r(e).replace(/\.{3}|\u2026/g, this._.transform || d)),
            t._extractTransform(this, n + e)
            const s = this.matrix.clone()
            const o = this.skew
            const l = this.node
            let h
            const u = ~r(this.attrs.fill).indexOf('-')
            const c = !r(this.attrs.fill).indexOf('url(')
            if ((s.translate(1, 1), c || u || this.type == 'image')) {
              if (
                ((o.matrix = '1 0 0 1'),
                (o.offset = '0 0'),
                (h = s.split()),
                (u && h.noRotation) || !h.isSimple)
              ) {
                l.style.filter = s.toFilter()
                const f = this.getBBox()
                const g = this.getBBox(1)
                const v = f.x - g.x
                const x = f.y - g.y;
                (l.coordorigin = v * -b + p + x * -b),
                C(this, 1, 1, v, x, 0)
              } else {
                (l.style.filter = d),
                C(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate)
              }
            } else {
              (l.style.filter = d),
              (o.matrix = r(s)),
              (o.offset = s.offset())
            }
            return (
              a !== null &&
                    ((this._.transform = a), t._extractTransform(this, a)),
              this
            )
          }),
          (M.rotate = function (t, e, n) {
            if (this.removed) return this
            if (t != null) {
              if (
                ((t = r(t).split(u)),
                t.length - 1 && ((e = i(t[1])), (n = i(t[2]))),
                (t = i(t[0])),
                n == null && (e = n),
                e == null || n == null)
              ) {
                const a = this.getBBox(1);
                (e = a.x + a.width / 2), (n = a.y + a.height / 2)
              }
              return (
                (this._.dirtyT = 1),
                this.transform(this._.transform.concat([['r', t, e, n]])),
                this
              )
            }
          }),
          (M.translate = function (t, e) {
            return this.removed
              ? this
              : ((t = r(t).split(u)),
                t.length - 1 && (e = i(t[1])),
                (t = i(t[0]) || 0),
                (e = +e || 0),
                this._.bbox && ((this._.bbox.x += t), (this._.bbox.y += e)),
                this.transform(this._.transform.concat([['t', t, e]])),
                this)
          }),
          (M.scale = function (t, e, n, a) {
            if (this.removed) return this
            if (
              ((t = r(t).split(u)),
              t.length - 1 &&
                    ((e = i(t[1])),
                    (n = i(t[2])),
                    (a = i(t[3])),
                    isNaN(n) && (n = null),
                    isNaN(a) && (a = null)),
              (t = i(t[0])),
              e == null && (e = t),
              a == null && (n = a),
              n == null || a == null)
            ) { var s = this.getBBox(1) }
            return (
              (n = n == null ? s.x + s.width / 2 : n),
              (a = a == null ? s.y + s.height / 2 : a),
              this.transform(this._.transform.concat([['s', t, e, n, a]])),
              (this._.dirtyT = 1),
              this
            )
          }),
          (M.hide = function () {
            return (
              !this.removed && (this.node.style.display = 'none'), this
            )
          }),
          (M.show = function () {
            return !this.removed && (this.node.style.display = d), this
          }),
          (M.auxGetBBox = t.el.getBBox),
          (M.getBBox = function () {
            const t = this.auxGetBBox()
            if (this.paper && this.paper._viewBoxShift) {
              const e = {}
              const r = 1 / this.paper._viewBoxShift.scale
              return (
                (e.x = t.x - this.paper._viewBoxShift.dx),
                (e.x *= r),
                (e.y = t.y - this.paper._viewBoxShift.dy),
                (e.y *= r),
                (e.width = t.width * r),
                (e.height = t.height * r),
                (e.x2 = e.x + e.width),
                (e.y2 = e.y + e.height),
                e
              )
            }
            return t
          }),
          (M._getBBox = function () {
            return this.removed
              ? {}
              : {
                  x: this.X + (this.bbx || 0) - this.W / 2,
                  y: this.Y - this.H,
                  width: this.W,
                  height: this.H
                }
          }),
          (M.remove = function () {
            if (!this.removed && this.node.parentNode) {
              this.paper.__set__ && this.paper.__set__.exclude(this),
              t.eve.unbind('raphael.*.*.' + this.id),
              t._tear(this, this.paper),
              this.node.parentNode.removeChild(this.node),
              this.shape && this.shape.parentNode.removeChild(this.shape)
              for (const e in this) {
                this[e] =
                      typeof this[e] === 'function'
                        ? t._removedFactory(e)
                        : null
              }
              this.removed = !0
            }
          }),
          (M.attr = function (r, i) {
            if (this.removed) return this
            if (r == null) {
              const n = {}
              for (const a in this.attrs) { this.attrs[e](a) && (n[a] = this.attrs[a]) }
              return (
                n.gradient &&
                      n.fill == 'none' &&
                      (n.fill = n.gradient) &&
                      delete n.gradient,
                (n.transform = this._.transform),
                n
              )
            }
            if (i == null && t.is(r, 'string')) {
              if (
                r == h &&
                    this.attrs.fill == 'none' &&
                    this.attrs.gradient
              ) { return this.attrs.gradient }
              for (
                var s = r.split(u), o = {}, l = 0, f = s.length;
                l < f;
                l++
              ) {
                (r = s[l]),
                r in this.attrs
                  ? (o[r] = this.attrs[r])
                  : t.is(this.paper.customAttributes[r], 'function')
                    ? (o[r] = this.paper.customAttributes[r].def)
                    : (o[r] = t._availableAttrs[r])
              }
              return f - 1 ? o : o[s[0]]
            }
            if (this.attrs && i == null && t.is(r, 'array')) {
              for (o = {}, l = 0, f = r.length; l < f; l++) { o[r[l]] = this.attr(r[l]) }
              return o
            }
            let p
            i != null && ((p = {}), (p[r] = i)),
            i == null && t.is(r, 'object') && (p = r)
            for (var d in p) { c('raphael.attr.' + d + '.' + this.id, this, p[d]) }
            if (p) {
              for (d in this.paper.customAttributes) {
                if (
                  this.paper.customAttributes[e](d) &&
                      p[e](d) &&
                      t.is(this.paper.customAttributes[d], 'function')
                ) {
                  const g = this.paper.customAttributes[d].apply(
                    this,
                    [].concat(p[d])
                  )
                  this.attrs[d] = p[d]
                  for (const v in g) g[e](v) && (p[v] = g[v])
                }
              }
              p.text &&
                    this.type == 'text' &&
                    (this.textpath.string = p.text),
              A(this, p)
            }
            return this
          }),
          (M.toFront = function () {
            return (
              !this.removed && this.node.parentNode.appendChild(this.node),
              this.paper &&
                    this.paper.top != this &&
                    t._tofront(this, this.paper),
              this
            )
          }),
          (M.toBack = function () {
            return this.removed
              ? this
              : (this.node.parentNode.firstChild != this.node &&
                      (this.node.parentNode.insertBefore(
                        this.node,
                        this.node.parentNode.firstChild
                      ),
                      t._toback(this, this.paper)),
                this)
          }),
          (M.insertAfter = function (e) {
            return this.removed
              ? this
              : (e.constructor == t.st.constructor && (e = e[e.length - 1]),
                e.node.nextSibling
                  ? e.node.parentNode.insertBefore(
                    this.node,
                    e.node.nextSibling
                  )
                  : e.node.parentNode.appendChild(this.node),
                t._insertafter(this, e, this.paper),
                this)
          }),
          (M.insertBefore = function (e) {
            return this.removed
              ? this
              : (e.constructor == t.st.constructor && (e = e[0]),
                e.node.parentNode.insertBefore(this.node, e.node),
                t._insertbefore(this, e, this.paper),
                this)
          }),
          (M.blur = function (e) {
            const r = this.node.runtimeStyle
            let i = r.filter
            return (
              (i = i.replace(x, d)),
              +e !== 0
                ? ((this.attrs.blur = e),
                  (r.filter =
                        i + p + f + '.Blur(pixelradius=' + (+e || 1.5) + ')'),
                  (r.margin = t.format('-{0}px 0 0 -{0}px', a(+e || 1.5))))
                : ((r.filter = i), (r.margin = 0), delete this.attrs.blur),
              this
            )
          }),
          (t._engine.path = function (t, e) {
            const r = N('shape');
            (r.style.cssText = m),
            (r.coordsize = b + p + b),
            (r.coordorigin = e.coordorigin)
            const i = new E(r, e)
            const n = { fill: 'none', stroke: '#000' }
            t && (n.path = t),
            (i.type = 'path'),
            (i.path = []),
            (i.Path = d),
            A(i, n),
            e.canvas && e.canvas.appendChild(r)
            const a = N('skew')
            return (
              (a.on = !0), r.appendChild(a), (i.skew = a), i.transform(d), i
            )
          }),
          (t._engine.rect = function (e, r, i, n, a, s) {
            const o = t._rectPath(r, i, n, a, s)
            const l = e.path(o)
            const h = l.attrs
            return (
              (l.X = h.x = r),
              (l.Y = h.y = i),
              (l.W = h.width = n),
              (l.H = h.height = a),
              (h.r = s),
              (h.path = o),
              (l.type = 'rect'),
              l
            )
          }),
          (t._engine.ellipse = function (t, e, r, i, n) {
            const a = t.path()
            const s = a.attrs
            return (
              (a.X = e - i),
              (a.Y = r - n),
              (a.W = 2 * i),
              (a.H = 2 * n),
              (a.type = 'ellipse'),
              A(a, { cx: e, cy: r, rx: i, ry: n }),
              a
            )
          }),
          (t._engine.circle = function (t, e, r, i) {
            const n = t.path()
            const a = n.attrs
            return (
              (n.X = e - i),
              (n.Y = r - i),
              (n.W = n.H = 2 * i),
              (n.type = 'circle'),
              A(n, { cx: e, cy: r, r: i }),
              n
            )
          }),
          (t._engine.image = function (e, r, i, n, a, s) {
            const o = t._rectPath(i, n, a, s)
            const l = e.path(o).attr({ stroke: 'none' })
            const u = l.attrs
            const c = l.node
            const f = c.getElementsByTagName(h)[0]
            return (
              (u.src = r),
              (l.X = u.x = i),
              (l.Y = u.y = n),
              (l.W = u.width = a),
              (l.H = u.height = s),
              (u.path = o),
              (l.type = 'image'),
              f.parentNode == c && c.removeChild(f),
              (f.rotate = !0),
              (f.src = r),
              (f.type = 'tile'),
              (l._.fillpos = [i, n]),
              (l._.fillsize = [a, s]),
              c.appendChild(f),
              C(l, 1, 1, 0, 0, 0),
              l
            )
          }),
          (t._engine.text = function (e, i, n, s) {
            const o = N('shape')
            const l = N('path')
            const h = N('textpath');
            (i = i || 0),
            (n = n || 0),
            (s = s || ''),
            (l.v = t.format(
              'm{0},{1}l{2},{1}',
              a(i * b),
              a(n * b),
              a(i * b) + 1
            )),
            (l.textpathok = !0),
            (h.string = r(s)),
            (h.on = !0),
            (o.style.cssText = m),
            (o.coordsize = b + p + b),
            (o.coordorigin = '0 0')
            const u = new E(o, e)
            const c = {
              fill: '#000',
              stroke: 'none',
              font: t._availableAttrs.font,
              text: s
            };
            (u.shape = o),
            (u.path = l),
            (u.textpath = h),
            (u.type = 'text'),
            (u.attrs.text = r(s)),
            (u.attrs.x = i),
            (u.attrs.y = n),
            (u.attrs.w = 1),
            (u.attrs.h = 1),
            A(u, c),
            o.appendChild(h),
            o.appendChild(l),
            e.canvas.appendChild(o)
            const f = N('skew')
            return (
              (f.on = !0), o.appendChild(f), (u.skew = f), u.transform(d), u
            )
          }),
          (t._engine.setSize = function (e, r) {
            const i = this.canvas.style
            return (
              (this.width = e),
              (this.height = r),
              e == +e && (e += 'px'),
              r == +r && (r += 'px'),
              (i.width = e),
              (i.height = r),
              (i.clip = 'rect(0 ' + e + ' ' + r + ' 0)'),
              this._viewBox &&
                    t._engine.setViewBox.apply(this, this._viewBox),
              this
            )
          }),
          (t._engine.setViewBox = function (e, r, i, n, a) {
            t.eve('raphael.setViewBox', this, this._viewBox, [
              e,
              r,
              i,
              n,
              a
            ])
            const s = this.getSize()
            const o = s.width
            const l = s.height
            let h
            let u
            return (
              a &&
                    ((h = l / n),
                    (u = o / i),
                    i * h < o && (e -= (o - i * h) / 2 / h),
                    n * u < l && (r -= (l - n * u) / 2 / u)),
              (this._viewBox = [e, r, i, n, !!a]),
              (this._viewBoxShift = { dx: -e, dy: -r, scale: s }),
              this.forEach(function (t) {
                t.transform('...')
              }),
              this
            )
          })
          let N;
          (t._engine.initWin = function (t) {
            const e = t.document
            e.styleSheets.length < 31
              ? e
                .createStyleSheet()
                .addRule('.rvml', 'behavior:url(#default#VML)')
              : e.styleSheets[0].addRule(
                '.rvml',
                'behavior:url(#default#VML)'
              )
            try {
              !e.namespaces.rvml &&
                  e.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml'),
              (N = function (t) {
                return e.createElement('<rvml:' + t + ' class="rvml">')
              })
            } catch (r) {
              N = function (t) {
                return e.createElement(
                  '<' +
                      t +
                      ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'
                )
              }
            }
          }),
          t._engine.initWin(t._g.win),
          (t._engine.create = function () {
            const e = t._getContainer.apply(0, arguments)
            const r = e.container
            let i = e.height
            let n
            let a = e.width
            let s = e.x
            let o = e.y
            if (!r) throw new Error('VML container not found.')
            const l = new t._Paper()
            const h = (l.canvas = t._g.doc.createElement('div'))
            const u = h.style
            return (
              (s = s || 0),
              (o = o || 0),
              (a = a || 512),
              (i = i || 342),
              (l.width = a),
              (l.height = i),
              a == +a && (a += 'px'),
              i == +i && (i += 'px'),
              (l.coordsize = 1e3 * b + p + 1e3 * b),
              (l.coordorigin = '0 0'),
              (l.span = t._g.doc.createElement('span')),
              (l.span.style.cssText =
                    'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;'),
              h.appendChild(l.span),
              (u.cssText = t.format(
                'top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden',
                a,
                i
              )),
              r == 1
                ? (t._g.doc.body.appendChild(h),
                  (u.left = s + 'px'),
                  (u.top = o + 'px'),
                  (u.position = 'absolute'))
                : r.firstChild
                  ? r.insertBefore(h, r.firstChild)
                  : r.appendChild(h),
              (l.renderfix = function () {}),
              l
            )
          }),
          (t.prototype.clear = function () {
            t.eve('raphael.clear', this),
            (this.canvas.innerHTML = d),
            (this.span = t._g.doc.createElement('span')),
            (this.span.style.cssText =
                    'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;'),
            this.canvas.appendChild(this.span),
            (this.bottom = this.top = null)
          }),
          (t.prototype.remove = function () {
            t.eve('raphael.remove', this),
            this.canvas.parentNode.removeChild(this.canvas)
            for (const e in this) {
              this[e] =
                    typeof this[e] === 'function' ? t._removedFactory(e) : null
            }
            return !0
          })
          const L = t.st
          for (const z in M) {
            M[e](z) &&
                !L[e](z) &&
                (L[z] = (function (t) {
                  return function () {
                    const e = arguments
                    return this.forEach(function (r) {
                      r[t].apply(r, e)
                    })
                  }
                })(z))
          }
        }
      }.apply(e, i))),
      !(void 0 !== n && (t.exports = n))
    }
  ])
})
