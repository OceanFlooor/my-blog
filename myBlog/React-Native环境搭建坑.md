## React-Native环境搭建坑

按照官网的步骤一步步进行会遇到一个flipper folly的坑， yarn ios无法启动项目

解决方法：
1. 回滚RN版本到 0.63.0
2. 根目录下创建文件夹 release_ios
3. 全局搜索：`main.jsbundle`，找到文件 `project.pbxproj`, and then replace the line with
  ```
ADB2F20F2523171700342380 /* main.jsbundle */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text; name = main.jsbundle; path = ../release_ios/main.jsbundle; sourceTree = "<group>"; };
  ```
4. podfile中把 use_flipper 若干行注释
```
# Enables Flipper.
#
# Note that if you have use_frameworks! enabled, Flipper will not work and
# you should disable these next few lines.
# use_flipper!({ 'Flipper-Folly' => '2.3.0' })
# post_install do |installer|
#   flipper_post_install(installer)
# end
```
5. `package.json` 文件中添加
```
"bundle:ios": "react-native bundle --entry-file index.ts --platform ios --dev false --bundle-output release_ios/main.jsbundle --assets-dest release_ios/",
// and then run
yarn bundle:ios
```
