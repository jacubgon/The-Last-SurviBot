class Obstacle {
	constructor(game) {
		this.width = game.player.width / 2;
		this.height = game.player.height * 0.8;

		this.pos = {
			x: game.width,
			y: game.player.y0 + game.player.height - this.height,
		};

		this.game = game;
		this.dx = 5;
		this.img = new Image();
		this.img.src = 'assets/ladyZombieWalking.png';
		this.img.currentFrame = 0;
		this.img.frameCount = 10;
		this.speed = {
			x: 3,
		}
	}
	draw(frameCounter) {
		const { ctx } = this.game;

		this.animateSprite(frameCounter);

		ctx.drawImage(
			this.img,
			this.img.currentFrame * (this.img.width / this.img.frameCount),
			0,
			this.img.width / this.img.frameCount,
			this.img.height,
			this.pos.x,
			this.pos.y,
			this.width,
			this.height ,
		);}
	animateSprite(frameCounter) {
		if (frameCounter % 6=== 0) {
			this.img.currentFrame++;

			if (this.img.currentFrame === this.img.frameCount) {
				this.img.currentFrame = 0;
			}		}
	}

	move() {
		this.speed.x =  (this.game.velocity) ? 8 : 3
		
		this.pos.x -= this.speed.x
	
		
	}
}

