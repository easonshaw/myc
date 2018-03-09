<template>
    <div id="dialog-transfer">
        <el-dialog  custom-class="dialog_transfer" :visible.sync="dialogVisible" :before-close="downApphandleClose"  width="1000px" >
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="额度转换" name="first">
                <quota></quota>
            </el-tab-pane>
            <el-tab-pane label="发放转点" name="second">
                <transferPoint></transferPoint>
            </el-tab-pane>
            <el-tab-pane label="转换记录" name="third">
                <transferRecord></transferRecord>
            </el-tab-pane>
            <el-tab-pane label="转点记录" name="fourth">
                <pointRecord></pointRecord>
            </el-tab-pane>
        </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser} from '../../service/getData'
    import quota from 'src/components/common/transfer/quota.vue'
    import transferPoint from 'src/components/common/transfer/transferPoint.vue'
    import transferRecord from 'src/components/common/transfer/transferRecord.vue'
    import pointRecord from 'src/components/common/transfer/pointRecord.vue'
    
    export default {
        data(){
            return{
                dialogVisible: this.transferdialogVisible,
                activeName2: 'first',
            }
        },
        components:{
            quota,//额度转换
            transferPoint,//发放转点
            transferRecord,//转换记录
            pointRecord,//转点记录
        },
        props: ['transferdialogVisible'],
        watch: {
            transferdialogVisible: function (value){
                this.dialogVisible = this.transferdialogVisible;
            },
            dialogVisible: function(val) {
                this.$emit("on-transfer-result-change",val);
            },
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            downApphandleClose(){
                this.dialogVisible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>