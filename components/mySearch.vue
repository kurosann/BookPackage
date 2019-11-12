<template>
	<div class='record-div'>
		<div class='flex white_bg padding10 search-div'>
			<i class='iconfont icon-iconss search'></i>
			<i class='iconfont icon-cancel-1-copy clear' v-if="keyword"
				@click='clearInput'></i>
			<input type="text" placeholder="搜索课程名称" confirm-type='搜索'
				v-model="keyword" @confirm="searchData">
			<span class='search-btn' @click="searchData">搜索</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		keyword: {
			
		}
	},
	methods: {
		clearInput(){
			this.keyword = "";
		},
		searchData(){
			//触发搜索
			this.$emit('startSearch',this.keyword);
		}
	}
}
</script>

<style lang="less" scoped>
.search-div{
	height: 80upx;
	position: relative;
	i.search,i.clear{
		position: absolute;
		left: 30upx;
		font-size: 46upx;
	}
	i.clear{
		left: initial;
		right: 120upx;
	}
	input{
		flex: 1;
		width: 614upx;
		height: 60upx;
		background: #E5E5E5;
		font-size: 24upx;
		padding: 0 60upx;
		box-sizing: border-box;
		color: #333;
		border-radius: 12upx;
		font-family: '楷体';
		font-weight: 400;
	}
	input::webkit-input-placeholder{
		font-size: 24upx;
		color: #333;
		font-family: '楷体';
		font-weight: 400;
	}
	span.search-btn{
		padding: 0 20upx;
	}
}
</style>
