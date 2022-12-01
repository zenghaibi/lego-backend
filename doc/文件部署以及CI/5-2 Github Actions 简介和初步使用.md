#### Github Actions 简介

Github 官方的CI/CD工具，作为github的亲儿子，和github几平是完美的无缝

衔接的，功能非常强大。

* Github actions https://docs.github.com/en/actions
* Travis https://www.travis-ci.com
* CitcleCI https//circleci.com
* Jenkins https://www.jenkins.io
* 讨论:https://www.zhihu.com/question/306195033/answer/1870322118

**Workflow**

https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions#workflows

Workflow是一个可配置的自动化流程，可以包含多个jobs,通过一个在repo当中的yml文件来定义对应

的流程，一个repo可以包含多个workflow

**Events**

Event是触发workflow的特殊事件，比如pull request. push或issue，也可以完全自定义，完整列表请看：

https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows

**Jobs**
Job是Workflow当中一系列的可执行步骤，每个Job是在同一个runner中进行的（Runner指处于github
的一台特殊的虚拟机，支持种操作），每个步骤或者是一个shell脚本，抑或是一个可执行的action,每个
步骤是按顺序执行，并且互相依赖。

![Workflow overview](https://docs.github.com/assets/cb-25535/images/help/images/overview-actions-simple.png)

##### github-action-demo示列代码：

```yml
name: Github Actions Demo
on: [push]
jobs:
  Check-Github-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "triggered by ${{ github.event_name }} event"
      - run: echo "running on a ${{ runner.os }} server hosted by Github"
      - name: check out repo code
        uses: actions/checkout@v2
      - run: echo "the ${{ github.resository }} has been cloned"
      - name: List files in the repo
        run: |
          ls ${{ github.workspace }}
```

***处理一下，将仓库地址改github***

* **git remote rm origin**
* **git remote add origin git@github.com:zenghaibi/lego-backend.git**
* **git push --set-upstream origin master**
