<template>
	<view class="page">
		<!-- 头部 start -->
		<view class="head-mag">
			<view class="grid col-2">
				<image :src="resBookDetail.bookPic" mode="" class="img-book dsffsdfasdc"></image>
				<view class="right-text">
					<text class="olid-bottom text-lg right-text-gingle ">{{resBookDetail.bookName}}</text>
					<text class="olid-bottom text-df right-text-gingle">人气：{{resBookDetail.bookReading}}</text>
					<text class="olid-bottom text-df right-text-gingle">作者：唐纳德·诺曼</text>
					<text class="olid-bottom text-df right-text-gingle">人民出版社／2016-12</text>
				</view>
			</view>
			<text class="text-content2" style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">
				{{resBookDetail.bookSub2}}
			</text>
		</view>

		<!-- 头部end -->

		<!-- 章节目录 start -->
		<view class="cu-bar  solid-bottom margin-top sdgdfbvcxvcdf bg-white" @click.stop="jumpPage('/pages/sort/chapters?id=5d0ae34c56c75f15e0bc5bf3')">
			<view class=""><text class="text-xl ">章节目录</text></view>
			<view class=""><text class=" text-xl cuIcon-right"></text></view>
		</view>
		<!-- 章节目录end -->

		<!-- 底部start -->
		<scroll-view scroll-x class="bg-white nav" style="border-bottom: dashed 1px;border-left-color: #C8C7CC;">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index == TabCur ? 'text-green' : ''" v-for="(item, index) in tab" :key="index" @tap="tabSelect(index)">
					{{ item }}
				</view>
			</view>
		</scroll-view>

		<view class="bg-white fgdfvdfgverv" style="padding: 20upx" v-if="TabCur ==0">
			<view class="dafhrthfgxbc">
				<view class="gsjfndvosin">
					<text>所在馆：南职图书馆</text>
					<text>馆藏点：D区</text>
					<text>索书号：TP393.092/096</text>
				</view>

				<view style="display: flex;flex-direction:row;align-content: center;align-items: center">
					在馆中
				</view>
			</view>
		</view>
		<view class="cu-card dynamic no-card" v-else-if="TabCur == 1">
			<view class="cu-item shadow" v-for="(item,i) in comment">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url('+item.userPic+');'"></view>
						<view class="content flex-sub">
							<view>{{item.userName}}</view>
						</view>
					</view>
				</view>
				<view class="text-content" style="padding:  30upx;">
					{{item.content}}
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square">

				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30
				</view>

			</view>
			<view v-if="comment.length===0" class="bg-white" style="height: 200upx;display: flex;flex-direction: row;align-items: center;justify-content: center">暂无评论</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop" style="position:fixed;bottom:0;width: 100%;z-index:9999999" @click="addBook">

			<view class="bg-red submit" @click="">收藏</view>
		</view>

		<view class="cu-modal" style="z-index:10000" :class="modalName?'show':''" @click="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">成功</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					收藏成功
				</view>
			</view>
		</view>
	</view>


</template>

<script>
import share from '../common/share.js';

var _self;
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			tab: ['馆藏', '书评'],
			switchA: false,
			modalName: false,
			bookId:'',
			resBookDetail:'',
			comment:[]
		};
	},
	onLoad(params) {
		_self = this;
		uni.showLoading({
			title:'正在玩命加载'
		});
		this.fenxiang();
		this.bookId = params.bookId;
		console.log(this.bookId);

		uni.setNavigationBarColor({
			frontColor:'#000000',
			backgroundColor: '#FFFFFF'
		});
		this.refresh();

	},
	// 监听原生导航栏
	onNavigationBarButtonTap(e) {
		var index = e.index;
		if (index == 0) {
			this.shareInfo();
		}
	},
	onPullDownRefresh() {
		_self.refresh()
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: '自定义分享标题',
			path: '/pages/test/test?id=123'
		};
	},
	methods: {
		refresh(){
			this.getBookDetail(this.bookId);
		},
		tabSelect(index) {
			this.TabCur = index;
            console.log(this.TabCur);
            this.scrollLeft = (index - 1) * 60;
		},
		SwitchA(e) {
			this.switchA = !this.switchA;
			for (let i = 0; i < this.list.length; i++) {
				this.list[i].check = this.switchA;
			}
		},
		//设置该小说
		jumpPage(url){
			if(url && typeof(url)=='string'){
				uni.navigateTo({
					url: url,
					animationType: 'zoom-out'
				});
			}
		},
		getBookDetail(bookId) {
			uni.request({
				url: this.serverUrl + '/book/getBookById?bookId='+bookId,
				success: res => {
					this.resBookDetail = res.data.data;
					console.log(res.data.data);
					_self.requestGetBookComment()
				},
				complete(res) {
					uni.hideLoading();
				}
			});
		},
		addBook() {
			uni.request({
				method:"POST",
				data:{
					userId:_self.userId,
					bookId:_self.bookId
				},
				url: this.serverUrl + '/book/addSave',
				success: res => {
					_self.showModal()
				},
				complete(res) {
				}
			});
		},
		fenxiang() {
			uni.setTabBarItem({
				index: 0,
				text: 'text',
				iconPath: '/path/to/iconPath',
				selectedIconPath: '/path/to/selectedIconPath'
			});
		},
		showModal(e) {
			this.modalName = true;
			setTimeout(()=>{
				this.hideModal()
			},2000);
		},
		hideModal(e) {
			this.modalName = false;
		},
		requestGetBookComment() {
			uni.request({
				url:this.serverUrl + '/comment/getCommentByBookId?bookId=' + this.bookId,
				method:'GET',
				success(res) {
					_self.comment = res.data.data;
					console.log(_self.comment);
				},
				complete(res) {
					uni.stopPullDownRefresh();
					uni.hideLoading();
					uni.hideNavigationBarLoading()
				}
			})
		},
		shareInfo() {

			let shareInfo = {
				href: 'https://uniapp.dcloud.io',
				title: '分享测试',
				desc: '分享测试',
				imgUrl: '/static/logo.png'
			};
			let shareList = [
				{
					icon: '/static/sharemenu/wx.png',
					text: '微信好友'
				},
				{
					icon: '/static/sharemenu/pyq.png',
					text: '朋友圈'
				},
				{
					icon: '/static/sharemenu/weibo.png',
					text: '微博'
				},
				{
					icon: '/static/sharemenu/qq.png',
					text: 'QQ'
				},
				{
					icon: '/static/sharemenu/copy.png',
					text: '复制'
				},
				{
					icon: '/static/sharemenu/more.png',
					text: '更多'
				}
			];
			this.shareObj = share(shareInfo, shareList, function(index) {
				console.log('点击按钮的序号: ' + index);
				let shareObj = {
					href: shareInfo.href || '',
					title: shareInfo.title || '',
					summary: shareInfo.desc || '',
					success: res => {
						console.log('success:' + JSON.stringify(res));
					},
					fail: err => {
						console.log('fail:' + JSON.stringify(err));
					}
				};
				switch (index) {
					case 0:
						shareObj.provider = 'weixin';
						shareObj.scene = 'WXSceneSession';
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 1:
						shareObj.provider = 'weixin';
						shareObj.scene = 'WXSenceTimeline';
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 2:
						shareObj.provider = 'sinaweibo';
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 3:
						shareObj.provider = 'qq';
						shareObj.type = 1;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 4:
						uni.setClipboardData({
							data: shareInfo.href,
							complete() {
								uni.showToast({
									title: '已复制到剪贴板'
								});
							}
						});
						break;
					case 5:

						break;
				}
			});
			this.$nextTick(() => {
				this.shareObj.alphaBg.show();
				this.shareObj.shareMenu.show();
			});
		}
	}
};
</script>

<style>
@import url('bookDetail.css');
</style>
