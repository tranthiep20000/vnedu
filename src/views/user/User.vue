<template>
    <div class="t-schoolyear">
        <div class="header-schoolyear">
            <div class="header-name">Thông tin người dùng</div>
            <div class="header-btn-insert" @click="clickBtnInsert()">Thêm người dùng mới</div>
        </div>
        <div class="box-search">
            <div class="box-input-text">
                <input type="text" class="input-text" placeholder="Tìm kiếm theo mã người dùng">
                <div class="box-icon-search">
                    <div class="icon-search"></div>
                </div>
            </div>
        </div>
        <div class="between-schoolyear table-user">
            <table class="m-table" border="1">
                <thead>
                    <tr>
                        <th class="text-align-center" style="width: 100px">STT</th>
                        <th class="text-align-center">Mã người dùng</th>
                        <th class="text-align-center">Mật khẩu</th>
                        <th class="text-align-center">Tên quyền</th>
                        <th class="text-align-center" style="width: 150px">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(administration,i) in administrations" :key="administration.AdministrationId">
                        <th class="text-align-center">{{++i}}</th>
                        <th class="text-align-center">{{administration.AdministrationCode}}</th>
                        <th class="text-align-center">{{administration.PassWord}}</th>
                        <th class="text-align-center">{{administration.DecentralizationName}}</th>
                        <th class="text-align-center">
                            <div class="box-function">
                                <div class="btn-edit" @click="clickBtnEdit(administration.AdministrationId)"></div>
                                <div class="btn-delete" @click="clickBtnDelete(administration.AdministrationId, administration.AdministrationCode)"></div>
                            </div>
                        </th>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="bottom-schoolyear box-type-paging">
            <div class="box-sum">Tổng số: {{administrations.length}} bản ghi</div>
            <div class="box-paging"></div>
            <div class="box-size">
                <input type="text" class="box-size-input" readonly :value="pagename">
                <div class="box-select-size" @click="clickBtnSelectSize()">
                    <div class="icon-size"></div>
                </div>
                <div class="box-size-item" v-show="isShowBoxItemSize">
                    <div v-for="page in pages" :key="page.index" class="item-size" @click="clickItemSize(page.name)">{{page.name}}</div>
                </div>
            </div>
        </div>
        <user-infor></user-infor>
        <delete-user></delete-user>
    </div>
</template>
<script>
import axios from 'axios'
import { eventBus } from '../../main'
import UserInfor from './UserInfor.vue'
import DeleteUser from './DeleteUser.vue'

export default {
  components: { UserInfor, DeleteUser },
    data() {
        return {
            administrations: [],
            pages: [
                {
                    index: 10,
                    name: "10 bản ghi trên 1 trang"
                },
                {
                    index: 20,
                    name: "20 bản ghi trên 1 trang"
                },
                {
                    index: 30,
                    name: "30 bản ghi trên 1 trang"
                },
                {
                    index: 50,
                    name: "50 bản ghi trên 1 trang"
                },
                {
                    index: 100,
                    name: "100 bản ghi trên 1 trang"
                }
            ],
            pagename: "10 bản ghi trên 1 trang",
            isShowBoxItemSize: false,
        }
    },
    methods: {
        /**
         * click vào btn hiện box size
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnSelectSize(){
            this.isShowBoxItemSize = !this.isShowBoxItemSize;
        },
        /**
         * click vào chọn số bản ghi trên 1 trang
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickItemSize(name){
            this.isShowBoxItemSize = !this.isShowBoxItemSize;
            this.pagename = name;
        },
        /**
         * click vào btn thêm mới người dùng
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnInsert(){
            eventBus.$emit("isShowBtnSaveAndInsertWas", true);
            eventBus.$emit("isShowAdministrationInforWas", true);
            eventBus.$emit('formodWas', "add");
            eventBus.$emit('thisWas', this);
            eventBus.$emit('administrationWas', {});
        },
        /**
         * Lấy tất cả người dùng
         * CreatedBy: TTThiep(08/02/2022)
         */
        loadDataAdministration(){
            var m = this;
            axios
            .get('https://www.vnedu.somee.com/api/v1/Administrations')
            .then(function(response){
                if(response && response.data)
                {
                    m.administrations = response.data;
                }
            })
            .catch(function(res){
                console.log(res);
            });
        },
        /**
         * click btn sửa
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnEdit(administrationId){
            axios
            .get(`https://www.vnedu.somee.com/api/v1/Administrations/${administrationId}`)
            .then(function (response){
                if(response && response.data)
                { 
                    eventBus.$emit('administrationWas', response.data);
                } 
            })
            .catch(function (res){
                console.log("api lỗi" + res);
            });
            eventBus.$emit("isShowAdministrationInforWas", true);
            eventBus.$emit("isShowBtnSaveAndInsertWas", false);
            eventBus.$emit('formodWas', "edit");
            eventBus.$emit('thisWas', this);
        },
        /**
         * click btn xóa
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnDelete(administrationId, administrationCode){
            eventBus.$emit('thisWas', this);
            eventBus.$emit("isShowDeleteAdministrationWas", true);
            eventBus.$emit("administrationIdWas", administrationId);
            eventBus.$emit("titlenameWas", `bạn có thực sự muốn xóa ${administrationCode} không?`);
        },
    },
    created() {
        var m = this;
        m.loadDataAdministration();
    },
    
}
</script>