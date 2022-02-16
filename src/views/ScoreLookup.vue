<template>
    <div class="t-scorelookup">
        <div class="header-scorelookup">
            <div class="box-scorelookup">
                <div class="combobox-scorelookup">
                    <div class="name-combobox">Chọn năm học</div>
                    <div class="box-combobox">
                        <div class="box-combobox-header" @click="clickBtnDownSchoolYear()">
                            <input class="input-data" type="text" readonly="true" :value="schoolyearName">
                            <div class="box-icon">
                                <div class="icon-down"></div>
                            </div>
                        </div>
                        <div class="box-combobox-content" v-show="isShowSelectSchoolYear">
                            <div v-for="schoolyear in schoolyears" :key="schoolyear.SchoolYearId" class="item-combobox" @click="clickItemSelectSchoolYear(schoolyear.SchoolYearId, schoolyear.SchoolYearName)">{{schoolyear.SchoolYearName}}</div>
                        </div>
                    </div>
                </div>
                <div class="combobox-scorelookup">
                    <div class="name-combobox">Chọn học kì</div>
                    <div class="box-combobox">
                        <div class="box-combobox-header" @click="clickBtnDownSemester()">
                            <input class="input-data" type="text" readonly="true" :value="semesterName">
                            <div class="box-icon">
                                <div class="icon-down"></div>
                            </div>
                        </div>
                        <div class="box-combobox-content" v-show="isShowSelectSemester">
                            <div v-for="semester in semesters" :key="semester.SemesterId" class="item-combobox" @click="clickItemSelectSemester(semester.SemesterId, semester.SemesterName)">{{semester.SemesterName}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-see">
                <button class="btn-see" @click="clickBtnSee()">Xem</button>
            </div>
        </div>
        <div class="loading-score" v-show="isShowLoading">
           <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="bottom-scorelookup" v-show="isShowScore">
            <table class="m-table" border="1">
                <thead>
                    <tr>
                        <th class="text-align-left">TÊN MÔN HỌC</th>
                        <th class="text-align-center" style="width: 120px">ĐIỂM MIỆNG</th>
                        <th class="text-align-center" style="width: 120px">ĐIỂM 15 PHÚT</th>
                        <th class="text-align-center" style="width: 120px">ĐIỂM 1 TIẾT</th>
                        <th class="text-align-center" style="width: 120px">ĐIỂM HỌC KÌ</th>
                        <th class="text-align-center" style="width: 200px">ĐIỂM TRUNG BÌNH MÔN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="score in scores" :key="score.SubjectId">
                        <th class="text-align-left">{{score.SubjectName}}</th>
                        <th class="text-align-center">{{score.ScoreOral}}</th>
                        <th class="text-align-center">{{score.Score15Minutes}}</th>
                        <th class="text-align-center">{{score.Score1Period}}</th>
                        <th class="text-align-center">{{score.ScoreFinal}}</th>
                        <th v-if="score.ScoreAverage == null" class="text-align-center"></th>
                        <th v-else class="text-align-center">{{(score.ScoreAverage).toFixed(2)}}</th>
                    </tr>
                </tbody>
            </table>
            <div class="box-score">
                <div class="score-name">{{titleSemester}}</div>
                <div v-if="semesterSum == null" class="score-medium"></div>
                <div v-else class="score-medium">{{(semesterSum/13).toFixed(2)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { eventBus } from '../main';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    components:{
        PulseLoader
    },
    data() {
        return {
            isShowSelectSemester: false,
            isShowSelectSchoolYear: false,
            schoolyears: [
               
            ],
            semesters: [
               
            ],
            semesterName: null,
            semesterId: null,
            schoolyearName: null,
            schoolyearId: null,
            scores: [

            ],
            semesterSum: 0,
            isShowLoading: false,
            isShowScore: false,
            titleSemester: null,
        }
    },

    computed:{
        ...mapGetters(['student']),
    },
    methods: {
        /**
         * click vào btn down gender
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnDownSemester(){
            this.isShowSelectSemester = !this.isShowSelectSemester;
        },

        /**
         * click vào item gender
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickItemSelectSemester(semesterId, semesterName)
        {
            this.isShowSelectSemester = !this.isShowSelectSemester;
            this.semesterName = semesterName;
            this.semesterId = semesterId;
        },
        /**
         * click vào btn down gender
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickBtnDownSchoolYear(){
            this.isShowSelectSchoolYear = !this.isShowSelectSchoolYear;
        },

        /**
         * click vào item gender
         * CreatedBy: TTThiep(11/01/2022)
         */
        clickItemSelectSchoolYear(schoolyearId, schoolyearName)
        {
            this.isShowSelectSchoolYear = !this.isShowSelectSchoolYear;
            this.schoolyearName = schoolyearName;
            this.schoolyearId = schoolyearId;
        },

        /**
         * lấy tất cả năm học
         * CreatedBy: TTThiep(25/01/2022)
         */
        getDataSchoolYear(){
            var m = this;
            axios
            .get('https://www.vnedu.somee.com/api/v1/SchoolYears')
            .then(function (response){
                if(response && response.data)
                { 
                   m.schoolyears = response.data;
                }
            })
            .catch(function (res){
                console.log(res);
            });
        },

        /**
         * lấy tất cả học kì
         * CreatedBy: TTThiep(25/01/2022)
         */
        getDataSemester(){
            var m = this;
            axios
            .get('https://www.vnedu.somee.com/api/v1/Semesters')
            .then(function (response){
                if(response && response.data)
                { 
                   m.semesters = response.data;
                }
            })
            .catch(function (res){
                console.log(res);
            });
        },
        /**
         * click vào btn xem
         * CreatedBy: TTThiep(25/01/2022)
         */
        clickBtnSee(){
            var m = this;
            if(m.schoolyearId == null || m.schoolyearId == "")
            {
                eventBus.$emit("isShowFormWaningWas", true);
                eventBus.$emit("errorWas", "Vui lòng chọn năm học cần xem");
            }
            else if(m.semesterId == null || m.semesterId == "")
            {
                eventBus.$emit("isShowFormWaningWas", true);
                eventBus.$emit("errorWas", "Vui lòng chọn học kì cần xem");
            }
            else{
                m.isShowScore = !m.isShowScore;
                m.isShowLoading = !m.isShowLoading;
                axios
                .get(`https://www.vnedu.somee.com/api/v1/DetailedTableScores/getScoreInformation?StudentId=${m.student.StudentId}&SchoolYearId=${m.schoolyearId}&SemesterId=${m.semesterId}`)
                .then(function (response){
                    if(response && response.data)
                    { 

                        m.semesterSum = 0;
                        m.scores = response.data;
                        if(m.semesterId == 1)
                        {
                            m.titleSemester = "TRUNG BÌNH HỌC KÌ I";
                        }
                        else if(m.semesterId == 2)
                        {
                            m.titleSemester = "TRUNG BÌNH HỌC KÌ II";
                        }
                        for (const i of m.scores) {
                            if(i.ScoreFinal == null)
                            {
                                m.semesterSum = null;
                                break;
                            }
                            else
                            {
                                m.semesterSum += Number(i.ScoreFinal);
                            }
                        }
                        m.isShowLoading = false;
                        m.isShowScore = true;
                        eventBus.$emit("isShowToastMessageWas", true);
                        eventBus.$emit("TitleToastMessageWas", "Xem điểm thành công");
                    }
                })
                .catch(function (res){
                    console.log(res);
                });
            }
        }
    },

    created() {
        var m = this;
        m.getDataSchoolYear();
        m.getDataSemester();
    },
}
</script>