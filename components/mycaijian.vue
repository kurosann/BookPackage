<template>
	<view class="picture-tailor" :class="{'picture-tailor-show':isShow}">
		<movable-area class="picture-area">
			<movable-view class="picture-view" :style="{width:img_width/img_scaling+'px',height:img_height/img_scaling+'px'}"
			 direction="all" :x="offsetX" :y="offsetY" scale="true" @change="movableChange" @scale="movableScale">
				<image :style="{width:img_width/img_scaling+'px',height:img_height/img_scaling+'px'}" :src="pictureSrc"></image>
			</movable-view>
		</movable-area>
		<view class="select-box" :style="{width:destWidth*2+'px',height: destHeight*2+'px','border-radius':isBorderRadius? '50%':'0' }"></view>
		<button class="button-view cancel" @click="onHide">取消</button>
		<button class="button-view" @click="createImg">完成</button>
		<view style="position:fixed;top:999999999999999999999px;">
           <canvas canvas-id="picture-canvas" class="canvas-view" 
			 :style="{width:destWidth*2+'px',height: destHeight*2+'px' }"></canvas>
		</view>
	</view>
</template>

<script>
export default {
	name: "picture-tailor",
	props: {
		isBorderRadius: {  //是否显示圆角
			default: false
		},
		// 图片路径
		pictureSrc: { 
			type: String,
			default: ""
		},
		destWidth: {
			type: null,
			default: 120
		},
		destHeight: {
			type: null,
			default: 120
		}
	},
	data() {
		return {
			offsetX: 0, // 图像初始化的X轴偏移量
			offsetY: 0, // 图像初始化的Y轴偏移量
			img_width: 0, // 图片真实宽度
			img_height: 0, // 图片真实高度
			img_scaling: 1, //图片初始化缩放比例
			newOffsetX: 0, // 拖动缩放完成后的X轴偏移量
			newOffsetY: 0, // 拖动缩放完成后的Y轴偏移量
			scale: 1, // 拖动缩放完成后的图片缩放比例
			isShow: false
		};
	},
	methods: {
		// 显示组件并初始化
		onShow() {
			this.isShow = true;
			this.$nextTick(function(){
				this.getImgInfo();
			});
		},
		onHide() {
			this.isShow = false;
		},
		// 初始化图片
		getImgInfo() {
			var _this = this;
			uni.getImageInfo({
				src: _this.pictureSrc,
				success(res) {
					// 图片宽高
					_this.img_width = res.width;
					_this.img_height = res.height;
					// 屏幕可用宽高
					let sysInfo = uni.getSystemInfoSync();
					let windowWidth = sysInfo.windowWidth;
					let windowHeight = sysInfo.windowHeight;
					// 当图片大于屏幕宽度
					if (_this.img_width > windowWidth) {
						_this.img_scaling = _this.img_width / windowWidth;
					}
					// 计算图片居中显示时的偏移量，120为样式中的240px的一半
					_this.offsetX = -(_this.img_width / _this.img_scaling / 2 - 120);
					_this.offsetY = -(_this.img_height / _this.img_scaling / 2 - 120);
					// 获取新的偏移量
					_this.newOffsetX = _this.offsetX;
					_this.newOffsetY = _this.offsetY;
				}
			})
		},
		// 计算拖动偏移量
		movableChange(e) {
			this.newOffsetX = e.detail.x
			this.newOffsetY = e.detail.y
		},
		// 计算缩放比例和偏移量
		movableScale(e) {
			this.newOffsetX = e.detail.x
			this.newOffsetY = e.detail.y
			this.scale = e.detail.scale;
		},
		// 截取图片
		createImg() {
			var _this = this;
			let ctx = uni.createCanvasContext("picture-canvas");
			ctx.drawImage(_this.pictureSrc, _this.newOffsetX, _this.newOffsetY, _this.img_width /
				_this.img_scaling * _this.scale,
				_this.img_height / _this.img_scaling * _this.scale);
			ctx.draw(false, function() {
				uni.canvasToTempFilePath({
					// 截取图片尺寸
					destWidth: Number(_this.destWidth),
					destHeight: Number(_this.destHeight),
					canvasId: "picture-canvas",
					success(res) {
						_this.$emit("createImg", res.tempFilePath);
					}
				});
			});
		}
	}
}
</script>

<style>
.picture-tailor {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: #000000;
	transform: translateX(100%);
	transition: all 200ms ease;
	visibility: hidden;
	z-index:999;
	overflow: hidden;
}

.picture-tailor-show {
	transform: translateY(0) !important;
	visibility: visible;
}

/* 拖动域的位置和大小 */
.picture-tailor .picture-area {
	width: 240px;
	height: 240px;
	position: absolute;
	/* 使其居中定位 */
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	z-index: 999;
}

/* 拖动控件的大小 */
.picture-area .picture-view {
	min-width: 240px;
	min-height: 240px;
}

/* 中间选择框的大小，本意是视觉上模拟拖动域 */
.select-box {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 240px;
	height: 240px;
	/* border-radius: 50%; */
	border: #FFFFFF 1upx solid;
	pointer-events: none;
	transform: translateX(-50%) translateY(-50%);
	z-index: 999;
}

.button-view {
	position: absolute;
	bottom: 20px;
	right: 20px;
	width: 60px;
	background-color: #007AFF;
	font-size: 14px;
	color: #FFFFFF;
	padding:10rpx 14rpx;
	border-radius:12rpx;
	z-index: 999;
}
.button-view.cancel{
	right: initial;
	left: 20px;
	z-index: 999;
}

/* 画布大小，画布大小就是截取的原始大小 */
.canvas-view {
	width: 240px;
	height: 240px;
	visibility: hidden;
	opacity: 0;
}
</style>
