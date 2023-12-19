export const settings = {
    _size: 4,
    _mode: 'Свободный',

    getSize() {
        return this._size
    },
    setSize(number) {
        this._size = number
    },

    getMode() {
        return this._mode
    },
    setMode(mode) {
        this._mode = mode
    }
}