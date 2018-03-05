<template>
    <div class="bankcard">
        <div class="bankcardslist">
            <el-table :data="cardsList" border style="width: 100%;" :header-row-class-name="tableRowClassName">
                <el-table-column prop="cardUser" label="用户名" width="180" > </el-table-column>
                <el-table-column prop="branchName" label="开户行" width="180" >  </el-table-column>
                <el-table-column prop="cardNo" label="卡号"> </el-table-column>
                <el-table-column prop="createdDate" label="绑定时间"> </el-table-column>
            </el-table>

            <div class="bankcardsOpt">
                <span v-if="userBankCardLockStatus">
                <el-button disabled type="danger" round>银行卡锁定中</el-button>
                </span>
                <span v-else>
                    <el-button  type="danger" @click="createCard" round>增加银行卡</el-button>
                    <el-button  type="success" @click="lockCard" round>锁定银行卡</el-button>
                </span>
            </div>

            <div class="divtip">
                <p>注意事项：</p>

                <p>1、一个账户最多只能绑定<span class="red">5</span>张银行卡</p>

                <p>2、银行卡锁定可以增强账户安全，推荐锁定（如：账户被他人盗用后，由于锁定的限制，您账户的资金不会被他人提款）</p>

                <p>3、银行卡锁定后，不能增加新银行卡绑定，自身不能解绑和解锁银行卡，联系客服申请解锁</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getBankCards, setBankLockStatus} from '../../../service/getData'

    export default {
        data(){
            return{
                userBankCardLockStatus: true,
                cardsList: null,
            }
        },
        mounted(){
            this.checkBankCards();
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
            async checkBankCards() {
                let cardsData = await getBankCards();
                if(cardsData.code == 0 ){
                    this.userBankCardLockStatus = cardsData.result.userBankCardLockStatus;
                    if(cardsData.result.bindBankCardCount > 0){
                        this.cardsList = cardsData.result.userBankCardList;
                    }
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'header-row';
                }
                return 'body-row';
            },
            createCard() {
                if(this.userBankCardLockStatus) {
                    this.$message.error('账户被锁定,请联系客服申请解锁.');
                } else {
                    this.$router.push({'name': 'createBankcard'});
                }
            },
            async lockCard() {
                let lockData = await  setBankLockStatus();
                if(lockData.code == 0) {
                    this.$message({
                        showClose: true,
                        message: lockData.msg,
                        type: 'success'
                    });
                } else {
                    this.$message.error(lockData.msg);
                }
                this.userBankCardLockStatus = true;
                console.log(lockData)
            },
        },

    }

</script>

<style lang="scss" scoped>

</style>
