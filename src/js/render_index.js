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

// Render Lucky Card UI
const luckyCardSection = $('.lucky-card');
luckyCardSection.innerHTML = `
	<div class="card">
		<div class="">
		</div>
	</div>
	<div class="heading">
		You have 1 chance to get Lucky Card !
		<button class="get-card">Get</button>
	</div>
`;
