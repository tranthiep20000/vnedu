<template>
    <div class="t-overview">
       <div class="box-overview grade">
           <div class="box-name-overview">
               <div class="header-name-overview">{{schoolyears.length}}</div>
               <div class="bottom-name-overview">Năm học</div>
           </div>
           <div class="box-icon-overview"></div>
       </div>
       <div class="box-overview class">
           <div class="box-name-overview">
               <div class="header-name-overview">{{classs.length}}</div>
               <div class="bottom-name-overview">Lớp</div>
           </div>
           <div class="box-icon-overview"></div>
       </div>
       <div class="box-overview student">
           <div class="box-name-overview">
               <div class="header-name-overview">{{students.length}}</div>
               <div class="bottom-name-overview">Học sinh</div>
           </div>
           <div class="box-icon-overview"></div>
       </div>
       <div class="box-overview subject">
           <div class="box-name-overview">
               <div class="header-name-overview">{{subjects.length}}</div>
               <div class="bottom-name-overview">Môn Học</div>
           </div>
           <div class="box-icon-overview"></div>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            schoolyears: [],
            classs: [],
            students: [],
            subjects: [],
        }
    },
    computed: {
        ...mapGetters(['URLAPI']),
    },
    methods: {
        /**
         * lấy tất cả năm học
         * CreatedBy: TTThiep(26/01/2022)
         */
        LoadDataSchoolYears(){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/SchoolYears`)
            .then(function (response){
                if(response && response.data)
                { 
                   m.schoolyears = response.data;
                }
            })
            .catch(function (res){
                console.log(res);
            });
        },
        /**
         * lấy tất cả lớp
         * CreatedBy: TTThiep(26/01/2022)
         */
        LoadDataClasss(){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Classs`)
            .then(function (response){
                if(response && response.data)
                { 
                   m.classs = response.data;
                }
            })
            .catch(function (res){
                console.log(res);
            });
        },
        /**
         * lấy tất cả học sinh
         * CreatedBy: TTThiep(26/01/2022)
         */
        LoadDataStudents(){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Students`)
            .then(function (response){
                if(response && response.data)
                { 
                   m.students = response.data;
                }
            })
            .catch(function (res){
                console.log(res);
            });
        },
        /**
         * lấy tất cả môn học
         * CreatedBy: TTThiep(26/01/2022)
         */
        LoadDataSubjects(){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Subjects`)
            .then(function (response){
                if(response && response.data)
                { 
                   m.subjects = response.data;
                }
            })
            .catch(function (res){
                console.log(res);
            });
        },
    },
    created() {
        var m = this;
        m.LoadDataSchoolYears();
        m.LoadDataClasss();
        m.LoadDataStudents();
        m.LoadDataSubjects();
    },
}
</script>