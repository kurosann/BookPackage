<template>
	<view>
		<view class="cu-list menu-avatar" v-for="(item,i) in tuishuList">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
				<view class="content flex-sub">
					<view>
						{{item.user.userNike}}
					</view>
					<view class="text-gray text-sm flex justify-between">
						{{item.user.userPhone}}
					</view>

				</view>
			</view>

			<view class="solids-bottom padding-xs flex align-center" style="background-color: #FFFFFF;">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xl padding">
						<text class="text-black text-bold">{{item.book.bookName}}</text>
					</view>
					<view class="padding">{{item.book.bookSub2}}</view>
					<view class="cu-list menu-avatar" style="margin: 50upx;border-width:1px;border-color: #cccccc;  border-style: solid; ">
						<view class="cu-item">
							<view class="cu-avatar radius" style="background-image
							:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
							<view class="content flex-sub">
								<view>
									{{item.book.bookName}}
								</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.book.bookTags}}
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
				<view v-for="(item,i) in temp">
					<view class="cu-list menu-avatar">

						<view class="cu-item">

							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
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

						<view class="text-content" style="background-color: #FFFFFF;padding:  50upx  50upx 10upx 50upx ;">
							{{item.book.bookSub1}}
						</view>
						<view class="cu-chat" style="background-color: #FFFFFF;">
							<view class="cu-info" style="background-color: rgba(180,180,180,0.4);color: #444;max-width: 600rpx;">
								@秋刀鱼：这本好书，我推荐一下，好热闹你的观点
							</view>
						</view>
					</view>
				</view>
				<!-- 打字框 -->
				<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
					<view class="action">
						<text class="cuIcon-sound text-grey"></text>
					</view>
					<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" @focus="InputFocus"
					 @blur="InputBlur"></input>
					<view class="action">
						<text class="cuIcon-emojifill text-grey"></text>
					</view>
					<button class="cu-btn bg-green shadow">发送</button>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tuishuList:[],
				temp: [],
				InputBottom: 0
			}
		},
		onLoad() {
			var me = this;
			uni.request({
				url: "http://134.175.204.38:66/tuishu/getTuiShu",
				method: "GET",
				success(res) {
					me.temp = [];
					var temp = res.data.data;
					me.temp = temp;
					console.log(temp);
				}
			})
			uni.request({
				url: "http://134.175.204.38:66/tuishu/getTuiShu",
				method: "GET",
				success(res) {
					me.tuishuList = [];
					var tuishuList = res.data.data;
					me.tuishuList = tuishuList;
					console.log(tuishuList);
				}
			})
		},
		methods: {
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
