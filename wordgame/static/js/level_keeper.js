function LevelKeeper(idx) {
	this.idx = idx || 0;
	this.levels = [];

	this.levels.push(new Level(3, ["teamwork!"]));
	this.levels.push(new Level(2, ["four"]));
	this.levels.push(new Level(3, ["power", "play"]));
	this.levels.push(new Level(4, ["alligator", "go", "there"]));

	$(".levelNumber").text(this.idx);
	localStorage.setItem("level", this.idx);
};

LevelKeeper.prototype.currentLevel = function() {
	return this.levels[this.idx];
};

LevelKeeper.prototype.advanceLevel = function() {
	this.idx = this.idx + 1;
	if (this.idx >= this.levels.length) {
		alert("You won all the levels!!!!");
		this.idx = 0;
	}
	$(".levelNumber").text(this.idx);
	localStorage.setItem("level", this.idx);
	return this.levels[this.idx];
};
