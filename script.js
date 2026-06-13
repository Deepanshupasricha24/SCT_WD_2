let startAnchor = 0;
let timePassed = 0;
let intervalId = null;
let running = false;
let lapCounter = 0;

const display = document.getElementById('timer-display');
const mainBtn = document.getElementById('start-pause-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsLog = document.getElementById('laps-record');

// Helper to convert raw ms into standard HH:MM:SS.ms string
function format(ms) {
    let hours = Math.floor(ms / 3600000);
    let mins = Math.floor((ms % 3600000) / 60000);
    let secs = Math.floor((ms % 60000) / 1000);
    let centis = Math.floor((ms % 1000) / 10); // 2 digit milliseconds

    return [
        hours.toString().padStart(2, '0'),
        mins.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':') + '.' + centis.toString().padStart(2, '0');
}

// Main button handler toggles between Start and Pause states
mainBtn.addEventListener('click', () => {
    if (!running) {
        // STARTING
        startAnchor = Date.now() - timePassed;
        intervalId = setInterval(() => {
            timePassed = Date.now() - startAnchor;
            display.textContent = format(timePassed);
        }, 10);
        
        mainBtn.textContent = 'Pause';
        mainBtn.className = 'btn pause-btn';
        lapBtn.disabled = false;
        running = true;
    } else {
        // PAUSING
        clearInterval(intervalId);
        mainBtn.textContent = 'Start';
        mainBtn.className = 'btn start-btn';
        lapBtn.disabled = true;
        running = false;
    }
});

// Capture current display time and append to list
lapBtn.addEventListener('click', () => {
    lapCounter++;
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapCounter}</span><span>${format(timePassed)}</span>`;
    lapsLog.prepend(li); // places newest lap at top
});

// Wipe everything back to initial state
document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(intervalId);
    timePassed = 0;
    running = false;
    lapCounter = 0;
    
    display.textContent = '00:00:00.00';
    lapsLog.innerHTML = '';
    mainBtn.textContent = 'Start';
    mainBtn.className = 'btn start-btn';
    lapBtn.disabled = true;
});