<template>
    <div class="cont-body">
        <div class="top-type">
            转点类型
            <el-button 
                v-for="item in transferTypeList"
                 @click="changeType(item)" 
                class="transfer-button" :class="item.state ? 'active' :''">{{item.name}}</el-button>
        </div>
         <el-form ref="form" :model="filterform" label-width="70px" class="form">
                   <!-- <el-form-item label="转入账号" >
                        <el-input v-model="filterform.userId" placeholder="请输入内容"></el-input>
                    </el-form-item> -->
                    <el-form-item label="转入账号">
                        <el-select v-model="filterform.userId" class="userlist"  placeholder="请选择">
                            <el-option v-for="item in userList"  :key="item.id" :label="item.userName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                   <el-form-item label="转入金额" >
                        <el-input v-model="filterform.amount" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="备注" >
                        <el-input v-model="filterform.issue" placeholder="请输入内容"></el-input>
                    </el-form-item> -->
                    <el-form-item label="资金密码" >
                        <el-input v-model="filterform.pwdFunds"  type="password" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="transfer-submits"  @click="onFilterSubmit">转入</el-button>
                     </el-form-item>
                </el-form>
    </div>
</template>
<script>
    import {transferSubmit,getTeamMemberList} from '../../../service/getData'
    
    export default {
        data(){
            return{
                 filterform:{
                     userId:"",
                     pwdFunds:'',
                     amount:'',
                },
                userList:[],
                transferType:1,
                transferTypeList:[{
                    type:0,
                    name:"日奖励",
                    state: false,
                },{
                    type:1,
                    name:"充值",
                    state: true,
                },{
                    type:2,
                    name:"红包",
                    state: false,
                },{
                    type:3,
                    name:"红利",
                    state: false,
                },{
                    type:4,
                    name:"其他",
                    state: false,
                }]
            }
        },
        mounted () {
            this.getUserList();
        },
        methods:{
            changeType(item){
                this.transferTypeList.forEach(element => {
                    element.state = false;
                });
                item.state = true;
                this.transferType = item.type;
            },
            async onFilterSubmit(){
                let res = await transferSubmit(
                    this.filterform.userId,
                    this.filterform.pwdFunds,
                    this.transferType,
                    this.filterform.amount
                );
                if (res.code!=0) {
                    this.$alert(res.msg, '提示信息', {
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$alert(res.msg, '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
            },
            async getUserList(){
                let res = await getTeamMemberList(1,1000);
                if (res.code==0) {
                    this.userList = res.result.rows;
                }
                // console.log(res);
            }

        },
    }
</script>

<style lang="scss" scoped>
.cont-body {
    padding: 5px 25px;
}
.top-type{
    width: 100%;
    padding: 20px 0;
    border-bottom: 2px solid #ddd;
}
.form{
    margin: 20px 0; 
    width: 360px;
}
.transfer-button{
    background: #0BA7A3;
    width: 120px;
    color: #fff;
}
.transfer-button:first-child{
   margin-left: 20px;
}
.transfer-submits{
    background: #0BA7A3;
    width: 150px;
    color:#fff;
}
.userlist{
    width: 100%;
}
</style>
