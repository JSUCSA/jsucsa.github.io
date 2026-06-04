---
title: "Git与GitHub入门"
date: 2025-06-04
categories:
  - Wiki
  - 技术教程
tags:
  - Wiki
  - 技术教程
---

# Git 与 GitHub 入门

## 一、Git 是什么

Git 是一个分布式版本控制工具，用来记录代码的修改历史，支持多人协作开发。

Git 可以帮助你保存代码版本、回退错误修改、查看谁改了什么、多人一起开发项目、管理不同功能分支。

## 二、常用命令

```bash
git init
git status
git add .
git commit -m "提交说明"
git remote add origin 仓库地址
git push -u origin main
git pull
```

## 三、推荐提交规范

```text
feat: 新增登录功能
fix: 修复活动报名按钮失效问题
docs: 更新项目说明文档
style: 调整页面样式
refactor: 重构用户模块代码
```

## 四、协会协作建议

- 每个项目建立独立仓库；
- 主分支保持稳定；
- 新功能使用分支开发；
- 提交前先拉取最新代码；
- 重要修改写清楚提交说明；
- 项目 README 必须完整。

