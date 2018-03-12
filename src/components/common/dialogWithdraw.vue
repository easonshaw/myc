<template>
    <div id="dialog-withdraw">
        <el-dialog title="设置提款请求" custom-class="withdraw_dialog" :visible.sync="dialogVisible" :before-close="downApphandleClose"  width="900px" >
            <el-form ref="form"  :model="filterform" label-width="70px">
                <p>用户名称:嘻嘻嘻嘻</p>
                <p>用户余额:00元</p>                
                <div class="withdraw-imput">
                     <el-form-item label="提款金额">
                        <el-input v-model="filterform.billNo" placeholder="请输入内容"></el-input>
                    </el-form-item>
                     <el-form-item label="充值入口">
                        <el-input v-model="filterform.billNo" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="资金密码">
                        <el-input v-model="filterform.password" type="password" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item class="floatright">
                        <el-button type="warning">立刻取款</el-button>
                    </el-form-item>             
                </div>
            </el-form>
            <table class="table">
                <tr>
                    <td>账户余额</td>
                    <td>3.45元整</td>
                    <td>出款需达投注量：</td>
                    <td>3.45元整</td>
                </tr>
                <tr>
                   <td>账户余额</td>
                    <td>3.45元整</td>
                    <td>出款需达投注量：</td>
                    <td>3.45元整</td>
                </tr>
                <tr>
                    <td>账户余额</td>
                    <td>3.45元整</td>
                    <td>出款需达投注量：</td>
                    <td>3.45元整</td>
                </tr>
                <tr>
                    <td>账户余额</td>
                    <td>3.45元整</td>
                    <td>出款需达投注量：</td>
                    <td>3.45元整</td>
                </tr>
                <tr>
                    <td>出款须达打码量：</td>
                    <td colspan='3'>eeeeeeeeeeeeee</td>
                </tr>
                </table>
        </el-dialog>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser} from '../../service/getData'
    export default {
        data(){
            return{
                filterform:{
                    password:'',
                },
                dialogVisible: this.withdrawdialogVisible,
            }
        },
        mounted(){

        },
        props: ['withdrawdialogVisible'],
        methods: {
            downApphandleClose(){
                this.dialogVisible = false;
            }
        },
        watch: {
            withdrawdialogVisible: function (value){
                this.dialogVisible = this.withdrawdialogVisible;
            },
            dialogVisible: function(val) {
                this.$emit("on-withdraw-result-change",val);
            },

        }
    }
</script>

<style lang="scss" scoped>

</style>