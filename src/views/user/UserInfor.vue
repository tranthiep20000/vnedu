<template>
    <div class="t-dialog" v-show="isShowAdministrationInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập tên người dùng</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập tên người dùng" v-model="user.UserName">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập số điện thoại</div>
                <input type="text" class="schoolyearinfor-input" placeholder="Nhập số điện thoại" v-model="user.PhoneNumber">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập mật khẩu</div>
                <input type="password" class="schoolyearinfor-input" placeholder="Nhập mật khẩu" v-model="user.Password">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Chọn quyền</div>
                <div class="box-size box-student-combobox">
                    <input type="text" class="box-size-input box-student-input" readonly :value="user.DecentralizationName">
                    <div class="box-select-size box-student-select" @click="clickBtnSelectDecentralization()">
                        <div class="icon-down"></div>
                    </div>
                    <div class="box-size-item box-item-student type-2" v-show="isShowBoxItemDecentralization">
                        <div v-for="decentralization in decentralizations" :key="decentralization.DecentralizationId" class="item-size item-student" @click="clickItemDecentralization(decentralization.DecentralizationId, decentralization.DecentralizationName)">{{decentralization.DecentralizationName}}</div>
                    </div>
                </div>
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
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            isShowAdministrationInfor: false,
            isShowBtnSaveAndInsert: true,
            isShowBoxItemDecentralization: false,
            decentralizations: [],
            user: {},
            m2: null,
            formod: null,
        }
    },
    computed: {
        ...mapGetters(['URLAPI']),
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
                    url: `${m.URLAPI}/api/v1/Useds`,
                    data: m.user,
                })
                .then(function (response) {
                    m.user = {};
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
                    eventBus.$emit("errorWas", error.response.data.data.userMsg);
                });
            }
            else if(m.formod == "edit")
            {
                axios({
                    method: "put",
                    url: `${m.URLAPI}/api/v1/Useds/${m.user.UserId}`,
                    data: m.user,
                })
                .then(function (response) {
                    m.user = {};
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
                    eventBus.$emit("errorWas", error.response.data.data.userMsg);
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
                url: `${m.URLAPI}/api/v1/Useds`,
                data: m.user,
            })
            .then(function (response) {
                m.user = {};
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
                eventBus.$emit("errorWas", error.response.data.data.userMsg);
            });
       },
       /**
        * click vào 1 quyền
        * CreatedBy: TTThiep(07/03/2022)
        */
        clickItemDecentralization(decentralizationId, decentralizationName){
            this.user.DecentralizationId = decentralizationId;
            this.user.DecentralizationName = decentralizationName;
            this.isShowBoxItemDecentralization = !this.isShowBoxItemDecentralization;
        },
        /**
        * click Btn lựa chọn quyền
        * CreatedBy: TTThiep(07/03/2022)
        */
        clickBtnSelectDecentralization(){
            this.isShowBoxItemDecentralization = !this.isShowBoxItemDecentralization;
        },
        /**
        * lấy tất cả quyền
        * CreatedBy: TTThiep(07/03/2022)
        */
        loadDataDecentralization(){
           var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Decentralizations`)
            .then(function(response){
                if(response && response.data)
                {
                    m.decentralizations = response.data;
                }
            })
            .catch(function(res){
                console.log(res);
            });
       }
    },
    created() {
        var  m = this;
        m.loadDataDecentralization();
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
        eventBus.$on("administrationWas", (userData) =>{
            m.user = userData;
        });
    },
}
</script>