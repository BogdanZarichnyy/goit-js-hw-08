import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoElement = document.querySelector('#vimeo-player');
// console.dir(videoElement);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

const player = new Player(videoElement);
// console.dir(player);

const load = key => {
    try {
        let dataRestore = localStorage.getItem(key);
        return dataRestore === null ? undefined : JSON.parse(dataRestore);
    } catch (error) {
        console.error(error.name, error.message);
    }
};

const save = (key, value) => {
    try {
        // console.log('save value:', value);
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error.name, error.message);
    }
};

function onPlayData(data) {
    console.log('played the video!', data);
    // console.log('duration: ', data.duration, 'percent: ', data.percent, 'seconds: ', data.seconds);
    save(LOCALSTORAGE_KEY, data);
};

const dataInit = load(LOCALSTORAGE_KEY);
console.log('load dataInit', dataInit);

if (dataInit) {
    const { duration, percent, seconds } = dataInit;
    console.log('duration: ', duration, 'percent: ', percent, 'seconds: ', seconds);

    player.setCurrentTime(seconds);

    player.on('timeupdate', throttle(onPlayData, 1000));
} else {
    player.on('timeupdate', throttle(onPlayData, 1000));
}    