<template>
    <div class="betWay">
        <div class="bethelp">
        <el-popover
                ref="playhelp"
                placement="bottom"
                :title="help.title"
                width="200"
                trigger="hover"
                :content="help.content">
        </el-popover>

        <a href="javascript:;" v-popover:playhelp><i class="el-icon-question"></i> 帮助</a>
        </div>
        <el-tabs  type="card" @tab-click="betshandleClick">
            <el-tab-pane
                    v-for="(item, index) in gameinfo.playPermission"
                    :label="item.name" >
                <div class="betPlay">
                    <div  class="betPlaySel">
                        <div class="list bet-type-button-group" v-for="(gitem, gindex) in item.group">
                            <span class="span_text">{{gitem.name}}：</span>
                            <div class="text">
                                <ul class="">
                                    <li v-for="(bitem, bindex) in gitem.bet"  class="bet-type-button " v-bind:class="{ 'active': (gindex == 0 && bindex == 0)}" id="NumberPositionMatchFor5StarDouble"><span>{{bitem.name}}</span></li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    
                    <div class="bonusAdj">
                        <span class="disMinRate">0%</span>
                        <span class="disMaxRate">{{gameinfo.rebatePoint}}%</span>
                        <el-slider v-model="returnRate" :min=0 :step=0.1 :format-tooltip="formatReturnRate" :max="gameinfo.rebatePoint"></el-slider>
                        <div class="rateResult">
                            <span>当前返点<em>{{returnRate}}%</em></span> <span>当前奖金<em>0</em></span>
                        </div>
                        <div class="rateType">
                            <el-radio v-model="rateType" label="1">遗漏</el-radio>
                            <el-radio v-model="rateType" label="2">冷热</el-radio>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>

                <div class="betSelList">
                    <div class="listGroup">
                        <div class="tz_dian flt">
                            <span class="span_text">个位：</span>
                            <ul >
                                <li class="active">
                                    <span >0</span>
                                    <label >36</label>
                                    <label >8</label>
                                </li>

                                <li>
                                    <span >1</span>
                                    <label >0</label>
                                    <label >12</label>
                                </li>

                                <li>
                                    <span >2</span>
                                    <label >7</label>
                                    <label >13</label>
                                </li>

                                <li>
                                    <span >3</span>
                                    <label >14</label>
                                    <label >14</label>
                                </li>

                                <li>
                                    <span >4</span>
                                    <label >1</label>
                                    <label >16</label>
                                </li>

                                <li>
                                    <span >5</span>
                                    <label >5</label>
                                    <label >11</label>
                                </li>

                                <li>
                                    <span >6</span>
                                    <label >25</label>
                                    <label >4</label>
                                </li>

                                <li>
                                    <span >7</span>
                                    <label >4</label>
                                    <label >16</label>
                                </li>

                                <li>
                                    <span >8</span>
                                    <label >9</label>
                                    <label class="" >12</label>
                                </li>

                                <li>
                                    <span >9</span>
                                    <label >11</label>
                                    <label class="" >14</label>
                                </li>
                            </ul>
                        </div>
                        <div class="tz_btn frt">
                            <ul>
                                <li class="active">全</li>
                                <li >大</li>
                                <li >小</li>
                                <li >奇</li>
                                <li >偶</li>
                                <li >清</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>

                        <div class="listGroup">
                            <div class="tz_dian flt">
                                <span class="span_text">十位：</span>
                                <ul >
                                    <li class="active">
                                        <span >0</span>
                                        <label >36</label>
                                        <label >8</label>
                                    </li>

                                    <li>
                                        <span >1</span>
                                        <label >0</label>
                                        <label >12</label>
                                    </li>

                                    <li>
                                        <span >2</span>
                                        <label >7</label>
                                        <label >13</label>
                                    </li>

                                    <li>
                                        <span >3</span>
                                        <label >14</label>
                                        <label >14</label>
                                    </li>

                                    <li>
                                        <span >4</span>
                                        <label >1</label>
                                        <label >16</label>
                                    </li>

                                    <li>
                                        <span >5</span>
                                        <label >5</label>
                                        <label >11</label>
                                    </li>

                                    <li>
                                        <span >6</span>
                                        <label >25</label>
                                        <label >4</label>
                                    </li>

                                    <li>
                                        <span >7</span>
                                        <label >4</label>
                                        <label >16</label>
                                    </li>

                                    <li>
                                        <span >8</span>
                                        <label >9</label>
                                        <label class="" >12</label>
                                    </li>

                                    <li>
                                        <span >9</span>
                                        <label >11</label>
                                        <label class="" >14</label>
                                    </li>
                                </ul>
                            </div>
                            <div class="tz_btn frt">
                                <ul>
                                    <li class="active">全</li>
                                    <li >大</li>
                                    <li >小</li>
                                    <li >奇</li>
                                    <li >偶</li>
                                    <li >清</li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>

                    <div class="listGroup">
                        <div class="tz_dian flt">
                            <span class="span_text">百位：</span>
                            <ul >
                                <li>
                                    <span >0</span>
                                    <label >36</label>
                                    <label >8</label>
                                </li>

                                <li>
                                    <span >1</span>
                                    <label >0</label>
                                    <label >12</label>
                                </li>

                                <li>
                                    <span >2</span>
                                    <label >7</label>
                                    <label >13</label>
                                </li>

                                <li>
                                    <span >3</span>
                                    <label >14</label>
                                    <label >14</label>
                                </li>

                                <li>
                                    <span >4</span>
                                    <label >1</label>
                                    <label >16</label>
                                </li>

                                <li>
                                    <span >5</span>
                                    <label >5</label>
                                    <label >11</label>
                                </li>

                                <li>
                                    <span >6</span>
                                    <label >25</label>
                                    <label >4</label>
                                </li>

                                <li>
                                    <span >7</span>
                                    <label >4</label>
                                    <label >16</label>
                                </li>

                                <li>
                                    <span >8</span>
                                    <label >9</label>
                                    <label class="" >12</label>
                                </li>

                                <li>
                                    <span >9</span>
                                    <label >11</label>
                                    <label class="" >14</label>
                                </li>
                            </ul>
                        </div>
                        <div class="tz_btn frt">
                            <ul>
                                <li >全</li>
                                <li >大</li>
                                <li >小</li>
                                <li >奇</li>
                                <li >偶</li>
                                <li >清</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>

                <div class="opbuttons">
                    <el-button size="small" type="danger" round>随机选号</el-button>
                    <el-button size="small" type="warning" round>添加到购物篮</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
    import Vue from 'vue'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {} from '../../service/getData'
    export default {
        data(){
            return {
                returnRateMax: 12,
                returnRate: 0,
                rateType: '1',
                help:{ title: '', content: ''},

            }
        },
        created(){
        },
        props: ['gameId', 'gameinfo'],
        components: {
        },
        mounted() {
        },
        computed: {
        },
        methods: {
            betshandleClick(tab, event){
                console.log(tab, event);
            },
            formatReturnRate(val){
                return  val+'%';
            }
        }
    }

</script>

<style lang="scss" scoped></style>
