<template>
    <div class="t-schoolyear">
        <div class="header-schoolyear">
            <div class="header-name">Thông tin lớp học</div>
            <div class="header-btn-insert" @click="clickBtnInsert()">Thêm lớp học mới</div>
        </div>
        <div class="between-schoolyear">
            <table class="m-table" border="1">
                <thead>
                    <tr>
                        <th class="text-align-center" style="width: 100px">STT</th>
                        <th class="text-align-center">Tên lớp học</th>
                        <th class="text-align-center">Tên khối học</th>
                        <th class="text-align-center" style="width: 150px">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(class1,i) in classs" :key="class1.ClassId">
                        <th class="text-align-center">{{++i}}</th>
                        <th class="text-align-center">{{class1.ClassName}}</th>
                        <th class="text-align-center">{{class1.GradeName}}</th>
                        <th class="text-align-center">
                            <div class="box-function">
                                <div class="btn-edit" @click="clickBtnEdit(class1.ClassId)"></div>
                                <div class="btn-delete" @click="clickBtnDelete(class1.ClassId, class1.ClassName)"></div>
                            </div>
                        </th>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="bottom-schoolyear">
            <div class="box-sum">Tổng số: {{classs.length}} bản ghi</div>
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

export default {
  components: { ClassInfor, DeleteClass },
    data() {
        return {
            classs: [],
        }
    },
    methods: {
        /**
         * click vào btn thêm mới năm học
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnInsert(){
            axios
            .get('https://www.vnedu.somee.com/api/v1/Grades')
            .then(function(response){
                if(response && response.data)
                {
                    eventBus.$emit("gradesWas", response.data);
                }
            })
            .catch(function(res){
                console.log(res);
            });
            eventBus.$emit("isShowBtnSaveAndInsertWas", true);
            eventBus.$emit("isShowClassInforWas", true);
            eventBus.$emit('formodWas', "add");
            eventBus.$emit('thisWas', this);
            eventBus.$emit('classWas', {});
        },
        /**
         * Lấy tất cả lớp học
         * CreatedBy: TTThiep(28/01/2022)
         */
        loadDataClass(){
            var m = this;
            axios
            .get('https://www.vnedu.somee.com/api/v1/Classs')
            .then(function(response){
                if(response && response.data)
                {
                    m.classs = response.data;
                }
            })
            .catch(function(res){
                console.log(res);
            });
        },
        /**
         * click btn sửa
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnEdit(classId){
            axios
            .get(`https://www.vnedu.somee.com/api/v1/Classs/${classId}`)
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
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnDelete(classId, className){
            eventBus.$emit('thisWas', this);
            eventBus.$emit("isShowDeleteClassWas", true);
            eventBus.$emit("classIdWas", classId);
            eventBus.$emit("titlenameWas", `bạn có thực sự muốn xóa ${className} không?`);
        },
    },
    created() {
        var m = this;
        m.loadDataClass();
    },
    
}
</script>