<template>
	<!-- 小容器el-card -->
	<el-card class="box-card">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索 -->
		<el-row class="searchRow">
			<el-col>
				<el-input placeholder="请输入内容" v-model="query" class="inputSearch">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
				<el-button type="success">添加用户{{ date1 | fmtdate }}</el-button>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table :data="userList" style="width: 100%">
			<el-table-column label="#" width="60" type="index"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="80"> </el-table-column>
			<el-table-column prop="address" label="邮箱"> </el-table-column>
			<el-table-column prop="phone" label="电话"> </el-table-column>
			<el-table-column label="创建时间">
				<!-- 如果单元格内显示的内容不是字符串(文本)，需要给被显示的内容外层包裹一层template -->
				<!--
          template内部要用数据 设置slot-scope属性
slot-scope会自动去找上一级数据源，肯定会找到userlist ,所以写成slot-scope="aaa"  	{{ aaa.row.create_time | fmtdate }}也可以，会把scope会自动去找数据源，肯定会找到userlist赋值给aaa，通常取名scope
          该属性的值是要用数据(create_time)的数据源userlist
         -->
				<!--
           slot-scope的值userlist其实就是el-table绑定的数据userlist
           userlist.row指的是数组中的每个对象
          -->
				<template slot-scope="scope">
					{{ scope.row.create_time | fmtdate }}
				</template>
				<!-- 不用写prop -->
			</el-table-column>
			<!-- <el-table-column prop="status" label="用户状态"> -->
			<el-table-column label="用户状态">
				<template slot-scope="sco">
					<el-switch
						v-model="sco.row.status"
						active-color="#13ce66"
						inactive-color="#ff4949"
					>
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="done" label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						plain
						type="primary"
						icon="el-icon-edit"
						circle
					></el-button>
					<el-button
						size="mini"
						plain
						type="success"
						icon="el-icon-check"
						circle
					></el-button>
					<el-button
						size="mini"
						plain
						type="danger"
						icon="el-icon-delete"
						circle
					></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pagenum"
			:page-sizes="[1, 2, 3, 4]"
			:page-size="pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="userList.length"
		>
		</el-pagination>
	</el-card>
</template>
<script>
export default {
	data() {
		return {
			date1: 1587287907825,
			query: "",
			userList: [
				{
					date: "2016-05-02",
					name: "张三",
					address: "1341601000@qq.com",
					create_time: new Date().getTime(),
					phone: 15554320000,
					status: true,
					done: "操作",
				},
				{
					date: "2016-05-04",
					name: "李四",
					address: "2341601000@qq.com",
					create_time: new Date().getTime(),
					phone: 17822909000,
					status: true,
					done: "操作",
				},
				{
					date: "2016-05-01",
					name: "王五",
					address: "3341601000@qq.com",
					create_time: new Date().getTime(),
					phone: 18776750000,
					status: false,
					done: "操作",
				},
				{
					date: "2016-05-03",
					name: "赵六",
					address: "4341601000@qq.com",
					create_time: new Date().getTime(),
					phone: 15922899000,
					status: false,
					done: "操作",
				},
					{
					date: "2054-05-03",
					name: "黑七",
					address: "5341601000@qq.com",
					create_time: new Date().getTime(),
					phone: 13226770000,
					status: false,
					done: "操作",
				},
					{
					date: "2044-05-03",
					name: "孙九",
					address: "6341601000@qq.com",
					create_time: new Date().getTime(),
					phone: 18723110000,
					status: true,
					done: "操作",
				},
			],
			pagenum: 1,
			pagesize: 2,
			//分页
			total: 0,
		};
	},
	created() {
		this.getUserList();
	},
	methods: {
		//获取用户列表的请求
		//需要授权的api 必须在请求头中使用 Authorization 字段提供 token令牌
		async getUserList() {
			const res = await this.$http.get(
				`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
			);
		},
		//分页相关方法
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
	},
};
</script>
<style lang="scss">
.box-card {
	height: 100%;
	.searchRow {
		margin-top: 25px;
		.inputSearch {
			width: 300px;
		}
	}
}
</style>
