class Bullet2 {
	constructor(game) {
		this.game = game;

		const { player } = game;

		this.pos = {
			x: player.pos.x + player.width / 2,
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
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		ctx.closePath();
	}

	move() {
		
			this.pos.y -= this.speed.y;

	
	}
}