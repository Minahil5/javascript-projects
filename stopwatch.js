let timer;  
let hours = 0, minutes = 0, seconds = 0;  
let running = false;  

const display = document.getElementById("display");  
const laps = document.getElementById("laps");  

function showTime() {
  display.textContent =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

document.getElementById("startBtn").onclick = function () {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) { seconds = 0; minutes++; }
      if (minutes === 60) { minutes = 0; hours++; }
      showTime();
    }, 1000);
  }
};

document.getElementById("pauseBtn").onclick = function () {
  running = false;
  clearInterval(timer);
};

document.getElementById("resetBtn").onclick = function () {
  running = false;
  clearInterval(timer);
  hours = minutes = seconds = 0;
  showTime();
  laps.innerHTML = "";
};

document.getElementById("lapBtn").onclick = function () {
  if (running) {
    let li = document.createElement("li");
    li.textContent = "Lap: " + display.textContent;
    laps.appendChild(li);
  }
};

showTime(); // Initial display
