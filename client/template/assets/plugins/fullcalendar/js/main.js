/*!
FullCalendar v5.3.2
Docs & License: https://fullcalendar.io/
(c) 2020 Adam Shaw
*/
const FullCalendar = (function (exports) {
  'use strict'

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  /* global Reflect, Promise */

  let extendStatics = function (d, b) {
    extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (d, b) {
          d.__proto__ = b
        }) ||
      function (d, b) {
        for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
      }
    return extendStatics(d, b)
  }

  function __extends (d, b) {
    extendStatics(d, b)

    function __ () {
      this.constructor = d
    }

    d.prototype =
      b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
  }

  let __assign = function () {
    __assign =
      Object.assign ||
      function __assign (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (const p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p] }
        }
        return t
      }
    return __assign.apply(this, arguments)
  }

  function __spreadArrays () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) { s += arguments[i].length }
    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (let a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) { r[k] = a[j] }
    }
    return r
  }

  let n
  let u
  let i
  let t
  let r
  let o
  let f
  const e = {}
  const c = []
  const s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i

  function a (n, l) {
    for (const u in l) n[u] = l[u]
    return n
  }

  function v (n) {
    const l = n.parentNode
    l && l.removeChild(n)
  }

  function h (n, l, u) {
    let i
    const t = arguments
    const r = {}
    for (i in l) i !== 'key' && i !== 'ref' && (r[i] = l[i])
    if (arguments.length > 3) { for (u = [u], i = 3; i < arguments.length; i++) u.push(t[i]) }
    if (
      (u != null && (r.children = u),
      typeof n === 'function' && n.defaultProps != null)
    ) { for (i in n.defaultProps) void 0 === r[i] && (r[i] = n.defaultProps[i]) }
    return p(n, r, l && l.key, l && l.ref, null)
  }

  function p (l, u, i, t, r) {
    const o = {
      type: l,
      props: u,
      key: i,
      ref: t,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      constructor: void 0,
      __v: r
    }
    return r == null && (o.__v = o), n.vnode && n.vnode(o), o
  }

  function y () {
    return {}
  }

  function d (n) {
    return n.children
  }

  function m (n, l) {
    (this.props = n), (this.context = l)
  }

  function w (n, l) {
    if (l == null) return n.__ ? w(n.__, n.__.__k.indexOf(n) + 1) : null
    for (var u; l < n.__k.length; l++) { if ((u = n.__k[l]) != null && u.__e != null) return u.__e }
    return typeof n.type === 'function' ? w(n) : null
  }

  function k (n) {
    let l, u
    if ((n = n.__) != null && n.__c != null) {
      for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
        if ((u = n.__k[l]) != null && u.__e != null) {
          n.__e = n.__c.base = u.__e
          break
        }
      }
      return k(n)
    }
  }

  function g (l) {
    ((!l.__d && (l.__d = !0) && u.push(l) && !i++) ||
      r !== n.debounceRendering) &&
      ((r = n.debounceRendering) || t)(_)
  }

  function _ () {
    for (var n; (i = u.length);) {
      (n = u.sort(function (n, l) {
        return n.__v.__b - l.__v.__b
      })),
      (u = []),
      n.some(function (n) {
        let l, u, i, t, r, o, f
        n.__d &&
            ((o = (r = (l = n).__v).__e),
            (f = l.__P) &&
              ((u = []),
              ((i = a({}, r)).__v = i),
              (t = A(
                f,
                r,
                i,
                l.__n,
                void 0 !== f.ownerSVGElement,
                null,
                u,
                o == null ? w(r) : o
              )),
              T(u, r),
              t != o && k(r)))
      })
    }
  }

  function b (n, l, u, i, t, r, o, f, s) {
    let a
    let h
    let p
    let y
    let d
    let m
    let k
    const g = (u && u.__k) || c
    const _ = g.length
    if (
      (f == e && (f = r != null ? r[0] : _ ? w(u, 0) : null),
      (a = 0),
      (l.__k = x(l.__k, function (u) {
        if (u != null) {
          if (
            ((u.__ = l),
            (u.__b = l.__b + 1),
            (p = g[a]) === null || (p && u.key == p.key && u.type === p.type))
          ) { g[a] = void 0 } else {
            for (h = 0; h < _; h++) {
              if ((p = g[h]) && u.key == p.key && u.type === p.type) {
                g[h] = void 0
                break
              }
              p = null
            }
          }
          if (
            ((y = A(n, u, (p = p || e), i, t, r, o, f, s)),
            (h = u.ref) &&
              p.ref != h &&
              (k || (k = []),
              p.ref && k.push(p.ref, null, u),
              k.push(h, u.__c || y, u)),
            y != null)
          ) {
            let c
            if ((m == null && (m = y), void 0 !== u.__d)) { (c = u.__d), (u.__d = void 0) } else if (r == p || y != f || y.parentNode == null) {
              n: if (f == null || f.parentNode !== n) { n.appendChild(y), (c = null) } else {
                for (d = f, h = 0; (d = d.nextSibling) && h < _; h += 2) { if (d == y) break n }
                n.insertBefore(y, f), (c = f)
              }
              l.type == 'option' && (n.value = '')
            }
            (f = void 0 !== c ? c : y.nextSibling),
            typeof l.type === 'function' && (l.__d = f)
          } else f && p.__e == f && f.parentNode != n && (f = w(p))
        }
        return a++, u
      })),
      (l.__e = m),
      r != null && typeof l.type !== 'function')
    ) { for (a = r.length; a--;) r[a] != null && v(r[a]) }
    for (a = _; a--;) g[a] != null && D(g[a], g[a])
    if (k) for (a = 0; a < k.length; a++) j(k[a], k[++a], k[++a])
  }

  function x (n, l, u) {
    if ((u == null && (u = []), n == null || typeof n === 'boolean')) { l && u.push(l(null)) } else if (Array.isArray(n)) for (let i = 0; i < n.length; i++) x(n[i], l, u)
    else {
      u.push(
        l
          ? l(
            typeof n === 'string' || typeof n === 'number'
              ? p(null, n, null, null, n)
              : n.__e != null || n.__c != null
                ? p(n.type, n.props, n.key, null, n.__v)
                : n
          )
          : n
      )
    }
    return u
  }

  function P (n, l, u, i, t) {
    let r
    for (r in u) { r === 'children' || r === 'key' || r in l || N(n, r, null, u[r], i) }
    for (r in l) {
      (t && typeof l[r] !== 'function') ||
        r === 'children' ||
        r === 'key' ||
        r === 'value' ||
        r === 'checked' ||
        u[r] === l[r] ||
        N(n, r, l[r], u[r], i)
    }
  }

  function C (n, l, u) {
    l[0] === '-'
      ? n.setProperty(l, u)
      : (n[l] =
          typeof u === 'number' && !1 === s.test(l)
            ? u + 'px'
            : u == null
              ? ''
              : u)
  }

  function N (n, l, u, i, t) {
    let r, o, f, e, c
    if (
      (t
        ? l === 'className' && (l = 'class')
        : l === 'class' && (l = 'className'),
      l === 'style')
    ) {
      if (((r = n.style), typeof u === 'string')) r.cssText = u
      else {
        if ((typeof i === 'string' && ((r.cssText = ''), (i = null)), i)) { for (e in i) (u && e in u) || C(r, e, '') }
        if (u) for (c in u) (i && u[c] === i[c]) || C(r, c, u[c])
      }
    } else {
      l[0] === 'o' && l[1] === 'n'
        ? ((o = l !== (l = l.replace(/Capture$/, ''))),
          (f = l.toLowerCase()),
          (l = (f in n ? f : l).slice(2)),
          u
            ? (i || n.addEventListener(l, z, o), ((n.l || (n.l = {}))[l] = u))
            : n.removeEventListener(l, z, o))
        : l !== 'list' &&
          l !== 'tagName' &&
          l !== 'form' &&
          l !== 'type' &&
          l !== 'size' &&
          !t &&
          l in n
          ? (n[l] = u == null ? '' : u)
          : typeof u !== 'function' &&
          l !== 'dangerouslySetInnerHTML' &&
          (l !== (l = l.replace(/^xlink:?/, ''))
            ? u == null || !1 === u
              ? n.removeAttributeNS(
                'http://www.w3.org/1999/xlink',
                l.toLowerCase()
              )
              : n.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                l.toLowerCase(),
                u
              )
            : u == null || (!1 === u && !/^ar/.test(l))
              ? n.removeAttribute(l)
              : n.setAttribute(l, u))
    }
  }

  function z (l) {
    this.l[l.type](n.event ? n.event(l) : l)
  }

  function A (l, u, i, t, r, o, f, e, c) {
    let s
    let v
    let h
    let p
    let y
    let w
    let k
    let g
    let _
    let x
    const P = u.type
    if (void 0 !== u.constructor) return null;
    (s = n.__b) && s(u)
    try {
      n: if (typeof P === 'function') {
        if (
          ((g = u.props),
          (_ = (s = P.contextType) && t[s.__c]),
          (x = s ? (_ ? _.props.value : s.__) : t),
          i.__c
            ? (k = (v = u.__c = i.__c).__ = v.__E)
            : ('prototype' in P && P.prototype.render
                ? (u.__c = v = new P(g, x))
                : ((u.__c = v = new m(g, x)),
                  (v.constructor = P),
                  (v.render = E)),
              _ && _.sub(v),
              (v.props = g),
              v.state || (v.state = {}),
              (v.context = x),
              (v.__n = t),
              (h = v.__d = !0),
              (v.__h = [])),
          v.__s == null && (v.__s = v.state),
          P.getDerivedStateFromProps != null &&
            (v.__s == v.state && (v.__s = a({}, v.__s)),
            a(v.__s, P.getDerivedStateFromProps(g, v.__s))),
          (p = v.props),
          (y = v.state),
          h)
        ) {
          P.getDerivedStateFromProps == null &&
            v.componentWillMount != null &&
            v.componentWillMount(),
          v.componentDidMount != null && v.__h.push(v.componentDidMount)
        } else {
          if (
            (P.getDerivedStateFromProps == null &&
              g !== p &&
              v.componentWillReceiveProps != null &&
              v.componentWillReceiveProps(g, x),
            (!v.__e &&
              v.shouldComponentUpdate != null &&
              !1 === v.shouldComponentUpdate(g, v.__s, x)) ||
              (u.__v === i.__v && !v.__))
          ) {
            for (
              v.props = g,
              v.state = v.__s,
              u.__v !== i.__v && (v.__d = !1),
              v.__v = u,
              u.__e = i.__e,
              u.__k = i.__k,
              v.__h.length && f.push(v),
              s = 0;
              s < u.__k.length;
              s++
            ) { u.__k[s] && (u.__k[s].__ = u) }
            break n
          }
          v.componentWillUpdate != null && v.componentWillUpdate(g, v.__s, x),
          v.componentDidUpdate != null &&
              v.__h.push(function () {
                v.componentDidUpdate(p, y, w)
              })
        }
        (v.context = x),
        (v.props = g),
        (v.state = v.__s),
        (s = n.__r) && s(u),
        (v.__d = !1),
        (v.__v = u),
        (v.__P = l),
        (s = v.render(v.props, v.state, v.context)),
        (u.__k =
            s != null && s.type == d && s.key == null
              ? s.props.children
              : Array.isArray(s)
                ? s
                : [s]),
        v.getChildContext != null && (t = a(a({}, t), v.getChildContext())),
        h ||
            v.getSnapshotBeforeUpdate == null ||
            (w = v.getSnapshotBeforeUpdate(p, y)),
        b(l, u, i, t, r, o, f, e, c),
        (v.base = u.__e),
        v.__h.length && f.push(v),
        k && (v.__E = v.__ = null),
        (v.__e = !1)
      } else {
        o == null && u.__v === i.__v
          ? ((u.__k = i.__k), (u.__e = i.__e))
          : (u.__e = $(i.__e, u, i, t, r, o, f, c))
      }
      (s = n.diffed) && s(u)
    } catch (l) {
      (u.__v = null), n.__e(l, u, i)
    }
    return u.__e
  }

  function T (l, u) {
    n.__c && n.__c(u, l),
    l.some(function (u) {
      try {
        (l = u.__h),
        (u.__h = []),
        l.some(function (n) {
          n.call(u)
        })
      } catch (l) {
        n.__e(l, u.__v)
      }
    })
  }

  function $ (n, l, u, i, t, r, o, f) {
    let s
    let a
    let v
    let h
    let p
    let y = u.props
    const d = l.props
    if (((t = l.type === 'svg' || t), r != null)) {
      for (s = 0; s < r.length; s++) {
        if (
          (a = r[s]) != null &&
          ((l.type === null ? a.nodeType === 3 : a.localName === l.type) ||
            n == a)
        ) {
          (n = a), (r[s] = null)
          break
        }
      }
    }
    if (n == null) {
      if (l.type === null) return document.createTextNode(d);
      (n = t
        ? document.createElementNS('http://www.w3.org/2000/svg', l.type)
        : document.createElement(l.type, d.is && { is: d.is })),
      (r = null),
      (f = !1)
    }
    if (l.type === null) y !== d && n.data != d && (n.data = d)
    else {
      if (
        (r != null && (r = c.slice.call(n.childNodes)),
        (v = (y = u.props || e).dangerouslySetInnerHTML),
        (h = d.dangerouslySetInnerHTML),
        !f)
      ) {
        if (y === e) {
          for (y = {}, p = 0; p < n.attributes.length; p++) { y[n.attributes[p].name] = n.attributes[p].value }
        }
        (h || v) &&
          ((h && v && h.__html == v.__html) ||
            (n.innerHTML = (h && h.__html) || ''))
      }
      P(n, d, y, t, f),
      h
        ? (l.__k = [])
        : ((l.__k = l.props.children),
          b(n, l, u, i, l.type !== 'foreignObject' && t, r, o, e, f)),
      f ||
          ('value' in d &&
            void 0 !== (s = d.value) &&
            s !== n.value &&
            N(n, 'value', s, y.value, !1),
          'checked' in d &&
            void 0 !== (s = d.checked) &&
            s !== n.checked &&
            N(n, 'checked', s, y.checked, !1))
    }
    return n
  }

  function j (l, u, i) {
    try {
      typeof l === 'function' ? l(u) : (l.current = u)
    } catch (l) {
      n.__e(l, i)
    }
  }

  function D (l, u, i) {
    let t, r, o
    if (
      (n.unmount && n.unmount(l),
      (t = l.ref) && ((t.current && t.current !== l.__e) || j(t, null, u)),
      i || typeof l.type === 'function' || (i = (r = l.__e) != null),
      (l.__e = l.__d = void 0),
      (t = l.__c) != null)
    ) {
      if (t.componentWillUnmount) {
        try {
          t.componentWillUnmount()
        } catch (l) {
          n.__e(l, u)
        }
      }
      t.base = t.__P = null
    }
    if ((t = l.__k)) for (o = 0; o < t.length; o++) t[o] && D(t[o], u, i)
    r != null && v(r)
  }

  function E (n, l, u) {
    return this.constructor(n, u)
  }

  function H (l, u, i) {
    let t, r, f
    n.__ && n.__(l, u),
    (r = (t = i === o) ? null : (i && i.__k) || u.__k),
    (l = h(d, null, [l])),
    (f = []),
    A(
      u,
      ((t ? u : i || u).__k = l),
      r || e,
      e,
      void 0 !== u.ownerSVGElement,
      i && !t ? [i] : r ? null : c.slice.call(u.childNodes),
      f,
      i || e,
      t
    ),
    T(f, l)
  }

  function M (n) {
    const l = {}
    var u = {
      __c: '__cC' + f++,
      __: n,
      Consumer: function (n, l) {
        return n.children(l)
      },
      Provider: function (n) {
        let i
        const t = this
        return (
          this.getChildContext ||
              ((i = []),
              (this.getChildContext = function () {
                return (l[u.__c] = t), l
              }),
              (this.shouldComponentUpdate = function (n) {
                t.props.value !== n.value &&
                  i.some(function (l) {
                    (l.context = n.value), g(l)
                  })
              }),
              (this.sub = function (n) {
                i.push(n)
                const l = n.componentWillUnmount
                n.componentWillUnmount = function () {
                  i.splice(i.indexOf(n), 1), l && l.call(n)
                }
              })),
          n.children
        )
      }
    }
    return (u.Consumer.contextType = u), (u.Provider.__ = u), u
  }

  (n = {
    __e: function (n, l) {
      for (var u, i; (l = l.__);) {
        if ((u = l.__c) && !u.__) {
          try {
            if (
              (u.constructor &&
                u.constructor.getDerivedStateFromError != null &&
                ((i = !0),
                u.setState(u.constructor.getDerivedStateFromError(n))),
              u.componentDidCatch != null && ((i = !0), u.componentDidCatch(n)),
              i)
            ) { return g((u.__E = u)) }
          } catch (l) {
            n = l
          }
        }
      }
      throw n
    }
  }),
  (m.prototype.setState = function (n, l) {
    let u;
    (u = this.__s !== this.state ? this.__s : (this.__s = a({}, this.state))),
    typeof n === 'function' && (n = n(u, this.props)),
    n && a(u, n),
    n != null && this.__v && (l && this.__h.push(l), g(this))
  }),
  (m.prototype.forceUpdate = function (n) {
    this.__v && ((this.__e = !0), n && this.__h.push(n), g(this))
  }),
  (m.prototype.render = d),
  (u = []),
  (i = 0),
  (t =
      typeof Promise === 'function'
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout),
  (o = e),
  (f = 0);

  (typeof globalThis !== 'undefined' ? globalThis : window).FullCalendarVDom = {
    Component: m,
    createElement: h,
    render: H,
    createRef: y,
    Fragment: d,
    createContext,
    flushToDom
  }
  // HACKS...
  // TODO: lock version
  // TODO: link gh issues
  function flushToDom () {
    const oldDebounceRendering = n.debounceRendering // orig
    const callbackQ = []

    function execCallbackSync (callback) {
      callbackQ.push(callback)
    }

    n.debounceRendering = execCallbackSync
    H(h(FakeComponent, {}), document.createElement('div'))
    while (callbackQ.length) {
      callbackQ.shift()()
    }
    n.debounceRendering = oldDebounceRendering
  }

  var FakeComponent = /** @class */ (function (_super) {
    __extends(FakeComponent, _super)

    function FakeComponent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    FakeComponent.prototype.render = function () {
      return h('div', {})
    }
    FakeComponent.prototype.componentDidMount = function () {
      this.setState({})
    }
    return FakeComponent
  })(m)

  function createContext (defaultValue) {
    const ContextType = M(defaultValue)
    const origProvider = ContextType.Provider
    ContextType.Provider = function () {
      const _this = this
      const isNew = !this.getChildContext
      const children = origProvider.apply(this, arguments)
      if (isNew) {
        const subs_1 = []
        this.shouldComponentUpdate = function (_props) {
          if (_this.props.value !== _props.value) {
            subs_1.some(function (c) {
              c.context = _props.value
              c.forceUpdate()
            })
          }
        }
        this.sub = function (c) {
          subs_1.push(c)
          const old = c.componentWillUnmount
          c.componentWillUnmount = function () {
            subs_1.splice(subs_1.indexOf(c), 1)
            old && old.call(c)
          }
        }
      }
      return children
    }
    return ContextType
  }

  // no public types yet. when there are, export from:
  // import {} from './api-type-deps'
  const EventSourceApi = /** @class */ (function () {
    function EventSourceApi (
      context,
      internalEventSource // rename?
    ) {
      this.context = context
      this.internalEventSource = internalEventSource
    }

    EventSourceApi.prototype.remove = function () {
      this.context.dispatch({
        type: 'REMOVE_EVENT_SOURCE',
        sourceId: this.internalEventSource.sourceId
      })
    }
    EventSourceApi.prototype.refetch = function () {
      this.context.dispatch({
        type: 'FETCH_EVENT_SOURCES',
        sourceIds: [this.internalEventSource.sourceId]
      })
    }
    Object.defineProperty(EventSourceApi.prototype, 'id', {
      get: function () {
        return this.internalEventSource.publicId
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventSourceApi.prototype, 'url', {
      // only relevant to json-feed event sources
      get: function () {
        return this.internalEventSource.meta.url
      },
      enumerable: false,
      configurable: true
    })
    return EventSourceApi
  })()

  function removeElement (el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    }
  }

  // Querying
  // ----------------------------------------------------------------------------------------------------------------
  function elementClosest (el, selector) {
    if (el.closest) {
      return el.closest(selector)
      // really bad fallback for IE
      // from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    } else {
      if (!document.documentElement.contains(el)) {
        return null
      }
      do {
        if (elementMatches(el, selector)) {
          return el
        }
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
  }

  function elementMatches (el, selector) {
    const method = el.matches || el.matchesSelector || el.msMatchesSelector
    return method.call(el, selector)
  }

  // accepts multiple subject els
  // returns a real array. good for methods like forEach
  // TODO: accept the document
  function findElements (container, selector) {
    const containers = container instanceof HTMLElement ? [container] : container
    const allMatches = []
    for (let i = 0; i < containers.length; i++) {
      const matches = containers[i].querySelectorAll(selector)
      for (let j = 0; j < matches.length; j++) {
        allMatches.push(matches[j])
      }
    }
    return allMatches
  }

  // accepts multiple subject els
  // only queries direct child elements // TODO: rename to findDirectChildren!
  function findDirectChildren (parent, selector) {
    const parents = parent instanceof HTMLElement ? [parent] : parent
    const allMatches = []
    for (let i = 0; i < parents.length; i++) {
      const childNodes = parents[i].children // only ever elements
      for (let j = 0; j < childNodes.length; j++) {
        const childNode = childNodes[j]
        if (!selector || elementMatches(childNode, selector)) {
          allMatches.push(childNode)
        }
      }
    }
    return allMatches
  }

  // Style
  // ----------------------------------------------------------------------------------------------------------------
  const PIXEL_PROP_RE = /(top|left|right|bottom|width|height)$/i

  function applyStyle (el, props) {
    for (const propName in props) {
      applyStyleProp(el, propName, props[propName])
    }
  }

  function applyStyleProp (el, name, val) {
    if (val == null) {
      el.style[name] = ''
    } else if (typeof val === 'number' && PIXEL_PROP_RE.test(name)) {
      el.style[name] = val + 'px'
    } else {
      el.style[name] = val
    }
  }

  // Stops a mouse/touch event from doing it's native browser action
  function preventDefault (ev) {
    ev.preventDefault()
  }

  // Event Delegation
  // ----------------------------------------------------------------------------------------------------------------
  function buildDelegationHandler (selector, handler) {
    return function (ev) {
      const matchedChild = elementClosest(ev.target, selector)
      if (matchedChild) {
        handler.call(matchedChild, ev, matchedChild)
      }
    }
  }

  function listenBySelector (container, eventType, selector, handler) {
    const attachedHandler = buildDelegationHandler(selector, handler)
    container.addEventListener(eventType, attachedHandler)
    return function () {
      container.removeEventListener(eventType, attachedHandler)
    }
  }

  function listenToHoverBySelector (
    container,
    selector,
    onMouseEnter,
    onMouseLeave
  ) {
    let currentMatchedChild
    return listenBySelector(
      container,
      'mouseover',
      selector,
      function (ev, matchedChild) {
        if (matchedChild !== currentMatchedChild) {
          currentMatchedChild = matchedChild
          onMouseEnter(ev, matchedChild)
          const realOnMouseLeave_1 = function (ev) {
            currentMatchedChild = null
            onMouseLeave(ev, matchedChild)
            matchedChild.removeEventListener('mouseleave', realOnMouseLeave_1)
          }
          // listen to the next mouseleave, and then unattach
          matchedChild.addEventListener('mouseleave', realOnMouseLeave_1)
        }
      }
    )
  }

  // Animation
  // ----------------------------------------------------------------------------------------------------------------
  const transitionEventNames = [
    'webkitTransitionEnd',
    'otransitionend',
    'oTransitionEnd',
    'msTransitionEnd',
    'transitionend'
  ]

  // triggered only when the next single subsequent transition finishes
  function whenTransitionDone (el, callback) {
    const realCallback = function (ev) {
      callback(ev)
      transitionEventNames.forEach(function (eventName) {
        el.removeEventListener(eventName, realCallback)
      })
    }
    transitionEventNames.forEach(function (eventName) {
      el.addEventListener(eventName, realCallback) // cross-browser way to determine when the transition finishes
    })
  }

  let guidNumber = 0

  function guid () {
    return String(guidNumber++)
  }

  /* FullCalendar-specific DOM Utilities
    ---------------------------------------------------------------------------------------------------------------------- */

  // Make the mouse cursor express that an event is not allowed in the current area
  function disableCursor () {
    document.body.classList.add('fc-not-allowed')
  }

  // Returns the mouse cursor to its original look
  function enableCursor () {
    document.body.classList.remove('fc-not-allowed')
  }

  /* Selection
    ---------------------------------------------------------------------------------------------------------------------- */
  function preventSelection (el) {
    el.classList.add('fc-unselectable')
    el.addEventListener('selectstart', preventDefault)
  }

  function allowSelection (el) {
    el.classList.remove('fc-unselectable')
    el.removeEventListener('selectstart', preventDefault)
  }

  /* Context Menu
    ---------------------------------------------------------------------------------------------------------------------- */
  function preventContextMenu (el) {
    el.addEventListener('contextmenu', preventDefault)
  }

  function allowContextMenu (el) {
    el.removeEventListener('contextmenu', preventDefault)
  }

  function parseFieldSpecs (input) {
    const specs = []
    let tokens = []
    let i
    let token
    if (typeof input === 'string') {
      tokens = input.split(/\s*,\s*/)
    } else if (typeof input === 'function') {
      tokens = [input]
    } else if (Array.isArray(input)) {
      tokens = input
    }
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i]
      if (typeof token === 'string') {
        specs.push(
          token.charAt(0) === '-'
            ? { field: token.substring(1), order: -1 }
            : { field: token, order: 1 }
        )
      } else if (typeof token === 'function') {
        specs.push({ func: token })
      }
    }
    return specs
  }

  function compareByFieldSpecs (obj0, obj1, fieldSpecs) {
    let i
    let cmp
    for (i = 0; i < fieldSpecs.length; i++) {
      cmp = compareByFieldSpec(obj0, obj1, fieldSpecs[i])
      if (cmp) {
        return cmp
      }
    }
    return 0
  }

  function compareByFieldSpec (obj0, obj1, fieldSpec) {
    if (fieldSpec.func) {
      return fieldSpec.func(obj0, obj1)
    }
    return (
      flexibleCompare(obj0[fieldSpec.field], obj1[fieldSpec.field]) *
      (fieldSpec.order || 1)
    )
  }

  function flexibleCompare (a, b) {
    if (!a && !b) {
      return 0
    }
    if (b == null) {
      return -1
    }
    if (a == null) {
      return 1
    }
    if (typeof a === 'string' || typeof b === 'string') {
      return String(a).localeCompare(String(b))
    }
    return a - b
  }

  /* String Utilities
    ---------------------------------------------------------------------------------------------------------------------- */
  function padStart (val, len) {
    const s = String(val)
    return '000'.substr(0, len - s.length) + s
  }

  /* Number Utilities
    ---------------------------------------------------------------------------------------------------------------------- */
  function compareNumbers (a, b) {
    return a - b
  }

  function isInt (n) {
    return n % 1 === 0
  }

  /* FC-specific DOM dimension stuff
    ---------------------------------------------------------------------------------------------------------------------- */
  function computeSmallestCellWidth (cellEl) {
    const allWidthEl = cellEl.querySelector('.fc-scrollgrid-shrink-frame')
    const contentWidthEl = cellEl.querySelector('.fc-scrollgrid-shrink-cushion')
    if (!allWidthEl) {
      throw new Error('needs fc-scrollgrid-shrink-frame className') // TODO: use const
    }
    if (!contentWidthEl) {
      throw new Error('needs fc-scrollgrid-shrink-cushion className')
    }
    return (
      cellEl.getBoundingClientRect().width -
      allWidthEl.getBoundingClientRect().width + // the cell padding+border
      contentWidthEl.getBoundingClientRect().width
    )
  }

  const DAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  // Adding
  function addWeeks (m, n) {
    const a = dateToUtcArray(m)
    a[2] += n * 7
    return arrayToUtcDate(a)
  }

  function addDays (m, n) {
    const a = dateToUtcArray(m)
    a[2] += n
    return arrayToUtcDate(a)
  }

  function addMs (m, n) {
    const a = dateToUtcArray(m)
    a[6] += n
    return arrayToUtcDate(a)
  }

  // Diffing (all return floats)
  // TODO: why not use ranges?
  function diffWeeks (m0, m1) {
    return diffDays(m0, m1) / 7
  }

  function diffDays (m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60 * 24)
  }

  function diffHours (m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60)
  }

  function diffMinutes (m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / (1000 * 60)
  }

  function diffSeconds (m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / 1000
  }

  function diffDayAndTime (m0, m1) {
    const m0day = startOfDay(m0)
    const m1day = startOfDay(m1)
    return {
      years: 0,
      months: 0,
      days: Math.round(diffDays(m0day, m1day)),
      milliseconds:
        m1.valueOf() - m1day.valueOf() - (m0.valueOf() - m0day.valueOf())
    }
  }

  // Diffing Whole Units
  function diffWholeWeeks (m0, m1) {
    const d = diffWholeDays(m0, m1)
    if (d !== null && d % 7 === 0) {
      return d / 7
    }
    return null
  }

  function diffWholeDays (m0, m1) {
    if (timeAsMs(m0) === timeAsMs(m1)) {
      return Math.round(diffDays(m0, m1))
    }
    return null
  }

  // Start-Of
  function startOfDay (m) {
    return arrayToUtcDate([
      m.getUTCFullYear(),
      m.getUTCMonth(),
      m.getUTCDate()
    ])
  }

  function startOfHour (m) {
    return arrayToUtcDate([
      m.getUTCFullYear(),
      m.getUTCMonth(),
      m.getUTCDate(),
      m.getUTCHours()
    ])
  }

  function startOfMinute (m) {
    return arrayToUtcDate([
      m.getUTCFullYear(),
      m.getUTCMonth(),
      m.getUTCDate(),
      m.getUTCHours(),
      m.getUTCMinutes()
    ])
  }

  function startOfSecond (m) {
    return arrayToUtcDate([
      m.getUTCFullYear(),
      m.getUTCMonth(),
      m.getUTCDate(),
      m.getUTCHours(),
      m.getUTCMinutes(),
      m.getUTCSeconds()
    ])
  }

  // Week Computation
  function weekOfYear (marker, dow, doy) {
    const y = marker.getUTCFullYear()
    const w = weekOfGivenYear(marker, y, dow, doy)
    if (w < 1) {
      return weekOfGivenYear(marker, y - 1, dow, doy)
    }
    const nextW = weekOfGivenYear(marker, y + 1, dow, doy)
    if (nextW >= 1) {
      return Math.min(w, nextW)
    }
    return w
  }

  function weekOfGivenYear (marker, year, dow, doy) {
    const firstWeekStart = arrayToUtcDate([
      year,
      0,
      1 + firstWeekOffset(year, dow, doy)
    ])
    const dayStart = startOfDay(marker)
    const days = Math.round(diffDays(firstWeekStart, dayStart))
    return Math.floor(days / 7) + 1 // zero-indexed
  }

  // start-of-first-week - start-of-year
  function firstWeekOffset (year, dow, doy) {
    // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    const fwd = 7 + dow - doy
    // first-week day local weekday -- which local weekday is fwd
    const fwdlw = (7 + arrayToUtcDate([year, 0, fwd]).getUTCDay() - dow) % 7
    return -fwdlw + fwd - 1
  }

  // Array Conversion
  function dateToLocalArray (date) {
    return [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ]
  }

  function arrayToLocalDate (a) {
    return new Date(
      a[0],
      a[1] || 0,
      a[2] == null ? 1 : a[2], // day of month
      a[3] || 0,
      a[4] || 0,
      a[5] || 0
    )
  }

  function dateToUtcArray (date) {
    return [
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    ]
  }

  function arrayToUtcDate (a) {
    // according to web standards (and Safari), a month index is required.
    // massage if only given a year.
    if (a.length === 1) {
      a = a.concat([0])
    }
    return new Date(Date.UTC.apply(Date, a))
  }

  // Other Utils
  function isValidDate (m) {
    return !isNaN(m.valueOf())
  }

  function timeAsMs (m) {
    return (
      m.getUTCHours() * 1000 * 60 * 60 +
      m.getUTCMinutes() * 1000 * 60 +
      m.getUTCSeconds() * 1000 +
      m.getUTCMilliseconds()
    )
  }

  function createEventInstance (defId, range, forcedStartTzo, forcedEndTzo) {
    return {
      instanceId: guid(),
      defId,
      range,
      forcedStartTzo: forcedStartTzo == null ? null : forcedStartTzo,
      forcedEndTzo: forcedEndTzo == null ? null : forcedEndTzo
    }
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty
  // Merges an array of objects into a single object.
  // The second argument allows for an array of property names who's object values will be merged together.
  function mergeProps (propObjs, complexPropsMap) {
    const dest = {}
    if (complexPropsMap) {
      for (const name_1 in complexPropsMap) {
        const complexObjs = []
        // collect the trailing object values, stopping when a non-object is discovered
        for (var i = propObjs.length - 1; i >= 0; i--) {
          const val = propObjs[i][name_1]
          if (typeof val === 'object' && val) {
            // non-null object
            complexObjs.unshift(val)
          } else if (val !== undefined) {
            dest[name_1] = val // if there were no objects, this value will be used
            break
          }
        }
        // if the trailing values were objects, use the merged value
        if (complexObjs.length) {
          dest[name_1] = mergeProps(complexObjs)
        }
      }
    }
    // copy values into the destination, going from last to first
    for (var i = propObjs.length - 1; i >= 0; i--) {
      const props = propObjs[i]
      for (const name_2 in props) {
        if (!(name_2 in dest)) {
          // if already assigned by previous props or complex props, don't reassign
          dest[name_2] = props[name_2]
        }
      }
    }
    return dest
  }

  function filterHash (hash, func) {
    const filtered = {}
    for (const key in hash) {
      if (func(hash[key], key)) {
        filtered[key] = hash[key]
      }
    }
    return filtered
  }

  function mapHash (hash, func) {
    const newHash = {}
    for (const key in hash) {
      newHash[key] = func(hash[key], key)
    }
    return newHash
  }

  function arrayToHash (a) {
    const hash = {}
    for (let _i = 0, a_1 = a; _i < a_1.length; _i++) {
      const item = a_1[_i]
      hash[item] = true
    }
    return hash
  }

  function buildHashFromArray (a, func) {
    const hash = {}
    for (let i = 0; i < a.length; i++) {
      const tuple = func(a[i], i)
      hash[tuple[0]] = tuple[1]
    }
    return hash
  }

  function hashValuesToArray (obj) {
    const a = []
    for (const key in obj) {
      a.push(obj[key])
    }
    return a
  }

  function isPropsEqual (obj0, obj1) {
    if (obj0 === obj1) {
      return true
    }
    for (var key in obj0) {
      if (hasOwnProperty.call(obj0, key)) {
        if (!(key in obj1)) {
          return false
        }
      }
    }
    for (var key in obj1) {
      if (hasOwnProperty.call(obj1, key)) {
        if (obj0[key] !== obj1[key]) {
          return false
        }
      }
    }
    return true
  }

  function getUnequalProps (obj0, obj1) {
    const keys = []
    for (var key in obj0) {
      if (hasOwnProperty.call(obj0, key)) {
        if (!(key in obj1)) {
          keys.push(key)
        }
      }
    }
    for (var key in obj1) {
      if (hasOwnProperty.call(obj1, key)) {
        if (obj0[key] !== obj1[key]) {
          keys.push(key)
        }
      }
    }
    return keys
  }

  function compareObjs (oldProps, newProps, equalityFuncs) {
    if (equalityFuncs === void 0) {
      equalityFuncs = {}
    }
    if (oldProps === newProps) {
      return true
    }
    for (var key in newProps) {
      if (
        key in oldProps &&
        isObjValsEqual(oldProps[key], newProps[key], equalityFuncs[key])
      );
      else {
        return false
      }
    }
    // check for props that were omitted in the new
    for (var key in oldProps) {
      if (!(key in newProps)) {
        return false
      }
    }
    return true
  }

  /*
    assumed "true" equality for handler names like "onReceiveSomething"
    */
  function isObjValsEqual (val0, val1, comparator) {
    if (val0 === val1 || comparator === true) {
      return true
    }
    if (comparator) {
      return comparator(val0, val1)
    }
    return false
  }

  function collectFromHash (hash, startIndex, endIndex, step) {
    if (startIndex === void 0) {
      startIndex = 0
    }
    if (step === void 0) {
      step = 1
    }
    const res = []
    if (endIndex == null) {
      endIndex = Object.keys(hash).length
    }
    for (let i = startIndex; i < endIndex; i += step) {
      const val = hash[i]
      if (val !== undefined) {
        // will disregard undefined for sparse arrays
        res.push(val)
      }
    }
    return res
  }

  function parseRecurring (refined, defaultAllDay, dateEnv, recurringTypes) {
    for (let i = 0; i < recurringTypes.length; i++) {
      const parsed = recurringTypes[i].parse(refined, dateEnv)
      if (parsed) {
        let allDay = refined.allDay
        if (allDay == null) {
          allDay = defaultAllDay
          if (allDay == null) {
            allDay = parsed.allDayGuess
            if (allDay == null) {
              allDay = false
            }
          }
        }
        return {
          allDay,
          duration: parsed.duration,
          typeData: parsed.typeData,
          typeId: i
        }
      }
    }
    return null
  }

  function expandRecurring (eventStore, framingRange, context) {
    const dateEnv = context.dateEnv
    const pluginHooks = context.pluginHooks
    const options = context.options
    const defs = eventStore.defs
    let instances = eventStore.instances
    // remove existing recurring instances
    // TODO: bad. always expand events as a second step
    instances = filterHash(instances, function (instance) {
      return !defs[instance.defId].recurringDef
    })
    for (const defId in defs) {
      const def = defs[defId]
      if (def.recurringDef) {
        let duration = def.recurringDef.duration
        if (!duration) {
          duration = def.allDay
            ? options.defaultAllDayEventDuration
            : options.defaultTimedEventDuration
        }
        const starts = expandRecurringRanges(
          def,
          duration,
          framingRange,
          dateEnv,
          pluginHooks.recurringTypes
        )
        for (let _i = 0, starts_1 = starts; _i < starts_1.length; _i++) {
          const start = starts_1[_i]
          const instance = createEventInstance(defId, {
            start,
            end: dateEnv.add(start, duration)
          })
          instances[instance.instanceId] = instance
        }
      }
    }
    return { defs, instances }
  }

  /*
    Event MUST have a recurringDef
    */
  function expandRecurringRanges (
    eventDef,
    duration,
    framingRange,
    dateEnv,
    recurringTypes
  ) {
    const typeDef = recurringTypes[eventDef.recurringDef.typeId]
    let markers = typeDef.expand(
      eventDef.recurringDef.typeData,
      {
        start: dateEnv.subtract(framingRange.start, duration),
        end: framingRange.end
      },
      dateEnv
    )
    // the recurrence plugins don't guarantee that all-day events are start-of-day, so we have to
    if (eventDef.allDay) {
      markers = markers.map(startOfDay)
    }
    return markers
  }

  const INTERNAL_UNITS = ['years', 'months', 'days', 'milliseconds']
  const PARSE_RE = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/

  // Parsing and Creation
  function createDuration (input, unit) {
    let _a
    if (typeof input === 'string') {
      return parseString(input)
    } else if (typeof input === 'object' && input) {
      // non-null object
      return parseObject(input)
    } else if (typeof input === 'number') {
      return parseObject(((_a = {}), (_a[unit || 'milliseconds'] = input), _a))
    } else {
      return null
    }
  }

  function parseString (s) {
    const m = PARSE_RE.exec(s)
    if (m) {
      const sign = m[1] ? -1 : 1
      return {
        years: 0,
        months: 0,
        days: sign * (m[2] ? parseInt(m[2], 10) : 0),
        milliseconds:
          sign *
          ((m[3] ? parseInt(m[3], 10) : 0) * 60 * 60 * 1000 + // hours
            (m[4] ? parseInt(m[4], 10) : 0) * 60 * 1000 + // minutes
            (m[5] ? parseInt(m[5], 10) : 0) * 1000 + // seconds
            (m[6] ? parseInt(m[6], 10) : 0)) // ms
      }
    }
    return null
  }

  function parseObject (obj) {
    const duration = {
      years: obj.years || obj.year || 0,
      months: obj.months || obj.month || 0,
      days: obj.days || obj.day || 0,
      milliseconds:
        (obj.hours || obj.hour || 0) * 60 * 60 * 1000 + // hours
        (obj.minutes || obj.minute || 0) * 60 * 1000 + // minutes
        (obj.seconds || obj.second || 0) * 1000 + // seconds
        (obj.milliseconds || obj.millisecond || obj.ms || 0) // ms
    }
    const weeks = obj.weeks || obj.week
    if (weeks) {
      duration.days += weeks * 7
      duration.specifiedWeeks = true
    }
    return duration
  }

  // Equality
  function durationsEqual (d0, d1) {
    return (
      d0.years === d1.years &&
      d0.months === d1.months &&
      d0.days === d1.days &&
      d0.milliseconds === d1.milliseconds
    )
  }

  function asCleanDays (dur) {
    if (!dur.years && !dur.months && !dur.milliseconds) {
      return dur.days
    }
    return 0
  }

  // Simple Math
  function addDurations (d0, d1) {
    return {
      years: d0.years + d1.years,
      months: d0.months + d1.months,
      days: d0.days + d1.days,
      milliseconds: d0.milliseconds + d1.milliseconds
    }
  }

  function subtractDurations (d1, d0) {
    return {
      years: d1.years - d0.years,
      months: d1.months - d0.months,
      days: d1.days - d0.days,
      milliseconds: d1.milliseconds - d0.milliseconds
    }
  }

  function multiplyDuration (d, n) {
    return {
      years: d.years * n,
      months: d.months * n,
      days: d.days * n,
      milliseconds: d.milliseconds * n
    }
  }

  // Conversions
  // "Rough" because they are based on average-case Gregorian months/years
  function asRoughYears (dur) {
    return asRoughDays(dur) / 365
  }

  function asRoughMonths (dur) {
    return asRoughDays(dur) / 30
  }

  function asRoughDays (dur) {
    return asRoughMs(dur) / 864e5
  }

  function asRoughMinutes (dur) {
    return asRoughMs(dur) / (1000 * 60)
  }

  function asRoughSeconds (dur) {
    return asRoughMs(dur) / 1000
  }

  function asRoughMs (dur) {
    return (
      dur.years * (365 * 864e5) +
      dur.months * (30 * 864e5) +
      dur.days * 864e5 +
      dur.milliseconds
    )
  }

  // Advanced Math
  function wholeDivideDurations (numerator, denominator) {
    let res = null
    for (let i = 0; i < INTERNAL_UNITS.length; i++) {
      const unit = INTERNAL_UNITS[i]
      if (denominator[unit]) {
        const localRes = numerator[unit] / denominator[unit]
        if (!isInt(localRes) || (res !== null && res !== localRes)) {
          return null
        }
        res = localRes
      } else if (numerator[unit]) {
        // needs to divide by something but can't!
        return null
      }
    }
    return res
  }

  function greatestDurationDenominator (dur) {
    const ms = dur.milliseconds
    if (ms) {
      if (ms % 1000 !== 0) {
        return { unit: 'millisecond', value: ms }
      }
      if (ms % (1000 * 60) !== 0) {
        return { unit: 'second', value: ms / 1000 }
      }
      if (ms % (1000 * 60 * 60) !== 0) {
        return { unit: 'minute', value: ms / (1000 * 60) }
      }
      if (ms) {
        return { unit: 'hour', value: ms / (1000 * 60 * 60) }
      }
    }
    if (dur.days) {
      if (dur.specifiedWeeks && dur.days % 7 === 0) {
        return { unit: 'week', value: dur.days / 7 }
      }
      return { unit: 'day', value: dur.days }
    }
    if (dur.months) {
      return { unit: 'month', value: dur.months }
    }
    if (dur.years) {
      return { unit: 'year', value: dur.years }
    }
    return { unit: 'millisecond', value: 0 }
  }

  // timeZoneOffset is in minutes
  function buildIsoString (marker, timeZoneOffset, stripZeroTime) {
    if (stripZeroTime === void 0) {
      stripZeroTime = false
    }
    let s = marker.toISOString()
    s = s.replace('.000', '')
    if (stripZeroTime) {
      s = s.replace('T00:00:00Z', '')
    }
    if (s.length > 10) {
      // time part wasn't stripped, can add timezone info
      if (timeZoneOffset == null) {
        s = s.replace('Z', '')
      } else if (timeZoneOffset !== 0) {
        s = s.replace('Z', formatTimeZoneOffset(timeZoneOffset, true))
      }
      // otherwise, its UTC-0 and we want to keep the Z
    }
    return s
  }

  // formats the date, but with no time part
  // TODO: somehow merge with buildIsoString and stripZeroTime
  // TODO: rename. omit "string"
  function formatDayString (marker) {
    return marker.toISOString().replace(/T.*$/, '')
  }

  // TODO: use Date::toISOString and use everything after the T?
  function formatIsoTimeString (marker) {
    return (
      padStart(marker.getUTCHours(), 2) +
      ':' +
      padStart(marker.getUTCMinutes(), 2) +
      ':' +
      padStart(marker.getUTCSeconds(), 2)
    )
  }

  function formatTimeZoneOffset (minutes, doIso) {
    if (doIso === void 0) {
      doIso = false
    }
    const sign = minutes < 0 ? '-' : '+'
    const abs = Math.abs(minutes)
    const hours = Math.floor(abs / 60)
    const mins = Math.round(abs % 60)
    if (doIso) {
      return sign + padStart(hours, 2) + ':' + padStart(mins, 2)
    } else {
      return 'GMT' + sign + hours + (mins ? ':' + padStart(mins, 2) : '')
    }
  }

  // TODO: new util arrayify?
  function removeExact (array, exactVal) {
    let removeCnt = 0
    let i = 0
    while (i < array.length) {
      if (array[i] === exactVal) {
        array.splice(i, 1)
        removeCnt++
      } else {
        i++
      }
    }
    return removeCnt
  }

  function isArraysEqual (a0, a1, equalityFunc) {
    if (a0 === a1) {
      return true
    }
    const len = a0.length
    let i
    if (len !== a1.length) {
      // not array? or not same length?
      return false
    }
    for (i = 0; i < len; i++) {
      if (!(equalityFunc ? equalityFunc(a0[i], a1[i]) : a0[i] === a1[i])) {
        return false
      }
    }
    return true
  }

  function memoize (workerFunc, resEquality, teardownFunc) {
    let currentArgs
    let currentRes
    return function () {
      const newArgs = []
      for (let _i = 0; _i < arguments.length; _i++) {
        newArgs[_i] = arguments[_i]
      }
      if (!currentArgs) {
        currentRes = workerFunc.apply(this, newArgs)
      } else if (!isArraysEqual(currentArgs, newArgs)) {
        if (teardownFunc) {
          teardownFunc(currentRes)
        }
        const res = workerFunc.apply(this, newArgs)
        if (!resEquality || !resEquality(res, currentRes)) {
          currentRes = res
        }
      }
      currentArgs = newArgs
      return currentRes
    }
  }

  function memoizeObjArg (workerFunc, resEquality, teardownFunc) {
    let currentArg
    let currentRes
    return function (newArg) {
      if (!currentArg) {
        currentRes = workerFunc.call(this, newArg)
      } else if (!isPropsEqual(currentArg, newArg)) {
        if (teardownFunc) {
          teardownFunc(currentRes)
        }
        const res = workerFunc.call(this, newArg)
        if (!resEquality || !resEquality(res, currentRes)) {
          currentRes = res
        }
      }
      currentArg = newArg
      return currentRes
    }
  }

  function memoizeArraylike (workerFunc, resEquality, teardownFunc) {
    // used at all?
    let currentArgSets = []
    const currentResults = []
    return function (newArgSets) {
      const currentLen = currentArgSets.length
      const newLen = newArgSets.length
      let i = 0
      for (; i < currentLen; i++) {
        if (!newArgSets[i]) {
          // one of the old sets no longer exists
          if (teardownFunc) {
            teardownFunc(currentResults[i])
          }
        } else if (!isArraysEqual(currentArgSets[i], newArgSets[i])) {
          if (teardownFunc) {
            teardownFunc(currentResults[i])
          }
          const res = workerFunc.apply(this, newArgSets[i])
          if (!resEquality || !resEquality(res, currentResults[i])) {
            currentResults[i] = res
          }
        }
      }
      for (; i < newLen; i++) {
        currentResults[i] = workerFunc.apply(this, newArgSets[i])
      }
      currentArgSets = newArgSets
      currentResults.splice(newLen) // remove excess
      return currentResults
    }
  }

  function memoizeHashlike ( // used?
    workerFunc,
    resEquality,
    teardownFunc // TODO: change arg order
  ) {
    let currentArgHash = {}
    let currentResHash = {}
    return function (newArgHash) {
      const newResHash = {}
      for (const key in newArgHash) {
        if (!currentResHash[key]) {
          newResHash[key] = workerFunc.apply(this, newArgHash[key])
        } else if (!isArraysEqual(currentArgHash[key], newArgHash[key])) {
          if (teardownFunc) {
            teardownFunc(currentResHash[key])
          }
          const res = workerFunc.apply(this, newArgHash[key])
          newResHash[key] =
            resEquality && resEquality(res, currentResHash[key])
              ? currentResHash[key]
              : res
        } else {
          newResHash[key] = currentResHash[key]
        }
      }
      currentArgHash = newArgHash
      currentResHash = newResHash
      return newResHash
    }
  }

  const EXTENDED_SETTINGS_AND_SEVERITIES = {
    week: 3,
    separator: 0,
    omitZeroMinute: 0,
    meridiem: 0,
    omitCommas: 0
  }
  const STANDARD_DATE_PROP_SEVERITIES = {
    timeZoneName: 7,
    era: 6,
    year: 5,
    month: 4,
    day: 2,
    weekday: 2,
    hour: 1,
    minute: 1,
    second: 1
  }
  const MERIDIEM_RE = /\s*([ap])\.?m\.?/i // eats up leading spaces too
  const COMMA_RE = /,/g // we need re for globalness
  const MULTI_SPACE_RE = /\s+/g
  const LTR_RE = /\u200e/g // control character
  const UTC_RE = /UTC|GMT/
  const NativeFormatter = /** @class */ (function () {
    function NativeFormatter (formatSettings) {
      const standardDateProps = {}
      const extendedSettings = {}
      let severity = 0
      for (const name_1 in formatSettings) {
        if (name_1 in EXTENDED_SETTINGS_AND_SEVERITIES) {
          extendedSettings[name_1] = formatSettings[name_1]
          severity = Math.max(
            EXTENDED_SETTINGS_AND_SEVERITIES[name_1],
            severity
          )
        } else {
          standardDateProps[name_1] = formatSettings[name_1]
          if (name_1 in STANDARD_DATE_PROP_SEVERITIES) {
            // TODO: what about hour12? no severity
            severity = Math.max(
              STANDARD_DATE_PROP_SEVERITIES[name_1],
              severity
            )
          }
        }
      }
      this.standardDateProps = standardDateProps
      this.extendedSettings = extendedSettings
      this.severity = severity
      this.buildFormattingFunc = memoize(buildFormattingFunc)
    }

    NativeFormatter.prototype.format = function (date, context) {
      return this.buildFormattingFunc(
        this.standardDateProps,
        this.extendedSettings,
        context
      )(date)
    }
    NativeFormatter.prototype.formatRange = function (
      start,
      end,
      context,
      betterDefaultSeparator
    ) {
      const _a = this
      const standardDateProps = _a.standardDateProps
      const extendedSettings = _a.extendedSettings
      const diffSeverity = computeMarkerDiffSeverity(
        start.marker,
        end.marker,
        context.calendarSystem
      )
      if (!diffSeverity) {
        return this.format(start, context)
      }
      let biggestUnitForPartial = diffSeverity
      if (
        biggestUnitForPartial > 1 && // the two dates are different in a way that's larger scale than time
        (standardDateProps.year === 'numeric' ||
          standardDateProps.year === '2-digit') &&
        (standardDateProps.month === 'numeric' ||
          standardDateProps.month === '2-digit') &&
        (standardDateProps.day === 'numeric' ||
          standardDateProps.day === '2-digit')
      ) {
        biggestUnitForPartial = 1 // make it look like the dates are only different in terms of time
      }
      const full0 = this.format(start, context)
      const full1 = this.format(end, context)
      if (full0 === full1) {
        return full0
      }
      const partialDateProps = computePartialFormattingOptions(
        standardDateProps,
        biggestUnitForPartial
      )
      const partialFormattingFunc = buildFormattingFunc(
        partialDateProps,
        extendedSettings,
        context
      )
      const partial0 = partialFormattingFunc(start)
      const partial1 = partialFormattingFunc(end)
      const insertion = findCommonInsertion(full0, partial0, full1, partial1)
      const separator =
        extendedSettings.separator ||
        betterDefaultSeparator ||
        context.defaultSeparator ||
        ''
      if (insertion) {
        return (
          insertion.before + partial0 + separator + partial1 + insertion.after
        )
      }
      return full0 + separator + full1
    }
    NativeFormatter.prototype.getLargestUnit = function () {
      switch (this.severity) {
        case 7:
        case 6:
        case 5:
          return 'year'
        case 4:
          return 'month'
        case 3:
          return 'week'
        case 2:
          return 'day'
        default:
          return 'time' // really?
      }
    }
    return NativeFormatter
  })()

  function buildFormattingFunc (standardDateProps, extendedSettings, context) {
    const standardDatePropCnt = Object.keys(standardDateProps).length
    if (
      standardDatePropCnt === 1 &&
      standardDateProps.timeZoneName === 'short'
    ) {
      return function (date) {
        return formatTimeZoneOffset(date.timeZoneOffset)
      }
    }
    if (standardDatePropCnt === 0 && extendedSettings.week) {
      return function (date) {
        return formatWeekNumber(
          context.computeWeekNumber(date.marker),
          context.weekText,
          context.locale,
          extendedSettings.week
        )
      }
    }
    return buildNativeFormattingFunc(
      standardDateProps,
      extendedSettings,
      context
    )
  }

  function buildNativeFormattingFunc (
    standardDateProps,
    extendedSettings,
    context
  ) {
    standardDateProps = __assign({}, standardDateProps) // copy
    extendedSettings = __assign({}, extendedSettings) // copy
    sanitizeSettings(standardDateProps, extendedSettings)
    standardDateProps.timeZone = 'UTC' // we leverage the only guaranteed timeZone for our UTC markers
    const normalFormat = new Intl.DateTimeFormat(
      context.locale.codes,
      standardDateProps
    )
    let zeroFormat // needed?
    if (extendedSettings.omitZeroMinute) {
      const zeroProps = __assign({}, standardDateProps)
      delete zeroProps.minute // seconds and ms were already considered in sanitizeSettings
      zeroFormat = new Intl.DateTimeFormat(context.locale.codes, zeroProps)
    }
    return function (date) {
      const marker = date.marker
      let format
      if (zeroFormat && !marker.getUTCMinutes()) {
        format = zeroFormat
      } else {
        format = normalFormat
      }
      const s = format.format(marker)
      return postProcess(s, date, standardDateProps, extendedSettings, context)
    }
  }

  function sanitizeSettings (standardDateProps, extendedSettings) {
    // deal with a browser inconsistency where formatting the timezone
    // requires that the hour/minute be present.
    if (standardDateProps.timeZoneName) {
      if (!standardDateProps.hour) {
        standardDateProps.hour = '2-digit'
      }
      if (!standardDateProps.minute) {
        standardDateProps.minute = '2-digit'
      }
    }
    // only support short timezone names
    if (standardDateProps.timeZoneName === 'long') {
      standardDateProps.timeZoneName = 'short'
    }
    // if requesting to display seconds, MUST display minutes
    if (
      extendedSettings.omitZeroMinute &&
      (standardDateProps.second || standardDateProps.millisecond)
    ) {
      delete extendedSettings.omitZeroMinute
    }
  }

  function postProcess (s, date, standardDateProps, extendedSettings, context) {
    s = s.replace(LTR_RE, '') // remove left-to-right control chars. do first. good for other regexes
    if (standardDateProps.timeZoneName === 'short') {
      s = injectTzoStr(
        s,
        context.timeZone === 'UTC' || date.timeZoneOffset == null
          ? 'UTC' // important to normalize for IE, which does "GMT"
          : formatTimeZoneOffset(date.timeZoneOffset)
      )
    }
    if (extendedSettings.omitCommas) {
      s = s.replace(COMMA_RE, '').trim()
    }
    if (extendedSettings.omitZeroMinute) {
      s = s.replace(':00', '') // zeroFormat doesn't always achieve this
    }
    // ^ do anything that might create adjacent spaces before this point,
    // because MERIDIEM_RE likes to eat up loading spaces
    if (extendedSettings.meridiem === false) {
      s = s.replace(MERIDIEM_RE, '').trim()
    } else if (extendedSettings.meridiem === 'narrow') {
      // a/p
      s = s.replace(MERIDIEM_RE, function (m0, m1) {
        return m1.toLocaleLowerCase()
      })
    } else if (extendedSettings.meridiem === 'short') {
      // am/pm
      s = s.replace(MERIDIEM_RE, function (m0, m1) {
        return m1.toLocaleLowerCase() + 'm'
      })
    } else if (extendedSettings.meridiem === 'lowercase') {
      // other meridiem transformers already converted to lowercase
      s = s.replace(MERIDIEM_RE, function (m0) {
        return m0.toLocaleLowerCase()
      })
    }
    s = s.replace(MULTI_SPACE_RE, ' ')
    s = s.trim()
    return s
  }

  function injectTzoStr (s, tzoStr) {
    let replaced = false
    s = s.replace(UTC_RE, function () {
      replaced = true
      return tzoStr
    })
    // IE11 doesn't include UTC/GMT in the original string, so append to end
    if (!replaced) {
      s += ' ' + tzoStr
    }
    return s
  }

  function formatWeekNumber (num, weekText, locale, display) {
    const parts = []
    if (display === 'narrow') {
      parts.push(weekText)
    } else if (display === 'short') {
      parts.push(weekText, ' ')
    }
    // otherwise, considered 'numeric'
    parts.push(locale.simpleNumberFormat.format(num))
    if (locale.options.direction === 'rtl') {
      // TODO: use control characters instead?
      parts.reverse()
    }
    return parts.join('')
  }

  // Range Formatting Utils
  // 0 = exactly the same
  // 1 = different by time
  // and bigger
  function computeMarkerDiffSeverity (d0, d1, ca) {
    if (ca.getMarkerYear(d0) !== ca.getMarkerYear(d1)) {
      return 5
    }
    if (ca.getMarkerMonth(d0) !== ca.getMarkerMonth(d1)) {
      return 4
    }
    if (ca.getMarkerDay(d0) !== ca.getMarkerDay(d1)) {
      return 2
    }
    if (timeAsMs(d0) !== timeAsMs(d1)) {
      return 1
    }
    return 0
  }

  function computePartialFormattingOptions (options, biggestUnit) {
    const partialOptions = {}
    for (const name_2 in options) {
      if (
        !(name_2 in STANDARD_DATE_PROP_SEVERITIES) || // not a date part prop (like timeZone)
        STANDARD_DATE_PROP_SEVERITIES[name_2] <= biggestUnit
      ) {
        partialOptions[name_2] = options[name_2]
      }
    }
    return partialOptions
  }

  function findCommonInsertion (full0, partial0, full1, partial1) {
    let i0 = 0
    while (i0 < full0.length) {
      const found0 = full0.indexOf(partial0, i0)
      if (found0 === -1) {
        break
      }
      const before0 = full0.substr(0, found0)
      i0 = found0 + partial0.length
      const after0 = full0.substr(i0)
      let i1 = 0
      while (i1 < full1.length) {
        const found1 = full1.indexOf(partial1, i1)
        if (found1 === -1) {
          break
        }
        const before1 = full1.substr(0, found1)
        i1 = found1 + partial1.length
        const after1 = full1.substr(i1)
        if (before0 === before1 && after0 === after1) {
          return {
            before: before0,
            after: after0
          }
        }
      }
    }
    return null
  }

  function expandZonedMarker (dateInfo, calendarSystem) {
    const a = calendarSystem.markerToArray(dateInfo.marker)
    return {
      marker: dateInfo.marker,
      timeZoneOffset: dateInfo.timeZoneOffset,
      array: a,
      year: a[0],
      month: a[1],
      day: a[2],
      hour: a[3],
      minute: a[4],
      second: a[5],
      millisecond: a[6]
    }
  }

  function createVerboseFormattingArg (
    start,
    end,
    context,
    betterDefaultSeparator
  ) {
    const startInfo = expandZonedMarker(start, context.calendarSystem)
    const endInfo = end ? expandZonedMarker(end, context.calendarSystem) : null
    return {
      date: startInfo,
      start: startInfo,
      end: endInfo,
      timeZone: context.timeZone,
      localeCodes: context.locale.codes,
      defaultSeparator: betterDefaultSeparator || context.defaultSeparator
    }
  }

  /*
    TODO: fix the terminology of "formatter" vs "formatting func"
    */
  /*
    At the time of instantiation, this object does not know which cmd-formatting system it will use.
    It receives this at the time of formatting, as a setting.
    */
  const CmdFormatter = /** @class */ (function () {
    function CmdFormatter (cmdStr) {
      this.cmdStr = cmdStr
    }

    CmdFormatter.prototype.format = function (
      date,
      context,
      betterDefaultSeparator
    ) {
      return context.cmdFormatter(
        this.cmdStr,
        createVerboseFormattingArg(date, null, context, betterDefaultSeparator)
      )
    }
    CmdFormatter.prototype.formatRange = function (
      start,
      end,
      context,
      betterDefaultSeparator
    ) {
      return context.cmdFormatter(
        this.cmdStr,
        createVerboseFormattingArg(start, end, context, betterDefaultSeparator)
      )
    }
    return CmdFormatter
  })()

  const FuncFormatter = /** @class */ (function () {
    function FuncFormatter (func) {
      this.func = func
    }

    FuncFormatter.prototype.format = function (
      date,
      context,
      betterDefaultSeparator
    ) {
      return this.func(
        createVerboseFormattingArg(date, null, context, betterDefaultSeparator)
      )
    }
    FuncFormatter.prototype.formatRange = function (
      start,
      end,
      context,
      betterDefaultSeparator
    ) {
      return this.func(
        createVerboseFormattingArg(start, end, context, betterDefaultSeparator)
      )
    }
    return FuncFormatter
  })()

  function createFormatter (input) {
    if (typeof input === 'object' && input) {
      // non-null object
      return new NativeFormatter(input)
    } else if (typeof input === 'string') {
      return new CmdFormatter(input)
    } else if (typeof input === 'function') {
      return new FuncFormatter(input)
    }
  }

  // base options
  // ------------
  const BASE_OPTION_REFINERS = {
    navLinkDayClick: identity,
    navLinkWeekClick: identity,
    duration: createDuration,
    bootstrapFontAwesome: identity,
    buttonIcons: identity,
    customButtons: identity,
    defaultAllDayEventDuration: createDuration,
    defaultTimedEventDuration: createDuration,
    nextDayThreshold: createDuration,
    scrollTime: createDuration,
    slotMinTime: createDuration,
    slotMaxTime: createDuration,
    dayPopoverFormat: createFormatter,
    slotDuration: createDuration,
    snapDuration: createDuration,
    headerToolbar: identity,
    footerToolbar: identity,
    defaultRangeSeparator: String,
    titleRangeSeparator: String,
    forceEventDuration: Boolean,
    dayHeaders: Boolean,
    dayHeaderFormat: createFormatter,
    dayHeaderClassNames: identity,
    dayHeaderContent: identity,
    dayHeaderDidMount: identity,
    dayHeaderWillUnmount: identity,
    dayCellClassNames: identity,
    dayCellContent: identity,
    dayCellDidMount: identity,
    dayCellWillUnmount: identity,
    initialView: String,
    aspectRatio: Number,
    weekends: Boolean,
    weekNumberCalculation: identity,
    weekNumbers: Boolean,
    weekNumberClassNames: identity,
    weekNumberContent: identity,
    weekNumberDidMount: identity,
    weekNumberWillUnmount: identity,
    editable: Boolean,
    viewClassNames: identity,
    viewDidMount: identity,
    viewWillUnmount: identity,
    nowIndicator: Boolean,
    nowIndicatorClassNames: identity,
    nowIndicatorContent: identity,
    nowIndicatorDidMount: identity,
    nowIndicatorWillUnmount: identity,
    showNonCurrentDates: Boolean,
    lazyFetching: Boolean,
    startParam: String,
    endParam: String,
    timeZoneParam: String,
    timeZone: String,
    locales: identity,
    locale: identity,
    themeSystem: String,
    dragRevertDuration: Number,
    dragScroll: Boolean,
    allDayMaintainDuration: Boolean,
    unselectAuto: Boolean,
    dropAccept: identity,
    eventOrder: parseFieldSpecs,
    handleWindowResize: Boolean,
    windowResizeDelay: Number,
    longPressDelay: Number,
    eventDragMinDistance: Number,
    expandRows: Boolean,
    height: identity,
    contentHeight: identity,
    direction: String,
    weekNumberFormat: createFormatter,
    eventResizableFromStart: Boolean,
    displayEventTime: Boolean,
    displayEventEnd: Boolean,
    weekText: String,
    progressiveEventRendering: Boolean,
    businessHours: identity,
    initialDate: identity,
    now: identity,
    eventDataTransform: identity,
    stickyHeaderDates: identity,
    stickyFooterScrollbar: identity,
    viewHeight: identity,
    defaultAllDay: Boolean,
    eventSourceFailure: identity,
    eventSourceSuccess: identity,
    eventDisplay: String,
    eventStartEditable: Boolean,
    eventDurationEditable: Boolean,
    eventOverlap: identity,
    eventConstraint: identity,
    eventAllow: identity,
    eventBackgroundColor: String,
    eventBorderColor: String,
    eventTextColor: String,
    eventColor: String,
    eventClassNames: identity,
    eventContent: identity,
    eventDidMount: identity,
    eventWillUnmount: identity,
    selectConstraint: identity,
    selectOverlap: identity,
    selectAllow: identity,
    droppable: Boolean,
    unselectCancel: String,
    slotLabelFormat: identity,
    slotLaneClassNames: identity,
    slotLaneContent: identity,
    slotLaneDidMount: identity,
    slotLaneWillUnmount: identity,
    slotLabelClassNames: identity,
    slotLabelContent: identity,
    slotLabelDidMount: identity,
    slotLabelWillUnmount: identity,
    dayMaxEvents: identity,
    dayMaxEventRows: identity,
    dayMinWidth: Number,
    slotLabelInterval: createDuration,
    allDayText: String,
    allDayClassNames: identity,
    allDayContent: identity,
    allDayDidMount: identity,
    allDayWillUnmount: identity,
    slotMinWidth: Number,
    navLinks: Boolean,
    eventTimeFormat: createFormatter,
    rerenderDelay: Number,
    moreLinkText: identity,
    selectMinDistance: Number,
    selectable: Boolean,
    selectLongPressDelay: Number,
    eventLongPressDelay: Number,
    selectMirror: Boolean,
    eventMinHeight: Number,
    slotEventOverlap: Boolean,
    plugins: identity,
    firstDay: Number,
    dayCount: Number,
    dateAlignment: String,
    dateIncrement: createDuration,
    hiddenDays: identity,
    monthMode: Boolean,
    fixedWeekCount: Boolean,
    validRange: identity,
    visibleRange: identity,
    titleFormat: identity,
    // only used by list-view, but languages define the value, so we need it in base options
    noEventsText: String
  }
  // do NOT give a type here. need `typeof BASE_OPTION_DEFAULTS` to give real results.
  // raw values.
  const BASE_OPTION_DEFAULTS = {
    eventDisplay: 'auto',
    defaultRangeSeparator: ' - ',
    titleRangeSeparator: ' \u2013 ',
    defaultTimedEventDuration: '01:00:00',
    defaultAllDayEventDuration: { day: 1 },
    forceEventDuration: false,
    nextDayThreshold: '00:00:00',
    dayHeaders: true,
    initialView: '',
    aspectRatio: 1.35,
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'today prev,next'
    },
    weekends: true,
    weekNumbers: false,
    weekNumberCalculation: 'local',
    editable: false,
    nowIndicator: false,
    scrollTime: '06:00:00',
    slotMinTime: '00:00:00',
    slotMaxTime: '24:00:00',
    showNonCurrentDates: true,
    lazyFetching: true,
    startParam: 'start',
    endParam: 'end',
    timeZoneParam: 'timeZone',
    timeZone: 'local',
    locales: [],
    locale: '',
    themeSystem: 'standard',
    dragRevertDuration: 500,
    dragScroll: true,
    allDayMaintainDuration: false,
    unselectAuto: true,
    dropAccept: '*',
    eventOrder: 'start,-duration,allDay,title',
    dayPopoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
    handleWindowResize: true,
    windowResizeDelay: 100,
    longPressDelay: 1000,
    eventDragMinDistance: 5,
    expandRows: false,
    navLinks: false,
    selectable: false
  }
  // calendar listeners
  // ------------------
  const CALENDAR_LISTENER_REFINERS = {
    datesSet: identity,
    eventsSet: identity,
    eventAdd: identity,
    eventChange: identity,
    eventRemove: identity,
    windowResize: identity,
    eventClick: identity,
    eventMouseEnter: identity,
    eventMouseLeave: identity,
    select: identity,
    unselect: identity,
    loading: identity,
    // internal
    _unmount: identity,
    _beforeprint: identity,
    _afterprint: identity,
    _noEventDrop: identity,
    _noEventResize: identity,
    _resize: identity,
    _scrollRequest: identity
  }
  // calendar-specific options
  // -------------------------
  const CALENDAR_OPTION_REFINERS = {
    buttonText: identity,
    views: identity,
    plugins: identity,
    initialEvents: identity,
    events: identity,
    eventSources: identity
  }
  const COMPLEX_OPTION_COMPARATORS = {
    headerToolbar: isBoolComplexEqual,
    footerToolbar: isBoolComplexEqual,
    buttonText: isBoolComplexEqual,
    buttonIcons: isBoolComplexEqual
  }

  function isBoolComplexEqual (a, b) {
    if (typeof a === 'object' && typeof b === 'object' && a && b) {
      // both non-null objects
      return isPropsEqual(a, b)
    } else {
      return a === b
    }
  }

  // view-specific options
  // ---------------------
  const VIEW_OPTION_REFINERS = {
    type: String,
    component: identity,
    buttonText: String,
    buttonTextKey: String,
    dateProfileGeneratorClass: identity,
    usesMinMaxTime: Boolean,
    classNames: identity,
    content: identity,
    didMount: identity,
    willUnmount: identity
  }
  // util funcs
  // ----------------------------------------------------------------------------------------------------
  function mergeRawOptions (optionSets) {
    return mergeProps(optionSets, COMPLEX_OPTION_COMPARATORS)
  }

  function refineProps (input, refiners) {
    const refined = {}
    const extra = {}
    for (var propName in refiners) {
      if (propName in input) {
        refined[propName] = refiners[propName](input[propName])
      }
    }
    for (var propName in input) {
      if (!(propName in refiners)) {
        extra[propName] = input[propName]
      }
    }
    return { refined, extra }
  }

  function identity (raw) {
    return raw
  }

  function parseEvents (rawEvents, eventSource, context, allowOpenRange) {
    const eventStore = createEmptyEventStore()
    const eventRefiners = buildEventRefiners(context)
    for (let _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
      const rawEvent = rawEvents_1[_i]
      const tuple = parseEvent(
        rawEvent,
        eventSource,
        context,
        allowOpenRange,
        eventRefiners
      )
      if (tuple) {
        eventTupleToStore(tuple, eventStore)
      }
    }
    return eventStore
  }

  function eventTupleToStore (tuple, eventStore) {
    if (eventStore === void 0) {
      eventStore = createEmptyEventStore()
    }
    eventStore.defs[tuple.def.defId] = tuple.def
    if (tuple.instance) {
      eventStore.instances[tuple.instance.instanceId] = tuple.instance
    }
    return eventStore
  }

  // retrieves events that have the same groupId as the instance specified by `instanceId`
  // or they are the same as the instance.
  // why might instanceId not be in the store? an event from another calendar?
  function getRelevantEvents (eventStore, instanceId) {
    const instance = eventStore.instances[instanceId]
    if (instance) {
      const def_1 = eventStore.defs[instance.defId]
      // get events/instances with same group
      const newStore = filterEventStoreDefs(eventStore, function (lookDef) {
        return isEventDefsGrouped(def_1, lookDef)
      })
      // add the original
      // TODO: wish we could use eventTupleToStore or something like it
      newStore.defs[def_1.defId] = def_1
      newStore.instances[instance.instanceId] = instance
      return newStore
    }
    return createEmptyEventStore()
  }

  function isEventDefsGrouped (def0, def1) {
    return Boolean(def0.groupId && def0.groupId === def1.groupId)
  }

  function createEmptyEventStore () {
    return { defs: {}, instances: {} }
  }

  function mergeEventStores (store0, store1) {
    return {
      defs: __assign(__assign({}, store0.defs), store1.defs),
      instances: __assign(__assign({}, store0.instances), store1.instances)
    }
  }

  function filterEventStoreDefs (eventStore, filterFunc) {
    const defs = filterHash(eventStore.defs, filterFunc)
    const instances = filterHash(eventStore.instances, function (instance) {
      return defs[instance.defId] // still exists?
    })
    return { defs, instances }
  }

  function excludeSubEventStore (master, sub) {
    const defs = master.defs
    const instances = master.instances
    const filteredDefs = {}
    const filteredInstances = {}
    for (const defId in defs) {
      if (!sub.defs[defId]) {
        // not explicitly excluded
        filteredDefs[defId] = defs[defId]
      }
    }
    for (const instanceId in instances) {
      if (
        !sub.instances[instanceId] && // not explicitly excluded
        filteredDefs[instances[instanceId].defId] // def wasn't filtered away
      ) {
        filteredInstances[instanceId] = instances[instanceId]
      }
    }
    return {
      defs: filteredDefs,
      instances: filteredInstances
    }
  }

  function normalizeConstraint (input, context) {
    if (Array.isArray(input)) {
      return parseEvents(input, null, context, true) // allowOpenRange=true
    } else if (typeof input === 'object' && input) {
      // non-null object
      return parseEvents([input], null, context, true) // allowOpenRange=true
    } else if (input != null) {
      return String(input)
    } else {
      return null
    }
  }

  function parseClassNames (raw) {
    if (Array.isArray(raw)) {
      return raw
    } else if (typeof raw === 'string') {
      return raw.split(/\s+/)
    } else {
      return []
    }
  }

  // TODO: better called "EventSettings" or "EventConfig"
  // TODO: move this file into structs
  // TODO: separate constraint/overlap/allow, because selection uses only that, not other props
  const EVENT_UI_REFINERS = {
    display: String,
    editable: Boolean,
    startEditable: Boolean,
    durationEditable: Boolean,
    constraint: identity,
    overlap: identity,
    allow: identity,
    className: parseClassNames,
    classNames: parseClassNames,
    color: String,
    backgroundColor: String,
    borderColor: String,
    textColor: String
  }

  function createEventUi (refined, context) {
    const constraint = normalizeConstraint(refined.constraint, context)
    return {
      display: refined.display || null,
      startEditable:
        refined.startEditable != null
          ? refined.startEditable
          : refined.editable,
      durationEditable:
        refined.durationEditable != null
          ? refined.durationEditable
          : refined.editable,
      constraints: constraint != null ? [constraint] : [],
      overlap: refined.overlap != null ? refined.overlap : null,
      allows: refined.allow != null ? [refined.allow] : [],
      backgroundColor: refined.backgroundColor || refined.color || '',
      borderColor: refined.borderColor || refined.color || '',
      textColor: refined.textColor || '',
      classNames: (refined.className || []).concat(refined.classNames || []) // join singular and plural
    }
  }

  // TODO: prevent against problems with <2 args!
  function combineEventUis (uis) {
    return uis.reduce(combineTwoEventUis, EMPTY_EVENT_UI)
  }

  function combineTwoEventUis (item0, item1) {
    return {
      display: item1.display != null ? item1.display : item0.display,
      startEditable:
        item1.startEditable != null ? item1.startEditable : item0.startEditable,
      durationEditable:
        item1.durationEditable != null
          ? item1.durationEditable
          : item0.durationEditable,
      constraints: item0.constraints.concat(item1.constraints),
      overlap:
        typeof item1.overlap === 'boolean' ? item1.overlap : item0.overlap,
      allows: item0.allows.concat(item1.allows),
      backgroundColor: item1.backgroundColor || item0.backgroundColor,
      borderColor: item1.borderColor || item0.borderColor,
      textColor: item1.textColor || item0.textColor,
      classNames: item0.classNames.concat(item1.classNames)
    }
  }

  var EMPTY_EVENT_UI = {
    display: null,
    startEditable: null,
    durationEditable: null,
    constraints: [],
    overlap: null,
    allows: [],
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    classNames: []
  }

  const EVENT_NON_DATE_REFINERS = {
    id: String,
    groupId: String,
    title: String,
    url: String
  }
  const EVENT_DATE_REFINERS = {
    start: identity,
    end: identity,
    date: identity,
    allDay: Boolean
  }
  const EVENT_REFINERS = __assign(
    __assign(__assign({}, EVENT_NON_DATE_REFINERS), EVENT_DATE_REFINERS),
    { extendedProps: identity }
  )

  function parseEvent (raw, eventSource, context, allowOpenRange, refiners) {
    if (refiners === void 0) {
      refiners = buildEventRefiners(context)
    }
    const _a = refineEventDef(raw, context, refiners)
    const refined = _a.refined
    const extra = _a.extra
    const defaultAllDay = computeIsDefaultAllDay(eventSource, context)
    const recurringRes = parseRecurring(
      refined,
      defaultAllDay,
      context.dateEnv,
      context.pluginHooks.recurringTypes
    )
    if (recurringRes) {
      var def = parseEventDef(
        refined,
        extra,
        eventSource ? eventSource.sourceId : '',
        recurringRes.allDay,
        Boolean(recurringRes.duration),
        context
      )
      def.recurringDef = {
        typeId: recurringRes.typeId,
        typeData: recurringRes.typeData,
        duration: recurringRes.duration
      }
      return { def, instance: null }
    } else {
      const singleRes = parseSingle(
        refined,
        defaultAllDay,
        context,
        allowOpenRange
      )
      if (singleRes) {
        var def = parseEventDef(
          refined,
          extra,
          eventSource ? eventSource.sourceId : '',
          singleRes.allDay,
          singleRes.hasEnd,
          context
        )
        const instance = createEventInstance(
          def.defId,
          singleRes.range,
          singleRes.forcedStartTzo,
          singleRes.forcedEndTzo
        )
        return { def, instance }
      }
    }
    return null
  }

  function refineEventDef (raw, context, refiners) {
    if (refiners === void 0) {
      refiners = buildEventRefiners(context)
    }
    return refineProps(raw, refiners)
  }

  function buildEventRefiners (context) {
    return __assign(
      __assign(__assign({}, EVENT_UI_REFINERS), EVENT_REFINERS),
      context.pluginHooks.eventRefiners
    )
  }

  /*
    Will NOT populate extendedProps with the leftover properties.
    Will NOT populate date-related props.
    */
  function parseEventDef (refined, extra, sourceId, allDay, hasEnd, context) {
    const def = {
      title: refined.title || '',
      groupId: refined.groupId || '',
      publicId: refined.id || '',
      url: refined.url || '',
      recurringDef: null,
      defId: guid(),
      sourceId,
      allDay,
      hasEnd,
      ui: createEventUi(refined, context),
      extendedProps: __assign(__assign({}, refined.extendedProps || {}), extra)
    }
    for (
      let _i = 0, _a = context.pluginHooks.eventDefMemberAdders;
      _i < _a.length;
      _i++
    ) {
      const memberAdder = _a[_i]
      __assign(def, memberAdder(refined))
    }
    // help out EventApi from having user modify props
    Object.freeze(def.ui.classNames)
    Object.freeze(def.extendedProps)
    return def
  }

  function parseSingle (refined, defaultAllDay, context, allowOpenRange) {
    let allDay = refined.allDay
    let startMeta
    let startMarker = null
    let hasEnd = false
    let endMeta
    let endMarker = null
    const startInput = refined.start != null ? refined.start : refined.date
    startMeta = context.dateEnv.createMarkerMeta(startInput)
    if (startMeta) {
      startMarker = startMeta.marker
    } else if (!allowOpenRange) {
      return null
    }
    if (refined.end != null) {
      endMeta = context.dateEnv.createMarkerMeta(refined.end)
    }
    if (allDay == null) {
      if (defaultAllDay != null) {
        allDay = defaultAllDay
      } else {
        // fall back to the date props LAST
        allDay =
          (!startMeta || startMeta.isTimeUnspecified) &&
          (!endMeta || endMeta.isTimeUnspecified)
      }
    }
    if (allDay && startMarker) {
      startMarker = startOfDay(startMarker)
    }
    if (endMeta) {
      endMarker = endMeta.marker
      if (allDay) {
        endMarker = startOfDay(endMarker)
      }
      if (startMarker && endMarker <= startMarker) {
        endMarker = null
      }
    }
    if (endMarker) {
      hasEnd = true
    } else if (!allowOpenRange) {
      hasEnd = context.options.forceEventDuration || false
      endMarker = context.dateEnv.add(
        startMarker,
        allDay
          ? context.options.defaultAllDayEventDuration
          : context.options.defaultTimedEventDuration
      )
    }
    return {
      allDay,
      hasEnd,
      range: { start: startMarker, end: endMarker },
      forcedStartTzo: startMeta ? startMeta.forcedTzo : null,
      forcedEndTzo: endMeta ? endMeta.forcedTzo : null
    }
  }

  function computeIsDefaultAllDay (eventSource, context) {
    let res = null
    if (eventSource) {
      res = eventSource.defaultAllDay
    }
    if (res == null) {
      res = context.options.defaultAllDay
    }
    return res
  }

  /* Date stuff that doesn't belong in datelib core
    ---------------------------------------------------------------------------------------------------------------------- */
  // given a timed range, computes an all-day range that has the same exact duration,
  // but whose start time is aligned with the start of the day.
  function computeAlignedDayRange (timedRange) {
    const dayCnt = Math.floor(diffDays(timedRange.start, timedRange.end)) || 1
    const start = startOfDay(timedRange.start)
    const end = addDays(start, dayCnt)
    return { start, end }
  }

  // given a timed range, computes an all-day range based on how for the end date bleeds into the next day
  // TODO: give nextDayThreshold a default arg
  function computeVisibleDayRange (timedRange, nextDayThreshold) {
    if (nextDayThreshold === void 0) {
      nextDayThreshold = createDuration(0)
    }
    let startDay = null
    let endDay = null
    if (timedRange.end) {
      endDay = startOfDay(timedRange.end)
      const endTimeMS = timedRange.end.valueOf() - endDay.valueOf() // # of milliseconds into `endDay`
      // If the end time is actually inclusively part of the next day and is equal to or
      // beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
      // Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
      if (endTimeMS && endTimeMS >= asRoughMs(nextDayThreshold)) {
        endDay = addDays(endDay, 1)
      }
    }
    if (timedRange.start) {
      startDay = startOfDay(timedRange.start) // the beginning of the day the range starts
      // If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
      if (endDay && endDay <= startDay) {
        endDay = addDays(startDay, 1)
      }
    }
    return { start: startDay, end: endDay }
  }

  // spans from one day into another?
  function isMultiDayRange (range) {
    const visibleRange = computeVisibleDayRange(range)
    return diffDays(visibleRange.start, visibleRange.end) > 1
  }

  function diffDates (date0, date1, dateEnv, largeUnit) {
    if (largeUnit === 'year') {
      return createDuration(dateEnv.diffWholeYears(date0, date1), 'year')
    } else if (largeUnit === 'month') {
      return createDuration(dateEnv.diffWholeMonths(date0, date1), 'month')
    } else {
      return diffDayAndTime(date0, date1) // returns a duration
    }
  }

  function parseRange (input, dateEnv) {
    let start = null
    let end = null
    if (input.start) {
      start = dateEnv.createMarker(input.start)
    }
    if (input.end) {
      end = dateEnv.createMarker(input.end)
    }
    if (!start && !end) {
      return null
    }
    if (start && end && end < start) {
      return null
    }
    return { start, end }
  }

  // SIDE-EFFECT: will mutate ranges.
  // Will return a new array result.
  function invertRanges (ranges, constraintRange) {
    const invertedRanges = []
    let start = constraintRange.start // the end of the previous range. the start of the new range
    let i
    let dateRange
    // ranges need to be in order. required for our date-walking algorithm
    ranges.sort(compareRanges)
    for (i = 0; i < ranges.length; i++) {
      dateRange = ranges[i]
      // add the span of time before the event (if there is any)
      if (dateRange.start > start) {
        // compare millisecond time (skip any ambig logic)
        invertedRanges.push({ start, end: dateRange.start })
      }
      if (dateRange.end > start) {
        start = dateRange.end
      }
    }
    // add the span of time after the last event (if there is any)
    if (start < constraintRange.end) {
      // compare millisecond time (skip any ambig logic)
      invertedRanges.push({ start, end: constraintRange.end })
    }
    return invertedRanges
  }

  function compareRanges (range0, range1) {
    return range0.start.valueOf() - range1.start.valueOf() // earlier ranges go first
  }

  function intersectRanges (range0, range1) {
    let start = range0.start
    let end = range0.end
    let newRange = null
    if (range1.start !== null) {
      if (start === null) {
        start = range1.start
      } else {
        start = new Date(Math.max(start.valueOf(), range1.start.valueOf()))
      }
    }
    if (range1.end != null) {
      if (end === null) {
        end = range1.end
      } else {
        end = new Date(Math.min(end.valueOf(), range1.end.valueOf()))
      }
    }
    if (start === null || end === null || start < end) {
      newRange = { start, end }
    }
    return newRange
  }

  function rangesEqual (range0, range1) {
    return (
      (range0.start === null ? null : range0.start.valueOf()) ===
        (range1.start === null ? null : range1.start.valueOf()) &&
      (range0.end === null ? null : range0.end.valueOf()) ===
        (range1.end === null ? null : range1.end.valueOf())
    )
  }

  function rangesIntersect (range0, range1) {
    return (
      (range0.end === null ||
        range1.start === null ||
        range0.end > range1.start) &&
      (range0.start === null ||
        range1.end === null ||
        range0.start < range1.end)
    )
  }

  function rangeContainsRange (outerRange, innerRange) {
    return (
      (outerRange.start === null ||
        (innerRange.start !== null && innerRange.start >= outerRange.start)) &&
      (outerRange.end === null ||
        (innerRange.end !== null && innerRange.end <= outerRange.end))
    )
  }

  function rangeContainsMarker (range, date) {
    return (
      (range.start === null || date >= range.start) &&
      (range.end === null || date < range.end)
    )
  }

  // If the given date is not within the given range, move it inside.
  // (If it's past the end, make it one millisecond before the end).
  function constrainMarkerToRange (date, range) {
    if (range.start != null && date < range.start) {
      return range.start
    }
    if (range.end != null && date >= range.end) {
      return new Date(range.end.valueOf() - 1)
    }
    return date
  }

  /*
    Specifying nextDayThreshold signals that all-day ranges should be sliced.
    */
  function sliceEventStore (
    eventStore,
    eventUiBases,
    framingRange,
    nextDayThreshold
  ) {
    const inverseBgByGroupId = {}
    const inverseBgByDefId = {}
    const defByGroupId = {}
    const bgRanges = []
    const fgRanges = []
    const eventUis = compileEventUis(eventStore.defs, eventUiBases)
    for (var defId in eventStore.defs) {
      var def = eventStore.defs[defId]
      var ui = eventUis[def.defId]
      if (ui.display === 'inverse-background') {
        if (def.groupId) {
          inverseBgByGroupId[def.groupId] = []
          if (!defByGroupId[def.groupId]) {
            defByGroupId[def.groupId] = def
          }
        } else {
          inverseBgByDefId[defId] = []
        }
      }
    }
    for (const instanceId in eventStore.instances) {
      const instance = eventStore.instances[instanceId]
      var def = eventStore.defs[instance.defId]
      var ui = eventUis[def.defId]
      const origRange = instance.range
      const normalRange =
        !def.allDay && nextDayThreshold
          ? computeVisibleDayRange(origRange, nextDayThreshold)
          : origRange
      const slicedRange = intersectRanges(normalRange, framingRange)
      if (slicedRange) {
        if (ui.display === 'inverse-background') {
          if (def.groupId) {
            inverseBgByGroupId[def.groupId].push(slicedRange)
          } else {
            inverseBgByDefId[instance.defId].push(slicedRange)
          }
        } else if (ui.display !== 'none') {
          (ui.display === 'background' ? bgRanges : fgRanges).push({
            def,
            ui,
            instance,
            range: slicedRange,
            isStart:
              normalRange.start &&
              normalRange.start.valueOf() === slicedRange.start.valueOf(),
            isEnd:
              normalRange.end &&
              normalRange.end.valueOf() === slicedRange.end.valueOf()
          })
        }
      }
    }
    for (const groupId in inverseBgByGroupId) {
      // BY GROUP
      var ranges = inverseBgByGroupId[groupId]
      var invertedRanges = invertRanges(ranges, framingRange)
      for (
        let _i = 0, invertedRanges_1 = invertedRanges;
        _i < invertedRanges_1.length;
        _i++
      ) {
        var invertedRange = invertedRanges_1[_i]
        var def = defByGroupId[groupId]
        var ui = eventUis[def.defId]
        bgRanges.push({
          def,
          ui,
          instance: null,
          range: invertedRange,
          isStart: false,
          isEnd: false
        })
      }
    }
    for (var defId in inverseBgByDefId) {
      var ranges = inverseBgByDefId[defId]
      var invertedRanges = invertRanges(ranges, framingRange)
      for (
        let _a = 0, invertedRanges_2 = invertedRanges;
        _a < invertedRanges_2.length;
        _a++
      ) {
        var invertedRange = invertedRanges_2[_a]
        bgRanges.push({
          def: eventStore.defs[defId],
          ui: eventUis[defId],
          instance: null,
          range: invertedRange,
          isStart: false,
          isEnd: false
        })
      }
    }
    return { bg: bgRanges, fg: fgRanges }
  }

  function hasBgRendering (def) {
    return (
      def.ui.display === 'background' || def.ui.display === 'inverse-background'
    )
  }

  function setElSeg (el, seg) {
    el.fcSeg = seg
  }

  function getElSeg (el) {
    return (
      el.fcSeg ||
      el.parentNode.fcSeg || // for the harness
      null
    )
  }

  // event ui computation
  function compileEventUis (eventDefs, eventUiBases) {
    return mapHash(eventDefs, function (eventDef) {
      return compileEventUi(eventDef, eventUiBases)
    })
  }

  function compileEventUi (eventDef, eventUiBases) {
    const uis = []
    if (eventUiBases['']) {
      uis.push(eventUiBases[''])
    }
    if (eventUiBases[eventDef.defId]) {
      uis.push(eventUiBases[eventDef.defId])
    }
    uis.push(eventDef.ui)
    return combineEventUis(uis)
  }

  function sortEventSegs (segs, eventOrderSpecs) {
    const objs = segs.map(buildSegCompareObj)
    objs.sort(function (obj0, obj1) {
      return compareByFieldSpecs(obj0, obj1, eventOrderSpecs)
    })
    return objs.map(function (c) {
      return c._seg
    })
  }

  // returns a object with all primitive props that can be compared
  function buildSegCompareObj (seg) {
    const eventRange = seg.eventRange
    const eventDef = eventRange.def
    const range = eventRange.instance
      ? eventRange.instance.range
      : eventRange.range
    const start = range.start ? range.start.valueOf() : 0 // TODO: better support for open-range events
    const end = range.end ? range.end.valueOf() : 0 // "
    return __assign(__assign(__assign({}, eventDef.extendedProps), eventDef), {
      id: eventDef.publicId,
      start,
      end,
      duration: end - start,
      allDay: Number(eventDef.allDay),
      _seg: seg // for later retrieval
    })
  }

  function computeSegDraggable (seg, context) {
    const pluginHooks = context.pluginHooks
    const transformers = pluginHooks.isDraggableTransformers
    const _a = seg.eventRange
    const def = _a.def
    const ui = _a.ui
    let val = ui.startEditable
    for (
      let _i = 0, transformers_1 = transformers;
      _i < transformers_1.length;
      _i++
    ) {
      const transformer = transformers_1[_i]
      val = transformer(val, def, ui, context)
    }
    return val
  }

  function computeSegStartResizable (seg, context) {
    return (
      seg.isStart &&
      seg.eventRange.ui.durationEditable &&
      context.options.eventResizableFromStart
    )
  }

  function computeSegEndResizable (seg, context) {
    return seg.isEnd && seg.eventRange.ui.durationEditable
  }

  function buildSegTimeText (
    seg,
    timeFormat,
    context,
    defaultDisplayEventTime, // defaults to true
    defaultDisplayEventEnd, // defaults to true
    startOverride,
    endOverride
  ) {
    const dateEnv = context.dateEnv
    const options = context.options
    let displayEventTime = options.displayEventTime
    let displayEventEnd = options.displayEventEnd
    const eventDef = seg.eventRange.def
    const eventInstance = seg.eventRange.instance
    if (displayEventTime == null) {
      displayEventTime = defaultDisplayEventTime !== false
    }
    if (displayEventEnd == null) {
      displayEventEnd = defaultDisplayEventEnd !== false
    }
    if (displayEventTime && !eventDef.allDay && (seg.isStart || seg.isEnd)) {
      const segStart =
        startOverride ||
        (seg.isStart
          ? eventInstance.range.start
          : seg.start || seg.eventRange.range.start)
      const segEnd =
        endOverride ||
        (seg.isEnd
          ? eventInstance.range.end
          : seg.end || seg.eventRange.range.end)
      if (displayEventEnd && eventDef.hasEnd) {
        return dateEnv.formatRange(segStart, segEnd, timeFormat, {
          forcedStartTzo: startOverride ? null : eventInstance.forcedStartTzo,
          forcedEndTzo: endOverride ? null : eventInstance.forcedEndTzo
        })
      } else {
        return dateEnv.format(segStart, timeFormat, {
          forcedTzo: startOverride ? null : eventInstance.forcedStartTzo // nooooo, same
        })
      }
    }
    return ''
  }

  function getSegMeta (seg, todayRange, nowDate) {
    const segRange = seg.eventRange.range
    return {
      isPast: segRange.end < (nowDate || todayRange.start),
      isFuture: segRange.start >= (nowDate || todayRange.end),
      isToday: todayRange && rangeContainsMarker(todayRange, segRange.start)
    }
  }

  function getEventClassNames (props) {
    const classNames = ['fc-event']
    if (props.isMirror) {
      classNames.push('fc-event-mirror')
    }
    if (props.isDraggable) {
      classNames.push('fc-event-draggable')
    }
    if (props.isStartResizable || props.isEndResizable) {
      classNames.push('fc-event-resizable')
    }
    if (props.isDragging) {
      classNames.push('fc-event-dragging')
    }
    if (props.isResizing) {
      classNames.push('fc-event-resizing')
    }
    if (props.isSelected) {
      classNames.push('fc-event-selected')
    }
    if (props.isStart) {
      classNames.push('fc-event-start')
    }
    if (props.isEnd) {
      classNames.push('fc-event-end')
    }
    if (props.isPast) {
      classNames.push('fc-event-past')
    }
    if (props.isToday) {
      classNames.push('fc-event-today')
    }
    if (props.isFuture) {
      classNames.push('fc-event-future')
    }
    return classNames
  }

  function buildEventRangeKey (eventRange) {
    return eventRange.instance
      ? eventRange.instance.instanceId
      : eventRange.def.defId + ':' + eventRange.range.start.toISOString()
    // inverse-background events don't have specific instances. TODO: better solution
  }

  const STANDARD_PROPS = {
    start: identity,
    end: identity,
    allDay: Boolean
  }

  function parseDateSpan (raw, dateEnv, defaultDuration) {
    const span = parseOpenDateSpan(raw, dateEnv)
    const range = span.range
    if (!range.start) {
      return null
    }
    if (!range.end) {
      if (defaultDuration == null) {
        return null
      } else {
        range.end = dateEnv.add(range.start, defaultDuration)
      }
    }
    return span
  }

  /*
    TODO: somehow combine with parseRange?
    Will return null if the start/end props were present but parsed invalidly.
    */
  function parseOpenDateSpan (raw, dateEnv) {
    const _a = refineProps(raw, STANDARD_PROPS)
    const standardProps = _a.refined
    const extra = _a.extra
    const startMeta = standardProps.start
      ? dateEnv.createMarkerMeta(standardProps.start)
      : null
    const endMeta = standardProps.end
      ? dateEnv.createMarkerMeta(standardProps.end)
      : null
    let allDay = standardProps.allDay
    if (allDay == null) {
      allDay =
        startMeta &&
        startMeta.isTimeUnspecified &&
        (!endMeta || endMeta.isTimeUnspecified)
    }
    return __assign(
      {
        range: {
          start: startMeta ? startMeta.marker : null,
          end: endMeta ? endMeta.marker : null
        },
        allDay
      },
      extra
    )
  }

  function isDateSpansEqual (span0, span1) {
    return (
      rangesEqual(span0.range, span1.range) &&
      span0.allDay === span1.allDay &&
      isSpanPropsEqual(span0, span1)
    )
  }

  // the NON-DATE-RELATED props
  function isSpanPropsEqual (span0, span1) {
    for (var propName in span1) {
      if (propName !== 'range' && propName !== 'allDay') {
        if (span0[propName] !== span1[propName]) {
          return false
        }
      }
    }
    // are there any props that span0 has that span1 DOESN'T have?
    // both have range/allDay, so no need to special-case.
    for (var propName in span0) {
      if (!(propName in span1)) {
        return false
      }
    }
    return true
  }

  function buildDateSpanApi (span, dateEnv) {
    return __assign(
      __assign({}, buildRangeApi(span.range, dateEnv, span.allDay)),
      { allDay: span.allDay }
    )
  }

  function buildRangeApiWithTimeZone (range, dateEnv, omitTime) {
    return __assign(__assign({}, buildRangeApi(range, dateEnv, omitTime)), {
      timeZone: dateEnv.timeZone
    })
  }

  function buildRangeApi (range, dateEnv, omitTime) {
    return {
      start: dateEnv.toDate(range.start),
      end: dateEnv.toDate(range.end),
      startStr: dateEnv.formatIso(range.start, { omitTime }),
      endStr: dateEnv.formatIso(range.end, { omitTime })
    }
  }

  function fabricateEventRange (dateSpan, eventUiBases, context) {
    const res = refineEventDef({ editable: false }, context)
    const def = parseEventDef(
      res.refined,
      res.extra,
      '', // sourceId
      dateSpan.allDay,
      true, // hasEnd
      context
    )
    return {
      def,
      ui: compileEventUi(def, eventUiBases),
      instance: createEventInstance(def.defId, dateSpan.range),
      range: dateSpan.range,
      isStart: true,
      isEnd: true
    }
  }

  function triggerDateSelect (selection, pev, context) {
    context.emitter.trigger(
      'select',
      __assign(__assign({}, buildDateSpanApiWithContext(selection, context)), {
        jsEvent: pev ? pev.origEvent : null,
        view: context.viewApi || context.calendarApi.view
      })
    )
  }

  function triggerDateUnselect (pev, context) {
    context.emitter.trigger('unselect', {
      jsEvent: pev ? pev.origEvent : null,
      view: context.viewApi || context.calendarApi.view
    })
  }

  function buildDateSpanApiWithContext (dateSpan, context) {
    const props = {}
    for (
      let _i = 0, _a = context.pluginHooks.dateSpanTransforms;
      _i < _a.length;
      _i++
    ) {
      const transform = _a[_i]
      __assign(props, transform(dateSpan, context))
    }
    __assign(props, buildDateSpanApi(dateSpan, context.dateEnv))
    return props
  }

  // Given an event's allDay status and start date, return what its fallback end date should be.
  // TODO: rename to computeDefaultEventEnd
  function getDefaultEventEnd (allDay, marker, context) {
    const dateEnv = context.dateEnv
    const options = context.options
    let end = marker
    if (allDay) {
      end = startOfDay(end)
      end = dateEnv.add(end, options.defaultAllDayEventDuration)
    } else {
      end = dateEnv.add(end, options.defaultTimedEventDuration)
    }
    return end
  }

  // applies the mutation to ALL defs/instances within the event store
  function applyMutationToEventStore (
    eventStore,
    eventConfigBase,
    mutation,
    context
  ) {
    const eventConfigs = compileEventUis(eventStore.defs, eventConfigBase)
    const dest = createEmptyEventStore()
    for (const defId in eventStore.defs) {
      var def = eventStore.defs[defId]
      dest.defs[defId] = applyMutationToEventDef(
        def,
        eventConfigs[defId],
        mutation,
        context
      )
    }
    for (const instanceId in eventStore.instances) {
      const instance = eventStore.instances[instanceId]
      var def = dest.defs[instance.defId] // important to grab the newly modified def
      dest.instances[instanceId] = applyMutationToEventInstance(
        instance,
        def,
        eventConfigs[instance.defId],
        mutation,
        context
      )
    }
    return dest
  }

  function applyMutationToEventDef (eventDef, eventConfig, mutation, context) {
    const standardProps = mutation.standardProps || {}
    // if hasEnd has not been specified, guess a good value based on deltas.
    // if duration will change, there's no way the default duration will persist,
    // and thus, we need to mark the event as having a real end
    if (
      standardProps.hasEnd == null &&
      eventConfig.durationEditable &&
      (mutation.startDelta || mutation.endDelta)
    ) {
      standardProps.hasEnd = true // TODO: is this mutation okay?
    }
    const copy = __assign(__assign(__assign({}, eventDef), standardProps), {
      ui: __assign(__assign({}, eventDef.ui), standardProps.ui)
    })
    if (mutation.extendedProps) {
      copy.extendedProps = __assign(
        __assign({}, copy.extendedProps),
        mutation.extendedProps
      )
    }
    for (
      let _i = 0, _a = context.pluginHooks.eventDefMutationAppliers;
      _i < _a.length;
      _i++
    ) {
      const applier = _a[_i]
      applier(copy, mutation, context)
    }
    if (!copy.hasEnd && context.options.forceEventDuration) {
      copy.hasEnd = true
    }
    return copy
  }

  function applyMutationToEventInstance (
    eventInstance,
    eventDef, // must first be modified by applyMutationToEventDef
    eventConfig,
    mutation,
    context
  ) {
    const dateEnv = context.dateEnv
    const forceAllDay =
      mutation.standardProps && mutation.standardProps.allDay === true
    const clearEnd =
      mutation.standardProps && mutation.standardProps.hasEnd === false
    const copy = __assign({}, eventInstance)
    if (forceAllDay) {
      copy.range = computeAlignedDayRange(copy.range)
    }
    if (mutation.datesDelta && eventConfig.startEditable) {
      copy.range = {
        start: dateEnv.add(copy.range.start, mutation.datesDelta),
        end: dateEnv.add(copy.range.end, mutation.datesDelta)
      }
    }
    if (mutation.startDelta && eventConfig.durationEditable) {
      copy.range = {
        start: dateEnv.add(copy.range.start, mutation.startDelta),
        end: copy.range.end
      }
    }
    if (mutation.endDelta && eventConfig.durationEditable) {
      copy.range = {
        start: copy.range.start,
        end: dateEnv.add(copy.range.end, mutation.endDelta)
      }
    }
    if (clearEnd) {
      copy.range = {
        start: copy.range.start,
        end: getDefaultEventEnd(eventDef.allDay, copy.range.start, context)
      }
    }
    // in case event was all-day but the supplied deltas were not
    // better util for this?
    if (eventDef.allDay) {
      copy.range = {
        start: startOfDay(copy.range.start),
        end: startOfDay(copy.range.end)
      }
    }
    // handle invalid durations
    if (copy.range.end < copy.range.start) {
      copy.range.end = getDefaultEventEnd(
        eventDef.allDay,
        copy.range.start,
        context
      )
    }
    return copy
  }

  // no public types yet. when there are, export from:
  // import {} from './api-type-deps'
  const ViewApi = /** @class */ (function () {
    function ViewApi (type, getCurrentData, dateEnv) {
      this.type = type
      this.getCurrentData = getCurrentData
      this.dateEnv = dateEnv
    }

    Object.defineProperty(ViewApi.prototype, 'calendar', {
      get: function () {
        return this.getCurrentData().calendarApi
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(ViewApi.prototype, 'title', {
      get: function () {
        return this.getCurrentData().viewTitle
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(ViewApi.prototype, 'activeStart', {
      get: function () {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.activeRange.start
        )
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(ViewApi.prototype, 'activeEnd', {
      get: function () {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.activeRange.end
        )
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(ViewApi.prototype, 'currentStart', {
      get: function () {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.currentRange.start
        )
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(ViewApi.prototype, 'currentEnd', {
      get: function () {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.currentRange.end
        )
      },
      enumerable: false,
      configurable: true
    })
    ViewApi.prototype.getOption = function (name) {
      return this.getCurrentData().options[name] // are the view-specific options
    }
    return ViewApi
  })()

  const EVENT_SOURCE_REFINERS = {
    id: String,
    defaultAllDay: Boolean,
    url: String,
    events: identity,
    eventDataTransform: identity,
    // for any network-related sources
    success: identity,
    failure: identity
  }

  function parseEventSource (raw, context, refiners) {
    if (refiners === void 0) {
      refiners = buildEventSourceRefiners(context)
    }
    let rawObj
    if (typeof raw === 'string') {
      rawObj = { url: raw }
    } else if (typeof raw === 'function' || Array.isArray(raw)) {
      rawObj = { events: raw }
    } else if (typeof raw === 'object' && raw) {
      // not null
      rawObj = raw
    }
    if (rawObj) {
      const _a = refineProps(rawObj, refiners)
      const refined = _a.refined
      const extra = _a.extra
      const metaRes = buildEventSourceMeta(refined, context)
      if (metaRes) {
        return {
          _raw: raw,
          isFetching: false,
          latestFetchId: '',
          fetchRange: null,
          defaultAllDay: refined.defaultAllDay,
          eventDataTransform: refined.eventDataTransform,
          success: refined.success,
          failure: refined.failure,
          publicId: refined.id || '',
          sourceId: guid(),
          sourceDefId: metaRes.sourceDefId,
          meta: metaRes.meta,
          ui: createEventUi(refined, context),
          extendedProps: extra
        }
      }
    }
    return null
  }

  function buildEventSourceRefiners (context) {
    return __assign(
      __assign(__assign({}, EVENT_UI_REFINERS), EVENT_SOURCE_REFINERS),
      context.pluginHooks.eventSourceRefiners
    )
  }

  function buildEventSourceMeta (raw, context) {
    const defs = context.pluginHooks.eventSourceDefs
    for (let i = defs.length - 1; i >= 0; i--) {
      // later-added plugins take precedence
      const def = defs[i]
      const meta = def.parseMeta(raw)
      if (meta) {
        return { sourceDefId: i, meta }
      }
    }
    return null
  }

  function reduceCurrentDate (currentDate, action) {
    switch (action.type) {
      case 'CHANGE_DATE':
        return action.dateMarker
      default:
        return currentDate
    }
  }

  function getInitialDate (options, dateEnv) {
    const initialDateInput = options.initialDate
    // compute the initial ambig-timezone date
    if (initialDateInput != null) {
      return dateEnv.createMarker(initialDateInput)
    } else {
      return getNow(options.now, dateEnv) // getNow already returns unzoned
    }
  }

  function getNow (nowInput, dateEnv) {
    if (typeof nowInput === 'function') {
      nowInput = nowInput()
    }
    if (nowInput == null) {
      return dateEnv.createNowMarker()
    }
    return dateEnv.createMarker(nowInput)
  }

  const CalendarApi = /** @class */ (function () {
    function CalendarApi () {}

    CalendarApi.prototype.getCurrentData = function () {
      return this.currentDataManager.getCurrentData()
    }
    CalendarApi.prototype.dispatch = function (action) {
      return this.currentDataManager.dispatch(action)
    }
    Object.defineProperty(CalendarApi.prototype, 'view', {
      get: function () {
        return this.getCurrentData().viewApi
      }, // for public API
      enumerable: false,
      configurable: true
    })
    CalendarApi.prototype.batchRendering = function (callback) {
      callback()
    }
    CalendarApi.prototype.updateSize = function () {
      this.trigger('_resize', true)
    }
    // Options
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.setOption = function (name, val) {
      this.dispatch({
        type: 'SET_OPTION',
        optionName: name,
        rawOptionValue: val
      })
    }
    CalendarApi.prototype.getOption = function (name) {
      return this.currentDataManager.currentCalendarOptionsInput[name]
    }
    CalendarApi.prototype.getAvailableLocaleCodes = function () {
      return Object.keys(this.getCurrentData().availableRawLocales)
    }
    // Trigger
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.on = function (handlerName, handler) {
      const currentDataManager = this.currentDataManager
      if (currentDataManager.currentCalendarOptionsRefiners[handlerName]) {
        currentDataManager.emitter.on(handlerName, handler)
      } else {
        console.warn("Unknown listener name '" + handlerName + "'")
      }
    }
    CalendarApi.prototype.off = function (handlerName, handler) {
      this.currentDataManager.emitter.off(handlerName, handler)
    }
    // not meant for public use
    CalendarApi.prototype.trigger = function (handlerName) {
      let _a
      const args = []
      for (let _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i]
      }
      (_a = this.currentDataManager.emitter).trigger.apply(
        _a,
        __spreadArrays([handlerName], args)
      )
    }
    // View
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.changeView = function (viewType, dateOrRange) {
      const _this = this
      this.batchRendering(function () {
        _this.unselect()
        if (dateOrRange) {
          if (dateOrRange.start && dateOrRange.end) {
            // a range
            _this.dispatch({
              type: 'CHANGE_VIEW_TYPE',
              viewType
            })
            _this.dispatch({
              type: 'SET_OPTION',
              optionName: 'visibleRange',
              rawOptionValue: dateOrRange
            })
          } else {
            const dateEnv = _this.getCurrentData().dateEnv
            _this.dispatch({
              type: 'CHANGE_VIEW_TYPE',
              viewType,
              dateMarker: dateEnv.createMarker(dateOrRange)
            })
          }
        } else {
          _this.dispatch({
            type: 'CHANGE_VIEW_TYPE',
            viewType
          })
        }
      })
    }
    // Forces navigation to a view for the given date.
    // `viewType` can be a specific view name or a generic one like "week" or "day".
    // needs to change
    CalendarApi.prototype.zoomTo = function (dateMarker, viewType) {
      const state = this.getCurrentData()
      let spec
      viewType = viewType || 'day' // day is default zoom
      spec = state.viewSpecs[viewType] || this.getUnitViewSpec(viewType)
      this.unselect()
      if (spec) {
        this.dispatch({
          type: 'CHANGE_VIEW_TYPE',
          viewType: spec.type,
          dateMarker
        })
      } else {
        this.dispatch({
          type: 'CHANGE_DATE',
          dateMarker
        })
      }
    }
    // Given a duration singular unit, like "week" or "day", finds a matching view spec.
    // Preference is given to views that have corresponding buttons.
    CalendarApi.prototype.getUnitViewSpec = function (unit) {
      const _a = this.getCurrentData()
      const viewSpecs = _a.viewSpecs
      const toolbarConfig = _a.toolbarConfig
      const viewTypes = [].concat(toolbarConfig.viewsWithButtons)
      let i
      let spec
      for (const viewType in viewSpecs) {
        viewTypes.push(viewType)
      }
      for (i = 0; i < viewTypes.length; i++) {
        spec = viewSpecs[viewTypes[i]]
        if (spec) {
          if (spec.singleUnit === unit) {
            return spec
          }
        }
      }
    }
    // Current Date
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.prev = function () {
      this.unselect()
      this.dispatch({ type: 'PREV' })
    }
    CalendarApi.prototype.next = function () {
      this.unselect()
      this.dispatch({ type: 'NEXT' })
    }
    CalendarApi.prototype.prevYear = function () {
      const state = this.getCurrentData()
      this.unselect()
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker: state.dateEnv.addYears(state.currentDate, -1)
      })
    }
    CalendarApi.prototype.nextYear = function () {
      const state = this.getCurrentData()
      this.unselect()
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker: state.dateEnv.addYears(state.currentDate, 1)
      })
    }
    CalendarApi.prototype.today = function () {
      const state = this.getCurrentData()
      this.unselect()
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker: getNow(state.calendarOptions.now, state.dateEnv)
      })
    }
    CalendarApi.prototype.gotoDate = function (zonedDateInput) {
      const state = this.getCurrentData()
      this.unselect()
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker: state.dateEnv.createMarker(zonedDateInput)
      })
    }
    CalendarApi.prototype.incrementDate = function (deltaInput) {
      const state = this.getCurrentData()
      const delta = createDuration(deltaInput)
      if (delta) {
        // else, warn about invalid input?
        this.unselect()
        this.dispatch({
          type: 'CHANGE_DATE',
          dateMarker: state.dateEnv.add(state.currentDate, delta)
        })
      }
    }
    // for external API
    CalendarApi.prototype.getDate = function () {
      const state = this.getCurrentData()
      return state.dateEnv.toDate(state.currentDate)
    }
    // Date Formatting Utils
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.formatDate = function (d, formatter) {
      const dateEnv = this.getCurrentData().dateEnv
      return dateEnv.format(
        dateEnv.createMarker(d),
        createFormatter(formatter)
      )
    }
    // `settings` is for formatter AND isEndExclusive
    CalendarApi.prototype.formatRange = function (d0, d1, settings) {
      const dateEnv = this.getCurrentData().dateEnv
      return dateEnv.formatRange(
        dateEnv.createMarker(d0),
        dateEnv.createMarker(d1),
        createFormatter(settings),
        settings
      )
    }
    CalendarApi.prototype.formatIso = function (d, omitTime) {
      const dateEnv = this.getCurrentData().dateEnv
      return dateEnv.formatIso(dateEnv.createMarker(d), { omitTime })
    }
    // Date Selection / Event Selection / DayClick
    // -----------------------------------------------------------------------------------------------------------------
    // this public method receives start/end dates in any format, with any timezone
    // NOTE: args were changed from v3
    CalendarApi.prototype.select = function (dateOrObj, endDate) {
      let selectionInput
      if (endDate == null) {
        if (dateOrObj.start != null) {
          selectionInput = dateOrObj
        } else {
          selectionInput = {
            start: dateOrObj,
            end: null
          }
        }
      } else {
        selectionInput = {
          start: dateOrObj,
          end: endDate
        }
      }
      const state = this.getCurrentData()
      const selection = parseDateSpan(
        selectionInput,
        state.dateEnv,
        createDuration({ days: 1 }) // TODO: cache this?
      )
      if (selection) {
        // throw parse error otherwise?
        this.dispatch({ type: 'SELECT_DATES', selection })
        triggerDateSelect(selection, null, state)
      }
    }
    // public method
    CalendarApi.prototype.unselect = function (pev) {
      const state = this.getCurrentData()
      if (state.dateSelection) {
        this.dispatch({ type: 'UNSELECT_DATES' })
        triggerDateUnselect(pev, state)
      }
    }
    // Public Events API
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.addEvent = function (eventInput, sourceInput) {
      if (eventInput instanceof EventApi) {
        const def = eventInput._def
        const instance = eventInput._instance
        const currentData = this.getCurrentData()
        // not already present? don't want to add an old snapshot
        if (!currentData.eventStore.defs[def.defId]) {
          this.dispatch({
            type: 'ADD_EVENTS',
            eventStore: eventTupleToStore({ def, instance }) // TODO: better util for two args?
          })
          this.triggerEventAdd(eventInput)
        }
        return eventInput
      }
      const state = this.getCurrentData()
      let eventSource
      if (sourceInput instanceof EventSourceApi) {
        eventSource = sourceInput.internalEventSource
      } else if (typeof sourceInput === 'boolean') {
        if (sourceInput) {
          // true. part of the first event source
          eventSource = hashValuesToArray(state.eventSources)[0]
        }
      } else if (sourceInput != null) {
        // an ID. accepts a number too
        const sourceApi = this.getEventSourceById(sourceInput) // TODO: use an internal function
        if (!sourceApi) {
          console.warn(
            'Could not find an event source with ID "' + sourceInput + '"'
          ) // TODO: test
          return null
        } else {
          eventSource = sourceApi.internalEventSource
        }
      }
      const tuple = parseEvent(eventInput, eventSource, state, false)
      if (tuple) {
        const newEventApi = new EventApi(
          state,
          tuple.def,
          tuple.def.recurringDef ? null : tuple.instance
        )
        this.dispatch({
          type: 'ADD_EVENTS',
          eventStore: eventTupleToStore(tuple)
        })
        this.triggerEventAdd(newEventApi)
        return newEventApi
      }
      return null
    }
    CalendarApi.prototype.triggerEventAdd = function (eventApi) {
      const _this = this
      const emitter = this.getCurrentData().emitter
      emitter.trigger('eventAdd', {
        event: eventApi,
        relatedEvents: [],
        revert: function () {
          _this.dispatch({
            type: 'REMOVE_EVENTS',
            eventStore: eventApiToStore(eventApi)
          })
        }
      })
    }
    // TODO: optimize
    CalendarApi.prototype.getEventById = function (id) {
      const state = this.getCurrentData()
      const _a = state.eventStore
      const defs = _a.defs
      const instances = _a.instances
      id = String(id)
      for (const defId in defs) {
        const def = defs[defId]
        if (def.publicId === id) {
          if (def.recurringDef) {
            return new EventApi(state, def, null)
          } else {
            for (const instanceId in instances) {
              const instance = instances[instanceId]
              if (instance.defId === def.defId) {
                return new EventApi(state, def, instance)
              }
            }
          }
        }
      }
      return null
    }
    CalendarApi.prototype.getEvents = function () {
      const currentData = this.getCurrentData()
      return buildEventApis(currentData.eventStore, currentData)
    }
    CalendarApi.prototype.removeAllEvents = function () {
      this.dispatch({ type: 'REMOVE_ALL_EVENTS' })
    }
    // Public Event Sources API
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.getEventSources = function () {
      const state = this.getCurrentData()
      const sourceHash = state.eventSources
      const sourceApis = []
      for (const internalId in sourceHash) {
        sourceApis.push(new EventSourceApi(state, sourceHash[internalId]))
      }
      return sourceApis
    }
    CalendarApi.prototype.getEventSourceById = function (id) {
      const state = this.getCurrentData()
      const sourceHash = state.eventSources
      id = String(id)
      for (const sourceId in sourceHash) {
        if (sourceHash[sourceId].publicId === id) {
          return new EventSourceApi(state, sourceHash[sourceId])
        }
      }
      return null
    }
    CalendarApi.prototype.addEventSource = function (sourceInput) {
      const state = this.getCurrentData()
      if (sourceInput instanceof EventSourceApi) {
        // not already present? don't want to add an old snapshot
        if (!state.eventSources[sourceInput.internalEventSource.sourceId]) {
          this.dispatch({
            type: 'ADD_EVENT_SOURCES',
            sources: [sourceInput.internalEventSource]
          })
        }
        return sourceInput
      }
      const eventSource = parseEventSource(sourceInput, state)
      if (eventSource) {
        // TODO: error otherwise?
        this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: [eventSource] })
        return new EventSourceApi(state, eventSource)
      }
      return null
    }
    CalendarApi.prototype.removeAllEventSources = function () {
      this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' })
    }
    CalendarApi.prototype.refetchEvents = function () {
      this.dispatch({ type: 'FETCH_EVENT_SOURCES' })
    }
    // Scroll
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.scrollToTime = function (timeInput) {
      const time = createDuration(timeInput)
      if (time) {
        this.trigger('_scrollRequest', { time })
      }
    }
    return CalendarApi
  })()

  var EventApi = /** @class */ (function () {
    // instance will be null if expressing a recurring event that has no current instances,
    // OR if trying to validate an incoming external event that has no dates assigned
    function EventApi (context, def, instance) {
      this._context = context
      this._def = def
      this._instance = instance || null
    }

    /*
        TODO: make event struct more responsible for this
        */
    EventApi.prototype.setProp = function (name, val) {
      let _a, _b
      if (name in EVENT_DATE_REFINERS) {
        console.warn(
          "Could not set date-related prop 'name'. Use one of the date-related methods instead."
        )
      } else if (name in EVENT_NON_DATE_REFINERS) {
        val = EVENT_NON_DATE_REFINERS[name](val)
        this.mutate({
          standardProps: ((_a = {}), (_a[name] = val), _a)
        })
      } else if (name in EVENT_UI_REFINERS) {
        let ui = EVENT_UI_REFINERS[name](val)
        if (name === 'color') {
          ui = { backgroundColor: val, borderColor: val }
        } else if (name === 'editable') {
          ui = { startEditable: val, durationEditable: val }
        } else {
          ui = ((_b = {}), (_b[name] = val), _b)
        }
        this.mutate({
          standardProps: { ui }
        })
      } else {
        console.warn(
          "Could not set prop '" + name + "'. Use setExtendedProp instead."
        )
      }
    }
    EventApi.prototype.setExtendedProp = function (name, val) {
      let _a
      this.mutate({
        extendedProps: ((_a = {}), (_a[name] = val), _a)
      })
    }
    EventApi.prototype.setStart = function (startInput, options) {
      if (options === void 0) {
        options = {}
      }
      const dateEnv = this._context.dateEnv
      const start = dateEnv.createMarker(startInput)
      if (start && this._instance) {
        // TODO: warning if parsed bad
        const instanceRange = this._instance.range
        const startDelta = diffDates(
          instanceRange.start,
          start,
          dateEnv,
          options.granularity
        ) // what if parsed bad!?
        if (options.maintainDuration) {
          this.mutate({ datesDelta: startDelta })
        } else {
          this.mutate({ startDelta })
        }
      }
    }
    EventApi.prototype.setEnd = function (endInput, options) {
      if (options === void 0) {
        options = {}
      }
      const dateEnv = this._context.dateEnv
      let end
      if (endInput != null) {
        end = dateEnv.createMarker(endInput)
        if (!end) {
          return // TODO: warning if parsed bad
        }
      }
      if (this._instance) {
        if (end) {
          const endDelta = diffDates(
            this._instance.range.end,
            end,
            dateEnv,
            options.granularity
          )
          this.mutate({ endDelta })
        } else {
          this.mutate({ standardProps: { hasEnd: false } })
        }
      }
    }
    EventApi.prototype.setDates = function (startInput, endInput, options) {
      if (options === void 0) {
        options = {}
      }
      const dateEnv = this._context.dateEnv
      const standardProps = { allDay: options.allDay }
      const start = dateEnv.createMarker(startInput)
      let end
      if (!start) {
        return // TODO: warning if parsed bad
      }
      if (endInput != null) {
        end = dateEnv.createMarker(endInput)
        if (!end) {
          // TODO: warning if parsed bad
          return
        }
      }
      if (this._instance) {
        let instanceRange = this._instance.range
        // when computing the diff for an event being converted to all-day,
        // compute diff off of the all-day values the way event-mutation does.
        if (options.allDay === true) {
          instanceRange = computeAlignedDayRange(instanceRange)
        }
        const startDelta = diffDates(
          instanceRange.start,
          start,
          dateEnv,
          options.granularity
        )
        if (end) {
          const endDelta = diffDates(
            instanceRange.end,
            end,
            dateEnv,
            options.granularity
          )
          if (durationsEqual(startDelta, endDelta)) {
            this.mutate({
              datesDelta: startDelta,
              standardProps
            })
          } else {
            this.mutate({
              startDelta,
              endDelta,
              standardProps
            })
          }
        } else {
          // means "clear the end"
          standardProps.hasEnd = false
          this.mutate({ datesDelta: startDelta, standardProps })
        }
      }
    }
    EventApi.prototype.moveStart = function (deltaInput) {
      const delta = createDuration(deltaInput)
      if (delta) {
        // TODO: warning if parsed bad
        this.mutate({ startDelta: delta })
      }
    }
    EventApi.prototype.moveEnd = function (deltaInput) {
      const delta = createDuration(deltaInput)
      if (delta) {
        // TODO: warning if parsed bad
        this.mutate({ endDelta: delta })
      }
    }
    EventApi.prototype.moveDates = function (deltaInput) {
      const delta = createDuration(deltaInput)
      if (delta) {
        // TODO: warning if parsed bad
        this.mutate({ datesDelta: delta })
      }
    }
    EventApi.prototype.setAllDay = function (allDay, options) {
      if (options === void 0) {
        options = {}
      }
      const standardProps = { allDay }
      let maintainDuration = options.maintainDuration
      if (maintainDuration == null) {
        maintainDuration = this._context.options.allDayMaintainDuration
      }
      if (this._def.allDay !== allDay) {
        standardProps.hasEnd = maintainDuration
      }
      this.mutate({ standardProps })
    }
    EventApi.prototype.formatRange = function (formatInput) {
      const dateEnv = this._context.dateEnv
      const instance = this._instance
      const formatter = createFormatter(formatInput)
      if (this._def.hasEnd) {
        return dateEnv.formatRange(
          instance.range.start,
          instance.range.end,
          formatter,
          {
            forcedStartTzo: instance.forcedStartTzo,
            forcedEndTzo: instance.forcedEndTzo
          }
        )
      } else {
        return dateEnv.format(instance.range.start, formatter, {
          forcedTzo: instance.forcedStartTzo
        })
      }
    }
    EventApi.prototype.mutate = function (mutation) {
      const instance = this._instance
      if (instance) {
        const def = this._def
        const context_1 = this._context
        const eventStore = context_1.getCurrentData().eventStore
        let relevantEvents_1 = getRelevantEvents(
          eventStore,
          instance.instanceId
        )
        const eventConfigBase = {
          '': {
            display: '',
            startEditable: true,
            durationEditable: true,
            constraints: [],
            overlap: null,
            allows: [],
            backgroundColor: '',
            borderColor: '',
            textColor: '',
            classNames: []
          }
        }
        relevantEvents_1 = applyMutationToEventStore(
          relevantEvents_1,
          eventConfigBase,
          mutation,
          context_1
        )
        const oldEvent = new EventApi(context_1, def, instance) // snapshot
        this._def = relevantEvents_1.defs[def.defId]
        this._instance = relevantEvents_1.instances[instance.instanceId]
        context_1.dispatch({
          type: 'MERGE_EVENTS',
          eventStore: relevantEvents_1
        })
        context_1.emitter.trigger('eventChange', {
          oldEvent,
          event: this,
          relatedEvents: buildEventApis(relevantEvents_1, context_1, instance),
          revert: function () {
            context_1.dispatch({
              type: 'REMOVE_EVENTS',
              eventStore: relevantEvents_1
            })
          }
        })
      }
    }
    EventApi.prototype.remove = function () {
      const context = this._context
      const asStore = eventApiToStore(this)
      context.dispatch({
        type: 'REMOVE_EVENTS',
        eventStore: asStore
      })
      context.emitter.trigger('eventRemove', {
        event: this,
        relatedEvents: [],
        revert: function () {
          context.dispatch({
            type: 'MERGE_EVENTS',
            eventStore: asStore
          })
        }
      })
    }
    Object.defineProperty(EventApi.prototype, 'source', {
      get: function () {
        const sourceId = this._def.sourceId
        if (sourceId) {
          return new EventSourceApi(
            this._context,
            this._context.getCurrentData().eventSources[sourceId]
          )
        }
        return null
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'start', {
      get: function () {
        return this._instance
          ? this._context.dateEnv.toDate(this._instance.range.start)
          : null
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'end', {
      get: function () {
        return this._instance && this._def.hasEnd
          ? this._context.dateEnv.toDate(this._instance.range.end)
          : null
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'startStr', {
      get: function () {
        const instance = this._instance
        if (instance) {
          return this._context.dateEnv.formatIso(instance.range.start, {
            omitTime: this._def.allDay,
            forcedTzo: instance.forcedStartTzo
          })
        }
        return ''
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'endStr', {
      get: function () {
        const instance = this._instance
        if (instance && this._def.hasEnd) {
          return this._context.dateEnv.formatIso(instance.range.end, {
            omitTime: this._def.allDay,
            forcedTzo: instance.forcedEndTzo
          })
        }
        return ''
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'id', {
      // computable props that all access the def
      // TODO: find a TypeScript-compatible way to do this at scale
      get: function () {
        return this._def.publicId
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'groupId', {
      get: function () {
        return this._def.groupId
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'allDay', {
      get: function () {
        return this._def.allDay
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'title', {
      get: function () {
        return this._def.title
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'url', {
      get: function () {
        return this._def.url
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'display', {
      get: function () {
        return this._def.ui.display || 'auto'
      }, // bad. just normalize the type earlier
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'startEditable', {
      get: function () {
        return this._def.ui.startEditable
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'durationEditable', {
      get: function () {
        return this._def.ui.durationEditable
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'constraint', {
      get: function () {
        return this._def.ui.constraints[0] || null
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'overlap', {
      get: function () {
        return this._def.ui.overlap
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'allow', {
      get: function () {
        return this._def.ui.allows[0] || null
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'backgroundColor', {
      get: function () {
        return this._def.ui.backgroundColor
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'borderColor', {
      get: function () {
        return this._def.ui.borderColor
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'textColor', {
      get: function () {
        return this._def.ui.textColor
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'classNames', {
      // NOTE: user can't modify these because Object.freeze was called in event-def parsing
      get: function () {
        return this._def.ui.classNames
      },
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'extendedProps', {
      get: function () {
        return this._def.extendedProps
      },
      enumerable: false,
      configurable: true
    })
    EventApi.prototype.toPlainObject = function (settings) {
      if (settings === void 0) {
        settings = {}
      }
      const def = this._def
      const ui = def.ui
      const _a = this
      const startStr = _a.startStr
      const endStr = _a.endStr
      const res = {}
      if (def.title) {
        res.title = def.title
      }
      if (startStr) {
        res.start = startStr
      }
      if (endStr) {
        res.end = endStr
      }
      if (def.publicId) {
        res.id = def.publicId
      }
      if (def.groupId) {
        res.groupId = def.groupId
      }
      if (def.url) {
        res.url = def.url
      }
      if (ui.display && ui.display !== 'auto') {
        res.display = ui.display
      }
      // TODO: what about recurring-event properties???
      // TODO: include startEditable/durationEditable/constraint/overlap/allow
      if (
        settings.collapseColor &&
        ui.backgroundColor &&
        ui.backgroundColor === ui.borderColor
      ) {
        res.color = ui.backgroundColor
      } else {
        if (ui.backgroundColor) {
          res.backgroundColor = ui.backgroundColor
        }
        if (ui.borderColor) {
          res.borderColor = ui.borderColor
        }
      }
      if (ui.textColor) {
        res.textColor = ui.textColor
      }
      if (ui.classNames.length) {
        res.classNames = ui.classNames
      }
      if (Object.keys(def.extendedProps).length) {
        if (settings.collapseExtendedProps) {
          __assign(res, def.extendedProps)
        } else {
          res.extendedProps = def.extendedProps
        }
      }
      return res
    }
    EventApi.prototype.toJSON = function () {
      return this.toPlainObject()
    }
    return EventApi
  })()

  function eventApiToStore (eventApi) {
    let _a, _b
    const def = eventApi._def
    const instance = eventApi._instance
    return {
      defs: ((_a = {}), (_a[def.defId] = def), _a),
      instances: instance
        ? ((_b = {}), (_b[instance.instanceId] = instance), _b)
        : {}
    }
  }

  function buildEventApis (eventStore, context, excludeInstance) {
    const defs = eventStore.defs
    const instances = eventStore.instances
    const eventApis = []
    const excludeInstanceId = excludeInstance ? excludeInstance.instanceId : ''
    for (const id in instances) {
      const instance = instances[id]
      const def = defs[instance.defId]
      if (instance.instanceId !== excludeInstanceId) {
        eventApis.push(new EventApi(context, def, instance))
      }
    }
    return eventApis
  }

  const calendarSystemClassMap = {}

  function registerCalendarSystem (name, theClass) {
    calendarSystemClassMap[name] = theClass
  }

  function createCalendarSystem (name) {
    return new calendarSystemClassMap[name]()
  }

  const GregorianCalendarSystem = /** @class */ (function () {
    function GregorianCalendarSystem () {}

    GregorianCalendarSystem.prototype.getMarkerYear = function (d) {
      return d.getUTCFullYear()
    }
    GregorianCalendarSystem.prototype.getMarkerMonth = function (d) {
      return d.getUTCMonth()
    }
    GregorianCalendarSystem.prototype.getMarkerDay = function (d) {
      return d.getUTCDate()
    }
    GregorianCalendarSystem.prototype.arrayToMarker = function (arr) {
      return arrayToUtcDate(arr)
    }
    GregorianCalendarSystem.prototype.markerToArray = function (marker) {
      return dateToUtcArray(marker)
    }
    return GregorianCalendarSystem
  })()
  registerCalendarSystem('gregory', GregorianCalendarSystem)

  const ISO_RE =
    /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/

  function parse (str) {
    const m = ISO_RE.exec(str)
    if (m) {
      const marker = new Date(
        Date.UTC(
          Number(m[1]),
          m[3] ? Number(m[3]) - 1 : 0,
          Number(m[5] || 1),
          Number(m[7] || 0),
          Number(m[8] || 0),
          Number(m[10] || 0),
          m[12] ? Number('0.' + m[12]) * 1000 : 0
        )
      )
      if (isValidDate(marker)) {
        let timeZoneOffset = null
        if (m[13]) {
          timeZoneOffset =
            (m[15] === '-' ? -1 : 1) *
            (Number(m[16] || 0) * 60 + Number(m[18] || 0))
        }
        return {
          marker,
          isTimeUnspecified: !m[6],
          timeZoneOffset
        }
      }
    }
    return null
  }

  const DateEnv = /** @class */ (function () {
    function DateEnv (settings) {
      const timeZone = (this.timeZone = settings.timeZone)
      const isNamedTimeZone = timeZone !== 'local' && timeZone !== 'UTC'
      if (settings.namedTimeZoneImpl && isNamedTimeZone) {
        this.namedTimeZoneImpl = new settings.namedTimeZoneImpl(timeZone)
      }
      this.canComputeOffset = Boolean(
        !isNamedTimeZone || this.namedTimeZoneImpl
      )
      this.calendarSystem = createCalendarSystem(settings.calendarSystem)
      this.locale = settings.locale
      this.weekDow = settings.locale.week.dow
      this.weekDoy = settings.locale.week.doy
      if (settings.weekNumberCalculation === 'ISO') {
        this.weekDow = 1
        this.weekDoy = 4
      }
      if (typeof settings.firstDay === 'number') {
        this.weekDow = settings.firstDay
      }
      if (typeof settings.weekNumberCalculation === 'function') {
        this.weekNumberFunc = settings.weekNumberCalculation
      }
      this.weekText =
        settings.weekText != null
          ? settings.weekText
          : settings.locale.options.weekText
      this.cmdFormatter = settings.cmdFormatter
      this.defaultSeparator = settings.defaultSeparator
    }

    // Creating / Parsing
    DateEnv.prototype.createMarker = function (input) {
      const meta = this.createMarkerMeta(input)
      if (meta === null) {
        return null
      }
      return meta.marker
    }
    DateEnv.prototype.createNowMarker = function () {
      if (this.canComputeOffset) {
        return this.timestampToMarker(new Date().valueOf())
      } else {
        // if we can't compute the current date val for a timezone,
        // better to give the current local date vals than UTC
        return arrayToUtcDate(dateToLocalArray(new Date()))
      }
    }
    DateEnv.prototype.createMarkerMeta = function (input) {
      if (typeof input === 'string') {
        return this.parse(input)
      }
      let marker = null
      if (typeof input === 'number') {
        marker = this.timestampToMarker(input)
      } else if (input instanceof Date) {
        input = input.valueOf()
        if (!isNaN(input)) {
          marker = this.timestampToMarker(input)
        }
      } else if (Array.isArray(input)) {
        marker = arrayToUtcDate(input)
      }
      if (marker === null || !isValidDate(marker)) {
        return null
      }
      return { marker, isTimeUnspecified: false, forcedTzo: null }
    }
    DateEnv.prototype.parse = function (s) {
      const parts = parse(s)
      if (parts === null) {
        return null
      }
      let marker = parts.marker
      let forcedTzo = null
      if (parts.timeZoneOffset !== null) {
        if (this.canComputeOffset) {
          marker = this.timestampToMarker(
            marker.valueOf() - parts.timeZoneOffset * 60 * 1000
          )
        } else {
          forcedTzo = parts.timeZoneOffset
        }
      }
      return {
        marker,
        isTimeUnspecified: parts.isTimeUnspecified,
        forcedTzo
      }
    }
    // Accessors
    DateEnv.prototype.getYear = function (marker) {
      return this.calendarSystem.getMarkerYear(marker)
    }
    DateEnv.prototype.getMonth = function (marker) {
      return this.calendarSystem.getMarkerMonth(marker)
    }
    // Adding / Subtracting
    DateEnv.prototype.add = function (marker, dur) {
      const a = this.calendarSystem.markerToArray(marker)
      a[0] += dur.years
      a[1] += dur.months
      a[2] += dur.days
      a[6] += dur.milliseconds
      return this.calendarSystem.arrayToMarker(a)
    }
    DateEnv.prototype.subtract = function (marker, dur) {
      const a = this.calendarSystem.markerToArray(marker)
      a[0] -= dur.years
      a[1] -= dur.months
      a[2] -= dur.days
      a[6] -= dur.milliseconds
      return this.calendarSystem.arrayToMarker(a)
    }
    DateEnv.prototype.addYears = function (marker, n) {
      const a = this.calendarSystem.markerToArray(marker)
      a[0] += n
      return this.calendarSystem.arrayToMarker(a)
    }
    DateEnv.prototype.addMonths = function (marker, n) {
      const a = this.calendarSystem.markerToArray(marker)
      a[1] += n
      return this.calendarSystem.arrayToMarker(a)
    }
    // Diffing Whole Units
    DateEnv.prototype.diffWholeYears = function (m0, m1) {
      const calendarSystem = this.calendarSystem
      if (
        timeAsMs(m0) === timeAsMs(m1) &&
        calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1) &&
        calendarSystem.getMarkerMonth(m0) === calendarSystem.getMarkerMonth(m1)
      ) {
        return (
          calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0)
        )
      }
      return null
    }
    DateEnv.prototype.diffWholeMonths = function (m0, m1) {
      const calendarSystem = this.calendarSystem
      if (
        timeAsMs(m0) === timeAsMs(m1) &&
        calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1)
      ) {
        return (
          calendarSystem.getMarkerMonth(m1) -
          calendarSystem.getMarkerMonth(m0) +
          (calendarSystem.getMarkerYear(m1) -
            calendarSystem.getMarkerYear(m0)) *
            12
        )
      }
      return null
    }
    // Range / Duration
    DateEnv.prototype.greatestWholeUnit = function (m0, m1) {
      let n = this.diffWholeYears(m0, m1)
      if (n !== null) {
        return { unit: 'year', value: n }
      }
      n = this.diffWholeMonths(m0, m1)
      if (n !== null) {
        return { unit: 'month', value: n }
      }
      n = diffWholeWeeks(m0, m1)
      if (n !== null) {
        return { unit: 'week', value: n }
      }
      n = diffWholeDays(m0, m1)
      if (n !== null) {
        return { unit: 'day', value: n }
      }
      n = diffHours(m0, m1)
      if (isInt(n)) {
        return { unit: 'hour', value: n }
      }
      n = diffMinutes(m0, m1)
      if (isInt(n)) {
        return { unit: 'minute', value: n }
      }
      n = diffSeconds(m0, m1)
      if (isInt(n)) {
        return { unit: 'second', value: n }
      }
      return { unit: 'millisecond', value: m1.valueOf() - m0.valueOf() }
    }
    DateEnv.prototype.countDurationsBetween = function (m0, m1, d) {
      // TODO: can use greatestWholeUnit
      let diff
      if (d.years) {
        diff = this.diffWholeYears(m0, m1)
        if (diff !== null) {
          return diff / asRoughYears(d)
        }
      }
      if (d.months) {
        diff = this.diffWholeMonths(m0, m1)
        if (diff !== null) {
          return diff / asRoughMonths(d)
        }
      }
      if (d.days) {
        diff = diffWholeDays(m0, m1)
        if (diff !== null) {
          return diff / asRoughDays(d)
        }
      }
      return (m1.valueOf() - m0.valueOf()) / asRoughMs(d)
    }
    // Start-Of
    // these DON'T return zoned-dates. only UTC start-of dates
    DateEnv.prototype.startOf = function (m, unit) {
      if (unit === 'year') {
        return this.startOfYear(m)
      } else if (unit === 'month') {
        return this.startOfMonth(m)
      } else if (unit === 'week') {
        return this.startOfWeek(m)
      } else if (unit === 'day') {
        return startOfDay(m)
      } else if (unit === 'hour') {
        return startOfHour(m)
      } else if (unit === 'minute') {
        return startOfMinute(m)
      } else if (unit === 'second') {
        return startOfSecond(m)
      }
    }
    DateEnv.prototype.startOfYear = function (m) {
      return this.calendarSystem.arrayToMarker([
        this.calendarSystem.getMarkerYear(m)
      ])
    }
    DateEnv.prototype.startOfMonth = function (m) {
      return this.calendarSystem.arrayToMarker([
        this.calendarSystem.getMarkerYear(m),
        this.calendarSystem.getMarkerMonth(m)
      ])
    }
    DateEnv.prototype.startOfWeek = function (m) {
      return this.calendarSystem.arrayToMarker([
        this.calendarSystem.getMarkerYear(m),
        this.calendarSystem.getMarkerMonth(m),
        m.getUTCDate() - ((m.getUTCDay() - this.weekDow + 7) % 7)
      ])
    }
    // Week Number
    DateEnv.prototype.computeWeekNumber = function (marker) {
      if (this.weekNumberFunc) {
        return this.weekNumberFunc(this.toDate(marker))
      } else {
        return weekOfYear(marker, this.weekDow, this.weekDoy)
      }
    }
    // TODO: choke on timeZoneName: long
    DateEnv.prototype.format = function (marker, formatter, dateOptions) {
      if (dateOptions === void 0) {
        dateOptions = {}
      }
      return formatter.format(
        {
          marker,
          timeZoneOffset:
            dateOptions.forcedTzo != null
              ? dateOptions.forcedTzo
              : this.offsetForMarker(marker)
        },
        this
      )
    }
    DateEnv.prototype.formatRange = function (
      start,
      end,
      formatter,
      dateOptions
    ) {
      if (dateOptions === void 0) {
        dateOptions = {}
      }
      if (dateOptions.isEndExclusive) {
        end = addMs(end, -1)
      }
      return formatter.formatRange(
        {
          marker: start,
          timeZoneOffset:
            dateOptions.forcedStartTzo != null
              ? dateOptions.forcedStartTzo
              : this.offsetForMarker(start)
        },
        {
          marker: end,
          timeZoneOffset:
            dateOptions.forcedEndTzo != null
              ? dateOptions.forcedEndTzo
              : this.offsetForMarker(end)
        },
        this,
        dateOptions.defaultSeparator
      )
    }
    /*
        DUMB: the omitTime arg is dumb. if we omit the time, we want to omit the timezone offset. and if we do that,
        might as well use buildIsoString or some other util directly
        */
    DateEnv.prototype.formatIso = function (marker, extraOptions) {
      if (extraOptions === void 0) {
        extraOptions = {}
      }
      let timeZoneOffset = null
      if (!extraOptions.omitTimeZoneOffset) {
        if (extraOptions.forcedTzo != null) {
          timeZoneOffset = extraOptions.forcedTzo
        } else {
          timeZoneOffset = this.offsetForMarker(marker)
        }
      }
      return buildIsoString(marker, timeZoneOffset, extraOptions.omitTime)
    }
    // TimeZone
    DateEnv.prototype.timestampToMarker = function (ms) {
      if (this.timeZone === 'local') {
        return arrayToUtcDate(dateToLocalArray(new Date(ms)))
      } else if (this.timeZone === 'UTC' || !this.namedTimeZoneImpl) {
        return new Date(ms)
      } else {
        return arrayToUtcDate(this.namedTimeZoneImpl.timestampToArray(ms))
      }
    }
    DateEnv.prototype.offsetForMarker = function (m) {
      if (this.timeZone === 'local') {
        return -arrayToLocalDate(dateToUtcArray(m)).getTimezoneOffset() // convert "inverse" offset to "normal" offset
      } else if (this.timeZone === 'UTC') {
        return 0
      } else if (this.namedTimeZoneImpl) {
        return this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m))
      }
      return null
    }
    // Conversion
    DateEnv.prototype.toDate = function (m, forcedTzo) {
      if (this.timeZone === 'local') {
        return arrayToLocalDate(dateToUtcArray(m))
      } else if (this.timeZone === 'UTC') {
        return new Date(m.valueOf()) // make sure it's a copy
      } else if (!this.namedTimeZoneImpl) {
        return new Date(m.valueOf() - (forcedTzo || 0))
      } else {
        return new Date(
          m.valueOf() -
            this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m)) *
              1000 *
              60 // convert minutes -> ms
        )
      }
    }
    return DateEnv
  })()

  const globalLocales = []

  const RAW_EN_LOCALE = {
    code: 'en',
    week: {
      dow: 0,
      doy: 4 // 4 days need to be within the year to be considered the first week
    },
    direction: 'ltr',
    buttonText: {
      prev: 'prev',
      next: 'next',
      prevYear: 'prev year',
      nextYear: 'next year',
      year: 'year',
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day',
      list: 'list'
    },
    weekText: 'W',
    allDayText: 'all-day',
    moreLinkText: 'more',
    noEventsText: 'No events to display'
  }

  function organizeRawLocales (explicitRawLocales) {
    const defaultCode =
      explicitRawLocales.length > 0 ? explicitRawLocales[0].code : 'en'
    const allRawLocales = globalLocales.concat(explicitRawLocales)
    const rawLocaleMap = {
      en: RAW_EN_LOCALE // necessary?
    }
    for (
      let _i = 0, allRawLocales_1 = allRawLocales;
      _i < allRawLocales_1.length;
      _i++
    ) {
      const rawLocale = allRawLocales_1[_i]
      rawLocaleMap[rawLocale.code] = rawLocale
    }
    return {
      map: rawLocaleMap,
      defaultCode
    }
  }

  function buildLocale (inputSingular, available) {
    if (typeof inputSingular === 'object' && !Array.isArray(inputSingular)) {
      return parseLocale(
        inputSingular.code,
        [inputSingular.code],
        inputSingular
      )
    } else {
      return queryLocale(inputSingular, available)
    }
  }

  function queryLocale (codeArg, available) {
    const codes = [].concat(codeArg || []) // will convert to array
    const raw = queryRawLocale(codes, available) || RAW_EN_LOCALE
    return parseLocale(codeArg, codes, raw)
  }

  function queryRawLocale (codes, available) {
    for (let i = 0; i < codes.length; i++) {
      const parts = codes[i].toLocaleLowerCase().split('-')
      for (let j = parts.length; j > 0; j--) {
        const simpleId = parts.slice(0, j).join('-')
        if (available[simpleId]) {
          return available[simpleId]
        }
      }
    }
    return null
  }

  function parseLocale (codeArg, codes, raw) {
    const merged = mergeProps([RAW_EN_LOCALE, raw], ['buttonText'])
    delete merged.code // don't want this part of the options
    const week = merged.week
    delete merged.week
    return {
      codeArg,
      codes,
      week,
      simpleNumberFormat: new Intl.NumberFormat(codeArg),
      options: merged
    }
  }

  function formatDate (dateInput, options) {
    if (options === void 0) {
      options = {}
    }
    const dateEnv = buildDateEnv(options)
    const formatter = createFormatter(options)
    const dateMeta = dateEnv.createMarkerMeta(dateInput)
    if (!dateMeta) {
      // TODO: warning?
      return ''
    }
    return dateEnv.format(dateMeta.marker, formatter, {
      forcedTzo: dateMeta.forcedTzo
    })
  }

  function formatRange (
    startInput,
    endInput,
    options // mixture of env and formatter settings
  ) {
    const dateEnv = buildDateEnv(
      typeof options === 'object' && options ? options : {}
    ) // pass in if non-null object
    const formatter = createFormatter(options)
    const startMeta = dateEnv.createMarkerMeta(startInput)
    const endMeta = dateEnv.createMarkerMeta(endInput)
    if (!startMeta || !endMeta) {
      // TODO: warning?
      return ''
    }
    return dateEnv.formatRange(startMeta.marker, endMeta.marker, formatter, {
      forcedStartTzo: startMeta.forcedTzo,
      forcedEndTzo: endMeta.forcedTzo,
      isEndExclusive: options.isEndExclusive,
      defaultSeparator: BASE_OPTION_DEFAULTS.defaultRangeSeparator
    })
  }

  // TODO: more DRY and optimized
  function buildDateEnv (settings) {
    const locale = buildLocale(
      settings.locale || 'en',
      organizeRawLocales([]).map
    ) // TODO: don't hardcode 'en' everywhere
    return new DateEnv(
      __assign(
        __assign(
          {
            timeZone: BASE_OPTION_DEFAULTS.timeZone,
            calendarSystem: 'gregory'
          },
          settings
        ),
        { locale }
      )
    )
  }

  const DEF_DEFAULTS = {
    startTime: '09:00',
    endTime: '17:00',
    daysOfWeek: [1, 2, 3, 4, 5],
    display: 'inverse-background',
    classNames: 'fc-non-business',
    groupId: '_businessHours' // so multiple defs get grouped
  }

  /*
    TODO: pass around as EventDefHash!!!
    */
  function parseBusinessHours (input, context) {
    return parseEvents(refineInputs(input), null, context)
  }

  function refineInputs (input) {
    let rawDefs
    if (input === true) {
      rawDefs = [{}] // will get DEF_DEFAULTS verbatim
    } else if (Array.isArray(input)) {
      // if specifying an array, every sub-definition NEEDS a day-of-week
      rawDefs = input.filter(function (rawDef) {
        return rawDef.daysOfWeek
      })
    } else if (typeof input === 'object' && input) {
      // non-null object
      rawDefs = [input]
    } else {
      // is probably false
      rawDefs = []
    }
    rawDefs = rawDefs.map(function (rawDef) {
      return __assign(__assign({}, DEF_DEFAULTS), rawDef)
    })
    return rawDefs
  }

  function pointInsideRect (point, rect) {
    return (
      point.left >= rect.left &&
      point.left < rect.right &&
      point.top >= rect.top &&
      point.top < rect.bottom
    )
  }

  // Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
  function intersectRects (rect1, rect2) {
    const res = {
      left: Math.max(rect1.left, rect2.left),
      right: Math.min(rect1.right, rect2.right),
      top: Math.max(rect1.top, rect2.top),
      bottom: Math.min(rect1.bottom, rect2.bottom)
    }
    if (res.left < res.right && res.top < res.bottom) {
      return res
    }
    return false
  }

  function translateRect (rect, deltaX, deltaY) {
    return {
      left: rect.left + deltaX,
      right: rect.right + deltaX,
      top: rect.top + deltaY,
      bottom: rect.bottom + deltaY
    }
  }

  // Returns a new point that will have been moved to reside within the given rectangle
  function constrainPoint (point, rect) {
    return {
      left: Math.min(Math.max(point.left, rect.left), rect.right),
      top: Math.min(Math.max(point.top, rect.top), rect.bottom)
    }
  }

  // Returns a point that is the center of the given rectangle
  function getRectCenter (rect) {
    return {
      left: (rect.left + rect.right) / 2,
      top: (rect.top + rect.bottom) / 2
    }
  }

  // Subtracts point2's coordinates from point1's coordinates, returning a delta
  function diffPoints (point1, point2) {
    return {
      left: point1.left - point2.left,
      top: point1.top - point2.top
    }
  }

  let canVGrowWithinCell

  function getCanVGrowWithinCell () {
    if (canVGrowWithinCell == null) {
      canVGrowWithinCell = computeCanVGrowWithinCell()
    }
    return canVGrowWithinCell
  }

  function computeCanVGrowWithinCell () {
    // for SSR, because this function is call immediately at top-level
    // TODO: just make this logic execute top-level, immediately, instead of doing lazily
    if (typeof document === 'undefined') {
      return true
    }
    const el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.top = '0px'
    el.style.left = '0px'
    el.innerHTML = '<table><tr><td><div></div></td></tr></table>'
    el.querySelector('table').style.height = '100px'
    el.querySelector('div').style.height = '100%'
    document.body.appendChild(el)
    const div = el.querySelector('div')
    const possible = div.offsetHeight > 0
    document.body.removeChild(el)
    return possible
  }

  const EMPTY_EVENT_STORE = createEmptyEventStore() // for purecomponents. TODO: keep elsewhere
  const Splitter = /** @class */ (function () {
    function Splitter () {
      this.getKeysForEventDefs = memoize(this._getKeysForEventDefs)
      this.splitDateSelection = memoize(this._splitDateSpan)
      this.splitEventStore = memoize(this._splitEventStore)
      this.splitIndividualUi = memoize(this._splitIndividualUi)
      this.splitEventDrag = memoize(this._splitInteraction)
      this.splitEventResize = memoize(this._splitInteraction)
      this.eventUiBuilders = {} // TODO: typescript protection
    }

    Splitter.prototype.splitProps = function (props) {
      const _this = this
      const keyInfos = this.getKeyInfo(props)
      const defKeys = this.getKeysForEventDefs(props.eventStore)
      const dateSelections = this.splitDateSelection(props.dateSelection)
      const individualUi = this.splitIndividualUi(props.eventUiBases, defKeys) // the individual *bases*
      const eventStores = this.splitEventStore(props.eventStore, defKeys)
      const eventDrags = this.splitEventDrag(props.eventDrag)
      const eventResizes = this.splitEventResize(props.eventResize)
      const splitProps = {}
      this.eventUiBuilders = mapHash(keyInfos, function (info, key) {
        return _this.eventUiBuilders[key] || memoize(buildEventUiForKey)
      })
      for (const key in keyInfos) {
        const keyInfo = keyInfos[key]
        const eventStore = eventStores[key] || EMPTY_EVENT_STORE
        const buildEventUi = this.eventUiBuilders[key]
        splitProps[key] = {
          businessHours: keyInfo.businessHours || props.businessHours,
          dateSelection: dateSelections[key] || null,
          eventStore,
          eventUiBases: buildEventUi(
            props.eventUiBases[''],
            keyInfo.ui,
            individualUi[key]
          ),
          eventSelection: eventStore.instances[props.eventSelection]
            ? props.eventSelection
            : '',
          eventDrag: eventDrags[key] || null,
          eventResize: eventResizes[key] || null
        }
      }
      return splitProps
    }
    Splitter.prototype._splitDateSpan = function (dateSpan) {
      const dateSpans = {}
      if (dateSpan) {
        const keys = this.getKeysForDateSpan(dateSpan)
        for (let _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          const key = keys_1[_i]
          dateSpans[key] = dateSpan
        }
      }
      return dateSpans
    }
    Splitter.prototype._getKeysForEventDefs = function (eventStore) {
      const _this = this
      return mapHash(eventStore.defs, function (eventDef) {
        return _this.getKeysForEventDef(eventDef)
      })
    }
    Splitter.prototype._splitEventStore = function (eventStore, defKeys) {
      const defs = eventStore.defs
      const instances = eventStore.instances
      const splitStores = {}
      for (const defId in defs) {
        for (let _i = 0, _a = defKeys[defId]; _i < _a.length; _i++) {
          var key = _a[_i]
          if (!splitStores[key]) {
            splitStores[key] = createEmptyEventStore()
          }
          splitStores[key].defs[defId] = defs[defId]
        }
      }
      for (const instanceId in instances) {
        const instance = instances[instanceId]
        for (let _b = 0, _c = defKeys[instance.defId]; _b < _c.length; _b++) {
          var key = _c[_b]
          if (splitStores[key]) {
            // must have already been created
            splitStores[key].instances[instanceId] = instance
          }
        }
      }
      return splitStores
    }
    Splitter.prototype._splitIndividualUi = function (eventUiBases, defKeys) {
      const splitHashes = {}
      for (const defId in eventUiBases) {
        if (defId) {
          // not the '' key
          for (let _i = 0, _a = defKeys[defId]; _i < _a.length; _i++) {
            const key = _a[_i]
            if (!splitHashes[key]) {
              splitHashes[key] = {}
            }
            splitHashes[key][defId] = eventUiBases[defId]
          }
        }
      }
      return splitHashes
    }
    Splitter.prototype._splitInteraction = function (interaction) {
      const splitStates = {}
      if (interaction) {
        const affectedStores_1 = this._splitEventStore(
          interaction.affectedEvents,
          this._getKeysForEventDefs(interaction.affectedEvents) // can't use cached. might be events from other calendar
        )
        // can't rely on defKeys because event data is mutated
        const mutatedKeysByDefId = this._getKeysForEventDefs(
          interaction.mutatedEvents
        )
        const mutatedStores_1 = this._splitEventStore(
          interaction.mutatedEvents,
          mutatedKeysByDefId
        )
        const populate = function (key) {
          if (!splitStates[key]) {
            splitStates[key] = {
              affectedEvents: affectedStores_1[key] || EMPTY_EVENT_STORE,
              mutatedEvents: mutatedStores_1[key] || EMPTY_EVENT_STORE,
              isEvent: interaction.isEvent
            }
          }
        }
        for (var key in affectedStores_1) {
          populate(key)
        }
        for (var key in mutatedStores_1) {
          populate(key)
        }
      }
      return splitStates
    }
    return Splitter
  })()

  function buildEventUiForKey (allUi, eventUiForKey, individualUi) {
    const baseParts = []
    if (allUi) {
      baseParts.push(allUi)
    }
    if (eventUiForKey) {
      baseParts.push(eventUiForKey)
    }
    const stuff = {
      '': combineEventUis(baseParts)
    }
    if (individualUi) {
      __assign(stuff, individualUi)
    }
    return stuff
  }

  function getDateMeta (date, todayRange, nowDate, dateProfile) {
    return {
      dow: date.getUTCDay(),
      isDisabled: Boolean(
        dateProfile && !rangeContainsMarker(dateProfile.activeRange, date)
      ),
      isOther: Boolean(
        dateProfile && !rangeContainsMarker(dateProfile.currentRange, date)
      ),
      isToday: Boolean(todayRange && rangeContainsMarker(todayRange, date)),
      isPast: Boolean(
        nowDate ? date < nowDate : todayRange ? date < todayRange.start : false
      ),
      isFuture: Boolean(
        nowDate ? date > nowDate : todayRange ? date >= todayRange.end : false
      )
    }
  }

  function getDayClassNames (meta, theme) {
    const classNames = ['fc-day', 'fc-day-' + DAY_IDS[meta.dow]]
    if (meta.isDisabled) {
      classNames.push('fc-day-disabled')
    } else {
      if (meta.isToday) {
        classNames.push('fc-day-today')
        classNames.push(theme.getClass('today'))
      }
      if (meta.isPast) {
        classNames.push('fc-day-past')
      }
      if (meta.isFuture) {
        classNames.push('fc-day-future')
      }
      if (meta.isOther) {
        classNames.push('fc-day-other')
      }
    }
    return classNames
  }

  function getSlotClassNames (meta, theme) {
    const classNames = ['fc-slot', 'fc-slot-' + DAY_IDS[meta.dow]]
    if (meta.isDisabled) {
      classNames.push('fc-slot-disabled')
    } else {
      if (meta.isToday) {
        classNames.push('fc-slot-today')
        classNames.push(theme.getClass('today'))
      }
      if (meta.isPast) {
        classNames.push('fc-slot-past')
      }
      if (meta.isFuture) {
        classNames.push('fc-slot-future')
      }
    }
    return classNames
  }

  function buildNavLinkData (date, type) {
    if (type === void 0) {
      type = 'day'
    }
    return JSON.stringify({
      date: formatDayString(date),
      type
    })
  }

  let _isRtlScrollbarOnLeft = null

  function getIsRtlScrollbarOnLeft () {
    if (_isRtlScrollbarOnLeft === null) {
      _isRtlScrollbarOnLeft = computeIsRtlScrollbarOnLeft()
    }
    return _isRtlScrollbarOnLeft
  }

  function computeIsRtlScrollbarOnLeft () {
    const outerEl = document.createElement('div')
    applyStyle(outerEl, {
      position: 'absolute',
      top: -1000,
      left: 0,
      border: 0,
      padding: 0,
      overflow: 'scroll',
      direction: 'rtl'
    })
    outerEl.innerHTML = '<div></div>'
    document.body.appendChild(outerEl)
    const innerEl = outerEl.firstChild
    const res =
      innerEl.getBoundingClientRect().left >
      outerEl.getBoundingClientRect().left
    removeElement(outerEl)
    return res
  }

  let _scrollbarWidths

  function getScrollbarWidths () {
    if (!_scrollbarWidths) {
      _scrollbarWidths = computeScrollbarWidths()
    }
    return _scrollbarWidths
  }

  function computeScrollbarWidths () {
    const el = document.createElement('div')
    el.style.overflow = 'scroll'
    document.body.appendChild(el)
    const res = computeScrollbarWidthsForEl(el)
    document.body.removeChild(el)
    return res
  }

  // WARNING: will include border
  function computeScrollbarWidthsForEl (el) {
    return {
      x: el.offsetHeight - el.clientHeight,
      y: el.offsetWidth - el.clientWidth
    }
  }

  function computeEdges (el, getPadding) {
    if (getPadding === void 0) {
      getPadding = false
    }
    const computedStyle = window.getComputedStyle(el)
    const borderLeft = parseInt(computedStyle.borderLeftWidth, 10) || 0
    const borderRight = parseInt(computedStyle.borderRightWidth, 10) || 0
    const borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0
    const borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0
    const badScrollbarWidths = computeScrollbarWidthsForEl(el) // includes border!
    const scrollbarLeftRight = badScrollbarWidths.y - borderLeft - borderRight
    const scrollbarBottom = badScrollbarWidths.x - borderTop - borderBottom
    const res = {
      borderLeft,
      borderRight,
      borderTop,
      borderBottom,
      scrollbarBottom,
      scrollbarLeft: 0,
      scrollbarRight: 0
    }
    if (getIsRtlScrollbarOnLeft() && computedStyle.direction === 'rtl') {
      // is the scrollbar on the left side?
      res.scrollbarLeft = scrollbarLeftRight
    } else {
      res.scrollbarRight = scrollbarLeftRight
    }
    if (getPadding) {
      res.paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0
      res.paddingRight = parseInt(computedStyle.paddingRight, 10) || 0
      res.paddingTop = parseInt(computedStyle.paddingTop, 10) || 0
      res.paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0
    }
    return res
  }

  function computeInnerRect (el, goWithinPadding, doFromWindowViewport) {
    if (goWithinPadding === void 0) {
      goWithinPadding = false
    }
    const outerRect = doFromWindowViewport
      ? el.getBoundingClientRect()
      : computeRect(el)
    const edges = computeEdges(el, goWithinPadding)
    const res = {
      left: outerRect.left + edges.borderLeft + edges.scrollbarLeft,
      right: outerRect.right - edges.borderRight - edges.scrollbarRight,
      top: outerRect.top + edges.borderTop,
      bottom: outerRect.bottom - edges.borderBottom - edges.scrollbarBottom
    }
    if (goWithinPadding) {
      res.left += edges.paddingLeft
      res.right -= edges.paddingRight
      res.top += edges.paddingTop
      res.bottom -= edges.paddingBottom
    }
    return res
  }

  function computeRect (el) {
    const rect = el.getBoundingClientRect()
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      right: rect.right + window.pageXOffset,
      bottom: rect.bottom + window.pageYOffset
    }
  }

  function computeHeightAndMargins (el) {
    return el.getBoundingClientRect().height + computeVMargins(el)
  }

  function computeVMargins (el) {
    const computed = window.getComputedStyle(el)
    return (
      parseInt(computed.marginTop, 10) + parseInt(computed.marginBottom, 10)
    )
  }

  // does not return window
  function getClippingParents (el) {
    const parents = []
    while (el instanceof HTMLElement) {
      // will stop when gets to document or null
      const computedStyle = window.getComputedStyle(el)
      if (computedStyle.position === 'fixed') {
        break
      }
      if (
        /(auto|scroll)/.test(
          computedStyle.overflow +
            computedStyle.overflowY +
            computedStyle.overflowX
        )
      ) {
        parents.push(el)
      }
      el = el.parentNode
    }
    return parents
  }

  // given a function that resolves a result asynchronously.
  // the function can either call passed-in success and failure callbacks,
  // or it can return a promise.
  // if you need to pass additional params to func, bind them first.
  function unpromisify (func, success, failure) {
    // guard against success/failure callbacks being called more than once
    // and guard against a promise AND callback being used together.
    let isResolved = false
    const wrappedSuccess = function () {
      if (!isResolved) {
        isResolved = true
        success.apply(this, arguments)
      }
    }
    const wrappedFailure = function () {
      if (!isResolved) {
        isResolved = true
        if (failure) {
          failure.apply(this, arguments)
        }
      }
    }
    const res = func(wrappedSuccess, wrappedFailure)
    if (res && typeof res.then === 'function') {
      res.then(wrappedSuccess, wrappedFailure)
    }
  }

  const Emitter = /** @class */ (function () {
    function Emitter () {
      this.handlers = {}
      this.thisContext = null
    }

    Emitter.prototype.setThisContext = function (thisContext) {
      this.thisContext = thisContext
    }
    Emitter.prototype.setOptions = function (options) {
      this.options = options
    }
    Emitter.prototype.on = function (type, handler) {
      addToHash(this.handlers, type, handler)
    }
    Emitter.prototype.off = function (type, handler) {
      removeFromHash(this.handlers, type, handler)
    }
    Emitter.prototype.trigger = function (type) {
      const args = []
      for (let _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i]
      }
      const attachedHandlers = this.handlers[type] || []
      const optionHandler = this.options && this.options[type]
      const handlers = [].concat(optionHandler || [], attachedHandlers)
      for (let _a = 0, handlers_1 = handlers; _a < handlers_1.length; _a++) {
        const handler = handlers_1[_a]
        handler.apply(this.thisContext, args)
      }
    }
    Emitter.prototype.hasHandlers = function (type) {
      return (
        (this.handlers[type] && this.handlers[type].length) ||
        (this.options && this.options[type])
      )
    }
    return Emitter
  })()

  function addToHash (hash, type, handler) {
    (hash[type] || (hash[type] = [])).push(handler)
  }

  function removeFromHash (hash, type, handler) {
    if (handler) {
      if (hash[type]) {
        hash[type] = hash[type].filter(function (func) {
          return func !== handler
        })
      }
    } else {
      delete hash[type] // remove all handler funcs for this type
    }
  }

  /*
    Records offset information for a set of elements, relative to an origin element.
    Can record the left/right OR the top/bottom OR both.
    Provides methods for querying the cache by position.
    */
  const PositionCache = /** @class */ (function () {
    function PositionCache (originEl, els, isHorizontal, isVertical) {
      this.els = els
      const originClientRect = (this.originClientRect =
        originEl.getBoundingClientRect()) // relative to viewport top-left
      if (isHorizontal) {
        this.buildElHorizontals(originClientRect.left)
      }
      if (isVertical) {
        this.buildElVerticals(originClientRect.top)
      }
    }

    // Populates the left/right internal coordinate arrays
    PositionCache.prototype.buildElHorizontals = function (originClientLeft) {
      const lefts = []
      const rights = []
      for (let _i = 0, _a = this.els; _i < _a.length; _i++) {
        const el = _a[_i]
        const rect = el.getBoundingClientRect()
        lefts.push(rect.left - originClientLeft)
        rights.push(rect.right - originClientLeft)
      }
      this.lefts = lefts
      this.rights = rights
    }
    // Populates the top/bottom internal coordinate arrays
    PositionCache.prototype.buildElVerticals = function (originClientTop) {
      const tops = []
      const bottoms = []
      for (let _i = 0, _a = this.els; _i < _a.length; _i++) {
        const el = _a[_i]
        const rect = el.getBoundingClientRect()
        tops.push(rect.top - originClientTop)
        bottoms.push(rect.bottom - originClientTop)
      }
      this.tops = tops
      this.bottoms = bottoms
    }
    // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
    // If no intersection is made, returns undefined.
    PositionCache.prototype.leftToIndex = function (leftPosition) {
      const lefts = this.lefts
      const rights = this.rights
      const len = lefts.length
      let i
      for (i = 0; i < len; i++) {
        if (leftPosition >= lefts[i] && leftPosition < rights[i]) {
          return i
        }
      }
    }
    // Given a top offset (from document top), returns the index of the el that it vertically intersects.
    // If no intersection is made, returns undefined.
    PositionCache.prototype.topToIndex = function (topPosition) {
      const tops = this.tops
      const bottoms = this.bottoms
      const len = tops.length
      let i
      for (i = 0; i < len; i++) {
        if (topPosition >= tops[i] && topPosition < bottoms[i]) {
          return i
        }
      }
    }
    // Gets the width of the element at the given index
    PositionCache.prototype.getWidth = function (leftIndex) {
      return this.rights[leftIndex] - this.lefts[leftIndex]
    }
    // Gets the height of the element at the given index
    PositionCache.prototype.getHeight = function (topIndex) {
      return this.bottoms[topIndex] - this.tops[topIndex]
    }
    return PositionCache
  })()

  /*
    An object for getting/setting scroll-related information for an element.
    Internally, this is done very differently for window versus DOM element,
    so this object serves as a common interface.
    */
  const ScrollController = /** @class */ (function () {
    function ScrollController () {}

    ScrollController.prototype.getMaxScrollTop = function () {
      return this.getScrollHeight() - this.getClientHeight()
    }
    ScrollController.prototype.getMaxScrollLeft = function () {
      return this.getScrollWidth() - this.getClientWidth()
    }
    ScrollController.prototype.canScrollVertically = function () {
      return this.getMaxScrollTop() > 0
    }
    ScrollController.prototype.canScrollHorizontally = function () {
      return this.getMaxScrollLeft() > 0
    }
    ScrollController.prototype.canScrollUp = function () {
      return this.getScrollTop() > 0
    }
    ScrollController.prototype.canScrollDown = function () {
      return this.getScrollTop() < this.getMaxScrollTop()
    }
    ScrollController.prototype.canScrollLeft = function () {
      return this.getScrollLeft() > 0
    }
    ScrollController.prototype.canScrollRight = function () {
      return this.getScrollLeft() < this.getMaxScrollLeft()
    }
    return ScrollController
  })()
  const ElementScrollController = /** @class */ (function (_super) {
    __extends(ElementScrollController, _super)

    function ElementScrollController (el) {
      const _this = _super.call(this) || this
      _this.el = el
      return _this
    }

    ElementScrollController.prototype.getScrollTop = function () {
      return this.el.scrollTop
    }
    ElementScrollController.prototype.getScrollLeft = function () {
      return this.el.scrollLeft
    }
    ElementScrollController.prototype.setScrollTop = function (top) {
      this.el.scrollTop = top
    }
    ElementScrollController.prototype.setScrollLeft = function (left) {
      this.el.scrollLeft = left
    }
    ElementScrollController.prototype.getScrollWidth = function () {
      return this.el.scrollWidth
    }
    ElementScrollController.prototype.getScrollHeight = function () {
      return this.el.scrollHeight
    }
    ElementScrollController.prototype.getClientHeight = function () {
      return this.el.clientHeight
    }
    ElementScrollController.prototype.getClientWidth = function () {
      return this.el.clientWidth
    }
    return ElementScrollController
  })(ScrollController)
  const WindowScrollController = /** @class */ (function (_super) {
    __extends(WindowScrollController, _super)

    function WindowScrollController () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    WindowScrollController.prototype.getScrollTop = function () {
      return window.pageYOffset
    }
    WindowScrollController.prototype.getScrollLeft = function () {
      return window.pageXOffset
    }
    WindowScrollController.prototype.setScrollTop = function (n) {
      window.scroll(window.pageXOffset, n)
    }
    WindowScrollController.prototype.setScrollLeft = function (n) {
      window.scroll(n, window.pageYOffset)
    }
    WindowScrollController.prototype.getScrollWidth = function () {
      return document.documentElement.scrollWidth
    }
    WindowScrollController.prototype.getScrollHeight = function () {
      return document.documentElement.scrollHeight
    }
    WindowScrollController.prototype.getClientHeight = function () {
      return document.documentElement.clientHeight
    }
    WindowScrollController.prototype.getClientWidth = function () {
      return document.documentElement.clientWidth
    }
    return WindowScrollController
  })(ScrollController)

  const Theme = /** @class */ (function () {
    function Theme (calendarOptions) {
      if (this.iconOverrideOption) {
        this.setIconOverride(calendarOptions[this.iconOverrideOption])
      }
    }

    Theme.prototype.setIconOverride = function (iconOverrideHash) {
      let iconClassesCopy
      let buttonName
      if (typeof iconOverrideHash === 'object' && iconOverrideHash) {
        // non-null object
        iconClassesCopy = __assign({}, this.iconClasses)
        for (buttonName in iconOverrideHash) {
          iconClassesCopy[buttonName] = this.applyIconOverridePrefix(
            iconOverrideHash[buttonName]
          )
        }
        this.iconClasses = iconClassesCopy
      } else if (iconOverrideHash === false) {
        this.iconClasses = {}
      }
    }
    Theme.prototype.applyIconOverridePrefix = function (className) {
      const prefix = this.iconOverridePrefix
      if (prefix && className.indexOf(prefix) !== 0) {
        // if not already present
        className = prefix + className
      }
      return className
    }
    Theme.prototype.getClass = function (key) {
      return this.classes[key] || ''
    }
    Theme.prototype.getIconClass = function (buttonName, isRtl) {
      let className
      if (isRtl && this.rtlIconClasses) {
        className =
          this.rtlIconClasses[buttonName] || this.iconClasses[buttonName]
      } else {
        className = this.iconClasses[buttonName]
      }
      if (className) {
        return this.baseIconClass + ' ' + className
      }
      return ''
    }
    Theme.prototype.getCustomButtonIconClass = function (customButtonProps) {
      let className
      if (this.iconOverrideCustomButtonOption) {
        className = customButtonProps[this.iconOverrideCustomButtonOption]
        if (className) {
          return (
            this.baseIconClass + ' ' + this.applyIconOverridePrefix(className)
          )
        }
      }
      return ''
    }
    return Theme
  })()
  Theme.prototype.classes = {}
  Theme.prototype.iconClasses = {}
  Theme.prototype.baseIconClass = ''
  Theme.prototype.iconOverridePrefix = ''

  /// <reference types="@fullcalendar/core-vdom" />
  if (typeof FullCalendarVDom === 'undefined') {
    throw new Error(
      'Please import the top-level fullcalendar lib before attempting to import a plugin.'
    )
  }
  const Component = FullCalendarVDom.Component
  const createElement = FullCalendarVDom.createElement
  const render = FullCalendarVDom.render
  const createRef = FullCalendarVDom.createRef
  const Fragment = FullCalendarVDom.Fragment
  const createContext$1 = FullCalendarVDom.createContext
  const flushToDom$1 = FullCalendarVDom.flushToDom

  const ScrollResponder = /** @class */ (function () {
    function ScrollResponder (execFunc, emitter, scrollTime) {
      const _this = this
      this.execFunc = execFunc
      this.emitter = emitter
      this.scrollTime = scrollTime
      this.handleScrollRequest = function (request) {
        _this.queuedRequest = __assign({}, _this.queuedRequest || {}, request)
        _this.drain()
      }
      emitter.on('_scrollRequest', this.handleScrollRequest)
      this.fireInitialScroll()
    }

    ScrollResponder.prototype.detach = function () {
      this.emitter.off('_scrollRequest', this.handleScrollRequest)
    }
    ScrollResponder.prototype.update = function (isDatesNew) {
      if (isDatesNew) {
        this.fireInitialScroll() // will drain
      } else {
        this.drain()
      }
    }
    ScrollResponder.prototype.fireInitialScroll = function () {
      this.handleScrollRequest({
        time: this.scrollTime
      })
    }
    ScrollResponder.prototype.drain = function () {
      if (this.queuedRequest && this.execFunc(this.queuedRequest)) {
        this.queuedRequest = null
      }
    }
    return ScrollResponder
  })()

  const ViewContextType = createContext$1({}) // for Components
  function buildViewContext (
    viewSpec,
    viewApi,
    viewOptions,
    dateProfileGenerator,
    dateEnv,
    theme,
    pluginHooks,
    dispatch,
    getCurrentData,
    emitter,
    calendarApi,
    registerInteractiveComponent,
    unregisterInteractiveComponent
  ) {
    return {
      dateEnv,
      options: viewOptions,
      pluginHooks,
      emitter,
      dispatch,
      getCurrentData,
      calendarApi,
      viewSpec,
      viewApi,
      dateProfileGenerator,
      theme,
      isRtl: viewOptions.direction === 'rtl',
      addResizeHandler: function (handler) {
        emitter.on('_resize', handler)
      },
      removeResizeHandler: function (handler) {
        emitter.off('_resize', handler)
      },
      createScrollResponder: function (execFunc) {
        return new ScrollResponder(
          execFunc,
          emitter,
          createDuration(viewOptions.scrollTime)
        )
      },
      registerInteractiveComponent,
      unregisterInteractiveComponent
    }
  }

  const PureComponent = /** @class */ (function (_super) {
    __extends(PureComponent, _super)

    function PureComponent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    PureComponent.prototype.shouldComponentUpdate = function (
      nextProps,
      nextState
    ) {
      if (this.debug) {
        console.log(
          getUnequalProps(nextProps, this.props),
          getUnequalProps(nextState, this.state)
        )
      }
      return (
        !compareObjs(this.props, nextProps, this.propEquality) ||
        !compareObjs(this.state, nextState, this.stateEquality)
      )
    }
    PureComponent.addPropsEquality = addPropsEquality
    PureComponent.addStateEquality = addStateEquality
    PureComponent.contextType = ViewContextType
    return PureComponent
  })(Component)
  PureComponent.prototype.propEquality = {}
  PureComponent.prototype.stateEquality = {}
  const BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super)

    function BaseComponent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    BaseComponent.contextType = ViewContextType
    return BaseComponent
  })(PureComponent)

  function addPropsEquality (propEquality) {
    const hash = Object.create(this.prototype.propEquality)
    __assign(hash, propEquality)
    this.prototype.propEquality = hash
  }

  function addStateEquality (stateEquality) {
    const hash = Object.create(this.prototype.stateEquality)
    __assign(hash, stateEquality)
    this.prototype.stateEquality = hash
  }

  // use other one
  function setRef (ref, current) {
    if (typeof ref === 'function') {
      ref(current)
    } else if (ref) {
      // see https://github.com/facebook/react/issues/13029
      ref.current = current
    }
  }

  function reduceEventStore (
    eventStore,
    action,
    eventSources,
    dateProfile,
    context
  ) {
    switch (action.type) {
      case 'RECEIVE_EVENTS': // raw
        return receiveRawEvents(
          eventStore,
          eventSources[action.sourceId],
          action.fetchId,
          action.fetchRange,
          action.rawEvents,
          context
        )
      case 'ADD_EVENTS': // already parsed, but not expanded
        return addEvent(
          eventStore,
          action.eventStore, // new ones
          dateProfile ? dateProfile.activeRange : null,
          context
        )
      case 'MERGE_EVENTS': // already parsed and expanded
        return mergeEventStores(eventStore, action.eventStore)
      case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
      case 'NEXT':
      case 'CHANGE_DATE':
      case 'CHANGE_VIEW_TYPE':
        if (dateProfile) {
          return expandRecurring(eventStore, dateProfile.activeRange, context)
        } else {
          return eventStore
        }
      case 'REMOVE_EVENTS':
        return excludeSubEventStore(eventStore, action.eventStore)
      case 'REMOVE_EVENT_SOURCE':
        return excludeEventsBySourceId(eventStore, action.sourceId)
      case 'REMOVE_ALL_EVENT_SOURCES':
        return filterEventStoreDefs(eventStore, function (eventDef) {
          return !eventDef.sourceId // only keep events with no source id
        })
      case 'REMOVE_ALL_EVENTS':
        return createEmptyEventStore()
      default:
        return eventStore
    }
  }

  function receiveRawEvents (
    eventStore,
    eventSource,
    fetchId,
    fetchRange,
    rawEvents,
    context
  ) {
    if (
      eventSource && // not already removed
      fetchId === eventSource.latestFetchId // TODO: wish this logic was always in event-sources
    ) {
      let subset = parseEvents(
        transformRawEvents(rawEvents, eventSource, context),
        eventSource,
        context
      )
      if (fetchRange) {
        subset = expandRecurring(subset, fetchRange, context)
      }
      return mergeEventStores(
        excludeEventsBySourceId(eventStore, eventSource.sourceId),
        subset
      )
    }
    return eventStore
  }

  function transformRawEvents (rawEvents, eventSource, context) {
    const calEachTransform = context.options.eventDataTransform
    const sourceEachTransform = eventSource
      ? eventSource.eventDataTransform
      : null
    if (sourceEachTransform) {
      rawEvents = transformEachRawEvent(rawEvents, sourceEachTransform)
    }
    if (calEachTransform) {
      rawEvents = transformEachRawEvent(rawEvents, calEachTransform)
    }
    return rawEvents
  }

  function transformEachRawEvent (rawEvents, func) {
    let refinedEvents
    if (!func) {
      refinedEvents = rawEvents
    } else {
      refinedEvents = []
      for (let _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
        const rawEvent = rawEvents_1[_i]
        const refinedEvent = func(rawEvent)
        if (refinedEvent) {
          refinedEvents.push(refinedEvent)
        } else if (refinedEvent == null) {
          refinedEvents.push(rawEvent)
        } // if a different falsy value, do nothing
      }
    }
    return refinedEvents
  }

  function addEvent (eventStore, subset, expandRange, context) {
    if (expandRange) {
      subset = expandRecurring(subset, expandRange, context)
    }
    return mergeEventStores(eventStore, subset)
  }

  function rezoneEventStoreDates (eventStore, oldDateEnv, newDateEnv) {
    const defs = eventStore.defs
    const instances = mapHash(eventStore.instances, function (instance) {
      const def = defs[instance.defId]
      if (def.allDay || def.recurringDef) {
        return instance // isn't dependent on timezone
      } else {
        return __assign(__assign({}, instance), {
          range: {
            start: newDateEnv.createMarker(
              oldDateEnv.toDate(instance.range.start, instance.forcedStartTzo)
            ),
            end: newDateEnv.createMarker(
              oldDateEnv.toDate(instance.range.end, instance.forcedEndTzo)
            )
          },
          forcedStartTzo: newDateEnv.canComputeOffset
            ? null
            : instance.forcedStartTzo,
          forcedEndTzo: newDateEnv.canComputeOffset
            ? null
            : instance.forcedEndTzo
        })
      }
    })
    return { defs, instances }
  }

  function excludeEventsBySourceId (eventStore, sourceId) {
    return filterEventStoreDefs(eventStore, function (eventDef) {
      return eventDef.sourceId !== sourceId
    })
  }

  // QUESTION: why not just return instances? do a general object-property-exclusion util
  function excludeInstances (eventStore, removals) {
    return {
      defs: eventStore.defs,
      instances: filterHash(eventStore.instances, function (instance) {
        return !removals[instance.instanceId]
      })
    }
  }

  // high-level segmenting-aware tester functions
  // ------------------------------------------------------------------------------------------------------------------------
  function isInteractionValid (interaction, context) {
    return isNewPropsValid({ eventDrag: interaction }, context) // HACK: the eventDrag props is used for ALL interactions
  }

  function isDateSelectionValid (dateSelection, context) {
    return isNewPropsValid({ dateSelection }, context)
  }

  function isNewPropsValid (newProps, context) {
    const calendarState = context.getCurrentData()
    const props = __assign(
      {
        businessHours: calendarState.businessHours,
        dateSelection: '',
        eventStore: calendarState.eventStore,
        eventUiBases: calendarState.eventUiBases,
        eventSelection: '',
        eventDrag: null,
        eventResize: null
      },
      newProps
    )
    return (context.pluginHooks.isPropsValid || isPropsValid)(props, context)
  }

  function isPropsValid (state, context, dateSpanMeta, filterConfig) {
    if (dateSpanMeta === void 0) {
      dateSpanMeta = {}
    }
    if (
      state.eventDrag &&
      !isInteractionPropsValid(state, context, dateSpanMeta, filterConfig)
    ) {
      return false
    }
    if (
      state.dateSelection &&
      !isDateSelectionPropsValid(state, context, dateSpanMeta, filterConfig)
    ) {
      return false
    }
    return true
  }

  // Moving Event Validation
  // ------------------------------------------------------------------------------------------------------------------------
  function isInteractionPropsValid (state, context, dateSpanMeta, filterConfig) {
    const currentState = context.getCurrentData()
    const interaction = state.eventDrag // HACK: the eventDrag props is used for ALL interactions
    const subjectEventStore = interaction.mutatedEvents
    const subjectDefs = subjectEventStore.defs
    const subjectInstances = subjectEventStore.instances
    let subjectConfigs = compileEventUis(
      subjectDefs,
      interaction.isEvent
        ? state.eventUiBases
        : { '': currentState.selectionConfig } // if not a real event, validate as a selection
    )
    if (filterConfig) {
      subjectConfigs = mapHash(subjectConfigs, filterConfig)
    }
    const otherEventStore = excludeInstances(
      state.eventStore,
      interaction.affectedEvents.instances
    ) // exclude the subject events. TODO: exclude defs too?
    const otherDefs = otherEventStore.defs
    const otherInstances = otherEventStore.instances
    const otherConfigs = compileEventUis(otherDefs, state.eventUiBases)
    for (const subjectInstanceId in subjectInstances) {
      const subjectInstance = subjectInstances[subjectInstanceId]
      const subjectRange = subjectInstance.range
      const subjectConfig = subjectConfigs[subjectInstance.defId]
      const subjectDef = subjectDefs[subjectInstance.defId]
      // constraint
      if (
        !allConstraintsPass(
          subjectConfig.constraints,
          subjectRange,
          otherEventStore,
          state.businessHours,
          context
        )
      ) {
        return false
      }
      // overlap
      const eventOverlap = context.options.eventOverlap
      const eventOverlapFunc =
        typeof eventOverlap === 'function' ? eventOverlap : null
      for (const otherInstanceId in otherInstances) {
        const otherInstance = otherInstances[otherInstanceId]
        // intersect! evaluate
        if (rangesIntersect(subjectRange, otherInstance.range)) {
          const otherOverlap = otherConfigs[otherInstance.defId].overlap
          // consider the other event's overlap. only do this if the subject event is a "real" event
          if (otherOverlap === false && interaction.isEvent) {
            return false
          }
          if (subjectConfig.overlap === false) {
            return false
          }
          if (
            eventOverlapFunc &&
            !eventOverlapFunc(
              new EventApi(
                context,
                otherDefs[otherInstance.defId],
                otherInstance
              ), // still event
              new EventApi(context, subjectDef, subjectInstance) // moving event
            )
          ) {
            return false
          }
        }
      }
      // allow (a function)
      const calendarEventStore = currentState.eventStore // need global-to-calendar, not local to component (splittable)state
      for (let _i = 0, _a = subjectConfig.allows; _i < _a.length; _i++) {
        const subjectAllow = _a[_i]
        const subjectDateSpan = __assign(__assign({}, dateSpanMeta), {
          range: subjectInstance.range,
          allDay: subjectDef.allDay
        })
        const origDef = calendarEventStore.defs[subjectDef.defId]
        const origInstance = calendarEventStore.instances[subjectInstanceId]
        let eventApi = void 0
        if (origDef) {
          // was previously in the calendar
          eventApi = new EventApi(context, origDef, origInstance)
        } else {
          // was an external event
          eventApi = new EventApi(context, subjectDef) // no instance, because had no dates
        }
        if (
          !subjectAllow(
            buildDateSpanApiWithContext(subjectDateSpan, context),
            eventApi
          )
        ) {
          return false
        }
      }
    }
    return true
  }

  // Date Selection Validation
  // ------------------------------------------------------------------------------------------------------------------------
  function isDateSelectionPropsValid (
    state,
    context,
    dateSpanMeta,
    filterConfig
  ) {
    const relevantEventStore = state.eventStore
    const relevantDefs = relevantEventStore.defs
    const relevantInstances = relevantEventStore.instances
    const selection = state.dateSelection
    const selectionRange = selection.range
    let selectionConfig = context.getCurrentData().selectionConfig
    if (filterConfig) {
      selectionConfig = filterConfig(selectionConfig)
    }
    // constraint
    if (
      !allConstraintsPass(
        selectionConfig.constraints,
        selectionRange,
        relevantEventStore,
        state.businessHours,
        context
      )
    ) {
      return false
    }
    // overlap
    const selectOverlap = context.options.selectOverlap
    const selectOverlapFunc =
      typeof selectOverlap === 'function' ? selectOverlap : null
    for (const relevantInstanceId in relevantInstances) {
      const relevantInstance = relevantInstances[relevantInstanceId]
      // intersect! evaluate
      if (rangesIntersect(selectionRange, relevantInstance.range)) {
        if (selectionConfig.overlap === false) {
          return false
        }
        if (
          selectOverlapFunc &&
          !selectOverlapFunc(
            new EventApi(
              context,
              relevantDefs[relevantInstance.defId],
              relevantInstance
            ),
            null
          )
        ) {
          return false
        }
      }
    }
    // allow (a function)
    for (let _i = 0, _a = selectionConfig.allows; _i < _a.length; _i++) {
      const selectionAllow = _a[_i]
      const fullDateSpan = __assign(__assign({}, dateSpanMeta), selection)
      if (
        !selectionAllow(
          buildDateSpanApiWithContext(fullDateSpan, context),
          null
        )
      ) {
        return false
      }
    }
    return true
  }

  // Constraint Utils
  // ------------------------------------------------------------------------------------------------------------------------
  function allConstraintsPass (
    constraints,
    subjectRange,
    otherEventStore,
    businessHoursUnexpanded,
    context
  ) {
    for (
      let _i = 0, constraints_1 = constraints;
      _i < constraints_1.length;
      _i++
    ) {
      const constraint = constraints_1[_i]
      if (
        !anyRangesContainRange(
          constraintToRanges(
            constraint,
            subjectRange,
            otherEventStore,
            businessHoursUnexpanded,
            context
          ),
          subjectRange
        )
      ) {
        return false
      }
    }
    return true
  }

  function constraintToRanges (
    constraint,
    subjectRange, // for expanding a recurring constraint, or expanding business hours
    otherEventStore, // for if constraint is an even group ID
    businessHoursUnexpanded, // for if constraint is 'businessHours'
    context // for expanding businesshours
  ) {
    if (constraint === 'businessHours') {
      return eventStoreToRanges(
        expandRecurring(businessHoursUnexpanded, subjectRange, context)
      )
    } else if (typeof constraint === 'string') {
      // an group ID
      return eventStoreToRanges(
        filterEventStoreDefs(otherEventStore, function (eventDef) {
          return eventDef.groupId === constraint
        })
      )
    } else if (typeof constraint === 'object' && constraint) {
      // non-null object
      return eventStoreToRanges(
        expandRecurring(constraint, subjectRange, context)
      )
    }
    return [] // if it's false
  }

  // TODO: move to event-store file?
  function eventStoreToRanges (eventStore) {
    const instances = eventStore.instances
    const ranges = []
    for (const instanceId in instances) {
      ranges.push(instances[instanceId].range)
    }
    return ranges
  }

  // TODO: move to geom file?
  function anyRangesContainRange (outerRanges, innerRange) {
    for (
      let _i = 0, outerRanges_1 = outerRanges;
      _i < outerRanges_1.length;
      _i++
    ) {
      const outerRange = outerRanges_1[_i]
      if (rangeContainsRange(outerRange, innerRange)) {
        return true
      }
    }
    return false
  }

  /*
    an INTERACTABLE date component

    PURPOSES:
    - hook up to fg, fill, and mirror renderers
    - interface for dragging and hits
    */
  const DateComponent = /** @class */ (function (_super) {
    __extends(DateComponent, _super)

    function DateComponent () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.uid = guid()
      return _this
    }

    // Hit System
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.prepareHits = function () {}
    DateComponent.prototype.queryHit = function (
      positionLeft,
      positionTop,
      elWidth,
      elHeight
    ) {
      return null // this should be abstract
    }
    // Validation
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.isInteractionValid = function (interaction) {
      const dateProfile = this.props.dateProfile // HACK
      const instances = interaction.mutatedEvents.instances
      if (dateProfile) {
        // HACK for MorePopover
        for (const instanceId in instances) {
          if (
            !rangeContainsRange(
              dateProfile.validRange,
              instances[instanceId].range
            )
          ) {
            return false
          }
        }
      }
      return isInteractionValid(interaction, this.context)
    }
    DateComponent.prototype.isDateSelectionValid = function (selection) {
      const dateProfile = this.props.dateProfile // HACK
      if (
        dateProfile && // HACK for MorePopover
        !rangeContainsRange(dateProfile.validRange, selection.range)
      ) {
        return false
      }
      return isDateSelectionValid(selection, this.context)
    }
    // Pointer Interaction Utils
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.isValidSegDownEl = function (el) {
      return (
        !this.props.eventDrag && // HACK
        !this.props.eventResize && // HACK
        !elementClosest(el, '.fc-event-mirror') &&
        (this.isPopover() || !this.isInPopover(el))
      )
      // ^above line ensures we don't detect a seg interaction within a nested component.
      // it's a HACK because it only supports a popover as the nested component.
    }
    DateComponent.prototype.isValidDateDownEl = function (el) {
      return (
        !elementClosest(el, '.fc-event:not(.fc-bg-event)') &&
        !elementClosest(el, '.fc-daygrid-more-link') && // a "more.." link
        !elementClosest(el, 'a[data-navlink]') && // a clickable nav link
        !this.isInPopover(el)
      )
    }
    DateComponent.prototype.isPopover = function () {
      return false
    }
    DateComponent.prototype.isInPopover = function (el) {
      return Boolean(elementClosest(el, '.fc-popover'))
    }
    return DateComponent
  })(BaseComponent)

  // TODO: easier way to add new hooks? need to update a million things
  function createPlugin (input) {
    return {
      id: guid(),
      deps: input.deps || [],
      reducers: input.reducers || [],
      contextInit: [].concat(input.contextInit || []),
      eventRefiners: input.eventRefiners || {},
      eventDefMemberAdders: input.eventDefMemberAdders || [],
      eventSourceRefiners: input.eventSourceRefiners || {},
      isDraggableTransformers: input.isDraggableTransformers || [],
      eventDragMutationMassagers: input.eventDragMutationMassagers || [],
      eventDefMutationAppliers: input.eventDefMutationAppliers || [],
      dateSelectionTransformers: input.dateSelectionTransformers || [],
      datePointTransforms: input.datePointTransforms || [],
      dateSpanTransforms: input.dateSpanTransforms || [],
      views: input.views || {},
      viewPropsTransformers: input.viewPropsTransformers || [],
      isPropsValid: input.isPropsValid || null,
      externalDefTransforms: input.externalDefTransforms || [],
      eventResizeJoinTransforms: input.eventResizeJoinTransforms || [],
      viewContainerAppends: input.viewContainerAppends || [],
      eventDropTransformers: input.eventDropTransformers || [],
      componentInteractions: input.componentInteractions || [],
      calendarInteractions: input.calendarInteractions || [],
      themeClasses: input.themeClasses || {},
      eventSourceDefs: input.eventSourceDefs || [],
      cmdFormatter: input.cmdFormatter,
      recurringTypes: input.recurringTypes || [],
      namedTimeZonedImpl: input.namedTimeZonedImpl,
      initialView: input.initialView || '',
      elementDraggingImpl: input.elementDraggingImpl,
      optionChangeHandlers: input.optionChangeHandlers || {},
      scrollGridImpl: input.scrollGridImpl || null,
      contentTypeHandlers: input.contentTypeHandlers || {},
      listenerRefiners: input.listenerRefiners || {},
      optionRefiners: input.optionRefiners || {},
      propSetHandlers: input.propSetHandlers || {}
    }
  }

  function buildPluginHooks (pluginDefs, globalDefs) {
    const isAdded = {}
    let hooks = {
      reducers: [],
      contextInit: [],
      eventRefiners: {},
      eventDefMemberAdders: [],
      eventSourceRefiners: {},
      isDraggableTransformers: [],
      eventDragMutationMassagers: [],
      eventDefMutationAppliers: [],
      dateSelectionTransformers: [],
      datePointTransforms: [],
      dateSpanTransforms: [],
      views: {},
      viewPropsTransformers: [],
      isPropsValid: null,
      externalDefTransforms: [],
      eventResizeJoinTransforms: [],
      viewContainerAppends: [],
      eventDropTransformers: [],
      componentInteractions: [],
      calendarInteractions: [],
      themeClasses: {},
      eventSourceDefs: [],
      cmdFormatter: null,
      recurringTypes: [],
      namedTimeZonedImpl: null,
      initialView: '',
      elementDraggingImpl: null,
      optionChangeHandlers: {},
      scrollGridImpl: null,
      contentTypeHandlers: {},
      listenerRefiners: {},
      optionRefiners: {},
      propSetHandlers: {}
    }

    function addDefs (defs) {
      for (let _i = 0, defs_1 = defs; _i < defs_1.length; _i++) {
        const def = defs_1[_i]
        if (!isAdded[def.id]) {
          isAdded[def.id] = true
          addDefs(def.deps)
          hooks = combineHooks(hooks, def)
        }
      }
    }

    if (pluginDefs) {
      addDefs(pluginDefs)
    }
    addDefs(globalDefs)
    return hooks
  }

  function buildBuildPluginHooks () {
    let currentOverrideDefs = []
    let currentGlobalDefs = []
    let currentHooks
    return function (overrideDefs, globalDefs) {
      if (
        !currentHooks ||
        !isArraysEqual(overrideDefs, currentOverrideDefs) ||
        !isArraysEqual(globalDefs, currentGlobalDefs)
      ) {
        currentHooks = buildPluginHooks(overrideDefs, globalDefs)
      }
      currentOverrideDefs = overrideDefs
      currentGlobalDefs = globalDefs
      return currentHooks
    }
  }

  function combineHooks (hooks0, hooks1) {
    return {
      reducers: hooks0.reducers.concat(hooks1.reducers),
      contextInit: hooks0.contextInit.concat(hooks1.contextInit),
      eventRefiners: __assign(
        __assign({}, hooks0.eventRefiners),
        hooks1.eventRefiners
      ),
      eventDefMemberAdders: hooks0.eventDefMemberAdders.concat(
        hooks1.eventDefMemberAdders
      ),
      eventSourceRefiners: __assign(
        __assign({}, hooks0.eventSourceRefiners),
        hooks1.eventSourceRefiners
      ),
      isDraggableTransformers: hooks0.isDraggableTransformers.concat(
        hooks1.isDraggableTransformers
      ),
      eventDragMutationMassagers: hooks0.eventDragMutationMassagers.concat(
        hooks1.eventDragMutationMassagers
      ),
      eventDefMutationAppliers: hooks0.eventDefMutationAppliers.concat(
        hooks1.eventDefMutationAppliers
      ),
      dateSelectionTransformers: hooks0.dateSelectionTransformers.concat(
        hooks1.dateSelectionTransformers
      ),
      datePointTransforms: hooks0.datePointTransforms.concat(
        hooks1.datePointTransforms
      ),
      dateSpanTransforms: hooks0.dateSpanTransforms.concat(
        hooks1.dateSpanTransforms
      ),
      views: __assign(__assign({}, hooks0.views), hooks1.views),
      viewPropsTransformers: hooks0.viewPropsTransformers.concat(
        hooks1.viewPropsTransformers
      ),
      isPropsValid: hooks1.isPropsValid || hooks0.isPropsValid,
      externalDefTransforms: hooks0.externalDefTransforms.concat(
        hooks1.externalDefTransforms
      ),
      eventResizeJoinTransforms: hooks0.eventResizeJoinTransforms.concat(
        hooks1.eventResizeJoinTransforms
      ),
      viewContainerAppends: hooks0.viewContainerAppends.concat(
        hooks1.viewContainerAppends
      ),
      eventDropTransformers: hooks0.eventDropTransformers.concat(
        hooks1.eventDropTransformers
      ),
      calendarInteractions: hooks0.calendarInteractions.concat(
        hooks1.calendarInteractions
      ),
      componentInteractions: hooks0.componentInteractions.concat(
        hooks1.componentInteractions
      ),
      themeClasses: __assign(
        __assign({}, hooks0.themeClasses),
        hooks1.themeClasses
      ),
      eventSourceDefs: hooks0.eventSourceDefs.concat(hooks1.eventSourceDefs),
      cmdFormatter: hooks1.cmdFormatter || hooks0.cmdFormatter,
      recurringTypes: hooks0.recurringTypes.concat(hooks1.recurringTypes),
      namedTimeZonedImpl:
        hooks1.namedTimeZonedImpl || hooks0.namedTimeZonedImpl,
      initialView: hooks0.initialView || hooks1.initialView,
      elementDraggingImpl:
        hooks0.elementDraggingImpl || hooks1.elementDraggingImpl,
      optionChangeHandlers: __assign(
        __assign({}, hooks0.optionChangeHandlers),
        hooks1.optionChangeHandlers
      ),
      scrollGridImpl: hooks1.scrollGridImpl || hooks0.scrollGridImpl,
      contentTypeHandlers: __assign(
        __assign({}, hooks0.contentTypeHandlers),
        hooks1.contentTypeHandlers
      ),
      listenerRefiners: __assign(
        __assign({}, hooks0.listenerRefiners),
        hooks1.listenerRefiners
      ),
      optionRefiners: __assign(
        __assign({}, hooks0.optionRefiners),
        hooks1.optionRefiners
      ),
      propSetHandlers: __assign(
        __assign({}, hooks0.propSetHandlers),
        hooks1.propSetHandlers
      )
    }
  }

  const StandardTheme = /** @class */ (function (_super) {
    __extends(StandardTheme, _super)

    function StandardTheme () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    return StandardTheme
  })(Theme)
  StandardTheme.prototype.classes = {
    root: 'fc-theme-standard',
    tableCellShaded: 'fc-cell-shaded',
    buttonGroup: 'fc-button-group',
    button: 'fc-button fc-button-primary',
    buttonActive: 'fc-button-active'
  }
  StandardTheme.prototype.baseIconClass = 'fc-icon'
  StandardTheme.prototype.iconClasses = {
    close: 'fc-icon-x',
    prev: 'fc-icon-chevron-left',
    next: 'fc-icon-chevron-right',
    prevYear: 'fc-icon-chevrons-left',
    nextYear: 'fc-icon-chevrons-right'
  }
  StandardTheme.prototype.rtlIconClasses = {
    prev: 'fc-icon-chevron-right',
    next: 'fc-icon-chevron-left',
    prevYear: 'fc-icon-chevrons-right',
    nextYear: 'fc-icon-chevrons-left'
  }
  StandardTheme.prototype.iconOverrideOption = 'buttonIcons' // TODO: make TS-friendly
  StandardTheme.prototype.iconOverrideCustomButtonOption = 'icon'
  StandardTheme.prototype.iconOverridePrefix = 'fc-icon-'

  function compileViewDefs (defaultConfigs, overrideConfigs) {
    const hash = {}
    let viewType
    for (viewType in defaultConfigs) {
      ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs)
    }
    for (viewType in overrideConfigs) {
      ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs)
    }
    return hash
  }

  function ensureViewDef (viewType, hash, defaultConfigs, overrideConfigs) {
    if (hash[viewType]) {
      return hash[viewType]
    }
    const viewDef = buildViewDef(viewType, hash, defaultConfigs, overrideConfigs)
    if (viewDef) {
      hash[viewType] = viewDef
    }
    return viewDef
  }

  function buildViewDef (viewType, hash, defaultConfigs, overrideConfigs) {
    const defaultConfig = defaultConfigs[viewType]
    const overrideConfig = overrideConfigs[viewType]
    const queryProp = function (name) {
      return defaultConfig && defaultConfig[name] !== null
        ? defaultConfig[name]
        : overrideConfig && overrideConfig[name] !== null
          ? overrideConfig[name]
          : null
    }
    let theComponent = queryProp('component')
    const superType = queryProp('superType')
    let superDef = null
    if (superType) {
      if (superType === viewType) {
        throw new Error("Can't have a custom view type that references itself")
      }
      superDef = ensureViewDef(
        superType,
        hash,
        defaultConfigs,
        overrideConfigs
      )
    }
    if (!theComponent && superDef) {
      theComponent = superDef.component
    }
    if (!theComponent) {
      return null // don't throw a warning, might be settings for a single-unit view
    }
    return {
      type: viewType,
      component: theComponent,
      defaults: __assign(
        __assign({}, superDef ? superDef.defaults : {}),
        defaultConfig ? defaultConfig.rawOptions : {}
      ),
      overrides: __assign(
        __assign({}, superDef ? superDef.overrides : {}),
        overrideConfig ? overrideConfig.rawOptions : {}
      )
    }
  }

  // NOTE: in JSX, you should always use this class with <HookProps> arg. otherwise, will default to any???
  const RenderHook = /** @class */ (function (_super) {
    __extends(RenderHook, _super)

    function RenderHook () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.rootElRef = createRef()
      _this.handleRootEl = function (el) {
        setRef(_this.rootElRef, el)
        if (_this.props.elRef) {
          setRef(_this.props.elRef, el)
        }
      }
      return _this
    }

    RenderHook.prototype.render = function () {
      const _this = this
      const props = this.props
      const hookProps = props.hookProps
      return createElement(
        MountHook,
        {
          hookProps,
          didMount: props.didMount,
          willUnmount: props.willUnmount,
          elRef: this.handleRootEl
        },
        function (rootElRef) {
          return createElement(
            ContentHook,
            {
              hookProps,
              content: props.content,
              defaultContent: props.defaultContent,
              backupElRef: _this.rootElRef
            },
            function (innerElRef, innerContent) {
              return props.children(
                rootElRef,
                normalizeClassNames(props.classNames, hookProps),
                innerElRef,
                innerContent
              )
            }
          )
        }
      )
    }
    return RenderHook
  })(BaseComponent)
  // for forcing rerender of components that use the ContentHook
  const CustomContentRenderContext = createContext$1(0)

  function ContentHook (props) {
    return createElement(
      CustomContentRenderContext.Consumer,
      null,
      function (renderId) {
        return createElement(
          ContentHookInner,
          __assign({ renderId }, props)
        )
      }
    )
  }

  var ContentHookInner = /** @class */ (function (_super) {
    __extends(ContentHookInner, _super)

    function ContentHookInner () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.innerElRef = createRef()
      return _this
    }

    ContentHookInner.prototype.render = function () {
      return this.props.children(this.innerElRef, this.renderInnerContent())
    }
    ContentHookInner.prototype.componentDidMount = function () {
      this.updateCustomContent()
    }
    ContentHookInner.prototype.componentDidUpdate = function () {
      this.updateCustomContent()
    }
    ContentHookInner.prototype.renderInnerContent = function () {
      const contentTypeHandlers = this.context.pluginHooks.contentTypeHandlers
      const _a = this
      const props = _a.props
      let customContentInfo = _a.customContentInfo
      const rawVal = props.content
      let innerContent = normalizeContent(rawVal, props.hookProps)
      let innerContentVDom = null
      if (innerContent === undefined) {
        // use the default
        innerContent = normalizeContent(props.defaultContent, props.hookProps)
      }
      if (innerContent !== undefined) {
        // we allow custom content handlers to return nothing
        if (customContentInfo) {
          customContentInfo.contentVal =
            innerContent[customContentInfo.contentKey]
        } else if (typeof innerContent === 'object') {
          // look for a prop that would indicate a custom content handler is needed
          for (const contentKey in contentTypeHandlers) {
            if (innerContent[contentKey] !== undefined) {
              customContentInfo = this.customContentInfo = {
                contentKey,
                contentVal: innerContent[contentKey],
                handler: contentTypeHandlers[contentKey]()
              }
              break
            }
          }
        }
        if (customContentInfo) {
          innerContentVDom = [] // signal that something was specified
        } else {
          innerContentVDom = innerContent // assume a [p]react vdom node. use it
        }
      }
      return innerContentVDom
    }
    ContentHookInner.prototype.updateCustomContent = function () {
      if (this.customContentInfo) {
        this.customContentInfo.handler(
          this.innerElRef.current || this.props.backupElRef.current, // the element to render into
          this.customContentInfo.contentVal
        )
      }
    }
    return ContentHookInner
  })(BaseComponent)
  var MountHook = /** @class */ (function (_super) {
    __extends(MountHook, _super)

    function MountHook () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.handleRootEl = function (rootEl) {
        _this.rootEl = rootEl
        if (_this.props.elRef) {
          setRef(_this.props.elRef, rootEl)
        }
      }
      return _this
    }

    MountHook.prototype.render = function () {
      return this.props.children(this.handleRootEl)
    }
    MountHook.prototype.componentDidMount = function () {
      const callback = this.props.didMount
      callback &&
        callback(
          __assign(__assign({}, this.props.hookProps), { el: this.rootEl })
        )
    }
    MountHook.prototype.componentWillUnmount = function () {
      const callback = this.props.willUnmount
      callback &&
        callback(
          __assign(__assign({}, this.props.hookProps), { el: this.rootEl })
        )
    }
    return MountHook
  })(BaseComponent)

  function buildClassNameNormalizer () {
    let currentGenerator
    let currentHookProps
    let currentClassNames = []
    return function (generator, hookProps) {
      if (
        !currentHookProps ||
        !isPropsEqual(currentHookProps, hookProps) ||
        generator !== currentGenerator
      ) {
        currentGenerator = generator
        currentHookProps = hookProps
        currentClassNames = normalizeClassNames(generator, hookProps)
      }
      return currentClassNames
    }
  }

  function normalizeClassNames (classNames, hookProps) {
    if (typeof classNames === 'function') {
      classNames = classNames(hookProps)
    }
    return parseClassNames(classNames)
  }

  function normalizeContent (input, hookProps) {
    if (typeof input === 'function') {
      return input(hookProps, createElement) // give the function the vdom-creation func
    } else {
      return input
    }
  }

  const ViewRoot = /** @class */ (function (_super) {
    __extends(ViewRoot, _super)

    function ViewRoot () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.normalizeClassNames = buildClassNameNormalizer()
      return _this
    }

    ViewRoot.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const options = context.options
      const hookProps = { view: context.viewApi }
      const customClassNames = this.normalizeClassNames(
        options.viewClassNames,
        hookProps
      )
      return createElement(
        MountHook,
        {
          hookProps,
          didMount: options.viewDidMount,
          willUnmount: options.viewWillUnmount,
          elRef: props.elRef
        },
        function (rootElRef) {
          return props.children(
            rootElRef,
            ['fc-' + props.viewSpec.type + '-view', 'fc-view'].concat(
              customClassNames
            )
          )
        }
      )
    }
    return ViewRoot
  })(BaseComponent)

  function parseViewConfigs (inputs) {
    return mapHash(inputs, parseViewConfig)
  }

  function parseViewConfig (input) {
    const rawOptions = typeof input === 'function' ? { component: input } : input
    let component = rawOptions.component
    if (rawOptions.content) {
      component = createViewHookComponent(rawOptions)
      // TODO: remove content/classNames/didMount/etc from options?
    }
    return {
      superType: rawOptions.type,
      component,
      rawOptions // includes type and component too :(
    }
  }

  function createViewHookComponent (options) {
    return function (viewProps) {
      return createElement(ViewContextType.Consumer, null, function (context) {
        return createElement(
          ViewRoot,
          { viewSpec: context.viewSpec },
          function (rootElRef, viewClassNames) {
            const hookProps = __assign(__assign({}, viewProps), {
              nextDayThreshold: context.options.nextDayThreshold
            })
            return createElement(
              RenderHook,
              {
                hookProps,
                classNames: options.classNames,
                content: options.content,
                didMount: options.didMount,
                willUnmount: options.willUnmount,
                elRef: rootElRef
              },
              function (rootElRef, customClassNames, innerElRef, innerContent) {
                return createElement(
                  'div',
                  {
                    className: viewClassNames
                      .concat(customClassNames)
                      .join(' '),
                    ref: rootElRef
                  },
                  innerContent
                )
              }
            )
          }
        )
      })
    }
  }

  function buildViewSpecs (
    defaultInputs,
    optionOverrides,
    dynamicOptionOverrides,
    localeDefaults
  ) {
    const defaultConfigs = parseViewConfigs(defaultInputs)
    const overrideConfigs = parseViewConfigs(optionOverrides.views)
    const viewDefs = compileViewDefs(defaultConfigs, overrideConfigs)
    return mapHash(viewDefs, function (viewDef) {
      return buildViewSpec(
        viewDef,
        overrideConfigs,
        optionOverrides,
        dynamicOptionOverrides,
        localeDefaults
      )
    })
  }

  function buildViewSpec (
    viewDef,
    overrideConfigs,
    optionOverrides,
    dynamicOptionOverrides,
    localeDefaults
  ) {
    const durationInput =
      viewDef.overrides.duration ||
      viewDef.defaults.duration ||
      dynamicOptionOverrides.duration ||
      optionOverrides.duration
    let duration = null
    let durationUnit = ''
    let singleUnit = ''
    let singleUnitOverrides = {}
    if (durationInput) {
      duration = createDurationCached(durationInput)
      if (duration) {
        // valid?
        const denom = greatestDurationDenominator(duration)
        durationUnit = denom.unit
        if (denom.value === 1) {
          singleUnit = durationUnit
          singleUnitOverrides = overrideConfigs[durationUnit]
            ? overrideConfigs[durationUnit].rawOptions
            : {}
        }
      }
    }
    const queryButtonText = function (optionsSubset) {
      const buttonTextMap = optionsSubset.buttonText || {}
      const buttonTextKey = viewDef.defaults.buttonTextKey
      if (buttonTextKey != null && buttonTextMap[buttonTextKey] != null) {
        return buttonTextMap[buttonTextKey]
      }
      if (buttonTextMap[viewDef.type] != null) {
        return buttonTextMap[viewDef.type]
      }
      if (buttonTextMap[singleUnit] != null) {
        return buttonTextMap[singleUnit]
      }
    }
    return {
      type: viewDef.type,
      component: viewDef.component,
      duration,
      durationUnit,
      singleUnit,
      optionDefaults: viewDef.defaults,
      optionOverrides: __assign(
        __assign({}, singleUnitOverrides),
        viewDef.overrides
      ),
      buttonTextOverride:
        queryButtonText(dynamicOptionOverrides) ||
        queryButtonText(optionOverrides) || // constructor-specified buttonText lookup hash takes precedence
        viewDef.overrides.buttonText,
      buttonTextDefault:
        queryButtonText(localeDefaults) ||
        viewDef.defaults.buttonText ||
        queryButtonText(BASE_OPTION_DEFAULTS) ||
        viewDef.type // fall back to given view name
    }
  }

  // hack to get memoization working
  const durationInputMap = {}

  function createDurationCached (durationInput) {
    const json = JSON.stringify(durationInput)
    let res = durationInputMap[json]
    if (res === undefined) {
      res = createDuration(durationInput)
      durationInputMap[json] = res
    }
    return res
  }

  const DateProfileGenerator = /** @class */ (function () {
    function DateProfileGenerator (props) {
      this.props = props
      this.nowDate = getNow(props.nowInput, props.dateEnv)
      this.initHiddenDays()
    }

    /* Date Range Computation
        ------------------------------------------------------------------------------------------------------------------ */
    // Builds a structure with info about what the dates/ranges will be for the "prev" view.
    DateProfileGenerator.prototype.buildPrev = function (
      currentDateProfile,
      currentDate,
      forceToValid
    ) {
      const dateEnv = this.props.dateEnv
      const prevDate = dateEnv.subtract(
        dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), // important for start-of-month
        currentDateProfile.dateIncrement
      )
      return this.build(prevDate, -1, forceToValid)
    }
    // Builds a structure with info about what the dates/ranges will be for the "next" view.
    DateProfileGenerator.prototype.buildNext = function (
      currentDateProfile,
      currentDate,
      forceToValid
    ) {
      const dateEnv = this.props.dateEnv
      const nextDate = dateEnv.add(
        dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), // important for start-of-month
        currentDateProfile.dateIncrement
      )
      return this.build(nextDate, 1, forceToValid)
    }
    // Builds a structure holding dates/ranges for rendering around the given date.
    // Optional direction param indicates whether the date is being incremented/decremented
    // from its previous value. decremented = -1, incremented = 1 (default).
    DateProfileGenerator.prototype.build = function (
      currentDate,
      direction,
      forceToValid
    ) {
      if (forceToValid === void 0) {
        forceToValid = true
      }
      const props = this.props
      let validRange
      let currentInfo
      let isRangeAllDay
      let renderRange
      let activeRange
      let isValid
      validRange = this.buildValidRange()
      validRange = this.trimHiddenDays(validRange)
      if (forceToValid) {
        currentDate = constrainMarkerToRange(currentDate, validRange)
      }
      currentInfo = this.buildCurrentRangeInfo(currentDate, direction)
      isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit)
      renderRange = this.buildRenderRange(
        this.trimHiddenDays(currentInfo.range),
        currentInfo.unit,
        isRangeAllDay
      )
      renderRange = this.trimHiddenDays(renderRange)
      activeRange = renderRange
      if (!props.showNonCurrentDates) {
        activeRange = intersectRanges(activeRange, currentInfo.range)
      }
      activeRange = this.adjustActiveRange(activeRange)
      activeRange = intersectRanges(activeRange, validRange) // might return null
      // it's invalid if the originally requested date is not contained,
      // or if the range is completely outside of the valid range.
      isValid = rangesIntersect(currentInfo.range, validRange)
      return {
        // constraint for where prev/next operations can go and where events can be dragged/resized to.
        // an object with optional start and end properties.
        validRange,
        // range the view is formally responsible for.
        // for example, a month view might have 1st-31st, excluding padded dates
        currentRange: currentInfo.range,
        // name of largest unit being displayed, like "month" or "week"
        currentRangeUnit: currentInfo.unit,
        isRangeAllDay,
        // dates that display events and accept drag-n-drop
        // will be `null` if no dates accept events
        activeRange,
        // date range with a rendered skeleton
        // includes not-active days that need some sort of DOM
        renderRange,
        // Duration object that denotes the first visible time of any given day
        slotMinTime: props.slotMinTime,
        // Duration object that denotes the exclusive visible end time of any given day
        slotMaxTime: props.slotMaxTime,
        isValid,
        // how far the current date will move for a prev/next operation
        dateIncrement: this.buildDateIncrement(currentInfo.duration)
        // pass a fallback (might be null) ^
      }
    }
    // Builds an object with optional start/end properties.
    // Indicates the minimum/maximum dates to display.
    // not responsible for trimming hidden days.
    DateProfileGenerator.prototype.buildValidRange = function () {
      const input = this.props.validRangeInput
      const simpleInput =
        typeof input === 'function'
          ? input.call(this.props.calendarApi, this.nowDate)
          : input
      return this.refineRange(simpleInput) || { start: null, end: null } // completely open-ended
    }
    // Builds a structure with info about the "current" range, the range that is
    // highlighted as being the current month for example.
    // See build() for a description of `direction`.
    // Guaranteed to have `range` and `unit` properties. `duration` is optional.
    DateProfileGenerator.prototype.buildCurrentRangeInfo = function (
      date,
      direction
    ) {
      const props = this.props
      let duration = null
      let unit = null
      let range = null
      let dayCount
      if (props.duration) {
        duration = props.duration
        unit = props.durationUnit
        range = this.buildRangeFromDuration(date, direction, duration, unit)
      } else if ((dayCount = this.props.dayCount)) {
        unit = 'day'
        range = this.buildRangeFromDayCount(date, direction, dayCount)
      } else if ((range = this.buildCustomVisibleRange(date))) {
        unit = props.dateEnv.greatestWholeUnit(range.start, range.end).unit
      } else {
        duration = this.getFallbackDuration()
        unit = greatestDurationDenominator(duration).unit
        range = this.buildRangeFromDuration(date, direction, duration, unit)
      }
      return { duration, unit, range }
    }
    DateProfileGenerator.prototype.getFallbackDuration = function () {
      return createDuration({ day: 1 })
    }
    // Returns a new activeRange to have time values (un-ambiguate)
    // slotMinTime or slotMaxTime causes the range to expand.
    DateProfileGenerator.prototype.adjustActiveRange = function (range) {
      const _a = this.props
      const dateEnv = _a.dateEnv
      const usesMinMaxTime = _a.usesMinMaxTime
      const slotMinTime = _a.slotMinTime
      const slotMaxTime = _a.slotMaxTime
      let start = range.start
      let end = range.end
      if (usesMinMaxTime) {
        // expand active range if slotMinTime is negative (why not when positive?)
        if (asRoughDays(slotMinTime) < 0) {
          start = startOfDay(start) // necessary?
          start = dateEnv.add(start, slotMinTime)
        }
        // expand active range if slotMaxTime is beyond one day (why not when negative?)
        if (asRoughDays(slotMaxTime) > 1) {
          end = startOfDay(end) // necessary?
          end = addDays(end, -1)
          end = dateEnv.add(end, slotMaxTime)
        }
      }
      return { start, end }
    }
    // Builds the "current" range when it is specified as an explicit duration.
    // `unit` is the already-computed greatestDurationDenominator unit of duration.
    DateProfileGenerator.prototype.buildRangeFromDuration = function (
      date,
      direction,
      duration,
      unit
    ) {
      const _a = this.props
      const dateEnv = _a.dateEnv
      let dateAlignment = _a.dateAlignment
      let start
      let end
      let res
      // compute what the alignment should be
      if (!dateAlignment) {
        const dateIncrement = this.props.dateIncrement
        if (dateIncrement) {
          // use the smaller of the two units
          if (asRoughMs(dateIncrement) < asRoughMs(duration)) {
            dateAlignment = greatestDurationDenominator(dateIncrement).unit
          } else {
            dateAlignment = unit
          }
        } else {
          dateAlignment = unit
        }
      }
      // if the view displays a single day or smaller
      if (asRoughDays(duration) <= 1) {
        if (this.isHiddenDay(start)) {
          start = this.skipHiddenDays(start, direction)
          start = startOfDay(start)
        }
      }

      function computeRes () {
        start = dateEnv.startOf(date, dateAlignment)
        end = dateEnv.add(start, duration)
        res = { start, end }
      }

      computeRes()
      // if range is completely enveloped by hidden days, go past the hidden days
      if (!this.trimHiddenDays(res)) {
        date = this.skipHiddenDays(date, direction)
        computeRes()
      }
      return res
    }
    // Builds the "current" range when a dayCount is specified.
    DateProfileGenerator.prototype.buildRangeFromDayCount = function (
      date,
      direction,
      dayCount
    ) {
      const _a = this.props
      const dateEnv = _a.dateEnv
      const dateAlignment = _a.dateAlignment
      let runningCount = 0
      let start = date
      let end
      if (dateAlignment) {
        start = dateEnv.startOf(start, dateAlignment)
      }
      start = startOfDay(start)
      start = this.skipHiddenDays(start, direction)
      end = start
      do {
        end = addDays(end, 1)
        if (!this.isHiddenDay(end)) {
          runningCount++
        }
      } while (runningCount < dayCount)
      return { start, end }
    }
    // Builds a normalized range object for the "visible" range,
    // which is a way to define the currentRange and activeRange at the same time.
    DateProfileGenerator.prototype.buildCustomVisibleRange = function (date) {
      const props = this.props
      const input = props.visibleRangeInput
      const simpleInput =
        typeof input === 'function'
          ? input.call(props.calendarApi, props.dateEnv.toDate(date))
          : input
      const range = this.refineRange(simpleInput)
      if (range && (range.start == null || range.end == null)) {
        return null
      }
      return range
    }
    // Computes the range that will represent the element/cells for *rendering*,
    // but which may have voided days/times.
    // not responsible for trimming hidden days.
    DateProfileGenerator.prototype.buildRenderRange = function (
      currentRange,
      currentRangeUnit,
      isRangeAllDay
    ) {
      return currentRange
    }
    // Compute the duration value that should be added/substracted to the current date
    // when a prev/next operation happens.
    DateProfileGenerator.prototype.buildDateIncrement = function (fallback) {
      const dateIncrement = this.props.dateIncrement
      let customAlignment
      if (dateIncrement) {
        return dateIncrement
      } else if ((customAlignment = this.props.dateAlignment)) {
        return createDuration(1, customAlignment)
      } else if (fallback) {
        return fallback
      } else {
        return createDuration({ days: 1 })
      }
    }
    DateProfileGenerator.prototype.refineRange = function (rangeInput) {
      if (rangeInput) {
        let range = parseRange(rangeInput, this.props.dateEnv)
        if (range) {
          range = computeVisibleDayRange(range)
        }
        return range
      }
      return null
    }
    /* Hidden Days
        ------------------------------------------------------------------------------------------------------------------ */
    // Initializes internal variables related to calculating hidden days-of-week
    DateProfileGenerator.prototype.initHiddenDays = function () {
      const hiddenDays = this.props.hiddenDays || [] // array of day-of-week indices that are hidden
      const isHiddenDayHash = [] // is the day-of-week hidden? (hash with day-of-week-index -> bool)
      let dayCnt = 0
      let i
      if (this.props.weekends === false) {
        hiddenDays.push(0, 6) // 0=sunday, 6=saturday
      }
      for (i = 0; i < 7; i++) {
        if (!(isHiddenDayHash[i] = hiddenDays.indexOf(i) !== -1)) {
          dayCnt++
        }
      }
      if (!dayCnt) {
        throw new Error('invalid hiddenDays') // all days were hidden? bad.
      }
      this.isHiddenDayHash = isHiddenDayHash
    }
    // Remove days from the beginning and end of the range that are computed as hidden.
    // If the whole range is trimmed off, returns null
    DateProfileGenerator.prototype.trimHiddenDays = function (range) {
      let start = range.start
      let end = range.end
      if (start) {
        start = this.skipHiddenDays(start)
      }
      if (end) {
        end = this.skipHiddenDays(end, -1, true)
      }
      if (start == null || end == null || start < end) {
        return { start, end }
      }
      return null
    }
    // Is the current day hidden?
    // `day` is a day-of-week index (0-6), or a Date (used for UTC)
    DateProfileGenerator.prototype.isHiddenDay = function (day) {
      if (day instanceof Date) {
        day = day.getUTCDay()
      }
      return this.isHiddenDayHash[day]
    }
    // Incrementing the current day until it is no longer a hidden day, returning a copy.
    // DOES NOT CONSIDER validRange!
    // If the initial value of `date` is not a hidden day, don't do anything.
    // Pass `isExclusive` as `true` if you are dealing with an end date.
    // `inc` defaults to `1` (increment one day forward each time)
    DateProfileGenerator.prototype.skipHiddenDays = function (
      date,
      inc,
      isExclusive
    ) {
      if (inc === void 0) {
        inc = 1
      }
      if (isExclusive === void 0) {
        isExclusive = false
      }
      while (
        this.isHiddenDayHash[
          (date.getUTCDay() + (isExclusive ? inc : 0) + 7) % 7
        ]
      ) {
        date = addDays(date, inc)
      }
      return date
    }
    return DateProfileGenerator
  })()

  function reduceViewType (viewType, action) {
    switch (action.type) {
      case 'CHANGE_VIEW_TYPE':
        return (viewType = action.viewType)
    }
    return viewType
  }

  function reduceDynamicOptionOverrides (dynamicOptionOverrides, action) {
    let _a
    switch (action.type) {
      case 'SET_OPTION':
        return __assign(
          __assign({}, dynamicOptionOverrides),
          ((_a = {}), (_a[action.optionName] = action.rawOptionValue), _a)
        )
      default:
        return dynamicOptionOverrides
    }
  }

  function reduceDateProfile (
    currentDateProfile,
    action,
    currentDate,
    dateProfileGenerator
  ) {
    let dp
    switch (action.type) {
      case 'CHANGE_VIEW_TYPE':
        return dateProfileGenerator.build(action.dateMarker || currentDate)
      case 'CHANGE_DATE':
        if (
          !currentDateProfile.activeRange ||
          !rangeContainsMarker(
            currentDateProfile.currentRange,
            action.dateMarker
          ) // don't move if date already in view
        ) {
          return dateProfileGenerator.build(action.dateMarker)
        }
        break
      case 'PREV':
        dp = dateProfileGenerator.buildPrev(currentDateProfile, currentDate)
        if (dp.isValid) {
          return dp
        }
        break
      case 'NEXT':
        dp = dateProfileGenerator.buildNext(currentDateProfile, currentDate)
        if (dp.isValid) {
          return dp
        }
        break
    }
    return currentDateProfile
  }

  function initEventSources (calendarOptions, dateProfile, context) {
    const activeRange = dateProfile ? dateProfile.activeRange : null
    return addSources(
      {},
      parseInitialSources(calendarOptions, context),
      activeRange,
      context
    )
  }

  function reduceEventSources (eventSources, action, dateProfile, context) {
    const activeRange = dateProfile ? dateProfile.activeRange : null // need this check?
    switch (action.type) {
      case 'ADD_EVENT_SOURCES': // already parsed
        return addSources(eventSources, action.sources, activeRange, context)
      case 'REMOVE_EVENT_SOURCE':
        return removeSource(eventSources, action.sourceId)
      case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
      case 'NEXT':
      case 'CHANGE_DATE':
      case 'CHANGE_VIEW_TYPE':
        if (dateProfile) {
          return fetchDirtySources(eventSources, activeRange, context)
        } else {
          return eventSources
        }
      case 'FETCH_EVENT_SOURCES':
        return fetchSourcesByIds(
          eventSources,
          action.sourceIds // why no type?
            ? arrayToHash(action.sourceIds)
            : excludeStaticSources(eventSources, context),
          activeRange,
          context
        )
      case 'RECEIVE_EVENTS':
      case 'RECEIVE_EVENT_ERROR':
        return receiveResponse(
          eventSources,
          action.sourceId,
          action.fetchId,
          action.fetchRange
        )
      case 'REMOVE_ALL_EVENT_SOURCES':
        return {}
      default:
        return eventSources
    }
  }

  function reduceEventSourcesNewTimeZone (eventSources, dateProfile, context) {
    const activeRange = dateProfile ? dateProfile.activeRange : null // need this check?
    return fetchSourcesByIds(
      eventSources,
      excludeStaticSources(eventSources, context),
      activeRange,
      context
    )
  }

  function computeEventSourceLoadingLevel (eventSources) {
    let cnt = 0
    for (const sourceId in eventSources) {
      if (eventSources[sourceId].isFetching) {
        cnt++
      }
    }
    return cnt
  }

  function addSources (eventSourceHash, sources, fetchRange, context) {
    let hash = {}
    for (let _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
      const source = sources_1[_i]
      hash[source.sourceId] = source
    }
    if (fetchRange) {
      hash = fetchDirtySources(hash, fetchRange, context)
    }
    return __assign(__assign({}, eventSourceHash), hash)
  }

  function removeSource (eventSourceHash, sourceId) {
    return filterHash(eventSourceHash, function (eventSource) {
      return eventSource.sourceId !== sourceId
    })
  }

  function fetchDirtySources (sourceHash, fetchRange, context) {
    return fetchSourcesByIds(
      sourceHash,
      filterHash(sourceHash, function (eventSource) {
        return isSourceDirty(eventSource, fetchRange, context)
      }),
      fetchRange,
      context
    )
  }

  function isSourceDirty (eventSource, fetchRange, context) {
    if (!doesSourceNeedRange(eventSource, context)) {
      return !eventSource.latestFetchId
    } else {
      return (
        !context.options.lazyFetching ||
        !eventSource.fetchRange ||
        eventSource.isFetching || // always cancel outdated in-progress fetches
        fetchRange.start < eventSource.fetchRange.start ||
        fetchRange.end > eventSource.fetchRange.end
      )
    }
  }

  function fetchSourcesByIds (prevSources, sourceIdHash, fetchRange, context) {
    const nextSources = {}
    for (const sourceId in prevSources) {
      const source = prevSources[sourceId]
      if (sourceIdHash[sourceId]) {
        nextSources[sourceId] = fetchSource(source, fetchRange, context)
      } else {
        nextSources[sourceId] = source
      }
    }
    return nextSources
  }

  function fetchSource (eventSource, fetchRange, context) {
    const options = context.options
    const calendarApi = context.calendarApi
    const sourceDef =
      context.pluginHooks.eventSourceDefs[eventSource.sourceDefId]
    const fetchId = guid()
    sourceDef.fetch(
      {
        eventSource,
        range: fetchRange,
        context
      },
      function (res) {
        let rawEvents = res.rawEvents
        if (options.eventSourceSuccess) {
          rawEvents =
            options.eventSourceSuccess.call(calendarApi, rawEvents, res.xhr) ||
            rawEvents
        }
        if (eventSource.success) {
          rawEvents =
            eventSource.success.call(calendarApi, rawEvents, res.xhr) ||
            rawEvents
        }
        context.dispatch({
          type: 'RECEIVE_EVENTS',
          sourceId: eventSource.sourceId,
          fetchId,
          fetchRange,
          rawEvents
        })
      },
      function (error) {
        console.warn(error.message, error)
        if (options.eventSourceFailure) {
          options.eventSourceFailure.call(calendarApi, error)
        }
        if (eventSource.failure) {
          eventSource.failure(error)
        }
        context.dispatch({
          type: 'RECEIVE_EVENT_ERROR',
          sourceId: eventSource.sourceId,
          fetchId,
          fetchRange,
          error
        })
      }
    )
    return __assign(__assign({}, eventSource), {
      isFetching: true,
      latestFetchId: fetchId
    })
  }

  function receiveResponse (sourceHash, sourceId, fetchId, fetchRange) {
    let _a
    const eventSource = sourceHash[sourceId]
    if (
      eventSource && // not already removed
      fetchId === eventSource.latestFetchId
    ) {
      return __assign(
        __assign({}, sourceHash),
        ((_a = {}),
        (_a[sourceId] = __assign(__assign({}, eventSource), {
          isFetching: false,
          fetchRange // also serves as a marker that at least one fetch has completed
        })),
        _a)
      )
    }
    return sourceHash
  }

  function excludeStaticSources (eventSources, context) {
    return filterHash(eventSources, function (eventSource) {
      return doesSourceNeedRange(eventSource, context)
    })
  }

  function parseInitialSources (rawOptions, context) {
    const refiners = buildEventSourceRefiners(context)
    const rawSources = [].concat(rawOptions.eventSources || [])
    const sources = [] // parsed
    if (rawOptions.initialEvents) {
      rawSources.unshift(rawOptions.initialEvents)
    }
    if (rawOptions.events) {
      rawSources.unshift(rawOptions.events)
    }
    for (
      let _i = 0, rawSources_1 = rawSources;
      _i < rawSources_1.length;
      _i++
    ) {
      const rawSource = rawSources_1[_i]
      const source = parseEventSource(rawSource, context, refiners)
      if (source) {
        sources.push(source)
      }
    }
    return sources
  }

  function doesSourceNeedRange (eventSource, context) {
    const defs = context.pluginHooks.eventSourceDefs
    return !defs[eventSource.sourceDefId].ignoreRange
  }

  function reduceDateSelection (currentSelection, action) {
    switch (action.type) {
      case 'UNSELECT_DATES':
        return null
      case 'SELECT_DATES':
        return action.selection
      default:
        return currentSelection
    }
  }

  function reduceSelectedEvent (currentInstanceId, action) {
    switch (action.type) {
      case 'UNSELECT_EVENT':
        return ''
      case 'SELECT_EVENT':
        return action.eventInstanceId
      default:
        return currentInstanceId
    }
  }

  function reduceEventDrag (currentDrag, action) {
    let newDrag
    switch (action.type) {
      case 'UNSET_EVENT_DRAG':
        return null
      case 'SET_EVENT_DRAG':
        newDrag = action.state
        return {
          affectedEvents: newDrag.affectedEvents,
          mutatedEvents: newDrag.mutatedEvents,
          isEvent: newDrag.isEvent
        }
      default:
        return currentDrag
    }
  }

  function reduceEventResize (currentResize, action) {
    let newResize
    switch (action.type) {
      case 'UNSET_EVENT_RESIZE':
        return null
      case 'SET_EVENT_RESIZE':
        newResize = action.state
        return {
          affectedEvents: newResize.affectedEvents,
          mutatedEvents: newResize.mutatedEvents,
          isEvent: newResize.isEvent
        }
      default:
        return currentResize
    }
  }

  function parseToolbars (
    calendarOptions,
    calendarOptionOverrides,
    theme,
    viewSpecs,
    calendarApi
  ) {
    const viewsWithButtons = []
    const headerToolbar = calendarOptions.headerToolbar
      ? parseToolbar(
        calendarOptions.headerToolbar,
        calendarOptions,
        calendarOptionOverrides,
        theme,
        viewSpecs,
        calendarApi,
        viewsWithButtons
      )
      : null
    const footerToolbar = calendarOptions.footerToolbar
      ? parseToolbar(
        calendarOptions.footerToolbar,
        calendarOptions,
        calendarOptionOverrides,
        theme,
        viewSpecs,
        calendarApi,
        viewsWithButtons
      )
      : null
    return {
      headerToolbar,
      footerToolbar,
      viewsWithButtons
    }
  }

  function parseToolbar (
    sectionStrHash,
    calendarOptions,
    calendarOptionOverrides,
    theme,
    viewSpecs,
    calendarApi,
    viewsWithButtons // dump side effects
  ) {
    return mapHash(sectionStrHash, function (sectionStr) {
      return parseSection(
        sectionStr,
        calendarOptions,
        calendarOptionOverrides,
        theme,
        viewSpecs,
        calendarApi,
        viewsWithButtons
      )
    })
  }

  /*
    BAD: querying icons and text here. should be done at render time
    */
  function parseSection (
    sectionStr,
    calendarOptions,
    calendarOptionOverrides,
    theme,
    viewSpecs,
    calendarApi,
    viewsWithButtons // dump side effects
  ) {
    const isRtl = calendarOptions.direction === 'rtl'
    const calendarCustomButtons = calendarOptions.customButtons || {}
    const calendarButtonTextOverrides = calendarOptionOverrides.buttonText || {}
    const calendarButtonText = calendarOptions.buttonText || {}
    const sectionSubstrs = sectionStr ? sectionStr.split(' ') : []
    return sectionSubstrs.map(function (buttonGroupStr) {
      return buttonGroupStr.split(',').map(function (buttonName) {
        if (buttonName === 'title') {
          return { buttonName }
        } else {
          let customButtonProps_1
          let viewSpec = void 0
          let buttonClick = void 0
          let buttonIcon = void 0 // only one of these will be set
          let buttonText = void 0 // "
          if ((customButtonProps_1 = calendarCustomButtons[buttonName])) {
            buttonClick = function (ev) {
              if (customButtonProps_1.click) {
                customButtonProps_1.click.call(ev.target, ev, ev.target)
              }
            };
            (buttonIcon =
              theme.getCustomButtonIconClass(customButtonProps_1)) ||
              (buttonIcon = theme.getIconClass(buttonName, isRtl)) ||
              (buttonText = customButtonProps_1.text)
          } else if ((viewSpec = viewSpecs[buttonName])) {
            viewsWithButtons.push(buttonName)
            buttonClick = function () {
              calendarApi.changeView(buttonName)
            };
            (buttonText = viewSpec.buttonTextOverride) ||
              (buttonIcon = theme.getIconClass(buttonName, isRtl)) ||
              (buttonText = viewSpec.buttonTextDefault)
          } else if (calendarApi[buttonName]) {
            // a calendarApi method
            buttonClick = function () {
              calendarApi[buttonName]()
            };
            (buttonText = calendarButtonTextOverrides[buttonName]) ||
              (buttonIcon = theme.getIconClass(buttonName, isRtl)) ||
              (buttonText = calendarButtonText[buttonName])
            //            ^ everything else is considered default
          }
          return {
            buttonName,
            buttonClick,
            buttonIcon,
            buttonText
          }
        }
      })
    })
  }

  const eventSourceDef = {
    ignoreRange: true,
    parseMeta: function (refined) {
      if (Array.isArray(refined.events)) {
        return refined.events
      }
      return null
    },
    fetch: function (arg, success) {
      success({
        rawEvents: arg.eventSource.meta
      })
    }
  }
  const arrayEventSourcePlugin = createPlugin({
    eventSourceDefs: [eventSourceDef]
  })

  const eventSourceDef$1 = {
    parseMeta: function (refined) {
      if (typeof refined.events === 'function') {
        return refined.events
      }
      return null
    },
    fetch: function (arg, success, failure) {
      const dateEnv = arg.context.dateEnv
      const func = arg.eventSource.meta
      unpromisify(
        func.bind(null, buildRangeApiWithTimeZone(arg.range, dateEnv)),
        function (rawEvents) {
          success({ rawEvents }) // needs an object response
        },
        failure // send errorObj directly to failure callback
      )
    }
  }
  const funcEventSourcePlugin = createPlugin({
    eventSourceDefs: [eventSourceDef$1]
  })

  function requestJson (method, url, params, successCallback, failureCallback) {
    method = method.toUpperCase()
    let body = null
    if (method === 'GET') {
      url = injectQueryStringParams(url, params)
    } else {
      body = encodeParams(params)
    }
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    if (method !== 'GET') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        let parsed = false
        let res = void 0
        try {
          res = JSON.parse(xhr.responseText)
          parsed = true
        } catch (err) {
          // will handle parsed=false
        }
        if (parsed) {
          successCallback(res, xhr)
        } else {
          failureCallback('Failure parsing JSON', xhr)
        }
      } else {
        failureCallback('Request failed', xhr)
      }
    }
    xhr.onerror = function () {
      failureCallback('Request failed', xhr)
    }
    xhr.send(body)
  }

  function injectQueryStringParams (url, params) {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + encodeParams(params)
  }

  function encodeParams (params) {
    const parts = []
    for (const key in params) {
      parts.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      )
    }
    return parts.join('&')
  }

  const JSON_FEED_EVENT_SOURCE_REFINERS = {
    method: String,
    extraParams: identity,
    startParam: String,
    endParam: String,
    timeZoneParam: String
  }

  const eventSourceDef$2 = {
    parseMeta: function (refined) {
      if (refined.url) {
        return {
          url: refined.url,
          method: (refined.method || 'GET').toUpperCase(),
          extraParams: refined.extraParams,
          startParam: refined.startParam,
          endParam: refined.endParam,
          timeZoneParam: refined.timeZoneParam
        }
      }
      return null
    },
    fetch: function (arg, success, failure) {
      const meta = arg.eventSource.meta
      const requestParams = buildRequestParams(meta, arg.range, arg.context)
      requestJson(
        meta.method,
        meta.url,
        requestParams,
        function (rawEvents, xhr) {
          success({ rawEvents, xhr })
        },
        function (errorMessage, xhr) {
          failure({ message: errorMessage, xhr })
        }
      )
    }
  }
  const jsonFeedEventSourcePlugin = createPlugin({
    eventSourceRefiners: JSON_FEED_EVENT_SOURCE_REFINERS,
    eventSourceDefs: [eventSourceDef$2]
  })

  function buildRequestParams (meta, range, context) {
    const dateEnv = context.dateEnv
    const options = context.options
    let startParam
    let endParam
    let timeZoneParam
    let customRequestParams
    const params = {}
    startParam = meta.startParam
    if (startParam == null) {
      startParam = options.startParam
    }
    endParam = meta.endParam
    if (endParam == null) {
      endParam = options.endParam
    }
    timeZoneParam = meta.timeZoneParam
    if (timeZoneParam == null) {
      timeZoneParam = options.timeZoneParam
    }
    // retrieve any outbound GET/POST data from the options
    if (typeof meta.extraParams === 'function') {
      // supplied as a function that returns a key/value object
      customRequestParams = meta.extraParams()
    } else {
      // probably supplied as a straight key/value object
      customRequestParams = meta.extraParams || {}
    }
    __assign(params, customRequestParams)
    params[startParam] = dateEnv.formatIso(range.start)
    params[endParam] = dateEnv.formatIso(range.end)
    if (dateEnv.timeZone !== 'local') {
      params[timeZoneParam] = dateEnv.timeZone
    }
    return params
  }

  const SIMPLE_RECURRING_REFINERS = {
    daysOfWeek: identity,
    startTime: createDuration,
    endTime: createDuration,
    duration: createDuration,
    startRecur: identity,
    endRecur: identity
  }

  const recurring = {
    parse: function (refined, dateEnv) {
      if (
        refined.daysOfWeek ||
        refined.startTime ||
        refined.endTime ||
        refined.startRecur ||
        refined.endRecur
      ) {
        const recurringData = {
          daysOfWeek: refined.daysOfWeek || null,
          startTime: refined.startTime || null,
          endTime: refined.endTime || null,
          startRecur: refined.startRecur
            ? dateEnv.createMarker(refined.startRecur)
            : null,
          endRecur: refined.endRecur
            ? dateEnv.createMarker(refined.endRecur)
            : null
        }
        let duration = void 0
        if (refined.duration) {
          duration = refined.duration
        }
        if (!duration && refined.startTime && refined.endTime) {
          duration = subtractDurations(refined.endTime, refined.startTime)
        }
        return {
          allDayGuess: Boolean(!refined.startTime && !refined.endTime),
          duration,
          typeData: recurringData // doesn't need endTime anymore but oh well
        }
      }
      return null
    },
    expand: function (typeData, framingRange, dateEnv) {
      const clippedFramingRange = intersectRanges(framingRange, {
        start: typeData.startRecur,
        end: typeData.endRecur
      })
      if (clippedFramingRange) {
        return expandRanges(
          typeData.daysOfWeek,
          typeData.startTime,
          clippedFramingRange,
          dateEnv
        )
      } else {
        return []
      }
    }
  }
  const simpleRecurringEventsPlugin = createPlugin({
    recurringTypes: [recurring],
    eventRefiners: SIMPLE_RECURRING_REFINERS
  })

  function expandRanges (daysOfWeek, startTime, framingRange, dateEnv) {
    const dowHash = daysOfWeek ? arrayToHash(daysOfWeek) : null
    let dayMarker = startOfDay(framingRange.start)
    const endMarker = framingRange.end
    const instanceStarts = []
    while (dayMarker < endMarker) {
      let instanceStart =
        // if everyday, or this particular day-of-week
        void 0
      // if everyday, or this particular day-of-week
      if (!dowHash || dowHash[dayMarker.getUTCDay()]) {
        if (startTime) {
          instanceStart = dateEnv.add(dayMarker, startTime)
        } else {
          instanceStart = dayMarker
        }
        instanceStarts.push(instanceStart)
      }
      dayMarker = addDays(dayMarker, 1)
    }
    return instanceStarts
  }

  const changeHandlerPlugin = createPlugin({
    optionChangeHandlers: {
      events: function (events, context) {
        handleEventSources([events], context)
      },
      eventSources: handleEventSources
    }
  })

  /*
    BUG: if `event` was supplied, all previously-given `eventSources` will be wiped out
    */
  function handleEventSources (inputs, context) {
    const unfoundSources = hashValuesToArray(
      context.getCurrentData().eventSources
    )
    const newInputs = []
    for (let _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
      const input = inputs_1[_i]
      let inputFound = false
      for (let i = 0; i < unfoundSources.length; i++) {
        if (unfoundSources[i]._raw === input) {
          unfoundSources.splice(i, 1) // delete
          inputFound = true
          break
        }
      }
      if (!inputFound) {
        newInputs.push(input)
      }
    }
    for (
      let _a = 0, unfoundSources_1 = unfoundSources;
      _a < unfoundSources_1.length;
      _a++
    ) {
      const unfoundSource = unfoundSources_1[_a]
      context.dispatch({
        type: 'REMOVE_EVENT_SOURCE',
        sourceId: unfoundSource.sourceId
      })
    }
    for (let _b = 0, newInputs_1 = newInputs; _b < newInputs_1.length; _b++) {
      const newInput = newInputs_1[_b]
      context.calendarApi.addEventSource(newInput)
    }
  }

  function handleDateProfile (dateProfile, context) {
    context.emitter.trigger(
      'datesSet',
      __assign(
        __assign(
          {},
          buildRangeApiWithTimeZone(dateProfile.activeRange, context.dateEnv)
        ),
        { view: context.viewApi }
      )
    )
  }

  function handleEventStore (eventStore, context) {
    const emitter = context.emitter
    if (emitter.hasHandlers('eventsSet')) {
      emitter.trigger('eventsSet', buildEventApis(eventStore, context))
    }
  }

  /*
    this array is exposed on the root namespace so that UMD plugins can add to it.
    see the rollup-bundles script.
    */
  const globalPlugins = [
    arrayEventSourcePlugin,
    funcEventSourcePlugin,
    jsonFeedEventSourcePlugin,
    simpleRecurringEventsPlugin,
    changeHandlerPlugin,
    createPlugin({
      contentTypeHandlers: {
        html: function () {
          return injectHtml
        },
        domNodes: function () {
          return injectDomNodes
        }
      },
      propSetHandlers: {
        dateProfile: handleDateProfile,
        eventStore: handleEventStore
      }
    })
  ]

  function injectHtml (el, html) {
    el.innerHTML = html
  }

  function injectDomNodes (el, domNodes) {
    const oldNodes = Array.prototype.slice.call(el.childNodes) // TODO: use array util
    const newNodes = Array.prototype.slice.call(domNodes) // TODO: use array util
    if (!isArraysEqual(oldNodes, newNodes)) {
      for (let _i = 0, newNodes_1 = newNodes; _i < newNodes_1.length; _i++) {
        const newNode = newNodes_1[_i]
        el.appendChild(newNode)
      }
      oldNodes.forEach(removeElement)
    }
  }

  const DelayedRunner = /** @class */ (function () {
    function DelayedRunner (drainedOption) {
      this.drainedOption = drainedOption
      this.isRunning = false
      this.isDirty = false
      this.pauseDepths = {}
      this.timeoutId = 0
    }

    DelayedRunner.prototype.request = function (delay) {
      this.isDirty = true
      if (!this.isPaused()) {
        this.clearTimeout()
        if (delay == null) {
          this.tryDrain()
        } else {
          this.timeoutId = setTimeout(
            // NOT OPTIMAL! TODO: look at debounce
            this.tryDrain.bind(this),
            delay
          )
        }
      }
    }
    DelayedRunner.prototype.pause = function (scope) {
      if (scope === void 0) {
        scope = ''
      }
      const pauseDepths = this.pauseDepths
      pauseDepths[scope] = (pauseDepths[scope] || 0) + 1
      this.clearTimeout()
    }
    DelayedRunner.prototype.resume = function (scope, force) {
      if (scope === void 0) {
        scope = ''
      }
      const pauseDepths = this.pauseDepths
      if (scope in pauseDepths) {
        if (force) {
          delete pauseDepths[scope]
        } else {
          const depth = --pauseDepths[scope]
          if (depth <= 0) {
            delete pauseDepths[scope]
          }
        }
        this.tryDrain()
      }
    }
    DelayedRunner.prototype.isPaused = function () {
      return Object.keys(this.pauseDepths).length
    }
    DelayedRunner.prototype.tryDrain = function () {
      if (!this.isRunning && !this.isPaused()) {
        this.isRunning = true
        while (this.isDirty) {
          this.isDirty = false
          this.drained() // might set isDirty to true again
        }
        this.isRunning = false
      }
    }
    DelayedRunner.prototype.clear = function () {
      this.clearTimeout()
      this.isDirty = false
      this.pauseDepths = {}
    }
    DelayedRunner.prototype.clearTimeout = function () {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = 0
      }
    }
    DelayedRunner.prototype.drained = function () {
      if (this.drainedOption) {
        this.drainedOption()
      }
    }
    return DelayedRunner
  })()
  const TaskRunner = /** @class */ (function () {
    function TaskRunner (runTaskOption, drainedOption) {
      this.runTaskOption = runTaskOption
      this.drainedOption = drainedOption
      this.queue = []
      this.delayedRunner = new DelayedRunner(this.drain.bind(this))
    }

    TaskRunner.prototype.request = function (task, delay) {
      this.queue.push(task)
      this.delayedRunner.request(delay)
    }
    TaskRunner.prototype.pause = function (scope) {
      this.delayedRunner.pause(scope)
    }
    TaskRunner.prototype.resume = function (scope, force) {
      this.delayedRunner.resume(scope, force)
    }
    TaskRunner.prototype.drain = function () {
      const queue = this.queue
      while (queue.length) {
        const completedTasks = []
        let task = void 0
        while ((task = queue.shift())) {
          this.runTask(task)
          completedTasks.push(task)
        }
        this.drained(completedTasks)
      } // keep going, in case new tasks were added in the drained handler
    }
    TaskRunner.prototype.runTask = function (task) {
      if (this.runTaskOption) {
        this.runTaskOption(task)
      }
    }
    TaskRunner.prototype.drained = function (completedTasks) {
      if (this.drainedOption) {
        this.drainedOption(completedTasks)
      }
    }
    return TaskRunner
  })()

  // Computes what the title at the top of the calendarApi should be for this view
  function buildTitle (dateProfile, viewOptions, dateEnv) {
    let range
    // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
    if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
      range = dateProfile.currentRange
    } else {
      // for day units or smaller, use the actual day range
      range = dateProfile.activeRange
    }
    return dateEnv.formatRange(
      range.start,
      range.end,
      createFormatter(viewOptions.titleFormat || buildTitleFormat(dateProfile)),
      {
        isEndExclusive: dateProfile.isRangeAllDay,
        defaultSeparator: viewOptions.titleRangeSeparator
      }
    )
  }

  // Generates the format string that should be used to generate the title for the current date range.
  // Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
  function buildTitleFormat (dateProfile) {
    const currentRangeUnit = dateProfile.currentRangeUnit
    if (currentRangeUnit === 'year') {
      return { year: 'numeric' }
    } else if (currentRangeUnit === 'month') {
      return { year: 'numeric', month: 'long' } // like "September 2014"
    } else {
      const days = diffWholeDays(
        dateProfile.currentRange.start,
        dateProfile.currentRange.end
      )
      if (days !== null && days > 1) {
        // multi-day range. shorter, like "Sep 9 - 10 2014"
        return { year: 'numeric', month: 'short', day: 'numeric' }
      } else {
        // one day. longer, like "September 9 2014"
        return { year: 'numeric', month: 'long', day: 'numeric' }
      }
    }
  }

  // in future refactor, do the redux-style function(state=initial) for initial-state
  // also, whatever is happening in constructor, have it happen in action queue too
  const CalendarDataManager = /** @class */ (function () {
    function CalendarDataManager (props) {
      const _this = this
      this.computeOptionsData = memoize(this._computeOptionsData)
      this.computeCurrentViewData = memoize(this._computeCurrentViewData)
      this.organizeRawLocales = memoize(organizeRawLocales)
      this.buildLocale = memoize(buildLocale)
      this.buildPluginHooks = buildBuildPluginHooks()
      this.buildDateEnv = memoize(buildDateEnv$1)
      this.buildTheme = memoize(buildTheme)
      this.parseToolbars = memoize(parseToolbars)
      this.buildViewSpecs = memoize(buildViewSpecs)
      this.buildDateProfileGenerator = memoizeObjArg(buildDateProfileGenerator)
      this.buildViewApi = memoize(buildViewApi)
      this.buildViewUiProps = memoizeObjArg(buildViewUiProps)
      this.buildEventUiBySource = memoize(buildEventUiBySource, isPropsEqual)
      this.buildEventUiBases = memoize(buildEventUiBases)
      this.parseContextBusinessHours = memoizeObjArg(parseContextBusinessHours)
      this.buildTitle = memoize(buildTitle)
      this.emitter = new Emitter()
      this.actionRunner = new TaskRunner(
        this._handleAction.bind(this),
        this.updateData.bind(this)
      )
      this.currentCalendarOptionsInput = {}
      this.currentCalendarOptionsRefined = {}
      this.currentViewOptionsInput = {}
      this.currentViewOptionsRefined = {}
      this.currentCalendarOptionsRefiners = {}
      this.getCurrentData = function () {
        return _this.data
      }
      this.dispatch = function (action) {
        _this.actionRunner.request(action) // protects against recursive calls to _handleAction
      }
      this.props = props
      this.actionRunner.pause()
      const dynamicOptionOverrides = {}
      const optionsData = this.computeOptionsData(
        props.optionOverrides,
        dynamicOptionOverrides,
        props.calendarApi
      )
      const currentViewType =
        optionsData.calendarOptions.initialView ||
        optionsData.pluginHooks.initialView
      const currentViewData = this.computeCurrentViewData(
        currentViewType,
        optionsData,
        props.optionOverrides,
        dynamicOptionOverrides
      )
      // wire things up
      // TODO: not DRY
      props.calendarApi.currentDataManager = this
      this.emitter.setThisContext(props.calendarApi)
      this.emitter.setOptions(currentViewData.options)
      let currentDate = getInitialDate(
        optionsData.calendarOptions,
        optionsData.dateEnv
      )
      const dateProfile = currentViewData.dateProfileGenerator.build(currentDate)
      if (!rangeContainsMarker(dateProfile.activeRange, currentDate)) {
        currentDate = dateProfile.currentRange.start
      }
      const calendarContext = {
        dateEnv: optionsData.dateEnv,
        options: optionsData.calendarOptions,
        pluginHooks: optionsData.pluginHooks,
        calendarApi: props.calendarApi,
        dispatch: this.dispatch,
        emitter: this.emitter,
        getCurrentData: this.getCurrentData
      }
      // needs to be after setThisContext
      for (
        let _i = 0, _a = optionsData.pluginHooks.contextInit;
        _i < _a.length;
        _i++
      ) {
        const callback = _a[_i]
        callback(calendarContext)
      }
      // NOT DRY
      const eventSources = initEventSources(
        optionsData.calendarOptions,
        dateProfile,
        calendarContext
      )
      const initialState = {
        dynamicOptionOverrides,
        currentViewType,
        currentDate,
        dateProfile,
        businessHours: this.parseContextBusinessHours(calendarContext),
        eventSources,
        eventUiBases: {},
        loadingLevel: computeEventSourceLoadingLevel(eventSources),
        eventStore: createEmptyEventStore(),
        renderableEventStore: createEmptyEventStore(),
        dateSelection: null,
        eventSelection: '',
        eventDrag: null,
        eventResize: null,
        selectionConfig: this.buildViewUiProps(calendarContext).selectionConfig
      }
      const contextAndState = __assign(
        __assign({}, calendarContext),
        initialState
      )
      for (
        let _b = 0, _c = optionsData.pluginHooks.reducers;
        _b < _c.length;
        _b++
      ) {
        const reducer = _c[_b]
        __assign(initialState, reducer(null, null, contextAndState))
      }
      if (initialState.loadingLevel) {
        this.emitter.trigger('loading', true) // NOT DRY
      }
      this.state = initialState
      this.updateData()
      this.actionRunner.resume()
    }

    CalendarDataManager.prototype.resetOptions = function (
      optionOverrides,
      append
    ) {
      const props = this.props
      props.optionOverrides = append
        ? __assign(__assign({}, props.optionOverrides), optionOverrides)
        : optionOverrides
      this.actionRunner.request({
        type: 'NOTHING'
      })
    }
    CalendarDataManager.prototype._handleAction = function (action) {
      const _a = this
      const props = _a.props
      const state = _a.state
      const emitter = _a.emitter
      const dynamicOptionOverrides = reduceDynamicOptionOverrides(
        state.dynamicOptionOverrides,
        action
      )
      const optionsData = this.computeOptionsData(
        props.optionOverrides,
        dynamicOptionOverrides,
        props.calendarApi
      )
      const currentViewType = reduceViewType(state.currentViewType, action)
      const currentViewData = this.computeCurrentViewData(
        currentViewType,
        optionsData,
        props.optionOverrides,
        dynamicOptionOverrides
      )
      // wire things up
      // TODO: not DRY
      props.calendarApi.currentDataManager = this
      emitter.setThisContext(props.calendarApi)
      emitter.setOptions(currentViewData.options)
      const calendarContext = {
        dateEnv: optionsData.dateEnv,
        options: optionsData.calendarOptions,
        pluginHooks: optionsData.pluginHooks,
        calendarApi: props.calendarApi,
        dispatch: this.dispatch,
        emitter,
        getCurrentData: this.getCurrentData
      }
      let currentDate = state.currentDate
      let dateProfile = state.dateProfile
      if (
        this.data &&
        this.data.dateProfileGenerator !== currentViewData.dateProfileGenerator
      ) {
        // hack
        dateProfile = currentViewData.dateProfileGenerator.build(currentDate)
      }
      currentDate = reduceCurrentDate(currentDate, action)
      dateProfile = reduceDateProfile(
        dateProfile,
        action,
        currentDate,
        currentViewData.dateProfileGenerator
      )
      if (!rangeContainsMarker(dateProfile.currentRange, currentDate)) {
        currentDate = dateProfile.currentRange.start
      }
      const eventSources = reduceEventSources(
        state.eventSources,
        action,
        dateProfile,
        calendarContext
      )
      const eventSourceLoadingLevel =
        computeEventSourceLoadingLevel(eventSources)
      const eventStore = reduceEventStore(
        state.eventStore,
        action,
        eventSources,
        dateProfile,
        calendarContext
      )
      const renderableEventStore =
        eventSourceLoadingLevel &&
        !currentViewData.options.progressiveEventRendering
          ? state.renderableEventStore || eventStore // try from previous state
          : eventStore
      const _b = this.buildViewUiProps(calendarContext)
      const eventUiSingleBase = _b.eventUiSingleBase
      const selectionConfig = _b.selectionConfig // will memoize obj
      const eventUiBySource = this.buildEventUiBySource(eventSources)
      const eventUiBases = this.buildEventUiBases(
        renderableEventStore.defs,
        eventUiSingleBase,
        eventUiBySource
      )
      const prevLoadingLevel = state.loadingLevel || 0
      const loadingLevel = eventSourceLoadingLevel
      const newState = {
        dynamicOptionOverrides,
        currentViewType,
        currentDate,
        dateProfile,
        eventSources,
        eventStore,
        renderableEventStore,
        selectionConfig,
        eventUiBases,
        loadingLevel,
        businessHours: this.parseContextBusinessHours(calendarContext),
        dateSelection: reduceDateSelection(state.dateSelection, action),
        eventSelection: reduceSelectedEvent(state.eventSelection, action),
        eventDrag: reduceEventDrag(state.eventDrag, action),
        eventResize: reduceEventResize(state.eventResize, action)
      }
      const contextAndState = __assign(__assign({}, calendarContext), newState)
      for (
        let _i = 0, _c = optionsData.pluginHooks.reducers;
        _i < _c.length;
        _i++
      ) {
        const reducer = _c[_i]
        __assign(newState, reducer(state, action, contextAndState)) // give the OLD state, for old value
      }
      // TODO: use propSetHandlers in plugin system
      if (!prevLoadingLevel && loadingLevel) {
        emitter.trigger('loading', true)
      } else if (prevLoadingLevel && !loadingLevel) {
        emitter.trigger('loading', false)
      }
      this.state = newState
      if (props.onAction) {
        props.onAction(action)
      }
    }
    CalendarDataManager.prototype.updateData = function () {
      const _a = this
      const props = _a.props
      const state = _a.state
      const oldData = this.data
      const optionsData = this.computeOptionsData(
        props.optionOverrides,
        state.dynamicOptionOverrides,
        props.calendarApi
      )
      const currentViewData = this.computeCurrentViewData(
        state.currentViewType,
        optionsData,
        props.optionOverrides,
        state.dynamicOptionOverrides
      )
      const data = (this.data = __assign(
        __assign(
          __assign(
            {
              viewTitle: this.buildTitle(
                state.dateProfile,
                currentViewData.options,
                optionsData.dateEnv
              ),
              calendarApi: props.calendarApi,
              dispatch: this.dispatch,
              emitter: this.emitter,
              getCurrentData: this.getCurrentData
            },
            optionsData
          ),
          currentViewData
        ),
        state
      ))
      const changeHandlers = optionsData.pluginHooks.optionChangeHandlers
      const oldCalendarOptions = oldData && oldData.calendarOptions
      const newCalendarOptions = optionsData.calendarOptions
      if (oldCalendarOptions && oldCalendarOptions !== newCalendarOptions) {
        if (oldCalendarOptions.timeZone !== newCalendarOptions.timeZone) {
          // hack
          state.eventSources = data.eventSources =
            reduceEventSourcesNewTimeZone(
              data.eventSources,
              state.dateProfile,
              data
            )
          state.eventStore = data.eventStore = rezoneEventStoreDates(
            data.eventStore,
            oldData.dateEnv,
            data.dateEnv
          )
        }
        for (const optionName in changeHandlers) {
          if (
            oldCalendarOptions[optionName] !== newCalendarOptions[optionName]
          ) {
            changeHandlers[optionName](newCalendarOptions[optionName], data)
          }
        }
      }
      if (props.onData) {
        props.onData(data)
      }
    }
    CalendarDataManager.prototype._computeOptionsData = function (
      optionOverrides,
      dynamicOptionOverrides,
      calendarApi
    ) {
      // TODO: blacklist options that are handled by optionChangeHandlers
      const _a = this.processRawCalendarOptions(
        optionOverrides,
        dynamicOptionOverrides
      )
      const refinedOptions = _a.refinedOptions
      const pluginHooks = _a.pluginHooks
      const localeDefaults = _a.localeDefaults
      const availableLocaleData = _a.availableLocaleData
      const extra = _a.extra
      warnUnknownOptions(extra)
      const dateEnv = this.buildDateEnv(
        refinedOptions.timeZone,
        refinedOptions.locale,
        refinedOptions.weekNumberCalculation,
        refinedOptions.firstDay,
        refinedOptions.weekText,
        pluginHooks,
        availableLocaleData,
        refinedOptions.defaultRangeSeparator
      )
      const viewSpecs = this.buildViewSpecs(
        pluginHooks.views,
        optionOverrides,
        dynamicOptionOverrides,
        localeDefaults
      )
      const theme = this.buildTheme(refinedOptions, pluginHooks)
      const toolbarConfig = this.parseToolbars(
        refinedOptions,
        optionOverrides,
        theme,
        viewSpecs,
        calendarApi
      )
      return {
        calendarOptions: refinedOptions,
        pluginHooks,
        dateEnv,
        viewSpecs,
        theme,
        toolbarConfig,
        localeDefaults,
        availableRawLocales: availableLocaleData.map
      }
    }
    // always called from behind a memoizer
    CalendarDataManager.prototype.processRawCalendarOptions = function (
      optionOverrides,
      dynamicOptionOverrides
    ) {
      const _a = mergeRawOptions([
        BASE_OPTION_DEFAULTS,
        optionOverrides,
        dynamicOptionOverrides
      ])
      const locales = _a.locales
      const locale = _a.locale
      const availableLocaleData = this.organizeRawLocales(locales)
      const availableRawLocales = availableLocaleData.map
      const localeDefaults = this.buildLocale(
        locale || availableLocaleData.defaultCode,
        availableRawLocales
      ).options
      const pluginHooks = this.buildPluginHooks(
        optionOverrides.plugins || [],
        globalPlugins
      )
      const refiners = (this.currentCalendarOptionsRefiners = __assign(
        __assign(
          __assign(
            __assign(
              __assign({}, BASE_OPTION_REFINERS),
              CALENDAR_LISTENER_REFINERS
            ),
            CALENDAR_OPTION_REFINERS
          ),
          pluginHooks.listenerRefiners
        ),
        pluginHooks.optionRefiners
      ))
      const extra = {}
      const raw = mergeRawOptions([
        BASE_OPTION_DEFAULTS,
        localeDefaults,
        optionOverrides,
        dynamicOptionOverrides
      ])
      const refined = {}
      const currentRaw = this.currentCalendarOptionsInput
      const currentRefined = this.currentCalendarOptionsRefined
      let anyChanges = false
      for (const optionName in raw) {
        if (optionName !== 'plugins') {
          // because plugins is special-cased
          if (
            raw[optionName] === currentRaw[optionName] ||
            (COMPLEX_OPTION_COMPARATORS[optionName] &&
              optionName in currentRaw &&
              COMPLEX_OPTION_COMPARATORS[optionName](
                currentRaw[optionName],
                raw[optionName]
              ))
          ) {
            refined[optionName] = currentRefined[optionName]
          } else if (refiners[optionName]) {
            refined[optionName] = refiners[optionName](raw[optionName])
            anyChanges = true
          } else {
            extra[optionName] = currentRaw[optionName]
          }
        }
      }
      if (anyChanges) {
        this.currentCalendarOptionsInput = raw
        this.currentCalendarOptionsRefined = refined
      }
      return {
        rawOptions: this.currentCalendarOptionsInput,
        refinedOptions: this.currentCalendarOptionsRefined,
        pluginHooks,
        availableLocaleData,
        localeDefaults,
        extra
      }
    }
    CalendarDataManager.prototype._computeCurrentViewData = function (
      viewType,
      optionsData,
      optionOverrides,
      dynamicOptionOverrides
    ) {
      const viewSpec = optionsData.viewSpecs[viewType]
      if (!viewSpec) {
        throw new Error(
          'viewType "' +
            viewType +
            "\" is not available. Please make sure you've loaded all neccessary plugins"
        )
      }
      const _a = this.processRawViewOptions(
        viewSpec,
        optionsData.pluginHooks,
        optionsData.localeDefaults,
        optionOverrides,
        dynamicOptionOverrides
      )
      const refinedOptions = _a.refinedOptions
      const extra = _a.extra
      warnUnknownOptions(extra)
      const dateProfileGenerator = this.buildDateProfileGenerator({
        dateProfileGeneratorClass:
          viewSpec.optionDefaults.dateProfileGeneratorClass,
        duration: viewSpec.duration,
        durationUnit: viewSpec.durationUnit,
        usesMinMaxTime: viewSpec.optionDefaults.usesMinMaxTime,
        dateEnv: optionsData.dateEnv,
        calendarApi: this.props.calendarApi,
        slotMinTime: refinedOptions.slotMinTime,
        slotMaxTime: refinedOptions.slotMaxTime,
        showNonCurrentDates: refinedOptions.showNonCurrentDates,
        dayCount: refinedOptions.dayCount,
        dateAlignment: refinedOptions.dateAlignment,
        dateIncrement: refinedOptions.dateIncrement,
        hiddenDays: refinedOptions.hiddenDays,
        weekends: refinedOptions.weekends,
        nowInput: refinedOptions.now,
        validRangeInput: refinedOptions.validRange,
        visibleRangeInput: refinedOptions.visibleRange,
        monthMode: refinedOptions.monthMode,
        fixedWeekCount: refinedOptions.fixedWeekCount
      })
      const viewApi = this.buildViewApi(
        viewType,
        this.getCurrentData,
        optionsData.dateEnv
      )
      return {
        viewSpec,
        options: refinedOptions,
        dateProfileGenerator,
        viewApi
      }
    }
    CalendarDataManager.prototype.processRawViewOptions = function (
      viewSpec,
      pluginHooks,
      localeDefaults,
      optionOverrides,
      dynamicOptionOverrides
    ) {
      const raw = mergeRawOptions([
        BASE_OPTION_DEFAULTS,
        viewSpec.optionDefaults,
        localeDefaults,
        optionOverrides,
        viewSpec.optionOverrides,
        dynamicOptionOverrides
      ])
      const refiners = __assign(
        __assign(
          __assign(
            __assign(
              __assign(
                __assign({}, BASE_OPTION_REFINERS),
                CALENDAR_LISTENER_REFINERS
              ),
              CALENDAR_OPTION_REFINERS
            ),
            VIEW_OPTION_REFINERS
          ),
          pluginHooks.listenerRefiners
        ),
        pluginHooks.optionRefiners
      )
      const refined = {}
      const currentRaw = this.currentViewOptionsInput
      const currentRefined = this.currentViewOptionsRefined
      let anyChanges = false
      const extra = {}
      for (const optionName in raw) {
        if (raw[optionName] === currentRaw[optionName]) {
          refined[optionName] = currentRefined[optionName]
        } else {
          if (
            raw[optionName] === this.currentCalendarOptionsInput[optionName]
          ) {
            if (optionName in this.currentCalendarOptionsRefined) {
              // might be an "extra" prop
              refined[optionName] =
                this.currentCalendarOptionsRefined[optionName]
            }
          } else if (refiners[optionName]) {
            refined[optionName] = refiners[optionName](raw[optionName])
          } else {
            extra[optionName] = raw[optionName]
          }
          anyChanges = true
        }
      }
      if (anyChanges) {
        this.currentViewOptionsInput = raw
        this.currentViewOptionsRefined = refined
      }
      return {
        rawOptions: this.currentViewOptionsInput,
        refinedOptions: this.currentViewOptionsRefined,
        extra
      }
    }
    return CalendarDataManager
  })()

  function buildDateEnv$1 (
    timeZone,
    explicitLocale,
    weekNumberCalculation,
    firstDay,
    weekText,
    pluginHooks,
    availableLocaleData,
    defaultSeparator
  ) {
    const locale = buildLocale(
      explicitLocale || availableLocaleData.defaultCode,
      availableLocaleData.map
    )
    return new DateEnv({
      calendarSystem: 'gregory',
      timeZone,
      namedTimeZoneImpl: pluginHooks.namedTimeZonedImpl,
      locale,
      weekNumberCalculation,
      firstDay,
      weekText,
      cmdFormatter: pluginHooks.cmdFormatter,
      defaultSeparator
    })
  }

  function buildTheme (options, pluginHooks) {
    const ThemeClass =
      pluginHooks.themeClasses[options.themeSystem] || StandardTheme
    return new ThemeClass(options)
  }

  function buildDateProfileGenerator (props) {
    const DateProfileGeneratorClass =
      props.dateProfileGeneratorClass || DateProfileGenerator
    return new DateProfileGeneratorClass(props)
  }

  function buildViewApi (type, getCurrentData, dateEnv) {
    return new ViewApi(type, getCurrentData, dateEnv)
  }

  function buildEventUiBySource (eventSources) {
    return mapHash(eventSources, function (eventSource) {
      return eventSource.ui
    })
  }

  function buildEventUiBases (eventDefs, eventUiSingleBase, eventUiBySource) {
    const eventUiBases = { '': eventUiSingleBase }
    for (const defId in eventDefs) {
      const def = eventDefs[defId]
      if (def.sourceId && eventUiBySource[def.sourceId]) {
        eventUiBases[defId] = eventUiBySource[def.sourceId]
      }
    }
    return eventUiBases
  }

  function buildViewUiProps (calendarContext) {
    const options = calendarContext.options
    return {
      eventUiSingleBase: createEventUi(
        {
          display: options.eventDisplay,
          editable: options.editable,
          startEditable: options.eventStartEditable,
          durationEditable: options.eventDurationEditable,
          constraint: options.eventConstraint,
          overlap:
            typeof options.eventOverlap === 'boolean'
              ? options.eventOverlap
              : undefined,
          allow: options.eventAllow,
          backgroundColor: options.eventBackgroundColor,
          borderColor: options.eventBorderColor,
          textColor: options.eventTextColor,
          color: options.eventColor
          // classNames: options.eventClassNames // render hook will handle this
        },
        calendarContext
      ),
      selectionConfig: createEventUi(
        {
          constraint: options.selectConstraint,
          overlap:
            typeof options.selectOverlap === 'boolean'
              ? options.selectOverlap
              : undefined,
          allow: options.selectAllow
        },
        calendarContext
      )
    }
  }

  function parseContextBusinessHours (calendarContext) {
    return parseBusinessHours(
      calendarContext.options.businessHours,
      calendarContext
    )
  }

  function warnUnknownOptions (options, viewName) {
    for (const optionName in options) {
      console.warn(
        "Unknown option '" +
          optionName +
          "'" +
          (viewName ? " for view '" + viewName + "'" : '')
      )
    }
  }

  // TODO: move this to react plugin?
  const CalendarDataProvider = /** @class */ (function (_super) {
    __extends(CalendarDataProvider, _super)

    function CalendarDataProvider (props) {
      const _this = _super.call(this, props) || this
      _this.handleData = function (data) {
        if (!_this.dataManager) {
          // still within initial run, before assignment in constructor
          // eslint-disable-next-line react/no-direct-mutation-state
          _this.state = data // can't use setState yet
        } else {
          _this.setState(data)
        }
      }
      _this.dataManager = new CalendarDataManager({
        optionOverrides: props.optionOverrides,
        calendarApi: props.calendarApi,
        onData: _this.handleData
      })
      return _this
    }

    CalendarDataProvider.prototype.render = function () {
      return this.props.children(this.state)
    }
    CalendarDataProvider.prototype.componentDidUpdate = function (prevProps) {
      const newOptionOverrides = this.props.optionOverrides
      if (newOptionOverrides !== prevProps.optionOverrides) {
        // prevent recursive handleData
        this.dataManager.resetOptions(newOptionOverrides)
      }
    }
    return CalendarDataProvider
  })(Component)

  // HELPERS
  /*
    if nextDayThreshold is specified, slicing is done in an all-day fashion.
    you can get nextDayThreshold from context.nextDayThreshold
    */
  function sliceEvents (props, allDay) {
    return sliceEventStore(
      props.eventStore,
      props.eventUiBases,
      props.dateProfile.activeRange,
      allDay ? props.nextDayThreshold : null
    ).fg
  }

  const NamedTimeZoneImpl = /** @class */ (function () {
    function NamedTimeZoneImpl (timeZoneName) {
      this.timeZoneName = timeZoneName
    }

    return NamedTimeZoneImpl
  })()

  const Interaction = /** @class */ (function () {
    function Interaction (settings) {
      this.component = settings.component
    }

    Interaction.prototype.destroy = function () {}
    return Interaction
  })()

  function parseInteractionSettings (component, input) {
    return {
      component,
      el: input.el,
      useEventCenter:
        input.useEventCenter != null ? input.useEventCenter : true
    }
  }

  function interactionSettingsToStore (settings) {
    let _a
    return (_a = {}), (_a[settings.component.uid] = settings), _a
  }

  // global state
  const interactionSettingsStore = {}

  /*
    An abstraction for a dragging interaction originating on an event.
    Does higher-level things than PointerDragger, such as possibly:
    - a "mirror" that moves with the pointer
    - a minimum number of pixels or other criteria for a true drag to begin

    subclasses must emit:
    - pointerdown
    - dragstart
    - dragmove
    - pointerup
    - dragend
    */
  const ElementDragging = /** @class */ (function () {
    function ElementDragging (el, selector) {
      this.emitter = new Emitter()
    }

    ElementDragging.prototype.destroy = function () {}
    ElementDragging.prototype.setMirrorIsVisible = function (bool) {
      // optional if subclass doesn't want to support a mirror
    }
    ElementDragging.prototype.setMirrorNeedsRevert = function (bool) {
      // optional if subclass doesn't want to support a mirror
    }
    ElementDragging.prototype.setAutoScrollEnabled = function (bool) {
      // optional
    }
    return ElementDragging
  })()

  // TODO: get rid of this in favor of options system,
  // tho it's really easy to access this globally rather than pass thru options.
  const config = {}

  /*
    Information about what will happen when an external element is dragged-and-dropped
    onto a calendar. Contains information for creating an event.
    */
  const DRAG_META_REFINERS = {
    startTime: createDuration,
    duration: createDuration,
    create: Boolean,
    sourceId: String
  }

  function parseDragMeta (raw) {
    const _a = refineProps(raw, DRAG_META_REFINERS)
    const refined = _a.refined
    const extra = _a.extra
    return {
      startTime: refined.startTime || null,
      duration: refined.duration || null,
      create: refined.create != null ? refined.create : true,
      sourceId: refined.sourceId,
      leftoverProps: extra
    }
  }

  const Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super)

    function Toolbar () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    Toolbar.prototype.render = function () {
      const _a = this.props
      const model = _a.model
      const extraClassName = _a.extraClassName
      let forceLtr = false
      let startContent, endContent
      const centerContent = model.center
      if (model.left) {
        forceLtr = true
        startContent = model.left
      } else {
        startContent = model.start
      }
      if (model.right) {
        forceLtr = true
        endContent = model.right
      } else {
        endContent = model.end
      }
      const classNames = [
        extraClassName || '',
        'fc-toolbar',
        forceLtr ? 'fc-toolbar-ltr' : ''
      ]
      return createElement(
        'div',
        { className: classNames.join(' ') },
        this.renderSection('start', startContent || []),
        this.renderSection('center', centerContent || []),
        this.renderSection('end', endContent || [])
      )
    }
    Toolbar.prototype.renderSection = function (key, widgetGroups) {
      const props = this.props
      return createElement(ToolbarSection, {
        key,
        widgetGroups,
        title: props.title,
        activeButton: props.activeButton,
        isTodayEnabled: props.isTodayEnabled,
        isPrevEnabled: props.isPrevEnabled,
        isNextEnabled: props.isNextEnabled
      })
    }
    return Toolbar
  })(BaseComponent)
  var ToolbarSection = /** @class */ (function (_super) {
    __extends(ToolbarSection, _super)

    function ToolbarSection () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    ToolbarSection.prototype.render = function () {
      const _this = this
      const children = this.props.widgetGroups.map(function (widgetGroup) {
        return _this.renderWidgetGroup(widgetGroup)
      })
      return createElement.apply(
        void 0,
        __spreadArrays(['div', { className: 'fc-toolbar-chunk' }], children)
      )
    }
    ToolbarSection.prototype.renderWidgetGroup = function (widgetGroup) {
      const props = this.props
      const theme = this.context.theme
      const children = []
      let isOnlyButtons = true
      for (
        let _i = 0, widgetGroup_1 = widgetGroup;
        _i < widgetGroup_1.length;
        _i++
      ) {
        const widget = widgetGroup_1[_i]
        const buttonName = widget.buttonName
        const buttonClick = widget.buttonClick
        const buttonText = widget.buttonText
        const buttonIcon = widget.buttonIcon
        if (buttonName === 'title') {
          isOnlyButtons = false
          children.push(
            createElement('h2', { className: 'fc-toolbar-title' }, props.title)
          )
        } else {
          const ariaAttrs = buttonIcon ? { 'aria-label': buttonName } : {}
          const buttonClasses = [
            'fc-' + buttonName + '-button',
            theme.getClass('button')
          ]
          if (buttonName === props.activeButton) {
            buttonClasses.push(theme.getClass('buttonActive'))
          }
          const isDisabled =
            (!props.isTodayEnabled && buttonName === 'today') ||
            (!props.isPrevEnabled && buttonName === 'prev') ||
            (!props.isNextEnabled && buttonName === 'next')
          children.push(
            createElement(
              'button',
              __assign(
                {
                  disabled: isDisabled,
                  className: buttonClasses.join(' '),
                  onClick: buttonClick,
                  type: 'button'
                },
                ariaAttrs
              ),
              buttonText ||
                (buttonIcon
                  ? createElement('span', { className: buttonIcon })
                  : '')
            )
          )
        }
      }
      if (children.length > 1) {
        const groupClassName =
          (isOnlyButtons && theme.getClass('buttonGroup')) || ''
        return createElement.apply(
          void 0,
          __spreadArrays(['div', { className: groupClassName }], children)
        )
      } else {
        return children[0]
      }
    }
    return ToolbarSection
  })(BaseComponent)

  // TODO: do function component?
  const ViewContainer = /** @class */ (function (_super) {
    __extends(ViewContainer, _super)

    function ViewContainer () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.state = {
        availableWidth: null
      }
      _this.handleEl = function (el) {
        _this.el = el
        setRef(_this.props.elRef, el)
        _this.updateAvailableWidth()
      }
      _this.handleResize = function () {
        _this.updateAvailableWidth()
      }
      return _this
    }

    ViewContainer.prototype.render = function () {
      const _a = this
      const props = _a.props
      const state = _a.state
      const aspectRatio = props.aspectRatio
      const classNames = [
        'fc-view-harness',
        aspectRatio || props.liquid || props.height
          ? 'fc-view-harness-active' // harness controls the height
          : 'fc-view-harness-passive' // let the view do the height
      ]
      let height = ''
      let paddingBottom = ''
      if (aspectRatio) {
        if (state.availableWidth !== null) {
          height = state.availableWidth / aspectRatio
        } else {
          // while waiting to know availableWidth, we can't set height to *zero*
          // because will cause lots of unnecessary scrollbars within scrollgrid.
          // BETTER: don't start rendering ANYTHING yet until we know container width
          // NOTE: why not always use paddingBottom? Causes height oscillation (issue 5606)
          paddingBottom = (1 / aspectRatio) * 100 + '%'
        }
      } else {
        height = props.height || ''
      }
      return createElement(
        'div',
        {
          ref: this.handleEl,
          onClick: props.onClick,
          className: classNames.join(' '),
          style: { height, paddingBottom }
        },
        props.children
      )
    }
    ViewContainer.prototype.componentDidMount = function () {
      this.context.addResizeHandler(this.handleResize)
    }
    ViewContainer.prototype.componentWillUnmount = function () {
      this.context.removeResizeHandler(this.handleResize)
    }
    ViewContainer.prototype.updateAvailableWidth = function () {
      if (
        this.el && // needed. but why?
        this.props.aspectRatio // aspectRatio is the only height setting that needs availableWidth
      ) {
        this.setState({ availableWidth: this.el.offsetWidth })
      }
    }
    return ViewContainer
  })(BaseComponent)

  /*
    Detects when the user clicks on an event within a DateComponent
    */
  const EventClicking = /** @class */ (function (_super) {
    __extends(EventClicking, _super)

    function EventClicking (settings) {
      const _this = _super.call(this, settings) || this
      _this.handleSegClick = function (ev, segEl) {
        const component = _this.component
        const context = component.context
        const seg = getElSeg(segEl)
        if (
          seg && // might be the <div> surrounding the more link
          component.isValidSegDownEl(ev.target)
        ) {
          // our way to simulate a link click for elements that can't be <a> tags
          // grab before trigger fired in case trigger trashes DOM thru rerendering
          const hasUrlContainer = elementClosest(
            ev.target,
            '.fc-event-forced-url'
          )
          const url = hasUrlContainer
            ? hasUrlContainer.querySelector('a[href]').href
            : ''
          context.emitter.trigger('eventClick', {
            el: segEl,
            event: new EventApi(
              component.context,
              seg.eventRange.def,
              seg.eventRange.instance
            ),
            jsEvent: ev,
            view: context.viewApi
          })
          if (url && !ev.defaultPrevented) {
            window.location.href = url
          }
        }
      }
      _this.destroy = listenBySelector(
        settings.el,
        'click',
        '.fc-event', // on both fg and bg events
        _this.handleSegClick
      )
      return _this
    }

    return EventClicking
  })(Interaction)

  /*
    Triggers events and adds/removes core classNames when the user's pointer
    enters/leaves event-elements of a component.
    */
  const EventHovering = /** @class */ (function (_super) {
    __extends(EventHovering, _super)

    function EventHovering (settings) {
      const _this = _super.call(this, settings) || this
      // for simulating an eventMouseLeave when the event el is destroyed while mouse is over it
      _this.handleEventElRemove = function (el) {
        if (el === _this.currentSegEl) {
          _this.handleSegLeave(null, _this.currentSegEl)
        }
      }
      _this.handleSegEnter = function (ev, segEl) {
        if (getElSeg(segEl)) {
          // TODO: better way to make sure not hovering over more+ link or its wrapper
          _this.currentSegEl = segEl
          _this.triggerEvent('eventMouseEnter', ev, segEl)
        }
      }
      _this.handleSegLeave = function (ev, segEl) {
        if (_this.currentSegEl) {
          _this.currentSegEl = null
          _this.triggerEvent('eventMouseLeave', ev, segEl)
        }
      }
      _this.removeHoverListeners = listenToHoverBySelector(
        settings.el,
        '.fc-event', // on both fg and bg events
        _this.handleSegEnter,
        _this.handleSegLeave
      )
      return _this
    }

    EventHovering.prototype.destroy = function () {
      this.removeHoverListeners()
    }
    EventHovering.prototype.triggerEvent = function (publicEvName, ev, segEl) {
      const component = this.component
      const context = component.context
      const seg = getElSeg(segEl)
      if (!ev || component.isValidSegDownEl(ev.target)) {
        context.emitter.trigger(publicEvName, {
          el: segEl,
          event: new EventApi(
            context,
            seg.eventRange.def,
            seg.eventRange.instance
          ),
          jsEvent: ev,
          view: context.viewApi
        })
      }
    }
    return EventHovering
  })(Interaction)

  const CalendarContent = /** @class */ (function (_super) {
    __extends(CalendarContent, _super)

    function CalendarContent () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.buildViewContext = memoize(buildViewContext)
      _this.buildViewPropTransformers = memoize(buildViewPropTransformers)
      _this.buildToolbarProps = memoize(buildToolbarProps)
      _this.handleNavLinkClick = buildDelegationHandler(
        'a[data-navlink]',
        _this._handleNavLinkClick.bind(_this)
      )
      _this.headerRef = createRef()
      _this.footerRef = createRef()
      _this.interactionsStore = {}
      // Component Registration
      // -----------------------------------------------------------------------------------------------------------------
      _this.registerInteractiveComponent = function (component, settingsInput) {
        const settings = parseInteractionSettings(component, settingsInput)
        const DEFAULT_INTERACTIONS = [EventClicking, EventHovering]
        const interactionClasses = DEFAULT_INTERACTIONS.concat(
          _this.props.pluginHooks.componentInteractions
        )
        const interactions = interactionClasses.map(function (interactionClass) {
          return new interactionClass(settings)
        })
        _this.interactionsStore[component.uid] = interactions
        interactionSettingsStore[component.uid] = settings
      }
      _this.unregisterInteractiveComponent = function (component) {
        for (
          let _i = 0, _a = _this.interactionsStore[component.uid];
          _i < _a.length;
          _i++
        ) {
          const listener = _a[_i]
          listener.destroy()
        }
        delete _this.interactionsStore[component.uid]
        delete interactionSettingsStore[component.uid]
      }
      // Resizing
      // -----------------------------------------------------------------------------------------------------------------
      _this.resizeRunner = new DelayedRunner(function () {
        _this.props.emitter.trigger('_resize', true) // should window resizes be considered "forced" ?
        _this.props.emitter.trigger('windowResize', {
          view: _this.props.viewApi
        })
      })
      _this.handleWindowResize = function (ev) {
        const options = _this.props.options
        if (
          options.handleWindowResize &&
          ev.target === window // avoid jqui events
        ) {
          _this.resizeRunner.request(options.windowResizeDelay)
        }
      }
      return _this
    }

    /*
        renders INSIDE of an outer div
        */
    CalendarContent.prototype.render = function () {
      const props = this.props
      const toolbarConfig = props.toolbarConfig
      const options = props.options
      const toolbarProps = this.buildToolbarProps(
        props.viewSpec,
        props.dateProfile,
        props.dateProfileGenerator,
        props.currentDate,
        getNow(props.options.now, props.dateEnv), // TODO: use NowTimer????
        props.viewTitle
      )
      let viewVGrow = false
      let viewHeight = ''
      let viewAspectRatio
      if (props.isHeightAuto || props.forPrint) {
        viewHeight = ''
      } else if (options.height != null) {
        viewVGrow = true
      } else if (options.contentHeight != null) {
        viewHeight = options.contentHeight
      } else {
        viewAspectRatio = Math.max(options.aspectRatio, 0.5) // prevent from getting too tall
      }
      const viewContext = this.buildViewContext(
        props.viewSpec,
        props.viewApi,
        props.options,
        props.dateProfileGenerator,
        props.dateEnv,
        props.theme,
        props.pluginHooks,
        props.dispatch,
        props.getCurrentData,
        props.emitter,
        props.calendarApi,
        this.registerInteractiveComponent,
        this.unregisterInteractiveComponent
      )
      return createElement(
        ViewContextType.Provider,
        { value: viewContext },
        toolbarConfig.headerToolbar &&
          createElement(
            Toolbar,
            __assign(
              {
                ref: this.headerRef,
                extraClassName: 'fc-header-toolbar',
                model: toolbarConfig.headerToolbar
              },
              toolbarProps
            )
          ),
        createElement(
          ViewContainer,
          {
            liquid: viewVGrow,
            height: viewHeight,
            aspectRatio: viewAspectRatio,
            onClick: this.handleNavLinkClick
          },
          this.renderView(props),
          this.buildAppendContent()
        ),
        toolbarConfig.footerToolbar &&
          createElement(
            Toolbar,
            __assign(
              {
                ref: this.footerRef,
                extraClassName: 'fc-footer-toolbar',
                model: toolbarConfig.footerToolbar
              },
              toolbarProps
            )
          )
      )
    }
    CalendarContent.prototype.componentDidMount = function () {
      const props = this.props
      this.calendarInteractions = props.pluginHooks.calendarInteractions.map(
        function (calendarInteractionClass) {
          return new calendarInteractionClass(props)
        }
      )
      window.addEventListener('resize', this.handleWindowResize)
      const propSetHandlers = props.pluginHooks.propSetHandlers
      for (const propName in propSetHandlers) {
        propSetHandlers[propName](props[propName], props)
      }
    }
    CalendarContent.prototype.componentDidUpdate = function (prevProps) {
      const props = this.props
      const propSetHandlers = props.pluginHooks.propSetHandlers
      for (const propName in propSetHandlers) {
        if (props[propName] !== prevProps[propName]) {
          propSetHandlers[propName](props[propName], props)
        }
      }
    }
    CalendarContent.prototype.componentWillUnmount = function () {
      window.removeEventListener('resize', this.handleWindowResize)
      this.resizeRunner.clear()
      for (let _i = 0, _a = this.calendarInteractions; _i < _a.length; _i++) {
        const interaction = _a[_i]
        interaction.destroy()
      }
      this.props.emitter.trigger('_unmount')
    }
    CalendarContent.prototype._handleNavLinkClick = function (ev, anchorEl) {
      const _a = this.props
      const dateEnv = _a.dateEnv
      const options = _a.options
      const calendarApi = _a.calendarApi
      let navLinkOptions = anchorEl.getAttribute('data-navlink')
      navLinkOptions = navLinkOptions ? JSON.parse(navLinkOptions) : {}
      const dateMarker = dateEnv.createMarker(navLinkOptions.date)
      let viewType = navLinkOptions.type
      const customAction =
        viewType === 'day'
          ? options.navLinkDayClick
          : viewType === 'week'
            ? options.navLinkWeekClick
            : null
      if (typeof customAction === 'function') {
        customAction.call(calendarApi, dateEnv.toDate(dateMarker), ev)
      } else {
        if (typeof customAction === 'string') {
          viewType = customAction
        }
        calendarApi.zoomTo(dateMarker, viewType)
      }
    }
    CalendarContent.prototype.buildAppendContent = function () {
      const props = this.props
      const children = props.pluginHooks.viewContainerAppends.map(
        function (buildAppendContent) {
          return buildAppendContent(props)
        }
      )
      return createElement.apply(
        void 0,
        __spreadArrays([Fragment, {}], children)
      )
    }
    CalendarContent.prototype.renderView = function (props) {
      const pluginHooks = props.pluginHooks
      const viewSpec = props.viewSpec
      const viewProps = {
        dateProfile: props.dateProfile,
        businessHours: props.businessHours,
        eventStore: props.renderableEventStore,
        eventUiBases: props.eventUiBases,
        dateSelection: props.dateSelection,
        eventSelection: props.eventSelection,
        eventDrag: props.eventDrag,
        eventResize: props.eventResize,
        isHeightAuto: props.isHeightAuto,
        forPrint: props.forPrint
      }
      const transformers = this.buildViewPropTransformers(
        pluginHooks.viewPropsTransformers
      )
      for (
        let _i = 0, transformers_1 = transformers;
        _i < transformers_1.length;
        _i++
      ) {
        const transformer = transformers_1[_i]
        __assign(viewProps, transformer.transform(viewProps, props))
      }
      const ViewComponent = viewSpec.component
      return createElement(ViewComponent, __assign({}, viewProps))
    }
    return CalendarContent
  })(PureComponent)

  function buildToolbarProps (
    viewSpec,
    dateProfile,
    dateProfileGenerator,
    currentDate,
    now,
    title
  ) {
    // don't force any date-profiles to valid date profiles (the `false`) so that we can tell if it's invalid
    const todayInfo = dateProfileGenerator.build(now, undefined, false) // TODO: need `undefined` or else INFINITE LOOP for some reason
    const prevInfo = dateProfileGenerator.buildPrev(
      dateProfile,
      currentDate,
      false
    )
    const nextInfo = dateProfileGenerator.buildNext(
      dateProfile,
      currentDate,
      false
    )
    return {
      title,
      activeButton: viewSpec.type,
      isTodayEnabled:
        todayInfo.isValid &&
        !rangeContainsMarker(dateProfile.currentRange, now),
      isPrevEnabled: prevInfo.isValid,
      isNextEnabled: nextInfo.isValid
    }
  }

  // Plugin
  // -----------------------------------------------------------------------------------------------------------------
  function buildViewPropTransformers (theClasses) {
    return theClasses.map(function (theClass) {
      return new theClass()
    })
  }

  const CalendarRoot = /** @class */ (function (_super) {
    __extends(CalendarRoot, _super)

    function CalendarRoot () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.state = {
        forPrint: false
      }
      _this.handleBeforePrint = function () {
        _this.setState({ forPrint: true })
      }
      _this.handleAfterPrint = function () {
        _this.setState({ forPrint: false })
      }
      return _this
    }

    CalendarRoot.prototype.render = function () {
      const props = this.props
      const options = props.options
      const forPrint = this.state.forPrint
      const isHeightAuto =
        forPrint ||
        options.height === 'auto' ||
        options.contentHeight === 'auto'
      const height =
        !isHeightAuto && options.height != null ? options.height : ''
      const classNames = [
        'fc',
        forPrint ? 'fc-media-print' : 'fc-media-screen',
        'fc-direction-' + options.direction,
        props.theme.getClass('root')
      ]
      if (!getCanVGrowWithinCell()) {
        classNames.push('fc-liquid-hack')
      }
      return props.children(classNames, height, isHeightAuto, forPrint)
    }
    CalendarRoot.prototype.componentDidMount = function () {
      const emitter = this.props.emitter
      emitter.on('_beforeprint', this.handleBeforePrint)
      emitter.on('_afterprint', this.handleAfterPrint)
    }
    CalendarRoot.prototype.componentWillUnmount = function () {
      const emitter = this.props.emitter
      emitter.off('_beforeprint', this.handleBeforePrint)
      emitter.off('_afterprint', this.handleAfterPrint)
    }
    return CalendarRoot
  })(BaseComponent)

  // Computes a default column header formatting string if `colFormat` is not explicitly defined
  function computeFallbackHeaderFormat (datesRepDistinctDays, dayCnt) {
    // if more than one week row, or if there are a lot of columns with not much space,
    // put just the day numbers will be in each cell
    if (!datesRepDistinctDays || dayCnt > 10) {
      return createFormatter({ weekday: 'short' }) // "Sat"
    } else if (dayCnt > 1) {
      return createFormatter({
        weekday: 'short',
        month: 'numeric',
        day: 'numeric',
        omitCommas: true
      }) // "Sat 11/12"
    } else {
      return createFormatter({ weekday: 'long' }) // "Saturday"
    }
  }

  const CLASS_NAME = 'fc-col-header-cell' // do the cushion too? no
  const TableDateCell = /** @class */ (function (_super) {
    __extends(TableDateCell, _super)

    function TableDateCell () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TableDateCell.prototype.render = function () {
      const _a = this.context
      const dateEnv = _a.dateEnv
      const options = _a.options
      const theme = _a.theme
      const viewApi = _a.viewApi
      const props = this.props
      const date = props.date
      const dateProfile = props.dateProfile
      const dayMeta = getDateMeta(date, props.todayRange, null, dateProfile)
      const classNames = [CLASS_NAME].concat(getDayClassNames(dayMeta, theme))
      const text = dateEnv.format(date, props.dayHeaderFormat)
      // if colCnt is 1, we are already in a day-view and don't need a navlink
      const navLinkAttrs =
        options.navLinks && !dayMeta.isDisabled && props.colCnt > 1
          ? { 'data-navlink': buildNavLinkData(date), tabIndex: 0 }
          : {}
      const hookProps = __assign(
        __assign(
          __assign(
            {
              date: dateEnv.toDate(date),
              view: viewApi
            },
            props.extraHookProps
          ),
          { text }
        ),
        dayMeta
      )
      return createElement(
        RenderHook,
        {
          hookProps,
          classNames: options.dayHeaderClassNames,
          content: options.dayHeaderContent,
          defaultContent: renderInner,
          didMount: options.dayHeaderDidMount,
          willUnmount: options.dayHeaderWillUnmount
        },
        function (rootElRef, customClassNames, innerElRef, innerContent) {
          return createElement(
            'th',
            __assign(
              {
                ref: rootElRef,
                className: classNames.concat(customClassNames).join(' '),
                'data-date': !dayMeta.isDisabled
                  ? formatDayString(date)
                  : undefined,
                colSpan: props.colSpan
              },
              props.extraDataAttrs
            ),
            createElement(
              'div',
              { className: 'fc-scrollgrid-sync-inner' },
              !dayMeta.isDisabled &&
                createElement(
                  'a',
                  __assign(
                    {
                      ref: innerElRef,
                      className: [
                        'fc-col-header-cell-cushion',
                        props.isSticky ? 'fc-sticky' : ''
                      ].join(' ')
                    },
                    navLinkAttrs
                  ),
                  innerContent
                )
            )
          )
        }
      )
    }
    return TableDateCell
  })(BaseComponent)
  const TableDowCell = /** @class */ (function (_super) {
    __extends(TableDowCell, _super)

    function TableDowCell () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TableDowCell.prototype.render = function () {
      const props = this.props
      const _a = this.context
      const dateEnv = _a.dateEnv
      const theme = _a.theme
      const viewApi = _a.viewApi
      const options = _a.options
      const date = addDays(new Date(259200000), props.dow) // start with Sun, 04 Jan 1970 00:00:00 GMT
      const dateMeta = {
        dow: props.dow,
        isDisabled: false,
        isFuture: false,
        isPast: false,
        isToday: false,
        isOther: false
      }
      const classNames = [CLASS_NAME].concat(
        getDayClassNames(dateMeta, theme),
        props.extraClassNames || []
      )
      const text = dateEnv.format(date, props.dayHeaderFormat)
      const hookProps = __assign(
        __assign(
          __assign(
            __assign(
              {
                // TODO: make this public?
                date
              },
              dateMeta
            ),
            { view: viewApi }
          ),
          props.extraHookProps
        ),
        { text }
      )
      return createElement(
        RenderHook,
        {
          hookProps,
          classNames: options.dayHeaderClassNames,
          content: options.dayHeaderContent,
          defaultContent: renderInner,
          didMount: options.dayHeaderDidMount,
          willUnmount: options.dayHeaderWillUnmount
        },
        function (rootElRef, customClassNames, innerElRef, innerContent) {
          return createElement(
            'th',
            __assign(
              {
                ref: rootElRef,
                className: classNames.concat(customClassNames).join(' '),
                colSpan: props.colSpan
              },
              props.extraDataAttrs
            ),
            createElement(
              'div',
              { className: 'fc-scrollgrid-sync-inner' },
              createElement(
                'a',
                {
                  className: [
                    'fc-col-header-cell-cushion',
                    props.isSticky ? 'fc-sticky' : ''
                  ].join(' '),
                  ref: innerElRef
                },
                innerContent
              )
            )
          )
        }
      )
    }
    return TableDowCell
  })(BaseComponent)

  function renderInner (hookProps) {
    return hookProps.text
  }

  const NowTimer = /** @class */ (function (_super) {
    __extends(NowTimer, _super)

    function NowTimer (props, context) {
      const _this = _super.call(this, props, context) || this
      _this.initialNowDate = getNow(context.options.now, context.dateEnv)
      _this.initialNowQueriedMs = new Date().valueOf()
      _this.state = _this.computeTiming().currentState
      return _this
    }

    NowTimer.prototype.render = function () {
      const _a = this
      const props = _a.props
      const state = _a.state
      return props.children(state.nowDate, state.todayRange)
    }
    NowTimer.prototype.componentDidMount = function () {
      this.setTimeout()
    }
    NowTimer.prototype.componentDidUpdate = function (prevProps) {
      if (prevProps.unit !== this.props.unit) {
        this.clearTimeout()
        this.setTimeout()
      }
    }
    NowTimer.prototype.componentWillUnmount = function () {
      this.clearTimeout()
    }
    NowTimer.prototype.computeTiming = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const unroundedNow = addMs(
        this.initialNowDate,
        new Date().valueOf() - this.initialNowQueriedMs
      )
      const currentUnitStart = context.dateEnv.startOf(unroundedNow, props.unit)
      const nextUnitStart = context.dateEnv.add(
        currentUnitStart,
        createDuration(1, props.unit)
      )
      const waitMs = nextUnitStart.valueOf() - unroundedNow.valueOf()
      return {
        currentState: {
          nowDate: currentUnitStart,
          todayRange: buildDayRange(currentUnitStart)
        },
        nextState: {
          nowDate: nextUnitStart,
          todayRange: buildDayRange(nextUnitStart)
        },
        waitMs
      }
    }
    NowTimer.prototype.setTimeout = function () {
      const _this = this
      const _a = this.computeTiming()
      const nextState = _a.nextState
      const waitMs = _a.waitMs
      this.timeoutId = setTimeout(function () {
        _this.setState(nextState, function () {
          _this.setTimeout()
        })
      }, waitMs)
    }
    NowTimer.prototype.clearTimeout = function () {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
    }
    NowTimer.contextType = ViewContextType
    return NowTimer
  })(Component)

  function buildDayRange (date) {
    const start = startOfDay(date)
    const end = addDays(start, 1)
    return { start, end }
  }

  const DayHeader = /** @class */ (function (_super) {
    __extends(DayHeader, _super)

    function DayHeader () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.createDayHeaderFormatter = memoize(createDayHeaderFormatter)
      return _this
    }

    DayHeader.prototype.render = function () {
      const context = this.context
      const _a = this.props
      const dates = _a.dates
      const dateProfile = _a.dateProfile
      const datesRepDistinctDays = _a.datesRepDistinctDays
      const renderIntro = _a.renderIntro
      const dayHeaderFormat = this.createDayHeaderFormatter(
        context.options.dayHeaderFormat,
        datesRepDistinctDays,
        dates.length
      )
      return createElement(
        NowTimer,
        { unit: 'day' },
        function (nowDate, todayRange) {
          return createElement(
            'tr',
            null,
            renderIntro && renderIntro(),
            dates.map(function (date) {
              return datesRepDistinctDays
                ? createElement(TableDateCell, {
                  key: date.toISOString(),
                  date,
                  dateProfile,
                  todayRange,
                  colCnt: dates.length,
                  dayHeaderFormat
                })
                : createElement(TableDowCell, {
                  key: date.getUTCDay(),
                  dow: date.getUTCDay(),
                  dayHeaderFormat
                })
            })
          )
        }
      )
    }
    return DayHeader
  })(BaseComponent)

  function createDayHeaderFormatter (
    explicitFormat,
    datesRepDistinctDays,
    dateCnt
  ) {
    return (
      explicitFormat ||
      computeFallbackHeaderFormat(datesRepDistinctDays, dateCnt)
    )
  }

  const DaySeriesModel = /** @class */ (function () {
    function DaySeriesModel (range, dateProfileGenerator) {
      let date = range.start
      const end = range.end
      const indices = []
      const dates = []
      let dayIndex = -1
      while (date < end) {
        // loop each day from start to end
        if (dateProfileGenerator.isHiddenDay(date)) {
          indices.push(dayIndex + 0.5) // mark that it's between indices
        } else {
          dayIndex++
          indices.push(dayIndex)
          dates.push(date)
        }
        date = addDays(date, 1)
      }
      this.dates = dates
      this.indices = indices
      this.cnt = dates.length
    }

    DaySeriesModel.prototype.sliceRange = function (range) {
      const firstIndex = this.getDateDayIndex(range.start) // inclusive first index
      const lastIndex = this.getDateDayIndex(addDays(range.end, -1)) // inclusive last index
      let clippedFirstIndex = Math.max(0, firstIndex)
      let clippedLastIndex = Math.min(this.cnt - 1, lastIndex)
      // deal with in-between indices
      clippedFirstIndex = Math.ceil(clippedFirstIndex) // in-between starts round to next cell
      clippedLastIndex = Math.floor(clippedLastIndex) // in-between ends round to prev cell
      if (clippedFirstIndex <= clippedLastIndex) {
        return {
          firstIndex: clippedFirstIndex,
          lastIndex: clippedLastIndex,
          isStart: firstIndex === clippedFirstIndex,
          isEnd: lastIndex === clippedLastIndex
        }
      } else {
        return null
      }
    }
    // Given a date, returns its chronolocial cell-index from the first cell of the grid.
    // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
    // If before the first offset, returns a negative number.
    // If after the last offset, returns an offset past the last cell offset.
    // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
    DaySeriesModel.prototype.getDateDayIndex = function (date) {
      const indices = this.indices
      const dayOffset = Math.floor(diffDays(this.dates[0], date))
      if (dayOffset < 0) {
        return indices[0] - 1
      } else if (dayOffset >= indices.length) {
        return indices[indices.length - 1] + 1
      } else {
        return indices[dayOffset]
      }
    }
    return DaySeriesModel
  })()

  const DayTableModel = /** @class */ (function () {
    function DayTableModel (daySeries, breakOnWeeks) {
      const dates = daySeries.dates
      let daysPerRow
      let firstDay
      let rowCnt
      if (breakOnWeeks) {
        // count columns until the day-of-week repeats
        firstDay = dates[0].getUTCDay()
        for (daysPerRow = 1; daysPerRow < dates.length; daysPerRow++) {
          if (dates[daysPerRow].getUTCDay() === firstDay) {
            break
          }
        }
        rowCnt = Math.ceil(dates.length / daysPerRow)
      } else {
        rowCnt = 1
        daysPerRow = dates.length
      }
      this.rowCnt = rowCnt
      this.colCnt = daysPerRow
      this.daySeries = daySeries
      this.cells = this.buildCells()
      this.headerDates = this.buildHeaderDates()
    }

    DayTableModel.prototype.buildCells = function () {
      const rows = []
      for (let row = 0; row < this.rowCnt; row++) {
        const cells = []
        for (let col = 0; col < this.colCnt; col++) {
          cells.push(this.buildCell(row, col))
        }
        rows.push(cells)
      }
      return rows
    }
    DayTableModel.prototype.buildCell = function (row, col) {
      const date = this.daySeries.dates[row * this.colCnt + col]
      return {
        key: date.toISOString(),
        date
      }
    }
    DayTableModel.prototype.buildHeaderDates = function () {
      const dates = []
      for (let col = 0; col < this.colCnt; col++) {
        dates.push(this.cells[0][col].date)
      }
      return dates
    }
    DayTableModel.prototype.sliceRange = function (range) {
      const colCnt = this.colCnt
      const seriesSeg = this.daySeries.sliceRange(range)
      const segs = []
      if (seriesSeg) {
        const firstIndex = seriesSeg.firstIndex
        const lastIndex = seriesSeg.lastIndex
        let index = firstIndex
        while (index <= lastIndex) {
          const row = Math.floor(index / colCnt)
          const nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1)
          segs.push({
            row,
            firstCol: index % colCnt,
            lastCol: (nextIndex - 1) % colCnt,
            isStart: seriesSeg.isStart && index === firstIndex,
            isEnd: seriesSeg.isEnd && nextIndex - 1 === lastIndex
          })
          index = nextIndex
        }
      }
      return segs
    }
    return DayTableModel
  })()

  const Slicer = /** @class */ (function () {
    function Slicer () {
      this.sliceBusinessHours = memoize(this._sliceBusinessHours)
      this.sliceDateSelection = memoize(this._sliceDateSpan)
      this.sliceEventStore = memoize(this._sliceEventStore)
      this.sliceEventDrag = memoize(this._sliceInteraction)
      this.sliceEventResize = memoize(this._sliceInteraction)
      this.forceDayIfListItem = false // hack
    }

    Slicer.prototype.sliceProps = function (
      props,
      dateProfile,
      nextDayThreshold,
      context
    ) {
      const extraArgs = []
      for (let _i = 4; _i < arguments.length; _i++) {
        extraArgs[_i - 4] = arguments[_i]
      }
      const eventUiBases = props.eventUiBases
      const eventSegs = this.sliceEventStore.apply(
        this,
        __spreadArrays(
          [props.eventStore, eventUiBases, dateProfile, nextDayThreshold],
          extraArgs
        )
      )
      return {
        dateSelectionSegs: this.sliceDateSelection.apply(
          this,
          __spreadArrays(
            [props.dateSelection, eventUiBases, context],
            extraArgs
          )
        ),
        businessHourSegs: this.sliceBusinessHours.apply(
          this,
          __spreadArrays(
            [props.businessHours, dateProfile, nextDayThreshold, context],
            extraArgs
          )
        ),
        fgEventSegs: eventSegs.fg,
        bgEventSegs: eventSegs.bg,
        eventDrag: this.sliceEventDrag.apply(
          this,
          __spreadArrays(
            [props.eventDrag, eventUiBases, dateProfile, nextDayThreshold],
            extraArgs
          )
        ),
        eventResize: this.sliceEventResize.apply(
          this,
          __spreadArrays(
            [props.eventResize, eventUiBases, dateProfile, nextDayThreshold],
            extraArgs
          )
        ),
        eventSelection: props.eventSelection
      } // TODO: give interactionSegs?
    }
    Slicer.prototype.sliceNowDate = function (
      // does not memoize
      date,
      context
    ) {
      const extraArgs = []
      for (let _i = 2; _i < arguments.length; _i++) {
        extraArgs[_i - 2] = arguments[_i]
      }
      return this._sliceDateSpan.apply(
        this,
        __spreadArrays(
          [
            {
              range: { start: date, end: addMs(date, 1) },
              allDay: false
            },
            {},
            context
          ],
          extraArgs
        )
      )
    }
    Slicer.prototype._sliceBusinessHours = function (
      businessHours,
      dateProfile,
      nextDayThreshold,
      context
    ) {
      const extraArgs = []
      for (let _i = 4; _i < arguments.length; _i++) {
        extraArgs[_i - 4] = arguments[_i]
      }
      if (!businessHours) {
        return []
      }
      return this._sliceEventStore.apply(
        this,
        __spreadArrays(
          [
            expandRecurring(
              businessHours,
              computeActiveRange(dateProfile, Boolean(nextDayThreshold)),
              context
            ),
            {},
            dateProfile,
            nextDayThreshold
          ],
          extraArgs
        )
      ).bg
    }
    Slicer.prototype._sliceEventStore = function (
      eventStore,
      eventUiBases,
      dateProfile,
      nextDayThreshold
    ) {
      const extraArgs = []
      for (let _i = 4; _i < arguments.length; _i++) {
        extraArgs[_i - 4] = arguments[_i]
      }
      if (eventStore) {
        const rangeRes = sliceEventStore(
          eventStore,
          eventUiBases,
          computeActiveRange(dateProfile, Boolean(nextDayThreshold)),
          nextDayThreshold
        )
        return {
          bg: this.sliceEventRanges(rangeRes.bg, extraArgs),
          fg: this.sliceEventRanges(rangeRes.fg, extraArgs)
        }
      } else {
        return { bg: [], fg: [] }
      }
    }
    Slicer.prototype._sliceInteraction = function (
      interaction,
      eventUiBases,
      dateProfile,
      nextDayThreshold
    ) {
      const extraArgs = []
      for (let _i = 4; _i < arguments.length; _i++) {
        extraArgs[_i - 4] = arguments[_i]
      }
      if (!interaction) {
        return null
      }
      const rangeRes = sliceEventStore(
        interaction.mutatedEvents,
        eventUiBases,
        computeActiveRange(dateProfile, Boolean(nextDayThreshold)),
        nextDayThreshold
      )
      return {
        segs: this.sliceEventRanges(rangeRes.fg, extraArgs),
        affectedInstances: interaction.affectedEvents.instances,
        isEvent: interaction.isEvent
      }
    }
    Slicer.prototype._sliceDateSpan = function (
      dateSpan,
      eventUiBases,
      context
    ) {
      const extraArgs = []
      for (let _i = 3; _i < arguments.length; _i++) {
        extraArgs[_i - 3] = arguments[_i]
      }
      if (!dateSpan) {
        return []
      }
      const eventRange = fabricateEventRange(dateSpan, eventUiBases, context)
      const segs = this.sliceRange.apply(
        this,
        __spreadArrays([dateSpan.range], extraArgs)
      )
      for (let _a = 0, segs_1 = segs; _a < segs_1.length; _a++) {
        const seg = segs_1[_a]
        seg.eventRange = eventRange
      }
      return segs
    }
    /*
        "complete" seg means it has component and eventRange
        */
    Slicer.prototype.sliceEventRanges = function (eventRanges, extraArgs) {
      const segs = []
      for (
        let _i = 0, eventRanges_1 = eventRanges;
        _i < eventRanges_1.length;
        _i++
      ) {
        const eventRange = eventRanges_1[_i]
        segs.push.apply(segs, this.sliceEventRange(eventRange, extraArgs))
      }
      return segs
    }
    /*
        "complete" seg means it has component and eventRange
        */
    Slicer.prototype.sliceEventRange = function (eventRange, extraArgs) {
      let dateRange = eventRange.range
      // hack to make multi-day events that are being force-displayed as list-items to take up only one day
      if (this.forceDayIfListItem && eventRange.ui.display === 'list-item') {
        dateRange = {
          start: dateRange.start,
          end: addDays(dateRange.start, 1)
        }
      }
      const segs = this.sliceRange.apply(
        this,
        __spreadArrays([dateRange], extraArgs)
      )
      for (let _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
        const seg = segs_2[_i]
        seg.eventRange = eventRange
        seg.isStart = eventRange.isStart && seg.isStart
        seg.isEnd = eventRange.isEnd && seg.isEnd
      }
      return segs
    }
    return Slicer
  })()

  /*
    for incorporating slotMinTime/slotMaxTime if appropriate
    TODO: should be part of DateProfile!
    TimelineDateProfile already does this btw
    */
  function computeActiveRange (dateProfile, isComponentAllDay) {
    const range = dateProfile.activeRange
    if (isComponentAllDay) {
      return range
    }
    return {
      start: addMs(range.start, dateProfile.slotMinTime.milliseconds),
      end: addMs(range.end, dateProfile.slotMaxTime.milliseconds - 864e5) // 864e5 = ms in a day
    }
  }

  const VISIBLE_HIDDEN_RE = /^(visible|hidden)$/
  const Scroller = /** @class */ (function (_super) {
    __extends(Scroller, _super)

    function Scroller () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.handleEl = function (el) {
        _this.el = el
        setRef(_this.props.elRef, el)
      }
      return _this
    }

    Scroller.prototype.render = function () {
      const props = this.props
      const liquid = props.liquid
      const liquidIsAbsolute = props.liquidIsAbsolute
      const isAbsolute = liquid && liquidIsAbsolute
      const className = ['fc-scroller']
      if (liquid) {
        if (liquidIsAbsolute) {
          className.push('fc-scroller-liquid-absolute')
        } else {
          className.push('fc-scroller-liquid')
        }
      }
      return createElement(
        'div',
        {
          ref: this.handleEl,
          className: className.join(' '),
          style: {
            overflowX: props.overflowX,
            overflowY: props.overflowY,
            left: (isAbsolute && -(props.overcomeLeft || 0)) || '',
            right: (isAbsolute && -(props.overcomeRight || 0)) || '',
            bottom: (isAbsolute && -(props.overcomeBottom || 0)) || '',
            marginLeft: (!isAbsolute && -(props.overcomeLeft || 0)) || '',
            marginRight: (!isAbsolute && -(props.overcomeRight || 0)) || '',
            marginBottom: (!isAbsolute && -(props.overcomeBottom || 0)) || '',
            maxHeight: props.maxHeight || ''
          }
        },
        props.children
      )
    }
    Scroller.prototype.needsXScrolling = function () {
      if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
        return false
      }
      // testing scrollWidth>clientWidth is unreliable cross-browser when pixel heights aren't integers.
      // much more reliable to see if children are taller than the scroller, even tho doesn't account for
      // inner-child margins and absolute positioning
      const el = this.el
      const realClientWidth =
        this.el.getBoundingClientRect().width - this.getYScrollbarWidth()
      const children = el.children
      for (let i = 0; i < children.length; i++) {
        const childEl = children[i]
        if (childEl.getBoundingClientRect().width > realClientWidth) {
          return true
        }
      }
      return false
    }
    Scroller.prototype.needsYScrolling = function () {
      if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
        return false
      }
      // testing scrollHeight>clientHeight is unreliable cross-browser when pixel heights aren't integers.
      // much more reliable to see if children are taller than the scroller, even tho doesn't account for
      // inner-child margins and absolute positioning
      const el = this.el
      const realClientHeight =
        this.el.getBoundingClientRect().height - this.getXScrollbarWidth()
      const children = el.children
      for (let i = 0; i < children.length; i++) {
        const childEl = children[i]
        if (childEl.getBoundingClientRect().height > realClientHeight) {
          return true
        }
      }
      return false
    }
    Scroller.prototype.getXScrollbarWidth = function () {
      if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
        return 0
      } else {
        return this.el.offsetHeight - this.el.clientHeight // only works because we guarantee no borders. TODO: add to CSS with important?
      }
    }
    Scroller.prototype.getYScrollbarWidth = function () {
      if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
        return 0
      } else {
        return this.el.offsetWidth - this.el.clientWidth // only works because we guarantee no borders. TODO: add to CSS with important?
      }
    }
    return Scroller
  })(BaseComponent)

  /*
    TODO: somehow infer OtherArgs from masterCallback?
    TODO: infer RefType from masterCallback if provided
    */
  const RefMap = /** @class */ (function () {
    function RefMap (masterCallback) {
      const _this = this
      this.masterCallback = masterCallback
      this.currentMap = {}
      this.depths = {}
      this.callbackMap = {}
      this.handleValue = function (val, key) {
        const _a = _this
        const depths = _a.depths
        const currentMap = _a.currentMap
        let removed = false
        let added = false
        if (val !== null) {
          removed = key in currentMap // for bug... ACTUALLY: can probably do away with this now that callers don't share numeric indices anymore
          currentMap[key] = val
          depths[key] = (depths[key] || 0) + 1
          added = true
        } else if (--depths[key] === 0) {
          delete currentMap[key]
          delete _this.callbackMap[key]
          removed = true
        }
        if (_this.masterCallback) {
          if (removed) {
            _this.masterCallback(null, String(key))
          }
          if (added) {
            _this.masterCallback(val, String(key))
          }
        }
      }
    }

    RefMap.prototype.createRef = function (key) {
      const _this = this
      let refCallback = this.callbackMap[key]
      if (!refCallback) {
        refCallback = this.callbackMap[key] = function (val) {
          _this.handleValue(val, String(key))
        }
      }
      return refCallback
    }
    // TODO: check callers that don't care about order. should use getAll instead
    // NOTE: this method has become less valuable now that we are encouraged to map order by some other index
    // TODO: provide ONE array-export function, buildArray, which fails on non-numeric indexes. caller can manipulate and "collect"
    RefMap.prototype.collect = function (startIndex, endIndex, step) {
      return collectFromHash(this.currentMap, startIndex, endIndex, step)
    }
    RefMap.prototype.getAll = function () {
      return hashValuesToArray(this.currentMap)
    }
    return RefMap
  })()

  function computeShrinkWidth (chunkEls) {
    const shrinkCells = findElements(chunkEls, '.fc-scrollgrid-shrink')
    let largestWidth = 0
    for (
      let _i = 0, shrinkCells_1 = shrinkCells;
      _i < shrinkCells_1.length;
      _i++
    ) {
      const shrinkCell = shrinkCells_1[_i]
      largestWidth = Math.max(
        largestWidth,
        computeSmallestCellWidth(shrinkCell)
      )
    }
    return Math.ceil(largestWidth) // <table> elements work best with integers. round up to ensure contents fits
  }

  function getSectionHasLiquidHeight (props, sectionConfig) {
    return props.liquid && sectionConfig.liquid // does the section do liquid-height? (need to have whole scrollgrid liquid-height as well)
  }

  function getAllowYScrolling (props, sectionConfig) {
    return (
      sectionConfig.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
      getSectionHasLiquidHeight(props, sectionConfig)
    ) // if the section is liquid height, it might condense enough to require scrollbars
  }

  // TODO: ONLY use `arg`. force out internal function to use same API
  function renderChunkContent (sectionConfig, chunkConfig, arg) {
    const expandRows = arg.expandRows
    const content =
      typeof chunkConfig.content === 'function'
        ? chunkConfig.content(arg)
        : createElement(
          'table',
          {
            className: [
              chunkConfig.tableClassName,
              sectionConfig.syncRowHeights ? 'fc-scrollgrid-sync-table' : ''
            ].join(' '),
            style: {
              minWidth: arg.tableMinWidth,
              width: arg.clientWidth,
              height: expandRows ? arg.clientHeight : '' // css `height` on a <table> serves as a min-height
            }
          },
          arg.tableColGroupNode,
          createElement(
            'tbody',
            {},
            typeof chunkConfig.rowContent === 'function'
              ? chunkConfig.rowContent(arg)
              : chunkConfig.rowContent
          )
        )
    return content
  }

  function isColPropsEqual (cols0, cols1) {
    return isArraysEqual(cols0, cols1, isPropsEqual)
  }

  function renderMicroColGroup (cols, shrinkWidth) {
    const colNodes = []
    /*
        for ColProps with spans, it would have been great to make a single <col span="">
        HOWEVER, Chrome was getting messing up distributing the width to <td>/<th> elements with colspans.
        SOLUTION: making individual <col> elements makes Chrome behave.
        */
    for (let _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
      const colProps = cols_1[_i]
      const span = colProps.span || 1
      for (let i = 0; i < span; i++) {
        colNodes.push(
          createElement('col', {
            style: {
              width:
                colProps.width === 'shrink'
                  ? sanitizeShrinkWidth(shrinkWidth)
                  : colProps.width || '',
              minWidth: colProps.minWidth || ''
            }
          })
        )
      }
    }
    return createElement.apply(
      void 0,
      __spreadArrays(['colgroup', {}], colNodes)
    )
  }

  function sanitizeShrinkWidth (shrinkWidth) {
    /* why 4? if we do 0, it will kill any border, which are needed for computeSmallestCellWidth
        4 accounts for 2 2-pixel borders. TODO: better solution? */
    return shrinkWidth == null ? 4 : shrinkWidth
  }

  function hasShrinkWidth (cols) {
    for (let _i = 0, cols_2 = cols; _i < cols_2.length; _i++) {
      const col = cols_2[_i]
      if (col.width === 'shrink') {
        return true
      }
    }
    return false
  }

  function getScrollGridClassNames (liquid, context) {
    const classNames = ['fc-scrollgrid', context.theme.getClass('table')]
    if (liquid) {
      classNames.push('fc-scrollgrid-liquid')
    }
    return classNames
  }

  function getSectionClassNames (sectionConfig, wholeTableVGrow) {
    const classNames = [
      'fc-scrollgrid-section',
      'fc-scrollgrid-section-' + sectionConfig.type,
      sectionConfig.className // used?
    ]
    if (
      wholeTableVGrow &&
      sectionConfig.liquid &&
      sectionConfig.maxHeight == null
    ) {
      classNames.push('fc-scrollgrid-section-liquid')
    }
    if (sectionConfig.isSticky) {
      classNames.push('fc-scrollgrid-section-sticky')
    }
    return classNames
  }

  function renderScrollShim (arg) {
    return createElement('div', {
      className: 'fc-scrollgrid-sticky-shim',
      style: {
        width: arg.clientWidth,
        minWidth: arg.tableMinWidth
      }
    })
  }

  function getStickyHeaderDates (options) {
    let stickyHeaderDates = options.stickyHeaderDates
    if (stickyHeaderDates == null || stickyHeaderDates === 'auto') {
      stickyHeaderDates =
        options.height === 'auto' || options.viewHeight === 'auto'
    }
    return stickyHeaderDates
  }

  function getStickyFooterScrollbar (options) {
    let stickyFooterScrollbar = options.stickyFooterScrollbar
    if (stickyFooterScrollbar == null || stickyFooterScrollbar === 'auto') {
      stickyFooterScrollbar =
        options.height === 'auto' || options.viewHeight === 'auto'
    }
    return stickyFooterScrollbar
  }

  const SimpleScrollGrid = /** @class */ (function (_super) {
    __extends(SimpleScrollGrid, _super)

    function SimpleScrollGrid () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.processCols = memoize(function (a) {
        return a
      }, isColPropsEqual) // so we get same `cols` props every time
      _this.renderMicroColGroup = memoize(renderMicroColGroup) // yucky to memoize VNodes, but much more efficient for consumers
      _this.scrollerRefs = new RefMap()
      _this.scrollerElRefs = new RefMap(_this._handleScrollerEl.bind(_this))
      _this.state = {
        shrinkWidth: null,
        forceYScrollbars: false,
        scrollerClientWidths: {},
        scrollerClientHeights: {}
      }
      // TODO: can do a really simple print-view. dont need to join rows
      _this.handleSizing = function () {
        _this.setState(
          __assign(
            { shrinkWidth: _this.computeShrinkWidth() },
            _this.computeScrollerDims()
          )
        )
      }
      return _this
    }

    SimpleScrollGrid.prototype.render = function () {
      const _a = this
      const props = _a.props
      const state = _a.state
      const context = _a.context
      const sectionConfigs = props.sections || []
      const cols = this.processCols(props.cols)
      const microColGroupNode = this.renderMicroColGroup(cols, state.shrinkWidth)
      const classNames = getScrollGridClassNames(props.liquid, context)
      // TODO: make DRY
      const configCnt = sectionConfigs.length
      let configI = 0
      let currentConfig
      const headSectionNodes = []
      const bodySectionNodes = []
      const footSectionNodes = []
      while (
        configI < configCnt &&
        (currentConfig = sectionConfigs[configI]).type === 'header'
      ) {
        headSectionNodes.push(
          this.renderSection(currentConfig, configI, microColGroupNode)
        )
        configI++
      }
      while (
        configI < configCnt &&
        (currentConfig = sectionConfigs[configI]).type === 'body'
      ) {
        bodySectionNodes.push(
          this.renderSection(currentConfig, configI, microColGroupNode)
        )
        configI++
      }
      while (
        configI < configCnt &&
        (currentConfig = sectionConfigs[configI]).type === 'footer'
      ) {
        footSectionNodes.push(
          this.renderSection(currentConfig, configI, microColGroupNode)
        )
        configI++
      }
      // firefox bug: when setting height on table and there is a thead or tfoot,
      // the necessary height:100% on the liquid-height body section forces the *whole* table to be taller. (bug #5524)
      // use getCanVGrowWithinCell as a way to detect table-stupid firefox.
      // if so, use a simpler dom structure, jam everything into a lone tbody.
      const isBuggy = !getCanVGrowWithinCell()
      return createElement(
        'table',
        {
          className: classNames.join(' '),
          style: { height: props.height }
        },
        Boolean(!isBuggy && headSectionNodes.length) &&
          createElement.apply(
            void 0,
            __spreadArrays(['thead', {}], headSectionNodes)
          ),
        Boolean(!isBuggy && bodySectionNodes.length) &&
          createElement.apply(
            void 0,
            __spreadArrays(['tbody', {}], bodySectionNodes)
          ),
        Boolean(!isBuggy && footSectionNodes.length) &&
          createElement.apply(
            void 0,
            __spreadArrays(['tfoot', {}], footSectionNodes)
          ),
        isBuggy &&
          createElement.apply(
            void 0,
            __spreadArrays(
              ['tbody', {}],
              headSectionNodes,
              bodySectionNodes,
              footSectionNodes
            )
          )
      )
    }
    SimpleScrollGrid.prototype.renderSection = function (
      sectionConfig,
      sectionI,
      microColGroupNode
    ) {
      if ('outerContent' in sectionConfig) {
        return createElement(
          Fragment,
          { key: sectionConfig.key },
          sectionConfig.outerContent
        )
      }
      return createElement(
        'tr',
        {
          key: sectionConfig.key,
          className: getSectionClassNames(
            sectionConfig,
            this.props.liquid
          ).join(' ')
        },
        this.renderChunkTd(
          sectionConfig,
          sectionI,
          microColGroupNode,
          sectionConfig.chunk
        )
      )
    }
    SimpleScrollGrid.prototype.renderChunkTd = function (
      sectionConfig,
      sectionI,
      microColGroupNode,
      chunkConfig
    ) {
      if ('outerContent' in chunkConfig) {
        return chunkConfig.outerContent
      }
      const props = this.props
      const _a = this.state
      const forceYScrollbars = _a.forceYScrollbars
      const scrollerClientWidths = _a.scrollerClientWidths
      const scrollerClientHeights = _a.scrollerClientHeights
      const needsYScrolling = getAllowYScrolling(props, sectionConfig) // TODO: do lazily. do in section config?
      const isLiquid = getSectionHasLiquidHeight(props, sectionConfig)
      // for `!props.liquid` - is WHOLE scrollgrid natural height?
      // TODO: do same thing in advanced scrollgrid? prolly not b/c always has horizontal scrollbars
      const overflowY = !props.liquid
        ? 'visible'
        : forceYScrollbars
          ? 'scroll'
          : !needsYScrolling
              ? 'hidden'
              : 'auto'
      const content = renderChunkContent(sectionConfig, chunkConfig, {
        tableColGroupNode: microColGroupNode,
        tableMinWidth: '',
        clientWidth:
          scrollerClientWidths[sectionI] !== undefined
            ? scrollerClientWidths[sectionI]
            : null,
        clientHeight:
          scrollerClientHeights[sectionI] !== undefined
            ? scrollerClientHeights[sectionI]
            : null,
        expandRows: sectionConfig.expandRows,
        syncRowHeights: false,
        rowSyncHeights: [],
        reportRowHeightChange: function () {}
      })
      return createElement(
        'td',
        { ref: chunkConfig.elRef },
        createElement(
          'div',
          {
            className:
              'fc-scroller-harness' +
              (isLiquid ? ' fc-scroller-harness-liquid' : '')
          },
          createElement(
            Scroller,
            {
              ref: this.scrollerRefs.createRef(sectionI),
              elRef: this.scrollerElRefs.createRef(sectionI),
              overflowY,
              overflowX: !props.liquid
                ? 'visible'
                : 'hidden' /* natural height? */,
              maxHeight: sectionConfig.maxHeight,
              liquid: isLiquid,
              liquidIsAbsolute: true /* because its within a harness */
            },
            content
          )
        )
      )
    }
    SimpleScrollGrid.prototype._handleScrollerEl = function (scrollerEl, key) {
      const sectionI = parseInt(key, 10)
      const chunkConfig = this.props.sections[sectionI].chunk
      setRef(chunkConfig.scrollerElRef, scrollerEl)
    }
    SimpleScrollGrid.prototype.componentDidMount = function () {
      this.handleSizing()
      this.context.addResizeHandler(this.handleSizing)
    }
    SimpleScrollGrid.prototype.componentDidUpdate = function () {
      // TODO: need better solution when state contains non-sizing things
      this.handleSizing()
    }
    SimpleScrollGrid.prototype.componentWillUnmount = function () {
      this.context.removeResizeHandler(this.handleSizing)
    }
    SimpleScrollGrid.prototype.computeShrinkWidth = function () {
      return hasShrinkWidth(this.props.cols)
        ? computeShrinkWidth(this.scrollerElRefs.getAll())
        : 0
    }
    SimpleScrollGrid.prototype.computeScrollerDims = function () {
      const scrollbarWidth = getScrollbarWidths()
      const sectionCnt = this.props.sections.length
      const _a = this
      const scrollerRefs = _a.scrollerRefs
      const scrollerElRefs = _a.scrollerElRefs
      let forceYScrollbars = false
      const scrollerClientWidths = {}
      const scrollerClientHeights = {}
      for (var sectionI = 0; sectionI < sectionCnt; sectionI++) {
        // along edge
        const scroller = scrollerRefs.currentMap[sectionI]
        if (scroller && scroller.needsYScrolling()) {
          forceYScrollbars = true
          break
        }
      }
      for (var sectionI = 0; sectionI < sectionCnt; sectionI++) {
        // along edge
        const scrollerEl = scrollerElRefs.currentMap[sectionI]
        if (scrollerEl) {
          const harnessEl = scrollerEl.parentNode // TODO: weird way to get this. need harness b/c doesn't include table borders
          scrollerClientWidths[sectionI] = Math.floor(
            harnessEl.getBoundingClientRect().width -
              (forceYScrollbars
                ? scrollbarWidth.y // use global because scroller might not have scrollbars yet but will need them in future
                : 0)
          )
          scrollerClientHeights[sectionI] = Math.floor(
            harnessEl.getBoundingClientRect().height // never has horizontal scrollbars
          )
        }
      }
      return {
        forceYScrollbars,
        scrollerClientWidths,
        scrollerClientHeights
      }
    }
    return SimpleScrollGrid
  })(BaseComponent)
  SimpleScrollGrid.addStateEquality({
    scrollerClientWidths: isPropsEqual,
    scrollerClientHeights: isPropsEqual
  })

  const EventRoot = /** @class */ (function (_super) {
    __extends(EventRoot, _super)

    function EventRoot () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.elRef = createRef()
      return _this
    }

    EventRoot.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const options = context.options
      const seg = props.seg
      const eventRange = seg.eventRange
      const ui = eventRange.ui
      const hookProps = {
        event: new EventApi(context, eventRange.def, eventRange.instance),
        view: context.viewApi,
        timeText: props.timeText,
        textColor: ui.textColor,
        backgroundColor: ui.backgroundColor,
        borderColor: ui.borderColor,
        isDraggable:
          !props.disableDragging && computeSegDraggable(seg, context),
        isStartResizable:
          !props.disableResizing && computeSegStartResizable(seg, context),
        isEndResizable: !props.disableResizing && computeSegEndResizable(seg),
        isMirror: Boolean(
          props.isDragging || props.isResizing || props.isDateSelecting
        ),
        isStart: Boolean(seg.isStart),
        isEnd: Boolean(seg.isEnd),
        isPast: Boolean(props.isPast),
        isFuture: Boolean(props.isFuture),
        isToday: Boolean(props.isToday),
        isSelected: Boolean(props.isSelected),
        isDragging: Boolean(props.isDragging),
        isResizing: Boolean(props.isResizing)
      }
      const standardClassNames = getEventClassNames(hookProps).concat(
        ui.classNames
      )
      return createElement(
        RenderHook,
        {
          hookProps,
          classNames: options.eventClassNames,
          content: options.eventContent,
          defaultContent: props.defaultContent,
          didMount: options.eventDidMount,
          willUnmount: options.eventWillUnmount,
          elRef: this.elRef
        },
        function (rootElRef, customClassNames, innerElRef, innerContent) {
          return props.children(
            rootElRef,
            standardClassNames.concat(customClassNames),
            innerElRef,
            innerContent,
            hookProps
          )
        }
      )
    }
    EventRoot.prototype.componentDidMount = function () {
      setElSeg(this.elRef.current, this.props.seg)
    }
    /*
        need to re-assign seg to the element if seg changes, even if the element is the same
        */
    EventRoot.prototype.componentDidUpdate = function (prevProps) {
      const seg = this.props.seg
      if (seg !== prevProps.seg) {
        setElSeg(this.elRef.current, seg)
      }
    }
    return EventRoot
  })(BaseComponent)

  // should not be a purecomponent
  const StandardEvent = /** @class */ (function (_super) {
    __extends(StandardEvent, _super)

    function StandardEvent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    StandardEvent.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const seg = props.seg
      const timeFormat =
        context.options.eventTimeFormat || props.defaultTimeFormat
      const timeText = buildSegTimeText(
        seg,
        timeFormat,
        context,
        props.defaultDisplayEventTime,
        props.defaultDisplayEventEnd
      )
      return createElement(
        EventRoot,
        {
          seg,
          timeText,
          disableDragging: props.disableDragging,
          disableResizing: props.disableResizing,
          defaultContent: props.defaultContent || renderInnerContent,
          isDragging: props.isDragging,
          isResizing: props.isResizing,
          isDateSelecting: props.isDateSelecting,
          isSelected: props.isSelected,
          isPast: props.isPast,
          isFuture: props.isFuture,
          isToday: props.isToday
        },
        function (rootElRef, classNames, innerElRef, innerContent, hookProps) {
          return createElement(
            'a',
            __assign(
              {
                className: props.extraClassNames.concat(classNames).join(' '),
                style: {
                  borderColor: hookProps.borderColor,
                  backgroundColor: hookProps.backgroundColor
                },
                ref: rootElRef
              },
              getSegAnchorAttrs(seg)
            ),
            createElement(
              'div',
              {
                className: 'fc-event-main',
                ref: innerElRef,
                style: { color: hookProps.textColor }
              },
              innerContent
            ),
            hookProps.isStartResizable &&
              createElement('div', {
                className: 'fc-event-resizer fc-event-resizer-start'
              }),
            hookProps.isEndResizable &&
              createElement('div', {
                className: 'fc-event-resizer fc-event-resizer-end'
              })
          )
        }
      )
    }
    return StandardEvent
  })(BaseComponent)

  function renderInnerContent (innerProps) {
    return createElement(
      'div',
      { className: 'fc-event-main-frame' },
      innerProps.timeText &&
        createElement(
          'div',
          { className: 'fc-event-time' },
          innerProps.timeText
        ),
      createElement(
        'div',
        { className: 'fc-event-title-container' },
        createElement(
          'div',
          { className: 'fc-event-title fc-sticky' },
          innerProps.event.title || createElement(Fragment, null, '\u00A0')
        )
      )
    )
  }

  function getSegAnchorAttrs (seg) {
    const url = seg.eventRange.def.url
    return url ? { href: url } : {}
  }

  const NowIndicatorRoot = function (props) {
    return createElement(ViewContextType.Consumer, null, function (context) {
      const options = context.options
      const hookProps = {
        isAxis: props.isAxis,
        date: context.dateEnv.toDate(props.date),
        view: context.viewApi
      }
      return createElement(
        RenderHook,
        {
          hookProps,
          classNames: options.nowIndicatorClassNames,
          content: options.nowIndicatorContent,
          didMount: options.nowIndicatorDidMount,
          willUnmount: options.nowIndicatorWillUnmount
        },
        props.children
      )
    })
  }

  const DAY_NUM_FORMAT = createFormatter({ day: 'numeric' })
  const DayCellRoot = /** @class */ (function (_super) {
    __extends(DayCellRoot, _super)

    function DayCellRoot () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.refineHookProps = memoizeObjArg(refineHookProps)
      _this.normalizeClassNames = buildClassNameNormalizer()
      return _this
    }

    DayCellRoot.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const options = context.options
      const hookProps = this.refineHookProps({
        date: props.date,
        dateProfile: props.dateProfile,
        todayRange: props.todayRange,
        showDayNumber: props.showDayNumber,
        extraProps: props.extraHookProps,
        viewApi: context.viewApi,
        dateEnv: context.dateEnv
      })
      const classNames = getDayClassNames(hookProps, context.theme).concat(
        hookProps.isDisabled
          ? [] // don't use custom classNames if disabled
          : this.normalizeClassNames(options.dayCellClassNames, hookProps)
      )
      const dataAttrs = hookProps.isDisabled
        ? {}
        : {
            'data-date': formatDayString(props.date)
          }
      return createElement(
        MountHook,
        {
          hookProps,
          didMount: options.dayCellDidMount,
          willUnmount: options.dayCellWillUnmount,
          elRef: props.elRef
        },
        function (rootElRef) {
          return props.children(
            rootElRef,
            classNames,
            dataAttrs,
            hookProps.isDisabled
          )
        }
      )
    }
    return DayCellRoot
  })(BaseComponent)
  const DayCellContent = /** @class */ (function (_super) {
    __extends(DayCellContent, _super)

    function DayCellContent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    DayCellContent.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const options = context.options
      const hookProps = refineHookProps({
        date: props.date,
        dateProfile: props.dateProfile,
        todayRange: props.todayRange,
        showDayNumber: props.showDayNumber,
        extraProps: props.extraHookProps,
        viewApi: context.viewApi,
        dateEnv: context.dateEnv
      })
      return createElement(
        ContentHook,
        {
          hookProps,
          content: options.dayCellContent,
          defaultContent: props.defaultContent
        },
        props.children
      )
    }
    return DayCellContent
  })(BaseComponent)

  function refineHookProps (raw) {
    const date = raw.date
    const dateEnv = raw.dateEnv
    const dayMeta = getDateMeta(date, raw.todayRange, null, raw.dateProfile)
    return __assign(
      __assign(
        __assign(
          {
            date: dateEnv.toDate(date),
            view: raw.viewApi
          },
          dayMeta
        ),
        {
          dayNumberText: raw.showDayNumber
            ? dateEnv.format(date, DAY_NUM_FORMAT)
            : ''
        }
      ),
      raw.extraProps
    )
  }

  function renderFill (fillType) {
    return createElement('div', { className: 'fc-' + fillType })
  }

  const BgEvent = function (props) {
    return createElement(
      EventRoot,
      {
        defaultContent: renderInnerContent$1,
        seg: props.seg /* uselesss i think */,
        timeText: '' /* weird */,
        disableDragging: true,
        disableResizing: true,
        isDragging: false,
        isResizing: false,
        isDateSelecting: false,
        isSelected: false,
        isPast: props.isPast,
        isFuture: props.isFuture,
        isToday: props.isToday
      },
      function (rootElRef, classNames, innerElRef, innerContent, hookProps) {
        return createElement(
          'div',
          {
            ref: rootElRef,
            className: ['fc-bg-event'].concat(classNames).join(' '),
            style: {
              backgroundColor: hookProps.backgroundColor
            }
          },
          innerContent
        )
      }
    )
  }

  function renderInnerContent$1 (props) {
    const title = props.event.title
    return (
      title &&
      createElement('div', { className: 'fc-event-title' }, props.event.title)
    )
  }

  const WeekNumberRoot = function (props) {
    return createElement(ViewContextType.Consumer, null, function (context) {
      const dateEnv = context.dateEnv
      const options = context.options
      const date = props.date
      const format = options.weekNumberFormat || props.defaultFormat
      const num = dateEnv.computeWeekNumber(date) // TODO: somehow use for formatting as well?
      const text = dateEnv.format(date, format)
      const hookProps = { num, text, date }
      return createElement(
        RenderHook,
        {
          hookProps,
          classNames: options.weekNumberClassNames,
          content: options.weekNumberContent,
          defaultContent: renderInner$1,
          didMount: options.weekNumberDidMount,
          willUnmount: options.weekNumberWillUnmount
        },
        props.children
      )
    })
  }

  function renderInner$1 (innerProps) {
    return innerProps.text
  }

  // exports
  // --------------------------------------------------------------------------------------------------
  const version = '5.3.2' // important to type it, so .d.ts has generic string

  const Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super)

    function Calendar (el, optionOverrides) {
      if (optionOverrides === void 0) {
        optionOverrides = {}
      }
      const _this = _super.call(this) || this
      _this.isRendering = false
      _this.isRendered = false
      _this.currentClassNames = []
      _this.customContentRenderId = 0 // will affect custom generated classNames?
      _this.handleAction = function (action) {
        // actions we know we want to render immediately
        switch (action.type) {
          case 'SET_EVENT_DRAG':
          case 'SET_EVENT_RESIZE':
            _this.renderRunner.tryDrain()
        }
      }
      _this.handleData = function (data) {
        _this.currentData = data
        _this.renderRunner.request(data.calendarOptions.rerenderDelay)
      }
      _this.handleRenderRequest = function () {
        if (_this.isRendering) {
          _this.isRendered = true
          const currentData_1 = _this.currentData
          render(
            createElement(
              CalendarRoot,
              {
                options: currentData_1.calendarOptions,
                theme: currentData_1.theme,
                emitter: currentData_1.emitter
              },
              function (classNames, height, isHeightAuto, forPrint) {
                _this.setClassNames(classNames)
                _this.setHeight(height)
                return createElement(
                  CustomContentRenderContext.Provider,
                  { value: _this.customContentRenderId },
                  createElement(
                    CalendarContent,
                    __assign(
                      {
                        isHeightAuto,
                        forPrint
                      },
                      currentData_1
                    )
                  )
                )
              }
            ),
            _this.el
          )
        } else if (_this.isRendered) {
          _this.isRendered = false
          render(null, _this.el)
          _this.setClassNames([])
          _this.setHeight('')
        }
        flushToDom$1()
      }
      _this.el = el
      _this.renderRunner = new DelayedRunner(_this.handleRenderRequest)
      new CalendarDataManager({
        optionOverrides,
        calendarApi: _this,
        onAction: _this.handleAction,
        onData: _this.handleData
      })
      return _this
    }

    Object.defineProperty(Calendar.prototype, 'view', {
      get: function () {
        return this.currentData.viewApi
      }, // for public API
      enumerable: false,
      configurable: true
    })
    Calendar.prototype.render = function () {
      const wasRendering = this.isRendering
      if (!wasRendering) {
        this.isRendering = true
      } else {
        this.customContentRenderId++
      }
      this.renderRunner.request()
      if (wasRendering) {
        this.updateSize()
      }
    }
    Calendar.prototype.destroy = function () {
      if (this.isRendering) {
        this.isRendering = false
        this.renderRunner.request()
      }
    }
    Calendar.prototype.updateSize = function () {
      _super.prototype.updateSize.call(this)
      flushToDom$1()
    }
    Calendar.prototype.batchRendering = function (func) {
      this.renderRunner.pause('batchRendering')
      func()
      this.renderRunner.resume('batchRendering')
    }
    Calendar.prototype.pauseRendering = function () {
      this.renderRunner.pause('pauseRendering')
    }
    Calendar.prototype.resumeRendering = function () {
      this.renderRunner.resume('pauseRendering', true)
    }
    Calendar.prototype.resetOptions = function (optionOverrides, append) {
      this.currentDataManager.resetOptions(optionOverrides, append)
    }
    Calendar.prototype.setClassNames = function (classNames) {
      if (!isArraysEqual(classNames, this.currentClassNames)) {
        const classList = this.el.classList
        for (let _i = 0, _a = this.currentClassNames; _i < _a.length; _i++) {
          var className = _a[_i]
          classList.remove(className)
        }
        for (
          let _b = 0, classNames_1 = classNames;
          _b < classNames_1.length;
          _b++
        ) {
          var className = classNames_1[_b]
          classList.add(className)
        }
        this.currentClassNames = classNames
      }
    }
    Calendar.prototype.setHeight = function (height) {
      applyStyleProp(this.el, 'height', height)
    }
    return Calendar
  })(CalendarApi)

  config.touchMouseIgnoreWait = 500
  let ignoreMouseDepth = 0
  let listenerCnt = 0
  let isWindowTouchMoveCancelled = false
  /*
    Uses a "pointer" abstraction, which monitors UI events for both mouse and touch.
    Tracks when the pointer "drags" on a certain element, meaning down+move+up.

    Also, tracks if there was touch-scrolling.
    Also, can prevent touch-scrolling from happening.
    Also, can fire pointermove events when scrolling happens underneath, even when no real pointer movement.

    emits:
    - pointerdown
    - pointermove
    - pointerup
    */
  const PointerDragging = /** @class */ (function () {
    function PointerDragging (containerEl) {
      const _this = this
      this.subjectEl = null
      // options that can be directly assigned by caller
      this.selector = '' // will cause subjectEl in all emitted events to be this element
      this.handleSelector = ''
      this.shouldIgnoreMove = false
      this.shouldWatchScroll = true // for simulating pointermove on scroll
      // internal states
      this.isDragging = false
      this.isTouchDragging = false
      this.wasTouchScroll = false
      // Mouse
      // ----------------------------------------------------------------------------------------------------
      this.handleMouseDown = function (ev) {
        if (
          !_this.shouldIgnoreMouse() &&
          isPrimaryMouseButton(ev) &&
          _this.tryStart(ev)
        ) {
          const pev = _this.createEventFromMouse(ev, true)
          _this.emitter.trigger('pointerdown', pev)
          _this.initScrollWatch(pev)
          if (!_this.shouldIgnoreMove) {
            document.addEventListener('mousemove', _this.handleMouseMove)
          }
          document.addEventListener('mouseup', _this.handleMouseUp)
        }
      }
      this.handleMouseMove = function (ev) {
        const pev = _this.createEventFromMouse(ev)
        _this.recordCoords(pev)
        _this.emitter.trigger('pointermove', pev)
      }
      this.handleMouseUp = function (ev) {
        document.removeEventListener('mousemove', _this.handleMouseMove)
        document.removeEventListener('mouseup', _this.handleMouseUp)
        _this.emitter.trigger('pointerup', _this.createEventFromMouse(ev))
        _this.cleanup() // call last so that pointerup has access to props
      }
      // Touch
      // ----------------------------------------------------------------------------------------------------
      this.handleTouchStart = function (ev) {
        if (_this.tryStart(ev)) {
          _this.isTouchDragging = true
          const pev = _this.createEventFromTouch(ev, true)
          _this.emitter.trigger('pointerdown', pev)
          _this.initScrollWatch(pev)
          // unlike mouse, need to attach to target, not document
          // https://stackoverflow.com/a/45760014
          const targetEl = ev.target
          if (!_this.shouldIgnoreMove) {
            targetEl.addEventListener('touchmove', _this.handleTouchMove)
          }
          targetEl.addEventListener('touchend', _this.handleTouchEnd)
          targetEl.addEventListener('touchcancel', _this.handleTouchEnd) // treat it as a touch end
          // attach a handler to get called when ANY scroll action happens on the page.
          // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
          // http://stackoverflow.com/a/32954565/96342
          window.addEventListener(
            'scroll',
            _this.handleTouchScroll,
            true // useCapture
          )
        }
      }
      this.handleTouchMove = function (ev) {
        const pev = _this.createEventFromTouch(ev)
        _this.recordCoords(pev)
        _this.emitter.trigger('pointermove', pev)
      }
      this.handleTouchEnd = function (ev) {
        if (_this.isDragging) {
          // done to guard against touchend followed by touchcancel
          const targetEl = ev.target
          targetEl.removeEventListener('touchmove', _this.handleTouchMove)
          targetEl.removeEventListener('touchend', _this.handleTouchEnd)
          targetEl.removeEventListener('touchcancel', _this.handleTouchEnd)
          window.removeEventListener('scroll', _this.handleTouchScroll, true) // useCaptured=true
          _this.emitter.trigger('pointerup', _this.createEventFromTouch(ev))
          _this.cleanup() // call last so that pointerup has access to props
          _this.isTouchDragging = false
          startIgnoringMouse()
        }
      }
      this.handleTouchScroll = function () {
        _this.wasTouchScroll = true
      }
      this.handleScroll = function (ev) {
        if (!_this.shouldIgnoreMove) {
          const pageX = window.pageXOffset - _this.prevScrollX + _this.prevPageX
          const pageY = window.pageYOffset - _this.prevScrollY + _this.prevPageY
          _this.emitter.trigger('pointermove', {
            origEvent: ev,
            isTouch: _this.isTouchDragging,
            subjectEl: _this.subjectEl,
            pageX,
            pageY,
            deltaX: pageX - _this.origPageX,
            deltaY: pageY - _this.origPageY
          })
        }
      }
      this.containerEl = containerEl
      this.emitter = new Emitter()
      containerEl.addEventListener('mousedown', this.handleMouseDown)
      containerEl.addEventListener('touchstart', this.handleTouchStart, {
        passive: true
      })
      listenerCreated()
    }

    PointerDragging.prototype.destroy = function () {
      this.containerEl.removeEventListener('mousedown', this.handleMouseDown)
      this.containerEl.removeEventListener(
        'touchstart',
        this.handleTouchStart,
        { passive: true }
      )
      listenerDestroyed()
    }
    PointerDragging.prototype.tryStart = function (ev) {
      const subjectEl = this.querySubjectEl(ev)
      const downEl = ev.target
      if (
        subjectEl &&
        (!this.handleSelector || elementClosest(downEl, this.handleSelector))
      ) {
        this.subjectEl = subjectEl
        this.isDragging = true // do this first so cancelTouchScroll will work
        this.wasTouchScroll = false
        return true
      }
      return false
    }
    PointerDragging.prototype.cleanup = function () {
      isWindowTouchMoveCancelled = false
      this.isDragging = false
      this.subjectEl = null
      // keep wasTouchScroll around for later access
      this.destroyScrollWatch()
    }
    PointerDragging.prototype.querySubjectEl = function (ev) {
      if (this.selector) {
        return elementClosest(ev.target, this.selector)
      } else {
        return this.containerEl
      }
    }
    PointerDragging.prototype.shouldIgnoreMouse = function () {
      return ignoreMouseDepth || this.isTouchDragging
    }
    // can be called by user of this class, to cancel touch-based scrolling for the current drag
    PointerDragging.prototype.cancelTouchScroll = function () {
      if (this.isDragging) {
        isWindowTouchMoveCancelled = true
      }
    }
    // Scrolling that simulates pointermoves
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.initScrollWatch = function (ev) {
      if (this.shouldWatchScroll) {
        this.recordCoords(ev)
        window.addEventListener('scroll', this.handleScroll, true) // useCapture=true
      }
    }
    PointerDragging.prototype.recordCoords = function (ev) {
      if (this.shouldWatchScroll) {
        this.prevPageX = ev.pageX
        this.prevPageY = ev.pageY
        this.prevScrollX = window.pageXOffset
        this.prevScrollY = window.pageYOffset
      }
    }
    PointerDragging.prototype.destroyScrollWatch = function () {
      if (this.shouldWatchScroll) {
        window.removeEventListener('scroll', this.handleScroll, true) // useCaptured=true
      }
    }
    // Event Normalization
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.createEventFromMouse = function (ev, isFirst) {
      let deltaX = 0
      let deltaY = 0
      // TODO: repeat code
      if (isFirst) {
        this.origPageX = ev.pageX
        this.origPageY = ev.pageY
      } else {
        deltaX = ev.pageX - this.origPageX
        deltaY = ev.pageY - this.origPageY
      }
      return {
        origEvent: ev,
        isTouch: false,
        subjectEl: this.subjectEl,
        pageX: ev.pageX,
        pageY: ev.pageY,
        deltaX,
        deltaY
      }
    }
    PointerDragging.prototype.createEventFromTouch = function (ev, isFirst) {
      const touches = ev.touches
      let pageX
      let pageY
      let deltaX = 0
      let deltaY = 0
      // if touch coords available, prefer,
      // because FF would give bad ev.pageX ev.pageY
      if (touches && touches.length) {
        pageX = touches[0].pageX
        pageY = touches[0].pageY
      } else {
        pageX = ev.pageX
        pageY = ev.pageY
      }
      // TODO: repeat code
      if (isFirst) {
        this.origPageX = pageX
        this.origPageY = pageY
      } else {
        deltaX = pageX - this.origPageX
        deltaY = pageY - this.origPageY
      }
      return {
        origEvent: ev,
        isTouch: true,
        subjectEl: this.subjectEl,
        pageX,
        pageY,
        deltaX,
        deltaY
      }
    }
    return PointerDragging
  })()

  // Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
  function isPrimaryMouseButton (ev) {
    return ev.button === 0 && !ev.ctrlKey
  }

  // Ignoring fake mouse events generated by touch
  // ----------------------------------------------------------------------------------------------------
  function startIgnoringMouse () {
    ignoreMouseDepth++
    setTimeout(function () {
      ignoreMouseDepth--
    }, config.touchMouseIgnoreWait)
  }

  // We want to attach touchmove as early as possible for Safari
  // ----------------------------------------------------------------------------------------------------
  function listenerCreated () {
    if (!listenerCnt++) {
      window.addEventListener('touchmove', onWindowTouchMove, {
        passive: false
      })
    }
  }

  function listenerDestroyed () {
    if (!--listenerCnt) {
      window.removeEventListener('touchmove', onWindowTouchMove, {
        passive: false
      })
    }
  }

  function onWindowTouchMove (ev) {
    if (isWindowTouchMoveCancelled) {
      ev.preventDefault()
    }
  }

  /*
    An effect in which an element follows the movement of a pointer across the screen.
    The moving element is a clone of some other element.
    Must call start + handleMove + stop.
    */
  const ElementMirror = /** @class */ (function () {
    function ElementMirror () {
      this.isVisible = false // must be explicitly enabled
      this.sourceEl = null
      this.mirrorEl = null
      this.sourceElRect = null // screen coords relative to viewport
      // options that can be set directly by caller
      this.parentNode = document.body
      this.zIndex = 9999
      this.revertDuration = 0
    }

    ElementMirror.prototype.start = function (sourceEl, pageX, pageY) {
      this.sourceEl = sourceEl
      this.sourceElRect = this.sourceEl.getBoundingClientRect()
      this.origScreenX = pageX - window.pageXOffset
      this.origScreenY = pageY - window.pageYOffset
      this.deltaX = 0
      this.deltaY = 0
      this.updateElPosition()
    }
    ElementMirror.prototype.handleMove = function (pageX, pageY) {
      this.deltaX = pageX - window.pageXOffset - this.origScreenX
      this.deltaY = pageY - window.pageYOffset - this.origScreenY
      this.updateElPosition()
    }
    // can be called before start
    ElementMirror.prototype.setIsVisible = function (bool) {
      if (bool) {
        if (!this.isVisible) {
          if (this.mirrorEl) {
            this.mirrorEl.style.display = ''
          }
          this.isVisible = bool // needs to happen before updateElPosition
          this.updateElPosition() // because was not updating the position while invisible
        }
      } else {
        if (this.isVisible) {
          if (this.mirrorEl) {
            this.mirrorEl.style.display = 'none'
          }
          this.isVisible = bool
        }
      }
    }
    // always async
    ElementMirror.prototype.stop = function (needsRevertAnimation, callback) {
      const _this = this
      const done = function () {
        _this.cleanup()
        callback()
      }
      if (
        needsRevertAnimation &&
        this.mirrorEl &&
        this.isVisible &&
        this.revertDuration && // if 0, transition won't work
        (this.deltaX || this.deltaY) // if same coords, transition won't work
      ) {
        this.doRevertAnimation(done, this.revertDuration)
      } else {
        setTimeout(done, 0)
      }
    }
    ElementMirror.prototype.doRevertAnimation = function (
      callback,
      revertDuration
    ) {
      const mirrorEl = this.mirrorEl
      const finalSourceElRect = this.sourceEl.getBoundingClientRect() // because autoscrolling might have happened
      mirrorEl.style.transition =
        'top ' + revertDuration + 'ms,' + 'left ' + revertDuration + 'ms'
      applyStyle(mirrorEl, {
        left: finalSourceElRect.left,
        top: finalSourceElRect.top
      })
      whenTransitionDone(mirrorEl, function () {
        mirrorEl.style.transition = ''
        callback()
      })
    }
    ElementMirror.prototype.cleanup = function () {
      if (this.mirrorEl) {
        removeElement(this.mirrorEl)
        this.mirrorEl = null
      }
      this.sourceEl = null
    }
    ElementMirror.prototype.updateElPosition = function () {
      if (this.sourceEl && this.isVisible) {
        applyStyle(this.getMirrorEl(), {
          left: this.sourceElRect.left + this.deltaX,
          top: this.sourceElRect.top + this.deltaY
        })
      }
    }
    ElementMirror.prototype.getMirrorEl = function () {
      const sourceElRect = this.sourceElRect
      let mirrorEl = this.mirrorEl
      if (!mirrorEl) {
        mirrorEl = this.mirrorEl = this.sourceEl.cloneNode(true) // cloneChildren=true
        // we don't want long taps or any mouse interaction causing selection/menus.
        // would use preventSelection(), but that prevents selectstart, causing problems.
        mirrorEl.classList.add('fc-unselectable')
        mirrorEl.classList.add('fc-event-dragging')
        applyStyle(mirrorEl, {
          position: 'fixed',
          zIndex: this.zIndex,
          visibility: '',
          boxSizing: 'border-box',
          width: sourceElRect.right - sourceElRect.left,
          height: sourceElRect.bottom - sourceElRect.top,
          right: 'auto',
          bottom: 'auto',
          margin: 0
        })
        this.parentNode.appendChild(mirrorEl)
      }
      return mirrorEl
    }
    return ElementMirror
  })()

  /*
    Is a cache for a given element's scroll information (all the info that ScrollController stores)
    in addition the "client rectangle" of the element.. the area within the scrollbars.

    The cache can be in one of two modes:
    - doesListening:false - ignores when the container is scrolled by someone else
    - doesListening:true - watch for scrolling and update the cache
    */
  const ScrollGeomCache = /** @class */ (function (_super) {
    __extends(ScrollGeomCache, _super)

    function ScrollGeomCache (scrollController, doesListening) {
      const _this = _super.call(this) || this
      _this.handleScroll = function () {
        _this.scrollTop = _this.scrollController.getScrollTop()
        _this.scrollLeft = _this.scrollController.getScrollLeft()
        _this.handleScrollChange()
      }
      _this.scrollController = scrollController
      _this.doesListening = doesListening
      _this.scrollTop = _this.origScrollTop = scrollController.getScrollTop()
      _this.scrollLeft = _this.origScrollLeft =
        scrollController.getScrollLeft()
      _this.scrollWidth = scrollController.getScrollWidth()
      _this.scrollHeight = scrollController.getScrollHeight()
      _this.clientWidth = scrollController.getClientWidth()
      _this.clientHeight = scrollController.getClientHeight()
      _this.clientRect = _this.computeClientRect() // do last in case it needs cached values
      if (_this.doesListening) {
        _this.getEventTarget().addEventListener('scroll', _this.handleScroll)
      }
      return _this
    }

    ScrollGeomCache.prototype.destroy = function () {
      if (this.doesListening) {
        this.getEventTarget().removeEventListener('scroll', this.handleScroll)
      }
    }
    ScrollGeomCache.prototype.getScrollTop = function () {
      return this.scrollTop
    }
    ScrollGeomCache.prototype.getScrollLeft = function () {
      return this.scrollLeft
    }
    ScrollGeomCache.prototype.setScrollTop = function (top) {
      this.scrollController.setScrollTop(top)
      if (!this.doesListening) {
        // we are not relying on the element to normalize out-of-bounds scroll values
        // so we need to sanitize ourselves
        this.scrollTop = Math.max(Math.min(top, this.getMaxScrollTop()), 0)
        this.handleScrollChange()
      }
    }
    ScrollGeomCache.prototype.setScrollLeft = function (top) {
      this.scrollController.setScrollLeft(top)
      if (!this.doesListening) {
        // we are not relying on the element to normalize out-of-bounds scroll values
        // so we need to sanitize ourselves
        this.scrollLeft = Math.max(Math.min(top, this.getMaxScrollLeft()), 0)
        this.handleScrollChange()
      }
    }
    ScrollGeomCache.prototype.getClientWidth = function () {
      return this.clientWidth
    }
    ScrollGeomCache.prototype.getClientHeight = function () {
      return this.clientHeight
    }
    ScrollGeomCache.prototype.getScrollWidth = function () {
      return this.scrollWidth
    }
    ScrollGeomCache.prototype.getScrollHeight = function () {
      return this.scrollHeight
    }
    ScrollGeomCache.prototype.handleScrollChange = function () {}
    return ScrollGeomCache
  })(ScrollController)
  const ElementScrollGeomCache = /** @class */ (function (_super) {
    __extends(ElementScrollGeomCache, _super)

    function ElementScrollGeomCache (el, doesListening) {
      return (
        _super.call(this, new ElementScrollController(el), doesListening) ||
        this
      )
    }

    ElementScrollGeomCache.prototype.getEventTarget = function () {
      return this.scrollController.el
    }
    ElementScrollGeomCache.prototype.computeClientRect = function () {
      return computeInnerRect(this.scrollController.el)
    }
    return ElementScrollGeomCache
  })(ScrollGeomCache)
  const WindowScrollGeomCache = /** @class */ (function (_super) {
    __extends(WindowScrollGeomCache, _super)

    function WindowScrollGeomCache (doesListening) {
      return (
        _super.call(this, new WindowScrollController(), doesListening) || this
      )
    }

    WindowScrollGeomCache.prototype.getEventTarget = function () {
      return window
    }
    WindowScrollGeomCache.prototype.computeClientRect = function () {
      return {
        left: this.scrollLeft,
        right: this.scrollLeft + this.clientWidth,
        top: this.scrollTop,
        bottom: this.scrollTop + this.clientHeight
      }
    }
    // the window is the only scroll object that changes it's rectangle relative
    // to the document's topleft as it scrolls
    WindowScrollGeomCache.prototype.handleScrollChange = function () {
      this.clientRect = this.computeClientRect()
    }
    return WindowScrollGeomCache
  })(ScrollGeomCache)

  // If available we are using native "performance" API instead of "Date"
  // Read more about it on MDN:
  // https://developer.mozilla.org/en-US/docs/Web/API/Performance
  const getTime = typeof performance === 'function' ? performance.now : Date.now
  /*
    For a pointer interaction, automatically scrolls certain scroll containers when the pointer
    approaches the edge.

    The caller must call start + handleMove + stop.
    */
  const AutoScroller = /** @class */ (function () {
    function AutoScroller () {
      const _this = this
      // options that can be set by caller
      this.isEnabled = true
      this.scrollQuery = [window, '.fc-scroller']
      this.edgeThreshold = 50 // pixels
      this.maxVelocity = 300 // pixels per second
      // internal state
      this.pointerScreenX = null
      this.pointerScreenY = null
      this.isAnimating = false
      this.scrollCaches = null
      // protect against the initial pointerdown being too close to an edge and starting the scroll
      this.everMovedUp = false
      this.everMovedDown = false
      this.everMovedLeft = false
      this.everMovedRight = false
      this.animate = function () {
        if (_this.isAnimating) {
          // wasn't cancelled between animation calls
          const edge = _this.computeBestEdge(
            _this.pointerScreenX + window.pageXOffset,
            _this.pointerScreenY + window.pageYOffset
          )
          if (edge) {
            const now = getTime()
            _this.handleSide(edge, (now - _this.msSinceRequest) / 1000)
            _this.requestAnimation(now)
          } else {
            _this.isAnimating = false // will stop animation
          }
        }
      }
    }

    AutoScroller.prototype.start = function (pageX, pageY) {
      if (this.isEnabled) {
        this.scrollCaches = this.buildCaches()
        this.pointerScreenX = null
        this.pointerScreenY = null
        this.everMovedUp = false
        this.everMovedDown = false
        this.everMovedLeft = false
        this.everMovedRight = false
        this.handleMove(pageX, pageY)
      }
    }
    AutoScroller.prototype.handleMove = function (pageX, pageY) {
      if (this.isEnabled) {
        const pointerScreenX = pageX - window.pageXOffset
        const pointerScreenY = pageY - window.pageYOffset
        const yDelta =
          this.pointerScreenY === null
            ? 0
            : pointerScreenY - this.pointerScreenY
        const xDelta =
          this.pointerScreenX === null
            ? 0
            : pointerScreenX - this.pointerScreenX
        if (yDelta < 0) {
          this.everMovedUp = true
        } else if (yDelta > 0) {
          this.everMovedDown = true
        }
        if (xDelta < 0) {
          this.everMovedLeft = true
        } else if (xDelta > 0) {
          this.everMovedRight = true
        }
        this.pointerScreenX = pointerScreenX
        this.pointerScreenY = pointerScreenY
        if (!this.isAnimating) {
          this.isAnimating = true
          this.requestAnimation(getTime())
        }
      }
    }
    AutoScroller.prototype.stop = function () {
      if (this.isEnabled) {
        this.isAnimating = false // will stop animation
        for (let _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
          const scrollCache = _a[_i]
          scrollCache.destroy()
        }
        this.scrollCaches = null
      }
    }
    AutoScroller.prototype.requestAnimation = function (now) {
      this.msSinceRequest = now
      requestAnimationFrame(this.animate)
    }
    AutoScroller.prototype.handleSide = function (edge, seconds) {
      const scrollCache = edge.scrollCache
      const edgeThreshold = this.edgeThreshold
      const invDistance = edgeThreshold - edge.distance
      const velocity = // the closer to the edge, the faster we scroll
        ((invDistance * invDistance) / (edgeThreshold * edgeThreshold)) * // quadratic
        this.maxVelocity *
        seconds
      let sign = 1
      switch (edge.name) {
        case 'left':
          sign = -1
        // falls through
        case 'right':
          scrollCache.setScrollLeft(
            scrollCache.getScrollLeft() + velocity * sign
          )
          break
        case 'top':
          sign = -1
        // falls through
        case 'bottom':
          scrollCache.setScrollTop(
            scrollCache.getScrollTop() + velocity * sign
          )
          break
      }
    }
    // left/top are relative to document topleft
    AutoScroller.prototype.computeBestEdge = function (left, top) {
      const edgeThreshold = this.edgeThreshold
      let bestSide = null
      for (let _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
        const scrollCache = _a[_i]
        const rect = scrollCache.clientRect
        const leftDist = left - rect.left
        const rightDist = rect.right - left
        const topDist = top - rect.top
        const bottomDist = rect.bottom - top
        // completely within the rect?
        if (
          leftDist >= 0 &&
          rightDist >= 0 &&
          topDist >= 0 &&
          bottomDist >= 0
        ) {
          if (
            topDist <= edgeThreshold &&
            this.everMovedUp &&
            scrollCache.canScrollUp() &&
            (!bestSide || bestSide.distance > topDist)
          ) {
            bestSide = {
              scrollCache,
              name: 'top',
              distance: topDist
            }
          }
          if (
            bottomDist <= edgeThreshold &&
            this.everMovedDown &&
            scrollCache.canScrollDown() &&
            (!bestSide || bestSide.distance > bottomDist)
          ) {
            bestSide = {
              scrollCache,
              name: 'bottom',
              distance: bottomDist
            }
          }
          if (
            leftDist <= edgeThreshold &&
            this.everMovedLeft &&
            scrollCache.canScrollLeft() &&
            (!bestSide || bestSide.distance > leftDist)
          ) {
            bestSide = {
              scrollCache,
              name: 'left',
              distance: leftDist
            }
          }
          if (
            rightDist <= edgeThreshold &&
            this.everMovedRight &&
            scrollCache.canScrollRight() &&
            (!bestSide || bestSide.distance > rightDist)
          ) {
            bestSide = {
              scrollCache,
              name: 'right',
              distance: rightDist
            }
          }
        }
      }
      return bestSide
    }
    AutoScroller.prototype.buildCaches = function () {
      return this.queryScrollEls().map(function (el) {
        if (el === window) {
          return new WindowScrollGeomCache(false) // false = don't listen to user-generated scrolls
        } else {
          return new ElementScrollGeomCache(el, false) // false = don't listen to user-generated scrolls
        }
      })
    }
    AutoScroller.prototype.queryScrollEls = function () {
      const els = []
      for (let _i = 0, _a = this.scrollQuery; _i < _a.length; _i++) {
        const query = _a[_i]
        if (typeof query === 'object') {
          els.push(query)
        } else {
          els.push.apply(
            els,
            Array.prototype.slice.call(document.querySelectorAll(query))
          )
        }
      }
      return els
    }
    return AutoScroller
  })()

  /*
    Monitors dragging on an element. Has a number of high-level features:
    - minimum distance required before dragging
    - minimum wait time ("delay") before dragging
    - a mirror element that follows the pointer
    */
  const FeaturefulElementDragging = /** @class */ (function (_super) {
    __extends(FeaturefulElementDragging, _super)

    function FeaturefulElementDragging (containerEl, selector) {
      const _this = _super.call(this, containerEl) || this
      // options that can be directly set by caller
      // the caller can also set the PointerDragging's options as well
      _this.delay = null
      _this.minDistance = 0
      _this.touchScrollAllowed = true // prevents drag from starting and blocks scrolling during drag
      _this.mirrorNeedsRevert = false
      _this.isInteracting = false // is the user validly moving the pointer? lasts until pointerup
      _this.isDragging = false // is it INTENTFULLY dragging? lasts until after revert animation
      _this.isDelayEnded = false
      _this.isDistanceSurpassed = false
      _this.delayTimeoutId = null
      _this.onPointerDown = function (ev) {
        if (!_this.isDragging) {
          // so new drag doesn't happen while revert animation is going
          _this.isInteracting = true
          _this.isDelayEnded = false
          _this.isDistanceSurpassed = false
          preventSelection(document.body)
          preventContextMenu(document.body)
          // prevent links from being visited if there's an eventual drag.
          // also prevents selection in older browsers (maybe?).
          // not necessary for touch, besides, browser would complain about passiveness.
          if (!ev.isTouch) {
            ev.origEvent.preventDefault()
          }
          _this.emitter.trigger('pointerdown', ev)
          if (
            _this.isInteracting && // not destroyed via pointerdown handler
            !_this.pointer.shouldIgnoreMove
          ) {
            // actions related to initiating dragstart+dragmove+dragend...
            _this.mirror.setIsVisible(false) // reset. caller must set-visible
            _this.mirror.start(ev.subjectEl, ev.pageX, ev.pageY) // must happen on first pointer down
            _this.startDelay(ev)
            if (!_this.minDistance) {
              _this.handleDistanceSurpassed(ev)
            }
          }
        }
      }
      _this.onPointerMove = function (ev) {
        if (_this.isInteracting) {
          _this.emitter.trigger('pointermove', ev)
          if (!_this.isDistanceSurpassed) {
            const minDistance = _this.minDistance
            let distanceSq = void 0 // current distance from the origin, squared
            const deltaX = ev.deltaX
            const deltaY = ev.deltaY
            distanceSq = deltaX * deltaX + deltaY * deltaY
            if (distanceSq >= minDistance * minDistance) {
              // use pythagorean theorem
              _this.handleDistanceSurpassed(ev)
            }
          }
          if (_this.isDragging) {
            // a real pointer move? (not one simulated by scrolling)
            if (ev.origEvent.type !== 'scroll') {
              _this.mirror.handleMove(ev.pageX, ev.pageY)
              _this.autoScroller.handleMove(ev.pageX, ev.pageY)
            }
            _this.emitter.trigger('dragmove', ev)
          }
        }
      }
      _this.onPointerUp = function (ev) {
        if (_this.isInteracting) {
          _this.isInteracting = false
          allowSelection(document.body)
          allowContextMenu(document.body)
          _this.emitter.trigger('pointerup', ev) // can potentially set mirrorNeedsRevert
          if (_this.isDragging) {
            _this.autoScroller.stop()
            _this.tryStopDrag(ev) // which will stop the mirror
          }
          if (_this.delayTimeoutId) {
            clearTimeout(_this.delayTimeoutId)
            _this.delayTimeoutId = null
          }
        }
      }
      const pointer = (_this.pointer = new PointerDragging(containerEl))
      pointer.emitter.on('pointerdown', _this.onPointerDown)
      pointer.emitter.on('pointermove', _this.onPointerMove)
      pointer.emitter.on('pointerup', _this.onPointerUp)
      if (selector) {
        pointer.selector = selector
      }
      _this.mirror = new ElementMirror()
      _this.autoScroller = new AutoScroller()
      return _this
    }

    FeaturefulElementDragging.prototype.destroy = function () {
      this.pointer.destroy()
      // HACK: simulate a pointer-up to end the current drag
      // TODO: fire 'dragend' directly and stop interaction. discourage use of pointerup event (b/c might not fire)
      this.onPointerUp({})
    }
    FeaturefulElementDragging.prototype.startDelay = function (ev) {
      const _this = this
      if (typeof this.delay === 'number') {
        this.delayTimeoutId = setTimeout(function () {
          _this.delayTimeoutId = null
          _this.handleDelayEnd(ev)
        }, this.delay) // not assignable to number!
      } else {
        this.handleDelayEnd(ev)
      }
    }
    FeaturefulElementDragging.prototype.handleDelayEnd = function (ev) {
      this.isDelayEnded = true
      this.tryStartDrag(ev)
    }
    FeaturefulElementDragging.prototype.handleDistanceSurpassed = function (
      ev
    ) {
      this.isDistanceSurpassed = true
      this.tryStartDrag(ev)
    }
    FeaturefulElementDragging.prototype.tryStartDrag = function (ev) {
      if (this.isDelayEnded && this.isDistanceSurpassed) {
        if (!this.pointer.wasTouchScroll || this.touchScrollAllowed) {
          this.isDragging = true
          this.mirrorNeedsRevert = false
          this.autoScroller.start(ev.pageX, ev.pageY)
          this.emitter.trigger('dragstart', ev)
          if (this.touchScrollAllowed === false) {
            this.pointer.cancelTouchScroll()
          }
        }
      }
    }
    FeaturefulElementDragging.prototype.tryStopDrag = function (ev) {
      // .stop() is ALWAYS asynchronous, which we NEED because we want all pointerup events
      // that come from the document to fire beforehand. much more convenient this way.
      this.mirror.stop(
        this.mirrorNeedsRevert,
        this.stopDrag.bind(this, ev) // bound with args
      )
    }
    FeaturefulElementDragging.prototype.stopDrag = function (ev) {
      this.isDragging = false
      this.emitter.trigger('dragend', ev)
    }
    // fill in the implementations...
    FeaturefulElementDragging.prototype.setIgnoreMove = function (bool) {
      this.pointer.shouldIgnoreMove = bool
    }
    FeaturefulElementDragging.prototype.setMirrorIsVisible = function (bool) {
      this.mirror.setIsVisible(bool)
    }
    FeaturefulElementDragging.prototype.setMirrorNeedsRevert = function (bool) {
      this.mirrorNeedsRevert = bool
    }
    FeaturefulElementDragging.prototype.setAutoScrollEnabled = function (bool) {
      this.autoScroller.isEnabled = bool
    }
    return FeaturefulElementDragging
  })(ElementDragging)

  /*
    When this class is instantiated, it records the offset of an element (relative to the document topleft),
    and continues to monitor scrolling, updating the cached coordinates if it needs to.
    Does not access the DOM after instantiation, so highly performant.

    Also keeps track of all scrolling/overflow:hidden containers that are parents of the given element
    and an determine if a given point is inside the combined clipping rectangle.
    */
  const OffsetTracker = /** @class */ (function () {
    function OffsetTracker (el) {
      this.origRect = computeRect(el)
      // will work fine for divs that have overflow:hidden
      this.scrollCaches = getClippingParents(el).map(function (el) {
        return new ElementScrollGeomCache(el, true) // listen=true
      })
    }

    OffsetTracker.prototype.destroy = function () {
      for (let _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
        const scrollCache = _a[_i]
        scrollCache.destroy()
      }
    }
    OffsetTracker.prototype.computeLeft = function () {
      let left = this.origRect.left
      for (let _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
        const scrollCache = _a[_i]
        left += scrollCache.origScrollLeft - scrollCache.getScrollLeft()
      }
      return left
    }
    OffsetTracker.prototype.computeTop = function () {
      let top = this.origRect.top
      for (let _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
        const scrollCache = _a[_i]
        top += scrollCache.origScrollTop - scrollCache.getScrollTop()
      }
      return top
    }
    OffsetTracker.prototype.isWithinClipping = function (pageX, pageY) {
      const point = { left: pageX, top: pageY }
      for (let _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
        const scrollCache = _a[_i]
        if (
          !isIgnoredClipping(scrollCache.getEventTarget()) &&
          !pointInsideRect(point, scrollCache.clientRect)
        ) {
          return false
        }
      }
      return true
    }
    return OffsetTracker
  })()
  // certain clipping containers should never constrain interactions, like <html> and <body>
  // https://github.com/fullcalendar/fullcalendar/issues/3615
  function isIgnoredClipping (node) {
    const tagName = node.tagName
    return tagName === 'HTML' || tagName === 'BODY'
  }

  /*
    Tracks movement over multiple droppable areas (aka "hits")
    that exist in one or more DateComponents.
    Relies on an existing draggable.

    emits:
    - pointerdown
    - dragstart
    - hitchange - fires initially, even if not over a hit
    - pointerup
    - (hitchange - again, to null, if ended over a hit)
    - dragend
    */
  const HitDragging = /** @class */ (function () {
    function HitDragging (dragging, droppableStore) {
      const _this = this
      // options that can be set by caller
      this.useSubjectCenter = false
      this.requireInitial = true // if doesn't start out on a hit, won't emit any events
      this.initialHit = null
      this.movingHit = null
      this.finalHit = null // won't ever be populated if shouldIgnoreMove
      this.handlePointerDown = function (ev) {
        const dragging = _this.dragging
        _this.initialHit = null
        _this.movingHit = null
        _this.finalHit = null
        _this.prepareHits()
        _this.processFirstCoord(ev)
        if (_this.initialHit || !_this.requireInitial) {
          dragging.setIgnoreMove(false)
          _this.emitter.trigger('pointerdown', ev) // TODO: fire this before computing processFirstCoord, so listeners can cancel. this gets fired by almost every handler :(
        } else {
          dragging.setIgnoreMove(true)
        }
      }
      this.handleDragStart = function (ev) {
        _this.emitter.trigger('dragstart', ev)
        _this.handleMove(ev, true) // force = fire even if initially null
      }
      this.handleDragMove = function (ev) {
        _this.emitter.trigger('dragmove', ev)
        _this.handleMove(ev)
      }
      this.handlePointerUp = function (ev) {
        _this.releaseHits()
        _this.emitter.trigger('pointerup', ev)
      }
      this.handleDragEnd = function (ev) {
        if (_this.movingHit) {
          _this.emitter.trigger('hitupdate', null, true, ev)
        }
        _this.finalHit = _this.movingHit
        _this.movingHit = null
        _this.emitter.trigger('dragend', ev)
      }
      this.droppableStore = droppableStore
      dragging.emitter.on('pointerdown', this.handlePointerDown)
      dragging.emitter.on('dragstart', this.handleDragStart)
      dragging.emitter.on('dragmove', this.handleDragMove)
      dragging.emitter.on('pointerup', this.handlePointerUp)
      dragging.emitter.on('dragend', this.handleDragEnd)
      this.dragging = dragging
      this.emitter = new Emitter()
    }

    // sets initialHit
    // sets coordAdjust
    HitDragging.prototype.processFirstCoord = function (ev) {
      const origPoint = { left: ev.pageX, top: ev.pageY }
      let adjustedPoint = origPoint
      const subjectEl = ev.subjectEl
      let subjectRect
      if (subjectEl !== document) {
        subjectRect = computeRect(subjectEl)
        adjustedPoint = constrainPoint(adjustedPoint, subjectRect)
      }
      const initialHit = (this.initialHit = this.queryHitForOffset(
        adjustedPoint.left,
        adjustedPoint.top
      ))
      if (initialHit) {
        if (this.useSubjectCenter && subjectRect) {
          const slicedSubjectRect = intersectRects(subjectRect, initialHit.rect)
          if (slicedSubjectRect) {
            adjustedPoint = getRectCenter(slicedSubjectRect)
          }
        }
        this.coordAdjust = diffPoints(adjustedPoint, origPoint)
      } else {
        this.coordAdjust = { left: 0, top: 0 }
      }
    }
    HitDragging.prototype.handleMove = function (ev, forceHandle) {
      const hit = this.queryHitForOffset(
        ev.pageX + this.coordAdjust.left,
        ev.pageY + this.coordAdjust.top
      )
      if (forceHandle || !isHitsEqual(this.movingHit, hit)) {
        this.movingHit = hit
        this.emitter.trigger('hitupdate', hit, false, ev)
      }
    }
    HitDragging.prototype.prepareHits = function () {
      this.offsetTrackers = mapHash(
        this.droppableStore,
        function (interactionSettings) {
          interactionSettings.component.prepareHits()
          return new OffsetTracker(interactionSettings.el)
        }
      )
    }
    HitDragging.prototype.releaseHits = function () {
      const offsetTrackers = this.offsetTrackers
      for (const id in offsetTrackers) {
        offsetTrackers[id].destroy()
      }
      this.offsetTrackers = {}
    }
    HitDragging.prototype.queryHitForOffset = function (offsetLeft, offsetTop) {
      const _a = this
      const droppableStore = _a.droppableStore
      const offsetTrackers = _a.offsetTrackers
      let bestHit = null
      for (const id in droppableStore) {
        const component = droppableStore[id].component
        const offsetTracker = offsetTrackers[id]
        if (
          offsetTracker && // wasn't destroyed mid-drag
          offsetTracker.isWithinClipping(offsetLeft, offsetTop)
        ) {
          const originLeft = offsetTracker.computeLeft()
          const originTop = offsetTracker.computeTop()
          const positionLeft = offsetLeft - originLeft
          const positionTop = offsetTop - originTop
          const origRect = offsetTracker.origRect
          const width = origRect.right - origRect.left
          const height = origRect.bottom - origRect.top
          if (
            // must be within the element's bounds
            positionLeft >= 0 &&
            positionLeft < width &&
            positionTop >= 0 &&
            positionTop < height
          ) {
            const hit = component.queryHit(
              positionLeft,
              positionTop,
              width,
              height
            )
            const dateProfile = component.context.getCurrentData().dateProfile
            if (
              hit &&
              // make sure the hit is within activeRange, meaning it's not a deal cell
              rangeContainsRange(dateProfile.activeRange, hit.dateSpan.range) &&
              (!bestHit || hit.layer > bestHit.layer)
            ) {
              // TODO: better way to re-orient rectangle
              hit.rect.left += originLeft
              hit.rect.right += originLeft
              hit.rect.top += originTop
              hit.rect.bottom += originTop
              bestHit = hit
            }
          }
        }
      }
      return bestHit
    }
    return HitDragging
  })()

  function isHitsEqual (hit0, hit1) {
    if (!hit0 && !hit1) {
      return true
    }
    if (Boolean(hit0) !== Boolean(hit1)) {
      return false
    }
    return isDateSpansEqual(hit0.dateSpan, hit1.dateSpan)
  }

  function buildDatePointApiWithContext (dateSpan, context) {
    const props = {}
    for (
      let _i = 0, _a = context.pluginHooks.datePointTransforms;
      _i < _a.length;
      _i++
    ) {
      const transform = _a[_i]
      __assign(props, transform(dateSpan, context))
    }
    __assign(props, buildDatePointApi(dateSpan, context.dateEnv))
    return props
  }

  function buildDatePointApi (span, dateEnv) {
    return {
      date: dateEnv.toDate(span.range.start),
      dateStr: dateEnv.formatIso(span.range.start, { omitTime: span.allDay }),
      allDay: span.allDay
    }
  }

  /*
    Monitors when the user clicks on a specific date/time of a component.
    A pointerdown+pointerup on the same "hit" constitutes a click.
    */
  const DateClicking = /** @class */ (function (_super) {
    __extends(DateClicking, _super)

    function DateClicking (settings) {
      const _this = _super.call(this, settings) || this
      _this.handlePointerDown = function (pev) {
        const dragging = _this.dragging
        const downEl = pev.origEvent.target
        // do this in pointerdown (not dragend) because DOM might be mutated by the time dragend is fired
        dragging.setIgnoreMove(!_this.component.isValidDateDownEl(downEl))
      }
      // won't even fire if moving was ignored
      _this.handleDragEnd = function (ev) {
        const component = _this.component
        const pointer = _this.dragging.pointer
        if (!pointer.wasTouchScroll) {
          const _a = _this.hitDragging
          const initialHit = _a.initialHit
          const finalHit = _a.finalHit
          if (initialHit && finalHit && isHitsEqual(initialHit, finalHit)) {
            const context = component.context
            const arg = __assign(
              __assign(
                {},
                buildDatePointApiWithContext(initialHit.dateSpan, context)
              ),
              {
                dayEl: initialHit.dayEl,
                jsEvent: ev.origEvent,
                view: context.viewApi || context.calendarApi.view
              }
            )
            context.emitter.trigger('dateClick', arg)
          }
        }
      }
      // we DO want to watch pointer moves because otherwise finalHit won't get populated
      _this.dragging = new FeaturefulElementDragging(settings.el)
      _this.dragging.autoScroller.isEnabled = false
      const hitDragging = (_this.hitDragging = new HitDragging(
        _this.dragging,
        interactionSettingsToStore(settings)
      ))
      hitDragging.emitter.on('pointerdown', _this.handlePointerDown)
      hitDragging.emitter.on('dragend', _this.handleDragEnd)
      return _this
    }

    DateClicking.prototype.destroy = function () {
      this.dragging.destroy()
    }
    return DateClicking
  })(Interaction)

  /*
    Tracks when the user selects a portion of time of a component,
    constituted by a drag over date cells, with a possible delay at the beginning of the drag.
    */
  const DateSelecting = /** @class */ (function (_super) {
    __extends(DateSelecting, _super)

    function DateSelecting (settings) {
      const _this = _super.call(this, settings) || this
      _this.dragSelection = null
      _this.handlePointerDown = function (ev) {
        const _a = _this
        const component = _a.component
        const dragging = _a.dragging
        const options = component.context.options
        const canSelect =
          options.selectable &&
          component.isValidDateDownEl(ev.origEvent.target)
        // don't bother to watch expensive moves if component won't do selection
        dragging.setIgnoreMove(!canSelect)
        // if touch, require user to hold down
        dragging.delay = ev.isTouch ? getComponentTouchDelay(component) : null
      }
      _this.handleDragStart = function (ev) {
        _this.component.context.calendarApi.unselect(ev) // unselect previous selections
      }
      _this.handleHitUpdate = function (hit, isFinal) {
        const context = _this.component.context
        let dragSelection = null
        let isInvalid = false
        if (hit) {
          dragSelection = joinHitsIntoSelection(
            _this.hitDragging.initialHit,
            hit,
            context.pluginHooks.dateSelectionTransformers
          )
          if (
            !dragSelection ||
            !_this.component.isDateSelectionValid(dragSelection)
          ) {
            isInvalid = true
            dragSelection = null
          }
        }
        if (dragSelection) {
          context.dispatch({ type: 'SELECT_DATES', selection: dragSelection })
        } else if (!isFinal) {
          // only unselect if moved away while dragging
          context.dispatch({ type: 'UNSELECT_DATES' })
        }
        if (!isInvalid) {
          enableCursor()
        } else {
          disableCursor()
        }
        if (!isFinal) {
          _this.dragSelection = dragSelection // only clear if moved away from all hits while dragging
        }
      }
      _this.handlePointerUp = function (pev) {
        if (_this.dragSelection) {
          // selection is already rendered, so just need to report selection
          triggerDateSelect(_this.dragSelection, pev, _this.component.context)
          _this.dragSelection = null
        }
      }
      const component = settings.component
      const options = component.context.options
      const dragging = (_this.dragging = new FeaturefulElementDragging(
        settings.el
      ))
      dragging.touchScrollAllowed = false
      dragging.minDistance = options.selectMinDistance || 0
      dragging.autoScroller.isEnabled = options.dragScroll
      const hitDragging = (_this.hitDragging = new HitDragging(
        _this.dragging,
        interactionSettingsToStore(settings)
      ))
      hitDragging.emitter.on('pointerdown', _this.handlePointerDown)
      hitDragging.emitter.on('dragstart', _this.handleDragStart)
      hitDragging.emitter.on('hitupdate', _this.handleHitUpdate)
      hitDragging.emitter.on('pointerup', _this.handlePointerUp)
      return _this
    }

    DateSelecting.prototype.destroy = function () {
      this.dragging.destroy()
    }
    return DateSelecting
  })(Interaction)

  function getComponentTouchDelay (component) {
    const options = component.context.options
    let delay = options.selectLongPressDelay
    if (delay == null) {
      delay = options.longPressDelay
    }
    return delay
  }

  function joinHitsIntoSelection (hit0, hit1, dateSelectionTransformers) {
    const dateSpan0 = hit0.dateSpan
    const dateSpan1 = hit1.dateSpan
    const ms = [
      dateSpan0.range.start,
      dateSpan0.range.end,
      dateSpan1.range.start,
      dateSpan1.range.end
    ]
    ms.sort(compareNumbers)
    const props = {}
    for (
      let _i = 0, dateSelectionTransformers_1 = dateSelectionTransformers;
      _i < dateSelectionTransformers_1.length;
      _i++
    ) {
      const transformer = dateSelectionTransformers_1[_i]
      const res = transformer(hit0, hit1)
      if (res === false) {
        return null
      } else if (res) {
        __assign(props, res)
      }
    }
    props.range = { start: ms[0], end: ms[3] }
    props.allDay = dateSpan0.allDay
    return props
  }

  const EventDragging = /** @class */ (function (_super) {
    __extends(EventDragging, _super)

    function EventDragging (settings) {
      const _this = _super.call(this, settings) || this
      // internal state
      _this.subjectEl = null
      _this.subjectSeg = null // the seg being selected/dragged
      _this.isDragging = false
      _this.eventRange = null
      _this.relevantEvents = null // the events being dragged
      _this.receivingContext = null
      _this.validMutation = null
      _this.mutatedRelevantEvents = null
      _this.handlePointerDown = function (ev) {
        const origTarget = ev.origEvent.target
        const _a = _this
        const component = _a.component
        const dragging = _a.dragging
        const mirror = dragging.mirror
        const options = component.context.options
        const initialContext = component.context
        _this.subjectEl = ev.subjectEl
        const subjectSeg = (_this.subjectSeg = getElSeg(ev.subjectEl))
        const eventRange = (_this.eventRange = subjectSeg.eventRange)
        const eventInstanceId = eventRange.instance.instanceId
        _this.relevantEvents = getRelevantEvents(
          initialContext.getCurrentData().eventStore,
          eventInstanceId
        )
        dragging.minDistance = ev.isTouch ? 0 : options.eventDragMinDistance
        dragging.delay =
          // only do a touch delay if touch and this event hasn't been selected yet
          ev.isTouch && eventInstanceId !== component.props.eventSelection
            ? getComponentTouchDelay$1(component)
            : null
        mirror.parentNode = elementClosest(origTarget, '.fc')
        mirror.revertDuration = options.dragRevertDuration
        const isValid =
          component.isValidSegDownEl(origTarget) &&
          !elementClosest(origTarget, '.fc-event-resizer') // NOT on a resizer
        dragging.setIgnoreMove(!isValid)
        // disable dragging for elements that are resizable (ie, selectable)
        // but are not draggable
        _this.isDragging =
          isValid && ev.subjectEl.classList.contains('fc-event-draggable')
      }
      _this.handleDragStart = function (ev) {
        const initialContext = _this.component.context
        const eventRange = _this.eventRange
        const eventInstanceId = eventRange.instance.instanceId
        if (ev.isTouch) {
          // need to select a different event?
          if (eventInstanceId !== _this.component.props.eventSelection) {
            initialContext.dispatch({
              type: 'SELECT_EVENT',
              eventInstanceId
            })
          }
        } else {
          // if now using mouse, but was previous touch interaction, clear selected event
          initialContext.dispatch({ type: 'UNSELECT_EVENT' })
        }
        if (_this.isDragging) {
          initialContext.calendarApi.unselect(ev) // unselect *date* selection
          initialContext.emitter.trigger('eventDragStart', {
            el: _this.subjectEl,
            event: new EventApi(
              initialContext,
              eventRange.def,
              eventRange.instance
            ),
            jsEvent: ev.origEvent,
            view: initialContext.viewApi
          })
        }
      }
      _this.handleHitUpdate = function (hit, isFinal) {
        if (!_this.isDragging) {
          return
        }
        const relevantEvents = _this.relevantEvents
        const initialHit = _this.hitDragging.initialHit
        const initialContext = _this.component.context
        // states based on new hit
        let receivingContext = null
        let mutation = null
        let mutatedRelevantEvents = null
        let isInvalid = false
        const interaction = {
          affectedEvents: relevantEvents,
          mutatedEvents: createEmptyEventStore(),
          isEvent: true
        }
        if (hit) {
          const receivingComponent = hit.component
          receivingContext = receivingComponent.context
          const receivingOptions = receivingContext.options
          if (
            initialContext === receivingContext ||
            (receivingOptions.editable && receivingOptions.droppable)
          ) {
            mutation = computeEventMutation(
              initialHit,
              hit,
              receivingContext.getCurrentData().pluginHooks
                .eventDragMutationMassagers
            )
            if (mutation) {
              mutatedRelevantEvents = applyMutationToEventStore(
                relevantEvents,
                receivingContext.getCurrentData().eventUiBases,
                mutation,
                receivingContext
              )
              interaction.mutatedEvents = mutatedRelevantEvents
              if (!receivingComponent.isInteractionValid(interaction)) {
                isInvalid = true
                mutation = null
                mutatedRelevantEvents = null
                interaction.mutatedEvents = createEmptyEventStore()
              }
            }
          } else {
            receivingContext = null
          }
        }
        _this.displayDrag(receivingContext, interaction)
        if (!isInvalid) {
          enableCursor()
        } else {
          disableCursor()
        }
        if (!isFinal) {
          if (
            initialContext === receivingContext && // TODO: write test for this
            isHitsEqual(initialHit, hit)
          ) {
            mutation = null
          }
          _this.dragging.setMirrorNeedsRevert(!mutation)
          // render the mirror if no already-rendered mirror
          // TODO: wish we could somehow wait for dispatch to guarantee render
          _this.dragging.setMirrorIsVisible(
            !hit || !document.querySelector('.fc-event-mirror')
          )
          // assign states based on new hit
          _this.receivingContext = receivingContext
          _this.validMutation = mutation
          _this.mutatedRelevantEvents = mutatedRelevantEvents
        }
      }
      _this.handlePointerUp = function () {
        if (!_this.isDragging) {
          _this.cleanup() // because handleDragEnd won't fire
        }
      }
      _this.handleDragEnd = function (ev) {
        if (_this.isDragging) {
          const initialContext_1 = _this.component.context
          const initialView = initialContext_1.viewApi
          const _a = _this
          const receivingContext_1 = _a.receivingContext
          const validMutation = _a.validMutation
          const eventDef = _this.eventRange.def
          const eventInstance = _this.eventRange.instance
          const eventApi = new EventApi(
            initialContext_1,
            eventDef,
            eventInstance
          )
          const relevantEvents_1 = _this.relevantEvents
          const mutatedRelevantEvents_1 = _this.mutatedRelevantEvents
          const finalHit = _this.hitDragging.finalHit
          _this.clearDrag() // must happen after revert animation
          initialContext_1.emitter.trigger('eventDragStop', {
            el: _this.subjectEl,
            event: eventApi,
            jsEvent: ev.origEvent,
            view: initialView
          })
          if (validMutation) {
            // dropped within same calendar
            if (receivingContext_1 === initialContext_1) {
              const updatedEventApi = new EventApi(
                initialContext_1,
                mutatedRelevantEvents_1.defs[eventDef.defId],
                eventInstance
                  ? mutatedRelevantEvents_1.instances[eventInstance.instanceId]
                  : null
              )
              initialContext_1.dispatch({
                type: 'MERGE_EVENTS',
                eventStore: mutatedRelevantEvents_1
              })
              const eventChangeArg = {
                oldEvent: eventApi,
                event: updatedEventApi,
                relatedEvents: buildEventApis(
                  mutatedRelevantEvents_1,
                  initialContext_1,
                  eventInstance
                ),
                revert: function () {
                  initialContext_1.dispatch({
                    type: 'MERGE_EVENTS',
                    eventStore: relevantEvents_1 // the pre-change data
                  })
                }
              }
              const transformed = {}
              for (
                let _i = 0,
                  _b =
                    initialContext_1.getCurrentData().pluginHooks
                      .eventDropTransformers;
                _i < _b.length;
                _i++
              ) {
                const transformer = _b[_i]
                __assign(
                  transformed,
                  transformer(validMutation, initialContext_1)
                )
              }
              initialContext_1.emitter.trigger(
                'eventDrop',
                __assign(__assign(__assign({}, eventChangeArg), transformed), {
                  el: ev.subjectEl,
                  delta: validMutation.datesDelta,
                  jsEvent: ev.origEvent,
                  view: initialView
                })
              )
              initialContext_1.emitter.trigger('eventChange', eventChangeArg)
              // dropped in different calendar
            } else if (receivingContext_1) {
              const eventRemoveArg = {
                event: eventApi,
                relatedEvents: buildEventApis(
                  relevantEvents_1,
                  initialContext_1,
                  eventInstance
                ),
                revert: function () {
                  initialContext_1.dispatch({
                    type: 'MERGE_EVENTS',
                    eventStore: relevantEvents_1
                  })
                }
              }
              initialContext_1.emitter.trigger(
                'eventLeave',
                __assign(__assign({}, eventRemoveArg), {
                  draggedEl: ev.subjectEl,
                  view: initialView
                })
              )
              initialContext_1.dispatch({
                type: 'REMOVE_EVENTS',
                eventStore: relevantEvents_1
              })
              initialContext_1.emitter.trigger('eventRemove', eventRemoveArg)
              const addedEventDef = mutatedRelevantEvents_1.defs[eventDef.defId]
              const addedEventInstance =
                mutatedRelevantEvents_1.instances[eventInstance.instanceId]
              const addedEventApi = new EventApi(
                receivingContext_1,
                addedEventDef,
                addedEventInstance
              )
              receivingContext_1.dispatch({
                type: 'MERGE_EVENTS',
                eventStore: mutatedRelevantEvents_1
              })
              const eventAddArg = {
                event: addedEventApi,
                relatedEvents: buildEventApis(
                  mutatedRelevantEvents_1,
                  receivingContext_1,
                  addedEventInstance
                ),
                revert: function () {
                  receivingContext_1.dispatch({
                    type: 'REMOVE_EVENTS',
                    eventStore: mutatedRelevantEvents_1
                  })
                }
              }
              receivingContext_1.emitter.trigger('eventAdd', eventAddArg)
              if (ev.isTouch) {
                receivingContext_1.dispatch({
                  type: 'SELECT_EVENT',
                  eventInstanceId: eventInstance.instanceId
                })
              }
              receivingContext_1.emitter.trigger(
                'drop',
                __assign(
                  __assign(
                    {},
                    buildDatePointApiWithContext(
                      finalHit.dateSpan,
                      receivingContext_1
                    )
                  ),
                  {
                    draggedEl: ev.subjectEl,
                    jsEvent: ev.origEvent,
                    view: finalHit.component.context.viewApi
                  }
                )
              )
              receivingContext_1.emitter.trigger(
                'eventReceive',
                __assign(__assign({}, eventAddArg), {
                  draggedEl: ev.subjectEl,
                  view: finalHit.component.context.viewApi
                })
              )
            }
          } else {
            initialContext_1.emitter.trigger('_noEventDrop')
          }
        }
        _this.cleanup()
      }
      const component = _this.component
      const options = component.context.options
      const dragging = (_this.dragging = new FeaturefulElementDragging(
        settings.el
      ))
      dragging.pointer.selector = EventDragging.SELECTOR
      dragging.touchScrollAllowed = false
      dragging.autoScroller.isEnabled = options.dragScroll
      const hitDragging = (_this.hitDragging = new HitDragging(
        _this.dragging,
        interactionSettingsStore
      ))
      hitDragging.useSubjectCenter = settings.useEventCenter
      hitDragging.emitter.on('pointerdown', _this.handlePointerDown)
      hitDragging.emitter.on('dragstart', _this.handleDragStart)
      hitDragging.emitter.on('hitupdate', _this.handleHitUpdate)
      hitDragging.emitter.on('pointerup', _this.handlePointerUp)
      hitDragging.emitter.on('dragend', _this.handleDragEnd)
      return _this
    }

    EventDragging.prototype.destroy = function () {
      this.dragging.destroy()
    }
    // render a drag state on the next receivingCalendar
    EventDragging.prototype.displayDrag = function (nextContext, state) {
      const initialContext = this.component.context
      const prevContext = this.receivingContext
      // does the previous calendar need to be cleared?
      if (prevContext && prevContext !== nextContext) {
        // does the initial calendar need to be cleared?
        // if so, don't clear all the way. we still need to to hide the affectedEvents
        if (prevContext === initialContext) {
          prevContext.dispatch({
            type: 'SET_EVENT_DRAG',
            state: {
              affectedEvents: state.affectedEvents,
              mutatedEvents: createEmptyEventStore(),
              isEvent: true
            }
          })
          // completely clear the old calendar if it wasn't the initial
        } else {
          prevContext.dispatch({ type: 'UNSET_EVENT_DRAG' })
        }
      }
      if (nextContext) {
        nextContext.dispatch({ type: 'SET_EVENT_DRAG', state })
      }
    }
    EventDragging.prototype.clearDrag = function () {
      const initialCalendar = this.component.context
      const receivingContext = this.receivingContext
      if (receivingContext) {
        receivingContext.dispatch({ type: 'UNSET_EVENT_DRAG' })
      }
      // the initial calendar might have an dummy drag state from displayDrag
      if (initialCalendar !== receivingContext) {
        initialCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' })
      }
    }
    EventDragging.prototype.cleanup = function () {
      this.subjectSeg = null
      this.isDragging = false
      this.eventRange = null
      this.relevantEvents = null
      this.receivingContext = null
      this.validMutation = null
      this.mutatedRelevantEvents = null
    }
    // TODO: test this in IE11
    // QUESTION: why do we need it on the resizable???
    EventDragging.SELECTOR = '.fc-event-draggable, .fc-event-resizable'
    return EventDragging
  })(Interaction)

  function computeEventMutation (hit0, hit1, massagers) {
    const dateSpan0 = hit0.dateSpan
    const dateSpan1 = hit1.dateSpan
    let date0 = dateSpan0.range.start
    const date1 = dateSpan1.range.start
    const standardProps = {}
    if (dateSpan0.allDay !== dateSpan1.allDay) {
      standardProps.allDay = dateSpan1.allDay
      standardProps.hasEnd =
        hit1.component.context.options.allDayMaintainDuration
      if (dateSpan1.allDay) {
        // means date1 is already start-of-day,
        // but date0 needs to be converted
        date0 = startOfDay(date0)
      }
    }
    const delta = diffDates(
      date0,
      date1,
      hit0.component.context.dateEnv,
      hit0.component === hit1.component ? hit0.component.largeUnit : null
    )
    if (delta.milliseconds) {
      // has hours/minutes/seconds
      standardProps.allDay = false
    }
    const mutation = {
      datesDelta: delta,
      standardProps
    }
    for (let _i = 0, massagers_1 = massagers; _i < massagers_1.length; _i++) {
      const massager = massagers_1[_i]
      massager(mutation, hit0, hit1)
    }
    return mutation
  }

  function getComponentTouchDelay$1 (component) {
    const options = component.context.options
    let delay = options.eventLongPressDelay
    if (delay == null) {
      delay = options.longPressDelay
    }
    return delay
  }

  const EventResizing = /** @class */ (function (_super) {
    __extends(EventResizing, _super)

    function EventResizing (settings) {
      const _this = _super.call(this, settings) || this
      // internal state
      _this.draggingSegEl = null
      _this.draggingSeg = null // TODO: rename to resizingSeg? subjectSeg?
      _this.eventRange = null
      _this.relevantEvents = null
      _this.validMutation = null
      _this.mutatedRelevantEvents = null
      _this.handlePointerDown = function (ev) {
        const component = _this.component
        const segEl = _this.querySegEl(ev)
        const seg = getElSeg(segEl)
        const eventRange = (_this.eventRange = seg.eventRange)
        _this.dragging.minDistance =
          component.context.options.eventDragMinDistance
        // if touch, need to be working with a selected event
        _this.dragging.setIgnoreMove(
          !_this.component.isValidSegDownEl(ev.origEvent.target) ||
            (ev.isTouch &&
              _this.component.props.eventSelection !==
                eventRange.instance.instanceId)
        )
      }
      _this.handleDragStart = function (ev) {
        const context = _this.component.context
        const eventRange = _this.eventRange
        _this.relevantEvents = getRelevantEvents(
          context.getCurrentData().eventStore,
          _this.eventRange.instance.instanceId
        )
        const segEl = _this.querySegEl(ev)
        _this.draggingSegEl = segEl
        _this.draggingSeg = getElSeg(segEl)
        context.calendarApi.unselect()
        context.emitter.trigger('eventResizeStart', {
          el: segEl,
          event: new EventApi(context, eventRange.def, eventRange.instance),
          jsEvent: ev.origEvent,
          view: context.viewApi
        })
      }
      _this.handleHitUpdate = function (hit, isFinal, ev) {
        const context = _this.component.context
        const relevantEvents = _this.relevantEvents
        const initialHit = _this.hitDragging.initialHit
        const eventInstance = _this.eventRange.instance
        let mutation = null
        let mutatedRelevantEvents = null
        let isInvalid = false
        const interaction = {
          affectedEvents: relevantEvents,
          mutatedEvents: createEmptyEventStore(),
          isEvent: true
        }
        if (hit) {
          mutation = computeMutation(
            initialHit,
            hit,
            ev.subjectEl.classList.contains('fc-event-resizer-start'),
            eventInstance.range,
            context.pluginHooks.eventResizeJoinTransforms
          )
        }
        if (mutation) {
          mutatedRelevantEvents = applyMutationToEventStore(
            relevantEvents,
            context.getCurrentData().eventUiBases,
            mutation,
            context
          )
          interaction.mutatedEvents = mutatedRelevantEvents
          if (!_this.component.isInteractionValid(interaction)) {
            isInvalid = true
            mutation = null
            mutatedRelevantEvents = null
            interaction.mutatedEvents = null
          }
        }
        if (mutatedRelevantEvents) {
          context.dispatch({
            type: 'SET_EVENT_RESIZE',
            state: interaction
          })
        } else {
          context.dispatch({ type: 'UNSET_EVENT_RESIZE' })
        }
        if (!isInvalid) {
          enableCursor()
        } else {
          disableCursor()
        }
        if (!isFinal) {
          if (mutation && isHitsEqual(initialHit, hit)) {
            mutation = null
          }
          _this.validMutation = mutation
          _this.mutatedRelevantEvents = mutatedRelevantEvents
        }
      }
      _this.handleDragEnd = function (ev) {
        const context = _this.component.context
        const eventDef = _this.eventRange.def
        const eventInstance = _this.eventRange.instance
        const eventApi = new EventApi(context, eventDef, eventInstance)
        const relevantEvents = _this.relevantEvents
        const mutatedRelevantEvents = _this.mutatedRelevantEvents
        context.emitter.trigger('eventResizeStop', {
          el: _this.draggingSegEl,
          event: eventApi,
          jsEvent: ev.origEvent,
          view: context.viewApi
        })
        if (_this.validMutation) {
          const updatedEventApi = new EventApi(
            context,
            mutatedRelevantEvents.defs[eventDef.defId],
            eventInstance
              ? mutatedRelevantEvents.instances[eventInstance.instanceId]
              : null
          )
          context.dispatch({
            type: 'MERGE_EVENTS',
            eventStore: mutatedRelevantEvents
          })
          const eventChangeArg = {
            oldEvent: eventApi,
            event: updatedEventApi,
            relatedEvents: buildEventApis(
              mutatedRelevantEvents,
              context,
              eventInstance
            ),
            revert: function () {
              context.dispatch({
                type: 'MERGE_EVENTS',
                eventStore: relevantEvents // the pre-change events
              })
            }
          }
          context.emitter.trigger(
            'eventResize',
            __assign(__assign({}, eventChangeArg), {
              el: _this.draggingSegEl,
              startDelta: _this.validMutation.startDelta || createDuration(0),
              endDelta: _this.validMutation.endDelta || createDuration(0),
              jsEvent: ev.origEvent,
              view: context.viewApi
            })
          )
          context.emitter.trigger('eventChange', eventChangeArg)
        } else {
          context.emitter.trigger('_noEventResize')
        }
        // reset all internal state
        _this.draggingSeg = null
        _this.relevantEvents = null
        _this.validMutation = null
        // okay to keep eventInstance around. useful to set it in handlePointerDown
      }
      const component = settings.component
      const dragging = (_this.dragging = new FeaturefulElementDragging(
        settings.el
      ))
      dragging.pointer.selector = '.fc-event-resizer'
      dragging.touchScrollAllowed = false
      dragging.autoScroller.isEnabled = component.context.options.dragScroll
      const hitDragging = (_this.hitDragging = new HitDragging(
        _this.dragging,
        interactionSettingsToStore(settings)
      ))
      hitDragging.emitter.on('pointerdown', _this.handlePointerDown)
      hitDragging.emitter.on('dragstart', _this.handleDragStart)
      hitDragging.emitter.on('hitupdate', _this.handleHitUpdate)
      hitDragging.emitter.on('dragend', _this.handleDragEnd)
      return _this
    }

    EventResizing.prototype.destroy = function () {
      this.dragging.destroy()
    }
    EventResizing.prototype.querySegEl = function (ev) {
      return elementClosest(ev.subjectEl, '.fc-event')
    }
    return EventResizing
  })(Interaction)

  function computeMutation (hit0, hit1, isFromStart, instanceRange, transforms) {
    const dateEnv = hit0.component.context.dateEnv
    const date0 = hit0.dateSpan.range.start
    const date1 = hit1.dateSpan.range.start
    const delta = diffDates(date0, date1, dateEnv, hit0.component.largeUnit)
    const props = {}
    for (
      let _i = 0, transforms_1 = transforms;
      _i < transforms_1.length;
      _i++
    ) {
      const transform = transforms_1[_i]
      const res = transform(hit0, hit1)
      if (res === false) {
        return null
      } else if (res) {
        __assign(props, res)
      }
    }
    if (isFromStart) {
      if (dateEnv.add(instanceRange.start, delta) < instanceRange.end) {
        props.startDelta = delta
        return props
      }
    } else {
      if (dateEnv.add(instanceRange.end, delta) > instanceRange.start) {
        props.endDelta = delta
        return props
      }
    }
    return null
  }

  const UnselectAuto = /** @class */ (function () {
    function UnselectAuto (context) {
      const _this = this
      this.context = context
      this.isRecentPointerDateSelect = false // wish we could use a selector to detect date selection, but uses hit system
      this.matchesCancel = false
      this.matchesEvent = false
      this.onSelect = function (selectInfo) {
        if (selectInfo.jsEvent) {
          _this.isRecentPointerDateSelect = true
        }
      }
      this.onDocumentPointerDown = function (pev) {
        const unselectCancel = _this.context.options.unselectCancel
        const downEl = pev.origEvent.target
        _this.matchesCancel = !!elementClosest(downEl, unselectCancel)
        _this.matchesEvent = !!elementClosest(downEl, EventDragging.SELECTOR) // interaction started on an event?
      }
      this.onDocumentPointerUp = function (pev) {
        const context = _this.context
        const documentPointer = _this.documentPointer
        const calendarState = context.getCurrentData()
        // touch-scrolling should never unfocus any type of selection
        if (!documentPointer.wasTouchScroll) {
          if (
            calendarState.dateSelection && // an existing date selection?
            !_this.isRecentPointerDateSelect // a new pointer-initiated date selection since last onDocumentPointerUp?
          ) {
            const unselectAuto = context.options.unselectAuto
            if (unselectAuto && (!unselectAuto || !_this.matchesCancel)) {
              context.calendarApi.unselect(pev)
            }
          }
          if (
            calendarState.eventSelection && // an existing event selected?
            !_this.matchesEvent // interaction DIDN'T start on an event
          ) {
            context.dispatch({ type: 'UNSELECT_EVENT' })
          }
        }
        _this.isRecentPointerDateSelect = false
      }
      const documentPointer = (this.documentPointer = new PointerDragging(
        document
      ))
      documentPointer.shouldIgnoreMove = true
      documentPointer.shouldWatchScroll = false
      documentPointer.emitter.on('pointerdown', this.onDocumentPointerDown)
      documentPointer.emitter.on('pointerup', this.onDocumentPointerUp)
      /*
            TODO: better way to know about whether there was a selection with the pointer
            */
      context.emitter.on('select', this.onSelect)
    }

    UnselectAuto.prototype.destroy = function () {
      this.context.emitter.off('select', this.onSelect)
      this.documentPointer.destroy()
    }
    return UnselectAuto
  })()

  const LISTENER_REFINERS = {
    dateClick: identity,
    eventDragStart: identity,
    eventDragStop: identity,
    eventDrop: identity,
    eventResizeStart: identity,
    eventResizeStop: identity,
    eventResize: identity,
    drop: identity,
    eventReceive: identity,
    eventLeave: identity
  }

  /*
    Given an already instantiated draggable object for one-or-more elements,
    Interprets any dragging as an attempt to drag an events that lives outside
    of a calendar onto a calendar.
    */
  const ExternalElementDragging = /** @class */ (function () {
    function ExternalElementDragging (dragging, suppliedDragMeta) {
      const _this = this
      this.receivingContext = null
      this.droppableEvent = null // will exist for all drags, even if create:false
      this.suppliedDragMeta = null
      this.dragMeta = null
      this.handleDragStart = function (ev) {
        _this.dragMeta = _this.buildDragMeta(ev.subjectEl)
      }
      this.handleHitUpdate = function (hit, isFinal, ev) {
        const dragging = _this.hitDragging.dragging
        let receivingContext = null
        let droppableEvent = null
        let isInvalid = false
        const interaction = {
          affectedEvents: createEmptyEventStore(),
          mutatedEvents: createEmptyEventStore(),
          isEvent: _this.dragMeta.create
        }
        if (hit) {
          receivingContext = hit.component.context
          if (_this.canDropElOnCalendar(ev.subjectEl, receivingContext)) {
            droppableEvent = computeEventForDateSpan(
              hit.dateSpan,
              _this.dragMeta,
              receivingContext
            )
            interaction.mutatedEvents = eventTupleToStore(droppableEvent)
            isInvalid = !isInteractionValid(interaction, receivingContext)
            if (isInvalid) {
              interaction.mutatedEvents = createEmptyEventStore()
              droppableEvent = null
            }
          }
        }
        _this.displayDrag(receivingContext, interaction)
        // show mirror if no already-rendered mirror element OR if we are shutting down the mirror (?)
        // TODO: wish we could somehow wait for dispatch to guarantee render
        dragging.setMirrorIsVisible(
          isFinal ||
            !droppableEvent ||
            !document.querySelector('.fc-event-mirror')
        )
        if (!isInvalid) {
          enableCursor()
        } else {
          disableCursor()
        }
        if (!isFinal) {
          dragging.setMirrorNeedsRevert(!droppableEvent)
          _this.receivingContext = receivingContext
          _this.droppableEvent = droppableEvent
        }
      }
      this.handleDragEnd = function (pev) {
        const _a = _this
        const receivingContext = _a.receivingContext
        const droppableEvent = _a.droppableEvent
        _this.clearDrag()
        if (receivingContext && droppableEvent) {
          const finalHit = _this.hitDragging.finalHit
          const finalView = finalHit.component.context.viewApi
          const dragMeta = _this.dragMeta
          receivingContext.emitter.trigger(
            'drop',
            __assign(
              __assign(
                {},
                buildDatePointApiWithContext(
                  finalHit.dateSpan,
                  receivingContext
                )
              ),
              {
                draggedEl: pev.subjectEl,
                jsEvent: pev.origEvent,
                view: finalView
              }
            )
          )
          if (dragMeta.create) {
            const addingEvents_1 = eventTupleToStore(droppableEvent)
            receivingContext.dispatch({
              type: 'MERGE_EVENTS',
              eventStore: addingEvents_1
            })
            if (pev.isTouch) {
              receivingContext.dispatch({
                type: 'SELECT_EVENT',
                eventInstanceId: droppableEvent.instance.instanceId
              })
            }
            // signal that an external event landed
            receivingContext.emitter.trigger('eventReceive', {
              event: new EventApi(
                receivingContext,
                droppableEvent.def,
                droppableEvent.instance
              ),
              relatedEvents: [],
              revert: function () {
                receivingContext.dispatch({
                  type: 'REMOVE_EVENTS',
                  eventStore: addingEvents_1
                })
              },
              draggedEl: pev.subjectEl,
              view: finalView
            })
          }
        }
        _this.receivingContext = null
        _this.droppableEvent = null
      }
      const hitDragging = (this.hitDragging = new HitDragging(
        dragging,
        interactionSettingsStore
      ))
      hitDragging.requireInitial = false // will start outside of a component
      hitDragging.emitter.on('dragstart', this.handleDragStart)
      hitDragging.emitter.on('hitupdate', this.handleHitUpdate)
      hitDragging.emitter.on('dragend', this.handleDragEnd)
      this.suppliedDragMeta = suppliedDragMeta
    }

    ExternalElementDragging.prototype.buildDragMeta = function (subjectEl) {
      if (typeof this.suppliedDragMeta === 'object') {
        return parseDragMeta(this.suppliedDragMeta)
      } else if (typeof this.suppliedDragMeta === 'function') {
        return parseDragMeta(this.suppliedDragMeta(subjectEl))
      } else {
        return getDragMetaFromEl(subjectEl)
      }
    }
    ExternalElementDragging.prototype.displayDrag = function (
      nextContext,
      state
    ) {
      const prevContext = this.receivingContext
      if (prevContext && prevContext !== nextContext) {
        prevContext.dispatch({ type: 'UNSET_EVENT_DRAG' })
      }
      if (nextContext) {
        nextContext.dispatch({ type: 'SET_EVENT_DRAG', state })
      }
    }
    ExternalElementDragging.prototype.clearDrag = function () {
      if (this.receivingContext) {
        this.receivingContext.dispatch({ type: 'UNSET_EVENT_DRAG' })
      }
    }
    ExternalElementDragging.prototype.canDropElOnCalendar = function (
      el,
      receivingContext
    ) {
      const dropAccept = receivingContext.options.dropAccept
      if (typeof dropAccept === 'function') {
        return dropAccept.call(receivingContext.calendarApi, el)
      } else if (typeof dropAccept === 'string' && dropAccept) {
        return Boolean(elementMatches(el, dropAccept))
      }
      return true
    }
    return ExternalElementDragging
  })()
  // Utils for computing event store from the DragMeta
  // ----------------------------------------------------------------------------------------------------
  function computeEventForDateSpan (dateSpan, dragMeta, context) {
    const defProps = __assign({}, dragMeta.leftoverProps)
    for (
      let _i = 0, _a = context.pluginHooks.externalDefTransforms;
      _i < _a.length;
      _i++
    ) {
      const transform = _a[_i]
      __assign(defProps, transform(dateSpan, dragMeta))
    }
    const _b = refineEventDef(defProps, context)
    const refined = _b.refined
    const extra = _b.extra
    const def = parseEventDef(
      refined,
      extra,
      dragMeta.sourceId,
      dateSpan.allDay,
      context.options.forceEventDuration || Boolean(dragMeta.duration), // hasEnd
      context
    )
    let start = dateSpan.range.start
    // only rely on time info if drop zone is all-day,
    // otherwise, we already know the time
    if (dateSpan.allDay && dragMeta.startTime) {
      start = context.dateEnv.add(start, dragMeta.startTime)
    }
    const end = dragMeta.duration
      ? context.dateEnv.add(start, dragMeta.duration)
      : getDefaultEventEnd(dateSpan.allDay, start, context)
    const instance = createEventInstance(def.defId, { start, end })
    return { def, instance }
  }

  // Utils for extracting data from element
  // ----------------------------------------------------------------------------------------------------
  function getDragMetaFromEl (el) {
    const str = getEmbeddedElData(el, 'event')
    const obj = str ? JSON.parse(str) : { create: false } // if no embedded data, assume no event creation
    return parseDragMeta(obj)
  }

  config.dataAttrPrefix = ''

  function getEmbeddedElData (el, name) {
    const prefix = config.dataAttrPrefix
    const prefixedName = (prefix ? prefix + '-' : '') + name
    return el.getAttribute('data-' + prefixedName) || ''
  }

  /*
    Makes an element (that is *external* to any calendar) draggable.
    Can pass in data that determines how an event will be created when dropped onto a calendar.
    Leverages FullCalendar's internal drag-n-drop functionality WITHOUT a third-party drag system.
    */
  const ExternalDraggable = /** @class */ (function () {
    function ExternalDraggable (el, settings) {
      const _this = this
      if (settings === void 0) {
        settings = {}
      }
      this.handlePointerDown = function (ev) {
        const dragging = _this.dragging
        const _a = _this.settings
        const minDistance = _a.minDistance
        const longPressDelay = _a.longPressDelay
        dragging.minDistance =
          minDistance != null
            ? minDistance
            : ev.isTouch
              ? 0
              : BASE_OPTION_DEFAULTS.eventDragMinDistance
        dragging.delay = ev.isTouch // TODO: eventually read eventLongPressDelay instead vvv
          ? longPressDelay != null
            ? longPressDelay
            : BASE_OPTION_DEFAULTS.longPressDelay
          : 0
      }
      this.handleDragStart = function (ev) {
        if (
          ev.isTouch &&
          _this.dragging.delay &&
          ev.subjectEl.classList.contains('fc-event')
        ) {
          _this.dragging.mirror
            .getMirrorEl()
            .classList.add('fc-event-selected')
        }
      }
      this.settings = settings
      const dragging = (this.dragging = new FeaturefulElementDragging(el))
      dragging.touchScrollAllowed = false
      if (settings.itemSelector != null) {
        dragging.pointer.selector = settings.itemSelector
      }
      if (settings.appendTo != null) {
        dragging.mirror.parentNode = settings.appendTo // TODO: write tests
      }
      dragging.emitter.on('pointerdown', this.handlePointerDown)
      dragging.emitter.on('dragstart', this.handleDragStart)
      new ExternalElementDragging(dragging, settings.eventData)
    }

    ExternalDraggable.prototype.destroy = function () {
      this.dragging.destroy()
    }
    return ExternalDraggable
  })()

  /*
    Detects when a *THIRD-PARTY* drag-n-drop system interacts with elements.
    The third-party system is responsible for drawing the visuals effects of the drag.
    This class simply monitors for pointer movements and fires events.
    It also has the ability to hide the moving element (the "mirror") during the drag.
    */
  const InferredElementDragging = /** @class */ (function (_super) {
    __extends(InferredElementDragging, _super)

    function InferredElementDragging (containerEl) {
      const _this = _super.call(this, containerEl) || this
      _this.shouldIgnoreMove = false
      _this.mirrorSelector = ''
      _this.currentMirrorEl = null
      _this.handlePointerDown = function (ev) {
        _this.emitter.trigger('pointerdown', ev)
        if (!_this.shouldIgnoreMove) {
          // fire dragstart right away. does not support delay or min-distance
          _this.emitter.trigger('dragstart', ev)
        }
      }
      _this.handlePointerMove = function (ev) {
        if (!_this.shouldIgnoreMove) {
          _this.emitter.trigger('dragmove', ev)
        }
      }
      _this.handlePointerUp = function (ev) {
        _this.emitter.trigger('pointerup', ev)
        if (!_this.shouldIgnoreMove) {
          // fire dragend right away. does not support a revert animation
          _this.emitter.trigger('dragend', ev)
        }
      }
      const pointer = (_this.pointer = new PointerDragging(containerEl))
      pointer.emitter.on('pointerdown', _this.handlePointerDown)
      pointer.emitter.on('pointermove', _this.handlePointerMove)
      pointer.emitter.on('pointerup', _this.handlePointerUp)
      return _this
    }

    InferredElementDragging.prototype.destroy = function () {
      this.pointer.destroy()
    }
    InferredElementDragging.prototype.setIgnoreMove = function (bool) {
      this.shouldIgnoreMove = bool
    }
    InferredElementDragging.prototype.setMirrorIsVisible = function (bool) {
      if (bool) {
        // restore a previously hidden element.
        // use the reference in case the selector class has already been removed.
        if (this.currentMirrorEl) {
          this.currentMirrorEl.style.visibility = ''
          this.currentMirrorEl = null
        }
      } else {
        const mirrorEl = this.mirrorSelector
          ? document.querySelector(this.mirrorSelector)
          : null
        if (mirrorEl) {
          this.currentMirrorEl = mirrorEl
          mirrorEl.style.visibility = 'hidden'
        }
      }
    }
    return InferredElementDragging
  })(ElementDragging)

  /*
    Bridges third-party drag-n-drop systems with FullCalendar.
    Must be instantiated and destroyed by caller.
    */
  const ThirdPartyDraggable = /** @class */ (function () {
    function ThirdPartyDraggable (containerOrSettings, settings) {
      let containerEl = document
      if (
        // wish we could just test instanceof EventTarget, but doesn't work in IE11
        containerOrSettings === document ||
        containerOrSettings instanceof Element
      ) {
        containerEl = containerOrSettings
        settings = settings || {}
      } else {
        settings = containerOrSettings || {}
      }
      const dragging = (this.dragging = new InferredElementDragging(containerEl))
      if (typeof settings.itemSelector === 'string') {
        dragging.pointer.selector = settings.itemSelector
      } else if (containerEl === document) {
        dragging.pointer.selector = '[data-event]'
      }
      if (typeof settings.mirrorSelector === 'string') {
        dragging.mirrorSelector = settings.mirrorSelector
      }
      new ExternalElementDragging(dragging, settings.eventData)
    }

    ThirdPartyDraggable.prototype.destroy = function () {
      this.dragging.destroy()
    }
    return ThirdPartyDraggable
  })()

  const interactionPlugin = createPlugin({
    componentInteractions: [
      DateClicking,
      DateSelecting,
      EventDragging,
      EventResizing
    ],
    calendarInteractions: [UnselectAuto],
    elementDraggingImpl: FeaturefulElementDragging,
    listenerRefiners: LISTENER_REFINERS
  })

  /* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
    ---------------------------------------------------------------------------------------------------------------------- */
  // It is a manager for a Table subcomponent, which does most of the heavy lifting.
  // It is responsible for managing width/height.
  const TableView = /** @class */ (function (_super) {
    __extends(TableView, _super)

    function TableView () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.headerElRef = createRef()
      return _this
    }

    TableView.prototype.renderSimpleLayout = function (
      headerRowContent,
      bodyContent
    ) {
      const _a = this
      const props = _a.props
      const context = _a.context
      const sections = []
      const stickyHeaderDates = getStickyHeaderDates(context.options)
      if (headerRowContent) {
        sections.push({
          type: 'header',
          key: 'header',
          isSticky: stickyHeaderDates,
          chunk: {
            elRef: this.headerElRef,
            tableClassName: 'fc-col-header',
            rowContent: headerRowContent
          }
        })
      }
      sections.push({
        type: 'body',
        key: 'body',
        liquid: true,
        chunk: { content: bodyContent }
      })
      return createElement(
        ViewRoot,
        { viewSpec: context.viewSpec },
        function (rootElRef, classNames) {
          return createElement(
            'div',
            {
              ref: rootElRef,
              className: ['fc-daygrid'].concat(classNames).join(' ')
            },
            createElement(SimpleScrollGrid, {
              liquid: !props.isHeightAuto && !props.forPrint,
              cols: [] /* TODO: make optional? */,
              sections
            })
          )
        }
      )
    }
    TableView.prototype.renderHScrollLayout = function (
      headerRowContent,
      bodyContent,
      colCnt,
      dayMinWidth
    ) {
      const ScrollGrid = this.context.pluginHooks.scrollGridImpl
      if (!ScrollGrid) {
        throw new Error('No ScrollGrid implementation')
      }
      const _a = this
      const props = _a.props
      const context = _a.context
      const stickyHeaderDates =
        !props.forPrint && getStickyHeaderDates(context.options)
      const stickyFooterScrollbar =
        !props.forPrint && getStickyFooterScrollbar(context.options)
      const sections = []
      if (headerRowContent) {
        sections.push({
          type: 'header',
          key: 'header',
          isSticky: stickyHeaderDates,
          chunks: [
            {
              key: 'main',
              elRef: this.headerElRef,
              tableClassName: 'fc-col-header',
              rowContent: headerRowContent
            }
          ]
        })
      }
      sections.push({
        type: 'body',
        key: 'body',
        liquid: true,
        chunks: [
          {
            key: 'main',
            content: bodyContent
          }
        ]
      })
      if (stickyFooterScrollbar) {
        sections.push({
          type: 'footer',
          key: 'footer',
          isSticky: true,
          chunks: [
            {
              key: 'main',
              content: renderScrollShim
            }
          ]
        })
      }
      return createElement(
        ViewRoot,
        { viewSpec: context.viewSpec },
        function (rootElRef, classNames) {
          return createElement(
            'div',
            {
              ref: rootElRef,
              className: ['fc-daygrid'].concat(classNames).join(' ')
            },
            createElement(ScrollGrid, {
              liquid: !props.isHeightAuto && !props.forPrint,
              colGroups: [{ cols: [{ span: colCnt, minWidth: dayMinWidth }] }],
              sections
            })
          )
        }
      )
    }
    return TableView
  })(DateComponent)

  function splitSegsByRow (segs, rowCnt) {
    const byRow = []
    for (let i = 0; i < rowCnt; i++) {
      byRow[i] = []
    }
    for (let _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
      const seg = segs_1[_i]
      byRow[seg.row].push(seg)
    }
    return byRow
  }

  function splitSegsByFirstCol (segs, colCnt) {
    const byCol = []
    for (let i = 0; i < colCnt; i++) {
      byCol[i] = []
    }
    for (let _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
      const seg = segs_2[_i]
      byCol[seg.firstCol].push(seg)
    }
    return byCol
  }

  function splitInteractionByRow (ui, rowCnt) {
    const byRow = []
    if (!ui) {
      for (var i = 0; i < rowCnt; i++) {
        byRow[i] = null
      }
    } else {
      for (var i = 0; i < rowCnt; i++) {
        byRow[i] = {
          affectedInstances: ui.affectedInstances,
          isEvent: ui.isEvent,
          segs: []
        }
      }
      for (let _i = 0, _a = ui.segs; _i < _a.length; _i++) {
        const seg = _a[_i]
        byRow[seg.row].segs.push(seg)
      }
    }
    return byRow
  }

  const DEFAULT_WEEK_NUM_FORMAT = createFormatter({ week: 'narrow' })
  const TableCell = /** @class */ (function (_super) {
    __extends(TableCell, _super)

    function TableCell () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.handleRootEl = function (el) {
        _this.rootEl = el
        setRef(_this.props.elRef, el)
      }
      _this.handleMoreLinkClick = function (ev) {
        const props = _this.props
        if (props.onMoreClick) {
          const allSegs = props.segsByEachCol
          const hiddenSegs = allSegs.filter(function (seg) {
            return props.segIsHidden[seg.eventRange.instance.instanceId]
          })
          props.onMoreClick({
            date: props.date,
            allSegs,
            hiddenSegs,
            moreCnt: props.moreCnt,
            dayEl: _this.rootEl,
            ev
          })
        }
      }
      return _this
    }

    TableCell.prototype.render = function () {
      const _this = this
      const _a = this.context
      const options = _a.options
      const viewApi = _a.viewApi
      const props = this.props
      const date = props.date
      const dateProfile = props.dateProfile
      const hookProps = {
        num: props.moreCnt,
        text: props.buildMoreLinkText(props.moreCnt),
        view: viewApi
      }
      const navLinkAttrs = options.navLinks
        ? { 'data-navlink': buildNavLinkData(date, 'week'), tabIndex: 0 }
        : {}
      return createElement(
        DayCellRoot,
        {
          date,
          dateProfile,
          todayRange: props.todayRange,
          showDayNumber: props.showDayNumber,
          extraHookProps: props.extraHookProps,
          elRef: this.handleRootEl
        },
        function (rootElRef, classNames, rootDataAttrs, isDisabled) {
          return createElement(
            'td',
            __assign(
              {
                ref: rootElRef,
                className: ['fc-daygrid-day']
                  .concat(classNames, props.extraClassNames || [])
                  .join(' ')
              },
              rootDataAttrs,
              props.extraDataAttrs
            ),
            createElement(
              'div',
              {
                className: 'fc-daygrid-day-frame fc-scrollgrid-sync-inner',
                ref: props.innerElRef /* different from hook system! RENAME */
              },
              props.showWeekNumber &&
                createElement(
                  WeekNumberRoot,
                  {
                    date,
                    defaultFormat: DEFAULT_WEEK_NUM_FORMAT
                  },
                  function (rootElRef, classNames, innerElRef, innerContent) {
                    return createElement(
                      'a',
                      __assign(
                        {
                          ref: rootElRef,
                          className: ['fc-daygrid-week-number']
                            .concat(classNames)
                            .join(' ')
                        },
                        navLinkAttrs
                      ),
                      innerContent
                    )
                  }
                ),
              !isDisabled &&
                createElement(TableCellTop, {
                  date,
                  dateProfile,
                  showDayNumber: props.showDayNumber,
                  forceDayTop: props.forceDayTop,
                  todayRange: props.todayRange,
                  extraHookProps: props.extraHookProps
                }),
              createElement(
                'div',
                {
                  className: 'fc-daygrid-day-events',
                  ref: props.fgContentElRef,
                  style: { paddingBottom: props.fgPaddingBottom }
                },
                props.fgContent,
                Boolean(props.moreCnt) &&
                  createElement(
                    'div',
                    {
                      className: 'fc-daygrid-day-bottom',
                      style: { marginTop: props.moreMarginTop }
                    },
                    createElement(
                      RenderHook,
                      {
                        hookProps,
                        classNames: options.moreLinkClassNames,
                        content: options.moreLinkContent,
                        defaultContent: renderMoreLinkInner,
                        didMount: options.moreLinkDidMount,
                        willUnmount: options.moreLinkWillUnmount
                      },
                      function (
                        rootElRef,
                        classNames,
                        innerElRef,
                        innerContent
                      ) {
                        return createElement(
                          'a',
                          {
                            onClick: _this.handleMoreLinkClick,
                            ref: rootElRef,
                            className: ['fc-daygrid-more-link']
                              .concat(classNames)
                              .join(' ')
                          },
                          innerContent
                        )
                      }
                    )
                  )
              ),
              createElement(
                'div',
                { className: 'fc-daygrid-day-bg' },
                props.bgContent
              )
            )
          )
        }
      )
    }
    return TableCell
  })(DateComponent)

  function renderTopInner (props) {
    return props.dayNumberText
  }

  function renderMoreLinkInner (props) {
    return props.text
  }

  var TableCellTop = /** @class */ (function (_super) {
    __extends(TableCellTop, _super)

    function TableCellTop () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TableCellTop.prototype.render = function () {
      const props = this.props
      const navLinkAttrs = this.context.options.navLinks
        ? { 'data-navlink': buildNavLinkData(props.date), tabIndex: 0 }
        : {}
      return createElement(
        DayCellContent,
        {
          date: props.date,
          dateProfile: props.dateProfile,
          todayRange: props.todayRange,
          showDayNumber: props.showDayNumber,
          extraHookProps: props.extraHookProps,
          defaultContent: renderTopInner
        },
        function (innerElRef, innerContent) {
          return (
            (innerContent || props.forceDayTop) &&
            createElement(
              'div',
              { className: 'fc-daygrid-day-top', ref: innerElRef },
              createElement(
                'a',
                __assign({ className: 'fc-daygrid-day-number' }, navLinkAttrs),
                innerContent || createElement(Fragment, null, '\u00A0')
              )
            )
          )
        }
      )
    }
    return TableCellTop
  })(BaseComponent)

  const DEFAULT_TABLE_EVENT_TIME_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: true,
    meridiem: 'narrow'
  })

  function hasListItemDisplay (seg) {
    const display = seg.eventRange.ui.display
    return (
      display === 'list-item' ||
      (display === 'auto' &&
        !seg.eventRange.def.allDay &&
        seg.firstCol === seg.lastCol && // can't be multi-day
        seg.isStart && // "
        seg.isEnd) // "
    )
  }

  const TableListItemEvent = /** @class */ (function (_super) {
    __extends(TableListItemEvent, _super)

    function TableListItemEvent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TableListItemEvent.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const timeFormat =
        context.options.eventTimeFormat || DEFAULT_TABLE_EVENT_TIME_FORMAT
      const timeText = buildSegTimeText(
        props.seg,
        timeFormat,
        context,
        true,
        props.defaultDisplayEventEnd
      )
      return createElement(
        EventRoot,
        {
          seg: props.seg,
          timeText,
          defaultContent: renderInnerContent$2,
          isDragging: props.isDragging,
          isResizing: false,
          isDateSelecting: false,
          isSelected: props.isSelected,
          isPast: props.isPast,
          isFuture: props.isFuture,
          isToday: props.isToday
        },
        function (rootElRef, classNames, innerElRef, innerContent) {
          return (
            // we don't use styles!
            createElement(
              'a',
              __assign(
                {
                  className: ['fc-daygrid-event', 'fc-daygrid-dot-event']
                    .concat(classNames)
                    .join(' '),
                  ref: rootElRef
                },
                getSegAnchorAttrs$1(props.seg)
              ),
              innerContent
            )
          )
        }
      )
    }
    return TableListItemEvent
  })(BaseComponent)

  function renderInnerContent$2 (innerProps) {
    return createElement(
      Fragment,
      null,
      createElement('div', {
        className: 'fc-daygrid-event-dot',
        style: {
          borderColor: innerProps.borderColor || innerProps.backgroundColor
        }
      }),
      innerProps.timeText &&
        createElement(
          'div',
          { className: 'fc-event-time' },
          innerProps.timeText
        ),
      createElement(
        'div',
        { className: 'fc-event-title' },
        innerProps.event.title || createElement(Fragment, null, '\u00A0')
      )
    )
  }

  function getSegAnchorAttrs$1 (seg) {
    const url = seg.eventRange.def.url
    return url ? { href: url } : {}
  }

  const TableBlockEvent = /** @class */ (function (_super) {
    __extends(TableBlockEvent, _super)

    function TableBlockEvent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TableBlockEvent.prototype.render = function () {
      const props = this.props
      return createElement(
        StandardEvent,
        __assign({}, props, {
          extraClassNames: [
            'fc-daygrid-event',
            'fc-daygrid-block-event',
            'fc-h-event'
          ],
          defaultTimeFormat: DEFAULT_TABLE_EVENT_TIME_FORMAT,
          defaultDisplayEventEnd: props.defaultDisplayEventEnd,
          disableResizing: !props.seg.eventRange.def.allDay
        })
      )
    }
    return TableBlockEvent
  })(BaseComponent)

  function computeFgSegPlacement ( // for one row. TODO: print mode?
    cellModels,
    segs,
    dayMaxEvents,
    dayMaxEventRows,
    eventHeights,
    maxContentHeight,
    colCnt,
    eventOrderSpecs
  ) {
    const colPlacements = [] // if event spans multiple cols, its present in each col
    const moreCnts = [] // by-col
    const segIsHidden = {}
    const segTops = {} // always populated for each seg
    const segMarginTops = {} // simetimes populated for each seg
    const moreTops = {}
    const paddingBottoms = {} // for each cell's inner-wrapper div
    for (let i = 0; i < colCnt; i++) {
      colPlacements.push([])
      moreCnts.push(0)
    }
    segs = sortEventSegs(segs, eventOrderSpecs)
    for (let _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
      var seg = segs_1[_i]
      const instanceId = seg.eventRange.instance.instanceId
      const eventHeight = eventHeights[instanceId + ':' + seg.firstCol]
      placeSeg(seg, eventHeight || 0) // will keep colPlacements sorted by top
    }
    if (dayMaxEvents === true || dayMaxEventRows === true) {
      limitByMaxHeight(moreCnts, segIsHidden, colPlacements, maxContentHeight) // populates moreCnts/segIsHidden
    } else if (typeof dayMaxEvents === 'number') {
      limitByMaxEvents(moreCnts, segIsHidden, colPlacements, dayMaxEvents) // populates moreCnts/segIsHidden
    } else if (typeof dayMaxEventRows === 'number') {
      limitByMaxRows(moreCnts, segIsHidden, colPlacements, dayMaxEventRows) // populates moreCnts/segIsHidden
    }
    // computes segTops/segMarginTops/moreTops/paddingBottoms
    for (let col = 0; col < colCnt; col++) {
      const placements = colPlacements[col]
      let currentNonAbsBottom = 0
      let currentAbsHeight = 0
      for (
        let _a = 0, placements_1 = placements;
        _a < placements_1.length;
        _a++
      ) {
        const placement = placements_1[_a]
        var seg = placement.seg
        if (!segIsHidden[seg.eventRange.instance.instanceId]) {
          segTops[seg.eventRange.instance.instanceId] = placement.top // from top of container
          if (seg.firstCol === seg.lastCol && seg.isStart && seg.isEnd) {
            // TODO: simpler way? NOT DRY
            segMarginTops[seg.eventRange.instance.instanceId] =
              placement.top - currentNonAbsBottom // from previous seg bottom
            currentAbsHeight = 0
            currentNonAbsBottom = placement.bottom
          } else {
            // multi-col event, abs positioned
            currentAbsHeight = placement.bottom - currentNonAbsBottom
          }
        }
      }
      if (currentAbsHeight) {
        if (moreCnts[col]) {
          moreTops[col] = currentAbsHeight
        } else {
          paddingBottoms[col] = currentAbsHeight
        }
      }
    }

    function placeSeg (seg, segHeight) {
      if (!tryPlaceSegAt(seg, segHeight, 0)) {
        for (let col = seg.firstCol; col <= seg.lastCol; col++) {
          for (let _i = 0, _a = colPlacements[col]; _i < _a.length; _i++) {
            // will repeat multi-day segs!!!!!!! bad!!!!!!
            const placement = _a[_i]
            if (tryPlaceSegAt(seg, segHeight, placement.bottom)) {
              return
            }
          }
        }
      }
    }

    function tryPlaceSegAt (seg, segHeight, top) {
      if (canPlaceSegAt(seg, segHeight, top)) {
        for (let col = seg.firstCol; col <= seg.lastCol; col++) {
          const placements = colPlacements[col]
          let insertionIndex = 0
          while (
            insertionIndex < placements.length &&
            top >= placements[insertionIndex].top
          ) {
            insertionIndex++
          }
          placements.splice(insertionIndex, 0, {
            seg,
            top,
            bottom: top + segHeight
          })
        }
        return true
      } else {
        return false
      }
    }

    function canPlaceSegAt (seg, segHeight, top) {
      for (let col = seg.firstCol; col <= seg.lastCol; col++) {
        for (let _i = 0, _a = colPlacements[col]; _i < _a.length; _i++) {
          const placement = _a[_i]
          if (top < placement.bottom && top + segHeight > placement.top) {
            // collide?
            return false
          }
        }
      }
      return true
    }

    // what does this do!?
    for (const instanceIdAndFirstCol in eventHeights) {
      if (!eventHeights[instanceIdAndFirstCol]) {
        segIsHidden[instanceIdAndFirstCol.split(':')[0]] = true
      }
    }
    const segsByFirstCol = colPlacements.map(extractFirstColSegs) // operates on the sorted cols
    const segsByEachCol = colPlacements.map(function (placements, col) {
      let segs = extractAllColSegs(placements)
      segs = resliceDaySegs(segs, cellModels[col].date, col)
      return segs
    })
    return {
      segsByFirstCol,
      segsByEachCol,
      segIsHidden,
      segTops,
      segMarginTops,
      moreCnts,
      moreTops,
      paddingBottoms
    }
  }

  function extractFirstColSegs (oneColPlacements, col) {
    const segs = []
    for (
      let _i = 0, oneColPlacements_1 = oneColPlacements;
      _i < oneColPlacements_1.length;
      _i++
    ) {
      const placement = oneColPlacements_1[_i]
      if (placement.seg.firstCol === col) {
        segs.push(placement.seg)
      }
    }
    return segs
  }

  function extractAllColSegs (oneColPlacements) {
    const segs = []
    for (
      let _i = 0, oneColPlacements_2 = oneColPlacements;
      _i < oneColPlacements_2.length;
      _i++
    ) {
      const placement = oneColPlacements_2[_i]
      segs.push(placement.seg)
    }
    return segs
  }

  function limitByMaxHeight (
    hiddenCnts,
    segIsHidden,
    colPlacements,
    maxContentHeight
  ) {
    limitEvents(
      hiddenCnts,
      segIsHidden,
      colPlacements,
      true,
      function (placement) {
        return placement.bottom <= maxContentHeight
      }
    )
  }

  function limitByMaxEvents (
    hiddenCnts,
    segIsHidden,
    colPlacements,
    dayMaxEvents
  ) {
    limitEvents(
      hiddenCnts,
      segIsHidden,
      colPlacements,
      false,
      function (placement, levelIndex) {
        return levelIndex < dayMaxEvents
      }
    )
  }

  function limitByMaxRows (
    hiddenCnts,
    segIsHidden,
    colPlacements,
    dayMaxEventRows
  ) {
    limitEvents(
      hiddenCnts,
      segIsHidden,
      colPlacements,
      true,
      function (placement, levelIndex) {
        return levelIndex < dayMaxEventRows
      }
    )
  }

  /*
    populates the given hiddenCnts/segIsHidden, which are supplied empty.
    TODO: return them instead
    */
  function limitEvents (
    hiddenCnts,
    segIsHidden,
    colPlacements,
    _moreLinkConsumesLevel,
    isPlacementInBounds
  ) {
    const colCnt = hiddenCnts.length
    const segIsVisible = {} // TODO: instead, use segIsHidden with true/false?
    const visibleColPlacements = [] // will mirror colPlacements
    for (var col = 0; col < colCnt; col++) {
      visibleColPlacements.push([])
    }
    for (var col = 0; col < colCnt; col++) {
      const placements = colPlacements[col]
      let level = 0
      for (
        let _i = 0, placements_2 = placements;
        _i < placements_2.length;
        _i++
      ) {
        const placement = placements_2[_i]
        if (isPlacementInBounds(placement, level)) {
          recordVisible(placement)
        } else {
          recordHidden(placement, level, _moreLinkConsumesLevel)
        }
        // only considered a level if the seg had height
        if (placement.top !== placement.bottom) {
          level++
        }
      }
    }

    function recordVisible (placement) {
      const seg = placement.seg
      const instanceId = seg.eventRange.instance.instanceId
      if (!segIsVisible[instanceId]) {
        segIsVisible[instanceId] = true
        for (let col = seg.firstCol; col <= seg.lastCol; col++) {
          visibleColPlacements[col].push(placement)
        }
      }
    }

    function recordHidden (placement, currentLevel, moreLinkConsumesLevel) {
      const seg = placement.seg
      const instanceId = seg.eventRange.instance.instanceId
      if (!segIsHidden[instanceId]) {
        segIsHidden[instanceId] = true
        for (let col = seg.firstCol; col <= seg.lastCol; col++) {
          const hiddenCnt = ++hiddenCnts[col]
          if (moreLinkConsumesLevel && hiddenCnt === 1) {
            const doomedLevel = currentLevel - 1
            while (visibleColPlacements[col].length > doomedLevel) {
              recordHidden(
                visibleColPlacements[col].pop(), // removes
                visibleColPlacements[col].length, // will execute after the pop. will be the index of the removed placement
                false
              )
            }
          }
        }
      }
    }
  }

  // Given the events within an array of segment objects, reslice them to be in a single day
  function resliceDaySegs (segs, dayDate, colIndex) {
    const dayStart = dayDate
    const dayEnd = addDays(dayStart, 1)
    const dayRange = { start: dayStart, end: dayEnd }
    const newSegs = []
    for (let _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
      const seg = segs_2[_i]
      const eventRange = seg.eventRange
      const origRange = eventRange.range
      const slicedRange = intersectRanges(origRange, dayRange)
      if (slicedRange) {
        newSegs.push(
          __assign(__assign({}, seg), {
            firstCol: colIndex,
            lastCol: colIndex,
            eventRange: {
              def: eventRange.def,
              ui: __assign(__assign({}, eventRange.ui), {
                durationEditable: false
              }),
              instance: eventRange.instance,
              range: slicedRange
            },
            isStart:
              seg.isStart &&
              slicedRange.start.valueOf() === origRange.start.valueOf(),
            isEnd:
              seg.isEnd &&
              slicedRange.end.valueOf() === origRange.end.valueOf()
          })
        )
      }
    }
    return newSegs
  }

  const TableRow = /** @class */ (function (_super) {
    __extends(TableRow, _super)

    function TableRow () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.cellElRefs = new RefMap() // the <td>
      _this.frameElRefs = new RefMap() // the fc-daygrid-day-frame
      _this.fgElRefs = new RefMap() // the fc-daygrid-day-events
      _this.segHarnessRefs = new RefMap() // indexed by "instanceId:firstCol"
      _this.rootElRef = createRef()
      _this.state = {
        framePositions: null,
        maxContentHeight: null,
        segHeights: {}
      }
      return _this
    }

    TableRow.prototype.render = function () {
      const _this = this
      const _a = this
      const props = _a.props
      const state = _a.state
      const context = _a.context
      const colCnt = props.cells.length
      const businessHoursByCol = splitSegsByFirstCol(
        props.businessHourSegs,
        colCnt
      )
      const bgEventSegsByCol = splitSegsByFirstCol(props.bgEventSegs, colCnt)
      const highlightSegsByCol = splitSegsByFirstCol(
        this.getHighlightSegs(),
        colCnt
      )
      const mirrorSegsByCol = splitSegsByFirstCol(this.getMirrorSegs(), colCnt)
      const _b = computeFgSegPlacement(
        props.cells,
        props.fgEventSegs,
        props.dayMaxEvents,
        props.dayMaxEventRows,
        state.segHeights,
        state.maxContentHeight,
        colCnt,
        context.options.eventOrder
      )
      const paddingBottoms = _b.paddingBottoms
      const segsByFirstCol = _b.segsByFirstCol
      const segsByEachCol = _b.segsByEachCol
      const segIsHidden = _b.segIsHidden
      const segTops = _b.segTops
      const segMarginTops = _b.segMarginTops
      const moreCnts = _b.moreCnts
      const moreTops = _b.moreTops
      const selectedInstanceHash = // TODO: messy way to compute this
        (props.eventDrag && props.eventDrag.affectedInstances) ||
        (props.eventResize && props.eventResize.affectedInstances) ||
        {}
      return createElement(
        'tr',
        { ref: this.rootElRef },
        props.renderIntro && props.renderIntro(),
        props.cells.map(function (cell, col) {
          const normalFgNodes = _this.renderFgSegs(
            segsByFirstCol[col],
            segIsHidden,
            segTops,
            segMarginTops,
            selectedInstanceHash,
            props.todayRange
          )
          const mirrorFgNodes = _this.renderFgSegs(
            mirrorSegsByCol[col],
            {},
            segTops, // use same tops as real rendering
            {},
            {},
            props.todayRange,
            Boolean(props.eventDrag),
            Boolean(props.eventResize),
            false // date-selecting (because mirror is never drawn for date selection)
          )
          return createElement(TableCell, {
            key: cell.key,
            elRef: _this.cellElRefs.createRef(cell.key),
            innerElRef: _this.frameElRefs.createRef(
              cell.key
            ) /* FF <td> problem, but okay to use for left/right. TODO: rename prop */,
            dateProfile: props.dateProfile,
            date: cell.date,
            showDayNumber: props.showDayNumbers,
            showWeekNumber: props.showWeekNumbers && col === 0,
            forceDayTop:
              props.showWeekNumbers /* even displaying weeknum for row, not necessarily day */,
            todayRange: props.todayRange,
            extraHookProps: cell.extraHookProps,
            extraDataAttrs: cell.extraDataAttrs,
            extraClassNames: cell.extraClassNames,
            moreCnt: moreCnts[col],
            buildMoreLinkText: props.buildMoreLinkText,
            onMoreClick: props.onMoreClick,
            segIsHidden,
            moreMarginTop: moreTops[col] /* rename */,
            segsByEachCol: segsByEachCol[col],
            fgPaddingBottom: paddingBottoms[col],
            fgContentElRef: _this.fgElRefs.createRef(cell.key),
            // Fragment scopes the keys
            fgContent: createElement(
              Fragment,
              null,
              createElement(Fragment, null, normalFgNodes),
              createElement(Fragment, null, mirrorFgNodes)
            ),
            // Fragment scopes the keys
            bgContent: createElement(
              Fragment,
              null,
              _this.renderFillSegs(highlightSegsByCol[col], 'highlight'),
              _this.renderFillSegs(businessHoursByCol[col], 'non-business'),
              _this.renderFillSegs(bgEventSegsByCol[col], 'bg-event')
            )
          })
        })
      )
    }
    TableRow.prototype.componentDidMount = function () {
      this.updateSizing(true)
    }
    TableRow.prototype.componentDidUpdate = function (prevProps, prevState) {
      const currentProps = this.props
      this.updateSizing(!isPropsEqual(prevProps, currentProps))
    }
    TableRow.prototype.getHighlightSegs = function () {
      const props = this.props
      if (props.eventDrag && props.eventDrag.segs.length) {
        // messy check
        return props.eventDrag.segs
      } else if (props.eventResize && props.eventResize.segs.length) {
        // messy check
        return props.eventResize.segs
      } else {
        return props.dateSelectionSegs
      }
    }
    TableRow.prototype.getMirrorSegs = function () {
      const props = this.props
      if (props.eventResize && props.eventResize.segs.length) {
        // messy check
        return props.eventResize.segs
      } else {
        return []
      }
    }
    TableRow.prototype.renderFgSegs = function (
      segs,
      segIsHidden, // does NOT mean display:hidden
      segTops,
      segMarginTops,
      selectedInstanceHash,
      todayRange,
      isDragging,
      isResizing,
      isDateSelecting
    ) {
      const context = this.context
      const eventSelection = this.props.eventSelection
      const framePositions = this.state.framePositions
      const defaultDisplayEventEnd = this.props.cells.length === 1 // colCnt === 1
      const nodes = []
      if (framePositions) {
        for (let _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
          const seg = segs_1[_i]
          const instanceId = seg.eventRange.instance.instanceId
          const isMirror = isDragging || isResizing || isDateSelecting
          const isSelected = selectedInstanceHash[instanceId]
          const isInvisible = segIsHidden[instanceId] || isSelected
          const isAbsolute =
            segIsHidden[instanceId] ||
            isMirror ||
            seg.firstCol !== seg.lastCol ||
            !seg.isStart ||
            !seg.isEnd // TODO: simpler way? NOT DRY
          let marginTop = void 0
          let top_1 = void 0
          let left = void 0
          let right = void 0
          if (isAbsolute) {
            top_1 = segTops[instanceId]
            if (context.isRtl) {
              right = 0
              left =
                framePositions.lefts[seg.lastCol] -
                framePositions.lefts[seg.firstCol]
            } else {
              left = 0
              right =
                framePositions.rights[seg.firstCol] -
                framePositions.rights[seg.lastCol]
            }
          } else {
            marginTop = segMarginTops[instanceId]
          }
          /*
                    known bug: events that are force to be list-item but span multiple days still take up space in later columns
                    */
          nodes.push(
            createElement(
              'div',
              {
                className:
                  'fc-daygrid-event-harness' +
                  (isAbsolute ? ' fc-daygrid-event-harness-abs' : ''),
                key: instanceId,
                ref: isMirror
                  ? null
                  : this.segHarnessRefs.createRef(
                    instanceId + ':' + seg.firstCol
                  ) /* in print mode when in mult cols, could collide */,
                style: {
                  visibility: isInvisible ? 'hidden' : '',
                  marginTop: marginTop || '',
                  top: top_1 || '',
                  left: left || '',
                  right: right || ''
                }
              },
              hasListItemDisplay(seg)
                ? createElement(
                  TableListItemEvent,
                  __assign(
                    {
                      seg,
                      isDragging,
                      isSelected: instanceId === eventSelection,
                      defaultDisplayEventEnd
                    },
                    getSegMeta(seg, todayRange)
                  )
                )
                : createElement(
                  TableBlockEvent,
                  __assign(
                    {
                      seg,
                      isDragging,
                      isResizing,
                      isDateSelecting,
                      isSelected: instanceId === eventSelection,
                      defaultDisplayEventEnd
                    },
                    getSegMeta(seg, todayRange)
                  )
                )
            )
          )
        }
      }
      return nodes
    }
    TableRow.prototype.renderFillSegs = function (segs, fillType) {
      const isRtl = this.context.isRtl
      const todayRange = this.props.todayRange
      const framePositions = this.state.framePositions
      const nodes = []
      if (framePositions) {
        for (let _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
          const seg = segs_2[_i]
          const leftRightCss = isRtl
            ? {
                right: 0,
                left:
                  framePositions.lefts[seg.lastCol] -
                  framePositions.lefts[seg.firstCol]
              }
            : {
                left: 0,
                right:
                  framePositions.rights[seg.firstCol] -
                  framePositions.rights[seg.lastCol]
              }
          nodes.push(
            createElement(
              'div',
              {
                key: buildEventRangeKey(seg.eventRange),
                className: 'fc-daygrid-bg-harness',
                style: leftRightCss
              },
              fillType === 'bg-event'
                ? createElement(
                  BgEvent,
                  __assign({ seg }, getSegMeta(seg, todayRange))
                )
                : renderFill(fillType)
            )
          )
        }
      }
      return createElement.apply(void 0, __spreadArrays([Fragment, {}], nodes))
    }
    TableRow.prototype.updateSizing = function (isExternalSizingChange) {
      const _a = this
      const props = _a.props
      const frameElRefs = _a.frameElRefs
      if (props.clientWidth !== null) {
        // positioning ready?
        if (isExternalSizingChange) {
          const frameEls = props.cells.map(function (cell) {
            return frameElRefs.currentMap[cell.key]
          })
          if (frameEls.length) {
            const originEl = this.rootElRef.current
            this.setState({
              framePositions: new PositionCache(
                originEl,
                frameEls,
                true, // isHorizontal
                false
              )
            })
          }
        }
        const limitByContentHeight =
          props.dayMaxEvents === true || props.dayMaxEventRows === true
        this.setState({
          segHeights: this.computeSegHeights(),
          maxContentHeight: limitByContentHeight
            ? this.computeMaxContentHeight()
            : null
        })
      }
    }
    TableRow.prototype.computeSegHeights = function () {
      return mapHash(this.segHarnessRefs.currentMap, function (eventHarnessEl) {
        return eventHarnessEl.getBoundingClientRect().height
      })
    }
    TableRow.prototype.computeMaxContentHeight = function () {
      const firstKey = this.props.cells[0].key
      const cellEl = this.cellElRefs.currentMap[firstKey]
      const fcContainerEl = this.fgElRefs.currentMap[firstKey]
      return (
        cellEl.getBoundingClientRect().bottom -
        fcContainerEl.getBoundingClientRect().top
      )
    }
    TableRow.prototype.getCellEls = function () {
      const elMap = this.cellElRefs.currentMap
      return this.props.cells.map(function (cell) {
        return elMap[cell.key]
      })
    }
    return TableRow
  })(DateComponent)
  TableRow.addStateEquality({
    segHeights: isPropsEqual
  })

  const PADDING_FROM_VIEWPORT = 10
  const SCROLL_DEBOUNCE = 10
  const Popover = /** @class */ (function (_super) {
    __extends(Popover, _super)

    function Popover () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.repositioner = new DelayedRunner(_this.updateSize.bind(_this))
      _this.handleRootEl = function (el) {
        _this.rootEl = el
        if (_this.props.elRef) {
          setRef(_this.props.elRef, el)
        }
      }
      // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
      _this.handleDocumentMousedown = function (ev) {
        const onClose = _this.props.onClose
        // only hide the popover if the click happened outside the popover
        if (onClose && !_this.rootEl.contains(ev.target)) {
          onClose()
        }
      }
      _this.handleDocumentScroll = function () {
        _this.repositioner.request(SCROLL_DEBOUNCE)
      }
      _this.handleCloseClick = function () {
        const onClose = _this.props.onClose
        if (onClose) {
          onClose()
        }
      }
      return _this
    }

    Popover.prototype.render = function () {
      const theme = this.context.theme
      const props = this.props
      const classNames = ['fc-popover', theme.getClass('popover')].concat(
        props.extraClassNames || []
      )
      return createElement(
        'div',
        __assign({ className: classNames.join(' ') }, props.extraAttrs, {
          ref: this.handleRootEl
        }),
        createElement(
          'div',
          { className: 'fc-popover-header ' + theme.getClass('popoverHeader') },
          createElement('span', { className: 'fc-popover-title' }, props.title),
          createElement('span', {
            className: 'fc-popover-close ' + theme.getIconClass('close'),
            onClick: this.handleCloseClick
          })
        ),
        createElement(
          'div',
          { className: 'fc-popover-body ' + theme.getClass('popoverContent') },
          props.children
        )
      )
    }
    Popover.prototype.componentDidMount = function () {
      document.addEventListener('mousedown', this.handleDocumentMousedown)
      document.addEventListener('scroll', this.handleDocumentScroll)
      this.updateSize()
    }
    Popover.prototype.componentWillUnmount = function () {
      document.removeEventListener('mousedown', this.handleDocumentMousedown)
      document.removeEventListener('scroll', this.handleDocumentScroll)
    }
    // TODO: adjust on window resize
    /*
        NOTE: the popover is position:fixed, so coordinates are relative to the viewport
        NOTE: the PARENT calls this as well, on window resize. we would have wanted to use the repositioner,
              but need to ensure that all other components have updated size first (for alignmentEl)
        */
    Popover.prototype.updateSize = function () {
      const _a = this.props
      const alignmentEl = _a.alignmentEl
      const topAlignmentEl = _a.topAlignmentEl
      const rootEl = this.rootEl
      if (!rootEl) {
        return // not sure why this was null, but we shouldn't let external components call updateSize() anyway
      }
      const dims = rootEl.getBoundingClientRect() // only used for width,height
      const alignment = alignmentEl.getBoundingClientRect()
      let top = topAlignmentEl
        ? topAlignmentEl.getBoundingClientRect().top
        : alignment.top
      top = Math.min(
        top,
        window.innerHeight - dims.height - PADDING_FROM_VIEWPORT
      )
      top = Math.max(top, PADDING_FROM_VIEWPORT)
      let left
      if (this.context.isRtl) {
        left = alignment.right - dims.width
      } else {
        left = alignment.left
      }
      left = Math.min(
        left,
        window.innerWidth - dims.width - PADDING_FROM_VIEWPORT
      )
      left = Math.max(left, PADDING_FROM_VIEWPORT)
      applyStyle(rootEl, { top, left })
    }
    return Popover
  })(BaseComponent)

  const MorePopover = /** @class */ (function (_super) {
    __extends(MorePopover, _super)

    function MorePopover () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.handlePopoverEl = function (popoverEl) {
        _this.popoverEl = popoverEl
        if (popoverEl) {
          _this.context.registerInteractiveComponent(_this, {
            el: popoverEl,
            useEventCenter: false
          })
        } else {
          _this.context.unregisterInteractiveComponent(_this)
        }
      }
      return _this
    }

    MorePopover.prototype.render = function () {
      const _a = this.context
      const options = _a.options
      const dateEnv = _a.dateEnv
      const props = this.props
      const date = props.date
      const hiddenInstances = props.hiddenInstances
      const todayRange = props.todayRange
      const dateProfile = props.dateProfile
      const selectedInstanceId = props.selectedInstanceId
      const title = dateEnv.format(date, options.dayPopoverFormat)
      return createElement(
        DayCellRoot,
        {
          date,
          dateProfile,
          todayRange,
          elRef: this.handlePopoverEl
        },
        function (rootElRef, dayClassNames, dataAttrs) {
          return createElement(
            Popover,
            {
              elRef: rootElRef,
              title,
              extraClassNames: ['fc-more-popover'].concat(dayClassNames),
              extraAttrs: dataAttrs,
              onClose: props.onCloseClick,
              alignmentEl: props.alignmentEl,
              topAlignmentEl: props.topAlignmentEl
            },
            createElement(
              DayCellContent,
              {
                date,
                dateProfile,
                todayRange
              },
              function (innerElRef, innerContent) {
                return (
                  innerContent &&
                  createElement(
                    'div',
                    { className: 'fc-more-popover-misc', ref: innerElRef },
                    innerContent
                  )
                )
              }
            ),
            props.segs.map(function (seg) {
              const instanceId = seg.eventRange.instance.instanceId
              return createElement(
                'div',
                {
                  className: 'fc-daygrid-event-harness',
                  key: instanceId,
                  style: {
                    visibility: hiddenInstances[instanceId] ? 'hidden' : ''
                  }
                },
                hasListItemDisplay(seg)
                  ? createElement(
                    TableListItemEvent,
                    __assign(
                      {
                        seg,
                        isDragging: false,
                        isSelected: instanceId === selectedInstanceId,
                        defaultDisplayEventEnd: false
                      },
                      getSegMeta(seg, todayRange)
                    )
                  )
                  : createElement(
                    TableBlockEvent,
                    __assign(
                      {
                        seg,
                        isDragging: false,
                        isResizing: false,
                        isDateSelecting: false,
                        isSelected: instanceId === selectedInstanceId,
                        defaultDisplayEventEnd: false
                      },
                      getSegMeta(seg, todayRange)
                    )
                  )
              )
            })
          )
        }
      )
    }
    MorePopover.prototype.queryHit = function (
      positionLeft,
      positionTop,
      elWidth,
      elHeight
    ) {
      const date = this.props.date
      if (positionLeft < elWidth && positionTop < elHeight) {
        return {
          component: this,
          dateSpan: {
            allDay: true,
            range: { start: date, end: addDays(date, 1) }
          },
          dayEl: this.popoverEl,
          rect: {
            left: 0,
            top: 0,
            right: elWidth,
            bottom: elHeight
          },
          layer: 1
        }
      }
    }
    MorePopover.prototype.isPopover = function () {
      return true // gross
    }
    return MorePopover
  })(DateComponent)

  const Table = /** @class */ (function (_super) {
    __extends(Table, _super)

    function Table () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.splitBusinessHourSegs = memoize(splitSegsByRow)
      _this.splitBgEventSegs = memoize(splitSegsByRow)
      _this.splitFgEventSegs = memoize(splitSegsByRow)
      _this.splitDateSelectionSegs = memoize(splitSegsByRow)
      _this.splitEventDrag = memoize(splitInteractionByRow)
      _this.splitEventResize = memoize(splitInteractionByRow)
      _this.buildBuildMoreLinkText = memoize(buildBuildMoreLinkText)
      _this.rowRefs = new RefMap()
      _this.state = {
        morePopoverState: null
      }
      _this.handleRootEl = function (rootEl) {
        _this.rootEl = rootEl
        setRef(_this.props.elRef, rootEl)
      }
      _this.handleMoreLinkClick = function (arg) {
        const context = _this.context
        const dateEnv = context.dateEnv
        let clickOption = context.options.moreLinkClick

        function segForPublic (seg) {
          const _a = seg.eventRange
          const def = _a.def
          const instance = _a.instance
          const range = _a.range
          return {
            event: new EventApi(context, def, instance),
            start: dateEnv.toDate(range.start),
            end: dateEnv.toDate(range.end),
            isStart: seg.isStart,
            isEnd: seg.isEnd
          }
        }

        if (typeof clickOption === 'function') {
          clickOption = clickOption({
            date: dateEnv.toDate(arg.date),
            allDay: true,
            allSegs: arg.allSegs.map(segForPublic),
            hiddenSegs: arg.hiddenSegs.map(segForPublic),
            jsEvent: arg.ev,
            view: context.viewApi
          }) // hack to handle void
        }
        if (!clickOption || clickOption === 'popover') {
          _this.setState({
            morePopoverState: __assign(__assign({}, arg), {
              currentFgEventSegs: _this.props.fgEventSegs
            })
          })
        } else if (typeof clickOption === 'string') {
          // a view name
          context.calendarApi.zoomTo(arg.date, clickOption)
        }
      }
      _this.handleMorePopoverClose = function () {
        _this.setState({
          morePopoverState: null
        })
      }
      return _this
    }

    Table.prototype.render = function () {
      const _this = this
      const props = this.props
      const dateProfile = props.dateProfile
      let dayMaxEventRows = props.dayMaxEventRows
      let dayMaxEvents = props.dayMaxEvents
      const expandRows = props.expandRows
      const morePopoverState = this.state.morePopoverState
      const rowCnt = props.cells.length
      const businessHourSegsByRow = this.splitBusinessHourSegs(
        props.businessHourSegs,
        rowCnt
      )
      const bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, rowCnt)
      const fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, rowCnt)
      const dateSelectionSegsByRow = this.splitDateSelectionSegs(
        props.dateSelectionSegs,
        rowCnt
      )
      const eventDragByRow = this.splitEventDrag(props.eventDrag, rowCnt)
      const eventResizeByRow = this.splitEventResize(props.eventResize, rowCnt)
      const buildMoreLinkText = this.buildBuildMoreLinkText(
        this.context.options.moreLinkText
      )
      let limitViaBalanced = dayMaxEvents === true || dayMaxEventRows === true
      // if rows can't expand to fill fixed height, can't do balanced-height event limit
      // TODO: best place to normalize these options?
      if (limitViaBalanced && !expandRows) {
        limitViaBalanced = false
        dayMaxEventRows = null
        dayMaxEvents = null
      }
      const classNames = [
        'fc-daygrid-body',
        limitViaBalanced
          ? 'fc-daygrid-body-balanced'
          : 'fc-daygrid-body-unbalanced',
        expandRows ? '' : 'fc-daygrid-body-natural' // will height of one row depend on the others?
      ]
      return createElement(
        'div',
        {
          className: classNames.join(' '),
          ref: this.handleRootEl,
          style: {
            // these props are important to give this wrapper correct dimensions for interactions
            // TODO: if we set it here, can we avoid giving to inner tables?
            width: props.clientWidth,
            minWidth: props.tableMinWidth
          }
        },
        createElement(
          NowTimer,
          { unit: 'day' },
          function (nowDate, todayRange) {
            return createElement(
              Fragment,
              null,
              createElement(
                'table',
                {
                  className: 'fc-scrollgrid-sync-table',
                  style: {
                    width: props.clientWidth,
                    minWidth: props.tableMinWidth,
                    height: expandRows ? props.clientHeight : ''
                  }
                },
                props.colGroupNode,
                createElement(
                  'tbody',
                  null,
                  props.cells.map(function (cells, row) {
                    return createElement(TableRow, {
                      ref: _this.rowRefs.createRef(row),
                      key: cells.length
                        ? cells[0].date.toISOString() /* best? or put key on cell? or use diff formatter? */
                        : row, // in case there are no cells (like when resource view is loading)
                      showDayNumbers: rowCnt > 1,
                      showWeekNumbers: props.showWeekNumbers,
                      todayRange,
                      dateProfile,
                      cells,
                      renderIntro: props.renderRowIntro,
                      businessHourSegs: businessHourSegsByRow[row],
                      eventSelection: props.eventSelection,
                      bgEventSegs:
                        bgEventSegsByRow[row].filter(isSegAllDay) /* hack */,
                      fgEventSegs: fgEventSegsByRow[row],
                      dateSelectionSegs: dateSelectionSegsByRow[row],
                      eventDrag: eventDragByRow[row],
                      eventResize: eventResizeByRow[row],
                      dayMaxEvents,
                      dayMaxEventRows,
                      clientWidth: props.clientWidth,
                      clientHeight: props.clientHeight,
                      buildMoreLinkText,
                      onMoreClick: _this.handleMoreLinkClick
                    })
                  })
                )
              ),
              !props.forPrint &&
                morePopoverState &&
                morePopoverState.currentFgEventSegs === props.fgEventSegs && // clear popover on event mod
                createElement(MorePopover, {
                  date: morePopoverState.date,
                  dateProfile,
                  segs: morePopoverState.allSegs,
                  alignmentEl: morePopoverState.dayEl,
                  topAlignmentEl:
                    rowCnt === 1 ? props.headerAlignElRef.current : null,
                  onCloseClick: _this.handleMorePopoverClose,
                  selectedInstanceId: props.eventSelection,
                  // yuck
                  hiddenInstances:
                    (props.eventDrag
                      ? props.eventDrag.affectedInstances
                      : null) ||
                    (props.eventResize
                      ? props.eventResize.affectedInstances
                      : null) ||
                    {},
                  todayRange
                })
            )
          }
        )
      )
    }
    // Hit System
    // ----------------------------------------------------------------------------------------------------
    Table.prototype.prepareHits = function () {
      this.rowPositions = new PositionCache(
        this.rootEl,
        this.rowRefs.collect().map(function (rowObj) {
          return rowObj.getCellEls()[0]
        }), // first cell el in each row. TODO: not optimal
        false,
        true // vertical
      )
      this.colPositions = new PositionCache(
        this.rootEl,
        this.rowRefs.currentMap[0].getCellEls(), // cell els in first row
        true, // horizontal
        false
      )
    }
    Table.prototype.positionToHit = function (leftPosition, topPosition) {
      const _a = this
      const colPositions = _a.colPositions
      const rowPositions = _a.rowPositions
      const col = colPositions.leftToIndex(leftPosition)
      const row = rowPositions.topToIndex(topPosition)
      if (row != null && col != null) {
        return {
          row,
          col,
          dateSpan: {
            range: this.getCellRange(row, col),
            allDay: true
          },
          dayEl: this.getCellEl(row, col),
          relativeRect: {
            left: colPositions.lefts[col],
            right: colPositions.rights[col],
            top: rowPositions.tops[row],
            bottom: rowPositions.bottoms[row]
          }
        }
      }
    }
    Table.prototype.getCellEl = function (row, col) {
      return this.rowRefs.currentMap[row].getCellEls()[col] // TODO: not optimal
    }
    Table.prototype.getCellRange = function (row, col) {
      const start = this.props.cells[row][col].date
      const end = addDays(start, 1)
      return { start, end }
    }
    return Table
  })(DateComponent)

  function buildBuildMoreLinkText (moreLinkTextInput) {
    if (typeof moreLinkTextInput === 'function') {
      return moreLinkTextInput
    } else {
      return function (num) {
        return '+' + num + ' ' + moreLinkTextInput
      }
    }
  }

  function isSegAllDay (seg) {
    return seg.eventRange.def.allDay
  }

  const DayTable = /** @class */ (function (_super) {
    __extends(DayTable, _super)

    function DayTable () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.slicer = new DayTableSlicer()
      _this.tableRef = createRef()
      _this.handleRootEl = function (rootEl) {
        if (rootEl) {
          _this.context.registerInteractiveComponent(_this, { el: rootEl })
        } else {
          _this.context.unregisterInteractiveComponent(_this)
        }
      }
      return _this
    }

    DayTable.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      return createElement(
        Table,
        __assign(
          {
            ref: this.tableRef,
            elRef: this.handleRootEl
          },
          this.slicer.sliceProps(
            props,
            props.dateProfile,
            props.nextDayThreshold,
            context,
            props.dayTableModel
          ),
          {
            dateProfile: props.dateProfile,
            cells: props.dayTableModel.cells,
            colGroupNode: props.colGroupNode,
            tableMinWidth: props.tableMinWidth,
            renderRowIntro: props.renderRowIntro,
            dayMaxEvents: props.dayMaxEvents,
            dayMaxEventRows: props.dayMaxEventRows,
            showWeekNumbers: props.showWeekNumbers,
            expandRows: props.expandRows,
            headerAlignElRef: props.headerAlignElRef,
            clientWidth: props.clientWidth,
            clientHeight: props.clientHeight,
            forPrint: props.forPrint
          }
        )
      )
    }
    DayTable.prototype.prepareHits = function () {
      this.tableRef.current.prepareHits()
    }
    DayTable.prototype.queryHit = function (positionLeft, positionTop) {
      const rawHit = this.tableRef.current.positionToHit(
        positionLeft,
        positionTop
      )
      if (rawHit) {
        return {
          component: this,
          dateSpan: rawHit.dateSpan,
          dayEl: rawHit.dayEl,
          rect: {
            left: rawHit.relativeRect.left,
            right: rawHit.relativeRect.right,
            top: rawHit.relativeRect.top,
            bottom: rawHit.relativeRect.bottom
          },
          layer: 0
        }
      }
    }
    return DayTable
  })(DateComponent)
  var DayTableSlicer = /** @class */ (function (_super) {
    __extends(DayTableSlicer, _super)

    function DayTableSlicer () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.forceDayIfListItem = true
      return _this
    }

    DayTableSlicer.prototype.sliceRange = function (dateRange, dayTableModel) {
      return dayTableModel.sliceRange(dateRange)
    }
    return DayTableSlicer
  })(Slicer)

  const DayTableView = /** @class */ (function (_super) {
    __extends(DayTableView, _super)

    function DayTableView () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.buildDayTableModel = memoize(buildDayTableModel)
      _this.headerRef = createRef()
      _this.tableRef = createRef()
      return _this
    }

    DayTableView.prototype.render = function () {
      const _this = this
      const _a = this.context
      const options = _a.options
      const dateProfileGenerator = _a.dateProfileGenerator
      const props = this.props
      const dayTableModel = this.buildDayTableModel(
        props.dateProfile,
        dateProfileGenerator
      )
      const headerContent =
        options.dayHeaders &&
        createElement(DayHeader, {
          ref: this.headerRef,
          dateProfile: props.dateProfile,
          dates: dayTableModel.headerDates,
          datesRepDistinctDays: dayTableModel.rowCnt === 1
        })
      const bodyContent = function (contentArg) {
        return createElement(DayTable, {
          ref: _this.tableRef,
          dateProfile: props.dateProfile,
          dayTableModel,
          businessHours: props.businessHours,
          dateSelection: props.dateSelection,
          eventStore: props.eventStore,
          eventUiBases: props.eventUiBases,
          eventSelection: props.eventSelection,
          eventDrag: props.eventDrag,
          eventResize: props.eventResize,
          nextDayThreshold: options.nextDayThreshold,
          colGroupNode: contentArg.tableColGroupNode,
          tableMinWidth: contentArg.tableMinWidth,
          dayMaxEvents: options.dayMaxEvents,
          dayMaxEventRows: options.dayMaxEventRows,
          showWeekNumbers: options.weekNumbers,
          expandRows: !props.isHeightAuto,
          headerAlignElRef: _this.headerElRef,
          clientWidth: contentArg.clientWidth,
          clientHeight: contentArg.clientHeight,
          forPrint: props.forPrint
        })
      }
      return options.dayMinWidth
        ? this.renderHScrollLayout(
          headerContent,
          bodyContent,
          dayTableModel.colCnt,
          options.dayMinWidth
        )
        : this.renderSimpleLayout(headerContent, bodyContent)
    }
    return DayTableView
  })(TableView)

  function buildDayTableModel (dateProfile, dateProfileGenerator) {
    const daySeries = new DaySeriesModel(
      dateProfile.renderRange,
      dateProfileGenerator
    )
    return new DayTableModel(
      daySeries,
      /year|month|week/.test(dateProfile.currentRangeUnit)
    )
  }

  const TableDateProfileGenerator = /** @class */ (function (_super) {
    __extends(TableDateProfileGenerator, _super)

    function TableDateProfileGenerator () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    // Computes the date range that will be rendered.
    TableDateProfileGenerator.prototype.buildRenderRange = function (
      currentRange,
      currentRangeUnit,
      isRangeAllDay
    ) {
      const dateEnv = this.props.dateEnv
      const renderRange = _super.prototype.buildRenderRange.call(
        this,
        currentRange,
        currentRangeUnit,
        isRangeAllDay
      )
      let start = renderRange.start
      let end = renderRange.end
      let endOfWeek
      // year and month views should be aligned with weeks. this is already done for week
      if (/^(year|month)$/.test(currentRangeUnit)) {
        start = dateEnv.startOfWeek(start)
        // make end-of-week if not already
        endOfWeek = dateEnv.startOfWeek(end)
        if (endOfWeek.valueOf() !== end.valueOf()) {
          end = addWeeks(endOfWeek, 1)
        }
      }
      // ensure 6 weeks
      if (this.props.monthMode && this.props.fixedWeekCount) {
        const rowCnt = Math.ceil(
          // could be partial weeks due to hiddenDays
          diffWeeks(start, end)
        )
        end = addWeeks(end, 6 - rowCnt)
      }
      return { start, end }
    }
    return TableDateProfileGenerator
  })(DateProfileGenerator)

  const OPTION_REFINERS = {
    moreLinkClick: identity,
    moreLinkClassNames: identity,
    moreLinkContent: identity,
    moreLinkDidMount: identity,
    moreLinkWillUnmount: identity
  }

  const dayGridPlugin = createPlugin({
    initialView: 'dayGridMonth',
    optionRefiners: OPTION_REFINERS,
    views: {
      dayGrid: {
        component: DayTableView,
        dateProfileGeneratorClass: TableDateProfileGenerator
      },
      dayGridDay: {
        type: 'dayGrid',
        duration: { days: 1 }
      },
      dayGridWeek: {
        type: 'dayGrid',
        duration: { weeks: 1 }
      },
      dayGridMonth: {
        type: 'dayGrid',
        duration: { months: 1 },
        monthMode: true,
        fixedWeekCount: true
      }
    }
  })

  const AllDaySplitter = /** @class */ (function (_super) {
    __extends(AllDaySplitter, _super)

    function AllDaySplitter () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    AllDaySplitter.prototype.getKeyInfo = function () {
      return {
        allDay: {},
        timed: {}
      }
    }
    AllDaySplitter.prototype.getKeysForDateSpan = function (dateSpan) {
      if (dateSpan.allDay) {
        return ['allDay']
      } else {
        return ['timed']
      }
    }
    AllDaySplitter.prototype.getKeysForEventDef = function (eventDef) {
      if (!eventDef.allDay) {
        return ['timed']
      } else if (hasBgRendering(eventDef)) {
        return ['timed', 'allDay']
      } else {
        return ['allDay']
      }
    }
    return AllDaySplitter
  })(Splitter)

  const TimeColsSlatsCoords = /** @class */ (function () {
    function TimeColsSlatsCoords (positions, dateProfile, slatMetas) {
      this.positions = positions
      this.dateProfile = dateProfile
      this.slatMetas = slatMetas
    }

    TimeColsSlatsCoords.prototype.safeComputeTop = function (date) {
      const dateProfile = this.dateProfile
      if (rangeContainsMarker(dateProfile.currentRange, date)) {
        const startOfDayDate = startOfDay(date)
        const timeMs = date.valueOf() - startOfDayDate.valueOf()
        if (
          timeMs >= asRoughMs(dateProfile.slotMinTime) &&
          timeMs < asRoughMs(dateProfile.slotMaxTime)
        ) {
          return this.computeTimeTop(createDuration(timeMs))
        }
      }
    }
    // Computes the top coordinate, relative to the bounds of the grid, of the given date.
    // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
    TimeColsSlatsCoords.prototype.computeDateTop = function (
      when,
      startOfDayDate
    ) {
      if (!startOfDayDate) {
        startOfDayDate = startOfDay(when)
      }
      return this.computeTimeTop(
        createDuration(when.valueOf() - startOfDayDate.valueOf())
      )
    }
    // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
    // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
    // Eventually allow computation with arbirary slat dates.
    TimeColsSlatsCoords.prototype.computeTimeTop = function (duration) {
      const _a = this
      const positions = _a.positions
      const dateProfile = _a.dateProfile
      const slatMetas = _a.slatMetas
      const len = positions.els.length
      const slotDurationMs =
        slatMetas[1].date.valueOf() - slatMetas[0].date.valueOf() // we assume dates are uniform
      let slatCoverage =
        (duration.milliseconds - asRoughMs(dateProfile.slotMinTime)) /
        slotDurationMs // floating-point value of # of slots covered
      let slatIndex
      let slatRemainder
      // compute a floating-point number for how many slats should be progressed through.
      // from 0 to number of slats (inclusive)
      // constrained because slotMinTime/slotMaxTime might be customized.
      slatCoverage = Math.max(0, slatCoverage)
      slatCoverage = Math.min(len, slatCoverage)
      // an integer index of the furthest whole slat
      // from 0 to number slats (*exclusive*, so len-1)
      slatIndex = Math.floor(slatCoverage)
      slatIndex = Math.min(slatIndex, len - 1)
      // how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
      // could be 1.0 if slatCoverage is covering *all* the slots
      slatRemainder = slatCoverage - slatIndex
      return (
        positions.tops[slatIndex] +
        positions.getHeight(slatIndex) * slatRemainder
      )
    }
    return TimeColsSlatsCoords
  })()

  // potential nice values for the slot-duration and interval-duration
  // from largest to smallest
  const STOCK_SUB_DURATIONS = [
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { seconds: 30 },
    { seconds: 15 }
  ]
  /*
    for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
    */
  const TimeColsSlats = /** @class */ (function (_super) {
    __extends(TimeColsSlats, _super)

    function TimeColsSlats () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.rootElRef = createRef()
      _this.slatElRefs = new RefMap()
      return _this
    }

    TimeColsSlats.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      return createElement(
        'div',
        { className: 'fc-timegrid-slots', ref: this.rootElRef },
        createElement(
          'table',
          {
            className: context.theme.getClass('table'),
            style: {
              minWidth: props.tableMinWidth,
              width: props.clientWidth,
              height: props.minHeight
            }
          },
          props.tableColGroupNode /* relies on there only being a single <col> for the axis */,
          createElement(TimeColsSlatsBody, {
            slatElRefs: this.slatElRefs,
            axis: props.axis,
            slatMetas: props.slatMetas
          })
        )
      )
    }
    TimeColsSlats.prototype.componentDidMount = function () {
      this.updateSizing()
    }
    TimeColsSlats.prototype.componentDidUpdate = function () {
      this.updateSizing()
    }
    TimeColsSlats.prototype.componentWillUnmount = function () {
      if (this.props.onCoords) {
        this.props.onCoords(null)
      }
    }
    TimeColsSlats.prototype.updateSizing = function () {
      const props = this.props
      if (
        props.onCoords &&
        props.clientWidth !== null // means sizing has stabilized
      ) {
        const rootEl = this.rootElRef.current
        if (rootEl.offsetHeight) {
          // not hidden by css
          props.onCoords(
            new TimeColsSlatsCoords(
              new PositionCache(
                this.rootElRef.current,
                collectSlatEls(this.slatElRefs.currentMap, props.slatMetas),
                false,
                true // vertical
              ),
              this.props.dateProfile,
              props.slatMetas
            )
          )
        }
      }
    }
    return TimeColsSlats
  })(BaseComponent)

  function collectSlatEls (elMap, slatMetas) {
    return slatMetas.map(function (slatMeta) {
      return elMap[slatMeta.key]
    })
  }

  var TimeColsSlatsBody = /** @class */ (function (_super) {
    __extends(TimeColsSlatsBody, _super)

    function TimeColsSlatsBody () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TimeColsSlatsBody.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const options = context.options
      const slatElRefs = props.slatElRefs
      return createElement(
        'tbody',
        null,
        props.slatMetas.map(function (slatMeta, i) {
          const hookProps = {
            time: slatMeta.time,
            date: context.dateEnv.toDate(slatMeta.date),
            view: context.viewApi
          }
          const classNames = [
            'fc-timegrid-slot',
            'fc-timegrid-slot-lane',
            slatMeta.isLabeled ? '' : 'fc-timegrid-slot-minor'
          ]
          return createElement(
            'tr',
            { key: slatMeta.key, ref: slatElRefs.createRef(slatMeta.key) },
            props.axis &&
              createElement(TimeColsAxisCell, __assign({}, slatMeta)),
            createElement(
              RenderHook,
              {
                hookProps,
                classNames: options.slotLaneClassNames,
                content: options.slotLaneContent,
                didMount: options.slotLaneDidMount,
                willUnmount: options.slotLaneWillUnmount
              },
              function (rootElRef, customClassNames, innerElRef, innerContent) {
                return createElement(
                  'td',
                  {
                    ref: rootElRef,
                    className: classNames.concat(customClassNames).join(' '),
                    'data-time': slatMeta.isoTimeStr
                  },
                  innerContent
                )
              }
            )
          )
        })
      )
    }
    return TimeColsSlatsBody
  })(BaseComponent)
  const DEFAULT_SLAT_LABEL_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: true,
    meridiem: 'short'
  })

  function TimeColsAxisCell (props) {
    const classNames = [
      'fc-timegrid-slot',
      'fc-timegrid-slot-label',
      props.isLabeled ? 'fc-scrollgrid-shrink' : 'fc-timegrid-slot-minor'
    ]
    return createElement(ViewContextType.Consumer, null, function (context) {
      if (!props.isLabeled) {
        return createElement('td', {
          className: classNames.join(' '),
          'data-time': props.isoTimeStr
        })
      } else {
        const dateEnv = context.dateEnv
        const options = context.options
        const viewApi = context.viewApi
        const labelFormat = // TODO: fully pre-parse
          options.slotLabelFormat == null
            ? DEFAULT_SLAT_LABEL_FORMAT
            : Array.isArray(options.slotLabelFormat)
              ? createFormatter(options.slotLabelFormat[0])
              : createFormatter(options.slotLabelFormat)
        const hookProps = {
          level: 0,
          time: props.time,
          date: dateEnv.toDate(props.date),
          view: viewApi,
          text: dateEnv.format(props.date, labelFormat)
        }
        return createElement(
          RenderHook,
          {
            hookProps,
            classNames: options.slotLabelClassNames,
            content: options.slotLabelContent,
            defaultContent: renderInnerContent$3,
            didMount: options.slotLabelDidMount,
            willUnmount: options.slotLabelWillUnmount
          },
          function (rootElRef, customClassNames, innerElRef, innerContent) {
            return createElement(
              'td',
              {
                ref: rootElRef,
                className: classNames.concat(customClassNames).join(' '),
                'data-time': props.isoTimeStr
              },
              createElement(
                'div',
                {
                  className:
                    'fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame'
                },
                createElement(
                  'div',
                  {
                    className:
                      'fc-timegrid-slot-label-cushion fc-scrollgrid-shrink-cushion',
                    ref: innerElRef
                  },
                  innerContent
                )
              )
            )
          }
        )
      }
    })
  }

  function renderInnerContent$3 (props) {
    return props.text
  }

  function buildSlatMetas (
    slotMinTime,
    slotMaxTime,
    explicitLabelInterval,
    slotDuration,
    dateEnv
  ) {
    const dayStart = new Date(0)
    let slatTime = slotMinTime
    let slatIterator = createDuration(0)
    const labelInterval =
      explicitLabelInterval || computeLabelInterval(slotDuration)
    const metas = []
    while (asRoughMs(slatTime) < asRoughMs(slotMaxTime)) {
      const date = dateEnv.add(dayStart, slatTime)
      const isLabeled =
        wholeDivideDurations(slatIterator, labelInterval) !== null
      metas.push({
        date,
        time: slatTime,
        key: date.toISOString(),
        isoTimeStr: formatIsoTimeString(date),
        isLabeled
      })
      slatTime = addDurations(slatTime, slotDuration)
      slatIterator = addDurations(slatIterator, slotDuration)
    }
    return metas
  }

  // Computes an automatic value for slotLabelInterval
  function computeLabelInterval (slotDuration) {
    let i
    let labelInterval
    let slotsPerLabel
    // find the smallest stock label interval that results in more than one slots-per-label
    for (i = STOCK_SUB_DURATIONS.length - 1; i >= 0; i--) {
      labelInterval = createDuration(STOCK_SUB_DURATIONS[i])
      slotsPerLabel = wholeDivideDurations(labelInterval, slotDuration)
      if (slotsPerLabel !== null && slotsPerLabel > 1) {
        return labelInterval
      }
    }
    return slotDuration // fall back
  }

  const DEFAULT_WEEK_NUM_FORMAT$1 = createFormatter({ week: 'short' })
  const AUTO_ALL_DAY_MAX_EVENT_ROWS = 5
  const TimeColsView = /** @class */ (function (_super) {
    __extends(TimeColsView, _super)

    function TimeColsView () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.allDaySplitter = new AllDaySplitter() // for use by subclasses
      _this.headerElRef = createRef()
      _this.rootElRef = createRef()
      _this.scrollerElRef = createRef()
      _this.state = {
        slatCoords: null
      }
      _this.handleScrollTopRequest = function (scrollTop) {
        const scrollerEl = _this.scrollerElRef.current
        if (scrollerEl) {
          // TODO: not sure how this could ever be null. weirdness with the reducer
          scrollerEl.scrollTop = scrollTop
        }
      }
      /* Header Render Methods
            ------------------------------------------------------------------------------------------------------------------ */
      _this.renderHeadAxis = function (frameHeight) {
        if (frameHeight === void 0) {
          frameHeight = ''
        }
        const options = _this.context.options
        const dateProfile = _this.props.dateProfile
        const range = dateProfile.renderRange
        const dayCnt = diffDays(range.start, range.end)
        const navLinkAttrs =
          options.navLinks && dayCnt === 1 // only do in day views (to avoid doing in week views that dont need it)
            ? {
                'data-navlink': buildNavLinkData(range.start, 'week'),
                tabIndex: 0
              }
            : {}
        if (options.weekNumbers) {
          return createElement(
            WeekNumberRoot,
            {
              date: range.start,
              defaultFormat: DEFAULT_WEEK_NUM_FORMAT$1
            },
            function (rootElRef, classNames, innerElRef, innerContent) {
              return createElement(
                'th',
                {
                  ref: rootElRef,
                  className: ['fc-timegrid-axis', 'fc-scrollgrid-shrink']
                    .concat(classNames)
                    .join(' ')
                },
                createElement(
                  'div',
                  {
                    className:
                      'fc-timegrid-axis-frame fc-scrollgrid-shrink-frame fc-timegrid-axis-frame-liquid',
                    style: { height: frameHeight }
                  },
                  createElement(
                    'a',
                    __assign(
                      {
                        ref: innerElRef,
                        className:
                          'fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner'
                      },
                      navLinkAttrs
                    ),
                    innerContent
                  )
                )
              )
            }
          )
        }
        return createElement(
          'th',
          { className: 'fc-timegrid-axis' },
          createElement('div', {
            className: 'fc-timegrid-axis-frame',
            style: { height: frameHeight }
          })
        )
      }
      /* Table Component Render Methods
            ------------------------------------------------------------------------------------------------------------------ */
      // only a one-way height sync. we don't send the axis inner-content height to the DayGrid,
      // but DayGrid still needs to have classNames on inner elements in order to measure.
      _this.renderTableRowAxis = function (rowHeight) {
        const _a = _this.context
        const options = _a.options
        const viewApi = _a.viewApi
        const hookProps = {
          text: options.allDayText,
          view: viewApi
        }
        return (
          // TODO: make reusable hook. used in list view too
          createElement(
            RenderHook,
            {
              hookProps,
              classNames: options.allDayClassNames,
              content: options.allDayContent,
              defaultContent: renderAllDayInner,
              didMount: options.allDayDidMount,
              willUnmount: options.allDayWillUnmount
            },
            function (rootElRef, classNames, innerElRef, innerContent) {
              return createElement(
                'td',
                {
                  ref: rootElRef,
                  className: ['fc-timegrid-axis', 'fc-scrollgrid-shrink']
                    .concat(classNames)
                    .join(' ')
                },
                createElement(
                  'div',
                  {
                    className:
                      'fc-timegrid-axis-frame fc-scrollgrid-shrink-frame' +
                      (rowHeight == null
                        ? ' fc-timegrid-axis-frame-liquid'
                        : ''),
                    style: { height: rowHeight }
                  },
                  createElement(
                    'span',
                    {
                      className:
                        'fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner',
                      ref: innerElRef
                    },
                    innerContent
                  )
                )
              )
            }
          )
        )
      }
      _this.handleSlatCoords = function (slatCoords) {
        _this.setState({ slatCoords })
      }
      return _this
    }

    // rendering
    // ----------------------------------------------------------------------------------------------------
    TimeColsView.prototype.renderSimpleLayout = function (
      headerRowContent,
      allDayContent,
      timeContent
    ) {
      const _a = this
      const context = _a.context
      const props = _a.props
      const sections = []
      const stickyHeaderDates = getStickyHeaderDates(context.options)
      if (headerRowContent) {
        sections.push({
          type: 'header',
          key: 'header',
          isSticky: stickyHeaderDates,
          chunk: {
            elRef: this.headerElRef,
            tableClassName: 'fc-col-header',
            rowContent: headerRowContent
          }
        })
      }
      if (allDayContent) {
        sections.push({
          type: 'body',
          key: 'all-day',
          chunk: { content: allDayContent }
        })
        sections.push({
          type: 'body',
          key: 'all-day-divider',
          // TODO: rename to cellContent so don't need to define <tr>?
          outerContent: createElement(
            'tr',
            { className: 'fc-scrollgrid-section' },
            createElement('td', {
              className:
                'fc-timegrid-divider ' +
                context.theme.getClass('tableCellShaded')
            })
          )
        })
      }
      sections.push({
        type: 'body',
        key: 'body',
        liquid: true,
        expandRows: Boolean(context.options.expandRows),
        chunk: {
          scrollerElRef: this.scrollerElRef,
          content: timeContent
        }
      })
      return createElement(
        ViewRoot,
        {
          viewSpec: context.viewSpec,
          elRef: this.rootElRef
        },
        function (rootElRef, classNames) {
          return createElement(
            'div',
            {
              className: ['fc-timegrid'].concat(classNames).join(' '),
              ref: rootElRef
            },
            createElement(SimpleScrollGrid, {
              liquid: !props.isHeightAuto && !props.forPrint,
              cols: [{ width: 'shrink' }],
              sections
            })
          )
        }
      )
    }
    TimeColsView.prototype.renderHScrollLayout = function (
      headerRowContent,
      allDayContent,
      timeContent,
      colCnt,
      dayMinWidth,
      slatMetas,
      slatCoords // yuck
    ) {
      const _this = this
      const ScrollGrid = this.context.pluginHooks.scrollGridImpl
      if (!ScrollGrid) {
        throw new Error('No ScrollGrid implementation')
      }
      const _a = this
      const context = _a.context
      const props = _a.props
      const stickyHeaderDates =
        !props.forPrint && getStickyHeaderDates(context.options)
      const stickyFooterScrollbar =
        !props.forPrint && getStickyFooterScrollbar(context.options)
      const sections = []
      if (headerRowContent) {
        sections.push({
          type: 'header',
          key: 'header',
          isSticky: stickyHeaderDates,
          syncRowHeights: true,
          chunks: [
            {
              key: 'axis',
              rowContent: function (arg) {
                return createElement(
                  'tr',
                  null,
                  _this.renderHeadAxis(arg.rowSyncHeights[0])
                )
              }
            },
            {
              key: 'cols',
              elRef: this.headerElRef,
              tableClassName: 'fc-col-header',
              rowContent: headerRowContent
            }
          ]
        })
      }
      if (allDayContent) {
        sections.push({
          type: 'body',
          key: 'all-day',
          syncRowHeights: true,
          chunks: [
            {
              key: 'axis',
              rowContent: function (contentArg) {
                return createElement(
                  'tr',
                  null,
                  _this.renderTableRowAxis(contentArg.rowSyncHeights[0])
                )
              }
            },
            {
              key: 'cols',
              content: allDayContent
            }
          ]
        })
        sections.push({
          key: 'all-day-divider',
          type: 'body',
          // TODO: rename to cellContent so don't need to define <tr>?
          outerContent: createElement(
            'tr',
            { className: 'fc-scrollgrid-section' },
            createElement('td', {
              colSpan: 2,
              className:
                'fc-timegrid-divider ' +
                context.theme.getClass('tableCellShaded')
            })
          )
        })
      }
      const isNowIndicator = context.options.nowIndicator
      sections.push({
        type: 'body',
        key: 'body',
        liquid: true,
        expandRows: Boolean(context.options.expandRows),
        chunks: [
          {
            key: 'axis',
            content: function (arg) {
              // TODO: make this now-indicator arrow more DRY with TimeColsContent
              return createElement(
                'div',
                { className: 'fc-timegrid-axis-chunk' },
                createElement(
                  'table',
                  { style: { height: arg.expandRows ? arg.clientHeight : '' } },
                  arg.tableColGroupNode,
                  createElement(
                    'tbody',
                    null,
                    createElement(TimeBodyAxis, { slatMetas })
                  )
                ),
                createElement(
                  'div',
                  { className: 'fc-timegrid-now-indicator-container' },
                  createElement(
                    NowTimer,
                    { unit: isNowIndicator ? 'minute' : 'day' /* hacky */ },
                    function (nowDate) {
                      const nowIndicatorTop =
                        isNowIndicator &&
                        slatCoords &&
                        slatCoords.safeComputeTop(nowDate) // might return void
                      if (typeof nowIndicatorTop === 'number') {
                        return createElement(
                          NowIndicatorRoot,
                          {
                            isAxis: true,
                            date: nowDate
                          },
                          function (
                            rootElRef,
                            classNames,
                            innerElRef,
                            innerContent
                          ) {
                            return createElement(
                              'div',
                              {
                                ref: rootElRef,
                                className: ['fc-timegrid-now-indicator-arrow']
                                  .concat(classNames)
                                  .join(' '),
                                style: { top: nowIndicatorTop }
                              },
                              innerContent
                            )
                          }
                        )
                      }
                      return null
                    }
                  )
                )
              )
            }
          },
          {
            key: 'cols',
            scrollerElRef: this.scrollerElRef,
            content: timeContent
          }
        ]
      })
      if (stickyFooterScrollbar) {
        sections.push({
          key: 'footer',
          type: 'footer',
          isSticky: true,
          chunks: [
            {
              key: 'axis',
              content: renderScrollShim
            },
            {
              key: 'cols',
              content: renderScrollShim
            }
          ]
        })
      }
      return createElement(
        ViewRoot,
        {
          viewSpec: context.viewSpec,
          elRef: this.rootElRef
        },
        function (rootElRef, classNames) {
          return createElement(
            'div',
            {
              className: ['fc-timegrid'].concat(classNames).join(' '),
              ref: rootElRef
            },
            createElement(ScrollGrid, {
              liquid: !props.isHeightAuto && !props.forPrint,
              colGroups: [
                { width: 'shrink', cols: [{ width: 'shrink' }] },
                { cols: [{ span: colCnt, minWidth: dayMinWidth }] }
              ],
              sections
            })
          )
        }
      )
    }
    /* Dimensions
        ------------------------------------------------------------------------------------------------------------------ */
    TimeColsView.prototype.getAllDayMaxEventProps = function () {
      const _a = this.context.options
      let dayMaxEvents = _a.dayMaxEvents
      let dayMaxEventRows = _a.dayMaxEventRows
      if (dayMaxEvents === true || dayMaxEventRows === true) {
        // is auto?
        dayMaxEvents = undefined
        dayMaxEventRows = AUTO_ALL_DAY_MAX_EVENT_ROWS // make sure "auto" goes to a real number
      }
      return { dayMaxEvents, dayMaxEventRows }
    }
    return TimeColsView
  })(DateComponent)

  function renderAllDayInner (hookProps) {
    return hookProps.text
  }

  var TimeBodyAxis = /** @class */ (function (_super) {
    __extends(TimeBodyAxis, _super)

    function TimeBodyAxis () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TimeBodyAxis.prototype.render = function () {
      return this.props.slatMetas.map(function (slatMeta) {
        return createElement(
          'tr',
          { key: slatMeta.key },
          createElement(TimeColsAxisCell, __assign({}, slatMeta))
        )
      })
    }
    return TimeBodyAxis
  })(BaseComponent)

  function splitSegsByCol (segs, colCnt) {
    const segsByCol = []
    let i
    for (i = 0; i < colCnt; i++) {
      segsByCol.push([])
    }
    if (segs) {
      for (i = 0; i < segs.length; i++) {
        segsByCol[segs[i].col].push(segs[i])
      }
    }
    return segsByCol
  }

  function splitInteractionByCol (ui, colCnt) {
    const byRow = []
    if (!ui) {
      for (var i = 0; i < colCnt; i++) {
        byRow[i] = null
      }
    } else {
      for (var i = 0; i < colCnt; i++) {
        byRow[i] = {
          affectedInstances: ui.affectedInstances,
          isEvent: ui.isEvent,
          segs: []
        }
      }
      for (let _i = 0, _a = ui.segs; _i < _a.length; _i++) {
        const seg = _a[_i]
        byRow[seg.col].segs.push(seg)
      }
    }
    return byRow
  }

  // UNFORTUNATELY, assigns results to the top/bottom/level/forwardCoord/backwardCoord props of the actual segs.
  // TODO: return hash (by instanceId) of results
  function computeSegCoords (
    segs,
    dayDate,
    slatCoords,
    eventMinHeight,
    eventOrderSpecs
  ) {
    computeSegVerticals(segs, dayDate, slatCoords, eventMinHeight)
    return computeSegHorizontals(segs, eventOrderSpecs) // requires top/bottom from computeSegVerticals
  }

  // For each segment in an array, computes and assigns its top and bottom properties
  function computeSegVerticals (segs, dayDate, slatCoords, eventMinHeight) {
    for (let _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
      const seg = segs_1[_i]
      seg.top = slatCoords.computeDateTop(seg.start, dayDate)
      seg.bottom = Math.max(
        seg.top + (eventMinHeight || 0), // yuck
        slatCoords.computeDateTop(seg.end, dayDate)
      )
    }
  }

  // Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
  // Assumed the segs are already ordered.
  // NOTE: Also reorders the given array by date!
  function computeSegHorizontals (segs, eventOrderSpecs) {
    // IMPORTANT TO CLEAR OLD RESULTS :(
    for (let _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
      var seg = segs_2[_i]
      seg.level = null
      seg.forwardCoord = null
      seg.backwardCoord = null
      seg.forwardPressure = null
    }
    segs = sortEventSegs(segs, eventOrderSpecs)
    let level0
    const levels = buildSlotSegLevels(segs)
    computeForwardSlotSegs(levels)
    if ((level0 = levels[0])) {
      for (let _a = 0, level0_1 = level0; _a < level0_1.length; _a++) {
        var seg = level0_1[_a]
        computeSlotSegPressures(seg)
      }
      for (let _b = 0, level0_2 = level0; _b < level0_2.length; _b++) {
        var seg = level0_2[_b]
        computeSegForwardBack(seg, 0, 0, eventOrderSpecs)
      }
    }
    return segs
  }

  // Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
  // left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
  function buildSlotSegLevels (segs) {
    const levels = []
    let i
    let seg
    let j
    for (i = 0; i < segs.length; i++) {
      seg = segs[i]
      // go through all the levels and stop on the first level where there are no collisions
      for (j = 0; j < levels.length; j++) {
        if (!computeSlotSegCollisions(seg, levels[j]).length) {
          break
        }
      }
      seg.level = j;
      (levels[j] || (levels[j] = [])).push(seg)
    }
    return levels
  }

  // Find all the segments in `otherSegs` that vertically collide with `seg`.
  // Append into an optionally-supplied `results` array and return.
  function computeSlotSegCollisions (seg, otherSegs, results) {
    if (results === void 0) {
      results = []
    }
    for (let i = 0; i < otherSegs.length; i++) {
      if (isSlotSegCollision(seg, otherSegs[i])) {
        results.push(otherSegs[i])
      }
    }
    return results
  }

  // Do these segments occupy the same vertical space?
  function isSlotSegCollision (seg1, seg2) {
    return seg1.bottom > seg2.top && seg1.top < seg2.bottom
  }

  // For every segment, figure out the other segments that are in subsequent
  // levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
  function computeForwardSlotSegs (levels) {
    let i
    let level
    let j
    let seg
    let k
    for (i = 0; i < levels.length; i++) {
      level = levels[i]
      for (j = 0; j < level.length; j++) {
        seg = level[j]
        seg.forwardSegs = []
        for (k = i + 1; k < levels.length; k++) {
          computeSlotSegCollisions(seg, levels[k], seg.forwardSegs)
        }
      }
    }
  }

  // Figure out which path forward (via seg.forwardSegs) results in the longest path until
  // the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
  function computeSlotSegPressures (seg) {
    const forwardSegs = seg.forwardSegs
    let forwardPressure = 0
    let i
    let forwardSeg
    if (seg.forwardPressure == null) {
      // not already computed
      for (i = 0; i < forwardSegs.length; i++) {
        forwardSeg = forwardSegs[i]
        // figure out the child's maximum forward path
        computeSlotSegPressures(forwardSeg)
        // either use the existing maximum, or use the child's forward pressure
        // plus one (for the forwardSeg itself)
        forwardPressure = Math.max(
          forwardPressure,
          1 + forwardSeg.forwardPressure
        )
      }
      seg.forwardPressure = forwardPressure
    }
  }

  // Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
  // from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
  // seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
  //
  // The segment might be part of a "series", which means consecutive segments with the same pressure
  // who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
  // segments behind this one in the current series, and `seriesBackwardCoord` is the starting
  // coordinate of the first segment in the series.
  function computeSegForwardBack (
    seg,
    seriesBackwardPressure,
    seriesBackwardCoord,
    eventOrderSpecs
  ) {
    const forwardSegs = seg.forwardSegs
    let i
    if (seg.forwardCoord == null) {
      // not already computed
      if (!forwardSegs.length) {
        // if there are no forward segments, this segment should butt up against the edge
        seg.forwardCoord = 1
      } else {
        // sort highest pressure first
        sortForwardSegs(forwardSegs, eventOrderSpecs)
        // this segment's forwardCoord will be calculated from the backwardCoord of the
        // highest-pressure forward segment.
        computeSegForwardBack(
          forwardSegs[0],
          seriesBackwardPressure + 1,
          seriesBackwardCoord,
          eventOrderSpecs
        )
        seg.forwardCoord = forwardSegs[0].backwardCoord
      }
      // calculate the backwardCoord from the forwardCoord. consider the series
      seg.backwardCoord =
        seg.forwardCoord -
        (seg.forwardCoord - seriesBackwardCoord) / // available width for series
          (seriesBackwardPressure + 1) // # of segments in the series
      // use this segment's coordinates to computed the coordinates of the less-pressurized
      // forward segments
      for (i = 0; i < forwardSegs.length; i++) {
        computeSegForwardBack(
          forwardSegs[i],
          0,
          seg.forwardCoord,
          eventOrderSpecs
        )
      }
    }
  }

  function sortForwardSegs (forwardSegs, eventOrderSpecs) {
    const objs = forwardSegs.map(buildTimeGridSegCompareObj)
    const specs = [
      // put higher-pressure first
      { field: 'forwardPressure', order: -1 },
      // put segments that are closer to initial edge first (and favor ones with no coords yet)
      { field: 'backwardCoord', order: 1 }
    ].concat(eventOrderSpecs)
    objs.sort(function (obj0, obj1) {
      return compareByFieldSpecs(obj0, obj1, specs)
    })
    return objs.map(function (c) {
      return c._seg
    })
  }

  function buildTimeGridSegCompareObj (seg) {
    const obj = buildSegCompareObj(seg)
    obj.forwardPressure = seg.forwardPressure
    obj.backwardCoord = seg.backwardCoord
    return obj
  }

  const DEFAULT_TIME_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false
  })
  const TimeColEvent = /** @class */ (function (_super) {
    __extends(TimeColEvent, _super)

    function TimeColEvent () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TimeColEvent.prototype.render = function () {
      const classNames = ['fc-timegrid-event', 'fc-v-event']
      if (this.props.isCondensed) {
        classNames.push('fc-timegrid-event-condensed')
      }
      return createElement(
        StandardEvent,
        __assign({}, this.props, {
          defaultTimeFormat: DEFAULT_TIME_FORMAT,
          extraClassNames: classNames
        })
      )
    }
    return TimeColEvent
  })(BaseComponent)

  config.timeGridEventCondensedHeight = 30
  const TimeCol = /** @class */ (function (_super) {
    __extends(TimeCol, _super)

    function TimeCol () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TimeCol.prototype.render = function () {
      const _this = this
      const _a = this
      const props = _a.props
      const context = _a.context
      const isSelectMirror = context.options.selectMirror
      const mirrorSegs =
        (props.eventDrag && props.eventDrag.segs) ||
        (props.eventResize && props.eventResize.segs) ||
        (isSelectMirror && props.dateSelectionSegs) ||
        []
      const interactionAffectedInstances = // TODO: messy way to compute this
        (props.eventDrag && props.eventDrag.affectedInstances) ||
        (props.eventResize && props.eventResize.affectedInstances) ||
        {}
      return createElement(
        DayCellRoot,
        {
          elRef: props.elRef,
          date: props.date,
          dateProfile: props.dateProfile,
          todayRange: props.todayRange,
          extraHookProps: props.extraHookProps
        },
        function (rootElRef, classNames, dataAttrs) {
          return createElement(
            'td',
            __assign(
              {
                ref: rootElRef,
                className: ['fc-timegrid-col']
                  .concat(classNames, props.extraClassNames || [])
                  .join(' ')
              },
              dataAttrs,
              props.extraDataAttrs
            ),
            createElement(
              'div',
              { className: 'fc-timegrid-col-frame' },
              createElement(
                'div',
                { className: 'fc-timegrid-col-bg' },
                _this.renderFillSegs(props.businessHourSegs, 'non-business'),
                _this.renderFillSegs(props.bgEventSegs, 'bg-event'),
                _this.renderFillSegs(props.dateSelectionSegs, 'highlight')
              ),
              createElement(
                'div',
                { className: 'fc-timegrid-col-events' },
                _this.renderFgSegs(
                  props.fgEventSegs,
                  interactionAffectedInstances
                )
              ),
              createElement(
                'div',
                { className: 'fc-timegrid-col-events' },
                _this.renderFgSegs(
                  mirrorSegs,
                  {},
                  Boolean(props.eventDrag),
                  Boolean(props.eventResize),
                  Boolean(isSelectMirror)
                  // TODO: pass in left/right instead of using only computeSegTopBottomCss
                )
              ),
              createElement(
                'div',
                { className: 'fc-timegrid-now-indicator-container' },
                _this.renderNowIndicator(props.nowIndicatorSegs)
              ),
              createElement(TimeColMisc, {
                date: props.date,
                dateProfile: props.dateProfile,
                todayRange: props.todayRange,
                extraHookProps: props.extraHookProps
              })
            )
          )
        }
      )
    }
    TimeCol.prototype.renderFgSegs = function (
      segs,
      segIsInvisible,
      isDragging,
      isResizing,
      isDateSelecting
    ) {
      const props = this.props
      if (props.forPrint) {
        return this.renderPrintFgSegs(segs)
      } else if (props.slatCoords) {
        return this.renderPositionedFgSegs(
          segs,
          segIsInvisible,
          isDragging,
          isResizing,
          isDateSelecting
        )
      }
    }
    TimeCol.prototype.renderPrintFgSegs = function (segs) {
      const _a = this
      const props = _a.props
      const context = _a.context
      // not DRY
      segs = sortEventSegs(segs, context.options.eventOrder)
      return segs.map(function (seg) {
        return createElement(
          'div',
          {
            className: 'fc-timegrid-event-harness',
            key: seg.eventRange.instance.instanceId
          },
          createElement(
            TimeColEvent,
            __assign(
              {
                seg,
                isDragging: false,
                isResizing: false,
                isDateSelecting: false,
                isSelected: false,
                isCondensed: false
              },
              getSegMeta(seg, props.todayRange, props.nowDate)
            )
          )
        )
      })
    }
    TimeCol.prototype.renderPositionedFgSegs = function (
      segs,
      segIsInvisible,
      isDragging,
      isResizing,
      isDateSelecting
    ) {
      const _this = this
      const _a = this
      const context = _a.context
      const props = _a.props
      // assigns TO THE SEGS THEMSELVES
      // also, receives resorted array
      segs = computeSegCoords(
        segs,
        props.date,
        props.slatCoords,
        context.options.eventMinHeight,
        context.options.eventOrder
      )
      return segs.map(function (seg) {
        const instanceId = seg.eventRange.instance.instanceId
        const isMirror = isDragging || isResizing || isDateSelecting
        const positionCss = isMirror
          ? __assign({ left: 0, right: 0 }, _this.computeSegTopBottomCss(seg))
          : _this.computeFgSegPositionCss(seg)
        return createElement(
          'div',
          {
            className:
              'fc-timegrid-event-harness' +
              (seg.level > 0 ? ' fc-timegrid-event-harness-inset' : ''),
            key: instanceId,
            style: __assign(
              { visibility: segIsInvisible[instanceId] ? 'hidden' : '' },
              positionCss
            )
          },
          createElement(
            TimeColEvent,
            __assign(
              {
                seg,
                isDragging,
                isResizing,
                isDateSelecting,
                isSelected: instanceId === props.eventSelection,
                isCondensed:
                  seg.bottom - seg.top < config.timeGridEventCondensedHeight
              },
              getSegMeta(seg, props.todayRange, props.nowDate)
            )
          )
        )
      })
    }
    TimeCol.prototype.renderFillSegs = function (segs, fillType) {
      const _this = this
      const _a = this
      const context = _a.context
      const props = _a.props
      if (!props.slatCoords) {
        return
      }
      // BAD: assigns TO THE SEGS THEMSELVES
      computeSegVerticals(
        segs,
        props.date,
        props.slatCoords,
        context.options.eventMinHeight
      )
      const children = segs.map(function (seg) {
        return createElement(
          'div',
          {
            key: buildEventRangeKey(seg.eventRange),
            className: 'fc-timegrid-bg-harness',
            style: _this.computeSegTopBottomCss(seg)
          },
          fillType === 'bg-event'
            ? createElement(
              BgEvent,
              __assign(
                { seg },
                getSegMeta(seg, props.todayRange, props.nowDate)
              )
            )
            : renderFill(fillType)
        )
      })
      return createElement(Fragment, null, children)
    }
    TimeCol.prototype.renderNowIndicator = function (segs) {
      const _a = this.props
      const slatCoords = _a.slatCoords
      const date = _a.date
      if (!slatCoords) {
        return
      }
      return segs.map(function (seg, i) {
        return createElement(
          NowIndicatorRoot,
          {
            isAxis: false,
            date,
            key: i /* key doesn't matter. will only ever be one */
          },
          function (rootElRef, classNames, innerElRef, innerContent) {
            return createElement(
              'div',
              {
                ref: rootElRef,
                className: ['fc-timegrid-now-indicator-line']
                  .concat(classNames)
                  .join(' '),
                style: { top: slatCoords.computeDateTop(seg.start, date) }
              },
              innerContent
            )
          }
        )
      })
    }
    TimeCol.prototype.computeFgSegPositionCss = function (seg) {
      const _a = this.context
      const isRtl = _a.isRtl
      const options = _a.options
      const shouldOverlap = options.slotEventOverlap
      const backwardCoord = seg.backwardCoord // the left side if LTR. the right side if RTL. floating-point
      let forwardCoord = seg.forwardCoord // the right side if LTR. the left side if RTL. floating-point
      let left // amount of space from left edge, a fraction of the total width
      let right // amount of space from right edge, a fraction of the total width
      if (shouldOverlap) {
        // double the width, but don't go beyond the maximum forward coordinate (1.0)
        forwardCoord = Math.min(
          1,
          backwardCoord + (forwardCoord - backwardCoord) * 2
        )
      }
      if (isRtl) {
        left = 1 - forwardCoord
        right = backwardCoord
      } else {
        left = backwardCoord
        right = 1 - forwardCoord
      }
      const props = {
        zIndex: seg.level + 1,
        left: left * 100 + '%',
        right: right * 100 + '%'
      }
      if (shouldOverlap && seg.forwardPressure) {
        // add padding to the edge so that forward stacked events don't cover the resizer's icon
        props[isRtl ? 'marginLeft' : 'marginRight'] = 10 * 2 // 10 is a guesstimate of the icon's width
      }
      return __assign(__assign({}, props), this.computeSegTopBottomCss(seg))
    }
    TimeCol.prototype.computeSegTopBottomCss = function (seg) {
      return {
        top: seg.top,
        bottom: -seg.bottom
      }
    }
    return TimeCol
  })(BaseComponent)
  var TimeColMisc = /** @class */ (function (_super) {
    __extends(TimeColMisc, _super)

    function TimeColMisc () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    TimeColMisc.prototype.render = function () {
      const props = this.props
      return createElement(
        DayCellContent,
        {
          date: props.date,
          dateProfile: props.dateProfile,
          todayRange: props.todayRange,
          extraHookProps: props.extraHookProps
        },
        function (innerElRef, innerContent) {
          return (
            innerContent &&
            createElement(
              'div',
              { className: 'fc-timegrid-col-misc', ref: innerElRef },
              innerContent
            )
          )
        }
      )
    }
    return TimeColMisc
  })(BaseComponent)

  const TimeColsContent = /** @class */ (function (_super) {
    __extends(TimeColsContent, _super)

    function TimeColsContent () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.splitFgEventSegs = memoize(splitSegsByCol)
      _this.splitBgEventSegs = memoize(splitSegsByCol)
      _this.splitBusinessHourSegs = memoize(splitSegsByCol)
      _this.splitNowIndicatorSegs = memoize(splitSegsByCol)
      _this.splitDateSelectionSegs = memoize(splitSegsByCol)
      _this.splitEventDrag = memoize(splitInteractionByCol)
      _this.splitEventResize = memoize(splitInteractionByCol)
      _this.rootElRef = createRef()
      _this.cellElRefs = new RefMap()
      return _this
    }

    TimeColsContent.prototype.render = function () {
      const _this = this
      const _a = this
      const props = _a.props
      const context = _a.context
      const nowIndicatorTop =
        context.options.nowIndicator &&
        props.slatCoords &&
        props.slatCoords.safeComputeTop(props.nowDate) // might return void
      const colCnt = props.cells.length
      const fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, colCnt)
      const bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, colCnt)
      const businessHourSegsByRow = this.splitBusinessHourSegs(
        props.businessHourSegs,
        colCnt
      )
      const nowIndicatorSegsByRow = this.splitNowIndicatorSegs(
        props.nowIndicatorSegs,
        colCnt
      )
      const dateSelectionSegsByRow = this.splitDateSelectionSegs(
        props.dateSelectionSegs,
        colCnt
      )
      const eventDragByRow = this.splitEventDrag(props.eventDrag, colCnt)
      const eventResizeByRow = this.splitEventResize(props.eventResize, colCnt)
      return createElement(
        'div',
        { className: 'fc-timegrid-cols', ref: this.rootElRef },
        createElement(
          'table',
          {
            style: {
              minWidth: props.tableMinWidth,
              width: props.clientWidth
            }
          },
          props.tableColGroupNode,
          createElement(
            'tbody',
            null,
            createElement(
              'tr',
              null,
              props.axis &&
                createElement(
                  'td',
                  { className: 'fc-timegrid-col fc-timegrid-axis' },
                  createElement(
                    'div',
                    { className: 'fc-timegrid-col-frame' },
                    createElement(
                      'div',
                      { className: 'fc-timegrid-now-indicator-container' },
                      typeof nowIndicatorTop === 'number' &&
                        createElement(
                          NowIndicatorRoot,
                          {
                            isAxis: true,
                            date: props.nowDate
                          },
                          function (
                            rootElRef,
                            classNames,
                            innerElRef,
                            innerContent
                          ) {
                            return createElement(
                              'div',
                              {
                                ref: rootElRef,
                                className: ['fc-timegrid-now-indicator-arrow']
                                  .concat(classNames)
                                  .join(' '),
                                style: { top: nowIndicatorTop }
                              },
                              innerContent
                            )
                          }
                        )
                    )
                  )
                ),
              props.cells.map(function (cell, i) {
                return createElement(TimeCol, {
                  key: cell.key,
                  elRef: _this.cellElRefs.createRef(cell.key),
                  dateProfile: props.dateProfile,
                  date: cell.date,
                  nowDate: props.nowDate,
                  todayRange: props.todayRange,
                  extraHookProps: cell.extraHookProps,
                  extraDataAttrs: cell.extraDataAttrs,
                  extraClassNames: cell.extraClassNames,
                  fgEventSegs: fgEventSegsByRow[i],
                  bgEventSegs: bgEventSegsByRow[i],
                  businessHourSegs: businessHourSegsByRow[i],
                  nowIndicatorSegs: nowIndicatorSegsByRow[i],
                  dateSelectionSegs: dateSelectionSegsByRow[i],
                  eventDrag: eventDragByRow[i],
                  eventResize: eventResizeByRow[i],
                  slatCoords: props.slatCoords,
                  eventSelection: props.eventSelection,
                  forPrint: props.forPrint
                })
              })
            )
          )
        )
      )
    }
    TimeColsContent.prototype.componentDidMount = function () {
      this.updateCoords()
    }
    TimeColsContent.prototype.componentDidUpdate = function () {
      this.updateCoords()
    }
    TimeColsContent.prototype.updateCoords = function () {
      const props = this.props
      if (
        props.onColCoords &&
        props.clientWidth !== null // means sizing has stabilized
      ) {
        props.onColCoords(
          new PositionCache(
            this.rootElRef.current,
            collectCellEls(this.cellElRefs.currentMap, props.cells),
            true, // horizontal
            false
          )
        )
      }
    }
    return TimeColsContent
  })(BaseComponent)

  function collectCellEls (elMap, cells) {
    return cells.map(function (cell) {
      return elMap[cell.key]
    })
  }

  /* A component that renders one or more columns of vertical time slots
    ---------------------------------------------------------------------------------------------------------------------- */
  const TimeCols = /** @class */ (function (_super) {
    __extends(TimeCols, _super)

    function TimeCols () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.processSlotOptions = memoize(processSlotOptions)
      _this.state = {
        slatCoords: null
      }
      _this.handleScrollRequest = function (request) {
        const onScrollTopRequest = _this.props.onScrollTopRequest
        const slatCoords = _this.state.slatCoords
        if (onScrollTopRequest && slatCoords) {
          if (request.time) {
            let top_1 = slatCoords.computeTimeTop(request.time)
            top_1 = Math.ceil(top_1) // zoom can give weird floating-point values. rather scroll a little bit further
            if (top_1) {
              top_1++
            } // to overcome top border that slots beyond the first have. looks better
            onScrollTopRequest(top_1)
          }
          return true
        }
      }
      _this.handleColCoords = function (colCoords) {
        _this.colCoords = colCoords
      }
      _this.handleSlatCoords = function (slatCoords) {
        _this.setState({ slatCoords })
        if (_this.props.onSlatCoords) {
          _this.props.onSlatCoords(slatCoords)
        }
      }
      return _this
    }

    TimeCols.prototype.render = function () {
      const _a = this
      const props = _a.props
      const state = _a.state
      return createElement(
        'div',
        {
          className: 'fc-timegrid-body',
          ref: props.rootElRef,
          style: {
            // these props are important to give this wrapper correct dimensions for interactions
            // TODO: if we set it here, can we avoid giving to inner tables?
            width: props.clientWidth,
            minWidth: props.tableMinWidth
          }
        },
        createElement(TimeColsSlats, {
          axis: props.axis,
          dateProfile: props.dateProfile,
          slatMetas: props.slatMetas,
          clientWidth: props.clientWidth,
          minHeight: props.expandRows ? props.clientHeight : '',
          tableMinWidth: props.tableMinWidth,
          tableColGroupNode: props.axis
            ? props.tableColGroupNode
            : null /* axis depends on the colgroup's shrinking */,
          onCoords: this.handleSlatCoords
        }),
        createElement(TimeColsContent, {
          cells: props.cells,
          axis: props.axis,
          dateProfile: props.dateProfile,
          businessHourSegs: props.businessHourSegs,
          bgEventSegs: props.bgEventSegs,
          fgEventSegs: props.fgEventSegs,
          dateSelectionSegs: props.dateSelectionSegs,
          eventSelection: props.eventSelection,
          eventDrag: props.eventDrag,
          eventResize: props.eventResize,
          todayRange: props.todayRange,
          nowDate: props.nowDate,
          nowIndicatorSegs: props.nowIndicatorSegs,
          clientWidth: props.clientWidth,
          tableMinWidth: props.tableMinWidth,
          tableColGroupNode: props.tableColGroupNode,
          slatCoords: state.slatCoords,
          onColCoords: this.handleColCoords,
          forPrint: props.forPrint
        })
      )
    }
    TimeCols.prototype.componentDidMount = function () {
      this.scrollResponder = this.context.createScrollResponder(
        this.handleScrollRequest
      )
    }
    TimeCols.prototype.componentDidUpdate = function (prevProps) {
      this.scrollResponder.update(
        prevProps.dateProfile !== this.props.dateProfile
      )
    }
    TimeCols.prototype.componentWillUnmount = function () {
      this.scrollResponder.detach()
    }
    TimeCols.prototype.positionToHit = function (positionLeft, positionTop) {
      const _a = this.context
      const dateEnv = _a.dateEnv
      const options = _a.options
      const colCoords = this.colCoords
      const dateProfile = this.props.dateProfile
      const slatCoords = this.state.slatCoords
      const _b = this.processSlotOptions(
        this.props.slotDuration,
        options.snapDuration
      )
      const snapDuration = _b.snapDuration
      const snapsPerSlot = _b.snapsPerSlot
      const colIndex = colCoords.leftToIndex(positionLeft)
      const slatIndex = slatCoords.positions.topToIndex(positionTop)
      if (colIndex != null && slatIndex != null) {
        const slatTop = slatCoords.positions.tops[slatIndex]
        const slatHeight = slatCoords.positions.getHeight(slatIndex)
        const partial = (positionTop - slatTop) / slatHeight // floating point number between 0 and 1
        const localSnapIndex = Math.floor(partial * snapsPerSlot) // the snap # relative to start of slat
        const snapIndex = slatIndex * snapsPerSlot + localSnapIndex
        const dayDate = this.props.cells[colIndex].date
        const time = addDurations(
          dateProfile.slotMinTime,
          multiplyDuration(snapDuration, snapIndex)
        )
        const start = dateEnv.add(dayDate, time)
        const end = dateEnv.add(start, snapDuration)
        return {
          col: colIndex,
          dateSpan: {
            range: { start, end },
            allDay: false
          },
          dayEl: colCoords.els[colIndex],
          relativeRect: {
            left: colCoords.lefts[colIndex],
            right: colCoords.rights[colIndex],
            top: slatTop,
            bottom: slatTop + slatHeight
          }
        }
      }
    }
    return TimeCols
  })(BaseComponent)

  function processSlotOptions (slotDuration, snapDurationOverride) {
    let snapDuration = snapDurationOverride || slotDuration
    let snapsPerSlot = wholeDivideDurations(slotDuration, snapDuration)
    if (snapsPerSlot === null) {
      snapDuration = slotDuration
      snapsPerSlot = 1
      // TODO: say warning?
    }
    return { snapDuration, snapsPerSlot }
  }

  const DayTimeCols = /** @class */ (function (_super) {
    __extends(DayTimeCols, _super)

    function DayTimeCols () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.buildDayRanges = memoize(buildDayRanges)
      _this.slicer = new DayTimeColsSlicer()
      _this.timeColsRef = createRef()
      _this.handleRootEl = function (rootEl) {
        if (rootEl) {
          _this.context.registerInteractiveComponent(_this, { el: rootEl })
        } else {
          _this.context.unregisterInteractiveComponent(_this)
        }
      }
      return _this
    }

    DayTimeCols.prototype.render = function () {
      const _this = this
      const _a = this
      const props = _a.props
      const context = _a.context
      const dateProfile = props.dateProfile
      const dayTableModel = props.dayTableModel
      const isNowIndicator = context.options.nowIndicator
      const dayRanges = this.buildDayRanges(
        dayTableModel,
        dateProfile,
        context.dateEnv
      )
      // give it the first row of cells
      // TODO: would move this further down hierarchy, but sliceNowDate needs it
      return createElement(
        NowTimer,
        { unit: isNowIndicator ? 'minute' : 'day' },
        function (nowDate, todayRange) {
          return createElement(
            TimeCols,
            __assign(
              {
                ref: _this.timeColsRef,
                rootElRef: _this.handleRootEl
              },
              _this.slicer.sliceProps(
                props,
                dateProfile,
                null,
                context,
                dayRanges
              ),
              {
                forPrint: props.forPrint,
                axis: props.axis,
                dateProfile,
                slatMetas: props.slatMetas,
                slotDuration: props.slotDuration,
                cells: dayTableModel.cells[0],
                tableColGroupNode: props.tableColGroupNode,
                tableMinWidth: props.tableMinWidth,
                clientWidth: props.clientWidth,
                clientHeight: props.clientHeight,
                expandRows: props.expandRows,
                nowDate,
                nowIndicatorSegs:
                  isNowIndicator &&
                  _this.slicer.sliceNowDate(nowDate, context, dayRanges),
                todayRange,
                onScrollTopRequest: props.onScrollTopRequest,
                onSlatCoords: props.onSlatCoords
              }
            )
          )
        }
      )
    }
    DayTimeCols.prototype.queryHit = function (positionLeft, positionTop) {
      const rawHit = this.timeColsRef.current.positionToHit(
        positionLeft,
        positionTop
      )
      if (rawHit) {
        return {
          component: this,
          dateSpan: rawHit.dateSpan,
          dayEl: rawHit.dayEl,
          rect: {
            left: rawHit.relativeRect.left,
            right: rawHit.relativeRect.right,
            top: rawHit.relativeRect.top,
            bottom: rawHit.relativeRect.bottom
          },
          layer: 0
        }
      }
    }
    return DayTimeCols
  })(DateComponent)

  function buildDayRanges (dayTableModel, dateProfile, dateEnv) {
    const ranges = []
    for (let _i = 0, _a = dayTableModel.headerDates; _i < _a.length; _i++) {
      const date = _a[_i]
      ranges.push({
        start: dateEnv.add(date, dateProfile.slotMinTime),
        end: dateEnv.add(date, dateProfile.slotMaxTime)
      })
    }
    return ranges
  }

  var DayTimeColsSlicer = /** @class */ (function (_super) {
    __extends(DayTimeColsSlicer, _super)

    function DayTimeColsSlicer () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    DayTimeColsSlicer.prototype.sliceRange = function (range, dayRanges) {
      const segs = []
      for (let col = 0; col < dayRanges.length; col++) {
        const segRange = intersectRanges(range, dayRanges[col])
        if (segRange) {
          segs.push({
            start: segRange.start,
            end: segRange.end,
            isStart: segRange.start.valueOf() === range.start.valueOf(),
            isEnd: segRange.end.valueOf() === range.end.valueOf(),
            col
          })
        }
      }
      return segs
    }
    return DayTimeColsSlicer
  })(Slicer)

  const DayTimeColsView = /** @class */ (function (_super) {
    __extends(DayTimeColsView, _super)

    function DayTimeColsView () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.buildTimeColsModel = memoize(buildTimeColsModel)
      _this.buildSlatMetas = memoize(buildSlatMetas)
      return _this
    }

    DayTimeColsView.prototype.render = function () {
      const _this = this
      const _a = this.context
      const options = _a.options
      const dateEnv = _a.dateEnv
      const dateProfileGenerator = _a.dateProfileGenerator
      const props = this.props
      const dateProfile = props.dateProfile
      const dayTableModel = this.buildTimeColsModel(
        dateProfile,
        dateProfileGenerator
      )
      const splitProps = this.allDaySplitter.splitProps(props)
      const slatMetas = this.buildSlatMetas(
        dateProfile.slotMinTime,
        dateProfile.slotMaxTime,
        options.slotLabelInterval,
        options.slotDuration,
        dateEnv
      )
      const dayMinWidth = options.dayMinWidth
      const hasAttachedAxis = !dayMinWidth
      const hasDetachedAxis = dayMinWidth
      const headerContent =
        options.dayHeaders &&
        createElement(DayHeader, {
          dates: dayTableModel.headerDates,
          dateProfile,
          datesRepDistinctDays: true,
          renderIntro: hasAttachedAxis ? this.renderHeadAxis : null
        })
      const allDayContent =
        options.allDaySlot !== false &&
        function (contentArg) {
          return createElement(
            DayTable,
            __assign(
              {},
              splitProps.allDay,
              {
                dateProfile,
                dayTableModel,
                nextDayThreshold: options.nextDayThreshold,
                tableMinWidth: contentArg.tableMinWidth,
                colGroupNode: contentArg.tableColGroupNode,
                renderRowIntro: hasAttachedAxis
                  ? _this.renderTableRowAxis
                  : null,
                showWeekNumbers: false,
                expandRows: false,
                headerAlignElRef: _this.headerElRef,
                clientWidth: contentArg.clientWidth,
                clientHeight: contentArg.clientHeight,
                forPrint: props.forPrint
              },
              _this.getAllDayMaxEventProps()
            )
          )
        }
      const timeGridContent = function (contentArg) {
        return createElement(
          DayTimeCols,
          __assign({}, splitProps.timed, {
            dayTableModel,
            dateProfile,
            axis: hasAttachedAxis,
            slotDuration: options.slotDuration,
            slatMetas,
            forPrint: props.forPrint,
            tableColGroupNode: contentArg.tableColGroupNode,
            tableMinWidth: contentArg.tableMinWidth,
            clientWidth: contentArg.clientWidth,
            clientHeight: contentArg.clientHeight,
            onSlatCoords: _this.handleSlatCoords,
            expandRows: contentArg.expandRows,
            onScrollTopRequest: _this.handleScrollTopRequest
          })
        )
      }
      return hasDetachedAxis
        ? this.renderHScrollLayout(
          headerContent,
          allDayContent,
          timeGridContent,
          dayTableModel.colCnt,
          dayMinWidth,
          slatMetas,
          this.state.slatCoords
        )
        : this.renderSimpleLayout(
          headerContent,
          allDayContent,
          timeGridContent
        )
    }
    return DayTimeColsView
  })(TimeColsView)

  function buildTimeColsModel (dateProfile, dateProfileGenerator) {
    const daySeries = new DaySeriesModel(
      dateProfile.renderRange,
      dateProfileGenerator
    )
    return new DayTableModel(daySeries, false)
  }

  const OPTION_REFINERS$1 = {
    allDaySlot: Boolean
  }

  const timeGridPlugin = createPlugin({
    initialView: 'timeGridWeek',
    optionRefiners: OPTION_REFINERS$1,
    views: {
      timeGrid: {
        component: DayTimeColsView,
        usesMinMaxTime: true,
        allDaySlot: true,
        slotDuration: '00:30:00',
        slotEventOverlap: true // a bad name. confused with overlap/constraint system
      },
      timeGridDay: {
        type: 'timeGrid',
        duration: { days: 1 }
      },
      timeGridWeek: {
        type: 'timeGrid',
        duration: { weeks: 1 }
      }
    }
  })

  const ListViewHeaderRow = /** @class */ (function (_super) {
    __extends(ListViewHeaderRow, _super)

    function ListViewHeaderRow () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    ListViewHeaderRow.prototype.render = function () {
      const _a = this.props
      const dayDate = _a.dayDate
      const todayRange = _a.todayRange
      const _b = this.context
      const theme = _b.theme
      const dateEnv = _b.dateEnv
      const options = _b.options
      const viewApi = _b.viewApi
      const dayMeta = getDateMeta(dayDate, todayRange)
      const text = options.listDayFormat
        ? dateEnv.format(dayDate, options.listDayFormat)
        : '' // will ever be falsy?
      const sideText = options.listDaySideFormat
        ? dateEnv.format(dayDate, options.listDaySideFormat)
        : '' // will ever be falsy? also, BAD NAME "alt"
      const navLinkData = options.navLinks ? buildNavLinkData(dayDate) : null
      const hookProps = __assign(
        {
          date: dateEnv.toDate(dayDate),
          view: viewApi,
          text,
          sideText,
          navLinkData
        },
        dayMeta
      )
      const classNames = ['fc-list-day'].concat(getDayClassNames(dayMeta, theme))
      // TODO: make a reusable HOC for dayHeader (used in daygrid/timegrid too)
      return createElement(
        RenderHook,
        {
          hookProps,
          classNames: options.dayHeaderClassNames,
          content: options.dayHeaderContent,
          defaultContent: renderInnerContent$4,
          didMount: options.dayHeaderDidMount,
          willUnmount: options.dayHeaderWillUnmount
        },
        function (rootElRef, customClassNames, innerElRef, innerContent) {
          return createElement(
            'tr',
            {
              ref: rootElRef,
              className: classNames.concat(customClassNames).join(' '),
              'data-date': formatDayString(dayDate)
            },
            createElement(
              'th',
              { colSpan: 3 },
              createElement(
                'div',
                {
                  className:
                    'fc-list-day-cushion ' + theme.getClass('tableCellShaded'),
                  ref: innerElRef
                },
                innerContent
              )
            )
          )
        }
      )
    }
    return ListViewHeaderRow
  })(BaseComponent)

  function renderInnerContent$4 (props) {
    const navLinkAttrs = props.navLinkData // is there a type for this?
      ? { 'data-navlink': props.navLinkData, tabIndex: 0 }
      : {}
    return createElement(
      Fragment,
      null,
      props.text &&
        createElement(
          'a',
          __assign({ className: 'fc-list-day-text' }, navLinkAttrs),
          props.text
        ),
      props.sideText &&
        createElement(
          'a',
          __assign({ className: 'fc-list-day-side-text' }, navLinkAttrs),
          props.sideText
        )
    )
  }

  const DEFAULT_TIME_FORMAT$1 = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short'
  })
  const ListViewEventRow = /** @class */ (function (_super) {
    __extends(ListViewEventRow, _super)

    function ListViewEventRow () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    ListViewEventRow.prototype.render = function () {
      const _a = this
      const props = _a.props
      const context = _a.context
      const seg = props.seg
      const timeFormat = context.options.eventTimeFormat || DEFAULT_TIME_FORMAT$1
      return createElement(
        EventRoot,
        {
          seg,
          timeText: '' /* BAD. because of all-day content */,
          disableDragging: true,
          disableResizing: true,
          defaultContent: renderEventInnerContent,
          isPast: props.isPast,
          isFuture: props.isFuture,
          isToday: props.isToday,
          isSelected: props.isSelected,
          isDragging: props.isDragging,
          isResizing: props.isResizing,
          isDateSelecting: props.isDateSelecting
        },
        function (rootElRef, classNames, innerElRef, innerContent, hookProps) {
          return createElement(
            'tr',
            {
              className: [
                'fc-list-event',
                hookProps.event.url ? 'fc-event-forced-url' : ''
              ]
                .concat(classNames)
                .join(' '),
              ref: rootElRef
            },
            buildTimeContent(seg, timeFormat, context),
            createElement(
              'td',
              { className: 'fc-list-event-graphic' },
              createElement('span', {
                className: 'fc-list-event-dot',
                style: {
                  borderColor:
                    hookProps.borderColor || hookProps.backgroundColor
                }
              })
            ),
            createElement(
              'td',
              { className: 'fc-list-event-title', ref: innerElRef },
              innerContent
            )
          )
        }
      )
    }
    return ListViewEventRow
  })(BaseComponent)

  function renderEventInnerContent (props) {
    const event = props.event
    const url = event.url
    const anchorAttrs = url ? { href: url } : {}
    return createElement('a', __assign({}, anchorAttrs), event.title)
  }

  function buildTimeContent (seg, timeFormat, context) {
    const options = context.options
    if (options.displayEventTime !== false) {
      const eventDef = seg.eventRange.def
      const eventInstance = seg.eventRange.instance
      let doAllDay = false
      let timeText = void 0
      if (eventDef.allDay) {
        doAllDay = true
      } else if (isMultiDayRange(seg.eventRange.range)) {
        // TODO: use (!isStart || !isEnd) instead?
        if (seg.isStart) {
          timeText = buildSegTimeText(
            seg,
            timeFormat,
            context,
            null,
            null,
            eventInstance.range.start,
            seg.end
          )
        } else if (seg.isEnd) {
          timeText = buildSegTimeText(
            seg,
            timeFormat,
            context,
            null,
            null,
            seg.start,
            eventInstance.range.end
          )
        } else {
          doAllDay = true
        }
      } else {
        timeText = buildSegTimeText(seg, timeFormat, context)
      }
      if (doAllDay) {
        const hookProps = {
          text: context.options.allDayText,
          view: context.viewApi
        }
        return createElement(
          RenderHook,
          {
            hookProps,
            classNames: options.allDayClassNames,
            content: options.allDayContent,
            defaultContent: renderAllDayInner$1,
            didMount: options.allDayDidMount,
            willUnmount: options.allDayWillUnmount
          },
          function (rootElRef, classNames, innerElRef, innerContent) {
            return createElement(
              'td',
              {
                className: ['fc-list-event-time'].concat(classNames).join(' '),
                ref: rootElRef
              },
              innerContent
            )
          }
        )
      } else {
        return createElement(
          'td',
          { className: 'fc-list-event-time' },
          timeText
        )
      }
    }
    return null
  }

  function renderAllDayInner$1 (hookProps) {
    return hookProps.text
  }

  /*
    Responsible for the scroller, and forwarding event-related actions into the "grid".
    */
  const ListView = /** @class */ (function (_super) {
    __extends(ListView, _super)

    function ListView () {
      const _this = (_super !== null && _super.apply(this, arguments)) || this
      _this.computeDateVars = memoize(computeDateVars)
      _this.eventStoreToSegs = memoize(_this._eventStoreToSegs)
      _this.setRootEl = function (rootEl) {
        if (rootEl) {
          _this.context.registerInteractiveComponent(_this, {
            el: rootEl
          })
        } else {
          _this.context.unregisterInteractiveComponent(_this)
        }
      }
      return _this
    }

    ListView.prototype.render = function () {
      const _this = this
      const _a = this
      const props = _a.props
      const context = _a.context
      const extraClassNames = [
        'fc-list',
        context.theme.getClass('table'),
        context.options.stickyHeaderDates !== false ? 'fc-list-sticky' : ''
      ]
      const _b = this.computeDateVars(props.dateProfile)
      const dayDates = _b.dayDates
      const dayRanges = _b.dayRanges
      const eventSegs = this.eventStoreToSegs(
        props.eventStore,
        props.eventUiBases,
        dayRanges
      )
      return createElement(
        ViewRoot,
        {
          viewSpec: context.viewSpec,
          elRef: this.setRootEl
        },
        function (rootElRef, classNames) {
          return createElement(
            'div',
            {
              ref: rootElRef,
              className: extraClassNames.concat(classNames).join(' ')
            },
            createElement(
              Scroller,
              {
                liquid: !props.isHeightAuto,
                overflowX: props.isHeightAuto ? 'visible' : 'hidden',
                overflowY: props.isHeightAuto ? 'visible' : 'auto'
              },
              eventSegs.length > 0
                ? _this.renderSegList(eventSegs, dayDates)
                : _this.renderEmptyMessage()
            )
          )
        }
      )
    }
    ListView.prototype.renderEmptyMessage = function () {
      const _a = this.context
      const options = _a.options
      const viewApi = _a.viewApi
      const hookProps = {
        text: options.noEventsText,
        view: viewApi
      }
      return createElement(
        RenderHook,
        {
          hookProps,
          classNames: options.noEventsClassNames,
          content: options.noEventsContent,
          defaultContent: renderNoEventsInner,
          didMount: options.noEventsDidMount,
          willUnmount: options.noEventsWillUnmount
        },
        function (rootElRef, classNames, innerElRef, innerContent) {
          return createElement(
            'div',
            {
              className: ['fc-list-empty'].concat(classNames).join(' '),
              ref: rootElRef
            },
            createElement(
              'div',
              { className: 'fc-list-empty-cushion', ref: innerElRef },
              innerContent
            )
          )
        }
      )
    }
    ListView.prototype.renderSegList = function (allSegs, dayDates) {
      const _a = this.context
      const theme = _a.theme
      const options = _a.options
      const segsByDay = groupSegsByDay(allSegs) // sparse array
      return createElement(
        NowTimer,
        { unit: 'day' },
        function (nowDate, todayRange) {
          const innerNodes = []
          for (let dayIndex = 0; dayIndex < segsByDay.length; dayIndex++) {
            let daySegs = segsByDay[dayIndex]
            if (daySegs) {
              // sparse array, so might be undefined
              const dayStr = dayDates[dayIndex].toISOString()
              // append a day header
              innerNodes.push(
                createElement(ListViewHeaderRow, {
                  key: dayStr,
                  dayDate: dayDates[dayIndex],
                  todayRange
                })
              )
              daySegs = sortEventSegs(daySegs, options.eventOrder)
              for (
                let _i = 0, daySegs_1 = daySegs;
                _i < daySegs_1.length;
                _i++
              ) {
                const seg = daySegs_1[_i]
                innerNodes.push(
                  createElement(
                    ListViewEventRow,
                    __assign(
                      {
                        key:
                          dayStr +
                          ':' +
                          seg.eventRange.instance
                            .instanceId /* are multiple segs for an instanceId */,
                        seg,
                        isDragging: false,
                        isResizing: false,
                        isDateSelecting: false,
                        isSelected: false
                      },
                      getSegMeta(seg, todayRange, nowDate)
                    )
                  )
                )
              }
            }
          }
          return createElement(
            'table',
            { className: 'fc-list-table ' + theme.getClass('table') },
            createElement('tbody', null, innerNodes)
          )
        }
      )
    }
    ListView.prototype._eventStoreToSegs = function (
      eventStore,
      eventUiBases,
      dayRanges
    ) {
      return this.eventRangesToSegs(
        sliceEventStore(
          eventStore,
          eventUiBases,
          this.props.dateProfile.activeRange,
          this.context.options.nextDayThreshold
        ).fg,
        dayRanges
      )
    }
    ListView.prototype.eventRangesToSegs = function (eventRanges, dayRanges) {
      const segs = []
      for (
        let _i = 0, eventRanges_1 = eventRanges;
        _i < eventRanges_1.length;
        _i++
      ) {
        const eventRange = eventRanges_1[_i]
        segs.push.apply(segs, this.eventRangeToSegs(eventRange, dayRanges))
      }
      return segs
    }
    ListView.prototype.eventRangeToSegs = function (eventRange, dayRanges) {
      const dateEnv = this.context.dateEnv
      const nextDayThreshold = this.context.options.nextDayThreshold
      const range = eventRange.range
      const allDay = eventRange.def.allDay
      let dayIndex
      let segRange
      let seg
      const segs = []
      for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex++) {
        segRange = intersectRanges(range, dayRanges[dayIndex])
        if (segRange) {
          seg = {
            component: this,
            eventRange,
            start: segRange.start,
            end: segRange.end,
            isStart:
              eventRange.isStart &&
              segRange.start.valueOf() === range.start.valueOf(),
            isEnd:
              eventRange.isEnd &&
              segRange.end.valueOf() === range.end.valueOf(),
            dayIndex
          }
          segs.push(seg)
          // detect when range won't go fully into the next day,
          // and mutate the latest seg to the be the end.
          if (
            !seg.isEnd &&
            !allDay &&
            dayIndex + 1 < dayRanges.length &&
            range.end <
              dateEnv.add(dayRanges[dayIndex + 1].start, nextDayThreshold)
          ) {
            seg.end = range.end
            seg.isEnd = true
            break
          }
        }
      }
      return segs
    }
    return ListView
  })(DateComponent)

  function renderNoEventsInner (hookProps) {
    return hookProps.text
  }

  function computeDateVars (dateProfile) {
    let dayStart = startOfDay(dateProfile.renderRange.start)
    const viewEnd = dateProfile.renderRange.end
    const dayDates = []
    const dayRanges = []
    while (dayStart < viewEnd) {
      dayDates.push(dayStart)
      dayRanges.push({
        start: dayStart,
        end: addDays(dayStart, 1)
      })
      dayStart = addDays(dayStart, 1)
    }
    return { dayDates, dayRanges }
  }

  // Returns a sparse array of arrays, segs grouped by their dayIndex
  function groupSegsByDay (segs) {
    const segsByDay = [] // sparse array
    let i
    let seg
    for (i = 0; i < segs.length; i++) {
      seg = segs[i];
      (segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = [])).push(seg)
    }
    return segsByDay
  }

  const OPTION_REFINERS$2 = {
    listDayFormat: createFalsableFormatter,
    listDaySideFormat: createFalsableFormatter,
    noEventsClassNames: identity,
    noEventsContent: identity,
    noEventsDidMount: identity,
    noEventsWillUnmount: identity
    // noEventsText is defined in base options
  }

  function createFalsableFormatter (input) {
    return input === false ? null : createFormatter(input)
  }

  const listPlugin = createPlugin({
    optionRefiners: OPTION_REFINERS$2,
    views: {
      list: {
        component: ListView,
        buttonTextKey: 'list',
        listDayFormat: { month: 'long', day: 'numeric', year: 'numeric' } // like "January 1, 2016"
      },
      listDay: {
        type: 'list',
        duration: { days: 1 },
        listDayFormat: { weekday: 'long' } // day-of-week is all we need. full date is probably in headerToolbar
      },
      listWeek: {
        type: 'list',
        duration: { weeks: 1 },
        listDayFormat: { weekday: 'long' },
        listDaySideFormat: { month: 'long', day: 'numeric', year: 'numeric' }
      },
      listMonth: {
        type: 'list',
        duration: { month: 1 },
        listDaySideFormat: { weekday: 'long' } // day-of-week is nice-to-have
      },
      listYear: {
        type: 'list',
        duration: { year: 1 },
        listDaySideFormat: { weekday: 'long' } // day-of-week is nice-to-have
      }
    }
  })

  const BootstrapTheme = /** @class */ (function (_super) {
    __extends(BootstrapTheme, _super)

    function BootstrapTheme () {
      return (_super !== null && _super.apply(this, arguments)) || this
    }

    return BootstrapTheme
  })(Theme)
  BootstrapTheme.prototype.classes = {
    root: 'fc-theme-bootstrap',
    table: 'table-bordered',
    tableCellShaded: 'table-active',
    buttonGroup: 'btn-group',
    button: 'btn btn-primary',
    buttonActive: 'active',
    popover: 'popover',
    popoverHeader: 'popover-header',
    popoverContent: 'popover-body'
  }
  BootstrapTheme.prototype.baseIconClass = 'fa'
  BootstrapTheme.prototype.iconClasses = {
    close: 'fa-times',
    prev: 'fa-chevron-left',
    next: 'fa-chevron-right',
    prevYear: 'fa-angle-double-left',
    nextYear: 'fa-angle-double-right'
  }
  BootstrapTheme.prototype.rtlIconClasses = {
    prev: 'fa-chevron-right',
    next: 'fa-chevron-left',
    prevYear: 'fa-angle-double-right',
    nextYear: 'fa-angle-double-left'
  }
  BootstrapTheme.prototype.iconOverrideOption = 'bootstrapFontAwesome' // TODO: make TS-friendly. move the option-processing into this plugin
  BootstrapTheme.prototype.iconOverrideCustomButtonOption =
    'bootstrapFontAwesome'
  BootstrapTheme.prototype.iconOverridePrefix = 'fa-'
  const plugin = createPlugin({
    themeClasses: {
      bootstrap: BootstrapTheme
    }
  })

  // rename this file to options.ts like other packages?
  const OPTION_REFINERS$3 = {
    googleCalendarApiKey: String
  }

  const EVENT_SOURCE_REFINERS$1 = {
    googleCalendarApiKey: String,
    googleCalendarId: String,
    googleCalendarApiBase: String,
    extraParams: identity
  }

  // TODO: expose somehow
  const API_BASE = 'https://www.googleapis.com/calendar/v3/calendars'
  const eventSourceDef$3 = {
    parseMeta: function (refined) {
      let googleCalendarId = refined.googleCalendarId
      if (!googleCalendarId && refined.url) {
        googleCalendarId = parseGoogleCalendarId(refined.url)
      }
      if (googleCalendarId) {
        return {
          googleCalendarId,
          googleCalendarApiKey: refined.googleCalendarApiKey,
          googleCalendarApiBase: refined.googleCalendarApiBase,
          extraParams: refined.extraParams
        }
      }
      return null
    },
    fetch: function (arg, onSuccess, onFailure) {
      const _a = arg.context
      const dateEnv = _a.dateEnv
      const options = _a.options
      const meta = arg.eventSource.meta
      const apiKey = meta.googleCalendarApiKey || options.googleCalendarApiKey
      if (!apiKey) {
        onFailure({
          message:
            'Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/'
        })
      } else {
        const url = buildUrl(meta)
        // TODO: make DRY with json-feed-event-source
        const extraParams = meta.extraParams
        const extraParamsObj =
          typeof extraParams === 'function' ? extraParams() : extraParams
        const requestParams_1 = buildRequestParams$1(
          arg.range,
          apiKey,
          extraParamsObj,
          dateEnv
        )
        requestJson(
          'GET',
          url,
          requestParams_1,
          function (body, xhr) {
            if (body.error) {
              onFailure({
                message: 'Google Calendar API: ' + body.error.message,
                errors: body.error.errors,
                xhr
              })
            } else {
              onSuccess({
                rawEvents: gcalItemsToRawEventDefs(
                  body.items,
                  requestParams_1.timeZone
                ),
                xhr
              })
            }
          },
          function (message, xhr) {
            onFailure({ message, xhr })
          }
        )
      }
    }
  }

  function parseGoogleCalendarId (url) {
    let match
    // detect if the ID was specified as a single string.
    // will match calendars like "asdf1234@calendar.google.com" in addition to person email calendars.
    if (/^[^/]+@([^/.]+\.)*(google|googlemail|gmail)\.com$/.test(url)) {
      return url
    } else if (
      (match =
        /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^/]*)/.exec(
          url
        )) ||
      (match = /^https?:\/\/www.google.com\/calendar\/feeds\/([^/]*)/.exec(url))
    ) {
      return decodeURIComponent(match[1])
    }
  }

  function buildUrl (meta) {
    let apiBase = meta.googleCalendarApiBase
    if (!apiBase) {
      apiBase = API_BASE
    }
    return (
      apiBase + '/' + encodeURIComponent(meta.googleCalendarId) + '/events'
    )
  }

  function buildRequestParams$1 (range, apiKey, extraParams, dateEnv) {
    let params
    let startStr
    let endStr
    if (dateEnv.canComputeOffset) {
      // strings will naturally have offsets, which GCal needs
      startStr = dateEnv.formatIso(range.start)
      endStr = dateEnv.formatIso(range.end)
    } else {
      // when timezone isn't known, we don't know what the UTC offset should be, so ask for +/- 1 day
      // from the UTC day-start to guarantee we're getting all the events
      // (start/end will be UTC-coerced dates, so toISOString is okay)
      startStr = addDays(range.start, -1).toISOString()
      endStr = addDays(range.end, 1).toISOString()
    }
    params = __assign(__assign({}, extraParams || {}), {
      key: apiKey,
      timeMin: startStr,
      timeMax: endStr,
      singleEvents: true,
      maxResults: 9999
    })
    if (dateEnv.timeZone !== 'local') {
      params.timeZone = dateEnv.timeZone
    }
    return params
  }

  function gcalItemsToRawEventDefs (items, gcalTimezone) {
    return items.map(function (item) {
      return gcalItemToRawEventDef(item, gcalTimezone)
    })
  }

  function gcalItemToRawEventDef (item, gcalTimezone) {
    let url = item.htmlLink || null
    // make the URLs for each event show times in the correct timezone
    if (url && gcalTimezone) {
      url = injectQsComponent(url, 'ctz=' + gcalTimezone)
    }
    return {
      id: item.id,
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
      url,
      location: item.location,
      description: item.description
    }
  }

  // Injects a string like "arg=value" into the querystring of a URL
  // TODO: move to a general util file?
  function injectQsComponent (url, component) {
    // inject it after the querystring but before the fragment
    return url.replace(/(\?.*?)?(#|$)/, function (whole, qs, hash) {
      return (qs ? qs + '&' : '?') + component + hash
    })
  }

  const googleCalendarPlugin = createPlugin({
    eventSourceDefs: [eventSourceDef$3],
    optionRefiners: OPTION_REFINERS$3,
    eventSourceRefiners: EVENT_SOURCE_REFINERS$1
  })

  globalPlugins.push(
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    plugin,
    googleCalendarPlugin
  )

  exports.BASE_OPTION_DEFAULTS = BASE_OPTION_DEFAULTS
  exports.BASE_OPTION_REFINERS = BASE_OPTION_REFINERS
  exports.BaseComponent = BaseComponent
  exports.BgEvent = BgEvent
  exports.BootstrapTheme = BootstrapTheme
  exports.Calendar = Calendar
  exports.CalendarApi = CalendarApi
  exports.CalendarContent = CalendarContent
  exports.CalendarDataManager = CalendarDataManager
  exports.CalendarDataProvider = CalendarDataProvider
  exports.CalendarRoot = CalendarRoot
  exports.Component = Component
  exports.ContentHook = ContentHook
  exports.CustomContentRenderContext = CustomContentRenderContext
  exports.DateComponent = DateComponent
  exports.DateEnv = DateEnv
  exports.DateProfileGenerator = DateProfileGenerator
  exports.DayCellContent = DayCellContent
  exports.DayCellRoot = DayCellRoot
  exports.DayGridView = DayTableView
  exports.DayHeader = DayHeader
  exports.DaySeriesModel = DaySeriesModel
  exports.DayTable = DayTable
  exports.DayTableModel = DayTableModel
  exports.DayTableSlicer = DayTableSlicer
  exports.DayTimeCols = DayTimeCols
  exports.DayTimeColsSlicer = DayTimeColsSlicer
  exports.DayTimeColsView = DayTimeColsView
  exports.DelayedRunner = DelayedRunner
  exports.Draggable = ExternalDraggable
  exports.ElementDragging = ElementDragging
  exports.ElementScrollController = ElementScrollController
  exports.Emitter = Emitter
  exports.EventApi = EventApi
  exports.EventRoot = EventRoot
  exports.EventSourceApi = EventSourceApi
  exports.FeaturefulElementDragging = FeaturefulElementDragging
  exports.Fragment = Fragment
  exports.Interaction = Interaction
  exports.ListView = ListView
  exports.MountHook = MountHook
  exports.NamedTimeZoneImpl = NamedTimeZoneImpl
  exports.NowIndicatorRoot = NowIndicatorRoot
  exports.NowTimer = NowTimer
  exports.PointerDragging = PointerDragging
  exports.PositionCache = PositionCache
  exports.RefMap = RefMap
  exports.RenderHook = RenderHook
  exports.ScrollController = ScrollController
  exports.ScrollResponder = ScrollResponder
  exports.Scroller = Scroller
  exports.SimpleScrollGrid = SimpleScrollGrid
  exports.Slicer = Slicer
  exports.Splitter = Splitter
  exports.StandardEvent = StandardEvent
  exports.Table = Table
  exports.TableDateCell = TableDateCell
  exports.TableDowCell = TableDowCell
  exports.TableView = TableView
  exports.Theme = Theme
  exports.ThirdPartyDraggable = ThirdPartyDraggable
  exports.TimeCols = TimeCols
  exports.TimeColsSlatsCoords = TimeColsSlatsCoords
  exports.TimeColsView = TimeColsView
  exports.ViewApi = ViewApi
  exports.ViewContextType = ViewContextType
  exports.ViewRoot = ViewRoot
  exports.WeekNumberRoot = WeekNumberRoot
  exports.WindowScrollController = WindowScrollController
  exports.addDays = addDays
  exports.addDurations = addDurations
  exports.addMs = addMs
  exports.addWeeks = addWeeks
  exports.allowContextMenu = allowContextMenu
  exports.allowSelection = allowSelection
  exports.applyMutationToEventStore = applyMutationToEventStore
  exports.applyStyle = applyStyle
  exports.applyStyleProp = applyStyleProp
  exports.asCleanDays = asCleanDays
  exports.asRoughMinutes = asRoughMinutes
  exports.asRoughMs = asRoughMs
  exports.asRoughSeconds = asRoughSeconds
  exports.buildClassNameNormalizer = buildClassNameNormalizer
  exports.buildDayRanges = buildDayRanges
  exports.buildDayTableModel = buildDayTableModel
  exports.buildEventApis = buildEventApis
  exports.buildEventRangeKey = buildEventRangeKey
  exports.buildHashFromArray = buildHashFromArray
  exports.buildNavLinkData = buildNavLinkData
  exports.buildSegCompareObj = buildSegCompareObj
  exports.buildSegTimeText = buildSegTimeText
  exports.buildSlatMetas = buildSlatMetas
  exports.buildTimeColsModel = buildTimeColsModel
  exports.collectFromHash = collectFromHash
  exports.combineEventUis = combineEventUis
  exports.compareByFieldSpec = compareByFieldSpec
  exports.compareByFieldSpecs = compareByFieldSpecs
  exports.compareNumbers = compareNumbers
  exports.compareObjs = compareObjs
  exports.computeEdges = computeEdges
  exports.computeFallbackHeaderFormat = computeFallbackHeaderFormat
  exports.computeHeightAndMargins = computeHeightAndMargins
  exports.computeInnerRect = computeInnerRect
  exports.computeRect = computeRect
  exports.computeSegDraggable = computeSegDraggable
  exports.computeSegEndResizable = computeSegEndResizable
  exports.computeSegStartResizable = computeSegStartResizable
  exports.computeShrinkWidth = computeShrinkWidth
  exports.computeSmallestCellWidth = computeSmallestCellWidth
  exports.computeVisibleDayRange = computeVisibleDayRange
  exports.config = config
  exports.constrainPoint = constrainPoint
  exports.createContext = createContext$1
  exports.createDuration = createDuration
  exports.createElement = createElement
  exports.createEmptyEventStore = createEmptyEventStore
  exports.createEventInstance = createEventInstance
  exports.createEventUi = createEventUi
  exports.createFormatter = createFormatter
  exports.createPlugin = createPlugin
  exports.createRef = createRef
  exports.diffDates = diffDates
  exports.diffDayAndTime = diffDayAndTime
  exports.diffDays = diffDays
  exports.diffPoints = diffPoints
  exports.diffWeeks = diffWeeks
  exports.diffWholeDays = diffWholeDays
  exports.diffWholeWeeks = diffWholeWeeks
  exports.disableCursor = disableCursor
  exports.elementClosest = elementClosest
  exports.elementMatches = elementMatches
  exports.enableCursor = enableCursor
  exports.eventTupleToStore = eventTupleToStore
  exports.filterEventStoreDefs = filterEventStoreDefs
  exports.filterHash = filterHash
  exports.findDirectChildren = findDirectChildren
  exports.findElements = findElements
  exports.flexibleCompare = flexibleCompare
  exports.flushToDom = flushToDom$1
  exports.formatDate = formatDate
  exports.formatDayString = formatDayString
  exports.formatIsoTimeString = formatIsoTimeString
  exports.formatRange = formatRange
  exports.getAllowYScrolling = getAllowYScrolling
  exports.getCanVGrowWithinCell = getCanVGrowWithinCell
  exports.getClippingParents = getClippingParents
  exports.getDateMeta = getDateMeta
  exports.getDayClassNames = getDayClassNames
  exports.getDefaultEventEnd = getDefaultEventEnd
  exports.getElSeg = getElSeg
  exports.getEventClassNames = getEventClassNames
  exports.getIsRtlScrollbarOnLeft = getIsRtlScrollbarOnLeft
  exports.getRectCenter = getRectCenter
  exports.getRelevantEvents = getRelevantEvents
  exports.getScrollGridClassNames = getScrollGridClassNames
  exports.getScrollbarWidths = getScrollbarWidths
  exports.getSectionClassNames = getSectionClassNames
  exports.getSectionHasLiquidHeight = getSectionHasLiquidHeight
  exports.getSegMeta = getSegMeta
  exports.getSlotClassNames = getSlotClassNames
  exports.getStickyFooterScrollbar = getStickyFooterScrollbar
  exports.getStickyHeaderDates = getStickyHeaderDates
  exports.getUnequalProps = getUnequalProps
  exports.globalLocales = globalLocales
  exports.globalPlugins = globalPlugins
  exports.greatestDurationDenominator = greatestDurationDenominator
  exports.guid = guid
  exports.hasBgRendering = hasBgRendering
  exports.hasShrinkWidth = hasShrinkWidth
  exports.identity = identity
  exports.interactionSettingsStore = interactionSettingsStore
  exports.interactionSettingsToStore = interactionSettingsToStore
  exports.intersectRanges = intersectRanges
  exports.intersectRects = intersectRects
  exports.isArraysEqual = isArraysEqual
  exports.isColPropsEqual = isColPropsEqual
  exports.isDateSpansEqual = isDateSpansEqual
  exports.isInt = isInt
  exports.isInteractionValid = isInteractionValid
  exports.isMultiDayRange = isMultiDayRange
  exports.isPropsEqual = isPropsEqual
  exports.isPropsValid = isPropsValid
  exports.isValidDate = isValidDate
  exports.listenBySelector = listenBySelector
  exports.mapHash = mapHash
  exports.memoize = memoize
  exports.memoizeArraylike = memoizeArraylike
  exports.memoizeHashlike = memoizeHashlike
  exports.memoizeObjArg = memoizeObjArg
  exports.mergeEventStores = mergeEventStores
  exports.multiplyDuration = multiplyDuration
  exports.padStart = padStart
  exports.parseBusinessHours = parseBusinessHours
  exports.parseClassNames = parseClassNames
  exports.parseDragMeta = parseDragMeta
  exports.parseEventDef = parseEventDef
  exports.parseFieldSpecs = parseFieldSpecs
  exports.parseMarker = parse
  exports.pointInsideRect = pointInsideRect
  exports.preventContextMenu = preventContextMenu
  exports.preventDefault = preventDefault
  exports.preventSelection = preventSelection
  exports.rangeContainsMarker = rangeContainsMarker
  exports.rangeContainsRange = rangeContainsRange
  exports.rangesEqual = rangesEqual
  exports.rangesIntersect = rangesIntersect
  exports.refineEventDef = refineEventDef
  exports.refineProps = refineProps
  exports.removeElement = removeElement
  exports.removeExact = removeExact
  exports.render = render
  exports.renderChunkContent = renderChunkContent
  exports.renderFill = renderFill
  exports.renderMicroColGroup = renderMicroColGroup
  exports.renderScrollShim = renderScrollShim
  exports.requestJson = requestJson
  exports.sanitizeShrinkWidth = sanitizeShrinkWidth
  exports.setElSeg = setElSeg
  exports.setRef = setRef
  exports.sliceEventStore = sliceEventStore
  exports.sliceEvents = sliceEvents
  exports.sortEventSegs = sortEventSegs
  exports.startOfDay = startOfDay
  exports.translateRect = translateRect
  exports.triggerDateSelect = triggerDateSelect
  exports.unpromisify = unpromisify
  exports.version = version
  exports.whenTransitionDone = whenTransitionDone
  exports.wholeDivideDurations = wholeDivideDurations

  return exports
})({})
