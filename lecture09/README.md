# 第九章 Git 图形工具

> 作者：shenhao

## 前言：为什么要使用 Git GUI ？

Git 虽然作为一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理，但在实际项目研发过程中，开发人员通常只会使用几个常见的命令进行协同工作。从之前的章节，我们已经深入了解到了 Git 的基本原理和众多命令，有些命令由于不常使用，较难记忆。因此，对于多数项目开发者而言，在终端上运行的纯文本命令并不是最佳的选择；有时候可视化图形界面更符合用户的习惯。Git GUI 为用户提供了一个可视化的图形界面，允许项目开发者通过简单的点击便捷地使用Git，从而不需要在终端上手动输入繁多的文本命令。这样一来，开发者能够更高效、更便捷地进行项目版本管理。

本章将介绍以下三种主流的 Git GUI 图形化工具，帮助开发者能更为轻松、高效的利用 Git 进行项目版本管理。

- **GitHub Desktop**
- **TortoiseGit**
- **Vscode Git**

在本教程中，只介绍了部分Git GUI 图形客户端， 更多详细内容可以查看✅[ Git 官网](https://git-scm.com/downloads/guis/)。

## GitHub Desktop

[GitHub Desktop](https://desktop.github.com/) 可能是所有 Git 可视化应用中最著名的方案。几乎所有开发人员都熟悉 GitHub ，而 Github Desktop 正是 Github 推出的开源 Git GUI 图形客户端。可以在Windows和Macos平台上进行使用，目前暂不支持Linux平台。

### 基本使用

首先进入官网，根据不同的系统，下载并安装对应版本的 [GitHub Desktop](https://desktop.github.com/) 。

<img src="https://gitee.com/shenhao-stu/picgo/raw/master/DataWhale/image-20220428170830603.png" style="zoom: 25%;" />

#### 登录

完成下载后，登录个人 Github 账户进行授权，并配置用户名和邮箱，用以识别个人创建的commits提交。在完成基本配置后，如下界面：

<img src="https://gitee.com/shenhao-stu/picgo/raw/master/DataWhale/image-20220428172048903.png" alt="image-20220428172048903" style="zoom: 33%;" />

#### 克隆仓库

<img src="https://gitee.com/shenhao-stu/picgo/raw/master/DataWhale/image-20220428172231341.png" alt="image-20220428172231341" style="zoom: 33%;" />

#### 提交PR

由于在实际开源项目贡献的过程中，开发者往往并没有直接修改仓库内容的权限，因此需要先对目标仓库进行fork操作，再通过提交PR的方式进行代码的贡献。

<img src="https://gitee.com/shenhao-stu/picgo/raw/master/DataWhale/image-20220428173133654.png" style="zoom:33%;" />

<img src="https://gitee.com/shenhao-stu/picgo/raw/master/DataWhale/image-20220428173703179.png" style="zoom:33%;" />

<img src="https://gitee.com/shenhao-stu/picgo/raw/master/DataWhale/image-20220428174105849.png" style="zoom:33%;" />