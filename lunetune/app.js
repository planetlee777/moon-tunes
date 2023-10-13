const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const rewindButton = document.getElementById("restart");
const nextButton = document.getElementById("next-song");
const songArtist = document.getElementById("artist-name");
const songName = document.getElementById("song-name");
const progressBar = document.getElementById("progressbar");
const currentTime = document.getElementById("start");
const duration = document.getElementById("end");
const audio = document.getElementById("audio");

// define array of song(s)
const songs = [
  { name: "roslyn", 
  artist: "bon iver + st vincent", 
  duration: "4:50", 
  source: "music/roslyn.mp3" },

  { name: "needed", 
  artist: "brent faiyaz", 
  duration: "4:09", 
  source: "music/needed.mp3" },

  { name: "float", 
  artist: "the neighbourhood", 
  duration: "4:22", 
  source: "music/float.mp3" },
];


let currentSongIndex = 0;

// Function to update the audio source and song details
function loadSong(songIndex) {
  const song = songs[songIndex];
  audio.src = song.source;
  songName.textContent = song.name;
  songArtist.textContent = song.artist;
  duration.textContent = song.duration;
  currentSongIndex = songIndex;
}

// Initial song load
loadSong(currentSongIndex);

// Play button click event
playButton.addEventListener("click", () => {
  audio.play();
});

// Pause button click event
pauseButton.addEventListener("click", () => {
  audio.pause();
});

// Rewind button click event
rewindButton.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
});

// Next button click event
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

// Update the progress bar as the song plays
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;
  currentTime.textContent = formatTime(currentTime);
});

progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;
  currentTime.textContent = formatTime(currentTime);
});

// Function to format time in mm:ss format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
