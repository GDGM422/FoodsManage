<template>
	<div id="message">
		<h1>系统说明</h1>
		11111111111111111111111111111111111111
		<div>用户信息:{{ personalInfo }}</div>
	</div>
</template>

<script>
import Vue from 'vue'
import store from '../../store/index';
export default {
	data() {
		return{
			personalInfo : store.state.user.userInfo
		}
	},

    mounted:function(){
      console.log( store.state.user.userInfo)
      console.log(localStorage.getItem('user'))
    } 
}
</script>