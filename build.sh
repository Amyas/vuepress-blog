#!/bin/sh
sudo docker stop vuepress-blog || true \
&& sudo docker rm vuepress-blog || true \
&& sudo docker build -t vuepress-blog-maker -f Maker.Dockerfile . \
&& sudo docker build -t vuepress-blog . \
&& sudo docker run -d --name vuepress-blog -p 8002:80 vuepress-blog