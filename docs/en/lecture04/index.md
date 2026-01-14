# Chapter 4: Git Tools

> Author: Martin

This chapter introduces commonly used Git tools. While you may not use them frequently, "what if" you need them, right? It never hurts to learn more - the more skills you have, the better🐶! 

## 4.0 Getting Started

We need some simple files and directories to demonstrate this chapter. If possible, please fork this demo project to your personal account and follow along with hands-on practice.

> <https://github.com/datawhalechina-git-samples/app>

All subsequent demonstrations will be based on this repository.

## 4.1 Revision References

Git supports multiple ways to reference a single commit, a set of commits, or a range of commits.

### 4.1.1 Referencing Commit Records

You can specify any commit by its 40-character `SHA-1` hash value.

**`$` is the terminal prompt and does not need to be typed. If your system or terminal is different, just type the content after `$`. This will not be repeated throughout the rest of this document.**

Switch to the project's working directory and execute `git log` to see output similar to the commit log. (The shell passes the output information to `more` through the pipe `|` for multi-page display).

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

From the log, you can clearly see multiple commit records, each including `commit` + a string of characters, author, commit time, and detailed information.

The main character here is the 40-character string following commit, which is a SHA-1 hash value. It is a checksum of the content and header information. Git uses SHA-1 not for data security, but for data integrity; it guarantees that when you checkout a commit many years later, it will be exactly the same as it was at that time. If you're interested in learning more about this SHA-1 value, you can [refer here](https://www.jianshu.com/p/4f8b56d0fd5b).

To view a specific commit, you can use `git show`, for example:

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

View all commit SHA-1 strings:

```bash
$ git log|grep '^commit'|awk '{print }'

44328544187650f2f6ecc253ef3a2b099c51baa5
a55ea122894272b13c3a43129ca0b74cfd2b6a4a
```

Git is smart enough to know that, when there's no ambiguity, you can use the first few characters to replace the 40-character string above. For example, the above can be simplified to:

```bash
 $ git show 4432854
```

Or even simplified to:

```bash
$ git show 4432
```

Of course, you need to ensure there's no ambiguity. Git can generate short and unique abbreviations for SHA-1 values. You can add the ` --abbrev-commit` parameter after `git log`, and the output will show short and unique values. By default, it uses 7 characters, and sometimes increases the number of characters to avoid ambiguity.

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

Simplify the output by adding `--pretty=oneline` after `git log`:

```bash
$ git log --abbrev-commit --pretty=oneline

4432854 (HEAD -> main, origin/main, origin/HEAD) add model module
a55ea12 Initial commit
```

### 4.1.2 Branch References

If you want to view the last commit of a branch, you can view it by branch name. View the local branch list with `git branch`:

```bash
$ git branch

  develop
  main
* stable
```

`*` indicates the current working branch.

View remote branches by adding the `-r` parameter:

```bash
$ git branch -r

  origin/HEAD -> origin/main
  origin/main
  origin/stable
```

Let's try to view the last commit information of a specified branch with `git show stable`:

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

If your branch name unfortunately has the same name as the current directory name, you'll see unexpected output 😭 and not the result we expected.

Create a directory with the same name for testing:

```bash
$ mkdir stable
```

Execute `git show stable` again:

```bash
$ git show stable

fatal: ambiguous argument 'stable': both revision and filename
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

Git doesn't know how to handle this, so we need to explicitly tell it with `--`.

- Before `--` is the revision, which can be a branch, tag, etc.
- After `--` is the file to operate on

```bash
$ git show stable --
```

We can use `git rev-parse` to see which specific SHA-1 a branch points to, and use `git show` to view the commit information corresponding to that SHA-1 value.

```bash
$ git rev-parse stable

11671bae8489621c02a4c99dbcf24b0dede1b1b1

$ git show 11671bae8489621c02a4c99dbcf24b0dede1b1b1

```

We can see that the information is consistent.

### 4.1.3 Reference Logs

When you're working, Git saves a reference log (reflog) in the background, which records the history of where your HEAD and branch references have pointed over the last few months.

You can use git reflog to view the reference log:

```bash
$ git reflog

11671ba (HEAD -> stable, origin/stable) HEAD@{0}: commit: stable model for app
4432854 (origin/main, origin/HEAD, main, develop) HEAD@{1}: checkout: moving from main to stable
4432854 (origin/main, origin/HEAD, main, develop) HEAD@{2}: commit: add model module
a55ea12 HEAD@{3}: clone: from https://github.com/datawhalechina-git-samples/app

```

Every time the position that HEAD points to changes, Git stores this information in the reference log history. You can also get previous commit history through reflog data. If you want to see the commit that HEAD pointed to 2 times ago in the repository, you can use @{n} to reference the commit record output in reflog.

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

## 4.2 Interactive Staging

When you've modified a large number of files and want to split the changes into multiple commits rather than committing them all together, you can use the following commands.

If you run `git add` with the `-i` or `--interactive` option, Git will enter an interactive command mode, like this:

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

You can see this command displays a different view than usual: it shows the staging area. Basically, it's the same information as git status, but more concise. It lists staged modifications on the left and unstaged modifications on the right.

After this area is the `Commands` command area. Here you can do some work, including staging files, unstaging files, staging parts of files, adding untracked files, and displaying differences in staged content.

### 4.2.1 Staging and Unstaging Files

After the `What now>>` prompt, type `u` or `2`, and it will prompt you which file to stage:

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

After typing `u`, based on the prompted file list, enter the sequence number. Here we want to stage `src/trace/trace_test.go`, so enter 5. You'll see a `*` next to the file name, meaning the selected file will be staged. If you don't need any other operations, just press Enter without typing anything to return to the command line interface. Use the `s` command to check the status, and you'll find that `src/trace/trace_test.go` has been staged.

If you want to unstage, type `r` or `3` after the `What now>>` prompt to undo, same operation as above.

If you want to view the differences in staged content, you can use the d or 6 (diff) command. It will display a list of staged files from which you can select the staged differences you want to view. This is very similar to specifying git diff --cached on the command line:

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

With these basic commands, you can easily handle the staging area using interactive add mode.

### 4.2.2 Staging Patches

Git can also stage specific parts of files. For example, if you make two changes in a TODO file but only want to stage one and not the other, Git will help you do this easily. At the same interactive prompt as in the previous section, type p or 5.

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

After typing `p`, select the file you need to operate on, then press Enter directly. It will ask you one by one whether you need to stage them. `(1/1)` indicates this is the 1st change out of 1 total change. There are many options; type ? to see specific explanations:

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

Use `y` or `n` to choose whether to stage each block. Of course, you can also use `a` to stage all modifications from this point to the end of the current file. After successful staging, exit the interactive command, and you can use `git commit` to commit these staged files.

## 4.3 Stashing and Cleaning

Often, when you've been working on a branch for a while, things get messy. You want to switch to a new branch without abandoning your modifications, or you simply want to work on something else first - this is when `git stash` comes in handy.

`stash` handles the state of the working directory, tracks file modifications and staged changes, then saves the unfinished modifications to a stack, so you can switch back at any time later.

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

The file has been modified a lot, but it's not finished yet and you don't want to commit it yet. But you want to switch to a new branch. This is when you need `stash`. First push the changes to the stack by running `git stash` or `git stash push`:

```bash
$ git stash

Saved working directory and index state WIP on main: a123887 sample codes for demonstration
```

Then check `git status` again:

```bash
$ git status

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

We can see that the current directory is now very clean. At this point, you can do whatever else you want to do as usual, such as switching to a new branch, or other things I can't think of.

So how do you get back to those files? Use `git stash list` to view all stash lists:

```bash
$ git stash list

stash@{0}: WIP on main: 36c4cad sample codes for demonstration

```

To switch to the last stashed changes, simply execute `git stash apply`. Of course, if there are multiple stashes, you can use `git stash apply stash@{n}` where n gets the specified changes.

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

`git stash apply stash@{0}` will output the same content.

You can use `git stash drop` or `git stash pop` to delete stash content.

```bash
$ git stash drop stash@{0}

Dropped stash@{0} (36c4cad0bafa4dbbd78ae469b0afa38ae2808102)
```

### 4.3.2 Cleaning the Working Directory

For some files or directories you don't need, you need to clean them rather than save modification records. `git clean` is used for this purpose.

Note that this command will remove untracked files. You might consider executing `git stash --all` to remove all files and save them to the stack.

Use the `git clean -f -d` command to remove all untracked files and empty subdirectories from the working directory. `-f` means force removal, and using it requires that the Git configuration variable `clean.requireForce` is not explicitly set to `false`.

If you just want to see or carefully confirm before deleting: what exactly will it delete? You can use the `--dry-run` or `-n` option to execute the command. This just tells you what will be deleted without actually deleting it.

Create some temporary files for testing:

```bash
$ touch temp; mkdir log; mkdir target; touch target/main
```

View with `git clean -n`:

```bash
$ git clean -n

Would remove temp
```

By default, the git clean command only removes untracked files that are not ignored. Any files matching patterns in `.gitignore` or other ignore files will not be removed. If you also want to remove them, you can add the `-x` option:

```bash
$ git clean -n -x

Would remove .DS_Store
Would remove temp
```

Similarly, adding the `-d` option can delete directories:

```bash
$ git clean -n -x -d

Would remove .DS_Store
Would remove log/
Would remove target/
Would remove temp
```

If you want to delete interactively, you can use the `-i` option:

```bash

Would remove the following items:
  .DS_Store  log/       target/    temp

*** Commands ***
    1: clean                2: filter by pattern    3: select by numbers    4: ask each             5: quit
    6: help
What now>
```

After `What now`, enter a command or number to interact. If you don't know, you can type help to see specific descriptions:

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

## 4.4 Searching

No matter how much code is in the repository, you often need to find where a function is called or defined, or display the change history of a method. Git provides two useful tools to quickly browse code and commits from its database. Let's take a brief look.

### 4.4.1 Git Grep

Git provides a `grep` command that makes it easy to search for a string or regular expression from commit history, the working directory, or even the index.

By default, `git grep` will search your working directory files.

```bash
$ git grep a.percentileBoundary

src/trace/histogram.go:func (h *histogram) percentileBoundary(percentile float64) int64 {
src/trace/histogram.go: return h.percentileBoundary(0.5)
src/trace/histogram_test.go:            percentile := a.percentileBoundary(test.fraction)
```

Use `-n` or `--line-number` to display matching line numbers:

```bash
$ git grep -n percentileBoundary

src/trace/histogram.go:120:func (h *histogram) percentileBoundary(percentile float64) int64 {
src/trace/histogram.go:166:     return h.percentileBoundary(0.5)
src/trace/histogram_test.go:181:                percentile := a.percentileBoundary(test.fraction)
```

Use `-c` or `--count` to output statistics:

```bash
git grep -c percentileBoundary

src/trace/histogram.go:2
src/trace/histogram_test.go:1
```

Use `-p` or `--show-function` to display the method or function where each matching string is located:

```bash
 git grep -p percentileBoundary

src/trace/histogram.go=func (h *histogram) standardDeviation() float64 {
src/trace/histogram.go:func (h *histogram) percentileBoundary(percentile float64) int64 {
src/trace/histogram.go=func (h *histogram) median() int64 {
src/trace/histogram.go: return h.percentileBoundary(0.5)
src/trace/histogram_test.go=func TestPercentileBoundary(t *testing.T) {
src/trace/histogram_test.go:            percentile := a.percentileBoundary(test.fraction)
```

### 4.4.2 Git Log Searching

Using `git log` can be very powerful for finding specific commit information.

For example, use the `-S` option to find commits where content was added or deleted. Here we use CTP's Python wrapper as an example:

```bash
$ git log -S percentileBoundary

a123887 (HEAD -> main, origin/main, origin/HEAD) sample codes for demonstration
```

Use the `-L` option for line log searching. It can show the history of a line or a function in the code.

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

If Git cannot match your function or method, you can use a regular expression. For example, this command is equivalent to the one above:

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

## 4.5 Submodules

Projects often need to contain another project, such as a third-party library, or you split your own project into multiple subprojects and then reference them in other projects. For example, treat the model in the project independently and maintain it independently; other project teams reference this project without maintaining the model. Here we can add the model as a subproject to the current project.

### 4.5.1 Adding Submodules

Add a submodule with `git submodule add`. You can use <https://github.com/datawhalechina-git-samples/model> for testing, for example:

```bash
$ git submodule add https://github.com/datawhalechina-git-samples/model

Cloning into '/Users/martin/project/datawhalechina/app/model'...

remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (5/5), done.

```

The parameters are the same as `clone`. By default, it's the name of the repo. If you want to rename it, you can add a new name or path afterwards.

You can see the new model repository with `git status`.

```bash
$ git status

On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitmodules
	new file:   model

```

You can see a newly added `model` and `.gitmodules` file. This configuration file saves the mapping relationship between the project URL and the local directory.

```bash
$ cat .gitmodules

[submodule "model"]
	path = model
	url = https://github.com/datawhalechina-git-samples/model

```

If there are multiple submodules, multiple entries will be listed here.

You can see more detailed information with `git diff`:

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

Although model is a subdirectory in the working directory, Git still treats it as a submodule. When you're not in that directory, Git doesn't track its contents but treats it as a specific commit in the submodule repository.

If you want to see prettier diff output, you can pass the --submodule option to git diff.

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

When you commit, you'll see information similar to the following:

```bash
$ git commit -am 'add model module'

[main 4432854] add model module
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 model
```

Note the 160000 mode recorded by app. This is a special mode in Git, which essentially means you're recording a commit as a directory entry, rather than recording it as a subdirectory or a file.

Then push to the server:

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

### 4.5.2 Cloning Projects with Submodules

When we clone a project containing submodules, by default the submodule content is not included, only the directory. For example, re-clone the app project mentioned above:

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

You'll find nothing there. You need to use the following two commands to get the content:

- `git submodule init` initializes the local configuration file
- `git submodule update` fetches all data from that project and checks out the appropriate commit listed in the parent project.

```bash
$ git submodule init

Submodule 'model' (https://github.com/datawhalechina-git-samples/model) registered for path './'

$ git submodule update

Cloning into '/Users/martin/project/datawhalechina/new_app/model'...Cloning into '/Users/martin/project/datawhalechina/new_app/model'...
Submodule path './': checked out 'a8328fd6ee683ef8f6a2d7c4edfefed2923b0795'
```

However, there's an even simpler way. If you pass the --recurse-submodules option to the git clone command, it will automatically initialize and update every submodule in the repository, including possibly nested submodules.

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

If you've already cloned the project but forgot `--recurse-submodules`, you can run `git submodule update --init` to combine `git submodule init` and `git submodule update` into one step. If you also want to initialize, fetch, and check out any nested submodules, use the concise `git submodule update --init --recursive`.

### 4.5.2 Updating Submodules

When the submodule has updates, execute `git submodule update --remote`:

```bash
$ git submodule update --remote

```

This command defaults to updating the main branch. If you want to set it to another branch, you can set it in the `.gitmodules` file (so others can track it too), or you can only set it in the local `.git/config` file. Let's configure it in `.gitmodules`:

```bash
$ git config -f .gitmodules submodule.model.branch stable

$ cat .gitmodules
[submodule "model"]
	path = model
	url = https://github.com/datawhalechina-git-samples/model
	branch = stable
```

You can clearly see that the branch has changed. When running `git submodule update --remote`, Git will try to update all submodules by default, so if there are many submodules, you can pass the name of the submodule you want to update, such as `git submodule update --remote model`:

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

## 4.6 Bundling

Git provides multiple methods for network transmission, such as SSH, HTTP, etc., but there's another less commonly used yet effective feature.

Git can "bundle" its data into a file through `git bundle`. The `bundle` command packages all the content that the `git push` command would transmit into a binary file. You can forward this file to someone else, who can then unpack it into a repository.

```bash
$ git bundle create repo.bundle HEAD main

Enumerating objects: 90, done.
Counting objects: 100% (90/90), done.
Compressing objects: 100% (83/83), done.
Total 90 (delta 12), reused 24 (delta 3), pack-reused 0

$ ls -alh repo.bundle

-rw-r--r--  1 martin  staff   6.2M May  4 12:05 repo.bundle
```

This repo.bundle is the file I packaged, which contains all the data needed to rebuild the main branch of the repository. When using the bundle command, you need to list all the references or commit ranges you want to package. If you want this repository to be cloneable elsewhere, you should add a HEAD reference as in the example.

Others can then clone a directory from this binary file, just like from `git clone https/ssh`:

```bash
$ git clone repo.bundle repo

Cloning into 'repo'...
Receiving objects: 100% (90/90), 6.20 MiB | 88.21 MiB/s, done.
Resolving deltas: 100% (12/12), done.

$ git log --oneline
...
```

If you didn't include a HEAD reference when bundling, you also need to specify a `-b main` or another imported branch after the command, otherwise Git won't know which branch to check out.

If you only want to commit the latest changes, you need to manually calculate the difference using the following command:

```bash
$ git log --oneline origin/main..main

```

Or:

```bash
$ git log --oneline main ^origin/main

```

This will get the list of commits we want to bundle. Bundle these commits with `git bundle create`:

```bash
$ git bundle create commits.bundle main ^5de18d5
```

You can share the commits.bundle file with collaborators, who can import this file into the original repository. Before importing, you can use the `bundle verify` command to check if this file is a valid Git bundle and whether it has common ancestors.

```bash
git bundle verify commits.bundle

```

If the bundling tool didn't bundle all the changes but only the last few changes, the original repository cannot import this bundle because it lacks necessary commit information.

## 4.7 Summary

This only organizes some commonly used tools. There are still some advanced features, such as signing, credential storage, reset, Rerere, etc. We'll consider them in later upgraded versions. See you when fate allows, bye~
