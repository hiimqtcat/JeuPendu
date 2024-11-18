/* Mouaad Chentaf - Malak Jarras -Jean-William Dussault */

"use strict"

    let monDiv = $("<div>").prop('id','monDiv')
function construitTableau() {
    let monTable = $("<table>").prop({"cellSpacing": "0", "cellPadding": "0"});
    let monTbody = $("<tbody>");

// Ligne du titre
    let monTrTitre = $("<tr>");
    let monTdTitre = $("<td>").prop({"colSpan": "2", "align": "left", "valign": "top"});
    let titre = $("<img>").prop({
        "src": "images/titre.jpg",
        "width": "675",
        "height": "92",
        "alt": "Jeu du bonhomme pendu"
    });

// Première ligne du contenu
    let monTr1 = $("<tr>");
    let monTd1 = $("<td>").prop({"rowSpan": "2", "align": "left", "valign": "top"});
    let imgBonhomme = $("<img>").prop({"src": "images/bonhomme_pendu_0.jpg", "alt": "dessin", "id": "dessin"});

    let monTd2 = $("<td>").prop({"align": "left", "valign": "top"});
    let imgIntro = $("<img>").prop({"src": "images/phylactere_intro.jpg", "id": "phylactere"});

// Deuxième ligne du contenu
    let monTr2 = $("<tr>");
    let imgPersonnage = $("<img>").prop({"src": "images/personnage_1.jpg", "alt": "personnage", "id": "personnage"});

// Structure du tableau
    $("body").append(monDiv);
    monDiv.append(monTable);
    monTable.append(monTbody);

// Ligne du titre
    monTbody.append(monTrTitre);
    monTrTitre.append(monTdTitre);
    monTdTitre.append(titre);

// Première ligne du contenu
    monTbody.append(monTr1);
    monTr1.append(monTd1);
    monTd1.append(imgBonhomme);
    monTr1.append(monTd2);
    monTd2.append(imgIntro);

// Deuxième ligne du contenu
    monTbody.append(monTr2);
    monTr2.append($("<td>").prop({"align": "left", "valign": "top"}).append(imgPersonnage));
    return monDiv;
}

function construitMotCache() {

let monDiv2 = $("<div>").prop("id","mot_cache");
monDiv.append(monDiv2);


    const tableauMot = [];
    for (const key in motsSources)
    {
        const q = motsSources[key];
        tableauMot.push(new MotPendu(q));
    }
    let motRandom = Math.floor(Math.random() * tableauMot.length);
    for (let i = 0; i < tableauMot[motRandom].getMot().length ; i++) {
        let monSpan = $("<span>").prop({"style":"margin-right:10px" , "id" : "hiddenLetter" + i });
        monDiv2.append(monSpan);
        monSpan.prop("id","hiddenLetter0");
        let imgUnderscore = $("<img>").prop({"src":"images/lettres_mot/underscore.gif","id":"lettre_"+i,"alt":"_"});
        monSpan.append(imgUnderscore);
    }
}

function construitAlphabet() {
    let monDiv3 = $("<div>").prop("id", "alphabet");
    monDiv.append(monDiv3);
    const tableauAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const alphabetDiv = $("#alphabet");
    alphabetDiv.empty();

    for (let i = 97; i <= 122; i++) {
        const lettre = String.fromCharCode(i);
        const bouton = $("<span>")
            .css("margin-right", "10px")
            .append(
                $("<a>")
                    .attr("href", "#")
                    .addClass("lettre")
                    .data("lettre", lettre) // Stocke la lettre dans le bouton
                    .append(
                        $("<img>")
                            .attr({
                                src: `images/lettres/${lettre}.gif`,
                                alt: `Lettre ${lettre.toUpperCase()}`,
                                width: 18,
                                height: 35
                            })
                    )
            );
        alphabetDiv.append(bouton);
    }
}

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
$(() => {
    construitTableau();
    construitMotCache();
    construitAlphabet();
    alternerImagePersonnage();
});

