import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    username: localStorage.getItem('username')
}
const mutations = {
    username: (state, username) => {
        state.username = username
        localStorage.setItem('username', username)
    }
}  
const actions = {
    
}
const getters = {
    
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})