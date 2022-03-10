<template>
    <div class="t-dialog" v-show="isShowSemesterInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập tên học kì</div>
                <input ref="semestername" type="text" class="schoolyearinfor-input" placeholder="Nhập tên học kì" v-model="semester.SemesterName">
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
            isShowSemesterInfor: false,
            isShowBtnSaveAndInsert: true,
            semester: {},
            m2: null,
            formod: null,
        }
    },
    computed: {
        ...mapGetters(['user', 'URLAPI']),
    },
    methods: {
       /**
        * click Btn hủy
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnCancel(){
           this.isShowSemesterInfor = !this.isShowSemesterInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowSemesterInfor = !this.isShowSemesterInfor;
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
                m.semester.CreatedBy = m.user.UserName;
                axios({
                    method: "post",
                    url: `${m.URLAPI}/api/v1/Semesters`,
                    data: m.semester,
                })
                .then(function (response) {
                    m.semester = {};
                    m.m2.loadDataSemester();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Thêm học kì thành công'
                    eventBus.$emit("TitleToastMessageWas", "Thêm học kì thành công");
                    m.isShowSemesterInfor = !m.isShowSemesterInfor;
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
                m.semester.ModifiedBy = m.user.UserName;
                axios({
                    method: "put",
                    url: `${m.URLAPI}/api/v1/Semesters/${m.semester.SemesterId}`,
                    data: m.semester,
                })
                .then(function (response) {
                    m.semester = {};
                    m.m2.loadDataSemester();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Sửa học kì thành công'
                    eventBus.$emit("TitleToastMessageWas", "Sửa học kì thành công");
                    m.isShowSemesterInfor = !m.isShowSemesterInfor;
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
            m.semester.CreatedBy = m.user.UserName;
            axios({
                method: "post",
                url: `${m.URLAPI}/api/v1/Semesters`,
                data: m.semester,
            })
            .then(function (response) {
                m.semester = {};
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm học kì thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm học kì thành công");
                m.m2.loadDataSemester();
                m.$refs.semestername.focus();
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
    created() {
        var  m = this;
        eventBus.$on("isShowSemesterInforWas", (isShowSemesterInforData) =>{
            m.isShowSemesterInfor = isShowSemesterInforData;
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
        eventBus.$on("semesterWas", (semesterData) =>{
            m.semester = semesterData;
        });
    },
}
</script>