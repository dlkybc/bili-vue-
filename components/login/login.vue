<template>
	<div class="login-wrap">
		<el-form
			class="login-form"
			:label-position="labelPosition"
			label-width="80px"
			:model="formdata"
		>
			<h2>用户登录</h2>
			<el-form-item label="用户名">
				<el-input v-model="formdata.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="formdata.password"></el-input>
			</el-form-item>
			<el-button type="primary" class="login-btn" @click.prevent="handleLogin"
				>登录</el-button
			>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			labelPosition: "top",
			formdata: {
				username: "",
				password: "",
			},
		};
	},
	mounted() {},
	methods: {
		handleLogin() {
this.$router.push({name:'home'})
      return
			this.$http.post("loign", this.formdata).then(
				(res) => {
					console.log(res);
					const {
						data,
						meta: { msg, status },
					} = res.data;
					//找到res.data.meta
					// const {meta:obj}={meta:{mag:'11',status:900}}   把{mag:'11',status:900}赋给meta,,==>obj={mag:'11',status:900}
					// const {meta:{msg,status}}={meta:{mag:'11',status:900}}==>msg:'11',status=>200
					//登录成功  跳转home
					//提示成功
					if (status === 200) {
            //登陆成功  跳转home
            // this.$router.push({name:'home'})
            //提示成功
            this.$message.success(msg);
					}else{
            //登录失败  提示原因
              this.$message.error(msg);
          }
					//登录失败  提示原因
				},
				(err) => {
					console.log(err);
				}
			);
		},
	},
};
</script>
<style lang="scss" scoped>
.login-wrap {
	background: #324152;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.login-form {
		width: 400px;
		background: #fff;
		border-radius: 5px;
		padding: 30px;
		.login-btn {
			width: 100%;
		}
	}
}
</style>
