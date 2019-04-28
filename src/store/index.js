import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        uToken:'',
        uId:'',
        uRole:''
    },
    getters:{
        
    },
    mutations:{
        saveToken(state,platForm){
            state.uToken = platForm;
        },
        saveId(state,platForm){
            state.uId = platForm;
        },
        saveRole(state,platForm){
            state.uRole = platForm;
        }
    },
    actions:{
        getToken({commit},platForm){
            commit('saveToken',platForm)
        },
        getId({commit},platForm){
            commit('saveId',platForm)
        },
        getRole({commit},platForm){
            commit('saveRole',platForm)
        }
    }
    
})

export default store