#### 配置config

**appInfo 说明**

* pkg  package.json
* name 应用名，同pkg.name
* baseDir 应用代码目录
* HOME 用户目录，如果admin账户 /home/admin
* root 应用根目录，只有在local 和 unittest 环境下为baseDir, 其他都为HOME

config.default.ts 默认配置

config.local.ts --开发环境配置

config.prod.ts --生产运行环境配置

采用是局名配置+默认配置

npm run dev ===》开发环境

**在运行生产环境前需要先将.ts文编译成js文件后** **npm run tsc**

#### 才能运行下面生产环境

npm run start ===》生产环境
