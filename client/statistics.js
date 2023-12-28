export const statistics = {
    _actions: 0,
    _numberOfActions: 0,
    _mode: 'free',

    getActions() {
        return this._actions
    },
    setActions(value) {
        value === 'up' ? this._actions++ : this._actions--
    },
    countActions() {
        this._actions = this._numberOfActions
    },

    getNumberOfActions() {
        return this._numberOfActions
    },
    setNumberOfActions(number) {
        this._numberOfActions = number
    },

    getMode() {
        return this._mode
    },
    setMode(value) {
        this._mode = value
    }
}