<template>
	<view>
		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text @tap="showModal" data-target="menuModal">全部</text>
						<text class="cuIcon-triangledownfill"></text>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='menuModal'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-list menu text-left solid-top">
							<view class="cu-item" v-for="(item,i) in list" @click="dianji(i)">
								<view class="content">
									<text class="text-grey">{{item}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 切换 -->
				<view class="cu-form-group margin-top">
					<switchc text="推书|求书" @change="switchchange()"></switchc><!-- @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false" -->
				</view>
				<view class="action">
					<text>信息 </text>
					<view class="cu-bar bg-white tabbar border shop">
						<view class="cu-tag badge">6</view>
					</view>
				</view>
			</view>

			<view v-if="switcha">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 热门推书
					</view>

					<!-- 写推书 -->
					<view>
						<navigator url="put-book/put-book">
							<view>
								<button class="cu-btn round" :key="i" style="margin: 8px;">
									写推书
								</button>
							</view>
						</navigator>
					</view>
				</view>

				<view class="cu-card dynamic" :class="isCard?'no-card':''">
					<view class="cu-item shadow" v-for="(item,i) in temp">
						<navigator url="put-book/detail/detail">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round lg" style="background-image:url({item.user.userPic});"></view>
									<view class="content flex-sub">
										<view>{{item.user.userName}}</view>
										<view class="text-gray text-sm flex justify-between">
											{{item.user.userPhone}}
										</view>
									</view>
								</view>
							</view>
							<view class="text-content">
								{{item.user.userNike}}
							</view>
							<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">

							</view>
							<view class="text-gray text-sm text-right padding">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
								<text class="cuIcon-messagefill margin-lr-xs"></text> 30
							</view>
						</navigator>

					</view>
				</view>
			</view>

			<view v-if="!switcha">
				<!-- 求书 -->
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 热门求书
					</view>

					<!-- 写求书 -->
					<navigator url="post-book/post-book">
						<view>
							<button class="cu-btn round" :key="i" style="margin: 8px;">写求书</button>
						</view>
					</navigator>
				</view>

				<view class="cu-card dynamic" :class="isCard?'no-card':''">
					<view class="cu-item shadow" v-for="(item,i) in temp">
						<navigator url="put-book/detail/detail">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round lg" style="background-image:url({+item.user.userPic+});"></view>
									<view class="content flex-sub">
										<view>{{item.user.userName}}</view>
										<view class="text-gray text-sm flex justify-between">
											{{item.user.userPhone}}
										</view>
									</view>
								</view>
							</view>
							<view class="text-content">
								{{item.user.userNike}}
							</view>
							<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">

							</view>
							<view class="text-gray text-sm text-right padding">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
								<text class="cuIcon-messagefill margin-lr-xs"></text> 30
							</view>
						</navigator>

					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import switchc from '@/components/zz-switchc/zz-switchc.vue'

	export default {
		components: {
			switchc
		},
		data() {
			return {
				temp: [],
				list: ["全部", "理学", "农业", "法学", "工学", "哲学", "文学", "艺术学", "管理学"],
				switcha: true,

			};
		},
		onLoad() {
			var me = this;
			uni.showLoading({
				mask: true,
				title: "请稍后..."
			});

			uni.request({
				url: "http://nanhai655.cn:8080/user/xiangqing",
				methods: "POST",
				success: (res) => {

					var trailerList = res.data.list;
					me.trailerList = trailerList;
				},
				complete: () => {
					uni.hideNavigationBarLoading();
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}
			})


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

		},
		methods: {
			dianji(number) {
				console.log(number);
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				console.log(this.modalName)
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			switchchange(e) {
				var me = this;
				console.log(e.value);
				me.switcha = e.value;

			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
