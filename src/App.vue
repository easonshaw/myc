<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
    </div>
</template>

<script>
  	export default {
    	components:{
          
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
	body{
		background: url('http://d1.myc178.com/static/img/main-bg.png') left center repeat;
	}
</style>
