<template>
    <div id="dialog-activity">
        <el-dialog title="优惠活动" custom-class="activity_dialog" :visible.sync="dialogVisible" :before-close="downApphandleClose" >
            <img src="../../images/activity.jpg" class="top-img" alt="">
            <div class="activity-list">
                <div class="activity-item" v-for="item in activityList" @click="showactivityInfo(item)">
                    <div class="title">{{item.title}}</div>
                    <div class="time">2018-3-13</div>             
                </div>
            </div>
            <div class="page"> 
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="优惠活动" :visible.sync="sodialogVisible" width="30%" :before-close="itemhandleClose">
            <div class="content">
                <span>{{content}}</span>         
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getActivitys} from '../../service/getData'
    export default {
        data(){
            return{
                sodialogVisible: false,
                activityList:[],
                content:"",
                dialogVisible: this.activitydialogVisible
            }
        },
        props: ['activitydialogVisible'],
        methods: {
            downApphandleClose(){
                this.dialogVisible = false;
            },
            async getActivityList(){
                let activityList = await getActivitys();
                if (activityList.code==0) {
                    this.activityList = activityList.result.rows;
                }
            },
            itemhandleClose() {
                this.sodialogVisible = false;
            },
            showactivityInfo(item){
                this.content = item.content;
                this.sodialogVisible = true;
            }
        },
        watch: {
            activitydialogVisible: function (value){
                this.dialogVisible = this.activitydialogVisible;
                if (value==true) {this.getActivityList();}                
            },
            dialogVisible: function(val) {
                this.$emit("on-activity-result-change",val);
            },
        }
    }
</script>

<style lang="scss" scoped>
.top-img{
    width: 100%;
}
.activity-list{
    padding: 10px 20px;
    height: 300px;
    overflow-y: scroll;
}
.activity-item{
    height: 30px;
    line-height: 30px;
    font-size: 1.2em;
    padding: 0 10px;
    border-bottom: 2px solid #ddd;
    cursor: pointer;
}
.activity-list .title{
    float: left;
}
.activity-list .time{
    float: right;
}
.page{
    text-align: center;
}
.content{
    padding: 0px 15px;
    max-height: 300px;
    overflow-y:scroll;
}
</style>