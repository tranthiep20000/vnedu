<template>
    <div class="t-schoolyear">
        <div class="header-schoolyear">
            <div class="header-name">Thông tin học sinh</div>
            <div class="header-btn-insert" @click="clickBtnInsert()">Thêm học sinh mới</div>
        </div>
        <div class="box-search box-filter">
            <div class="box-input-text input-student">
                <input type="text" class="input-text" placeholder="Tìm kiếm theo mã học sinh, tên học sinh">
                <div class="box-icon-search">
                    <div class="icon-search"></div>
                </div>
            </div>
        </div>
        <div class="between-schoolyear table-user">
            <table class="m-table" border="1">
                <thead>
                    <tr>
                        <th class="text-align-center" style="width: 50px">STT</th>
                        <th class="text-align-left" style="width: 100px">Mã học sinh</th>
                        <th class="text-align-left">Tên học sinh</th>
                        <th class="text-align-center" style="width: 80px">Giới tính</th>
                        <th class="text-align-center" style="width: 90px">Ngày sinh</th>
                        <th class="text-align-center" style="width: 110px">Số điện thoại</th>
                        <th class="text-align-left" >Địa chỉ</th>
                        <th class="text-align-center" style="width: 120px">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student,i) in students" :key="student.StudentId">
                        <th class="text-align-center">{{++i}}</th>
                        <th class="text-align-left">{{student.StudentCode}}</th>
                        <th class="text-align-left">{{student.FullName}}</th>
                        <th class="text-align-center">{{FomatGender(student.Gender)}}</th>
                        <th class="text-align-center">{{FomatDate(student.DateOfBirth)}}</th>
                        <th class="text-align-center">{{student.PhoneNumber}}</th>
                        <th class="text-align-left">{{student.Address}}</th>
                        <th class="text-align-center">
                            <div class="box-function">
                                <div class="btn-edit" @click="clickBtnEdit(student.StudentId)"></div>
                                <div class="btn-delete" @click="clickBtnDelete(student.StudentId, student.StudentCode)"></div>
                            </div>
                        </th>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="bottom-schoolyear box-type-paging">
            <div class="box-sum">Tổng số: {{students.length}} bản ghi</div>
            <div class="box-paging"></div>
            <div class="box-size">
                <input type="text" class="box-size-input" readonly :value="pagename">
                <div class="box-select-size" @click="clickBtnSelectSize()">
                    <div class="icon-size"></div>
                </div>
                <div class="box-size-item" v-show="isShowBoxItemSize">
                    <div v-for="page in pages" :key="page.index" class="item-size" @click="clickItemSize(page.name)">{{page.name}}</div>
                </div>
            </div>
        </div>
       <student-infor></student-infor>
       <delete-student></delete-student>
    </div>
</template>
<script>
import axios from 'axios'
import { eventBus } from '../../main'
import StudentInfor from './StudentInfor.vue'
import DeleteStudent from './DeleteStudent.vue'
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
  components: { StudentInfor, DeleteStudent },

    data() {
        return {
            students: [],
            pages: [
                {
                    index: 10,
                    name: "10 bản ghi trên 1 trang"
                },
                {
                    index: 20,
                    name: "20 bản ghi trên 1 trang"
                },
                {
                    index: 30,
                    name: "30 bản ghi trên 1 trang"
                },
                {
                    index: 50,
                    name: "50 bản ghi trên 1 trang"
                },
                {
                    index: 100,
                    name: "100 bản ghi trên 1 trang"
                }
            ],
            pagename: "10 bản ghi trên 1 trang",
            isShowBoxItemSize: false,
            isShowBoxItemGrade: false,
            isShowBoxItemClass: false,
            grades: [],
            classs: [],
            gradename: null,
            classname: null,
        }
    },
    computed:{
        ...mapGetters(['URLAPI']),
    },
    methods: {
        /**
         * Định dạng lại ngày sinh để hiển thị 
         * CreatedBy: TTThiep (09/02/2022)
         */
        FomatDate(value){
            if (value){
                return moment(String(value)).format('DD-MM-YYYY');
            }
        },
        /**
         * Định dạng lại giới tính 
         * CreatedBy: TTThiep (09/02/2022)
         */
        FomatGender(value){
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
         * click vào btn hiện box size
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnSelectSize(){
            this.isShowBoxItemSize = !this.isShowBoxItemSize;
        },
        /**
         * click vào chọn số bản ghi trên 1 trang
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickItemSize(name){
            this.isShowBoxItemSize = !this.isShowBoxItemSize;
            this.pagename = name;
        },
        /**
         * click vào btn thêm mới người dùng
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnInsert(){
            eventBus.$emit("isShowBtnSaveAndInsertWas", true);
            eventBus.$emit("isShowStudentInforWas", true);
            eventBus.$emit('formodWas', "add");
            eventBus.$emit('thisWas', this);
            eventBus.$emit('studentWas', {});
            eventBus.$emit('gradesWas', this.grades);
             eventBus.$emit('nullWas', null);
        },
        /**
         * Lấy tất cả học sinh
         * CreatedBy: TTThiep(08/02/2022)
         */
        loadDataStudent(){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Students`)
            .then(function(response){
                if(response && response.data)
                {
                    m.students = response.data;
                }
            })
            .catch(function(res){
                console.log(res);
            });
        },
        /**
         * click btn sửa
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnEdit(studentId){
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Students/${studentId}`)
            .then(function (response){
                if(response && response.data)
                { 
                    eventBus.$emit('studentWas', response.data);
                } 
            })
            .catch(function (res){
                console.log("api lỗi" + res);
            });
            eventBus.$emit("isShowStudentInforWas", true);
            eventBus.$emit("isShowBtnSaveAndInsertWas", false);
            eventBus.$emit('formodWas', "edit");
            eventBus.$emit('thisWas', this);
        },
        /**
         * click btn xóa
         * CreatedBy: TTThiep(08/02/2022)
         */
        clickBtnDelete(studentId, studentCode){
            eventBus.$emit('thisWas', this);
            eventBus.$emit("isShowDeleteStudentWas", true);
            eventBus.$emit("studentIdWas", studentId);
            eventBus.$emit("titlenameWas", `bạn có thực sự muốn xóa học sinh có mã ${studentCode} không?`);
        },
    },
    created() {
        var m = this;
        m.loadDataStudent();
    },
    
}
</script>