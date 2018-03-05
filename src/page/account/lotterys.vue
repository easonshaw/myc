<template>
    <div class="lotterys">
        <div class="gameGroup">
            <el-table :data="gameGroup.left" border :header-row-class-name="tableRowClassName">
                <el-table-column prop="gameGroupName" label="彩种" width="180" > </el-table-column>
                <el-table-column prop="dqMaxAward" label="单期最高奖金" width="180" >  </el-table-column>
                <el-table-column prop="dtMaxAward" label="单挑最高奖金"> </el-table-column>
            </el-table>
        </div>
        <div class="gameGroup">
            <el-table :data="gameGroup.right" border :header-row-class-name="tableRowClassName">
                <el-table-column prop="gameGroupName" label="彩种" width="180" > </el-table-column>
                <el-table-column prop="dqMaxAward" label="单期最高奖金" width="180" >  </el-table-column>
                <el-table-column prop="dtMaxAward" label="单挑最高奖金"> </el-table-column>
            </el-table>
        </div>
        <div class="clear"></div>
        <div class="gamemethod">
            <el-tabs class="" type="border-card" @tab-click="getPanedata">
                <el-tab-pane  v-for="item in gameGroup.all" :label="item.gameGroupName">
                    <el-table height="450" v-loading="tableDataloading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="tableData" border :header-row-class-name="methodTableRowClassName">
                        <el-table-column prop="groupname" label="彩种"> </el-table-column>
                        <el-table-column prop="betName" label="玩法类型">  </el-table-column>
                        <el-table-column prop="name" label="玩法分类">
                            <template slot-scope="scope">
                            <span v-html="scope.row.name"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bonus" label="奖金赔率">
                            <template slot-scope="scope">
                                <span v-html="scope.row.bonus"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getUser} from '../../service/getData'

    export default {
        data(){
            return{
                gameGroup: {
                    all: [],
                    left: [],
                    right: []
                },
                mappingIndexToId: [],
                playGroup: {},
                tableData: [],
                tableDataloading: true,
            }
        },
        mounted(){
        },
        created() {
            this.initData();
        },
        watch: {
            tableData(o, v){
                this.tableDataloading = v.length == 0 ? false : true;
            }
        },
        computed: {
        },
        components:{
        },
        methods: {
            async initData() {
                let userData = await getUser();
                let mappingData = [];
                if(userData.code == 0) {
                    let half = userData.result.userInfo.bonusLimitDTOList.length/2;
                    for(var i in userData.result.userInfo.bonusLimitDTOList) {
                        this.playGroup[userData.result.userInfo.bonusLimitDTOList[i].groupId] = [];
                        mappingData[i] = userData.result.userInfo.bonusLimitDTOList[i].groupId;
                        this.gameGroup.all.push(userData.result.userInfo.bonusLimitDTOList[i]);
                        if(i < half){
                            this.gameGroup.left.push(userData.result.userInfo.bonusLimitDTOList[i]);
                        } else{
                            this.gameGroup.right.push(userData.result.userInfo.bonusLimitDTOList[i]);
                        }
                        if(i == 0) {
                            this.playMethodBonus(i, userData.result.userInfo.bonusLimitDTOList[i].groupId);
                        }
                    }
                    this.mappingIndexToId = mappingData;
                }
            },
            async playMethodBonus(i, gameTypeGroupId) {
                this.tableData = [];
                let loadData = await getUser(gameTypeGroupId);
                if(loadData.code == 0) {
                    this.playGroup[gameTypeGroupId] = this.processListData(loadData.result.playBonusList.groupName, loadData.result.playBonusList.playMethodBonusList);
                    this.tableData = this.playGroup[gameTypeGroupId];
                }
            },
            getPanedata(tab, event) {
                this.playMethodBonus(tab.index, this.mappingIndexToId[tab.index]);
            },
            processListData(groupname, result) {
                let ret = [];
                for(var i in result) {
                    let retele = {};
                    retele['groupname'] = groupname;
                    let name = '';
                    let bonus = '';
                    for(var j in result[i].bonusAndFactorDTOList){
                        name += result[i].bonusAndFactorDTOList[j].prizeName+'<br/>';
                        bonus += result[i].bonusAndFactorDTOList[j].bonus+'<br/>';
                    }
                    retele['betName'] = result[i].betName;
                    retele['name'] = name;
                    retele['bonus'] = bonus;
                    ret.push(retele)
                }
                return ret;
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'header-row';
                }
                return 'body-row';
            },
            methodTableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'method-header-row';
                }
                return 'body-row';
            },
        },

    }

</script>

<style lang="scss" scoped>


</style>
