function GameMaster(level, player) {
	var self = this;
	this.level = level;
	this.player = player;
	this.el = $(".board");
	this.selectionEl = $(".selection");
	this.selectedTiles = [];

	this.board = this.createBoard();

	// events
	this.mc = new Hammer(this.el[0]);
	this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 1 });
	this.mc.get('press').set({ time: 1 });
	this.mc.on("press panstart panmove", function(event) {
		self.handleMove(event.center.x, event.center.y);
	});
	this.mc.on("panend pressup tap", function(event) {
		if (self.isWord()) {
			self.player.onSuccess();
		}
		self.resetSelection();
	});
};

GameMaster.prototype.createBoard = function() {
	var board = []; //[y][x]
	for (var y = 0; y < this.level.size; y++) {
		board.push([]);
	    for (var x = 0; x < this.level.size; x++) { 
	    	var letter = this.level.layout[y][x];
	    	var tile = this.createTile(letter, x, y, this.level.size);
	    	board[y][x] = tile;
	    	this.el.append(tile.el);
	    }
	}
	return board;
};

GameMaster.prototype.tiles = function() {
	var tileList = [];
	for (var y = 0; y < this.level.size; y++) {
	    for (var x = 0; x < this.level.size; x++) { 
	    	tileList.push(this.board[y][x]);
	    }
	}
	return tileList;
};

GameMaster.prototype.createTile = function(letter, x, y, size) {
	var tile = new Tile(letter, x, y);
	var dividend = Math.min($(window).height(), $(window).width());
	var pixels = (dividend / size) - (3 * size); // to account for border
	tile.el.css("width", pixels);
	tile.el.css("height", pixels - 50/size);
	var font = pixels / 1.5;
	tile.el.css("font-size", font);
	
	this.el.css("width", pixels*size + (5*size));
	this.el.css("height", pixels*size - 50);
	$(".footer").css("width", pixels*size);
	$(".header").css("width", pixels*size);
	return tile;
}

GameMaster.prototype.handleMove = function(x, y) {
	var self = this;
	_.each(self.tiles(), function(tile) {
		if (tile.isInside(x, y)) {
			if (self.isSelectable(tile)) {
				self.selectTile(tile);
			}
			return false;
		}
	});
};

GameMaster.prototype.isSelectable = function(tile) {
	return this.isAdjacentToLastTile(tile) && !_.includes(this.selectedTiles, tile);
};

GameMaster.prototype.isAdjacentToLastTile = function(tile) {
	if (this.selectedTiles.length === 0) {
		return true;
	}
	var lastTile = this.selectedTiles[this.selectedTiles.length - 1];
	return Math.abs(lastTile.boardX - tile.boardX) <= 1 &&
		Math.abs(lastTile.boardY - tile.boardY) <= 1
};

GameMaster.prototype.selectTile = function(tile) {
	this.selectedTiles.push(tile);
	tile.el.addClass("selected");
	this.selectionEl.text(this.getSelectedWord());
};

GameMaster.prototype.getSelectedWord = function() {
	return this.selectedTiles.map(function(tile) { return tile.letter; }).join("");
};

GameMaster.prototype.isWord = function() {
	var selectedWord = this.getSelectedWord();
	return this.level.words.reduce(function(previousValue, currentValue, index, array) {
		return previousValue || currentValue === selectedWord;
	}, false);
};

GameMaster.prototype.resetSelection = function() {
	var self = this;
	this.selectedTiles = [];
	_.each(self.tiles(), function(tile) {
		tile.el.removeClass("selected");
	});
	this.selectionEl.text("");
};

GameMaster.prototype.cleanUpBoard = function() {
	//this.mc.off("press panstart panmove");
	//this.mc.off("panend pressup tap");
	this.el.children().remove();
	$(".tile").remove();
};
