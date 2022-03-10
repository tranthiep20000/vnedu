<template>
    <div class="t-dialog" v-show="isShowDetailedTableScoreInfor">
         <div class="t-schoolyearinfor" >
            <div class="box-x" @click="clickBtnX()">
                <div class="icon-x"></div>
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm miệng lần 1</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm miệng lần 1" v-model="detailedtablescore.FirstOralScore">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm miệng lần 2</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm miệng lần 2" v-model="detailedtablescore.SecondOralScore">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm miệng lần 3</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm miệng lần 3" v-model="detailedtablescore.ThirdOralScore">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm 15 phút lần 1</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm 15 phút lần 1" v-model="detailedtablescore.First15minutesScore">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm 15 phút lần 2</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm 15 phút lần 2" v-model="detailedtablescore.Second15minutesScore">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm 15 phút lần 3</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm 15 phút lần 3" v-model="detailedtablescore.Third15minutesScore">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm 1 tiết</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm 1 tiết" v-model="detailedtablescore.OnePeriodScore">
            </div>
            <div class="box-schoolyearinfor-top">
                <div class="schoolyearinfor-name">Nhập điểm cuối kì</div>
                <input ref="administrationcode" type="text" class="schoolyearinfor-input" placeholder="Nhập điểm cuối kì" v-model="detailedtablescore.FinalScore">
            </div>
            <div class="box-schoolyearinfor-bottom">
                <div class="box-schoolyearinfor-cancle" @click="clickBtnCancel()">Hủy</div>
                <div class="box-btn-schoolyearinfor">
                    <div class="box-schoolyearinfor-save" @click="clickBtnSave()">Lưu</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { eventBus } from '../../main'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            isShowDetailedTableScoreInfor: false,
            detailedtablescore: {},
            m2: null,
        }
    },
    computed: {
        ...mapGetters(['URLAPI', 'user']),
    },
    methods: {
       /**
        * click Btn hủy
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnCancel(){
           this.isShowDetailedTableScoreInfor = !this.isShowDetailedTableScoreInfor;
       },
       /**
        * click Btn X
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnX(){
           this.isShowDetailedTableScoreInfor = !this.isShowDetailedTableScoreInfor;
       },
       /**
        * click Btn lưu
        * CreatedBy: TTThiep(28/01/2022)
        */
       clickBtnSave()
       {
            var m = this;
            m.detailedtablescore.ModifiedBy = m.user.UserName;
            axios({
                method: "put",
                url: `${m.URLAPI}/api/v1/DetailedTableScores/${m.detailedtablescore.DetailedTableScoreId}`,
                data: m.detailedtablescore,
            })
            .then(function (response) {
                m.detailedtablescore = {};
                m.m2.loadDataScore();
                // gửi dữ liệu sang component FormToastMessage là 'true'
                eventBus.$emit("isShowToastMessageWas", true);
                // gửi dữ liệu sang component FormToastMessage là 'cập nhật điểm thành công'
                eventBus.$emit("TitleToastMessageWas", "Cập nhật điểm thành công");
                m.isShowDetailedTableScoreInfor = !m.isShowDetailedTableScoreInfor;
                console.log(response);
            })
            .catch(function (error) {
                // gửi dữ liệu đến component FormWaning là 'true'
                eventBus.$emit("isShowFormWaningWas", true);
                // gửi dữ liệu đến component FormWaning 
                eventBus.$emit("errorWas", error.response.data.data.userMsg);
            });
       },
    },
    created() {
        var  m = this;
        eventBus.$on("isShowDetailedTableScoreInforWas", (isShowDetailedTableScoreInforData) =>{
            m.isShowDetailedTableScoreInfor = isShowDetailedTableScoreInforData;
        });
        eventBus.$on("thisWas", (thisData) =>{
            m.m2 = thisData;
        });
        eventBus.$on("detailedTableScoreIdWas", (detailedTableScoreIdData) =>{
            m.detailedtablescore.DetailedTableScoreId = detailedTableScoreIdData;
        });
         eventBus.$on("detailedtablescoreWas", (detailedtablescoreData) =>{
            m.detailedtablescore = detailedtablescoreData;
        });
    },
}
</script>