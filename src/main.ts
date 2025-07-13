import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas"></canvas>
`
var canvasElement = document.querySelector("#canvas");
var ctx = canvasElement!.getContext("2d");
// the width of the canvas
let cw = (canvasElement.width = 1000),
  cx = cw / 2;
  //the height of the canvas
let ch = (canvasElement.height = 1000),
  cy = ch / 2;
  //your data

let L = 50;

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
    public center: {x: number, y: number};
    public target: {x: number, y: number};
    private angle: number = 0;
    private maxTurn: number = 0.05;
    public targetAngle: number = 0;

    constructor(xArg: number, yArg:number, RArg:number) {
        this.x = xArg;
        this.y = yArg;
        this.R = RArg;
        this.v1 = {x: 0, y: 0};
        this.v2 = {x: 0, y: 0};
        this.v3 = {x: 0, y: 0};
        this.center = {x: 0, y: 0};
        this.target = {x: 0, y: 0};
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

    public getVerticeLength(vertice1: {x: number, y:number}, vertice2: {x: number, y:number}) {
        return (Math.sqrt(vertice2.x - vertice1.x) ** 2 + (vertice2.y - vertice1.y) ** 2);
    }

    public setCenter() {
        this.center.x = (this.v1.x + this.v2.x + this.v3.x ) / 3;
        this.center.y = (this.v1.y + this.v2.y + this.v3.y ) / 3;
    }

    public draw() {
        ctx.beginPath();
        ctx.moveTo(this.v1.x, this.v1.y);
        ctx.lineTo(this.v2.x, this.v2.y);
        ctx.lineTo(this.v3.x, this.v3.y);
        ctx.lineTo(this.v1.x, this.v1.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.fillRect(this.center.x, this.center.y, 1, 1);
    };

    public rotateToTarget() {
        let angleDiff = this.targetAngle - this.angle;
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        else if (angleDiff < Math.PI * -1) angleDiff += 2 * Math.PI;
        if (angleDiff > this.maxTurn) this.angle += this.maxTurn;
        else if (angleDiff < this.maxTurn * -1) this.angle -= this.maxTurn;
        else this.angle += angleDiff;
    }

    public moveToTarget() {
        const xDir = Math.cos(this.angle);
        const yDir = Math.sin(this.angle);
        const dx = xDir * 2;
        const dy = yDir * 2;
        this.x += dx;
        this.y += dy;
        // this.v1.x += dx;
        // this.v1.y += dy;
        // this.v2.x += dx;
        // this.v2.y += dy;
        // this.v3.x += dx;
        // this.v3.y += dy;
    }

    public setTargetAngle() {
        const targetVec = {dx: this.target.x - this.center.x, dy: this.target.y - this.center.y}; 
        this.targetAngle = Math.atan2(targetVec.dy, targetVec.dx)
    }

    public update() {
        // const newAngleRadians = (this.targetAngle * Math.PI) / 180;
        // this.angle = (this.angle + newAngleRadians) % (2 * Math.PI);
        if (this.targetAngle != this.angle)
            this.rotateToTarget();
        if (this.center.x != this.target.x || this.center.y != this.target.y)
            this.moveToTarget();
        this.setVertices();
        this.setCenter();
        this.setTargetAngle();
        console.log(this.targetAngle, this.angle);
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

const triangle = new Triangle(500, 500, R);

document.addEventListener("click", (event) => {
    triangle.target.x = event.x;
    triangle.target.y = event.y;
})

const launchAnim = () => {
    clearScreen();
    // let deg = 1;
    // for (const triangle of triangles)
    // {
    //     ctx.fillStyle = "rgb(255, 0, 0)";
    //     triangle.draw();
    //     triangle.update();
    //     // deg += 0.005;
    // }
    console.log(triangle.target.x, triangle.target.y);
    console.log(triangle.x, triangle.y);
    triangle.draw();
    triangle.update();
    requestAnimationFrame(launchAnim);
}

requestAnimationFrame(launchAnim);

// drawTriangle(triangle);

