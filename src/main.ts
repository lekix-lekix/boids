import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas"></canvas>
`
var canvasElement = document.querySelector("#canvas");
var ctx = canvasElement.getContext("2d");
// the width of the canvas
let cw = (canvasElement.width = 1000),
  cx = cw / 2;
  //the height of the canvas
let ch = (canvasElement.height = 1000),
  cy = ch / 2;
  //your data

let L = 60
let a = 20,
  b = 20,
  c = L;

let R = (L *.5) / Math.cos(Math.PI/6);

//draw the circumscribed circle:
ctx.beginPath();
ctx.arc(cx, cy, R, 0, 2 * Math.PI);
ctx.stroke();

const getTriangle = (x, y, R) => {
    const triangle = {
        //the first vertex is on the circumscribed circle at 0 radians where R is the radius of the circle ( R)
        //you may decide to change this.
        x1: x + R,
        y1: y,
        //the second vertex is on the circumscribed circle at 2*Math.PI/3 radians 
        //you may decide to change this.
        x2: x + R * Math.cos(2*Math.PI/3),
        y2: y + R * Math.sin(2*Math.PI/3),
        //calculate the 3-rd vertex
        x3: x + R * Math.cos(4*Math.PI/3),
        y3: y + R * Math.sin(4*Math.PI/3)
    };
    return triangle;
}


const clearScreen = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

ctx.strokeStyle = "red";

const drawTriangle = (triangle) => {
    ctx.beginPath();
    ctx.moveTo(triangle.x1, triangle.y1);
    ctx.lineTo(triangle.x2, triangle.y2);
    ctx.lineTo(triangle.x3, triangle.y3);
    ctx.lineTo(triangle.x1, triangle.y1);
    ctx.closePath();
    ctx.stroke();
}

let myTriangle = getTriangle(cx, cy, R);

const launchAnim = () => {
        clearScreen();
		ctx.fillStyle = "rgb(255, 0, 0)";
        myTriangle = getTriangle(cx, cy, R);
        drawTriangle(myTriangle);
        cx++;
        requestAnimationFrame(launchAnim);
}

requestAnimationFrame(launchAnim);

// drawTriangle(triangle);

