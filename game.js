const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreNum = document.querySelector('#score');
const progress = document.querySelector('#completeProgressBar');

let currQues = {};
let answer = true;
let score = 0;
let questionCount = 0;
let remainingQues = [];

let questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
 ];

 const scorePerQues = 10;
 const maxQuestions = 3;

 const startGame = () => {
    score = 0;
    questionCount = 0;
    remainingQues = [...questions];
    getNewQues();
 }

 const getNewQues = () => {
    if (remainingQues.length === 0 || questionCount >= maxQuestions) {
        localStorage.setItem('latestScore', score);
        return window.location.assign('/end.html');
    }
    questionCount++;
    progressText.innerText = `Question ${questionCount} / ${maxQuestions}`;
    progress.style.width = `${(questionCount / maxQuestions) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * remainingQues.length);
    currQues = remainingQues[questionsIndex];
    question.innerText = currQues.question;

    choices.forEach(choice => {
        const num = choice.dataset['number'];
        choice.innerText = currQues['choice' + num];
    });

    remainingQues.splice(questionsIndex, 1);
    answer = true;
 }

 choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!answer) return;
        answer = false;

        const selectedChoice = e.target;
        const selectedAns = selectedChoice.dataset['number'];

        const classToApply = selectedAns == currQues.answer ? 'correct' : 'incorrect';
        if (classToApply === 'correct') {
            incrementScore(scorePerQues);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQues();
        }, 1000);
    });
 });

 const incrementScore = num => {
    score += num;
    scoreNum.innerText = score;
 }

 startGame();
