<template>
    <div class="t-dialog" v-show="isShowDeleteSchoolYear">
        <div class="m-form">
            <div class="form-title">
                <div class="title-icon"></div>
                <div class="title-name">{{titleName}}</div>
            </div>
            <div class="form-btn">
                <div class="form-btn-cancle" @click="clickBtnNo()">Không</div>
                <div class="form-btn-delete" @click="clickBtnYes()">Có</div>
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
            isShowDeleteSchoolYear: false,
            schoolyearId: null,
            titleName: null,
            m2: null,
        }
    },
    methods: {
        /**
         * click Btn không
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnNo(){
            this.isShowDeleteSchoolYear = !this.isShowDeleteSchoolYear;
        },
        /**
         * click Btn có
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnYes(){
            var m = this;
            axios
            .delete(`https://www.vnedu.somee.com/api/v1/SchoolYears/${m.schoolyearId}`)
            .then(function(response){
                console.log(response);
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'xóa năm học thành công'
                eventBus.$emit("TitleToastMessageWas", "Xóa năm học thành công");
                m.m2.loadDataSchoolYear();
                m.isShowDeleteSchoolYear = !m.isShowDeleteSchoolYear;
            })
            .catch(function(res){
                console.log(res);
            })
        },
    },
    created() {
        var  m = this;
        eventBus.$on("isShowDeleteSchoolYearWas", (isShowDeleteSchoolYearData) =>{
            m.isShowDeleteSchoolYear = isShowDeleteSchoolYearData;
        });
        eventBus.$on("schoolyearIdWas", (schoolyearIdData) =>{
            m.schoolyearId = schoolyearIdData;
        });
        eventBus.$on("titlenameWas", (titlenameData) =>{
            m.titleName = titlenameData;
        });
        eventBus.$on("thisWas", (thisData) =>{
            m.m2 = thisData;
        });
    },
}
</script>