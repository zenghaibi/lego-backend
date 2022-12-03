##### 深入理解actions作用

```
name: More Actions Demo
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          repository: 'zenghaibi/lego-bricks-sea'
      - name: List files in the repo
        run: |
          ls ${{ github.workspace }}
      - uses: actions/setup-node@v2
        with:
          node-versoin: '16'
      - run: node -v
      - run: npm install -g typescript
      - run: tsc -v
```
