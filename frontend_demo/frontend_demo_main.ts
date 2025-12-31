import {Input} from "../src/app/input";
import {V2ToString} from "../src/core/math";
import {CreateCanvasLoop} from "../src/app/canvas_loop";

const canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.tabIndex = 0;

canvas.style.display = "block"; // removes inline gaps
// canvas.style.background = "#222";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

// Draw something simple
// ctx.fillStyle = "limegreen";
// ctx.fillRect(100, 100, 150, 75);

function CanvasCallback(time: number, dt: number, input: Input, target: HTMLCanvasElement, context: CanvasRenderingContext2D)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText(V2ToString(input.MousePos()), 100, 100);
    ctx.fillText(V2ToString(input.MouseDelta()), 100, 300);
}

CreateCanvasLoop(canvas, CanvasCallback);