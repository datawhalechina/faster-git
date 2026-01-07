# 第四章 Git 工具

> Author: Martin

本章主要介绍 Git 常用的工具，可能不会经常用到，但是“万一”呢，你说对吧? 看看总归不会有坏处，技多不压身嘛 🐶。

## 4.0 开始你的工作

我们需要一些简单的文件和目录来演示该章节，如果可以的话，请 fork 这个演示项目至你的个人账号下，来跟我一起动起手来。

> <https://github.com/datawhalechina-git-samples/app>

后续演示均以这个 repo 操作。

## 4.1 引用修订版本

Git 支持多种方式来引用单个提交、一组提交或一定范围内的提交。

### 4.1.1 引用 Commit 的记录

你可以通过任意一个提交的 40 位字符的 `SHA-1` 散列值来指定它。

**`$` 是终端交互的提示符，不需要输入。如果系统或者终端不一样，只需输入 `$` 后的内容即可，本文后续不再累述**

切换至本项目工作目录，执行 `git log` 能看到类似提交日志的输出。(shell 通过 pipe `|` 将输出信息传递给 `more` 做多页显示)。

```bash
$ git log | more

commit 44328544187650f2f6ecc253ef3a2b099c51baa5
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 13:41:55 2022 +0800

    add model module

commit a55ea122894272b13c3a43129ca0b74cfd2b6a4a
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 13:33:17 2022 +0800

    Initial commit
```

从日志能明显的看到多次提交的记录，每次包括 `commit` + 一串字符、作者、提交时间 和详细信息等。

这里的主角就是 commit 后跟的 40 位的字符，这个值是一个 SHA-1 哈希值。它是对内容和头信息 Header 的一个校验和 checksum，Git 使用 SHA-1 并不是为了数据的安全性，而是数据的完整性；它保证，在很多年后，你重新 checkout 某个 commit 时，一定是当时的状态，完全一摸一样。 有兴趣进一步了解这个 SHA-1 的值，可以 [参考这里](https://www.jianshu.com/p/4f8b56d0fd5b)。

想查看某次提交信息，可以通过 `git show` 来查看，如:

```bash
$ git show 44328544187650f2f6ecc253ef3a2b099c51baa5

commit 44328544187650f2f6ecc253ef3a2b099c51baa5 (HEAD -> main, origin/main, origin/HEAD)
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 13:41:55 2022 +0800

    add model module

diff --git a/.gitmodules b/.gitmodules
new file mode 100644
index 0000000..f9d131a
--- /dev/null
+++ b/.gitmodules
@@ -0,0 +1,3 @@
+[submodule "model"]
+       path = model
+       url = https://github.com/datawhalechina-git-samples/model
diff --git a/model b/model
new file mode 160000
index 0000000..a8328fd
--- /dev/null
+++ b/model
@@ -0,0 +1 @@
+Subproject commit a8328fd6ee683ef8f6a2d7c4edfefed2923b0795

```

查看所有所有提交 SHA-1 字符串

```bash
$ git log|grep '^commit'|awk '{print $2}'

44328544187650f2f6ecc253ef3a2b099c51baa5
a55ea122894272b13c3a43129ca0b74cfd2b6a4a
```

Git 非常聪明的知道在没有歧义的情况下，通过前几个字符来替代上述 40 位字符，如上可简化成：

```bash
 $ git show 4432854
```

甚至简化成

```bash
$ git show 4432
```

当然你的确保没有歧义。Git 可以为 SHA-1 值生成出简短且唯一的缩写，可以在 `git log` 后加 ` --abbrev-commit` 参数，输出结果就会显示简短且唯一的值了。默认情况使用 7 个字符，有时为来避免歧义，会增加字符数。

```bash
$ git log --abbrev-commit

commit 4432854 (HEAD -> main, origin/main, origin/HEAD)
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 13:41:55 2022 +0800

    add model module

commit a55ea12
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 13:33:17 2022 +0800

    Initial commit

```

通过在 `git log` 后增加 `--pretty=oneline` 简化输出内容

```bash
$ git log --abbrev-commit --pretty=oneline

4432854 (HEAD -> main, origin/main, origin/HEAD) add model module
a55ea12 Initial commit
```

### 4.1.2 引用分支

如果你要查看一个分支的最后一次对象，可以通过分支名查看。查看本地分支列表通过 `git branch` 查看

```bash
$ git branch

  develop
  main
* stable
```

`*` 表示当前工作的分支

查看远程分支通过后加参数 `-r`

```bash
$ git branch -r

  origin/HEAD -> origin/main
  origin/main
  origin/stable
```

我们尝试通过 `git show stable` 查看指定分支最后一次提交信息

```bash
$ git show stable

commit 11671bae8489621c02a4c99dbcf24b0dede1b1b1 (HEAD -> stable)
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 14:16:00 2022 +0800

    stable model for app

diff --git a/.gitmodules b/.gitmodules
index f9d131a..47d8924 100644
--- a/.gitmodules
+++ b/.gitmodules
@@ -1,3 +1,4 @@
 [submodule "model"]
        path = model
        url = https://github.com/datawhalechina-git-samples/model
+       branch = stable
diff --git a/model b/model
index a8328fd..ca79fae 160000
--- a/model
+++ b/model
@@ -1 +1 @@
-Subproject commit a8328fd6ee683ef8f6a2d7c4edfefed2923b0795
+Subproject commit ca79fae869c9b4ddd7999f06ffd48ac25971b9dd
```

如果你的 branch 的名称和当前目录名称很不巧的重名了，那么应该会出现意外的输出 😭 并没有我们期盼中的结果。

创建同名测试目录

```bash
$ mkdir stable
```

再次执行 `git show stable`

```bash
$ git show stable

fatal: ambiguous argument 'stable': both revision and filename
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

Git 不知道如何处理，我们需要通过 `--` 明确告知.

- -- 前面的为 revision 可以是分支，tag 等
- -- 后面的为 file 即要操作的文件

```bash
$ git show stable --
```

我们通过 `git rev-parse` 可以查看某个分支指向那个特定的 SHA-1, 并通过 `git show` 去查看这个 SHA-1 值对应的提交信息。

```bash
$ git rev-parse stable

11671bae8489621c02a4c99dbcf24b0dede1b1b1

$ git show 11671bae8489621c02a4c99dbcf24b0dede1b1b1

```

我们能看到是一致的信息。

### 4.1.3 引用日志

当你在工作时， Git 会在后台保存一个引用日志（reflog）， 引用日志记录了最近几个月你的 HEAD 和分支引用所指向的历史。

你可以使用 git reflog 来查看引用日志

```bash
$ git reflog

11671ba (HEAD -> stable, origin/stable) HEAD@{0}: commit: stable model for app
4432854 (origin/main, origin/HEAD, main, develop) HEAD@{1}: checkout: moving from main to stable
4432854 (origin/main, origin/HEAD, main, develop) HEAD@{2}: commit: add model module
a55ea12 HEAD@{3}: clone: from https://github.com/datawhalechina-git-samples/app

```

每当你的 HEAD 所指向的位置发生了变化，Git 就会将这个信息存储到引用日志这个历史记录里。 你也可以通过 reflog 数据来获取之前的提交历史。 如果你想查看仓库中 HEAD 在 2 次前的所指向的提交，你可以使用 @{n} 来引用 reflog 中输出的提交记录。

```bash
$ git show HEAD@{2}

commit 44328544187650f2f6ecc253ef3a2b099c51baa5 (origin/main, origin/HEAD, main, develop)
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 13:41:55 2022 +0800

    add model module

diff --git a/.gitmodules b/.gitmodules
new file mode 100644
index 0000000..f9d131a
--- /dev/null
+++ b/.gitmodules
@@ -0,0 +1,3 @@
+[submodule "model"]
+       path = model
+       url = https://github.com/datawhalechina-git-samples/model
diff --git a/model b/model
new file mode 160000
index 0000000..a8328fd
--- /dev/nullq
+++ b/model
@@ -0,0 +1 @@
+Subproject commit a8328fd6ee683ef8f6a2d7c4edfefed2923b0795
```

## 4.2 交互式暂存

当你修改大量文件后，希望将改动拆分成多个提交而不是一起提交的时候，可以通过如下命令操作。

如果运行 `git add` 后加 `-i` 或者 `--interactive` 选项的时候，Git 会进入一个交互式命令模式，如:

```bash
$ git add -i

           staged     unstaged path
  1:      +532/-0      nothing src/trace/events.go
  2:      +365/-0      nothing src/trace/histogram.go
  3:      +325/-0      nothing src/trace/histogram_test.go
  4:     +1130/-0      nothing src/trace/trace.go
  5:      +178/-0      nothing src/trace/trace_test.go

*** Commands ***
  1: status	  2: update	  3: revert	  4: add untracked
  5: patch	  6: diff	  7: quit	  8: help
What now>
```

可以看到这个命令以和平时不同的视图：显示了暂存区。基本上与 git status 是相同的信息，但是更简明扼要一些。 它将暂存的修改列在左侧，未暂存的修改列在右侧。

在这块区域后是 `Commands` 命令区域。 在这里你可以做一些工作，包括暂存文件、取消暂存文件、暂存文件的一部分、添加未被追踪的文件、显示暂存内容的区别。

### 4.2.1 暂存、取消文件

在 `What now>>` 提示符后输入 `u` 或者 `2`，它会提示你要暂存哪个文件

```bash
$ git add -i

           staged     unstaged path
  1:      +532/-0      nothing src/trace/events.go
  2:      +365/-0      nothing src/trace/histogram.go
  3:      +325/-0      nothing src/trace/histogram_test.go
  4:     +1130/-0      nothing src/trace/trace.go
  5:      +178/-0        +1/-1 src/trace/trace_test.go

*** Commands ***
  1: status	  2: update	  3: revert	  4: add untracked
  5: patch	  6: diff	  7: quit	  8: help

What now> u
           staged     unstaged path
  1:      +178/-0        +1/-1 src/trace/trace_test.go
Update>> 1
           staged     unstaged path
* 1:      +178/-0        +1/-1 src/trace/trace_test.go
Update>>
updated 1 path

*** Commands ***
  1: status	  2: update	  3: revert	  4: add untracked
  5: patch	  6: diff	  7: quit	  8: help
What now> s
           staged     unstaged path
  1:      +532/-0      nothing src/trace/events.go
  2:      +365/-0      nothing src/trace/histogram.go
  3:      +325/-0      nothing src/trace/histogram_test.go
  4:     +1130/-0      nothing src/trace/trace.go
  5:      +178/-0      nothing src/trace/trace_test.go
```

再输入 `u` 后根据提示的文件列表，输入序号，这里我们要暂存 `src/trace/trace_test.go`，输入 5, 会看到文件名称有个 `*`，意味着选中的文件将被暂存。如果不需要其他操作了，直接按回车，不输入任何东西返回命令行界面。通过命令 `s` 查看状态，发现 `src/trace/trace_test.go` 已经被暂存了。

如果想取消暂存，在 `What now>>` 提示符后输入 `r` 或者 `3`，进行撤销，同上的操作。

如果想要查看已暂存内容的区别，可以使用 d 或 6（区别）命令。 它会显示暂存文件的一个列表，可以从中选择想要查看的暂存区别。 这跟你在命令行指定 git diff --cached 非常相似：

```bash
$ git add -i

           staged     unstaged path
  1:        +1/-1      nothing src/trace/trace_test.go

What now> d
           staged     unstaged path
  1:        +1/-1      nothing src/trace/trace_test.go

Review diff>> 1

diff --git a/src/trace/trace_test.go b/src/trace/trace_test.go
index 8cc7998..33732e6 100644
--- a/src/trace/trace_test.go
+++ b/src/trace/trace_test.go
@@ -1,7 +1,7 @@
 // Copyright 2015 The Go Authors. All rights reserved.
 // Use of this source code is governed by a BSD-style
 // license that can be found in the LICENSE file.
-
+//
 package trace

 import (

```

通过这些基本命令，可以使用交互式添加模式来轻松地处理暂存区。

### 4.2.2 暂存补丁

Git 也可以暂存文件的特定部分。 例如，如果在 TODO 文件中做了两处修改，但只想要暂存其中的一个而不是另一个，Git 会帮你轻松地完成。 在和上一节一样的交互式提示符中，输入 p 或 5。

```bash
$ git add -i

           staged     unstaged path
  1:    unchanged        +2/-1 src/trace/trace_test.go

*** Commands ***
  1: status	  2: update	  3: revert	  4: add untracked
  5: patch	  6: diff	  7: quit	  8: help
What now> p
           staged     unstaged path
  1:    unchanged        +2/-1 src/trace/trace_test.go

Patch update>> 1
           staged     unstaged path
* 1:    unchanged        +2/-1 src/trace/trace_test.go
Patch update>>

diff --git a/src/trace/trace_test.go b/src/trace/trace_test.go
index 8cc7998..a95f46e 100644
--- a/src/trace/trace_test.go
+++ b/src/trace/trace_test.go
@@ -1,7 +1,8 @@
 // Copyright 2015 The Go Authors. All rights reserved.
 // Use of this source code is governed by a BSD-style
 // license that can be found in the LICENSE file.
-
+//
+// copy from go framework
 package trace

 import (
(1/1) Stage this hunk [y,n,q,a,d,e,?]?

```

输入 `p` 后，选择你需要操作的文件后，直接敲回车，会逐一询问你是否需要暂存他们，`(1/1)` 表示当前是第 1 个初变更，共 1 处变更。选项很多，输入?可以查看具体的解释

```bash
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
e - manually edit the current hunk
? - print help
```

通过 `y` 或者 `n` 来选择是否要暂存每一区块，当然也可以通过 `a` 暂存从这到后面所有当前文件的修改。暂存成功后，退出交互命令，我们就可以通过 `git commit` 来提交这部分暂存的文件了。

## 4.3 贮藏与清理

很多时候，你在当前分支上工作了一段时间后，东西变得很混乱。你想切换至新的分支而又不想放弃放弃的修改，或者纯粹想先做其他分支的事情的时候，就该 `git stash` 上场了。

`stash` 会处理工作目录的的状态，跟踪文件的修改和暂存的改动，然后将未完成的修改保存至一个栈上，这样就可以在后续任何时间切换回来。

```bash
$ git status

On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/trace/trace_test.go

no changes added to commit (use "git add" and/or "git commit -a")

```

文件被修改了一大坨，但是还没修改完，暂时还不想提交，而我又想切换至新的分支，这时候就需要 `stash`，先把变更推送至栈上，运行 `git stash` 或者 `git stash push`

```bash
$ git stash

Saved working directory and index state WIP on main: a123887 sample codes for demonstration
```

然后再查看 `git status`

```bash
$ git status

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

我们能看到当前目录已经非常干净了，这时候你可以按常规操作一样，做你想做的其他的事情。如切换新的分支，或者我想不到的事情.

那么要返回刚才那坨文件该怎么办呢？通过 `git stash list` 查看所有 stash 的列表

```bash
$ git stash list

stash@{0}: WIP on main: 36c4cad sample codes for demonstration

```

切换至最后 stash 变更，直接执行 `git stash apply` 即可，当然如果有多个，可以通过 `git stash apply stash@{n}` 中的 n 来获取指定的的变更。

```bash
$ git stash apply

On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/trace/trace_test.go

no changes added to commit (use "git add" and/or "git commit -a")

```

`git stash apply stash@{0}` 会输出同样的内容。

可以通过 `git stash drop` 或者 `git stash pop` 来删除 stash 的内容。

```bash
$ git stash drop stash@{0}

Dropped stash@{0} (36c4cad0bafa4dbbd78ae469b0afa38ae2808102)
```

### 4.3.2 清理工作目录

对于一些不需要的文件或目录，你需要的是清理它而不是保存修改记录，`git clean` 就是用来做这个事情的

需要注意的是，这个命令会移除未被跟踪的文件，可以考虑执行 `git stash --all` 来移除所有文件并保存到栈上。

使用 `git clean -f -d` 命令来移除工作目录中所有未追踪的文件以及空的子目录。 `-f` 意味着强制移除，使用它需要 Git 配置变量 `clean.requireForce` 没有显式设置为 `false`。

如果你只是想看下或者删除前小心翼翼的确认: 它到底会删除那些东西. 可以通过 `--dry-run` 或者 `-n` 选项来执行命令，这只是告诉你会删除什么，而不会真的删除.

创建一些临时文件用于测试

```bash
$ touch temp; mkdir log; mkdir target; touch target/main
```

通过 `git clean -n` 查看

```bash
$ git clean -n

Would remove temp
```

默认情况下，git clean 命令只会移除没有忽略的未跟踪文件。 任何与 `.gitignore` 或其他忽略文件中的模式匹配的文件都不会被移除。如果你也想移除，可以通过增加选项 `-x`

```bash
$ git clean -n -x

Would remove .DS_Store
Would remove temp
```

同样增加选项 `-d` 可以删除目录

```bash
$ git clean -n -x -d

Would remove .DS_Store
Would remove log/
Would remove target/
Would remove temp
```

如果你想交互删除，可以通过选项 `-i` 来操作

```bash

Would remove the following items:
  .DS_Store  log/       target/    temp

*** Commands ***
    1: clean                2: filter by pattern    3: select by numbers    4: ask each             5: quit
    6: help
What now>
```

通过 `What now` 后输入命令或序号交互操作，不知道可以输入 help 查看具体的描述

```bash
What now> help

clean               - start cleaning
filter by pattern   - exclude items from deletion
select by numbers   - select items to be deleted by numbers
ask each            - confirm each deletion (like "rm -i")
quit                - stop cleaning
help                - this screen
?                   - help for prompt selection
```

## 4.4 搜索

无论仓库里的代码量有多少，你经常需要查找一个函数是在哪里调用或者定义的，或者显示一个方法的变更历史。 Git 提供了两个有用的工具来快速地从它的数据库中浏览代码和提交。 我们来简单的看一下。

### 4.4.1 Git Grep

Git 提供了一个 `grep` 命令，可以很方便的从提交历史，工作目录，甚至索引中查找一个字符串或者正则表达式。

默认情况下 `git grep` 会查找你的工作目录文件。

```bash
$ git grep a.percentileBoundary

src/trace/histogram.go:func (h *histogram) percentileBoundary(percentile float64) int64 {
src/trace/histogram.go: return h.percentileBoundary(0.5)
src/trace/histogram_test.go:            percentile := a.percentileBoundary(test.fraction)
```

通过 `-n` 或者 `--line-number` 显示匹配的行号

```bash
$ git grep -n percentileBoundary

src/trace/histogram.go:120:func (h *histogram) percentileBoundary(percentile float64) int64 {
src/trace/histogram.go:166:     return h.percentileBoundary(0.5)
src/trace/histogram_test.go:181:                percentile := a.percentileBoundary(test.fraction)
```

通过 `-c` 或者 `--count` 输出统计信息

```bash
git grep -c percentileBoundary

src/trace/histogram.go:2
src/trace/histogram_test.go:1
```

通过 `-p` 或者 `--show-function ` 显示每个匹配字符串所在的方法或函数

```bash
 git grep -p percentileBoundary

src/trace/histogram.go=func (h *histogram) standardDeviation() float64 {
src/trace/histogram.go:func (h *histogram) percentileBoundary(percentile float64) int64 {
src/trace/histogram.go=func (h *histogram) median() int64 {
src/trace/histogram.go: return h.percentileBoundary(0.5)
src/trace/histogram_test.go=func TestPercentileBoundary(t *testing.T) {
src/trace/histogram_test.go:            percentile := a.percentileBoundary(test.fraction)
```

### 4.4.2 Git 日志搜索

通过 `git log` 可以很强大的知道一些特定的提交信息。

如通过 `-S` 选项知道内容的新增和删除提交记录，我们这里以 CTP 的 Python 的 wrapper 为例:

```bash
$ git log -S percentileBoundary

a123887 (HEAD -> main, origin/main, origin/HEAD) sample codes for demonstration
```

通过 `-L` 选项进行行日志搜索，它可以展示代码中一行或者一个函数的历史。

```bash
$ git log -L :percentileBoundary:src/trace/histogram.go

commit a123887e43424c979b3e47b3cf9c672c579a6faa (HEAD -> main, origin/main, origin/HEAD)
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 14:34:18 2022 +0800

    sample codes for demonstration

diff --git a/src/trace/histogram.go b/src/trace/histogram.go
--- /dev/null
+++ b/src/trace/histogram.go
@@ -0,0 +120,45 @@
+func (h *histogram) percentileBoundary(percentile float64) int64 {
+       total := h.total()
+
+       // Corner cases (make sure result is strictly less than Total())
+       if total == 0 {
+               return 0
+       } else if total == 1 {
+               return int64(h.average())
+       }
...

```

如果 Git 无法匹配到你的函数或者方法，可以通过正则表达式，如这个命令和上面是等效的

```bash
$ git log -L '/percentileBoundary/',/^}/:src/trace/histogram.go

commit a123887e43424c979b3e47b3cf9c672c579a6faa (HEAD -> main, origin/main, origin/HEAD)
Author: Martin Xu <martin.xus@gmail.com>
Date:   Wed May 4 14:34:18 2022 +0800

    sample codes for demonstration

diff --git a/src/trace/histogram.go b/src/trace/histogram.go
--- /dev/null
+++ b/src/trace/histogram.go
@@ -0,0 +120,43 @@
+func (h *histogram) percentileBoundary(percentile float64) int64 {
+       total := h.total()
+
+       // Corner cases (make sure result is strictly less than Total())
+       if total == 0 {
+               return 0
...
```

## 4.5 子模块

项目中经常会遇到包含另外一个项目，如：第三方库，或者你将自己的项目切分成多个子项目，然后在其他项目中引用，如，将项目中的 model 独立处理，独立维护；其他项目组引用这个项目，并不维护 model。这里我们可以将 model 做子项目添加到当前项目中。

### 4.5.1 添加子模块

通过 `git submodule add` 添加子模块, 大家可以使用 <https://github.com/datawhalechina-git-samples/model> 进行测试，如

```bash
$ git submodule add https://github.com/datawhalechina-git-samples/model

Cloning into '/Users/martin/project/datawhalechina/app/model'...

remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (5/5), done.

```

参数同 `clone`，默认是 repo 的名称，如果你想改名，可以在后续增加新的名称或路径。

通过 `git status` 能看到新的 model 库。

```bash
$ git status

On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitmodules
	new file:   model

```

能看到有个新增的 `model` 和 `.gitmodules` 文件，该配置文件保存了项目 URL 和本地目录的 mapping 关系。

```bash
$ cat .gitmodules

[submodule "model"]
	path = model
	url = https://github.com/datawhalechina-git-samples/model

```

如果有多个子模块，这里会列出多条。

通过 `git diff` 能看到更详细的信息

```bash
$ git diff --cached model

diff --git a/model b/model
new file mode 160000
index 0000000..a8328fd
--- /dev/null
+++ b/model
@@ -0,0 +1 @@
+Subproject commit a8328fd6ee683ef8f6a2d7c4edfefed2923b0795
```

虽然 model 是工作目录中的一个子目录，但 Git 还是会将它视作一个子模块。当你不在那个目录中时，Git 并不会跟踪它的内容， 而是将它看作子模块仓库中的某个具体的提交。

如果你想看到更漂亮的差异输出，可以给 git diff 传递 --submodule 选项。

```bash
$  git diff --cached --submodule

diff --git a/.gitmodules b/.gitmodules
new file mode 100644
index 0000000..f9d131a
--- /dev/null
+++ b/.gitmodules
@@ -0,0 +1,3 @@
+[submodule "model"]
+       path = model
+       url = https://github.com/datawhalechina-git-samples/model
Submodule model 0000000...a8328fd (new submodule)
```

当你提交时，会看到类似下面的信息：

```bash
$ git commit -am 'add model module'

[main 4432854] add model module
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 model
```

注意 app 记录的 160000 模式。这是 Git 中的一种特殊模式，它本质上意味着你是将一次提交记作一项目录记录的，而非将它记录成一个子目录或者一个文件。

然后推送至服务端

```bash
git push origin main

Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 457 bytes | 457.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/datawhalechina-git-samples/app
   a55ea12..4432854  main -> main
```

### 4.5.2 克隆含有子模块的项目

我们在 clone 一个含子模块的项目时，默认是不会包含子模块内容的，只有目录，如重新 clone 上述的 app 项目

```bash
$ git clone  https://github.com/datawhalechina-git-samples/app.git new_app

Cloning into 'new_app'...
remote: Enumerating objects: 8, done.
remote: Counting objects: 100% (8/8), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 8 (delta 1), reused 3 (delta 0), pack-reused 0
Receiving objects: 100% (8/8), done.
Resolving deltas: 100% (1/1), done.

$ cd new_app/model
$ ls -alh

total 0
drwxr-xr-x  2 martin  staff    64B May  4 13:46 .
drwxr-xr-x  8 martin  staff   256B May  4 13:46 ..

```

会发现什么也没有，需要通过如下两个命令来获取内容

- `git submodule init` 初始化本地配置文件
- `git submodule update` 则从该项目中抓取所有数据并检出父项目中列出的合适的提交。

```bash
$ git submodule init

Submodule 'model' (https://github.com/datawhalechina-git-samples/model) registered for path './'

$ git submodule update

Cloning into '/Users/martin/project/datawhalechina/new_app/model'...Cloning into '/Users/martin/project/datawhalechina/new_app/model'...
Submodule path './': checked out 'a8328fd6ee683ef8f6a2d7c4edfefed2923b0795'
```

不过还有更简单一点的方式。 如果给 git clone 命令传递 --recurse-submodules 选项，它就会自动初始化并更新仓库中的每一个子模块， 包括可能存在的嵌套子模块。

```bash
$ git clone --recurse-submodules  https://github.com/datawhalechina-git-samples/app.git new_app2

Cloning into 'new_app2'...
remote: Enumerating objects: 8, done.
remote: Counting objects: 100% (8/8), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 8 (delta 1), reused 3 (delta 0), pack-reused 0
Receiving objects: 100% (8/8), done.
Resolving deltas: 100% (1/1), done.
Submodule 'model' (https://github.com/datawhalechina-git-samples/model) registered for path 'model'
Cloning into '/Users/martin/project/datawhalechina/new_app/model/new_app2/model'...
...

```

如果你已经克隆了项目但忘记了 `--recurse-submodules`，那么可以运行 `git submodule update --init ` 将 `git submodule init` 和 `git submodule update` 合并成一步。如果还要初始化、抓取并检出任何嵌套的子模块， 请使用简明的 `git submodule update --init --recursive`。

### 4.5.2 更新子模块

当子模块有更新的时候，执行 ` git submodule update --remote`

```bash
$ git submodule update --remote

```

该命令默认会更新 main 分支，如果你想设置为其他分支，可以在 `.gitmodules` 文件中设置 （这样其他人也可以跟踪它），也可以只在本地的 `.git/config` 文件中设置，我们在 `.gitmodules` 中配置它

```bash
$ git config -f .gitmodules submodule.model.branch stable

$ cat .gitmodules
[submodule "model"]
	path = model
	url = https://github.com/datawhalechina-git-samples/model
	branch = stable
```

很明显很看到 branch 已经变化。当运行 `git submodule update --remote` 时，Git 默认会尝试更新 所有 子模块， 所以如果有很多子模块的话，你可以传递想要更新的子模块的名字。如 `git submodule update --remote model`

```bash
$ git submodule update --remote model

remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
Unpacking objects: 100% (3/3), 266 bytes | 133.00 KiB/s, done.
From https://github.com/datawhalechina-git-samples/model
   a8328fd..ca79fae  main       -> origin/main
 * [new branch]      stable     -> origin/stable
Submodule path 'model': checked out 'ca79fae869c9b4ddd7999f06ffd48ac25971b9dd'
```

## 4.6 打包

Git 提供了多种网络传输的方法，如 SSH、HTTP 等，但是还有种不太常用的功能又什么有效。

Git 可以就将它的数据 " 打包 " 到一个文件中，通过 `git bundle` 来实现。`bundle` 命令会将 `git push` 命令所传输的所有内容打包成一个二进制文件，你可以将这个文件转发给别人，然后解包到仓库中。

```bash
$ git bundle create repo.bundle HEAD main

Enumerating objects: 90, done.
Counting objects: 100% (90/90), done.
Compressing objects: 100% (83/83), done.
Total 90 (delta 12), reused 24 (delta 3), pack-reused 0

$ ls -alh repo.bundle

-rw-r--r--  1 martin  staff   6.2M May  4 12:05 repo.bundle
```

这个 repo.bundle 就是我打包之后的文件，改文件包含了所有重建仓库 main 分支所需要的数据。在使用 bundle 命令时，你需要列出所有你希望打包的引用或者提交的区间。 如果你希望这个仓库可以在别处被克隆，你应该像例子中那样增加一个 HEAD 引用。

别人就可以从这个二级制文件 clone 一个目录，就像从 `git clone https/ssh` 一样的功能

```bash
$ git clone repo.bundle repo

Cloning into 'repo'...
Receiving objects: 100% (90/90), 6.20 MiB | 88.21 MiB/s, done.
Resolving deltas: 100% (12/12), done.

$ git log --oneline
...
```

如果你在打包时没有包含 HEAD 引用，你还需要在命令后指定一个 `-b main` 或者其他被引入的分支， 否则 Git 不知道应该检出哪一个分支。

如果只是要提交最新提交的修改，这需要我们手工计算，可以通过如下的指令计算差别

```bash
$ git log --oneline origin/main..main

```

或者

```bash
$ git log --oneline main ^origin/main

```

这里将获得到我们希望被打包的提交列表，将这些提交打包，通过 `git bundle create` 操作

```bash
$ git bundle create commits.bundle main ^5de18d5
```

可以将 commits.bundle 文件分享给合作者，他可以将这个文件导入到原始仓库中。在导入前可通过 `bundle verify` 命令检查这个文件是否是一个合法的 Git 包，是否拥有共同的祖先。

```bash
git bundle verify commits.bundle

```

如果打包工具打包的并不是全部的变更，而是最后几个变更，原始仓库则无法导入这个包，因为这个包缺失必要的提交信息。

## 4.7 总结

这里只是整理一些常用的工具，还有一些高级的功能，如签名、凭证存储、重置、Rerere 等功能，等后续升级版本我们再考虑吧，有缘再见，拜拜~
