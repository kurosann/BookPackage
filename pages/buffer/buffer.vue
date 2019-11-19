<template>
	<view class="buffer-page">
		<view class="line"></view>
		<scroll-view scroll-x class="bg-white nav">
		<view class="flex text-center">
			<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(text,index) in text" :key="index" @tap="tabSelect" :data-id="index">
				{{text}}
			</view>
		</view>
		</scroll-view>
		
		<view v-if="TabCur==0" v-for="(item,index) in lists" :key="index">
			<view class="body">
				<view class="reader-icon-view">
					<image :src="item.userPic" class="reader-icon"></image>
				</view>
				<view class="reader-name-view">
					<text class="reader-name">{{item.userName}}</text>
					<text class="reader-zan">赞了你的图书</text>
				</view>
				<view class="comment-date">
					<view class="">{{item.date}}</view>
				</view>
			</view>
			
			<view class="my-comment">
				<view class="comment-context">
					<view class="comment-context2">
						<trailerStars ></trailerStars>
						<view class="me-comment">
							{{item.content}}
						</view>
					</view>
					<view class="fenge"></view>
					<view class="book-name">
						书籍：{{item.book.bookName}}
					</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		
		<view v-if="TabCur==1">
			<!-- <view class="line2"></view> -->
			<view class="body">
				<view class="reader-icon-view">
					<image src="../../static/icon/tushuguan.jpg" class="reader-icon"></image>
				</view>
				<view class="reader-name-view">
					<text class="reader-name">13212313</text>
				</view>
				<view class="comment-date">
					<view class="">2018年10月23日</view>
				</view>
			</view>
			
			<view class="message">
				你借阅了一本书 - 生猛的进化心理学
			</view>
			
			<view class="line"></view>
		</view>
		
	</view>
</template>

<script>
	import trailerStars from "../../components/trailerStars.vue"

	var _self;
	export default {
		data() {
			return {
				text:["书评","系统"],
				TabCur: 0,
				scrollLeft: 0,
				id:1,
				lists:[],
			}
		},
		onLoad() {
			_self = this;
			this.refresh()
		},
		methods: {
			refresh() {
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.request({
					url: this.serverUrl + "/comment/getCommentByUserId?userId=" + this.userId,
					method: 'GET',
					success: res => {
						var lists = res.data.data;
						for (let i = 0; i < lists.length; i++) {
							_self.requestGetBook(i,lists)
						}
					},
				})
			},
			requestGetBook(index,lists) {
				uni.request({
					url: this.serverUrl + "/book/getBookById?bookId=" + lists[index].bookId,
					method: 'GET',
					success(res) {
						lists[index].book = res.data.data;
						_self.lists.push(lists[index])
					},
					complete(res) {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				})

			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				}
			
		},
		components:{
			trailerStars
		}
	}
</script>

<style>
	@import url("buffer.css");
	.message{
		padding-right: 30upx;
		padding-left: 140upx;
	}
	.line{
		margin-top: 30upx;
	}
	.line2{
		height: 1px;
		background-color: orange;
	}
	.reader-name{
		color: #333333;
	}
</style>
