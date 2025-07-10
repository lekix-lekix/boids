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

class Triangle {
    public x: number;
    public y: number;
    public R: number;
    public v1: {x: number, y: number};
    public v2: {x: number, y: number};
    public v3: {x: number, y: number};
    private angle: number = 0;

    constructor(xArg: number, yArg:number, RArg:number) {
        this.x = xArg;
        this.y = yArg;
        this.R = RArg;

        this.v1 = {x: 0, y: 0};
        this.v2 = {x: 0, y: 0};
        this.v3 = {x: 0, y: 0};
        this.setVertices();
    }

    public setVertices() {
        this.v1.x = this.x + this.R * Math.cos(this.angle);
        this.v1.y = this.y + this.R * Math.sin(this.angle);
        this.v2.x = this.x + this.R * Math.cos(2 * Math.PI / 3 + this.angle);
        this.v2.y = this.y + this.R * Math.sin(2 * Math.PI / 3 + this.angle);
        this.v3.x = this.x + this.R * Math.cos(4 * Math.PI / 3 + this.angle);
        this.v3.y = this.y + this.R * Math.sin(4 * Math.PI / 3 + this.angle);        
    }

    public draw() {
        ctx.beginPath();
        ctx.moveTo(this.v1.x, this.v1.y);
        ctx.lineTo(this.v2.x, this.v2.y);
        ctx.lineTo(this.v3.x, this.v3.y);
        ctx.lineTo(this.v1.x, this.v1.y);
        ctx.closePath();
        ctx.stroke();
    }

    public update(newAngle: number) {
        this.angle = (this.angle + newAngle) % (2 * Math.PI);
        this.setVertices();
    }
    
    public updateDegrees(newAngleDegrees: number) {
        const newAngleRadians = (newAngleDegrees * Math.PI) / 180;
        this.update(newAngleRadians);
    }
}

const clearScreen = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

ctx.strokeStyle = "red";
let myTriangle = new Triangle(cx, cy, R);
let myTriangle2 = new Triangle(cx - 10, cy - 10, R);
let myTriangle3 = new Triangle(cx - 20, cy - 20, R);
let myTriangle4 = new Triangle(cx - 30, cy - 30, R);

const launchAnim = () => {
    clearScreen();
    ctx.fillStyle = "rgb(255, 0, 0)";
    myTriangle.draw();
    myTriangle2.draw();
    myTriangle3.draw();
    myTriangle4.draw();
    // myTriangle.update(1);
    // if (myTriangle.v1.x > ctx.canvas.width && myTriangle.v2.x > ctx.canvas.width && myTriangle.v3.x > ctx.canvas.width)
    // {
        myTriangle.updateDegrees(1);
        myTriangle2.updateDegrees(1);
        myTriangle3.updateDegrees(1);
        myTriangle4.updateDegrees(1);
        // cx = 0;
        // myTriangle.setVertices();
    // }
    requestAnimationFrame(launchAnim);
}

requestAnimationFrame(launchAnim);

// drawTriangle(triangle);

