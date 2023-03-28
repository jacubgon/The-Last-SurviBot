class BulletBoss {
	constructor(game) {
		this.game = game;

		const { boss } = game;

		this.pos = {
			x: boss.pos.x + boss.width / 2,
			y: boss.pos.y + boss.height,
		};

		this.speed = {
			x: 10,
			y: 10,
		};

		this.radius = 10;
	}

	draw() {
		const { ctx } = this.game;

		ctx.beginPath();
		ctx.save();
		ctx.fillStyle = 'green';
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		ctx.closePath();
	}

	move() {
		
			this.pos.y += this.speed.y;
			

	
	}
}