<template>
    <div class="t-dialog" v-show="isShowStudentInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập mã học sinh</div>
                <input ref="studentcode" type="text" class="schoolyearinfor-input" placeholder="Nhập mã học sinh" v-model="student.StudentCode">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập tên học sinh</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập tên học sinh" v-model="student.FullName">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Chọn giới tính</div>
               <div class="box-size box-student-combobox">
                    <input type="text" class="box-size-input box-student-input" readonly :value="fomatGender(student.Gender)">
                    <div class="box-select-size box-student-select" @click="clickBtnSelectGender()">
                        <div class="icon-down"></div>
                    </div>
                    <div class="box-size-item box-item-student" v-show="isShowBoxItemGender">
                        <div v-for="gender in genders" :key="gender.GenderId" class="item-size item-student" @click="clickItemGender(gender.GenderId)">{{gender.GenderName}}</div>
                    </div>
                </div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập ngày sinh</div>
                <input :max="getDateToday()" ref="administrationcode" type="date" class="schoolyearinfor-input" :value="fomatDate(student.DateOfBirth)" @input="student.DateOfBirth = $event.target.value">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập số điện thoại</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập số điện thoại" v-model="student.PhoneNumber">
            </div>
            <div v-if="formod == 'edit'" class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập mật khẩu</div>
                <input ref="administrationcode" type="password" class="schoolyearinfor-input" placeholder="Nhập mật khẩu" v-model="student.PassWord">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Chọn khối học</div>
                <div class="box-size box-student-combobox">
                    <input type="text" class="box-size-input box-student-input" readonly :value="student.GradeName">
                    <div class="box-select-size box-student-select" @click="clickBtnSelectGrade()">
                        <div class="icon-down"></div>
                    </div>
                    <div class="box-size-item box-item-student" v-show="isShowBoxItemGrade">
                        <div v-for="grade in grades" :key="grade.GradeId" class="item-size item-student" @click="clickItemGrade(grade.GradeId, grade.GradeName)">{{grade.GradeName}}</div>
                    </div>
                </div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Chọn lớp học</div>
                <div class="box-size box-student-combobox">
                    <input type="text" class="box-size-input box-student-input" readonly :value="student.ClassName">
                    <div class="box-select-size box-student-select" @click="clickBtnSelectClass()">
                        <div class="icon-down"></div>
                    </div>
                    <div class="box-size-item box-item-student type-2" v-show="isShowBoxItemClass">
                        <div v-for="class1 in classs" :key="class1.ClassId" class="item-size item-student" @click="clickItemClass(class1.ClassId, class1.ClassName)">{{class1.ClassName}}</div>
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
import moment from 'moment';
import { eventBus } from '../../main'

export default {
    data() {
        return {
            isShowStudentInfor: false,
            isShowBtnSaveAndInsert: true,
            isShowBoxItemGender: false,
            isShowBoxItemGrade: false,
            isShowBoxItemClass: false,
            student: {},
            m2: null,
            formod: null,
            genders: [
                {
                    GenderId: 0,
                    GenderName: "Nữ"
                },
                {
                    GenderId: 1,
                    GenderName: "Nam"
                },
                {
                    GenderId: 2,
                    GenderName: "Khác"
                }
            ],
            grades: [],
            classs: [],
        }
    },
    methods: {
        /**
         * Định dạng lại giới tính 
         * CreatedBy: TTThiep (09/02/2022)
         */
        fomatGender(value){
            if (value != null){
                if(value == 0)
                {
                    return "Nữ";
                }
                else if(value == 1)
                {
                    return "Nam";
                }
                else if(value == 2){
                    return "Khác";
                }
            }
            else{
                return "";
            }
        },
        /**
         * Định dạng lại ngày sinh để hiển thị 
         * CreatedBy: TTThiep (10/02/2022)
         */
        fomatDate(value){
            if (value){
                return moment(String(value)).format('YYYY-MM-DD');
            }
        },
        /**
         * Lấy ngày hôm nay 
         * CreatedBy: TTThiep (10/02/2022)
         */
        getDateToday(){
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            if (dd < 10) {
            dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = yyyy + '-' + mm + '-' + dd;
            return today;
        },
        /**
        * click Btn lựa chọn giới tính
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickBtnSelectGender(){
            this.isShowBoxItemGender = !this.isShowBoxItemGender;
        },
        /**
        * click vào 1 giới tính 
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickItemGender(genderId){
            this.student.Gender = genderId;
            this.isShowBoxItemGender = !this.isShowBoxItemGender;
        },
        /**
        * click Btn lựa chọn lớp học
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickBtnSelectClass(){
            this.isShowBoxItemClass = !this.isShowBoxItemClass;
        },
        /**
        * click vào 1 lớp học 
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickItemClass(classId, className){
            this.student.ClassName = className;
            this.student.ClassId = classId;
            this.isShowBoxItemClass = !this.isShowBoxItemClass;
        },
        /**
        * click Btn lựa chọn khối học
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickBtnSelectGrade(){
            this.isShowBoxItemGrade = !this.isShowBoxItemGrade;
        },
        /**
        * click vào 1 giới tính 
        * CreatedBy: TTThiep(10/02/2022)
        */
        clickItemGrade(gradeId, gradeName){
            var m = this;
            m.student.GradeName = gradeName;
            m.student.GradeId = gradeId;
            m.isShowBoxItemGrade = !m.isShowBoxItemGrade;
            m.student.ClassName = null,
            m.student.ClassId = null, 
            /**
             * lấy tất cả lớp học theo khối
             * CreateBy: TTThiep(10/02/2022)
             */
            axios
            .get(`https://www.vnedu.somee.com/api/v1/Classs/GetByGrade/${gradeId}`)
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
        * click Btn hủy
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnCancel(){
           this.isShowStudentInfor = !this.isShowStudentInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowStudentInfor = !this.isShowStudentInfor;
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
                    url: "https://www.vnedu.somee.com/api/v1/Students",
                    data: m.student,
                })
                .then(function (response) {
                    m.student = {};
                    m.m2.loadDataStudent();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Thêm học sinh thành công'
                    eventBus.$emit("TitleToastMessageWas", "Thêm học sinh thành công");
                    m.isShowStudentInfor = !m.isShowStudentInfor;
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
                    url: `https://www.vnedu.somee.com/api/v1/Students/${m.student.StudentId}`,
                    data: m.student,
                })
                .then(function (response) {
                    m.student = {};
                    m.m2.loadDataStudent();
                    // gửi dữ liệu sang component FormToastMessage là 'true'
                    eventBus.$emit("isShowToastMessageWas", true);
                    // gửi dữ liệu sang component FormToastMessage là 'Sửa học sinh thành công'
                    eventBus.$emit("TitleToastMessageWas", "Sửa học sinh thành công");
                    m.isShowStudentInfor = !m.isShowStudentInfor;
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
                url: "https://www.vnedu.somee.com/api/v1/Students",
                data: m.student,
            })
            .then(function (response) {
                m.student = {};
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'Thêm học sinh thành công'
                eventBus.$emit("TitleToastMessageWas", "Thêm học sinh thành công");
                m.m2.loadDataStudent();
                m.$refs.studentcode.focus();
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
        eventBus.$on("isShowStudentInforWas", (isShowStudentInforData) =>{
            m.isShowStudentInfor = isShowStudentInforData;
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
        eventBus.$on("studentWas", (studentData) =>{
            m.student = studentData;
        });
        eventBus.$on("gradesWas", (gradesData) =>{
            m.grades = gradesData;
        });
    },
    updated(){
        var  m = this;
        eventBus.$on("nullWas", (nullData) =>{
            m.student.GenderName = nullData;
            m.student.GradeName = nullData;
            m.student.ClassName = nullData;
        });
    }
}
</script>