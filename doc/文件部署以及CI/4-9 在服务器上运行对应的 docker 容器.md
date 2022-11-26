##### 部署到服务器

**安装Docker**

Ubutn:

* https://www.runoob.com/docker/ubuntu-docker-insall.html
* https://docs.docker.com/engine/install/ubuntu

**配置用户组**

因为是root安装，普通用户执行对应的命令的时候有可能会报错

Can't connect to docker daemon

Got permission denied while trying to connect to the Docker daemon

socket at unix:///var/run/docker.sock

需将将对应的用户添加到docker的用户组中。

```bash
# usermod 命令修改账户
# a --append 添加 - G --groups 组的名称
sudo usermod -aG docker 你的用户名
```
