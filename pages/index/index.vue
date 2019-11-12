<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<navigator url="../search/search" style="width: 100%;">
				<view class="search-form round" style="background-color: rgba(255,255,255,0.3);">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入书名进行搜索"
					 confirm-type="search" />
				</view>
				</navigator>
			<!-- <view class="action"><button class="cu-btn bg-green shadow-blur round">搜索</button></view> -->
		</view>
		<!-- 搜索框end -->
		<!-- 轮播图 -->
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item, index) in banner" :key="index" @click="swiperClick(item.bookId)">
					<image :src="item.bannerPic" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图end -->

		<!-- 第二栏按钮start -->
		<view class="flex  justify-around margin-xs margin-top">
			<navigator url="../rank/rank?title=分类榜">
				<button class="cu-btn lines-grey shadow">分类榜</button>
			</navigator>
			<navigator url="../rank/rank?title=借阅榜">
				<button class="cu-btn lines-grey shadow">借阅榜</button>
			</navigator>
			<navigator url="../rank/rank?title=新书榜">
				<button class="cu-btn lines-grey shadow">新书榜</button>
			</navigator>
		</view>
		<!-- 第二栏按钮 end-->

		<!-- 大学必读 start -->
		<view class="dsfsfds" >
			<navigator url="../sort/sort">
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action"><text class="cuIcon-titles text-gray ">大学必读</text></view>
					<view class="action"><text class=" ">更多 ></text></view>
				</view>
			</navigator>
			<view class="cu-card article no-card gdfgsd">
				<view class="cu-item shadow">
					<navigator :url="'../bookDetail/bookDetail?bookId='+books_data[0].bookId">
						<view class="content">
							<view class="">
								<image :src="books_data[0].bookPic" class="img-book22"></image>
							</view>
							<view class="desc" style="margin-left: 26upx;">
								<view class="text-bold text-xl">{{ books_data[0].bookName }}</view>
								<view class="text-lg" style=" margin-top: 16upx;">简介：</view>
								<view class="text-content" style="height: 100%; margin-top: 6upx;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;">
									{{books_data[0].bookSub2}}
								</view>
							</view>
						</view>
					</navigator>
					<view class="grid col-3 padding-xs">
						<view class="padding-xs" v-for="(item, index) in books_data" :key="index">
							<navigator :url="'../bookDetail/bookDetail?bookId=' + item.bookId">
								<view class="padding radius text-center shadow-blur bg-white">
									<image :src="item.bookPic" class="img-book" mode=""></image>
									<text class="book-name">{{ item.bookName }}</text>
								</view>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 大学必读end -->

		<!-- 兴趣热推 start -->
		<view class="dsfsfds">
			<navigator url="../host_post/host_post">
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action"><text class="cuIcon-titles text-gray ">兴趣热推</text></view>
					<view class="action"><text class=" ">更多 ></text></view>
				</view>
			</navigator>
			<view class="cu-card article no-card gdfgsd">
				<view class="cu-item shadow">
					<view class="grid col-3 padding-xs">
						<view class="padding-xs" v-for="(item, index) in books_data" :key="index">
							<navigator :url="'../bookDetail/bookDetail?bookId=' + item.bookId">
								<view class="padding radius text-center shadow-blur bg-white">
									<image :src="item.bookPic" class="img-book" mode="aspectFill"></image>
									<text class="book-name">{{ item.bookName }}</text>
								</view>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 兴趣热推end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				b: ['', '', ''],
				res_book_type: [],
				books_data: [],
				xingquretui: [],
				start: 0,
				banner: [],
				ColorList: this.ColorList
			};
		},
		onLoad() {
			this.refresh()
		},
		onPullDownRefresh(){
			this.refresh()
		},
		methods: {
			refresh() {
				var index = this;
				uni.showLoading({
					title:'正在玩命加载'
				});
				uni.request({
					url:this.serverUrl + '/banner/getBanner',
					success(res) {
						index.banner = res.data.message;
					},
					complete(res) {
						index.getBooks();
					}
				});
			},
			getBooks() {
				var index = this;
				this.start = 0;
				uni.request({
					url: this.serverUrl + '/book/getRandomBook?limit='+9,
					success: (res) => {
						for (let i = 0; i < res.data.data.length; i++) {
							index.books_data = res.data.data
						}
					},
					fail: () => {

					},
					complete: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						uni.hideNavigationBarLoading()
					}
				});
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			swiperClick(bookId) {
				console.log(bookId);
				uni.navigateTo({
					url: '../bookDetail/bookDetail?bookId=' + (bookId+10)
				});
			}
		}
	};
</script>

<style>
	@import url('index.css');
</style>
