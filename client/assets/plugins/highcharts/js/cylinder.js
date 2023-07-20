/*
 Highcharts JS v8.2.0 (2020-08-20)

 Highcharts cylinder module

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function (b) {
  typeof module === 'object' && module.exports
    ? ((b.default = b), (module.exports = b))
    : typeof define === 'function' && define.amd
      ? define(
        'highcharts/modules/cylinder',
        ['highcharts', 'highcharts/highcharts-3d'],
        function (g) {
          b(g)
          b.Highcharts = g
          return b
        }
      )
      : b(typeof Highcharts !== 'undefined' ? Highcharts : void 0)
})(function (b) {
  function g (b, h, g, f) {
    b.hasOwnProperty(h) || (b[h] = f.apply(null, g))
  }
  b = b ? b._modules : {}
  g(
    b,
    'Series/CylinderSeries.js',
    [
      b['Core/Globals.js'],
      b['Core/Color.js'],
      b['Extensions/Math3D.js'],
      b['Core/Utilities.js']
    ],
    function (b, g, l, f) {
      const h = g.parse
      const r = l.perspective
      g = f.merge
      const t = f.pick
      l = f.seriesType
      const u = b.charts
      const v = b.deg2rad
      f = b.Renderer.prototype
      const w = f.cuboidPath
      const k = function (a) {
        return !a.some(function (a) {
          return a[0] === 'C'
        })
      }
      l(
        'cylinder',
        'column',
        {},
        {},
        {
          shapeType: 'cylinder',
          hasNewShapeType:
            b.seriesTypes.column.prototype.pointClass.prototype.hasNewShapeType
        }
      )
      b = g(f.elements3d.cuboid, {
        parts: ['top', 'bottom', 'front', 'back'],
        pathType: 'cylinder',
        fillSetter: function (a) {
          this.singleSetterForParts('fill', null, {
            front: a,
            back: a,
            top: h(a).brighten(0.1).get(),
            bottom: h(a).brighten(-0.1).get()
          })
          this.color = this.fill = a
          return this
        }
      })
      f.elements3d.cylinder = b
      f.cylinder = function (a) {
        return this.element3d('cylinder', a)
      }
      f.cylinderPath = function (a) {
        const c = u[this.chartIndex]
        const d = w.call(this, a)
        const e = !d.isTop
        const b = !d.isFront
        const f = this.getCylinderEnd(c, a)
        a = this.getCylinderEnd(c, a, !0)
        return {
          front: this.getCylinderFront(f, a),
          back: this.getCylinderBack(f, a),
          top: f,
          bottom: a,
          zIndexes: {
            top: e ? 3 : 0,
            bottom: e ? 0 : 3,
            front: b ? 2 : 1,
            back: b ? 1 : 2,
            group: d.zIndexes.group
          }
        }
      }
      f.getCylinderFront = function (a, c) {
        a = a.slice(0, 3)
        if (k(c)) {
          var d = c[0]
          d[0] === 'M' &&
            (a.push(c[2]), a.push(c[1]), a.push(['L', d[1], d[2]]))
        } else {
          d = c[0]
          const e = c[1]
          c = c[2]
          d[0] === 'M' &&
            e[0] === 'C' &&
            c[0] === 'C' &&
            (a.push(['L', c[5], c[6]]),
            a.push(['C', c[3], c[4], c[1], c[2], e[5], e[6]]),
            a.push(['C', e[3], e[4], e[1], e[2], d[1], d[2]]))
        }
        a.push(['Z'])
        return a
      }
      f.getCylinderBack = function (a, c) {
        const d = []
        if (k(a)) {
          var e = a[0]
          const b = a[2]
          e[0] === 'M' &&
            b[0] === 'L' &&
            (d.push(['M', b[1], b[2]]),
            d.push(a[3]),
            d.push(['L', e[1], e[2]]))
        } else {
          a[2][0] === 'C' && d.push(['M', a[2][5], a[2][6]]),
          d.push(a[3], a[4])
        }
        k(c)
          ? ((e = c[0]),
            e[0] === 'M' &&
              (d.push(['L', e[1], e[2]]), d.push(c[3]), d.push(c[2])))
          : ((a = c[2]),
            (e = c[3]),
            (c = c[4]),
            a[0] === 'C' &&
              e[0] === 'C' &&
              c[0] === 'C' &&
              (d.push(['L', c[5], c[6]]),
              d.push(['C', c[3], c[4], c[1], c[2], e[5], e[6]]),
              d.push(['C', e[3], e[4], e[1], e[2], a[5], a[6]])))
        d.push(['Z'])
        return d
      }
      f.getCylinderEnd = function (a, c, d) {
        const e = t(c.depth, c.width)
        const b = Math.min(c.width, e) / 2
        const f =
            v *
            (a.options.chart.options3d.beta - 90 + (c.alphaCorrection || 0))
        d = c.y + (d ? c.height : 0)
        const g = 0.5519 * b
        const h = c.width / 2 + c.x
        const l = e / 2 + c.z
        const m = [
          { x: 0, y: d, z: b },
          { x: g, y: d, z: b },
          { x: b, y: d, z: g },
          { x: b, y: d, z: 0 },
          { x: b, y: d, z: -g },
          { x: g, y: d, z: -b },
          { x: 0, y: d, z: -b },
          { x: -g, y: d, z: -b },
          { x: -b, y: d, z: -g },
          { x: -b, y: d, z: 0 },
          { x: -b, y: d, z: g },
          { x: -g, y: d, z: b },
          { x: 0, y: d, z: b }
        ]
        const k = Math.cos(f)
        const q = Math.sin(f)
        let n
        let p
        m.forEach(function (a, b) {
          n = a.x
          p = a.z
          m[b].x = n * k - p * q + h
          m[b].z = p * k + n * q + l
        })
        a = r(m, a, !0)
        return Math.abs(a[3].y - a[9].y) < 2.5 &&
          Math.abs(a[0].y - a[6].y) < 2.5
          ? this.toLinePath([a[0], a[3], a[6], a[9]], !0)
          : this.getCurvedPath(a)
      }
      f.getCurvedPath = function (a) {
        const b = [['M', a[0].x, a[0].y]]
        const d = a.length - 2
        let e
        for (e = 1; e < d; e += 3) {
          b.push([
            'C',
            a[e].x,
            a[e].y,
            a[e + 1].x,
            a[e + 1].y,
            a[e + 2].x,
            a[e + 2].y
          ])
        }
        return b
      }
    }
  )
  g(b, 'masters/modules/cylinder.src.js', [], function () {})
})
// # sourceMappingURL=cylinder.js.map
