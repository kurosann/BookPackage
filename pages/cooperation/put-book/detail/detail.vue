<template>
	<view>
		<view class="cu-list menu-avatar" >
			<view class="cu-item">
				<view class="cu-avatar round lg" :style="'background-image:url('+temp.user.userPic+')'"></view>
				<view class="content flex-sub">
					<view>
						{{temp.user.userName}}
					</view>
					<view class="text-gray text-sm flex justify-between">
						{{temp.user.userPhone}}
					</view>

				</view>
			</view>

			<view class="solids-bottom padding-xs flex align-center" style="background-color: #FFFFFF;">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xl padding">
						<text class="text-black text-bold">{{temp.title}}</text>
					</view>
					<view class="padding">{{temp.content}}</view>
					<view class="cu-list menu-avatar" style="margin: 50upx;border-width:1px;border-color: #cccccc;  border-style: solid; ">
						<view class="cu-item">
							<view class="cu-avatar radius" :style="'background-image:url('+temp.book.bookPic+')'"></view>
							<view class="content flex-sub">
								<view>
									{{temp.book.bookName}}
								</view>
								<view class="text-gray text-sm flex justify-between" style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;">
									{{temp.book.bookSub2}}
								</view>

							</view>
						</view>
					</view>
					<view>
						<button class="cu-btn round" :key="i" style="margin: 8px;">
							同求
						</button>
					</view>
				</view>
			</view>

			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 23条回复
			</view>

			<view>
				<view v-for="(item,i) in temp.tbTuishupinglun">
					<view class="cu-list menu-avatar">

						<view class="cu-item">

							<view class="cu-avatar round lg" :style="'background-image:url('+item.user.userPic+')'"></view>
							<view class="content flex-sub">
								<view>{{item.user.userName}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.user.userPhone}}
								</view>
							</view>

							<view class="text-gray text-sm text-right padding">
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
							</view>
						</view>

						<view class="text-content" style="background-color: #FFFFFF;padding:  30upx;">
							{{item.content}}
						</view>
						
					</view>
				</view>
				<!-- 打字框 -->
				<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
					<view class="action">
						<text class="cuIcon-sound text-grey"></text>
					</view>
					<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" @focus="InputFocus"
					 @blur="InputBlur" v-model="input"></input>
					<view class="action">
						<text class="cuIcon-emojifill text-grey"></text>
					</view>
					
					<button class="cu-btn bg-green shadow" @click="addTuishu()">发送</button>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	var me;
	export default {
		data() {
			return {
				input:"",
				tuishuList:[],
				temp: [],
				InputBottom: 0,
				id:""
			}
		},
		onLoad(data) {
		   uni.showLoading({
		   	mask: true,
		   	title: "请稍后..."
		   });	
			me = this;
			me.id = data.id;
			me.refresh({success(title) {
				uni.setNavigationBarTitle({
					title:title
				})
			}});
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			refresh(a){
				uni.request({
					url: me.serverUrl+"/tuishu/getTuiShuAndPingLunByTuiShuId?tuishuId=" + me.id,
					method: "GET",
					success(res) {
						me.temp = [];
						var temp = res.data.data;
						me.temp = temp;
						console.log(temp);
						a.success(temp.title)
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				})
			},
			addTuishu(){
				
				uni.request({
					url: me.serverUrl+"/tuishu/addPinglun" ,
					data:{
						tuishuId: me.temp.id,
						userId: me.temp.userId,
						content: me.input
						
					},
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					success(res) {
						me.refresh();
						console.log("success")
					}
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}
</style>
