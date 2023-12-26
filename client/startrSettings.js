export const settings = {
    _size: 4,
    _count: 16,
    _mode: 'Свободный',

    getSize() {
        return this._size
    },
    setSize(number) {
        this._size = number
    },
    
    getCount() {
        return this._count
    },
    setCount(number) {
        this._count = number
    },
    downCount() {
        this._count = this._count - 2
    },

    getMode() {
        return this._mode
    },
    setMode(mode) {
        this._mode = mode
    }
}