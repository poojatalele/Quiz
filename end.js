const finalScore = document.querySelector('#finalScore');
const latestScore = localStorage.getItem('latestScore');

finalScore.innerText = latestScore;
