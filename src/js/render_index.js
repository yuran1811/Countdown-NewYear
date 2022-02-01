const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const APP = document.querySelector('#app');
const APP_MENU = APP.querySelector('#menu');
const APP_BOX = APP.querySelector('#box');

// Render Homepage
const CLOUD_SRC = './src/img/CloudPattern';
const CLOUD_ELE = [
	{
		name: 'bg',
		speed: 1,
		ext: 'jpg',
	},
	{
		name: 'top-left',
		speed: -2,
		ext: 'png',
	},
	{
		name: 'center-left',
		speed: 2,
		ext: 'png',
	},
	{
		name: 'bot-left',
		speed: -1,
		ext: 'png',
	},
	{
		name: 'top-right',
		speed: 3,
		ext: 'png',
	},
	{
		name: 'center-right',
		speed: -1,
		ext: 'png',
	},
	{
		name: 'bot-right',
		speed: 2,
		ext: 'png',
	},
];
APP_BOX.innerHTML = CLOUD_ELE.map(
	(item) =>
		`<div
			class="layer ${item.name}"
			data-speed="${item.speed}"
			style="background-image: url('${CLOUD_SRC}/${item.name}.${item.ext}')"
		></div>`
).join('');

// Render Menu List
const MENU_ELE = [
	{
		name: 'Home',
		href: '',
		newTab: 0,
	},
	{
		name: 'Count Down',
		href: './countdown.html',
		newTab: 1,
	},
	{
		name: 'Lucky Card',
		href: '',
		newTab: 0,
	},
	{
		name: 'About',
		href: '',
		newTab: 0,
	},
];
APP_MENU.innerHTML = MENU_ELE.map(
	(item, index) => `
		<li
			data-direct="${item.newTab}"
			data-link="${item.name.toLowerCase().split(' ').join('-')}"
			style="--t: 0.${index + 3}s;"
		>
			<a
				href="${item.href || '#'}"
				${item.newTab ? 'target="_blank" rel="noopener"' : ''}
			>
				${item.name}
			</a>
		</li>`
).join('');
APP_MENU.innerHTML += `
	<div class="cloud cloud1"
		style="
			background-image: url('./src/img/CloudPattern/1.png')
		">
	</div>
	<div class="cloud cloud2"
		style="
			background-image: url('./src/img/CloudPattern/2.png')
		">
	</div>`;

// Render Lucky Card UI
const headCard = `./src/img/Card/head.png`;
const tailCard = `./src/img/Card/tail.png`;
const luckyCardSection = $('.lucky-card');

const moneyLocal = JSON.parse(localStorage.getItem('money')) || 0;
const noticeLocal = localStorage.getItem('notice') || 0;
const cardActiveLocal = JSON.parse(localStorage.getItem('cardActive')) || 0;

luckyCardSection.innerHTML += `
	<div class="card ${cardActiveLocal ? 'active' : ''}">
		<div class="part mid flip-card">
			<div class="part head" style="
				background-image: url('${headCard}')">
			</div>

			<div class="flip-card-inner">
				<div class="flip-card-front"></div>
				<div class="flip-card-back">
					<span class="money">${moneyLocal}k</span>
					<p class="notice">${noticeLocal}</p>
				</div>
			</div>

			<div class="part tail" style="
				background-image: url('${tailCard}')">
			</div>
		</div>
	</div>

	<div class="heading">
		<p>
			You have 1 chance to get
			<span class="highlight">Lucky Card !</span>
		</p>
		<button class="get-card">
			<svg class="progress" width="190" height="190">
				<circle
					class="progress-circle"
					cx="95" cy="95" r="90"
					fill="transparent"
					stroke-width="5"
					stroke="#b29259"
				/>
			</svg>
			Get
		</button>
		<p class="desc">Click and hold the Get Button</p>
	</div>`;

// Render About UI
const aboutSection = $('.about');
aboutSection.innerHTML = `
	<div class="container">
		<div class="heading">About</div>
		<p class="desc">
			For bringing memorable memories to people during Tet Holiday, I decided to create this site.
		</p>
		<p class="desc">
			If you love this project, give me 1 star on
			<a class="gh-link" href="https://github.com/yuran1811/Countdown-NewYear" target="_blank" rel="noopener">Github</a>
			and share it to others.
		</p>
		<p class="desc">Thanks a lot!</p>
	</div>`;
