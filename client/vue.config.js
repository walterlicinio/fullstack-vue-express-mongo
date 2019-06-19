const path = require('path')

module.exports = {

    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        //proxy for dev server to run on localhost 3000
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    }
}