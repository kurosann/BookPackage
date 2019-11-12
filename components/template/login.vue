<template>
	<div class="borderBox login-div">
		<div class="flex item">
			<span class="name">账号</span>
			<input type="text" v-model.trim="user" placeholder="用户名/手机号/邮箱">
			<i class="iconfont icon-shanchuyixuanqunchengyuanchacha"  v-show="user"
				@click.stop="user='';"></i>
		</div>
		<div class="flex item">
			<span class="name">密码</span>
			<input type="text" placeholder="请填写密码" v-model.trim="pass" v-show="showPass">
			<input type="password" placeholder="请填写密码" v-model.trim="pass" v-show="!showPass">
			<i class="iconfont icon-yanjing" :class="showPass?'active': ''" 
				@click.stop="showPass=!showPass"></i>
		</div>
		<p class="mainBtn login-btn" @click.stop="login">登陆</p>
		<div class="flex other-btn">
			<span @click.stop="getPass">忘记密码？</span>
			<span @click.stop="register">新用户注册</span>
		</div>
	</div>
</template>

<script>
import {sowToast,setLocalStorage} from '@/utils/index';
import {mapActions} from 'vuex';
export default{
	data(){
		return{
			showPass: false,  //显示密码
			user: '',  //账户
			pass: '',  //密码
			
		}
	},
	methods: {
		//跳转页面
		jumpPage(url){
			if(url && typeof(url)=='string'){
				uni.navigateTo({
					url: url
				})
			}
		},
		//找回密码
		getPass(){
			uni.showActionSheet({
				itemList: ['邮箱找回', '短信找回'],
				success: (res)=>{
					let tapIndex = res.tapIndex;
					if(tapIndex==0){  //邮箱找回
						
					}else if(tapIndex==1){  //短信找回
						
					};
				}
			})
		},
		//注册
		register(){
			this.jumpPage('/pages/register/index');
		},
		//登陆事件
		login(){
			if(!this.user){
				showToast('请填写账户');
				return;
			};
			if(!this.pass){
				showToast('请输入密码');
				return;
			};
			this.$store.dispatch('me/login', {
				user: this.user,
				pass: this.pass
			})
			.then((res)=>{
				let session_token = res.data.session_token;
				setLocalStorage('session_token', session_token);
				setTimeout(()=>{
					uni.switchTab({
						url: '/pages/message/index'
					});
				},2000);
			}).catch(()=>{});
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../style/default.less';
.login-div{
	padding: 300upx 56upx 0;
	.item{
		min-height: 106upx;
		border-bottom: 1px solid #eee;
		span.name{
			font-size: 32upx;
			color: #000;
			font-weight: bold;
		}
		input{
			flex: 1;
			padding: 0 26upx;
			box-sizing: border-box;
			color: #333;
		}
		i{
			font-size: 40upx;
			&.active{
				color: #38adfd;
			}
		}
	}
	.login-btn{
		margin-top: 40upx;
		display: block;
		padding: 0;
		line-height: 82upx;
	}
	.other-btn{
		justify-content: space-between;
		margin-top: 30upx;
		span{
			color: @mainColor;
			font-size: 24upx;
		}
	}
}
</style>
