function Level(words) {
	this.words = words.slice(0);
	this.size = this._size();
	this.layout = this.createLayout();
	this.EMPTY = "-";
};

Level.prototype.concatenatedWord = function() {
	return this.words.join("");
};

Level.prototype._size = function() {
	return Math.sqrt(this.concatenatedWord().length);
}

Level.prototype.createLayout = function() {
	var layout = [];
	var concatenatedWord = this.concatenatedWord();

	if (this.size * this.size !== concatenatedWord.length) {
		console.error("Level created with mismatched word length", concatenatedWord, this.words, this.size);
	}

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
	
	// add letters
	var x = 0;
	var y = 0;
	var dy = 1;
	for (var i = 0; i < concatenatedWord.length; i++) {
		var letter = concatenatedWord[i];
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

Level.prototype._dropLetter = function(x, y) {
	if (y < 0) {
		return this.EMPTY;
	} else {
		if (this.layout[y][x] === this.EMPTY) {
			return this._dropLetter(x, y - 1);
		} else {
			var droppedLetter = this.layout[y][x];
			this.layout[y][x] = this.EMPTY;
			return droppedLetter;
		}
	}
};

Level.prototype.removeWord = function(letterLocations) {
	for (var i = 0; i < letterLocations.length; i++) {
		var loc = letterLocations[i];
		if (loc.letter != this.layout[loc.y][loc.x]) {
			console.error("Mismatch", loc, this.layout)
		}
		this.layout[loc.y][loc.x] = this.EMPTY;
	}

	for (var x = 0; x < this.size; x++) {
		var y = this.size - 1;
		while (y >= 0) {
			if (this.layout[y][x] === this.EMPTY) {
				this.layout[y][x] = this._dropLetter(x, y - 1);
			}
			y--;
		}
	}
};
