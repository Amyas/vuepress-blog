FROM vuepress-blog-maker AS builder

FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /home/vuepress-blog/docs/.vuepress/dist /usr/share/nginx/html

EXPOSE 80