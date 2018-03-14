<template>
    <div class="help-content">
        <ul class="waysNav">
            <li v-for="(item,index) in waysNav" @click="onwaysNav(index)" :class="index == active ? 'active': ''">{{item.name}}</li>
        </ul>
        <div class="content">
            <currentView :is="currentView" keep-alive></currentView>            
        </div>
    </div>
</template>

<script>
import first from '../../page/helpcenter/palyways/first';
import second from '../../page/helpcenter/palyways/second';
import third from '../../page/helpcenter/palyways/third';

    export default {
        data(){
            return {
                waysNav:[{
                    name:"彩种开奖时间",
                    view:"first"
                },{
                    name:"时时彩/快乐彩", 
                    view:"second",
                },{
                    name:"11选5",
                    view:"third",
                }],
                active:0,
                currentView: 'first', //默认选中first子组件
            }
        },
        components: { 
             first,
             second,
             third
         },
        methods: {
            onwaysNav(index){
                this.active = index;
                this.currentView = this.waysNav[index].view;
            },
        }
    }

</script>

<style lang="scss" scoped>
   .waysNav{
       height: 70px;
       padding: 10px 20px;
       border-bottom: 2px dashed #ddd;
   }
    .waysNav li{
     float: left;
     padding: 0 25px;
     height: 40px;
     background: #DCDDDD;
     color: #9C9C9C;
     margin-right: 15px;
     border-radius: 5px;
     line-height: 40px;
     cursor: pointer;
   }
    .waysNav .active{
     background: #F39800;
     color: #fff;
   }
   .content{
       padding: 20px 20px;
   }
</style>
