<template>
	<div class="box">
		<img :src="pic" alt="" @longtap="savePic">
		<p class="tip">长按保存图片</p>
	</div>
</template>

<script>
export default{
	data(){
		return{
			pic: '/static/img/reward.jpg',
		}
	},
	methods: {
		//保存图片
		savePic(){
			uni.saveImageToPhotosAlbum({
				filePath: this.pic,
				success: (res)=>{
					showToast('保存成功');
				},
				fail: (e)=>{
					console.log(e);
				}
			});
		}
	}
}
</script>

<style lang="less" scoped>
img{
	display: block;
	width: 400upx;
	height: 400upx;
	margin: 30upx auto 0;
}
p.tip{
	font-size: 26upx;
	margin-top: 10upx;
	text-align: center;
	line-height: 60upx;
	background: rgba(255,255,255,0.8);
}
</style>
