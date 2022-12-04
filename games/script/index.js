let table = {
  game: {
    start: false,
    morpion: {
      board: [],
      round: undefined,
      winner: undefined,
      coup: 0,
    },
    /**
     * Convert the coordinates of the id button
     * @param {array} value - The coordinates of the move
     * @returns - The id of the button
     */
    convertValutToId(value) {
      if (value.x === 0 && value.y === 0) return 1;
      if (value.x === 0 && value.y === 1) return 2;
      if (value.x === 0 && value.y === 2) return 3;
      if (value.x === 1 && value.y === 0) return 4;
      if (value.x === 1 && value.y === 1) return 5;
      if (value.x === 1 && value.y === 2) return 6;
      if (value.x === 2 && value.y === 0) return 7;
      if (value.x === 2 && value.y === 1) return 8;
      if (value.x === 2 && value.y === 2) return 9;
    },
    /**
     * Convert the id button to coordinates
     * @param {number} id - The id of the button
     * @returns - The coordinates of the move
     */
    convertIdToValue(id) {
      if (id === 1) return { x: 0, y: 0 };
      if (id === 2) return { x: 0, y: 1 };
      if (id === 3) return { x: 0, y: 2 };
      if (id === 4) return { x: 1, y: 0 };
      if (id === 5) return { x: 1, y: 1 };
      if (id === 6) return { x: 1, y: 2 };
      if (id === 7) return { x: 2, y: 0 };
      if (id === 8) return { x: 2, y: 1 };
      if (id === 9) return { x: 2, y: 2 };
    },
  },
},
plateau = table.game.morpion.board;

/**
 * Function performed when the grid button is pressed
 * @param {number} btn - The ID of the button pressed
 */

function play(btn) { 
    if(table.game.start === false) {
        table.game.start = true; // Defines that the game has started
        for(let i = 0; i <= 2; i++) { // Loop creating the board
            plateau.push([0, 0, 0]);
        };
        table.game.morpion.round = 'X' // Defines that the first player is X
    };
    analyseCoup("X", btn); // Analyse the player's move and performs it
};

/**
 * Function reset the game
 */

 function reset() {
    for(let i = 1; i <= 9; i++) { // Loop reseting the board
        document.getElementById(i).disabled = false; 
        document.getElementById(i).style.cursor = "pointer";
        document.getElementById(i).innerText = "X"; 
        document.getElementById(i).style.color = "rgb(112, 112, 112)"; 
    };
    table.game.start = false;
    plateau = [];
    table.game.morpion.round = undefined; 
    table.game.morpion.ancientCoups = undefined; 
    table.game.morpion.winner = undefined; 
    table.game.morpion.coup = 0; 

    document.getElementById("reset").style.animation = "fadeOut 1s";
    document.getElementById("reset").style.visibility = "hidden"; // Change the visibility of the reset button to make it invisible
};

/**
 * Function effecting the player's move
 * @param {string} player - The player who plays
 * @param {number} id - The ID of the button pressed
 * @returns {alert} - Returns alert if the move is not possible
 */

 function analyseCoup(player, id) {
    if(plateau[table.game.convertIdToValue(id).x][table.game.convertIdToValue(id).y] !== 0) return alert("The move is not possible"); 
    if(table.game.morpion.winner === undefined) { 
        if(table.game.morpion.round === player) {
        coup(table.game.convertIdToValue(id), "X", id); // Effect the player's move
        };
    };
};

/**
 * Function effecting the IA's move
 */

function botCoup() {
    if(table.game.morpion.winner === undefined) {
        let value = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)};
        
        if(findRigthValue() !== false) { 
            value = findRigthValue(); 
        };
        if(plateau[value.x][value.y] === 0) {
            coup(value, "O", table.game.convertValutToId(value)); // Effect the IA's move
        } else {
            botCoup(); // If the IA's move is not possible, it will try again
        };
    };
};

/**
 * Algorithm
 * @returns {object} - Returns the coordinates of the good move
 */

function findRigthValue() {
    if(plateau[0][0] === 'X' || plateau[0][2] === 'X' || plateau[2][0] === 'X' || plateau[2][2] === 'X') { 
        if(table.game.morpion.coup === 1) return {x: 1, y: 1};
    };
    for(let i = 0; i <= 2; i++) { // Loop checking if the player can win
        if(plateau[i][0] === 0 && plateau[i][1] === 'X' && plateau[i][2] === 'X') return {x: i, y: 0};
        if(plateau[i][0] === 'X' && plateau[i][1] === 0 && plateau[i][2] === 'X') return {x: i, y: 1};
        if(plateau[i][0] === 'X' && plateau[i][1] === 'X' && plateau[i][2] === 0) return {x: i, y: 2};
        if(plateau[0][i] === 0 && plateau[1][i] === 'X' && plateau[2][i] === 'X') return {x: 0, y: i};
        if(plateau[0][i] === 'X' && plateau[1][i] === 0 && plateau[2][i] === 'X') return {x: 1, y: i};
        if(plateau[0][i] === 'X' && plateau[1][i] === 'X' && plateau[2][i] === 0) return {x: 2, y: i};
    }; 
    if(plateau[0][0] === 0 && plateau[1][1] === 'X' && plateau[2][2] === 'X') return {x: 0, y: 0};
    if(plateau[0][0] === 'X' && plateau[1][1] === 0 && plateau[2][2] === 'X') return {x: 1, y: 1};
    if(plateau[0][0] === 'X' && plateau[1][1] === 'X' && plateau[2][2] === 0) return {x: 2, y: 2};
    if(plateau[0][2] === 0 && plateau[1][1] === 'X' && plateau[2][0] === 'X') return {x: 0, y: 2};
    if(plateau[0][2] === 'X' && plateau[1][1] === 0 && plateau[2][0] === 'X') return {x: 1, y: 1};
    if(plateau[0][2] === 'X' && plateau[1][1] === 'X' && plateau[2][0] === 0) return {x: 2, y: 0};
    return false;
};

/**
 * Effect the move
 * @param {array} value - The coordinates of the move
 * @param {string} player - The player who plays
 * @param {number} id - The ID of the button pressed
 * @returns - Change to the next player
 */

function coup(value, player, id) {
    plateau[value.x][value.y] = player;
    table.game.morpion.coup++;
    document.getElementById(id).innerText = player; 
    document.getElementById(id).disabled = true; 
    document.getElementById(id).style.cursor = "not-allowed"; 
    document.getElementById(id).style.color = "rgb(0, 0, 0)"; 
    evaluation(player);
    if(table.game.morpion.round === 'O') return table.game.morpion.round = 'X';
    if(table.game.morpion.round === 'X') return table.game.morpion.round = 'O';
};

/**
 * Block the buttons
 */

function blockTable() {
    for(let i = 1; i <= 9; i++) { 
        document.getElementById(i).disabled = true; 
        document.getElementById(i).style.cursor = "not-allowed";
    };
    document.getElementById("reset").style.visibility = "visible"; 
    document.getElementById("reset").style.animation = "fadeIn 1s";
    alert('Resultat : ' + table.game.morpion.winner);
};

/**
 * Evaluation of the game
 * @param {string} p 
 * @returns - Returns the winner or function botCoup()
 */

function evaluation(p) {
    const player = checkWin('X', plateau);
    const bot = checkWin('O', plateau);
    if(table.game.morpion.coup === 9) {
        table.game.morpion.winner = "Draw";
        return blockTable();
    };
    if(player.win === 'X') {
        table.game.morpion.winner = "Player";
        return blockTable();
    };
    if(bot.win === 'O') {
        table.game.morpion.winner = "Bot";
        return blockTable();
    };
    if(p === 'X') return botCoup(plateau);
};

/**
 * 
 * @param {string} player - The player who plays
 * @param {array} board - The board
 * @returns 
 */

function checkWin(player, board) {
    for(let x = 0; x <= 2; x++) {
        if(board[x][0] === player && board[x][1] === player && board[x][2] === player) {
            return {win: board[x][0]};
        };
        if(board[0][x] === player && board[1][x] === player && board[2][x] === player) {
            return {win: board[0][x]};
        };
    };
    if(board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return {win: board[0][0]};
    };
    if(board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return {win: board[2][0]};
    };
    return {win: false};
};