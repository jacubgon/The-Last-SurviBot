class Player {
	constructor(x, y, game) {
		this.game = game;
        //DESCOMENTAR PARA VOLVER AL ORIGINAL
		// this.img = new Image();
		// this.img.src = 'assets/run.png';

		// this.img.currentFrame = 0;
		// this.img.frameCount = 8;
		//AQUI VA LO NUEVO (BORRAR) --->
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
		};
		this.currentSprite = this.sprites.rightRun;


      //<--- HASTA AQUI
		this.width = 146 * 0.5;
		this.height = 180 * 0.5;

		this.y0 = game.height * 0.8;
		this.x0 = game.width * 0.2 -200 ;

        //DESCOMENTAR PARA VOLVER AL ORIGINAL
		// this.x0 = game.width * 0.2;

		// this.pos = {
		// 	x: this.x0,
		// 	y: this.y0,
		// };
		//ESTO ES NUEVO (BORRAR)
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
					break;	
				case SHOOT:
					this.game.pressed = 'KeyF'
					this.shoot();
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
				console.log('shootup');
				    this.controls.up.pressed = false;	
			}
		});
	}

	draw(frameCounter) {
		const { ctx } = this.game;
		//ESTO ES NUEVO(BORRAR)-->
		if (this.controls.right.pressed) {
			this.currentSprite = this.sprites.rightRun;
		} else if (this.controls.left.pressed) {
			this.currentSprite = this.sprites.leftRun;
		}
		//<-- HASTA AQUI

		this.animateSprite(frameCounter);
        //ORIGINAL, DESCOMENTAR
		// ctx.drawImage(
		// 	this.img,
		// 	this.img.currentFrame * (this.img.width / this.img.frameCount),
		// 	0,
		// 	this.img.width / this.img.frameCount,
		// 	this.img.height,
		// 	this.pos.x,
		// 	this.pos.y,
		// 	this.width,
		// 	this.height
		// );
		//ESTO ES NUEVO(BORRAR)
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

		}
	shootup() {
			this.bullets2.push(new Bullet2(this.game));
	
			}
	
	// animateSprite(frameCounter) {
	// 	if (frameCounter % 6 === 0) {
	// 		this.img.currentFrame++;

	// 		if (this.img.currentFrame === this.img.frameCount) {
	// 			this.img.currentFrame = 0;
	// 		}
	// 	}
	// }

	//ESTO ES NUEVO
	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.currentSprite.frameIndex++;

			if (this.currentSprite.frameIndex === this.currentSprite.frames) {
				this.currentSprite.frameIndex = 0;
			}
		}
	}

	move() {
		const gravity = 0.5;

		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.speed.y = 0;
			this.pos.y = this.y0;
		}

		if (this.controls.right.pressed && this.pos.x < 400) {
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
}
