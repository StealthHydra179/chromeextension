/*
 Highcharts JS v8.2.0 (2020-08-20)

 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (a) { typeof module === 'object' && module.exports ? (a.default = a, module.exports = a) : typeof define === 'function' && define.amd ? define('highcharts/modules/export-data', ['highcharts', 'highcharts/modules/exporting'], function (g) { a(g); a.Highcharts = g; return a }) : a(typeof Highcharts !== 'undefined' ? Highcharts : void 0) })(function (a) {
  function g (a, d, e, c) { a.hasOwnProperty(d) || (a[d] = c.apply(null, e)) }a = a ? a._modules : {}; g(a, 'Extensions/DownloadURL.js', [a['Core/Globals.js']], function (a) {
    const d = a.win; const e = d.navigator; const c = d.document
    const g = d.URL || d.webkitURL || d; const u = /Edge\/\d+/.test(e.userAgent); const v = a.dataURLtoBlob = function (f) { if ((f = f.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/)) && f.length > 3 && d.atob && d.ArrayBuffer && d.Uint8Array && d.Blob && g.createObjectURL) { const a = d.atob(f[3]); let c = new d.ArrayBuffer(a.length); c = new d.Uint8Array(c); for (let e = 0; e < c.length; ++e)c[e] = a.charCodeAt(e); f = new d.Blob([c], { type: f[1] }); return g.createObjectURL(f) } }; a = a.downloadURL = function (a, p) {
      const f = c.createElement('a'); if (typeof a === 'string' || a instanceof String ||
!e.msSaveOrOpenBlob) { a = '' + a; if (u || a.length > 2E6) if (a = v(a) || '', !a) throw Error('Failed to convert to blob'); if (typeof f.download !== 'undefined')f.href = a, f.download = p, c.body.appendChild(f), f.click(), c.body.removeChild(f); else try { const g = d.open(a, 'chart'); if (typeof g === 'undefined' || g === null) throw Error('Failed to open window') } catch (E) { d.location.href = a } } else e.msSaveOrOpenBlob(a, p)
    }; return { dataURLtoBlob: v, downloadURL: a }
  }); g(a, 'Extensions/ExportData.js', [a['Core/Axis/Axis.js'], a['Core/Chart/Chart.js'],
    a['Core/Globals.js'], a['Core/Utilities.js'], a['Extensions/DownloadURL.js']], function (a, d, e, c, g) {
    function u (a, d) { const b = p.navigator; const f = b.userAgent.indexOf('WebKit') > -1 && b.userAgent.indexOf('Chrome') < 0; const c = p.URL || p.webkitURL || p; try { if (b.msSaveOrOpenBlob && p.MSBlobBuilder) { const q = new p.MSBlobBuilder(); q.append(a); return q.getBlob('image/svg+xml') } if (!f) return c.createObjectURL(new p.Blob(['\ufeff' + a], { type: d })) } catch (M) {} } const v = e.doc; const f = e.seriesTypes; var p = e.win; e = c.addEvent; const I = c.defined; const J = c.extend; const E = c.find; const D =
c.fireEvent; const K = c.getOptions; const L = c.isNumber; const w = c.pick; c = c.setOptions; const F = g.downloadURL; c({
      exporting: { csv: { annotations: { itemDelimiter: '; ', join: !1 }, columnHeaderFormatter: null, dateFormat: '%Y-%m-%d %H:%M:%S', decimalPoint: null, itemDelimiter: null, lineDelimiter: '\n' }, showTable: !1, useMultiLevelHeaders: !0, useRowspanHeaders: !0 },
      lang: {
        downloadCSV: 'Download CSV',
        downloadXLS: 'Download XLS',
        exportData: { annotationHeader: 'Annotations', categoryHeader: 'Category', categoryDatetimeHeader: 'DateTime' },
        viewData: 'View data table',
        hideData: 'Hide data table'
      }
    }); e(d, 'render', function () { this.options && this.options.exporting && this.options.exporting.showTable && !this.options.chart.forExport && !this.dataTableDiv && this.viewData() }); d.prototype.setUpKeyToAxis = function () { f.arearange && (f.arearange.prototype.keyToAxis = { low: 'y', high: 'y' }); f.gantt && (f.gantt.prototype.keyToAxis = { start: 'x', end: 'x' }) }; d.prototype.getDataRows = function (b) {
      const d = this.hasParallelCoordinates; const f = this.time; const c = this.options.exporting && this.options.exporting.csv || {}; const e = this.xAxis
      const q = {}; const g = []; const p = []; const n = []; let r; let t = this.options.lang.exportData; const A = t.categoryHeader; const x = t.categoryDatetimeHeader; const G = function (l, d, f) { if (c.columnHeaderFormatter) { const h = c.columnHeaderFormatter(l, d, f); if (!1 !== h) return h } return l ? l instanceof a ? l.options.title && l.options.title.text || (l.dateTime ? x : A) : b ? { columnTitle: f > 1 ? d : l.name, topLevelColumnTitle: l.name } : l.name + (f > 1 ? ' (' + d + ')' : '') : A }; const H = function (l, a, b) {
        const d = {}; const f = {}; a.forEach(function (a) {
          let c = (l.keyToAxis && l.keyToAxis[a] || a) + 'Axis'; c = L(b) ? l.chart[c][b] : l[c]
          d[a] = c && c.categories || []; f[a] = c && c.dateTime
        }); return { categoryMap: d, dateTimeValueAxisMap: f }
      }; const y = function (a, b) { return a.data.filter(function (a) { return typeof a.y !== 'undefined' && a.name }).length && b && !b.categories && !a.keyToAxis ? a.pointArrayMap && a.pointArrayMap.filter(function (a) { return a === 'x' }).length ? (a.pointArrayMap.unshift('x'), a.pointArrayMap) : ['x', 'y'] : a.pointArrayMap || ['y'] }; const h = []; let z = 0; this.setUpKeyToAxis(); this.series.forEach(function (a) {
        const x = a.xAxis; const l = a.options.keys || y(a, x); const g = l.length; const m = !a.requireSorting &&
{}; const C = e.indexOf(x); let A = H(a, l); let k; if (!1 !== a.options.includeInDataExport && !a.options.isInternal && !1 !== a.visible) {
          E(h, function (a) { return a[0] === C }) || h.push([C, z]); for (k = 0; k < g;)r = G(a, l[k], l.length), n.push(r.columnTitle || r), b && p.push(r.topLevelColumnTitle || r), k++; const t = { chart: a.chart, autoIncrement: a.autoIncrement, options: a.options, pointArrayMap: a.pointArrayMap }; a.options.data.forEach(function (b, h) {
            d && (A = H(a, l, h)); const y = { series: t }; a.pointClass.prototype.applyOptions.apply(y, [b]); b = y.x; let e = a.data[h] && a.data[h].name
            k = 0; if (!x || a.exportKey === 'name' || !d && x && x.hasNames && e)b = e; m && (m[b] && (b += '|' + h), m[b] = !0); q[b] || (q[b] = [], q[b].xValues = []); q[b].x = y.x; q[b].name = e; for (q[b].xValues[C] = y.x; k < g;)h = l[k], e = y[h], q[b][z + k] = w(A.categoryMap[h][e], A.dateTimeValueAxisMap[h] ? f.dateFormat(c.dateFormat, e) : null, e), k++
          }); z += k
        }
      }); for (m in q)Object.hasOwnProperty.call(q, m) && g.push(q[m]); var m = b ? [p, n] : [n]; for (z = h.length; z--;) {
        var u = h[z][0]; var v = h[z][1]; var B = e[u]; g.sort(function (a, b) { return a.xValues[u] - b.xValues[u] }); t = G(B); m[0].splice(v,
          0, t); b && m[1] && m[1].splice(v, 0, t); g.forEach(function (a) { let b = a.name; B && !I(b) && (B.dateTime ? (a.x instanceof Date && (a.x = a.x.getTime()), b = f.dateFormat(c.dateFormat, a.x)) : b = B.categories ? w(B.names[a.x], B.categories[a.x], a.x) : a.x); a.splice(v, 0, b) })
      }m = m.concat(g); D(this, 'exportData', { dataRows: m }); return m
    }; d.prototype.getCSV = function (a) {
      let b = ''; const d = this.getDataRows(); const c = this.options.exporting.csv; const f = w(c.decimalPoint, c.itemDelimiter !== ',' && a ? (1.1).toLocaleString()[1] : '.'); const e = w(c.itemDelimiter, f === ',' ? ';' : ',')
      const g = c.lineDelimiter; d.forEach(function (a, c) { for (var k, q = a.length; q--;)k = a[q], typeof k === 'string' && (k = '"' + k + '"'), typeof k === 'number' && f !== '.' && (k = k.toString().replace('.', f)), a[q] = k; b += a.join(e); c < d.length - 1 && (b += g) }); return b
    }; d.prototype.getTable = function (a) {
      let b = '<table id="highcharts-data-table-' + this.index + '">'; const c = this.options; const d = a ? (1.1).toLocaleString()[1] : '.'; const f = w(c.exporting.useMultiLevelHeaders, !0); a = this.getDataRows(f); let e = 0; const g = f ? a.shift() : null; const p = a.shift(); const n = function (a, b, c, f) {
        let e = w(f, '')
        b = 'text' + (b ? ' ' + b : ''); typeof e === 'number' ? (e = e.toString(), d === ',' && (e = e.replace('.', d)), b = 'number') : f || (b = 'empty'); return '<' + a + (c ? ' ' + c : '') + ' class="' + b + '">' + e + '</' + a + '>'
      }; !1 !== c.exporting.tableCaption && (b += '<caption class="highcharts-table-caption">' + w(c.exporting.tableCaption, c.title.text ? c.title.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;') : 'Chart') + '</caption>'); for (let r = 0, t = a.length; r < t; ++r) {
        a[r].length >
e && (e = a[r].length)
      }b += (function (a, b, d) {
        let e = '<thead>'; let g = 0; d = d || b && b.length; let h; let k = 0; if (h = f && a && b) { a:if (h = a.length, b.length === h) { for (;h--;) if (a[h] !== b[h]) { h = !1; break a }h = !0 } else h = !1; h = !h } if (h) {
          for (e += '<tr>'; g < d; ++g) {
            h = a[g]; let m = a[g + 1]; h === m
              ? ++k
              : k
                ? (e += n('th', 'highcharts-table-topheading', 'scope="col" colspan="' + (k + 1) + '"', h), k = 0)
                : (h === b[g] ? c.exporting.useRowspanHeaders ? (m = 2, delete b[g]) : (m = 1, b[g] = '') : m = 1, e += n('th', 'highcharts-table-topheading', 'scope="col"' + (m > 1 ? ' valign="top" rowspan="' + m + '"' : ''),
                    h))
          }e += '</tr>'
        } if (b) { e += '<tr>'; g = 0; for (d = b.length; g < d; ++g) typeof b[g] !== 'undefined' && (e += n('th', null, 'scope="col"', b[g])); e += '</tr>' } return e + '</thead>'
      }(g, p, Math.max(e, p.length))); b += '<tbody>'; a.forEach(function (a) { b += '<tr>'; for (let c = 0; c < e; c++)b += n(c ? 'td' : 'th', null, c ? '' : 'scope="row"', a[c]); b += '</tr>' }); b += '</tbody></table>'; a = { html: b }; D(this, 'afterGetTable', a); return a.html
    }; d.prototype.downloadCSV = function () {
      const a = this.getCSV(!0); F(u(a, 'text/csv') || 'data:text/csv,\ufeff' + encodeURIComponent(a), this.getFilename() +
'.csv')
    }; d.prototype.downloadXLS = function () {
      const a = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' +
this.getTable(!0) + '</body></html>'; F(u(a, 'application/vnd.ms-excel') || 'data:application/vnd.ms-excel;base64,' + p.btoa(unescape(encodeURIComponent(a))), this.getFilename() + '.xls')
    }; d.prototype.viewData = function () {
      this.dataTableDiv || (this.dataTableDiv = v.createElement('div'), this.dataTableDiv.className = 'highcharts-data-table', this.renderTo.parentNode.insertBefore(this.dataTableDiv, this.renderTo.nextSibling), this.dataTableDiv.innerHTML = this.getTable()); if (this.dataTableDiv.style.display === '' || this.dataTableDiv.style.display ===
'none') this.dataTableDiv.style.display = 'block'; this.isDataTableVisible = !0; D(this, 'afterViewData', this.dataTableDiv)
    }; d.prototype.hideData = function () { this.dataTableDiv && this.dataTableDiv.style.display === 'block' && (this.dataTableDiv.style.display = 'none'); this.isDataTableVisible = !1 }; d.prototype.toggleDataTable = function () {
      let a; const c = this.exportDivElements; const d = (a = n === null || void 0 === n ? void 0 : n.buttons) === null || void 0 === a ? void 0 : a.contextButton.menuItems; a = this.options.lang; this.isDataTableVisible
        ? this.hideData()
        : this.viewData(); (n === null || void 0 === n ? 0 : n.menuItemDefinitions) && (a === null || void 0 === a ? 0 : a.viewData) && a.hideData && d && c && c.length && (c[d.indexOf('viewData')].innerHTML = this.isDataTableVisible ? a.hideData : a.viewData)
    }; var n = K().exporting; n && (J(n.menuItemDefinitions, { downloadCSV: { textKey: 'downloadCSV', onclick: function () { this.downloadCSV() } }, downloadXLS: { textKey: 'downloadXLS', onclick: function () { this.downloadXLS() } }, viewData: { textKey: 'viewData', onclick: function () { this.toggleDataTable() } } }),
    n.buttons && n.buttons.contextButton.menuItems.push('separator', 'downloadCSV', 'downloadXLS', 'viewData')); f.map && (f.map.prototype.exportKey = 'name'); f.mapbubble && (f.mapbubble.prototype.exportKey = 'name'); f.treemap && (f.treemap.prototype.exportKey = 'name')
  }); g(a, 'masters/modules/export-data.src.js', [], function () {})
})
// # sourceMappingURL=export-data.js.map
