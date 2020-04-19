<template>
	<el-container class="container">
		<el-header class="header">
			<el-row style="height:100%;">
				<el-col :span="4" style="height:100%;">
					<div class="grid-content bg-purple" style="height:100%;">
						<img src="../../assets/logo.png" alt="无法显示图片" style="height:100%;width:100%;"/>
					</div>
				</el-col>
				<el-col :span="18" class="middle">电商后台管理系统 </el-col>
				<el-col :span="2"
					><div class="grid-content bg-purple">
						<a href="" class="loginout">退出</a>
					</div></el-col
				>
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="200px" class="aside">Aside</el-aside>
			<el-main class="main">Main</el-main>
		</el-container>
	</el-container>
</template>
<script>
export default {};
</script>
<style lang="scss">
.container {
	height: 100%;
	.header {
		background: #b3c0d1;
    .middle{
   text-align: center;
   line-height: 60px;
    }
    .loginout{
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
