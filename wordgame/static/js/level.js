function Level(size, words) {
	var totalLength = words.reduce(function(previousValue, currentValue, index, array) {
		return previousValue + currentValue.length;
	}, 0);
	if (Math.sqrt(totalLength) !== size) {
		console.error("Level created with mismatched word length", word, size);
	}
	this.size = size;
	this.words = words;

	this.layout = this.computeLayout();
};

Level.prototype.computeLayout = function() {
	var layout = [];

	// top left is 0, 0
	// top right is a, 0
	// bottom left is 0, b
	// bottom right is a, b
	// setup layout data structure
	for (var y = 0; y < this.size; y++) { 
		layout.push([]);
	    for (var x = 0; x < this.size; x++) { 
	    	layout[y].push(0);
	    }
	}

	var word = this.words.join("");
	// add letters
	var x = 0;
	var y = 0;
	var dy = 1;
	for (var i = 0; i < word.length; i++) {
		var letter = word[i];
		layout[y][x] = letter;
		y = y + dy;
		if (y < 0) {
			dy = +1;
			y = 0;
			x = x + 1;
		}
		if (y >= this.size) {
			dy = -1;
			y = this.size - 1;
			x = x + 1;
		}
	}

	return layout;
};
