import Vimeo from 'vimeo';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', (data) => {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime) {
        player.setCurrentTime(savedTime);
    }
});

const saveTimeThrottled = throttle((currentTime) => {
    localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', (data) => {
    const currentTime = data.seconds;
    saveTimeThrottled(currentTime);
});

