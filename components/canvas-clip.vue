<template>
	<view class="content">
		<button type="primary" @tap="uploadImg" size="mini">上传图片</button>
		<view class="fixed-box" v-show="showModal">
			<view class="main">
				<view class="img-box">
					<canvas canvas-id="myCanvas" :style="{'width':imgInfo.width+'px','height':imgInfo.height+'px'}"/>
					<view v-if="imgInfo.url" class="drag" @touchstart="startEve" @touchmove="moveEve" :style="{'width':initWidth+'px','height':initHeight+'px','left':moveX+'px','top':moveY+'px'}"></view>
				</view>
			</view>
			<view class="btn-group">
				<view class="cancel btn" @tap="showModal=false">取消</view>
				<view class="clip btn" @tap="clip">确定</view>
			</view>
		</view>
		<view class="cut-img" :style="{'width':initWidth+'px','height':initHeight+'px'}" v-if="isCut" @tap="showModal=true">
			<image :src="cutImg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgInfo:{},
				moveX:0,
				moveY:0,
				x:0,
				y:0,
				dragFlag:false,
				showModal:false,
				cutImg:"",//提交后台所用的裁剪后的图片
				isCut:false,
				clipWidth:150,//裁剪图片宽度
				clipHeight:150,//裁剪图片高度,
				initWidth:150,//初始化裁剪宽度，过滤裁剪过宽的情况
				initHeight:150,//初始化裁剪高度，过滤裁剪过高的情况,
				winWidth:0,
				winHeight:0
			}
		},
		onLoad() {
			let _this=this;
			uni.getSystemInfo({
				success: (res) => {
					_this.winWidth=res.windowWidth;
					_this.winHeight=res.windowHeight-40;
				}
			})
		},
		methods: {
			startEve(e){
				let x=e.touches[0].clientX-this.moveX;
				let y=e.touches[0].clientY-this.moveY;
				this.x=x;
				this.y=y;
				this.dragFlag=true;
			},
			moveEve(e){
				if(this.dragFlag){
					let moveX=e.touches[0].clientX-this.x;
					let moveY=e.touches[0].clientY-this.y;
					let imgInfo=this.imgInfo;
					if(moveX<0){
						moveX=0
					}
					if(moveX>imgInfo.width-this.initWidth){
						moveX=imgInfo.width-this.initWidth;
					}
					if(moveY<0){
						moveY=0
					}
					if(moveY>imgInfo.height-this.initHeight){
						moveY=imgInfo.height-this.initHeight;
					}
					this.moveX=moveX;
					this.moveY=moveY;
				}
			},
			endEve(e){
				this.dragFlag=false;
			},
			clip(){
				let _this=this;
				uni.canvasToTempFilePath({
					x:_this.moveX,
					y:_this.moveY,
					width:_this.initWidth,
					height:_this.initHeight,
					destWidth:_this.initWidth,
					destHeight:_this.initHeight,
					canvasId:"myCanvas",
					fileType:"jpg",
					success:function(res){
						_this.isCut=true;
						_this.showModal=false;
						_this.cutImg=res.tempFilePath;
					}
				},_this)
			},
			uploadImg(){
				let _this=this;
				uni.chooseImage({
					count:1,
					success:(res)=>{
						let url=res.tempFilePaths[0];
						let img=new Image();
						img.src=url;
						img.onload=function(res){
							let w=this.width;
							let h=this.height;
							let w1=w;
							let h1=h;
							let bl=w/h;
							let scaleBl;
							if(w<_this.winWidth&&h<_this.winHeight){
								w=_this.winWidth;
								h=w/bl;
							}
							if(w>_this.winWidth){
								w=_this.winWidth;
								h=w/bl;
							};
							if(h>_this.winHeight){
								h=_this.winHeight;
								w=h*bl;
							}
							
							scaleBl=h/h1;
							_this.imgInfo={
								url:url,
								width:w,
								height:h
							};
							_this.initWidth=_this.clipWidth>w?w:_this.clipWidth;
							_this.initHeight=_this.clipHeight>h?h:_this.clipHeight;
							_this.moveX=0;
							_this.moveY=0;
							_this.x=0;
							_this.y=0;
							_this.showModal=true;
							setTimeout(function(){
								const ctx=uni.createCanvasContext("myCanvas",_this);
								ctx.drawImage(url,0,0,w1,h1,0,0,w1*scaleBl,h1*scaleBl);
								ctx.draw();
							},50)
						};
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding:60upx 0;
		text-align: center;
	}
	.fixed-box{
		position: fixed;
		left:0;
		top:0;
		/* #ifdef H5 */
		top:44px;
		/* #endif */
		z-index: 100;
		width: 100%;
		bottom:0;
		background-color: #000;
		z-index: 999;
		display: flex;
		flex-direction: column;
		.main{
			flex:1;
			position: relative;
			overflow: hidden;
			.img-box{
				overflow: hidden;
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
				z-index:10;
				.drag{
					background-color: #f00;
					opacity: 0.6;
					position: absolute;
					left:0;
					top:0;
					z-index: 20;
				}
			}
		}
		.btn-group{
			height: 40px;
			z-index: 8888;
			color:#fff;
			width: 100%;
			display: flex;
			background-color: #f00;
			.btn{
				flex:1;
				line-height: 40px;
				font-size: 32upx;
			}
			.cancel{
				background-color: #fff;
				color:#f00;
			}
		}
	}
	.cut-img{
		margin:40upx auto;
		image{
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	canvas{
		display: block;
	}
</style>
