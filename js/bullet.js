class Bullet {
	constructor(game) {
		this.game = game;

		const { player } = game;

		this.pos = {
			x: player.pos.x + player.width,
			y: player.pos.y,
		};

		this.speed = {
			x: 10,
			y: 10,
		};

		this.radius = 5;
	}

	draw() {
		const { ctx } = this.game;

		ctx.beginPath();
		ctx.save();
		ctx.fillStyle = 'yellow';
		ctx.arc(this.pos.x-20, this.pos.y+50, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		ctx.closePath();
	}

	move() {
		// const gravity = 0.5;

		// this.speed.y += gravity;
		// this.pos.y += this.speed.y;
		this.pos.x += this.speed.x;

		if (this.pos.y > this.game.player.y0 + this.game.player.height) {
		 	this.speed.y *= -1;
		}
	}
}
