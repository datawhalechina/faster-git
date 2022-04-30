# 第六章 GitFlow工作流实战

## 1. 引言

在实际项目开发工作中，常常会有自测、联调、提测、线上紧急修复等多工作环节，对应可能需要本地、内测、开发、测试、生产等多环境部署代码的需求，对应每个环节会产生不同的分支；本⽂将从Git-Flow模型原理出发，通过命令行演示实际可操作⼿段并进⾏总结，最终希望Git-Flow在实际项⽬中应⽤起来，从⽽⾼效完成代码开发、版本管理等实际⼯作。

（注：不同的公司或者不同的项目的GitFlow工作流模型标准也不同，具体以实际应用为准；本文提供的为常用模板，较为全面和通用，建议多加练习，达到熟练掌握的程度）



## 2. 深⼊理解Git-Flow⼯作流模型原理

- Git-Flow模型解决什么问题? 

  为了解决实际项⽬中代码开发、代码测试、bug修复、版本发布等⼀系过程列严重耦合从⽽产⽣各种问题，如冲突过度、版本混乱。

- Git-Flow模型⼜是如何解决上述问题的呢? 

  基于Git定义5种类型的分⽀，各分⽀严格定义其指责、起⽌点等，从⽽使开发、测试、发版等过程有条不紊进⾏。

  

### 2.1. Git-Flow流程图：

该流程图完整描述Git-Flow模型处理过程，当我们深⼊理解各分⽀，然后结合项⽬阶段与⾃身的⻆⾊（开发/测试/项⽬经理），就会发现每个角色在某个阶段需要关注的可能也就⼀两个分⽀，⽐如在开发阶段，开发⼈员只需关注⾃⼰的新功能分⽀（Feature分支）；release阶段，测试⼈员和开发⼈员都只需关注Release分⽀，只是各⾃的指责有所仅此差异⽽已；具体如下图（建议读者动手手绘一遍该流程图以便于加深理解）：

<img src="./imgs/gitflow示意图.png" style="zoom:75%;" />

### 2.2. Git-Flow各分⽀的说明 

| 分⽀名称                  | 作⽤                                   | ⽣命周期                 | 提交or合并                                                   | 起⽌点                                                 |
| ------------------------- | -------------------------------------- | ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------ |
| Feature分⽀               | ⽤于某个功能的                         | 临时分 ⽀、开发 阶段     | 可提交代码                                                   | 由Develop分⽀产⽣， 最终合并到Develop 分⽀             |
| Develop分⽀               | 记录历史开发功 能                      | 贯穿整个 项⽬            | 不能提交，由Feature分 ⽀、Bugfix分⽀、Release 分⽀、Hotfix分⽀合并代码 | 整个项⽬                                               |
| Release分⽀               | ⽤于本次Release 如⽂档、测试、 bug修复 | 临时分 ⽀、发版 阶段     | 可提交代码                                                   | 由Develop分⽀产⽣， 最终合并到Develop 分⽀和Master分支 |
| Hotfix分⽀                | ⽤于解决线上bug                        | 临时分 ⽀、紧急 修复阶段 | 可提交代码                                                   | 由Master分⽀产⽣， 最终合并到Develop 分⽀和Master分支  |
| Master（Production） 分⽀ | 记录历史发布版 本                      | 贯穿整个 项⽬            | 不能提交，由Release、Hotfix分⽀合并代码                      | 整个项⽬                                               |

### 2.3. 不同⻆度理解各分⽀ 

- ⽣命周期 

  Master分⽀和Develop分⽀贯穿项⽬；其他分⽀均为承担特定指责的临时分⽀。 

- 项⽬阶段 

  开发阶段主要涉及Feature分⽀、Develop分⽀； 发布阶段 主要涉及Release分⽀、Production分⽀、Develop分⽀； 紧急修复阶段 主要涉及Hotfix分⽀、Production分⽀、Develop分⽀。

- 成员关注点 

  开发⼈员 关注Develop分⽀、Feature分⽀以及特殊阶段关注Hotfix、Release分⽀的bug修复； 测试⼈员 关注 Release分⽀、Hotfix分⽀的功能测试；项⽬经理 关注Production分⽀、Release分⽀。

另外要说明，项⽬阶段在时间纬度有可能重叠.⽐如:release阶段(当前版本)与下各版本的开发阶段可同时存在，因为 

当前release阶段的发起同时也就意味着下⼀个release的开发阶段的开始；⼀旦线上出现bug(任何时候都可能出现)， 

紧急修复阶段就可能与开发阶段、发版阶段重叠...因此，要求团队成员都要理解Git-Flow⼯作流，以及⾃身所处的项 

⽬阶段. 

## 3. 命令行演示⼀个完整的Git-Flow流程 

原理总是枯燥的，接下来实践⼀个从功能开发到版本发布的完整的流程，感受⼀下Git-Flow的具体操作. 

> 特此说明，以下shell命令是在win10环境下，‘/e/PycharmProjects/DatawhaleChina’目录，使用git bash工具进行演示；‘\$’ 符号所在行为演示命令，如有内容输出，会在‘\$’ 符号所在行的下面输出。

### 3.1. 初始化项⽬，创建Develop分⽀

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



### 3.2. 模拟开发阶段过程

(创建新功能Feature分⽀、实现⼀个⽤户登录模块、然后合并到Develop分⽀、删除功能分⽀) 

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



### 3.3. 模拟Release阶段过程

(创建Release分⽀、进⾏bug修复、合并到Production分⽀与Develop分⽀) 

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



### 3.4. 模拟线上故障，创建Hotfix分⽀

(创建Hotfix分⽀、进⾏bug修复、合并到Production分⽀与Develop分⽀) 

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



