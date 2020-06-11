class Position {
    props = {
        exchange: '',
        symbol: '',
        volume: 0,
        price: 0,
        bid: 0,
        ask: 0
    }

    constructor(exchange = '', symbol = '') {
        this.props.exchange = exchange
        this.props.symbol = symbol

        const obj = {
            _: this,
            _exchange: exchange,
            _symbol: symbol
        }

        Object.defineProperty(obj, 'volume', {
            get: () => {
                return this.props.volume
            },
            set: (val) => {
                // modificator
                this.props.volume = val
            }
        })

        return obj
    }
}

class Quote {
    props = {
        exchange: '',
        symbol: '',
        bid: 0,
        ask: 0
    }

    constructor(exchange, symbol) {
        this.props.exchange = exchange
        this.props.symbol = symbol

        const obj = {
            _: this,
            _exchange: exchange,
            _symbol: symbol
        }

        Object.defineProperty(obj, 'bid', {
            get: () => {
                return this.props.bid
            },
            set: () => {

            }
        })
        Object.defineProperty(obj, 'ask', {
            get: () => {
                return this.props.ask
            },
            set: () => {

            }
        })

        Object.defineProperty(obj, '_bid', {
            enumerable: false,
            set: val => {
                this.props.bid = val
            }
        })
        Object.defineProperty(obj, '_ask', {
            enumerable: false,
            set: val => {
                this.props.ask = val
            }
        })

        return obj
    }
}

module.exports = {
    Quote,
    Position
}
