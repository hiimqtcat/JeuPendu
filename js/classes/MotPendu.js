/* Mouaad Chentaf - Malak Jarras - Jean-William Dussault */


"use strict"

class MotPendu {
    
    constructor (){
    this.motPendu = this.ShuffleLeMot(motsSources)
    this.avancementMot = new Set;
    this.lettreInvalides = new Set;
    }

    ShuffleLeMot(lesMots) {
        let mot = "";
        let cleMot = Object.keys(lesMots);
        let cleRandom = cleMot[Math.floor(Math.random() * cleMot.length)];
        let motRandom = lesMots[cleRandom];
        mot = motRandom;
        this.motPendu = mot;
        return mot;
    }

    getMot(){
        return this.motPendu;
    }

    //Un objet de cette classe permet de savoir la longueur du mot

    getMotLenght(){
        return this.motPendu.length
    }

    //Un objet de cette classe permet de savoir si une lettre est présente dans le mot et à quelles positions. 
    //Une lettre peut-être à plusieurs endroits à la fois dans le mot

    lettreEstPresente(lettre) {
        let tabIndicesLettre = [];
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


    //Un objet de cette classe permet de savoir si le mot est complété  (si toutes les lettres ont 
    // été trouvées pour ce mot)

    // motCompleter() {
    //     return this.motPendu.length === this.avancementMot.size;
    // }

    motCompleter(){
    let estCompleter = false;
    let setTemp = new Set;

        for (let index = 0; index < this.motPendu.length; index++) {
            setTemp.add(this.motPendu[index]);        
        }

        if (setTemp.size === this.avancementMot.size){
            estCompleter = true
        }



    return estCompleter;
    }

    //Un objet de cette classe permet de savoir combien de lettres non valides ont été demandées pour ce mot

    lettreInvalide(lettreInvalide){
    this.lettreInvalides.add(lettreInvalide);
    
    return this.lettreInvalides.size;
    }

    //Un objet de cette classe a aussi une méthode qui permet de réinitialiser les valeurs

    reinistialiserValeurs(){
    this.avancementMot.clear();
    this.lettreInvalides.clear();

    }

}


//Sections Des Testes

let mot = new MotPendu;
console.log(mot.motPendu)
console.log(mot.lettreEstPresente('a'))
