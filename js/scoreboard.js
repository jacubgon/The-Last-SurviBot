const ScoreBoard = {
	ctx: undefined,

	init(ctx) {
		this.ctx = ctx;
	},

	update(score) {
		score = Math.floor(score);

		this.ctx.save();
		this.ctx.font = '30px Comic Sans MS';
		this.ctx.fillStyle = 'antiquewhite';
		this.ctx.fillText(score, 50, 50);
		this.ctx.restore();
	},
};
