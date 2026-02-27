const g = window;
const s = g.clxState ??= {};
s.unload?.(); s.unload = (function ({ ac = new AbortController() } = {}) {
  const signal = ac.signal;
  let [d, x, v, a, s, t, p] = [0, 0, 0, 0, 0, 0, 10];
  let id = undefined
  /** @type {Record<string, number>} */
  const m = {}

  g.addEventListener('keyup', ({ code: c }) => { delete m[c] }, { signal });
  g.addEventListener('keydown', ({ code: c, repeat: r }) => r || tick(m[c] = Date.now()), { signal })

  function tick(now = Date.now()) {
    t ||= now; t += (s = (now - t) / 1000) * 1000
    x += s * (v += s * (p * (a = - +!!(m.KeyA) + +!!(m.KeyD)) ));
    // - (v ** 3) * 0.1 ** Math.abs(a)
    
    d += x | 0; x -= x | 0;
    console.log(d, x, v, a, s, t, m)
    if (Math.abs(v) < 0.0001) v = 0;
    if (v || a) id = setTimeout(tick, 1); else t = 0;
  }
  return () => { id && clearTimeout(id); ac.abort() }
})()