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

			<div id="countdown" class="countdown">
				${this.TIME_ELE.map(
					(item) => `
					<div class="time">
						<h2 id="${item}">00</h2>
						<small>${item}</small>
					</div>`
				).join('')}
			</div>
			
			<img
				src="${SPINNER_SRC}"
				alt="Loading..."
				id="loading"
				class="loading"
			/>`;
	},

	handle() {
		const days = document.getElementById('days');
		const hours = document.getElementById('hours');
		const minutes = document.getElementById('minutes');
		const seconds = document.getElementById('seconds');
		const countdown = document.getElementById('countdown');
		const year = document.getElementById('year');
		const loading = document.getElementById('loading');

		let updateCD;

		const currentYear = new Date().getFullYear();
		const newYearTime = new Date(`February 1 ${currentYear} 00:00:00`);

		year.innerText = currentYear;

		function lastCountDown() {
			[days, hours, minutes].forEach(
				(item) => (item.style.display = 'none')
			);
		}

		function updateCountdown() {
			const currentTime = new Date();
			const diff = newYearTime - currentTime;

			const d = Math.floor(diff / 1000 / 60 / 60 / 24);
			const h = Math.floor(diff / 1000 / 60 / 60) % 24;
			const m = Math.floor(diff / 1000 / 60) % 60;
			const s = Math.floor(diff / 1000) % 60;

			days.innerHTML = d;
			hours.innerHTML = h < 10 ? '0' + h : h;
			minutes.innerHTML = m < 10 ? '0' + m : m;

			if (!d && !h && !m) {
				lastCountDown(days, hours, minutes);
				if (!s) {
					clearInterval(updateCD);
					setTimeout(() => {
						window.location.href = './firework.html';
					}, 1000);
				}
			}

			seconds.innerHTML = s < 10 ? '0' + s : s;
		}

		setTimeout(() => {
			loading?.remove();
			countdown.style.display = 'flex';
		}, 1000);

		updateCD = setInterval(updateCountdown, 1000);
	},

	run() {
		this.render();
		this.handle();
	},
};

COUNT_DOWN.run();
