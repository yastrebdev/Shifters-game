let timerInterval;
let timerValue = 0;

export function startTimer() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Очищаем предыдущий интервал перед стартом нового
    stopTimer();

    timerInterval = setInterval(function () {
        const hours = Math.floor(timerValue / 3600);
        const minutes = Math.floor((timerValue % 3600) / 60);
        const seconds = timerValue % 60;

        // Обновляем содержимое каждого элемента
        hoursElement.textContent = pad(hours);
        minutesElement.textContent = pad(minutes);
        secondsElement.textContent = pad(seconds);

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