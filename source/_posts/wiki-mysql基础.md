---
title: "MySQL基础"
date: 2025-06-04
categories:
  - Wiki
  - 技术教程
tags:
  - Wiki
  - 技术教程
---

# MySQL 基础

## 一、数据库是什么

数据库用于存储和管理数据。常见场景包括用户账号、活动报名信息、项目数据、商品订单、文章内容和日志记录。

## 二、常见概念

- 数据库：存放数据表的集合；
- 数据表：类似 Excel 表格；
- 字段：表中的列；
- 记录：表中的一行数据；
- 主键：唯一标识一条记录；
- 外键：建立表与表之间的关系。

## 三、常用 SQL

```sql
CREATE DATABASE club_db;

CREATE TABLE member (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    major VARCHAR(100),
    grade VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO member(name, major, grade)
VALUES ('张三', '信息安全', '2024级');

SELECT * FROM member;
SELECT * FROM member WHERE major = '信息安全';
UPDATE member SET major = '计算机科学与技术' WHERE id = 1;
DELETE FROM member WHERE id = 1;
```

## 四、协会项目常见表

- member：成员表；
- activity：活动表；
- signup：报名表；
- project：项目表；
- competition：竞赛表；
- document：文档表。

