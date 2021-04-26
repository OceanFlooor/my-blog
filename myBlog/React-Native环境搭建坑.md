## React-Native环境搭建坑

按照官网的步骤一步步进行会遇到一个flipper folly的坑， yarn ios无法启动项目

解决方法：
1. 回滚RN版本到 0.63.0
2. 根目录下创建文件夹 release_ios
3. 全局搜索：`main.jsbundle`，找到文件 `project.pbxproj`, and then replace the line with
  ```
ADB2F20F2523171700342380 /* main.jsbundle */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text; name = main.jsbundle; path = ../release_ios/main.jsbundle; sourceTree = "<group>"; };
  ```
4. in file `package.json`, add 
```
"bundle:ios": "react-native bundle --entry-file index.ts --platform ios --dev false --bundle-output release_ios/main.jsbundle --assets-dest release_ios/",
// and then run yarn bundle:ios
```
