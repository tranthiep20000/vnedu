import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {},
        URLAPI: 'https://www.vnedu.somee.com'
            //URLAPI: 'https://localhost:7101'
    },
    getters: {
        user: state => state.user,
        URLAPI: state => state.URLAPI
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {

    },
})


//Router
import VueRouter from 'vue-router'
import router from './router.js'

Vue.config.productionTip = false

export const eventBus = new Vue();

Vue.use(VueRouter)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')