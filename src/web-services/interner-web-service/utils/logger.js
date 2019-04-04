const {
    transports,
    createLogger,
    format
} = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './logs/error.log',
            level: 'error'
        }),
        new transports.File({
            filename: './logs/info.log',
            level: 'info'
        })
    ],
    exitOnError: false,
})

module.exports = logger;