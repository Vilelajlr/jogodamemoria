document.addEventListener('DOMContentLoaded', () => {
    //opções de cartas
    const cards = [
      {
        name: 'android',
        img: 'images/android.png'
      },
      {
        name: 'chrome',
        img: 'images/chrome.png'
      },
      {
        name: 'git',
        img: 'images/git.png'
      },
      {
        name: 'stackoverflow',
        img: 'images/stackoverflow.png'
      },
      {
        name: 'linux',
        img: 'images/linux.png'
      },
      {
        name: 'github',
        img: 'images/github.png'
      },
      {
        name: 'android',
        img: 'images/android.png'
      },
      {
        name: 'chrome',
        img: 'images/chrome.png'
      },
      {
        name: 'git',
        img: 'images/git.png'
      },
      {
        name: 'stackoverflow',
        img: 'images/stackoverflow.png'
      },
      {
        name: 'linux',
        img: 'images/linux.png'
      },
      {
        name: 'github',
        img: 'images/github.png'
      }
    ]
  
    //embaralhar todas as cartas
    cards.sort(() => 0.5 - Math.random())
  
    //recupaerar elementos
    const board = document.querySelector('.board')
    const resultView = document.querySelector('#result')
    let cardsChosen = [] //cartas escolhidas
    let cardsChosenId = [] //ids das cartas escolhidas para caso de click na mesma imagem
    let cardsWon = [] //cartas combinadas
    let Pontuação = 0;
    let contarErros = 0;
    let contarAcertos = 0;
    let Acertos = document.querySelector('.acertos');
    let Erros = document.querySelector('.erros');
    let Combina = document.querySelector('.combinacao');
    resultView.textContent = 'Pontuação: '+ Pontuação; 


    //criar o quadro de cartas
    function createBoard() {
      for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/board.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        board.appendChild(card)
      }
    }
  
    //checagem de combinações
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      //verificar clique na mesma imagem 
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/board.png')
        cards[optionTwoId].setAttribute('src', 'images/board.png')
        alert('Você clicou na mesma imagem')
      }
      //verificar combinação se click em imagens diferentes
      else if (cardsChosen[0] === cardsChosen[1]) {
        Combina.textContent = 'Você encontrou uma combinação'
        cards[optionOneId].setAttribute('src', 'images/check.png')
        cards[optionTwoId].setAttribute('src', 'images/check.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
        Pontuação = Pontuação + 10;
        contarAcertos++;
        Acertos.textContent = 'Acertos: '+ contarAcertos;
      } else {
        cards[optionOneId].setAttribute('src', 'images/board.png')
        cards[optionTwoId].setAttribute('src', 'images/board.png')
        Combina.textContent = 'Você errou, tente novamente'
        contarErros = contarErros + 1;
        Pontuação = Pontuação - 5;
        Erros.textContent = 'Erros: '+ contarErros;
      }
      cardsChosen = []
      cardsChosenId = []
      //mostrar placar
      resultView.textContent = 'Pontuação: '+ Pontuação; 


      if  (cardsWon.length === cards.length/2) {
        resultView.innerHTML = 'Parabéns! Você conseguiu encontrar todas as cartas!<br> Sua pontuação foi: '+ Pontuação + ' pontos.<br>Clique no botão reiniciar para jogar novamente.';
        // reiniciar o jogo
        
      }
    }

    const restartButton = document.querySelector('.reiniciar');

    restartButton.addEventListener('click', restartGame);


    function restartGame() {
        // limpar o quadro de cartas
        board.innerHTML = '';
        Acertos.textContent = 'Acertos: 0';
        Erros.textContent = 'Erros: 0';
        // embaralhar as cartas novamente
        cards.sort(() => 0.5 - Math.random());
        // recriar o quadro de cartas
        createBoard();
        // resetar as variáveis de controle
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        // resetar o placar
        resultView.textContent = 'Pontuação: 0';
    }
  
    //virar as cartas
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cards[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cards[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()
  })