const Load = ( cb: () => void ) => {
    window.addEventListener('load', () => {
        cb();
    }, false);
}

export { Load };
