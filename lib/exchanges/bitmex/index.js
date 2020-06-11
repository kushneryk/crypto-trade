const WebSocket = require('ws')

class Exchange {
    sub = (entity, symbol, cb) => {
        switch (entity) {
            case 'quote':
                if (this.subs.quote[symbol] === undefined) {
                    this.subs.quote[symbol] = []
                }

                if (this.socketSubs.quote.indexOf(symbol) === -1) {
                    this.socketSubs.quote.push(symbol)

                    if (this.socketState) {
                        this.socket.send(`{"op":"subscribe","args":["quote:${symbol}"]}`)
                    }
                }

                if (typeof cb === 'function') {
                    this.subs.quote[symbol].push(cb)
                }
                break
        }
    }

    constructor() {
        this.subs = {
            quote: {}
        }
        this.socketSubs = {
            quote: []
        }

        this.socket = new WebSocket('wss://www.bitmex.com/realtime')
        this.socketState = false

        this.socket.on('open', () => {
            console.log('Bitmex connected')
            if (this.socketSubs.quote.length) {
                let subStr = []

                for(let i=0, l=this.socketSubs.quote.length; i<l; i++) {
                    subStr.push('"quote:'+this.socketSubs.quote[i]+'"')
                }

                this.socket.send('{"op":"subscribe","args":['+subStr.join(',')+']}')
            }

            this.socketState = true
        })

        this.socket.on('error', err => {
            throw new Error(err)
        })

        this.socket.on('message', data => {
            try {
                data = JSON.parse(data);
            } catch (e) {

            }

            switch (data.table) {
                case 'quote':
                    data.data.forEach(el => {
                        if (this.subs.quote[el.symbol]) {
                            this.subs.quote[el.symbol].forEach(s => {
                                s({
                                    bid: el.bidPrice,
                                    ask: el.askPrice
                                })
                            })
                        }
                    })
                    break
            }
        })

        return {
            sub: this.sub
        }
    }
}

module.exports = Exchange
