module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/facalendardelta/dist/'
        : '/',
    configureWebpack: {
        module: {
            rules: [
                { test: /\.midi$/, use: 'file-loader' }
            ]
        }
    }
}
