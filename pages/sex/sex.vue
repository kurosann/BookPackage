<template>
	<view class="page page-fill">
		
		<form @submit="formSubmitSex">
			
			<view class="page-block" style="margin-top: 20upx;">
				
				<radio-group class="radio-sex" @change="sexChange">
					<label class="radio-single">
						<radio value="1" :checked="sex == 1"/>男
					</label>
					<label class="radio-single">
						<radio value="0" :checked="sex == 0"/>女
					</label>
				</radio-group>
				
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
				sex: "-1"
			};
		},
		onLoad() {
			var me = this;
			var userInfo = uni.getStorageSync("globalUser");
			me.userInfo = userInfo;
			me.sex = userInfo.sex;
		},
		methods:{
			sexChange(e) {
				this.sex = e.detail.value;
			},
			formSubmitSex() {
				var me = this;
				var sex = me.sex;
				
				uni.request({
					url: "http://134.175.204.38:66/user/updateSex",
					data: {
						"userId": me.userInfo.userId,
						"userSex": sex
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

.radio-sex {
	display: flex;
	flex-direction: column;
}

.radio-single {
	padding: 20upx 20upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
