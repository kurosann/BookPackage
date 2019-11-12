<template>
	<!--底部弹窗，选择相册，视频，红包的-->
	<div class="bottom-promt-div" id="bottom-promt-div123" :animation="animationData">
		<p class="mask" v-if="isShow" @click.stop="hide"></p>

		<swiper indicator-dots duration="300" indicator-color="#a6a6a6" indicator-active-color="#48b3e1">
			<swiper-item v-for="(item, index) in comTypeArr" :key="index">
				<div class="borderBox flex list-div-box">
					<template v-for="(ite, i) in item">
						<li v-if="ite.name != '视频'" class="flex list" :key="i" @click.stop="chooseEvent(index, i)">
							<image :src="ite.img"></image>
							<p class="name">{{ ite.name }}</p>
						</li>
						<!-- #ifdef H5 -->
						<li v-if="ite.name == '视频'" class="flex list" :key="i">
							<file-upload accept="video/*" ref="upload" v-model="files" @input-file="inputFile" @input-filter="inputFilter">
								<image :src="ite.img"></image>
								<p class="name">{{ ite.name }}</p>
							</file-upload>
						</li>
						<!-- #endif -->
					</template>
				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
//#ifndef H5
var animation = uni.createAnimation({
	delay: 300,
	timingFunction: 'ease'
});
//#endif
import VueUploadComponent from 'vue-upload-component';
import { closeSocket, sendSocketMessage } from '../../chat/js/socket/index';
import { uploadFile, uploadVideo, showToast, getLocalStorage, setLocalStorage } from '../../static/utils/index';
import {setForbin,setUnForbin} from '../../static/utils/request_events';
import { mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
			files: [],
			animationData: {},
			isShow: false, //是否显示
			typeArr: [
				{
					name: '禁言管理', //全员禁言或者关闭禁言
					img: 'https://qiniu.waoo.cc/burtyang/img/jinyan_all1.png',
					admin:1, //需要管理员身份
				},{
					name: '@全体成员',
					img: 'https://qiniu.waoo.cc/burtyang/img/aite_everybody.png',
					admin:1, //需要管理员身份
				},{
					name: '个人中心',
					img: 'https://qiniu.waoo.cc/burtyang/img/gerenzhongxin.png'
				},{
					name: '相册',
					img: 'https://qiniu.waoo.cc/burtyang/img/xiangce.png'
				},{
					name: '视频',
					img: 'https://qiniu.waoo.cc/burtyang/img/shipin.png'
				},{
					name: '红包',
					img: "https://qiniu.waoo.cc/burtyang/img/redbag1.png"
				} /* ,{
					name: '积分红包',
					img: "https://qiniu.waoo.cc/burtyang/img/redbag2.png"，
					admin:1, //需要管理员身份
				},{
					name: '文件',
					img: "https://qiniu.waoo.cc/burtyang/img/wenjian.png"
				},{
					name: '素材中心',
					img: "https://qiniu.waoo.cc/burtyang/img/sucaizhongxin.png"
				},{
					name: '我的收藏',
					img: "https://qiniu.waoo.cc/burtyang/img/wodeshoucang.png"
				} */
			]
		};
	},
	computed: {
		...mapGetters('outer_me', ['userInfo']),
		comTypeArr() {
			let list = [];
			this.typeArr.forEach((item,i)=>{
				if(this.userInfo.chat_manager){  //是管理员
					list.push(item);
				}else{
					if(!item.admin){ //不需要管理员身份都可以
						list.push(item);
					};
				};
			});
			let arr = [];
			//每一页放8个表情
			let pages = Math.ceil(list.length / 8);
			for (let i = 0; i < pages; i++) {
				let tmpArr = list.slice(i * 8, (i + 1) * 8);
				arr.push(tmpArr);
			};
			return arr;
		}
	},
	components: {
		'file-upload': VueUploadComponent
	},
	methods: {
		inputFile: function(newFile, oldFile) {
			uploadFile(newFile.blob, { type: newFile.ext }).then(res => {
				if(res.msg=='ok'){
					sendSocketMessage({
						type: 'message',
						content: {
							type: 'video',
							content: res.data.src
						}
					});
					this.hide();
				}else{
					showToast(res.msg);
				}
			});
		},
		inputFilter: function(newFile, oldFile, prevent) {
			if (newFile && !oldFile) {
				// 过滤不是图片后缀的文件
				/* if (!/\.(jpeg|jpe|jpg|gif|png|webp|mp4)$/i.test(newFile.name)) {
					return false;
				} */
			};
			newFile.ext = newFile.name.slice(newFile.name.indexOf('.')+1);
			newFile.blob = '';
			let URL = window.URL || window.webkitURL;
			if (URL && URL.createObjectURL) {
				newFile.blob = URL.createObjectURL(newFile.file);
			}
		},
		show() {
			this.isShow = true;
			this.$emit('hideEmoj');
			//#ifndef H5
			this.animationData = animation
				.height('210px')
				.step()
				.export();
			//#endif
			//#ifdef H5
			$('#bottom-promt-div123').animate({ height: '210px' }, 300);
			//#endif
		},
		hide() {
			//#ifndef H5
			this.animationData = animation
				.height('0')
				.step()
				.export();
			//#endif
			//#ifdef H5
			$('#bottom-promt-div123').animate({ height: '0px' }, 300);
			//#endif
			setTimeout(() => {
				this.isShow = false;
			}, 300);
		},
		//选择事件
		chooseEvent(index, i) {
			let self = this;
			let item = this.comTypeArr[index][i];
			if(item.name == '禁言管理'){
				this.hide();
				uni.showActionSheet({
					itemList: ['全员禁言', '解除禁言'],
					success: (res)=>{
						let tapIndex = res.tapIndex;
						if(tapIndex==0){  //全员禁言
							setForbin('all')
							.then((res)=>{
								let config = getLocalStorage('config');
								config.chat_forbidden = 1;
								setLocalStorage('config', config);
								//发送消息
								sendSocketMessage({
									type: 'message',
									content: {
										type: 'banned',
										isAll: 1, //全员禁言
										content: '全员禁言中...'
									}
								});
							})
							.catch(()=>{});
						}else if(tapIndex==1){  //解除禁言
							setUnForbin('all')
							.then((res)=>{
								let config = getLocalStorage('config');
								config.chat_forbidden = 0;
								setLocalStorage('config', config);
								//发送消息
								sendSocketMessage({
									type: 'message',
									content: {
										type: 'unbanned',
										isAll: 1, //全员解禁
										content: '禁言解除'
									}
								});
							})
							.catch(()=>{});
						};
					}
				});
			} else if (item.name == '@全体成员') {
				this.$emit('atAll'); //触发艾特所有人的事件
				this.hide();
			} else if (item.name == '个人中心') {
				uni.switchTab({
					url: '/shop1/pages/me/index'
				});
			} else if (item.name == '相册') {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						let tempPath = res.tempFilePaths[0];
						let tempFile = res.tempFiles[0];
						if (tempFile.size > 10 * 1024 * 1024) {
							showToast('图片不能超过10M，请压缩后再试');
							return;
						}
                       
						//上传文件
						uploadFile(tempPath).then(res => {
							//发送消息
                             if(!res.data) {
                                return;
                            }
							sendSocketMessage({
								type: 'message',
								content: {
									type: 'image',
									content: res.data.src
								}
							});
							this.hide();
						});
					}
				});
			} else if (item.name == '视频') {
				//this.$refs.upload.$el.click()
				this.$refs.upload[0].$el.click();
				return;
				//#ifdef H5
				let $inputEle = $(`<input style="opacity:0; width:0" id="videoStarIn" type="file" accept="video/*">`);
				$('.bottom-promt-div').append($inputEle);
				$inputEle.change(function(e) {
					let file = this.files[0];
					let size = file.size;
					if (size > 50 * 1024 * 1024) {
						showToast('图片不能超过50M，请压缩后再试');
						return;
					};
					uploadVideo(file).then(res => {
						$inputEle.remove();
						$inputEle = null;
						if (res.msg == 'ok') {
							//发送消息
							sendSocketMessage({
								type: 'message',
								content: {
									type: 'video',
									content: res.data.src
								}
							});
							self.hide();
						} else {
							showToast('');
						}
					});
				});
				$inputEle.trigger('click');
				//#endif

				//#ifndef H5
				uni.chooseVideo({
					sourceType: ['ablum'],
					compressed: true,
					maxDuration: 20,
					success: res => {
						let tempPath = res.tempFilePath;
						console.log(tempPath, 1111);
						let size = res.size;
						if (size > 50 * 1024 * 1024) {
							showToast('图片不能超过50M，请压缩后再试');
							//return;
						}
						//上传文件
						uploadFile(tempPath).then(res => {
							//发送消息
							sendSocketMessage({
								type: 'message',
								content: {
									type: 'video',
									content: res.data.src
								}
							});
							this.hide();
						});
					}
				});
				//#endif
			} else if(item.name == '红包'){
				this.hide();
				this.$emit('redbagShow');
			}
		}
	}
};
</script>

<style lang="less" scoped>
.bottom-promt-div {
	position: fixed;
	z-index: 20;
	width: 100%;
	height: 0;
	left: 0;
	bottom: 0;
	p.mask {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		bottom: 0;
		left: 0;
		z-index: 20;
	}
}
swiper {
	height: 210px;
	position: relative;
	z-index: 21;
	background: #fff;
	/* #ifdef H5 */
	padding-top: constant(safe-area-inset-bottom);
	padding-top: env(safe-area-inset-bottom);
	/* #endif */
	swiper-item {
		.list-div-box {
			width: 100%;
			height: 160px;
			flex-wrap: wrap;
			padding-top: 20upx;
			li.list {
				width: 25%;
				flex-direction: column;
				margin-bottom: 50upx;
				image {
					width: 40px;
					height: 40px;
					display: block;
				}
				p.name {
					color: #000;
					font-size: 24upx;
				}
			}
		}
	}
}
</style>
