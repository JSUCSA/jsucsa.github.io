---
title: "项目部署基础"
date: 2025-06-04
categories:
  - Wiki
  - 技术教程
tags:
  - Wiki
  - 技术教程
---

# 项目部署基础

## 一、什么是项目部署

项目部署是指把本地开发完成的项目运行到服务器或线上环境中，让其他用户可以访问。

## 二、部署前需要准备

- 一台服务器；
- Linux 基础命令；
- Git；
- Node.js / Java / Python 环境；
- 数据库；
- Nginx；
- 域名，非必需；
- HTTPS 证书，正式项目建议配置。

## 三、前端项目部署流程

```bash
npm install
npm run build
```

Nginx 示例：

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/project/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 四、后端项目部署流程

```bash
mvn clean package
nohup java -jar app.jar > app.log 2>&1 &
tail -f app.log
```

## 五、部署建议

1. 开发环境和生产环境配置分开；
2. 日志要保留；
3. 密码不要写死在代码中；
4. 服务器端口不要随便开放；
5. 重要项目建议使用 Docker 部署；
6. 部署流程要写进项目文档。

