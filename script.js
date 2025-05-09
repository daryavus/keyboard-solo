document.addEventListener('DOMContentLoaded', function() {
  const words = ['apple', 'banana', 'orange', 'grape', 'pear', 'kiwi', 'melon', 'peach'];
  const wordDiv = document.querySelector('.word');
  const correctCount = document.querySelector('.correct-count');
  const wrongCount = document.querySelector('.wrong-count');
  const wordMistakes = document.querySelector('.word-mistakes');
  const timerElement = document.getElementById('timer');
  
  let currentWord = '';
  let currentIndex = 0;
  let correctWords = 0;
  let wrongWords = 0;
  let mistakesInCurrentWord = 0;
  let timerInterval;
  let seconds = 0;
  
  function initGame() {
    startTimer();
    setNewWord();
    document.addEventListener('keydown', handleKeyPress);
  }
  
  function setNewWord() {
    endGame();
    currentWord = words[Math.floor(Math.random() * words.length)];
    currentIndex = 0;
    mistakesInCurrentWord = 0;
    wordMistakes.textContent = '0';
    
    wordDiv.innerHTML = '';
    for (let i = 0; i < currentWord.length; i++) {
      const span = document.createElement('span');
      span.textContent = currentWord[i];
      wordDiv.appendChild(span);
    }
    updateDisplayedWord();
  }
  
  function updateDisplayedWord() {
    const spans = wordDiv.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++) {
      if (i < currentIndex) {
        spans[i].classList.add('c');
      }
    }
  }
  
  function handleKeyPress(e) {
    if (currentIndex >= currentWord.length) return;

    const currentChar = currentWord[currentIndex];
    const spans = wordDiv.querySelectorAll('span');
    spans[currentIndex].classList.remove('w');

    if (e.key === currentChar) {
        spans[currentIndex].classList.add('c');
        currentIndex++;        
    } else {
        spans[currentIndex].classList.add('w');
        mistakesInCurrentWord++;
        wordMistakes.textContent = mistakesInCurrentWord;
    }

    if (currentIndex === currentWord.length) {
      if (mistakesInCurrentWord === 0) {
        correctWords++;
        correctCount.textContent = correctWords;
      } else if (mistakesInCurrentWord >= 1) {
        wrongWords++;
        wrongCount.textContent = wrongWords;
      }

      setTimeout(setNewWord, 0);
    }

    updateDisplayedWord();
  }
  
  function startTimer() {
    timerInterval = setInterval(function() {
      seconds++;
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      timerElement.textContent = `${mins}:${secs}`;
    }, 1000);
  }
  
  function endGame() {
    if (correctWords === 5) {
      alert(`Поздравляем! Вы выиграли за ${timerElement.textContent}!`);
      clearInterval(timerInterval);
    }
    if (wrongWords === 5 ) {
      alert(`Игра окончена. Вы проиграли. Время: ${timerElement.textContent}`);
      clearInterval(timerInterval);
    }
  }
  
  initGame();
});
