<template>
    <div class="t-dialog" v-show="isShowAdministrationInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập mã người dùng</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập mã người dùng" v-model="administration.AdministrationCode">
            </div>
            <div v-if="formod == 'edit'" class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập mật khẩu</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập mật khẩu" v-model="administration.PassWord">
            </div>
            <div class="box-schoolyearinfor-bottom">
                <div class="box-schoolyearinfor-cancle" @click="clickBtnCancel()">Hủy</div>
                <div class="box-btn-schoolyearinfor">
                    <div class="box-schoolyearinfor-save" @click="clickBtnSave()">Lưu</div>
                    <div class="box-schoolyearinfor-saveandinsert" v-show="isShowBtnSaveAndInsert" @click="clickBtnSaveAndInsert()">Lưu và thêm</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { eventBus } from '../../main'

export default {
    data() {
        return {
            isShowAdministrationInfor: false,
            isShowBtnSaveAndInsert: true,
            administration: {},
            m2: null,
            formod: null,
        }
    },
    methods: {
       /**
        * click Btn hủy
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnCancel(){
           this.isShowAdministrationInfor = !this.isShowAdministrationInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowAdministrationInfor = !this.isShowAdministrationInfor;
       },
       /**
        * click Btn lưu
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnSave()
       {
            var m = this;
            if(m.formod == "add")
            {
                axios({
                    method: "post",
                    url: "https://www.vnedu.somee.com/api/v1/Administrations",
                    data: m.administration,
                })
                .then(function (response) {
                    m.administration = {};
                    m.m2.loadDataAdministration();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Thêm người dùng thành công'
                    eventBus.$emit("TitleToastMessageWas", "Thêm người dùng thành công");
                    m.isShowAdministrationInfor = !m.isShowAdministrationInfor;
                    console.log(response);
                })
                .catch(function (error) {
                    // gửi dữ liệu đến component FormWaning là 'true'
                    eventBus.$emit("isShowFormWaningWas", true);
                    // gửi dữ liệu đến component FormWaning 
                    eventBus.$emit("errorWas", error.response.data.userMsg);
                });
            }
            else if(m.formod == "edit")
            {
                axios({
                    method: "put",
                    url: `https://www.vnedu.somee.com/api/v1/Administrations/${m.administration.AdministrationId}`,
                    data: m.administration,
                })
                .then(function (response) {
                    m.administration = {};
                    m.m2.loadDataAdministration();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Sửa người dùng thành công'
                    eventBus.$emit("TitleToastMessageWas", "Sửa người dùng thành công");
                    m.isShowAdministrationInfor = !m.isShowAdministrationInfor;
                    console.log(response);
                })
                .catch(function (error) {
                    // gửi dữ liệu đến component FormWaning là 'true'
                    eventBus.$emit("isShowFormWaningWas", true);
                    // gửi dữ liệu đến component FormWaning 
                    eventBus.$emit("errorWas", error.response.data.userMsg);
                });
            }
       },
       /**
        * click Btn lưu và thêm
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnSaveAndInsert()
       {
           var m = this;
           axios({
                method: "post",
                url: "https://www.vnedu.somee.com/api/v1/Administrations",
                data: m.administration,
            })
            .then(function (response) {
                m.administration = {};
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm người dùng thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm người dùng thành công");
                m.m2.loadDataAdministration();
                m.$refs.administrationcode.focus();
                console.log(response);
            })
            .catch(function (error) {
                // gửi dữ liệu đến component FormWaning là 'true'
                eventBus.$emit("isShowFormWaningWas", true);
                // gửi dữ liệu đến component FormWaning 
                eventBus.$emit("errorWas", error.response.data.userMsg);
            });
       }
    },
    created() {
        var  m = this;
        eventBus.$on("isShowAdministrationInforWas", (isShowAdministrationInforData) =>{
            m.isShowAdministrationInfor = isShowAdministrationInforData;
        });
        eventBus.$on("isShowBtnSaveAndInsertWas", (isShowBtnSaveAndInsertData) =>{
            m.isShowBtnSaveAndInsert = isShowBtnSaveAndInsertData;
        });
        eventBus.$on("thisWas", (thisData) =>{
            m.m2 = thisData;
        });
        eventBus.$on("formodWas", (formodData) =>{
            m.formod = formodData;
        });
        eventBus.$on("administrationWas", (administrationData) =>{
            m.administration = administrationData;
        });
    },
}
</script>