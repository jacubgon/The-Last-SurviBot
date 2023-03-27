class Player {
	constructor(x, y, game) {
		this.game = game;
    
		this.sprites = {
			rightRun: {
				img: createImage('assets/run.png'),
				frames: 8,
				frameIndex: 0,
			},
			leftRun: {
				img: createImage('assets/LeftRobot.png'),
				frames: 8,
				frameIndex: 0,
			},
			idle: {
				img: createImage('assets/Idle.png'),
				frames: 10,
				frameIndex: 0,
			},
			disparo: { 
			img: createImage('assets/shoot.png'),
			frames: 5,
			frameIndex: 0,

			}
		};
		this.currentSprite = this.sprites.rightRun;

		this.width = 246 * 0.5;
		this.height = 280 * 0.5;

		this.y0 = game.height * 0.8;
		this.x0 = game.width * 0.2 -200 ;

		this.pos = {
			x: this.x0,
			y: this.y0,
		};

		this.speed = {
			x: 0,
			y: 0,
		};

		this.bullets = [];
		this.bullets2 = [];
	
		this.setCotrols();

		this.controls = {
			right: {
				pressed: false,
			},
			left: {
				pressed: false,
			},
			up: {
				pressed: false,
			},
			
			
		};
	}
	

	setCotrols() {
		const { JUMP, SHOOT, LEFT, RIGHT, UP } = this.game.keys;

		
		addEventListener('keydown', ({ code }) => {
			switch (code) {
				case JUMP:
					if (this.y0 === this.pos.y) {
						this.speed.y = -10;
						this.pos.y -= 1;
					}
					break;
				case RIGHT:
					this.controls.right.pressed = true;
					break;
				case LEFT:
					this.controls.left.pressed = true;
					break;
				case UP: 
				this.game.pressed = 'KeyG'
				this.shootup();
				this.disparo.play()
					break;	
				case SHOOT:
					this.game.pressed = 'KeyF'
					this.shoot();
		            this.disparo = new Audio ('assets/disparo.mp3')
					this.disparo.play()
					break;
			}
		});

		addEventListener('keyup', ({ code }) => {
			switch (code) {
				case RIGHT:
					this.controls.right.pressed = false;
					break;
				case LEFT:
					this.controls.left.pressed = false;
					break;
				case UP: 
				this.controls.up.pressed = false;	
			}
		});
	}

	draw(frameCounter) {
		const { ctx } = this.game;
		let idle = true
		if (this.controls.right.pressed) {
			this.currentSprite = this.sprites.rightRun;
			idle = false;
		} else if (this.controls.left.pressed) {
			this.currentSprite = this.sprites.leftRun;
			idle = false;
		}else{
			this.currentSprite = this.sprites.idle;
		}

		this.animateSprite(frameCounter);
        
		ctx.drawImage(
			this.currentSprite.img,
			this.currentSprite.frameIndex *
				(this.currentSprite.img.width / this.currentSprite.frames),
			0,
			this.currentSprite.img.width / this.currentSprite.frames,
			this.currentSprite.img.height,
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);

		this.bullets = this.bullets.filter(
			(bullet) => bullet.pos.x - bullet.radius < this.game.width
			
		);
		
		this.bullets.forEach((bullet) => {
			bullet.draw();
			bullet.move();
		});
		this.bullets2.forEach((bullet2) => {
			bullet2.draw();
			bullet2.move();
		});
		
	}

	shoot() {
		this.bullets.push(new Bullet(this.game));
		console.log('player esta disparando')

		}
	shootup() {
			this.bullets2.push(new Bullet2(this.game));
			console.log('estoy disparando arriba')
	
			}
	
	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.currentSprite.frameIndex++;

			if (this.currentSprite.frameIndex === this.currentSprite.frames) {
				this.currentSprite.frameIndex = 0;
			}
		}
	}

	move() {
		const gravity = 0.4;

		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.speed.y = 0;
			this.pos.y = this.y0;
		}

		if (this.controls.right.pressed && this.pos.x< 400) {
			this.speed.x = 5;
		} else if (this.controls.left.pressed && this.pos.x > this.x0) {
			this.speed.x = -5;
		
		} else this.speed.x = 0;

		if (this.controls.right.pressed && this.pos.x > 400) {
			this.game.velocity = 5;
		} else this.game.velocity = 0;
		this.pos.y += this.speed.y;
		
	

		this.pos.x += this.speed.x;

		
	}
	movefinal(){
		const gravity = 0.3;

		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.speed.y = 0;
			this.pos.y = this.y0;
		}
		if (this.controls.right.pressed && this.pos.x<this.game.width - this.x0) {
			this.speed.x = 5;
		} else if (this.controls.left.pressed && this.pos.x > this.x0 - this.x0) {
			this.speed.x = -5;
		} else this.speed.x = 0;

		if (this.controls.right.pressed && this.pos.x > 400) {
			this.game.velocity = 5;
		} else this.game.velocity = 0;
		this.pos.y += this.speed.y;
		
	

		this.pos.x += this.speed.x;

	}
}
