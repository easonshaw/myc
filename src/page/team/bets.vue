<template>
    <div class="teamPage">
        <div class="fiterForm">
            <el-form ref="form" :inline="true" :model="filterform" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="时间">
                            <el-row>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="filterform.start" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="filterform.end" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="游戏类型">
                            <el-select v-model="filterform.type" placeholder="请选择">
                                <el-option v-for="item in filterform.types"  :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="游戏名称">
                            <el-select v-model="filterform.gtype" placeholder="所有游戏">
                                <el-option v-for="item in filterform.gtypes"  :key="item.value" :label="item.label" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="用户名">
                            <el-input v-model="filterform.userName" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="订单号">
                            <el-input v-model="filterform.ordernum" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="期数">
                            <el-input v-model="filterform.issue" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="4">
                        <el-form-item label=" ">
                            <el-button :class="[istoday == 0 ? 'el-button--danger' : '']" @click="dateSel(0)">今天</el-button>
                            <el-button :class="[istoday == 1 ? 'el-button--danger' : '']" @click="dateSel(1)">昨天</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label=" ">
                            <el-button :class="[istoday == 0 ? 'el-button--danger' : '']" @click="dateSel(0)">今天</el-button>
                            <el-button :class="[istoday == 1 ? 'el-button--danger' : '']" @click="dateSel(1)">昨天</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col :span="8">
                        <el-form-item class="floatright" label=" ">
                            <el-button type="danger" @click="onFilterSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                </el-row>
                <el-row :gutter="20">

                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getTeamBetList} from '../../service/getData'
    export default {
        data(){
            return{
                filterform: {
                    start: null,
                    end: null,
                    userName: '',
                    type: '1',
                    types:[{
                        value: '1',
                        label: '彩票'
                    }, {
                        value: '2',
                        label: 'AG'
                    }, {
                        value: '3',
                        label: 'VR真人视讯'
                    }],//平台类型
                    gtype: '',
                    gtypes: [],
                },
                istoday: 2,
            }
        },
        mounted(){
        },
        components:{
        },
        created() {
        },
        computed:{
        },
        methods:{
            onFilterSubmit() {}
        },
    }

</script>

<style lang="scss" scoped></style>
