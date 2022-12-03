let table = {
    game: {
        start: false,
    },
    morpion: undefined,
};

/**
 * Fonction effectué quand le button de la grid est appuyé
 * @param {number} btn l'ID du button utilisé
 */

async function play(btn) { 
    // Si le jeu n'a pas commencé
    if(table.game.start === false) {
        const MorpionClass = await import('../module/Morpion/index.js'); // Importe la class Morpion permettant le calcul du jeu
        table.game.start = true; // Défini que le jeu a commencé dans l'object table
        table.morpion = new MorpionClass.Morpion(); // Défini la class Morpion dans l'object table
        table.morpion.start({evolutin: true}); // Démarre le jeu
    };
    coup("X", btn); // Effectue le coup du joueur X, avec l'ID du button utilisé
};

/**
 * Fonction permettant de modifier le button appuyé
 * @param {string} player Joueur qui a appuyé sur le button
 * @param {number} id Id du button utilisé
 */

function setTable(player, id) {
    document.getElementById(id).innerText = player; // Modification du texte du button utilisé
    document.getElementById(id).disabled = true; // Désactive le button utilisé
    document.getElementById(id).style.cursor = "not-allowed"; // Change le curseur du button utilisé
    document.getElementById(id).style.color = "rgb(0, 0, 0)"; // Change la couleur du texte du button utilisé pour le rendre visible
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
        table.game.start = false; // Défini que le jeu s'est terminé
    };

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

function coup(player, id) {
    if(table.morpion.checkIdValue(id) !== 0) return alert("Ce coup n'est pas possible."); 
    if(table.morpion.res.win === undefined) { 
        if(table.morpion.tour === player) {
            setTable(player, id); // Modifie le button utilisé
            table.morpion.player(id); // Effectue le coup du joueur
            setTable('O', table.morpion.ancienTour); // Modifie le button utilisé
            if(table.morpion.res.win !== undefined) {
                // Boucle changeant tous les buttons de la grid pour les rendre inutilisable
                for(let i = 1; i <= 9; i++) { 
                    document.getElementById(i).disabled = true; // Désactive le button
                    document.getElementById(i).style.cursor = "not-allowed"; // Change le curseur du button
                };
                document.getElementById("reset").style.visibility = "visible"; // Change la visibilité du button reset en le rendant visible
                document.getElementById("reset").style.opacity = 1; // Change l'opacité du button reset en le rendant visible
            };
        };
    };
};