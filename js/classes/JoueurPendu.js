/* Mouaad Chentaf - Malak Jarras - Jean-William Dussault */
"use strict";

class JoueurPendu {
    /**
     * Constructeur de la classe JoueurPendu.
     * @param {string} nom - Le nom du joueur.
     */
    constructor(nom) {
        this.nom = nom;           // Nom du joueur
        this.motsEssaye = 0;      // Nombre de mots tentés
        this.motsReussis = 0;     // Nombre de mots réussis
        this.points = 0;          // Score total du joueur
        this.tempsCumule = 0;     // Temps total cumulé en secondes
        this.debutMot = null;     // Temps de début pour deviner un mot
    }

    /**
     * Démarre le chronomètre pour deviner un mot.
     */
    debutTemps() {
        this.debutMot = new Date();
    }

    /**
     * Termine le chronomètre et ajoute le temps passé à tempsCumule.
     */
    finTemps() {
        if (this.debutMot) {
            const finMot = new Date();
            const duree = (finMot - this.debutMot) / 1000; // Durée en secondes
            this.tempsCumule += duree;
            console.log(`Durée pour ce mot : ${duree} secondes.`);
            this.debutMot = null; // Réinitialise le début après la fin
        }
    }

    /**
     * Ajoute un mot tenté au compteur.
     */
    motEssaye() {
        this.motsEssaye++;
    }

    /**
     * Ajoute un mot réussi et calcule les points en fonction du nombre d'erreurs.
     * @param {number} erreurs - Nombre d'erreurs avant de trouver le mot.
     */
    motReussi(erreurs) {
        this.motsReussis++;
        const pointsPourCeMot = Math.max(0, 9 - erreurs); // Calcul des points (max 9)
        this.points += pointsPourCeMot;
    }

    /**
     * Retourne le nom du joueur.
     * @return {string} - Le nom du joueur.
     */
    getNom() {
        return this.nom;
    }

    /**
     * Retourne le score cumulé du joueur.
     * @return {number} - Score total.
     */
    getScore() {
        return this.points;
    }

    /**
     * Retourne le temps total cumulé par le joueur (en secondes).
     * @return {number} - Temps total cumulé.
     */
    getTempsCumule() {
        return this.tempsCumule;
    }

    /**
     * Retourne le nombre de mots tentés.
     * @return {number} - Nombre de mots tentés.
     */
    getMotsEssaye() {
        return this.motsEssaye;
    }

    /**
     * Retourne le nombre de mots réussis par le joueur.
     * @return {number} - Nombre de mots réussis.
     */
    getMotsReussis() {
        return this.motsReussis;
    }
}

// Exemple d'utilisation
// const joueur = new JoueurPendu("Mouaad");
// joueur.debutTemps();
// setTimeout(() => {
//     joueur.finTemps();
//     console.log(`Temps cumulé : ${joueur.getTempsCumule()} secondes`);
// }, 5000);