/**
 * common method
 */
/**添加设置cookie
 *
 * @param name
 * @param value
 * @param days
 * @param path
 */
export function setCookie(name, value, days, path) {
  console.log(path)
  name = escape(name);
  value = escape(value);
  let expires = new Date();
  expires.setTime(expires.getTime() + days * 3600000 * 24);
  //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用
  path = ";path=" + path;
  console.log(path)
  //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC
  //参数days只能是数字型
  let _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
  document.cookie = name + "=" + value + _expires + path;
  console.log(name + "=" + value + _expires + path)
}

/**获取cookie的值，根据cookie的键获取值
 *
 * @param name
 * @returns {string}
 */
export function getCookieValue(name) {
  //用处理字符串的方式查找到key对应value
  name = escape(name);
  //读cookie属性，这将返回文档的所有cookie
  var cookies = {};
  document.cookie && document.cookie.split(';').forEach(function (cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[parts[1].trim()] = (parts[2] || '').trim();
  });
  return cookies[name];
}

/**根据cookie的键，删除cookie，其实就是设置其失效
 *
 * @param name
 * @param path
 */
export function deleteCookie(name, path) {
  name = escape(name);
  var expires = new Date(0);
  path = ";path=" + path;
  document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
}


/**日期格式化
 *  * @param fmt
 * @returns {*}
 */
export function formatDate(myDate, fmt) {
  fmt = fmt ? fmt : 'yyyy-MM-dd';
  let o = {
    "M+": myDate.getMonth() + 1,                 //月份
    "d+": myDate.getDate(),                    //日
    "h+": myDate.getHours(),                   //小时
    "m+": myDate.getMinutes(),                 //分
    "s+": myDate.getSeconds(),                 //秒
    "q+": Math.floor((myDate.getMonth() + 3) / 3), //季度
    "S": myDate.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


/**
 * 将 blob 对象转化为 url
 * @param file
 * @returns {*}
 */
export function getBase64URL(file) {
  let url;
  if (window.createObjectURL) { // basic
    url = window.createObjectURL(file)
  } else if (window.URL) { // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}


export function arrDigui(arr, obj) {
  arr.forEach(function (item, index) {
    item.meta.department_name = obj.department_name;
    item.meta.member_type = obj.member_type;
    item.meta.department_id = obj.department_id;
    if (item.meta.index) {
      item.meta.index = `${item.meta.index}${obj.department_id}`
    }
    // if(item.name){
    //   item.name = `${item.name}${obj.department_id}`
    // }

    if (item.children != null && item.children.length > 0) {
      arrDigui(item.children, obj)
    }
  });
  return arr
}

/**
 * 格式化价格
 * @param num
 * @returns {string}
 */
export function formatPrice(num) {
  let str;
  typeof num === 'number' ? str = num.toString() : str = num;
  let newStr = "";
  let count = 0;
  // 当数字是整数
  if (str.indexOf(".") == -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + ".00"; //自动补小数点后两位
    // str = newStr + "";
    return str;
  }
  // 当数字带有小数
  else {
    for (let i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr; //逐个字符相接起来
      }
      count++;
    }
    str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    return str;
  }
}
