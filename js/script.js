console.log('OK JS!');

// preparazione all'esecuzione del programma

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

    //bombPosition sono le posizioni in cui metterò in seguito le bombe
    // le posizioni per ora vivono solo all'interno DI QUESTA F.NE
    const bombPositions = generateBombs(totCells);
    console.log(bombPositions);

    createElementsInGrid(totCells, level);


    // siccome il primo id disponibile è cell-1, allora qui parto da 1
    for (let i = 1; i <= totCells; i++) {
        const cell = document.getElementById('cell-' + i);


        // SE PERO' IO mi metto in ascolto del click qui, posso fare un confronto con le posizioni che ho solo in questa f.ne
        // quindi, aggiungo un listener sul click dell'elemento
        cell.addEventListener('click', () => {

            // verifico se c'è la bomba
            console.log(i);
            const isBomb = bombPositions.includes(i);

            // se c'è la bomba,la cella diventa rossa
            if (isBomb) {
                cell.classList.add('bg-red');
            } else {
                cell.classList.add('bg-blue');
            }
        });
    }
}


// genero le posizioni delle bombe (max indica il valore massimo che possiamo generare: 100, 81 o 49 )
function generateBombs(max) {

    // creo array vuoto in cui metterò le posizioni delle bombe
    const positions = [];

    // devo ciclare finchè le positions non saranno 16(ma siccome non so bene quanti cicli saranno necessari, uso while)
    while (positions.length < 16) {
        const position = generateRandomNumber(1, max);

        // se positions non include quel numero, quindi non è già stato usato, allora lo aggiungo all'array
        // corrisponde a dire che i numeri nella lista delle bombe non possono essere duplicati
        if (positions.includes(position) === false) {
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

    // resetto il contenuto della griglia
    grid.innerHTML = '';

    // 2. creo totalCells div all'interno della griglia
    for (let i = 0; i < totalCells; i++) {

        //      2a: creo l'elemento
        const cell = document.createElement('div');

        // do un id ad ogni cella così poi potrò andare a recuperarla
        cell.id = 'cell-' + (i + 1);

        //      2b: aggiungo eventuali classi css per dargli uno stile
        // cell.classList.add('cell');
        cell.className = 'cell';
        cell.classList.add(levelClass);

        //      2c: associamo il numero da 1 a 100 al testo contenuto nella cella
        cell.innerText = (i + 1);

        //      2d: aggiungo l'elemento creato alla griglia   
        grid.appendChild(cell);

    }
}