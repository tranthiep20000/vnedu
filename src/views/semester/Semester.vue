<template>
    <div class="t-schoolyear">
        <div class="header-schoolyear">
            <div class="header-name">Thông tin học kì</div>
            <div class="header-btn-insert" @click="clickBtnInsert()">Thêm học kì mới</div>
        </div>
        <div class="between-schoolyear">
            <table class="m-table" border="1">
                <thead>
                    <tr>
                        <th class="text-align-center" style="width: 100px">STT</th>
                        <th class="text-align-center">Tên học kì</th>
                        <th class="text-align-center" style="width: 150px">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(semester,i) in semesters" :key="semester.SemesterId">
                        <th class="text-align-center">{{++i}}</th>
                        <th class="text-align-center">{{semester.SemesterName}}</th>
                        <th class="text-align-center">
                            <div class="box-function">
                                <div class="btn-edit" @click="clickBtnEdit(semester.SemesterId)"></div>
                                <div class="btn-delete" @click="clickBtnDelete(semester.SemesterId, semester.SemesterName)"></div>
                            </div>
                        </th>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="bottom-schoolyear">
            <div class="box-sum">Tổng số: {{semesters.length}} bản ghi</div>
        </div>
        <semester-infor></semester-infor>
        <delete-semester></delete-semester>
    </div>
</template>
<script>
import axios from 'axios'
import { eventBus } from '../../main'
import SemesterInfor from './SemesterInfor.vue'
import DeleteSemester from './DeleteSemester.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        DeleteSemester, SemesterInfor
    },
    data() {
        return {
            semesters: [],
        }
    },
    computed: {
        ...mapGetters(['user', 'URLAPI']),
    },
    methods: {
        /**
         * click vào btn thêm mới năm học
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnInsert(){
            eventBus.$emit("isShowBtnSaveAndInsertWas", true);
            eventBus.$emit("isShowSemesterInforWas", true);
            eventBus.$emit('formodWas', "add");
            eventBus.$emit('thisWas', this);
            eventBus.$emit('semesterWas', {});
        },
        /**
         * Lấy tất cả năm học
         * CreatedBy: TTThiep(28/01/2022)
         */
        loadDataSemester(){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Semesters`)
            .then(function(response){
                if(response && response.data)
                {
                    m.semesters = response.data;
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
        clickBtnEdit(semesterId){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Semesters/${semesterId}`)
            .then(function (response){
                if(response && response.data)
                { 
                    eventBus.$emit('semesterWas', response.data);
                } 
            })
            .catch(function (res){
                console.log("api lỗi" + res);
            });
            eventBus.$emit("isShowSemesterInforWas", true);
            eventBus.$emit("isShowBtnSaveAndInsertWas", false);
            eventBus.$emit('formodWas', "edit");
            eventBus.$emit('thisWas', this);
        },
        /**
         * click btn xóa
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnDelete(semesterId, semesterName){
            eventBus.$emit('thisWas', this);
            eventBus.$emit("isShowDeleteSemesterWas", true);
            eventBus.$emit("semesterIdWas", semesterId);
            eventBus.$emit("titlenameWas", `bạn có thực sự muốn xóa ${semesterName} không?`);
        },
    },
    created() {
        var m = this;
        m.loadDataSemester();
    },
    
}
</script>