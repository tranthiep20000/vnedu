<template>
    <div class="t-menu">
        <div class="menu-top">
            <div class="top-logo"></div>
            <div class="top-name"> <span style="color: #5293C7;">vn</span><span style="color:#F2852A">Edu</span></div>
        </div>
        <div v-if="user.DecentralizationId == 3" class="menu-bottom" >
            <router-link style="text-decoration: none;" to="/overview">
                <div class="bottom">
                    <div class="bottom-logo dashboard"></div>
                    <div class="bottom-name">Tổng quan</div>
                </div>
            </router-link>
            <router-link style="text-decoration: none;" to="/studentinformation">
                 <div class="bottom">
                    <div class="bottom-logo student-information"></div>
                    <div class="bottom-name">Thông tin học sinh</div>
                </div>
            </router-link>
            <router-link style="text-decoration: none;" to="/scorelookup">
                <div class="bottom">
                    <div class="bottom-logo point-lookup"></div>
                    <div class="bottom-name">Tra cứu điểm</div>
                </div>
            </router-link>
            <router-link style="text-decoration: none;" to="/changepassword">
                <div class="bottom">
                    <div class="bottom-logo forgot-password"></div>
                    <div class="bottom-name">Đổi mật khẩu</div>
                </div>
            </router-link>
            <router-link style="text-decoration: none;" to="/login">
                 <div class="bottom">
                    <div class="bottom-logo logout"></div>
                    <div class="bottom-name">Đăng xuất</div>
                </div>
            </router-link>
        </div>

        <div v-else class="menu-bottom">
            <router-link style="text-decoration: none;" to="/overview">
                <div class="bottom">
                    <div class="bottom-logo dashboard"></div>
                    <div class="bottom-name">Tổng quan</div>
                </div>
            </router-link>
            <div class="bottom" v-if="user.DecentralizationId == 1">
                <div class="box-menu-bottom" @click="clickBtnGeneral()">
                    <div class="box-left">
                        <div class="bottom-logo general-management"></div>
                        <div class="bottom-name">Quản lý chung</div>
                    </div>
                    <div class="menu-icon-select"></div>
                    <div class="box-option-general" v-show="isShowBoxOptionGeneral">
                        <router-link style="text-decoration: none;" to="/schoolyear">
                            <div class="bottom">
                                <div class="bottom-logo general-management"></div>
                                <div class="bottom-name">Quản lý năm học</div>
                            </div>
                        </router-link>
                        <router-link style="text-decoration: none;" to="/semester">
                            <div class="bottom">
                                <div class="bottom-logo general-management"></div>
                                <div class="bottom-name">Quản lý học kì</div>
                            </div>
                        </router-link>
                        <router-link style="text-decoration: none;" to="/class">
                            <div class="bottom">
                                <div class="bottom-logo general-management"></div>
                                <div class="bottom-name">Quản lý lớp học</div>
                            </div>
                        </router-link>
                        <router-link style="text-decoration: none;" to="/subject">
                            <div class="bottom">
                                <div class="bottom-logo general-management"></div>
                                <div class="bottom-name">Quản lý môn học</div>
                            </div>
                        </router-link>
                        <router-link style="text-decoration: none;" to="/studentclass">
                            <div class="bottom">
                                <div class="bottom-logo general-management"></div>
                                <div class="bottom-name">Phân lớp học cho học sinh</div>
                            </div>
                        </router-link>
                        <router-link style="text-decoration: none;" to="/studentsubject">
                            <div class="bottom">
                                <div class="bottom-logo general-management"></div>
                                <div class="bottom-name">Phân môn học cho học sinh</div>
                            </div>
                        </router-link>
                        <router-link style="text-decoration: none;" to="/decentralization">
                            <div class="bottom">
                                <div class="bottom-logo general-management" ></div>
                                <div class="bottom-name">Quản lý quyền</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <router-link v-if="user.DecentralizationId == 1" style="text-decoration: none;" to="/user">
                <div class="bottom">
                    <div class="bottom-logo student-information"></div>
                    <div class="bottom-name">Quản lý người dùng</div>
                </div>
            </router-link>
            <router-link v-if="user.DecentralizationId == 1" style="text-decoration: none;" to="/student">
                <div class="bottom">
                    <div class="bottom-logo student-information"></div>
                    <div class="bottom-name">Quản lý học sinh</div>
                </div>
            </router-link>
            <router-link style="text-decoration: none;" to="/detailedtablescore">
                <div class="bottom">
                    <div class="bottom-logo point-lookup"></div>
                    <div class="bottom-name">Quản lý điểm</div>
                </div>
            </router-link>
            <router-link style="text-decoration: none;" to="/changepassword">
                <div class="bottom">
                    <div class="bottom-logo forgot-password"></div>
                    <div class="bottom-name">Đổi mật khẩu</div>
                </div>
            </router-link>
            <router-link style="text-decoration: none;" to="/login">
                 <div class="bottom">
                    <div class="bottom-logo logout"></div>
                    <div class="bottom-name">Đăng xuất</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            isShowBoxOptionGeneral: false,
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        /**
         * click vào quản lý chung
         * CreatedBy: TTThiep(27/01/2022)
         */
        clickBtnGeneral(){
            this.isShowBoxOptionGeneral = !this.isShowBoxOptionGeneral;
        }
    },
}
</script>