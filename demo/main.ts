const canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.display = "block"; // removes inline gaps
canvas.style.background = "#222";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;



// Draw something simple
ctx.fillStyle = "limegreen";
ctx.fillRect(100, 100, 150, 75);