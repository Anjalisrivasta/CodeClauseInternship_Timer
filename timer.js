// Timer logic
let timerInterval;
let timerRunning = false;
let targetTime = 0;
const timerDisplay = document.getElementById('timerDisplay');

document.getElementById('startTimer').addEventListener('click', () => {
    if (!timerRunning) {
        const inputTime = document.getElementById('inputTime').value;
        const [minutes, seconds] = inputTime.split(':');
        targetTime = parseInt(minutes) * 60 + parseInt(seconds);

        if (isNaN(targetTime) || targetTime <= 0) {
            alert('Please enter a valid time in the format MM:SS.');
            return;
        }

        updateTimerDisplay(targetTime);
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
        document.getElementById('startTimer').disabled = true;
    }
});

document.getElementById('stopTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('startTimer').disabled = false;
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    targetTime = 0;
    document.getElementById('inputTime').value = '';
    document.getElementById('startTimer').disabled = false;
    updateTimerDisplay(0);
});

function updateTimer() {
    if (targetTime <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('startTimer').disabled = false;
        return;
    }

    targetTime--;
    updateTimerDisplay(targetTime);
}

function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
