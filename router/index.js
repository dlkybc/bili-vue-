import Vue from "vue";
import VueRouter from "vue-router";
// import Login from '../components/login/login.vue'
//  @->src
import Login from "@/components/login/login.vue";
import Home from "@/components/home/home.vue";
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
	},
];

const router = new VueRouter({
	routes,
});

export default router;
