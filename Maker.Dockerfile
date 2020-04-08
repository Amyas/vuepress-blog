FROM node

WORKDIR /home/vuepress-blog

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org && \
ls && \
npm run build