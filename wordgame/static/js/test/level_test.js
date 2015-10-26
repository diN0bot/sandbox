describe("Level.createLayout", function() {
	it("creates a 1x1 layout", function() {
		var level = new Level(["a"]);
		expect(level.layout.length).toEqual(1);
		expect(level.layout[0].length).toEqual(1);
		expect(level.layout[0][0]).toEqual("a");
	});

	it("creates a 2x2 layout", function() {
		var level = new Level(["doge"]);
		expect(level.layout.length).toEqual(2);
		expect(level.layout[0].length).toEqual(2);
		expect(level.layout).toEqual([['d', 'e'], ['o', 'g']]);
	});

	it("creates a 3x3 layout", function() {
		var level = new Level(["alligator"]);
		expect(level.layout.length).toEqual(3);
		expect(level.layout[0].length).toEqual(3);
		expect(level.layout).toEqual([['a', 'a', 't'], ['l', 'g', 'o'], ['l', 'i', 'r']]);
	});

	it("creates a 3x3 layout with two words", function() {
		var level = new Level(["bemuse", "cat"]);
		expect(level.layout.length).toEqual(3);
		expect(level.layout[0].length).toEqual(3);
		expect(level.layout).toEqual([[ 'b', 'e', 'c'], ['e', 's', 'a'], ['m', 'u', 't']]);
	});

	it("creates a 4x4 layout with three words", function() {
		var level = new Level(["wonderful", "sun", "rise"]);
		expect(level.layout.length).toEqual(4);
		expect(level.layout[0].length).toEqual(4);
		expect(level.layout).toEqual([['w', 'u', 'l', 'e'], ['o', 'f', 's', 's'], ['n', 'r', 'u', 'i'], ['d', 'e', 'n', 'r']]);
	});
});

describe("Level.removeWord", function() {
	it("removes 'do' from ['do', 'ge']", function() {
		var level = new Level(['do', 'ge']);
		level.removeWord([{letter: 'd', x: 0, y: 0}, {letter: 'o', x: 0, y: 1}]);
		expect(level.layout).toEqual([['-', 'e'], ['-', 'g']]);
	});

	it("removes 'ge' from ['do', 'ge']", function() {
		var level = new Level(['do', 'ge']);
		level.removeWord([{letter: 'g', x: 1, y: 1}, {letter: 'e', x: 1, y: 0}]);
		expect(level.layout).toEqual([['d', '-'], ['o', '-']]);
	});

	it("removes 'og' from ['d', 'og', 'e']", function() {
		var level = new Level(['d', 'og', 'e']);
		level.removeWord([{letter: 'o', x: 0, y: 1}, {letter: 'g', x: 1, y: 1}]);
		expect(level.layout).toEqual([['-', '-'], ['d', 'e']]);
	});

	// wule   wu-e
	// ofss   of-s
	// nrui   nr-i
	// denr   delr
	it("removes 'sun' from ['woderful', 'sun', rise']", function() {
		var level = new Level(["wonderful", "sun", "rise"]);
		level.removeWord([
			{letter: 's', x: 2, y: 1},
			{letter: 'u', x: 2, y: 2},
			{letter: 'n', x: 2, y: 3}]);
		expect(level.layout).toEqual([['w', 'u', '-', 'e'], ['o', 'f', '-', 's'], ['n', 'r', '-', 'i'], ['d', 'e', 'l', 'r']]);
	});
});
