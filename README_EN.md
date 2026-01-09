# Faster-Git

Git Tutorial

> **Website:** [https://datawhalechina.github.io/faster-git/](https://datawhalechina.github.io/faster-git/)
>
> **中文版 (Chinese Version):** [README.md](README.md)

# Course Content:

1. [Chapter 1: Introduction to Git](https://datawhalechina.github.io/faster-git/lecture01/)
2. [Chapter 2: Git Basic Commands](https://datawhalechina.github.io/faster-git/lecture02/)
3. [Chapter 3: Git Branch Management](https://datawhalechina.github.io/faster-git/lecture03/)
4. [Chapter 4: Git Tools](https://datawhalechina.github.io/faster-git/lecture04/)
5. [Chapter 5: Git Internals](https://datawhalechina.github.io/faster-git/lecture05/)
6. [Chapter 6: GitFlow Workflow Practice](https://datawhalechina.github.io/faster-git/lecture06/)
7. [Chapter 7: Git Commit Conventions](https://datawhalechina.github.io/faster-git/lecture07/)
8. [Chapter 8: GitHub/Gitee Usage Guide](https://datawhalechina.github.io/faster-git/lecture08/)
9. [Chapter 9: Git GUI Tools Download](https://datawhalechina.github.io/faster-git/lecture09/)
10. [Chapter 10: Git Team Collaboration and Diff Tools for Merging](https://datawhalechina.github.io/faster-git/lecture10/)

**Course Schedule:**
| Task Information                                                    |
|---------------------------------------------------------------------|
| Task01: Git Basics: Chapters 1-2 (2 days)                          |
| Task02: Git Branch Management and Tools: Chapters 3-4 (2 days)     |
| Task03: Git Internals and Workflow Practice: Chapters 5-6 (3 days) |
| Task04: Git Commit Conventions and GitHub/Gitee: Chapters 7-8 (3 days) |
| Task05: Git GUI Tools and Team Collaboration: Chapters 9-10 (3 days) |

**Course Contributors: (In no particular order, sorted by chapter)**
| Member&nbsp; | Profile                                            | Responsible Chapters|
| --------------- | --------------------------------------------------- |-------|
|   Niu Zhikang   | Datawhale member, Undergraduate at Xidian University | lecture01, lecture03|
|Zhu Songqing| Datawhale member, Graduate student at Shanghai Jiao Tong University|lecture02|
|Xu Xiangjun|Working professional, Internet finance, Backend development|lecture04|
|Li Bihan|Datawhale member, Working professional|lecture05|
|   Song Zeshan   | Datawhale member, Algorithm developer | lecture06|
|Wang Xiaoliang|Datawhale member, Working professional|lecture07|
|Zhang Xiangyu|Graduate student at East China Normal University|lecture08|
|    Shen Hao    | Datawhale member, PhD candidate in Cybersecurity at Fudan University |lecture09|
|   Xia Jun   | Datawhale member, Graduate student at Shanghai Jiao Tong University  |lecture10|
|   Fu Xieyi   | Datawhale contributor, Graduate student at HKUST(GZ)  |  Website Architecture & Internationalization |

# Contributing

The main branch is `main`

## Workflow

For issues or additional materials related to this project, we encourage everyone to submit PRs and issues, and we will respond shortly. This project uses the `Forking` workflow. For details, refer to the [Atlassian documentation](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)

The general steps are as follows:

1. Fork this repository on GitHub
1. Clone your forked personal repository
1. Set the `upstream` repository address and disable `push`
1. Use branches for development. Course branch names should be `lecture{#NO}`, where `#NO` is kept as two digits, such as `lecture07`, corresponding to the course directory
1. Keep synchronized with the original repository before PR, then initiate a PR request

Command examples:

```shell
# fork
# clone
git clone git@github.com:USERNAME/faster-git.git

# set upstream
git remote add upstream git@github.com:datawhalechina/faster-git.git
# disable upstream push
git remote set-url --push upstream DISABLE
# verify
git remote -v
# some sample output:
# origin	git@github.com:tomowang/faster-git.git (fetch)
# origin	git@github.com:tomowang/faster-git.git (push)
# upstream	git@github.com:datawhalechina/faster-git.git (fetch)
# upstream	DISABLE (push)

# do your work
git checkout -b lecture07
# edit and commit and push your changes
git push -u origin lecture07

# keep your fork up to date
## fetch upstream main and merge with forked main branch
git fetch upstream
git checkout main
git merge upstream/main
## rebase brach and force push
git checkout lecture07
git rebase main
git push -f
```

## Commit Message

Commit messages should use the following format: `<type>: <short summary>`

```
<type>: <short summary>
  │            │
  │            └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │
  │
  └─⫸ Commit Type: lecture{#NO}|others
```

`others` includes non-course-related changes, such as changes to this `README.md`, adjustments to `.gitignore`, etc.

## Follow Us
<div align=center><img src="https://raw.githubusercontent.com/datawhalechina/easy-rl/master/docs/res/qrcode.jpeg" width = "250" height = "270" alt="Datawhale is an open-source organization focused on AI, with the vision of 'for the learner, growing together with learners', building the most valuable open-source learning community for learners. Follow us and learn and grow together."></div>

## LICENSE
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

