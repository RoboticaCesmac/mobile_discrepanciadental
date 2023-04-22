module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@common": "./app/screens/common",
            "@assets": "./app/assets",
            "@screens": "./app/screens",
            "@config": "./app/config",
            "@components": "./app/components"
          }
        }
      ]
    ]
  };
};
