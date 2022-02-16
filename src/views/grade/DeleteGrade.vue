<template>
    <div class="t-dialog" v-show="isShowDeleteGrade">
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
            isShowDeleteGrade: false,
            gradeId: null,
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
            this.isShowDeleteGrade = !this.isShowDeleteGrade;
        },
        /**
         * click Btn có
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnYes(){
            var m = this;
            axios
            .delete(`https://www.vnedu.somee.com/api/v1/Grades/${m.gradeId}`)
            .then(function(response){
                console.log(response);
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'xóa khối học thành công'
                eventBus.$emit("TitleToastMessageWas", "Xóa khối học thành công");
                m.m2.loadDataGrade();
                m.isShowDeleteGrade = !m.isShowDeleteGrade;
            })
            .catch(function(res){
                console.log(res);
            })
        },
    },
    created() {
        var  m = this;
        eventBus.$on("isShowDeleteGradeWas", (isShowDeleteGradeData) =>{
            m.isShowDeleteGrade = isShowDeleteGradeData;
        });
        eventBus.$on("gradeIdWas", (gradeIdData) =>{
            m.gradeId = gradeIdData;
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