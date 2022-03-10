<template>
    <div class="t-schoolyear">
        <div class="header-schoolyear">
            <div class="header-name">Thông tin người dùng</div>
            <div class="header-btn-insert" @click="clickBtnInsert()">Thêm người dùng mới</div>
        </div>
        <div class="box-search">
            <div class="box-input-text">
                <input type="text" class="input-text" placeholder="Tìm kiếm theo tên, số điện thoại">
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
                        <th class="text-align-center">Tên người dùng</th>
                        <th class="text-align-center">Số điện thoại</th>
                        <th class="text-align-center">Tên quyền</th>
                        <th class="text-align-center" style="width: 150px">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,i) in users" :key="user.UserId">
                        <th class="text-align-center">{{++i}}</th>
                        <th class="text-align-center">{{user.UserName}}</th>
                        <th class="text-align-center">{{user.PhoneNumber}}</th>
                        <th class="text-align-center">{{user.DecentralizationName}}</th>
                        <th class="text-align-center">
                            <div class="box-function">
                                <div class="btn-edit" @click="clickBtnEdit(user.UserId)"></div>
                                <div class="btn-delete" @click="clickBtnDelete(user.UserId, user.UserName)"></div>
                            </div>
                        </th>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="bottom-schoolyear box-type-paging">
            <div class="box-sum">Tổng số: {{users.length}} bản ghi</div>
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
import { mapGetters } from 'vuex'
export default {
  components: { UserInfor, DeleteUser },
    data() {
        return {
            users: [],
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
    computed: {
        ...mapGetters(['URLAPI']),
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
            .get(`${m.URLAPI}/api/v1/Useds`)
            .then(function(response){
                if(response && response.data)
                {
                    m.users = response.data;
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
        clickBtnEdit(userId){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Useds/${userId}`)
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
        clickBtnDelete(userId, userName){
            eventBus.$emit('thisWas', this);
            eventBus.$emit("isShowDeleteAdministrationWas", true);
            eventBus.$emit("administrationIdWas", userId);
            eventBus.$emit("titlenameWas", `bạn có thực sự muốn xóa ${userName} không?`);
        },
    },
    created() {
        var m = this;
        m.loadDataAdministration();
    },
    
}
</script>