/* Mouaad Chentaf - Malak Jarras - Jean-William Dussault */

"use strict"

class JoueurPendu {
    constructor(nom, score) {
        this.nom = nom;
        this.score = score;
    }

    getNom() {
        return this.nom;
    }

    getScore() {
        return this.score;
    }

    setNom(nom) {
        this.nom = nom;
    }

    setScore(score) {
        this.score = score;
    }
}