<template>
    <div class="t-schoolyear">
        <div class="header-schoolyear">
            <div class="header-name">Thông tin lớp học</div>
            <div class="header-btn-insert" @click="clickBtnInsert()">Thêm lớp học mới</div>
        </div>
        <div class="box-search">
            <div class="box-input-text">
                <input type="text" class="input-text" placeholder="Tìm kiếm theo tên, năm học">
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
                        <th class="text-align-center">Tên lớp học</th>
                        <th class="text-align-center">Tên năm học</th>
                        <th class="text-align-center" style="width: 150px">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(Class,i) in Classs" :key="Class.ClassId">
                        <th class="text-align-center">{{++i}}</th>
                        <th class="text-align-center">{{Class.ClassName}}</th>
                        <th class="text-align-center">{{Class.SchoolYearName}}</th>
                        <th class="text-align-center">
                            <div class="box-function">
                                <div class="btn-edit" @click="clickBtnEdit(Class.ClassId)"></div>
                                <div class="btn-delete" @click="clickBtnDelete(Class.ClassId, Class.ClassName, Class.SchoolYearName)"></div>
                            </div>
                        </th>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="bottom-schoolyear box-type-paging">
            <div class="box-sum">Tổng số: {{Classs.length}} bản ghi</div>
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
        <class-infor></class-infor>
        <delete-class></delete-class>
    </div>
</template>
<script>
import axios from 'axios'
import { eventBus } from '../../main'
import ClassInfor from './ClassInfor.vue'
import DeleteClass from './DeleteClass.vue'
import { mapGetters } from 'vuex'
export default {
  components: { ClassInfor, DeleteClass },
    data() {
        return {
            Classs: [],
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
         * click vào btn thêm mới lớp học
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnInsert(){
            eventBus.$emit("isShowBtnSaveAndInsertWas", true);
            eventBus.$emit("isShowClassInforWas", true);
            eventBus.$emit('formodWas', "add");
            eventBus.$emit('thisWas', this);
            eventBus.$emit('classWas', {});
        },
        /**
         * Lấy tất cả người dùng
         * CreatedBy: TTThiep(08/02/2022)
         */
        loadDataClass(){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Classs`)
            .then(function(response){
                if(response && response.data)
                {
                    m.Classs = response.data;
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
        clickBtnEdit(classId){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Classs/${classId}`)
            .then(function (response){
                if(response && response.data)
                { 
                    eventBus.$emit('classWas', response.data);
                } 
            })
            .catch(function (res){
                console.log("api lỗi" + res);
            });
            eventBus.$emit("isShowClassInforWas", true);
            eventBus.$emit("isShowBtnSaveAndInsertWas", false);
            eventBus.$emit('formodWas', "edit");
            eventBus.$emit('thisWas', this);
        },
        /**
         * click btn xóa
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnDelete(classId, className, schoolYearName){
            eventBus.$emit('thisWas', this);
            eventBus.$emit("isShowDeleteClassWas", true);
            eventBus.$emit("classIdWas", classId);
            eventBus.$emit("titlenameWas", `bạn có thực sự muốn xóa ${className} của ${schoolYearName} không?`);
        },
    },
    created() {
        var m = this;
        m.loadDataClass();
    },
    
}
</script>