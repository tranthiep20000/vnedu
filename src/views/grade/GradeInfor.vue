<template>
    <div class="t-dialog" v-show="isShowGradeInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập tên khối học</div>
                <input ref="gradename" type="text" class="schoolyearinfor-input" placeholder="Nhập tên khối học" v-model="grade.GradeName">
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

export default {
    data() {
        return {
            isShowGradeInfor: false,
            isShowBtnSaveAndInsert: true,
            grade: {},
            m2: null,
            formod: null,
        }
    },
    methods: {
       /**
        * click Btn hủy
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnCancel(){
           this.isShowGradeInfor = !this.isShowGradeInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowGradeInfor = !this.isShowGradeInfor;
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
                    url: "https://www.vnedu.somee.com/api/v1/Grades",
                    data: m.grade,
                })
                .then(function (response) {
                    m.grade = {};
                    m.m2.loadDataGrade();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Thêm khối học thành công'
                    eventBus.$emit("TitleToastMessageWas", "Thêm khối học thành công");
                    m.isShowGradeInfor = !m.isShowGradeInfor;
                    console.log(response);
                })
                .catch(function (error) {
                    // gửi dữ liệu đến component FormWaning là 'true'
                    eventBus.$emit("isShowFormWaningWas", true);
                    // gửi dữ liệu đến component FormWaning 
                    eventBus.$emit("errorWas", error.response.data.userMsg);
                });
            }
            else if(m.formod == "edit")
            {
                axios({
                    method: "put",
                    url: `https://www.vnedu.somee.com/api/v1/Grades/${m.grade.GradeId}`,
                    data: m.grade,
                })
                .then(function (response) {
                    m.grade = {};
                    m.m2.loadDataGrade();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Sửa khối học thành công'
                    eventBus.$emit("TitleToastMessageWas", "Sửa khối học thành công");
                    m.isShowGradeInfor = !m.isShowGradeInfor;
                    console.log(response);
                })
                .catch(function (error) {
                    // gửi dữ liệu đến component FormWaning là 'true'
                    eventBus.$emit("isShowFormWaningWas", true);
                    // gửi dữ liệu đến component FormWaning 
                    eventBus.$emit("errorWas", error.response.data.userMsg);
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
                url: "https://www.vnedu.somee.com/api/v1/Grades",
                data: m.grade,
            })
            .then(function (response) {
                m.grade = {};
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm khối học thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm khối học thành công");
                m.m2.loadDataGrade();
                m.$refs.gradename.focus();
                console.log(response);
            })
            .catch(function (error) {
                // gửi dữ liệu đến component FormWaning là 'true'
                eventBus.$emit("isShowFormWaningWas", true);
                // gửi dữ liệu đến component FormWaning 
                eventBus.$emit("errorWas", error.response.data.userMsg);
            });
       }
    },
    created() {
        var  m = this;
        eventBus.$on("isShowGradeInforWas", (isShowGradeInforData) =>{
            m.isShowGradeInfor = isShowGradeInforData;
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
        eventBus.$on("gradeWas", (gradeData) =>{
            m.grade = gradeData;
        });
    },
}
</script>