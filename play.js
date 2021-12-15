//Variables
const hangman = [".pole", ".rope", ".left", ".right", ".arm", ".body", ".head"]
const movies = ["AVENGERS", "IRON MAN", "REAL STEEL", "JUSTICE LEAGUE", "JOKER"]
const smite = [
  "DIAMOND MASTERY",
  "RAMERICA",
  "BACCHUS",
  "HEIMDALLR",
  "CONQUEST",
]
const jojo = [
  "GIORNO",
  "JOTARO",
  "MORIOH CITY",
  "KILLER QUEEN",
  "STAR PLATINUM",
]

const category = localStorage.getItem("cat")
const div = document.querySelector(".word")
const h3 = document.querySelector("[data-status]")
const a = document.querySelector(".reset")
const alpha = document.querySelector(".alphabet")

let word = ""
let lives = hangman.length
let lettersUsed = []
let correctGuesses = 0
let winLength = 0

//Functions
function buildGame() {
  let number = 0
  let display = []

  //Pick a word depending on the category
  if (category == "jojo") {
    number = Math.floor(Math.random() * jojo.length)
    word = jojo[number]
  } else if (category == "movies") {
    number = Math.floor(Math.random() * movies.length)
    word = movies[number]
  } else if (category == "smite") {
    number = Math.floor(Math.random() * smite.length)
    word = smite[number]
  }

  //Create the necessary letter spaces
  for (let i = 0; i < word.length; i++) {
    const span = document.createElement("span")
    span.style.padding = "0px 5px 3px 5px"
    span.innerText = word.charAt(i)
    span.style.color = "transparent"

    if (word.charAt(i) != " ") {
      winLength++
      span.style.borderBottom = "3px solid black"
    }

    display.push(span)
  }

  display.forEach((letter) => {
    div.append(letter, " ")
  })
}

//Event Listener for reset button
a.addEventListener("click", () => {
  h3.innerText = "Will you save my man?"
  div.innerText = ""
  alpha.innerText = ""
  a.style.opacity = "0"
  a.style.cursor = "default"
  lives = hangman.length
  lettersUsed = []
  correctGuesses = 0
  winLength = 0

  for (let i in hangman) {
    let remove = document.querySelector(hangman[i])
    remove.style.opacity = "0"
  }

  buildGame()
})

//Running the game
buildGame()

//Main game logic
document.addEventListener("keypress", (event) => {
  let correct = false
  let leave = false
  let guess = event.key.toUpperCase()
  const answer = document.querySelectorAll("span")

  //A quick way to block the key listener once the game is over
  //Or if the letter has been pressed
  lettersUsed.forEach((value) => {
    if (value == guess) {
      leave = true
    }
  })

  if (lives == 0) return
  if (correctGuesses == winLength) return
  if (leave) return

  lettersUsed.push(guess)

  //Check the guess with the word
  for (let i = 0; i < word.length; i++) {
    if (guess == word.charAt(i)) {
      //Display the letter if correct
      answer.forEach((letter) => {
        if (letter.innerText == guess) {
          letter.style.color = "black"
        }
      })

      correct = true
      correctGuesses++
    }
  }

  //Hang my man, if wrong
  if (!correct) {
    lives--
    let hang = document.querySelector(hangman[lives])
    hang.style.opacity = "1"

    //Add the wrong guesses on the screen
    const del = document.createElement("del")
    del.innerText = guess
    alpha.append(del, " ")
  }

  //Game over
  if (lives == 0) {
    h3.innerText = "Game over!!"
    answer.forEach((letter) => {
      letter.style.color = "red"
    })

    a.style.opacity = "1"
    a.style.cursor = "pointer"
  }

  //Win
  if (correctGuesses == winLength) {
    h3.innerText = "You win!!"
    answer.forEach((letter) => {
      letter.style.color = "green"
    })

    a.style.opacity = "1"
    a.style.cursor = "pointer"
  }
})
