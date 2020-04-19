<template>
	<el-container class="container">
		<el-header class="header">
			<el-row style="height:100%;">
				<el-col :span="4" style="height:100%;">
					<div class="grid-content bg-purple" style="height:100%;">
						<img
							src="../../assets/logo.png"
							alt="无法显示图片"
							style="height:100%;width:100%;"
						/>
					</div>
				</el-col>
				<el-col :span="18" class="middle">电商后台管理系统 </el-col>
				<el-col :span="2"
					><div class="grid-content bg-purple">
						<a href="" class="loginout" @click.prevent="cancelSign">退出</a>
					</div></el-col
				>
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="200px" class="aside">
				<!-- 侧边栏导航 -->
				<el-menu :unique-opened='true'>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item index="1-1">
							<i class="el-icon-menu"></i>
							<span>用户列表</span>
						</el-menu-item>
					</el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>权限管理</span>
						</template>
						<el-menu-item index="2-1">
							<i class="el-icon-menu"></i>
							<span>角色列表</span>
						</el-menu-item>
            <el-menu-item index="2-2">
							<i class="el-icon-menu"></i>
							<span>权限列表</span>
						</el-menu-item>
					</el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item index="3-1">
							<i class="el-icon-menu"></i>
							<span>商品列表</span>
						</el-menu-item>
            	<el-menu-item index="3-2">
							<i class="el-icon-menu"></i>
							<span>分类参数</span>
						</el-menu-item>
            	<el-menu-item index="3-3">
							<i class="el-icon-menu"></i>
							<span>商品分类</span>
						</el-menu-item>
					</el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>订单管理</span>
						</template>
						<el-menu-item index="4-1">
							<i class="el-icon-menu"></i>
							<span>订单列表</span>
						</el-menu-item>
					</el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>数据统计</span>
						</template>
						<el-menu-item index="5-1">
							<i class="el-icon-menu"></i>
							<span>数据报表</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main class="main">Main</el-main>
		</el-container>
	</el-container>
</template>
<script>
export default {
  //组件渲染之前  mounted之前就行
  beforeCreate() {
    const token = localStorage.getItem('token')
    if(!token){
      this.$router.push({name:'login'})
    }
  },
  methods: {
    cancelSign(){
      //清除token  提示一下   来到login
      localStorage.clear()
      this.$message.success('退出成功')
      this.$router.push({name:'login'})
    }
  },
};
</script>
<style lang="scss">
.container {
	height: 100%;
	.header {
		background: #b3c0d1;
		.middle {
			text-align: center;
			line-height: 60px;
		}
		.loginout {
			text-decoration: none;
			line-height: 60px;
		}
	}
	.aside {
		background: #d3dce6;
	}
	.main {
		background: #e9eef3;
	}
}
</style>
