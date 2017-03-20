import log4js from 'log4js'

log4js.configure({
    appenders: [{
        type: 'console',
        layout: {
            type: 'pattern',
            pattern: '%[%d{DATE}:%p [%c]: %]%m'
        }
    }]
})

export default log4js.getLogger('vue-docs')