class Quiz {
    constructor() {
        this.questions = [
            {
                question: "Если человека назвали мордофиля, то это…",
                answers: [
                    { text: "Значит, что он тщеславный.", correct: true, 
                      explanation: "Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека." },
                    { text: "Значит, что у него лицо как у хряка.", correct: false },
                    { text: "Значит, что чумазый.", correct: false }
                ]
            },
            {
                question: "«Да этот Ярополк — фуфлыга!» Что не так с Ярополком?",
                answers: [
                    { text: "Он маленький и невзрачный.", correct: true, 
                      explanation: "Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека." },
                    { text: "Он тот еще алкоголик.", correct: false },
                    { text: "Он не держит свое слово.", correct: false }
                ]
            },
            {
                question: "Если человека прозвали пятигузом, значит, он…",
                answers: [
                    { text: "Не держит слово.", correct: true, 
                      explanation: "Может сесть сразу на пять стульев. Пятигуз — это ненадежный, непостоянный человек." },
                    { text: "Изменяет жене", correct: false },
                    { text: "Без гроша в кармане.", correct: false }
                ]
            },
            {
                question: "Кто такой шлындра?",
                answers: [
                    { text: "Обманщик.", correct: false },
                    { text: "Нытик.", correct: false },
                    { text: "Бродяга.", correct: true, 
                      explanation: "Да! В Словаре русского арго «шлындрать» означает бездельничать, шляться." }
                ]
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.answeredQuestions = new Set();
        this.completedQuestions = new Map();
        
        this.init();
    }
    
    init() {
        this.shuffleQuestions();
        this.displayQuestion();
    }
    
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
        
        this.questions.forEach(question => {
            for (let i = question.answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]];
            }
        });
    }
    
    displayQuestion() {
        const quizArea = document.getElementById('quiz-area');
        const statusMessage = document.getElementById('status-message');
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showStatistics();
            statusMessage.textContent = "Вопросы закончились!!! =)";
            this.makeQuestionsClickable();
            return;
        }
        
        statusMessage.textContent = "";
        
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        
        // Блок вопроса
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.innerHTML = `
            <div class="question-text">${this.currentQuestionIndex + 1}. ${currentQuestion.question}</div>
        `;
        
        // Контейнер ответов
        const answersContainer = document.createElement('div');
        answersContainer.className = 'answers-container';
        
        currentQuestion.answers.forEach((answer) => {
            const answerBlock = document.createElement('div');
            answerBlock.className = 'answer-block';
            answerBlock.textContent = answer.text;
            answerBlock.onclick = () => this.handleAnswer(answer, answerBlock, questionBlock, answersContainer, currentQuestion);
            answersContainer.appendChild(answerBlock);
        });
        
        questionContainer.appendChild(questionBlock);
        questionContainer.appendChild(answersContainer);
        quizArea.appendChild(questionContainer);
    }
    
    handleAnswer(selectedAnswer, answerBlock, questionBlock, answersContainer, currentQuestion) {
        if (this.answeredQuestions.has(this.currentQuestionIndex)) return;
        
        this.answeredQuestions.add(this.currentQuestionIndex);
        this.completedQuestions.set(this.currentQuestionIndex, {
            question: currentQuestion,
            isCorrect: selectedAnswer.correct
        });

        answerBlock.style.animation = 'shake 0.5s ease';
        
         setTimeout(() => {
            answerBlock.style.animation = '';
        }, 500);

        const answers = answersContainer.querySelectorAll('.answer-block');
        
        setTimeout(() => {
            if (selectedAnswer.correct) {
                this.correctAnswers++;
                answerBlock.classList.add('correct');
                
                const marker = document.createElement('div');
                marker.className = 'marker correct-marker';
                marker.innerHTML = '✓';
                questionBlock.appendChild(marker);
                
                if (selectedAnswer.explanation) {
                    const explanation = document.createElement('div');
                    explanation.className = 'explanation';
                    explanation.textContent = selectedAnswer.explanation;
                    answerBlock.appendChild(explanation);
                }
                
                // Неправильные ответы уезжают вниз
                answers.forEach(block => {
                    if (!block.classList.contains('correct')) {
                        block.classList.add('move-down');
                    } else {
                        setTimeout(() => {
                            block.classList.add('move-down');
                        }, 1700);
                    }
                });

                

            } else {
                answerBlock.classList.add('incorrect');
                
                const marker = document.createElement('div');
                marker.className = 'marker incorrect-marker';
                marker.innerHTML = '✗';
                questionBlock.appendChild(marker);
                
                // Все ответы уезжают вниз
                answers.forEach(block => {
                    block.classList.add('move-down');
                });
            }
            
            // Блокировка ответов
            answers.forEach(answer => {
                answer.style.pointerEvents = 'none';
            });
            
            // Переход к следующему вопросу
            setTimeout(() => {
                this.currentQuestionIndex++;
                this.displayQuestion();
            }, 2000);
        }, 500);
    }
    
    makeQuestionsClickable() {
        const questionBlocks = document.querySelectorAll('.question-block');
        questionBlocks.forEach((block, index) => {
            block.style.cursor = 'pointer';
            block.onclick = () => this.showCorrectAnswer(index);
        });
    }
    
    showCorrectAnswer(questionIndex) {
        const questionData = this.completedQuestions.get(questionIndex);
        
        
        const allCorrectAnswers = document.querySelectorAll('.correct-answer');
        allCorrectAnswers.forEach(answer => {
            answer.remove();
        });


        const questionContainer = document.querySelectorAll('.question-container')[questionIndex];
        const questionBlock = questionContainer.querySelector('.question-block');
        const existingAnswer = questionBlock.querySelector('.correct-answer');
        
        if (existingAnswer) {
            return;
        }
    
        
        const correctAnswer = questionData.question.answers.find(answer => answer.correct);
        if (correctAnswer) {
            const answerBlock = document.createElement('div');
            answerBlock.className = 'correct-answer explanation';
            answerBlock.textContent = `Правильный ответ: ${correctAnswer.text}`;
            if (correctAnswer.explanation) {
                answerBlock.textContent += ` (${correctAnswer.explanation})`;
            }
            questionBlock.appendChild(answerBlock);
        }
    }
    
    showStatistics() {
        const statistics = document.getElementById('statistics');
        statistics.classList.remove('hidden');
        statistics.innerHTML = `
            <h2>Статистика</h2>
            <p>Правильных ответов: ${this.correctAnswers} из ${this.questions.length}</p>
            <p>Результат: ${Math.round((this.correctAnswers / this.questions.length) * 100)}%</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});