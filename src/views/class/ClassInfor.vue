<template>
    <div class="t-dialog" v-show="isShowClassInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top type-class">
                <div class="schoolyearinfor-name type-class">Nhập tên lớp học</div>
                <input ref="classname" type="text" class="schoolyearinfor-input" placeholder="Nhập tên lớp học" v-model="class1.ClassName">
            </div>
            <div class="box-schoolyearinfor-top type-class">
                <div class="schoolyearinfor-name type-class">Chọn khối học</div>
                <div class="grade-combobox">
                    <div class="box-combobox">
                        <div class="box-combobox-header">
                            <input class="input-data" type="text" readonly="true" style="height: 27px;" :value="gradeName">
                            <div class="box-icon" @click="clickBtnIconDown()">
                                <div class="icon-down"></div>
                            </div>
                        </div>
                        <div class="box-combobox-content" v-show="isShowSelectItem"> 
                            <div v-for="grade in grades" :key="grade.GradeId" class="item-combobox" @click="clickItemSelect(grade.GradeId, grade.GradeName)">{{grade.GradeName}}</div>
                        </div>
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

export default {
    data() {
        return {
            isShowClassInfor: false,
            isShowBtnSaveAndInsert: true,
            isShowSelectItem: false,
            class1: {},
            m2: null,
            formod: null,
            grades: [],
            gradeName: null,
        }
    },
    methods: {
       /**
        * click Btn hủy
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnCancel(){
           this.isShowClassInfor = !this.isShowClassInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowClassInfor = !this.isShowClassInfor;
       },
       /**
        * click Btn lựa chọn khối học
        * CreatedBy: TTThiep(07/02/2022)
        */
       clickBtnIconDown(){
           this.isShowSelectItem = !this.isShowSelectItem;
       },
       /**
        * click Btn chọn vào 1 khối
        * CreatedBy: TTThiep(07/02/2022)
        */
       clickItemSelect(gradeId, gradeName){
            this.isShowSelectItem = !this.isShowSelectItem;
            this.class1.GradeId = gradeId;
            this.gradeName = gradeName;
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
                    url: "https://www.vnedu.somee.com/api/v1/Classs",
                    data: m.class1,
                })
                .then(function (response) {
                    m.class1 = {};
                    m.m2.loadDataClass();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Thêm lớp học thành công'
                    eventBus.$emit("TitleToastMessageWas", "Thêm lớp học thành công");
                    m.isShowClassInfor = !m.isShowClassInfor;
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
                    url: `https://www.vnedu.somee.com/api/v1/Classs/${m.class1.ClassId}`,
                    data: m.class1,
                })
                .then(function (response) {
                    m.class1 = {};
                    m.m2.loadDataClass();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Sửa lớp học thành công'
                    eventBus.$emit("TitleToastMessageWas", "Sửa lớp học thành công");
                    m.isShowClassInfor = !m.isShowClassInfor;
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
                url: "https://www.vnedu.somee.com/api/v1/Classs",
                data: m.class1,
            })
            .then(function (response) {
                m.class1 = {};
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm lớp học thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm lớp học thành công");
                m.m2.loadDataClass();
                m.$refs.classname.focus();
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
        eventBus.$on("isShowClassInforWas", (isShowClassInforData) =>{
            m.isShowClassInfor = isShowClassInforData;
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
        eventBus.$on("classWas", (classData) =>{
            m.class1 = classData;
        });
        eventBus.$on("gradesWas", (gradesData) =>{
            m.grades = gradesData;
        });
    },
}
</script>
<style scoped>
.grade-combobox{
    width: calc(100% - 150px);
}
.type-class{
    height: 30px;
    line-height: 30px;
}
</style>