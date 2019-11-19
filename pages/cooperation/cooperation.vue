<template>
	<view>
		<view class="box">
			<view class="cu-bar search bg-white" style="display: flex;flex-direction: row;justify-content: space-between">
				<view class="flex" style="width: 100%">
					<view class="cu-bar bg-white solid-bottom" >
						<view class="action" @click="showModal()">
							<text  >{{menutitle}}</text>
							<text class="cuIcon-triangledownfill"></text>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName?'show':''" @click="hideModal" style="padding-right: 550upx; padding-left: 20upx;">
					<view class="cu-dialog" style="z-index: 9999999999999999; ">
						<view class="cu-list menu text-left solid-top" >
							<view class="cu-item" v-for="(item,i) in list" @click="dianji(i)">
								<view class="content" style="width: 100%;">
									<text class="text-grey">{{item}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 切换 -->
				<view class="flex" style="width: 100%;justify-content: center">
					<view class="cu-form-group">
						<switchc text="推|求" @change="switchchange()"></switchc>
					</view>
				</view>
				<view style="width: 100%">
					<view class="action" style="height: 100%;text-align: end;justify-content: flex-end" @click="gotoBuffer">
						<text>信息 </text>
					</view>
				</view>
			</view>

			<view v-if="switcha">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 热门推书
					</view>

					<!-- 写推书 -->
					
				</view>

				<view class="cu-card dynamic">
					<view class="cu-item shadow" v-for="(item,i) in temp">
						<navigator :url="'put-book/detail/detail?id='+ item.id ">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round lg" :style="'background-image:url('+item.user.userPic+');'"></view>
									<view class="content flex-sub">
										<view>{{item.user.userName}}</view>
										<view class="text-gray text-sm flex justify-between">
											{{item.user.userPhone}}
										</view>
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
				</view>

				<view class="cu-card dynamic">
					<view class="cu-item shadow" v-for="(item,i) in temp">
						<navigator :url="'post-book/detail/detail?id='+ item.id">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round lg" :style="'background-image:url('+item.user.userPic+');'"></view>
									<view class="content flex-sub">
										<view>{{item.user.userName}}</view>
										<view class="text-gray text-sm flex justify-between">
											{{item.user.userPhone}}
										</view>
									</view>
								</view>
							</view>
							<view class="text-content" style="padding:  30upx;">
								{{item.title}}
							</view>
							<view class="grid flex-sub padding-lr col-3 grid-square">

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
			
			<view style="display: flex; align-content: center; justify-content: center; padding: 200upx;" v-if="temp.length===0">
				暂无评论
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import switchc from '@/components/zz-switchc/zz-switchc.vue'

	var me;
	export default {
		components: {
			switchc
		},
		data() {
			return {
				menutitle: "全部",
				temp: [],
				list: ["全部", "中国文学", "外国文学", "儿童文学", "散文", "经典名著", "小说", "历史", "教育","成功励志","心灵鸡汤"],
				switcha: true,
				modalName:false,
				number:0
			};
		},
		onLoad() {
			me = this;
			this.refresh()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			refresh() {
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				me.saixuan(this.number)
			},
			saixuan(number){
				var api = "";
				if(me.switcha){
					api = "/tuishu/getTuiShu";
				}else{
					api = "/qiushu/getQiushu";
				}
				uni.request({
					url: me.serverUrl+api,
					method: "GET",
					success(res) {
						var type = me.list[number];
						var result = [];
						var data1 = res.data.data;
						var a = false;
						if(type!=="全部"){
							for (var i = 0; i < data1.length; i++) {
								var tmp = data1[i].book; 
								for (var j = 0; j < tmp.tbCatalogs.length; j++) {
									if (tmp.tbCatalogs[j].catalogName === type) {
										result.push(data1[i]);
										a = true;
										if(a) {
											break;
										}
									}
								}
							}
							me.temp = result;
						}else{
							me.temp = data1;
						}
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				})
				
			},
			dianji(number) {
				console.log(number);
				this.number = number;
				me.saixuan(number);
				me.menutitle = me.list[number]
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			showModal() {
				this.modalName = !this.modalName;
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
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				this.menutitle = '全部';
				console.log(e.value);
				me.switcha = e.value;
				me.saixuan(this.number)
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
