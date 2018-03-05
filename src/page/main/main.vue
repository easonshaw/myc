<template>
  	<div class="">
        <head-top activeNav='game'>
        </head-top>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {} from '../../service/getData'

export default {
    data(){
        return{
          
        }
    },

	mounted(){
       
    },

    components:{
        headTop
    },

    computed:{
       
    },

    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        }
    },
}

</script>

<style lang="scss" scoped>
   

</style>
