---
title: SRE 入门：什么是站点可靠性工程？
date: 2025-06-02 14:00:00
categories:
  - SRE
tags:
  - SRE
  - 运维
  - 可靠性
---

## 什么是 SRE？

SRE（Site Reliability Engineering，站点可靠性工程）是由 Google 提出的一种运维理念。它将软件工程的方法应用于基础设施和运维问题。

<!-- more -->

## 核心概念

### SLI / SLO / SLA

- **SLI（Service Level Indicator）**：服务水平指标，如请求延迟、错误率
- **SLO（Service Level Objective）**：服务水平目标，如 99.9% 可用性
- **SLA（Service Level Agreement）**：服务水平协议，对外承诺

### 错误预算（Error Budget）

```
错误预算 = 1 - SLO
例如：SLO = 99.9% → 错误预算 = 0.1%
```

当错误预算充足时，可以加快发布速度；当错误预算耗尽时，需要优先修复可靠性问题。

## SRE 实践

1. **监控与告警**：建立完善的可观测性体系
2. **故障演练**：通过 Chaos Engineering 主动发现弱点
3. **自动化**：减少人工操作，降低出错概率
4. **事后复盘**：从故障中学习，避免重复犯错

## 推荐阅读

- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents/)

---

*JSUCSA 定期举办 SRE 实战分享，欢迎关注我们的活动！*
