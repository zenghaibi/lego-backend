
##### docker build -t xxx .

![1669474723214](image/4-8DockerBuild提高构建速度/1669474723214.png)

##### 我们即使改一点点代码，在构建时就会重装安装依赖

![1669475090172](image/4-8DockerBuild提高构建速度/1669475090172.png)

##### 修改Dcokerfile:

```
FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install --registry=https://registry.npm.taobao.org
COPY . /usr/src/app
RUN npm run tsc
EXPOSE 7001
CMD npx egg-scripts start --title=lego-backend
```

![1669475752671](image/4-8DockerBuild提高构建速度/1669475752671.png)
