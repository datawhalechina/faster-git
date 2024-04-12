# 第六章 GitFlow工作流实战

## 6.0 引言

在实际项目开发工作中，常常会有自测、联调、提测、线上紧急修复等多工作环节，对应可能需要本地、内测、开发、测试、生产等多环境部署代码的需求，对应每个环节会产生不同的分支；本节将从Git-Flow模型原理出发，通过命令行演示实际可操作手段并进行总结，最终希望Git-Flow在实际项目中应用起来，从而高效完成代码开发、版本管理等实际工作。

（注：不同的公司或者不同的项目的GitFlow工作流模型标准也不同，具体以实际应用为准；本文提供的为常用模板，较为全面和通用，建议多加练习，达到熟练掌握的程度）



## 6.1 深入理解Git-Flow工作流模型原理

- Git-Flow模型解决什么问题? 

  为了解决实际项目中代码开发、代码测试、bug修复、版本发布等一系过程列严重耦合从而产生各种问题，如冲突过度、版本混乱。

- Git-Flow模型又是如何解决上述问题的呢? 

  基于Git定义5种类型的分支，各分支严格定义其职责、起始点等，从而使开发、测试、发版等过程有条不紊进行。


### 6.1.1 Git-Flow流程图

该流程图完整描述Git-Flow模型处理过程，当我们深入理解各分支，然后结合项目阶段与自身的角色（开发/测试/项目经理），就会发现每个角色在某个阶段需要关注的可能也就一两个分支，比如在开发阶段，开发人员只需关注新功能分支（Feature分支）；release阶段，测试人员和开发人员都只需关注Release分支，各人的职责有所差异而已；具体如下图（建议读者动手手绘一遍该流程图以便于加深理解）：

<img src="./imgs/gitflow示意图.png" style="zoom:75%;" />

### 6.1.2 Git-Flow各分支的说明 

| 分支名称                  | 作用                                   | 生命周期                 | 提交or合并                                                   | 起始点                                                |
| ------------------------- | -------------------------------------- | ------------------------ | ------------------------------------------------------------ | ----------------------------------------------------- |
| Feature分支               | 用于某个功能的                         | 临时分 支、开发 阶段     | 可提交代码                                                   | 由Develop分支产生， 最终合并到Develop分支             |
| Develop分支               | 记录历史开发功能                       | 贯穿整个项目             | 不能提交，由Feature分 支、Bugfix分支、Release 分支、Hotfix分支合并代码 | 整个项目                                              |
| Release分支               | 用于本次Release 如存档、测试、 bug修复 | 临时分 支、发版 阶段     | 可提交代码                                                   | 由Develop分支产生， 最终合并到Develop分支和Master分支 |
| Hotfix分支                | 用于解决线上bug                        | 临时分 支、紧急 修复阶段 | 可提交代码                                                   | 由Master分支产生， 最终合并到Develop 分支和Master分支 |
| Master（Production） 分支 | 记录历史发布版本                       | 贯穿整个项目             | 不能提交，由Release、Hotfix分支合并代码                      | 整个项目                                              |

### 6.1.3 不同角度理解各分支

- 生命周期 

  - Master分支和Develop分支贯穿项目；

  - 其他分支均为承担特定指责的临时分支。 

- 项目阶段 

  - 开发阶段主要涉及Feature分支、Develop分支； 
  - 发布阶段主要涉及Release分支、Production分支、Develop分支；
  - 紧急修复阶段主要涉及Hotfix分支、Production分支、Develop分支。

- 成员关注点 

  - 开发人员关注Develop分支、Feature分支以及特殊阶段关注Hotfix、Release分支的bug修复；
  - 测试人员关注Release分支、Hotfix分支的功能测试；
  - 项目经理关注Production分支、Release分支。

另外要说明，项⽬阶段在时间纬度有可能重叠。比如release阶段(当前版本)与下各版本的开发阶段可同时存在，因为当前release阶段的发起同时也就意味着下一个release的开发阶段的开始；一旦线上出现bug(任何时候都可能出现)，紧急修复阶段就可能与开发阶段、发版阶段重叠。因此，要求团队成员都要理解Git-Flow工作流，以及自身所处的项目阶段。

## 6.2 命令行演示一个完整的Git-Flow流程 

原理总是枯燥的，接下来实践一个从功能开发到版本发布的完整的流程，感受一下Git-Flow的具体操作。

> 特此说明，以下shell命令是在win10环境下，`/e/PycharmProjects/DatawhaleChina`目录，使用git bash工具进行演示；`$` 符号所在行为演示命令，如有内容输出，会在`$` 符号所在行的下面输出。

### 6.2.1 初始化项支，创建Develop分支

```shell
Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina
$ pwd
/e/PycharmProjects/DatawhaleChina

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina
$ mkdir git-demo-workflow-project

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina
$ cd git-demo-workflow-project/

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project
$ touch readme.md

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project
$ git init
Initialized empty Git repository in E:/PycharmProjects/DatawhaleChina/git-demo-workflow-project/.git/

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git add .

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git commit -m "init"
[master (root-commit) 1ae2455] init
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 readme.md

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git checkout -b develop master
Switched to a new branch 'develop'
```



### 6.2.2 模拟开发阶段过程

（创建新功能Feature分支、实现一个用户登录模块、然后合并到Develop分支、删除功能分支） 

```shell
Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git checkout -b feature-login develop
Switched to a new branch 'feature-login'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ touch LoginUser.html

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$echo "hi, this is user html" > LoginUser.html

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ cat LoginUser.html
hi, this is user html

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ ls
LoginUser.html  readme.md

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ git add .
warning: LF will be replaced by CRLF in LoginUser.html.
The file will have its original line endings in your working directory

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ git commit -m "feat: add LoginUser.html"
[feature-login 182444e] feat: add LoginUser.html
 1 file changed, 1 insertion(+)
 create mode 100644 LoginUser.html

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ touch LoginUser.js


Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ echo "hi, this is user js" > LoginUser.js

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ git add .
warning: LF will be replaced by CRLF in LoginUser.js.
The file will have its original line endings in your working directory

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ git commit -m "feat: add LoginUser.js"
[feature-login b0d494c] feat: add LoginUser.js
 1 file changed, 1 insertion(+)
 create mode 100644 LoginUser.js

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ git status
On branch feature-login
nothing to commit, working tree clean

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (feature-login)
$ git checkout develop
Switched to branch 'develop'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git merge --no-ff feature-login
Merge made by the 'recursive' strategy.
 LoginUser.html | 1 +
 LoginUser.js   | 1 +
 2 files changed, 2 insertions(+)
 create mode 100644 LoginUser.html
 create mode 100644 LoginUser.js

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git branch -d feature-login
Deleted branch feature-login (was b0d494c).
```



### 6.2.3 模拟Release阶段过程

（创建Release分支、进行bug修复、合并到Production分支与Develop分支）

```shell
Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git checkout  -b release-v0.1 develop
Switched to a new branch 'release-v0.1'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (release-v0.1)
$ echo "bugifx LoginUser.html" >> LoginUser.html

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (release-v0.1)
$ git add .
warning: LF will be replaced by CRLF in LoginUser.html.
The file will have its original line endings in your working directory

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (release-v0.1)
$ git commit -m "fix: bugfix for LoginUser.html"
[release-v0.1 a37a88c] fix: bugfix for LoginUser.html
 1 file changed, 1 insertion(+)

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (release-v0.1)
$ git checkout master
Switched to branch 'master'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git merge --no-ff release-v0.1
Merge made by the 'recursive' strategy.
 LoginUser.html | 2 ++
 LoginUser.js   | 1 +
 2 files changed, 3 insertions(+)
 create mode 100644 LoginUser.html
 create mode 100644 LoginUser.js

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git tag v0.1

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git checkout develop
Switched to branch 'develop'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git merge --no-ff release-v0.1
Merge made by the 'recursive' strategy.
 LoginUser.html | 1 +
 1 file changed, 1 insertion(+)

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git branch -d release-v0.1
Deleted branch release-v0.1 (was a37a88c).
```



### 6.2.4 模拟线上故障，创建Hotfix分支

（创建Hotfix分支、进行bug修复、合并到Production分支与Develop分支）

```shell
Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git checkout -b hotfix-v0.1.1 master
Switched to a new branch 'hotfix-v0.1.1'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (hotfix-v0.1.1)
$ git status
On branch hotfix-v0.1.1
nothing to commit, working tree clean

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (hotfix-v0.1.1)
$ echo "hotfix for LoginUser.html" >> LoginUser.html

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (hotfix-v0.1.1)
$ cat LoginUser.html
hi, this is user html
bugifx LoginUser.html
hotfix for LoginUser.html

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (hotfix-v0.1.1)
$ git add .
warning: LF will be replaced by CRLF in LoginUser.html.
The file will have its original line endings in your working directory

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (hotfix-v0.1.1)
$ git commit -m "hotfix: do something for LoginUser.html"
[hotfix-v0.1.1 bcb680e] hotfix: do something for LoginUser.html
 1 file changed, 1 insertion(+)

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (hotfix-v0.1.1)
$ git checkout master
Switched to branch 'master'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git merge --no-ff hotfix-v0.1.1
Merge made by the 'recursive' strategy.
 LoginUser.html | 1 +
 1 file changed, 1 insertion(+)

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git tag v0.1.1

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (master)
$ git checkout develop
Switched to branch 'develop'

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git merge --no-ff hotfix-v0.1.1
Merge made by the 'recursive' strategy.
 LoginUser.html | 1 +
 1 file changed, 1 insertion(+)

Administrator@WIN MINGW64 /e/PycharmProjects/DatawhaleChina/git-demo-workflow-project (develop)
$ git branch -d hotfix-v0.1.1
Deleted branch hotfix-v0.1.1 (was bcb680e).
```
