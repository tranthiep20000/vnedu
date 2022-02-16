<template>
    <div class="t-dialog" v-show="isShowDeleteSubject">
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
            isShowDeleteSubject: false,
            subjectId: null,
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
            this.isShowDeleteSubject = !this.isShowDeleteSubject;
        },
        /**
         * click Btn có
         * CreatedBy: TTThiep(28/01/2022)
         */
        clickBtnYes(){
            var m = this;
            axios
            .delete(`https://www.vnedu.somee.com/api/v1/Subjects/${m.subjectId}`)
            .then(function(response){
                console.log(response);
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'xóa môn học thành công'
                eventBus.$emit("TitleToastMessageWas", "Xóa môn học thành công");
                m.m2.loadDataSubject();
                m.isShowDeleteSubject = !m.isShowDeleteSubject;
            })
            .catch(function(res){
                console.log(res);
            })
        },
    },
    created() {
        var  m = this;
        eventBus.$on("isShowDeleteSubjectWas", (isShowDeleteSubjectData) =>{
            m.isShowDeleteSubject = isShowDeleteSubjectData;
        });
        eventBus.$on("subjectIdWas", (subjectIdData) =>{
            m.subjectId = subjectIdData;
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