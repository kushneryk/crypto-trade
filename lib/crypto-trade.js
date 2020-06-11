'use strict';

const Storage = require('./storage')
const Processor = require('./processor')
const {Price, Position} = require('./classes')

class Trade {
    constructor() {
        this.storage = new Storage()
        this.processor = new Processor()


    }
}

module.exports = Trade
