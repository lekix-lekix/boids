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

let triangles: Triangle[] = [];
for (let i = 0; i < 80; i++)
{
    const triangle = new Triangle(cx, cy, R);
    triangles.push(triangle);
    cx -= 5;
    cy -= 5;
}

const launchAnim = () => {
    clearScreen();
    ctx.fillStyle = "rgb(255, 0, 0)";
    let deg = 1;
    for (const triangle of triangles)
    {
        triangle.draw();
        triangle.updateDegrees(deg);
        deg += 0.005;

    }
    // myTriangle.update(1);
    // if (myTriangle.v1.x > ctx.canvas.width && myTriangle.v2.x > ctx.canvas.width && myTriangle.v3.x > ctx.canvas.width)
    // // {
    //     myTriangle.updateDegrees(1);
    //     myTriangle2.updateDegrees(1.1);
    //     myTriangle3.updateDegrees(1.2);
    //     myTriangle4.updateDegrees(1.3);
        // cx = 0;
        // myTriangle.setVertices();
    // }
    requestAnimationFrame(launchAnim);
}

requestAnimationFrame(launchAnim);

// drawTriangle(triangle);

