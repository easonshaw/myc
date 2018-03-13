<template>
    <div id="dialog-withdraw">
        <el-dialog title="设置提款请求" custom-class="withdraw_dialog" :visible.sync="dialogVisible" :before-close="downApphandleClose"  width="900px" >
            <el-form ref="form"  :model="filterform" label-width="70px">
                <p>用户名称: {{usernickNameText}} </p>
                <p>用户余额: {{accountBalance}} 元</p>                
                <div class="withdraw-imput">
                     <el-form-item label="提款金额">
                        <el-input v-model="filterform.amount" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="充值入口">
                        <el-select v-model="userBankCardId" placeholder="请选择">
                            <el-option v-for="item in withdrawData.bankcardList"  :key="item.userBankCardId" :label="item.bankName" :value="item.userBankCardId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资金密码">
                        <el-input v-model="filterform.pwdFuns" type="password" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item class="floatright">
                        <el-button type="warning" @click="onwithdrawSubmit">立刻取款</el-button>
                    </el-form-item>             
                </div>
            </el-form>
            <table class="table">
                <tr>
                    <td>账户余额：</td>
                    <td><span class="red">{{withdrawData.balance}}</span>元整</td>
                    <td>出款需达投注量：</td>
                    <td><span class="red">{{withdrawData.needDemandAmount}}</span></td>
                </tr>
                <tr>
                   <td>可提领金额：</td>
                    <td><span class="red">{{withdrawData.allowWithdrawBalance}}</span>元</td>
                    <td>已达投注量：</td>
                    <td><span class="red">{{withdrawData.finishedBetAmount}}</span></td>
                </tr>
                <tr>
                    <td>今日已提领金额：</td>
                    <td><span class="red">{{withdrawData.withdrawTotal}}</span>元</td>
                    <td>单笔限额：</td>
                    <td><span class="red">{{withdrawData.oneTimeWithdrawAmountMin}}</span>-<span class="red">{{withdrawData.oneTimeWithdrawAmountMax}}</span>元</td>
                </tr>
                <tr>
                    <td>每日最大提现次数:</td>
                    <td><span class="red">{{withdrawData.withdrawTimes}}</span>次</td>
                    <td>可否出款：</td>
                    <td>{{withdrawData.allowWithdraw ? '可': '否'}}</td>
                </tr>
                <tr>
                    <td>手续说明:</td>
                    <td colspan='3'>{{withdrawData.feeRemark}}</td>
                </tr>
                </table>
        </el-dialog>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getwithdrawData,withdrawSubmit} from '../../service/getData'
    export default {
        data(){
            return{
                filterform:{
                    pwdFuns:'',
                    amount:'',
                },
                withdrawData:{},
                dialogVisible: this.withdrawdialogVisible,
                userBankCardId:""
            }
        },
        mounted(){
            this.getData();
        },
        props: ['withdrawdialogVisible','accountBalance','usernickNameText'],
        methods: {
            downApphandleClose(){
                this.dialogVisible = false;
            },
            //初始化数据
            async getData(){
                let withdrawData = await getwithdrawData();
                if (withdrawData.code==0) {
                    this.withdrawData = withdrawData.result;                    
                }
            },
            //提交提款
            async onwithdrawSubmit(){
                let res = await withdrawSubmit(
                    this.userBankCardId,
                    this.filterform.amount,
                    this.filterform.pwdFuns
                );
                if (res.code!=0) {
                    this.$alert(res.msg, '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
                if (res.code==0) {
                    this.$alert('提现成功', '提示信息', {
                        confirmButtonText: '确定',
                    });
                    // this.withdrawData = withdrawData.result;                    
                }
                // console.log(res);
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
    .red{color: red}
</style>