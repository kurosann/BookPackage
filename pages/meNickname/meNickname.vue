<template>
	<view class="page page-fill">
		
		<form @submit="formSubmitNickname">
			
			<view class="page-block" style="margin-top: 20upx;">
				<input 
					type="text"
					name="nickname"
					:value="userInfo.userNike" 
					class="input"
					placeholder="请输入昵称"
					placeholder-class="graywords"
					maxlength="10"
					/>
			</view>
			
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
			
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
			};
		},
		onLoad() {
			var me = this;
			var userInfo = uni.getStorageSync("globalUser");
				me.userInfo = userInfo;
		},
		methods: {
			formSubmitNickname(e) {
				var me = this;
				var nickname = e.detail.value.nickname;
				console.log(nickname);
				uni.request({
					url: "http://134.175.204.38:66/user/updateNike",
					data: {
						"userId": me.userInfo.userId,
						"userNike": nickname
					},
					method: "POST",
					success(res) {
						var resData = res.data;
						if (resData.code == 0) {
							// 获得最新的用户数据
							var userInfo = resData.data;
							uni.setStorageSync("globalUser", userInfo);
							uni.navigateBack({
								delta: 1
							})
						} 
					}
				})
			}
		}
	}
</script>

<style>
/* 页面铺满屏幕 */
.page-fill {
	width:100%;
	height: 100%;
	position: absolute;
}

.graywords {
	color: #EAEAEA;
}

.input {
	height: 80upx;
	line-height: 80upx;
	width: 500upx;
	margin-left: 40upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
