#### Github Actions 完成自动部署

**大体分为两步**

* 在runner 上 build image  并且push
* 使用docker-compose-online 文件在服务器上运行应用

**第一步详细流程分析，在gihub runner 上运行**

* checkout 代码
* 创建.env 文件，并且添加两个环境变量（upload to OSS 需要对应的信息）
* 使用阿里云ACR完成docker login
* 使用正确的阿里云tag进行docker build
  * 怎样每次push生成特殊的tag? 是一个后续的问题
* docker push

***提前准备好 Actions secrets***

* ACR_PASSWORD
* ACR_USERNAME. --->kevinhbzeng
* ALC_ACCESS_KEY
* ALC_SECRET_KEY
