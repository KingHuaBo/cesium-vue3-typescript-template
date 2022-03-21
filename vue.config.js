// const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//   transpileDependencies: true,
// })
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const cesiumBuild = 'node_modules/cesium/Build/Cesium';
module.exports = {
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.join(cesiumBuild, 'Workers'), to: 'Cesium/Workers' },
          { from: path.join(cesiumBuild, 'ThirdParty'), to: 'Cesium/ThirdParty' },
          { from: path.join(cesiumBuild, 'Assets'), to: 'Cesium/Assets' },
          { from: path.join(cesiumBuild, 'Widgets'), to: 'Cesium/Widgets' }
        ],
      }),
    ],
  }

};
