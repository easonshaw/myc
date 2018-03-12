<template>
    <div id="dialog-recharged">
        <el-dialog title="充值处理时间：7*24小时充值服务" custom-class="recharged_dialog" :visible.sync="dialogVisible" :before-close="downApphandleClose"  width="900px" >
            <el-form ref="form"  :model="filterform" label-width="80px">
                <div class="recharged-bank">
                    <div class="inline">选择充值银行</div>
                    <div class="inline">
                        <div class="bank" v-for="item in payWays" @click="activeFun(item)" :class="item.isActive ? 'bank-selected':''">
                            <img :src="item.platformLogo" alt="">
                            <div class="inline">{{item.rechargeName}}</div>
                        </div>
                    </div>
                    <p class="prompt"><img src="../../images/recharged5.png" alt=""> 提示:如选择银行卡转账,请勿使用其他支付方式,否者充值将无法到账.</p>
                </div>
                <div class="recharged-imput">
                     <el-form-item label="充值入口" v-show="isBank">
                        <el-input v-model="filterform.rechargeType" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <p>金额限制：单笔金额最低{{bankData.bankList[0].onetimeRechargeAmountMin}}元整，最高{{bankData.bankList[0].onetimeRechargeAmountMax}}元整。</p>
                    <el-form-item label="充值金额">
                        <el-input v-model="filterform.amount" @input="amountChange" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <div class="inline">元 <span class="red">*第三方充值手续费 0.1%</span></div>
                    <el-form-item label="入款姓名" v-show="isBank">
                        <el-input v-model="filterform.payeeAccountName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <div class="inline" v-show="isBank"><span class="red">*入款姓名必须与付款姓名一致</span></div>
                    <p>金额大写: {{bigAmount}} 元</p>                    
                </div>
                <div class="recharged-foot">
                    <p>注意事项</p>
                    <p>1.平台填写金额应该与网银汇款金额完全一致，否者无法即时到账！</p>
                    <div class="button"><el-button type="danger" @click="onFilterSubmit">立即充值</el-button> <a href="javascript:;">联系客服人员</a></div>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getPayWays,submitOnline,submitOffline} from '../../service/getData'
    export default {
        data(){
            return{
                dialogVisible: this.rechargedialogVisible,
                payWays:[],
                filterform:{
                    amount:"",
                    payeeAccountName:'',
                    rechargeType:'',
                },
                bankData:null,
                bigAmount:'',
                isBank:true,
            }
        },
        created() {
            this.getpays();
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
            //关闭对话框
            downApphandleClose(){
                this.dialogVisible = false;
            },
            //选择支付方式
            activeFun(data){
                this.payWays.forEach(element => {
                    element.isActive = false;
                });
                data.isActive = !data.isActive;
                this.bankData = data;             
                if (data.rechargeName=='网银汇款') {
                    this.isBank = true;
                }else{
                    this.isBank = false;                    
                }
            },
            //获取支付方式
            async getpays(){
                let payWays = await getPayWays(3,"1.0.0");
                if (payWays.code==0) {
                    payWays.result.forEach(data => {
                        //默认选中网银汇款
                        data.isActive = data.rechargeName=='网银汇款' ? true : false;
                        if (data.rechargeName=='网银汇款') {
                            this.bankData =data;
                        }
                    });
                    this.payWays = payWays.result;
                    console.log(payWays);
                }
            },
            //大写金额转化
            amountChange(){
                var n = this.filterform.amount;
                if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)){
                    n = "零";
                }else{
                    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
                        n += "00";
                    var p = n.indexOf('.');
                    if (p >= 0)
                        n = n.substring(0, p) + n.substr(p+1, 2);
                        unit = unit.substr(unit.length - n.length);
                    for (var i=0; i < n.length; i++)
                        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
                    n= str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
                }
                this.bigAmount = n;
            },
            //提交表单
            onFilterSubmit(){
                if (this.bankData.rechargeName=='网银汇款' || this.bankData.rechargeName=='支付宝转账') {
                    //线下充值
                    this.offline();
                }else{
                    //第三方充值
                    this.online();
                }
            },
            //请求第三方充值接口
            async online(){
                //接口请求数据
                let res = await submitOnline(
                    this.bankData.merchantId,
                    this.bankData.platformName,
                    this.bankData.bankList[0].bankId,
                    this.bankData.bankList[0].bankName,
                    this.filterform.amount
                );
                console.log(res);
                //错误
                if (res.code!=0) {
                    this.$alert(res.msg, '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
                //成功
                if(res.code == 0){
                     
                }
            },
            //请求线下充值接口
            async offline(){
                //接口请求数据
                let res = await submitOffline(
                    this.filterform.rechargeType,
                    this.bankData.bankList[0].bankId,
                    this.filterform.amount,                        
                    this.filterform.payeeAccountName,
                );
                //错误
                if (res.code!=0) {
                    this.$alert(res.msg, '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
                //成功
                if(res.code == 0){
                     
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../style/style';
    #dialog-recharged .bank{
        width: 130px;height: 45px;border-radius: 5px;
        border: 1px solid #ddd;
        display: inline-block;
        vertical-align:middle;
        margin: 10px 5px;
        padding: 5px 8px;
    }
    #dialog-recharged .bank img{
        height: 30px;
        vertical-align:middle;
        margin-right: 10px;
    }
    #dialog-recharged .bank-selected{
        background: url('../../images/bank.png') no-repeat;
        background-size:100% 100%;
        border:none;
    }
    #dialog-recharged .prompt{
        padding-left: 50px;
       color: #D43A42;
       margin-bottom: 10px;
    }
    #dialog-recharged .prompt img{
        height: 25px;
       vertical-align: middle;
       margin-right: 10px;
    }
    #dialog-recharged .inline .red{
        color:#C7000B;
        margin-left: 15px;
    }
</style>