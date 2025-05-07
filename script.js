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
      
      if (currentIndex === currentWord.length) {
        correctWords++;
        correctCount.textContent = correctWords;
        
        if (correctWords === 5) {
          endGame(true);
          return;
        }
        
        setTimeout(setNewWord, 1000);
      }
    } else {

      spans[currentIndex].classList.add('w');
      mistakesInCurrentWord++;
      wordMistakes.textContent = mistakesInCurrentWord;
      
      if (mistakesInCurrentWord >= 5) {
        wrongWords++;
        wrongCount.textContent = wrongWords;
        
        if (wrongWords === 5) {
          endGame(false);
        } else {
          setTimeout(setNewWord, 1000);
        }
      }
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
  
  function endGame(isWin) {
    clearInterval(timerInterval);
    document.removeEventListener('keydown', handleKeyPress);
    
    if (isWin) {
      alert(`Поздравляем! Вы выиграли за ${timerElement.textContent}!`);
    } else {
      alert(`Игра окончена. Вы проиграли. Время: ${timerElement.textContent}`);
    }
    
    setTimeout(() => location.reload(), 2000);
  }
  
  initGame();
});