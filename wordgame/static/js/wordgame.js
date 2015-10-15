function LevelKeeper(idx) {
	this.idx = idx || 0;
	this.levels = [];

	this.levels.push(new Level(3, "teamwork!"));
	this.levels.push(new Level(2, "four"));
	this.levels.push(new Level(3, "powering!"));
	this.levels.push(new Level(4, "alligatorgoaway!"));

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

function Level(side, word) {
	if (Math.sqrt(word.length) !== side) {
		console.error("Level created with mismatched word length", word, side);
	}
	this.side = side;
	this.word = word;
};

function Player(name, levelKeeper) {
	this.name = name;
	this.levelKeeper = levelKeeper;
	this.board = null;
	this.setBoard();
};
Player.prototype.setBoard = function() {
	if (this.board) {
		this.board.cleanUpBoard();
	}
	this.board = new Board(this.levelKeeper.currentLevel(), this);
};
Player.prototype.onSuccess = function() {
	alert("You did it!");
	this.level = this.levelKeeper.advanceLevel();
	this.setBoard();
};

function Tile(letter, boardX, boardY) {
	this.letter = letter;
	this.boardX = boardX;
	this.boardY = boardY;
	this.el = $("<div>", {class: "tile", text: letter});
};
Tile.prototype.isInside = function(x, y) {
	var topleft = this.el.offset();
	return (
		topleft.left <= x && x <= topleft.left + this.el.width() &&
		topleft.top  <= y && y <= topleft.top  + this.el.height());
};

function Board(level, player) {
	var self = this;
	this.level = level;
	this.side = level.side;
	this.word = level.word;
	this.player = player;
	this.el = $(".board");
	this.selectionEl = $(".selection");

	this.selectedTiles = [];

	// objects are double indexed into a list and an array of rows
	this.tiles = [];
	this.board = []; // [y][x]

	// setup board data structure
	for (var y = 0; y < this.side; y++) { 
		this.board.push([]);
	    for (var x = 0; x < this.side; x++) { 
	    	this.board[y].push(0);
	    }
	}

	// top left is 0, 0
	// top right is a, 0
	// bottom left is 0, b
	// bottom right is a, b
	var x = 0;
	var y = 0;
	//var dx = 0;
	var dy = 1;
	for (var i = 0; i < this.word.length; i++) {
		var letter = this.word[i];
		var tile = new Tile(letter, x, y);
		this.tiles.push(tile);
		this.board[y][x] = tile;
		y = y + dy;
		// if (x < 0) {

		// }
		// if (x >= this.side) {

		// }
		if (y < 0) {
			dy = +1;
			y = 0;
			x = x + 1;
		}
		if (y >= this.side) {
			dy = -1;
			y = this.side - 1;
			x = x + 1;
		}
		self.setSizeTile(tile, this.side);
	}

	// layout the tiles
	for (var y = 0; y < this.side; y++) {
	    for (var x = 0; x < this.side; x++) { 
	    	this.el.append(this.board[y][x].el);
	    }
	}

	// board events
	this.mc = new Hammer(this.el[0]);
	this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 1 });
	this.mc.get('press').set({ time: 1 });
	this.mc.on("press panstart panmove", function(event) {
		console.log(event.type);
		self.handleMove(event.center.x, event.center.y);
	});
	this.mc.on("panend pressup tap", function(event) {
		console.log(event.type);
		if (self.isWord()) {
			self.player.onSuccess();
		}
		self.resetSelection();
	});
};
Board.prototype.setSizeTile = function(tile, side) {
	var dividend = Math.min($(window).height(), $(window).width());
	var pixels = (dividend / side) - (3 * side); // to account for border
	tile.el.css("width", pixels);
	tile.el.css("height", pixels - 50/side);
	var font = pixels / 1.5;
	tile.el.css("font-size", font);
	
	this.el.css("width", pixels*side + (5*side));
	this.el.css("height", pixels*side - 50);
	$(".footer").css("width", pixels*side);
	$(".header").css("width", pixels*side);
}
Board.prototype.handleMove = function(x, y) {
	var self = this;
	_.each(self.tiles, function(tile) {
		if (tile.isInside(x, y)) {
			if (self.isSelectable(tile)) {
				self.selectTile(tile);
			}
			return false;
		}
	});
};
Board.prototype.isSelectable = function(tile) {
	return this.isAdjacentToLastTile(tile) && !_.includes(this.selectedTiles, tile);
};
Board.prototype.isAdjacentToLastTile = function(tile) {
	if (this.selectedTiles.length === 0) {
		return true;
	}
	var lastTile = this.selectedTiles[this.selectedTiles.length - 1];
	return Math.abs(lastTile.boardX - tile.boardX) <= 1 &&
		Math.abs(lastTile.boardY - tile.boardY) <= 1
};
Board.prototype.selectTile = function(tile) {
	this.selectedTiles.push(tile);
	tile.el.addClass("selected");
	this.selectionEl.text(this.getSelectedWord());
};
Board.prototype.getSelectedWord = function() {
	return this.selectedTiles.map(function(tile) { return tile.letter; }).join("");
}
Board.prototype.isWord = function() {
	var selectedWord = this.getSelectedWord();
	return selectedWord === this.word;
};
Board.prototype.resetSelection = function() {
	var self = this;
	this.selectedTiles = [];
	_.each(self.tiles, function(tile) {
		tile.el.removeClass("selected");
	});
	this.selectionEl.text("");
};
Board.prototype.cleanUpBoard = function() {
	//this.mc.off("press panstart panmove");
	//this.mc.off("panend pressup tap");
	this.el.children().remove();
	$(".tile").remove();
}

$(function() {
	var lus = new Player("lus", new LevelKeeper(parseInt(localStorage.getItem("level"))));
});
