import { Point, cubicBezier, quadraticBezier, bernsteinWeight } from './bezier.js';

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to button
    document.getElementById('trigger-smoothing-animation-linear').addEventListener('click', () => {
        triggerSmoothingAnimation('smoothing-animation-linear');
    });
    document.getElementById('trigger-smoothing-animation-bezier').addEventListener('click', () => {
        triggerSmoothingAnimation('smoothing-animation-bezier');
        
        const backwards = !document.getElementById('smoothing-animation-bezier').classList.contains('animated-circle');

        draw2(Date.now(), backwards);
    });
    document.getElementById('rotate-smoothing-canvas-button').addEventListener('click', () => {
        document.getElementById('canvas-animation-2').classList.toggle('rotated-90deg');
    });


    // Start animation loop
    animate();

    // Static draws
    draw2();
});

function animate(){
    // Draw every canvas
    draw0();
    draw1();

    requestAnimationFrame(animate);
}

function draw0() {
    const canvas = document.getElementById('canvas-animation-0');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // control points
    let points = [
        new Point(50, 300),
        new Point(150, 400),
        new Point(350, 50)    
    ]

    // draw control line
    ctx.beginPath();
    ctx.fillStyle = 'red'; // color
    for(let p of points) {
        ctx.moveTo(p.x, p.y); // move before arc to avoid connecting lines
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    }
    ctx.fill();

    // bezier curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let i = 0; i <= 1; i += 0.01) {
        const p = quadraticBezier(i, points[0], points[1], points[2]);
        ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = '#ffffffaa'; // color
    ctx.stroke();

    // animate point on curve
    let duration = 10000; // ms

    const p = quadraticBezier(time(duration), points[0], points[1], points[2]);

    ctx.beginPath();
    ctx.fillStyle = 'cyan';
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // animate weight of control points
    ctx.beginPath();
    ctx.strokeStyle = 'yellow';  // border color
    ctx.lineWidth = 2;           // thickness
    for (let p of points) {
        const r = 50 * bernsteinWeight(points.indexOf(p), 2, time(duration));

        ctx.moveTo(p.x + r, p.y); // small move so circles don't connect
        
        ctx.arc(
            p.x,
            p.y,
            r,
            0,
            Math.PI * 2
        );
    }
    ctx.stroke();
}

function draw1(){
    const canvas = document.getElementById('canvas-animation-1');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // control points
    let points = [
        new Point(50, 300),
        new Point(150, 400),
        new Point(350, 50),
        new Point(450, 300)
    ]

    // draw control line
    ctx.beginPath();
    ctx.fillStyle = 'red'; // color
    for(let p of points) {
        ctx.moveTo(p.x, p.y); // move before arc to avoid connecting lines
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    }
    ctx.fill();

    // bezier curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let i = 0; i <= 1; i += 0.01) {
        const p = cubicBezier(i, points[0], points[1], points[2], points[3]);
        ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = '#ffffffaa'; // color
    ctx.stroke();

    // animate point on curve
    let duration = 10000; // ms

    const p = cubicBezier(time(duration), points[0], points[1], points[2], points[3]);

    ctx.beginPath();
    ctx.fillStyle = 'cyan';
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // animate weight of control points
    ctx.beginPath();
    ctx.strokeStyle = 'yellow';  // border color
    ctx.lineWidth = 2;           // thickness
    for (let p of points) {
        const r = 50 * bernsteinWeight(points.indexOf(p), 3, time(duration));

        ctx.moveTo(p.x + r, p.y); // small move so circles don't connect
        
        ctx.arc(
            p.x,
            p.y,
            r,
            0,
            Math.PI * 2
        );
    }
    ctx.stroke();
}

function draw2(startTime, isBackwards = false){
    const canvas = document.getElementById('canvas-animation-2');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 10;
    const dimensions = canvas.width;
    
    // draw axes
    const originX = padding;
    const originY = dimensions - padding;
    // draw lines
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(canvas.width - 20, originY); // x-axis
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, 20); // y-axis
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    // draw arrows
    ctx.beginPath();
    // X arrow
    ctx.moveTo(canvas.width - 25, originY - 5);
    ctx.lineTo(canvas.width - 15, originY);
    ctx.lineTo(canvas.width - 25, originY + 5);
    // Y arrow
    ctx.moveTo(originX - 5, 25);
    ctx.lineTo(originX, 15);
    ctx.lineTo(originX + 5, 25);
    ctx.fillStyle = 'white';
    ctx.fill();
    // draw labels
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('Zeit', canvas.width - 30, originY - 10);
    ctx.fillText('Fortschritt', originX + 10, 20);

    // control points
    let points = [
        new Point(padding, dimensions - padding),
        new Point(padding + (dimensions - padding * 2) * 0.74, padding + (dimensions) * (1 - 0.17)),
        new Point(padding + (dimensions - padding * 2) * 0.58, padding + (dimensions) * (1 - 0.91)),
        new Point(dimensions - padding, padding)
    ];

    // draw control line
    ctx.beginPath();
    ctx.fillStyle = 'red'; // color
    for(let p of points) {
        ctx.moveTo(p.x, p.y); // move before arc to avoid connecting lines
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    }
    ctx.fill();

    // bezier curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let i = 0; i <= 1; i += 0.01) {
        const p = cubicBezier(i, points[0], points[1], points[2], points[3]);
        ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = '#ffffffaa'; // color
    ctx.stroke();
    
    // if no start time is given, don't animate
    if(!startTime)
        return;

    // animate point on curve
    let duration = 2000; // ms

    let t = timeWithStart(duration, startTime);

    const p = cubicBezier(isBackwards ? 1 - t : t, points[0], points[1], points[2], points[3]);

    ctx.beginPath();
    ctx.fillStyle = 'cyan';
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // Recursively animate the point on the curve until t reaches ~1
    if(t < 0.999)
        requestAnimationFrame(() => draw2(startTime, isBackwards));
}

// [0, 1] over duration in ms
function time(duration){
    return (Date.now() % duration) / duration;
}

// [0, 1] over duration in ms while starting from start time
function timeWithStart(duration, start){
    const elapsed = Date.now() - start;
    return Math.max(0, Math.min(1, elapsed / duration));
}

function triggerSmoothingAnimation(id){
    const elmt = document.getElementById(id);
    elmt.classList.toggle('animated-circle');
}