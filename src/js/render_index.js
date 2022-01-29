const APP = document.querySelector('#app');
const APP_MENU = APP.querySelector('#menu');
const APP_BOX = APP.querySelector('#box');

const CLOUD_SRC = './src/img/CloudPattern';
const CLOUD_ELE = [
	{
		name: 'bg',
		speed: 0.4,
	},
	{
		name: 'top-left',
		speed: -2,
	},
	{
		name: 'center-left',
		speed: 3,
	},
	{
		name: 'bot-left',
		speed: -3,
	},
	{
		name: 'top-right',
		speed: 4,
	},
	{
		name: 'center-right',
		speed: -2,
	},
	{
		name: 'bot-right',
		speed: 3,
	},
];

APP_BOX.innerHTML = CLOUD_ELE.map(
	(item) =>
		`<div
			class="layer ${item.name}"
			data-speed="${item.speed}"
			style="background-image: url('${CLOUD_SRC}/${item.name}.png')"
		></div>`
).join('');

// APP_MENU.innerHTML = '';
