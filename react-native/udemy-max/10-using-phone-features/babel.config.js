module.exports = function (api) {
    api.cache(false)

    return {
        plugins: [["module:react-native-dotenv"]],
        presets: ["babel-preset-expo"],
    }
}
