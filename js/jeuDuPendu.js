/* Mouaad Chentaf - Malak Jarras - Jean-William Dussault */
"use strict";

let monDiv = $("<div>").prop('id', 'monDiv');
let motCourant = null;
let joueur = new JoueurPendu("Will");
let maximumErreurs = 9;

/**
 * Initialise le jeu.
 */
function initialiserJeu() {
    motCourant = new MotPendu();
    console.log(motCourant);
    motCourant.reinistialiserValeurs();
    joueur.debutTemps();
    construitTableau();
    construitMotCache();
    construitAlphabet();
    alternerImagePersonnage();
}

/**
 * Construit le tableau principal du jeu.
 * @returns {jQuery} - L'élément `monDiv` mis à jour.
 */
function construitTableau() {
    monDiv.html('');
    let monTable = $("<table>").prop({ "cellSpacing": "0", "cellPadding": "0" });
    let monTbody = $("<tbody>");

    // Ligne du titre
    let monTrTitre = $("<tr>");
    let monTdTitre = $("<td>").prop({ "colSpan": "2", "align": "left", "valign": "top" });
    let titre = $("<img>").prop({
        "src": "images/titre.jpg",
        "width": "675",
        "height": "92",
        "alt": "Jeu du bonhomme pendu"
    });

    // Première ligne du contenu
    let monTr1 = $("<tr>");
    let monTd1 = $("<td>").prop({ "rowSpan": "2", "align": "left", "valign": "top" });
    let imgBonhomme = $("<img>").prop({ "src": "images/bonhomme_pendu_0.jpg", "alt": "dessin", "id": "dessin" });
    let monTd2 = $("<td>").prop({ "align": "left", "valign": "top" });
    let imgIntro = $("<img>").prop({ "src": "images/phylactere_intro.jpg", "id": "phylactere" });

    // Deuxième ligne du contenu
    let monTr2 = $("<tr>");
    let imgPersonnage = $("<img>").prop({ "src": "images/personnage_1.jpg", "alt": "personnage", "id": "personnage" });

    // Construction de la structure du tableau
    $("body").append(monDiv);
    monDiv.append(monTable);
    monTable.append(monTbody);

    // Ajout des lignes et des images
    monTbody.append(monTrTitre);
    monTrTitre.append(monTdTitre);
    monTdTitre.append(titre);

    monTbody.append(monTr1);
    monTr1.append(monTd1);
    monTd1.append(imgBonhomme);
    monTr1.append(monTd2);
    monTd2.append(imgIntro);

    monTbody.append(monTr2);
    monTr2.append($("<td>").prop({ "align": "left", "valign": "top" }).append(imgPersonnage));

    return monDiv;
}

/**
 * Construit les cases représentant les lettres cachées du mot.
 */
function construitMotCache() {
    let monDiv2 = $("<div>").prop("id", "mot_cache");
    monDiv.append(monDiv2);

    for (let i = 0; i < motCourant.getMot().length; i++) {
        let monSpan = $("<span>").prop({ "style": "margin-right:10px", "id": `hiddenLetter${i}` });
        let imgUnderscore = $("<img>").prop({
            "src": "images/lettres_mot/underscore.gif",
            "id": `lettre_${i}`,
            "alt": "_"
        });
        monSpan.append(imgUnderscore);
        monDiv2.append(monSpan);
    }
}

/**
 * Construit l'alphabet sous forme de boutons interactifs.
 */
function construitAlphabet() {
    let monDiv3 = $("<div>").prop("id", "alphabet");
    monDiv.append(monDiv3);
    const alphabetDiv = $("#alphabet").empty();

    for (let i = 97; i <= 122; i++) {
        const lettre = String.fromCharCode(i);
        const bouton = $("<span>")
            .css("margin-right", "10px")
            .append(
                $("<a>")
                    .attr("href", "#")
                    .addClass("lettre")
                    .data("lettre", lettre)
                    .append(
                        $("<img>").attr({
                            src: `images/lettres/${lettre}.gif`,
                            alt: `Lettre ${lettre.toUpperCase()}`,
                            width: 18,
                            height: 35
                        })
                    )
            );

        bouton.on("click", function (event) {
            event.preventDefault();
            const lettreCliquee = $(this).find("a").data("lettre");
            console.log(`Lettre cliquée : ${lettreCliquee}`);
            traiterLettreChoisie(lettreCliquee, $(this));
        });

        alphabetDiv.append(bouton);
    }
}

/**
 * Traite une lettre choisie par le joueur.
 * @param {string} lettre - La lettre choisie.
 * @param {jQuery} bouton - Le bouton cliqué.
 */
function traiterLettreChoisie(lettre, bouton) {
    let positionsLettre = motCourant.lettreEstPresente(lettre);
    const tempAffichage = 3000;
    let imgSuper = 'images/phylactere_super.jpg'
    let imgZut = 'images/phylactere_zut.jpg'
    let imgRien = 'images/phylactere_rien.jpg'

    if (positionsLettre.length > 0) {
        $("#phylactere").attr("src", imgSuper);
        positionsLettre.forEach(pos => {
            $(`#hiddenLetter${pos}`).find("img").attr("src", `images/lettres_mot/${lettre}.gif`);
        });
    } else {
        $("#phylactere").attr("src", imgZut);
        let erreurs = motCourant.getNombreDeLettresInvalides();
        $("#dessin").attr("src", `images/bonhomme_pendu_${erreurs}.jpg`);
    }
    setTimeout(() => {
        $("#phylactere").attr("src", imgRien);
    }, tempAffichage);

    bouton.off("click").addClass("disabled").attr('disabled', true);
    verifierFinDePartie();
}

/**
 * Vérifie la fin de la partie.
 */
function verifierFinDePartie() {
    if (motCourant.motCompleter()) {
        joueur.finTemps();
        joueur.motReussi(motCourant.getNombreDeLettresInvalides());
        alert(`Bravo ! Vous avez deviné le mot et accumulé ${joueur.getScore()} points.`);
        initialiserJeu();
    } else if (motCourant.getNombreDeLettresInvalides() >= maximumErreurs) {
        alert("Désolé, vous êtes pendu !");
        initialiserJeu();
    }
}

/**
 * Alterne l'image du personnage entre deux états.
 */
function alternerImagePersonnage() {
    let imgPersonnage = $("#personnage");
    const imgOuvert = "images/personnage_1.jpg";
    const imgFerme = "images/personnage_2.jpg";
    const tempsOuvert = 6000;
    const tempsFerme = 200;

    function clignoter() {
        imgPersonnage.prop("src", imgFerme);
        setTimeout(() => {
            imgPersonnage.prop("src", imgOuvert);
        }, tempsFerme);
    }

    setInterval(clignoter, tempsOuvert);
}

// Initialisation du jeu au chargement de la page
$(() => {
    initialiserJeu();
});