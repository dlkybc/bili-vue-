# bili-vue-
# my-admin

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### git 版本控制

> git svn 版本控制工具
> 建立远程仓库 gitgit commit -m "first commit"
> 第一次推送 git push -u origin master 之后就 git push 即可

### 新建分支 专门写登录

> git checkout -b '分支名
> 新建组件 配置路由
> 注意 commit 每完成一个小功能就提交
> push 要在 master 去完成

### 项目-登录 引入表单组件

1 引入
2 调整标签

### 项目 登录 样式调整

高度 100% 注意需要设置 app 的高度 不然传不到具体页面

### 登录-axios 插件

axios 本身不是 vue 插件
希望使用 Vue.use()
写 plugins->http.js main.js 引入 再写 Vue.use()
组件中即可使用 this.\$http.get()

### 发送登录请求

handleLogin
对象解构赋值 res.data

### 引入提示框组件

this.\$message.error(msg);

### 登陆成功 进入 home 组件

js 编程式导航 、\$router.push()

### 简化登录请求 对性能没有优化，就是看起来好点

找到异步操作有结果的代码 前加 await
找到距离异步操作有结果最贱的函数前加 async

### token

登陆成功把 token 存起来 localStorage.setItem('token',data.token)
跳转其他页面判断有无 token

### 布局容器 样式调整

引入 el-container

### 头部调整

layout 布局 24 栏

### 导航组件 导航菜单组件

el-menu
router 开启路由模式 true 时跳转 index
unique-opened 是否只保持一个子菜单的展开
index 值不能一样

### 首页 进入首页的权限验证

//组件渲染之前 mounted 之前就行
beforeCreate() {
const token = localStorage.getItem('token')
if(!token){
this.\$router.push({name:'login'})
}
},
未登陆过不能进入 home

### 退出功能

cancelSign(){
//清除 token 提示一下 来到 login
localStorage.clear()
this.$message.success('退出成功')
      this.$router.push({name:'login'})
}

### 用户管理-新建组件-路由配置

home.vue 开启了路由模式 index 值-->path
home.vue 的 main 里写 router-view
新建 users.vue
路由配置 home 的 children 配置 users 的路由

### 用户列表-面包屑和搜索框

el-card 卡片 一个小容器
面包屑
搜索框 el-row-->el-col-->el-input-->button

### 用户列表-引入表格组件

el-table（data 数据源）-->el-table-column （label 表头，prop 数据）-->字符串数据
...html
<el-table :data="tableData" style="width: 100%">
<el-table-column

### 用户列表 -- 表头处理

调整表头数量和 label
type='index' -->该列的每个单元格内容从 1 开始的序号

### 用户列表 -请求数据 设置请求头

接口文档里除了登录之外的所有请求都需要授权 ->设置请求头
找 axios 中关于请求头设置的代码
this.\$http.defaults.headers.common["Authorization"]=localStorage.getItem('token');

### 用户列表 -渲染数据 -一般数据字符串

一般数据字符串 -prop

### 用户列表 -处理日期格式   users.vue

  main.js 全局过滤 fmtdate npm i moment
  prop = 'create_time | fmtdate' 不行
  单元格内容只能显示文本

  ```html
  <el-table-column prop="create_time" label="创建时间" {{create_time | fmtdate}}>
  </el-table-column>
  如果单元格的内容不是文本({{create_time | fmtdate}}是一个表达式)
  需要给内容外层加容器template
  <template slot-scope="scope">
  	{{ scope.row.create_time | fmtdate }}
  </template>
  ```
  el-table-column template 不同组件的数据不是共享，有独立作用域
  slot-scope 作用 ： 传值
  slot-scope 的值会去自动去上一级找最外层标签 el-table 所绑定的数据 userlist
  slot-scope="scope" 此时"scope"==userlist
  scope.row 是数组的每个对象
  scope.row.create_time 是我们要用的数据

### 用户列表 用户状态 用户状态开关
```html
  	<template slot-scope="sco">
					<el-switch
						v-model="sco.row.status"
						active-color="#13ce66"
						inactive-color="#ff4949"
					>
					</el-switch>
				</template>
```

### 用户列表  操作
  不是字符串
  ```html
  <template slot-scope="scope">
					<el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
 ```

### 用户列表   分页
>该接口支持分页 参数里有类似pagenum
handleSizeChange size-change 每页显示条数变化时触发
current-change  当前页改变时触发
:current-page 设置当前页是第几页
:page-sizes 每页多少条数据
page-size  设置第一次运行显示多少条数据
:total  数据总数
### 用户列表   分页请求
  每页条数改变改变pagesize
  页码改变 改变pagenum
  每页条数改变时 从第一页开始显示 currentpage=1

### 用户列表  搜索
绑定query
清除clearable  触发clear事件
   `
   <el-input
					placeholder="请输入内容"
					v-model="query"
					class="inputSearch"
					clearable
					@clear='loadlist'
        >


#### 用户列表  点击添加用户显示对话框
  el- dialog----rl-form
  form里面 :model form:{}
#### 用户列表  点击对话框的确定发请求
  post请求 参数为  this.form
  关闭对话框
  清空文本框
  更新视图
  价格提示
  post.ststua=201
#### 用户列表  删除用户  打开确认框
  this.$confirm().then(),catch()
  点击确定  执行then()
  点击取消  执行catch()

#### 用户列表 删除用户 处理响应
  点击确定  发送delete请求
  提示
  更新数据
  回到第一页展示  pagenum=1
  注意async位置


#### 用户列表  编辑用户 显示对话框
  提供该对话框显示隐藏的控制属性
  点击操作里的编辑  打开编辑对话框
  找到编辑按钮 绑定事件
  复制之前的删除对话框 修改一下


#### 用户列表 显示编辑数据
 通过scope.row传参传进去 showEditUserDialog(user)
 用户名--禁用
#### 用户列表 编辑用户 发送请求
找到对话框  确定  editUser()
先点编辑，再点添加，对话框会有数据  因此需要在打开添加对话框之前清空form数据


#### 用户列表  修改用户状态
 找到开关 @change  changeMgState(scope.row)
 发送请求

#### 用户列表  分配角色-功能演示
 点击按钮-打开对话框
 对话框里有下拉框
 可以修改用户的角色
 每个角色的权限的不一样
 5个角色 角色名字来自后台


#### 用户列表 分配角色-显示对话框
点击对勾-打开对话框
引入对话框 有下拉框
 下拉框特点 select的绑定值和options的value一样，则显示该options的label值
 把options分成两类  请选择(-1)  和v-for遍历option
 data提供了el-select的v-modal所绑定的数据currRoleId  = -1



#### 用户列表 分配角色 --下拉框
  通过鼠标操作改变label时  -->该label显示  ，也改变了value 此时el-select v-model绑定的值编程当前显示的value

#### 用户列表  -显示当前用户角色
 获取所有的角色roles
 v-for生成el-options label=item.rolename
 通过请求获取当前用户的角色id
 给下拉框el-select的v-model绑定的赋值
#### 用户列表  修改用户角色
 通过视图操作修改label->value->el-select的currRoleId
  在setRole 是要使用用户id  所以在data里声明currUserId，在打开对勾对话框时候给currUserId赋值

### 合并分支
 首先 git add .
   git commit -m ''
 先来到master  git checkout master
 查询 当前分支  git  branch
    dev-login
    dev-users
   * master
       共三个
合并分支 git merge dev-users
