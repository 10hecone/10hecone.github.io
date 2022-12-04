let table = {
    game: {
        start: false,
        morpion: {
            board: [],
            tour: undefined,
            winner: undefined,
            coup: 0,
        },
    },
};

let plateau = table.game.morpion.board;

/**
 * Fonction effectué quand le button de la grid est appuyé
 * @param {number} btn l'ID du button utilisé
 */

function play(btn) { 
    // Si le jeu n'a pas commencé
    if(table.game.start === false) {
        table.game.start = true; // Défini que le jeu a commencé dans l'object table
        for(let i = 0; i <= 2; i++) { // Boucle permettant de créer les 3 lignes de la grid
            plateau.push([0, 0, 0]);
        };
        table.game.morpion.tour = 'X' // Défini le tour du joueur
    };
    analyseCoup("X", btn); // Effectue le coup du joueur X, avec l'ID du button utilisé
};

/**
 * Fonction permettant de reset le jeu
 */

 function reset() {
    // Boucle changeant tous les buttons de la grid pour les remettre à leur état initial
    for(let i = 1; i <= 9; i++) {
        document.getElementById(i).disabled = false; // Active le button
        document.getElementById(i).style.cursor = "pointer"; // Change le curseur du button
        document.getElementById(i).innerText = "X"; // Change le texte du button
        document.getElementById(i).style.color = "rgb(112, 112, 112)"; // Change la couleur du texte du button
    };
    table.game.start = false; // Défini que le jeu s'est terminé
    plateau = []; // Défini que le board est vide
    table.game.morpion.tour = undefined; // Défini que le tour est vide
    table.game.morpion.ancientCoups = undefined; // Défini que le coup ancien est vide
    table.game.morpion.winner = undefined; // Défini que le gagnant est vide
    table.game.morpion.coup = 0; // Défini que le coup est à 0

    // Boucle pour créer un effet de disparition du button reset
    for(let i = 1; i <= 1000; i++) {
        document.getElementById("reset").style.opacity = -0.001; // Change l'opacité du button reset en enlevant 0.001 à chaque boucle
    };
    document.getElementById("reset").style.visibility = "hidden"; // Change la visibilité du button reset en le rendant invisible
};

/**
 * Fonction permettant de jouer un coup
 * @param {string} player Joueur qui joue le coup
 * @param {number} id Id du button utilisé
 * @returns Retourne une alerte si le coup n'est pas jouable
 */

 function analyseCoup(player, id) {
    if(plateau[convertIdToValue(id).x][convertIdToValue(id).y] !== 0) return alert("Ce coup n'est pas possible."); 
    if(table.game.morpion.winner === undefined) { 
        if(table.game.morpion.tour === player) {
        coup(convertIdToValue(id), "X", id); // Effectue le coup du joueur
        };
    };
};

function botCoup() {
    if(table.game.morpion.winner === undefined) {
        let value = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)};
        
        if(findRigthValue() !== false) {
            value = findRigthValue();
        };
        if(plateau[value.x][value.y] === 0) {
            coup(value, "O", convertValutToId(value));
        } else {
            botCoup();
        };
    };
};

function findRigthValue() {
    if(plateau[0][0] === 'X' || plateau[0][2] === 'X' || plateau[2][0] === 'X' || plateau[2][2] === 'X') {
        if(table.game.morpion.coup === 1) return {x: 1, y: 1};
    };
    for(let i = 0; i <= 2; i++) {
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

function coup(value, player, id) {
    plateau[value.x][value.y] = player;
    table.game.morpion.coup++;
    document.getElementById(id).innerText = player; // Modification du texte du button utilisé
    document.getElementById(id).disabled = true; // Désactive le button utilisé
    document.getElementById(id).style.cursor = "not-allowed"; // Change le curseur du button utilisé
    document.getElementById(id).style.color = "rgb(0, 0, 0)"; // Change la couleur du texte du button utilisé pour le rendre visible
    evaluation(player);
    if(table.game.morpion.tour === 'O') return table.game.morpion.tour = 'X';
    if(table.game.morpion.tour === 'X') return table.game.morpion.tour = 'O';
};

function blockTable() {
    for(let i = 1; i <= 9; i++) { 
        document.getElementById(i).disabled = true; // Désactive le button
        document.getElementById(i).style.cursor = "not-allowed"; // Change le curseur du button
    };
    document.getElementById("reset").style.visibility = "visible"; // Change la visibilité du button reset en le rendant visible
    document.getElementById("reset").style.opacity = 1; // Change l'opacité du button reset en le rendant visible
};

function evaluation(p) {
    const player = checkWin('X', plateau);
    const bot = checkWin('O', plateau);
    if(table.game.morpion.coup === 9) {
        blockTable();
        return table.game.morpion.winner = "Draw";
    };
    if(player.win === 'X') {
        blockTable();
        return table.game.morpion.winner = "Plauer";
    };
    if(bot.win === 'O') {
        blockTable();
        return table.game.morpion.winner = "Bot";
    };
    if(p === 'X') return botCoup(plateau);
};

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

function convertValutToId(value) {
    if(value.x === 0 && value.y === 0) return 1;
    if(value.x === 0 && value.y === 1) return 2;
    if(value.x === 0 && value.y === 2) return 3;
    if(value.x === 1 && value.y === 0) return 4;
    if(value.x === 1 && value.y === 1) return 5;
    if(value.x === 1 && value.y === 2) return 6;
    if(value.x === 2 && value.y === 0) return 7;
    if(value.x === 2 && value.y === 1) return 8;
    if(value.x === 2 && value.y === 2) return 9;
};

function convertIdToValue(id) {
    switch(id) {
        case 1: return {x: 0, y: 0};
        case 2: return {x: 0, y: 1};
        case 3: return {x: 0, y: 2};
        case 4: return {x: 1, y: 0};
        case 5: return {x: 1, y: 1};
        case 6: return {x: 1, y: 2};
        case 7: return {x: 2, y: 0};
        case 8: return {x: 2, y: 1};
        case 9: return {x: 2, y: 2};
    };    
};