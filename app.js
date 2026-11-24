const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');

if (menu) {
    menu.addEventListener('click', function () {
        menu.classList.toggle('is-active');
        if (menuLinks) menuLinks.classList.toggle('active');
    });
}

const feedbackForm = document.querySelector('#feedback-form');
const feedbackStatus = document.querySelector('#feedback-status');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!feedbackForm.checkValidity()) {
            feedbackForm.reportValidity();
            return;
        }

        const feedback = {
            name: feedbackForm.elements.name.value.trim(),
            email: feedbackForm.elements.email.value.trim(),
            topic: feedbackForm.elements.topic.value,
            rating: feedbackForm.elements.rating.value,
            message: feedbackForm.elements.message.value.trim(),
            submittedAt: new Date().toISOString()
        };

        try {
            const savedFeedback = JSON.parse(localStorage.getItem('zoologistFeedback') || '[]');
            savedFeedback.push(feedback);
            localStorage.setItem('zoologistFeedback', JSON.stringify(savedFeedback));
            feedbackStatus.textContent = 'Thank you! Your feedback has been recorded.';
            feedbackForm.reset();
        } catch (error) {
            feedbackStatus.textContent = 'Your browser could not save the feedback. Please try again.';
        }
    });
}

const animalQuizForm = document.querySelector('#animal-quiz-form');
const quizResult = document.querySelector('#quiz-result');

if (animalQuizForm) {
    animalQuizForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const answers = new FormData(animalQuizForm);
        const correctAnswers = {
            question1: 'tiger',
            question2: 'orangutan',
            question3: 'rhinoceros'
        };

        let score = 0;
        Object.keys(correctAnswers).forEach(function (question) {
            if (answers.get(question) === correctAnswers[question]) {
                score += 1;
            }
        });

        quizResult.textContent = 'You scored ' + score + ' out of 3.';
    });
}
