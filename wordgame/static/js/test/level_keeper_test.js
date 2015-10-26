describe("LevelKeeper.currentLevel", function() {
	it("starts at first level by default", function() {
		var levelKeeper = new LevelKeeper();
		expect(levelKeeper.idx).toEqual(0);
	});

	it("starts at level specified", function() {
		var levelKeeper = new LevelKeeper(2);
		expect(levelKeeper.idx).toEqual(2);
	});
});

describe("LevelKeeper.advanceLevel", function() {
	it("advances by one each call", function() {
		var levelKeeper = new LevelKeeper();
		levelKeeper.advanceLevel();
		expect(levelKeeper.idx).toEqual(1);
	});

	// it("onLevelCompleted callback is executed when level is advanced", function() {
	// 	var actualX = "notcalled";
	// 	var levelKeeper = new LevelKeeper();
	// 	levelKeeper.advanceLevel(function() { actualX = "called"; });
	// 	expect(actualX).toEqual("called");
	// });

	// it("onGameCompleted callback is executed when final level is completed", function() {
	// 	var actualX = "notcalled";
	// 	var levelKeeper = new LevelKeeper();
	// 	levelKeeper.advanceLevel(function() {}, function() { actualX = "called"; });
	// 	expect(actualX).toEqual("called");
	// });
});
