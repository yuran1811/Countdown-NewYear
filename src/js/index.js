// Parallax on Move

const el = document.getElementById('box');
el.addEventListener('mousemove', parallax, false);
el.addEventListener('touchstart', parallax, false);
el.addEventListener('touchmove', parallax, false);

function parallax(event) {
	const layers = document.querySelectorAll('.layer');
	layers.forEach((layer) => {
		event.preventDefault();
		let point = {};

		if (event.targetTouches) {
			point.x = event.targetTouches[0].clientX;
			point.y = event.targetTouches[0].clientY;
		} else {
			point.x = event.clientX;
			point.y = event.clientY;
		}
		const speed = layer.dataset.speed;
		const x = (el.offsetWidth - point.x * speed) / 100;
		const y = (el.offsetHeight - point.y * speed) / 100;
		layer.style.transform = `translate(${x}px, ${y}px)`;
	});
}
