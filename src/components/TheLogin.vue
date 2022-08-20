<template>
    <div class="t-login">
        <div class="login-opacity">
            <div class="box-login">
                <div class="login-top">
                    <div class="logo-login">
                    </div>
                </div>
                <input @keyup.enter="clickBtnLogin()" ref="username" type="text" class="box-input" placeholder="Tên đăng nhập" v-model="phoneNumber">
                <div class="box-pass-user">
                    <input @keyup.enter="clickBtnLogin()" type="password" id="password" class="box-input" placeholder="Mật khẩu" v-model="passWord">
                    <div class="icon-eye" @click="clickBtnIconEye()" :class="{'hide-password': isHidePassword}"></div>
                </div>
                <div class="box-forgot-password">
                    <a class="link-forgot-password" @click="clickLinkForgotPassword()" >Quên mật khẩu?</a>
                </div>
                <button class="btn-login" @click="clickBtnLogin()">Đăng nhập</button>
            </div>
            <div class="title-copyright">Copyright © 2021 - 2022 VNEDU</div>
        </div>
        <form-waning></form-waning>
        <toast-message></toast-message>
    </div>
</template>

<script>
import axios from "axios";
import FormWaning from '../views/FormWaning.vue'
import ToastMessage from '../views/ToastMessage.vue'
import { eventBus } from '../main.js';
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: 'TheLogin',
    components:{
        FormWaning, ToastMessage
    },
    data() {
        return {
            isHidePassword: false,
            phoneNumber: null,
            passWord: null,
        }
    },
    computed:{
        ...mapGetters(['user', 'URLAPI']),
    },
    methods: {
        ...mapMutations(['setUser']),
        /**
         * click vào btn con mắt
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnIconEye(){
            this.isHidePassword = !this.isHidePassword;
            let passwordField = document.querySelector("#password");
            if(this.isHidePassword) 
            {
                passwordField.setAttribute("type", "text");
            } 
            else
            {
                passwordField.setAttribute("type", "password");
            }
        },

        /**
         * click vào link quên mật khẩu
         * CreatedBy: TTThiep(19/01/2022)
         */
        clickLinkForgotPassword(){
            // gửi dữ liệu đến component FormWaning là 'true'
            eventBus.$emit("isShowFormWaningWas", true);
            // gửi dữ liệu đến component FormWaning là 'Có lỗi xảy ra, liên hệ với nhà trường để được trợ giúp.'
            eventBus.$emit("errorWas", "Có lỗi xảy ra, liên hệ với nhà trường để được trợ giúp.");
        },

        /**
         * click vào btn login
         * CreatedBy: TTThiep(13/01/2022)
         */
        clickBtnLogin(){
            var m = this;
            if(m.phoneNumber == null || m.passWord == null)
            {
                // gửi dữ liệu đến component FormWaning là 'true'
                eventBus.$emit("isShowFormWaningWas", true);
                // gửi dữ liệu đến component FormWaning là 'Tên đăng nhập hoặc mật khẩu không được để trống'
                eventBus.$emit("errorWas", "Tên đăng nhập hoặc mật khẩu không được để trống");
            }
            else
            {
                axios
                .get(`${m.URLAPI}/api/v1/Useds/GetByPhoneNumberPassword?PhoneNumber=${m.phoneNumber}&Password=${m.passWord}`)
                .then(function (response){
                    if(response && response.data)
                    { 
                        m.setUser(response.data);
                        // chuyển đến trang main
                        m.$router.push({ path: "/main" });
                    }
                    else{
                        // gửi dữ liệu đến component FormWaning là 'true'
                        eventBus.$emit("isShowFormWaningWas", true);
                        // gửi dữ liệu đến component FormWaning là 'Tên tài khoản hoặc mật khẩu không chính xác'
                        eventBus.$emit("errorWas", "Tên tài khoản hoặc mật khẩu không chính xác");
                    }
                })
                .catch(function (res){
                    console.log(res);
                });
                
            }
        },

           /**
         * click vào btn login
         * CreatedBy: TTThiep(13/01/2022)
         */
        keyupBtnLogin(){
            var m = this;
            if(m.phoneNumber == null || m.passWord == null)
            {
                // gửi dữ liệu đến component FormWaning là 'true'
                eventBus.$emit("isShowFormWaningWas", true);
                // gửi dữ liệu đến component FormWaning là 'Tên đăng nhập hoặc mật khẩu không được để trống'
                eventBus.$emit("errorWas", "Tên đăng nhập hoặc mật khẩu không được để trống");
            }
            else
            {
                axios
                .get(`https://www.vnedu.somee.com/api/v1/Students/getStudentByPhoneNumberAndPassword?PhoneNumber=${m.phoneNumber}&PassWord=${m.passWord}`)
                .then(function (response){
                    if(response && response.data)
                    { 
                        m.setStudent(response.data);
                        // chuyển đến trang main
                        m.$router.push({ path: "/main" });
                    }
                    else{
                        // gửi dữ liệu đến component FormWaning là 'true'
                        eventBus.$emit("isShowFormWaningWas", true);
                        // gửi dữ liệu đến component FormWaning là 'Tên tài khoản hoặc mật khẩu không chính xác'
                        eventBus.$emit("errorWas", "Tên tài khoản hoặc mật khẩu không chính xác");
                    }
                })
                .catch(function (res){
                    console.log(res);
                });
            } 
        },
    },
    mounted() {
        // focus vào ô nhâp tên đăng nhập
        this.$refs.username.focus();
    },
}
</script>