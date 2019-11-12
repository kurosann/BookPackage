<template>
	<view class="page page-fill">
		<view class="page-block info-list">
			<!-- 头像 -->
			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>
				<view class="right-wapper">
					<image src="../../static/icon/tushuguan.jpg" class="face"></image>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 昵称 -->
			<view class="item-wapper" @click="modifyNickname">
				<view class="info-words">昵称</view>
				<view class="right-wapper">
					<view class="gray-fields">
						{{userInfo.userNike}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper">
				<view class="info-words">姓名</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{userInfo.userName}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 性别 -->
			<view class="item-wapper" @click="modifySex">
				<view class="info-words">性别</view>
				<view class="right-wapper">
					<view class="gray-fields">
						<view v-if="userInfo.userSex == 1">
							男
						</view>
						<view v-else-if="userInfo.userSex == 0">
							女
						</view>
						<view v-else>
							未选择
						</view>
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper">
				<view class="info-words">学号</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{userInfo.userId}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper">
				<view class="info-words">学院</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						信息工程学院
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper" @click="modifyBirthday">
				<view class="info-words">班级</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						17软件二班
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
			};
		},
		onShow() {
			var me = this;
			var userInfo = uni.getStorageSync("globalUser");
				me.userInfo = userInfo;
		},
		methods: {
			operator(){
				var me = this;
				var globalUser = me.userInfo;
				uni.showActionSheet({
					itemList:["查看我的头像","从相册选择上传"],
					success(res) {
						var index = res.tapIndex;
						if(index == 0){
							//预览头像
							var faceArr = [];
							faceArr.push(globalUser.faceImage);
							uni.previewImage({
								urls:faceArr,
								current:faceArr[0]
							})
						}else if(index ==1){
							//选择上传头像
							uni.chooseImage({
								count:1,
								sizeType:["compressed"],
								sourceType:["album"],
								success(res) {
									var tempFliePath = res.tempFliePaths[0];
									uni.navigateTo({
										url:"../meFace/meFace?tempFilePath=" + tempFliePath
									})
								}
							})
							
						}
					}
				})
			},
			modifyNickname(){
				uni.navigateTo({
					url:"../meNickname/meNickname"
				})
			},
			modifySex(){
				uni.navigateTo({
					url:"../sex/sex"
				})
			}
		}
	}
</script>

<style>
	@import url("meInfo.css");
</style>
