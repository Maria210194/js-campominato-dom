console.log('OK JS!');

// preparazione all'esecuzione del programma
const totalBombsToCreate = 16;

const buttonEasy = document.getElementById('easy');

const buttonMedium = document.getElementById('medium');

const buttonHard = document.getElementById('hard');

buttonEasy.addEventListener('click', () => startGame(100, 'easy'));

buttonMedium.addEventListener('click', () => startGame(81, 'medium'));

buttonHard.addEventListener('click', () => startGame(49, 'hard'));


// Genero 16 numero casuali
// creo un array vuoto in cui metterò le posizioni delle 16 bombe
// prendo una posizione random e verifico che non sia già stata usata
// se è libera inserisco la posizione nell'array bombe


// creo una funzione più specifica che contiene quella più generica
function startGame(totCells, level) {

    // genero la mia griglia
    createElementsInGrid(totCells, level);

    // genero le posizioni delle bombe all'interno della griglia (bombPositions è un array che contiene numeri da 1 a N)
    // le posizioni per ora vivono solo all'interno DI QUESTA F.NE

    const bombPositions = generateBombs(totCells);
    console.log(bombPositions);                   // bombPositions è un array che contiene numeri da 1 a N

    // richiamo la f.ne che mi aggiunge il click
    addClickToCells(bombPositions);
}


// creo una funzione generica che richiamerò in startGame
function addClickToCells(bombPositions) {
    let punteggio = 0;

    const selectCells = document.querySelectorAll('.cell');

    for (let i = 0; i <= selectCells.length; i++) {
        const cell = selectCells[i];

        // SE PERO' IO mi metto in ascolto del click qui, posso fare un confronto con le posizioni che ho solo in questa f.ne
        // quindi, aggiungo un listener sul click dell'elemento
        cell.addEventListener('click', () => {
            const gameOver = clickCheck(cell, i, bombPositions);
            if (gameOver) {
                blockCells();
                showBombs(bombPositions);
            } else {
                punteggio++;

                cell.classList.add('clicked');
                const notBombs = selectCells.length - totalBombsToCreate;
                if (punteggio >= notBombs) {
                    blockCells();
                    showFinalScore(punteggio);
                }
            }
        });
    }
}


// creo funzione che mi blocca le celle dopo aver beccato una bomba
function blockCells() {
    const grid = document.getElementById('grid');

    grid.classList.add('game-over');
}



function showBombs(bombsToShow) {
    const selectCells = document.querySelectorAll('.cell');

    for (i = 0; i < selectCells.length; i++) {
        if (bombsToShow.includes(i + 1)) {
            const cell = selectCells[i];
            cell.classList.add('bg-red');
        }
    }

}

function showFinalScore(points) {
    alert('Bravissimo!!! Hai vinto! Hai totalizzato ' + points + 'punti!');
}



// controllo se l'utente ha cliccato su una bomba, se si ritorno true, se no false 
function clickCheck(cellsTarget, cellIndex, bombPlaces) {
    // verifico se c'è la bomba
    console.log(cellIndex);
    const isBomb = bombPlaces.includes(cellIndex + 1);            // verifico se l'indice i è incluso nell'array

    // se c'è la bomba,la cella diventa rossa
    if (isBomb) {
        cellsTarget.classList.add('bg-red');
    } else {
        cellsTarget.classList.add('bg-blue');
    }

    return isBomb;

}


// La partita termina quando il giocatore clicca su una bomba
// Al termine della partita il software deve comunicare il punteggio, 
// cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// BONUS:
//1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
//2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// genero le posizioni delle bombe (max indica il valore massimo che possiamo generare: 100, 81 o 49 )
function generateBombs(max) {

    // creo array vuoto in cui metterò le posizioni delle bombe
    const positions = [];

    // devo ciclare finchè le positions non saranno 16(ma siccome non so bene quanti cicli saranno necessari, uso while)
    while (positions.length < totalBombsToCreate) {
        const position = generateRandomNumber(1, max);

        // se positions non include quel numero, quindi non è già stato usato, allora lo aggiungo all'array
        // corrisponde a dire che i numeri nella lista delle bombe non possono essere duplicati
        if (positions.includes(position) === false) {       // con il controllo false mi assicuro che la posizione non sia già stata estratta ed inserita nell'array
            positions.push(position);
        }
    }
    return positions;

}


function generateRandomNumber(min, max) {
    const range = max - min + 1;

    return Math.floor(Math.random() * range) + min;
}



function createElementsInGrid(totalCells, levelClass) {

    // 1. recupero la griglia con l'id
    const grid = document.getElementById('grid');

    // resetto il contenuto della griglia e ripristino l'interazione dopo aver perso
    grid.innerHTML = '';
    grid.classList.remove('game-over');

    // 2. creo totalCells div all'interno della griglia
    for (let i = 0; i < totalCells; i++) {

        //      2a: creo l'elemento
        const cell = document.createElement('div'); //risultato: <di></div>

        // do un id ad ogni cella così poi potrò andare a recuperarla
        cell.id = 'cell-' + (i + 1);

        /* alternativa per dare id è:
        cell.setAttribute('id', 'cell-' + (i + 1));
        il risultato finale è ovviamente invariato: <div id="cell-N"></div>
        */

        //      2b: aggiungo eventuali classi css per dargli uno stile
        // cell.classList.add('cell');
        cell.className = 'cell';            // risultato: <div id="cell-N" class="cell"></div>"
        cell.classList.add(levelClass);     // risultato: <div id="cell-N" class="cell easy/medium/hard"></div>"


        //      2c: associamo il numero da 1 a 100 al testo contenuto nella cella
        cell.innerText = (i + 1);           // <div id="cell-N" class="cell easy/medium/hard">1</div>"

        //      2d: aggiungo l'elemento creato alla griglia   
        grid.appendChild(cell);             // con appenChild vado anche ad appenderlo, prima esisteva solo nella memoria del pc

    }
}