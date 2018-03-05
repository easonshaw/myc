<template>
    <div class="bankcard">
        <transition name="router-bankcard" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getBankCards, getBankList} from '../../service/getData'

    export default {
        data(){
            return{
                hasCards: false,
                userBankCardLockStatus: false,
                cardsList: null,
                banksList: null,
                saveFormStatus: false,
                selArea: null,
                bankcardform: {
                    bankid: null,
                    branchAddress: null,
                    branchName: null,
                    cardUser: null,
                    cardNo: null,
                    recardNo: null,
                    fundsPwd: null,
                },
                bankcardformerr: {

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
            bankcardform:{
                handler(curVal,oldVal){
                    console.log(curVal,oldVal)
                },
                deep:true
            }
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
                        this.hasCards = false;
                        this.cardsList = cardsData.result.userBankCardList;
                    }
                }
            },
            async loadBankList() {
                let banksData = await getBankList();
                if(banksData.code == 0) {
                    this.banksList = banksData.result;
                }
                console.log(banksData)
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'header-row';
                }
                return 'body-row';
            },
            onBankSaveSubmit() {

            },
            areaSel(val) {
                this.bankcardform.branchAddress = val.join('')
                console.log(val)
            },
            checkBankForm() {

            }
        },

    }

</script>

<style lang="scss" scoped>

</style>
