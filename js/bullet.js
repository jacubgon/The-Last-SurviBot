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
		ctx.arc(this.pos.x-40, this.pos.y+80, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		ctx.closePath();
	
	}

	move() {
			this.pos.x += this.speed.x;
		}

	}
