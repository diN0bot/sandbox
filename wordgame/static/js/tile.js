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
