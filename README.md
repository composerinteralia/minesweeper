#[Minesweeper][minesweeper]

The classic puzzle game built for the browser with React.js
[Play Now!][minesweeper]

###Details:
* Clicking a tile either explodes it or reveals it and recursively reveals any safe neighbors
* Clicking while holding the alt key flags tiles as unsafe
* Object Oriented design for board and tile logic
* Performance enhanced by caching tile's neighbors and neighboring bomb count
* Random bomb placement achieved with a custom array sampling method
* Renders Tile components with classes (for CSS styling) based on tile's state and bomb count
* Renders Tiles with inline styling for animation on winning or losing

###Screenshots:

Game play:
![gameplay]

Dramatic losing animation:
![gameover]

[minesweeper]: http://www.composerinteralia/github.io/minesweeper
[gameplay]: ./images/gameplay.png
[gameover]: ./images/gameover.png
