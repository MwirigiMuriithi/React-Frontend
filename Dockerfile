FROM node:22-alpine as builder


WORKDIR /app

COPY . /app/
RUN npm install
RUN npm run build 


FROM nginx:1.27.0-alpine3.19-slim
# WORKDIR /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist . 
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80