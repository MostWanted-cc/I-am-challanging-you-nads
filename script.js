// Quiz questions - 15 questions about Monad Blockchain
const quizQuestions = [
    {
        id: 1,
        text: "What is Monad's main innovation that enables high throughput?",
        options: {
            A: "Parallel execution with optimistic concurrency",
            B: "Larger block sizes",
            C: "Reduced block times",
            D: "Simplified virtual machine"
        },
        correct: "A",
        difficulty: "Easy"
    },
    {
        id: 2,
        text: "Which consensus mechanism does Monad use?",
        options: {
            A: "Proof of Work",
            B: "Proof of Stake",
            C: "Delegated Proof of Stake",
            D: "Proof of History"
        },
        correct: "B",
        difficulty: "Easy"
    },
    {
        id: 3,
        text: "What programming language is primarily used for Monad smart contracts?",
        options: {
            A: "Solidity",
            B: "Rust",
            C: "Vyper",
            D: "Move"
        },
        correct: "A",
        difficulty: "Easy"
    },
    {
        id: 4,
        text: "Monad achieves compatibility with which blockchain's ecosystem?",
        options: {
            A: "Ethereum",
            B: "Solana",
            C: "Bitcoin",
            D: "Cardano"
        },
        correct: "A",
        difficulty: "Easy"
    },
    {
        id: 5,
        text: "What is Monad's target transactions per second (TPS)?",
        options: {
            A: "1,000 TPS",
            B: "10,000 TPS",
            C: "100,000 TPS",
            D: "1,000,000 TPS"
        },
        correct: "B",
        difficulty: "Medium"
    },
    {
        id: 6,
        text: "Which optimization allows Monad to process transactions in parallel?",
        options: {
            A: "Sharding",
            B: "Optimistic concurrency control",
            C: "ZK-SNARKs",
            D: "State channels"
        },
        correct: "B",
        difficulty: "Medium"
    },
    {
        id: 7,
        text: "What is the native token of the Monad blockchain?",
        options: {
            A: "MON",
            B: "MND",
            C: "ETH",
            D: "MONAD"
        },
        correct: "A",
        difficulty: "Easy"
    },
    {
        id: 8,
        text: "Which virtual machine does Monad support for EVM compatibility?",
        options: {
            A: "MVM (Monad Virtual Machine)",
            B: "EVM (Ethereum Virtual Machine)",
            C: "WASM (WebAssembly)",
            D: "JVM (Java Virtual Machine)"
        },
        correct: "B",
        difficulty: "Easy"
    },
    {
        id: 9,
        text: "What year was Monad first announced?",
        options: {
            A: "2021",
            B: "2022",
            C: "2023",
            D: "2024"
        },
        correct: "B",
        difficulty: "Medium"
    },
    {
        id: 10,
        text: "Monad's architecture is designed to solve which Ethereum limitation?",
        options: {
            A: "High gas fees",
            B: "Slow transaction speed",
            C: "Limited scalability",
            D: "All of the above"
        },
        correct: "D",
        difficulty: "Medium"
    },
    {
        id: 11,
        text: "What makes Monad different from other EVM-compatible chains?",
        options: {
            A: "It uses a different programming language",
            B: "It implements parallel execution while maintaining EVM compatibility",
            C: "It doesn't use smart contracts",
            D: "It's proof-of-work based"
        },
        correct: "B",
        difficulty: "Hard"
    },
    {
        id: 12,
        text: "Monad's parallel execution requires transactions to be:",
        options: {
            A: "Sequentially ordered",
            B: "Independent of each other",
            C: "Signed by multiple parties",
            D: "Batch processed"
        },
        correct: "B",
        difficulty: "Hard"
    },
    {
        id: 13,
        text: "Which technology does Monad use for state management?",
        options: {
            A: "Merkle Patricia Tries",
            B: "Account-based model",
            C: "UTXO model",
            D: "Both A and B"
        },
        correct: "D",
        difficulty: "Hard"
    },
    {
        id: 14,
        text: "Monad's performance improvements come primarily from:",
        options: {
            A: "Better hardware requirements",
            B: "Algorithmic optimizations at the execution layer",
            C: "Reduced security",
            D: "Centralized validation"
        },
        correct: "B",
        difficulty: "Hard"
    },
    {
        id: 15,
        text: "What is the key feature that allows Monad to maintain EVM compatibility while improving performance?",
        options: {
            A: "Complete redesign of EVM",
            B: "Backwards-compatible execution layer optimizations",
            C: "Removing expensive EVM operations",
            D: "Using a different virtual machine"
        },
        correct: "B",
        difficulty: "Hard"
    }
];

// Game state
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// DOM Elements
const screens = {
    landing: document.getElementById('landingScreen'),
    warning: document.getElementById('warningScreen'),
    quiz: document.getElementById('quizScreen'),
    end: document.getElementById('endScreen')
};

const elements = {
    enterBtn: document.getElementById('enterBtn'),
    startBtn: document.getElementById('startBtn'),
    restartBtn: document.getElementById('restartBtn'),
    currentQuestion: document.getElementById('currentQuestion'),
    currentScore: document.getElementById('currentScore'),
    questionText: document.getElementById('questionText'),
    optionsContainer: document.getElementById('optionsContainer'),
    feedback: document.getElementById('feedback'),
    endTitle: document.getElementById('endTitle'),
    endMessage: document.getElementById('endMessage'),
    confetti: document.getElementById('confetti')
};

// Event Listeners
elements.enterBtn.addEventListener('click', showWarningScreen);
elements.startBtn.addEventListener('click', startQuiz);
elements.restartBtn.addEventListener('click', restartQuiz);

// Screen Management
function showScreen(screen) {
    // Hide all screens
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    // Show target screen
    screens[screen].classList.add('active');
}

function showWarningScreen() {
    showScreen('warning');
}

function startQuiz() {
    showScreen('quiz');
    loadQuestion();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    updateProgress();
    showScreen('landing');
}

// Quiz Logic
function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showEndScreen();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    updateProgress();

    // Set question text
    elements.questionText.textContent = question.text;

    // Clear previous options
    elements.optionsContainer.innerHTML = '';

    // Create option buttons
    Object.entries(question.options).forEach(([letter, text]) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `<strong>${letter}.</strong> ${text}`;
        button.addEventListener('click', () => selectAnswer(letter));
        elements.optionsContainer.appendChild(button);
    });

    // Clear feedback
    elements.feedback.textContent = '';
    elements.feedback.className = 'feedback';
}

function selectAnswer(selectedAnswer) {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    options.forEach(btn => btn.disabled = true);
    
    // Find correct answer button
    const correctBtn = Array.from(options).find(btn => 
        btn.textContent.startsWith(question.correct + '.')
    );
    
    // Find selected answer button
    const selectedBtn = Array.from(options).find(btn => 
        btn.textContent.startsWith(selectedAnswer + '.')
    );
    
    if (selectedAnswer === question.correct) {
        // Correct answer
        score++;
        selectedBtn.classList.add('correct');
        elements.feedback.textContent = 'Correct! 🎉';
        elements.feedback.className = 'feedback correct';
    } else {
        // Wrong answer
        selectedBtn.classList.add('incorrect');
        correctBtn.classList.add('correct');
        elements.feedback.textContent = `Wrong! Correct answer was ${question.correct}`;
        elements.feedback.className = 'feedback incorrect';
    }
    
    // Store user answer
    userAnswers.push({
        question: question.text,
        userAnswer: selectedAnswer,
        correctAnswer: question.correct,
        isCorrect: selectedAnswer === question.correct
    });
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function updateProgress() {
    elements.currentQuestion.textContent = currentQuestionIndex + 1;
    elements.currentScore.textContent = score;
}

function showEndScreen() {
    showScreen('end');
    
    if (score === quizQuestions.length) {
        // Perfect score
        elements.endTitle.textContent = "CONGRATULATIONS!";
        elements.endMessage.textContent = "YOU PROVED THAT YOU ARE A REAL NAD";
        createConfetti();
    } else {
        // Not perfect score
        elements.endTitle.textContent = "Quiz Complete!";
        elements.endMessage.textContent = `You scored ${score} out of ${quizQuestions.length}. Try again to prove you're a REAL NAD!`;
    }
}

function createConfetti() {
    // Simple confetti effect using CSS animations
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = getRandomColor();
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.opacity = '0.8';
        elements.confetti.appendChild(confetti);
    }
    
    // Add CSS animation for confetti
    if (!document.querySelector('#confettiStyles')) {
        const style = document.createElement('style');
        style.id = 'confettiStyles';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-100px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(600px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize the app
updateProgress();
