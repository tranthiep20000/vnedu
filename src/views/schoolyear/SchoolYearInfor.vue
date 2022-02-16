<template>
    <div class="t-dialog" v-show="isShowSchoolYearInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập tên năm học</div>
                <input ref="schoolyearname" type="text" class="schoolyearinfor-input" placeholder="Nhập tên năm học" v-model="schoolyear.SchoolYearName">
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
            isShowSchoolYearInfor: false,
            isShowBtnSaveAndInsert: true,
            schoolyear: {},
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
           this.isShowSchoolYearInfor = !this.isShowSchoolYearInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowSchoolYearInfor = !this.isShowSchoolYearInfor;
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
                    url: "https://www.vnedu.somee.com/api/v1/SchoolYears",
                    data: m.schoolyear,
                })
                .then(function (response) {
                    m.schoolyear = {};
                    m.m2.loadDataSchoolYear();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Thêm năm học thành công'
                    eventBus.$emit("TitleToastMessageWas", "Thêm năm học thành công");
                    m.isShowSchoolYearInfor = !m.isShowSchoolYearInfor;
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
                    url: `https://www.vnedu.somee.com/api/v1/SchoolYears/${m.schoolyear.SchoolYearId}`,
                    data: m.schoolyear,
                })
                .then(function (response) {
                    m.schoolyear = {};
                    m.m2.loadDataSchoolYear();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Sửa năm học thành công'
                    eventBus.$emit("TitleToastMessageWas", "Sửa năm học thành công");
                    m.isShowSchoolYearInfor = !m.isShowSchoolYearInfor;
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
                url: "https://www.vnedu.somee.com/api/v1/SchoolYears",
                data: m.schoolyear,
            })
            .then(function (response) {
                m.schoolyear = {};
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm năm học thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm năm học thành công");
                m.m2.loadDataSchoolYear();
                m.$refs.schoolyearname.focus();
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
        eventBus.$on("isShowSchoolYearInforWas", (isShowSchoolYearInforData) =>{
            m.isShowSchoolYearInfor = isShowSchoolYearInforData;
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
        eventBus.$on("schoolyearWas", (schoolyearData) =>{
            m.schoolyear = schoolyearData;
        });
    },
}
</script>