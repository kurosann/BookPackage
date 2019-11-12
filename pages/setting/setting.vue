<template>
	<view class="page page-fill">
		<view class="page-block info-list">

			<view class="fenge"></view>

			<!-- 昵称 -->
			<view class="item-wapper" @click="gotoNotice">
				<view class="info-words">通知</view>
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="fenge"></view>


			<!-- 帮助与反馈 -->
			<view class="item-wapper" >
				<view class="info-words">帮助与反馈</view>
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="line"></view>

			<view class="item-wapper">
				<view class="info-words">检查更新</view>
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="line"></view>

			<view class="item-wapper" >
				<view class="info-words">去评分</view>
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="line"></view>

			<view class="item-wapper" >
				<view class="info-words">关于图书馆</view>
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>


			<view class="fenge"></view>
			<view class="item-wapper" @click="clearCache" >
				<view class="info-words">清理缓存</view>
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="fenge"></view>

		</view>

		<view class="out-view">
			<button type="primary" @click="logout" >
				退出登录
			</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
			}
		},
		onShow() {
			var me = this;
			me.userInfo = uni.getStorageSync("globalUser");
		},
		methods: {
			logout(){
				uni.removeStorageSync("globalUser");
				uni.navigateBack({
					delta: 1
				});
			},
			gotoNotice(){uni.navigateTo({
					url:"../notice/notice"
				})
			},
			clearCache(){
					uni.showActionSheet({
						itemList:["确定清理缓存"],
						success(res) {
							var index = res.tapIndex;
							if(index ==0){
								try {
								    uni.clearStorageSync();
								} catch (e) {
								    // error
								}
							}
						}
					})
			}
		}
	}
</script>

<style>
	@import url("setting.css");
</style>
