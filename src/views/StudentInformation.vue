<template>
    <div class="box-infor">
        <div class="header-infor">Thông tin cá nhân</div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Mã học sinh</div>
            <input class="input-changepassword" type="text" readonly :value="student.StudentCode">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Tên học sinh</div>
            <input ref="fullname" id="fullname" class="input-changepassword" type="text" readonly :value="student.FullName">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Giới tính</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="fomatGender(student.Gender)">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Ngày sinh</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="FomatDate(student.DateOfBirth)">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Số điện thoại</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="student.PhoneNumber">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Địa chỉ</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="student.Address">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
            student: {}
        }
    },
    computed:{
        ...mapGetters(['user', 'URLAPI']),
    },
    methods: {
         /**
         * Định dạng lại giới tính 
         * CreatedBy: TTThiep (25/01/2022)
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
         * CreatedBy: TTThiep (25/01/2022)
         */
        FomatDate(value){
            if (value){
                return moment(String(value)).format('DD-MM-YYYY');
            }
        },

        /**
         * Lấy thông tin của một student
         * CreatedBy: TTThiep (07/03/2022)
         */
        LoadDataInformationStudent()
        {
            var m = this;
            axios
            .get(`${m.URLAPI}/api/v1/Students/GetInformationByPhonenumber?PhoneNumber=${m.user.PhoneNumber}`)
            .then(function (response){
                if(response && response.data)
                { 
                   m.student = response.data;
                }
            })
            .catch(function (res){
                console.log(res);
            });
        }
    },
    created() {
        var m = this;
        m.LoadDataInformationStudent();
    }

}
</script>
