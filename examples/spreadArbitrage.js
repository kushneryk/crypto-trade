const {Trade, Quote, Position} = require('./../index')

const trade = new Trade()

const XBTUSD = new Quote('bitmex', 'XBTUSD')
const XBTM20 = new Quote('bitmex', 'XBTM20')

const positionXBTUSD = new Position('bitmex', 'XBTUSD')
const positionXBTM20 = new Position('bitmex', 'XBTM20')

trade.tick(() => {
    if (XBTM20.bid - XBTUSD.bid < 20) {
        positionXBTM20.volume = -1000
        positionXBTUSD.volume = 1000
    }

    if (XBTM20.bid - XBTUSD.bid > 60) {
        positionXBTM20.volume = 1000
        positionXBTUSD.volume = -1000
    }
})
