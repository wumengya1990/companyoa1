// 配置API接口地址 
var root = process.env.API 
// 引用axios 
// var axios = require('axios')
import axios from 'axios'
//引用qs
import qs from 'qs'
// 自定义判断元素类型JS 
function toType (obj) { 
 return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase() 
} 
// 参数过滤函数 
function filterNull (o) { 
 for (var key in o) { 
 if (o[key] === null) { 
  delete o[key] 
 } 
 if (toType(o[key]) === 'string') { 
  o[key] = o[key].trim() 
 } else if (toType(o[key]) === 'object') { 
  o[key] = filterNull(o[key]) 
 } else if (toType(o[key]) === 'array') { 
  o[key] = filterNull(o[key]) 
 } 
 } 
 return o 
} 
function apiAxios (method, url, params, success, failure) { 
 if (params) { 
 params = filterNull(params) 
 } 
 axios({ 
 method: method, 
 url: url, 
 data: method === 'POST' || method === 'PUT' ? params : null, 
 params: method === 'GET' || method === 'DELETE' ? params : null, 
 baseURL: root, 
 withCredentials: false
 }) 
 .then(function (res) {
     success(res.data);
    //  console.log(failure);
    // if (res.data.success === true) { 
    //     if (success) { 
    //     success(res.data) 
    //     } 
    // } else { 
    //     if (failure) { 
    //         failure(res.data) 
    //     } else { 
    //         //window.alert('error: ' + JSON.stringify(res.data))
    //         console.log('error: ' + JSON.stringify(res.data)) 
    //     } 
    // } 

 }) 
 .catch(function (err) { 
 if (err) { 
  console.log('api error, HTTP CODE: ' + err) 
  
 } 
 }) 
} 
// 返回在vue模板中的调用接口 
export default { 
 get: function (url, params, success, failure) { 
 return apiAxios('GET', url, params, success, failure) 
 }, 
 post: function (url, params, success, failure) { 
 return apiAxios('POST', url, params, success, failure) 
 } 
}