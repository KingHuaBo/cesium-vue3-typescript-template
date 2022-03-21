# vue3+typescript+Cesium模板
# 简介
本项目是vue3的vue-cli构建的框架，使用的typescript开发，构建了一个加载cesium地球的一个简单实例。
在此分享的目的是记录自己构建的过程，构建工程主要参照cesium官网的[Install with NPM](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#install-with-npm),但是过程中需要根据自己的情况做调整，主要是两个方面一个是webpage打包配置和widgets.css引入问题，稍后详解
## 环境介绍
1. node版本 v14.18.1
2. npm版本 6.14.15
3. vue-cli 5.0.3
4. vue 3.2.13
5. cesium 1.91.0
6. 开发工具 vscode
## 关于typescript的说明
通过npm 安装引入的cesium，cesium的声明文件会自动导入。
## cesium 引入的方式
本项目是通过你npm install 安装的最新版本，完全避免通过在html中静态引入方式。
## 避坑指南
### 1、解决CSS引用问题
你需要解决这个问题本项目才能正常跑起来！

原因：因为解决CSS应用问题需要修改node_modules中cesium包的package.json，但是node_modules没有上传到GitHub,所以你下载本项目后需要按照此方法解决。

问题本身：按照[Install with NPM](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#install-with-npm)
```
//直接使用这个代码，会提示找不到文件
import "cesium/Build/Cesium/Widgets/widgets.css";
```
解决问题：
打开目录\node_modules\cesium\package.json做如下修改
```
 "exports": {
    "./package.json": "./package.json",
    "./Build/Cesium/Widgets/widgets.css": "./Build/Cesium/Widgets/widgets.css",//只需要添加此行
    ".": {
      "require": "./index.cjs",
      "import": "./Source/Cesium.js"
    }
  },
```
 ### 2、配置webpack
 此问题在本项目代码已经解决，这里只是解释一些问题和解决方法。

 根据cesium官网的指南[Install with NPM](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#install-with-npm)，Cesium需要请求的静态文件必须要挂载在打包文件中（dist）,我们是通过npm install cesium的，在public目录下是没有cesium的静态文件的，所以需要在打包的时候把node_modules下的四个文件夹拷贝到打包文件加下(dist)
- node_modules/cesium/Build/Cesium/Workers
- node_modules/cesium/Build/Cesium/ThirdParty
- node_modules/cesium/Build/Cesium/Assets
- node_modules/cesium/Build/Cesium/Widgets

我们已经知道需求是拷贝以上4个文件夹到dist目录，下一步How to do：
这里需要用npm 装两个包copy-webpack-plugin和path，打开vue.config.js（vue3的webpack配置），配置如下：

```
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
```


## 还原安装依赖包
```
npm install
```

### 启动项目
```
npm run serve
```

### 发布打包项目
```
npm run build
```

### 能力有限，如有帮助，欢迎赏Issues or Star
