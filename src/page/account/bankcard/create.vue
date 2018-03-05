<template>
    <div class="bankcard">
        <!--增加银行卡-->
        <div class="bankcardsform"  >
            <div v-if="saveFormStatus" class="saveInfo">
                <div class="formitem"><label></label> <div class="savevalue"><img :src="selbank.logoFilePath" /></div></div>
                <div class="formitem"><label>昵   称：</label> <div class="savevalue">{{nickname}}</div></div>
                <div class="formitem"><label>开户银行：</label> <div class="savevalue">{{selbank.name}}</div></div>
                <div class="formitem"><label>开户地区：</label> <div class="savevalue">{{bankcardform.branchAddress}}</div></div>
                <div class="formitem"><label>支行名称：</label> <div class="savevalue">{{bankcardform.branchName}}</div></div>
                <div class="formitem" v-if="isfirstCard"><label>开户人姓名：</label> <div class="savevalue">{{bankcardform.cardUser}}</div></div>
                <div class="formitem"><label>银行卡号：</label> <div class="savevalue">{{bankcardform.cardNo}}</div></div>
                <div class="formitem">
                    <label></label>
                    <div class="savevalue"><el-button type="danger" @click="onBankInfoSaveSubmit">提   交</el-button>
                        <el-button type="info" @click="saveFormStatus = false">返   回</el-button>
                    </div>
                </div>
            </div>
            <el-form v-else ref="bankcardform" :model="bankcardform" label-width="80px">
                <div class="formitem">
                    <label><span class="red">*</span>开户行：</label>
                    <el-select :change="vaildateBankForm('bankid')" size="" v-model="bankcardform.bankid" filterable placeholder="请选择或者搜索关键字">
                        <el-option
                                v-for="(item, key, index) in banksList"
                                :key="key"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="errTip">{{bankcardformerr.bankidErr}}</span>
                </div>
                <div class="formitem">
                    <label><span class="red">*</span>开户地区：</label>
                    <area-cascader  :change="vaildateBankForm('selArea')" type='text'   v-model="selArea"  :level='1'></area-cascader>
                    <span class="errTip">{{bankcardformerr.branchAddressErr}}</span>
                </div>
                <div class="formitem">
                    <label ><span class="red">*</span>支行名称：</label>
                    <el-form-item label="">
                        <el-input :blur="vaildateBankForm('branchName')" v-model="bankcardform.branchName"></el-input>
                    </el-form-item>
                    <span class="errTip">{{bankcardformerr.branchNameErr}}</span>
                </div>
                <div class="formitem" v-if="isfirstCard">
                    <label ><span class="red">*</span>开户人姓名：</label>
                    <el-form-item label="">
                        <el-input :blur="vaildateBankForm('cardUser')" v-model="bankcardform.cardUser"></el-input>
                    </el-form-item>
                    <span class="errTip">{{bankcardformerr.cardUserErr}}</span>
                </div>
                <div class="formitem">
                    <label ><span class="red">*</span>银行卡号：</label>
                    <el-form-item label="">
                        <el-input :blur="vaildateBankForm('cardNo')" v-model="bankcardform.cardNo"></el-input>
                    </el-form-item>
                    <span class="errTip">{{bankcardformerr.cardNoErr}}</span>
                </div>
                <div class="formitem">
                    <label ><span class="red">*</span>确认银行卡号：</label>
                    <el-form-item label="">
                        <el-input :blur="vaildateBankForm('recardNo')" v-model="bankcardform.recardNo"></el-input>
                    </el-form-item>
                    <span class="errTip">{{bankcardformerr.recardNoErr}}</span>
                </div>
                <div class="formitem">
                    <label ><span class="red">*</span>资金密码：</label>
                    <el-form-item label="">
                        <el-input :blur="vaildateBankForm('fundsPwd')" v-model="bankcardform.fundsPwd"></el-input>
                    </el-form-item>
                    <span class="errTip">{{bankcardformerr.fundsPwdErr}}</span>
                </div>
                <div class="formitem" v-if="!isfirstCard">
                    <label ><span class="red">*</span>第一张银行卡：</label>
                    <el-form-item label="">
                        <el-input :blur="vaildateBankForm('firstCardNo')" v-model="bankcardform.firstCardNo"></el-input>
                    </el-form-item>
                    <span class="errTip">{{bankcardformerr.firstCardNoErr}}</span>
                </div>
                <div class="formitem">
                    <el-form-item>
                        <el-button type="danger" @click="onBankSaveSubmit">下一步</el-button>
                        <el-button type="info" @click="returnRouter">返回</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getBankCards, getBankList, addBankCard} from '../../../service/getData'

    export default {
        data(){
            return{
                nickname: null,
                userBankCardLockStatus: true,
                banksList: null,
                selbank: null,
                isfirstCard: true,
                saveFormStatus: false,
                selArea: null,
                bankcardform: {
                    bankid: null,
                    branchAddress: '',
                    branchName: '',
                    cardUser: '',
                    cardNo: '',
                    recardNo: '',
                    fundsPwd: '',
                    firstCardNo: '',
                },
                bankcardformerr: {
                    bankidErr: '请选择开户银行',
                    branchAddressErr: '请选择开户地区',
                    branchNameErr: '由1至20个字符或汉字组成。',
                    cardUserErr: '请填写开户人姓名',
                    cardNoErr: '银行卡必须由16~19位数字组成',
                    recardNoErr: '请重复银行卡号',
                    fundsPwdErr: '请输入资金密码',
                    firstCardNoErr: '请输入第一张银行卡卡号',
                },
                bankcardformtxt: {
                    bankidErr: '请选择开户银行',
                    branchAddressErr: '请选择开户地区',
                    branchNameErr: '由1至20个字符或汉字组成。',
                    cardUserErr: '请填写开户人姓名',
                    cardNoErr: '银行卡必须由16~19位数字组成',
                    recardNoErr: '请重复银行卡号',
                    fundsPwdErr: '请输入资金密码',
                    firstCardNoErr: '请输入第一张银行卡卡号'
                }
            }
        },
        mounted(){
            this.checkBankCards();
            this.loadBankList();
        },
        created() {

        },
        watch: {
            selArea:{
                handler(curVal,oldVal){
                    this.bankcardform.branchAddress = curVal.join('')
                    //console.log(curVal,oldVal)
                },
                deep:true
            }
        },
        computed: {
            ...mapState([
                'userInfo',
            ]),
        },
        components:{

        },
        methods: {
            async checkBankCards() {
                let cardsData = await getBankCards();
                if(cardsData.code == 0 ){
                    this.userBankCardLockStatus = cardsData.result.userBankCardLockStatus;
                    this.isfirstCard = cardsData.result.bindBankCardCount > 0 ? false : true;
                    if(cardsData.result.userBankCardLockStatus) {
                        this.$router.push({'name': 'bankCardList'});
                    }
                }
            },
            async loadBankList() {
                let banksData = await getBankList();
                if(banksData.code == 0) {
                    this.banksList = banksData.result;
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'header-row';
                }
                return 'body-row';
            },
            onBankSaveSubmit() {
                this.nickname = this.userInfo.nickName == '' ? this.userInfo.userName : this.userInfo.nickName;
                let allowSubmit = true;
                if(this.isfirstCard){
                    this.bankcardformerr.firstCardNoErr = '';
                } else {
                    this.bankcardformerr.cardUserErr = '';
                }
                for(var k in this.bankcardformerr){
                    if(this.bankcardformerr.hasOwnProperty(k) && this.bankcardformerr[k] != '') {
                        allowSubmit = false;
                        return;
                    }
                }
                if(allowSubmit) {
                    this.saveFormStatus = true;

                    for(var k in this.banksList){
                        if(this.banksList.hasOwnProperty(k) && this.banksList[k].id == this.bankcardform.bankid) {
                            this.selbank = this.banksList[k];
                        }
                    }
                }
            },
            areaSel(val) {
                this.bankcardform.branchAddress = val.join('')
            },
            checkBankForm() {

            },
            returnRouter() {
                this.$router.go(-1);
            },
            vaildateBankForm(field) {
                if(field == 'branchName' || field == 'all') {
                    var patrn=/^[a-zA-Z\u4E00-\u9FFF]{1,20}$/;
                    if (!patrn.exec(this.bankcardform.branchName)) {
                        this.bankcardformerr.branchNameErr = this.bankcardformtxt.branchNameErr;
                    } else {
                        this.bankcardformerr.branchNameErr = '';
                    }
                }
                if(field == 'cardUser' || field == 'all') {
                    var patrn=/^[a-zA-Z\u4E00-\u9FFF]{1,10}$/;
                    if (!patrn.exec(this.bankcardform.cardUser)) {
                        this.bankcardformerr.cardUserErr = this.bankcardformtxt.cardUserErr;
                    } else {
                        this.bankcardformerr.cardUserErr = '';
                    }
                }
                if(field == 'cardNo' || field == 'all') {
                    var patrn=/^[0-9]{16,19}$/;
                    if (!patrn.exec(this.bankcardform.cardNo)) {
                        this.bankcardformerr.cardNoErr = this.bankcardformtxt.cardNoErr;
                    } else {
                        this.bankcardformerr.cardNoErr = '';
                    }
                }
                if(field == 'recardNo' || field == 'all') {
                    var patrn=/^[0-9]{10,20}$/;
                    if (!patrn.exec(this.bankcardform.recardNo) || this.bankcardform.recardNo != this.bankcardform.cardNo) {
                        this.bankcardformerr.recardNoErr = this.bankcardformtxt.recardNoErr;
                    } else {
                        this.bankcardformerr.recardNoErr = '';
                    }
                }
                if(field == 'fundsPwd' || field == 'all') {
                    if (this.bankcardform.fundsPwd == '') {
                        this.bankcardformerr.fundsPwdErr = this.bankcardformtxt.fundsPwdErr;
                    } else {
                        this.bankcardformerr.fundsPwdErr = '';
                    }
                }
                if(field == 'bankid' || field == 'all') {
                    if (this.bankcardform.bankid == null) {
                        this.bankcardformerr.bankidErr = this.bankcardformtxt.bankidErr;
                    } else {
                        this.bankcardformerr.bankidErr = '';
                    }
                }
                if(field == 'selArea' || field == 'all') {
                    if (this.bankcardform.branchAddress == '') {
                        this.bankcardformerr.branchAddressErr = this.bankcardformtxt.branchAddressErr;
                    } else {
                        this.bankcardformerr.branchAddressErr = '';
                    }
                }
                if(field == 'firstCardNo') {
                    var patrn=/^[0-9]{16,19}$/;
                    if (!patrn.exec(this.bankcardform.firstCardNo)) {
                        this.bankcardformerr.firstCardNoErr = this.bankcardformtxt.firstCardNoErr;
                    } else {
                        this.bankcardformerr.firstCardNoErr = '';
                    }
                }
            },
            async onBankInfoSaveSubmit() {
                let createData = await addBankCard(this.bankcardform.bankid, this.bankcardform.branchAddress, this.bankcardform.branchName, this.bankcardform.cardNo, this.bankcardform.cardUser, this.bankcardform.fundsPwd, this.bankcardform.firstCardNo);
                console.log(createData);
                if(createData.code == 0) {
                    this.$router.push({'name': 'bankCardList'});
                } else {
                    this.$message.error(createData.msg);
                }
            }
        },

    }

</script>

<style lang="scss" scoped>

</style>
