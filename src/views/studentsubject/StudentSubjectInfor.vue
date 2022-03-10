<template>
    <div class="t-dialog" v-show="isShowStudentSubjectInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Chọn môn học</div>
                <div class="box-size box-student-combobox box-student-class-combobox">
                    <input type="text" class="box-size-input box-student-input" readonly :value="subjectName">
                    <div class="box-select-size box-student-select" @click="clickBtnSelectSubject()">
                        <div class="icon-down"></div>
                    </div>
                    <div class="box-size-item box-item-student type-2" v-show="isShowBoxItemSubject">
                        <div v-for="subject in subjects" :key="subject.SubjectId" class="item-size item-student" @click="clickItemSubject(subject.SubjectId, subject.SubjectName)">{{subject.SubjectName}}</div>
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
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            isShowStudentSubjectInfor: false,
            isShowBtnSaveAndInsert: true,
            isShowBoxItemSubject: false,
            subjectId: null,
            m2: null,
            subjectName: null,
            formod: null,
            subjects: [],
            student_subject: {},
        }
    },
    computed:{
        ...mapGetters(['user', 'URLAPI']),
    },
    methods: {
        /**
        * click Btn lựa chọn giới tính
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickBtnSelectSubject(){
            this.isShowBoxItemSubject = !this.isShowBoxItemSubject;
        },
        /**
        * click vào 1 giới tính 
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickItemSubject(subjectId, subjectName){
            this.student_subject.SubjectId = subjectId;
            this.subjectName = subjectName;
            this.isShowBoxItemSubject = !this.isShowBoxItemSubject;
        },
    
       /**
        * click Btn hủy
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnCancel(){
           this.isShowStudentSubjectInfor = !this.isShowStudentSubjectInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowStudentSubjectInfor = !this.isShowStudentSubjectInfor;
       },
       /**
        * click Btn lưu
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnSave()
       {
            var m = this;
            m.student_subject.CreatedBy = m.user.UserName;  
            axios({
                method: "post",
                url: `${m.URLAPI}/api/v1/Student_Subjects`,
                data: m.student_subject,
            })
            .then(function (response) {
                m.subjectName = null;
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm môn học thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm môn học thành công");
                m.m2.loadDataStudent_Subject();
                m.isShowStudentSubjectInfor = !m.isShowStudentSubjectInfor;
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
        * click Btn lưu và thêm
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnSaveAndInsert()
       {
           var m = this;
           m.student_subject.CreatedBy = m.user.UserName;
           axios({
                method: "post",
                url: `${m.URLAPI}/api/v1/Student_Subjects`,
                data: m.student_subject,
            })
            .then(function (response) {
                m.subjectName = null;
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm môn học thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm môn học thành công");
                m.m2.loadDataStudent_Subject();
                console.log(response);
            })
            .catch(function (error) {
                // gửi dữ liệu đến component FormWaning là 'true'
                eventBus.$emit("isShowFormWaningWas", true);
                // gửi dữ liệu đến component FormWaning 
                eventBus.$emit("errorWas", error.response.data.data.userMsg);
            });
       },
       loadDataSubjects(){
           var m = this;
           axios
           .get(`${m.URLAPI}/api/v1/Subjects`)
           .then(function(response)
           {
               if(response.data)
               {
                   m.subjects = response.data;
               }
           })
           .catch(function(response){
               console.log(response)
           })
       }
    },
    created() {
        var  m = this;
        eventBus.$on("isShowStudentSubjectInforWas", (isShowStudentSubjectInforData) =>{
            m.isShowStudentSubjectInfor = isShowStudentSubjectInforData;
        });
        eventBus.$on("isShowBtnSaveAndInsertWas", (isShowBtnSaveAndInsertData) =>{
            m.isShowBtnSaveAndInsert = isShowBtnSaveAndInsertData;
        });
        eventBus.$on("thisWas", (thisData) =>{
            m.m2 = thisData;
        });
        eventBus.$on("schoolyearIdWas", (schoolyearIdData) =>{
            m.student_subject.SchoolYearId = schoolyearIdData;
        });
        eventBus.$on("semesterIdWas", (semesterIdData) =>{
            m.student_subject.SemesterId = semesterIdData;
        });
        eventBus.$on("studentIdWas", (studentIdData) =>{
            m.student_subject.StudentId = studentIdData;
        });
        eventBus.$on("formodWas", (formodData) =>{
            m.formod = formodData;
        });
        eventBus.$on("nullWas", (nullData) =>{
            m.subjectName = nullData;
        });
        m.loadDataSubjects();
    },
}
</script>