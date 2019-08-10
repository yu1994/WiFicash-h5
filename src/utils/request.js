import axios from 'axios'
import Toast from '@/components/toast'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  timeout: 8000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    // //  config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    Promise.reject(error)
  }
);

// response 拦截器
service.interceptors.response.use(
//  response => response.data,
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== 200) {
      let toast = new Toast();
      toast.toggle(res.msg);
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let toast = new Toast();
    toast.toggle('error');
    return Promise.reject(error)
  }
);
export default service
