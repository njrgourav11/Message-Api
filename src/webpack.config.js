const path = require('path');

module.exports = {
    // Other webpack configuration options...

    resolve: {
        fallback: {
            "os": require.resolve("os-browserify/browser"),
            "fs": false,
            "https": require.resolve("https-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "crypto": require.resolve("crypto-browserify")
        }
    }
};
