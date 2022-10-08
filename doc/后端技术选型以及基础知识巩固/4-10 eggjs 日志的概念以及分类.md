### 日志

egg-logger: [[https://github.com/eggjs/egg-logger]()]

**日志的位置**

```
${appInfo.root}/logs/${appInfo.name}
```

* baseDir 应用代码的目录
* HOME 用户目录，如admin账户为/home/admin
* root 应用根目录，只有在local和unittest环境下为baseDir,其他都为HOME

**日志的分类**

* appLogger ${appInfo.name} -web.log 应用相关日志，供应开发者使用的日志
  我们在绝大数情况下都在使用它
* error Logger common-error.log 实际一般不会直接使用它，任何logger的.error()
  调用输出的日志都会重定向到这里，重点通过查看此日志定位异常。
* coreLogger egg-web.log 框架内核/插件日志
* agentLogger egg-agent.log agent 进程日志

**打印日志**

```
    ctx.logger.debug('debug info');
    ctx.logger.info('res data', res.data);
    ctx.logger.warn('warnning');
    ctx.logger.error(new Error('whoops'));
```
