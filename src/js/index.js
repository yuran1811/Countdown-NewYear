// Parallax on Move
const parallaxBox = $('#box');
document.body.addEventListener('mousemove', parallax, false);
document.body.addEventListener('touchstart', parallax, false);
document.body.addEventListener('touchmove', parallax, false);

function parallax(event) {
	const layers = $$('.layer');
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
		const x = (parallaxBox.offsetWidth - point.x * speed) / 100;
		const y = (parallaxBox.offsetHeight - point.y * speed) / 100;
		layer.style.transform = `translate(${x}px, ${y}px)`;
	});
}

// Event Handle
const playBtn = $('.bgm');
playBtn.onclick = () => {
	playBtn.classList.toggle('active');
	if (playBtn.className.includes('active'))
		playBtn.querySelector('audio').play();
	else playBtn.querySelector('audio').pause();
};

$('.home').classList.add('active');

const links = $$('#menu li');
links.forEach((item) => {
	item.onclick = (e) => {
		if (item.dataset.direct == 1) return;

		e.preventDefault();
		$('#menu-toggle').checked = false;

		const lastActive = $('section.page.active');
		if (lastActive) lastActive.classList.remove('active');

		const index = item.dataset.link;
		$(`section[class~='${index}']`)?.classList.add('active');
	};
});
