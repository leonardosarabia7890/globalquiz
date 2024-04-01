const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente!"
      break
    case (performance >= 70):
      message = "Muito bom!"
      break
    case (performance >= 50):
      message = "Bom!"
      break
    default:
      message = "Pode melhorar!"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <div class="divbutao">
      <button 
        onclick=window.location.reload() 
        class="button"
      >
        Refazer teste
      </button>
      <button class="button">
        <a href="index.html">Voltar</a>
      </button>
    </div>
  `
}


const questions = [
  {
    question: "Ao final da Primeira Guerra Mundial, instalou-se na Alemanha uma Assembléia Nacional que se reuniu em Weimar para preparar uma nova Constituição para o país. Nascia ali um novo Estado, chamado de:",
    answers: [
      { text: 'a) República Democrática da Alemanha.', correct: false },
      { text: 'b) Sacro Império Romano Germânico.', correct: false },
      { text: 'c) Confederação Germânica.', correct: false },
      { text: 'd) República de Weimar.', correct: true }
    ]
  },
  {
    question: "Sobre a Segunda Guerra Mundial: I - Hitler se suicida; II - Rendição alemã; III - Rendição japonesa; A ordem cronológica dos eventos acima é:",
    answers: [
      { text: "a) I - II - III", correct: true },
      { text: "b) III - II - I", correct: false },
      { text: "c) II - III - I", correct: false },
      { text: "d) II - I - III", correct: false }
    ]
  },
  {
    question: "O Partido Nacional-Socialista dos Trabalhadores Alemães, mais conhecido como Partido Nazista, surgiu na Alemanha na década de 1920 e possuía filiação e origem política associadas a grupos ideologia nazista, selecione a alternativa INCORRETA.",
    answers: [
      { text: 'a) Antibolchevismo.', correct: false },
      { text: 'b) Antissemitismo.', correct: false },
      { text: 'c) Liberalismo.', correct: true },
      { text: 'd) Eugenia.', correct: false }
    ]
  },
  {
    question: "Qual dos acontecimentos seguintes não teve relação com a Guerra Fria:",
    answers: [
      { text: 'a) Ditaduras latino-americanas.', correct: false },
      { text: 'b) Guerra Civil Espanhola.', correct: true },
      { text: 'c) Guerra do Afeganistão.', correct: false },
      { text: 'd) Revolução Cubana.', correct: false }
    ]
  },
  {
    question: "Qual era o nome do programa que levou os primeiros astronautas dos Estados Unidos à Lua?",
    answers: [
      { text: 'a) Apollo 13.', correct: false },
      { text: 'b) Apollo 11.', correct: true },
      { text: 'c) Vostok 1.', correct: false },
      { text: 'd) Gemini.', correct: false }
    ]
  },
  {
    question: "Qual foi a principal fonte de energia na Segunda Revolução Industrial?",
    answers: [
      { text: 'a) Energia a petróleo.', correct: true },
      { text: 'b) Energia a vapor.', correct: false },
      { text: 'c) Energia eólica.', correct: false },
      { text: 'd) Energia solar.', correct: false }
    ]
  },
  {
    question: "Como se chamavam os dois lados que se enfrentaram na Segunda Guerra Mundial?",
    answers: [
      { text: 'a) Força expedicionária e Nazistas.', correct: false },
      { text: 'b) Aliados e Nazistas.', correct: false },
      { text: 'c) União e Nazistas.', correct: false },
      { text: 'd) Aliados e Eixo.', correct: true },
    ]
  },
]