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
				<el-input
					placeholder="请输入内容"
					v-model="query"
					class="inputSearch"
					clearable
					@clear="loadlist"
				>
					<el-button
						slot="append"
						icon="el-icon-search"
						@click="searchUser"
					></el-button>
				</el-input>
				<el-button type="success" @click="showAddUserDialog"
					>添加用户{{ date1 | fmtdate }}</el-button
				>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table :data="userList" style="width: 100%">
			<el-table-column label="#" width="60" type="index"> </el-table-column>
			<el-table-column prop="username" label="姓名" width="80">
			</el-table-column>
			<el-table-column prop="email" label="邮箱"> </el-table-column>
			<el-table-column prop="mobile" label="电话"> </el-table-column>
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
				<template slot-scope="scope">
					<el-switch
						v-model="scope.row.mg_state"
						active-color="#13ce66"
						inactive-color="#ff4949"
						@change="changeMgState(scope.row)"
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
						@click="showEditUserDialog(scope.row)"
					></el-button>
					<el-button
						size="mini"
						plain
						type="success"
						icon="el-icon-check"
						circle
						@click="showSetUserRoleDia(scope.row)"
					></el-button>
					<el-button
						size="mini"
						plain
						type="danger"
						icon="el-icon-delete"
						circle
						@click="showDeleteUserMsgBox(scope.row.id)"
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
		<!-- 对话框 -->
		<!-- 添加用户对话框 -->
		<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
			<el-form :model="form">
				<el-form-item label="用户名" label-width="100px">
					<el-input v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="100px">
					<el-input v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="100px">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="100px">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 删除用户确认框 -->
		<!-- 编辑用户对话框 -->
		<el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
			<el-form :model="form">
				<el-form-item label="用户名" label-width="100px">
					<el-input
						v-model="form.username"
						autocomplete="off"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="100px">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="100px">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
				<el-button type="primary" @click="editUser()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 分配角色的对话框 -->
		<el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
			<el-form :model="form">
				<el-form-item label="用户名" label-width="100px">
					{{ currUsername }}
				</el-form-item>
				<el-form-item label="角色" label-width="100px">
					<!-- 如果select绑定数据的值和options的value一样  就是显示当前选择的 -->
					<el-select v-model="currRoleId" placeholder="请选择活动区域">
						<el-option label="请选择" :value="-1"></el-option>
						<!--value="-1"字符串的-1   :value="-1" 数字的-1 -->
						<el-option
							:label="item.roleName"
							:value="item.id"
							v-for="(item, i) in roles"
							:key="i"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleRol = false">取 消</el-button>
				<el-button type="primary" @click="setRole()"
					>确 定</el-button
				>
			</div>
		</el-dialog>
	</el-card>
</template>
<script>
import { rolelist } from "@/utils/rolelist.js";
export default {
	data() {
		return {
			date1: 1587287907825,
			query: "",
			userList: [
				{
					date: "2016-05-02",
					username: "张三",
					email: "1341601000@qq.com",
					create_time: new Date().getTime(),
					mobile: 15554320000,
					mg_state: true,
					done: "操作",
					id: 1,
					rid: 30,
				},
				{
					date: "2016-05-04",
					username: "李四",
					email: "2341601000@qq.com",
					create_time: new Date().getTime(),
					mobile: 17822909000,
					mg_state: true,
					done: "操作",
					id: 2,
					rid: 31,
				},
				{
					date: "2016-05-01",
					username: "王五",
					email: "3341601000@qq.com",
					create_time: new Date().getTime(),
					mobile: 18776750000,
					mg_state: false,
					done: "操作",
					id: 3,
					rid: 34,
				},
				{
					date: "2016-05-03",
					username: "赵六",
					email: "4341601000@qq.com",
					create_time: new Date().getTime(),
					mobile: 15922899000,
					mg_state: false,
					done: "操作",
					id: 4,
					rid: 39,
				},
				{
					date: "2054-05-03",
					username: "黑七",
					email: "5341601000@qq.com",
					create_time: new Date().getTime(),
					mobile: 13226770000,
					mg_state: false,
					done: "操作",
					id: 5,
					rid: 40,
				},
				{
					date: "2044-05-03",
					username: "孙九",
					email: "6341601000@qq.com",
					create_time: new Date().getTime(),
					mobile: 18723110000,
					mg_state: true,
					done: "操作",
					id: 6,
				},
			],
			pagenum: 1,
			pagesize: 2,
			//分页
			total: 0,
			//添加用户弹出框
			dialogFormVisibleAdd: false,
			//编辑的对话框
			dialogFormVisibleEdit: false,
			//管理角色对话框
			dialogFormVisibleRol: false,
			form: {
				//看接口文档
				username: "",
				password: "",
				email: "",
				mobile: "",
			},
			//当前userid
			currUserId: -1,
			//分配角色的
			currRoleId: -1,
			currUsername: "",
			//保存所有的角色
			roles: rolelist,
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
		//搜索用户
		searchUser() {
			//发送请求
			// query已经双向绑定
			this.getUserList();
		},
		//	在点击由 clearable 属性生成的清空按钮时触发
		loadlist() {
			//重新发送请求
			console.log("重新请求");
		},
		//展示添加用户对话框
		showAddUserDialog() {
			this.form = {};
			this.dialogFormVisibleAdd = true;
		},
		// 点击确定添加  发送请求
		addUser() {
			console.log("确定添加");
			this.dialogFormVisibleAdd = false;
			// const res= await this.$http.post('user',this.form)
			//提示成功   关闭对话框  刷新视图   输入框清空
			this.$message.success("成功、失败");
			this.form = {};
			//清空输入框的方法2   遍历
			// for (const key in this.form) {
			// 	if (this.form.hasOwnProperty(key)) {
			//hasOwnProperty  判断是自己的属性而不是父级的
			// 		this.form[key] = "";
			// 	}
			// }
			// this.getUserList()  刷新视图
		},
		//删除用户  打开消息盒子
		showDeleteUserMsgBox(id) {
			this.$confirm("删除用户?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					//发送删除的请求  参数为id  注意async 写在then()箭头函数前面then(async () => {
					//先找data里有没有id
					//或者	showDeleteUserMsgBox()  调用这个方法时传进来id
					console.log(`删除id为${id}的用户`);
					//  const res = 		this.$http.delete('user/:${id}')
					//  const res = 	await	this.$http.delete('user/:id')
					//刷新视图  执行getuserlist
					this.$message({
						type: "success",
						message: "删除成功!",
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		//编辑用户 显示对话框
		showEditUserDialog(user) {
			this.form = user;
			this.dialogFormVisibleEdit = true;
			//获取用户数据 用户名
		},
		//编辑用户  点击确定  发请求
		editUser() {
			console.log("编辑用户 请求");

			console.log(this.form);
			console.log(this.form.id); //可以直接拿到当前的userid
			//this.form  就是修改后的数据
			//关闭对话框  更新视图getuserlist()
			this.dialogFormVisibleEdit = false;
			//确定后若再点击添加，由于form已被更改，所以会有数据  因此点击添加时先清空form
			const res = this.$http.put(`user/${this.form.id}`, this.form);
		},
		//修改状态
		changeMgState(user) {
			console.log(user.id, user.mg_state);
			//  const res = await $http.put(`user/${user.id}/state/:type=${user.mg_state}`)
		},
		//点击对勾 分配角色 显示对话框
		showSetUserRoleDia(user) {
			this.dialogFormVisibleRol = true;
			//获取所有的角色
			// const res = await this.$http.get(`role`)
			//获取当前用户的角色id---rid
			// const res = await this.$http.get(`user/:${user.id}`)
			//获取  rid 34
			// this.currRoleId = rid  视频是从后台获取的rid，现在自己把rid先放在userList了。方便测试
			this.currRoleId = user.rid || -1;
			this.currUsername = user.username;
			this.currUserId = user.id
		},
		//设置角色  发送请求
		setRole(){
			console.log('角色确定')
			//参数id  和 rid
			//id  在此设置this.currUserId = user.id
			// const res = await this.$http.put(`user/${this.currUserId}`,{rid:this.currRoleId})
			//对话框关闭 不需要刷新视图表格  因为在点击对勾就会重新获取角色列表
			this.dialogFormVisibleRol=false
		}
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
