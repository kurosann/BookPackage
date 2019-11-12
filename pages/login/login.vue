<template >
	<view class="page">
		<view class="line"></view>
		<!-- 图书馆圆形图标 -->
		<view class="library-icon">
			<image src="../../static/icon/tushuguan.jpg" class="icon-style"></image>
			<view class="library-name">
				<text class="typeface">南宁职业技术学院图书馆</text>
			</view>
		</view>
		<!-- 图书馆圆形图标end -->
		
		<!-- 账号密码栏 -->
		<form @submit="formSubmit">
		<view class="num-and-pass">
			
			<view class="num-pass">
				<view class="num-pass2">
					<image src="../../static/icon/denglu.png" class="num-pass-icon"></image>
					<view class="fenge2"></view>
					<input name="id" type="number" class="input" placeholder="请输入11位数学号" maxlength="11" @input="getNum" />
				</view>
			</view>
			
			<view class="fenge"></view>
			
			<view class="num-pass">
				<view class="num-pass2">
					<image src="../../static/icon/mimacopy.png" class="num-pass-icon"></image>
					<view class="fenge3"></view>
					<input name="password" class="input" password="true" placeholder="请输入密码" maxlength="16" @input="getPass" />
				</view>
			</view>
			
		</view>
				<!-- 账号密码栏end-->
		
		<!-- 忘记密码 -->
		<view class="forget">
			<view class="forget2">
				<text class="fg">忘记密码？</text>
			</view>
		</view>
		<!-- 忘记密码 end-->
		
		<!-- 登录按钮 -->
		<view class="btn-login">
			<button type="primary" class="btn-style" form-type="submit" :disabled="disabled">
				登录
			</button>
		</view>
		<!-- 登录按钮 end-->
		
		</form>
		<!-- 密码提示 -->
		<view class="tip">
			<view class="tips">
				<text class="tip-text">
					提示：初始密码，默认身份证后六位
				</text>
			</view>
		</view>
		<!-- 密码提示 end-->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled:true,
				id1:"",
				password1:"",
		
			}
		},
		
		methods: {
			getNum(e){
				this.id1 = e.detail.value
				if(this.id1 !=null && this.id1 !="" && this.id1 != undefined && this.password1 !=null && this.password1 !="" && this.password1 != undefined){
					this.disabled = false;
				}else {
					this.disabled = true;
				}
			},
			getPass(re){
				this.password1 = re.detail.value
				if(this.id1 !=null && this.id1 !="" && this.id1 != undefined && this.password1 !=null && this.password1 !="" && this.password1 != undefined){
					this.disabled = false;
				}else {
					this.disabled = true;
				}
			},
			formSubmit(e){
				var me = this;
				/* 获取登录id和password */
				var id = e.detail.value.id;
				var password = e.detail.value.password;
				//发起登录请求
				uni.request({
					url: "http://134.175.204.38:66/user/login",
					data:{
						"userId":id	,			//引号内是数据库字段
 						"userPassword":password
					},
					method: 'POST',
					success: res => {
						//获取真实数据之前务必判断状态是否200.
						if(res.data.result === "succes"){
						var userInfo = res.data.message;
						uni.setStorageSync("globalUser",userInfo); //将用户信息保存
						uni.switchTab({
							url:"../me/me" //页面跳转
						})
						}else {
							uni.showToast({
								title:"输入的信息有误，请检查",
								duration:2000,
								image:"../../static/icon/error.png"
							})
						}
							},
					fail: () => {},
					complete: () => {
					},
				});
			}
		}
	}
</script>

<style>
	@import url("login.css");
</style>
