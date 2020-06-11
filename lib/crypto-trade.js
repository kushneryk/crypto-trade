'use strict';

const Processor = require('./processor')
const classes = require('./classes')

const processor = new Processor()

class Trade {
    constructor() {
        return processor
    }
}

class Quote {
    constructor(...params) {
        let q = new classes.Quote(...params)

        processor.declare(q)

        return q
    }
}

class Position {
    constructor(...params) {
        let q = new classes.Position(...params)

        processor.declare(q)

        return q
    }
}

module.exports = {
    Trade,
    Quote,
    Position
}
