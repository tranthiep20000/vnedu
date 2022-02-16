<template>
    <div class="t-schoolyear">
        <div class="header-schoolyear">
            <div class="header-name">Thông tin khối học</div>
            <div class="header-btn-insert" @click="clickBtnInsert()">Thêm khối học mới</div>
        </div>
        <div class="between-schoolyear">
            <table class="m-table" border="1">
                <thead>
                    <tr>
                        <th class="text-align-center" style="width: 100px">STT</th>
                        <th class="text-align-center">Tên khối học</th>
                        <th class="text-align-center" style="width: 150px">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(grade,i) in grades" :key="grade.GradeId">
                        <th class="text-align-center">{{++i}}</th>
                        <th class="text-align-center">{{grade.GradeName}}</th>
                        <th class="text-align-center">
                            <div class="box-function">
                                <div class="btn-edit" @click="clickBtnEdit(grade.GradeId)"></div>
                                <div class="btn-delete" @click="clickBtnDelete(grade.GradeId, grade.GradeName)"></div>
                            </div>
                        </th>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="bottom-schoolyear">
            <div class="box-sum">Tổng số: {{grades.length}} bản ghi</div>
        </div>
        <grade-infor></grade-infor>
        <delete-grade>></delete-grade>
    </div>
</template>
<script>
import axios from 'axios'
import { eventBus } from '../../main'
import GradeInfor from './GradeInfor.vue'
import DeleteGrade from './DeleteGrade.vue'
export default {
    components: {
        GradeInfor, DeleteGrade
    },
    data() {
        return {
            grades: [],
        }
    },
    methods: {
        /**
         * click vào btn thêm mới năm học
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnInsert(){
            eventBus.$emit("isShowBtnSaveAndInsertWas", true);
            eventBus.$emit("isShowGradeInforWas", true);
            eventBus.$emit('formodWas', "add");
            eventBus.$emit('thisWas', this);
            eventBus.$emit('gradeWas', {});
        },
        /**
         * Lấy tất cả năm học
         * CreatedBy: TTThiep(28/01/2022)
         */
        loadDataGrade(){
            var m = this;
            axios
            .get('https://www.vnedu.somee.com/api/v1/Grades')
            .then(function(response){
                if(response && response.data)
                {
                    m.grades = response.data;
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
        clickBtnEdit(gradeId){
            axios
            .get(`https://www.vnedu.somee.com/api/v1/Grades/${gradeId}`)
            .then(function (response){
                if(response && response.data)
                { 
                    eventBus.$emit('gradeWas', response.data);
                } 
            })
            .catch(function (res){
                console.log("api lỗi" + res);
            });
            eventBus.$emit("isShowGradeInforWas", true);
            eventBus.$emit("isShowBtnSaveAndInsertWas", false);
            eventBus.$emit('formodWas', "edit");
            eventBus.$emit('thisWas', this);
        },
        /**
         * click btn xóa
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnDelete(gradeId, gradeName){
            eventBus.$emit('thisWas', this);
            eventBus.$emit("isShowDeleteGradeWas", true);
            eventBus.$emit("gradeIdWas", gradeId);
            eventBus.$emit("titlenameWas", `bạn có thực sự muốn xóa ${gradeName} không?`);
        },
    },
    created() {
        var m = this;
        m.loadDataGrade();
    },
    
}
</script>