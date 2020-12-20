import EventStorage from './storage/eventStorage';

new EventStorage({ 
    storageType: true,
    storageAccessEvents: {
        resource: ['load'],
        view: ['scroll'],
        clipboard: ['cut', 'copy', 'paste'],
        mouse: ['click', 'dblclick'],
        time: true,
    }
});
