<template>
    <div class="updateUser">
            <div class="title">新增用户</div>
            <div class="title">返点设置</div>
        {{ this.$route.params.uid }}
    </div>
</template>

<script>
    import {getTeamMemberList} from '../../../service/getData'

    export default {
        data(){
            return{
                filterform: {
                    name: '',
                },
                analysisData: {
                },
            }
        },
        mounted(){
        },
        components:{
        },
        created() {
        },
        computed:{

        },

        methods:{
            async onFilterSubmit() {
                if(this.filterform.start != '' && this.filterform.end != ''){
                    let filterData = await getTeamMemberList(
                    );
                    console.log(filterData)
                    if(filterData.code == 0){
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
