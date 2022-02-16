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
            <div class="name-changepassword">Ngày sinh</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="FomatDate(student.DateOfBirth)">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Giới tính</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="fomatGender(student.Gender)">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Số điện thoại</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="student.PhoneNumber">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Khối</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="student.GradeName">
        </div>
        <div class="box-input-changepassword">
            <div class="name-changepassword">Lớp</div>
            <input id="phonenumber" class="input-changepassword" type="text" readonly :value="student.ClassName">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
          
        }
    },
    computed:{
        ...mapGetters(['student']),
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
    },

}
</script>
