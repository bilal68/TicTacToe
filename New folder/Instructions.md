Assignment
----------

Implement the Tic-Tac-Toe game https://en.wikipedia.org/wiki/Tic-tac-toe.
The game should be a web app which uses a REST API backend. 

Build a frontend application that uses the APIs built enabling user to play it with the server.We provide you with Yaml file as an example of basic REST API setup.


* REST API. The choice of technology is up to you, as long as it implements REST. No data storage is required, try to keep slim with your implementation.

* For the Web App: 
Try to make component structure simple so as application itself.
The frontend application should heavily use APIs enabling user to play game with the server. Styles are not that important, main concern is a proper communication.

Game flow:
----------

- The client (player) starts a game, makes a request to server to initiate a TicTakToe board. ( Client (player) will always use cross )

- The backend responds with the location URL of the started game.

- Client gets the board state from the URL.

- Client makes a move; move is sent back to the server.

- Backend validates the move, makes it's own move and updates the game state. The updated game state is returned in the response.

- And so on. The game is over once the computer or the player gets 3 noughts or crosses, horizontally, vertically or diagonally or there are no moves to be made.