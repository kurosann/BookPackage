<template name="trailerStars">
	<view class="score-wapper">
		<image src="../static/icon/denglu-copy.png" class="star-icon"></image>
		<image src="../static/icon/denglu-copy.png" class="star-icon"></image>
		<image src="../static/icon/denglu-copy.png" class="star-icon"></image>
		<image src="../static/icon/denglu-copy.png" class="star-icon"></image>
		<image src="../static/icon/denglu-copy.png" class="star-icon"></image>
	</view>
</template>

<script>
	export default {
		name:"trailerStars",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.score-wapper{
		display: flex;
		flex-direction: row;
	}
	.star-icon{
		width: 20upx;
		height: 20upx;
	}
</style>
