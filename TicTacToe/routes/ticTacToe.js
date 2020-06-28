const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const helpers = require('../helper/helper');

/**
 * @typedef {Object} game A game object
 * @property {String} id The game's UUID
 * @property {String} board The board state
 * @property {('RUNNING'|'X_WON'|'O_WON'|'DRAW')} status The game status
 */

/**
 * @type {Array<game>}
 */
let games = [];

/* GET all games */
router.get('/games', (req, res, next) => {
    try {
        res.status(200).send(games);
    } catch (error) {
        console.log(error)
    }

});


/* Create new game */
router.post('/games', function(req, res, next) {
    /**
     * @type {game}
     */
    try {
        const game = {
            id: shortid.generate(),
            status: 'RUNNING',
            board: '---------'
        };

        games.push(game);
        const url = '/games/' + game.id;
        res.header("Location", url);
        res.send({
            location: url
        });
    } catch (error) {
        console.log(error)
    }

});

/* Get game by id */
router.get('/games/:game_id', function(req, res, next) {
    try {
        const game = games.find(game => game.id === req.params.game_id);

        if (game) res.status(200).json({...game, board: helpers.convertBoardStringToArray(game.board) });
        else res.status(404).json({ message: "Game not found", code: "NOT_FOUND" })
    } catch (error) {
        console.log(error)
    }

});

/* update game */
router.put('/games/:game_id', function(req, res, next) {
    try {
        const game = games.find(game => game.id === req.params.game_id);

        if (!game) return res.status(404).json({ 'message': 'Game not found' });

        const { board, index: moveIndex } = req.body;

        if (helpers.validateMove(moveIndex, game.board)) {
            return res.status(400).json({ "message": "Invalid move" });
        }

        if (game.status !== 'RUNNING') {
            return res.status(400).json({ "message": "Game already finished" });
        }

        const winner = helpers.calculateWinner(board);

        game.board = helpers.convertBoardArrayToString(board);

        if (winner) {
            game.status = "X_WON";
        } else if (helpers.isBoardFull(board)) {
            game.status = "DRAW";
        } else {
            game.board = game.board.replace(/[-]/, 'O');
            if (helpers.calculateWinner(helpers.convertBoardStringToArray(game.board))) {
                game.status = "O_WON";
            }
        }

        res.send({...game, board: helpers.convertBoardStringToArray(game.board) });
    } catch (error) {
        console.log(error)
    }

});

/* Delete game */
router.delete('/games/:game_id', function(req, res, next) {
    try {
        games = games.filter(game => game.id !== req.params.game_id);
        res.send({ success: true });
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;