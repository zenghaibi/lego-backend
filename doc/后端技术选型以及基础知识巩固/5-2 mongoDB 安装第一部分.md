## MongoDB 基础知识

#### 下载

地址：[https://www.mongodb.com/try/download/community]()

**安装的官方文档**

* macOS 安装使用homebrew:

### **手动下载配置，也适用于linux: **

bash

进入 /usr/local 安装本地软件的常用位置

cd /usr/local

1.下载

sudo curl -o [https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-6.0.2.tgz](https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-6.0.2.tgz)

2.解压对应下载的文件

sudo tar -zxvf [mongodb-macos-x86_64-6.0.2.tgz](https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-6.0.2.tgz)

3.重命名


接下来我们使用 curl 命令来下载安装：

```
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz

# 解压
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz

# 重命名为 mongodb 目录

sudo mv mongodb-osx-x86_64-4.0.9/ mongodb
```

安装完成后，我们可以把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中：

```
export PATH=/usr/local/mongodb/bin:$PATH
```

创建日志及数据存放的目录：

* 数据存放路径：
  ```
  sudo mkdir -p /usr/local/var/mongodb
  ```
* 日志文件路径：
  ```
  sudo mkdir -p /usr/local/var/log/mongodb
  ```

接下来要确保当前用户对以上两个目录有读写的权限：

```
sudo chown runoob /usr/local/var/mongodb
sudo chown runoob /usr/local/var/log/mongodb
```

以上 **runoob** 是我电脑上的用户，你这边需要根据你当前对用户名来修改。

接下来我们使用以下命令在后台启动 mongodb：

```
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
```

* **--dbpath** 设置数据存放目录
* **--logpath** 设置日志存放目录
* **--fork** 在后台运行

如果不想在后端运行，而是在控制台上查看运行过程可以直接设置配置文件启动：

```
mongod --config /usr/local/etc/mongod.conf
```

查看 mongod 服务是否启动：

```
ps aux | grep -v grep | grep mongod
```

使用以上命令如果看到有 mongod 的记录表示运行成功。

启动后我们可以使用 **mongo** 命令打开一个终端：

```
$ cd /usr/local/mongodb/bin 
$ ./mongo
MongoDB shell version v4.0.9
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("3c12bf4f-695c-48b2-b160-8420110ccdcf") }
MongoDB server version: 4.0.9
……
> 1 + 1
2
> 
```

---

## 使用 brew 安装

此外你还可以使用 OSX 的 brew 来安装 mongodb：

```
brew tap mongodb/brew
brew install mongodb-community@4.4
```

**@** 符号后面的 **4.4** 是最新版本号。

安装信息：

* 配置文件：**/usr/local/etc/mongod.conf**
* 日志文件路径：**/usr/local/var/log/mongodb**
* 数据存放路径：**/usr/local/var/mongodb**

### 运行 MongoDB

我们可以使用 brew 命令或 mongod 命令来启动服务。

brew 启动：

```
brew services start mongodb-community@4.4
```

brew 停止：

```
brew services stop mongodb-community@4.4
```

mongod 命令后台进程方式：

```
mongod --config /usr/local/etc/mongod.conf --fork
```

这种方式启动要关闭可以进入 mongo shell 控制台来实现：

```
> db.adminCommand({ "shutdown" : 1 })
```
