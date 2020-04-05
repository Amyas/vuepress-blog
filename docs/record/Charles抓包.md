# Charles抓包

## 下载

``` bash
https://www.charlesproxy.com/download/
```



## 手机代理

``` bash
连接和电脑同一WIFI，配置WIFI代理:
服务器：电脑IP，
端脑：Charles端口(Proxy => Proxy Settings 查看端口)
```



## HTTPS设置

```bash
#电脑证书
Help => SSLProxying => Install Charles Root Certificate

#手机证书
Help => SSLProxying => Install Charles Root Certificate on a Mobile Device or Remote Browser
#手机输入网址安装证书并信任
chls.pro/ssl

#抓包
打开 Proxy => SSL Proxying Settings
勾选 Enable SSL Proxying
添加 * （所有域名）
```

>IOS10.3之前安装证书默认信任，IOS10.3之后需要手动信任
>路径:设置 => 通用 => 关于手机 => 证书信任设置 => 找到 charles proxy…



## 破解

``` bas
https://www.charlesproxy.com/download/
```

