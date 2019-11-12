<template>
	<div class="swiper-div">
		<swiper autoplay="true" interval="3000" :duration="300" 
			:style="{height: burtHeight+'px'}"
			@change="changeSwiper">
			<swiper-item class='flex' v-if="goodsObj.video">
				<video :src="goodsObj.video" controls></video>
			</swiper-item>
			<swiper-item class='flex' v-for="(item,i) in goodsObj.picture_list" :key='i'>
				<image :src="item.path" @click.stop="previewImg(i)"/>
			</swiper-item>
		</swiper>
		<!--指示点-->
		<div class="zhishidian-div" v-if="goodsObj.picture_list">
			<span>{{currentIndex+1}}</span>
			<span>/</span>
			<span>{{goodsObj.video? goodsObj.picture_list.length+1: goodsObj.picture_list.length}}</span>
		</div>
	</div>
	
</template>

<script>
export default {
	props: {
		burtHeight: {
			default: '263',
		},
		goodsObj: {
			default: {}
		}
	},
	data(){
		return {
			currentIndex: 0
		}
	},
	methods: {
		changeSwiper(e){
			let index = e.detail.current;
			this.currentIndex = index;
		},
		//预览图片
		previewImg(index){
			let urls = [];
			this.goodsObj.picture_list.forEach((item,i)=>{
				urls.push(item.path);
			});
			uni.previewImage({
				indicator: 'number',
				current: this.goodsObj.picture_list[index].path,
				urls: urls
			});
		}
	}
}
</script>

<style lang="less" scoped>
.swiper-div{
	position: relative;
}
swiper{
	background: #fff;
	swiper-item{
		justify-content: center;
		image{
			display: block;
			height: 100%;
		}
		video{
			width: 100%;
		}
	}
}
/**指示点**/
.zhishidian-div{
	background: rgba(0,0,0,0.5);
	line-height: 30upx;
	padding: 0 10upx;
	border-radius: 10upx;
	position: absolute;
	right: 76upx;
	bottom: 20upx;
	font-size: 20upx;
	color: #fff;
}
</style>
