import style from "../css/style.scss";

if(process.env.NODE_ENV === 'development') {
	console.log('Working in development mode');
}

const $ = document.querySelector.bind(document);
const map = $('.js-map');
const list = $('.js-var');
const info = $('.js-info');
const desc = $('.js-desc');
const final = 4;

// размеры и координаты посчитаны заранее и передаются в процентах
const allItem = [
	{
		url: 'img/balerina.png',
		sys_name: 'balerina',
		ru_name: 'Балерина',
		cord: {
			x: 50,
			y: 43
		},
		size: {
			sw: 6,
			sh: 14.5,
		}
	},
	{
		url: 'img/comb.png',
		sys_name: 'comb',
		ru_name: 'Гребень',
		cord: {
			x: 85,
			y: 47
		},
		size: {
			sw: 4,
			sh: 6.5,
		}
	},
	{
		url: 'img/mirror.png',
		sys_name: 'mirror',
		ru_name: 'Стекло',
		cord: {
			x: 17,
			y: 41,
		},
		size: {
			sw: 4,
			sh: 9.2,
		}
	},
	{
		url: 'img/parfume.png',
		sys_name: 'parfume',
		ru_name: 'Духи',
		cord: {
			x: 27,
			y: 63
		},
		size: {
			sw: 4,
			sh: 6.5,
		}
	},
	{
		url: 'img/apple.png',
		sys_name: 'apple',
		ru_name: 'Яблоко',
		cord: {
			x: 60,
			y: 50
		},
		size: {
			sw: 4,
			sh: 6.5,
		}
	},

	{
		url: 'img/basket.png',
		sys_name: 'basket',
		ru_name: 'Корзина',
		cord: {
			x: 45,
			y: 43
		},
		size: {
			sw: 15,
			sh: 15,
		}
	},
	{
		url: 'img/book.png',
		sys_name: 'book',
		ru_name: 'Книга',
		cord: {
			x: 66,
			y: 60
		},
		size: {
			sw: 6,
			sh: 7,
		}
	},
	{
		url: 'img/fan.png',
		sys_name: 'fan',
		ru_name: 'Веер',
		cord: {
			x: 33,
			y: 51
		},
		size: {
			sw: 6,
			sh: 7,
		}
	},
	{
		url: 'img/glass_bird.png',
		sys_name: 'glass_bird',
		ru_name: 'Стеклянная птица',
		cord: {
			x: 25,
			y: 23
		},
		size: {
			sw: 7,
			sh: 9,
		}
	},

	{
		url: 'img/playing_card.png',
		sys_name: 'playing_card',
		ru_name: 'Игральная карта',
		cord: {
			x: 82,
			y: 48
		},
		size: {
			sw: 4,
			sh: 11,
		}
	},
	{
		url: 'img/purse.png',
		sys_name: 'purse',
		ru_name: 'Сумка',
		cord: {
			x: 26,
			y: 60
		},
		size: {
			sw: 9,
			sh: 11,
		}
	},
	{
		url: 'img/shoe.png',
		sys_name: 'shoe',
		ru_name: 'Туфля',
		cord: {
			x: 55,
			y: 78
		},
		size: {
			sw: 7,
			sh: 8,
		}
	},
];
let itemsForGame = [];
let timerId = null;

class Game {
	constructor(data) {
		this.map = data.map;
		this.list = data.list;
		this.info = data.info;
		this.desc = data.desc;
		this.final = data.final || 4;
		this.items = data.items;
		this.timerId = null;
		this.tempArr = [];
		this.index = 0;
	}

	addEventListener() {
		this.map.addEventListener('click', (e) => {
			let item = e.target.closest('.item');
			if(!item) return;
			if(!map.contains(item)) return;

			console.log('tit');
			let name = item.getAttribute('data-sysname');
			this.hitItem(item, name);
		});
	}

	createTempArrForGame() {
		this.items.sort(function () {
			return 0.5 - Math.random()
		});
		this.tempArr = this.items.splice(0, final);
	}

	createImgTemplate() {
		this.tempArr.forEach(item => {
			let template = `<div class="item item_${item.sys_name}" data-sysname="${item.sys_name}" style="background-image: url(${item.url});left:${item.cord.x}%;top:${item.cord.y}%;width:${item.size.sw}%;height:${item.size.sh}%;"></div>`
			this.list.insertAdjacentHTML('beforeend', template);
		});
	}

	createTextTemplate() {
		this.info.innerHTML = '';

		this.tempArr.forEach(item => {
			let template = '';
			if(item.hit) {
				template = `<li style="text-decoration: line-through;">${item.ru_name}</li>`
			} else {
				template = `<li>${item.ru_name}</li>`
			}
			this.info.insertAdjacentHTML('beforeend', template);
		});
	}

	helpUser() {
		clearTimeout(this.timerId);
		this.timerId = setTimeout(() => {
			let item = this.tempArr[this.index];
			if(item.hit) {
				this.index++;
				this.helpUser()
			} else {
				this.helpClass(this.searchElem(item.sys_name));
			}
		}, 5000)
	}

	helpClass(el) {
		el.classList.add('help');
	}

	searchElem(name) {
		return $(`.item_${name}`);
	}

	checkFinal() {
		let count = 0;
		this.tempArr.forEach(el => {
			if(el.hit) {
				count++;
			}
		});
		if(count === final) {
			this.desc.style.display = 'none';
			this.showFinal();
		}
	}

	showFinal() {
		let template = `<div class="final"><div class="final__logo"><img src="" alt="logo"></div><a class="final__btn" href="#">Play Free</a></div>`;
		this.map.insertAdjacentHTML('beforeend', template)
	}

	hitItem(el, name) {
		this.tempArr.forEach(item => {
			if(item.sys_name === name) {
				item.hit = true;
				this.helpUser();
			}
		});
		this.addAnimateHit(el);

		this.checkFinal();
	}

	addAnimateHit(el) {

		if(el.classList.contains('help')) {
			el.classList.remove('help');
		}

		el.classList.add('animateHit');
		this.createTextTemplate();
	}

	init() {
		this.createTempArrForGame();
		this.createImgTemplate();
		this.createTextTemplate();
		this.helpUser();
		this.addEventListener();
	}
}


window.addEventListener('load', function () {
	let game = new Game({
		items: allItem,
		map,
		desc,
		list,
		info,
		final
	});
	let player;
	let container = $('.js-video');

	function setSizeVideo() {
		let frame = $('.js-video iframe'),
			width = container.offsetWidth,
			height = container.offsetHeight;
		frame.style.width = `${width}px`;
		frame.style.height = `${width * (9 / 16)}px`;
	}


	let tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	window.onYouTubePlayerAPIReady = function () {
		player = new YT.Player('yt-video', {
			videoId: 'id',
			playerVars: { 'autoplay': 1, 'info': 0, 'rel': 0, 'wmode': 'transparent' },
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	};

	function onPlayerReady() {
		// setSizeVideo();
	}

	function onPlayerStateChange(event) {
		if(event.data === 0) {
			container.style.display = 'none';
			game.init();
		}
	}

	window.addEventListener('resize', function () {
		// setSizeVideo();
	})

});



