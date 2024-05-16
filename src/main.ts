import "./style.css";
import userEvent from "@testing-library/user-event";
import { MouseButton } from "@testing-library/user-event/dist/cjs/system/pointer/buttons.js";
import { MouseButtonControl } from "./MouseButtonControl";
import { Ticker } from "./Ticker";
import { AccModel2D } from "./AccModel2D";
main();

function main() {
  const keyDescMap = Object.fromEntries(
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
      .split("\n")
      .map((e) => e.split("=").map((e) => e.trim()))
  );
  document.querySelector<HTMLDivElement>("#root")!.innerHTML = `
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

`;
  CapsLockX(document.querySelector<HTMLElement>("#app")!);
  [...document.querySelectorAll("kbd")].map((kbd) => {
    const desc = keyDescMap[kbd.innerHTML!];
    if (!desc) return;
    const el = Object.assign(document.createElement("span"), {
      innerHTML: desc,
      className: "key-desc",
    });
    kbd!.appendChild(el);
  });
}
function CapsLockX(root = document.documentElement) {
  let clxMode = false;
  const caretControl = Ticker(
    AccModel2D(
      (dx = 0, dy = 0) => {
        setCaretPos(caretPos.x + dx, caretPos.y + dy);
        // btnStatus(JSON.stringify([[dx, dy]]));
        // fireEvent.keyPress(textarea, {code: 'ArrowLeft'})
        textarea.selectionStart ??= 0;
        if (textarea.selectionEnd === textarea.selectionStart) {
          textarea.selectionStart += dx;
          if (dx < 0) textarea.selectionEnd += dx;
        } else {
          textarea.selectionStart += dx;
        }
      },
      { speed: 20, halflife: 200 }
    )
  );
  const pageControl = Ticker(
    AccModel2D(
      (dx = 0, dy = 0) => {
        dx < 0 && userEvent.keyboard("[Home]".repeat(Math.abs(dx)));
        dx > 0 && userEvent.keyboard("[End]".repeat(Math.abs(dx)));
        dy < 0 && userEvent.keyboard("[PageUp]".repeat(Math.abs(dy)));
        dy > 0 && userEvent.keyboard("[PageDown]".repeat(Math.abs(dy)));
      },
      { speed: 12, halflife: 10 }
    )
  );
  const mouseControl = Ticker(
    AccModel2D(
      (dx = 0, dy = 0) => setMousePos(mousePos.x + dx, mousePos.y + dy),
      {
        speed:
          Math.max(screen.width, screen.height) /
          (window.screen.availWidth / window.visualViewport!.width),
        halflife: 50,
      }
    ) // min of screen [width,height]
  );
  const scrollControl = Ticker(
    AccModel2D(
      (dx = 0, dy = 0) => {
        // if(document.activeElement){
        //   document.activeElement.scrollBy({ top: dy })
        // ;}
        document.body.scrollBy({ top: dy, behavior: "smooth" });
        document.body.scrollTop += dy;
      },
      {
        speed: Math.min(screen.width, screen.height),
      }
    ) // min of screen [width,height]
  );
  const tabModel = Ticker(
    AccModel2D(
      (dx = 0, dy = 0) => {
        DispatchTab(dy);
      },
      {
        speed: 5,
        halflife: 50,
      }
    ) // min of screen [width,height]
  );

  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.style.cursor = "none";

  const textarea = document.querySelector("textarea")! as HTMLTextAreaElement;

  const counterBtn = document.querySelector("#counter")!;
  let count = 0;
  counterBtn.addEventListener("click", () => {
    counterBtn.innerHTML = String(++count);
  });
  // const btnStatus = (msg: string) => (counterBtn.innerHTML = msg);

  let caretPos = { x: 0, y: 0 };
  const caretElement = document.querySelector("#caret")! as HTMLDivElement;

  const caretSize = parseFloat(getComputedStyle(caretElement, null).fontSize);
  const setCaretPos = (x: number, y: number) => {
    const charWidth = window.innerWidth / caretSize;
    // add overwidth x into y
    y += Math.floor(x / charWidth);
    // then trim x into charWidth;
    x %= charWidth;
    (caretPos.x = x), (caretPos.y = y);
    return (caretElement.style.transform = `translate3d(${x}em,${y}em,0)`);
  };

  let mousePos = { x: 0, y: 0 };
  const mouseElement = document.querySelector("#cursor")! as HTMLDivElement;
  const setMousePos = (x: number, y: number) => {
    (mousePos.x = x), (mousePos.y = y);
    return (mouseElement.style.transform = `translate3d(${x + 1}px,${y}px,0)`);
  };

  app.addEventListener("mousemove", (event) => {
    console.log("mousemove");
    const rect = (event.currentTarget as HTMLElement)!.getBoundingClientRect();
    setMousePos(event.pageX, event.pageY);
    // const rect = (event.currentTarget as HTMLElement)!.getBoundingClientRect();
    // setMousePos(event.clientX - rect.left, event.clientY - rect.top);
  });

  const CapsLockX = {
    clxQ: () => {
      return clxMode;
    },
    press: () => (clxMode = true),
    release: () => {
      clxMode = false;
      caretControl.stop();
      mouseControl.stop();
      scrollControl.stop();
      tabModel.stop();
    },
  };
  const clxQ = CapsLockX.clxQ;
  const mouseButton = MouseButtonControl(mousePos);
  root.addEventListener("keydown", (event) => {
    Object.assign({
      CapsLock: () => (CapsLockX.press(), "clx on"),
      Space: () => (CapsLockX.press(), "clx on"),
      KeyB: () => (CapsLockX.press(), "clx on"),
      // mouse control
      KeyE: () => clxQ() && mouseButton.press(MouseButton.primary),
      // KeyQ: () => clxQ() && mouseButton.secondary.press(),
      KeyA: () => clxQ() && (mouseControl.left.press(), mouseControl.start()),
      KeyD: () => clxQ() && (mouseControl.right.press(), mouseControl.start()),
      KeyW: () => clxQ() && (mouseControl.up.press(), mouseControl.start()),
      KeyS: () => clxQ() && (mouseControl.down.press(), mouseControl.start()),
      KeyR: () => clxQ() && (scrollControl.up.press(), scrollControl.start()),
      KeyF: () => clxQ() && (scrollControl.down.press(), scrollControl.start()),
      // caret & page
      KeyH: () => clxQ() && (caretControl.left.press(), caretControl.start()),
      KeyL: () => clxQ() && (caretControl.right.press(), caretControl.start()),
      KeyK: () => clxQ() && (caretControl.up.press(), caretControl.start()),
      KeyJ: () => clxQ() && (caretControl.down.press(), caretControl.start()),
      KeyY: () => clxQ() && (pageControl.left.press(), pageControl.start()),
      KeyO: () => clxQ() && (pageControl.right.press(), pageControl.start()),
      KeyI: () => clxQ() && (pageControl.up.press(), pageControl.start()),
      KeyU: () => clxQ() && (pageControl.down.press(), pageControl.start()),
      //
      KeyP: () => clxQ() && (tabModel.up.press(), tabModel.start()),
      KeyN: () => clxQ() && (tabModel.down.press(), tabModel.start()),
    })[event.code]?.() && (event.preventDefault(), event.stopPropagation());
  });
  root.addEventListener("keyup", (event) => {
    const fn = Object.assign({
      CapsLock: () => (CapsLockX.release(), "clx off"),
      Space: () => (CapsLockX.release(), "clx off"),
      KeyB: () => (CapsLockX.release(), "clx off"),
      // mouse control
      KeyA: () => clxQ() && mouseControl.left.release(),
      KeyD: () => clxQ() && mouseControl.right.release(),
      KeyW: () => clxQ() && mouseControl.up.release(),
      KeyS: () => clxQ() && mouseControl.down.release(),
      KeyE: () => clxQ() && mouseButton.release(),
      // KeyQ: () => clxQ() && mouseButton.secondary.release(),

      KeyR: () => clxQ() && scrollControl.up.release(),
      KeyF: () => clxQ() && scrollControl.down.release(),
      // caret
      KeyH: () => clxQ() && caretControl.left.release(),
      KeyL: () => clxQ() && caretControl.right.release(),
      KeyK: () => clxQ() && caretControl.up.release(),
      KeyJ: () => clxQ() && caretControl.down.release(),
      // page
      KeyY: () => clxQ() && pageControl.left.release(),
      KeyO: () => clxQ() && pageControl.right.release(),
      KeyI: () => clxQ() && pageControl.up.release(),
      KeyU: () => clxQ() && pageControl.down.release(),
      // tab
      KeyP: () => clxQ() && tabModel.up.release(),
      KeyN: () => clxQ() && tabModel.down.release(),
    })[event.code];
    fn && (fn(), (event.preventDefault(), event.stopPropagation()));
  });

  return {
    start() {},
    end() {
      clxMode = false;
      caretControl.stop();
      mouseControl.stop();
      scrollControl.stop();
      tabModel.stop();
      return "clx off";
    },
  };
}

function DispatchTab(step = 1) {
  const sel = "a, button, input, textarea, select, details, [tabindex]";
  const tabElements = ([...document.querySelectorAll(sel)] as HTMLElement[])
    .filter((element) => element.tabIndex > -1)
    .sort((a, b) => a.tabIndex - b.tabIndex);
  if ((document.activeElement as HTMLElement)?.tabIndex === -1) {
    tabElements[0].focus();
    return;
  }
  const currentIndex = tabElements.findIndex(
    (e) => e === document.activeElement
  );
  const nextIndex = (currentIndex + step) % tabElements.length;
  tabElements[nextIndex].focus();
}
