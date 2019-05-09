/* jshint esversion: 6 */
import Vue from 'vue';


let huanet = new Vue();
// 询问框
Vue.prototype.hw_confirm = function (msg,callback) {
  huanet.$msgbox({
    title: '提示',
    message:msg,
    showCancelButton: true,
    dangerouslyUseHTMLString:true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      done();
    }
  }).then(action => {
    callback();
  }).catch(error => {
  });
};
// 消息提示
Vue.prototype.hw_message = function (msg) {
  huanet.$message({
    message: msg,
    center:true,
    customClass:'hw_message'
  });
};
// 成功提示
Vue.prototype.hw_success = function (msg) {
  huanet.$message({
    message: msg,
    type: 'success',
    center:true,
    customClass:'hw_message'
  });
};
// 警告提示
Vue.prototype.hw_warn = function (msg) {
  huanet.$message({
    message: msg,
    type: 'warning',
    center:true,
    customClass:'hw_message'
  });
};
// 错误提示
Vue.prototype.hw_error = function (msg) {
  huanet.$message({
    message: msg,
    type: 'error',
    center:true,
    customClass:'hw_message'
  });
};
// 请求结果处理
Vue.prototype.hw_result = function(data,show,vm,callback) {
  if(data.code == 'S0000'){
    callback();
  }else if(show){
    // if(data.code == 'N0008'){// 登录失败或未登录
    //   vm.$router.push({name:'Login'});
    //   // huanet.hw_error("您未登录，请先登录");
    //   // setTimeout(()=>{
    //   //   vm.$router.push({name:'Login'});
    //   // },2000);
    // }else{
    //   huanet.$message({
    //     message: data.msg,
    //     type: 'error',
    //     center:true,
    //     customClass:'hw_message'
    //   });
    // }

  }

};

