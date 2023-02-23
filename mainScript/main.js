import {Tamagotchi} from "../modules/tamagotchi.js";

const errorMessage = document.getElementById("errorMessage");
const classSelected = document.getElementById("select");
const nameInput = document.getElementById("inputText");
const allBtns = document.querySelectorAll('button');
let killTamaText = document.createElement("h1");

document.getElementById("addTamaButton").addEventListener("click", deliverTama);


function deliverTama(event){
    
    event.preventDefault();
    
    if ( checkStringForErrors() ) {
        printNameInputErrorMsg(checkStringForErrors());
        return;
    }
    
    const tamaFetus = new Tamagotchi(10, 10);
    const tamaContainer = createTamaContainer();
    const tamaData = createTamaDataPElement(tamaFetus);
    const tamaBtns = createTamaBtns(event, tamaFetus);
    
    tamaBtns.forEach(btn => btn.addEventListener("click", event => interactWithTama(event, tamaFetus)));
    
    subtractTamaHealthInterval(tamaFetus, tamaData, tamaBtns, tamaContainer);
    
    tamaData.forEach(element => tamaContainer.append(element));
    tamaBtns.forEach(element => tamaContainer.append(element));
    
    document.body.append(tamaContainer);

}

function checkStringForErrors() {
    
    return /[^a-zA-ZåäöÅÄÖ]/.test(nameInput.value) ? "Use only a-ö, A-Ö. No illegal characters." :
        nameInput.value === "" ? "Fill in your name!" : null;
    
}

function printNameInputErrorMsg(message) {
    errorMessage.innerHTML = message;
    disableBtns();
    setTimeout(() => { errorMessage.innerHTML = ""; enableBtns(); }, 2000);
}

function createTamaContainer() {

    const tamaContainer = document.createElement("div");
    tamaContainer.setAttribute("id", "tamaContainer");

    switch (classSelected.value) {
        case "The Fabolous":
            tamaContainer.style.backgroundColor = "hotpink";
            break;
        case "The Insane"  :
            tamaContainer.style.backgroundColor = "burlywood";
            break;
        case "The Seeker"  :
            tamaContainer.style.backgroundColor = "orange";
            break;
        case "The Dreamer"  :
            tamaContainer.style.backgroundColor = "purple";
            break;
    }

    return tamaContainer;
}

function createTamaDataPElement(tamaFetus) {

    const tamaTitle = document.createElement("p");
    const statsForHappiness = document.createElement("p");
    const statsForHungryness = document.createElement("p");

    tamaTitle.innerText = nameInput.value + ' ' + classSelected.value;
    nameInput.value = '';
    statsForHappiness.innerHTML = `Happiness : ` + tamaFetus.getHappinessStat();
    statsForHungryness.innerHTML = `Hunger : ` + tamaFetus.getHungrynessStat();

    return [ tamaTitle, statsForHappiness, statsForHungryness ];
}


function createTamaBtns() {

    const feedButton = document.createElement("button");
    feedButton.setAttribute("id", "feedButton");
    feedButton.innerText = `Feed`;

    const happinessButton = document.createElement("button");
    happinessButton.setAttribute("id", "happinessButton");
    happinessButton.innerText = `Play`;

    return [ feedButton, happinessButton ];
}

function interactWithTama(event, tamaFetus) {

    switch (event.target.id) {
        case "happinessButton" :

            tamaFetus.getHappinessStat() < 10 ? tamaFetus.setHappinessStat(tamaFetus.getHappinessStat() + 1) : "";
            break;

        case  "feedButton" :

            tamaFetus.getHungrynessStat() < 10 ? tamaFetus.setHungerStat(tamaFetus.getHungrynessStat() + 1) : "";
            break;

    }
}

function subtractTamaHealthInterval(tamaFetus, tamaData, tamaBtns, tamaContainer){

    setInterval( happinessInterval => {
        tamaFetus.setHappinessStat( tamaFetus.getHappinessStat() - 1 );
        tamaData[1].innerHTML = `Happiness : ` + tamaFetus.getHappinessStat();
        checkTamaHealth(tamaFetus, tamaBtns, tamaContainer, happinessInterval );
    }, 1000);

    setInterval( hungerInterval => {
        tamaFetus.setHungerStat( tamaFetus.getHungrynessStat() - 1 );
        tamaData[2].innerHTML = `Hunger : ` + tamaFetus.getHungrynessStat();
        checkTamaHealth(tamaFetus, tamaBtns, tamaContainer, hungerInterval );
    }, 2000);

}

function checkTamaHealth( tamaFetus, tamaBtns, tamaContainer, interval ) {
    if (tamaFetus.getHappinessStat() === 0 || tamaFetus.getHungrynessStat() === 0) {
        killTamaText.innerHTML = tamaFetus.getHappinessStat() === 0 ? `Happiness reached 0. Pet is dead.`
            : `Hungryness reached 0. Pet is dead.`;
        killOffTama( tamaContainer, tamaBtns, killTamaText )
        clearInterval(interval);

    }
}

function disableBtns(){
    allBtns.forEach( b => b.disabled = true );
}

function enableBtns(){
    allBtns.forEach( b => b.disabled = false );
}

function killOffTama( tamaContainer, tamaBtns, dead ){

    tamaContainer.innerHTML = "";
    tamaContainer.append(dead);
    tamaContainer.style.backgroundColor = "red";
    setTimeout( () => tamaContainer.remove(), 5000 );

}
























