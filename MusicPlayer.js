const tracks = [
  { title: "Lo-fi Study Beat", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Chill Piano", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Relax Ambient", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Acoustic Vibes", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
];

let currentTrack = 0;
const audio = document.getElementById("audio");
const titleEl = document.getElementById("track-title");
const playBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(index) {
  const track = tracks[index];
  titleEl.textContent = track.title;
  audio.src = track.src;

  audio.onloadedmetadata = () => {
    progress.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
  };
}

function playSong() {
  audio.play().then(() => {
    playBtn.textContent = "⏸";
  }).catch(err => console.log("Playback error:", err));
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
}

function togglePlay() {
  if (audio.paused) playSong();
  else pauseSong();
}

function nextSong() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadSong(currentTrack);
  playSong();
}

function prevSong() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadSong(currentTrack);
  playSong();
}

audio.ontimeupdate = () => {
  progress.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
};

audio.onended = nextSong; // automatically play next track

progress.oninput = () => (audio.currentTime = progress.value);

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

loadSong(currentTrack);
