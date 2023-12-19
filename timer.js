let timerInterval;
let timerValue = 0;

export function startTimer() {
    const timerElement = document.getElementById('timer');

    // Очищаем предыдущий интервал перед стартом нового
    stopTimer();

    timerInterval = setInterval(function () {
        const hours = Math.floor(timerValue / 3600);
        const minutes = Math.floor((timerValue % 3600) / 60);
        const seconds = timerValue % 60;

        const formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);

        timerElement.textContent = formattedTime;

        timerValue++;
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
    timerValue = 0; // Сбрасываем значение таймера при остановке
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}