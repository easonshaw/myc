<template>
    <div id="dialog-recharged">
        <el-dialog title="充值处理时间：7*24小时充值服务" custom-class="recharged_dialog" :visible.sync="dialogVisible" :before-close="downApphandleClose"  width="900px" >
            <el-form ref="form"  :model="filterform" label-width="80px">
                <div class="recharged-bank">
                    <div class="inline">选择充值银行</div>
                    <div class="inline">
                        <el-badge class="item">
                        <el-button size="medium">银行</el-button>
                        </el-badge>
                        <el-badge class="item">
                        <el-button size="medium">银行</el-button>
                        </el-badge>
                        <el-badge class="item">
                        <el-button size="medium">银行</el-button>
                        </el-badge>
                        <el-badge class="item">
                        <el-button size="medium">银行</el-button>
                        </el-badge>
                    </div>
                    <p style="color: #D43A42;">提示:如选择银行卡转账,请勿使用其他支付方式,否者充值将无法到账.</p>
                </div>
                <div class="recharged-imput">
                     <el-form-item label="充值入口">
                        <el-input v-model="filterform.rechargeType" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <p>金额限制：单笔金额最低0元整，最高0元整。</p>
                    <el-form-item label="充值金额">
                        <el-input v-model="filterform.amount" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="入款姓名">
                        <el-input v-model="filterform.payeeAccountName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <p>金额大写:元</p>                    
                </div>
                <div class="recharged-foot">
                    <p>注意事项</p>
                    <p>1.平台填写金额应该与网银汇款金额完全一致，否者无法即时到账！</p>
                    <div class="button"><el-button type="danger">立即充值</el-button> <a href="javascript:;">联系客服人员</a></div>
                </div>
            </el-form>
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
                dialogVisible: this.rechargedialogVisible,
                filterform:{
                    amount:0,
                    payeeAccountName:'',
                    bankId:'',
                    rechargeType:'',
                },
            }
        },
    
        props: ['rechargedialogVisible'],
        watch: {
            rechargedialogVisible: function (value){
                this.dialogVisible = this.rechargedialogVisible;
            },
            dialogVisible: function(val) {
                this.$emit("on-recharge-result-change",val);
            },

        },
        methods: {
            downApphandleClose(){
                this.dialogVisible = false;
            }
        }
    }
</script>

<style lang="scss" >
    @import '../../style/style';
</style>