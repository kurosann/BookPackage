<template>
	<view class="page">
		<view class="header">
			<view class="header-one">
				<image class="header-one-message" src="../../static/icon/lingdang.png" @click="gotoBuffer"></image>
				<view class="header-one-nickname" >
					<text class="nick-text" @click="gotoInfo">{{userInfo.userNike===undefined?"点击登录":userInfo.userNike}}</text>
				</view>
				<image class="herder-one-setting" src="../../static/icon/shezhi.png" @click="gotoSetting"></image>
			</view>
			<view class="header-two" >
				<image src="../../static/icon/tushuguan.jpg" class="header-two-icon" @click="gotoInfo"></image>
			</view>
			<view class="header-three">
				<view class="header-three-money">
					余额：12.0
				</view>
				<view class="header-three-overdue">
					逾期中
				</view>
				<view class="header-three-borrow">
					可借书八本
				</view>
                <navigator url="../getBookData/getBookData">
                    <button class="cu-btn round sm" style="margin: 20upx">借阅分析</button>
                </navigator>
			</view>
		</view>
		
		<view class="body">
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item cu-item2" :class="index==TabCur?'text-blue cur':''" v-for="(text,index) in text" :key="index" @tap="tabSelect" :data-id="index">
					{{text}}
				</view>
			</scroll-view>
			
			<block v-if="TabCur==0">		
				<view class="guess-u-like">
					<view class="single-like-movie">
						<image src="http://apis.juhe.cn/goodbook/img/cb6f51ead4c4959b2d93fcbecb189b96.jpg" class="poster like-movie"></image>
							<view class="movie-desc">
								<view class="movie-title">
									生猛的进化心理学
								</view>
								<view class="movie_info">
									作者：Alan S.Miller & Satoshi Kanazawa / 金泽哲
								</view>
								<view class="movie_info">
									截至：2010年7月
								</view>
							</view>
					</view>
					
					<view class="movie-oper" @click="praiseMe">
						<view class="praise-title">逾期中</view>
					</view>
				</view>
			</block>
			
			<block v-if="TabCur==1">
				<view class="guess-u-like">
					<view class="single-like-movie">
						<image src="../../static/icon/tushuguan.jpg" class="poster like-movie"></image> 
							<view class="movie-desc">
								<view class="movie-title">
									设计心理学
								</view>
								<view class="movie_info">
									作者：唐纳德·诺曼
								</view>
								<view class="movie_info">
									截至：2019年10月29日
								</view>
							</view>
					</view>
					
					<view class="movie-oper" @click="praiseMe">
						<view class="praise-title">暂未评论</view>
					</view>
				</view>
			</block>
					
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:["正在借阅","借阅历史"],
				TabCur: 0,
				scrollLeft: 0,
				userInfo:{},
			}
		},
		onShow() {
			var me = this;
			var userInfo = uni.getStorageSync("globalUser");
			me.userInfo = userInfo;
			console.log(this.userInfo);
		},
		methods: {
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			gotoInfo(){
				let to = this.userInfo === "" ? "../login/login" : "../meInfo/meInfo";
				console.log(to);
				uni.navigateTo({
					url:to
				})
			},
			gotoSetting(){
				uni.navigateTo({
					url:"../setting/setting",
				})
			},
			gotoBuffer(){
				uni.navigateTo({
					url:"../buffer/buffer"
				})
			}
		}
	}
</script>

<style>
	@import url("me.css");
	.cu-item2{
		font-size: 12px;
	}
</style>
