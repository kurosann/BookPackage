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

					<view>
						<button class="cu-btn round" style="margin: 8px;" @click="supportPlus()">
							同求 +{{temp.star}}
						</button>
					</view>
				</view>
			</view>

			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 23条回复
			</view>

			<view>
				<view v-for="(item,i) in temp.tbQiushupinglun">
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
					<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300"
						   cursor-spacing="10" @focus="InputFocus"
						   @blur="InputBlur" v-model="input"/>
					<view class="action">
						<text class="cuIcon-emojifill text-grey"></text>
					</view>
					
					<button class="cu-btn bg-green shadow" @click="addQiushu()">发送</button>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	var me ;
	export default {
		data() {
			return {
				input:"",
				tuishuList:[],
				temp: [],
				InputBottom: 0,
				id: ""
			}
		},
		onLoad(data) {
			me = this;
			me.id = data.id;
			uni.showLoading({
				mask: true,
				title: "请稍后..."
			});
			me.refresh({success(title) {
				uni.setNavigationBarTitle({
					title: title
				})
			}});
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			supportPlus() {
				this.temp++;
			},
			refresh(a){
				
				uni.request({
					url: me.serverUrl+"/qiushu/getQiuShuAndPinglunByQiuShuId?qiushuId=" + me.id,
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
			addQiushu(){
				
				uni.request({
					url: me.serverUrl+"/qiushu/addPinglun" ,
					data:{
						"qiushuId": me.temp.id,
						"userId": me.userId,
						"content": me.input
						
					},
					method: 'POST',
					
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
