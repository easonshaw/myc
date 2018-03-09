<template>
    <div class="cont-body">
        <div class="top-type">
            转点类型
            <el-button type="success" class="button">日奖励</el-button>
            <el-button type="success" class="button">充值</el-button>
            <el-button type="success" class="button">红利</el-button>
        </div>
         <el-form ref="form" :model="filterform" label-width="70px" class="form">
                   <el-form-item label="转入账号" >
                        <el-input v-model="filterform.issue" placeholder="请输入内容"></el-input>
                    </el-form-item>
                   <el-form-item label="转入金额" >
                        <el-input v-model="filterform.issue" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" >
                        <el-input v-model="filterform.issue" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="资金密码" >
                        <el-input v-model="filterform.issue" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" class="submit"  @click="onFilterSubmit">转入</el-button>
                     </el-form-item>
                </el-form>
    </div>
</template>
<script>
    import {getTeamAnalysis} from '../../../service/getData'
    import echarts from 'echarts'
    export default {
        data(){
            return{
                 filterform:{
                     type:'1',
                    types:[{
                        value: '1',
                        label: '彩票'
                        }, {
                        value: '2',
                        label: 'AG'
                    }, {
                        value: '3',
                        label: 'VR真人视讯'
                    }]
                }
            }
        },
        methods:{

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
.button{
    background: #0BA7A3;
    width: 120px;
}
.button:first-child{
   margin-left: 20px;
}
.submit{
    width: 150px;
    background: #0BA7A3;
}
</style>
