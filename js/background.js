class Background {
	constructor(game) {
		this.game = game;

		this.img = new Image();
		this.img.src = 'assets/fondito-weno.jpg';
		this.imgReverse = new Image();
		this.imgReverse.src = 'assets/fondito-wenoReverse.jpg';

		this.x = 0;
		this.y = 0;
	
		
	}

	draw() {
		this.game.ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.game.width,
			this.game.height
		);

		this.game.ctx.drawImage(
			this.imgReverse,
			this.x + this.game.width,
			this.y,
			this.game.width,
			this.game.height
		);


		this.game.ctx.drawImage(
			this.img,
			this.x + this.game.width * 2,
			this.y,
			this.game.width,
			this.game.height
		);

		this.game.ctx.drawImage(
			this.imgReverse,
			this.x + this.game.width * 3,
			this.y,
			this.game.width,
			this.game.height
		);
	}

	move() {
		if (this.x + this.game.velocity <= -(this.game.width * 2)) {
			this.x = 0;
		}

		this.x -= this.game.velocity;
	}
}
