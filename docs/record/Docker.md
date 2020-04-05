# Docker

## 阿里云镜像加速

```bash
# 您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://u9hmw9dm.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



## 镜像操作

``` bash
# 镜像列表
docker image ls

# 镜像拉取
docker pull (IMAGE_NAME)(:TAG)
# IMAGE_NAME: 镜像名称
# TAG: 版本

# 镜像删除
docker rmi (IMAGE_ID || REPOSITORY)
# IMAGE_ID: 镜像ID
# REPOSITORY: 镜像名称
```



## 容器操作

```bash
# 生成容器
docker run (IMAGE)
# IMAGE: 镜像名称

# 退出容器
exit

# 运行中的容器列表
docker container ls
docker ps

# 所有容器列表
docker container ls -all
docker ps -a

# 删除容器
docker rm (CONTAINER_ID || CONTAINER_NAME)
# CONTAINER_ID: 容器ID
# CONTAINER_NAME: 容器名称

# 批量删除
docker rm $(docker ps -aq)

# 启动容器
docker start (CONTAINER_ID || CONTAINER_NAME)

# 停止容器
docker stop (CONTAINER_ID || CONTAINER_NAME)

# 查看容器日志
docker logs  (CONTAINER_ID || CONTAINER_NAME)

# 创建容器 
docker run --name web -d -it -p 8000:80 nginx
# -d --detach: 后台运行
# -i --interactive: 可交互
# -t --tty: 启动终端
# -p : 端口映射 主机端口:容器内端口
# --name: 容器名称

# 进入容器
docker exec -it (CONTAINER_ID || CONTAINER_NAME) bash
# CONTAINER_ID: 容器ID
# CONTAINER_NAME: 容器名称

# 从正在运行的容器中拷贝文件到主机
docker cp (CONTAINER_ID||CONTAINER_NAME:CONTAINER_PATH HOST_PATH)
# CONTAINER_ID: 容器ID
# CONTAINER_NAME: 容器名称
# CONTAINER_PATH: 容器内路径
# HOST_PATH: 主机路径

#例:
docker cp web:/nginx.txt .
#将容器名为web的根目录nginx.txt拷贝到当前目录

#把主机文件拷贝到正在运行的容器
docker cp ./host.txt web:/

#制定自定义镜像
docker commit -m 'add nginx.txt host.txt' -a 'amyas' web amyas/nginx:1.0.0
```



## 构建镜像
``` bash
#当前目录存在Dockerfile
docker build -t IMAGE_NAME -f Maker.Dockerfile .

# -t: 指定 要构建的镜像名称
# .: Dockerfile的路径
# -f: 指定dockerfile的名字，默认为Dockerfile
```



## Dockerfile
``` bash
# 制定当前镜像基于的镜像 node
FROM node 
# 将当前目录的app文件夹复制到容器内的/app目录下
COPY ./app /app
# 设置工作目录为/app
WORKDIR /app
# 编译时运行的命令
RUN npm install
# 对外暴露的端口
EXPOSE 8000
# 容器运行时执行的命令
CMD node server.js
```



## 修改镜像名称

``` bash
docker tag 原始镜像ID 修改后的镜像名称
```



## 坑

> 部署nodejs容器时，容器只写监听端口，不要写本机名，否则容器外无法访问。
>
> 写了127.0.0.1就无法访问，其他项目同理
``` js
# 错误
server.listen(port, 127.0.0.1, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

# 正确
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
