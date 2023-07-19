/*
 Highcharts JS v8.2.0 (2020-08-20)

 Variable Pie module for Highcharts

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function (b) { typeof module === 'object' && module.exports ? (b.default = b, module.exports = b) : typeof define === 'function' && define.amd ? define('highcharts/modules/variable-pie', ['highcharts'], function (g) { b(g); b.Highcharts = g; return b }) : b(typeof Highcharts !== 'undefined' ? Highcharts : void 0) })(function (b) {
  function g (b, d, g, n) { b.hasOwnProperty(d) || (b[d] = n.apply(null, g)) }b = b ? b._modules : {}; g(b, 'Series/VariablePieSeries.js', [b['Core/Globals.js'], b['Core/Utilities.js']], function (b, d) {
    const g = d.arrayMax; const n = d.arrayMin; const w =
d.clamp; const x = d.fireEvent; const p = d.pick; d = d.seriesType; const y = b.seriesTypes.pie.prototype; d('variablepie', 'pie', { minPointSize: '10%', maxPointSize: '100%', zMin: void 0, zMax: void 0, sizeBy: 'area', tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}<br/>Value: {point.y}<br/>Size: {point.z}<br/>' } }, {
      pointArrayMap: ['y', 'z'],
      parallelArrays: ['x', 'y', 'z'],
      redraw: function () { this.center = null; y.redraw.call(this, arguments) },
      zValEval: function (a) { return typeof a !== 'number' || isNaN(a) ? null : !0 },
      calculateExtremes: function () {
        let a =
this.chart; const b = this.options; let c = this.zData; const d = Math.min(a.plotWidth, a.plotHeight) - 2 * (b.slicedOffset || 0); const l = {}; a = this.center || this.getCenter(); ['minPointSize', 'maxPointSize'].forEach(function (a) { let c = b[a]; const k = /%$/.test(c); c = parseInt(c, 10); l[a] = k ? d * c / 100 : 2 * c }); this.minPxSize = a[3] + l.minPointSize; this.maxPxSize = w(a[2], a[3] + l.minPointSize, l.maxPointSize); c.length && (a = p(b.zMin, n(c.filter(this.zValEval))), c = p(b.zMax, g(c.filter(this.zValEval))), this.getRadii(a, c, this.minPxSize, this.maxPxSize))
      },
      getRadii: function (a,
        b, c, d) { let l = 0; const g = this.zData; const q = g.length; const k = []; const p = this.options.sizeBy !== 'radius'; const u = b - a; for (l; l < q; l++) { let h = this.zValEval(g[l]) ? g[l] : a; h <= a ? h = c / 2 : h >= b ? h = d / 2 : (h = u > 0 ? (h - a) / u : 0.5, p && (h = Math.sqrt(h)), h = Math.ceil(c + h * (d - c)) / 2); k.push(h) } this.radii = k },
      translate: function (a) {
        this.generatePoints(); let b = 0; let c = this.options; const d = c.slicedOffset; const g = d + (c.borderWidth || 0); let t = c.startAngle || 0; const q = Math.PI / 180 * (t - 90); let k = Math.PI / 180 * (p(c.endAngle, t + 360) - 90); t = k - q; const n = this.points; const u = c.dataLabels.distance; c = c.ignoreHiddenPoint; const h =
n.length; this.startAngleRad = q; this.endAngleRad = k; this.calculateExtremes(); a || (this.center = a = this.getCenter()); for (k = 0; k < h; k++) {
          const f = n[k]; let m = this.radii[k]; f.labelDistance = p(f.options.dataLabels && f.options.dataLabels.distance, u); this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, f.labelDistance); let e = q + b * t; if (!c || f.visible)b += f.percentage / 100; let r = q + b * t; f.shapeType = 'arc'; f.shapeArgs = { x: a[0], y: a[1], r: m, innerR: a[3] / 2, start: Math.round(1E3 * e) / 1E3, end: Math.round(1E3 * r) / 1E3 }; e = (r + e) / 2; e > 1.5 * Math.PI
            ? e -= 2 * Math.PI
            : e < -Math.PI / 2 && (e += 2 * Math.PI); f.slicedTranslation = { translateX: Math.round(Math.cos(e) * d), translateY: Math.round(Math.sin(e) * d) }; let v = Math.cos(e) * a[2] / 2; const w = Math.sin(e) * a[2] / 2; r = Math.cos(e) * m; m *= Math.sin(e); f.tooltipPos = [a[0] + 0.7 * v, a[1] + 0.7 * w]; f.half = e < -Math.PI / 2 || e > Math.PI / 2 ? 1 : 0; f.angle = e; v = Math.min(g, f.labelDistance / 5); f.labelPosition = {
            natural: { x: a[0] + r + Math.cos(e) * f.labelDistance, y: a[1] + m + Math.sin(e) * f.labelDistance },
            final: {},
            alignment: f.half ? 'right' : 'left',
            connectorPosition: {
              breakAt: {
                x: a[0] +
r + Math.cos(e) * v,
                y: a[1] + m + Math.sin(e) * v
              },
              touchingSliceAt: { x: a[0] + r, y: a[1] + m }
            }
          }
        }x(this, 'afterTranslate')
      }
    }); ''
  }); g(b, 'masters/modules/variable-pie.src.js', [], function () {})
})
// # sourceMappingURL=variable-pie.js.map
