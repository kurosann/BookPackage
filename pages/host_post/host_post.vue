<template>

	<view>


		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabNav[index]}}
			</view>
		</scroll-view>
		<block v-if="TabCur==0">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue">{{tabNav[0]}}</text>
				</view>
			</view>

			<view class="padding bg-white">
				<view class="sing-like-movie" v-for="(movieLike,gIndex) in dd">
					<image :src="movieLike.bookPic" class="like-movie"></image>
					<view class="movie-desc">
						<view class="movie-title">
							{{movieLike.bookName}}
						</view>
						<view class="movie-info">
							{{movieLike.bookReading}}
						</view>
						<view class="movie-infotwo">
							{{movieLike.bookName}}
						</view>

					</view>

				</view>

			</view>
		</block>
		<block v-if="TabCur==1">
			<view class="cu-bar bg-white  margin-top solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue">{{tabNav[1]}}</text>

				</view>


			</view>
			<view class="padding bg-white">
				<view class="sing-like-movie" v-for="(movieLike,gIndex) in dd1">
					<image :src="movieLike.bookPic" class="like-movie"></image>
					<view class="movie-desc">
						<view class="movie-title">
							{{movieLike.bookName}}
						</view>
						<view class="movie-info">
							{{movieLike.bookReading}}
						</view>
						<view class="movie-infotwo">
							{{movieLike.bookName}}
						</view>

					</view>

				</view>

			</view>

		</block>
		<block v-if="TabCur==2">
			<view class="cu-bar bg-white margin-top solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue">{{tabNav[2]}}</text>
				</view>
			</view>
			<view class="padding bg-white">
				<view class="sing-like-movie" v-for="(movieLike,gIndex) in dd2">
					<image :src="movieLike.bookPic" class="like-movie"></image>
					<view class="movie-desc">
						<view class="movie-title">
							{{movieLike.bookName}}
						</view>
						<view class="movie-info">
							{{movieLike.bookReading}}
						</view>
						<view class="movie-infotwo">
							{{movieLike.bookName}}
						</view>

					</view>

				</view>

			</view>
		</block>
		<block v-if="TabCur==3">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue">{{tabNav[3]}}</text>
				</view>
			</view>
			<view class="padding bg-white">
				<view class="sing-like-movie" v-for="(movieLike,gIndex) in dd3">
					<image :src="movieLike.bookPic" class="like-movie"></image>
					<view class="movie-desc">
						<view class="movie-title">
							{{movieLike.bookName}}
						</view>
						<view class="movie-info">
							{{movieLike.bookReading}}
						</view>
						<view class="movie-infotwo">
							{{movieLike.bookName}}
						</view>

					</view>

				</view>

			</view>
		</block>
		<block v-if="TabCur==4">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue">{{tabNav[4]}}</text>
				</view>
			</view>
			<view class="padding bg-white">
				<view class="sing-like-movie" v-for="(movieLike,gIndex) in dd4">
					<image :src="movieLike.bookPic" class="like-movie"></image>
					<view class="movie-desc">
						<view class="movie-title">
							{{movieLike.bookName}}
						</view>
						<view class="movie-info">
							{{movieLike.bookReading}}
						</view>
						<view class="movie-infotwo">
							{{movieLike.bookName}}
						</view>

					</view>

				</view>

			</view>
		</block>





	</view>


</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"

	export default {

		data() {
			return {
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前',
					checked: true
				}, {
					value: 'loading',
					text: '加载中',
					checked: false
				}, {
					value: 'noMore',
					text: '没有更多',
					checked: false
				}],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				TabCur: 0,
				scrollLeft: 0,
				tag: ["摄影", "音乐", "会话", "运动", "生活"],
				start: 0,
				start1: 0,
				start2: 0,
				start3: 0,
				start4: 0,
				limit: 10,
				dd: [],
				dd1: [],
				dd2: [],
				dd3: [],
				dd4: [],
				ttt: 0,
				yvgao: [],
				yvlantu: [],
				CustomBar: this.CustomBar,
				tabNav: ['摄影', '音乐', '会话', '运动', '生活']
			}
		},
		onLoad() {
			var me = this;
			uni.showLoading({
				title: "正在加载。。。",
				mask: true
			})
			uni.request({
				url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=' + me.start + '&limit=' + me.limit,
				success: (res) => {

					var dd = res.data.data;
					me.dd = dd;

				}
			})
			uni.request({
				url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=外国文学&start=' + me.start1 + '&limit=' + me.limit,
				success: (res) => {

					var dd = res.data.data;
					me.dd1 = dd;

				}
			})
			uni.request({
				url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=儿童文学&start=' + me.start2 + '&limit=' + me.limit,
				success: (res) => {

					var dd = res.data.data;
					me.dd2 = dd;

				}
			})
			uni.request({
				url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=经典名著&start=' + me.start3 + '&limit=' + me.limit,
				success: (res) => {

					var dd = res.data.data;
					me.dd3 = dd;

				}
			})
			uni.request({
				url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=成功励志&start=' + me.start4 + '&limit=' + me.limit,
				success: (res) => {

					var dd = res.data.data;
					me.dd4 = dd;

				}
			})
			uni.hideLoading();
		},
		onReachBottom() {
			var me = this;

			if (me.ttt == 0) {
				me.next();
			} else if (me.ttt == 1) {
				me.next1();
			} else if (me.ttt == 2) {
				me.next2();
			} else if (me.ttt == 3) {
				me.next3();
			} else if (me.ttt == 4) {
				me.next4();
			}

		},
		methods: {

			tabSelect(e) {
				var me = this;
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				console.log("TabCur:" + this.TabCur)
				console.log("scrollLeft:" + this.scrollLeft)
				me.ttt = this.TabCur;
				if (me.ttt == 0) {
					uni.request({
						url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=' + 0 + '&limit=' + 10,
						success: (res) => {
							me.dd = [];
							var dd = res.data.data;
							me.dd = dd;

						}
					})
				} else if (me.ttt == 1) {
					uni.request({
						url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=外国文学&start=' + 0 + '&limit=' + 10,
						success: (res) => {
							me.dd = [];
							var dd = res.data.data;
							me.dd1 = dd;

						}
					})
				} else if (me.ttt == 2) {
					uni.request({
						url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=儿童文学&start=' + 0 + '&limit=' + 10,
						success: (res) => {
							me.dd = [];
							var dd = res.data.data;
							me.dd2 = dd;

						}
					})
				} else if (me.ttt == 3) {
					uni.request({
						url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=经典名著&start=' + 0 + '&limit=' + 10,
						success: (res) => {
							me.dd = [];
							var dd = res.data.data;
							me.dd3 = dd;

						}
					})
				} else if (me.ttt == 4) {
					uni.request({
						url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=成功励志&start=' + 0 + '&limit=' + 10,
						success: (res) => {
							me.dd = [];
							var dd = res.data.data;
							me.dd4 = dd;

						}
					})
				}
			},
			next() {
				var me = this;
				me.start = me.start + 10;
				uni.showLoading({
					title: "正在加载。。。",
					mask: true
				})
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=' + me.start + '&limit=' + me.limit,
					success: (res) => {

						var ww = res.data.data;
						me.dd = me.dd.concat(ww);

					}
				})
				uni.hideLoading();
			},
			next1() {
				var me = this;
				me.start1 = me.start1 + 10;
				uni.showLoading({
					title: "正在加载。。。",
					mask: true
				})
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=外国文学&start=' + me.start1 + '&limit=' + me.limit,
					success: (res) => {

						var ww = res.data.data;
						me.dd1 = me.dd1.concat(ww);

					}
				})
				uni.hideLoading();
			},
			next2() {
				var me = this;
				me.start2 = me.start2 + 10;
				uni.showLoading({
					title: "正在加载。。。",
					mask: true
				})
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=儿童文学&start=' + me.start2 + '&limit=' + me.limit,
					success: (res) => {

						var ww = res.data.data;
						me.dd2 = me.dd2.concat(ww);

					}
				})
				uni.hideLoading();
			},
			next3() {
				var me = this;
				me.start3 = me.start3 + 10;
				uni.showLoading({
					title: "正在加载。。。",
					mask: true
				})
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=经典名著&start=' + me.start3 + '&limit=' + me.limit,
					success: (res) => {

						var ww = res.data.data;
						me.dd3 = me.dd3.concat(ww);

					}
				})
				uni.hideLoading();
			},
			next4() {
				var me = this;
				me.start4 = me.start4 + 10;
				uni.showLoading({
					title: "正在加载。。。",
					mask: true
				})
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=成功励志&start=' + me.start4 + '&limit=' + me.limit,
					success: (res) => {

						var ww = res.data.data;
						me.dd4 = me.dd4.concat(ww);

					}
				})
				uni.hideLoading();
			}

		},

		components: {
			uniLoadMore
		}



	}
</script>

<style>
	@import url("host_post.css");

	page {
		padding-top: 45px;
	}
</style>
