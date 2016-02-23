#[Minesweeper][minesweeper]

The classic puzzle game built for the browser using [Laris][laris], my own lightweight web framework

###[Play Now!][minesweeper]

##Details:
* Clicking a tile either explodes it or reveals it and recursively reveals any safe neighbors
* Right clicking (or alt + click) flags tiles as unsafe
* Performance enhanced by caching tile's neighbors and neighboring bomb count
* Optimizes random bomb placement achieved with a monkey-patched array sampling method
* Keeps grid iteration DRY with Board.prototype.forEachTile()
* Renders Tile components with classes (for CSS styling) reflecting the tile's state and bomb count
* Renders Tile components with inline styling for randomized end-of-game shaking and exploding
* Prevents first-turn loss by moving the bomb to another tile
* Implements a simple dispatcher for the [high score store][score]

##Screenshots:

![gameplay]
![gameover]

[minesweeper]: http://minesweepers.herokuapp.com/
[laris]: http://github.com/composerinteralia/laris/

[gameplay]: ./docs/images/gameplay.png
[gameover]: ./docs/images/gameover.png

[score]: ./frontend/stores/score_store.js
