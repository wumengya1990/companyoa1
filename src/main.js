// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import store from './store/index'
import putong from './assets/js/common'
import api from './router/api'
import qs from 'qs'



Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.common = putong;
Vue.prototype.$http = api;
Vue.prototype.$qs = qs;

Vue.prototype.bean = function (key, value) {
  var stringJson = '{"' + key + '": ""}';
  var json = JSON.parse(stringJson);
  json[key] = JSON.stringify(value);
  return json;
}

// 处理ajax请求
import axios from './assets/js/axios.config';
Vue.prototype.$ajax = axios;
// 引入JS组件
import './assets/js/components';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
