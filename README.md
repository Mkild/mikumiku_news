# MikuMiku News

<p align="center">
    <img src="./public/images/miku.jpg" alt="mikumiku_news" />
</p>

> **新闻 NEWS**
>
> Node.js, koa2, Bootstrap, ejs, MySQL...

## 简介

一个平平无奇的新闻网站，过时的。

前后端不分离，个人早期项目，留作纪念...

前台包含首页门户、新闻分类浏览、点赞新闻、评论新闻、新闻搜索、用户系统等，

后台包含用户信息、用户管理、新闻管理、发表新闻、修改新闻等。

## 快速启动

首先确保 [Node.js](https://nodejs.org/en/) 和 [MySQL](https://www.mysql.com/) 已经安装且能正常运行。

作为参考，我的 Node.js 版本是`16.14.0`，MySQL 版本是`8.0.22`，其他版本请自行测试。

```shell
# 克隆项目
# cnpmjs
git clone https://github.com.cnpmjs.org/Mkild/dental-admin-api.git
# or
git clone https://github.com/Mkild/dental-admin-api.git
# 进入项目目录
cd dental-admin-api
# 安装依赖
npm install
# 修改MySQL配置
# 修改根目录下config文件夹中的 mysql_config.js 和 mysql_sequelize.js 中的配置
# 将user、password等修改成你自己MySQL中的user、password等
# 将根目录的koa_test.sql导入MySQL
# 启动服务 （默认为http://localhost:3000）
npm run start  / nodemon

```

## 快照

![image.png](https://i.imgur.com/TwU4Ksf.png)

![image.png](https://i.imgur.com/CwNNTOs.png)

![image.png](https://i.imgur.com/FKOTcg9.png)

![image.png](https://i.imgur.com/or54Bmh.png)

![image.png](https://i.imgur.com/zYeiSHf.png)
