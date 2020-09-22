let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');


// Arc / Circle
class Circle {
    constructor(x, y, dx, dy, radius, r, g, b) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.r = r;
        this.g = g;
        this.b = b;

        this.draw = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.strokeStyle = 'white';
            context.fillStyle = `rgba(${r},${g},${b},0.8)`;
            context.fill();
            context.stroke();
        };

        this.update = function () {
            if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        };
    }
}


let circleArray = [];
for (let i = 0; i < 50; i++) {
    // 
    let min_radii = 15;
    let max_radii = 30;
    let radius = Math.random() * (max_radii - min_radii) + min_radii;
    // 
    let x = Math.random() * (innerWidth - radius * 20) + radius;
    let y = Math.random() * (innerHeight - radius * 20) + radius;
    // 
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;
    // 
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let j = 0; j < circleArray.length; j++) {
        const circle = circleArray[j];
        circle.update();
    }
}

animate();
console.log(canvas);