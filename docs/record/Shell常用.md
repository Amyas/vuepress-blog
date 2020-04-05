# Shell常用命令

## 连接服务器

``` bash
ssh root@ip
```



## 上传文件到服务器

``` bash
scp /var/www/test.js root@ip:/var/www/
```



## 上传文件夹到服务器

```bash
scp -r ./dist/ root@ip:/www/nginx/html/
```



## 服务器文件下载到本地

``` bash
scp root@ip:/var/www/test.js /var/www/
```



## 服务器文件夹下载到本地

``` bash
scp -r root@39.107.80.119:/var/www/test /var/www/
```

