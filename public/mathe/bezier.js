export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// cubic Bezier curve with 4 control points
export function cubicBezier(t, p0, p1, p2, p3) {
    
    // x-component
    let x = bernsteinWeight(0, 3, t) * p0.x + bernsteinWeight(1, 3, t) * p1.x + bernsteinWeight(2, 3, t) * p2.x + bernsteinWeight(3, 3, t) * p3.x;
    // y-component
    let y = bernsteinWeight(0, 3, t) * p0.y + bernsteinWeight(1, 3, t) * p1.y + bernsteinWeight(2, 3, t) * p2.y + bernsteinWeight(3, 3, t) * p3.y;

    return new Point(x, y);
}

// quadratic Bezier curve with 4 control points
export function quadraticBezier(t, p0, p1, p2) {

    // x-component
    let x = bernsteinWeight(0, 2, t) * p0.x + bernsteinWeight(1, 2, t) * p1.x + bernsteinWeight(2, 2, t) * p2.x;
    // y-component
    let y = bernsteinWeight(0, 2, t) * p0.y + bernsteinWeight(1, 2, t) * p1.y + bernsteinWeight(2, 2, t) * p2.y;

    return new Point(x, y);
}

// quadratic Bezier curve with 4 control points
export function dynamicBezier(t, points) {
    const n = points.length - 1;

    let x = 0;
    let y = 0;

    for(let i = 0; i <= n; i++){
        // x-component
        x += bernsteinWeight(i, n, t) * points[i].x;

        // y-component
        y += bernsteinWeight(i, n, t) * points[i].y;
    }

    return new Point(x, y);
}

// i: which control point 
// n: degree
// t: time parameter [0, 1]
export function bernsteinWeight(i, n, t){
    return binomialCoefficient(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
}

// n choose i
//      n! 
// --------------
// (i! * (n - i)!)
export function binomialCoefficient(n, i){
    return (factorial(n) / (factorial(i) * factorial(n - i)))
}

// n!
export function factorial(num) {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
}