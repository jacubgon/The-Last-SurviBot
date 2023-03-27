class Boss {
	constructor(x, y, game) {
	this.game = game;

	this.img = new Image();
	this.img.src = 'assets/ovni.png';

	this.img.currentFrame = 0;
	this.img.frameCount = 1;

	this.width = 350 ;
	this.height = 280 ;
	this.health = 5;

	this.y0 = 50;


	this.x0 = 0;

	this.pos = {
		x: this.x0,
		y: this.y0,
	};

	this.speed = {
		x: 5,
		
	};
	this.bulletsboss = [];
	console.log(this.bulletsboss)
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
		this.height,
	);

	this.bulletsboss = this.bulletsboss.filter((bulletboss) => bulletboss.pos.y - bulletboss.radius);

	this.bulletsboss.forEach((bulletboss) => {
	
		bulletboss.draw();
		bulletboss.move();
		
	
	});
}

	shootboss() {
		
		this.bulletsboss.push(new BulletBoss(this.game));
		console.log('el boss esta disparando')
    }

    animateSprite(frameCounter) {
		if (frameCounter % 6=== 0) {
			this.img.currentFrame++;

			if (this.img.currentFrame === this.img.frameCount) {
				this.img.currentFrame = 0;
			}		}
	}
	move() {
		if(this.pos.x + this.width >this.game.width|| this.pos.x < 0){
		this.speed.x *= -1;
		}
		
		this.pos.x += this.speed.x;
		
	}
}