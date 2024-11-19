# 开发环境
Nodejs v20+
Expressjs 5.x
Redis 7.1+
Mysql 5.7
[Vben Admin](https://vben.pro/) 


# 项目结构
ylb-backend 后端项目
├── app.js
├── config 配置文件
├── controllers 控制器
├── models 模型
├── routes 路由
├── utils 工具


ylb-frontend 前端项目
├── public 静态文件
├── src 源码
│ ├── api 接口
│ ├── assets 资源
│ ├── components 组件
│ ├── router 路由
│ └── views 视图


## 依赖安装

```sh
pnpm i
```

## 开发环境运行
```sh

# 后端
$env:DEBUG='myapp:*'; npm start
# 后端auto reload
$env:DEBUG='myapp:*'; 
nodemon

# 前端
# 进入项目目录
#Node.js 20.15.0 及以上版本，推荐使用 fnm 、 nvm 或者直接使用pnpm 进行版本管理。
# 使用项目指定的pnpm版本进行依赖安装
corepack enable
# 安装依赖
pnpm install
# 运行
pnpm dev:antd
```

### 开发环境变量配置
./ylb-backend 目录下创建.env 文件，服务启动时会从.env 文件读取环境变量
