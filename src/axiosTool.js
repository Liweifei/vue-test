import axios from "axios";
axios.defaults.baseURL = "http://yapi.luckly-mjw.cn/mock/50"; // 配置axios请求的地址 http://115.29.67.135:8101   http://192.168.2.126:8101
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true; //允许跨域
axios.defaults.timeout = 30000;
export default axios;
