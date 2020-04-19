import Vue from "vue";
import VueRouter from "vue-router";
// import Login from '../components/login/login.vue'
//  @->src
import Login from "@/components/login/login.vue";
import Home from "@/components/home/home.vue";
import Users from "@/components/users/users.vue";
Vue.use(VueRouter);

const routes = [
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/",
		name: "home",
		component: Home,
		children: [{
			name: 'users',
			path: 'users',
			component:Users
		}]
	},
];

const router = new VueRouter({
	routes,
});

export default router;
