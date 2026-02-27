(function () {

  let [x, v, a, t, i] = [0, 0, 0, {}, {}];

  addEventListener('keyup', ({ keyCode: k }) => t[k] = undefined);
  addEventListener('keydown', ({ keyCode: k }) => { tick(t[k] = Date.now()) })

  function tick(now = Date.now()) {
    x += d * (v += d * (a = - +!!(t.KeyA += (d = now - t.KeyA))));
    x += d * (v += d * (a = + +!!(t.KeyD += (d = now - t.KeyD))));
    v += v * 0.99 ** d
    t[k] += d;

    console.log(x)

    if (Math.abs(v + a) > 0.001) setTimeout(loop, 1)
  }) ()

})()