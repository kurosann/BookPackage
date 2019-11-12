<template>
	<div class='borderBox outer-div' :style="{height: isExpand? 'calc(100vh - 250px)': 'calc(100vh - 50px)'}">
		<scroll-view class='borderBox chat-div-box' scroll-y
			@click="clickScroll" :scroll-with-animation="animateScroll" :scroll-into-view="scrollIntoId" @scrolltoupper="scrolltoupper"
				@scroll="scroll">
			
			<!--上下滚动按钮-->
			<div class="scroll-btn-div" :style="{top: isExpand? '274px': '74px'}">
				<image class='shang' src="../../../static/img/xiangshang.png" mode="" @click.stop="scrollTop"></image>
				<image class='xia' src="../../../static/img/xiangxia.png" mode="" @click.stop="scrollBottom"></image>
			</div>
			
			<!--右边生态商城、推广，跳转入口按钮-->
			<!-- <div class="jump-btn-div">
				<image src="../../../static/img/shengtaishangcheng.png" mode=""></image>
				<navigator url="/chat/pages/tuiguang/index">
					<image src="../../../static/img/tuiguang.png" mode=""></image>
				</navigator>
			</div> -->
			
			<!--消息列表-->
			<div class="borderBox message-div-box">
				<ul class="list-div">
					<li class="list" v-for="(item,i) in messageList" :key="i" :id="'item'+i">
						<p class="time">{{item.new_create_time}}</p>
						<!--购物消息-->
						<div class="flex buy-message" v-if="item.content.content.type=='buy' ||item.content.content.type=='seeGoods'">
							<div class="img-div">
								<image class='bag' src="../../../static/img/bag.png" mode="widthFix"></image>
							</div>
							<div class="txt-div" @click.stop="jumpGoodsDetail(i)">
								{{item.content.content.nickname}} <span>{{item.content.content.type=='buy'? '购买了商品': '正在去买'}}</span>
								<span class='red'>{{item.content.content.content}}</span>
							</div>
						</div>
						<!--抢到红包消息-->
						<div class="flex buy-message get-money-div" v-else-if="item.content.content.type=='money_get'">
							<div class="img-div">
								<image class='money' src="../../../static/img/duihuanquan.png" mode="widthFix"></image>
							</div>
							<div class="txt-div">
								{{item.content.content.nickname}} 抢了
								<span class='red'>{{item.content.content.money}}元</span>
							</div>
						</div>
						<!--禁言和解除禁言消息-->
						<div class="banned-div" v-else-if="item.content.content.type=='banned' || item.content.content.type=='unbanned'"
							><span>{{item.content.content.content}}</span></div>
						<!--聊天消息-->
						<div class="chat-message" v-else>
							<!--不是自己的消息-->
							<div class="flex msg-div" v-if="userInfo.id!=item.uid">
								<!-- <image class="avatar" v-if="allOnlineUersInfo[item.uid]" :src="allOnlineUersInfo[item.uid].headimgurl"
									@longpress.stop="aitePerson(i)"></image> 以下换成使用背景图片-->
								<div class="avatar" :style="{'background-image': 'url('+allOnlineUersInfo[item.uid].headimgurl+')'}"
									v-if="allOnlineUersInfo[item.uid]"
									@longtap.stop="aitePerson(i)" @click.stop="aitePerson(i)"></div>
								<div class="borderBox content-div">
									<p class="nickname" v-if="allOnlineUersInfo[item.uid]">
										{{allOnlineUersInfo[item.uid].nickname}}
										<span class="tag" v-if="allOnlineUersInfo[item.uid].tag">{{allOnlineUersInfo[item.uid].tag}}</span>
									</p>
									<!--图片消息-->
									<div class="flex img-div" v-if="item.content.content.type=='image'" >
										<image class='msg'
											:src="item.content.content.content" mode="widthFix"
											@click.stop="previewImage(i)"/>
										<!--只有群聊天管理员可见-->
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
									<!--语音消息-->
									<div class="flex voice-message-div" v-if="item.content.content.type=='voice'">
										<div class="flex voice-message" @click.stop="playAudio(i)">
											<i class="iconfont icon-audio"></i>
											<span class="time">{{item.content.content.time_txt}}</span>
											<span class="txt">{{(chooseIndex==i&&isPlaying)?'正在播放...': '点击播放'}}</span>
										</div>
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
									<!--表情消息-->
									<div class="flex biaoqing-div" v-if="item.content.content.type=='expression'" >
										<div class="img-div">
											<image class='msg'
												:src="item.content.content.content" mode="widthFix" />
										</div>
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
									<!--商品消息-->
									<div class="flex goodsdetail-div" v-if="item.content.content.type=='goods'" >
										<div class="img-div" @click.stop="jumpGoodsDetail(i)">
											<image class='msg'
												:src="item.content.content.picture" mode="widthFix" />
											<p class="burt_ellipsis2 title">{{item.content.content.content}}</p>
											<p class="price">￥{{item.content.content.price}}</p>
										</div>
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
									<!--发红包消息-->
									<div class="flex red-bag-div" v-if="item.content.content.type=='money'">
										<div class="flex borderBox inner-div" @click.stop="openRedbag(i)">
											<div class="img-div">
												<image src="../../../static/img/redbag-msg.png"></image>
											</div>
											<div class="right-div">
												<p class="burt_ellipsis txt1">{{item.content.content.content}}</p>
												<p class="status">{{item.content.content.status? '可领取': '红包已领完'}}</p>
											</div>
										</div>
									</div>
									<!--文字消息-->
									<div class="flex content-msg" v-if="item.content.content.type=='text'">
										<div class="borderBox text-neirong-div">
											<span>{{item.content.content.content}}</span>
										</div>
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
									<!--艾特某人消息-->
									<div class="flex content-msg" v-if="item.content.content.type=='at'">
										<div class="borderBox text-neirong-div">
											<span class="aite">@{{item.content.content.nickname}}</span>
											<span>{{item.content.content.content}}</span>
										</div>
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
									<!--艾特全体成员消息-->
									<div class="flex content-msg" v-if="item.content.content.type=='atAll'">
										<div class="borderBox text-neirong-div">
											<span class="aite">@全体成员</span>
											<span>{{item.content.content.content}}</span>
										</div>
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
									<!--视频消息-->
									<div class="flex video-div" v-if="item.content.content.type=='video'">
										<video :src="item.content.content.content" wmode="transparent" controls
											:poster="item.content.content.content+'?vframe/jpg/offset/0/dh'"
												x5-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"
												playsinline="true"  webkit-playsinline="true" preload="auto"
												x-webkit-airplay="true" airplay="allow"
												></video>
										<i class="iconfont icon-gengduo" v-if="userInfo.chat_manager"
											@click.stop="managerDeadEvent(i)"></i>
									</div>
								</div>
							</div>
							<!--自己发的消息-->
							<div class="flex msg-div me-msg" v-if="userInfo.id==item.uid">
								<div class="borderBox content-div">
									<p class="nickname" v-if="allOnlineUersInfo[item.content.uid]">
										{{allOnlineUersInfo[item.content.uid].nickname}}
										<span class="tag" v-if="allOnlineUersInfo[item.uid].tag">{{allOnlineUersInfo[item.uid].tag}}</span>
									</p>
									<!--图片消息-->
									<div class="flex img-div" v-if="item.content.content.type=='image'" >
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<image class='msg'
											@click.stop="previewImage(i)"
											:src="item.content.content.content" mode="widthFix" />
									</div>
									<!--表情消息-->
									<div class="flex biaoqing-div" v-if="item.content.content.type=='expression'" >
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<div class="img-div">
											<image class='msg'
												:src="item.content.content.content" mode="widthFix" />
										</div>
									</div>
									<!--语音消息-->
									<div class="flex voice-message-div" v-if="item.content.content.type=='voice'">
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<div class="flex voice-message" @click.stop="playAudio(i)">
											<span class="time">{{item.content.content.time_txt}}</span>
											<i class="iconfont icon-audio-copy"></i>
											<span class="txt">{{(chooseIndex==i&&isPlaying)?'正在播放...': '点击播放'}}</span>
										</div>
									</div>
									<!--商品消息-->
									<div class="flex goodsdetail-div" v-if="item.content.content.type=='goods'" >
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<div class="img-div" @click.stop="jumpGoodsDetail(i)">
											<image class='msg'
												:src="item.content.content.picture" mode="widthFix" />
											<p class="burt_ellipsis2 borderBox title">{{item.content.content.content}}</p>
											<p class="borderBox price">￥{{item.content.content.price}}</p>
										</div>
									</div>
									<!--发红包消息-->
									<div class="flex red-bag-div" v-if="item.content.content.type=='money'">
										<div class="flex borderBox inner-div" @click.stop="openRedbag(i)">
											<div class="img-div">
												<image src="../../../static/img/redbag-msg.png"></image>
											</div>
											<div class="right-div">
												<p class="burt_ellipsis txt1">{{item.content.content.content}}</p>
												<p class="status">{{item.content.content.status? '可领取': '红包已领完'}}</p>
											</div>
										</div>
									</div>
									<!--文字消息-->
									<div class="flex content-msg" v-if="item.content.content.type=='text'">
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<div class="borderBox text-neirong-div">
											<span>{{item.content.content.content}}</span>
										</div>
									</div>
									<!--艾特某人消息-->
									<div class="flex content-msg" v-if="item.content.content.type=='at'">
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<div class="borderBox text-neirong-div">
											<span class="aite">@{{item.content.content.nickname}}</span>
											<span>{{item.content.content.content}}</span>
										</div>
									</div>
									<!--艾特全体成员消息-->
									<div class="flex content-msg" v-if="item.content.content.type=='atAll'">
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<div class="borderBox text-neirong-div">
											<span class="aite">@全体成员</span>
											<span>{{item.content.content.content}}</span>
										</div>
									</div>
									<!--视频消息-->
									<div class="flex video-div" v-if="item.content.content.type=='video'">
										<i class="iconfont icon-gengduo" @click.stop="cehuiMsg(i)"></i>
										<video :src="item.content.content.content" wmode="transparent" controls
											:poster="item.content.content.content+'?vframe/jpg/offset/0/dh'"></video>
									</div>
								</div>
								<div class="avatar" :style="{'background-image': 'url('+allOnlineUersInfo[item.uid].headimgurl+')'}"
									v-if="allOnlineUersInfo[item.uid]"></div>
								<!-- <image class="avatar" v-if="allOnlineUersInfo[item.content.uid]" :src="allOnlineUersInfo[item.content.uid].headimgurl"></image> -->
							</div>
						</div>
					</li>
				</ul>
			</div>
			
			<!--进入群消息-->
			<div class="inQun-div" id="qun-tip-boxs">
				
			</div>
			<!--底部输入框-->
			
			
			<!--图片预览-->
			<div class="borderBox img-preview-div" :style="{display: previewImgShow? 'block': 'none'}"
				@click.stop="closePreview">
				<p class="mask"></p>
				<image :src="previewImg" mode="aspectFit"></image>
			</div>
		</scroll-view>
		<BurtBottomInput :audio="audio" :emojExpand="emojExpand" @redbagShow="redbagShow" @emojChange="emojChange" ref="burtBottomInp"></BurtBottomInput>
		<RedBagDetail ref="redbagDetail" />
		<!--红包-->
		<RedBag ref='redbag'/>
	</div>
	
</template>

<script>
import BurtBottomInput from '@/components/burt-chat/bottom-input.vue';
import RedBagDetail from '@/components/burt-chat/red-bag-see.vue';
import RedBag from '@/components/burt-chat/red-bag.vue';
import {mapGetters,mapActions} from 'vuex';
import {setForbin,setUnForbin} from '../../static/utils/request_events';
import {connectSocket,sendSocketMessage} from '../../chat/js/socket/index';
let timer; //计时器
export default {
	props: {
		//顶部是否是展开的
		isExpand: {}
	},
	components: {
		BurtBottomInput,
		RedBagDetail,
		RedBag
	},
	data(){
		return {
			audio: '', //音频radio
			chooseIndex: -1,  //选择的序列号
			isPlaying: false,   //是否在播放音频
			emojExpand: false,  //表情框是否是展开的
			//分页的时候传递最后一条消息的id
			nomore: false,
			previewImgShow: false,
			previewImg: '', //预览的图片地址
		}
	},
	computed: {
		...mapGetters('outer_me',['userInfo']),
		...mapGetters('chat_message',['messageList', 'last_id','allOnlineUersInfo','scrollIntoId', 'animateScroll']),
	},
	async mounted(){
		this.audio = uni.createInnerAudioContext();
		this.audio.onEnded(()=>{  //音频结束
			this.isPlaying = false;
		});
		await this.$store.dispatch('outer_checklogin/getConfig');  //获取全局配置
		await this.$store.dispatch('outer_me/getUserCenterInfoUrl');  //获取个人数据，查看自己是否被禁言
		await this.$store.dispatch('chat_message/getMessageList');
		await this.$store.dispatch('chat_message/getUserListInfo');
		this.sendLoginMsg();
		this.scrollBottom();
		this.openRedbagById();
	},
	destroyed(){
		if(this.audio){
			this.audio.stop();
			this.audio = null;
		};
		this.$store.commit('chat_message/INITDATA');
	},
	methods: {
		//点击空白页面位置
		clickScroll(){
			//隐藏表情库
			this.emojExpand = false;
		},
		//跳转到商品详情页面
		jumpGoodsDetail(i){
			let goods_id = this.messageList[i].content.content.goods_id;
			if(goods_id){
				uni.navigateTo({
					url: `/shop1/pages/goods_detail/index?id=${goods_id}`
				});
			}
		},
		emojChange(status){
			this.emojExpand = status;
		},
		//发送登陆消息
		async sendLoginMsg(){
			let self = this;
			if(this.userInfo.id){
				send();
			}else{
				await this.$store.dispatch('outer_me/getUserCenterInfoUrl');
				send();
			};
			function send(){
				sendSocketMessage({
					type: 'login',
					content: {
						uid: self.userInfo.id,
						nickname: self.userInfo.nickname,
						headimgurl: self.userInfo.headimgurl
					}
				});
			};
		},
		//滚动时候改变scrollIntoId的值，以免点击滑动到顶部或者底部无效
		scroll(){  
			if(timer){
				clearTimeout(timer);
				timer = null;
			};
			timer = setTimeout(()=>{
				this.$store.commit('chat_message/SET_SCROLLTOID', -1);
			},300);
		},
		//滚动到底部，最新消息
		scrollBottom(){
			this.$store.commit('chat_message/SET_SCROLL_ANIMATE', true);
			this.$store.commit('chat_message/SET_SCROLLTOID', this.messageList.length-1);
		},
		//滚动到顶部
		scrollTop(){
			this.$store.commit('chat_message/SET_SCROLL_ANIMATE', true);
			this.$store.commit('chat_message/SET_SCROLLTOID', 0);
		},
		//滚动顶部加载更多数据
		async scrolltoupper(){
			//this.$store.commit('chat_message/SET_SCROLLTOID', state.);
			await this.$store.dispatch('chat_message/getMessageList');
			await this.$store.dispatch('chat_message/getUserListInfo');
		},
		//长按头像艾特某人
		aitePerson(index){
			let item = this.messageList[index];
			let uid = item.content.uid;  //用户uid
			let nickname = this.allOnlineUersInfo[uid].nickname; //用户昵称
			let obj = {
				uid, nickname
			};
			//console.log(uid, nickname, 111)
			this.$refs.burtBottomInp.aitePerson(obj);
		},
		//预览图片
		previewImage(index){
			let url = this.messageList[index].content.content.content;
			this.previewImg = url;
			this.previewImgShow = true;
		},
		//关闭预览图片
		closePreview(){
			this.previewImgShow = false;
		},
		//撤回消息
		cehuiMsg(index){
			let item = this.messageList[index];
			let chat_manager = !!this.userInfo.chat_manager;  //是否是群聊管理员
			let ctime = new Date(item.create_time).getTime();
			let now_time = Date.now();
			//是否超过了两分钟
			let isLinetime = (now_time - ctime) > 120000;
			uni.showActionSheet({
				itemList: ['撤回'],
				itemColor: (!chat_manager&&isLinetime)? '#999999': '#000000', //不是管理员并且时间已经超过两分钟
				success: (res)=>{
					if(res.tapIndex==0 && (chat_manager || !isLinetime)){ //是管理员或者没超时都可以撤回
						//撤回消息
						sendSocketMessage({
							type: 'revoke',
							id: item.id,  //消息的id
						});
					};
				}
			})
		},
		//撤回或者删除消息
		managerDeadEvent(index){
			let item = this.messageList[index];
			let uid = item.content.uid;  //用户uid
			let nickname = this.allOnlineUersInfo[uid].nickname; //用户昵称
			if(!this.userInfo.chat_manager){  //如果不是管理员不能进行操作
				return;
			};
			uni.showActionSheet({
				itemList: ['撤回', '禁言', '解除禁言'],
				itemColor: '#000000',
				success: (res)=>{
					let tapIndex = res.tapIndex;
					if(tapIndex==0){
						//撤回消息
						sendSocketMessage({
							type: 'revoke',
							id: item.id,  //消息的id
						});
					}else if(tapIndex==1){  //全员禁言
						setForbin(uid)
						.then((res)=>{
							//发送消息
							sendSocketMessage({
								type: 'message',
								content: {
									type: 'banned',
									forbinUid: uid,  //设置禁言用户
									content: `${nickname}被禁言`
								}
							});
						})
						.catch(()=>{});
					}else if(tapIndex==2){  //解除禁言
						setUnForbin(uid)
						.then((res)=>{
							//发送消息
							sendSocketMessage({
								type: 'message',
								content: {
									type: 'unbanned',
									forbinUid: uid,  //设置解禁言用户
									content: `${nickname}的禁言解除`
								}
							});
						})
						.catch(()=>{});
					};
				}
			})
		},
		//打开红包
		openRedbag(index){
			let item = this.messageList[index];
			this.$refs.redbagDetail.show(item.content.content.id);
		},
		//接收红包显示
		redbagShow(){
			this.$refs.redbag.show();
		},
		/** 根据链接红包id直接 **/
		openRedbagById(){
			let rid = this.$route.query.rid; //链接中是否带了红包id
			if(rid){
				this.$refs.redbagDetail.show(rid);
			};
		},
		//播放音频
		playAudio(index){
			if(this.chooseIndex!=index){ //点的不是自己
				this.audio.stop();
				this.chooseIndex = index;
				
				let item = this.messageList[index];
				let src = item.content.content.content;
				this.audio.autoplay = true;
				this.audio.src = src;
				this.isPlaying = true; 
				this.audio.onError((err)=>{
					this.isPlaying = false; 
					showToast('稍等片刻，语音转码中...');
				});
			}else{ //再次点击自己
				if(this.isPlaying){ //在播放
					this.audio.stop();
					this.isPlaying = false; 
				}else{
					let item = this.messageList[index];
					let src = item.content.content.content;
					this.audio.autoplay = true;
					this.audio.src = src;
					this.isPlaying = true; 
					this.audio.onError((err)=>{
						this.isPlaying = false; 
						showToast('稍等片刻，语音转码中...');
					});
				};
			}
		},
	}
}
</script>

<style lang="less" scoped>
.outer-div{
	position: absolute;
	bottom: 0;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
}
scroll-view{
	position: relative;
	height: 100%;
	/* #ifdef H5 */
	padding-bottom: 55px;
	padding-bottom: calc(55px + constant(safe-area-inset-bottom));
	padding-bottom: calc(55px + env(safe-area-inset-bottom));
	/* #endif */
}
/**上下滚动控制按钮**/
.scroll-btn-div{
	position: fixed;
	width: 50upx;
	height: 130upx;
	right: 24upx;
	top: 74upx;
	z-index: 2;
	flex-direction: column;
	justify-content: space-between;
	image{
		width: 50upx;
		height: 50upx;
	}
}
/**生态商城、推广按钮入口**/
.jump-btn-div{
	position: fixed;
	bottom: 65px;
	right: 26upx;
	width: 78upx;
	z-index: 3;
	image{
		width: 78upx;
		height: 78upx;
	}
	image+image{
		margin-top: 12upx;
	}
}
/**消息**/
.message-div-box{
	padding: 20upx;
	ul.list-div{
		li.list{
			p.time{
				line-height: 46upx;
				margin-top: 10upx;
				font-size: 20upx;
				color: #999;
				text-align: center;
			}
			/**购物消息**/
			.buy-message{
				align-items: flex-start;
				margin: 40upx 120upx 10upx;
				background: #c9c9c9;
				border-radius: 10upx;
				box-sizing: border-box;
				padding: 10upx 20upx;
				color: #fff;
				image.bag{
					width: 42upx !important;
					height: 36upx !important;
				}
				span.red{
					color: #f55f60;
					margin-left: 6upx;
				}
			}
			/**禁言消息**/
			.banned-div{
				text-align: center;
				span{
					padding: 8upx 20upx;
					background: #c9c9c9;
					border-radius: 8upx;
					color: #757575;
					font-size: 24upx;
				}
			}
			/**抢到红包消息**/
			.get-money-div{
				image.money{
					width: 36upx !important;
					height: 36upx !important;
					margin-right: 10upx;
				}
			}
			.msg-div{
				align-items: flex-start;
				/**头像**/
				.avatar{
					min-width: 80upx;
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					background-position: center;
					background-size: cover;
					background-repeat: no-repeat;
				}
				/* 换成使用背景图片，不使用img标签
				image.avatar{
					min-width: 80upx;
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					pointer-events: none;
				} */
				.content-div{
					padding: 0 20upx;
					p.nickname{
						font-size: 24upx;
						color: #707070;
						margin-bottom: 16upx;
						span.tag{
							background: #a0e759;
							color: #fff;
							margin-left: 10upx;
							padding: 0 6upx;
							border-radius: 6upx;
						}
					}
					/**文字消息**/
					.content-msg{
						align-items: flex-start;
						.text-neirong-div{
							background: #fff;
							border-radius: 10upx;
							border: 1px solid #eee;
							padding: 20upx;
							max-width: 486upx;
							span.aite{
								color: #4aaaf7;
								margin-right: 10upx;
							};
							span{
								max-width: 100%;
								word-wrap: break-word;
								display: inline-block;
							}
						}
						i{
							color: #757575;
							margin-left: 18upx;
						}
					}
					/**语音消息**/
					.voice-message-div{
						align-items: flex-start;
						i.icon-gengduo{
							color: #757575;
							margin-left: 18upx;
						}
						.voice-message{
							background: #fff;
							color: #333;
							height: 80upx;
							padding: 0 20upx;
							border-radius: 10upx;
							border: 1px solid #eee;
							i.icon-audio{
								font-size: 36upx;
								margin-left: 18upx;
							}
							span.txt{
								margin: 0 10upx;
								font-size: 24upx;
							}
						}
					}
					/**商品消息**/
					.goodsdetail-div{
						align-items: flex-start;
						i.icon-gengduo{
							color: #757575;
							margin-left: 18upx;
						}
						.img-div{
							width: 300upx;
							height: auto;
							overflow: hidden;
							background: #fff;
							border-radius: 12upx;
							image{
								width: 300upx !important;
								height: 300upx !important;
							}
							.title{
								padding: 0 10upx;
								font-size: 26upx;
							}
							.price{
								line-height: 50upx;
								padding: 0 10upx;
								color: #fc2230;
							}
						}
					}
					/**红包消息**/
					.red-bag-div{
						.inner-div{
							width: 512upx;
							height: 146upx;
							border-radius: 10upx;
							border: 1px solid #e28827;
							background: #fdb972;
							padding: 26upx 36upx;
							image{
								width: 70upx;
								height: 98upx;
								border-radius: 8upx;
							}
							.right-div{
								color: #fff;
								flex: 1;
								height: 100%;
								max-width: 100%;
								width: 100%;
								padding-left: 24upx;
								padding-right: 24upx;
								box-sizing: border-box;
								.txt1{
									max-width: 100%;
									font-size: 30upx;
								}
							}
						}
					}
					/**图片消息**/
					.img-div{
						align-items: flex-start;
						image.msg{
							width: 208upx;
							border-radius: 12upx;
						}
						i{
							color: #757575;
							margin-left: 18upx;
						}
					}
					/**表情消息**/
					.biaoqing-div{
						align-items: flex-start;
						.img-div{
							image.msg{
								width: 160upx;
								height: 160upx;
							}
						}
						i{
							color: #757575;
							margin-left: 18upx;
						}
					}
					/**视频消息**/
					.video-div{
						align-items: flex-start;
						video{
							max-width: 376upx;
							position: relative;
							z-index: 1;
						}
						i{
							color: #757575;
							margin-left: 18upx;
						}
					}
				}
			}
		}
	}
}
.message-div-box{
	ul.list-div{
		li.list{
			.msg-div.me-msg{
				justify-content: flex-end;
				p.nickname{
					text-align: right;
				}
				.img-div,.content-msg,.video-div,.biaoqing-div,.voice-message-div,.red-bag-div,.goodsdetail-div{
					i.icon-gengduo{
						margin-right: 18upx;
						margin-left: initial;
					}
				}
				.content-msg .text-neirong-div{
					background: #a0e759;
				}
			}
			.chat-message .msg-div.me-msg .content-div .voice-message{
				background: #a0e759;
			}
		}
	}
}
/**人进入群的消息**/
#qun-tip-boxs{}
/**预览图片**/
.img-preview-div{
	position: fixed;
	display: none;
	width: 100vw;
	height: 100vh;
	top: 0; left: 0;
	z-index: 999;
	p.mask{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #000;
		top: 0; left: 0;
	}
	image{
		width: 100%;
		height: 90%;
		max-width: 100%;
		max-height: 90%;
		display: block;
		position: absolute;
		z-index: 2;
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
