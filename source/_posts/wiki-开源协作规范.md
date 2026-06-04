---
title: "开源协作规范"
date: 2025-06-04
categories:
  - Wiki
  - 协会规范
tags:
  - Wiki
  - 协会规范
---

# 开源协作规范

## 一、为什么要重视开源协作

开源协作可以帮助成员学习真实项目开发流程，包括代码规范、分支管理、Issue 管理、Pull Request、文档维护、版本发布和团队协作。

## 二、仓库基本结构

```text
project-name
├── README.md
├── docs
├── src
├── tests
├── .gitignore
├── LICENSE
└── CHANGELOG.md
```

## 三、README 应包含

- 项目名称；
- 项目简介；
- 功能介绍；
- 技术栈；
- 安装方式；
- 运行方式；
- 项目截图；
- 贡献方式；
- 开源协议。

## 四、分支规范

- main：稳定版本；
- dev：开发版本；
- feature/xxx：新功能；
- fix/xxx：问题修复；
- docs/xxx：文档修改。

## 五、提交规范

```text
feat: 新功能
fix: 修复问题
docs: 文档修改
style: 格式调整
refactor: 代码重构
test: 测试相关
chore: 构建或杂项
```

## 六、Pull Request 规范

提交 PR 前应确认：

1. 代码能正常运行；
2. 没有提交无关文件；
3. 提交说明清楚；
4. 文档同步更新；
5. 不影响已有功能。

