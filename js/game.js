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
		console.log(this.boss)
		

		this.obstacles = [];

		this.score = 0;

		this.scoreBoard.init(this.ctx);
	},

	start() {
		this.frameCounter = 0;
		this.progress = 0;
		this.animationLoopId = setInterval(() => {
			this.clear();

			this.frameCounter++;
		
				this.score += 0.01;

			
			
			if (this.velocity !== 0) {
				this.progress++;
			}

			if (this.progress % 90 === 0) this.generateObstacle();

			this.drawAll();
			this.moveAll();

			this.scoreBoard.update(this.score);

			if (this.isCollision()) this.gameOver();

			if (this.isCollisionBullet()) console.log('Colisión bullet');

			this.clearObstacles();
		}, 1000 / this.fps);
	},

	drawAll() {
		this.background.draw();
		

		this.obstacles.forEach((obstacle) => {
			obstacle.draw(this.frameCounter);
		});

		this.player.draw(this.frameCounter);
		this.boss.draw(this.frameCounter);
	
		
	},

	moveAll() {
		this.background.move();

		this.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		this.player.move(this.frameCounter);
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
				this.player.pos.x + this.player.width - 20 > obstacle.pos.x &&
				this.player.pos.x < obstacle.pos.x + obstacle.width-50 &&
				this.player.pos.y + this.player.height - 20 > obstacle.pos.y &&
				this.player.pos.y < obstacle.pos.y + obstacle.height
		);
	},

	isCollisionBullet() {
		return this.player.bullets.some((bullet) => {
			return this.obstacles.some((obstacle) => {
				const isCollision =
					bullet.pos.x-40 + bullet.radius > obstacle.pos.x &&
					bullet.pos.x-40 - bullet.radius < obstacle.pos.x + obstacle.width &&
					bullet.pos.y+50 + bullet.radius > obstacle.pos.y &&
					bullet.pos.y+50 - bullet.radius < obstacle.pos.y + obstacle.height;

				if (isCollision) {
					this.obstacles = this.obstacles.filter((o) => o !== obstacle);
					this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
				}
				

				return isCollision;
			});
		});
	},

	generateObstacle() {
		this.obstacles.push(new Obstacle(this));
	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	gameOver() {
		clearInterval(this.animationLoopId);
		if (confirm('FIN DEL JUEGO. ¿VOLVER A EMPEAZAR?')) this.init();
	},
};
