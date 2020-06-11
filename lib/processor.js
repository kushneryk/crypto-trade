const Storage = require('./storage');
const {Price, Position} = require('./class');

class Processor {
    storage
    exchanges = []
    tickCallbacks = []

    declare = (variable) => {
        if (variable instanceof Price) {
            if (this.exchanges.indexOf(variable._exchange) === -1) {
                this.exchanges.push(variable._exchange)
            }
        }

        if (variable instanceof Position) {
            if (this.exchanges.indexOf(variable._exchange) === -1) {
                this.exchanges.push(variable._exchange)
            }
        }
    }

    tick = (callback) => {
        this.tickCallbacks.push(callback)
    }

    constructor() {
        this.storage = new Storage()

        return {
            declare: this.declare
        }
    }
}

module.exports = Processor
