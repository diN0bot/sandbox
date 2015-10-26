function GameMaster(name, levelIdx) {
	var lus = new Player(name)
	var levelKeeper = new LevelKeeper(parseInt(2));
	var view = new View(
		levelKeeper.currentLevel(),
		function() {
			levelKeeper.advanceLevel();
		}
	);
	view.updateLevelNumber(levelKeeper.currentLevelNumber());
};
