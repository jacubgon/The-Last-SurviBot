const Game = {
	ctx: undefined,
	width: innerWidth,
	height: innerHeight,
	scoreBoard: ScoreBoard,
	velocity: 5,
	fps: 60,
	keys: {
		JUMP: 'Space',
		SHOOT: 'KeyF',
		RIGHT: 'ArrowRight',
		LEFT: 'ArrowLeft',
		UP: 'KeyG'
	},
	pressed:undefined,
	


	init() {
		const canvas = document.querySelector('canvas');
		canvas.style.display = 'block'

		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');

		this.setup();
		this.start();
	},

	setup() {  
		console.log('Estableciendo valores iniciales para el juego');

		this.player = new Player(0, 0, this);
		this.background = new Background(this);
		this.boss = new Boss(0,0,this)
		this.bso = new Audio ('assets/stranger.mp3')
		this.bso.play()
		this.bsoBoss = new Audio ('assets/boss.mp3')
		this.bsoGameOver = new Audio('assets/game over.wav')
		this.bsoVictory = new Audio('assets/victoria.mp3')
		
		

		this.obstacles = [];

		this.score = 0;
		let collisionCount = 0;

		this.scoreBoard.init(this.ctx);
		
	},

	start() {
		this.frameCounter = 0;
		this.progress = 0;


		this.animationLoopId = setInterval(() => {
			this.clear();

			this.frameCounter++;
		
				this.score += 0.01;
            //ESTO FUNCIONA, SE PARA EL AVANCE DESPUES DE CONSEGUIR 10 PUNTOS
			if(this.score > 10){
				this.velocity = 0;
			}
			if(this.score > 10){
				this.bso.pause()
				this.bsoBoss.play()
			}
			
			if (this.velocity !== 0) {
				this.progress++;
			}

			if (this.progress %  60 === 0) this.generateObstacle();

			this.drawAll();
			this.moveAll();

			this.scoreBoard.update(this.score);

			if (this.isCollision()) this.gameOver();
			
			if (this.isCollisionBulletBoss()) this.gameOver();
		
			if (this.isCollisionBullet2()) this.youWin();
		

			if (this.isCollisionBullet()) console.log('Colisión bullet');
			if (this.isCollisionBullet2()) console.log('Colisión bullet2 con boss');
			


			this.clearObstacles();
		}, 1000 / this.fps);
	},

	drawAll() {
		this.background.draw();  
		
		this.obstacles.forEach((obstacle) => {
			obstacle.draw(this.frameCounter);
		});
		
		if(this.score > 10){
			this.boss.draw(this.frameCounter);
			
			if (this.frameCounter % 50 === 0) this.boss.shootboss();

		}

		this.player.draw(this.frameCounter);

		
		

	},

	moveAll() {
		this.background.move();

		this.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		this.player.move(this.frameCounter);
		
		if(this.score > 10){
			this.player.movefinal(this.frameCounter)
		};
		
		this.boss.move(this.frameCounter);
		
	},

	clearObstacles() {
		this.obstacles = this.obstacles.filter(
			(obstacle) => obstacle.pos.x + obstacle.width > 0
		);
	},

	isCollision() {
		return this.obstacles.some(
			(obstacle) =>
				this.player.pos.x + this.player.width - 40 > obstacle.pos.x &&
				this.player.pos.x < obstacle.pos.x + obstacle.width-50 &&
				this.player.pos.y + this.player.height - 40 > obstacle.pos.y &&
				this.player.pos.y < obstacle.pos.y + obstacle.height
		);
	},
 //////// --- ESTA COLOSIONA CON LOS ENEMIGOS ---
	isCollisionBullet() {
		return this.player.bullets.some((bullet) => {
			return this.obstacles.some((obstacle) => {
				const isCollision =
					bullet.pos.x-40 + bullet.radius > obstacle.pos.x &&
					bullet.pos.x-40 - bullet.radius < obstacle.pos.x + obstacle.width &&
					bullet.pos.y+30 + bullet.radius > obstacle.pos.y &&
					bullet.pos.y+50 - bullet.radius < obstacle.pos.y + obstacle.height;

				if (isCollision) {
					this.obstacles = this.obstacles.filter((o) => o !== obstacle);
					this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
				}
				

				return isCollision;
			});
		});
	},

	isCollisionBullet2() {
		return this.player.bullets2.some((bullet2) => {
			const isCollision =
				bullet2.pos.x - bullet2.radius > this.boss.pos.x &&
				bullet2.pos.x + bullet2.radius < this.boss.pos.x + this.boss.width &&
				bullet2.pos.y - bullet2.radius > this.boss.pos.y &&
				bullet2.pos.y + bullet2.radius < this.boss.pos.y-120 + this.boss.height;
	
			if (isCollision) {
				this.boss.health -= 1;
				this.player.bullets2 = this.player.bullets2.filter((b) => b !== bullet2);
			}
	
			return isCollision;
		});
	},
	




	isCollisionBulletBoss() {
		return this.boss.bulletsboss.some((bulletboss) => {
			const isCollision =
				bulletboss.pos.x - bulletboss.radius > this.player.pos.x &&
				bulletboss.pos.x + bulletboss.radius < this.player.pos.x + this.player.width &&
				bulletboss.pos.y - bulletboss.radius > this.player.pos.y &&
				bulletboss.pos.y  + bulletboss.radius > this.player.pos.y - this.player.height;
	
			if (isCollision) {
				console.log('estoy colisionando bulletboss')
				this.boss.bulletsboss = this.boss.bulletsboss.filter((b) => b !== bulletboss);
			}
	
			return isCollision;
		});
	},
	
	generateObstacle() {
		this.obstacles.push(new Obstacle(this));
	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	gameOver() {
		this.bsoGameOver.play()
		this.bso.pause()
		this.bsoBoss.pause()
		
		clearInterval(this.animationLoopId);
		if (confirm('FIN DEL JUEGO. ¿VOLVER A EMPEZAR?')) this.init();
	},
	youWin(){
		this.bso.pause()
		this.bsoBoss.pause()
		this.bsoVictory.play()
		clearInterval(this.animationLoopId);
		if (confirm('ENHORABUENA! HAS GANADO')) this.init();

	},
};
