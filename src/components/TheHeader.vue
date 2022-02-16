<template>
    <div class="t-header">
        <div class="box-header">
            <div class="box-header-name">{{student.FullName}}</div>
            <div class="box-name-permission">{{student.DecentralizationName}}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        ...mapGetters(['student']),
    },
   
}
</script>