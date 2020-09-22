let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", ()=> {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

// Arc / Circle
class Circle {
    constructor(x, y, dx, dy, radius, r, g, b, ds) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ds = ds;
        this.radius = radius;
        this.color = `rgba(${r},${g},${b},0.9)`;
        this.maxRadius = radius + 40;
        this.minRadius = radius

        this.draw = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.strokeStyle = 'white';
            context.fillStyle = this.color;
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

            if (
              mouse.x - this.x < this.ds &&
              mouse.x - this.x > -this.ds &&
              mouse.y - this.y < this.ds &&
              mouse.y - this.y > -this.ds &&
              this.radius < this.maxRadius
            ) {
              this.radius += 1;
            } else if (this.radius > this.minRadius) {
              this.radius -= 1;
            }

            this.draw();
        };
    }
}

let circleArray = [];
function init() {
    circleArray = [];
    for (let i = 0; i < 800; i++) {
      //
      let minRadius = 2;
      let maxRadius = 5;
      let radius = Math.random() * (maxRadius - minRadius) + minRadius;
      //
      let x = Math.random() * (innerWidth - radius * 20) + radius;
      let y = Math.random() * (innerHeight - radius * 20) + radius;
      //
      let dx = (Math.random() - 0.5) * 2;
      let dy = (Math.random() - 0.5) * 2;
      //
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      const ds = 75;

      circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b, ds));
    }
}


function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let j = 0; j < circleArray.length; j++) {
        const circle = circleArray[j];
        circle.update();
    }
}

init();
animate();