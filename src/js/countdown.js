const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const SPINNER_SRC = `./src/img/spinner.gif`;

const COUNT_DOWN = {
	ELE: $('#app'),
	TIME_ELE: ['days', 'hours', 'minutes', 'seconds'],

	render() {
		this.ELE.innerHTML = `
			<div id="year" class="year"></div>
			<h1>New Year Countdown</h1>

			<button style="display: none">Watch Fireworks</button>

			<div id="countdown" class="countdown">
				${this.TIME_ELE.map(
					(item) => `
					<div class="time">
						<h2 id="${item}">00</h2>
						<small>${item}</small>
					</div>`
				).join('')}
			</div>
			
			<img src="${SPINNER_SRC}" alt="Loading..." id="loading" class="loading"/>`;
	},

	handle() {
		const days = document.getElementById('days');
		const hours = document.getElementById('hours');
		const minutes = document.getElementById('minutes');
		const seconds = document.getElementById('seconds');
		const countdown = document.getElementById('countdown');
		const year = document.getElementById('year');
		const loading = document.getElementById('loading');
		const buttonFW = this.ELE.querySelector('button');

		const currentYear = 2023;
		const newYearTime = new Date(`January 22 ${currentYear} 00:00:00`);

		year.innerText = currentYear;

		const fireworkDisplay = () => {
			window.location.href = './firework.html';
		};

		const updateCountdown = () => {
			const currentTime = new Date();
			const diff = newYearTime - currentTime;

			const d = Math.floor(diff / 1000 / 60 / 60 / 24);
			const h = Math.floor(diff / 1000 / 60 / 60) % 24;
			const m = Math.floor(diff / 1000 / 60) % 60;
			const s = Math.floor(diff / 1000) % 60;

			days.innerHTML = d;
			hours.innerHTML = h < 10 ? '0' + h : h;
			minutes.innerHTML = m < 10 ? '0' + m : m;
			seconds.innerHTML = s < 10 ? '0' + s : s;

			if (!d && !h && !m) {
				this.ELE.classList.add('last-cd');
				if (!s) {
					seconds.closest('.time').querySelector('small').innerHTML =
						'Happy New Year !';
					buttonFW.style.display = 'block';

					clearInterval(updateCD);
					setTimeout(fireworkDisplay, 1500);
					return;
				} else {
					seconds.innerHTML = s + ' s';
					seconds.closest('.time').querySelector('small').innerHTML =
						'left';
				}
			}
			if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
				clearInterval(updateCD);
				days.innerHTML = '0';
				hours.innerHTML = '0';
				minutes.innerHTML = '0';
				seconds.innerHTML = '0';

				this.ELE.classList.add('new-year');
				document.querySelector(`#${this.ELE.id} > h1`).innerHTML =
					'Happy New Year !';
				buttonFW.style.display = 'block';
				return;
			}
		};
		let updateCD = setInterval(updateCountdown, 1000);

		setTimeout(() => {
			loading?.remove();
			countdown.style.display = 'flex';
		}, 1000);

		buttonFW.onclick = fireworkDisplay;
	},

	run() {
		this.render();
		this.handle();
	},
};

COUNT_DOWN.run();
