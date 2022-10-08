#### egg调试

**NONE, DEBUG,INFO,WARN 和 ERROR**

ctx.logger.debug('debug info')

ctx.logger.info('res data', res.data)

发code 环境调试配置：

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Egg",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "windows": {"runtimeExecutable": "npm.cmd"},
      "runtimeArgs": ["run", "debug"],
      "console": "integratedTerminal",
      "protocol": "auto",
      "restart": true,
      "port": 9229,
      "autoAttachChildProcesses": true
    },
  ]
}
```
