import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        student: {},
    },
    getters: {
        student: state => state.student,
    },
    mutations: {
        setStudent(state, student) {
            state.student = student;
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