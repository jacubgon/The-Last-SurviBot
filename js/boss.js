class Boss {
	constructor(x, y, game) {
	this.game = game;

	this.img = new Image();
	this.img.src = 'assets/run.png';

	this.img.currentFrame = 0;
	this.img.frameCount = 8;

	this.width = 146 * 0.5;
	this.height = 180 * 0.5;

	this.y0 = 0;


	this.x0 = 0;

	this.pos = {
		x: this.x0,
		y: this.y0,
	};

	this.speed = {
		x: 5,
		y: 0,
	};
}}
