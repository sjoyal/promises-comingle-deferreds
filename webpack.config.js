const path = require('path');

module.exports = {
    mode: 'none',
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'app.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: ['babel-loader'],
            },
        ],
    },
}
