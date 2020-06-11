const exchangeDrivers = require('./exchange-drivers')
const {Quote, Position} = require('./classes');

class Processor {
    addExchange = exchange => {
        if (exchangeDrivers[exchange] === undefined) {
            throw new Error(`Exchange "${exchange}" is not supported yet`)
        }

        this.exchanges[exchange] = new exchangeDrivers[exchange]()
    }

    declare = (variable) => {
        if (variable._ instanceof Quote) {
            if (this.exchanges[variable._exchange] === undefined) {
                this.addExchange(variable._exchange)
            }

            this.exchanges[variable._exchange].sub('quote', variable._symbol, quote => {
                variable._bid = quote.bid
                variable._ask = quote.ask

                this.tickEvent()
            })
        }

        if (variable._ instanceof Position) {
            if (this.exchanges[variable._exchange] === undefined) {
                this.addExchange(variable._exchange)
            }

            this.exchanges[variable._exchange].sub('quote', variable._symbol)
        }
    }

    tick = (callback) => {
        this.tickCallbacks.push(callback)
    }

    tickEvent = () => {
        this.tickCallbacks.forEach(cb => {
            cb()
        })
    }

    constructor() {
        this.exchanges = {}
        this.tickCallbacks = []

        return {
            declare: this.declare,
            tick: this.tick
        }
    }
}

module.exports = Processor
