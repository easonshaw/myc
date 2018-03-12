<template>
    <div id="dialog-IssueClose">
        <el-dialog :close-on-click-modal="false" :show-close="true" title="温馨提示" custom-class="issueclose_dialog" :visible.sync="dialogVisible" :before-close="issuehandleClose"  width="440px" >
            <p>{{issue}}期已截止。投注时请注意期号！</p>
            <div class="btns">
                <el-button size="mini" type="primary" round>确认 ({{time}})</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser} from '../../service/getData'
    export default {
        data(){
            return{
                dialogVisible: this.issueClosedialogVisible,
                speeds: [],
                time: 300,
            }
        },
        mounted() {
        },
        props: ['issueClosedialogVisible', 'issue', 'timeout'],
        methods: {
            issuehandleClose(){
                this.dialogVisible = false;
            },
            countdown(){
                console.log('start:'+this.time);
                if(this.dialogVisible && this.time > 0){
                    let that = this;
                    let timer = setInterval(function(){
                        console.log('proccess:'+that.time);
                        if(that.time < 0){
                            clearInterval(timer);
                            that.dialogVisible = false;
                        }
                        that.time--;
                    }, 1000)
                }
            },
        },
        created(){
        },
        watch: {
            issueClosedialogVisible: function (value){
                this.dialogVisible = this.issueClosedialogVisible;
                this.countdown();
            },
            dialogVisible: function(val) {
                this.$emit("on-issue-result-change", val);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>