const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const upload = document.getElementById("upload");
const playlist = document.getElementById("playlist");

let songs = [];
let currentIndex = 0;

function loadSong(index) {
  audio.src = songs[index].url;
  title.textContent = songs[index].name;
}

function playPause() {
  if (!audio.src) return;
  audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
  if (songs.length === 0) return;
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
}

function prevSong() {
  if (songs.length === 0) return;
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
}
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

upload.addEventListener("change", (e) => {
  [...e.target.files].forEach(file => {
    const song = {
      name: file.name,
      url: URL.createObjectURL(file)
    };
    songs.push(song);

    const li = document.createElement("li");
    li.textContent = file.name;
    li.onclick = () => {
      currentIndex = songs.indexOf(song);
      loadSong(currentIndex);
      audio.play();
    };
 playlist.appendChild(li);
  });

  if (!audio.src && songs.length > 0) {
    loadSong(0);
  }
});