import { Board } from "../Board.js";

export class Morpion {
    constructor() {
        this.board;
        this.coup = 0;
        this.tour = undefined;
        this.ancientCoup = undefined;
        this.res = {
            win: undefined,
        };
    };

    /**
     * Start the game
     */
    start() {
        this.board = this.#createMorpion();
        this.tour = 'X';
    };

    #createMorpion() {
        const board = new Board(3);
        return board.init([0, 0, 0], [0, 0, 0], [0, 0, 0]);
    };

    player(value) {
        if(this.tour === 'X') {
            switch(value) {
                case 1: this.#coup({x: 0, y: 0}, "X", true); break;
                case 2: this.#coup({x: 0, y: 1}, "X", true); break;
                case 3: this.#coup({x: 0, y: 2}, "X", true); break;
                case 4: this.#coup({x: 1, y: 0}, "X", true); break;
                case 5: this.#coup({x: 1, y: 1}, "X", true); break;
                case 6: this.#coup({x: 1, y: 2}, "X", true); break;
                case 7: this.#coup({x: 2, y: 0}, "X", true); break;
                case 8: this.#coup({x: 2, y: 1}, "X", true); break;
                case 9: this.#coup({x: 2, y: 2}, "X", true); break;
            };
            this.tour = 'O';
            this.bot(this.board);
        };
    };

    bot() {
        if(this.res.win === undefined) {
            if(this.tour === 'O') {
                let value = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)};
    
                if(this.board[value.x][value.y] === 0) {
                    if(value.x === 0 && value.y === 0) this.ancienTour = 1;
                    if(value.x === 0 && value.y === 1) this.ancienTour = 2;
                    if(value.x === 0 && value.y === 2) this.ancienTour = 3;
                    if(value.x === 1 && value.y === 0) this.ancienTour = 4;
                    if(value.x === 1 && value.y === 1) this.ancienTour = 5;
                    if(value.x === 1 && value.y === 2) this.ancienTour = 6;
                    if(value.x === 2 && value.y === 0) this.ancienTour = 7;
                    if(value.x === 2 && value.y === 1) this.ancienTour = 8;
                    if(value.x === 2 && value.y === 2) this.ancienTour = 9;
                    this.tour = 'X';
                    this.#coup(value, "O");
                } else {
                    this.bot();
                };
            };
        };
    };

    #coup(value, player) {
        this.board[value.x][value.y] = player;
        this.coup++;
        this.#evaluation();
    };

    #evaluation() {
        const player = this.#checkWin('X');
        const bot = this.#checkWin('O');

        if(this.coup === 9) return this.res.win = "Draw";
        if(player.win === 'X') return this.res.win = "Player";
        if(bot.win === 'O') return this.res.win = "Bot";
    };

    #checkWin(player) {
        for(let x = 0; x <= 2; x++) {
            if(this.board[x][0] === player && this.board[x][1] === player && this.board[x][2] === player) {
                return {win: this.board[x][0]};
            };
            if(this.board[0][x] === player && this.board[1][x] === player && this.board[2][x] === player) {
                return {win: this.board[0][x]};
            };
        };
        if(this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) {
            return {win: this.board[0][0]};
        };
        if(this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player) {
            return {win: this.board[2][0]};
        };
        return {win: false};
    };

    
    checkIdValue(value) {
        switch(value) {
            case 1: return this.board[0][0];
            case 2: return this.board[0][1];
            case 3: return this.board[0][2];
            case 4: return this.board[1][0];
            case 5: return this.board[1][1];
            case 6: return this.board[1][2];
            case 7: return this.board[2][0];
            case 8: return this.board[2][1];
            case 9: return this.board[2][2];
        };
    };

};