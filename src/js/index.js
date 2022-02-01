// <-- Parallax on Move
const homePage = $('.home');
const parallaxBox = $('#box');

homePage.classList.add('active');
homePage.addEventListener('mousemove', parallax, false);
homePage.addEventListener('touchstart', parallax, false);
homePage.addEventListener('touchmove', parallax, false);

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
// Parallax on Move -->

// <-- Tab Link Handle
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
// Tab Link Handle -->

// <-- Get Lucky Card Handle
const cardUI = $('.card');
const getButton = $('.get-card');
const circle = getButton?.querySelector('.progress-circle');
// const circleLth = circle.getTotalLength();
const circleLth = 570;

const cdIntervalTime = 250;
const cdTime = 5;
let cdCnt = 0;
let interval;

const removeHold = () => {
	$('.lucky-card').classList.remove('hold');
	clearInterval(interval);
	circle.style.strokeDashoffset = circleLth;
	cdCnt = 0;
};

const cardHandle = () => {
	clearInterval(interval);
	setTimeout(() => $('.lucky-card').classList.add('getCard'), 250);
	setTimeout(() => cardUI.classList.add('active'), 500);

	const MONEY_LIST = [5, 20, 100, 200, 500];
	const NOTICE_LIST = [
		"Don't be sad! It's not really bad.",
		"It's enough to buy a cup of Coffee!",
		"Wow! You're the lucky one.",
		"Amazing! You're done well.",
		"OMG! You're so lucky. Congratulation!",
	];

	const rand = Math.floor(Math.random() * 5);
	const moneyEle = document.querySelector('.money');
	const noticeEle = document.querySelector('.notice');
	moneyEle.innerHTML = MONEY_LIST[rand] + 'k';
	noticeEle.innerHTML = NOTICE_LIST[rand];

	localStorage.setItem('cardActive', '1');
	localStorage.setItem('money', JSON.stringify(MONEY_LIST[rand]));
	localStorage.setItem('notice', NOTICE_LIST[rand]);
};

if (cardActiveLocal) {
	luckyCardSection.classList.add('getCard');
} else {
	getButton.onmousedown = () => {
		$('.lucky-card').classList.add('hold');
		interval = setInterval(() => {
			circle.style.strokeDashoffset =
				circleLth - (cdCnt / cdTime) * circleLth;
			if (cdCnt === cdTime) cardHandle();
			cdCnt += cdIntervalTime / (cdTime * 100);
		}, cdIntervalTime);
	};
	getButton.onmouseup = removeHold;
	getButton.onmouseout = removeHold;

	getButton.addEventListener('touchstart', getButton.onmousedown);
	getButton.addEventListener('touchend', removeHold);
	getButton.addEventListener('touchcancel', removeHold);
}
// Get Lucky Card Handle -->

// <-- Start UI Handle
const bgm = $('.bgm');
const audio = $('.bgm audio');
const overlay = $('.overlay');
const startBtn = $('.start-btn');
startBtn.onclick = () => {
	audio.play();
	bgm.classList.add('active');
	overlay.classList.add('hide');
	setTimeout(() => (overlay.style.display = 'none'), 300);
};
// Start UI Handle -->

// <-- BGM Play Handle
bgm.onclick = () => {
	bgm.classList.toggle('active');
	if (bgm.className.includes('active')) audio.play();
	else audio.pause();
};
// BGM Play Handle -->
