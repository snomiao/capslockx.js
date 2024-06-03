var Vp = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var OA = Vp((KA, dt) => {
  (function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
      n(o);
    new MutationObserver((o) => {
      for (const a of o)
        if (a.type === "childList")
          for (const i of a.addedNodes)
            i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function r(o) {
      const a = {};
      return (
        o.integrity && (a.integrity = o.integrity),
        o.referrerPolicy && (a.referrerPolicy = o.referrerPolicy),
        o.crossOrigin === "use-credentials"
          ? (a.credentials = "include")
          : o.crossOrigin === "anonymous"
            ? (a.credentials = "omit")
            : (a.credentials = "same-origin"),
        a
      );
    }
    function n(o) {
      if (o.ep) return;
      o.ep = !0;
      const a = r(o);
      fetch(o.href, a);
    }
  })();
  function O(e, t, r) {
    return (e.namespaceURI &&
      e.namespaceURI !== "http://www.w3.org/1999/xhtml") ||
      ((t = Array.isArray(t) ? t : [t]), !t.includes(e.tagName.toLowerCase()))
      ? !1
      : r
        ? Object.entries(r).every(([n, o]) => e[n] === o)
        : !0;
  }
  var Gi;
  (function (e) {
    (e.button = "button"),
      (e.color = "color"),
      (e.file = "file"),
      (e.image = "image"),
      (e.reset = "reset"),
      (e.submit = "submit"),
      (e.checkbox = "checkbox"),
      (e.radio = "radio");
  })(Gi || (Gi = {}));
  function Lc(e) {
    return O(e, "button") || (O(e, "input") && e.type in Gi);
  }
  function le(e) {
    var t;
    if (zp(e) && e.defaultView) return e.defaultView;
    if (!((t = e.ownerDocument) === null || t === void 0) && t.defaultView)
      return e.ownerDocument.defaultView;
    throw new Error(`Could not determine window of node. Node was ${Kp(e)}`);
  }
  function zp(e) {
    return e.nodeType === 9;
  }
  function Kp(e) {
    return typeof e == "function"
      ? `function ${e.name}`
      : e === null
        ? "null"
        : String(e);
  }
  function jc(e, t) {
    return new Promise((r, n) => {
      const o = new t();
      (o.onerror = n),
        (o.onabort = n),
        (o.onload = () => {
          r(String(o.result));
        }),
        o.readAsText(e);
    });
  }
  function Bl(e, t) {
    const r = {
      ...t,
      length: t.length,
      item: (n) => r[n],
      [Symbol.iterator]: function* () {
        for (let o = 0; o < r.length; o++) yield r[o];
      },
    };
    return (
      (r.constructor = e.FileList),
      e.FileList && Object.setPrototypeOf(r, e.FileList.prototype),
      Object.freeze(r),
      r
    );
  }
  function Te(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  class Dc {
    getAsFile() {
      return this.file;
    }
    getAsString(t) {
      typeof this.data == "string" && t(this.data);
    }
    webkitGetAsEntry() {
      throw new Error("not implemented");
    }
    constructor(t, r) {
      Te(this, "kind", void 0),
        Te(this, "type", void 0),
        Te(this, "file", null),
        Te(this, "data", void 0),
        typeof t == "string"
          ? ((this.kind = "string"), (this.type = String(r)), (this.data = t))
          : ((this.kind = "file"), (this.type = t.type), (this.file = t));
    }
  }
  class Gp extends Array {
    add(...t) {
      const r = new Dc(t[0], t[1]);
      return this.push(r), r;
    }
    clear() {
      this.splice(0, this.length);
    }
    remove(t) {
      this.splice(t, 1);
    }
  }
  function br(e, t) {
    const [r, n] = e.split("/"),
      o = !n || n === "*";
    return (a) =>
      t
        ? a.type === (o ? r : e)
        : o
          ? a.type.startsWith(`${r}/`)
          : a.type === r;
  }
  function Xp(e) {
    return new (class {
      getData(r) {
        var n;
        const o =
          (n = this.items.find(br(r, !0))) !== null && n !== void 0
            ? n
            : this.items.find(br(r, !1));
        let a = "";
        return (
          o == null ||
            o.getAsString((i) => {
              a = i;
            }),
          a
        );
      }
      setData(r, n) {
        const o = this.items.findIndex(br(r, !0)),
          a = new Dc(n, r);
        o >= 0 ? this.items.splice(o, 1, a) : this.items.push(a);
      }
      clearData(r) {
        if (r) {
          const n = this.items.findIndex(br(r, !0));
          n >= 0 && this.items.remove(n);
        } else this.items.clear();
      }
      get types() {
        const r = [];
        return (
          this.files.length && r.push("Files"),
          this.items.forEach((n) => r.push(n.type)),
          Object.freeze(r),
          r
        );
      }
      setDragImage() {}
      constructor() {
        Te(this, "dropEffect", "none"),
          Te(this, "effectAllowed", "uninitialized"),
          Te(this, "items", new Gp()),
          Te(this, "files", Bl(e, []));
      }
    })();
  }
  function Ll(e, t = []) {
    const r = typeof e.DataTransfer > "u" ? Xp(e) : new e.DataTransfer();
    return Object.defineProperty(r, "files", { get: () => Bl(e, t) }), r;
  }
  function Jp(e, t) {
    if (t.kind === "file") return t.getAsFile();
    let r = "";
    return (
      t.getAsString((n) => {
        r = n;
      }),
      new e.Blob([r], { type: t.type })
    );
  }
  function Fc(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function Uc(e, ...t) {
    const r = Object.fromEntries(
      t.map((n) => [
        typeof n == "string" ? "text/plain" : n.type,
        Promise.resolve(n),
      ]),
    );
    return typeof e.ClipboardItem < "u"
      ? new e.ClipboardItem(r)
      : new (class {
          get types() {
            return Array.from(Object.keys(this.data));
          }
          async getType(o) {
            const a = await this.data[o];
            if (!a)
              throw new Error(
                `${o} is not one of the available MIME types on this item.`,
              );
            return a instanceof e.Blob ? a : new e.Blob([a], { type: o });
          }
          constructor(o) {
            Fc(this, "data", void 0), (this.data = o);
          }
        })(r);
  }
  const ht = Symbol("Manage ClipboardSub");
  function ws(e, t) {
    return Object.assign(
      new (class extends e.EventTarget {
        async read() {
          return Array.from(this.items);
        }
        async readText() {
          let n = "";
          for (const o of this.items) {
            const a = o.types.includes("text/plain")
              ? "text/plain"
              : o.types.find((i) => i.startsWith("text/"));
            a && (n += await o.getType(a).then((i) => jc(i, e.FileReader)));
          }
          return n;
        }
        async write(n) {
          this.items = n;
        }
        async writeText(n) {
          this.items = [Uc(e, n)];
        }
        constructor(...n) {
          super(...n), Fc(this, "items", []);
        }
      })(),
      { [ht]: t },
    );
  }
  function jl(e) {
    return !!(e != null && e[ht]);
  }
  function Yp(e) {
    if (jl(e.navigator.clipboard)) return e.navigator.clipboard[ht];
    const t = Object.getOwnPropertyDescriptor(e.navigator, "clipboard");
    let r;
    const n = {
      resetClipboardStub: () => {
        r = ws(e, n);
      },
      detachClipboardStub: () => {
        t
          ? Object.defineProperty(e.navigator, "clipboard", t)
          : Object.defineProperty(e.navigator, "clipboard", {
              value: void 0,
              configurable: !0,
            });
      },
    };
    return (
      (r = ws(e, n)),
      Object.defineProperty(e.navigator, "clipboard", {
        get: () => r,
        configurable: !0,
      }),
      r[ht]
    );
  }
  function Qp(e) {
    jl(e.navigator.clipboard) && e.navigator.clipboard[ht].resetClipboardStub();
  }
  function Zp(e) {
    jl(e.navigator.clipboard) &&
      e.navigator.clipboard[ht].detachClipboardStub();
  }
  async function ev(e) {
    const t = e.defaultView,
      r = t == null ? void 0 : t.navigator.clipboard,
      n = r && (await r.read());
    if (!n) throw new Error("The Clipboard API is unavailable.");
    const o = Ll(t);
    for (const a of n)
      for (const i of a.types)
        o.setData(i, await a.getType(i).then((s) => jc(s, t.FileReader)));
    return o;
  }
  async function Hc(e, t) {
    const r = le(e),
      n = r.navigator.clipboard,
      o = [];
    for (let i = 0; i < t.items.length; i++) {
      const s = t.items[i],
        l = Jp(r, s);
      o.push(Uc(r, l));
    }
    if (
      !(
        n &&
        (await n.write(o).then(
          () => !0,
          () => !1,
        ))
      )
    )
      throw new Error("The Clipboard API is unavailable.");
  }
  const Ur = globalThis;
  typeof Ur.afterEach == "function" &&
    Ur.afterEach(() => Qp(globalThis.window));
  typeof Ur.afterAll == "function" && Ur.afterAll(() => Zp(globalThis.window));
  function Xe(e) {
    return (
      e.hasAttribute("contenteditable") &&
      (e.getAttribute("contenteditable") == "true" ||
        e.getAttribute("contenteditable") == "")
    );
  }
  function Gt(e) {
    const t = tv(e);
    return (
      t &&
      (t.closest('[contenteditable=""]') ||
        t.closest('[contenteditable="true"]'))
    );
  }
  function tv(e) {
    return e.nodeType === 1 ? e : e.parentElement;
  }
  function gt(e) {
    return (Wc(e) && !e.readOnly) || Xe(e);
  }
  var Xi;
  (function (e) {
    (e.text = "text"),
      (e.date = "date"),
      (e["datetime-local"] = "datetime-local"),
      (e.email = "email"),
      (e.month = "month"),
      (e.number = "number"),
      (e.password = "password"),
      (e.search = "search"),
      (e.tel = "tel"),
      (e.time = "time"),
      (e.url = "url"),
      (e.week = "week");
  })(Xi || (Xi = {}));
  function Wc(e) {
    return O(e, "textarea") || (O(e, "input") && e.type in Xi);
  }
  var Ji;
  (function (e) {
    (e.email = "email"),
      (e.password = "password"),
      (e.search = "search"),
      (e.telephone = "telephone"),
      (e.text = "text"),
      (e.url = "url");
  })(Ji || (Ji = {}));
  function rv(e) {
    var t;
    const r =
      (t = e.getAttribute("maxlength")) !== null && t !== void 0 ? t : "";
    return /^\d+$/.test(r) && Number(r) >= 0 ? Number(r) : void 0;
  }
  function nv(e) {
    return O(e, "textarea") || (O(e, "input") && e.type in Ji);
  }
  const Vc = [
    "input:not([type=hidden]):not([disabled])",
    "button:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[contenteditable=""]',
    '[contenteditable="true"]',
    "a[href]",
    "[tabindex]:not([disabled])",
  ].join(", ");
  function Dl(e) {
    return e.matches(Vc);
  }
  var Hr;
  (function (e) {
    (e["{"] = "}"), (e["["] = "]");
  })(Hr || (Hr = {}));
  function zc(e, t) {
    let r = 0;
    const n = e[r] in Hr ? e[r] : "";
    r += n.length;
    const a = new RegExp(`^\\${n}{2}`).test(e) ? "" : n;
    return { type: a, ...(a === "" ? ov(e, r, t) : av(e, r, a, t)) };
  }
  function ov(e, t, r) {
    const n = e[t];
    return (
      Kc(n, e, t, r),
      (t += n.length),
      {
        consumedLength: t,
        descriptor: n,
        releasePrevious: !1,
        releaseSelf: !0,
        repeat: 1,
      }
    );
  }
  function av(e, t, r, n) {
    var o, a;
    const i = e[t] === "/" ? "/" : "";
    t += i.length;
    const s = r === "{" && e[t] === "\\";
    t += Number(s);
    const l = s
      ? e[t]
      : (o = e.slice(t).match(r === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) === null ||
          o === void 0
        ? void 0
        : o[0];
    Kc(l, e, t, n), (t += l.length);
    var u;
    const c =
      (u =
        (a = e.slice(t).match(/^>\d+/)) === null || a === void 0
          ? void 0
          : a[0]) !== null && u !== void 0
        ? u
        : "";
    t += c.length;
    const d = e[t] === "/" || (!c && e[t] === ">") ? e[t] : "";
    t += d.length;
    const f = Hr[r],
      m = e[t] === f ? f : "";
    if (!m)
      throw new Error(
        Gc(
          [!c && "repeat modifier", !d && "release modifier", `"${f}"`]
            .filter(Boolean)
            .join(" or "),
          e[t],
          e,
          n,
        ),
      );
    return (
      (t += m.length),
      {
        consumedLength: t,
        descriptor: l,
        releasePrevious: !!i,
        repeat: c ? Math.max(Number(c.substr(1)), 1) : 1,
        releaseSelf: iv(d, c),
      }
    );
  }
  function Kc(e, t, r, n) {
    if (!e) throw new Error(Gc("key descriptor", t[r], t, n));
  }
  function iv(e, t) {
    if (e) return e === "/";
    if (t) return !1;
  }
  function Gc(e, t, r, n) {
    return `Expected ${e} but found "${t ?? ""}" in "${r}"
    See ${n === "pointer" ? "https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen" : "https://testing-library.com/docs/user-event/keyboard"}
    for more information about how userEvent parses your input.`;
  }
  function lv(e) {
    return new e.constructor(e.type, e);
  }
  var G;
  (function (e) {
    (e[(e.Trigger = 2)] = "Trigger"), (e[(e.Call = 1)] = "Call");
  })(G || (G = {}));
  function Dt(e, t) {
    e.levelRefs[t] = {};
  }
  function yr(e, t) {
    return e.levelRefs[t];
  }
  var vt;
  (function (e) {
    (e[(e.EachTrigger = 4)] = "EachTrigger"),
      (e[(e.EachApiCall = 2)] = "EachApiCall"),
      (e[(e.EachTarget = 1)] = "EachTarget"),
      (e[(e.Never = 0)] = "Never");
  })(vt || (vt = {}));
  function ye(e) {
    for (let r = e; r; r = r.parentElement)
      if (
        O(r, ["button", "input", "select", "textarea", "optgroup", "option"])
      ) {
        if (r.hasAttribute("disabled")) return !0;
      } else if (O(r, "fieldset")) {
        var t;
        if (
          r.hasAttribute("disabled") &&
          !(
            !(
              (t = r.querySelector(":scope > legend")) === null || t === void 0
            ) && t.contains(e)
          )
        )
          return !0;
      } else if (
        r.tagName.includes("-") &&
        r.constructor.formAssociated &&
        r.hasAttribute("disabled")
      )
        return !0;
    return !1;
  }
  function mn(e) {
    const t = e.activeElement;
    return t != null && t.shadowRoot
      ? mn(t.shadowRoot)
      : ye(t)
        ? e.ownerDocument
          ? e.ownerDocument.body
          : e.body
        : t;
  }
  function li(e) {
    var t;
    return (t = mn(e)) !== null && t !== void 0 ? t : e.body;
  }
  function sv(e, t) {
    let r = e;
    do {
      if (t(r)) return r;
      r = r.parentElement;
    } while (r && r !== e.ownerDocument.body);
  }
  function se(e) {
    return Xc(e) && Wc(e);
  }
  function uv(e) {
    return Xc(e) && Lc(e);
  }
  function Xc(e) {
    return e.nodeType === 1;
  }
  function cv(e) {
    const t = e.ownerDocument.getSelection();
    if (t != null && t.focusNode && se(e)) {
      const n = Gt(t.focusNode);
      if (n) {
        if (!t.isCollapsed) {
          var r;
          const o =
            ((r = n.firstChild) === null || r === void 0
              ? void 0
              : r.nodeType) === 3
              ? n.firstChild
              : n;
          t.setBaseAndExtent(o, 0, o, 0);
        }
      } else t.setBaseAndExtent(e, 0, e, 0);
    }
  }
  var Fl =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {};
  function dv(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  function fv(e) {
    if (e.__esModule) return e;
    var t = e.default;
    if (typeof t == "function") {
      var r = function n() {
        return this instanceof n
          ? Reflect.construct(t, arguments, this.constructor)
          : t.apply(this, arguments);
      };
      r.prototype = t.prototype;
    } else r = {};
    return (
      Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.keys(e).forEach(function (n) {
        var o = Object.getOwnPropertyDescriptor(e, n);
        Object.defineProperty(
          r,
          n,
          o.get
            ? o
            : {
                enumerable: !0,
                get: function () {
                  return e[n];
                },
              },
        );
      }),
      r
    );
  }
  var je = {},
    Ul = { exports: {} };
  Ul.exports;
  (function (e) {
    const r =
        (a = 0) =>
        (i) =>
          `\x1B[${38 + a};5;${i}m`,
      n =
        (a = 0) =>
        (i, s, l) =>
          `\x1B[${38 + a};2;${i};${s};${l}m`;
    function o() {
      const a = new Map(),
        i = {
          modifier: {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            overline: [53, 55],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29],
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39],
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49],
          },
        };
      (i.color.gray = i.color.blackBright),
        (i.bgColor.bgGray = i.bgColor.bgBlackBright),
        (i.color.grey = i.color.blackBright),
        (i.bgColor.bgGrey = i.bgColor.bgBlackBright);
      for (const [s, l] of Object.entries(i)) {
        for (const [u, c] of Object.entries(l))
          (i[u] = { open: `\x1B[${c[0]}m`, close: `\x1B[${c[1]}m` }),
            (l[u] = i[u]),
            a.set(c[0], c[1]);
        Object.defineProperty(i, s, { value: l, enumerable: !1 });
      }
      return (
        Object.defineProperty(i, "codes", { value: a, enumerable: !1 }),
        (i.color.close = "\x1B[39m"),
        (i.bgColor.close = "\x1B[49m"),
        (i.color.ansi256 = r()),
        (i.color.ansi16m = n()),
        (i.bgColor.ansi256 = r(10)),
        (i.bgColor.ansi16m = n(10)),
        Object.defineProperties(i, {
          rgbToAnsi256: {
            value: (s, l, u) =>
              s === l && l === u
                ? s < 8
                  ? 16
                  : s > 248
                    ? 231
                    : Math.round(((s - 8) / 247) * 24) + 232
                : 16 +
                  36 * Math.round((s / 255) * 5) +
                  6 * Math.round((l / 255) * 5) +
                  Math.round((u / 255) * 5),
            enumerable: !1,
          },
          hexToRgb: {
            value: (s) => {
              const l = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(
                s.toString(16),
              );
              if (!l) return [0, 0, 0];
              let { colorString: u } = l.groups;
              u.length === 3 &&
                (u = u
                  .split("")
                  .map((d) => d + d)
                  .join(""));
              const c = Number.parseInt(u, 16);
              return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
            },
            enumerable: !1,
          },
          hexToAnsi256: {
            value: (s) => i.rgbToAnsi256(...i.hexToRgb(s)),
            enumerable: !1,
          },
        }),
        i
      );
    }
    Object.defineProperty(e, "exports", { enumerable: !0, get: o });
  })(Ul);
  var Jc = Ul.exports,
    he = {};
  Object.defineProperty(he, "__esModule", { value: !0 });
  he.printIteratorEntries = vv;
  he.printIteratorValues = mv;
  he.printListItems = bv;
  he.printObjectProperties = yv;
  const pv = (e, t) => {
    const r = Object.keys(e).sort(t);
    return (
      Object.getOwnPropertySymbols &&
        Object.getOwnPropertySymbols(e).forEach((n) => {
          Object.getOwnPropertyDescriptor(e, n).enumerable && r.push(n);
        }),
      r
    );
  };
  function vv(e, t, r, n, o, a, i = ": ") {
    let s = "",
      l = e.next();
    if (!l.done) {
      s += t.spacingOuter;
      const u = r + t.indent;
      for (; !l.done; ) {
        const c = a(l.value[0], t, u, n, o),
          d = a(l.value[1], t, u, n, o);
        (s += u + c + i + d),
          (l = e.next()),
          l.done ? t.min || (s += ",") : (s += "," + t.spacingInner);
      }
      s += t.spacingOuter + r;
    }
    return s;
  }
  function mv(e, t, r, n, o, a) {
    let i = "",
      s = e.next();
    if (!s.done) {
      i += t.spacingOuter;
      const l = r + t.indent;
      for (; !s.done; )
        (i += l + a(s.value, t, l, n, o)),
          (s = e.next()),
          s.done ? t.min || (i += ",") : (i += "," + t.spacingInner);
      i += t.spacingOuter + r;
    }
    return i;
  }
  function bv(e, t, r, n, o, a) {
    let i = "";
    if (e.length) {
      i += t.spacingOuter;
      const s = r + t.indent;
      for (let l = 0; l < e.length; l++)
        (i += s),
          l in e && (i += a(e[l], t, s, n, o)),
          l < e.length - 1 ? (i += "," + t.spacingInner) : t.min || (i += ",");
      i += t.spacingOuter + r;
    }
    return i;
  }
  function yv(e, t, r, n, o, a) {
    let i = "";
    const s = pv(e, t.compareKeys);
    if (s.length) {
      i += t.spacingOuter;
      const l = r + t.indent;
      for (let u = 0; u < s.length; u++) {
        const c = s[u],
          d = a(c, t, l, n, o),
          f = a(e[c], t, l, n, o);
        (i += l + d + ": " + f),
          u < s.length - 1 ? (i += "," + t.spacingInner) : t.min || (i += ",");
      }
      i += t.spacingOuter + r;
    }
    return i;
  }
  var Ae = {};
  Object.defineProperty(Ae, "__esModule", { value: !0 });
  Ae.test = Ae.serialize = Ae.default = void 0;
  var Cs = he,
    Wr = (function () {
      return typeof globalThis < "u"
        ? globalThis
        : typeof Wr < "u"
          ? Wr
          : typeof self < "u"
            ? self
            : typeof window < "u"
              ? window
              : Function("return this")();
    })(),
    si = Wr["jest-symbol-do-not-touch"] || Wr.Symbol;
  const hv =
      typeof si == "function" && si.for
        ? si.for("jest.asymmetricMatcher")
        : 1267621,
    hr = " ",
    Yc = (e, t, r, n, o, a) => {
      const i = e.toString();
      return i === "ArrayContaining" || i === "ArrayNotContaining"
        ? ++n > t.maxDepth
          ? "[" + i + "]"
          : i + hr + "[" + (0, Cs.printListItems)(e.sample, t, r, n, o, a) + "]"
        : i === "ObjectContaining" || i === "ObjectNotContaining"
          ? ++n > t.maxDepth
            ? "[" + i + "]"
            : i +
              hr +
              "{" +
              (0, Cs.printObjectProperties)(e.sample, t, r, n, o, a) +
              "}"
          : i === "StringMatching" ||
              i === "StringNotMatching" ||
              i === "StringContaining" ||
              i === "StringNotContaining"
            ? i + hr + a(e.sample, t, r, n, o)
            : e.toAsymmetricMatcher();
    };
  Ae.serialize = Yc;
  const Qc = (e) => e && e.$$typeof === hv;
  Ae.test = Qc;
  const gv = { serialize: Yc, test: Qc };
  var Ev = gv;
  Ae.default = Ev;
  var Me = {},
    wv = ({ onlyFirst: e = !1 } = {}) => {
      const t = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
      ].join("|");
      return new RegExp(t, e ? void 0 : "g");
    };
  Object.defineProperty(Me, "__esModule", { value: !0 });
  Me.test = Me.serialize = Me.default = void 0;
  var Zc = ed(wv),
    M = ed(Jc);
  function ed(e) {
    return e && e.__esModule ? e : { default: e };
  }
  const Cv = (e) =>
      e.replace((0, Zc.default)(), (t) => {
        switch (t) {
          case M.default.red.close:
          case M.default.green.close:
          case M.default.cyan.close:
          case M.default.gray.close:
          case M.default.white.close:
          case M.default.yellow.close:
          case M.default.bgRed.close:
          case M.default.bgGreen.close:
          case M.default.bgYellow.close:
          case M.default.inverse.close:
          case M.default.dim.close:
          case M.default.bold.close:
          case M.default.reset.open:
          case M.default.reset.close:
            return "</>";
          case M.default.red.open:
            return "<red>";
          case M.default.green.open:
            return "<green>";
          case M.default.cyan.open:
            return "<cyan>";
          case M.default.gray.open:
            return "<gray>";
          case M.default.white.open:
            return "<white>";
          case M.default.yellow.open:
            return "<yellow>";
          case M.default.bgRed.open:
            return "<bgRed>";
          case M.default.bgGreen.open:
            return "<bgGreen>";
          case M.default.bgYellow.open:
            return "<bgYellow>";
          case M.default.inverse.open:
            return "<inverse>";
          case M.default.dim.open:
            return "<dim>";
          case M.default.bold.open:
            return "<bold>";
          default:
            return "";
        }
      }),
    td = (e) => typeof e == "string" && !!e.match((0, Zc.default)());
  Me.test = td;
  const rd = (e, t, r, n, o, a) => a(Cv(e), t, r, n, o);
  Me.serialize = rd;
  const Pv = { serialize: rd, test: td };
  var Rv = Pv;
  Me.default = Rv;
  var Ie = {};
  Object.defineProperty(Ie, "__esModule", { value: !0 });
  Ie.test = Ie.serialize = Ie.default = void 0;
  var Ps = he;
  const _v = " ",
    nd = ["DOMStringMap", "NamedNodeMap"],
    Sv = /^(HTML\w*Collection|NodeList)$/,
    Ov = (e) => nd.indexOf(e) !== -1 || Sv.test(e),
    od = (e) =>
      e && e.constructor && !!e.constructor.name && Ov(e.constructor.name);
  Ie.test = od;
  const xv = (e) => e.constructor.name === "NamedNodeMap",
    ad = (e, t, r, n, o, a) => {
      const i = e.constructor.name;
      return ++n > t.maxDepth
        ? "[" + i + "]"
        : (t.min ? "" : i + _v) +
            (nd.indexOf(i) !== -1
              ? "{" +
                (0, Ps.printObjectProperties)(
                  xv(e)
                    ? Array.from(e).reduce(
                        (s, l) => ((s[l.name] = l.value), s),
                        {},
                      )
                    : { ...e },
                  t,
                  r,
                  n,
                  o,
                  a,
                ) +
                "}"
              : "[" +
                (0, Ps.printListItems)(Array.from(e), t, r, n, o, a) +
                "]");
    };
  Ie.serialize = ad;
  const Tv = { serialize: ad, test: od };
  var $v = Tv;
  Ie.default = $v;
  var ke = {},
    F = {},
    Hl = {};
  Object.defineProperty(Hl, "__esModule", { value: !0 });
  Hl.default = qv;
  function qv(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  Object.defineProperty(F, "__esModule", { value: !0 });
  F.printText =
    F.printProps =
    F.printElementAsLeaf =
    F.printElement =
    F.printComment =
    F.printChildren =
      void 0;
  var id = Av(Hl);
  function Av(e) {
    return e && e.__esModule ? e : { default: e };
  }
  const Mv = (e, t, r, n, o, a, i) => {
    const s = n + r.indent,
      l = r.colors;
    return e
      .map((u) => {
        const c = t[u];
        let d = i(c, r, s, o, a);
        return (
          typeof c != "string" &&
            (d.indexOf(`
`) !== -1 && (d = r.spacingOuter + s + d + r.spacingOuter + n),
            (d = "{" + d + "}")),
          r.spacingInner +
            n +
            l.prop.open +
            u +
            l.prop.close +
            "=" +
            l.value.open +
            d +
            l.value.close
        );
      })
      .join("");
  };
  F.printProps = Mv;
  const Iv = (e, t, r, n, o, a) =>
    e
      .map(
        (i) =>
          t.spacingOuter +
          r +
          (typeof i == "string" ? ld(i, t) : a(i, t, r, n, o)),
      )
      .join("");
  F.printChildren = Iv;
  const ld = (e, t) => {
    const r = t.colors.content;
    return r.open + (0, id.default)(e) + r.close;
  };
  F.printText = ld;
  const kv = (e, t) => {
    const r = t.colors.comment;
    return r.open + "<!--" + (0, id.default)(e) + "-->" + r.close;
  };
  F.printComment = kv;
  const Nv = (e, t, r, n, o) => {
    const a = n.colors.tag;
    return (
      a.open +
      "<" +
      e +
      (t && a.close + t + n.spacingOuter + o + a.open) +
      (r
        ? ">" + a.close + r + n.spacingOuter + o + a.open + "</" + e
        : (t && !n.min ? "" : " ") + "/") +
      ">" +
      a.close
    );
  };
  F.printElement = Nv;
  const Bv = (e, t) => {
    const r = t.colors.tag;
    return r.open + "<" + e + r.close + " …" + r.open + " />" + r.close;
  };
  F.printElementAsLeaf = Bv;
  Object.defineProperty(ke, "__esModule", { value: !0 });
  ke.test = ke.serialize = ke.default = void 0;
  var ot = F;
  const Lv = 1,
    sd = 3,
    ud = 8,
    cd = 11,
    jv = /^((HTML|SVG)\w*)?Element$/,
    Dv = (e) => {
      try {
        return typeof e.hasAttribute == "function" && e.hasAttribute("is");
      } catch {
        return !1;
      }
    },
    Fv = (e) => {
      const t = e.constructor.name,
        { nodeType: r, tagName: n } = e,
        o = (typeof n == "string" && n.includes("-")) || Dv(e);
      return (
        (r === Lv && (jv.test(t) || o)) ||
        (r === sd && t === "Text") ||
        (r === ud && t === "Comment") ||
        (r === cd && t === "DocumentFragment")
      );
    },
    dd = (e) => {
      var t;
      return (
        (e == null || (t = e.constructor) === null || t === void 0
          ? void 0
          : t.name) && Fv(e)
      );
    };
  ke.test = dd;
  function Uv(e) {
    return e.nodeType === sd;
  }
  function Hv(e) {
    return e.nodeType === ud;
  }
  function ui(e) {
    return e.nodeType === cd;
  }
  const fd = (e, t, r, n, o, a) => {
    if (Uv(e)) return (0, ot.printText)(e.data, t);
    if (Hv(e)) return (0, ot.printComment)(e.data, t);
    const i = ui(e) ? "DocumentFragment" : e.tagName.toLowerCase();
    return ++n > t.maxDepth
      ? (0, ot.printElementAsLeaf)(i, t)
      : (0, ot.printElement)(
          i,
          (0, ot.printProps)(
            ui(e)
              ? []
              : Array.from(e.attributes)
                  .map((s) => s.name)
                  .sort(),
            ui(e)
              ? {}
              : Array.from(e.attributes).reduce(
                  (s, l) => ((s[l.name] = l.value), s),
                  {},
                ),
            t,
            r + t.indent,
            n,
            o,
            a,
          ),
          (0, ot.printChildren)(
            Array.prototype.slice.call(e.childNodes || e.children),
            t,
            r + t.indent,
            n,
            o,
            a,
          ),
          t,
          r,
        );
  };
  ke.serialize = fd;
  const Wv = { serialize: fd, test: dd };
  var Vv = Wv;
  ke.default = Vv;
  var Ne = {};
  Object.defineProperty(Ne, "__esModule", { value: !0 });
  Ne.test = Ne.serialize = Ne.default = void 0;
  var Xt = he;
  const zv = "@@__IMMUTABLE_ITERABLE__@@",
    Kv = "@@__IMMUTABLE_LIST__@@",
    Gv = "@@__IMMUTABLE_KEYED__@@",
    Xv = "@@__IMMUTABLE_MAP__@@",
    Rs = "@@__IMMUTABLE_ORDERED__@@",
    Jv = "@@__IMMUTABLE_RECORD__@@",
    Yv = "@@__IMMUTABLE_SEQ__@@",
    Qv = "@@__IMMUTABLE_SET__@@",
    Zv = "@@__IMMUTABLE_STACK__@@",
    Et = (e) => "Immutable." + e,
    bn = (e) => "[" + e + "]",
    Jt = " ",
    _s = "…",
    em = (e, t, r, n, o, a, i) =>
      ++n > t.maxDepth
        ? bn(Et(i))
        : Et(i) +
          Jt +
          "{" +
          (0, Xt.printIteratorEntries)(e.entries(), t, r, n, o, a) +
          "}";
  function tm(e) {
    let t = 0;
    return {
      next() {
        if (t < e._keys.length) {
          const r = e._keys[t++];
          return { done: !1, value: [r, e.get(r)] };
        }
        return { done: !0, value: void 0 };
      },
    };
  }
  const rm = (e, t, r, n, o, a) => {
      const i = Et(e._name || "Record");
      return ++n > t.maxDepth
        ? bn(i)
        : i +
            Jt +
            "{" +
            (0, Xt.printIteratorEntries)(tm(e), t, r, n, o, a) +
            "}";
    },
    nm = (e, t, r, n, o, a) => {
      const i = Et("Seq");
      return ++n > t.maxDepth
        ? bn(i)
        : e[Gv]
          ? i +
            Jt +
            "{" +
            (e._iter || e._object
              ? (0, Xt.printIteratorEntries)(e.entries(), t, r, n, o, a)
              : _s) +
            "}"
          : i +
            Jt +
            "[" +
            (e._iter || e._array || e._collection || e._iterable
              ? (0, Xt.printIteratorValues)(e.values(), t, r, n, o, a)
              : _s) +
            "]";
    },
    ci = (e, t, r, n, o, a, i) =>
      ++n > t.maxDepth
        ? bn(Et(i))
        : Et(i) +
          Jt +
          "[" +
          (0, Xt.printIteratorValues)(e.values(), t, r, n, o, a) +
          "]",
    pd = (e, t, r, n, o, a) =>
      e[Xv]
        ? em(e, t, r, n, o, a, e[Rs] ? "OrderedMap" : "Map")
        : e[Kv]
          ? ci(e, t, r, n, o, a, "List")
          : e[Qv]
            ? ci(e, t, r, n, o, a, e[Rs] ? "OrderedSet" : "Set")
            : e[Zv]
              ? ci(e, t, r, n, o, a, "Stack")
              : e[Yv]
                ? nm(e, t, r, n, o, a)
                : rm(e, t, r, n, o, a);
  Ne.serialize = pd;
  const vd = (e) => e && (e[zv] === !0 || e[Jv] === !0);
  Ne.test = vd;
  const om = { serialize: pd, test: vd };
  var am = om;
  Ne.default = am;
  var Be = {},
    md = { exports: {} },
    A = {};
  /** @license React v17.0.2
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var yn = 60103,
    hn = 60106,
    nr = 60107,
    or = 60108,
    ar = 60114,
    ir = 60109,
    lr = 60110,
    sr = 60112,
    ur = 60113,
    Wl = 60120,
    cr = 60115,
    dr = 60116,
    bd = 60121,
    yd = 60122,
    hd = 60117,
    gd = 60129,
    Ed = 60131;
  if (typeof Symbol == "function" && Symbol.for) {
    var j = Symbol.for;
    (yn = j("react.element")),
      (hn = j("react.portal")),
      (nr = j("react.fragment")),
      (or = j("react.strict_mode")),
      (ar = j("react.profiler")),
      (ir = j("react.provider")),
      (lr = j("react.context")),
      (sr = j("react.forward_ref")),
      (ur = j("react.suspense")),
      (Wl = j("react.suspense_list")),
      (cr = j("react.memo")),
      (dr = j("react.lazy")),
      (bd = j("react.block")),
      (yd = j("react.server.block")),
      (hd = j("react.fundamental")),
      (gd = j("react.debug_trace_mode")),
      (Ed = j("react.legacy_hidden"));
  }
  function ae(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case yn:
          switch (((e = e.type), e)) {
            case nr:
            case ar:
            case or:
            case ur:
            case Wl:
              return e;
            default:
              switch (((e = e && e.$$typeof), e)) {
                case lr:
                case sr:
                case dr:
                case cr:
                case ir:
                  return e;
                default:
                  return t;
              }
          }
        case hn:
          return t;
      }
    }
  }
  var im = ir,
    lm = yn,
    sm = sr,
    um = nr,
    cm = dr,
    dm = cr,
    fm = hn,
    pm = ar,
    vm = or,
    mm = ur;
  A.ContextConsumer = lr;
  A.ContextProvider = im;
  A.Element = lm;
  A.ForwardRef = sm;
  A.Fragment = um;
  A.Lazy = cm;
  A.Memo = dm;
  A.Portal = fm;
  A.Profiler = pm;
  A.StrictMode = vm;
  A.Suspense = mm;
  A.isAsyncMode = function () {
    return !1;
  };
  A.isConcurrentMode = function () {
    return !1;
  };
  A.isContextConsumer = function (e) {
    return ae(e) === lr;
  };
  A.isContextProvider = function (e) {
    return ae(e) === ir;
  };
  A.isElement = function (e) {
    return typeof e == "object" && e !== null && e.$$typeof === yn;
  };
  A.isForwardRef = function (e) {
    return ae(e) === sr;
  };
  A.isFragment = function (e) {
    return ae(e) === nr;
  };
  A.isLazy = function (e) {
    return ae(e) === dr;
  };
  A.isMemo = function (e) {
    return ae(e) === cr;
  };
  A.isPortal = function (e) {
    return ae(e) === hn;
  };
  A.isProfiler = function (e) {
    return ae(e) === ar;
  };
  A.isStrictMode = function (e) {
    return ae(e) === or;
  };
  A.isSuspense = function (e) {
    return ae(e) === ur;
  };
  A.isValidElementType = function (e) {
    return (
      typeof e == "string" ||
      typeof e == "function" ||
      e === nr ||
      e === ar ||
      e === gd ||
      e === or ||
      e === ur ||
      e === Wl ||
      e === Ed ||
      (typeof e == "object" &&
        e !== null &&
        (e.$$typeof === dr ||
          e.$$typeof === cr ||
          e.$$typeof === ir ||
          e.$$typeof === lr ||
          e.$$typeof === sr ||
          e.$$typeof === hd ||
          e.$$typeof === bd ||
          e[0] === yd))
    );
  };
  A.typeOf = ae;
  md.exports = A;
  var bm = md.exports;
  Object.defineProperty(Be, "__esModule", { value: !0 });
  Be.test = Be.serialize = Be.default = void 0;
  var ze = ym(bm),
    gr = F;
  function wd(e) {
    if (typeof WeakMap != "function") return null;
    var t = new WeakMap(),
      r = new WeakMap();
    return (wd = function (n) {
      return n ? r : t;
    })(e);
  }
  function ym(e, t) {
    if (!t && e && e.__esModule) return e;
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return { default: e };
    var r = wd(t);
    if (r && r.has(e)) return r.get(e);
    var n = {},
      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var a in e)
      if (a !== "default" && Object.prototype.hasOwnProperty.call(e, a)) {
        var i = o ? Object.getOwnPropertyDescriptor(e, a) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, a, i) : (n[a] = e[a]);
      }
    return (n.default = e), r && r.set(e, n), n;
  }
  const Cd = (e, t = []) => (
      Array.isArray(e)
        ? e.forEach((r) => {
            Cd(r, t);
          })
        : e != null && e !== !1 && t.push(e),
      t
    ),
    Ss = (e) => {
      const t = e.type;
      if (typeof t == "string") return t;
      if (typeof t == "function") return t.displayName || t.name || "Unknown";
      if (ze.isFragment(e)) return "React.Fragment";
      if (ze.isSuspense(e)) return "React.Suspense";
      if (typeof t == "object" && t !== null) {
        if (ze.isContextProvider(e)) return "Context.Provider";
        if (ze.isContextConsumer(e)) return "Context.Consumer";
        if (ze.isForwardRef(e)) {
          if (t.displayName) return t.displayName;
          const r = t.render.displayName || t.render.name || "";
          return r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef";
        }
        if (ze.isMemo(e)) {
          const r = t.displayName || t.type.displayName || t.type.name || "";
          return r !== "" ? "Memo(" + r + ")" : "Memo";
        }
      }
      return "UNDEFINED";
    },
    hm = (e) => {
      const { props: t } = e;
      return Object.keys(t)
        .filter((r) => r !== "children" && t[r] !== void 0)
        .sort();
    },
    Pd = (e, t, r, n, o, a) =>
      ++n > t.maxDepth
        ? (0, gr.printElementAsLeaf)(Ss(e), t)
        : (0, gr.printElement)(
            Ss(e),
            (0, gr.printProps)(hm(e), e.props, t, r + t.indent, n, o, a),
            (0, gr.printChildren)(
              Cd(e.props.children),
              t,
              r + t.indent,
              n,
              o,
              a,
            ),
            t,
            r,
          );
  Be.serialize = Pd;
  const Rd = (e) => e != null && ze.isElement(e);
  Be.test = Rd;
  const gm = { serialize: Pd, test: Rd };
  var Em = gm;
  Be.default = Em;
  var Le = {};
  Object.defineProperty(Le, "__esModule", { value: !0 });
  Le.test = Le.serialize = Le.default = void 0;
  var Er = F,
    Vr = (function () {
      return typeof globalThis < "u"
        ? globalThis
        : typeof Vr < "u"
          ? Vr
          : typeof self < "u"
            ? self
            : typeof window < "u"
              ? window
              : Function("return this")();
    })(),
    di = Vr["jest-symbol-do-not-touch"] || Vr.Symbol;
  const wm =
      typeof di == "function" && di.for ? di.for("react.test.json") : 245830487,
    Cm = (e) => {
      const { props: t } = e;
      return t
        ? Object.keys(t)
            .filter((r) => t[r] !== void 0)
            .sort()
        : [];
    },
    _d = (e, t, r, n, o, a) =>
      ++n > t.maxDepth
        ? (0, Er.printElementAsLeaf)(e.type, t)
        : (0, Er.printElement)(
            e.type,
            e.props
              ? (0, Er.printProps)(Cm(e), e.props, t, r + t.indent, n, o, a)
              : "",
            e.children
              ? (0, Er.printChildren)(e.children, t, r + t.indent, n, o, a)
              : "",
            t,
            r,
          );
  Le.serialize = _d;
  const Sd = (e) => e && e.$$typeof === wm;
  Le.test = Sd;
  const Pm = { serialize: _d, test: Sd };
  var Rm = Pm;
  Le.default = Rm;
  Object.defineProperty(je, "__esModule", { value: !0 });
  je.default = je.DEFAULT_OPTIONS = void 0;
  var _m = (je.format = Ld),
    Od = (je.plugins = void 0),
    Sm = Ue(Jc),
    It = he,
    Om = Ue(Ae),
    xm = Ue(Me),
    Tm = Ue(Ie),
    $m = Ue(ke),
    qm = Ue(Ne),
    Am = Ue(Be),
    Mm = Ue(Le);
  function Ue(e) {
    return e && e.__esModule ? e : { default: e };
  }
  const xd = Object.prototype.toString,
    Im = Date.prototype.toISOString,
    km = Error.prototype.toString,
    Os = RegExp.prototype.toString,
    fi = (e) =>
      (typeof e.constructor == "function" && e.constructor.name) || "Object",
    Nm = (e) => typeof window < "u" && e === window,
    Bm = /^Symbol\((.*)\)(.*)$/,
    Lm = /\n/gi;
  class Td extends Error {
    constructor(t, r) {
      super(t), (this.stack = r), (this.name = this.constructor.name);
    }
  }
  function jm(e) {
    return (
      e === "[object Array]" ||
      e === "[object ArrayBuffer]" ||
      e === "[object DataView]" ||
      e === "[object Float32Array]" ||
      e === "[object Float64Array]" ||
      e === "[object Int8Array]" ||
      e === "[object Int16Array]" ||
      e === "[object Int32Array]" ||
      e === "[object Uint8Array]" ||
      e === "[object Uint8ClampedArray]" ||
      e === "[object Uint16Array]" ||
      e === "[object Uint32Array]"
    );
  }
  function Dm(e) {
    return Object.is(e, -0) ? "-0" : String(e);
  }
  function Fm(e) {
    return `${e}n`;
  }
  function xs(e, t) {
    return t ? "[Function " + (e.name || "anonymous") + "]" : "[Function]";
  }
  function Ts(e) {
    return String(e).replace(Bm, "Symbol($1)");
  }
  function $s(e) {
    return "[" + km.call(e) + "]";
  }
  function $d(e, t, r, n) {
    if (e === !0 || e === !1) return "" + e;
    if (e === void 0) return "undefined";
    if (e === null) return "null";
    const o = typeof e;
    if (o === "number") return Dm(e);
    if (o === "bigint") return Fm(e);
    if (o === "string")
      return n ? '"' + e.replace(/"|\\/g, "\\$&") + '"' : '"' + e + '"';
    if (o === "function") return xs(e, t);
    if (o === "symbol") return Ts(e);
    const a = xd.call(e);
    return a === "[object WeakMap]"
      ? "WeakMap {}"
      : a === "[object WeakSet]"
        ? "WeakSet {}"
        : a === "[object Function]" || a === "[object GeneratorFunction]"
          ? xs(e, t)
          : a === "[object Symbol]"
            ? Ts(e)
            : a === "[object Date]"
              ? isNaN(+e)
                ? "Date { NaN }"
                : Im.call(e)
              : a === "[object Error]"
                ? $s(e)
                : a === "[object RegExp]"
                  ? r
                    ? Os.call(e).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&")
                    : Os.call(e)
                  : e instanceof Error
                    ? $s(e)
                    : null;
  }
  function qd(e, t, r, n, o, a) {
    if (o.indexOf(e) !== -1) return "[Circular]";
    (o = o.slice()), o.push(e);
    const i = ++n > t.maxDepth,
      s = t.min;
    if (t.callToJSON && !i && e.toJSON && typeof e.toJSON == "function" && !a)
      return Re(e.toJSON(), t, r, n, o, !0);
    const l = xd.call(e);
    return l === "[object Arguments]"
      ? i
        ? "[Arguments]"
        : (s ? "" : "Arguments ") +
          "[" +
          (0, It.printListItems)(e, t, r, n, o, Re) +
          "]"
      : jm(l)
        ? i
          ? "[" + e.constructor.name + "]"
          : (s || (!t.printBasicPrototype && e.constructor.name === "Array")
              ? ""
              : e.constructor.name + " ") +
            "[" +
            (0, It.printListItems)(e, t, r, n, o, Re) +
            "]"
        : l === "[object Map]"
          ? i
            ? "[Map]"
            : "Map {" +
              (0, It.printIteratorEntries)(
                e.entries(),
                t,
                r,
                n,
                o,
                Re,
                " => ",
              ) +
              "}"
          : l === "[object Set]"
            ? i
              ? "[Set]"
              : "Set {" +
                (0, It.printIteratorValues)(e.values(), t, r, n, o, Re) +
                "}"
            : i || Nm(e)
              ? "[" + fi(e) + "]"
              : (s || (!t.printBasicPrototype && fi(e) === "Object")
                  ? ""
                  : fi(e) + " ") +
                "{" +
                (0, It.printObjectProperties)(e, t, r, n, o, Re) +
                "}";
  }
  function Um(e) {
    return e.serialize != null;
  }
  function Ad(e, t, r, n, o, a) {
    let i;
    try {
      i = Um(e)
        ? e.serialize(t, r, n, o, a, Re)
        : e.print(
            t,
            (s) => Re(s, r, n, o, a),
            (s) => {
              const l = n + r.indent;
              return (
                l +
                s.replace(
                  Lm,
                  `
` + l,
                )
              );
            },
            {
              edgeSpacing: r.spacingOuter,
              min: r.min,
              spacing: r.spacingInner,
            },
            r.colors,
          );
    } catch (s) {
      throw new Td(s.message, s.stack);
    }
    if (typeof i != "string")
      throw new Error(
        `pretty-format: Plugin must return type "string" but instead returned "${typeof i}".`,
      );
    return i;
  }
  function Md(e, t) {
    for (let r = 0; r < e.length; r++)
      try {
        if (e[r].test(t)) return e[r];
      } catch (n) {
        throw new Td(n.message, n.stack);
      }
    return null;
  }
  function Re(e, t, r, n, o, a) {
    const i = Md(t.plugins, e);
    if (i !== null) return Ad(i, e, t, r, n, o);
    const s = $d(e, t.printFunctionName, t.escapeRegex, t.escapeString);
    return s !== null ? s : qd(e, t, r, n, o, a);
  }
  const Vl = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green",
    },
    Id = Object.keys(Vl),
    te = {
      callToJSON: !0,
      compareKeys: void 0,
      escapeRegex: !1,
      escapeString: !0,
      highlight: !1,
      indent: 2,
      maxDepth: 1 / 0,
      min: !1,
      plugins: [],
      printBasicPrototype: !0,
      printFunctionName: !0,
      theme: Vl,
    };
  je.DEFAULT_OPTIONS = te;
  function Hm(e) {
    if (
      (Object.keys(e).forEach((t) => {
        if (!te.hasOwnProperty(t))
          throw new Error(`pretty-format: Unknown option "${t}".`);
      }),
      e.min && e.indent !== void 0 && e.indent !== 0)
    )
      throw new Error(
        'pretty-format: Options "min" and "indent" cannot be used together.',
      );
    if (e.theme !== void 0) {
      if (e.theme === null)
        throw new Error('pretty-format: Option "theme" must not be null.');
      if (typeof e.theme != "object")
        throw new Error(
          `pretty-format: Option "theme" must be of type "object" but instead received "${typeof e.theme}".`,
        );
    }
  }
  const Wm = (e) =>
      Id.reduce((t, r) => {
        const n = e.theme && e.theme[r] !== void 0 ? e.theme[r] : Vl[r],
          o = n && Sm.default[n];
        if (o && typeof o.close == "string" && typeof o.open == "string")
          t[r] = o;
        else
          throw new Error(
            `pretty-format: Option "theme" has a key "${r}" whose value "${n}" is undefined in ansi-styles.`,
          );
        return t;
      }, Object.create(null)),
    Vm = () =>
      Id.reduce(
        (e, t) => ((e[t] = { close: "", open: "" }), e),
        Object.create(null),
      ),
    kd = (e) =>
      e && e.printFunctionName !== void 0
        ? e.printFunctionName
        : te.printFunctionName,
    Nd = (e) =>
      e && e.escapeRegex !== void 0 ? e.escapeRegex : te.escapeRegex,
    Bd = (e) =>
      e && e.escapeString !== void 0 ? e.escapeString : te.escapeString,
    qs = (e) => {
      var t;
      return {
        callToJSON: e && e.callToJSON !== void 0 ? e.callToJSON : te.callToJSON,
        colors: e && e.highlight ? Wm(e) : Vm(),
        compareKeys:
          e && typeof e.compareKeys == "function"
            ? e.compareKeys
            : te.compareKeys,
        escapeRegex: Nd(e),
        escapeString: Bd(e),
        indent:
          e && e.min ? "" : zm(e && e.indent !== void 0 ? e.indent : te.indent),
        maxDepth: e && e.maxDepth !== void 0 ? e.maxDepth : te.maxDepth,
        min: e && e.min !== void 0 ? e.min : te.min,
        plugins: e && e.plugins !== void 0 ? e.plugins : te.plugins,
        printBasicPrototype:
          (t = e == null ? void 0 : e.printBasicPrototype) !== null &&
          t !== void 0
            ? t
            : !0,
        printFunctionName: kd(e),
        spacingInner:
          e && e.min
            ? " "
            : `
`,
        spacingOuter:
          e && e.min
            ? ""
            : `
`,
      };
    };
  function zm(e) {
    return new Array(e + 1).join(" ");
  }
  function Ld(e, t) {
    if (t && (Hm(t), t.plugins)) {
      const n = Md(t.plugins, e);
      if (n !== null) return Ad(n, e, qs(t), "", 0, []);
    }
    const r = $d(e, kd(t), Nd(t), Bd(t));
    return r !== null ? r : qd(e, qs(t), "", 0, []);
  }
  const Km = {
    AsymmetricMatcher: Om.default,
    ConvertAnsi: xm.default,
    DOMCollection: Tm.default,
    DOMElement: $m.default,
    Immutable: qm.default,
    ReactElement: Am.default,
    ReactTestComponent: Mm.default,
  };
  Od = je.plugins = Km;
  var Gm = Ld;
  je.default = Gm;
  var Xm = Object.prototype.toString;
  function As(e) {
    return typeof e == "function" || Xm.call(e) === "[object Function]";
  }
  function Jm(e) {
    var t = Number(e);
    return isNaN(t)
      ? 0
      : t === 0 || !isFinite(t)
        ? t
        : (t > 0 ? 1 : -1) * Math.floor(Math.abs(t));
  }
  var Ym = Math.pow(2, 53) - 1;
  function Qm(e) {
    var t = Jm(e);
    return Math.min(Math.max(t, 0), Ym);
  }
  function re(e, t) {
    var r = Array,
      n = Object(e);
    if (e == null)
      throw new TypeError(
        "Array.from requires an array-like object - not null or undefined",
      );
    if (typeof t < "u" && !As(t))
      throw new TypeError(
        "Array.from: when provided, the second argument must be a function",
      );
    for (
      var o = Qm(n.length),
        a = As(r) ? Object(new r(o)) : new Array(o),
        i = 0,
        s;
      i < o;

    )
      (s = n[i]), t ? (a[i] = t(s, i)) : (a[i] = s), (i += 1);
    return (a.length = o), a;
  }
  function Yt(e) {
    "@babel/helpers - typeof";
    return (
      (Yt =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                typeof Symbol == "function" &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      Yt(e)
    );
  }
  function Zm(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function Ms(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(e, jd(n.key), n);
    }
  }
  function eb(e, t, r) {
    return (
      t && Ms(e.prototype, t),
      r && Ms(e, r),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
  }
  function tb(e, t, r) {
    return (
      (t = jd(t)),
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function jd(e) {
    var t = rb(e, "string");
    return Yt(t) === "symbol" ? t : String(t);
  }
  function rb(e, t) {
    if (Yt(e) !== "object" || e === null) return e;
    var r = e[Symbol.toPrimitive];
    if (r !== void 0) {
      var n = r.call(e, t || "default");
      if (Yt(n) !== "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }
  var nb = (function () {
    function e() {
      var t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      Zm(this, e), tb(this, "items", void 0), (this.items = t);
    }
    return (
      eb(e, [
        {
          key: "add",
          value: function (r) {
            return this.has(r) === !1 && this.items.push(r), this;
          },
        },
        {
          key: "clear",
          value: function () {
            this.items = [];
          },
        },
        {
          key: "delete",
          value: function (r) {
            var n = this.items.length;
            return (
              (this.items = this.items.filter(function (o) {
                return o !== r;
              })),
              n !== this.items.length
            );
          },
        },
        {
          key: "forEach",
          value: function (r) {
            var n = this;
            this.items.forEach(function (o) {
              r(o, o, n);
            });
          },
        },
        {
          key: "has",
          value: function (r) {
            return this.items.indexOf(r) !== -1;
          },
        },
        {
          key: "size",
          get: function () {
            return this.items.length;
          },
        },
      ]),
      e
    );
  })();
  const ob = typeof Set > "u" ? Set : nb;
  function U(e) {
    var t;
    return (t = e.localName) !== null && t !== void 0
      ? t
      : e.tagName.toLowerCase();
  }
  var ab = {
      article: "article",
      aside: "complementary",
      button: "button",
      datalist: "listbox",
      dd: "definition",
      details: "group",
      dialog: "dialog",
      dt: "term",
      fieldset: "group",
      figure: "figure",
      form: "form",
      footer: "contentinfo",
      h1: "heading",
      h2: "heading",
      h3: "heading",
      h4: "heading",
      h5: "heading",
      h6: "heading",
      header: "banner",
      hr: "separator",
      html: "document",
      legend: "legend",
      li: "listitem",
      math: "math",
      main: "main",
      menu: "list",
      nav: "navigation",
      ol: "list",
      optgroup: "group",
      option: "option",
      output: "status",
      progress: "progressbar",
      section: "region",
      summary: "button",
      table: "table",
      tbody: "rowgroup",
      textarea: "textbox",
      tfoot: "rowgroup",
      td: "cell",
      th: "columnheader",
      thead: "rowgroup",
      tr: "row",
      ul: "list",
    },
    ib = {
      caption: new Set(["aria-label", "aria-labelledby"]),
      code: new Set(["aria-label", "aria-labelledby"]),
      deletion: new Set(["aria-label", "aria-labelledby"]),
      emphasis: new Set(["aria-label", "aria-labelledby"]),
      generic: new Set([
        "aria-label",
        "aria-labelledby",
        "aria-roledescription",
      ]),
      insertion: new Set(["aria-label", "aria-labelledby"]),
      paragraph: new Set(["aria-label", "aria-labelledby"]),
      presentation: new Set(["aria-label", "aria-labelledby"]),
      strong: new Set(["aria-label", "aria-labelledby"]),
      subscript: new Set(["aria-label", "aria-labelledby"]),
      superscript: new Set(["aria-label", "aria-labelledby"]),
    };
  function lb(e, t) {
    return [
      "aria-atomic",
      "aria-busy",
      "aria-controls",
      "aria-current",
      "aria-describedby",
      "aria-details",
      "aria-dropeffect",
      "aria-flowto",
      "aria-grabbed",
      "aria-hidden",
      "aria-keyshortcuts",
      "aria-label",
      "aria-labelledby",
      "aria-live",
      "aria-owns",
      "aria-relevant",
      "aria-roledescription",
    ].some(function (r) {
      var n;
      return (
        e.hasAttribute(r) && !((n = ib[t]) !== null && n !== void 0 && n.has(r))
      );
    });
  }
  function Dd(e, t) {
    return lb(e, t);
  }
  function sb(e) {
    var t = cb(e);
    if (t === null || t === "presentation") {
      var r = ub(e);
      if (t !== "presentation" || Dd(e, r || "")) return r;
    }
    return t;
  }
  function ub(e) {
    var t = ab[U(e)];
    if (t !== void 0) return t;
    switch (U(e)) {
      case "a":
      case "area":
      case "link":
        if (e.hasAttribute("href")) return "link";
        break;
      case "img":
        return e.getAttribute("alt") === "" && !Dd(e, "img")
          ? "presentation"
          : "img";
      case "input": {
        var r = e,
          n = r.type;
        switch (n) {
          case "button":
          case "image":
          case "reset":
          case "submit":
            return "button";
          case "checkbox":
          case "radio":
            return n;
          case "range":
            return "slider";
          case "email":
          case "tel":
          case "text":
          case "url":
            return e.hasAttribute("list") ? "combobox" : "textbox";
          case "search":
            return e.hasAttribute("list") ? "combobox" : "searchbox";
          case "number":
            return "spinbutton";
          default:
            return null;
        }
      }
      case "select":
        return e.hasAttribute("multiple") || e.size > 1
          ? "listbox"
          : "combobox";
    }
    return null;
  }
  function cb(e) {
    var t = e.getAttribute("role");
    if (t !== null) {
      var r = t.trim().split(" ")[0];
      if (r.length > 0) return r;
    }
    return null;
  }
  function k(e) {
    return e !== null && e.nodeType === e.ELEMENT_NODE;
  }
  function Fd(e) {
    return k(e) && U(e) === "caption";
  }
  function $r(e) {
    return k(e) && U(e) === "input";
  }
  function db(e) {
    return k(e) && U(e) === "optgroup";
  }
  function fb(e) {
    return k(e) && U(e) === "select";
  }
  function pb(e) {
    return k(e) && U(e) === "table";
  }
  function vb(e) {
    return k(e) && U(e) === "textarea";
  }
  function mb(e) {
    var t = e.ownerDocument === null ? e : e.ownerDocument,
      r = t.defaultView;
    if (r === null) throw new TypeError("no window available");
    return r;
  }
  function bb(e) {
    return k(e) && U(e) === "fieldset";
  }
  function yb(e) {
    return k(e) && U(e) === "legend";
  }
  function hb(e) {
    return k(e) && U(e) === "slot";
  }
  function gb(e) {
    return k(e) && e.ownerSVGElement !== void 0;
  }
  function Eb(e) {
    return k(e) && U(e) === "svg";
  }
  function wb(e) {
    return gb(e) && U(e) === "title";
  }
  function zr(e, t) {
    if (k(e) && e.hasAttribute(t)) {
      var r = e.getAttribute(t).split(" "),
        n = e.getRootNode ? e.getRootNode() : e.ownerDocument;
      return r
        .map(function (o) {
          return n.getElementById(o);
        })
        .filter(function (o) {
          return o !== null;
        });
    }
    return [];
  }
  function ve(e, t) {
    return k(e) ? t.indexOf(sb(e)) !== -1 : !1;
  }
  function Cb(e) {
    return e.trim().replace(/\s\s+/g, " ");
  }
  function Pb(e, t) {
    if (!k(e)) return !1;
    if (e.hasAttribute("hidden") || e.getAttribute("aria-hidden") === "true")
      return !0;
    var r = t(e);
    return (
      r.getPropertyValue("display") === "none" ||
      r.getPropertyValue("visibility") === "hidden"
    );
  }
  function Rb(e) {
    return (
      ve(e, ["button", "combobox", "listbox", "textbox"]) || Ud(e, "range")
    );
  }
  function Ud(e, t) {
    if (!k(e)) return !1;
    switch (t) {
      case "range":
        return ve(e, [
          "meter",
          "progressbar",
          "scrollbar",
          "slider",
          "spinbutton",
        ]);
      default:
        throw new TypeError(
          "No knowledge about abstract role '".concat(
            t,
            "'. This is likely a bug :(",
          ),
        );
    }
  }
  function Is(e, t) {
    var r = re(e.querySelectorAll(t));
    return (
      zr(e, "aria-owns").forEach(function (n) {
        r.push.apply(r, re(n.querySelectorAll(t)));
      }),
      r
    );
  }
  function _b(e) {
    return fb(e)
      ? e.selectedOptions || Is(e, "[selected]")
      : Is(e, '[aria-selected="true"]');
  }
  function Sb(e) {
    return ve(e, ["none", "presentation"]);
  }
  function Ob(e) {
    return Fd(e);
  }
  function xb(e) {
    return ve(e, [
      "button",
      "cell",
      "checkbox",
      "columnheader",
      "gridcell",
      "heading",
      "label",
      "legend",
      "link",
      "menuitem",
      "menuitemcheckbox",
      "menuitemradio",
      "option",
      "radio",
      "row",
      "rowheader",
      "switch",
      "tab",
      "tooltip",
      "treeitem",
    ]);
  }
  function Tb(e) {
    return !1;
  }
  function $b(e) {
    return $r(e) || vb(e) ? e.value : e.textContent || "";
  }
  function ks(e) {
    var t = e.getPropertyValue("content");
    return /^["'].*["']$/.test(t) ? t.slice(1, -1) : "";
  }
  function Hd(e) {
    var t = U(e);
    return (
      t === "button" ||
      (t === "input" && e.getAttribute("type") !== "hidden") ||
      t === "meter" ||
      t === "output" ||
      t === "progress" ||
      t === "select" ||
      t === "textarea"
    );
  }
  function Wd(e) {
    if (Hd(e)) return e;
    var t = null;
    return (
      e.childNodes.forEach(function (r) {
        if (t === null && k(r)) {
          var n = Wd(r);
          n !== null && (t = n);
        }
      }),
      t
    );
  }
  function qb(e) {
    if (e.control !== void 0) return e.control;
    var t = e.getAttribute("for");
    return t !== null ? e.ownerDocument.getElementById(t) : Wd(e);
  }
  function Ab(e) {
    var t = e.labels;
    if (t === null) return t;
    if (t !== void 0) return re(t);
    if (!Hd(e)) return null;
    var r = e.ownerDocument;
    return re(r.querySelectorAll("label")).filter(function (n) {
      return qb(n) === e;
    });
  }
  function Mb(e) {
    var t = e.assignedNodes();
    return t.length === 0 ? re(e.childNodes) : t;
  }
  function Vd(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = new ob(),
      n = mb(e),
      o = t.compute,
      a = o === void 0 ? "name" : o,
      i = t.computedStyleSupportsPseudoElements,
      s = i === void 0 ? t.getComputedStyle !== void 0 : i,
      l = t.getComputedStyle,
      u = l === void 0 ? n.getComputedStyle.bind(n) : l,
      c = t.hidden,
      d = c === void 0 ? !1 : c;
    function f(v, C) {
      var b = "";
      if (k(v) && s) {
        var R = u(v, "::before"),
          h = ks(R);
        b = "".concat(h, " ").concat(b);
      }
      var p = hb(v) ? Mb(v) : re(v.childNodes).concat(zr(v, "aria-owns"));
      if (
        (p.forEach(function (I) {
          var V = _(I, {
              isEmbeddedInLabel: C.isEmbeddedInLabel,
              isReferenced: !1,
              recursion: !0,
            }),
            L = k(I) ? u(I).getPropertyValue("display") : "inline",
            z = L !== "inline" ? " " : "";
          b += "".concat(z).concat(V).concat(z);
        }),
        k(v) && s)
      ) {
        var y = u(v, "::after"),
          E = ks(y);
        b = "".concat(b, " ").concat(E);
      }
      return b.trim();
    }
    function m(v, C) {
      var b = v.getAttributeNode(C);
      return b !== null && !r.has(b) && b.value.trim() !== ""
        ? (r.add(b), b.value)
        : null;
    }
    function P(v) {
      return k(v) ? m(v, "title") : null;
    }
    function w(v) {
      if (!k(v)) return null;
      if (bb(v)) {
        r.add(v);
        for (var C = re(v.childNodes), b = 0; b < C.length; b += 1) {
          var R = C[b];
          if (yb(R))
            return _(R, {
              isEmbeddedInLabel: !1,
              isReferenced: !1,
              recursion: !1,
            });
        }
      } else if (pb(v)) {
        r.add(v);
        for (var h = re(v.childNodes), p = 0; p < h.length; p += 1) {
          var y = h[p];
          if (Fd(y))
            return _(y, {
              isEmbeddedInLabel: !1,
              isReferenced: !1,
              recursion: !1,
            });
        }
      } else if (Eb(v)) {
        r.add(v);
        for (var E = re(v.childNodes), I = 0; I < E.length; I += 1) {
          var V = E[I];
          if (wb(V)) return V.textContent;
        }
        return null;
      } else if (U(v) === "img" || U(v) === "area") {
        var L = m(v, "alt");
        if (L !== null) return L;
      } else if (db(v)) {
        var z = m(v, "label");
        if (z !== null) return z;
      }
      if (
        $r(v) &&
        (v.type === "button" || v.type === "submit" || v.type === "reset")
      ) {
        var K = m(v, "value");
        if (K !== null) return K;
        if (v.type === "submit") return "Submit";
        if (v.type === "reset") return "Reset";
      }
      var S = Ab(v);
      if (S !== null && S.length !== 0)
        return (
          r.add(v),
          re(S)
            .map(function (Mt) {
              return _(Mt, {
                isEmbeddedInLabel: !0,
                isReferenced: !1,
                recursion: !0,
              });
            })
            .filter(function (Mt) {
              return Mt.length > 0;
            })
            .join(" ")
        );
      if ($r(v) && v.type === "image") {
        var q = m(v, "alt");
        if (q !== null) return q;
        var D = m(v, "title");
        return D !== null ? D : "Submit Query";
      }
      if (ve(v, ["button"])) {
        var fe = f(v, { isEmbeddedInLabel: !1, isReferenced: !1 });
        if (fe !== "") return fe;
      }
      return null;
    }
    function _(v, C) {
      if (r.has(v)) return "";
      if (!d && Pb(v, u) && !C.isReferenced) return r.add(v), "";
      var b = k(v) ? v.getAttributeNode("aria-labelledby") : null,
        R = b !== null && !r.has(b) ? zr(v, "aria-labelledby") : [];
      if (a === "name" && !C.isReferenced && R.length > 0)
        return (
          r.add(b),
          R.map(function (L) {
            return _(L, {
              isEmbeddedInLabel: C.isEmbeddedInLabel,
              isReferenced: !0,
              recursion: !1,
            });
          }).join(" ")
        );
      var h = C.recursion && Rb(v) && a === "name";
      if (!h) {
        var p = ((k(v) && v.getAttribute("aria-label")) || "").trim();
        if (p !== "" && a === "name") return r.add(v), p;
        if (!Sb(v)) {
          var y = w(v);
          if (y !== null) return r.add(v), y;
        }
      }
      if (ve(v, ["menu"])) return r.add(v), "";
      if (h || C.isEmbeddedInLabel || C.isReferenced) {
        if (ve(v, ["combobox", "listbox"])) {
          r.add(v);
          var E = _b(v);
          return E.length === 0
            ? $r(v)
              ? v.value
              : ""
            : re(E)
                .map(function (L) {
                  return _(L, {
                    isEmbeddedInLabel: C.isEmbeddedInLabel,
                    isReferenced: !1,
                    recursion: !0,
                  });
                })
                .join(" ");
        }
        if (Ud(v, "range"))
          return (
            r.add(v),
            v.hasAttribute("aria-valuetext")
              ? v.getAttribute("aria-valuetext")
              : v.hasAttribute("aria-valuenow")
                ? v.getAttribute("aria-valuenow")
                : v.getAttribute("value") || ""
          );
        if (ve(v, ["textbox"])) return r.add(v), $b(v);
      }
      if (xb(v) || (k(v) && C.isReferenced) || Ob(v) || Tb()) {
        var I = f(v, {
          isEmbeddedInLabel: C.isEmbeddedInLabel,
          isReferenced: !1,
        });
        if (I !== "") return r.add(v), I;
      }
      if (v.nodeType === v.TEXT_NODE) return r.add(v), v.textContent || "";
      if (C.recursion)
        return (
          r.add(v),
          f(v, { isEmbeddedInLabel: C.isEmbeddedInLabel, isReferenced: !1 })
        );
      var V = P(v);
      return V !== null ? (r.add(v), V) : (r.add(v), "");
    }
    return Cb(
      _(e, {
        isEmbeddedInLabel: !1,
        isReferenced: a === "description",
        recursion: !1,
      }),
    );
  }
  function Qt(e) {
    "@babel/helpers - typeof";
    return (
      (Qt =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                typeof Symbol == "function" &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      Qt(e)
    );
  }
  function Ns(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t &&
        (n = n.filter(function (o) {
          return Object.getOwnPropertyDescriptor(e, o).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function Bs(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2
        ? Ns(Object(r), !0).forEach(function (n) {
            Ib(e, n, r[n]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Ns(Object(r)).forEach(function (n) {
              Object.defineProperty(
                e,
                n,
                Object.getOwnPropertyDescriptor(r, n),
              );
            });
    }
    return e;
  }
  function Ib(e, t, r) {
    return (
      (t = kb(t)),
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function kb(e) {
    var t = Nb(e, "string");
    return Qt(t) === "symbol" ? t : String(t);
  }
  function Nb(e, t) {
    if (Qt(e) !== "object" || e === null) return e;
    var r = e[Symbol.toPrimitive];
    if (r !== void 0) {
      var n = r.call(e, t || "default");
      if (Qt(n) !== "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }
  function zd(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = zr(e, "aria-describedby")
        .map(function (o) {
          return Vd(o, Bs(Bs({}, t), {}, { compute: "description" }));
        })
        .join(" ");
    if (r === "") {
      var n = e.getAttribute("title");
      r = n === null ? "" : n;
    }
    return r;
  }
  function Bb(e) {
    return ve(e, [
      "caption",
      "code",
      "deletion",
      "emphasis",
      "generic",
      "insertion",
      "paragraph",
      "presentation",
      "strong",
      "subscript",
      "superscript",
    ]);
  }
  function zl(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Bb(e) ? "" : Vd(e, t);
  }
  var ne = {},
    gn = {},
    Qe = {},
    En = {};
  Object.defineProperty(En, "__esModule", { value: !0 });
  En.default = void 0;
  function Lb() {
    var e = this,
      t = 0,
      r = {
        "@@iterator": function () {
          return r;
        },
        next: function () {
          if (t < e.length) {
            var o = e[t];
            return (t = t + 1), { done: !1, value: o };
          } else return { done: !0 };
        },
      };
    return r;
  }
  var jb = Lb;
  En.default = jb;
  Object.defineProperty(Qe, "__esModule", { value: !0 });
  Qe.default = Ub;
  var Db = Fb(En);
  function Fb(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function Yi(e) {
    "@babel/helpers - typeof";
    return (
      (Yi =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                typeof Symbol == "function" &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      Yi(e)
    );
  }
  function Ub(e, t) {
    return (
      typeof Symbol == "function" &&
        Yi(Symbol.iterator) === "symbol" &&
        Object.defineProperty(e, Symbol.iterator, {
          value: Db.default.bind(t),
        }),
      e
    );
  }
  Object.defineProperty(gn, "__esModule", { value: !0 });
  gn.default = void 0;
  var Hb = Wb(Qe);
  function Wb(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function pi(e, t) {
    return Kb(e) || zb(e, t) || Kd(e, t) || Vb();
  }
  function Vb() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function zb(e, t) {
    var r =
      e == null
        ? null
        : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (r != null) {
      var n = [],
        o = !0,
        a = !1,
        i,
        s;
      try {
        for (
          r = r.call(e);
          !(o = (i = r.next()).done) &&
          (n.push(i.value), !(t && n.length === t));
          o = !0
        );
      } catch (l) {
        (a = !0), (s = l);
      } finally {
        try {
          !o && r.return != null && r.return();
        } finally {
          if (a) throw s;
        }
      }
      return n;
    }
  }
  function Kb(e) {
    if (Array.isArray(e)) return e;
  }
  function Gb(e, t) {
    var r = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (!r) {
      if (
        Array.isArray(e) ||
        (r = Kd(e)) ||
        (t && e && typeof e.length == "number")
      ) {
        r && (e = r);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
          },
          e: function (u) {
            throw u;
          },
          f: o,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var a = !0,
      i = !1,
      s;
    return {
      s: function () {
        r = r.call(e);
      },
      n: function () {
        var u = r.next();
        return (a = u.done), u;
      },
      e: function (u) {
        (i = !0), (s = u);
      },
      f: function () {
        try {
          !a && r.return != null && r.return();
        } finally {
          if (i) throw s;
        }
      },
    };
  }
  function Kd(e, t) {
    if (e) {
      if (typeof e == "string") return Ls(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (
        (r === "Object" && e.constructor && (r = e.constructor.name),
        r === "Map" || r === "Set")
      )
        return Array.from(e);
      if (
        r === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return Ls(e, t);
    }
  }
  function Ls(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var at = [
      ["aria-activedescendant", { type: "id" }],
      ["aria-atomic", { type: "boolean" }],
      [
        "aria-autocomplete",
        { type: "token", values: ["inline", "list", "both", "none"] },
      ],
      ["aria-busy", { type: "boolean" }],
      ["aria-checked", { type: "tristate" }],
      ["aria-colcount", { type: "integer" }],
      ["aria-colindex", { type: "integer" }],
      ["aria-colspan", { type: "integer" }],
      ["aria-controls", { type: "idlist" }],
      [
        "aria-current",
        {
          type: "token",
          values: ["page", "step", "location", "date", "time", !0, !1],
        },
      ],
      ["aria-describedby", { type: "idlist" }],
      ["aria-details", { type: "id" }],
      ["aria-disabled", { type: "boolean" }],
      [
        "aria-dropeffect",
        {
          type: "tokenlist",
          values: ["copy", "execute", "link", "move", "none", "popup"],
        },
      ],
      ["aria-errormessage", { type: "id" }],
      ["aria-expanded", { type: "boolean", allowundefined: !0 }],
      ["aria-flowto", { type: "idlist" }],
      ["aria-grabbed", { type: "boolean", allowundefined: !0 }],
      [
        "aria-haspopup",
        {
          type: "token",
          values: [!1, !0, "menu", "listbox", "tree", "grid", "dialog"],
        },
      ],
      ["aria-hidden", { type: "boolean", allowundefined: !0 }],
      [
        "aria-invalid",
        { type: "token", values: ["grammar", !1, "spelling", !0] },
      ],
      ["aria-keyshortcuts", { type: "string" }],
      ["aria-label", { type: "string" }],
      ["aria-labelledby", { type: "idlist" }],
      ["aria-level", { type: "integer" }],
      ["aria-live", { type: "token", values: ["assertive", "off", "polite"] }],
      ["aria-modal", { type: "boolean" }],
      ["aria-multiline", { type: "boolean" }],
      ["aria-multiselectable", { type: "boolean" }],
      [
        "aria-orientation",
        { type: "token", values: ["vertical", "undefined", "horizontal"] },
      ],
      ["aria-owns", { type: "idlist" }],
      ["aria-placeholder", { type: "string" }],
      ["aria-posinset", { type: "integer" }],
      ["aria-pressed", { type: "tristate" }],
      ["aria-readonly", { type: "boolean" }],
      [
        "aria-relevant",
        { type: "tokenlist", values: ["additions", "all", "removals", "text"] },
      ],
      ["aria-required", { type: "boolean" }],
      ["aria-roledescription", { type: "string" }],
      ["aria-rowcount", { type: "integer" }],
      ["aria-rowindex", { type: "integer" }],
      ["aria-rowspan", { type: "integer" }],
      ["aria-selected", { type: "boolean", allowundefined: !0 }],
      ["aria-setsize", { type: "integer" }],
      [
        "aria-sort",
        { type: "token", values: ["ascending", "descending", "none", "other"] },
      ],
      ["aria-valuemax", { type: "number" }],
      ["aria-valuemin", { type: "number" }],
      ["aria-valuenow", { type: "number" }],
      ["aria-valuetext", { type: "string" }],
    ],
    Qi = {
      entries: function () {
        return at;
      },
      forEach: function (t) {
        var r =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : null,
          n = Gb(at),
          o;
        try {
          for (n.s(); !(o = n.n()).done; ) {
            var a = pi(o.value, 2),
              i = a[0],
              s = a[1];
            t.call(r, s, i, at);
          }
        } catch (l) {
          n.e(l);
        } finally {
          n.f();
        }
      },
      get: function (t) {
        var r = at.find(function (n) {
          return n[0] === t;
        });
        return r && r[1];
      },
      has: function (t) {
        return !!Qi.get(t);
      },
      keys: function () {
        return at.map(function (t) {
          var r = pi(t, 1),
            n = r[0];
          return n;
        });
      },
      values: function () {
        return at.map(function (t) {
          var r = pi(t, 2),
            n = r[1];
          return n;
        });
      },
    },
    Xb = (0, Hb.default)(Qi, Qi.entries());
  gn.default = Xb;
  var wn = {};
  Object.defineProperty(wn, "__esModule", { value: !0 });
  wn.default = void 0;
  var Jb = Yb(Qe);
  function Yb(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function vi(e, t) {
    return ey(e) || Zb(e, t) || Gd(e, t) || Qb();
  }
  function Qb() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Zb(e, t) {
    var r =
      e == null
        ? null
        : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (r != null) {
      var n = [],
        o = !0,
        a = !1,
        i,
        s;
      try {
        for (
          r = r.call(e);
          !(o = (i = r.next()).done) &&
          (n.push(i.value), !(t && n.length === t));
          o = !0
        );
      } catch (l) {
        (a = !0), (s = l);
      } finally {
        try {
          !o && r.return != null && r.return();
        } finally {
          if (a) throw s;
        }
      }
      return n;
    }
  }
  function ey(e) {
    if (Array.isArray(e)) return e;
  }
  function ty(e, t) {
    var r = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (!r) {
      if (
        Array.isArray(e) ||
        (r = Gd(e)) ||
        (t && e && typeof e.length == "number")
      ) {
        r && (e = r);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
          },
          e: function (u) {
            throw u;
          },
          f: o,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var a = !0,
      i = !1,
      s;
    return {
      s: function () {
        r = r.call(e);
      },
      n: function () {
        var u = r.next();
        return (a = u.done), u;
      },
      e: function (u) {
        (i = !0), (s = u);
      },
      f: function () {
        try {
          !a && r.return != null && r.return();
        } finally {
          if (i) throw s;
        }
      },
    };
  }
  function Gd(e, t) {
    if (e) {
      if (typeof e == "string") return js(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (
        (r === "Object" && e.constructor && (r = e.constructor.name),
        r === "Map" || r === "Set")
      )
        return Array.from(e);
      if (
        r === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return js(e, t);
    }
  }
  function js(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var it = [
      ["a", { reserved: !1 }],
      ["abbr", { reserved: !1 }],
      ["acronym", { reserved: !1 }],
      ["address", { reserved: !1 }],
      ["applet", { reserved: !1 }],
      ["area", { reserved: !1 }],
      ["article", { reserved: !1 }],
      ["aside", { reserved: !1 }],
      ["audio", { reserved: !1 }],
      ["b", { reserved: !1 }],
      ["base", { reserved: !0 }],
      ["bdi", { reserved: !1 }],
      ["bdo", { reserved: !1 }],
      ["big", { reserved: !1 }],
      ["blink", { reserved: !1 }],
      ["blockquote", { reserved: !1 }],
      ["body", { reserved: !1 }],
      ["br", { reserved: !1 }],
      ["button", { reserved: !1 }],
      ["canvas", { reserved: !1 }],
      ["caption", { reserved: !1 }],
      ["center", { reserved: !1 }],
      ["cite", { reserved: !1 }],
      ["code", { reserved: !1 }],
      ["col", { reserved: !0 }],
      ["colgroup", { reserved: !0 }],
      ["content", { reserved: !1 }],
      ["data", { reserved: !1 }],
      ["datalist", { reserved: !1 }],
      ["dd", { reserved: !1 }],
      ["del", { reserved: !1 }],
      ["details", { reserved: !1 }],
      ["dfn", { reserved: !1 }],
      ["dialog", { reserved: !1 }],
      ["dir", { reserved: !1 }],
      ["div", { reserved: !1 }],
      ["dl", { reserved: !1 }],
      ["dt", { reserved: !1 }],
      ["em", { reserved: !1 }],
      ["embed", { reserved: !1 }],
      ["fieldset", { reserved: !1 }],
      ["figcaption", { reserved: !1 }],
      ["figure", { reserved: !1 }],
      ["font", { reserved: !1 }],
      ["footer", { reserved: !1 }],
      ["form", { reserved: !1 }],
      ["frame", { reserved: !1 }],
      ["frameset", { reserved: !1 }],
      ["h1", { reserved: !1 }],
      ["h2", { reserved: !1 }],
      ["h3", { reserved: !1 }],
      ["h4", { reserved: !1 }],
      ["h5", { reserved: !1 }],
      ["h6", { reserved: !1 }],
      ["head", { reserved: !0 }],
      ["header", { reserved: !1 }],
      ["hgroup", { reserved: !1 }],
      ["hr", { reserved: !1 }],
      ["html", { reserved: !0 }],
      ["i", { reserved: !1 }],
      ["iframe", { reserved: !1 }],
      ["img", { reserved: !1 }],
      ["input", { reserved: !1 }],
      ["ins", { reserved: !1 }],
      ["kbd", { reserved: !1 }],
      ["keygen", { reserved: !1 }],
      ["label", { reserved: !1 }],
      ["legend", { reserved: !1 }],
      ["li", { reserved: !1 }],
      ["link", { reserved: !0 }],
      ["main", { reserved: !1 }],
      ["map", { reserved: !1 }],
      ["mark", { reserved: !1 }],
      ["marquee", { reserved: !1 }],
      ["menu", { reserved: !1 }],
      ["menuitem", { reserved: !1 }],
      ["meta", { reserved: !0 }],
      ["meter", { reserved: !1 }],
      ["nav", { reserved: !1 }],
      ["noembed", { reserved: !0 }],
      ["noscript", { reserved: !0 }],
      ["object", { reserved: !1 }],
      ["ol", { reserved: !1 }],
      ["optgroup", { reserved: !1 }],
      ["option", { reserved: !1 }],
      ["output", { reserved: !1 }],
      ["p", { reserved: !1 }],
      ["param", { reserved: !0 }],
      ["picture", { reserved: !0 }],
      ["pre", { reserved: !1 }],
      ["progress", { reserved: !1 }],
      ["q", { reserved: !1 }],
      ["rp", { reserved: !1 }],
      ["rt", { reserved: !1 }],
      ["rtc", { reserved: !1 }],
      ["ruby", { reserved: !1 }],
      ["s", { reserved: !1 }],
      ["samp", { reserved: !1 }],
      ["script", { reserved: !0 }],
      ["section", { reserved: !1 }],
      ["select", { reserved: !1 }],
      ["small", { reserved: !1 }],
      ["source", { reserved: !0 }],
      ["spacer", { reserved: !1 }],
      ["span", { reserved: !1 }],
      ["strike", { reserved: !1 }],
      ["strong", { reserved: !1 }],
      ["style", { reserved: !0 }],
      ["sub", { reserved: !1 }],
      ["summary", { reserved: !1 }],
      ["sup", { reserved: !1 }],
      ["table", { reserved: !1 }],
      ["tbody", { reserved: !1 }],
      ["td", { reserved: !1 }],
      ["textarea", { reserved: !1 }],
      ["tfoot", { reserved: !1 }],
      ["th", { reserved: !1 }],
      ["thead", { reserved: !1 }],
      ["time", { reserved: !1 }],
      ["title", { reserved: !0 }],
      ["tr", { reserved: !1 }],
      ["track", { reserved: !0 }],
      ["tt", { reserved: !1 }],
      ["u", { reserved: !1 }],
      ["ul", { reserved: !1 }],
      ["var", { reserved: !1 }],
      ["video", { reserved: !1 }],
      ["wbr", { reserved: !1 }],
      ["xmp", { reserved: !1 }],
    ],
    Zi = {
      entries: function () {
        return it;
      },
      forEach: function (t) {
        var r =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : null,
          n = ty(it),
          o;
        try {
          for (n.s(); !(o = n.n()).done; ) {
            var a = vi(o.value, 2),
              i = a[0],
              s = a[1];
            t.call(r, s, i, it);
          }
        } catch (l) {
          n.e(l);
        } finally {
          n.f();
        }
      },
      get: function (t) {
        var r = it.find(function (n) {
          return n[0] === t;
        });
        return r && r[1];
      },
      has: function (t) {
        return !!Zi.get(t);
      },
      keys: function () {
        return it.map(function (t) {
          var r = vi(t, 1),
            n = r[0];
          return n;
        });
      },
      values: function () {
        return it.map(function (t) {
          var r = vi(t, 2),
            n = r[1];
          return n;
        });
      },
    },
    ry = (0, Jb.default)(Zi, Zi.entries());
  wn.default = ry;
  var xt = {},
    Cn = {},
    Pn = {};
  Object.defineProperty(Pn, "__esModule", { value: !0 });
  Pn.default = void 0;
  var ny = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "menuitem" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]],
    },
    oy = ny;
  Pn.default = oy;
  var Rn = {};
  Object.defineProperty(Rn, "__esModule", { value: !0 });
  Rn.default = void 0;
  var ay = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-activedescendant": null, "aria-disabled": null },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]],
    },
    iy = ay;
  Rn.default = iy;
  var _n = {};
  Object.defineProperty(_n, "__esModule", { value: !0 });
  _n.default = void 0;
  var ly = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-disabled": null },
      relatedConcepts: [{ concept: { name: "input" }, module: "XForms" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]],
    },
    sy = ly;
  _n.default = sy;
  var Sn = {};
  Object.defineProperty(Sn, "__esModule", { value: !0 });
  Sn.default = void 0;
  var uy = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    cy = uy;
  Sn.default = cy;
  var On = {};
  Object.defineProperty(On, "__esModule", { value: !0 });
  On.default = void 0;
  var dy = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuemax": null,
        "aria-valuemin": null,
        "aria-valuenow": null,
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    fy = dy;
  On.default = fy;
  var xn = {};
  Object.defineProperty(xn, "__esModule", { value: !0 });
  xn.default = void 0;
  var py = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {
        "aria-atomic": null,
        "aria-busy": null,
        "aria-controls": null,
        "aria-current": null,
        "aria-describedby": null,
        "aria-details": null,
        "aria-dropeffect": null,
        "aria-flowto": null,
        "aria-grabbed": null,
        "aria-hidden": null,
        "aria-keyshortcuts": null,
        "aria-label": null,
        "aria-labelledby": null,
        "aria-live": null,
        "aria-owns": null,
        "aria-relevant": null,
        "aria-roledescription": null,
      },
      relatedConcepts: [
        { concept: { name: "rel" }, module: "HTML" },
        { concept: { name: "role" }, module: "XHTML" },
        { concept: { name: "type" }, module: "Dublin Core" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [],
    },
    vy = py;
  xn.default = vy;
  var Tn = {};
  Object.defineProperty(Tn, "__esModule", { value: !0 });
  Tn.default = void 0;
  var my = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        { concept: { name: "frontmatter" }, module: "DTB" },
        { concept: { name: "level" }, module: "DTB" },
        { concept: { name: "level" }, module: "SMIL" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    by = my;
  Tn.default = by;
  var $n = {};
  Object.defineProperty($n, "__esModule", { value: !0 });
  $n.default = void 0;
  var yy = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    hy = yy;
  $n.default = hy;
  var qn = {};
  Object.defineProperty(qn, "__esModule", { value: !0 });
  qn.default = void 0;
  var gy = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-orientation": null },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite"],
        ["roletype", "structure", "section", "group"],
      ],
    },
    Ey = gy;
  qn.default = Ey;
  var An = {};
  Object.defineProperty(An, "__esModule", { value: !0 });
  An.default = void 0;
  var wy = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]],
    },
    Cy = wy;
  An.default = Cy;
  var Mn = {};
  Object.defineProperty(Mn, "__esModule", { value: !0 });
  Mn.default = void 0;
  var Py = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]],
    },
    Ry = Py;
  Mn.default = Ry;
  var In = {};
  Object.defineProperty(In, "__esModule", { value: !0 });
  In.default = void 0;
  var _y = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-modal": null },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]],
    },
    Sy = _y;
  In.default = Sy;
  Object.defineProperty(Cn, "__esModule", { value: !0 });
  Cn.default = void 0;
  var Oy = Y(Pn),
    xy = Y(Rn),
    Ty = Y(_n),
    $y = Y(Sn),
    qy = Y(On),
    Ay = Y(xn),
    My = Y(Tn),
    Iy = Y($n),
    ky = Y(qn),
    Ny = Y(An),
    By = Y(Mn),
    Ly = Y(In);
  function Y(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var jy = [
      ["command", Oy.default],
      ["composite", xy.default],
      ["input", Ty.default],
      ["landmark", $y.default],
      ["range", qy.default],
      ["roletype", Ay.default],
      ["section", My.default],
      ["sectionhead", Iy.default],
      ["select", ky.default],
      ["structure", Ny.default],
      ["widget", By.default],
      ["window", Ly.default],
    ],
    Dy = jy;
  Cn.default = Dy;
  var kn = {},
    Nn = {};
  Object.defineProperty(Nn, "__esModule", { value: !0 });
  Nn.default = void 0;
  var Fy = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-atomic": "true", "aria-live": "assertive" },
      relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Uy = Fy;
  Nn.default = Uy;
  var Bn = {};
  Object.defineProperty(Bn, "__esModule", { value: !0 });
  Bn.default = void 0;
  var Hy = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "alert"],
        ["roletype", "window", "dialog"],
      ],
    },
    Wy = Hy;
  Bn.default = Wy;
  var Ln = {};
  Object.defineProperty(Ln, "__esModule", { value: !0 });
  Ln.default = void 0;
  var Vy = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "Device Independence Delivery Unit" } },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    zy = Vy;
  Ln.default = zy;
  var jn = {};
  Object.defineProperty(jn, "__esModule", { value: !0 });
  jn.default = void 0;
  var Ky = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-posinset": null, "aria-setsize": null },
      relatedConcepts: [{ concept: { name: "article" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]],
    },
    Gy = Ky;
  jn.default = Gy;
  var Dn = {};
  Object.defineProperty(Dn, "__esModule", { value: !0 });
  Dn.default = void 0;
  var Xy = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        {
          concept: {
            constraints: ["direct descendant of document"],
            name: "header",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    Jy = Xy;
  Dn.default = Jy;
  var Fn = {};
  Object.defineProperty(Fn, "__esModule", { value: !0 });
  Fn.default = void 0;
  var Yy = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Qy = Yy;
  Fn.default = Qy;
  var Un = {};
  Object.defineProperty(Un, "__esModule", { value: !0 });
  Un.default = void 0;
  var Zy = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-pressed": null,
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [
              { constraints: ["set"], name: "aria-pressed" },
              { name: "type", value: "checkbox" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ name: "aria-expanded", value: "false" }],
            name: "summary",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ name: "aria-expanded", value: "true" }],
            constraints: [
              "direct descendant of details element with the open attribute defined",
            ],
            name: "summary",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ name: "type", value: "button" }],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ name: "type", value: "image" }],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ name: "type", value: "reset" }],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ name: "type", value: "submit" }],
            name: "input",
          },
          module: "HTML",
        },
        { concept: { name: "button" }, module: "HTML" },
        { concept: { name: "trigger" }, module: "XForms" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]],
    },
    eh = Zy;
  Un.default = eh;
  var Hn = {};
  Object.defineProperty(Hn, "__esModule", { value: !0 });
  Hn.default = void 0;
  var th = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: ["figure", "grid", "table"],
      requiredContextRole: ["figure", "grid", "table"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    rh = th;
  Hn.default = rh;
  var Wn = {};
  Object.defineProperty(Wn, "__esModule", { value: !0 });
  Wn.default = void 0;
  var nh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-colspan": null,
        "aria-rowindex": null,
        "aria-rowspan": null,
      },
      relatedConcepts: [
        {
          concept: { constraints: ["descendant of table"], name: "td" },
          module: "HTML",
        },
      ],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    oh = nh;
  Wn.default = oh;
  var Vn = {};
  Object.defineProperty(Vn, "__esModule", { value: !0 });
  Vn.default = void 0;
  var ah = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [{ name: "type", value: "checkbox" }],
            name: "input",
          },
          module: "HTML",
        },
        { concept: { name: "option" }, module: "ARIA" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-checked": null },
      superClass: [["roletype", "widget", "input"]],
    },
    ih = ah;
  Vn.default = ih;
  var zn = {};
  Object.defineProperty(zn, "__esModule", { value: !0 });
  zn.default = void 0;
  var lh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    sh = lh;
  zn.default = sh;
  var Kn = {};
  Object.defineProperty(Kn, "__esModule", { value: !0 });
  Kn.default = void 0;
  var uh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: { "aria-sort": null },
      relatedConcepts: [
        {
          attributes: [{ name: "scope", value: "col" }],
          concept: { name: "th" },
          module: "HTML",
        },
      ],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "cell"],
        ["roletype", "structure", "section", "cell", "gridcell"],
        ["roletype", "widget", "gridcell"],
        ["roletype", "structure", "sectionhead"],
      ],
    },
    ch = uh;
  Kn.default = ch;
  var Gn = {};
  Object.defineProperty(Gn, "__esModule", { value: !0 });
  Gn.default = void 0;
  var dh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-expanded": "false",
        "aria-haspopup": "listbox",
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [
              { constraints: ["set"], name: "list" },
              { name: "type", value: "email" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["set"], name: "list" },
              { name: "type", value: "search" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["set"], name: "list" },
              { name: "type", value: "tel" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["set"], name: "list" },
              { name: "type", value: "text" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["set"], name: "list" },
              { name: "type", value: "url" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["set"], name: "list" },
              { name: "type", value: "url" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "multiple" },
              { constraints: ["undefined"], name: "size" },
            ],
            name: "select",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "multiple" },
              { name: "size", value: 1 },
            ],
            name: "select",
          },
          module: "HTML",
        },
        { concept: { name: "select" }, module: "XForms" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-controls": null, "aria-expanded": "false" },
      superClass: [["roletype", "widget", "input"]],
    },
    fh = dh;
  Gn.default = fh;
  var Xn = {};
  Object.defineProperty(Xn, "__esModule", { value: !0 });
  Xn.default = void 0;
  var ph = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "aside" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    vh = ph;
  Xn.default = vh;
  var Jn = {};
  Object.defineProperty(Jn, "__esModule", { value: !0 });
  Jn.default = void 0;
  var mh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        {
          concept: {
            constraints: ["direct descendant of document"],
            name: "footer",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    bh = mh;
  Jn.default = bh;
  var Yn = {};
  Object.defineProperty(Yn, "__esModule", { value: !0 });
  Yn.default = void 0;
  var yh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "dd" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    hh = yh;
  Yn.default = hh;
  var Qn = {};
  Object.defineProperty(Qn, "__esModule", { value: !0 });
  Qn.default = void 0;
  var gh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Eh = gh;
  Qn.default = Eh;
  var Zn = {};
  Object.defineProperty(Zn, "__esModule", { value: !0 });
  Zn.default = void 0;
  var wh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "dialog" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "window"]],
    },
    Ch = wh;
  Zn.default = Ch;
  var eo = {};
  Object.defineProperty(eo, "__esModule", { value: !0 });
  eo.default = void 0;
  var Ph = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ module: "DAISY Guide" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]],
    },
    Rh = Ph;
  eo.default = Rh;
  var to = {};
  Object.defineProperty(to, "__esModule", { value: !0 });
  to.default = void 0;
  var _h = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        { concept: { name: "Device Independence Delivery Unit" } },
        { concept: { name: "body" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    Sh = _h;
  to.default = Sh;
  var ro = {};
  Object.defineProperty(ro, "__esModule", { value: !0 });
  ro.default = void 0;
  var Oh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    xh = Oh;
  ro.default = xh;
  var no = {};
  Object.defineProperty(no, "__esModule", { value: !0 });
  no.default = void 0;
  var Th = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["article"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]],
    },
    $h = Th;
  no.default = $h;
  var oo = {};
  Object.defineProperty(oo, "__esModule", { value: !0 });
  oo.default = void 0;
  var qh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "figure" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Ah = qh;
  oo.default = Ah;
  var ao = {};
  Object.defineProperty(ao, "__esModule", { value: !0 });
  ao.default = void 0;
  var Mh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        {
          concept: {
            attributes: [{ constraints: ["set"], name: "aria-label" }],
            name: "form",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
            name: "form",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ constraints: ["set"], name: "name" }],
            name: "form",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    Ih = Mh;
  ao.default = Ih;
  var io = {};
  Object.defineProperty(io, "__esModule", { value: !0 });
  io.default = void 0;
  var kh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [
        { concept: { name: "span" }, module: "HTML" },
        { concept: { name: "div" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    Nh = kh;
  io.default = Nh;
  var lo = {};
  Object.defineProperty(lo, "__esModule", { value: !0 });
  lo.default = void 0;
  var Bh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-multiselectable": null, "aria-readonly": null },
      relatedConcepts: [
        {
          concept: {
            attributes: [{ name: "role", value: "grid" }],
            name: "table",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite"],
        ["roletype", "structure", "section", "table"],
      ],
    },
    Lh = Bh;
  lo.default = Lh;
  var so = {};
  Object.defineProperty(so, "__esModule", { value: !0 });
  so.default = void 0;
  var jh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-selected": null,
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [{ name: "role", value: "gridcell" }],
            name: "td",
          },
          module: "HTML",
        },
      ],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "cell"],
        ["roletype", "widget"],
      ],
    },
    Dh = jh;
  so.default = Dh;
  var uo = {};
  Object.defineProperty(uo, "__esModule", { value: !0 });
  uo.default = void 0;
  var Fh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-activedescendant": null, "aria-disabled": null },
      relatedConcepts: [
        { concept: { name: "details" }, module: "HTML" },
        { concept: { name: "fieldset" }, module: "HTML" },
        { concept: { name: "optgroup" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Uh = Fh;
  uo.default = Uh;
  var co = {};
  Object.defineProperty(co, "__esModule", { value: !0 });
  co.default = void 0;
  var Hh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: { "aria-level": "2" },
      relatedConcepts: [
        { concept: { name: "h1" }, module: "HTML" },
        { concept: { name: "h2" }, module: "HTML" },
        { concept: { name: "h3" }, module: "HTML" },
        { concept: { name: "h4" }, module: "HTML" },
        { concept: { name: "h5" }, module: "HTML" },
        { concept: { name: "h6" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-level": "2" },
      superClass: [["roletype", "structure", "sectionhead"]],
    },
    Wh = Hh;
  co.default = Wh;
  var fo = {};
  Object.defineProperty(fo, "__esModule", { value: !0 });
  fo.default = void 0;
  var Vh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        {
          concept: {
            attributes: [{ constraints: ["set"], name: "alt" }],
            name: "img",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ constraints: ["undefined"], name: "alt" }],
            name: "img",
          },
          module: "HTML",
        },
        { concept: { name: "imggroup" }, module: "DTB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    zh = Vh;
  fo.default = zh;
  var po = {};
  Object.defineProperty(po, "__esModule", { value: !0 });
  po.default = void 0;
  var Kh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Gh = Kh;
  po.default = Gh;
  var vo = {};
  Object.defineProperty(vo, "__esModule", { value: !0 });
  vo.default = void 0;
  var Xh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
      },
      relatedConcepts: [
        {
          concept: { attributes: [{ name: "href" }], name: "a" },
          module: "HTML",
        },
        {
          concept: { attributes: [{ name: "href" }], name: "area" },
          module: "HTML",
        },
        {
          concept: { attributes: [{ name: "href" }], name: "link" },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]],
    },
    Jh = Xh;
  vo.default = Jh;
  var mo = {};
  Object.defineProperty(mo, "__esModule", { value: !0 });
  mo.default = void 0;
  var Yh = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        { concept: { name: "menu" }, module: "HTML" },
        { concept: { name: "ol" }, module: "HTML" },
        { concept: { name: "ul" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["listitem"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Qh = Yh;
  mo.default = Qh;
  var bo = {};
  Object.defineProperty(bo, "__esModule", { value: !0 });
  bo.default = void 0;
  var Zh = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-orientation": "vertical",
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [
              { constraints: [">1"], name: "size" },
              { name: "multiple" },
            ],
            name: "select",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ constraints: [">1"], name: "size" }],
            name: "select",
          },
          module: "HTML",
        },
        {
          concept: { attributes: [{ name: "multiple" }], name: "select" },
          module: "HTML",
        },
        { concept: { name: "datalist" }, module: "HTML" },
        { concept: { name: "list" }, module: "ARIA" },
        { concept: { name: "select" }, module: "XForms" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["option", "group"], ["option"]],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite", "select"],
        ["roletype", "structure", "section", "group", "select"],
      ],
    },
    eg = Zh;
  bo.default = eg;
  var yo = {};
  Object.defineProperty(yo, "__esModule", { value: !0 });
  yo.default = void 0;
  var tg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-posinset": null,
        "aria-setsize": null,
      },
      relatedConcepts: [
        {
          concept: {
            constraints: ["direct descendant of ol, ul or menu"],
            name: "li",
          },
          module: "HTML",
        },
        { concept: { name: "item" }, module: "XForms" },
      ],
      requireContextRole: ["directory", "list"],
      requiredContextRole: ["directory", "list"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    rg = tg;
  yo.default = rg;
  var ho = {};
  Object.defineProperty(ho, "__esModule", { value: !0 });
  ho.default = void 0;
  var ng = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-live": "polite" },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    og = ng;
  ho.default = og;
  var go = {};
  Object.defineProperty(go, "__esModule", { value: !0 });
  go.default = void 0;
  var ag = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "main" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    ig = ag;
  go.default = ig;
  var Eo = {};
  Object.defineProperty(Eo, "__esModule", { value: !0 });
  Eo.default = void 0;
  var lg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    sg = lg;
  Eo.default = sg;
  var wo = {};
  Object.defineProperty(wo, "__esModule", { value: !0 });
  wo.default = void 0;
  var ug = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "math" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    cg = ug;
  wo.default = cg;
  var Co = {};
  Object.defineProperty(Co, "__esModule", { value: !0 });
  Co.default = void 0;
  var dg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-orientation": "vertical" },
      relatedConcepts: [
        { concept: { name: "MENU" }, module: "JAPI" },
        { concept: { name: "list" }, module: "ARIA" },
        { concept: { name: "select" }, module: "XForms" },
        { concept: { name: "sidebar" }, module: "DTB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [
        ["menuitem", "group"],
        ["menuitemradio", "group"],
        ["menuitemcheckbox", "group"],
        ["menuitem"],
        ["menuitemcheckbox"],
        ["menuitemradio"],
      ],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite", "select"],
        ["roletype", "structure", "section", "group", "select"],
      ],
    },
    fg = dg;
  Co.default = fg;
  var Po = {};
  Object.defineProperty(Po, "__esModule", { value: !0 });
  Po.default = void 0;
  var pg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-orientation": "horizontal" },
      relatedConcepts: [{ concept: { name: "toolbar" }, module: "ARIA" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [
        ["menuitem", "group"],
        ["menuitemradio", "group"],
        ["menuitemcheckbox", "group"],
        ["menuitem"],
        ["menuitemcheckbox"],
        ["menuitemradio"],
      ],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite", "select", "menu"],
        ["roletype", "structure", "section", "group", "select", "menu"],
      ],
    },
    vg = pg;
  Po.default = vg;
  var Ro = {};
  Object.defineProperty(Ro, "__esModule", { value: !0 });
  Ro.default = void 0;
  var mg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null,
      },
      relatedConcepts: [
        { concept: { name: "MENU_ITEM" }, module: "JAPI" },
        { concept: { name: "listitem" }, module: "ARIA" },
        { concept: { name: "menuitem" }, module: "HTML" },
        { concept: { name: "option" }, module: "ARIA" },
      ],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]],
    },
    bg = mg;
  Ro.default = bg;
  var _o = {};
  Object.defineProperty(_o, "__esModule", { value: !0 });
  _o.default = void 0;
  var yg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: { "aria-checked": null },
      superClass: [
        ["roletype", "widget", "input", "checkbox"],
        ["roletype", "widget", "command", "menuitem"],
      ],
    },
    hg = yg;
  _o.default = hg;
  var So = {};
  Object.defineProperty(So, "__esModule", { value: !0 });
  So.default = void 0;
  var gg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: { "aria-checked": null },
      superClass: [
        ["roletype", "widget", "input", "checkbox", "menuitemcheckbox"],
        ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"],
        ["roletype", "widget", "input", "radio"],
      ],
    },
    Eg = gg;
  So.default = Eg;
  var Oo = {};
  Object.defineProperty(Oo, "__esModule", { value: !0 });
  Oo.default = void 0;
  var wg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuetext": null,
        "aria-valuemax": "100",
        "aria-valuemin": "0",
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-valuenow": null },
      superClass: [["roletype", "structure", "range"]],
    },
    Cg = wg;
  Oo.default = Cg;
  var xo = {};
  Object.defineProperty(xo, "__esModule", { value: !0 });
  xo.default = void 0;
  var Pg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "nav" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    Rg = Pg;
  xo.default = Rg;
  var To = {};
  Object.defineProperty(To, "__esModule", { value: !0 });
  To.default = void 0;
  var _g = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [],
    },
    Sg = _g;
  To.default = Sg;
  var $o = {};
  Object.defineProperty($o, "__esModule", { value: !0 });
  $o.default = void 0;
  var Og = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    xg = Og;
  $o.default = xg;
  var qo = {};
  Object.defineProperty(qo, "__esModule", { value: !0 });
  qo.default = void 0;
  var Tg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false",
      },
      relatedConcepts: [
        { concept: { name: "item" }, module: "XForms" },
        { concept: { name: "listitem" }, module: "ARIA" },
        { concept: { name: "option" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-selected": "false" },
      superClass: [["roletype", "widget", "input"]],
    },
    $g = Tg;
  qo.default = $g;
  var Ao = {};
  Object.defineProperty(Ao, "__esModule", { value: !0 });
  Ao.default = void 0;
  var qg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    Ag = qg;
  Ao.default = Ag;
  var Mo = {};
  Object.defineProperty(Mo, "__esModule", { value: !0 });
  Mo.default = void 0;
  var Mg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    Ig = Mg;
  Mo.default = Ig;
  var Io = {};
  Object.defineProperty(Io, "__esModule", { value: !0 });
  Io.default = void 0;
  var kg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-valuetext": null },
      relatedConcepts: [
        { concept: { name: "progress" }, module: "HTML" },
        { concept: { name: "status" }, module: "ARIA" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "range"],
        ["roletype", "widget"],
      ],
    },
    Ng = kg;
  Io.default = Ng;
  var ko = {};
  Object.defineProperty(ko, "__esModule", { value: !0 });
  ko.default = void 0;
  var Bg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null,
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [{ name: "type", value: "radio" }],
            name: "input",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-checked": null },
      superClass: [["roletype", "widget", "input"]],
    },
    Lg = Bg;
  ko.default = Lg;
  var No = {};
  Object.defineProperty(No, "__esModule", { value: !0 });
  No.default = void 0;
  var jg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
      },
      relatedConcepts: [{ concept: { name: "list" }, module: "ARIA" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["radio"]],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite", "select"],
        ["roletype", "structure", "section", "group", "select"],
      ],
    },
    Dg = jg;
  No.default = Dg;
  var Bo = {};
  Object.defineProperty(Bo, "__esModule", { value: !0 });
  Bo.default = void 0;
  var Fg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        {
          concept: {
            attributes: [{ constraints: ["set"], name: "aria-label" }],
            name: "section",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
            name: "section",
          },
          module: "HTML",
        },
        { concept: { name: "Device Independence Glossart perceivable unit" } },
        { concept: { name: "frame" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    Ug = Fg;
  Bo.default = Ug;
  var Lo = {};
  Object.defineProperty(Lo, "__esModule", { value: !0 });
  Lo.default = void 0;
  var Hg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-expanded": null,
        "aria-level": null,
        "aria-posinset": null,
        "aria-rowindex": null,
        "aria-selected": null,
        "aria-setsize": null,
      },
      relatedConcepts: [{ concept: { name: "tr" }, module: "HTML" }],
      requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredOwnedElements: [
        ["cell"],
        ["columnheader"],
        ["gridcell"],
        ["rowheader"],
      ],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "group"],
        ["roletype", "widget"],
      ],
    },
    Wg = Hg;
  Lo.default = Wg;
  var jo = {};
  Object.defineProperty(jo, "__esModule", { value: !0 });
  jo.default = void 0;
  var Vg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        { concept: { name: "tbody" }, module: "HTML" },
        { concept: { name: "tfoot" }, module: "HTML" },
        { concept: { name: "thead" }, module: "HTML" },
      ],
      requireContextRole: ["grid", "table", "treegrid"],
      requiredContextRole: ["grid", "table", "treegrid"],
      requiredOwnedElements: [["row"]],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    zg = Vg;
  jo.default = zg;
  var Do = {};
  Object.defineProperty(Do, "__esModule", { value: !0 });
  Do.default = void 0;
  var Kg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: { "aria-sort": null },
      relatedConcepts: [
        {
          concept: {
            attributes: [{ name: "scope", value: "row" }],
            name: "th",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [{ name: "scope", value: "rowgroup" }],
            name: "th",
          },
          module: "HTML",
        },
      ],
      requireContextRole: ["row", "rowgroup"],
      requiredContextRole: ["row", "rowgroup"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "cell"],
        ["roletype", "structure", "section", "cell", "gridcell"],
        ["roletype", "widget", "gridcell"],
        ["roletype", "structure", "sectionhead"],
      ],
    },
    Gg = Kg;
  Do.default = Gg;
  var Fo = {};
  Object.defineProperty(Fo, "__esModule", { value: !0 });
  Fo.default = void 0;
  var Xg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-valuetext": null,
        "aria-orientation": "vertical",
        "aria-valuemax": "100",
        "aria-valuemin": "0",
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-controls": null, "aria-valuenow": null },
      superClass: [
        ["roletype", "structure", "range"],
        ["roletype", "widget"],
      ],
    },
    Jg = Xg;
  Fo.default = Jg;
  var Uo = {};
  Object.defineProperty(Uo, "__esModule", { value: !0 });
  Uo.default = void 0;
  var Yg = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    Qg = Yg;
  Uo.default = Qg;
  var Ho = {};
  Object.defineProperty(Ho, "__esModule", { value: !0 });
  Ho.default = void 0;
  var Zg = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "list" },
              { name: "type", value: "search" },
            ],
            name: "input",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input", "textbox"]],
    },
    eE = Zg;
  Ho.default = eE;
  var Wo = {};
  Object.defineProperty(Wo, "__esModule", { value: !0 });
  Wo.default = void 0;
  var tE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0",
        "aria-valuenow": null,
        "aria-valuetext": null,
      },
      relatedConcepts: [{ concept: { name: "hr" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]],
    },
    rE = tE;
  Wo.default = rE;
  var Vo = {};
  Object.defineProperty(Vo, "__esModule", { value: !0 });
  Vo.default = void 0;
  var nE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-valuetext": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0",
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [{ name: "type", value: "range" }],
            name: "input",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-valuenow": null },
      superClass: [
        ["roletype", "widget", "input"],
        ["roletype", "structure", "range"],
      ],
    },
    oE = nE;
  Vo.default = oE;
  var zo = {};
  Object.defineProperty(zo, "__esModule", { value: !0 });
  zo.default = void 0;
  var aE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-valuetext": null,
        "aria-valuenow": "0",
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [{ name: "type", value: "number" }],
            name: "input",
          },
          module: "HTML",
        },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite"],
        ["roletype", "widget", "input"],
        ["roletype", "structure", "range"],
      ],
    },
    iE = aE;
  zo.default = iE;
  var Ko = {};
  Object.defineProperty(Ko, "__esModule", { value: !0 });
  Ko.default = void 0;
  var lE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-atomic": "true", "aria-live": "polite" },
      relatedConcepts: [{ concept: { name: "output" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    sE = lE;
  Ko.default = sE;
  var Go = {};
  Object.defineProperty(Go, "__esModule", { value: !0 });
  Go.default = void 0;
  var uE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    cE = uE;
  Go.default = cE;
  var Xo = {};
  Object.defineProperty(Xo, "__esModule", { value: !0 });
  Xo.default = void 0;
  var dE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    fE = dE;
  Xo.default = fE;
  var Jo = {};
  Object.defineProperty(Jo, "__esModule", { value: !0 });
  Jo.default = void 0;
  var pE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    vE = pE;
  Jo.default = vE;
  var Yo = {};
  Object.defineProperty(Yo, "__esModule", { value: !0 });
  Yo.default = void 0;
  var mE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{ concept: { name: "button" }, module: "ARIA" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: { "aria-checked": null },
      superClass: [["roletype", "widget", "input", "checkbox"]],
    },
    bE = mE;
  Yo.default = bE;
  var Qo = {};
  Object.defineProperty(Qo, "__esModule", { value: !0 });
  Qo.default = void 0;
  var yE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false",
      },
      relatedConcepts: [],
      requireContextRole: ["tablist"],
      requiredContextRole: ["tablist"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "sectionhead"],
        ["roletype", "widget"],
      ],
    },
    hE = yE;
  Qo.default = hE;
  var Zo = {};
  Object.defineProperty(Zo, "__esModule", { value: !0 });
  Zo.default = void 0;
  var gE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-colcount": null, "aria-rowcount": null },
      relatedConcepts: [{ concept: { name: "table" }, module: "HTML" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    EE = gE;
  Zo.default = EE;
  var ea = {};
  Object.defineProperty(ea, "__esModule", { value: !0 });
  ea.default = void 0;
  var wE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-multiselectable": null,
        "aria-orientation": "horizontal",
      },
      relatedConcepts: [{ module: "DAISY", concept: { name: "guide" } }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["tab"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"]],
    },
    CE = wE;
  ea.default = CE;
  var ta = {};
  Object.defineProperty(ta, "__esModule", { value: !0 });
  ta.default = void 0;
  var PE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    RE = PE;
  ta.default = RE;
  var ra = {};
  Object.defineProperty(ra, "__esModule", { value: !0 });
  ra.default = void 0;
  var _E = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        { concept: { name: "dfn" }, module: "HTML" },
        { concept: { name: "dt" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    SE = _E;
  ra.default = SE;
  var na = {};
  Object.defineProperty(na, "__esModule", { value: !0 });
  na.default = void 0;
  var OE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-multiline": null,
        "aria-placeholder": null,
        "aria-readonly": null,
        "aria-required": null,
      },
      relatedConcepts: [
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "type" },
              { constraints: ["undefined"], name: "list" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "list" },
              { name: "type", value: "email" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "list" },
              { name: "type", value: "tel" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "list" },
              { name: "type", value: "text" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        {
          concept: {
            attributes: [
              { constraints: ["undefined"], name: "list" },
              { name: "type", value: "url" },
            ],
            name: "input",
          },
          module: "HTML",
        },
        { concept: { name: "input" }, module: "XForms" },
        { concept: { name: "textarea" }, module: "HTML" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input"]],
    },
    xE = OE;
  na.default = xE;
  var oa = {};
  Object.defineProperty(oa, "__esModule", { value: !0 });
  oa.default = void 0;
  var TE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    $E = TE;
  oa.default = $E;
  var aa = {};
  Object.defineProperty(aa, "__esModule", { value: !0 });
  aa.default = void 0;
  var qE = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "status"]],
    },
    AE = qE;
  aa.default = AE;
  var ia = {};
  Object.defineProperty(ia, "__esModule", { value: !0 });
  ia.default = void 0;
  var ME = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: { "aria-orientation": "horizontal" },
      relatedConcepts: [{ concept: { name: "menubar" }, module: "ARIA" }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]],
    },
    IE = ME;
  ia.default = IE;
  var la = {};
  Object.defineProperty(la, "__esModule", { value: !0 });
  la.default = void 0;
  var kE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    NE = kE;
  la.default = NE;
  var sa = {};
  Object.defineProperty(sa, "__esModule", { value: !0 });
  sa.default = void 0;
  var BE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-required": null,
        "aria-orientation": "vertical",
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite", "select"],
        ["roletype", "structure", "section", "group", "select"],
      ],
    },
    LE = BE;
  sa.default = LE;
  var ua = {};
  Object.defineProperty(ua, "__esModule", { value: !0 });
  ua.default = void 0;
  var jE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [
        ["roletype", "widget", "composite", "grid"],
        ["roletype", "structure", "section", "table", "grid"],
        ["roletype", "widget", "composite", "select", "tree"],
        ["roletype", "structure", "section", "group", "select", "tree"],
      ],
    },
    DE = jE;
  ua.default = DE;
  var ca = {};
  Object.defineProperty(ca, "__esModule", { value: !0 });
  ca.default = void 0;
  var FE = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: { "aria-expanded": null, "aria-haspopup": null },
      relatedConcepts: [],
      requireContextRole: ["group", "tree"],
      requiredContextRole: ["group", "tree"],
      requiredOwnedElements: [],
      requiredProps: { "aria-selected": null },
      superClass: [
        ["roletype", "structure", "section", "listitem"],
        ["roletype", "widget", "input", "option"],
      ],
    },
    UE = FE;
  ca.default = UE;
  Object.defineProperty(kn, "__esModule", { value: !0 });
  kn.default = void 0;
  var HE = g(Nn),
    WE = g(Bn),
    VE = g(Ln),
    zE = g(jn),
    KE = g(Dn),
    GE = g(Fn),
    XE = g(Un),
    JE = g(Hn),
    YE = g(Wn),
    QE = g(Vn),
    ZE = g(zn),
    ew = g(Kn),
    tw = g(Gn),
    rw = g(Xn),
    nw = g(Jn),
    ow = g(Yn),
    aw = g(Qn),
    iw = g(Zn),
    lw = g(eo),
    sw = g(to),
    uw = g(ro),
    cw = g(no),
    dw = g(oo),
    fw = g(ao),
    pw = g(io),
    vw = g(lo),
    mw = g(so),
    bw = g(uo),
    yw = g(co),
    hw = g(fo),
    gw = g(po),
    Ew = g(vo),
    ww = g(mo),
    Cw = g(bo),
    Pw = g(yo),
    Rw = g(ho),
    _w = g(go),
    Sw = g(Eo),
    Ow = g(wo),
    xw = g(Co),
    Tw = g(Po),
    $w = g(Ro),
    qw = g(_o),
    Aw = g(So),
    Mw = g(Oo),
    Iw = g(xo),
    kw = g(To),
    Nw = g($o),
    Bw = g(qo),
    Lw = g(Ao),
    jw = g(Mo),
    Dw = g(Io),
    Fw = g(ko),
    Uw = g(No),
    Hw = g(Bo),
    Ww = g(Lo),
    Vw = g(jo),
    zw = g(Do),
    Kw = g(Fo),
    Gw = g(Uo),
    Xw = g(Ho),
    Jw = g(Wo),
    Yw = g(Vo),
    Qw = g(zo),
    Zw = g(Ko),
    eC = g(Go),
    tC = g(Xo),
    rC = g(Jo),
    nC = g(Yo),
    oC = g(Qo),
    aC = g(Zo),
    iC = g(ea),
    lC = g(ta),
    sC = g(ra),
    uC = g(na),
    cC = g(oa),
    dC = g(aa),
    fC = g(ia),
    pC = g(la),
    vC = g(sa),
    mC = g(ua),
    bC = g(ca);
  function g(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var yC = [
      ["alert", HE.default],
      ["alertdialog", WE.default],
      ["application", VE.default],
      ["article", zE.default],
      ["banner", KE.default],
      ["blockquote", GE.default],
      ["button", XE.default],
      ["caption", JE.default],
      ["cell", YE.default],
      ["checkbox", QE.default],
      ["code", ZE.default],
      ["columnheader", ew.default],
      ["combobox", tw.default],
      ["complementary", rw.default],
      ["contentinfo", nw.default],
      ["definition", ow.default],
      ["deletion", aw.default],
      ["dialog", iw.default],
      ["directory", lw.default],
      ["document", sw.default],
      ["emphasis", uw.default],
      ["feed", cw.default],
      ["figure", dw.default],
      ["form", fw.default],
      ["generic", pw.default],
      ["grid", vw.default],
      ["gridcell", mw.default],
      ["group", bw.default],
      ["heading", yw.default],
      ["img", hw.default],
      ["insertion", gw.default],
      ["link", Ew.default],
      ["list", ww.default],
      ["listbox", Cw.default],
      ["listitem", Pw.default],
      ["log", Rw.default],
      ["main", _w.default],
      ["marquee", Sw.default],
      ["math", Ow.default],
      ["menu", xw.default],
      ["menubar", Tw.default],
      ["menuitem", $w.default],
      ["menuitemcheckbox", qw.default],
      ["menuitemradio", Aw.default],
      ["meter", Mw.default],
      ["navigation", Iw.default],
      ["none", kw.default],
      ["note", Nw.default],
      ["option", Bw.default],
      ["paragraph", Lw.default],
      ["presentation", jw.default],
      ["progressbar", Dw.default],
      ["radio", Fw.default],
      ["radiogroup", Uw.default],
      ["region", Hw.default],
      ["row", Ww.default],
      ["rowgroup", Vw.default],
      ["rowheader", zw.default],
      ["scrollbar", Kw.default],
      ["search", Gw.default],
      ["searchbox", Xw.default],
      ["separator", Jw.default],
      ["slider", Yw.default],
      ["spinbutton", Qw.default],
      ["status", Zw.default],
      ["strong", eC.default],
      ["subscript", tC.default],
      ["superscript", rC.default],
      ["switch", nC.default],
      ["tab", oC.default],
      ["table", aC.default],
      ["tablist", iC.default],
      ["tabpanel", lC.default],
      ["term", sC.default],
      ["textbox", uC.default],
      ["time", cC.default],
      ["timer", dC.default],
      ["toolbar", fC.default],
      ["tooltip", pC.default],
      ["tree", vC.default],
      ["treegrid", mC.default],
      ["treeitem", bC.default],
    ],
    hC = yC;
  kn.default = hC;
  var da = {},
    fa = {};
  Object.defineProperty(fa, "__esModule", { value: !0 });
  fa.default = void 0;
  var gC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "abstract [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    EC = gC;
  fa.default = EC;
  var pa = {};
  Object.defineProperty(pa, "__esModule", { value: !0 });
  pa.default = void 0;
  var wC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "acknowledgments [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    CC = wC;
  pa.default = CC;
  var va = {};
  Object.defineProperty(va, "__esModule", { value: !0 });
  va.default = void 0;
  var PC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "afterword [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    RC = PC;
  va.default = RC;
  var ma = {};
  Object.defineProperty(ma, "__esModule", { value: !0 });
  ma.default = void 0;
  var _C = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "appendix [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    SC = _C;
  ma.default = SC;
  var ba = {};
  Object.defineProperty(ba, "__esModule", { value: !0 });
  ba.default = void 0;
  var OC = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "content"],
      prohibitedProps: [],
      props: { "aria-errormessage": null, "aria-invalid": null },
      relatedConcepts: [
        { concept: { name: "referrer [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]],
    },
    xC = OC;
  ba.default = xC;
  var ya = {};
  Object.defineProperty(ya, "__esModule", { value: !0 });
  ya.default = void 0;
  var TC = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "EPUB biblioentry [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: ["doc-bibliography"],
      requiredContextRole: ["doc-bibliography"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]],
    },
    $C = TC;
  ya.default = $C;
  var ha = {};
  Object.defineProperty(ha, "__esModule", { value: !0 });
  ha.default = void 0;
  var qC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "bibliography [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-biblioentry"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    AC = qC;
  ha.default = AC;
  var ga = {};
  Object.defineProperty(ga, "__esModule", { value: !0 });
  ga.default = void 0;
  var MC = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: { "aria-errormessage": null, "aria-invalid": null },
      relatedConcepts: [
        { concept: { name: "biblioref [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]],
    },
    IC = MC;
  ga.default = IC;
  var Ea = {};
  Object.defineProperty(Ea, "__esModule", { value: !0 });
  Ea.default = void 0;
  var kC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "chapter [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    NC = kC;
  Ea.default = NC;
  var wa = {};
  Object.defineProperty(wa, "__esModule", { value: !0 });
  wa.default = void 0;
  var BC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "colophon [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    LC = BC;
  wa.default = LC;
  var Ca = {};
  Object.defineProperty(Ca, "__esModule", { value: !0 });
  Ca.default = void 0;
  var jC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "conclusion [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    DC = jC;
  Ca.default = DC;
  var Pa = {};
  Object.defineProperty(Pa, "__esModule", { value: !0 });
  Pa.default = void 0;
  var FC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "cover [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]],
    },
    UC = FC;
  Pa.default = UC;
  var Ra = {};
  Object.defineProperty(Ra, "__esModule", { value: !0 });
  Ra.default = void 0;
  var HC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "credit [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    WC = HC;
  Ra.default = WC;
  var _a = {};
  Object.defineProperty(_a, "__esModule", { value: !0 });
  _a.default = void 0;
  var VC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "credits [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    zC = VC;
  _a.default = zC;
  var Sa = {};
  Object.defineProperty(Sa, "__esModule", { value: !0 });
  Sa.default = void 0;
  var KC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "dedication [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    GC = KC;
  Sa.default = GC;
  var Oa = {};
  Object.defineProperty(Oa, "__esModule", { value: !0 });
  Oa.default = void 0;
  var XC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "rearnote [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: ["doc-endnotes"],
      requiredContextRole: ["doc-endnotes"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]],
    },
    JC = XC;
  Oa.default = JC;
  var xa = {};
  Object.defineProperty(xa, "__esModule", { value: !0 });
  xa.default = void 0;
  var YC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "rearnotes [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-endnote"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    QC = YC;
  xa.default = QC;
  var Ta = {};
  Object.defineProperty(Ta, "__esModule", { value: !0 });
  Ta.default = void 0;
  var ZC = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "epigraph [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    eP = ZC;
  Ta.default = eP;
  var $a = {};
  Object.defineProperty($a, "__esModule", { value: !0 });
  $a.default = void 0;
  var tP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "epilogue [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    rP = tP;
  $a.default = rP;
  var qa = {};
  Object.defineProperty(qa, "__esModule", { value: !0 });
  qa.default = void 0;
  var nP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "errata [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    oP = nP;
  qa.default = oP;
  var Aa = {};
  Object.defineProperty(Aa, "__esModule", { value: !0 });
  Aa.default = void 0;
  var aP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    iP = aP;
  Aa.default = iP;
  var Ma = {};
  Object.defineProperty(Ma, "__esModule", { value: !0 });
  Ma.default = void 0;
  var lP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "footnote [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    sP = lP;
  Ma.default = sP;
  var Ia = {};
  Object.defineProperty(Ia, "__esModule", { value: !0 });
  Ia.default = void 0;
  var uP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "foreword [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    cP = uP;
  Ia.default = cP;
  var ka = {};
  Object.defineProperty(ka, "__esModule", { value: !0 });
  ka.default = void 0;
  var dP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "glossary [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["definition"], ["term"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    fP = dP;
  ka.default = fP;
  var Na = {};
  Object.defineProperty(Na, "__esModule", { value: !0 });
  Na.default = void 0;
  var pP = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: { "aria-errormessage": null, "aria-invalid": null },
      relatedConcepts: [
        { concept: { name: "glossref [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]],
    },
    vP = pP;
  Na.default = vP;
  var Ba = {};
  Object.defineProperty(Ba, "__esModule", { value: !0 });
  Ba.default = void 0;
  var mP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "index [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "landmark", "navigation"],
      ],
    },
    bP = mP;
  Ba.default = bP;
  var La = {};
  Object.defineProperty(La, "__esModule", { value: !0 });
  La.default = void 0;
  var yP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "introduction [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    hP = yP;
  La.default = hP;
  var ja = {};
  Object.defineProperty(ja, "__esModule", { value: !0 });
  ja.default = void 0;
  var gP = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: { "aria-errormessage": null, "aria-invalid": null },
      relatedConcepts: [
        { concept: { name: "noteref [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]],
    },
    EP = gP;
  ja.default = EP;
  var Da = {};
  Object.defineProperty(Da, "__esModule", { value: !0 });
  Da.default = void 0;
  var wP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "notice [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]],
    },
    CP = wP;
  Da.default = CP;
  var Fa = {};
  Object.defineProperty(Fa, "__esModule", { value: !0 });
  Fa.default = void 0;
  var PP = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "pagebreak [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "separator"]],
    },
    RP = PP;
  Fa.default = RP;
  var Ua = {};
  Object.defineProperty(Ua, "__esModule", { value: !0 });
  Ua.default = void 0;
  var _P = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "page-list [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "landmark", "navigation"],
      ],
    },
    SP = _P;
  Ua.default = SP;
  var Ha = {};
  Object.defineProperty(Ha, "__esModule", { value: !0 });
  Ha.default = void 0;
  var OP = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "part [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    xP = OP;
  Ha.default = xP;
  var Wa = {};
  Object.defineProperty(Wa, "__esModule", { value: !0 });
  Wa.default = void 0;
  var TP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "preface [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    $P = TP;
  Wa.default = $P;
  var Va = {};
  Object.defineProperty(Va, "__esModule", { value: !0 });
  Va.default = void 0;
  var qP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "prologue [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]],
    },
    AP = qP;
  Va.default = AP;
  var za = {};
  Object.defineProperty(za, "__esModule", { value: !0 });
  za.default = void 0;
  var MP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [
        { concept: { name: "pullquote [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["none"]],
    },
    IP = MP;
  za.default = IP;
  var Ka = {};
  Object.defineProperty(Ka, "__esModule", { value: !0 });
  Ka.default = void 0;
  var kP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "qna [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]],
    },
    NP = kP;
  Ka.default = NP;
  var Ga = {};
  Object.defineProperty(Ga, "__esModule", { value: !0 });
  Ga.default = void 0;
  var BP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "subtitle [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "sectionhead"]],
    },
    LP = BP;
  Ga.default = LP;
  var Xa = {};
  Object.defineProperty(Xa, "__esModule", { value: !0 });
  Xa.default = void 0;
  var jP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "help [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]],
    },
    DP = jP;
  Xa.default = DP;
  var Ja = {};
  Object.defineProperty(Ja, "__esModule", { value: !0 });
  Ja.default = void 0;
  var FP = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { concept: { name: "toc [EPUB-SSV]" }, module: "EPUB" },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [
        ["roletype", "structure", "section", "landmark", "navigation"],
      ],
    },
    UP = FP;
  Ja.default = UP;
  Object.defineProperty(da, "__esModule", { value: !0 });
  da.default = void 0;
  var HP = x(fa),
    WP = x(pa),
    VP = x(va),
    zP = x(ma),
    KP = x(ba),
    GP = x(ya),
    XP = x(ha),
    JP = x(ga),
    YP = x(Ea),
    QP = x(wa),
    ZP = x(Ca),
    eR = x(Pa),
    tR = x(Ra),
    rR = x(_a),
    nR = x(Sa),
    oR = x(Oa),
    aR = x(xa),
    iR = x(Ta),
    lR = x($a),
    sR = x(qa),
    uR = x(Aa),
    cR = x(Ma),
    dR = x(Ia),
    fR = x(ka),
    pR = x(Na),
    vR = x(Ba),
    mR = x(La),
    bR = x(ja),
    yR = x(Da),
    hR = x(Fa),
    gR = x(Ua),
    ER = x(Ha),
    wR = x(Wa),
    CR = x(Va),
    PR = x(za),
    RR = x(Ka),
    _R = x(Ga),
    SR = x(Xa),
    OR = x(Ja);
  function x(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var xR = [
      ["doc-abstract", HP.default],
      ["doc-acknowledgments", WP.default],
      ["doc-afterword", VP.default],
      ["doc-appendix", zP.default],
      ["doc-backlink", KP.default],
      ["doc-biblioentry", GP.default],
      ["doc-bibliography", XP.default],
      ["doc-biblioref", JP.default],
      ["doc-chapter", YP.default],
      ["doc-colophon", QP.default],
      ["doc-conclusion", ZP.default],
      ["doc-cover", eR.default],
      ["doc-credit", tR.default],
      ["doc-credits", rR.default],
      ["doc-dedication", nR.default],
      ["doc-endnote", oR.default],
      ["doc-endnotes", aR.default],
      ["doc-epigraph", iR.default],
      ["doc-epilogue", lR.default],
      ["doc-errata", sR.default],
      ["doc-example", uR.default],
      ["doc-footnote", cR.default],
      ["doc-foreword", dR.default],
      ["doc-glossary", fR.default],
      ["doc-glossref", pR.default],
      ["doc-index", vR.default],
      ["doc-introduction", mR.default],
      ["doc-noteref", bR.default],
      ["doc-notice", yR.default],
      ["doc-pagebreak", hR.default],
      ["doc-pagelist", gR.default],
      ["doc-part", ER.default],
      ["doc-preface", wR.default],
      ["doc-prologue", CR.default],
      ["doc-pullquote", PR.default],
      ["doc-qna", RR.default],
      ["doc-subtitle", _R.default],
      ["doc-tip", SR.default],
      ["doc-toc", OR.default],
    ],
    TR = xR;
  da.default = TR;
  var Ya = {},
    Qa = {};
  Object.defineProperty(Qa, "__esModule", { value: !0 });
  Qa.default = void 0;
  var $R = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { module: "GRAPHICS", concept: { name: "graphics-object" } },
        { module: "ARIA", concept: { name: "img" } },
        { module: "ARIA", concept: { name: "article" } },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]],
    },
    qR = $R;
  Qa.default = qR;
  var Za = {};
  Object.defineProperty(Za, "__esModule", { value: !0 });
  Za.default = void 0;
  var AR = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [
        { module: "GRAPHICS", concept: { name: "graphics-document" } },
        { module: "ARIA", concept: { name: "group" } },
        { module: "ARIA", concept: { name: "img" } },
        { module: "GRAPHICS", concept: { name: "graphics-symbol" } },
      ],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]],
    },
    MR = AR;
  Za.default = MR;
  var ei = {};
  Object.defineProperty(ei, "__esModule", { value: !0 });
  ei.default = void 0;
  var IR = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]],
    },
    kR = IR;
  ei.default = kR;
  Object.defineProperty(Ya, "__esModule", { value: !0 });
  Ya.default = void 0;
  var NR = Kl(Qa),
    BR = Kl(Za),
    LR = Kl(ei);
  function Kl(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var jR = [
      ["graphics-document", NR.default],
      ["graphics-object", BR.default],
      ["graphics-symbol", LR.default],
    ],
    DR = jR;
  Ya.default = DR;
  Object.defineProperty(xt, "__esModule", { value: !0 });
  xt.default = void 0;
  var FR = fr(Cn),
    UR = fr(kn),
    HR = fr(da),
    WR = fr(Ya),
    VR = fr(Qe);
  function fr(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function zR(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function el(e, t) {
    var r = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (!r) {
      if (
        Array.isArray(e) ||
        (r = Xd(e)) ||
        (t && e && typeof e.length == "number")
      ) {
        r && (e = r);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
          },
          e: function (u) {
            throw u;
          },
          f: o,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var a = !0,
      i = !1,
      s;
    return {
      s: function () {
        r = r.call(e);
      },
      n: function () {
        var u = r.next();
        return (a = u.done), u;
      },
      e: function (u) {
        (i = !0), (s = u);
      },
      f: function () {
        try {
          !a && r.return != null && r.return();
        } finally {
          if (i) throw s;
        }
      },
    };
  }
  function Ht(e, t) {
    return XR(e) || GR(e, t) || Xd(e, t) || KR();
  }
  function KR() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Xd(e, t) {
    if (e) {
      if (typeof e == "string") return Ds(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (
        (r === "Object" && e.constructor && (r = e.constructor.name),
        r === "Map" || r === "Set")
      )
        return Array.from(e);
      if (
        r === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return Ds(e, t);
    }
  }
  function Ds(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function GR(e, t) {
    var r =
      e == null
        ? null
        : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (r != null) {
      var n = [],
        o = !0,
        a = !1,
        i,
        s;
      try {
        for (
          r = r.call(e);
          !(o = (i = r.next()).done) &&
          (n.push(i.value), !(t && n.length === t));
          o = !0
        );
      } catch (l) {
        (a = !0), (s = l);
      } finally {
        try {
          !o && r.return != null && r.return();
        } finally {
          if (a) throw s;
        }
      }
      return n;
    }
  }
  function XR(e) {
    if (Array.isArray(e)) return e;
  }
  var _e = [].concat(FR.default, UR.default, HR.default, WR.default);
  _e.forEach(function (e) {
    var t = Ht(e, 2),
      r = t[1],
      n = el(r.superClass),
      o;
    try {
      for (n.s(); !(o = n.n()).done; ) {
        var a = o.value,
          i = el(a),
          s;
        try {
          var l = function () {
            var c = s.value,
              d = _e.find(function (_) {
                var v = Ht(_, 1),
                  C = v[0];
                return C === c;
              });
            if (d)
              for (
                var f = d[1], m = 0, P = Object.keys(f.props);
                m < P.length;
                m++
              ) {
                var w = P[m];
                Object.prototype.hasOwnProperty.call(r.props, w) ||
                  Object.assign(r.props, zR({}, w, f.props[w]));
              }
          };
          for (i.s(); !(s = i.n()).done; ) l();
        } catch (u) {
          i.e(u);
        } finally {
          i.f();
        }
      }
    } catch (u) {
      n.e(u);
    } finally {
      n.f();
    }
  });
  var tl = {
      entries: function () {
        return _e;
      },
      forEach: function (t) {
        var r =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : null,
          n = el(_e),
          o;
        try {
          for (n.s(); !(o = n.n()).done; ) {
            var a = Ht(o.value, 2),
              i = a[0],
              s = a[1];
            t.call(r, s, i, _e);
          }
        } catch (l) {
          n.e(l);
        } finally {
          n.f();
        }
      },
      get: function (t) {
        var r = _e.find(function (n) {
          return n[0] === t;
        });
        return r && r[1];
      },
      has: function (t) {
        return !!tl.get(t);
      },
      keys: function () {
        return _e.map(function (t) {
          var r = Ht(t, 1),
            n = r[0];
          return n;
        });
      },
      values: function () {
        return _e.map(function (t) {
          var r = Ht(t, 2),
            n = r[1];
          return n;
        });
      },
    },
    JR = (0, VR.default)(tl, tl.entries());
  xt.default = JR;
  var ti = {},
    Fs = Object.prototype.toString,
    Jd = function (t) {
      var r = Fs.call(t),
        n = r === "[object Arguments]";
      return (
        n ||
          (n =
            r !== "[object Array]" &&
            t !== null &&
            typeof t == "object" &&
            typeof t.length == "number" &&
            t.length >= 0 &&
            Fs.call(t.callee) === "[object Function]"),
        n
      );
    },
    mi,
    Us;
  function YR() {
    if (Us) return mi;
    Us = 1;
    var e;
    if (!Object.keys) {
      var t = Object.prototype.hasOwnProperty,
        r = Object.prototype.toString,
        n = Jd,
        o = Object.prototype.propertyIsEnumerable,
        a = !o.call({ toString: null }, "toString"),
        i = o.call(function () {}, "prototype"),
        s = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor",
        ],
        l = function (f) {
          var m = f.constructor;
          return m && m.prototype === f;
        },
        u = {
          $applicationCache: !0,
          $console: !0,
          $external: !0,
          $frame: !0,
          $frameElement: !0,
          $frames: !0,
          $innerHeight: !0,
          $innerWidth: !0,
          $onmozfullscreenchange: !0,
          $onmozfullscreenerror: !0,
          $outerHeight: !0,
          $outerWidth: !0,
          $pageXOffset: !0,
          $pageYOffset: !0,
          $parent: !0,
          $scrollLeft: !0,
          $scrollTop: !0,
          $scrollX: !0,
          $scrollY: !0,
          $self: !0,
          $webkitIndexedDB: !0,
          $webkitStorageInfo: !0,
          $window: !0,
        },
        c = (function () {
          if (typeof window > "u") return !1;
          for (var f in window)
            try {
              if (
                !u["$" + f] &&
                t.call(window, f) &&
                window[f] !== null &&
                typeof window[f] == "object"
              )
                try {
                  l(window[f]);
                } catch {
                  return !0;
                }
            } catch {
              return !0;
            }
          return !1;
        })(),
        d = function (f) {
          if (typeof window > "u" || !c) return l(f);
          try {
            return l(f);
          } catch {
            return !1;
          }
        };
      e = function (m) {
        var P = m !== null && typeof m == "object",
          w = r.call(m) === "[object Function]",
          _ = n(m),
          v = P && r.call(m) === "[object String]",
          C = [];
        if (!P && !w && !_)
          throw new TypeError("Object.keys called on a non-object");
        var b = i && w;
        if (v && m.length > 0 && !t.call(m, 0))
          for (var R = 0; R < m.length; ++R) C.push(String(R));
        if (_ && m.length > 0)
          for (var h = 0; h < m.length; ++h) C.push(String(h));
        else
          for (var p in m)
            !(b && p === "prototype") && t.call(m, p) && C.push(String(p));
        if (a)
          for (var y = d(m), E = 0; E < s.length; ++E)
            !(y && s[E] === "constructor") && t.call(m, s[E]) && C.push(s[E]);
        return C;
      };
    }
    return (mi = e), mi;
  }
  var QR = Array.prototype.slice,
    ZR = Jd,
    Hs = Object.keys,
    qr = Hs
      ? function (t) {
          return Hs(t);
        }
      : YR(),
    Ws = Object.keys;
  qr.shim = function () {
    if (Object.keys) {
      var t = (function () {
        var r = Object.keys(arguments);
        return r && r.length === arguments.length;
      })(1, 2);
      t ||
        (Object.keys = function (n) {
          return ZR(n) ? Ws(QR.call(n)) : Ws(n);
        });
    } else Object.keys = qr;
    return Object.keys || qr;
  };
  var Gl = qr,
    e_ = Error,
    t_ = EvalError,
    r_ = RangeError,
    n_ = ReferenceError,
    Yd = SyntaxError,
    He = TypeError,
    o_ = URIError,
    ri = function () {
      if (
        typeof Symbol != "function" ||
        typeof Object.getOwnPropertySymbols != "function"
      )
        return !1;
      if (typeof Symbol.iterator == "symbol") return !0;
      var t = {},
        r = Symbol("test"),
        n = Object(r);
      if (
        typeof r == "string" ||
        Object.prototype.toString.call(r) !== "[object Symbol]" ||
        Object.prototype.toString.call(n) !== "[object Symbol]"
      )
        return !1;
      var o = 42;
      t[r] = o;
      for (r in t) return !1;
      if (
        (typeof Object.keys == "function" && Object.keys(t).length !== 0) ||
        (typeof Object.getOwnPropertyNames == "function" &&
          Object.getOwnPropertyNames(t).length !== 0)
      )
        return !1;
      var a = Object.getOwnPropertySymbols(t);
      if (
        a.length !== 1 ||
        a[0] !== r ||
        !Object.prototype.propertyIsEnumerable.call(t, r)
      )
        return !1;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var i = Object.getOwnPropertyDescriptor(t, r);
        if (i.value !== o || i.enumerable !== !0) return !1;
      }
      return !0;
    },
    Vs = typeof Symbol < "u" && Symbol,
    a_ = ri,
    Xl = function () {
      return typeof Vs != "function" ||
        typeof Symbol != "function" ||
        typeof Vs("foo") != "symbol" ||
        typeof Symbol("bar") != "symbol"
        ? !1
        : a_();
    },
    bi = { __proto__: null, foo: {} },
    i_ = Object,
    l_ = function () {
      return { __proto__: bi }.foo === bi.foo && !(bi instanceof i_);
    },
    s_ = "Function.prototype.bind called on incompatible ",
    u_ = Object.prototype.toString,
    c_ = Math.max,
    d_ = "[object Function]",
    zs = function (t, r) {
      for (var n = [], o = 0; o < t.length; o += 1) n[o] = t[o];
      for (var a = 0; a < r.length; a += 1) n[a + t.length] = r[a];
      return n;
    },
    f_ = function (t, r) {
      for (var n = [], o = r || 0, a = 0; o < t.length; o += 1, a += 1)
        n[a] = t[o];
      return n;
    },
    p_ = function (e, t) {
      for (var r = "", n = 0; n < e.length; n += 1)
        (r += e[n]), n + 1 < e.length && (r += t);
      return r;
    },
    v_ = function (t) {
      var r = this;
      if (typeof r != "function" || u_.apply(r) !== d_)
        throw new TypeError(s_ + r);
      for (
        var n = f_(arguments, 1),
          o,
          a = function () {
            if (this instanceof o) {
              var c = r.apply(this, zs(n, arguments));
              return Object(c) === c ? c : this;
            }
            return r.apply(t, zs(n, arguments));
          },
          i = c_(0, r.length - n.length),
          s = [],
          l = 0;
        l < i;
        l++
      )
        s[l] = "$" + l;
      if (
        ((o = Function(
          "binder",
          "return function (" +
            p_(s, ",") +
            "){ return binder.apply(this,arguments); }",
        )(a)),
        r.prototype)
      ) {
        var u = function () {};
        (u.prototype = r.prototype),
          (o.prototype = new u()),
          (u.prototype = null);
      }
      return o;
    },
    m_ = v_,
    Jl = Function.prototype.bind || m_,
    b_ = Function.prototype.call,
    y_ = Object.prototype.hasOwnProperty,
    h_ = Jl,
    Qd = h_.call(b_, y_),
    T,
    g_ = e_,
    E_ = t_,
    w_ = r_,
    C_ = n_,
    wt = Yd,
    mt = He,
    P_ = o_,
    Zd = Function,
    yi = function (e) {
      try {
        return Zd('"use strict"; return (' + e + ").constructor;")();
      } catch {}
    },
    Ke = Object.getOwnPropertyDescriptor;
  if (Ke)
    try {
      Ke({}, "");
    } catch {
      Ke = null;
    }
  var hi = function () {
      throw new mt();
    },
    R_ = Ke
      ? (function () {
          try {
            return arguments.callee, hi;
          } catch {
            try {
              return Ke(arguments, "callee").get;
            } catch {
              return hi;
            }
          }
        })()
      : hi,
    lt = Xl(),
    __ = l_(),
    N =
      Object.getPrototypeOf ||
      (__
        ? function (e) {
            return e.__proto__;
          }
        : null),
    ct = {},
    S_ = typeof Uint8Array > "u" || !N ? T : N(Uint8Array),
    Ge = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError > "u" ? T : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? T : ArrayBuffer,
      "%ArrayIteratorPrototype%": lt && N ? N([][Symbol.iterator]()) : T,
      "%AsyncFromSyncIteratorPrototype%": T,
      "%AsyncFunction%": ct,
      "%AsyncGenerator%": ct,
      "%AsyncGeneratorFunction%": ct,
      "%AsyncIteratorPrototype%": ct,
      "%Atomics%": typeof Atomics > "u" ? T : Atomics,
      "%BigInt%": typeof BigInt > "u" ? T : BigInt,
      "%BigInt64Array%": typeof BigInt64Array > "u" ? T : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array > "u" ? T : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? T : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": g_,
      "%eval%": eval,
      "%EvalError%": E_,
      "%Float32Array%": typeof Float32Array > "u" ? T : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? T : Float64Array,
      "%FinalizationRegistry%":
        typeof FinalizationRegistry > "u" ? T : FinalizationRegistry,
      "%Function%": Zd,
      "%GeneratorFunction%": ct,
      "%Int8Array%": typeof Int8Array > "u" ? T : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? T : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? T : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": lt && N ? N(N([][Symbol.iterator]())) : T,
      "%JSON%": typeof JSON == "object" ? JSON : T,
      "%Map%": typeof Map > "u" ? T : Map,
      "%MapIteratorPrototype%":
        typeof Map > "u" || !lt || !N ? T : N(new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? T : Promise,
      "%Proxy%": typeof Proxy > "u" ? T : Proxy,
      "%RangeError%": w_,
      "%ReferenceError%": C_,
      "%Reflect%": typeof Reflect > "u" ? T : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? T : Set,
      "%SetIteratorPrototype%":
        typeof Set > "u" || !lt || !N ? T : N(new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%":
        typeof SharedArrayBuffer > "u" ? T : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": lt && N ? N(""[Symbol.iterator]()) : T,
      "%Symbol%": lt ? Symbol : T,
      "%SyntaxError%": wt,
      "%ThrowTypeError%": R_,
      "%TypedArray%": S_,
      "%TypeError%": mt,
      "%Uint8Array%": typeof Uint8Array > "u" ? T : Uint8Array,
      "%Uint8ClampedArray%":
        typeof Uint8ClampedArray > "u" ? T : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? T : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? T : Uint32Array,
      "%URIError%": P_,
      "%WeakMap%": typeof WeakMap > "u" ? T : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? T : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? T : WeakSet,
    };
  if (N)
    try {
      null.error;
    } catch (e) {
      var O_ = N(N(e));
      Ge["%Error.prototype%"] = O_;
    }
  var x_ = function e(t) {
      var r;
      if (t === "%AsyncFunction%") r = yi("async function () {}");
      else if (t === "%GeneratorFunction%") r = yi("function* () {}");
      else if (t === "%AsyncGeneratorFunction%")
        r = yi("async function* () {}");
      else if (t === "%AsyncGenerator%") {
        var n = e("%AsyncGeneratorFunction%");
        n && (r = n.prototype);
      } else if (t === "%AsyncIteratorPrototype%") {
        var o = e("%AsyncGenerator%");
        o && N && (r = N(o.prototype));
      }
      return (Ge[t] = r), r;
    },
    Ks = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": [
        "AsyncGeneratorFunction",
        "prototype",
        "prototype",
      ],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"],
    },
    pr = Jl,
    Kr = Qd,
    T_ = pr.call(Function.call, Array.prototype.concat),
    $_ = pr.call(Function.apply, Array.prototype.splice),
    Gs = pr.call(Function.call, String.prototype.replace),
    Gr = pr.call(Function.call, String.prototype.slice),
    q_ = pr.call(Function.call, RegExp.prototype.exec),
    A_ =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
    M_ = /\\(\\)?/g,
    I_ = function (t) {
      var r = Gr(t, 0, 1),
        n = Gr(t, -1);
      if (r === "%" && n !== "%")
        throw new wt("invalid intrinsic syntax, expected closing `%`");
      if (n === "%" && r !== "%")
        throw new wt("invalid intrinsic syntax, expected opening `%`");
      var o = [];
      return (
        Gs(t, A_, function (a, i, s, l) {
          o[o.length] = s ? Gs(l, M_, "$1") : i || a;
        }),
        o
      );
    },
    k_ = function (t, r) {
      var n = t,
        o;
      if ((Kr(Ks, n) && ((o = Ks[n]), (n = "%" + o[0] + "%")), Kr(Ge, n))) {
        var a = Ge[n];
        if ((a === ct && (a = x_(n)), typeof a > "u" && !r))
          throw new mt(
            "intrinsic " +
              t +
              " exists, but is not available. Please file an issue!",
          );
        return { alias: o, name: n, value: a };
      }
      throw new wt("intrinsic " + t + " does not exist!");
    },
    ue = function (t, r) {
      if (typeof t != "string" || t.length === 0)
        throw new mt("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof r != "boolean")
        throw new mt('"allowMissing" argument must be a boolean');
      if (q_(/^%?[^%]*%?$/, t) === null)
        throw new wt(
          "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
        );
      var n = I_(t),
        o = n.length > 0 ? n[0] : "",
        a = k_("%" + o + "%", r),
        i = a.name,
        s = a.value,
        l = !1,
        u = a.alias;
      u && ((o = u[0]), $_(n, T_([0, 1], u)));
      for (var c = 1, d = !0; c < n.length; c += 1) {
        var f = n[c],
          m = Gr(f, 0, 1),
          P = Gr(f, -1);
        if (
          (m === '"' ||
            m === "'" ||
            m === "`" ||
            P === '"' ||
            P === "'" ||
            P === "`") &&
          m !== P
        )
          throw new wt("property names with quotes must have matching quotes");
        if (
          ((f === "constructor" || !d) && (l = !0),
          (o += "." + f),
          (i = "%" + o + "%"),
          Kr(Ge, i))
        )
          s = Ge[i];
        else if (s != null) {
          if (!(f in s)) {
            if (!r)
              throw new mt(
                "base intrinsic for " +
                  t +
                  " exists, but the property is not available.",
              );
            return;
          }
          if (Ke && c + 1 >= n.length) {
            var w = Ke(s, f);
            (d = !!w),
              d && "get" in w && !("originalValue" in w.get)
                ? (s = w.get)
                : (s = s[f]);
          } else (d = Kr(s, f)), (s = s[f]);
          d && !l && (Ge[i] = s);
        }
      }
      return s;
    },
    N_ = ue,
    Ar = N_("%Object.defineProperty%", !0) || !1;
  if (Ar)
    try {
      Ar({}, "a", { value: 1 });
    } catch {
      Ar = !1;
    }
  var Yl = Ar,
    B_ = ue,
    Mr = B_("%Object.getOwnPropertyDescriptor%", !0);
  if (Mr)
    try {
      Mr([], "length");
    } catch {
      Mr = null;
    }
  var Ql = Mr,
    Xs = Yl,
    L_ = Yd,
    st = He,
    Js = Ql,
    Zl = function (t, r, n) {
      if (!t || (typeof t != "object" && typeof t != "function"))
        throw new st("`obj` must be an object or a function`");
      if (typeof r != "string" && typeof r != "symbol")
        throw new st("`property` must be a string or a symbol`");
      if (
        arguments.length > 3 &&
        typeof arguments[3] != "boolean" &&
        arguments[3] !== null
      )
        throw new st("`nonEnumerable`, if provided, must be a boolean or null");
      if (
        arguments.length > 4 &&
        typeof arguments[4] != "boolean" &&
        arguments[4] !== null
      )
        throw new st("`nonWritable`, if provided, must be a boolean or null");
      if (
        arguments.length > 5 &&
        typeof arguments[5] != "boolean" &&
        arguments[5] !== null
      )
        throw new st(
          "`nonConfigurable`, if provided, must be a boolean or null",
        );
      if (arguments.length > 6 && typeof arguments[6] != "boolean")
        throw new st("`loose`, if provided, must be a boolean");
      var o = arguments.length > 3 ? arguments[3] : null,
        a = arguments.length > 4 ? arguments[4] : null,
        i = arguments.length > 5 ? arguments[5] : null,
        s = arguments.length > 6 ? arguments[6] : !1,
        l = !!Js && Js(t, r);
      if (Xs)
        Xs(t, r, {
          configurable: i === null && l ? l.configurable : !i,
          enumerable: o === null && l ? l.enumerable : !o,
          value: n,
          writable: a === null && l ? l.writable : !a,
        });
      else if (s || (!o && !a && !i)) t[r] = n;
      else
        throw new L_(
          "This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.",
        );
    },
    rl = Yl,
    ef = function () {
      return !!rl;
    };
  ef.hasArrayLengthDefineBug = function () {
    if (!rl) return null;
    try {
      return rl([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  };
  var es = ef,
    j_ = Gl,
    D_ = typeof Symbol == "function" && typeof Symbol("foo") == "symbol",
    F_ = Object.prototype.toString,
    U_ = Array.prototype.concat,
    Ys = Zl,
    H_ = function (e) {
      return typeof e == "function" && F_.call(e) === "[object Function]";
    },
    tf = es(),
    W_ = function (e, t, r, n) {
      if (t in e) {
        if (n === !0) {
          if (e[t] === r) return;
        } else if (!H_(n) || !n()) return;
      }
      tf ? Ys(e, t, r, !0) : Ys(e, t, r);
    },
    rf = function (e, t) {
      var r = arguments.length > 2 ? arguments[2] : {},
        n = j_(t);
      D_ && (n = U_.call(n, Object.getOwnPropertySymbols(t)));
      for (var o = 0; o < n.length; o += 1) W_(e, n[o], t[n[o]], r[n[o]]);
    };
  rf.supportsDescriptors = !!tf;
  var Ze = rf,
    nf = { exports: {} },
    V_ = ue,
    Qs = Zl,
    z_ = es(),
    Zs = Ql,
    eu = He,
    K_ = V_("%Math.floor%"),
    G_ = function (t, r) {
      if (typeof t != "function") throw new eu("`fn` is not a function");
      if (typeof r != "number" || r < 0 || r > 4294967295 || K_(r) !== r)
        throw new eu("`length` must be a positive 32-bit integer");
      var n = arguments.length > 2 && !!arguments[2],
        o = !0,
        a = !0;
      if ("length" in t && Zs) {
        var i = Zs(t, "length");
        i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
      }
      return (
        (o || a || !n) &&
          (z_ ? Qs(t, "length", r, !0, !0) : Qs(t, "length", r)),
        t
      );
    };
  (function (e) {
    var t = Jl,
      r = ue,
      n = G_,
      o = He,
      a = r("%Function.prototype.apply%"),
      i = r("%Function.prototype.call%"),
      s = r("%Reflect.apply%", !0) || t.call(i, a),
      l = Yl,
      u = r("%Math.max%");
    e.exports = function (f) {
      if (typeof f != "function") throw new o("a function is required");
      var m = s(t, i, arguments);
      return n(m, 1 + u(0, f.length - (arguments.length - 1)), !0);
    };
    var c = function () {
      return s(t, a, arguments);
    };
    l ? l(e.exports, "apply", { value: c }) : (e.exports.apply = c);
  })(nf);
  var Tt = nf.exports,
    of = ue,
    af = Tt,
    X_ = af(of("String.prototype.indexOf")),
    Q = function (t, r) {
      var n = of(t, !!r);
      return typeof n == "function" && X_(t, ".prototype.") > -1 ? af(n) : n;
    },
    J_ = Gl,
    lf = ri(),
    sf = Q,
    tu = Object,
    Y_ = sf("Array.prototype.push"),
    ru = sf("Object.prototype.propertyIsEnumerable"),
    Q_ = lf ? Object.getOwnPropertySymbols : null,
    uf = function (t, r) {
      if (t == null) throw new TypeError("target must be an object");
      var n = tu(t);
      if (arguments.length === 1) return n;
      for (var o = 1; o < arguments.length; ++o) {
        var a = tu(arguments[o]),
          i = J_(a),
          s = lf && (Object.getOwnPropertySymbols || Q_);
        if (s)
          for (var l = s(a), u = 0; u < l.length; ++u) {
            var c = l[u];
            ru(a, c) && Y_(i, c);
          }
        for (var d = 0; d < i.length; ++d) {
          var f = i[d];
          if (ru(a, f)) {
            var m = a[f];
            n[f] = m;
          }
        }
      }
      return n;
    },
    gi = uf,
    Z_ = function () {
      if (!Object.assign) return !1;
      for (
        var e = "abcdefghijklmnopqrst", t = e.split(""), r = {}, n = 0;
        n < t.length;
        ++n
      )
        r[t[n]] = t[n];
      var o = Object.assign({}, r),
        a = "";
      for (var i in o) a += i;
      return e !== a;
    },
    e0 = function () {
      if (!Object.assign || !Object.preventExtensions) return !1;
      var e = Object.preventExtensions({ 1: 2 });
      try {
        Object.assign(e, "xy");
      } catch {
        return e[1] === "y";
      }
      return !1;
    },
    cf = function () {
      return !Object.assign || Z_() || e0() ? gi : Object.assign;
    },
    t0 = Ze,
    r0 = cf,
    n0 = function () {
      var t = r0();
      return (
        t0(
          Object,
          { assign: t },
          {
            assign: function () {
              return Object.assign !== t;
            },
          },
        ),
        t
      );
    },
    o0 = Ze,
    a0 = Tt,
    i0 = uf,
    df = cf,
    l0 = n0,
    s0 = a0.apply(df()),
    ff = function (t, r) {
      return s0(Object, arguments);
    };
  o0(ff, { getPolyfill: df, implementation: i0, shim: l0 });
  var u0 = ff,
    Zt = function () {
      return typeof function () {}.name == "string";
    },
    Wt = Object.getOwnPropertyDescriptor;
  if (Wt)
    try {
      Wt([], "length");
    } catch {
      Wt = null;
    }
  Zt.functionsHaveConfigurableNames = function () {
    if (!Zt() || !Wt) return !1;
    var t = Wt(function () {}, "name");
    return !!t && !!t.configurable;
  };
  var c0 = Function.prototype.bind;
  Zt.boundFunctionsHaveNames = function () {
    return Zt() && typeof c0 == "function" && function () {}.bind().name !== "";
  };
  var d0 = Zt,
    nu = Zl,
    f0 = es(),
    p0 = d0.functionsHaveConfigurableNames(),
    v0 = He,
    m0 = function (t, r) {
      if (typeof t != "function") throw new v0("`fn` is not a function");
      var n = arguments.length > 2 && !!arguments[2];
      return (
        (!n || p0) && (f0 ? nu(t, "name", r, !0, !0) : nu(t, "name", r)), t
      );
    },
    b0 = m0,
    y0 = He,
    h0 = Object,
    pf = b0(
      function () {
        if (this == null || this !== h0(this))
          throw new y0("RegExp.prototype.flags getter called on non-object");
        var t = "";
        return (
          this.hasIndices && (t += "d"),
          this.global && (t += "g"),
          this.ignoreCase && (t += "i"),
          this.multiline && (t += "m"),
          this.dotAll && (t += "s"),
          this.unicode && (t += "u"),
          this.unicodeSets && (t += "v"),
          this.sticky && (t += "y"),
          t
        );
      },
      "get flags",
      !0,
    ),
    g0 = pf,
    E0 = Ze.supportsDescriptors,
    w0 = Object.getOwnPropertyDescriptor,
    vf = function () {
      if (E0 && /a/gim.flags === "gim") {
        var t = w0(RegExp.prototype, "flags");
        if (
          t &&
          typeof t.get == "function" &&
          typeof RegExp.prototype.dotAll == "boolean" &&
          typeof RegExp.prototype.hasIndices == "boolean"
        ) {
          var r = "",
            n = {};
          if (
            (Object.defineProperty(n, "hasIndices", {
              get: function () {
                r += "d";
              },
            }),
            Object.defineProperty(n, "sticky", {
              get: function () {
                r += "y";
              },
            }),
            r === "dy")
          )
            return t.get;
        }
      }
      return g0;
    },
    C0 = Ze.supportsDescriptors,
    P0 = vf,
    R0 = Object.getOwnPropertyDescriptor,
    _0 = Object.defineProperty,
    S0 = TypeError,
    ou = Object.getPrototypeOf,
    O0 = /a/,
    x0 = function () {
      if (!C0 || !ou)
        throw new S0(
          "RegExp.prototype.flags requires a true ES5 environment that supports property descriptors",
        );
      var t = P0(),
        r = ou(O0),
        n = R0(r, "flags");
      return (
        (!n || n.get !== t) &&
          _0(r, "flags", { configurable: !0, enumerable: !1, get: t }),
        t
      );
    },
    T0 = Ze,
    $0 = Tt,
    q0 = pf,
    mf = vf,
    A0 = x0,
    bf = $0(mf());
  T0(bf, { getPolyfill: mf, implementation: q0, shim: A0 });
  var M0 = bf,
    Ir = { exports: {} },
    I0 = ri,
    et = function () {
      return I0() && !!Symbol.toStringTag;
    },
    k0 = et(),
    N0 = Q,
    nl = N0("Object.prototype.toString"),
    ni = function (t) {
      return k0 && t && typeof t == "object" && Symbol.toStringTag in t
        ? !1
        : nl(t) === "[object Arguments]";
    },
    yf = function (t) {
      return ni(t)
        ? !0
        : t !== null &&
            typeof t == "object" &&
            typeof t.length == "number" &&
            t.length >= 0 &&
            nl(t) !== "[object Array]" &&
            nl(t.callee) === "[object Function]";
    },
    B0 = (function () {
      return ni(arguments);
    })();
  ni.isLegacyArguments = yf;
  var hf = B0 ? ni : yf;
  const L0 = {},
    j0 = Object.freeze(
      Object.defineProperty(
        { __proto__: null, default: L0 },
        Symbol.toStringTag,
        { value: "Module" },
      ),
    ),
    D0 = fv(j0);
  var ts = typeof Map == "function" && Map.prototype,
    Ei =
      Object.getOwnPropertyDescriptor && ts
        ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
        : null,
    Xr = ts && Ei && typeof Ei.get == "function" ? Ei.get : null,
    au = ts && Map.prototype.forEach,
    rs = typeof Set == "function" && Set.prototype,
    wi =
      Object.getOwnPropertyDescriptor && rs
        ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
        : null,
    Jr = rs && wi && typeof wi.get == "function" ? wi.get : null,
    iu = rs && Set.prototype.forEach,
    F0 = typeof WeakMap == "function" && WeakMap.prototype,
    Vt = F0 ? WeakMap.prototype.has : null,
    U0 = typeof WeakSet == "function" && WeakSet.prototype,
    zt = U0 ? WeakSet.prototype.has : null,
    H0 = typeof WeakRef == "function" && WeakRef.prototype,
    lu = H0 ? WeakRef.prototype.deref : null,
    W0 = Boolean.prototype.valueOf,
    V0 = Object.prototype.toString,
    z0 = Function.prototype.toString,
    K0 = String.prototype.match,
    ns = String.prototype.slice,
    $e = String.prototype.replace,
    G0 = String.prototype.toUpperCase,
    su = String.prototype.toLowerCase,
    gf = RegExp.prototype.test,
    uu = Array.prototype.concat,
    ie = Array.prototype.join,
    X0 = Array.prototype.slice,
    cu = Math.floor,
    ol = typeof BigInt == "function" ? BigInt.prototype.valueOf : null,
    Ci = Object.getOwnPropertySymbols,
    al =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? Symbol.prototype.toString
        : null,
    Ct = typeof Symbol == "function" && typeof Symbol.iterator == "object",
    H =
      typeof Symbol == "function" &&
      Symbol.toStringTag &&
      (typeof Symbol.toStringTag === Ct || !0)
        ? Symbol.toStringTag
        : null,
    Ef = Object.prototype.propertyIsEnumerable,
    du =
      (typeof Reflect == "function"
        ? Reflect.getPrototypeOf
        : Object.getPrototypeOf) ||
      ([].__proto__ === Array.prototype
        ? function (e) {
            return e.__proto__;
          }
        : null);
  function fu(e, t) {
    if (
      e === 1 / 0 ||
      e === -1 / 0 ||
      e !== e ||
      (e && e > -1e3 && e < 1e3) ||
      gf.call(/e/, t)
    )
      return t;
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof e == "number") {
      var n = e < 0 ? -cu(-e) : cu(e);
      if (n !== e) {
        var o = String(n),
          a = ns.call(t, o.length + 1);
        return (
          $e.call(o, r, "$&_") +
          "." +
          $e.call($e.call(a, /([0-9]{3})/g, "$&_"), /_$/, "")
        );
      }
    }
    return $e.call(t, r, "$&_");
  }
  var il = D0,
    pu = il.custom,
    vu = Cf(pu) ? pu : null,
    J0 = function e(t, r, n, o) {
      var a = r || {};
      if (
        Se(a, "quoteStyle") &&
        a.quoteStyle !== "single" &&
        a.quoteStyle !== "double"
      )
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      if (
        Se(a, "maxStringLength") &&
        (typeof a.maxStringLength == "number"
          ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0
          : a.maxStringLength !== null)
      )
        throw new TypeError(
          'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
        );
      var i = Se(a, "customInspect") ? a.customInspect : !0;
      if (typeof i != "boolean" && i !== "symbol")
        throw new TypeError(
          "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`",
        );
      if (
        Se(a, "indent") &&
        a.indent !== null &&
        a.indent !== "	" &&
        !(parseInt(a.indent, 10) === a.indent && a.indent > 0)
      )
        throw new TypeError(
          'option "indent" must be "\\t", an integer > 0, or `null`',
        );
      if (Se(a, "numericSeparator") && typeof a.numericSeparator != "boolean")
        throw new TypeError(
          'option "numericSeparator", if provided, must be `true` or `false`',
        );
      var s = a.numericSeparator;
      if (typeof t > "u") return "undefined";
      if (t === null) return "null";
      if (typeof t == "boolean") return t ? "true" : "false";
      if (typeof t == "string") return Rf(t, a);
      if (typeof t == "number") {
        if (t === 0) return 1 / 0 / t > 0 ? "0" : "-0";
        var l = String(t);
        return s ? fu(t, l) : l;
      }
      if (typeof t == "bigint") {
        var u = String(t) + "n";
        return s ? fu(t, u) : u;
      }
      var c = typeof a.depth > "u" ? 5 : a.depth;
      if ((typeof n > "u" && (n = 0), n >= c && c > 0 && typeof t == "object"))
        return ll(t) ? "[Array]" : "[Object]";
      var d = vS(a, n);
      if (typeof o > "u") o = [];
      else if (Pf(o, t) >= 0) return "[Circular]";
      function f(K, S, q) {
        if ((S && ((o = X0.call(o)), o.push(S)), q)) {
          var D = { depth: a.depth };
          return (
            Se(a, "quoteStyle") && (D.quoteStyle = a.quoteStyle),
            e(K, D, n + 1, o)
          );
        }
        return e(K, a, n + 1, o);
      }
      if (typeof t == "function" && !mu(t)) {
        var m = aS(t),
          P = wr(t, f);
        return (
          "[Function" +
          (m ? ": " + m : " (anonymous)") +
          "]" +
          (P.length > 0 ? " { " + ie.call(P, ", ") + " }" : "")
        );
      }
      if (Cf(t)) {
        var w = Ct
          ? $e.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1")
          : al.call(t);
        return typeof t == "object" && !Ct ? kt(w) : w;
      }
      if (dS(t)) {
        for (
          var _ = "<" + su.call(String(t.nodeName)),
            v = t.attributes || [],
            C = 0;
          C < v.length;
          C++
        )
          _ += " " + v[C].name + "=" + wf(Y0(v[C].value), "double", a);
        return (
          (_ += ">"),
          t.childNodes && t.childNodes.length && (_ += "..."),
          (_ += "</" + su.call(String(t.nodeName)) + ">"),
          _
        );
      }
      if (ll(t)) {
        if (t.length === 0) return "[]";
        var b = wr(t, f);
        return d && !pS(b)
          ? "[" + sl(b, d) + "]"
          : "[ " + ie.call(b, ", ") + " ]";
      }
      if (Z0(t)) {
        var R = wr(t, f);
        return !("cause" in Error.prototype) &&
          "cause" in t &&
          !Ef.call(t, "cause")
          ? "{ [" +
              String(t) +
              "] " +
              ie.call(uu.call("[cause]: " + f(t.cause), R), ", ") +
              " }"
          : R.length === 0
            ? "[" + String(t) + "]"
            : "{ [" + String(t) + "] " + ie.call(R, ", ") + " }";
      }
      if (typeof t == "object" && i) {
        if (vu && typeof t[vu] == "function" && il)
          return il(t, { depth: c - n });
        if (i !== "symbol" && typeof t.inspect == "function")
          return t.inspect();
      }
      if (iS(t)) {
        var h = [];
        return (
          au &&
            au.call(t, function (K, S) {
              h.push(f(S, t, !0) + " => " + f(K, t));
            }),
          bu("Map", Xr.call(t), h, d)
        );
      }
      if (uS(t)) {
        var p = [];
        return (
          iu &&
            iu.call(t, function (K) {
              p.push(f(K, t));
            }),
          bu("Set", Jr.call(t), p, d)
        );
      }
      if (lS(t)) return Pi("WeakMap");
      if (cS(t)) return Pi("WeakSet");
      if (sS(t)) return Pi("WeakRef");
      if (tS(t)) return kt(f(Number(t)));
      if (nS(t)) return kt(f(ol.call(t)));
      if (rS(t)) return kt(W0.call(t));
      if (eS(t)) return kt(f(String(t)));
      if (typeof window < "u" && t === window) return "{ [object Window] }";
      if (t === Fl) return "{ [object globalThis] }";
      if (!Q0(t) && !mu(t)) {
        var y = wr(t, f),
          E = du
            ? du(t) === Object.prototype
            : t instanceof Object || t.constructor === Object,
          I = t instanceof Object ? "" : "null prototype",
          V =
            !E && H && Object(t) === t && H in t
              ? ns.call(We(t), 8, -1)
              : I
                ? "Object"
                : "",
          L =
            E || typeof t.constructor != "function"
              ? ""
              : t.constructor.name
                ? t.constructor.name + " "
                : "",
          z =
            L +
            (V || I
              ? "[" + ie.call(uu.call([], V || [], I || []), ": ") + "] "
              : "");
        return y.length === 0
          ? z + "{}"
          : d
            ? z + "{" + sl(y, d) + "}"
            : z + "{ " + ie.call(y, ", ") + " }";
      }
      return String(t);
    };
  function wf(e, t, r) {
    var n = (r.quoteStyle || t) === "double" ? '"' : "'";
    return n + e + n;
  }
  function Y0(e) {
    return $e.call(String(e), /"/g, "&quot;");
  }
  function ll(e) {
    return (
      We(e) === "[object Array]" && (!H || !(typeof e == "object" && H in e))
    );
  }
  function Q0(e) {
    return (
      We(e) === "[object Date]" && (!H || !(typeof e == "object" && H in e))
    );
  }
  function mu(e) {
    return (
      We(e) === "[object RegExp]" && (!H || !(typeof e == "object" && H in e))
    );
  }
  function Z0(e) {
    return (
      We(e) === "[object Error]" && (!H || !(typeof e == "object" && H in e))
    );
  }
  function eS(e) {
    return (
      We(e) === "[object String]" && (!H || !(typeof e == "object" && H in e))
    );
  }
  function tS(e) {
    return (
      We(e) === "[object Number]" && (!H || !(typeof e == "object" && H in e))
    );
  }
  function rS(e) {
    return (
      We(e) === "[object Boolean]" && (!H || !(typeof e == "object" && H in e))
    );
  }
  function Cf(e) {
    if (Ct) return e && typeof e == "object" && e instanceof Symbol;
    if (typeof e == "symbol") return !0;
    if (!e || typeof e != "object" || !al) return !1;
    try {
      return al.call(e), !0;
    } catch {}
    return !1;
  }
  function nS(e) {
    if (!e || typeof e != "object" || !ol) return !1;
    try {
      return ol.call(e), !0;
    } catch {}
    return !1;
  }
  var oS =
    Object.prototype.hasOwnProperty ||
    function (e) {
      return e in this;
    };
  function Se(e, t) {
    return oS.call(e, t);
  }
  function We(e) {
    return V0.call(e);
  }
  function aS(e) {
    if (e.name) return e.name;
    var t = K0.call(z0.call(e), /^function\s*([\w$]+)/);
    return t ? t[1] : null;
  }
  function Pf(e, t) {
    if (e.indexOf) return e.indexOf(t);
    for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
    return -1;
  }
  function iS(e) {
    if (!Xr || !e || typeof e != "object") return !1;
    try {
      Xr.call(e);
      try {
        Jr.call(e);
      } catch {
        return !0;
      }
      return e instanceof Map;
    } catch {}
    return !1;
  }
  function lS(e) {
    if (!Vt || !e || typeof e != "object") return !1;
    try {
      Vt.call(e, Vt);
      try {
        zt.call(e, zt);
      } catch {
        return !0;
      }
      return e instanceof WeakMap;
    } catch {}
    return !1;
  }
  function sS(e) {
    if (!lu || !e || typeof e != "object") return !1;
    try {
      return lu.call(e), !0;
    } catch {}
    return !1;
  }
  function uS(e) {
    if (!Jr || !e || typeof e != "object") return !1;
    try {
      Jr.call(e);
      try {
        Xr.call(e);
      } catch {
        return !0;
      }
      return e instanceof Set;
    } catch {}
    return !1;
  }
  function cS(e) {
    if (!zt || !e || typeof e != "object") return !1;
    try {
      zt.call(e, zt);
      try {
        Vt.call(e, Vt);
      } catch {
        return !0;
      }
      return e instanceof WeakSet;
    } catch {}
    return !1;
  }
  function dS(e) {
    return !e || typeof e != "object"
      ? !1
      : typeof HTMLElement < "u" && e instanceof HTMLElement
        ? !0
        : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
  }
  function Rf(e, t) {
    if (e.length > t.maxStringLength) {
      var r = e.length - t.maxStringLength,
        n = "... " + r + " more character" + (r > 1 ? "s" : "");
      return Rf(ns.call(e, 0, t.maxStringLength), t) + n;
    }
    var o = $e.call($e.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, fS);
    return wf(o, "single", t);
  }
  function fS(e) {
    var t = e.charCodeAt(0),
      r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[t];
    return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + G0.call(t.toString(16));
  }
  function kt(e) {
    return "Object(" + e + ")";
  }
  function Pi(e) {
    return e + " { ? }";
  }
  function bu(e, t, r, n) {
    var o = n ? sl(r, n) : ie.call(r, ", ");
    return e + " (" + t + ") {" + o + "}";
  }
  function pS(e) {
    for (var t = 0; t < e.length; t++)
      if (
        Pf(
          e[t],
          `
`,
        ) >= 0
      )
        return !1;
    return !0;
  }
  function vS(e, t) {
    var r;
    if (e.indent === "	") r = "	";
    else if (typeof e.indent == "number" && e.indent > 0)
      r = ie.call(Array(e.indent + 1), " ");
    else return null;
    return { base: r, prev: ie.call(Array(t + 1), r) };
  }
  function sl(e, t) {
    if (e.length === 0) return "";
    var r =
      `
` +
      t.prev +
      t.base;
    return (
      r +
      ie.call(e, "," + r) +
      `
` +
      t.prev
    );
  }
  function wr(e, t) {
    var r = ll(e),
      n = [];
    if (r) {
      n.length = e.length;
      for (var o = 0; o < e.length; o++) n[o] = Se(e, o) ? t(e[o], e) : "";
    }
    var a = typeof Ci == "function" ? Ci(e) : [],
      i;
    if (Ct) {
      i = {};
      for (var s = 0; s < a.length; s++) i["$" + a[s]] = a[s];
    }
    for (var l in e)
      Se(e, l) &&
        ((r && String(Number(l)) === l && l < e.length) ||
          (Ct && i["$" + l] instanceof Symbol) ||
          (gf.call(/[^\w$]/, l)
            ? n.push(t(l, e) + ": " + t(e[l], e))
            : n.push(l + ": " + t(e[l], e))));
    if (typeof Ci == "function")
      for (var u = 0; u < a.length; u++)
        Ef.call(e, a[u]) && n.push("[" + t(a[u]) + "]: " + t(e[a[u]], e));
    return n;
  }
  var _f = ue,
    $t = Q,
    mS = J0,
    bS = He,
    Cr = _f("%WeakMap%", !0),
    Pr = _f("%Map%", !0),
    yS = $t("WeakMap.prototype.get", !0),
    hS = $t("WeakMap.prototype.set", !0),
    gS = $t("WeakMap.prototype.has", !0),
    ES = $t("Map.prototype.get", !0),
    wS = $t("Map.prototype.set", !0),
    CS = $t("Map.prototype.has", !0),
    os = function (e, t) {
      for (var r = e, n; (n = r.next) !== null; r = n)
        if (n.key === t)
          return (r.next = n.next), (n.next = e.next), (e.next = n), n;
    },
    PS = function (e, t) {
      var r = os(e, t);
      return r && r.value;
    },
    RS = function (e, t, r) {
      var n = os(e, t);
      n ? (n.value = r) : (e.next = { key: t, next: e.next, value: r });
    },
    _S = function (e, t) {
      return !!os(e, t);
    },
    Sf = function () {
      var t,
        r,
        n,
        o = {
          assert: function (a) {
            if (!o.has(a))
              throw new bS("Side channel does not contain " + mS(a));
          },
          get: function (a) {
            if (Cr && a && (typeof a == "object" || typeof a == "function")) {
              if (t) return yS(t, a);
            } else if (Pr) {
              if (r) return ES(r, a);
            } else if (n) return PS(n, a);
          },
          has: function (a) {
            if (Cr && a && (typeof a == "object" || typeof a == "function")) {
              if (t) return gS(t, a);
            } else if (Pr) {
              if (r) return CS(r, a);
            } else if (n) return _S(n, a);
            return !1;
          },
          set: function (a, i) {
            Cr && a && (typeof a == "object" || typeof a == "function")
              ? (t || (t = new Cr()), hS(t, a, i))
              : Pr
                ? (r || (r = new Pr()), wS(r, a, i))
                : (n || (n = { key: {}, next: null }), RS(n, a, i));
          },
        };
      return o;
    },
    SS = Qd,
    Nt = Sf(),
    pe = He,
    as = {
      assert: function (e, t) {
        if (!e || (typeof e != "object" && typeof e != "function"))
          throw new pe("`O` is not an object");
        if (typeof t != "string") throw new pe("`slot` must be a string");
        if ((Nt.assert(e), !as.has(e, t)))
          throw new pe("`" + t + "` is not present on `O`");
      },
      get: function (e, t) {
        if (!e || (typeof e != "object" && typeof e != "function"))
          throw new pe("`O` is not an object");
        if (typeof t != "string") throw new pe("`slot` must be a string");
        var r = Nt.get(e);
        return r && r["$" + t];
      },
      has: function (e, t) {
        if (!e || (typeof e != "object" && typeof e != "function"))
          throw new pe("`O` is not an object");
        if (typeof t != "string") throw new pe("`slot` must be a string");
        var r = Nt.get(e);
        return !!r && SS(r, "$" + t);
      },
      set: function (e, t, r) {
        if (!e || (typeof e != "object" && typeof e != "function"))
          throw new pe("`O` is not an object");
        if (typeof t != "string") throw new pe("`slot` must be a string");
        var n = Nt.get(e);
        n || ((n = {}), Nt.set(e, n)), (n["$" + t] = r);
      },
    };
  Object.freeze && Object.freeze(as);
  var OS = as,
    Bt = OS,
    xS = SyntaxError,
    yu = typeof StopIteration == "object" ? StopIteration : null,
    TS = function (t) {
      if (!yu) throw new xS("this environment lacks StopIteration");
      Bt.set(t, "[[Done]]", !1);
      var r = {
        next: function () {
          var o = Bt.get(this, "[[Iterator]]"),
            a = Bt.get(o, "[[Done]]");
          try {
            return { done: a, value: a ? void 0 : o.next() };
          } catch (i) {
            if ((Bt.set(o, "[[Done]]", !0), i !== yu)) throw i;
            return { done: !0, value: void 0 };
          }
        },
      };
      return Bt.set(r, "[[Iterator]]", t), r;
    },
    $S = {}.toString,
    Of =
      Array.isArray ||
      function (e) {
        return $S.call(e) == "[object Array]";
      },
    qS = String.prototype.valueOf,
    AS = function (t) {
      try {
        return qS.call(t), !0;
      } catch {
        return !1;
      }
    },
    MS = Object.prototype.toString,
    IS = "[object String]",
    kS = et(),
    xf = function (t) {
      return typeof t == "string"
        ? !0
        : typeof t != "object"
          ? !1
          : kS
            ? AS(t)
            : MS.call(t) === IS;
    },
    is = typeof Map == "function" && Map.prototype ? Map : null,
    NS = typeof Set == "function" && Set.prototype ? Set : null,
    Yr;
  is ||
    (Yr = function (t) {
      return !1;
    });
  var Tf = is ? Map.prototype.has : null,
    hu = NS ? Set.prototype.has : null;
  !Yr &&
    !Tf &&
    (Yr = function (t) {
      return !1;
    });
  var $f =
      Yr ||
      function (t) {
        if (!t || typeof t != "object") return !1;
        try {
          if ((Tf.call(t), hu))
            try {
              hu.call(t);
            } catch {
              return !0;
            }
          return t instanceof is;
        } catch {}
        return !1;
      },
    BS = typeof Map == "function" && Map.prototype ? Map : null,
    ls = typeof Set == "function" && Set.prototype ? Set : null,
    Qr;
  ls ||
    (Qr = function (t) {
      return !1;
    });
  var gu = BS ? Map.prototype.has : null,
    qf = ls ? Set.prototype.has : null;
  !Qr &&
    !qf &&
    (Qr = function (t) {
      return !1;
    });
  var Af =
      Qr ||
      function (t) {
        if (!t || typeof t != "object") return !1;
        try {
          if ((qf.call(t), gu))
            try {
              gu.call(t);
            } catch {
              return !0;
            }
          return t instanceof ls;
        } catch {}
        return !1;
      },
    Eu = hf,
    wu = TS;
  if (Xl() || ri()) {
    var Ri = Symbol.iterator;
    Ir.exports = function (t) {
      if (t != null && typeof t[Ri] < "u") return t[Ri]();
      if (Eu(t)) return Array.prototype[Ri].call(t);
    };
  } else {
    var LS = Of,
      jS = xf,
      Cu = ue,
      DS = Cu("%Map%", !0),
      FS = Cu("%Set%", !0),
      Z = Q,
      Pu = Z("Array.prototype.push"),
      Ru = Z("String.prototype.charCodeAt"),
      US = Z("String.prototype.slice"),
      HS = function (t, r) {
        var n = t.length;
        if (r + 1 >= n) return r + 1;
        var o = Ru(t, r);
        if (o < 55296 || o > 56319) return r + 1;
        var a = Ru(t, r + 1);
        return a < 56320 || a > 57343 ? r + 1 : r + 2;
      },
      _i = function (t) {
        var r = 0;
        return {
          next: function () {
            var o = r >= t.length,
              a;
            return o || ((a = t[r]), (r += 1)), { done: o, value: a };
          },
        };
      },
      _u = function (t, r) {
        if (LS(t) || Eu(t)) return _i(t);
        if (jS(t)) {
          var n = 0;
          return {
            next: function () {
              var a = HS(t, n),
                i = US(t, n, a);
              return (n = a), { done: a > t.length, value: i };
            },
          };
        }
        if (r && typeof t["_es6-shim iterator_"] < "u")
          return t["_es6-shim iterator_"]();
      };
    if (!DS && !FS)
      Ir.exports = function (t) {
        if (t != null) return _u(t, !0);
      };
    else {
      var WS = $f,
        VS = Af,
        Su = Z("Map.prototype.forEach", !0),
        Ou = Z("Set.prototype.forEach", !0);
      if (typeof process > "u" || !process.versions || !process.versions.node)
        var xu = Z("Map.prototype.iterator", !0),
          Tu = Z("Set.prototype.iterator", !0);
      var $u =
          Z("Map.prototype.@@iterator", !0) ||
          Z("Map.prototype._es6-shim iterator_", !0),
        qu =
          Z("Set.prototype.@@iterator", !0) ||
          Z("Set.prototype._es6-shim iterator_", !0),
        zS = function (t) {
          if (WS(t)) {
            if (xu) return wu(xu(t));
            if ($u) return $u(t);
            if (Su) {
              var r = [];
              return (
                Su(t, function (o, a) {
                  Pu(r, [a, o]);
                }),
                _i(r)
              );
            }
          }
          if (VS(t)) {
            if (Tu) return wu(Tu(t));
            if (qu) return qu(t);
            if (Ou) {
              var n = [];
              return (
                Ou(t, function (o) {
                  Pu(n, o);
                }),
                _i(n)
              );
            }
          }
        };
      Ir.exports = function (t) {
        return zS(t) || _u(t);
      };
    }
  }
  var KS = Ir.exports,
    Au = function (e) {
      return e !== e;
    },
    Mf = function (t, r) {
      return t === 0 && r === 0
        ? 1 / t === 1 / r
        : !!(t === r || (Au(t) && Au(r)));
    },
    GS = Mf,
    If = function () {
      return typeof Object.is == "function" ? Object.is : GS;
    },
    XS = If,
    JS = Ze,
    YS = function () {
      var t = XS();
      return (
        JS(
          Object,
          { is: t },
          {
            is: function () {
              return Object.is !== t;
            },
          },
        ),
        t
      );
    },
    QS = Ze,
    ZS = Tt,
    eO = Mf,
    kf = If,
    tO = YS,
    Nf = ZS(kf(), Object);
  QS(Nf, { getPolyfill: kf, implementation: eO, shim: tO });
  var rO = Nf,
    nO = Tt,
    Bf = Q,
    oO = ue,
    ul = oO("%ArrayBuffer%", !0),
    kr = Bf("ArrayBuffer.prototype.byteLength", !0),
    aO = Bf("Object.prototype.toString"),
    Mu = !!ul && !kr && new ul(0).slice,
    Iu = !!Mu && nO(Mu),
    Lf =
      kr || Iu
        ? function (t) {
            if (!t || typeof t != "object") return !1;
            try {
              return kr ? kr(t) : Iu(t, 0), !0;
            } catch {
              return !1;
            }
          }
        : ul
          ? function (t) {
              return aO(t) === "[object ArrayBuffer]";
            }
          : function (t) {
              return !1;
            },
    iO = Date.prototype.getDay,
    lO = function (t) {
      try {
        return iO.call(t), !0;
      } catch {
        return !1;
      }
    },
    sO = Object.prototype.toString,
    uO = "[object Date]",
    cO = et(),
    dO = function (t) {
      return typeof t != "object" || t === null
        ? !1
        : cO
          ? lO(t)
          : sO.call(t) === uO;
    },
    cl = Q,
    jf = et(),
    Df,
    Ff,
    dl,
    fl;
  if (jf) {
    (Df = cl("Object.prototype.hasOwnProperty")),
      (Ff = cl("RegExp.prototype.exec")),
      (dl = {});
    var Si = function () {
      throw dl;
    };
    (fl = { toString: Si, valueOf: Si }),
      typeof Symbol.toPrimitive == "symbol" && (fl[Symbol.toPrimitive] = Si);
  }
  var fO = cl("Object.prototype.toString"),
    pO = Object.getOwnPropertyDescriptor,
    vO = "[object RegExp]",
    mO = jf
      ? function (t) {
          if (!t || typeof t != "object") return !1;
          var r = pO(t, "lastIndex"),
            n = r && Df(r, "value");
          if (!n) return !1;
          try {
            Ff(t, fl);
          } catch (o) {
            return o === dl;
          }
        }
      : function (t) {
          return !t || (typeof t != "object" && typeof t != "function")
            ? !1
            : fO(t) === vO;
        },
    bO = Q,
    ku = bO("SharedArrayBuffer.prototype.byteLength", !0),
    yO = ku
      ? function (t) {
          if (!t || typeof t != "object") return !1;
          try {
            return ku(t), !0;
          } catch {
            return !1;
          }
        }
      : function (t) {
          return !1;
        },
    hO = Number.prototype.toString,
    gO = function (t) {
      try {
        return hO.call(t), !0;
      } catch {
        return !1;
      }
    },
    EO = Object.prototype.toString,
    wO = "[object Number]",
    CO = et(),
    PO = function (t) {
      return typeof t == "number"
        ? !0
        : typeof t != "object"
          ? !1
          : CO
            ? gO(t)
            : EO.call(t) === wO;
    },
    Uf = Q,
    RO = Uf("Boolean.prototype.toString"),
    _O = Uf("Object.prototype.toString"),
    SO = function (t) {
      try {
        return RO(t), !0;
      } catch {
        return !1;
      }
    },
    OO = "[object Boolean]",
    xO = et(),
    TO = function (t) {
      return typeof t == "boolean"
        ? !0
        : t === null || typeof t != "object"
          ? !1
          : xO && Symbol.toStringTag in t
            ? SO(t)
            : _O(t) === OO;
    },
    pl = { exports: {} },
    $O = Object.prototype.toString,
    qO = Xl();
  if (qO) {
    var AO = Symbol.prototype.toString,
      MO = /^Symbol\(.*\)$/,
      IO = function (t) {
        return typeof t.valueOf() != "symbol" ? !1 : MO.test(AO.call(t));
      };
    pl.exports = function (t) {
      if (typeof t == "symbol") return !0;
      if ($O.call(t) !== "[object Symbol]") return !1;
      try {
        return IO(t);
      } catch {
        return !1;
      }
    };
  } else
    pl.exports = function (t) {
      return !1;
    };
  var kO = pl.exports,
    vl = { exports: {} },
    Nu = typeof BigInt < "u" && BigInt,
    NO = function () {
      return (
        typeof Nu == "function" &&
        typeof BigInt == "function" &&
        typeof Nu(42) == "bigint" &&
        typeof BigInt(42) == "bigint"
      );
    },
    BO = NO();
  if (BO) {
    var LO = BigInt.prototype.valueOf,
      jO = function (t) {
        try {
          return LO.call(t), !0;
        } catch {}
        return !1;
      };
    vl.exports = function (t) {
      return t === null ||
        typeof t > "u" ||
        typeof t == "boolean" ||
        typeof t == "string" ||
        typeof t == "number" ||
        typeof t == "symbol" ||
        typeof t == "function"
        ? !1
        : typeof t == "bigint"
          ? !0
          : jO(t);
    };
  } else
    vl.exports = function (t) {
      return !1;
    };
  var DO = vl.exports,
    FO = xf,
    UO = PO,
    HO = TO,
    WO = kO,
    VO = DO,
    zO = function (t) {
      if (t == null || (typeof t != "object" && typeof t != "function"))
        return null;
      if (FO(t)) return "String";
      if (UO(t)) return "Number";
      if (HO(t)) return "Boolean";
      if (WO(t)) return "Symbol";
      if (VO(t)) return "BigInt";
    },
    Zr = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap : null,
    Bu = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet : null,
    en;
  Zr ||
    (en = function (t) {
      return !1;
    });
  var ml = Zr ? Zr.prototype.has : null,
    Oi = Bu ? Bu.prototype.has : null;
  !en &&
    !ml &&
    (en = function (t) {
      return !1;
    });
  var KO =
      en ||
      function (t) {
        if (!t || typeof t != "object") return !1;
        try {
          if ((ml.call(t, ml), Oi))
            try {
              Oi.call(t, Oi);
            } catch {
              return !0;
            }
          return t instanceof Zr;
        } catch {}
        return !1;
      },
    bl = { exports: {} },
    GO = ue,
    Hf = Q,
    XO = GO("%WeakSet%", !0),
    xi = Hf("WeakSet.prototype.has", !0);
  if (xi) {
    var Ti = Hf("WeakMap.prototype.has", !0);
    bl.exports = function (t) {
      if (!t || typeof t != "object") return !1;
      try {
        if ((xi(t, xi), Ti))
          try {
            Ti(t, Ti);
          } catch {
            return !0;
          }
        return t instanceof XO;
      } catch {}
      return !1;
    };
  } else
    bl.exports = function (t) {
      return !1;
    };
  var JO = bl.exports,
    YO = $f,
    QO = Af,
    ZO = KO,
    ex = JO,
    tx = function (t) {
      if (t && typeof t == "object") {
        if (YO(t)) return "Map";
        if (QO(t)) return "Set";
        if (ZO(t)) return "WeakMap";
        if (ex(t)) return "WeakSet";
      }
      return !1;
    },
    Wf = Function.prototype.toString,
    ft = typeof Reflect == "object" && Reflect !== null && Reflect.apply,
    yl,
    Nr;
  if (typeof ft == "function" && typeof Object.defineProperty == "function")
    try {
      (yl = Object.defineProperty({}, "length", {
        get: function () {
          throw Nr;
        },
      })),
        (Nr = {}),
        ft(
          function () {
            throw 42;
          },
          null,
          yl,
        );
    } catch (e) {
      e !== Nr && (ft = null);
    }
  else ft = null;
  var rx = /^\s*class\b/,
    hl = function (t) {
      try {
        var r = Wf.call(t);
        return rx.test(r);
      } catch {
        return !1;
      }
    },
    $i = function (t) {
      try {
        return hl(t) ? !1 : (Wf.call(t), !0);
      } catch {
        return !1;
      }
    },
    Br = Object.prototype.toString,
    nx = "[object Object]",
    ox = "[object Function]",
    ax = "[object GeneratorFunction]",
    ix = "[object HTMLAllCollection]",
    lx = "[object HTML document.all class]",
    sx = "[object HTMLCollection]",
    ux = typeof Symbol == "function" && !!Symbol.toStringTag,
    cx = !(0 in [,]),
    gl = function () {
      return !1;
    };
  if (typeof document == "object") {
    var dx = document.all;
    Br.call(dx) === Br.call(document.all) &&
      (gl = function (t) {
        if ((cx || !t) && (typeof t > "u" || typeof t == "object"))
          try {
            var r = Br.call(t);
            return (
              (r === ix || r === lx || r === sx || r === nx) && t("") == null
            );
          } catch {}
        return !1;
      });
  }
  var fx = ft
      ? function (t) {
          if (gl(t)) return !0;
          if (!t || (typeof t != "function" && typeof t != "object")) return !1;
          try {
            ft(t, null, yl);
          } catch (r) {
            if (r !== Nr) return !1;
          }
          return !hl(t) && $i(t);
        }
      : function (t) {
          if (gl(t)) return !0;
          if (!t || (typeof t != "function" && typeof t != "object")) return !1;
          if (ux) return $i(t);
          if (hl(t)) return !1;
          var r = Br.call(t);
          return r !== ox && r !== ax && !/^\[object HTML/.test(r) ? !1 : $i(t);
        },
    px = fx,
    vx = Object.prototype.toString,
    Vf = Object.prototype.hasOwnProperty,
    mx = function (t, r, n) {
      for (var o = 0, a = t.length; o < a; o++)
        Vf.call(t, o) && (n == null ? r(t[o], o, t) : r.call(n, t[o], o, t));
    },
    bx = function (t, r, n) {
      for (var o = 0, a = t.length; o < a; o++)
        n == null ? r(t.charAt(o), o, t) : r.call(n, t.charAt(o), o, t);
    },
    yx = function (t, r, n) {
      for (var o in t)
        Vf.call(t, o) && (n == null ? r(t[o], o, t) : r.call(n, t[o], o, t));
    },
    hx = function (t, r, n) {
      if (!px(r)) throw new TypeError("iterator must be a function");
      var o;
      arguments.length >= 3 && (o = n),
        vx.call(t) === "[object Array]"
          ? mx(t, r, o)
          : typeof t == "string"
            ? bx(t, r, o)
            : yx(t, r, o);
    },
    gx = hx,
    Ex = [
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "BigInt64Array",
      "BigUint64Array",
    ],
    qi = Ex,
    wx = typeof globalThis > "u" ? Fl : globalThis,
    Cx = function () {
      for (var t = [], r = 0; r < qi.length; r++)
        typeof wx[qi[r]] == "function" && (t[t.length] = qi[r]);
      return t;
    },
    tn = gx,
    Px = Cx,
    Lu = Tt,
    ss = Q,
    Lr = Ql,
    Rx = ss("Object.prototype.toString"),
    zf = et(),
    ju = typeof globalThis > "u" ? Fl : globalThis,
    El = Px(),
    us = ss("String.prototype.slice"),
    Ai = Object.getPrototypeOf,
    _x =
      ss("Array.prototype.indexOf", !0) ||
      function (t, r) {
        for (var n = 0; n < t.length; n += 1) if (t[n] === r) return n;
        return -1;
      },
    rn = { __proto__: null };
  zf && Lr && Ai
    ? tn(El, function (e) {
        var t = new ju[e]();
        if (Symbol.toStringTag in t) {
          var r = Ai(t),
            n = Lr(r, Symbol.toStringTag);
          if (!n) {
            var o = Ai(r);
            n = Lr(o, Symbol.toStringTag);
          }
          rn["$" + e] = Lu(n.get);
        }
      })
    : tn(El, function (e) {
        var t = new ju[e](),
          r = t.slice || t.set;
        r && (rn["$" + e] = Lu(r));
      });
  var Sx = function (t) {
      var r = !1;
      return (
        tn(rn, function (n, o) {
          if (!r)
            try {
              "$" + n(t) === o && (r = us(o, 1));
            } catch {}
        }),
        r
      );
    },
    Ox = function (t) {
      var r = !1;
      return (
        tn(rn, function (n, o) {
          if (!r)
            try {
              n(t), (r = us(o, 1));
            } catch {}
        }),
        r
      );
    },
    xx = function (t) {
      if (!t || typeof t != "object") return !1;
      if (!zf) {
        var r = us(Rx(t), 8, -1);
        return _x(El, r) > -1 ? r : r !== "Object" ? !1 : Ox(t);
      }
      return Lr ? Sx(t) : null;
    },
    Tx = Q,
    Du = Tx("ArrayBuffer.prototype.byteLength", !0),
    $x = Lf,
    qx = function (t) {
      return $x(t) ? (Du ? Du(t) : t.byteLength) : NaN;
    },
    Kf = u0,
    ce = Q,
    Fu = M0,
    Ax = ue,
    Pt = KS,
    Mx = Sf,
    Uu = rO,
    Hu = hf,
    Wu = Of,
    Vu = Lf,
    zu = dO,
    Ku = mO,
    Gu = yO,
    Xu = Gl,
    Ju = zO,
    Yu = tx,
    Qu = xx,
    Zu = qx,
    ec = ce("SharedArrayBuffer.prototype.byteLength", !0),
    tc = ce("Date.prototype.getTime"),
    Mi = Object.getPrototypeOf,
    rc = ce("Object.prototype.toString"),
    nn = Ax("%Set%", !0),
    wl = ce("Map.prototype.has", !0),
    on = ce("Map.prototype.get", !0),
    nc = ce("Map.prototype.size", !0),
    an = ce("Set.prototype.add", !0),
    Gf = ce("Set.prototype.delete", !0),
    ln = ce("Set.prototype.has", !0),
    jr = ce("Set.prototype.size", !0);
  function oc(e, t, r, n) {
    for (var o = Pt(e), a; (a = o.next()) && !a.done; )
      if (oe(t, a.value, r, n)) return Gf(e, a.value), !0;
    return !1;
  }
  function Xf(e) {
    if (typeof e > "u") return null;
    if (typeof e != "object")
      return typeof e == "symbol"
        ? !1
        : typeof e == "string" || typeof e == "number"
          ? +e == +e
          : !0;
  }
  function Ix(e, t, r, n, o, a) {
    var i = Xf(r);
    if (i != null) return i;
    var s = on(t, i),
      l = Kf({}, o, { strict: !1 });
    return (typeof s > "u" && !wl(t, i)) || !oe(n, s, l, a)
      ? !1
      : !wl(e, i) && oe(n, s, l, a);
  }
  function kx(e, t, r) {
    var n = Xf(r);
    return n ?? (ln(t, n) && !ln(e, n));
  }
  function ac(e, t, r, n, o, a) {
    for (var i = Pt(e), s, l; (s = i.next()) && !s.done; )
      if (((l = s.value), oe(r, l, o, a) && oe(n, on(t, l), o, a)))
        return Gf(e, l), !0;
    return !1;
  }
  function oe(e, t, r, n) {
    var o = r || {};
    if (o.strict ? Uu(e, t) : e === t) return !0;
    var a = Ju(e),
      i = Ju(t);
    if (a !== i) return !1;
    if (!e || !t || (typeof e != "object" && typeof t != "object"))
      return o.strict ? Uu(e, t) : e == t;
    var s = n.has(e),
      l = n.has(t),
      u;
    if (s && l) {
      if (n.get(e) === n.get(t)) return !0;
    } else u = {};
    return s || n.set(e, u), l || n.set(t, u), Lx(e, t, o, n);
  }
  function ic(e) {
    return !e ||
      typeof e != "object" ||
      typeof e.length != "number" ||
      typeof e.copy != "function" ||
      typeof e.slice != "function" ||
      (e.length > 0 && typeof e[0] != "number")
      ? !1
      : !!(
          e.constructor &&
          e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
  }
  function Nx(e, t, r, n) {
    if (jr(e) !== jr(t)) return !1;
    for (var o = Pt(e), a = Pt(t), i, s, l; (i = o.next()) && !i.done; )
      if (i.value && typeof i.value == "object")
        l || (l = new nn()), an(l, i.value);
      else if (!ln(t, i.value)) {
        if (r.strict || !kx(e, t, i.value)) return !1;
        l || (l = new nn()), an(l, i.value);
      }
    if (l) {
      for (; (s = a.next()) && !s.done; )
        if (s.value && typeof s.value == "object") {
          if (!oc(l, s.value, r.strict, n)) return !1;
        } else if (!r.strict && !ln(e, s.value) && !oc(l, s.value, r.strict, n))
          return !1;
      return jr(l) === 0;
    }
    return !0;
  }
  function Bx(e, t, r, n) {
    if (nc(e) !== nc(t)) return !1;
    for (
      var o = Pt(e), a = Pt(t), i, s, l, u, c, d;
      (i = o.next()) && !i.done;

    )
      if (((u = i.value[0]), (c = i.value[1]), u && typeof u == "object"))
        l || (l = new nn()), an(l, u);
      else if (
        ((d = on(t, u)), (typeof d > "u" && !wl(t, u)) || !oe(c, d, r, n))
      ) {
        if (r.strict || !Ix(e, t, u, c, r, n)) return !1;
        l || (l = new nn()), an(l, u);
      }
    if (l) {
      for (; (s = a.next()) && !s.done; )
        if (((u = s.value[0]), (d = s.value[1]), u && typeof u == "object")) {
          if (!ac(l, e, u, d, r, n)) return !1;
        } else if (
          !r.strict &&
          (!e.has(u) || !oe(on(e, u), d, r, n)) &&
          !ac(l, e, u, d, Kf({}, r, { strict: !1 }), n)
        )
          return !1;
      return jr(l) === 0;
    }
    return !0;
  }
  function Lx(e, t, r, n) {
    var o, a;
    if (
      typeof e != typeof t ||
      e == null ||
      t == null ||
      rc(e) !== rc(t) ||
      Hu(e) !== Hu(t)
    )
      return !1;
    var i = Wu(e),
      s = Wu(t);
    if (i !== s) return !1;
    var l = e instanceof Error,
      u = t instanceof Error;
    if (l !== u || ((l || u) && (e.name !== t.name || e.message !== t.message)))
      return !1;
    var c = Ku(e),
      d = Ku(t);
    if (c !== d || ((c || d) && (e.source !== t.source || Fu(e) !== Fu(t))))
      return !1;
    var f = zu(e),
      m = zu(t);
    if (
      f !== m ||
      ((f || m) && tc(e) !== tc(t)) ||
      (r.strict && Mi && Mi(e) !== Mi(t))
    )
      return !1;
    var P = Qu(e),
      w = Qu(t);
    if (P !== w) return !1;
    if (P || w) {
      if (e.length !== t.length) return !1;
      for (o = 0; o < e.length; o++) if (e[o] !== t[o]) return !1;
      return !0;
    }
    var _ = ic(e),
      v = ic(t);
    if (_ !== v) return !1;
    if (_ || v) {
      if (e.length !== t.length) return !1;
      for (o = 0; o < e.length; o++) if (e[o] !== t[o]) return !1;
      return !0;
    }
    var C = Vu(e),
      b = Vu(t);
    if (C !== b) return !1;
    if (C || b)
      return Zu(e) !== Zu(t)
        ? !1
        : typeof Uint8Array == "function" &&
            oe(new Uint8Array(e), new Uint8Array(t), r, n);
    var R = Gu(e),
      h = Gu(t);
    if (R !== h) return !1;
    if (R || h)
      return ec(e) !== ec(t)
        ? !1
        : typeof Uint8Array == "function" &&
            oe(new Uint8Array(e), new Uint8Array(t), r, n);
    if (typeof e != typeof t) return !1;
    var p = Xu(e),
      y = Xu(t);
    if (p.length !== y.length) return !1;
    for (p.sort(), y.sort(), o = p.length - 1; o >= 0; o--)
      if (p[o] != y[o]) return !1;
    for (o = p.length - 1; o >= 0; o--)
      if (((a = p[o]), !oe(e[a], t[a], r, n))) return !1;
    var E = Yu(e),
      I = Yu(t);
    return E !== I
      ? !1
      : E === "Set" || I === "Set"
        ? Nx(e, t, r, n)
        : E === "Map"
          ? Bx(e, t, r, n)
          : !0;
  }
  var jx = function (t, r, n) {
    return oe(t, r, n, Mx());
  };
  Object.defineProperty(ti, "__esModule", { value: !0 });
  ti.default = void 0;
  var Dx = cs(jx),
    Fx = cs(Qe),
    Jf = cs(xt);
  function cs(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function Ii(e, t) {
    return Wx(e) || Hx(e, t) || Yf(e, t) || Ux();
  }
  function Ux() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Hx(e, t) {
    var r =
      e == null
        ? null
        : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (r != null) {
      var n = [],
        o = !0,
        a = !1,
        i,
        s;
      try {
        for (
          r = r.call(e);
          !(o = (i = r.next()).done) &&
          (n.push(i.value), !(t && n.length === t));
          o = !0
        );
      } catch (l) {
        (a = !0), (s = l);
      } finally {
        try {
          !o && r.return != null && r.return();
        } finally {
          if (a) throw s;
        }
      }
      return n;
    }
  }
  function Wx(e) {
    if (Array.isArray(e)) return e;
  }
  function Vx(e, t) {
    var r = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (!r) {
      if (
        Array.isArray(e) ||
        (r = Yf(e)) ||
        (t && e && typeof e.length == "number")
      ) {
        r && (e = r);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
          },
          e: function (u) {
            throw u;
          },
          f: o,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var a = !0,
      i = !1,
      s;
    return {
      s: function () {
        r = r.call(e);
      },
      n: function () {
        var u = r.next();
        return (a = u.done), u;
      },
      e: function (u) {
        (i = !0), (s = u);
      },
      f: function () {
        try {
          !a && r.return != null && r.return();
        } finally {
          if (i) throw s;
        }
      },
    };
  }
  function Yf(e, t) {
    if (e) {
      if (typeof e == "string") return lc(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (
        (r === "Object" && e.constructor && (r = e.constructor.name),
        r === "Map" || r === "Set")
      )
        return Array.from(e);
      if (
        r === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return lc(e, t);
    }
  }
  function lc(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var Oe = [],
    sc = Jf.default.keys();
  for (var ki = 0; ki < sc.length; ki++) {
    var Ni = sc[ki],
      Bi = Jf.default.get(Ni);
    if (Bi)
      for (
        var uc = [].concat(Bi.baseConcepts, Bi.relatedConcepts), Li = 0;
        Li < uc.length;
        Li++
      ) {
        var cc = uc[Li];
        if (cc.module === "HTML") {
          var ji = cc.concept;
          ji &&
            (function () {
              var e = JSON.stringify(ji),
                t = Oe.find(function (a) {
                  return JSON.stringify(a[0]) === e;
                }),
                r = void 0;
              t ? (r = t[1]) : (r = []);
              for (var n = !0, o = 0; o < r.length; o++)
                if (r[o] === Ni) {
                  n = !1;
                  break;
                }
              n && r.push(Ni), Oe.push([ji, r]);
            })();
        }
      }
  }
  var Cl = {
      entries: function () {
        return Oe;
      },
      forEach: function (t) {
        var r =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : null,
          n = Vx(Oe),
          o;
        try {
          for (n.s(); !(o = n.n()).done; ) {
            var a = Ii(o.value, 2),
              i = a[0],
              s = a[1];
            t.call(r, s, i, Oe);
          }
        } catch (l) {
          n.e(l);
        } finally {
          n.f();
        }
      },
      get: function (t) {
        var r = Oe.find(function (n) {
          return (0, Dx.default)(t, n[0]);
        });
        return r && r[1];
      },
      has: function (t) {
        return !!Cl.get(t);
      },
      keys: function () {
        return Oe.map(function (t) {
          var r = Ii(t, 1),
            n = r[0];
          return n;
        });
      },
      values: function () {
        return Oe.map(function (t) {
          var r = Ii(t, 2),
            n = r[1];
          return n;
        });
      },
    },
    zx = (0, Fx.default)(Cl, Cl.entries());
  ti.default = zx;
  var oi = {};
  Object.defineProperty(oi, "__esModule", { value: !0 });
  oi.default = void 0;
  var Kx = Zf(Qe),
    Qf = Zf(xt);
  function Zf(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function Di(e, t) {
    return Jx(e) || Xx(e, t) || ep(e, t) || Gx();
  }
  function Gx() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Xx(e, t) {
    var r =
      e == null
        ? null
        : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (r != null) {
      var n = [],
        o = !0,
        a = !1,
        i,
        s;
      try {
        for (
          r = r.call(e);
          !(o = (i = r.next()).done) &&
          (n.push(i.value), !(t && n.length === t));
          o = !0
        );
      } catch (l) {
        (a = !0), (s = l);
      } finally {
        try {
          !o && r.return != null && r.return();
        } finally {
          if (a) throw s;
        }
      }
      return n;
    }
  }
  function Jx(e) {
    if (Array.isArray(e)) return e;
  }
  function Yx(e, t) {
    var r = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (!r) {
      if (
        Array.isArray(e) ||
        (r = ep(e)) ||
        (t && e && typeof e.length == "number")
      ) {
        r && (e = r);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
          },
          e: function (u) {
            throw u;
          },
          f: o,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var a = !0,
      i = !1,
      s;
    return {
      s: function () {
        r = r.call(e);
      },
      n: function () {
        var u = r.next();
        return (a = u.done), u;
      },
      e: function (u) {
        (i = !0), (s = u);
      },
      f: function () {
        try {
          !a && r.return != null && r.return();
        } finally {
          if (i) throw s;
        }
      },
    };
  }
  function ep(e, t) {
    if (e) {
      if (typeof e == "string") return dc(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (
        (r === "Object" && e.constructor && (r = e.constructor.name),
        r === "Map" || r === "Set")
      )
        return Array.from(e);
      if (
        r === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return dc(e, t);
    }
  }
  function dc(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var xe = [],
    tp = Qf.default.keys(),
    Qx = function (t) {
      var r = tp[t],
        n = Qf.default.get(r);
      if (n)
        for (
          var o = [].concat(n.baseConcepts, n.relatedConcepts), a = 0;
          a < o.length;
          a++
        ) {
          var i = o[a];
          if (i.module === "HTML") {
            var s = i.concept;
            if (s) {
              var l = xe.find(function (c) {
                  return c[0] === r;
                }),
                u = void 0;
              l ? (u = l[1]) : (u = []), u.push(s), xe.push([r, u]);
            }
          }
        }
    };
  for (var Fi = 0; Fi < tp.length; Fi++) Qx(Fi);
  var Pl = {
      entries: function () {
        return xe;
      },
      forEach: function (t) {
        var r =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : null,
          n = Yx(xe),
          o;
        try {
          for (n.s(); !(o = n.n()).done; ) {
            var a = Di(o.value, 2),
              i = a[0],
              s = a[1];
            t.call(r, s, i, xe);
          }
        } catch (l) {
          n.e(l);
        } finally {
          n.f();
        }
      },
      get: function (t) {
        var r = xe.find(function (n) {
          return n[0] === t;
        });
        return r && r[1];
      },
      has: function (t) {
        return !!Pl.get(t);
      },
      keys: function () {
        return xe.map(function (t) {
          var r = Di(t, 1),
            n = r[0];
          return n;
        });
      },
      values: function () {
        return xe.map(function (t) {
          var r = Di(t, 2),
            n = r[1];
          return n;
        });
      },
    },
    Zx = (0, Kx.default)(Pl, Pl.entries());
  oi.default = Zx;
  Object.defineProperty(ne, "__esModule", { value: !0 });
  var ee =
      (ne.roles =
      np =
      ne.roleElements =
      rp =
      ne.elementRoles =
      ne.dom =
      ne.aria =
        void 0),
    eT = vr(gn),
    tT = vr(wn),
    rT = vr(xt),
    nT = vr(ti),
    oT = vr(oi);
  function vr(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var aT = eT.default;
  ne.aria = aT;
  var iT = tT.default;
  ne.dom = iT;
  var lT = rT.default;
  ee = ne.roles = lT;
  var sT = nT.default,
    rp = (ne.elementRoles = sT),
    uT = oT.default,
    np = (ne.roleElements = uT),
    ds = { exports: {} };
  ds.exports;
  (function (e) {
    var t = (function () {
      var r = String.fromCharCode,
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
        a = {};
      function i(l, u) {
        if (!a[l]) {
          a[l] = {};
          for (var c = 0; c < l.length; c++) a[l][l.charAt(c)] = c;
        }
        return a[l][u];
      }
      var s = {
        compressToBase64: function (l) {
          if (l == null) return "";
          var u = s._compress(l, 6, function (c) {
            return n.charAt(c);
          });
          switch (u.length % 4) {
            default:
            case 0:
              return u;
            case 1:
              return u + "===";
            case 2:
              return u + "==";
            case 3:
              return u + "=";
          }
        },
        decompressFromBase64: function (l) {
          return l == null
            ? ""
            : l == ""
              ? null
              : s._decompress(l.length, 32, function (u) {
                  return i(n, l.charAt(u));
                });
        },
        compressToUTF16: function (l) {
          return l == null
            ? ""
            : s._compress(l, 15, function (u) {
                return r(u + 32);
              }) + " ";
        },
        decompressFromUTF16: function (l) {
          return l == null
            ? ""
            : l == ""
              ? null
              : s._decompress(l.length, 16384, function (u) {
                  return l.charCodeAt(u) - 32;
                });
        },
        compressToUint8Array: function (l) {
          for (
            var u = s.compress(l),
              c = new Uint8Array(u.length * 2),
              d = 0,
              f = u.length;
            d < f;
            d++
          ) {
            var m = u.charCodeAt(d);
            (c[d * 2] = m >>> 8), (c[d * 2 + 1] = m % 256);
          }
          return c;
        },
        decompressFromUint8Array: function (l) {
          if (l == null) return s.decompress(l);
          for (var u = new Array(l.length / 2), c = 0, d = u.length; c < d; c++)
            u[c] = l[c * 2] * 256 + l[c * 2 + 1];
          var f = [];
          return (
            u.forEach(function (m) {
              f.push(r(m));
            }),
            s.decompress(f.join(""))
          );
        },
        compressToEncodedURIComponent: function (l) {
          return l == null
            ? ""
            : s._compress(l, 6, function (u) {
                return o.charAt(u);
              });
        },
        decompressFromEncodedURIComponent: function (l) {
          return l == null
            ? ""
            : l == ""
              ? null
              : ((l = l.replace(/ /g, "+")),
                s._decompress(l.length, 32, function (u) {
                  return i(o, l.charAt(u));
                }));
        },
        compress: function (l) {
          return s._compress(l, 16, function (u) {
            return r(u);
          });
        },
        _compress: function (l, u, c) {
          if (l == null) return "";
          var d,
            f,
            m = {},
            P = {},
            w = "",
            _ = "",
            v = "",
            C = 2,
            b = 3,
            R = 2,
            h = [],
            p = 0,
            y = 0,
            E;
          for (E = 0; E < l.length; E += 1)
            if (
              ((w = l.charAt(E)),
              Object.prototype.hasOwnProperty.call(m, w) ||
                ((m[w] = b++), (P[w] = !0)),
              (_ = v + w),
              Object.prototype.hasOwnProperty.call(m, _))
            )
              v = _;
            else {
              if (Object.prototype.hasOwnProperty.call(P, v)) {
                if (v.charCodeAt(0) < 256) {
                  for (d = 0; d < R; d++)
                    (p = p << 1),
                      y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++;
                  for (f = v.charCodeAt(0), d = 0; d < 8; d++)
                    (p = (p << 1) | (f & 1)),
                      y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                      (f = f >> 1);
                } else {
                  for (f = 1, d = 0; d < R; d++)
                    (p = (p << 1) | f),
                      y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                      (f = 0);
                  for (f = v.charCodeAt(0), d = 0; d < 16; d++)
                    (p = (p << 1) | (f & 1)),
                      y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                      (f = f >> 1);
                }
                C--, C == 0 && ((C = Math.pow(2, R)), R++), delete P[v];
              } else
                for (f = m[v], d = 0; d < R; d++)
                  (p = (p << 1) | (f & 1)),
                    y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                    (f = f >> 1);
              C--,
                C == 0 && ((C = Math.pow(2, R)), R++),
                (m[_] = b++),
                (v = String(w));
            }
          if (v !== "") {
            if (Object.prototype.hasOwnProperty.call(P, v)) {
              if (v.charCodeAt(0) < 256) {
                for (d = 0; d < R; d++)
                  (p = p << 1),
                    y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++;
                for (f = v.charCodeAt(0), d = 0; d < 8; d++)
                  (p = (p << 1) | (f & 1)),
                    y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                    (f = f >> 1);
              } else {
                for (f = 1, d = 0; d < R; d++)
                  (p = (p << 1) | f),
                    y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                    (f = 0);
                for (f = v.charCodeAt(0), d = 0; d < 16; d++)
                  (p = (p << 1) | (f & 1)),
                    y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                    (f = f >> 1);
              }
              C--, C == 0 && ((C = Math.pow(2, R)), R++), delete P[v];
            } else
              for (f = m[v], d = 0; d < R; d++)
                (p = (p << 1) | (f & 1)),
                  y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
                  (f = f >> 1);
            C--, C == 0 && ((C = Math.pow(2, R)), R++);
          }
          for (f = 2, d = 0; d < R; d++)
            (p = (p << 1) | (f & 1)),
              y == u - 1 ? ((y = 0), h.push(c(p)), (p = 0)) : y++,
              (f = f >> 1);
          for (;;)
            if (((p = p << 1), y == u - 1)) {
              h.push(c(p));
              break;
            } else y++;
          return h.join("");
        },
        decompress: function (l) {
          return l == null
            ? ""
            : l == ""
              ? null
              : s._decompress(l.length, 32768, function (u) {
                  return l.charCodeAt(u);
                });
        },
        _decompress: function (l, u, c) {
          var d = [],
            f = 4,
            m = 4,
            P = 3,
            w = "",
            _ = [],
            v,
            C,
            b,
            R,
            h,
            p,
            y,
            E = { val: c(0), position: u, index: 1 };
          for (v = 0; v < 3; v += 1) d[v] = v;
          for (b = 0, h = Math.pow(2, 2), p = 1; p != h; )
            (R = E.val & E.position),
              (E.position >>= 1),
              E.position == 0 && ((E.position = u), (E.val = c(E.index++))),
              (b |= (R > 0 ? 1 : 0) * p),
              (p <<= 1);
          switch (b) {
            case 0:
              for (b = 0, h = Math.pow(2, 8), p = 1; p != h; )
                (R = E.val & E.position),
                  (E.position >>= 1),
                  E.position == 0 && ((E.position = u), (E.val = c(E.index++))),
                  (b |= (R > 0 ? 1 : 0) * p),
                  (p <<= 1);
              y = r(b);
              break;
            case 1:
              for (b = 0, h = Math.pow(2, 16), p = 1; p != h; )
                (R = E.val & E.position),
                  (E.position >>= 1),
                  E.position == 0 && ((E.position = u), (E.val = c(E.index++))),
                  (b |= (R > 0 ? 1 : 0) * p),
                  (p <<= 1);
              y = r(b);
              break;
            case 2:
              return "";
          }
          for (d[3] = y, C = y, _.push(y); ; ) {
            if (E.index > l) return "";
            for (b = 0, h = Math.pow(2, P), p = 1; p != h; )
              (R = E.val & E.position),
                (E.position >>= 1),
                E.position == 0 && ((E.position = u), (E.val = c(E.index++))),
                (b |= (R > 0 ? 1 : 0) * p),
                (p <<= 1);
            switch ((y = b)) {
              case 0:
                for (b = 0, h = Math.pow(2, 8), p = 1; p != h; )
                  (R = E.val & E.position),
                    (E.position >>= 1),
                    E.position == 0 &&
                      ((E.position = u), (E.val = c(E.index++))),
                    (b |= (R > 0 ? 1 : 0) * p),
                    (p <<= 1);
                (d[m++] = r(b)), (y = m - 1), f--;
                break;
              case 1:
                for (b = 0, h = Math.pow(2, 16), p = 1; p != h; )
                  (R = E.val & E.position),
                    (E.position >>= 1),
                    E.position == 0 &&
                      ((E.position = u), (E.val = c(E.index++))),
                    (b |= (R > 0 ? 1 : 0) * p),
                    (p <<= 1);
                (d[m++] = r(b)), (y = m - 1), f--;
                break;
              case 2:
                return _.join("");
            }
            if ((f == 0 && ((f = Math.pow(2, P)), P++), d[y])) w = d[y];
            else if (y === m) w = C + C.charAt(0);
            else return null;
            _.push(w),
              (d[m++] = C + w.charAt(0)),
              f--,
              (C = w),
              f == 0 && ((f = Math.pow(2, P)), P++);
          }
        },
      };
      return s;
    })();
    e != null
      ? (e.exports = t)
      : typeof angular < "u" &&
        angular != null &&
        angular.module("LZString", []).factory("LZString", function () {
          return t;
        });
  })(ds);
  var cT = ds.exports;
  const dT = dv(cT);
  var fT = {};
  function op(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  const pT = (e, t, r, n, o, a, i) => {
      const s = n + r.indent,
        l = r.colors;
      return e
        .map((u) => {
          const c = t[u];
          let d = i(c, r, s, o, a);
          return (
            typeof c != "string" &&
              (d.indexOf(`
`) !== -1 && (d = r.spacingOuter + s + d + r.spacingOuter + n),
              (d = "{" + d + "}")),
            r.spacingInner +
              n +
              l.prop.open +
              u +
              l.prop.close +
              "=" +
              l.value.open +
              d +
              l.value.close
          );
        })
        .join("");
    },
    vT = 3,
    mT = (e, t, r, n, o, a) =>
      e
        .map((i) => {
          const s = typeof i == "string" ? ap(i, t) : a(i, t, r, n, o);
          return s === "" &&
            typeof i == "object" &&
            i !== null &&
            i.nodeType !== vT
            ? ""
            : t.spacingOuter + r + s;
        })
        .join(""),
    ap = (e, t) => {
      const r = t.colors.content;
      return r.open + op(e) + r.close;
    },
    bT = (e, t) => {
      const r = t.colors.comment;
      return r.open + "<!--" + op(e) + "-->" + r.close;
    },
    yT = (e, t, r, n, o) => {
      const a = n.colors.tag;
      return (
        a.open +
        "<" +
        e +
        (t && a.close + t + n.spacingOuter + o + a.open) +
        (r
          ? ">" + a.close + r + n.spacingOuter + o + a.open + "</" + e
          : (t && !n.min ? "" : " ") + "/") +
        ">" +
        a.close
      );
    },
    hT = (e, t) => {
      const r = t.colors.tag;
      return r.open + "<" + e + r.close + " …" + r.open + " />" + r.close;
    },
    gT = 1,
    ip = 3,
    lp = 8,
    sp = 11,
    ET = /^((HTML|SVG)\w*)?Element$/,
    wT = (e) => {
      const t = e.constructor.name,
        { nodeType: r, tagName: n } = e,
        o =
          (typeof n == "string" && n.includes("-")) ||
          (typeof e.hasAttribute == "function" && e.hasAttribute("is"));
      return (
        (r === gT && (ET.test(t) || o)) ||
        (r === ip && t === "Text") ||
        (r === lp && t === "Comment") ||
        (r === sp && t === "DocumentFragment")
      );
    };
  function CT(e) {
    return e.nodeType === ip;
  }
  function PT(e) {
    return e.nodeType === lp;
  }
  function Ui(e) {
    return e.nodeType === sp;
  }
  function RT(e) {
    return {
      test: (t) => {
        var r;
        return (
          (t == null || (r = t.constructor) == null ? void 0 : r.name) && wT(t)
        );
      },
      serialize: (t, r, n, o, a, i) => {
        if (CT(t)) return ap(t.data, r);
        if (PT(t)) return bT(t.data, r);
        const s = Ui(t) ? "DocumentFragment" : t.tagName.toLowerCase();
        return ++o > r.maxDepth
          ? hT(s, r)
          : yT(
              s,
              pT(
                Ui(t)
                  ? []
                  : Array.from(t.attributes)
                      .map((l) => l.name)
                      .sort(),
                Ui(t)
                  ? {}
                  : Array.from(t.attributes).reduce(
                      (l, u) => ((l[u.name] = u.value), l),
                      {},
                    ),
                r,
                n + r.indent,
                o,
                a,
                i,
              ),
              mT(
                Array.prototype.slice
                  .call(t.childNodes || t.children)
                  .filter(e),
                r,
                n + r.indent,
                o,
                a,
                i,
              ),
              r,
              n,
            );
      },
    };
  }
  let up = null,
    fs = null,
    ps = null;
  try {
    const e = dt && dt.require;
    (fs = e.call(dt, "fs").readFileSync),
      (ps = e.call(dt, "@babel/code-frame").codeFrameColumns),
      (up = e.call(dt, "chalk"));
  } catch {}
  function _T(e) {
    const t = e.indexOf("(") + 1,
      r = e.indexOf(")"),
      n = e.slice(t, r),
      o = n.split(":"),
      [a, i, s] = [o[0], parseInt(o[1], 10), parseInt(o[2], 10)];
    let l = "";
    try {
      l = fs(a, "utf-8");
    } catch {
      return "";
    }
    const u = ps(
      l,
      { start: { line: i, column: s } },
      { highlightCode: !0, linesBelow: 0 },
    );
    return (
      up.dim(n) +
      `
` +
      u +
      `
`
    );
  }
  function ST() {
    if (!fs || !ps) return "";
    const t = new Error().stack
      .split(
        `
`,
      )
      .slice(1)
      .find((r) => !r.includes("node_modules/"));
    return _T(t);
  }
  const cp = 3;
  function Hi() {
    return typeof jest < "u" && jest !== null
      ? setTimeout._isMockFunction === !0 ||
          Object.prototype.hasOwnProperty.call(setTimeout, "clock")
      : !1;
  }
  function vs() {
    if (typeof window > "u")
      throw new Error("Could not find default container");
    return window.document;
  }
  function dp(e) {
    if (e.defaultView) return e.defaultView;
    if (e.ownerDocument && e.ownerDocument.defaultView)
      return e.ownerDocument.defaultView;
    if (e.window) return e.window;
    throw e.ownerDocument && e.ownerDocument.defaultView === null
      ? new Error(
          "It looks like the window object is not available for the provided node.",
        )
      : e.then instanceof Function
        ? new Error(
            "It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?",
          )
        : Array.isArray(e)
          ? new Error(
              "It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?",
            )
          : typeof e.debug == "function" &&
              typeof e.logTestingPlaygroundURL == "function"
            ? new Error(
                "It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?",
              )
            : new Error(
                "The given node is not an Element, the node type is: " +
                  typeof e +
                  ".",
              );
  }
  function ge(e) {
    if (
      !e ||
      typeof e.querySelector != "function" ||
      typeof e.querySelectorAll != "function"
    )
      throw new TypeError(
        "Expected container to be an Element, a Document or a DocumentFragment but got " +
          t(e) +
          ".",
      );
    function t(r) {
      return typeof r == "object"
        ? r === null
          ? "null"
          : r.constructor.name
        : typeof r;
    }
  }
  const OT = () => {
      let e;
      try {
        var t;
        e = JSON.parse(
          (t = process) == null || (t = t.env) == null ? void 0 : t.COLORS,
        );
      } catch {}
      return typeof e == "boolean"
        ? e
        : typeof process < "u" &&
            process.versions !== void 0 &&
            process.versions.node !== void 0;
    },
    { DOMCollection: xT } = Od,
    TT = 1,
    $T = 8;
  function qT(e) {
    return (
      e.nodeType !== $T && (e.nodeType !== TT || !e.matches($().defaultIgnore))
    );
  }
  function sn(e, t, r) {
    if (
      (r === void 0 && (r = {}),
      e || (e = vs().body),
      typeof t != "number" &&
        (t = (typeof process < "u" && fT.DEBUG_PRINT_LIMIT) || 7e3),
      t === 0)
    )
      return "";
    e.documentElement && (e = e.documentElement);
    let n = typeof e;
    if (
      (n === "object" ? (n = e.constructor.name) : (e = {}),
      !("outerHTML" in e))
    )
      throw new TypeError("Expected an element or document but got " + n);
    const { filterNode: o = qT, ...a } = r,
      i = _m(e, {
        plugins: [RT(o), xT],
        printFunctionName: !1,
        highlight: OT(),
        ...a,
      });
    return t !== void 0 && e.outerHTML.length > t ? i.slice(0, t) + "..." : i;
  }
  const fc = function () {
    const e = ST();
    console.log(
      e
        ? sn(...arguments) +
            `

` +
            e
        : sn(...arguments),
    );
  };
  let un = {
    testIdAttribute: "data-testid",
    asyncUtilTimeout: 1e3,
    asyncWrapper: (e) => e(),
    unstable_advanceTimersWrapper: (e) => e(),
    eventWrapper: (e) => e(),
    defaultHidden: !1,
    defaultIgnore: "script, style",
    showOriginalStackTrace: !1,
    throwSuggestions: !1,
    getElementError(e, t) {
      const r = sn(t),
        n = new Error(
          [
            e,
            "Ignored nodes: comments, " +
              un.defaultIgnore +
              `
` +
              r,
          ].filter(Boolean).join(`

`),
        );
      return (n.name = "TestingLibraryElementError"), n;
    },
    _disableExpensiveErrorDiagnostics: !1,
    computedStyleSupportsPseudoElements: !1,
  };
  function AT(e) {
    try {
      return (un._disableExpensiveErrorDiagnostics = !0), e();
    } finally {
      un._disableExpensiveErrorDiagnostics = !1;
    }
  }
  function $() {
    return un;
  }
  const MT = [
    "button",
    "meter",
    "output",
    "progress",
    "select",
    "textarea",
    "input",
  ];
  function fp(e) {
    return MT.includes(e.nodeName.toLowerCase())
      ? ""
      : e.nodeType === cp
        ? e.textContent
        : Array.from(e.childNodes)
            .map((t) => fp(t))
            .join("");
  }
  function Rl(e) {
    let t;
    return (
      e.tagName.toLowerCase() === "label"
        ? (t = fp(e))
        : (t = e.value || e.textContent),
      t
    );
  }
  function pp(e) {
    if (e.labels !== void 0) {
      var t;
      return (t = e.labels) != null ? t : [];
    }
    if (!IT(e)) return [];
    const r = e.ownerDocument.querySelectorAll("label");
    return Array.from(r).filter((n) => n.control === e);
  }
  function IT(e) {
    return (
      /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(e.tagName) ||
      (e.tagName === "INPUT" && e.getAttribute("type") !== "hidden")
    );
  }
  function vp(e, t, r) {
    let { selector: n = "*" } = r === void 0 ? {} : r;
    const o = t.getAttribute("aria-labelledby"),
      a = o ? o.split(" ") : [];
    return a.length
      ? a.map((i) => {
          const s = e.querySelector('[id="' + i + '"]');
          return s
            ? { content: Rl(s), formControl: null }
            : { content: "", formControl: null };
        })
      : Array.from(pp(t)).map((i) => {
          const s = Rl(i),
            u = Array.from(
              i.querySelectorAll(
                "button, input, meter, output, progress, select, textarea",
              ),
            ).filter((c) => c.matches(n))[0];
          return { content: s, formControl: u };
        });
  }
  function mp(e) {
    if (e == null)
      throw new Error(
        "It looks like " +
          e +
          " was passed instead of a matcher. Did you do something like getByText(" +
          e +
          ")?",
      );
  }
  function qt(e, t, r, n) {
    if (typeof e != "string") return !1;
    mp(r);
    const o = n(e);
    return typeof r == "string" || typeof r == "number"
      ? o.toLowerCase().includes(r.toString().toLowerCase())
      : typeof r == "function"
        ? r(o, t)
        : yp(r, o);
  }
  function be(e, t, r, n) {
    if (typeof e != "string") return !1;
    mp(r);
    const o = n(e);
    return r instanceof Function
      ? r(o, t)
      : r instanceof RegExp
        ? yp(r, o)
        : o === String(r);
  }
  function bp(e) {
    let { trim: t = !0, collapseWhitespace: r = !0 } = e === void 0 ? {} : e;
    return (n) => {
      let o = n;
      return (o = t ? o.trim() : o), (o = r ? o.replace(/\s+/g, " ") : o), o;
    };
  }
  function tt(e) {
    let { trim: t, collapseWhitespace: r, normalizer: n } = e;
    if (!n) return bp({ trim: t, collapseWhitespace: r });
    if (typeof t < "u" || typeof r < "u")
      throw new Error(
        'trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer',
      );
    return n;
  }
  function yp(e, t) {
    const r = e.test(t);
    return (
      e.global &&
        e.lastIndex !== 0 &&
        (console.warn(
          "To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.",
        ),
        (e.lastIndex = 0)),
      r
    );
  }
  function ai(e) {
    return e.matches(
      "input[type=submit], input[type=button], input[type=reset]",
    )
      ? e.value
      : Array.from(e.childNodes)
          .filter((t) => t.nodeType === cp && !!t.textContent)
          .map((t) => t.textContent)
          .join("");
  }
  const kT = NT(rp);
  function hp(e) {
    return (
      e.hidden === !0 ||
      e.getAttribute("aria-hidden") === "true" ||
      e.ownerDocument.defaultView.getComputedStyle(e).display === "none"
    );
  }
  function ms(e, t) {
    t === void 0 && (t = {});
    const { isSubtreeInaccessible: r = hp } = t;
    if (e.ownerDocument.defaultView.getComputedStyle(e).visibility === "hidden")
      return !0;
    let o = e;
    for (; o; ) {
      if (r(o)) return !0;
      o = o.parentElement;
    }
    return !1;
  }
  function bs(e) {
    for (const { match: t, roles: r } of kT) if (t(e)) return [...r];
    return [];
  }
  function NT(e) {
    function t(i) {
      let { name: s, attributes: l } = i;
      return (
        "" +
        s +
        l
          .map((u) => {
            let { name: c, value: d, constraints: f = [] } = u;
            return f.indexOf("undefined") !== -1
              ? ":not([" + c + "])"
              : d
                ? "[" + c + '="' + d + '"]'
                : "[" + c + "]";
          })
          .join("")
      );
    }
    function r(i) {
      let { attributes: s = [] } = i;
      return s.length;
    }
    function n(i, s) {
      let { specificity: l } = i,
        { specificity: u } = s;
      return u - l;
    }
    function o(i) {
      let { attributes: s = [] } = i;
      const l = s.findIndex(
        (c) => c.value && c.name === "type" && c.value === "text",
      );
      l >= 0 && (s = [...s.slice(0, l), ...s.slice(l + 1)]);
      const u = t({ ...i, attributes: s });
      return (c) => (l >= 0 && c.type !== "text" ? !1 : c.matches(u));
    }
    let a = [];
    for (const [i, s] of e.entries())
      a = [...a, { match: o(i), roles: Array.from(s), specificity: r(i) }];
    return a.sort(n);
  }
  function BT(e, t) {
    let { hidden: r = !1 } = t === void 0 ? {} : t;
    function n(o) {
      return [
        o,
        ...Array.from(o.children).reduce((a, i) => [...a, ...n(i)], []),
      ];
    }
    return n(e)
      .filter((o) => (r === !1 ? ms(o) === !1 : !0))
      .reduce((o, a) => {
        let i = [];
        return (
          a.hasAttribute("role")
            ? (i = a.getAttribute("role").split(" ").slice(0, 1))
            : (i = bs(a)),
          i.reduce(
            (s, l) =>
              Array.isArray(s[l])
                ? { ...s, [l]: [...s[l], a] }
                : { ...s, [l]: [a] },
            o,
          )
        );
      }, {});
  }
  function LT(e, t) {
    let { hidden: r, includeDescription: n } = t;
    const o = BT(e, { hidden: r });
    return Object.entries(o)
      .filter((a) => {
        let [i] = a;
        return i !== "generic";
      })
      .map((a) => {
        let [i, s] = a;
        const l = "-".repeat(50),
          u = s.map((c) => {
            const d =
                'Name "' +
                zl(c, {
                  computedStyleSupportsPseudoElements:
                    $().computedStyleSupportsPseudoElements,
                }) +
                `":
`,
              f = sn(c.cloneNode(!1));
            if (n) {
              const m =
                'Description "' +
                zd(c, {
                  computedStyleSupportsPseudoElements:
                    $().computedStyleSupportsPseudoElements,
                }) +
                `":
`;
              return "" + d + m + f;
            }
            return "" + d + f;
          }).join(`

`);
        return (
          i +
          `:

` +
          u +
          `

` +
          l
        );
      }).join(`
`);
  }
  function jT(e) {
    return e.tagName === "OPTION" ? e.selected : mr(e, "aria-selected");
  }
  function DT(e) {
    return e.getAttribute("aria-busy") === "true";
  }
  function FT(e) {
    if (!("indeterminate" in e && e.indeterminate))
      return "checked" in e ? e.checked : mr(e, "aria-checked");
  }
  function UT(e) {
    return mr(e, "aria-pressed");
  }
  function HT(e) {
    var t, r;
    return (t =
      (r = mr(e, "aria-current")) != null
        ? r
        : e.getAttribute("aria-current")) != null
      ? t
      : !1;
  }
  function WT(e) {
    return mr(e, "aria-expanded");
  }
  function mr(e, t) {
    const r = e.getAttribute(t);
    if (r === "true") return !0;
    if (r === "false") return !1;
  }
  function VT(e) {
    const t = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };
    return (
      (e.getAttribute("aria-level") && Number(e.getAttribute("aria-level"))) ||
      t[e.tagName]
    );
  }
  function zT(e) {
    const t = e.getAttribute("aria-valuenow");
    return t === null ? void 0 : +t;
  }
  function KT(e) {
    const t = e.getAttribute("aria-valuemax");
    return t === null ? void 0 : +t;
  }
  function GT(e) {
    const t = e.getAttribute("aria-valuemin");
    return t === null ? void 0 : +t;
  }
  function XT(e) {
    const t = e.getAttribute("aria-valuetext");
    return t === null ? void 0 : t;
  }
  const pc = bp();
  function JT(e) {
    return e.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }
  function vc(e) {
    return new RegExp(JT(e.toLowerCase()), "i");
  }
  function Ee(e, t, r, n) {
    let { variant: o, name: a } = n,
      i = "";
    const s = {},
      l = [["Role", "TestId"].includes(e) ? r : vc(r)];
    a && (s.name = vc(a)),
      e === "Role" &&
        ms(t) &&
        ((s.hidden = !0),
        (i = `Element is inaccessible. This means that the element and all its children are invisible to screen readers.
    If you are using the aria-hidden prop, make sure this is the right choice for your case.
    `)),
      Object.keys(s).length > 0 && l.push(s);
    const u = o + "By" + e;
    return {
      queryName: e,
      queryMethod: u,
      queryArgs: l,
      variant: o,
      warning: i,
      toString() {
        i && console.warn(i);
        let [c, d] = l;
        return (
          (c = typeof c == "string" ? "'" + c + "'" : c),
          (d = d
            ? ", { " +
              Object.entries(d)
                .map((f) => {
                  let [m, P] = f;
                  return m + ": " + P;
                })
                .join(", ") +
              " }"
            : ""),
          u + "(" + c + d + ")"
        );
      },
    };
  }
  function we(e, t, r) {
    return r && (!t || t.toLowerCase() === e.toLowerCase());
  }
  function _l(e, t, r) {
    var n, o;
    if ((t === void 0 && (t = "get"), e.matches($().defaultIgnore))) return;
    const a =
      (n = e.getAttribute("role")) != null
        ? n
        : (o = bs(e)) == null
          ? void 0
          : o[0];
    if (a !== "generic" && we("Role", r, a))
      return Ee("Role", e, a, {
        variant: t,
        name: zl(e, {
          computedStyleSupportsPseudoElements:
            $().computedStyleSupportsPseudoElements,
        }),
      });
    const i = vp(document, e)
      .map((f) => f.content)
      .join(" ");
    if (we("LabelText", r, i)) return Ee("LabelText", e, i, { variant: t });
    const s = e.getAttribute("placeholder");
    if (we("PlaceholderText", r, s))
      return Ee("PlaceholderText", e, s, { variant: t });
    const l = pc(ai(e));
    if (we("Text", r, l)) return Ee("Text", e, l, { variant: t });
    if (we("DisplayValue", r, e.value))
      return Ee("DisplayValue", e, pc(e.value), { variant: t });
    const u = e.getAttribute("alt");
    if (we("AltText", r, u)) return Ee("AltText", e, u, { variant: t });
    const c = e.getAttribute("title");
    if (we("Title", r, c)) return Ee("Title", e, c, { variant: t });
    const d = e.getAttribute($().testIdAttribute);
    if (we("TestId", r, d)) return Ee("TestId", e, d, { variant: t });
  }
  function Rr(e, t) {
    e.stack = t.stack.replace(t.message, e.message);
  }
  function YT(e, t) {
    let {
      container: r = vs(),
      timeout: n = $().asyncUtilTimeout,
      showOriginalStackTrace: o = $().showOriginalStackTrace,
      stackTraceError: a,
      interval: i = 50,
      onTimeout: s = (u) => (
        Object.defineProperty(u, "message", {
          value: $().getElementError(u.message, r).message,
        }),
        u
      ),
      mutationObserverOptions: l = {
        subtree: !0,
        childList: !0,
        attributes: !0,
        characterData: !0,
      },
    } = t;
    if (typeof e != "function")
      throw new TypeError("Received `callback` arg must be a function");
    return new Promise(async (u, c) => {
      let d,
        f,
        m,
        P = !1,
        w = "idle";
      const _ = setTimeout(h, n),
        v = Hi();
      if (v) {
        const { unstable_advanceTimersWrapper: p } = $();
        for (R(); !P; ) {
          if (!Hi()) {
            const y = new Error(
              "Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830",
            );
            o || Rr(y, a), c(y);
            return;
          }
          if (
            (await p(async () => {
              jest.advanceTimersByTime(i);
            }),
            P)
          )
            break;
          R();
        }
      } else {
        try {
          ge(r);
        } catch (y) {
          c(y);
          return;
        }
        f = setInterval(b, i);
        const { MutationObserver: p } = dp(r);
        (m = new p(b)), m.observe(r, l), R();
      }
      function C(p, y) {
        (P = !0),
          clearTimeout(_),
          v || (clearInterval(f), m.disconnect()),
          p ? c(p) : u(y);
      }
      function b() {
        if (Hi()) {
          const p = new Error(
            "Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830",
          );
          return o || Rr(p, a), c(p);
        } else return R();
      }
      function R() {
        if (w !== "pending")
          try {
            const p = AT(e);
            typeof (p == null ? void 0 : p.then) == "function"
              ? ((w = "pending"),
                p.then(
                  (y) => {
                    (w = "resolved"), C(null, y);
                  },
                  (y) => {
                    (w = "rejected"), (d = y);
                  },
                ))
              : C(null, p);
          } catch (p) {
            d = p;
          }
      }
      function h() {
        let p;
        d
          ? ((p = d), !o && p.name === "TestingLibraryElementError" && Rr(p, a))
          : ((p = new Error("Timed out in waitFor.")), o || Rr(p, a)),
          C(s(p), null);
      }
    });
  }
  function QT(e, t) {
    const r = new Error("STACK_TRACE_MESSAGE");
    return $().asyncWrapper(() => YT(e, { stackTraceError: r, ...t }));
  }
  function gp(e, t) {
    return $().getElementError(e, t);
  }
  function ZT(e, t) {
    return gp(
      e +
        "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).",
      t,
    );
  }
  function ii(e, t, r, n) {
    let {
      exact: o = !0,
      collapseWhitespace: a,
      trim: i,
      normalizer: s,
    } = n === void 0 ? {} : n;
    const l = o ? be : qt,
      u = tt({ collapseWhitespace: a, trim: i, normalizer: s });
    return Array.from(t.querySelectorAll("[" + e + "]")).filter((c) =>
      l(c.getAttribute(e), c, r, u),
    );
  }
  function cn(e, t) {
    return function (r) {
      for (
        var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), a = 1;
        a < n;
        a++
      )
        o[a - 1] = arguments[a];
      const i = e(r, ...o);
      if (i.length > 1) {
        const s = i.map((l) => gp(null, l).message).join(`

`);
        throw ZT(
          t(r, ...o) +
            `

Here are the matching elements:

` +
            s,
          r,
        );
      }
      return i[0] || null;
    };
  }
  function Ep(e, t) {
    return $().getElementError(
      `A better query is available, try this:
` +
        e.toString() +
        `
`,
      t,
    );
  }
  function e$(e, t) {
    return function (r) {
      for (
        var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), a = 1;
        a < n;
        a++
      )
        o[a - 1] = arguments[a];
      const i = e(r, ...o);
      if (!i.length) throw $().getElementError(t(r, ...o), r);
      return i;
    };
  }
  function dn(e) {
    return (t, r, n, o) => QT(() => e(t, r, n), { container: t, ...o });
  }
  const bt = (e, t, r) =>
      function (n) {
        for (
          var o = arguments.length, a = new Array(o > 1 ? o - 1 : 0), i = 1;
          i < o;
          i++
        )
          a[i - 1] = arguments[i];
        const s = e(n, ...a),
          [{ suggest: l = $().throwSuggestions } = {}] = a.slice(-1);
        if (s && l) {
          const u = _l(s, r);
          if (u && !t.endsWith(u.queryName)) throw Ep(u.toString(), n);
        }
        return s;
      },
    J = (e, t, r) =>
      function (n) {
        for (
          var o = arguments.length, a = new Array(o > 1 ? o - 1 : 0), i = 1;
          i < o;
          i++
        )
          a[i - 1] = arguments[i];
        const s = e(n, ...a),
          [{ suggest: l = $().throwSuggestions } = {}] = a.slice(-1);
        if (s.length && l) {
          const u = [
            ...new Set(
              s.map((c) => {
                var d;
                return (d = _l(c, r)) == null ? void 0 : d.toString();
              }),
            ),
          ];
          if (u.length === 1 && !t.endsWith(_l(s[0], r).queryName))
            throw Ep(u[0], n);
        }
        return s;
      };
  function rt(e, t, r) {
    const n = bt(cn(e, t), e.name, "query"),
      o = e$(e, r),
      a = cn(o, t),
      i = bt(a, e.name, "get"),
      s = J(o, e.name.replace("query", "get"), "getAll"),
      l = dn(J(o, e.name, "findAll")),
      u = dn(bt(a, e.name, "find"));
    return [n, s, i, l, u];
  }
  function t$(e) {
    return Array.from(e.querySelectorAll("label,input"))
      .map((t) => ({ node: t, textToMatch: Rl(t) }))
      .filter((t) => {
        let { textToMatch: r } = t;
        return r !== null;
      });
  }
  const r$ = function (e, t, r) {
      let {
        exact: n = !0,
        trim: o,
        collapseWhitespace: a,
        normalizer: i,
      } = r === void 0 ? {} : r;
      const s = n ? be : qt,
        l = tt({ collapseWhitespace: a, trim: o, normalizer: i });
      return t$(e)
        .filter((c) => {
          let { node: d, textToMatch: f } = c;
          return s(f, d, t, l);
        })
        .map((c) => {
          let { node: d } = c;
          return d;
        });
    },
    er = function (e, t, r) {
      let {
        selector: n = "*",
        exact: o = !0,
        collapseWhitespace: a,
        trim: i,
        normalizer: s,
      } = r === void 0 ? {} : r;
      ge(e);
      const l = o ? be : qt,
        u = tt({ collapseWhitespace: a, trim: i, normalizer: s }),
        c = Array.from(e.querySelectorAll("*"))
          .filter((d) => pp(d).length || d.hasAttribute("aria-labelledby"))
          .reduce((d, f) => {
            const m = vp(e, f, { selector: n });
            m.filter((w) => !!w.formControl).forEach((w) => {
              l(w.content, w.formControl, t, u) &&
                w.formControl &&
                d.push(w.formControl);
            });
            const P = m.filter((w) => !!w.content).map((w) => w.content);
            return (
              l(P.join(" "), f, t, u) && d.push(f),
              P.length > 1 &&
                P.forEach((w, _) => {
                  l(w, f, t, u) && d.push(f);
                  const v = [...P];
                  v.splice(_, 1),
                    v.length > 1 && l(v.join(" "), f, t, u) && d.push(f);
                }),
              d
            );
          }, [])
          .concat(ii("aria-label", e, t, { exact: o, normalizer: u }));
      return Array.from(new Set(c)).filter((d) => d.matches(n));
    },
    Je = function (e, t) {
      for (
        var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), o = 2;
        o < r;
        o++
      )
        n[o - 2] = arguments[o];
      const a = er(e, t, ...n);
      if (!a.length) {
        const i = r$(e, t, ...n);
        if (i.length) {
          const s = i.map((l) => n$(e, l)).filter((l) => !!l);
          throw s.length
            ? $().getElementError(
                s.map(
                  (l) =>
                    "Found a label with the text of: " +
                    t +
                    ", however the element associated with this label (<" +
                    l +
                    " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" +
                    l +
                    " />, you can use aria-label or aria-labelledby instead.",
                ).join(`

`),
                e,
              )
            : $().getElementError(
                "Found a label with the text of: " +
                  t +
                  `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`,
                e,
              );
        } else
          throw $().getElementError(
            "Unable to find a label with the text of: " + t,
            e,
          );
      }
      return a;
    };
  function n$(e, t) {
    const r = t.getAttribute("for");
    if (!r) return null;
    const n = e.querySelector('[id="' + r + '"]');
    return n ? n.tagName.toLowerCase() : null;
  }
  const wp = (e, t) => "Found multiple elements with the text of: " + t,
    o$ = bt(cn(er, wp), er.name, "query"),
    Cp = cn(Je, wp),
    a$ = dn(J(Je, Je.name, "findAll")),
    i$ = dn(bt(Cp, Je.name, "find")),
    l$ = J(Je, Je.name, "getAll"),
    s$ = bt(Cp, Je.name, "get"),
    u$ = J(er, er.name, "queryAll"),
    Sl = function () {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return ge(t[0]), ii("placeholder", ...t);
    },
    c$ = (e, t) => "Found multiple elements with the placeholder text of: " + t,
    d$ = (e, t) =>
      "Unable to find an element with the placeholder text of: " + t,
    f$ = J(Sl, Sl.name, "queryAll"),
    [p$, v$, m$, b$, y$] = rt(Sl, c$, d$),
    Ol = function (e, t, r) {
      let {
        selector: n = "*",
        exact: o = !0,
        collapseWhitespace: a,
        trim: i,
        ignore: s = $().defaultIgnore,
        normalizer: l,
      } = r === void 0 ? {} : r;
      ge(e);
      const u = o ? be : qt,
        c = tt({ collapseWhitespace: a, trim: i, normalizer: l });
      let d = [];
      return (
        typeof e.matches == "function" && e.matches(n) && (d = [e]),
        [...d, ...Array.from(e.querySelectorAll(n))]
          .filter((f) => !s || !f.matches(s))
          .filter((f) => u(ai(f), f, t, c))
      );
    },
    h$ = (e, t) => "Found multiple elements with the text: " + t,
    g$ = function (e, t, r) {
      r === void 0 && (r = {});
      const { collapseWhitespace: n, trim: o, normalizer: a, selector: i } = r,
        l = tt({ collapseWhitespace: n, trim: o, normalizer: a })(t.toString()),
        u = l !== t.toString(),
        c = (i ?? "*") !== "*";
      return (
        "Unable to find an element with the text: " +
        (u ? l + " (normalized from '" + t + "')" : t) +
        (c ? ", which matches selector '" + i + "'" : "") +
        ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible."
      );
    },
    E$ = J(Ol, Ol.name, "queryAll"),
    [w$, C$, P$, R$, _$] = rt(Ol, h$, g$),
    xl = function (e, t, r) {
      let {
        exact: n = !0,
        collapseWhitespace: o,
        trim: a,
        normalizer: i,
      } = r === void 0 ? {} : r;
      ge(e);
      const s = n ? be : qt,
        l = tt({ collapseWhitespace: o, trim: a, normalizer: i });
      return Array.from(e.querySelectorAll("input,textarea,select")).filter(
        (u) =>
          u.tagName === "SELECT"
            ? Array.from(u.options)
                .filter((d) => d.selected)
                .some((d) => s(ai(d), d, t, l))
            : s(u.value, u, t, l),
      );
    },
    S$ = (e, t) => "Found multiple elements with the display value: " + t + ".",
    O$ = (e, t) =>
      "Unable to find an element with the display value: " + t + ".",
    x$ = J(xl, xl.name, "queryAll"),
    [T$, $$, q$, A$, M$] = rt(xl, S$, O$),
    I$ = /^(img|input|area|.+-.+)$/i,
    Tl = function (e, t, r) {
      return (
        r === void 0 && (r = {}),
        ge(e),
        ii("alt", e, t, r).filter((n) => I$.test(n.tagName))
      );
    },
    k$ = (e, t) => "Found multiple elements with the alt text: " + t,
    N$ = (e, t) => "Unable to find an element with the alt text: " + t,
    B$ = J(Tl, Tl.name, "queryAll"),
    [L$, j$, D$, F$, U$] = rt(Tl, k$, N$),
    H$ = (e) => {
      var t;
      return (
        e.tagName.toLowerCase() === "title" &&
        ((t = e.parentElement) == null ? void 0 : t.tagName.toLowerCase()) ===
          "svg"
      );
    },
    $l = function (e, t, r) {
      let {
        exact: n = !0,
        collapseWhitespace: o,
        trim: a,
        normalizer: i,
      } = r === void 0 ? {} : r;
      ge(e);
      const s = n ? be : qt,
        l = tt({ collapseWhitespace: o, trim: a, normalizer: i });
      return Array.from(e.querySelectorAll("[title], svg > title")).filter(
        (u) =>
          s(u.getAttribute("title"), u, t, l) || (H$(u) && s(ai(u), u, t, l)),
      );
    },
    W$ = (e, t) => "Found multiple elements with the title: " + t + ".",
    V$ = (e, t) => "Unable to find an element with the title: " + t + ".",
    z$ = J($l, $l.name, "queryAll"),
    [K$, G$, X$, J$, Y$] = rt($l, W$, V$),
    ql = function (e, t, r) {
      let {
        hidden: n = $().defaultHidden,
        name: o,
        description: a,
        queryFallbacks: i = !1,
        selected: s,
        busy: l,
        checked: u,
        pressed: c,
        current: d,
        level: f,
        expanded: m,
        value: { now: P, min: w, max: _, text: v } = {},
      } = r === void 0 ? {} : r;
      if ((ge(e), s !== void 0)) {
        var C;
        if (
          ((C = ee.get(t)) == null ? void 0 : C.props["aria-selected"]) ===
          void 0
        )
          throw new Error(
            '"aria-selected" is not supported on role "' + t + '".',
          );
      }
      if (l !== void 0) {
        var b;
        if (
          ((b = ee.get(t)) == null ? void 0 : b.props["aria-busy"]) === void 0
        )
          throw new Error('"aria-busy" is not supported on role "' + t + '".');
      }
      if (u !== void 0) {
        var R;
        if (
          ((R = ee.get(t)) == null ? void 0 : R.props["aria-checked"]) ===
          void 0
        )
          throw new Error(
            '"aria-checked" is not supported on role "' + t + '".',
          );
      }
      if (c !== void 0) {
        var h;
        if (
          ((h = ee.get(t)) == null ? void 0 : h.props["aria-pressed"]) ===
          void 0
        )
          throw new Error(
            '"aria-pressed" is not supported on role "' + t + '".',
          );
      }
      if (d !== void 0) {
        var p;
        if (
          ((p = ee.get(t)) == null ? void 0 : p.props["aria-current"]) ===
          void 0
        )
          throw new Error(
            '"aria-current" is not supported on role "' + t + '".',
          );
      }
      if (f !== void 0 && t !== "heading")
        throw new Error('Role "' + t + '" cannot have "level" property.');
      if (P !== void 0) {
        var y;
        if (
          ((y = ee.get(t)) == null ? void 0 : y.props["aria-valuenow"]) ===
          void 0
        )
          throw new Error(
            '"aria-valuenow" is not supported on role "' + t + '".',
          );
      }
      if (_ !== void 0) {
        var E;
        if (
          ((E = ee.get(t)) == null ? void 0 : E.props["aria-valuemax"]) ===
          void 0
        )
          throw new Error(
            '"aria-valuemax" is not supported on role "' + t + '".',
          );
      }
      if (w !== void 0) {
        var I;
        if (
          ((I = ee.get(t)) == null ? void 0 : I.props["aria-valuemin"]) ===
          void 0
        )
          throw new Error(
            '"aria-valuemin" is not supported on role "' + t + '".',
          );
      }
      if (v !== void 0) {
        var V;
        if (
          ((V = ee.get(t)) == null ? void 0 : V.props["aria-valuetext"]) ===
          void 0
        )
          throw new Error(
            '"aria-valuetext" is not supported on role "' + t + '".',
          );
      }
      if (m !== void 0) {
        var L;
        if (
          ((L = ee.get(t)) == null ? void 0 : L.props["aria-expanded"]) ===
          void 0
        )
          throw new Error(
            '"aria-expanded" is not supported on role "' + t + '".',
          );
      }
      const z = new WeakMap();
      function K(S) {
        return z.has(S) || z.set(S, hp(S)), z.get(S);
      }
      return Array.from(e.querySelectorAll(Q$(t)))
        .filter((S) => {
          if (S.hasAttribute("role")) {
            const fe = S.getAttribute("role");
            if (i)
              return fe
                .split(" ")
                .filter(Boolean)
                .some((Wp) => Wp === t);
            const [Mt] = fe.split(" ");
            return Mt === t;
          }
          return bs(S).some((fe) => fe === t);
        })
        .filter((S) => {
          if (s !== void 0) return s === jT(S);
          if (l !== void 0) return l === DT(S);
          if (u !== void 0) return u === FT(S);
          if (c !== void 0) return c === UT(S);
          if (d !== void 0) return d === HT(S);
          if (m !== void 0) return m === WT(S);
          if (f !== void 0) return f === VT(S);
          if (P !== void 0 || _ !== void 0 || w !== void 0 || v !== void 0) {
            let D = !0;
            if (
              (P !== void 0 && D && (D = P === zT(S)),
              _ !== void 0 && D && (D = _ === KT(S)),
              w !== void 0 && D && (D = w === GT(S)),
              v !== void 0)
            ) {
              var q;
              D && (D = be((q = XT(S)) != null ? q : null, S, v, (fe) => fe));
            }
            return D;
          }
          return !0;
        })
        .filter((S) =>
          o === void 0
            ? !0
            : be(
                zl(S, {
                  computedStyleSupportsPseudoElements:
                    $().computedStyleSupportsPseudoElements,
                }),
                S,
                o,
                (q) => q,
              ),
        )
        .filter((S) =>
          a === void 0
            ? !0
            : be(
                zd(S, {
                  computedStyleSupportsPseudoElements:
                    $().computedStyleSupportsPseudoElements,
                }),
                S,
                a,
                (q) => q,
              ),
        )
        .filter((S) =>
          n === !1 ? ms(S, { isSubtreeInaccessible: K }) === !1 : !0,
        );
    };
  function Q$(e) {
    var t;
    const r = '*[role~="' + e + '"]',
      n = (t = np.get(e)) != null ? t : new Set(),
      o = new Set(
        Array.from(n).map((a) => {
          let { name: i } = a;
          return i;
        }),
      );
    return [r].concat(Array.from(o)).join(",");
  }
  const Pp = (e) => {
      let t = "";
      return (
        e === void 0
          ? (t = "")
          : typeof e == "string"
            ? (t = ' and name "' + e + '"')
            : (t = " and name `" + e + "`"),
        t
      );
    },
    Z$ = function (e, t, r) {
      let { name: n } = r === void 0 ? {} : r;
      return 'Found multiple elements with the role "' + t + '"' + Pp(n);
    },
    eq = function (e, t, r) {
      let {
        hidden: n = $().defaultHidden,
        name: o,
        description: a,
      } = r === void 0 ? {} : r;
      if ($()._disableExpensiveErrorDiagnostics)
        return 'Unable to find role="' + t + '"' + Pp(o);
      let i = "";
      Array.from(e.children).forEach((c) => {
        i += LT(c, { hidden: n, includeDescription: a !== void 0 });
      });
      let s;
      i.length === 0
        ? n === !1
          ? (s =
              "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole")
          : (s = "There are no available roles.")
        : (s = (
            `
Here are the ` +
            (n === !1 ? "accessible" : "available") +
            ` roles:

  ` +
            i
              .replace(
                /\n/g,
                `
  `,
              )
              .replace(
                /\n\s\s\n/g,
                `

`,
              ) +
            `
`
          ).trim());
      let l = "";
      o === void 0
        ? (l = "")
        : typeof o == "string"
          ? (l = ' and name "' + o + '"')
          : (l = " and name `" + o + "`");
      let u = "";
      return (
        a === void 0
          ? (u = "")
          : typeof a == "string"
            ? (u = ' and description "' + a + '"')
            : (u = " and description `" + a + "`"),
        (
          `
Unable to find an ` +
          (n === !1 ? "accessible " : "") +
          'element with the role "' +
          t +
          '"' +
          l +
          u +
          `

` +
          s
        ).trim()
      );
    },
    tq = J(ql, ql.name, "queryAll"),
    [rq, nq, oq, aq, iq] = rt(ql, Z$, eq),
    ys = () => $().testIdAttribute,
    Al = function () {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return ge(t[0]), ii(ys(), ...t);
    },
    lq = (e, t) => "Found multiple elements by: [" + ys() + '="' + t + '"]',
    sq = (e, t) => "Unable to find an element by: [" + ys() + '="' + t + '"]',
    uq = J(Al, Al.name, "queryAll"),
    [cq, dq, fq, pq, vq] = rt(Al, lq, sq);
  var Ml = Object.freeze({
    __proto__: null,
    queryAllByLabelText: u$,
    queryByLabelText: o$,
    getAllByLabelText: l$,
    getByLabelText: s$,
    findAllByLabelText: a$,
    findByLabelText: i$,
    queryByPlaceholderText: p$,
    queryAllByPlaceholderText: f$,
    getByPlaceholderText: m$,
    getAllByPlaceholderText: v$,
    findAllByPlaceholderText: b$,
    findByPlaceholderText: y$,
    queryByText: w$,
    queryAllByText: E$,
    getByText: P$,
    getAllByText: C$,
    findAllByText: R$,
    findByText: _$,
    queryByDisplayValue: T$,
    queryAllByDisplayValue: x$,
    getByDisplayValue: q$,
    getAllByDisplayValue: $$,
    findAllByDisplayValue: A$,
    findByDisplayValue: M$,
    queryByAltText: L$,
    queryAllByAltText: B$,
    getByAltText: D$,
    getAllByAltText: j$,
    findAllByAltText: F$,
    findByAltText: U$,
    queryByTitle: K$,
    queryAllByTitle: z$,
    getByTitle: X$,
    getAllByTitle: G$,
    findAllByTitle: J$,
    findByTitle: Y$,
    queryByRole: rq,
    queryAllByRole: tq,
    getAllByRole: nq,
    getByRole: oq,
    findAllByRole: aq,
    findByRole: iq,
    queryByTestId: cq,
    queryAllByTestId: uq,
    getByTestId: fq,
    getAllByTestId: dq,
    findAllByTestId: pq,
    findByTestId: vq,
  });
  function mq(e, t, r) {
    return (
      t === void 0 && (t = Ml),
      r === void 0 && (r = {}),
      Object.keys(t).reduce((n, o) => {
        const a = t[o];
        return (n[o] = a.bind(null, e)), n;
      }, r)
    );
  }
  const mc = {
      copy: {
        EventType: "ClipboardEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      cut: {
        EventType: "ClipboardEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      paste: {
        EventType: "ClipboardEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      compositionEnd: {
        EventType: "CompositionEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      compositionStart: {
        EventType: "CompositionEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      compositionUpdate: {
        EventType: "CompositionEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      keyDown: {
        EventType: "KeyboardEvent",
        defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 },
      },
      keyPress: {
        EventType: "KeyboardEvent",
        defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 },
      },
      keyUp: {
        EventType: "KeyboardEvent",
        defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 },
      },
      focus: {
        EventType: "FocusEvent",
        defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
      },
      blur: {
        EventType: "FocusEvent",
        defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
      },
      focusIn: {
        EventType: "FocusEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      focusOut: {
        EventType: "FocusEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      change: {
        EventType: "Event",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      input: {
        EventType: "InputEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      invalid: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !0 },
      },
      submit: {
        EventType: "Event",
        defaultInit: { bubbles: !0, cancelable: !0 },
      },
      reset: {
        EventType: "Event",
        defaultInit: { bubbles: !0, cancelable: !0 },
      },
      click: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, button: 0, composed: !0 },
      },
      contextMenu: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      dblClick: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      drag: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      dragEnd: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      dragEnter: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      dragExit: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      dragLeave: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      dragOver: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      dragStart: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      drop: {
        EventType: "DragEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      mouseDown: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      mouseEnter: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
      },
      mouseLeave: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
      },
      mouseMove: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      mouseOut: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      mouseOver: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      mouseUp: {
        EventType: "MouseEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      select: {
        EventType: "Event",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      touchCancel: {
        EventType: "TouchEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      touchEnd: {
        EventType: "TouchEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      touchMove: {
        EventType: "TouchEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      touchStart: {
        EventType: "TouchEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      resize: {
        EventType: "UIEvent",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      scroll: {
        EventType: "UIEvent",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      wheel: {
        EventType: "WheelEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      abort: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      canPlay: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      canPlayThrough: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      durationChange: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      emptied: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      encrypted: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      ended: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      loadedData: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      loadedMetadata: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      loadStart: {
        EventType: "ProgressEvent",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      pause: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      play: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      playing: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      progress: {
        EventType: "ProgressEvent",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      rateChange: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      seeked: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      seeking: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      stalled: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      suspend: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      timeUpdate: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      volumeChange: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      waiting: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      load: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      error: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      animationStart: {
        EventType: "AnimationEvent",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      animationEnd: {
        EventType: "AnimationEvent",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      animationIteration: {
        EventType: "AnimationEvent",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      transitionCancel: {
        EventType: "TransitionEvent",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      transitionEnd: {
        EventType: "TransitionEvent",
        defaultInit: { bubbles: !0, cancelable: !0 },
      },
      transitionRun: {
        EventType: "TransitionEvent",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      transitionStart: {
        EventType: "TransitionEvent",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      pointerOver: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      pointerEnter: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      pointerDown: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      pointerMove: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      pointerUp: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      pointerCancel: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      pointerOut: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
      },
      pointerLeave: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      gotPointerCapture: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      lostPointerCapture: {
        EventType: "PointerEvent",
        defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
      },
      popState: {
        EventType: "PopStateEvent",
        defaultInit: { bubbles: !0, cancelable: !1 },
      },
      offline: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
      online: {
        EventType: "Event",
        defaultInit: { bubbles: !1, cancelable: !1 },
      },
    },
    bc = { doubleClick: "dblClick" };
  function qe(e, t) {
    return $().eventWrapper(() => {
      if (!t)
        throw new Error(
          "Unable to fire an event - please provide an event object.",
        );
      if (!e)
        throw new Error(
          'Unable to fire a "' +
            t.type +
            '" event - please provide a DOM element.',
        );
      return e.dispatchEvent(t);
    });
  }
  function Wi(e, t, r, n) {
    let { EventType: o = "Event", defaultInit: a = {} } = n === void 0 ? {} : n;
    if (!t)
      throw new Error(
        'Unable to fire a "' + e + '" event - please provide a DOM element.',
      );
    const i = { ...a, ...r },
      { target: { value: s, files: l, ...u } = {} } = i;
    s !== void 0 && bq(t, s),
      l !== void 0 &&
        Object.defineProperty(t, "files", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: l,
        }),
      Object.assign(t, u);
    const c = dp(t),
      d = c[o] || c.Event;
    let f;
    if (typeof d == "function") f = new d(e, i);
    else {
      f = c.document.createEvent(o);
      const { bubbles: P, cancelable: w, detail: _, ...v } = i;
      f.initEvent(e, P, w, _),
        Object.keys(v).forEach((C) => {
          f[C] = v[C];
        });
    }
    return (
      ["dataTransfer", "clipboardData"].forEach((P) => {
        const w = i[P];
        typeof w == "object" &&
          (typeof c.DataTransfer == "function"
            ? Object.defineProperty(f, P, {
                value: Object.getOwnPropertyNames(w).reduce(
                  (_, v) => (Object.defineProperty(_, v, { value: w[v] }), _),
                  new c.DataTransfer(),
                ),
              })
            : Object.defineProperty(f, P, { value: w }));
      }),
      f
    );
  }
  Object.keys(mc).forEach((e) => {
    const { EventType: t, defaultInit: r } = mc[e],
      n = e.toLowerCase();
    (Wi[e] = (o, a) => Wi(n, o, a, { EventType: t, defaultInit: r })),
      (qe[e] = (o, a) => qe(o, Wi[e](o, a)));
  });
  function bq(e, t) {
    const { set: r } = Object.getOwnPropertyDescriptor(e, "value") || {},
      n = Object.getPrototypeOf(e),
      { set: o } = Object.getOwnPropertyDescriptor(n, "value") || {};
    if (o && r !== o) o.call(e, t);
    else if (r) r.call(e, t);
    else throw new Error("The given element does not have a value setter");
  }
  Object.keys(bc).forEach((e) => {
    const t = bc[e];
    qe[e] = function () {
      return qe[t](...arguments);
    };
  });
  function yq(e) {
    return e.replace(
      /[ \t]*[\n][ \t]*/g,
      `
`,
    );
  }
  function hq(e) {
    return dT.compressToEncodedURIComponent(yq(e));
  }
  function gq(e) {
    return "https://testing-playground.com/#markup=" + hq(e);
  }
  const Eq = (e, t, r) =>
      Array.isArray(e) ? e.forEach((n) => fc(n, t, r)) : fc(e, t, r),
    wq = function (e) {
      if ((e === void 0 && (e = vs().body), !e || !("innerHTML" in e))) {
        console.log("The element you're providing isn't a valid DOM element.");
        return;
      }
      if (!e.innerHTML) {
        console.log("The provided element doesn't have any children.");
        return;
      }
      const t = gq(e.innerHTML);
      return (
        console.log(
          `Open this URL in your browser

` + t,
        ),
        t
      );
    },
    yc = { debug: Eq, logTestingPlaygroundURL: wq };
  typeof document < "u" && document.body
    ? mq(document.body, Ml, yc)
    : Object.keys(Ml).reduce(
        (e, t) => (
          (e[t] = () => {
            throw new TypeError(
              "For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error",
            );
          }),
          e
        ),
        yc,
      );
  function Rt(e, t) {
    return $().eventWrapper(e);
  }
  function De(e) {
    const t = sv(e, Dl),
      r = mn(e.ownerDocument);
    (t ?? e.ownerDocument.body) !== r &&
      (Rt(t ? () => t.focus() : () => (r == null ? void 0 : r.blur())),
      cv(t ?? e.ownerDocument.body));
  }
  function Cq(e) {
    !Dl(e) || !(mn(e.ownerDocument) === e) || Rt(() => e.blur());
  }
  const Fe = {};
  Fe.click = (e, t, r) => {
    const n = t.closest("button,input,label,select,textarea"),
      o = n && O(n, "label") && n.control;
    if (o)
      return () => {
        Dl(o) && De(o), r.dispatchEvent(o, lv(e));
      };
    if (O(t, "input", { type: "file" }))
      return () => {
        Cq(t), t.dispatchEvent(new (le(t).Event)("fileDialog")), De(t);
      };
  };
  const _t = Symbol("Displayed value in UI"),
    me = Symbol("Displayed selection in UI"),
    fn = Symbol("Initial value to compare on blur");
  function Pq(e) {
    return typeof e == "object" && _t in e;
  }
  function Rq(e) {
    return !!e && typeof e == "object" && me in e;
  }
  function _q(e, t) {
    e[fn] === void 0 && (e[fn] = e.value),
      (e[_t] = t),
      (e.value = Object.assign(new String(t), { [_t]: !0 }));
  }
  function de(e) {
    return e[_t] === void 0 ? e.value : String(e[_t]);
  }
  function hs(e) {
    e[_t] = void 0;
  }
  function Rp(e) {
    e[fn] = void 0;
  }
  function Sq(e) {
    return e[fn];
  }
  function Oq(e, t) {
    e[me] = t;
  }
  function At(e, { focusOffset: t, anchorOffset: r = t }, n = "replace") {
    const o = de(e).length,
      a = (d) => Math.max(0, Math.min(o, d)),
      i = n === "replace" || e[me] === void 0 ? a(r) : e[me].anchorOffset,
      s = a(t),
      l = Math.min(i, s),
      u = Math.max(i, s);
    if (
      ((e[me] = { anchorOffset: i, focusOffset: s }),
      e.selectionStart === l && e.selectionEnd === u)
    )
      return;
    const c = Object.assign(new Number(l), { [me]: !0 });
    try {
      e.setSelectionRange(c, u);
    } catch {}
  }
  function tr(e) {
    var t, r, n;
    const o =
      (n = e[me]) !== null && n !== void 0
        ? n
        : {
            anchorOffset:
              (t = e.selectionStart) !== null && t !== void 0 ? t : 0,
            focusOffset: (r = e.selectionEnd) !== null && r !== void 0 ? r : 0,
          };
    return {
      ...o,
      startOffset: Math.min(o.anchorOffset, o.focusOffset),
      endOffset: Math.max(o.anchorOffset, o.focusOffset),
    };
  }
  function xq(e) {
    return !!e[me];
  }
  function Dr(e) {
    e[me] = void 0;
  }
  const pn = globalThis.parseInt;
  function Tq(e) {
    const t = e.replace(/\D/g, "");
    if (t.length < 2) return e;
    const r = pn(t[0], 10),
      n = pn(t[1], 10);
    if (r >= 3 || (r === 2 && n >= 4)) {
      let o;
      return r >= 3 ? (o = 1) : (o = 2), hc(t, o);
    }
    return e.length === 2 ? e : hc(t, 2);
  }
  function hc(e, t) {
    const r = e.slice(0, t),
      n = Math.min(pn(r, 10), 23),
      o = e.slice(t),
      a = pn(o, 10),
      i = Math.min(a, 59);
    return `${n.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
  }
  function _p(e, t) {
    const r = e.cloneNode();
    return (r.value = t), r.value === t;
  }
  function Sp(e, t, r, n) {
    if (Fr(e) && t + r >= 0 && t + r <= e.nodeValue.length)
      return { node: e, offset: t + r };
    const o = gc(e, t, r);
    if (o) {
      if (Fr(o))
        return {
          node: o,
          offset:
            r > 0
              ? Math.min(1, o.nodeValue.length)
              : Math.max(o.nodeValue.length - 1, 0),
        };
      if (O(o, "br")) {
        const a = gc(o, void 0, r);
        return a
          ? Fr(a)
            ? { node: a, offset: r > 0 ? 0 : a.nodeValue.length }
            : r < 0 && O(a, "br")
              ? { node: o.parentNode, offset: _r(o) }
              : { node: a.parentNode, offset: _r(a) + (r > 0 ? 0 : 1) }
          : r < 0 && n === "deleteContentBackward"
            ? { node: o.parentNode, offset: _r(o) }
            : void 0;
      } else return { node: o.parentNode, offset: _r(o) + (r > 0 ? 1 : 0) };
    }
  }
  function gc(e, t, r) {
    const n = Number(t) + (r < 0 ? -1 : 0);
    return (
      t !== void 0 &&
        gs(e) &&
        n >= 0 &&
        n < e.children.length &&
        (e = e.children[n]),
      qq(e, r === 1 ? "next" : "previous", $q)
    );
  }
  function $q(e) {
    if (Fr(e)) return !0;
    if (gs(e)) {
      if (O(e, ["input", "textarea"])) return e.type !== "hidden";
      if (O(e, "br")) return !0;
    }
    return !1;
  }
  function _r(e) {
    let t = 0;
    for (; e.previousSibling; ) t++, (e = e.previousSibling);
    return t;
  }
  function gs(e) {
    return e.nodeType === 1;
  }
  function Fr(e) {
    return e.nodeType === 3;
  }
  function qq(e, t, r) {
    for (;;) {
      var n;
      const o = e[`${t}Sibling`];
      if (o) {
        if (((e = Aq(o, t === "next" ? "first" : "last")), r(e))) return e;
      } else if (
        e.parentNode &&
        (!gs(e.parentNode) ||
          (!Xe(e.parentNode) &&
            e.parentNode !==
              ((n = e.ownerDocument) === null || n === void 0
                ? void 0
                : n.body)))
      )
        e = e.parentNode;
      else break;
    }
  }
  function Aq(e, t) {
    for (; e.hasChildNodes(); ) e = e[`${t}Child`];
    return e;
  }
  const rr = Symbol("Track programmatic changes for React workaround");
  function Mq(e) {
    return (
      Object.getOwnPropertyNames(e).some((t) => t.startsWith("__react")) &&
      le(e).REACT_VERSION === 17
    );
  }
  function Iq(e) {
    Mq(e) && (e[rr] = { previousValue: String(e.value), tracked: [] });
  }
  function kq(e, t) {
    var r, n;
    (n = e[rr]) === null ||
      n === void 0 ||
      (r = n.tracked) === null ||
      r === void 0 ||
      r.push(t),
      e[rr] || (hs(e), At(e, { focusOffset: t.length }));
  }
  function Nq(e, t) {
    var r;
    const n = e[rr];
    if (
      ((e[rr] = void 0),
      !(!(n == null || (r = n.tracked) === null || r === void 0) && r.length))
    )
      return;
    const o =
      n.tracked.length === 2 &&
      n.tracked[0] === n.previousValue &&
      n.tracked[1] === e.value;
    o || hs(e), xq(e) && At(e, { focusOffset: o ? t : e.value.length });
  }
  function Op(e) {
    const t = Bq(e);
    if (t && se(t)) return { type: "input", selection: tr(t) };
    const r = t == null ? void 0 : t.ownerDocument.getSelection();
    return {
      type:
        Gt(e) && (r == null ? void 0 : r.anchorNode) && Gt(r.anchorNode)
          ? "contenteditable"
          : "default",
      selection: r,
    };
  }
  function Bq(e) {
    return e.nodeType === 1 ? e : e.parentElement;
  }
  function Lq(e) {
    const t = Op(e);
    if (t.type === "input") return t.selection;
    if (t.type === "contenteditable") {
      var r;
      return (r = t.selection) === null || r === void 0
        ? void 0
        : r.getRangeAt(0);
    }
  }
  function Ye({
    focusNode: e,
    focusOffset: t,
    anchorNode: r = e,
    anchorOffset: n = t,
  }) {
    var o, a;
    if (Op(e).type === "input")
      return At(e, { anchorOffset: n, focusOffset: t });
    (a = r.ownerDocument) === null ||
      a === void 0 ||
      (o = a.getSelection()) === null ||
      o === void 0 ||
      o.setBaseAndExtent(r, n, e, t);
  }
  function xp(e) {
    return O(e, "input") && ["date", "time"].includes(e.type);
  }
  function St(e, t, r, n = "insertText") {
    const o = Lq(t);
    o &&
      ((!xp(t) &&
        !e.dispatchUIEvent(t, "beforeinput", { inputType: n, data: r })) ||
        ("startContainer" in o ? jq(e, t, o, r, n) : Dq(e, t, o, r, n)));
  }
  function jq(e, t, r, n, o) {
    let a = !1;
    if (!r.collapsed) (a = !0), r.deleteContents();
    else if (["deleteContentBackward", "deleteContentForward"].includes(o)) {
      const i = Sp(
        r.startContainer,
        r.startOffset,
        o === "deleteContentBackward" ? -1 : 1,
        o,
      );
      if (i) {
        a = !0;
        const s = r.cloneRange();
        s.comparePoint(i.node, i.offset) < 0
          ? s.setStart(i.node, i.offset)
          : s.setEnd(i.node, i.offset),
          s.deleteContents();
      }
    }
    if (n)
      if (r.endContainer.nodeType === 3) {
        const i = r.endOffset;
        r.endContainer.insertData(i, n),
          r.setStart(r.endContainer, i + n.length),
          r.setEnd(r.endContainer, i + n.length);
      } else {
        const i = t.ownerDocument.createTextNode(n);
        r.insertNode(i), r.setStart(i, n.length), r.setEnd(i, n.length);
      }
    (a || n) && e.dispatchUIEvent(t, "input", { inputType: o });
  }
  function Dq(e, t, r, n, o) {
    let a = n;
    if (nv(t)) {
      const u = rv(t);
      if (u !== void 0 && n.length > 0) {
        const c = u - t.value.length;
        if (c > 0) a = n.substring(0, c);
        else return;
      }
    }
    const { newValue: i, newOffset: s, oldValue: l } = Fq(a, t, r, o);
    (i === l && s === r.startOffset && s === r.endOffset) ||
      (O(t, "input", { type: "number" }) && !Uq(i)) ||
      (_q(t, i),
      Ye({ focusNode: t, anchorOffset: s, focusOffset: s }),
      xp(t)
        ? _p(t, i) && (Ec(e, t, s, {}), e.dispatchUIEvent(t, "change"), Rp(t))
        : Ec(e, t, s, { data: n, inputType: o }));
  }
  function Fq(e, t, { startOffset: r, endOffset: n }, o) {
    const a = de(t),
      i = Math.max(0, r === n && o === "deleteContentBackward" ? r - 1 : r),
      s = a.substring(0, i),
      l = Math.min(
        a.length,
        r === n && o === "deleteContentForward" ? r + 1 : n,
      ),
      u = a.substring(l, a.length);
    let c = `${s}${e}${u}`,
      d = i + e.length;
    if (O(t, "input", { type: "time" })) {
      const f = Tq(c);
      f !== "" && _p(t, f) && ((c = f), (d = f.length));
    }
    return { oldValue: a, newValue: c, newOffset: d };
  }
  function Ec(e, t, r, n) {
    e.dispatchUIEvent(t, "input", n), Nq(t, r);
  }
  function Uq(e) {
    var t, r;
    const n = e.split("e", 2);
    return !(
      /[^\d.\-e]/.test(e) ||
      Number((t = e.match(/-/g)) === null || t === void 0 ? void 0 : t.length) >
        2 ||
      Number(
        (r = e.match(/\./g)) === null || r === void 0 ? void 0 : r.length,
      ) > 1 ||
      (n[1] && !/^-?\d*$/.test(n[1]))
    );
  }
  Fe.cut = (e, t, r) => () => {
    gt(t) && St(r, t, "", "deleteByCut");
  };
  function Hq(e) {
    return e ? (Xe(e) ? e.textContent : de(e)) : null;
  }
  function Wq(e) {
    const t = le(e);
    for (let r = e; r != null && r.ownerDocument; r = r.parentElement) {
      const { display: n, visibility: o } = t.getComputedStyle(r);
      if (n === "none" || o === "hidden") return !1;
    }
    return !0;
  }
  function Vq(e, t) {
    const r = e.ownerDocument,
      n = r.querySelectorAll(Vc),
      o = Array.from(n).filter(
        (l) => l === e || !(Number(l.getAttribute("tabindex")) < 0 || ye(l)),
      );
    Number(e.getAttribute("tabindex")) >= 0 &&
      o.sort((l, u) => {
        const c = Number(l.getAttribute("tabindex")),
          d = Number(u.getAttribute("tabindex"));
        return c === d ? 0 : c === 0 ? 1 : d === 0 ? -1 : c - d;
      });
    const a = {};
    let i = [r.body];
    const s = O(e, "input", { type: "radio" }) ? e.name : void 0;
    o.forEach((l) => {
      const u = l;
      if (O(u, "input", { type: "radio" }) && u.name) {
        if (u === e) {
          i.push(u);
          return;
        } else if (u.name === s) return;
        if (u.checked) {
          (i = i.filter(
            (c) => !O(c, "input", { type: "radio", name: u.name }),
          )),
            i.push(u),
            (a[u.name] = u);
          return;
        }
        if (typeof a[u.name] < "u") return;
      }
      i.push(u);
    });
    for (let l = i.findIndex((u) => u === e); ; )
      if (
        ((l += t ? -1 : 1),
        l === i.length ? (l = 0) : l === -1 && (l = i.length - 1),
        i[l] === e || i[l] === r.body || Wq(i[l]))
      )
        return i[l];
  }
  function wc(e, t) {
    if (se(e)) {
      const r = tr(e);
      Ye({
        focusNode: e,
        focusOffset:
          r.startOffset === r.endOffset
            ? r.focusOffset + t
            : t < 0
              ? r.startOffset
              : r.endOffset,
      });
    } else {
      const r = e.ownerDocument.getSelection();
      if (!(r != null && r.focusNode)) return;
      if (r.isCollapsed) {
        const n = Sp(r.focusNode, r.focusOffset, t);
        n && Ye({ focusNode: n.node, focusOffset: n.offset });
      } else r[t < 0 ? "collapseToStart" : "collapseToEnd"]();
    }
  }
  function Tp(e) {
    if (se(e))
      return Ye({ focusNode: e, anchorOffset: 0, focusOffset: de(e).length });
    var t;
    const r = (t = Gt(e)) !== null && t !== void 0 ? t : e.ownerDocument.body;
    Ye({ focusNode: r, anchorOffset: 0, focusOffset: r.childNodes.length });
  }
  function zq(e) {
    if (se(e))
      return tr(e).startOffset === 0 && tr(e).endOffset === de(e).length;
    var t;
    const r = (t = Gt(e)) !== null && t !== void 0 ? t : e.ownerDocument.body,
      n = e.ownerDocument.getSelection();
    return (
      (n == null ? void 0 : n.anchorNode) === r &&
      n.focusNode === r &&
      n.anchorOffset === 0 &&
      n.focusOffset === r.childNodes.length
    );
  }
  function Ft(e, t, r) {
    var n;
    if (se(e)) return Ye({ focusNode: e, anchorOffset: t, focusOffset: r });
    if (
      Xe(e) &&
      ((n = e.firstChild) === null || n === void 0 ? void 0 : n.nodeType) === 3
    )
      return Ye({ focusNode: e.firstChild, anchorOffset: t, focusOffset: r });
    throw new Error(
      "Not implemented. The result of this interaction is unreliable.",
    );
  }
  function Sr(e, t, r) {
    const n = le(t),
      o = Array.from(
        t.ownerDocument.querySelectorAll(
          t.name
            ? `input[type="radio"][name="${n.CSS.escape(t.name)}"]`
            : 'input[type="radio"][name=""], input[type="radio"]:not([name])',
        ),
      );
    for (let a = o.findIndex((i) => i === t) + r; ; a += r) {
      if ((o[a] || (a = r > 0 ? 0 : o.length - 1), o[a] === t)) return;
      ye(o[a]) || (De(o[a]), e.dispatchUIEvent(o[a], "click"));
    }
  }
  Fe.keydown = (e, t, r) => {
    var n, o;
    return (o =
      (n = Cc[e.key]) === null || n === void 0
        ? void 0
        : n.call(Cc, e, t, r)) !== null && o !== void 0
      ? o
      : Kq(e, t, r);
  };
  const Cc = {
      ArrowDown: (e, t, r) => {
        if (O(t, "input", { type: "radio" })) return () => Sr(r, t, -1);
      },
      ArrowLeft: (e, t, r) =>
        O(t, "input", { type: "radio" }) ? () => Sr(r, t, -1) : () => wc(t, -1),
      ArrowRight: (e, t, r) =>
        O(t, "input", { type: "radio" }) ? () => Sr(r, t, 1) : () => wc(t, 1),
      ArrowUp: (e, t, r) => {
        if (O(t, "input", { type: "radio" })) return () => Sr(r, t, 1);
      },
      Backspace: (e, t, r) => {
        if (gt(t))
          return () => {
            St(r, t, "", "deleteContentBackward");
          };
      },
      Delete: (e, t, r) => {
        if (gt(t))
          return () => {
            St(r, t, "", "deleteContentForward");
          };
      },
      End: (e, t) => {
        if (O(t, ["input", "textarea"]) || Xe(t))
          return () => {
            var r, n;
            const o =
              (n = (r = Hq(t)) === null || r === void 0 ? void 0 : r.length) !==
                null && n !== void 0
                ? n
                : 0;
            Ft(t, o, o);
          };
      },
      Home: (e, t) => {
        if (O(t, ["input", "textarea"]) || Xe(t))
          return () => {
            Ft(t, 0, 0);
          };
      },
      PageDown: (e, t) => {
        if (O(t, ["input"]))
          return () => {
            const r = de(t).length;
            Ft(t, r, r);
          };
      },
      PageUp: (e, t) => {
        if (O(t, ["input"]))
          return () => {
            Ft(t, 0, 0);
          };
      },
      Tab: (e, t, r) => () => {
        const n = Vq(t, r.system.keyboard.modifiers.Shift);
        De(n), se(n) && At(n, { anchorOffset: 0, focusOffset: n.value.length });
      },
    },
    Kq = (e, t, r) => {
      if (e.code === "KeyA" && r.system.keyboard.modifiers.Control)
        return () => Tp(t);
    };
  Fe.keypress = (e, t, r) => {
    if (e.key === "Enter") {
      if (
        O(t, "button") ||
        (O(t, "input") && Gq.includes(t.type)) ||
        (O(t, "a") && t.href)
      )
        return () => {
          r.dispatchUIEvent(t, "click");
        };
      if (O(t, "input")) {
        const n = t.form,
          o =
            n == null
              ? void 0
              : n.querySelector(
                  'input[type="submit"], button:not([type]), button[type="submit"]',
                );
        return o
          ? () => r.dispatchUIEvent(o, "click")
          : n && Xq.includes(t.type) && n.querySelectorAll("input").length === 1
            ? () => r.dispatchUIEvent(n, "submit")
            : void 0;
      }
    }
    if (gt(t)) {
      const n =
          e.key === "Enter"
            ? Xe(t) && !r.system.keyboard.modifiers.Shift
              ? "insertParagraph"
              : "insertLineBreak"
            : "insertText",
        o =
          e.key === "Enter"
            ? `
`
            : e.key;
      return () => St(r, t, o, n);
    }
  };
  const Gq = ["button", "color", "file", "image", "reset", "submit"],
    Xq = ["email", "month", "password", "search", "tel", "text", "url", "week"];
  Fe.keyup = (e, t, r) => {
    var n;
    return (n = Pc[e.key]) === null || n === void 0
      ? void 0
      : n.call(Pc, e, t, r);
  };
  const Pc = {
    " ": (e, t, r) => {
      if (Lc(t)) return () => r.dispatchUIEvent(t, "click");
    },
  };
  Fe.paste = (e, t, r) => {
    if (gt(t))
      return () => {
        var n;
        const o =
          (n = e.clipboardData) === null || n === void 0
            ? void 0
            : n.getData("text");
        o && St(r, t, o, "insertFromPaste");
      };
  };
  const $p = {
    auxclick: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    beforeinput: {
      EventType: "InputEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    click: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    contextmenu: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    copy: {
      EventType: "ClipboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    change: {
      EventType: "Event",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    cut: {
      EventType: "ClipboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    dblclick: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    keydown: {
      EventType: "KeyboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    keypress: {
      EventType: "KeyboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    keyup: {
      EventType: "KeyboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    paste: {
      EventType: "ClipboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    input: {
      EventType: "InputEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    mousedown: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseenter: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
    },
    mouseleave: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
    },
    mousemove: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseout: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseover: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseup: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerover: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerenter: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    pointerdown: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointermove: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerup: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointercancel: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    pointerout: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerleave: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    submit: {
      EventType: "Event",
      defaultInit: { bubbles: !0, cancelable: !0 },
    },
  };
  function qp(e) {
    return $p[e].EventType;
  }
  const Jq = ["MouseEvent", "PointerEvent"];
  function Yq(e) {
    return Jq.includes(qp(e));
  }
  function Qq(e) {
    return qp(e) === "KeyboardEvent";
  }
  const Zq = {
    ClipboardEvent: [t1],
    Event: [],
    InputEvent: [Or, r1],
    MouseEvent: [Or, Vi, Rc],
    PointerEvent: [Or, Vi, Rc, o1],
    KeyboardEvent: [Or, Vi, n1],
  };
  function Ap(e, t, r) {
    const n = le(t),
      { EventType: o, defaultInit: a } = $p[e],
      i = new (e1(n)[o])(e, a);
    return Zq[o].forEach((s) => s(i, r ?? {})), i;
  }
  function e1(e) {
    var t;
    const r = (t = e.Event) !== null && t !== void 0 ? t : class {};
    var n;
    const o =
      (n = e.AnimationEvent) !== null && n !== void 0 ? n : class extends r {};
    var a;
    const i =
      (a = e.ClipboardEvent) !== null && a !== void 0 ? a : class extends r {};
    var s;
    const l =
      (s = e.PopStateEvent) !== null && s !== void 0 ? s : class extends r {};
    var u;
    const c =
      (u = e.ProgressEvent) !== null && u !== void 0 ? u : class extends r {};
    var d;
    const f =
      (d = e.TransitionEvent) !== null && d !== void 0 ? d : class extends r {};
    var m;
    const P = (m = e.UIEvent) !== null && m !== void 0 ? m : class extends r {};
    var w;
    const _ =
      (w = e.CompositionEvent) !== null && w !== void 0
        ? w
        : class extends P {};
    var v;
    const C =
      (v = e.FocusEvent) !== null && v !== void 0 ? v : class extends P {};
    var b;
    const R =
      (b = e.InputEvent) !== null && b !== void 0 ? b : class extends P {};
    var h;
    const p =
      (h = e.KeyboardEvent) !== null && h !== void 0 ? h : class extends P {};
    var y;
    const E =
      (y = e.MouseEvent) !== null && y !== void 0 ? y : class extends P {};
    var I;
    const V =
      (I = e.DragEvent) !== null && I !== void 0 ? I : class extends E {};
    var L;
    const z =
      (L = e.PointerEvent) !== null && L !== void 0 ? L : class extends E {};
    var K;
    const S =
      (K = e.TouchEvent) !== null && K !== void 0 ? K : class extends P {};
    return {
      Event: r,
      AnimationEvent: o,
      ClipboardEvent: i,
      PopStateEvent: l,
      ProgressEvent: c,
      TransitionEvent: f,
      UIEvent: P,
      CompositionEvent: _,
      FocusEvent: C,
      InputEvent: R,
      KeyboardEvent: p,
      MouseEvent: E,
      DragEvent: V,
      PointerEvent: z,
      TouchEvent: S,
    };
  }
  function nt(e, t) {
    for (const [r, n] of Object.entries(t))
      Object.defineProperty(e, r, { get: () => n ?? null });
  }
  function B(e) {
    return Number(e ?? 0);
  }
  function t1(e, { clipboardData: t }) {
    nt(e, { clipboardData: t });
  }
  function r1(e, { data: t, inputType: r, isComposing: n }) {
    nt(e, { data: t, isComposing: !!n, inputType: String(r) });
  }
  function Or(e, { view: t, detail: r }) {
    nt(e, { view: t, detail: B(r ?? 0) });
  }
  function Vi(
    e,
    {
      altKey: t,
      ctrlKey: r,
      metaKey: n,
      shiftKey: o,
      modifierAltGraph: a,
      modifierCapsLock: i,
      modifierFn: s,
      modifierFnLock: l,
      modifierNumLock: u,
      modifierScrollLock: c,
      modifierSymbol: d,
      modifierSymbolLock: f,
    },
  ) {
    nt(e, {
      altKey: !!t,
      ctrlKey: !!r,
      metaKey: !!n,
      shiftKey: !!o,
      getModifierState(m) {
        return !!{
          Alt: t,
          AltGraph: a,
          CapsLock: i,
          Control: r,
          Fn: s,
          FnLock: l,
          Meta: n,
          NumLock: u,
          ScrollLock: c,
          Shift: o,
          Symbol: d,
          SymbolLock: f,
        }[m];
      },
    });
  }
  function n1(
    e,
    { key: t, code: r, location: n, repeat: o, isComposing: a, charCode: i },
  ) {
    nt(e, {
      key: String(t),
      code: String(r),
      location: B(n),
      repeat: !!o,
      isComposing: !!a,
      charCode: i,
    });
  }
  function Rc(
    e,
    {
      x: t,
      y: r,
      screenX: n,
      screenY: o,
      clientX: a = t,
      clientY: i = r,
      button: s,
      buttons: l,
      relatedTarget: u,
    },
  ) {
    nt(e, {
      screenX: B(n),
      screenY: B(o),
      clientX: B(a),
      x: B(a),
      clientY: B(i),
      y: B(i),
      button: B(s),
      buttons: B(l),
      relatedTarget: u,
    });
  }
  function o1(
    e,
    {
      pointerId: t,
      width: r,
      height: n,
      pressure: o,
      tangentialPressure: a,
      tiltX: i,
      tiltY: s,
      twist: l,
      pointerType: u,
      isPrimary: c,
    },
  ) {
    nt(e, {
      pointerId: B(t),
      width: B(r),
      height: B(n),
      pressure: B(o),
      tangentialPressure: B(a),
      tiltX: B(i),
      tiltY: B(s),
      twist: B(l),
      pointerType: String(u),
      isPrimary: !!c,
    });
  }
  function a1(e, t, r, n = !1) {
    (Yq(t) || Qq(t)) && (r = { ...r, ...this.system.getUIEventModifiers() });
    const o = Ap(t, e, r);
    return Mp.call(this, e, o, n);
  }
  function Mp(e, t, r = !1) {
    var n;
    const o = t.type,
      a = r
        ? () => {}
        : (n = Fe[o]) === null || n === void 0
          ? void 0
          : n.call(Fe, t, e, this);
    if (a) {
      t.preventDefault();
      let i = !1;
      return (
        Object.defineProperty(t, "defaultPrevented", { get: () => i }),
        Object.defineProperty(t, "preventDefault", {
          value: () => {
            i = t.cancelable;
          },
        }),
        Rt(() => e.dispatchEvent(t)),
        i || a(),
        !i
      );
    }
    return Rt(() => e.dispatchEvent(t));
  }
  function i1(e, t, r) {
    const n = Ap(t, e, r);
    Rt(() => e.dispatchEvent(n));
  }
  const zi = Symbol("Interceptor for programmatical calls");
  function pt(e, t, r) {
    const n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      o = Object.getOwnPropertyDescriptor(e, t),
      a = n != null && n.set ? "set" : "value";
    if (typeof (n == null ? void 0 : n[a]) != "function" || n[a][zi])
      throw new Error(
        `Element ${e.tagName} does not implement "${String(t)}".`,
      );
    function i(...s) {
      const { applyNative: l = !1, realArgs: u, then: c } = r.call(this, ...s),
        d = ((!l && o) || n)[a];
      a === "set" ? d.call(this, u) : d.call(this, ...u), c == null || c();
    }
    (i[zi] = zi), Object.defineProperty(e, t, { ...(o ?? n), [a]: i });
  }
  function l1(e) {
    pt(e, "value", function (r) {
      const n = Pq(r);
      return (
        n && Iq(this),
        {
          applyNative: !!n,
          realArgs: s1(this, r),
          then: n ? void 0 : () => kq(this, String(r)),
        }
      );
    });
  }
  function s1(e, t) {
    return O(e, "input", { type: "number" }) &&
      String(t) !== "" &&
      !Number.isNaN(Number(t))
      ? String(Number(t))
      : String(t);
  }
  function u1(e) {
    pt(e, "setSelectionRange", function (r, ...n) {
      const o = Rq(r);
      return {
        applyNative: !!o,
        realArgs: [Number(r), ...n],
        then: () => (o ? void 0 : Dr(e)),
      };
    }),
      pt(e, "selectionStart", function (r) {
        return { realArgs: r, then: () => Dr(e) };
      }),
      pt(e, "selectionEnd", function (r) {
        return { realArgs: r, then: () => Dr(e) };
      }),
      pt(e, "select", function () {
        return {
          realArgs: [],
          then: () => Oq(e, { anchorOffset: 0, focusOffset: de(e).length }),
        };
      });
  }
  function c1(e) {
    pt(e, "setRangeText", function (...r) {
      return {
        realArgs: r,
        then: () => {
          hs(e), Dr(e);
        },
      };
    });
  }
  const yt = Symbol("Node prepared with document state workarounds");
  function Ip(e) {
    e[yt] ||
      (e.addEventListener(
        "focus",
        (t) => {
          const r = t.target;
          _c(r);
        },
        { capture: !0, passive: !0 },
      ),
      e.activeElement && _c(e.activeElement),
      e.addEventListener(
        "blur",
        (t) => {
          const r = t.target,
            n = Sq(r);
          n !== void 0 && (r.value !== n && i1(r, "change"), Rp(r));
        },
        { capture: !0, passive: !0 },
      ),
      (e[yt] = yt));
  }
  function _c(e) {
    e[yt] ||
      (O(e, ["input", "textarea"]) && (l1(e), u1(e), c1(e)), (e[yt] = yt));
  }
  function d1(e) {
    return f1(e) ? e : e.ownerDocument;
  }
  function f1(e) {
    return e.nodeType === 9;
  }
  function Ot(e) {
    const t = e.delay;
    if (typeof t == "number")
      return Promise.all([
        new Promise((r) => globalThis.setTimeout(() => r(), t)),
        e.advanceTimers(t),
      ]);
  }
  function ut(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  var X;
  (function (e) {
    (e[(e.STANDARD = 0)] = "STANDARD"),
      (e[(e.LEFT = 1)] = "LEFT"),
      (e[(e.RIGHT = 2)] = "RIGHT"),
      (e[(e.NUMPAD = 3)] = "NUMPAD");
  })(X || (X = {}));
  const p1 = ["Alt", "AltGraph", "Control", "Fn", "Meta", "Shift", "Symbol"];
  function Sc(e) {
    return p1.includes(e);
  }
  const v1 = ["CapsLock", "FnLock", "NumLock", "ScrollLock", "SymbolLock"];
  function Oc(e) {
    return v1.includes(e);
  }
  class m1 {
    isKeyPressed(t) {
      return !!this.pressed[String(t.code)];
    }
    getPressedKeys() {
      return Object.values(this.pressed).map((t) => t.keyDef);
    }
    async keydown(t, r) {
      var n, o, a;
      const i = String(r.key),
        s = String(r.code),
        l = li(t.config.document);
      this.setKeydownTarget(l);
      var u;
      ((u = (n = this.pressed)[(o = s)]) !== null && u !== void 0) ||
        (n[o] = { keyDef: r, unpreventedDefault: !1 }),
        Sc(i) && (this.modifiers[i] = !0);
      const c = t.dispatchUIEvent(l, "keydown", { key: i, code: s });
      Oc(i) &&
        !this.modifiers[i] &&
        ((this.modifiers[i] = !0), (this.modifierLockStart[i] = !0)),
        (a = this.pressed[s]).unpreventedDefault || (a.unpreventedDefault = c),
        c &&
          this.hasKeyPress(i) &&
          t.dispatchUIEvent(li(t.config.document), "keypress", {
            key: i,
            code: s,
            charCode: r.key === "Enter" ? 13 : String(r.key).charCodeAt(0),
          });
    }
    async keyup(t, r) {
      const n = String(r.key),
        o = String(r.code),
        a = this.pressed[o].unpreventedDefault;
      delete this.pressed[o],
        Sc(n) &&
          !Object.values(this.pressed).find((i) => i.keyDef.key === n) &&
          (this.modifiers[n] = !1),
        t.dispatchUIEvent(
          li(t.config.document),
          "keyup",
          { key: n, code: o },
          !a,
        ),
        Oc(n) &&
          this.modifiers[n] &&
          (this.modifierLockStart[n]
            ? (this.modifierLockStart[n] = !1)
            : (this.modifiers[n] = !1));
    }
    setKeydownTarget(t) {
      t !== this.lastKeydownTarget && (this.carryChar = ""),
        (this.lastKeydownTarget = t);
    }
    hasKeyPress(t) {
      return (
        (t.length === 1 || t === "Enter") &&
        !this.modifiers.Control &&
        !this.modifiers.Alt
      );
    }
    constructor(t) {
      ut(this, "system", void 0),
        ut(this, "modifiers", {
          Alt: !1,
          AltGraph: !1,
          CapsLock: !1,
          Control: !1,
          Fn: !1,
          FnLock: !1,
          Meta: !1,
          NumLock: !1,
          ScrollLock: !1,
          Shift: !1,
          Symbol: !1,
          SymbolLock: !1,
        }),
        ut(this, "pressed", {}),
        ut(this, "carryChar", ""),
        ut(this, "lastKeydownTarget", void 0),
        ut(this, "modifierLockStart", {}),
        (this.system = t);
    }
  }
  const b1 = [
      ..."0123456789".split("").map((e) => ({ code: `Digit${e}`, key: e })),
      ...")!@#$%^&*("
        .split("")
        .map((e, t) => ({ code: `Digit${t}`, key: e, shiftKey: !0 })),
      ..."abcdefghijklmnopqrstuvwxyz"
        .split("")
        .map((e) => ({ code: `Key${e.toUpperCase()}`, key: e })),
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split("")
        .map((e) => ({ code: `Key${e}`, key: e, shiftKey: !0 })),
      { code: "Space", key: " " },
      { code: "AltLeft", key: "Alt", location: X.LEFT },
      { code: "AltRight", key: "Alt", location: X.RIGHT },
      { code: "ShiftLeft", key: "Shift", location: X.LEFT },
      { code: "ShiftRight", key: "Shift", location: X.RIGHT },
      { code: "ControlLeft", key: "Control", location: X.LEFT },
      { code: "ControlRight", key: "Control", location: X.RIGHT },
      { code: "MetaLeft", key: "Meta", location: X.LEFT },
      { code: "MetaRight", key: "Meta", location: X.RIGHT },
      { code: "OSLeft", key: "OS", location: X.LEFT },
      { code: "OSRight", key: "OS", location: X.RIGHT },
      { code: "Tab", key: "Tab" },
      { code: "CapsLock", key: "CapsLock" },
      { code: "Backspace", key: "Backspace" },
      { code: "Enter", key: "Enter" },
      { code: "Escape", key: "Escape" },
      { code: "ArrowUp", key: "ArrowUp" },
      { code: "ArrowDown", key: "ArrowDown" },
      { code: "ArrowLeft", key: "ArrowLeft" },
      { code: "ArrowRight", key: "ArrowRight" },
      { code: "Home", key: "Home" },
      { code: "End", key: "End" },
      { code: "Delete", key: "Delete" },
      { code: "PageUp", key: "PageUp" },
      { code: "PageDown", key: "PageDown" },
      { code: "Fn", key: "Fn" },
      { code: "Symbol", key: "Symbol" },
      { code: "AltRight", key: "AltGraph" },
    ],
    y1 = [
      { name: "MouseLeft", pointerType: "mouse", button: "primary" },
      { name: "MouseRight", pointerType: "mouse", button: "secondary" },
      { name: "MouseMiddle", pointerType: "mouse", button: "auxiliary" },
      { name: "TouchA", pointerType: "touch" },
      { name: "TouchB", pointerType: "touch" },
      { name: "TouchC", pointerType: "touch" },
    ];
  function h1(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  class kp {
    getButtons() {
      let t = 0;
      for (const r of Object.keys(this.pressed)) t |= 2 ** Number(r);
      return t;
    }
    down(t) {
      const r = kl(t.button);
      if (r in this.pressed) {
        this.pressed[r].push(t);
        return;
      }
      return (this.pressed[r] = [t]), r;
    }
    up(t) {
      const r = kl(t.button);
      if (
        r in this.pressed &&
        ((this.pressed[r] = this.pressed[r].filter((n) => n.name !== t.name)),
        this.pressed[r].length === 0)
      )
        return delete this.pressed[r], r;
    }
    constructor() {
      h1(this, "pressed", {});
    }
  }
  const Il = {
    primary: 0,
    secondary: 1,
    auxiliary: 2,
    back: 3,
    X1: 3,
    forward: 4,
    X2: 4,
  };
  function kl(e = 0) {
    return e in Il ? Il[e] : Number(e);
  }
  const xc = { 1: 2, 2: 1 };
  function Tc(e) {
    return (e = kl(e)), e in xc ? xc[e] : e;
  }
  function g1(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  class E1 {
    get countPressed() {
      return this.pressedKeys.size;
    }
    isPressed(t) {
      return this.pressedKeys.has(t.name);
    }
    addPressed(t) {
      return this.pressedKeys.add(t.name);
    }
    removePressed(t) {
      return this.pressedKeys.delete(t.name);
    }
    constructor() {
      g1(this, "pressedKeys", new Set());
    }
  }
  function Kt(e, t) {
    const r = [];
    for (let a = e; a; a = a.parentElement) r.push(a);
    const n = [];
    for (let a = t; a; a = a.parentElement) n.push(a);
    let o = 0;
    for (
      ;
      !(
        o >= r.length ||
        o >= n.length ||
        r[r.length - 1 - o] !== n[n.length - 1 - o]
      );
      o++
    );
    return [
      r.slice(0, r.length - o),
      n.slice(0, n.length - o),
      n.slice(n.length - o),
    ];
  }
  function Nl({ target: e, node: t, offset: r }) {
    return se(e)
      ? { node: e, offset: r ?? de(e).length }
      : t
        ? {
            node: t,
            offset:
              r ??
              (t.nodeType === 3 ? t.nodeValue.length : t.childNodes.length),
          }
        : Np(e, r);
  }
  function Np(e, t, r = !0) {
    let n = t === void 0 ? e.childNodes.length - 1 : 0;
    const o = t === void 0 ? -1 : 1;
    for (
      ;
      t === void 0
        ? n >= (r ? Math.max(e.childNodes.length - 1, 0) : 0)
        : n <= e.childNodes.length;

    ) {
      if (t && n === e.childNodes.length)
        throw new Error("The given offset is out of bounds.");
      const a = e.childNodes.item(n),
        i = String(a.textContent);
      if (i.length)
        if (t !== void 0 && i.length < t) t -= i.length;
        else {
          if (a.nodeType === 1) return Np(a, t, !1);
          if (a.nodeType === 3)
            return { node: a, offset: t ?? a.nodeValue.length };
        }
      n += o;
    }
    return { node: e, offset: e.childNodes.length };
  }
  function w1({ document: e, target: t, clickCount: r, node: n, offset: o }) {
    if (uv(t)) return;
    const a = se(t),
      i = String(a ? de(t) : t.textContent),
      [s, l] = n ? [o, o] : C1(i, o, r);
    if (a)
      return (
        At(t, { anchorOffset: s ?? i.length, focusOffset: l ?? i.length }),
        { node: t, start: s ?? 0, end: l ?? i.length }
      );
    {
      const { node: u, offset: c } = Nl({ target: t, node: n, offset: s }),
        { node: d, offset: f } = Nl({ target: t, node: n, offset: l }),
        m = t.ownerDocument.createRange();
      try {
        m.setStart(u, c), m.setEnd(d, f);
      } catch {
        throw new Error("The given offset is out of bounds.");
      }
      const P = e.getSelection();
      return (
        P == null || P.removeAllRanges(),
        P == null || P.addRange(m.cloneRange()),
        m
      );
    }
  }
  function C1(e, t, r) {
    if (r % 3 === 1 || e.length === 0) return [t, t];
    const n = t ?? e.length;
    return r % 3 === 2
      ? [
          n - e.substr(0, t).match(/(\w+|\s+|\W)?$/)[0].length,
          t === void 0 ? t : t + e.substr(t).match(/^(\w+|\s+|\W)?/)[0].length,
        ]
      : [
          n - e.substr(0, t).match(/[^\r\n]*$/)[0].length,
          t === void 0 ? t : t + e.substr(t).match(/^[^\r\n]*/)[0].length,
        ];
  }
  function P1(e, { document: t, target: r, node: n, offset: o }) {
    const a = Nl({ target: r, node: n, offset: o });
    if ("node" in e) {
      if (a.node === e.node) {
        const i = a.offset < e.start ? e.end : e.start,
          s = a.offset > e.end || a.offset < e.start ? a.offset : e.end;
        At(e.node, { anchorOffset: i, focusOffset: s });
      }
    } else {
      const i = e.cloneRange(),
        s = i.comparePoint(a.node, a.offset);
      s < 0
        ? i.setStart(a.node, a.offset)
        : s > 0 && i.setEnd(a.node, a.offset);
      const l = t.getSelection();
      l == null || l.removeAllRanges(), l == null || l.addRange(i.cloneRange());
    }
  }
  function Bp(e, t) {
    var r, n, o, a, i, s, l, u;
    return (
      e.target !== t.target ||
      ((r = e.coords) === null || r === void 0 ? void 0 : r.x) !==
        ((n = t.coords) === null || n === void 0 ? void 0 : n.y) ||
      ((o = e.coords) === null || o === void 0 ? void 0 : o.y) !==
        ((a = t.coords) === null || a === void 0 ? void 0 : a.y) ||
      ((i = e.caret) === null || i === void 0 ? void 0 : i.node) !==
        ((s = t.caret) === null || s === void 0 ? void 0 : s.node) ||
      ((l = e.caret) === null || l === void 0 ? void 0 : l.offset) !==
        ((u = t.caret) === null || u === void 0 ? void 0 : u.offset)
    );
  }
  function Ve(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  class R1 {
    move(t, r) {
      const n = this.position,
        o = this.getTarget(t);
      if (((this.position = r), !Bp(n, r))) return;
      const a = this.getTarget(t),
        i = this.getEventInit("mousemove"),
        [s, l] = Kt(o, a);
      return {
        leave: () => {
          o !== a &&
            (t.dispatchUIEvent(o, "mouseout", i),
            s.forEach((u) => t.dispatchUIEvent(u, "mouseleave", i)));
        },
        enter: () => {
          o !== a &&
            (t.dispatchUIEvent(a, "mouseover", i),
            l.forEach((u) => t.dispatchUIEvent(u, "mouseenter", i)));
        },
        move: () => {
          t.dispatchUIEvent(a, "mousemove", i), this.modifySelecting(t);
        },
      };
    }
    down(t, r, n) {
      const o = this.buttons.down(r);
      if (o === void 0) return;
      const a = this.getTarget(t);
      this.buttonDownTarget[o] = a;
      const i = ye(a),
        s = this.getEventInit("mousedown", r.button);
      (i || t.dispatchUIEvent(a, "mousedown", s)) &&
        (this.startSelecting(t, s.detail), De(a)),
        !i &&
          Tc(r.button) === 2 &&
          t.dispatchUIEvent(
            a,
            "contextmenu",
            this.getEventInit("contextmenu", r.button, n),
          );
    }
    up(t, r, n) {
      const o = this.buttons.up(r);
      if (o === void 0) return;
      const a = this.getTarget(t);
      if (!ye(a)) {
        t.dispatchUIEvent(a, "mouseup", this.getEventInit("mouseup", r.button)),
          this.endSelecting();
        const i = Kt(this.buttonDownTarget[o], a)[2][0];
        if (i) {
          const s = this.getEventInit("click", r.button, n);
          s.detail &&
            (t.dispatchUIEvent(i, s.button === 0 ? "click" : "auxclick", s),
            s.button === 0 &&
              s.detail === 2 &&
              t.dispatchUIEvent(i, "dblclick", {
                ...this.getEventInit("dblclick", r.button),
                detail: s.detail,
              }));
        }
      }
    }
    resetClickCount() {
      this.clickCount.reset();
    }
    getEventInit(t, r, n) {
      const o = { ...this.position.coords };
      return (
        n &&
          ((o.pointerId = n.pointerId),
          (o.pointerType = n.pointerType),
          (o.isPrimary = n.isPrimary)),
        (o.button = Tc(r)),
        (o.buttons = this.buttons.getButtons()),
        t === "mousedown"
          ? (o.detail = this.clickCount.getOnDown(o.button))
          : t === "mouseup"
            ? (o.detail = this.clickCount.getOnUp(o.button))
            : (t === "click" || t === "auxclick") &&
              (o.detail = this.clickCount.incOnClick(o.button)),
        o
      );
    }
    getTarget(t) {
      var r;
      return (r = this.position.target) !== null && r !== void 0
        ? r
        : t.config.document.body;
    }
    startSelecting(t, r) {
      var n, o;
      this.selecting = w1({
        document: t.config.document,
        target: this.getTarget(t),
        node:
          (n = this.position.caret) === null || n === void 0 ? void 0 : n.node,
        offset:
          (o = this.position.caret) === null || o === void 0
            ? void 0
            : o.offset,
        clickCount: r,
      });
    }
    modifySelecting(t) {
      var r, n;
      this.selecting &&
        P1(this.selecting, {
          document: t.config.document,
          target: this.getTarget(t),
          node:
            (r = this.position.caret) === null || r === void 0
              ? void 0
              : r.node,
          offset:
            (n = this.position.caret) === null || n === void 0
              ? void 0
              : n.offset,
        });
    }
    endSelecting() {
      this.selecting = void 0;
    }
    constructor() {
      Ve(this, "position", {}),
        Ve(this, "buttons", new kp()),
        Ve(this, "selecting", void 0),
        Ve(this, "buttonDownTarget", {}),
        Ve(
          this,
          "clickCount",
          new (class {
            incOnClick(t) {
              const r =
                this.down[t] === void 0 ? void 0 : Number(this.down[t]) + 1;
              return (
                (this.count =
                  this.count[t] === void 0
                    ? {}
                    : { [t]: Number(this.count[t]) + 1 }),
                r
              );
            }
            getOnDown(t) {
              var r;
              this.down = {
                [t]: (r = this.count[t]) !== null && r !== void 0 ? r : 0,
              };
              var n;
              return (
                (this.count = {
                  [t]: (n = this.count[t]) !== null && n !== void 0 ? n : 0,
                }),
                Number(this.count[t]) + 1
              );
            }
            getOnUp(t) {
              return this.down[t] === void 0
                ? void 0
                : Number(this.down[t]) + 1;
            }
            reset() {
              this.count = {};
            }
            constructor() {
              Ve(this, "down", {}), Ve(this, "count", {});
            }
          })(),
        );
    }
  }
  function vn(e, t) {
    var r;
    return (
      ((r = Lp(e, t)) === null || r === void 0 ? void 0 : r.pointerEvents) !==
      "none"
    );
  }
  function _1(e) {
    const t = le(e);
    for (let r = e, n = []; r != null && r.ownerDocument; r = r.parentElement) {
      n.push(r);
      const o = t.getComputedStyle(r).pointerEvents;
      if (o && !["inherit", "unset"].includes(o))
        return { pointerEvents: o, tree: n };
    }
  }
  const $c = Symbol("Last check for pointer-events");
  function Lp(e, t) {
    const r = t[$c];
    if (
      !(
        e.config.pointerEventsCheck !== vt.Never &&
        (!r ||
          (qc(e.config.pointerEventsCheck, vt.EachApiCall) &&
            r[G.Call] !== yr(e, G.Call)) ||
          (qc(e.config.pointerEventsCheck, vt.EachTrigger) &&
            r[G.Trigger] !== yr(e, G.Trigger)))
      )
    )
      return r == null ? void 0 : r.result;
    const o = _1(t);
    return (
      (t[$c] = {
        [G.Call]: yr(e, G.Call),
        [G.Trigger]: yr(e, G.Trigger),
        result: o,
      }),
      o
    );
  }
  function Ut(e, t) {
    const r = Lp(e, t);
    if ((r == null ? void 0 : r.pointerEvents) === "none")
      throw new Error(
        [
          `Unable to perform pointer interaction as the element ${r.tree.length > 1 ? "inherits" : "has"} \`pointer-events: none\`:`,
          "",
          S1(r.tree),
        ].join(`
`),
      );
  }
  function S1(e) {
    return e
      .reverse()
      .map((t, r) =>
        [
          "".padEnd(r),
          t.tagName,
          t.id && `#${t.id}`,
          t.hasAttribute("data-testid") &&
            `(testId=${t.getAttribute("data-testid")})`,
          O1(t),
          e.length > 1 &&
            r === 0 &&
            "  <-- This element declared `pointer-events: none`",
          e.length > 1 &&
            r === e.length - 1 &&
            "  <-- Asserted pointer events here",
        ]
          .filter(Boolean)
          .join(""),
      ).join(`
`);
  }
  function O1(e) {
    var t;
    let r;
    if (e.hasAttribute("aria-label")) r = e.getAttribute("aria-label");
    else if (e.hasAttribute("aria-labelledby")) {
      var n, o;
      r =
        (o = e.ownerDocument.getElementById(
          e.getAttribute("aria-labelledby"),
        )) === null ||
        o === void 0 ||
        (n = o.textContent) === null ||
        n === void 0
          ? void 0
          : n.trim();
    } else if (
      O(e, [
        "button",
        "input",
        "meter",
        "output",
        "progress",
        "select",
        "textarea",
      ]) &&
      !((t = e.labels) === null || t === void 0) &&
      t.length
    )
      r = Array.from(e.labels)
        .map((i) => {
          var s;
          return (s = i.textContent) === null || s === void 0
            ? void 0
            : s.trim();
        })
        .join("|");
    else if (O(e, "button")) {
      var a;
      r = (a = e.textContent) === null || a === void 0 ? void 0 : a.trim();
    }
    return (
      (r = r == null ? void 0 : r.replace(/\n/g, "  ")),
      Number(r == null ? void 0 : r.length) > 30 &&
        (r = `${r == null ? void 0 : r.substring(0, 29)}…`),
      r ? `(label=${r})` : ""
    );
  }
  function qc(e, t) {
    return (e & t) > 0;
  }
  function Ce(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  class Ac {
    init(t, r) {
      this.position = r;
      const n = this.getTarget(t),
        [, o] = Kt(null, n),
        a = this.getEventInit();
      return (
        Ut(t, n),
        t.dispatchUIEvent(n, "pointerover", a),
        o.forEach((i) => t.dispatchUIEvent(i, "pointerenter", a)),
        this
      );
    }
    move(t, r) {
      const n = this.position,
        o = this.getTarget(t);
      if (((this.position = r), !Bp(n, r))) return;
      const a = this.getTarget(t),
        i = this.getEventInit(),
        [s, l] = Kt(o, a);
      return {
        leave: () => {
          vn(t, o) &&
            o !== a &&
            (t.dispatchUIEvent(o, "pointerout", i),
            s.forEach((u) => t.dispatchUIEvent(u, "pointerleave", i)));
        },
        enter: () => {
          Ut(t, a),
            o !== a &&
              (t.dispatchUIEvent(a, "pointerover", i),
              l.forEach((u) => t.dispatchUIEvent(u, "pointerenter", i)));
        },
        move: () => {
          t.dispatchUIEvent(a, "pointermove", i);
        },
      };
    }
    down(t, r) {
      if (this.isDown) return;
      const n = this.getTarget(t);
      Ut(t, n),
        (this.isDown = !0),
        (this.isPrevented = !t.dispatchUIEvent(
          n,
          "pointerdown",
          this.getEventInit(),
        ));
    }
    up(t, r) {
      if (!this.isDown) return;
      const n = this.getTarget(t);
      Ut(t, n),
        (this.isDown = !1),
        t.dispatchUIEvent(n, "pointerup", this.getEventInit());
    }
    release(t) {
      const r = this.getTarget(t),
        [n] = Kt(r, null),
        o = this.getEventInit();
      vn(t, r) &&
        (t.dispatchUIEvent(r, "pointerout", o),
        n.forEach((a) => t.dispatchUIEvent(a, "pointerleave", o))),
        (this.isCancelled = !0);
    }
    getTarget(t) {
      var r;
      return (r = this.position.target) !== null && r !== void 0
        ? r
        : t.config.document.body;
    }
    getEventInit() {
      return {
        ...this.position.coords,
        pointerId: this.pointerId,
        pointerType: this.pointerType,
        isPrimary: this.isPrimary,
      };
    }
    constructor({ pointerId: t, pointerType: r, isPrimary: n }) {
      Ce(this, "pointerId", void 0),
        Ce(this, "pointerType", void 0),
        Ce(this, "isPrimary", void 0),
        Ce(this, "isMultitouch", !1),
        Ce(this, "isCancelled", !1),
        Ce(this, "isDown", !1),
        Ce(this, "isPrevented", !1),
        Ce(this, "position", {}),
        (this.pointerId = t),
        (this.pointerType = r),
        (this.isPrimary = n),
        (this.isMultitouch = !n);
    }
  }
  function Pe(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  class x1 {
    isKeyPressed(t) {
      return this.devices.get(t.pointerType).isPressed(t);
    }
    async press(t, r, n) {
      const o = this.getPointerName(r),
        a =
          r.pointerType === "touch"
            ? this.pointers.new(o, r).init(t, n)
            : this.pointers.get(o);
      (a.position = n),
        a.pointerType !== "touch" && (this.mouse.position = n),
        this.devices.get(r.pointerType).addPressed(r),
        this.buttons.down(r),
        a.down(t, r),
        a.pointerType !== "touch" && !a.isPrevented && this.mouse.down(t, r, a);
    }
    async move(t, r, n) {
      const o = this.pointers.get(r),
        a = o.move(t, n),
        i =
          o.pointerType === "touch" || (o.isPrevented && o.isDown)
            ? void 0
            : this.mouse.move(t, n);
      a == null || a.leave(),
        i == null || i.leave(),
        a == null || a.enter(),
        i == null || i.enter(),
        a == null || a.move(),
        i == null || i.move();
    }
    async release(t, r, n) {
      const o = this.devices.get(r.pointerType);
      o.removePressed(r), this.buttons.up(r);
      const a = this.pointers.get(this.getPointerName(r));
      if (
        ((a.position = n),
        a.pointerType !== "touch" && (this.mouse.position = n),
        o.countPressed === 0 && a.up(t, r),
        a.pointerType === "touch" && a.release(t),
        !a.isPrevented)
      ) {
        if (a.pointerType === "touch" && !a.isMultitouch) {
          const i = this.mouse.move(t, a.position);
          i == null || i.leave(),
            i == null || i.enter(),
            i == null || i.move(),
            this.mouse.down(t, r, a);
        }
        if (!a.isMultitouch) {
          const i = this.mouse.move(t, a.position);
          i == null || i.leave(),
            i == null || i.enter(),
            i == null || i.move(),
            this.mouse.up(t, r, a);
        }
      }
    }
    getPointerName(t) {
      return t.pointerType === "touch" ? t.name : t.pointerType;
    }
    getPreviousPosition(t) {
      return this.pointers.has(t) ? this.pointers.get(t).position : void 0;
    }
    resetClickCount() {
      this.mouse.resetClickCount();
    }
    getMouseTarget(t) {
      var r;
      return (r = this.mouse.position.target) !== null && r !== void 0
        ? r
        : t.config.document.body;
    }
    setMousePosition(t) {
      (this.mouse.position = t), (this.pointers.get("mouse").position = t);
    }
    constructor(t) {
      Pe(this, "system", void 0),
        Pe(this, "mouse", void 0),
        Pe(this, "buttons", void 0),
        Pe(
          this,
          "devices",
          new (class {
            get(r) {
              var n, o, a;
              return (
                ((a = (n = this.registry)[(o = r)]) !== null && a !== void 0) ||
                  (n[o] = new E1()),
                this.registry[r]
              );
            }
            constructor() {
              Pe(this, "registry", {});
            }
          })(),
        ),
        Pe(
          this,
          "pointers",
          new (class {
            new(r, n) {
              const o =
                n.pointerType !== "touch" ||
                !Object.values(this.registry).some(
                  (a) => a.pointerType === "touch" && !a.isCancelled,
                );
              return (
                o ||
                  Object.values(this.registry).forEach((a) => {
                    a.pointerType === n.pointerType &&
                      !a.isCancelled &&
                      (a.isMultitouch = !0);
                  }),
                (this.registry[r] = new Ac({
                  pointerId: this.nextId++,
                  pointerType: n.pointerType,
                  isPrimary: o,
                })),
                this.registry[r]
              );
            }
            get(r) {
              if (!this.has(r))
                throw new Error(
                  `Trying to access pointer "${r}" which does not exist.`,
                );
              return this.registry[r];
            }
            has(r) {
              return r in this.registry;
            }
            constructor() {
              Pe(this, "registry", {
                mouse: new Ac({
                  pointerId: 1,
                  pointerType: "mouse",
                  isPrimary: !0,
                }),
              }),
                Pe(this, "nextId", 2);
            }
          })(),
        ),
        (this.system = t),
        (this.buttons = new kp()),
        (this.mouse = new R1());
    }
  }
  function Mc(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  class jp {
    getUIEventModifiers() {
      return {
        altKey: this.keyboard.modifiers.Alt,
        ctrlKey: this.keyboard.modifiers.Control,
        metaKey: this.keyboard.modifiers.Meta,
        shiftKey: this.keyboard.modifiers.Shift,
        modifierAltGraph: this.keyboard.modifiers.AltGraph,
        modifierCapsLock: this.keyboard.modifiers.CapsLock,
        modifierFn: this.keyboard.modifiers.Fn,
        modifierFnLock: this.keyboard.modifiers.FnLock,
        modifierNumLock: this.keyboard.modifiers.NumLock,
        modifierScrollLock: this.keyboard.modifiers.ScrollLock,
        modifierSymbol: this.keyboard.modifiers.Symbol,
        modifierSymbolLock: this.keyboard.modifiers.SymbolLock,
      };
    }
    constructor() {
      Mc(this, "keyboard", new m1(this)), Mc(this, "pointer", new x1(this));
    }
  }
  async function T1(e) {
    const t = [];
    return (
      this.config.skipHover || t.push({ target: e }),
      t.push({ keys: "[MouseLeft]", target: e }),
      this.pointer(t)
    );
  }
  async function $1(e) {
    return this.pointer([{ target: e }, "[MouseLeft][MouseLeft]"]);
  }
  async function q1(e) {
    return this.pointer([{ target: e }, "[MouseLeft][MouseLeft][MouseLeft]"]);
  }
  async function A1(e) {
    return this.pointer({ target: e });
  }
  async function M1(e) {
    return (
      Ut(this, this.system.pointer.getMouseTarget(this)),
      this.pointer({ target: e.ownerDocument.body })
    );
  }
  async function I1({ shift: e } = {}) {
    return this.keyboard(
      e === !0
        ? "{Shift>}{Tab}{/Shift}"
        : e === !1
          ? "[/ShiftLeft][/ShiftRight]{Tab}"
          : "{Tab}",
    );
  }
  function k1(e, t) {
    const r = [];
    do {
      const {
        type: o,
        descriptor: a,
        consumedLength: i,
        releasePrevious: s,
        releaseSelf: l = !0,
        repeat: u,
      } = zc(t, "keyboard");
      var n;
      const c =
        (n = e.find((d) => {
          if (o === "[") {
            var f;
            return (
              ((f = d.code) === null || f === void 0
                ? void 0
                : f.toLowerCase()) === a.toLowerCase()
            );
          } else if (o === "{") {
            var m;
            return (
              ((m = d.key) === null || m === void 0
                ? void 0
                : m.toLowerCase()) === a.toLowerCase()
            );
          }
          return d.key === a;
        })) !== null && n !== void 0
          ? n
          : {
              key: "Unknown",
              code: "Unknown",
              [o === "[" ? "code" : "key"]: a,
            };
      r.push({ keyDef: c, releasePrevious: s, releaseSelf: l, repeat: u }),
        (t = t.slice(i));
    } while (t);
    return r;
  }
  async function N1(e) {
    const t = k1(this.config.keyboardMap, e);
    for (let r = 0; r < t.length; r++)
      await Ot(this.config), await B1(this, t[r]);
  }
  async function B1(
    e,
    { keyDef: t, releasePrevious: r, releaseSelf: n, repeat: o },
  ) {
    const { system: a } = e;
    if ((a.keyboard.isKeyPressed(t) && (await a.keyboard.keyup(e, t)), !r)) {
      for (let i = 1; i <= o; i++)
        await a.keyboard.keydown(e, t), i < o && (await Ot(e.config));
      n && (await a.keyboard.keyup(e, t));
    }
  }
  async function L1(e) {
    for (const t of e.system.keyboard.getPressedKeys())
      await e.system.keyboard.keyup(e, t);
  }
  function Dp(e) {
    const t = se(e)
        ? { "text/plain": j1(e) }
        : { "text/plain": String(e.ownerDocument.getSelection()) },
      r = Ll(le(e));
    for (const n in t) t[n] && r.setData(n, t[n]);
    return r;
  }
  function j1(e) {
    const t = tr(e);
    return de(e).substring(t.startOffset, t.endOffset);
  }
  async function D1() {
    const e = this.config.document;
    var t;
    const r = (t = e.activeElement) !== null && t !== void 0 ? t : e.body,
      n = Dp(r);
    if (n.items.length !== 0)
      return (
        this.dispatchUIEvent(r, "copy", { clipboardData: n }) &&
          this.config.writeToClipboard &&
          (await Hc(e, n)),
        n
      );
  }
  async function F1() {
    const e = this.config.document;
    var t;
    const r = (t = e.activeElement) !== null && t !== void 0 ? t : e.body,
      n = Dp(r);
    if (n.items.length !== 0)
      return (
        this.dispatchUIEvent(r, "cut", { clipboardData: n }) &&
          this.config.writeToClipboard &&
          (await Hc(r.ownerDocument, n)),
        n
      );
  }
  async function U1(e) {
    const t = this.config.document;
    var r;
    const n = (r = t.activeElement) !== null && r !== void 0 ? r : t.body;
    var o;
    const a =
      (o = typeof e == "string" ? H1(t, e) : e) !== null && o !== void 0
        ? o
        : await ev(t).catch(() => {
            throw new Error(
              "`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.",
            );
          });
    this.dispatchUIEvent(n, "paste", { clipboardData: a });
  }
  function H1(e, t) {
    const r = Ll(le(e));
    return r.setData("text", t), r;
  }
  function Ic(e, t) {
    const r = [];
    do {
      const {
          descriptor: n,
          consumedLength: o,
          releasePrevious: a,
          releaseSelf: i = !0,
        } = zc(t, "pointer"),
        s = e.find((l) => l.name === n);
      s && r.push({ keyDef: s, releasePrevious: a, releaseSelf: i }),
        (t = t.slice(o));
    } while (t);
    return r;
  }
  async function W1(e) {
    const { pointerMap: t } = this.config,
      r = [];
    (Array.isArray(e) ? e : [e]).forEach((n) => {
      typeof n == "string"
        ? r.push(...Ic(t, n))
        : "keys" in n
          ? r.push(...Ic(t, n.keys).map((o) => ({ ...n, ...o })))
          : r.push(n);
    });
    for (let n = 0; n < r.length; n++)
      await Ot(this.config), await V1(this, r[n]);
    this.system.pointer.resetClickCount();
  }
  async function V1(e, t) {
    var r, n;
    const o =
        "pointerName" in t && t.pointerName
          ? t.pointerName
          : "keyDef" in t
            ? e.system.pointer.getPointerName(t.keyDef)
            : "mouse",
      a = e.system.pointer.getPreviousPosition(o);
    var i, s, l, u;
    const c = {
      target: (i = t.target) !== null && i !== void 0 ? i : z1(e, a),
      coords:
        (s = t.coords) !== null && s !== void 0
          ? s
          : a == null
            ? void 0
            : a.coords,
      caret: {
        node:
          (l = t.node) !== null && l !== void 0
            ? l
            : kc(t) || a == null || (r = a.caret) === null || r === void 0
              ? void 0
              : r.node,
        offset:
          (u = t.offset) !== null && u !== void 0
            ? u
            : kc(t) || a == null || (n = a.caret) === null || n === void 0
              ? void 0
              : n.offset,
      },
    };
    "keyDef" in t
      ? (e.system.pointer.isKeyPressed(t.keyDef) &&
          (Dt(e, G.Trigger), await e.system.pointer.release(e, t.keyDef, c)),
        t.releasePrevious ||
          (Dt(e, G.Trigger),
          await e.system.pointer.press(e, t.keyDef, c),
          t.releaseSelf &&
            (Dt(e, G.Trigger), await e.system.pointer.release(e, t.keyDef, c))))
      : (Dt(e, G.Trigger), await e.system.pointer.move(e, o, c));
  }
  function kc(e) {
    var t, r;
    return !!((r = (t = e.target) !== null && t !== void 0 ? t : e.node) !==
      null && r !== void 0
      ? r
      : e.offset !== void 0);
  }
  function z1(e, t) {
    if (!t)
      throw new Error(
        "This pointer has no previous position. Provide a target property!",
      );
    var r;
    return (r = t.target) !== null && r !== void 0 ? r : e.config.document.body;
  }
  async function K1(e) {
    if (!gt(e) || ye(e))
      throw new Error("clear()` is only supported on editable elements.");
    if ((De(e), e.ownerDocument.activeElement !== e))
      throw new Error("The element to be cleared could not be focused.");
    if ((Tp(e), !zq(e)))
      throw new Error(
        "The element content to be cleared could not be selected.",
      );
    St(this, e, "", "deleteContentBackward");
  }
  async function G1(e, t) {
    return Fp.call(this, !0, e, t);
  }
  async function X1(e, t) {
    return Fp.call(this, !1, e, t);
  }
  async function Fp(e, t, r) {
    if (!e && !t.multiple)
      throw $().getElementError(
        "Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.",
        t,
      );
    const n = Array.isArray(r) ? r : [r],
      o = Array.from(t.querySelectorAll('option, [role="option"]')),
      a = n
        .map((s) => {
          if (typeof s != "string" && o.includes(s)) return s;
          {
            const l = o.find((u) => u.value === s || u.innerHTML === s);
            if (l) return l;
            throw $().getElementError(
              `Value "${String(s)}" not found in options`,
              t,
            );
          }
        })
        .filter((s) => !ye(s));
    if (ye(t) || !a.length) return;
    const i = (s) => {
      (s.selected = e),
        this.dispatchUIEvent(t, "input", {
          bubbles: !0,
          cancelable: !1,
          composed: !0,
        }),
        this.dispatchUIEvent(t, "change");
    };
    if (O(t, "select"))
      if (t.multiple)
        for (const s of a) {
          const l = this.config.pointerEventsCheck === 0 ? !0 : vn(this, s);
          l &&
            (this.dispatchUIEvent(s, "pointerover"),
            this.dispatchUIEvent(t, "pointerenter"),
            this.dispatchUIEvent(s, "mouseover"),
            this.dispatchUIEvent(t, "mouseenter"),
            this.dispatchUIEvent(s, "pointermove"),
            this.dispatchUIEvent(s, "mousemove"),
            this.dispatchUIEvent(s, "pointerdown"),
            this.dispatchUIEvent(s, "mousedown")),
            De(t),
            l &&
              (this.dispatchUIEvent(s, "pointerup"),
              this.dispatchUIEvent(s, "mouseup")),
            i(s),
            l && this.dispatchUIEvent(s, "click"),
            await Ot(this.config);
        }
      else if (a.length === 1) {
        const s = this.config.pointerEventsCheck === 0 ? !0 : vn(this, t);
        s ? await this.click(t) : De(t),
          i(a[0]),
          s &&
            (this.dispatchUIEvent(t, "pointerover"),
            this.dispatchUIEvent(t, "pointerenter"),
            this.dispatchUIEvent(t, "mouseover"),
            this.dispatchUIEvent(t, "mouseenter"),
            this.dispatchUIEvent(t, "pointerup"),
            this.dispatchUIEvent(t, "mouseup"),
            this.dispatchUIEvent(t, "click")),
          await Ot(this.config);
      } else
        throw $().getElementError(
          "Cannot select multiple options on a non-multiple select",
          t,
        );
    else if (t.getAttribute("role") === "listbox")
      for (const s of a) await this.click(s), await this.unhover(s);
    else
      throw $().getElementError(
        "Cannot select options on elements that are neither select nor listbox elements",
        t,
      );
  }
  async function J1(
    e,
    t,
    {
      skipClick: r = this.config.skipClick,
      skipAutoClose: n = this.config.skipAutoClose,
      initialSelectionStart: o,
      initialSelectionEnd: a,
    } = {},
  ) {
    e.disabled ||
      (r || (await this.click(e)),
      o !== void 0 && Ft(e, o, a ?? o),
      await this.keyboard(t),
      n || (await L1(this)));
  }
  const Nc = Symbol("files and value properties are mocked");
  function Ki(e, t, r) {
    r ? Object.defineProperty(e, t, r) : delete e[t];
  }
  function Y1(e, t) {
    var r;
    (r = e[Nc]) === null || r === void 0 || r.restore();
    const n = Object.getOwnPropertyDescriptor(e, "type"),
      o = Object.getOwnPropertyDescriptor(e, "value"),
      a = Object.getOwnPropertyDescriptor(e, "files");
    function i() {
      Ki(e, "type", n), Ki(e, "value", o), Ki(e, "files", a);
    }
    (e[Nc] = { restore: i }),
      Object.defineProperties(e, {
        files: { configurable: !0, get: () => t },
        value: {
          configurable: !0,
          get: () => (t.length ? `C:\\fakepath\\${t[0].name}` : ""),
          set(s) {
            if (s === "") i();
            else {
              var l;
              o == null || (l = o.set) === null || l === void 0 || l.call(e, s);
            }
          },
        },
        type: {
          configurable: !0,
          get: () => "file",
          set(s) {
            s !== "file" && (i(), (e.type = s));
          },
        },
      });
  }
  async function Q1(e, t) {
    const r = O(e, "label") ? e.control : e;
    if (!r || !O(r, "input", { type: "file" }))
      throw new TypeError(
        `The ${r === e ? "given" : "associated"} ${r == null ? void 0 : r.tagName} element does not accept file uploads`,
      );
    if (ye(e)) return;
    const n = (Array.isArray(t) ? t : [t])
        .filter((a) => !this.config.applyAccept || Z1(a, r.accept))
        .slice(0, r.multiple ? void 0 : 1),
      o = () => {
        var a;
        (n.length ===
          ((a = r.files) === null || a === void 0 ? void 0 : a.length) &&
          n.every((i, s) => {
            var l;
            return (
              i ===
              ((l = r.files) === null || l === void 0 ? void 0 : l.item(s))
            );
          })) ||
          (Y1(r, Bl(le(e), n)),
          this.dispatchUIEvent(r, "input"),
          this.dispatchUIEvent(r, "change"));
      };
    r.addEventListener("fileDialog", o),
      await this.click(e),
      r.removeEventListener("fileDialog", o);
  }
  function Z1(e, t) {
    if (!t) return !0;
    const r = ["audio/*", "image/*", "video/*"];
    return t
      .split(",")
      .some((n) =>
        n.startsWith(".")
          ? e.name.endsWith(n)
          : r.includes(n)
            ? e.type.startsWith(n.substr(0, n.length - 1))
            : e.type === n,
      );
  }
  const Bc = {
    click: T1,
    dblClick: $1,
    tripleClick: q1,
    hover: A1,
    unhover: M1,
    tab: I1,
    keyboard: N1,
    copy: D1,
    cut: F1,
    paste: U1,
    pointer: W1,
    clear: K1,
    deselectOptions: X1,
    selectOptions: G1,
    type: J1,
    upload: Q1,
  };
  function eA(e) {
    return $().asyncWrapper(e);
  }
  const Up = {
      applyAccept: !0,
      autoModify: !0,
      delay: 0,
      document: globalThis.document,
      keyboardMap: b1,
      pointerMap: y1,
      pointerEventsCheck: vt.EachApiCall,
      skipAutoClose: !1,
      skipClick: !1,
      skipHover: !1,
      writeToClipboard: !1,
      advanceTimers: () => Promise.resolve(),
    },
    tA = { ...Up, writeToClipboard: !0 };
  function Hp(e = {}, t = tA, r) {
    const n = aA(e, r, t);
    return { ...t, ...e, document: n };
  }
  function rA(e = {}) {
    const t = Hp(e);
    Ip(t.document);
    var r;
    const n =
      (r = t.document.defaultView) !== null && r !== void 0
        ? r
        : globalThis.window;
    return Yp(n), Es(t).api;
  }
  function W({ keyboardState: e, pointerState: t, ...r } = {}, n) {
    const o = Hp(r, Up, n);
    Ip(o.document);
    var a;
    const i = (a = t ?? e) !== null && a !== void 0 ? a : new jp();
    return { api: Es(o, i).api, system: i };
  }
  function nA(e) {
    return Es({ ...this.config, ...e }, this.system).api;
  }
  function oA(e, t) {
    function r(...n) {
      return (
        Dt(e, G.Call),
        eA(() => t.apply(e, n).then(async (o) => (await Ot(e.config), o)))
      );
    }
    return Object.defineProperty(r, "name", { get: () => t.name }), r;
  }
  function Es(e, t = new jp()) {
    const r = {};
    return (
      Object.assign(r, {
        config: e,
        dispatchEvent: Mp.bind(r),
        dispatchUIEvent: a1.bind(r),
        system: t,
        levelRefs: {},
        ...Bc,
      }),
      {
        instance: r,
        api: {
          ...Object.fromEntries(
            Object.entries(Bc).map(([n, o]) => [n, oA(r, o)]),
          ),
          setup: nA.bind(r),
        },
      }
    );
  }
  function aA(e, t, r) {
    var n, o;
    return (o = (n = e.document) !== null && n !== void 0 ? n : t && d1(t)) !==
      null && o !== void 0
      ? o
      : r.document;
  }
  function iA(e) {
    return W().api.clear(e);
  }
  function lA(e, t = {}) {
    return W(t, e).api.click(e);
  }
  function sA(e = {}) {
    return W(e).api.copy();
  }
  function uA(e = {}) {
    return W(e).api.cut();
  }
  function cA(e, t = {}) {
    return W(t).api.dblClick(e);
  }
  function dA(e, t, r = {}) {
    return W(r).api.deselectOptions(e, t);
  }
  function fA(e, t = {}) {
    return W(t).api.hover(e);
  }
  async function pA(e, t = {}) {
    const { api: r, system: n } = W(t);
    return r.keyboard(e).then(() => n);
  }
  async function vA(e, t = {}) {
    const { api: r, system: n } = W(t);
    return r.pointer(e).then(() => n);
  }
  function mA(e, t) {
    return W(t).api.paste(e);
  }
  function bA(e, t, r = {}) {
    return W(r).api.selectOptions(e, t);
  }
  function yA(e, t = {}) {
    return W(t).api.tripleClick(e);
  }
  function hA(e, t, r = {}) {
    return W(r, e).api.type(e, t, r);
  }
  function gA(e, t = {}) {
    const { api: r, system: n } = W(t);
    return n.pointer.setMousePosition({ target: e }), r.unhover(e);
  }
  function EA(e, t, r = {}) {
    return W(r).api.upload(e, t);
  }
  function wA(e = {}) {
    return W().api.tab(e);
  }
  const CA = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          clear: iA,
          click: lA,
          copy: sA,
          cut: uA,
          dblClick: cA,
          deselectOptions: dA,
          hover: fA,
          keyboard: pA,
          paste: mA,
          pointer: vA,
          selectOptions: bA,
          tab: wA,
          tripleClick: yA,
          type: hA,
          unhover: gA,
          upload: EA,
        },
        Symbol.toStringTag,
        { value: "Module" },
      ),
    ),
    xr = { ...CA, setup: rA };
  function PA(e) {
    let t,
      r = {};
    return {
      press(n) {
        if (!r[n])
          return (
            t ??
              (t = [...document.querySelectorAll("*")].reverse().find((o) => {
                const a = o.getBoundingClientRect();
                if (
                  a.left < e.x &&
                  e.x < a.right &&
                  a.top < e.y &&
                  e.y < a.bottom
                )
                  return !0;
              })),
            (r[n] = +new Date()),
            t && t.focus(),
            t && qe.focusIn(t),
            t && qe.mouseDown(t, { ...r }),
            !0
          );
      },
      release(n) {
        if (!n) return (r = {}), (t = void 0);
        t && (qe.mouseUp(t, { ...r }), r[n] && qe.click(t)),
          (r[n] = void 0),
          Object.keys(r).length || (t = void 0);
      },
    };
  }
  function Lt(e) {
    let { st: t = 0, id: r = NaN } = {};
    return Object.assign(e, {
      start() {
        return r || ((this.done = !1), (t = 0), this.ticker()), !0;
      },
      ticker() {
        const n = +new Date(),
          o = t ? (n - t) / 1e3 : 0;
        if (((t = n), e.tick(o))) return this.end();
        r = setTimeout(() => this.ticker(), 7);
      },
      end() {
        return clearTimeout(r), (r = NaN), (this.done = !0);
      },
      done: !0,
    });
  }
  function Tr(e, { speed: t = 1, halflife: r = 50 } = {}) {
    var l;
    const n = document.createElement("div");
    (l = document.querySelector("main")) == null || l.appendChild(n);
    const o = (u) => (n.innerHTML = u);
    let { x: a = 0, v: i = 0, a: s = 0 } = {};
    return {
      onMove: e,
      tick(u) {
        if (((this.done = !1), !u)) return this.onMove(1);
        a += u * (i += u * s * Math.E ** u);
        const c = a | 0;
        if (
          ((a -= c),
          c && this.onMove(c),
          s || (i *= 0.5 ** (u / (r / 1e3))),
          o("tick " + JSON.stringify([a, i, s, u, this.done], null, 2)),
          Math.abs(i) <= 0.01 && s === 0)
        )
          return (i = s = 0), (this.done = !0);
      },
      press() {
        (s = t), (this.done = !1);
      },
      release: () => (s = 0),
      done: !0,
    };
  }
  function jt(e, { speed: t = 1, halflife: r = 50 } = {}) {
    let { x: n = 0, y: o = 0 } = {};
    return {
      done: !0,
      stop() {
        this.release(), (n = o = 0);
      },
      tick(a) {
        !this.left.done && this.left.tick(a),
          !this.right.done && this.right.tick(a),
          !this.up.done && this.up.tick(a),
          !this.down.done && this.down.tick(a),
          (this.done =
            this.left.done &&
            this.right.done &&
            this.up.done &&
            this.down.done);
        const { dx: i = n | 0, dy: s = o | 0 } = {};
        return e(i, s), (n -= i), (o -= s), this.done;
      },
      left: Tr((a) => (n -= a), { speed: t, halflife: r }),
      right: Tr((a) => (n += a), { speed: t, halflife: r }),
      up: Tr((a) => (o -= a), { speed: t, halflife: r }),
      down: Tr((a) => (o += a), { speed: t, halflife: r }),
      release() {
        this.left.release(),
          this.right.release(),
          this.up.release(),
          this.down.release();
      },
    };
  }
  RA();
  function RA() {
    const e = Object.fromEntries(
      `
CapsLockX = CapsLock / Space
A = Mouse Move Left
D = Mouse Move Right
W = Mouse Move Up
S = Mouse Move Down
E = Mouse Left Click
Q = Mouse Right Click
R = Scroll Up
F = Scroll Down
H = Caret Move
L = Caret Move
K = Caret Move
J = Caret Move
Y = Home
O = End
I = Page UP
U = Page Down
P = Prev Item (Shift+Tab)
N = Next Item (Tab)

T = Delete
G = Enter

`
        .trim()
        .split(
          `
`,
        )
        .map((t) => t.split("=").map((r) => r.trim())),
    );
    (document.querySelector("#root").innerHTML = `
  <div id="app">
  <a href="https://capslockx.snomiao.com" target="_blank">
    <img src="./XIconBlue.png" class="logo" alt="CapsLockX White logo" />
    <img src="./XIconWhite.png" class="logo" alt="CapsLockX Blue logo" />
  </a>
  <h1>Try CapsLockX</h1>
  <hr />
  <main>
    <div class='keys-list'>
      <h3>Mouse Control</h3>
      <div>
        <label><kbd>CapsLockX</kbd></label> + <table>
          <tr><td><kbd>Q</kbd></td><td><kbd>W</kbd></td><td><kbd>E</kbd></td><td><kbd>R</kbd></td></tr>
          <tr><td><kbd>A</kbd></td><td><kbd>S</kbd></td><td><kbd>D</kbd></td><td><kbd>F</kbd></td></tr>
        </table>
      </div>
      <h3>Editor Control</h3>
      <div>
        <label><kbd>CapsLockX</kbd></label> + <table>
          <tr><td><kbd>T</kbd></td><td><kbd>Y</kbd></td><td><kbd>U</kbd></td><td><kbd>I</kbd></td><td><kbd>O</kbd></td></tr>
          <tr><td><kbd>G</kbd></td><td><kbd>H</kbd></td><td><kbd>J</kbd></td><td><kbd>K</kbd></td><td><kbd>L</kbd></td></tr>
        </table>
      </div>
      <h3>Focus Control</h3>
      <div>
        <label><kbd>CapsLockX</kbd></label> + <table>
        <tr><td> ...        </td><td><kbd>P</kbd></td></tr>
        <tr><td><kbd>N</kbd></td><td> ...        </td></tr>
        </table>
      </div>
    </div>
    <div class="card">
      <button autofocus id="counter" type="button" tabindex="0">0</button>
    </div>
    <p class="read-the-docs">
      1. CapsLockX + WASD to move your cursor into button, then CapsLockX + E click it
    </p>
    <p class="read-the-docs">
      2. CapsLockX + E click it
    </p>

    <textarea>
      Edit this with CapsLockX + HJKL/YUIO/TG
      Edit this with CapsLockX + HJKL/YUIO/TG
      Edit this with CapsLockX + HJKL/YUIO/TG
      Edit this with CapsLockX + HJKL/YUIO/TG
      Edit this with CapsLockX + HJKL/YUIO/TG
      Edit this with CapsLockX + HJKL/YUIO/TG
      Edit this with CapsLockX + HJKL/YUIO/TG
      Edit this with CapsLockX + HJKL/YUIO/TG
    </textarea>
  </main>
  <hr />
  <footer>
    (C) Snolab
  </footer>
  </div>
<div id="cursor" class='cursor'>^</div>
<div id="caret" class='cursor'>|</div>

`),
      _A(document.querySelector("#app")),
      [...document.querySelectorAll("kbd")].map((t) => {
        const r = e[t.innerHTML];
        if (!r) return;
        const n = Object.assign(document.createElement("span"), {
          innerHTML: r,
          className: "key-desc",
        });
        t.appendChild(n);
      });
  }
  function _A(e = document.documentElement) {
    let t = !1;
    const r = Lt(
        jt(
          (h = 0, p = 0) => {
            P(d.x + h, d.y + p),
              l.selectionStart ?? (l.selectionStart = 0),
              l.selectionEnd === l.selectionStart
                ? ((l.selectionStart += h), h < 0 && (l.selectionEnd += h))
                : (l.selectionStart += h);
          },
          { speed: 20, halflife: 200 },
        ),
      ),
      n = Lt(
        jt(
          (h = 0, p = 0) => {
            h < 0 && xr.keyboard("[Home]".repeat(Math.abs(h))),
              h > 0 && xr.keyboard("[End]".repeat(Math.abs(h))),
              p < 0 && xr.keyboard("[PageUp]".repeat(Math.abs(p))),
              p > 0 && xr.keyboard("[PageDown]".repeat(Math.abs(p)));
          },
          { speed: 12, halflife: 10 },
        ),
      ),
      o = Lt(
        jt((h = 0, p = 0) => v(w.x + h, w.y + p), {
          speed:
            Math.max(screen.width, screen.height) /
            (window.screen.availWidth / window.visualViewport.width),
          halflife: 50,
        }),
      ),
      a = Lt(
        jt(
          (h = 0, p = 0) => {
            document.body.scrollBy({ top: p, behavior: "smooth" }),
              (document.body.scrollTop += p);
          },
          { speed: Math.min(screen.width, screen.height) },
        ),
      ),
      i = Lt(
        jt(
          (h = 0, p = 0) => {
            SA(p);
          },
          { speed: 5, halflife: 50 },
        ),
      ),
      s = document.querySelector("#app");
    s.style.cursor = "none";
    const l = document.querySelector("textarea"),
      u = document.querySelector("#counter");
    let c = 0;
    u.addEventListener("click", () => {
      u.innerHTML = String(++c);
    });
    let d = { x: 0, y: 0 };
    const f = document.querySelector("#caret"),
      m = parseFloat(getComputedStyle(f, null).fontSize),
      P = (h, p) => {
        const y = window.innerWidth / m;
        return (
          (p += Math.floor(h / y)),
          (h %= y),
          (d.x = h),
          (d.y = p),
          (f.style.transform = `translate3d(${h}em,${p}em,0)`)
        );
      };
    let w = { x: 0, y: 0 };
    const _ = document.querySelector("#cursor"),
      v = (h, p) => (
        (w.x = h),
        (w.y = p),
        (_.style.transform = `translate3d(${h + 1}px,${p}px,0)`)
      );
    s.addEventListener("mousemove", (h) => {
      console.log("mousemove"),
        h.currentTarget.getBoundingClientRect(),
        v(h.pageX, h.pageY);
    });
    const C = {
        clxQ: () => t,
        press: () => (t = !0),
        release: () => {
          (t = !1), r.stop(), o.stop(), a.stop(), i.stop();
        },
      },
      b = C.clxQ,
      R = PA(w);
    return (
      e.addEventListener("keydown", (h) => {
        var p, y;
        (y = (p = Object.assign({
          CapsLock: () => (C.press(), "clx on"),
          Space: () => (C.press(), "clx on"),
          KeyB: () => (C.press(), "clx on"),
          KeyE: () => b() && R.press(Il.primary),
          KeyA: () => b() && (o.left.press(), o.start()),
          KeyD: () => b() && (o.right.press(), o.start()),
          KeyW: () => b() && (o.up.press(), o.start()),
          KeyS: () => b() && (o.down.press(), o.start()),
          KeyR: () => b() && (a.up.press(), a.start()),
          KeyF: () => b() && (a.down.press(), a.start()),
          KeyH: () => b() && (r.left.press(), r.start()),
          KeyL: () => b() && (r.right.press(), r.start()),
          KeyK: () => b() && (r.up.press(), r.start()),
          KeyJ: () => b() && (r.down.press(), r.start()),
          KeyY: () => b() && (n.left.press(), n.start()),
          KeyO: () => b() && (n.right.press(), n.start()),
          KeyI: () => b() && (n.up.press(), n.start()),
          KeyU: () => b() && (n.down.press(), n.start()),
          KeyP: () => b() && (i.up.press(), i.start()),
          KeyN: () => b() && (i.down.press(), i.start()),
        }))[h.code]) != null &&
          y.call(p) &&
          (h.preventDefault(), h.stopPropagation());
      }),
      e.addEventListener("keyup", (h) => {
        const p = Object.assign({
          CapsLock: () => (C.release(), "clx off"),
          Space: () => (C.release(), "clx off"),
          KeyB: () => (C.release(), "clx off"),
          KeyA: () => b() && o.left.release(),
          KeyD: () => b() && o.right.release(),
          KeyW: () => b() && o.up.release(),
          KeyS: () => b() && o.down.release(),
          KeyE: () => b() && R.release(),
          KeyR: () => b() && a.up.release(),
          KeyF: () => b() && a.down.release(),
          KeyH: () => b() && r.left.release(),
          KeyL: () => b() && r.right.release(),
          KeyK: () => b() && r.up.release(),
          KeyJ: () => b() && r.down.release(),
          KeyY: () => b() && n.left.release(),
          KeyO: () => b() && n.right.release(),
          KeyI: () => b() && n.up.release(),
          KeyU: () => b() && n.down.release(),
          KeyP: () => b() && i.up.release(),
          KeyN: () => b() && i.down.release(),
        })[h.code];
        p && (p(), h.preventDefault(), h.stopPropagation());
      }),
      {
        start() {},
        end() {
          return (t = !1), r.stop(), o.stop(), a.stop(), i.stop(), "clx off";
        },
      }
    );
  }
  function SA(e = 1) {
    var a;
    const r = [
      ...document.querySelectorAll(
        "a, button, input, textarea, select, details, [tabindex]",
      ),
    ]
      .filter((i) => i.tabIndex > -1)
      .sort((i, s) => i.tabIndex - s.tabIndex);
    if (((a = document.activeElement) == null ? void 0 : a.tabIndex) === -1) {
      r[0].focus();
      return;
    }
    const o = (r.findIndex((i) => i === document.activeElement) + e) % r.length;
    r[o].focus();
  }
});
export default OA();
