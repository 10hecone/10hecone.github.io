export class Board {
    /**
     * Define the number of columns and rows
     * @param {number} c 
     */

    constructor(c) {
        this.c = c;
        this.board;
    };

    /**
     * Init the board
     * @param {Array} x 
     * @returns board
     */

    init(...x) {
        this.board = (x); 
        return this.board;
    };

};