import axios from 'axios'
import qs from 'qs'
import router from '../router'
import {Loading, Message} from 'element-ui'

const root = process.env.API_ROOT;

let loadinginstace;
axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  // element ui Loading方法
  loadinginstace = Loading.service({fullscreen: true});

  return config;
}, error => {
  loadinginstace.close();

  Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {
  // 响应成功关闭loading
  loadinginstace.close();
  const code = data.data.status;
  if (code == 400) { //未登录
    Message.error(data.data.msg);
    setTimeout(() => {
      router.replace({path: '/login'});
    }, 1000)
  } else if (code == 101) {
    Message.error(data.data.msg);
  }

  return data
}, error => {
  loadinginstace.close();
  // console.log(error);
  Message.error('服务器异常！');
  // const code = error.data.code;
  // 此处判断拦截需要处理的错误状态码并处理


  return Promise.reject(error)
})

/**验证码
 *
 * @param tel
 * @returns {Promise<any>}
 */
export function getVcode(tel) {
  const url = `${root}/verify`;
  return new Promise((resolve, reject) => {
    return axios.get(url, {
      params: {
        telphone: tel
      }
    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch((err) => {
      console.log(err);
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}

/**登录
 *
 * @param tel
 * @param code
 * @returns {Promise<any>}
 */
export function login(tel, code) {
  const url = `${root}/login`;
  return new Promise((resolve, reject) => {
    return axios.post(url, qs.stringify({
      telphone: tel,
      verify_code: code
    }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}


/**get数据（通用）
 *
 * @param data
 * @param url
 * @returns {Promise<any>}
 */

export function get(url, data) {
  return new Promise((resolve, reject) => {
    return axios.get(`${root}/${url}`, {
      params: data
    }).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}

/**post提交
 *
 * @param data
 * @param url
 * @returns {Promise<any>}
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    return axios.post(`${root}/${url}`,
      qs.stringify(data, {indices: false}),
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}

/**delete提交
 *
 * @param data
 * @param url
 * @returns {Promise<any>}
 */
export function remove(url, data) {
  return new Promise((resolve, reject) => {
    return axios.delete(`${root}/${url}`, {
      params: data
    }).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}


/**postJson提交
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function postJson(url, data) {
  return new Promise((resolve, reject) => {
    return axios.post(`${root}/${url}`, data,
      {headers: {'Content-Type': 'application/json'}}
    ).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}


/**put提交
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(url, data) {
  return new Promise((resolve, reject) => {
    return axios.put(`${root}/${url}`, qs.stringify(data),
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}


/**formDataPost提交
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function formDataPost(url, data) {
  return new Promise((resolve, reject) => {
    return axios.post(`${root}/${url}`, data,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}


/**formDataPut提交
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function formDataPut(url, data) {
  return new Promise((resolve, reject) => {
    return axios.put(`${root}/${url}`, data,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}


/**getFile
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function getFile(url, data) {
  return new Promise((resolve, reject) => {
    return axios.get(`${root}/${url}`, {
      params: data,
      responseType: 'blob', //二进制流
    }).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else if (res.data.status === 101) {
        reject(res.data);
      }
    }).catch(err => {
      console.log(err)
      reject({
        status: 101,
        msg: '服务器异常！'
      });
    });
  });
}
