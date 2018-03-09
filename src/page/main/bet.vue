<template>
    <div class="betWay">
        <el-tabs v-model="play" type="card" @tab-click="betshandleClick">
            <el-tab-pane name="first" type="card" disabled ></el-tab-pane>
            <el-tab-pane
                    v-for="(item, index) in playList"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name">

                <div class="betPlay">
                    <div  class="betPlaySel">
                        <div class="list bet-type-button-group">
                            <span class="span_text">直　选：</span>
                            <div class="text">
                                <ul class="">
                                    <li class="bet-type-button active" id="NumberPositionMatchFor5StarDouble"><span>直选复式</span></li>
                                    <li class="bet-type-button" id="NumberPositionMatchFor5StarSingle"><span>直选单式</span></li>
                                    <li class="bet-type-button" id="CombinationFor5Star"><span>五星组合</span></li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="list bet-type-button-group">
                            <span class="span_text">组　选：</span>
                            <div class="text">
                                <ul class="">
                                    <li class="bet-type-button" id="NumberMatchFor5Star120"><span>组选120</span></li>
                                    <li class="bet-type-button" id="NumberMatchFor5Star60"><span>组选60</span></li>
                                    <li class="bet-type-button" id="NumberMatchFor5Star30"><span>组选30</span></li>
                                    <li class="bet-type-button" id="NumberMatchFor5Star20"><span>组选20</span></li>
                                    <li class="bet-type-button" id="NumberMatchFor5Star10"><span>组选10</span></li>
                                    <li class="bet-type-button" id="NumberMatchFor5Star5"><span>组选5</span></li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="list bet-type-button-group">
                            <span class="span_text">特　殊：</span>
                            <div class="text">
                                <ul class="">
                                    <li class="bet-type-button" id="SpecialFor5StarX1"><span>一帆风顺</span></li>
                                    <li class="bet-type-button" id="SpecialFor5StarX2"><span>好事成双</span></li>
                                    <li class="bet-type-button" id="SpecialFor5StarX3"><span>三星报喜</span></li>
                                    <li class="bet-type-button" id="SpecialFor5StarX4"><span>四季发财</span></li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="list bet-type-button-group">
                            <span class="span_text">其　他：</span>
                            <div class="text">
                                <ul class="">
                                    <li class="bet-type-button" id="SumOddEvenFor5Star"><span>总和大小单双</span></li>
                                    <li class="bet-type-button" id="SumCombinationOddEvenFor5Star"><span>总和组合大小单双</span></li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    
                    <div class="bonusAdj">
                        <span class="disMinRate">0%</span>
                        <span class="disMaxRate">{{returnRateMax}}%</span>
                        <el-slider v-model="returnRate" :min=0 :step=0.1 :format-tooltip="formatReturnRate" :max="returnRateMax"></el-slider>
                        <div class="rateResult">
                            <span>当前返点<em>{{returnRate}}%</em></span> <span>当前奖金<em>200.52</em></span>
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
                            <span class="span_text">个　位：</span>
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
                                <span class="span_text">十　位：</span>
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
                            <span class="span_text">百　位：</span>
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
                play: 'a',
                playList: [{
                    title: '五星',
                    name: 'a',
                    content: ''
                },{
                    title: '四星',
                    name: 'b',
                    content: ''
                },{
                    title: '前三',
                    name: 'c',
                    content: ''
                },{
                    title: '中三',
                    name: 'd',
                    content: ''
                },{
                    title: '后三',
                    name: 'e',
                    content: ''
                },{
                    title: '前二',
                    name: 'f',
                    content: ''
                },{
                    title: '后二',
                    name: 'g',
                    content: ''
                },{
                    title: '定位胆',
                    name: 'h',
                    content: ''
                },{
                    title: '不定位',
                    name: 'i',
                    content: ''
                },{
                    title: '大小单双',
                    name: 'j',
                    content: ''
                },{
                    title: '龙虎和',
                    name: 'k',
                    content: ''
                }],
            }
        },
        created(){
        },
        props: ['gameId'],
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

<style lang="scss" scoped>

</style>
