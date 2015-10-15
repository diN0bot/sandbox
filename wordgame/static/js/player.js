function Player(name, levelKeeper) {
	this.name = name;
	this.levelKeeper = levelKeeper;
	this.gameMaster = this.setGameMaster();
};

Player.prototype.setGameMaster = function() {
	if (this.gameMaster) {
		this.gameMaster.cleanUpBoard();
	}
	return new GameMaster(this.levelKeeper.currentLevel(), this);
};

Player.prototype.onSuccess = function() {
	alert("You did it!");
	this.level = this.levelKeeper.advanceLevel();
	this.setGameMaster();
};
