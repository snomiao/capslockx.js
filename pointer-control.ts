import { AccModel2D, Ticker } from "./index.ts";

// Get the canvas and its context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Initial position of the object
let position = { x: canvas.width / 4, y: canvas.height / 4 };

// Create the 2D acceleration model
const model2D = AccModel2D(
  (dx = 0, dy = 0) => {
    position.x += dx;
    position.y += dy;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the object at the new position
    ctx.beginPath();
    ctx.arc(position.x, position.y, 30, 0, 2 * Math.PI);
    ctx.fill();
  },
  { speed: Math.sqrt(canvas.width * canvas.height), halflife: 200 },
);

// Wrap the model in a ticker
const pointerControl = Ticker(model2D);
pointerControl.start();

// initial moving,
setTimeout(() => {
  pointerControl.right.press();
  pointerControl.start();
  pointerControl.down.press();
  pointerControl.start();
}, 0);
setTimeout(() => {
  pointerControl.down.release();
}, 500);
setTimeout(() => {
  pointerControl.right.release();
}, 900);

// Add event listeners to control the model with arrow keys
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      pointerControl.left.press();
      pointerControl.start();
      break;
    case "ArrowRight":
    case "d":
      pointerControl.right.press();
      pointerControl.start();
      break;
    case "ArrowUp":
    case "w":
      pointerControl.up.press();
      pointerControl.start();
      break;
    case "ArrowDown":
    case "s":
      pointerControl.down.press();
      pointerControl.start();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      pointerControl.left.release();
      break;
    case "ArrowRight":
    case "d":
      pointerControl.right.release();
      break;
    case "ArrowUp":
    case "w":
      pointerControl.up.release();
      break;
    case "ArrowDown":
    case "s":
      pointerControl.down.release();
      break;
  }
});
