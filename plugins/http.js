//插件模块
import axios from "axios";
// console.log(axios)
const MyHttpServer = {};
MyHttpServer.install = (Vue) => {
	axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
	axios.defaults.headers.common["Authorization"]=localStorage.getItem('token');
	// 4. 添加实例方法
  Vue.prototype.$http = axios;

};
export default MyHttpServer;
