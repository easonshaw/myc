<template>
    <div class="cont-body">
        <div class="wallet">
            <span class="title">平台钱包</span>
            <div style="padding:0 20px;">
                <p>账户余额: <span> {{balance.cpBlance}} </span></p>
                <el-form ref="form" :inline="true" :model="filterform" label-width="70px">
                    <el-form-item label="资金从">
                        <el-select v-model="filterform.form" placeholder="彩票">
                            <el-option v-for="item in filterform.formlist"  :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="转到">
                        <el-select v-model="filterform.to" placeholder="彩票">
                            <el-option v-for="item in filterform.tolist"  :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="转换金额" >
                        <el-input v-model="filterform.amount" placeholder="请输入内容"></el-input>
                    </el-form-item>
                     <el-form-item label="资金密码" >
                        <el-input v-model="filterform.pwdFuns" type="password" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button type="success"  @click="onExchange">转入</el-button>
                     </el-form-item>
                </el-form>
            </div>
         </div>
         <div class="show-input">
             <div class="left">彩票</div>
             <div class="right">{{balance.cpBlance}}</div>
         </div>
         <div class="show-input">
             <div class="left">AG</div>
             <div class="right">{{balance.agBalance}}</div>
         </div>
    </div>
</template>
<script>
    import {getThirdBalance,exchangeSubmit} from '../../../service/getData'

    export default {
        data(){
            return{
                filterform:{
                    form:'1',
                    formlist:[{
                        value: '1',
                        label: '彩票'
                        }, {
                        value: '2',
                        label: 'AG'
                    }],
                     to:'1',
                    tolist:[{
                        value: '1',
                        label: '彩票'
                        }, {
                        value: '2',
                        label: 'AG'
                    }],
                    pwdFuns:"",
                    amount:""
                },
                balance:{
                        cpBlance:0,
                        agBalance:0
                    }
            }
        },
        mounted () {
            this.getBalances();
        },
        methods:{
            async getBalances(){
                let balance = await getThirdBalance(3,"1.0.0");
                if (balance.code==0) {
                    this.balance = balance.result;
                }
                console.log(balance);
            },
            async onExchange(){
                let res = await exchangeSubmit(
                    this.filterform.form,
                    this.filterform.to,
                    this.filterform.amount,
                    this.filterform.pwdFuns,
                );
                //错误
                if (res.code!=0) {
                     this.$alert(res.msg, '提示信息', {
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$alert(res.msg, '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.cont-body {
    padding: 5px 25px;
}
.cont-body .wallet{
    width: 100%;
    border: 1px solid #ddd;
    background: #FFF;
    border-radius: 3px;
    margin-bottom: 20px;
}
.cont-body .wallet .title {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    color: #FFF;
    background: #0BA7A3;
    display: block;
}
.cont-body .wallet p{
    padding: 10px 20px;;
}
.cont-body .wallet .button{
    margin-left: 50px;
    // background: #0BA7A3;
}
.cont-body  .el-button--success.is-active, .el-button--success:active{
    background: #0BA7A3;
}
.cont-body  .el-button--success{
    background: #0BA7A3;
    width: 120px;
}
.el-select .el-input .el-input__icon{
    top:0px;
}
.show-input{
    width: 30%;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: inline-block;
    margin: 20px 5px;
}
.show-input .left{
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 50px;
    color: #FFF;
   background: #0BA7A3;
}
.show-input .right{
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 50px;
    color: red;
}
</style>
