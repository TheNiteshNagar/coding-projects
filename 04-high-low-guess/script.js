const gameForm = document.getElementById('game-form')
const inputNumber = document.getElementById('input-number');
const submitBtn = document.getElementById('submit-button');
const outputSection = document.querySelector('.output')

let computerGuess = randomNumberGenerator(1, 100)
console.log(computerGuess)

gameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userGuess = inputNumber.value.trim();

    if(userGuess<1 || userGuess > 100) {
        setStatus('Choose Number Between 1 to 100')
    }

    if(userGuess == computerGuess) {
        setStatus('Congratulations. You Won 🥳')
        playAgain()
    } else if(userGuess < computerGuess) {
        setStatus('Too Low...')
    } else if(userGuess > computerGuess) {
        setStatus('Too High...')
    }

    inputNumber.value = ''    
})

function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setStatus(arg) {
    outputSection.innerHTML = ''
    const output = document.createElement('h1');
    output.textContent = arg
    outputSection.appendChild(output);
}

function playAgain() {
    computerGuess = randomNumberGenerator(1, 100)
    const newGame = document.createElement('h2')
    newGame.textContent = 'Play Again!!!'
    outputSection.appendChild(newGame)
}