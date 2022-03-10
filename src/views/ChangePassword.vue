<template>
    <div class="box-changepassword">
        <div class="changepassword-title">Thay đổi mật khẩu</div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Mật khẩu hiện tại</div>
            <input ref="current" id="currentpassword" class="input-changepassword" type="password" placeholder="Nhập mật khẩu hiện tại" v-model="currentpassword">
            <div class="icon-eye-changepasswword" @click="clickBtnIconEyeCurrentPassword()" :class="{'hide-currentpassword': isShowCurrentPassword}"></div>
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Mật khẩu mới</div>
            <input id="newpassword" class="input-changepassword" type="password" placeholder="Nhập mật khẩu mới" v-model="newpassword">
                <div class="icon-eye-changepasswword" @click="clickBtnIconEyeNewPassword()" :class="{'hide-newpassword': isShowNewPassword}"></div>
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Nhập lại mật khẩu mới</div>
            <input id="retypenewpassword" class="input-changepassword" type="password" placeholder="Nhập lại mật khẩu mới" v-model="retypenewpassword">
            <div class="icon-eye-changepasswword" @click="clickBtnIconEyeRetypeNewPassword()" :class="{'hide-retype-newpassword': isShowRetypeNewPassword}"></div>
        </div>
        <div class="box-btn-changepassword">
            <div class="btn-changepassword btn-save" @click="clickBtnSavePassword()">Lưu</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { eventBus } from'../main.js'
export default {
    name: 'DialogChangePassword',
    data() {
        return {
            isShowCurrentPassword: false,
            isShowNewPassword: false,
            isShowRetypeNewPassword: false,
            isShowDialogChangPassword: false,
            currentpassword: null,
            newpassword: null,
            retypenewpassword: null,
        }
    },
    computed: {
        ...mapGetters(['user', 'URLAPI']),
    },

    mounted() {
        this.$refs.current.focus();
    },
    
    methods: {
        /**
         * click vào btn lưu mật khẩu
         * CreatedBy: TTThiep(16/01/2022)
         */
        clickBtnSavePassword(){
            var m = this;
            if(m.currentpassword == null || m.newpassword == null || m.retypenewpassword == null)
            {
                eventBus.$emit("errorWas", "Các trường dữ liệu không được để trống");
                eventBus.$emit("isShowFormWaningWas", true);
            }
            else
            {
                if(m.currentpassword != m.user.Password)
                {
                    eventBus.$emit("errorWas", "Mật khẩu hiện tại chưa đúng.");
                    eventBus.$emit("isShowFormWaningWas", true);
                }
                else
                {
                    if(m.newpassword == m.currentpassword)
                    {
                        eventBus.$emit("errorWas", "Mật khẩu mới không được giống với mật khẩu hiện tại.");
                        eventBus.$emit("isShowFormWaningWas", true);
                    }
                    else
                    {
                        if(m.retypenewpassword != m.newpassword)
                        {
                            eventBus.$emit("errorWas", "Mật khẩu nhập lại không giống với mật khẩu đã nhập trước đó.");
                            eventBus.$emit("isShowFormWaningWas", true);
                        }
                        else
                        {
                            /**
                             * gọi APi thay đổi mật khẩu
                             * CreatedBy: TTThiep(26/01/2022)
                             */
                            axios
                            .put(`${m.URLAPI}/api/v1/Useds/UpdatePassword?UserId=${m.user.UserId}&Password=${m.newpassword}`)
                            .then(function (response){
                                if(response && response.data)
                                {
                                    eventBus.$emit("isShowToastMessageWas", true);
                                    eventBus.$emit("TitleToastMessageWas", "Đổi mật khẩu thành công");
                                }
                            })
                            .catch(function (res){
                                console.log(res);
                            });
                            setTimeout(function(){
                                // chuyển đến trang main
                                m.$router.push({ path: "/login" });
                            }, 1000);
                        }
                    }
                }
            }
        },

        /**
         * click vào btn con mắt mật khẩu hiện tại
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnIconEyeCurrentPassword(){
            this.isShowCurrentPassword = !this.isShowCurrentPassword;
            let passwordField = document.querySelector("#currentpassword");
            if(this.isShowCurrentPassword) 
            {
                passwordField.setAttribute("type", "text");
            } 
            else
            {
                passwordField.setAttribute("type", "password");
            }
        },

        /**
         * click vào btn con mắt mật khẩu mới
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnIconEyeNewPassword(){
            this.isShowNewPassword = !this.isShowNewPassword;
            let passwordField = document.querySelector("#newpassword");
            if(this.isShowNewPassword) 
            {
                passwordField.setAttribute("type", "text");
            } 
            else
            {
                passwordField.setAttribute("type", "password");
            }
        },

        /**
         * click vào btn con mắt nhập lại mật khẩu mới
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnIconEyeRetypeNewPassword(){
            this.isShowRetypeNewPassword = !this.isShowRetypeNewPassword;
            let passwordField = document.querySelector("#retypenewpassword");
            if(this.isShowRetypeNewPassword) 
            {
                passwordField.setAttribute("type", "text");
            } 
            else
            {
                passwordField.setAttribute("type", "password");
            }
        },

        /**
         * click vào btn hủy
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnCancel(){
            this.isShowDialogChangPassword = !this.isShowDialogChangPassword;
        },

        /**
         * click vào btn dấu X
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnX(){
            this.isShowDialogChangPassword = !this.isShowDialogChangPassword;
        }

    },

    created() {
        var m = this;

        // lấy dữ liệu từ component TheHeader là true
        eventBus.$on('isShowDialogChangePasswordWas', (isShowDialogChangPasswordData) => {
            m.isShowDialogChangPassword = isShowDialogChangPasswordData;
        });
    },
}
</script>