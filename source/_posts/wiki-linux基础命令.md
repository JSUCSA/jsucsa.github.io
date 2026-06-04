---
title: "Linux基础命令"
date: 2025-06-04
categories:
  - Wiki
  - 技术教程
tags:
  - Wiki
  - 技术教程
---

# Linux 基础命令

## 一、为什么要学 Linux

Linux 常用于服务器、开发环境、网络安全实验、项目部署和运维管理。掌握 Linux 基础命令，是计算机方向成员的重要基础能力。

## 二、目录操作

```bash
pwd
ls
ls -la
cd 目录名
cd ..
mkdir 目录名
rm -r 目录名
```

## 三、文件操作

```bash
touch 文件名
cat 文件名
less 文件名
cp 源文件 目标文件
mv 源文件 目标文件
rm 文件名
```

## 四、文本处理

```bash
grep "关键词" 文件名
head 文件名
tail 文件名
tail -f 日志文件
wc -l 文件名
sort 文件名
uniq 文件名
```

## 五、权限与进程

```bash
chmod +x 文件名
chmod 755 文件名
ps aux
top
kill 进程号
```

## 六、网络相关

```bash
ping 域名或IP
curl URL
wget URL
ss -tulnp
```

