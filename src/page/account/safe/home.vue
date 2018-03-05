<template>
    <div class="safehome">
        <div class="">
            <el-progress :stroke-width="10" type="circle" :percentage="safeinfo.iSafeCoefficient"></el-progress>
        </div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getSafeInfo} from '../../../service/getData'
    export default {
        data(){
            return{
                safeinfo: {
                    iSafeCoefficient: 0,
                },
            }
        },
        mounted(){
            this.safeInfo();
        },
        created() {

        },
        watch: {
        },
        computed: {
        },
        components:{
        },
        methods: {
            async safeInfo() {
                let fundPwdData = await getSafeInfo();
                if(fundPwdData.code == 0){
                    this.safeinfo = fundPwdData.result;
                }
            },

        },

    }

</script>

<style lang="scss" scoped>


</style>
