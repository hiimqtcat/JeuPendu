/* Mouaad Chentaf - Malak Jarras - Jean-William Dussault */
"use strict";

class MotPendu {
    constructor() {
        this.motPendu = this.shuffleLeMot(motsSources);
        this.avancementMot = new Set();
        this.lettreInvalides = new Set();
    }

    /**
     * Mélange un mot aléatoire à partir de la liste donnée.
     * @param {Object} lesMots - Liste des mots disponibles.
     * @returns {string} - Le mot choisi aléatoirement.
     */
    shuffleLeMot(lesMots) {
        const cleMot = Object.keys(lesMots);
        const cleRandom = cleMot[Math.floor(Math.random() * cleMot.length)];
        const motRandom = lesMots[cleRandom];
        this.motPendu = motRandom;
        return motRandom;
    }

    /**
     * Récupère le mot actuel.
     * @returns {string} - Le mot pendu.
     */
    getMot() {
        return this.motPendu;
    }

    /**
     * Retourne la longueur du mot actuel.
     * @returns {number} - La longueur du mot.
     */
    getMotLenght() {
        return this.motPendu.length;
    }

    /**
     * Vérifie si une lettre est présente dans le mot et retourne ses indices.
     * @param {string} lettre - La lettre à vérifier.
     * @returns {Array} - Les indices où la lettre est présente.
     */
    lettreEstPresente(lettre) {
        const tabIndicesLettre = [];
        for (let index = 0; index < this.motPendu.length; index++) {
            if (lettre === this.motPendu[index]) {
                tabIndicesLettre.push(index);
                this.avancementMot.add(index);
            }
        }

        if (tabIndicesLettre.length === 0) {
            this.lettreInvalide(lettre);
        }

        return tabIndicesLettre;
    }

    /**
     * Vérifie si le mot est complété.
     * @returns {boolean} - Vrai si toutes les lettres ont été trouvées.
     */
    motCompleter() {
        const setTemp = new Set(this.motPendu.split(''));
        return setTemp.size === this.avancementMot.size;
    }

    /**
     * Ajoute une lettre invalide et retourne le nombre de lettres invalides.
     * @param {string} lettreInvalide - La lettre invalide.
     * @returns {number} - Le nombre total de lettres invalides.
     */
    lettreInvalide(lettreInvalide) {
        console.error(`Lettre invalide : ${lettreInvalide}`);
        this.lettreInvalides.add(lettreInvalide);
        return this.lettreInvalides.size;
    }

    /**
     * Retourne le nombre de lettres invalides.
     * @returns {number} - Nombre de lettres invalides.
     */
    getNombreDeLettresInvalides() {
        return this.lettreInvalides.size;
    }

    /**
     * Réinitialise les valeurs pour un nouveau jeu.
     */
    reinistialiserValeurs() {
        this.avancementMot.clear();
        this.lettreInvalides.clear();
    }
}

// Exemple d'utilisation
// const mot = new MotPendu();
// console.log(mot.getMot());
// console.log(mot.lettreEstPresente('a'));