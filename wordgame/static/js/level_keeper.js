function LevelKeeper(idx) {
	this.idx = idx || 0;

	this.levels = [];
	this.levels.push(new Level(["teamwork!"]));
	this.levels.push(new Level(["four"]));
	this.levels.push(new Level(["power", "play"]));
	this.levels.push(new Level(["alligator", "go", "there"]));

	localStorage.setItem("level", this.idx);
};

LevelKeeper.prototype.currentLevelNumber = function() {
	return this.idx;
};

LevelKeeper.prototype.currentLevel = function() {
	return this.levels[this.idx];
};

LevelKeeper.prototype.advanceLevel = function() {//onCompleteLevel, onCompleteGame) {
	this.idx = this.idx + 1;
	if (this.idx >= this.levels.length) {
		//onCompleteGame(this);
		this.idx = 0;
	}
	//onCompleteLevel(this);
	localStorage.setItem("level", this.idx);
	return this.levels[this.idx];
};
