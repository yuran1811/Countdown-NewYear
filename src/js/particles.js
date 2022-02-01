const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#ffa400', '#3D6EF7', '#ff6bcb', '#e74c3c', '#20E3B2'];
const mouse = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2,
};

const partcilesCount = 30;
let particles;

class Particle {
	constructor(x, y, radius, color, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.ttl = 200;

		this.draw = () => {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		};

		this.update = () => {
			this.draw();
			this.x += this.velocity.x;
			this.y += this.velocity.y;
			this.ttl--;
		};
	}
}

const getRandColor = (colors) => {
	return colors[Math.floor(Math.random() * colors.length)];
};

const init = () => {
	particles = [];
	for (let index = 0; index < partcilesCount; index++) {
		const radians = (Math.PI * 2) / partcilesCount;
		const x = canvas.width / 2;
		const y = canvas.height / 2;
		const velocity = {
			x: Math.cos(radians * index),
			y: Math.sin(radians * index),
		};
		particles.push(new Particle(x, y, 5, getRandColor(colors), velocity));
	}
};

const generateCircles = () => {
	setTimeout(generateCircles, 200);
	for (let index = 0; index < partcilesCount; index++) {
		const radians = (Math.PI * 2) / partcilesCount;
		const x = mouse.x;
		const y = mouse.y;
		const velocity = {
			x: Math.cos(radians * index),
			y: Math.sin(radians * index),
		};
		particles.push(new Particle(x, y, 5, getRandColor(colors), velocity));
	}
};

const animate = () => {
	requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	particles.forEach((item, index) => {
		item.ttl === 0 && particles.splice(index, 1);
		item.update();
	});
};

init();
animate();
generateCircles();

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});
