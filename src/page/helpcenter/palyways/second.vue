<template>
    <div class="help-content">
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>五星
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
             <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>四星
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
             <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>三星
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
             <el-collapse-item>
                <template slot="title">
                <div class="icon">Q</div>二星
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                
            }    
        },
    }
</script>

<style lang="scss" scoped>
.icon{
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    margin-top: 6px;
    line-height: 36px;
    font-size: 1.8em;
    font-weight: bold;
    margin-right: 15px;
}
</style>
