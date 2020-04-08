FROM node

WORKDIR /home/vuepress-blog

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org && \
npm run build