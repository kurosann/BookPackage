<template>
	<!--底部输入框-->
	<div class="borderBox bottom-div-box fix-dom" :style="{height: emojExpand? '300px': '55px'}">
		<!--输入框-->
		<div class="borderBox flex input-div">
			<!--输入文字信息-->
			<i class="iconfont" :class="canSpeek?'icon-jianpan':'icon-yuyin1'"
				@click.stop="canSpeek=!canSpeek;"></i>
			<input class="borderBox" disabled type="text" placeholder="输入对话信息" 
				@click.stop="clickInput" v-if="!canSpeek"/>
			<!--可以说话时-->
			<div class="canspeek-div" v-if="canSpeek"
				@touchstart.stop="touchstart" @touchmove.stop="touchmove" 
				@touchend.stop="touchend">按住说话</div>
			
			<i class="iconfont icon-thin-_smiley_hap" @click.stop="emojChange"></i>
			<i class="iconfont icon-jia" @click.stop="chooseMore"></i>
		</div>
		
		<!--表情库-->
		<div class="biaoqing-div">
			<swiper indicator-dots indicator-color="#d6d6d6" indicator-active-color="#8b8b8b" 
				 duration="300" :current="swiperIndex" @change="swiperChange">
				<swiper-item v-for="(item, index) in swiperEmoilArr" :key="index">
					<ul class="flex list-div">
						<li class="flex list" v-for="(ite,i) in item" :key='i'
							@click.stop="sendBiaoqing(index,i)">
							<image :src="ite.gif"></image>
						</li>
					</ul>
				</swiper-item>
			</swiper>
			<!--底部导航-->
			<ul class="nav-div-box">
				<li class="flex list" v-for="(item, index) in emojArrs" :key="index" 
					:class="taoIndex==index?'active':''" @click.stop="swiperIndex=0;taoIndex=index">
					<image :src="item.mainGif" mode=""></image>
				</li>
			</ul>
		</div>
		
		<!--开始录音时显示的提示消息-->
		<div class="luyin-tip-div" v-if="showTipDiv">
			<div class="outer-div">
				<!--录音中提示-->
				<div class="flex luyin" v-if="!showCancelSend">
					<p class="txt1">录音中...{{count}}</p>
					<i class="iconfont icon-htmal5icon13"></i>
					<p class="txt2">上滑取消发送</p>
				</div>
				<!--录音取消-->
				<div class="flex borderBox luyin-cancel" v-if="showCancelSend">
					<i class="iconfont icon-yuyinchehui"></i>
					<p class="txt">松开手指，取消发送</p>
				</div>
			</div>
		</div>
		
		<!--文字输入框-->
		<div class="borderBox textarea-div" v-if="showInputBox">
			<!-- <p class="mask" @click="showInputBox=false;inputVal=''"></p> -->
			<p class="mask"></p>
			<div class="borderBox outer-div">
				<div class="borderBox inner-div">
					<p class="title">发送消息</p>
					<textarea class='borderBox' auto-height v-model='inputVal'></textarea>
				</div>
				<div class="flex btns-div">
					<span class='cancel' @click.stop="showInputBox=false;inputVal='';">取消</span>
					<span class="send" @click.stop="sendTxtMsg">发送</span>
				</div>
			</div>
		</div>
		
		<!--底部选择更多-->
		<BottomLeixingSwiper ref="myleixingSwiper"  @redbagShow="redbagShow" @hideEmoj="hideEmoj" @atAll="atAll"/>
	</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import {showToast,fomartTimeToSecondString,getLocalStorage} from '../../static/utils/index';
import {sendSocketMessage} from '../../chat/js/socket/index';
import {emojArrs} from '../../chat/js/biaoqing';
import {uploadMusic} from '../../static/utils/request_events';
import BottomLeixingSwiper from '@/components/burt-chat/bottom-leixing-swiper.vue';

let timer;  //定时器变量
//#ifndef H5
let recorderManager = uni.getRecorderManager();  //录音管理
//#endif
let aiteObj; //存储艾特时的信息
let voiceId;  //录音的ID
export default {
	props: {
		emojExpand: {  //表情是否是展开的
			default: false
		},
		audio: {
			
		}
	},
	data(){
		return {
			canSend: true,  //是否允许发送消息，避免连续点击多次
			inputVal: '', //输入框的字
			canSpeek: false,  //是否可以点击说话
			showInputBox: false,  //是否显示输入框
			taoIndex: 0,  //第几套表情
			emojArrs: emojArrs,  //所有的表情
			swiperIndex: 0,  //swiper选择滑块的序列号
			count: 0,  //计时器,显示当前录音的时间
			startPos: '',  //手指初始位置
			endPos: '',  //手指末位置
			showTipDiv: false,  //显示录音信息提示框
		}
	},
	components: {
		BottomLeixingSwiper
	},
	computed: {
		...mapGetters('outer_me',['userInfo']),
		swiperEmoilArr(){
			let list = emojArrs[this.taoIndex].list;
			//每一页放8个表情
			let pages = Math.ceil(list.length/8);
			let arr = [];
			for(let i=0; i<pages; i++){
				let tmpArr = list.slice(i*8,(i+1)*8);
				arr.push(tmpArr);
			};
			return arr;
		},
		//显示松手取消发送
		showCancelSend(){
			let startY = this.startPos.pageY;
			let endY = this.endPos.pageY;
			let offsetY = startY - endY;
			return offsetY > 100;
		}
	},
	mounted(){
		this.onMonitorRecorder();
	},
	methods: {
		//艾特某个人触发的函数
		aitePerson(obj){
			if(this.meIsForbidden()){
				return;
			};
			aiteObj = {
				...obj,
				type: 'one',  //艾特某一个人
			};
			this.inputVal = `@${obj.nickname}\n`;
			this.hideEmoj();
			this.showInputBox = true;
		},
		//艾特所有人
		atAll(){
			if(this.meIsForbidden()){
				return;
			};
			aiteObj = {
				type: 'all',  //艾特全体成员
			};
			this.inputVal = `@全体成员\n`;
			this.hideEmoj();
			this.showInputBox = true;
		},
		emojChange(){
			let showStatus = this.emojExpand;
			if(showStatus){  //显示，使之隐藏
				this.hideEmoj();
			}else{
				this.showEmoj();
			}
		},
		//显示表情库
		showEmoj(){
			if(this.meIsForbidden()){
				return;
			};
			this.$emit('emojChange', true);
			//this.emojExpand = true;
		},
		//隐藏表情库
		hideEmoj(){
			this.$emit('emojChange', false);
			//this.emojExpand = false;
		},
		swiperChange(e){
			this.swiperIndex = e.detail.current;	
		},
		//点击输入框
		clickInput(){
			if(this.meIsForbidden()){
				return;
			};
			this.hideEmoj();
			aiteObj = null;  //自己点击输入框触发的去除信息
			this.showInputBox = true;
		},
		//选择更多
		chooseMore(){
			if(this.meIsForbidden()){
				return;
			};
			this.$refs.myleixingSwiper.show();
		},
		redbagShow(){
			this.$emit('redbagShow');
		},
		isCanSendMsg(){
			if(!this.canSend){
				return false;
			};
			this.canSend = false;
			setTimeout(()=>{
				this.canSend = true;
			},300);
			return true;
		},
		//点击发送文字消息
		sendTxtMsg(){
			if(this.meIsForbidden()){
				return;
			};
			if(!this.isCanSendMsg()){
				return;
			};
			if(!this.inputVal){
				showToast('不能发空白消息喔!');
				return;
			};
			if(aiteObj && aiteObj.type=='all' && this.inputVal.indexOf('@全体成员')!=-1){  //艾特全体成员
				let inputVal = this.inputVal.replace(`@全体成员`,'');
				if(!inputVal.trim()){
					showToast('请输入内容');
					return;
				};
				//发送消息
				sendSocketMessage({
					type: 'message',
					content: {
						type: 'atAll',
						content: inputVal
					}
				});
			}else if(aiteObj && aiteObj.uid && this.inputVal.indexOf(`@${aiteObj.nickname}`)!=-1){   //艾特某人
					let inputVal = this.inputVal.replace(`@${aiteObj.nickname}`,'');
					if(!inputVal.trim()){
						showToast('请输入内容');
						return;
					};
					//发送消息
					sendSocketMessage({
						type: 'message',
						content: {
							type: 'at',
							uid: aiteObj.uid,  //用户id
							nickname: aiteObj.nickname,  //用户昵称
							content: inputVal
						}
					});
				}else{
				//发送消息
				sendSocketMessage({
					type: 'message',
					content: {
						type: 'text',
						content: this.inputVal
					}
				});
			};
			this.inputVal = "";
			this.showInputBox = false;
		},
		//发送表情消息
		sendBiaoqing(index1, index2){
			if(this.meIsForbidden()){
				return;
			};
			if(!this.isCanSendMsg()){
				return;
			};
			let item = this.swiperEmoilArr[index1][index2];
			//发送消息
			sendSocketMessage({
				type: 'message',
				content: {
					type: 'expression',
					content: item.code
				}
			});
			this.hideEmoj();
		},
		touchstart(e){
			if(this.meIsForbidden()){
				return;
			};
			let self = this;
			this.showTipDiv = true;
			this.clearTimer();
			//开始录音
			timer = setInterval(()=>{
				if(this.count==60){  //录音到了一分钟，自动结束
					//#ifndef H5
					recorderManager.stop();
					//#endif
					//#ifdef H5
					wx.stopRecord({
						success: (res)=>{
							voiceId = res.localId; //本地id
							self.uploadVoiceToWxServer();
						},
						fail(){
							self.count = 0;
							this.showTipDiv = false;
							this.clearTimer();
						}
					});
					//#endif
					this.showTipDiv = false;
					this.clearTimer();
				};
				this.count++;
			},1000);
			//#ifndef H5
			recorderManager.start();  //开始录音
			//#endif
			//#ifdef H5
			if(this.audio){
				this.audio.stop();
			};
			wx.startRecord({
				fail: (res)=>{
					self.count = 0;
					this.showTipDiv = false;
					this.clearTimer();
					showToast(JSON.stringify(res));
				}
			});  
			//#endif
			this.startPos = e.touches[0];
			this.endPos = e.touches[0];
		},
		touchmove(e){
			if(this.meIsForbidden()){
				return;
			};
			this.endPos = e.touches[0];
		},
		touchend(e){
			if(this.meIsForbidden()){
				return;
			};
			if(!this.showTipDiv){
				return;
			};
			this.showTipDiv = false;
			this.clearTimer();
			//#ifndef H5
			recorderManager.stop();  //结束录音
			//#endif
			//#ifdef H5
			wx.stopRecord({
				success: (res)=>{
					voiceId = res.localId; //本地id
					this.uploadVoiceToWxServer();
				}
			});
			//#endif
			if(this.count <1){
				showToast('录音时间太短');
				voiceId = '';
				this.count=0;
			};
		},
		//监听录音结束情况
		onMonitorRecorder(){
			//#ifndef H5
			recorderManager.onStop((res)=>{
				let tmpPath = res.tempFilePath;  //录音的临时地址
				if(!this.showCancelSend && this.count>0){  //录音时间大于1s，并且没有取消发送
					//发送语音消息
				};
				this.count=0;
			});
			//#endif
		},
		//上传localId到微信服务器
		uploadVoiceToWxServer(){
			if(this.meIsForbidden()){
				return;
			};
			//#ifdef H5
			if(!this.showCancelSend && this.count>0){  //录音时间大于1s，并且没有取消发送
				//上传语音id到后台，后台下载语音
				wx.uploadVoice({
					localId: voiceId,
					isShowProgressTips: 1,
					success: (res)=>{
						console.log(res.serverId);
						//请求后台
						uploadMusic({
							mediaId: res.serverId,
							second: this.count
						})
						.then((src)=>{
							//发送消息
							sendSocketMessage({
								type: 'message',
								content: {
									type: 'voice',
									time: this.count,  //时长,单位S
									time_txt: fomartTimeToSecondString(this.count),
									content: src,
								}
							});
							this.count=0;
						})
						.catch(()=>{
							this.count = 0;
						});
					},
					fail(err){
						this.count = 0;
						console.log('错误',  err);
					}
				});	
			}else{
				this.count = 0;
			};
			//#endif
		},
		//清除计时器
		clearTimer(){
			if(timer){
				clearInterval(timer);
			};
		},
		//判断自己是否被禁言
		meIsForbidden(){
			let userInfo = this.userInfo;
			if(userInfo.chat_manager){  //是管理员，不会被禁言
				return false;
			};
			//是非管理员
			let chat_forbidden = getLocalStorage('config').chat_forbidden;  //是否全员禁言
			if(chat_forbidden==1==1 || userInfo.chat_forbidden==1){ //被禁言了
				if(chat_forbidden==1){
					showToast('全员禁言中...');
				}else{
					showToast('您已被禁言');
				};
				return true;
			}else{
				return false;
			};
		}
	}
}
</script>

<style lang="less" scoped>
.bottom-div-box{
	width: 100%;
	left: 0; 
	bottom: 0;
	/* #ifdef H5 */
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
	/* #endif */
	position: fixed;
	z-index: 99;
	background: #f5f5f5;
	
	.input-div{
		height: 55px;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding: 0 30upx;
		position: relative;
		i{
			font-size: 60upx;
			color: #282828;
		}
		i:nth-last-child(1){
			margin-left: 16upx;
		}
		/**按住说话**/
		.canspeek-div{
			flex: 1;
			height: 40px;
			border-radius: 20px;
			background: #e3e4e6;
			border: 1px solid #93949a;
			color: #93949a;
			text-align: center;
			line-height: 40px;
			margin: 0 20upx;
		}
		input{
			flex: 1;
			background: #fff;
			height: 40px;
			border: 1px solid #d1d0d6;
			border-radius: 20px;
			margin: 0 20upx;
			padding: 0 40upx;
			color: #333;
		}
	}
	.biaoqing-div{
		background: #ebebeb;
		swiper{
			/* #ifdef H5 */
			padding-top: constant(safe-area-inset-bottom);
			padding-top: env(safe-area-inset-bottom);
			/* #endif */
			height: 200px;
			width: 100%;
			ul.list-div{
				flex-wrap: wrap;
				li.list{
					width: 25%;
					height: 100px;
					justify-content: center;
					image{
						display: block;
						width: 80px;
						height: 80px;
					}
				}
			}
		}
		/**底部导航栏**/
		ul.nav-div-box{
			height: 45px;
			border-top: 1px solid #eee;
			overflow-x: auto;
			white-space: nowrap;
			li.list{
				height: 100%;
				width: 12.5%;
				min-width: 45px;
				float: left;
				background: #fff;
				justify-content: center;
				&.active{
					background: #f6f6f6;
				}
				image{
					display: block;
					width: 32px;
					height: 32px;
				}
			}
		}
	}
}
.textarea-div{
	position: fixed;
	top: 0; left: 0;
	z-index: 11;
	width: 100%;
	height: 100vh;
	padding: 46upx 38upx 0;
	p.mask{
		position: absolute;
		background: rgba(0,0,0,0.5);
		width: 100%;
		height: 100%;
		left: 0; top: 0;
	}
	.outer-div{
		position: relative;
		z-index: 12;
		background: #fff;
		border-radius: 12upx;
		padding-top: 20upx;
	}
	.inner-div{
		padding: 20upx;
		border-radius: 12upx;
		padding: 20upx;
		p.title{
			line-height: 80upx;
			text-align: center;
		}
		textarea{
			width: 100%;
			min-height: 150px;
			max-height: 210px;
			border-radius: 10upx;
			border: 1px solid #eee;
			color: #0e0e0e;
			padding: 20upx;
		}
	}
	.btns-div{
		height: 98upx;
		margin-top: 20upx;
		border-top: 1px solid #eee;
		span{
			flex: 1;
			line-height: 98upx;
			text-align: center;
			&.send{
				color: #25c172;
			}
		}
		span+span{
			border-left: 1px solid #eee;
		}
	}
}
.luyin-tip-div{
	position: absolute;
	width: 100vw;
	height: 100vh;
	bottom: 0;
	left: 0;
	z-index: 3;
	.outer-div{
		width: 282upx;
		height: 282upx;
		border-radius: 10upx;
		background: rgba(0,0,0,.6);
		position: absolute;
		top: 50%;  left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		.luyin,.luyin-cancel{
			height: 100%;
			flex-direction: column;
			justify-content: center;
			i{
				font-size: 100upx;
			}
			p{
				font-size: 24upx;
			}
		}
		.luyin-cancel{
			padding: 0 10upx;
			i{
				font-size: 150upx;
			}
			p{
				line-height: 50upx;
				background: #af4b4b;
				color: #fff;
				border-radius: 10upx;
				width: 100%;
				text-align: center;
			}
		}
	}
}
</style>
