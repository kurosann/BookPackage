<template>
	<div class="search-div">
		<header class="flex borderBox header">
			<div class="flex input-div">
				<input class='borderBox' type="text" v-model.trim="keyword" placeholder="搜索" 
					@confirm="startSearch"/>
				<i class="iconfont icon-search search"></i>
				<i class="iconfont icon-chacha1 chacha" v-show="keyword"
					@click.stop="keyword='';"></i>
			</div>
			<div class="btn" @click.stop="startSearch">搜索</div>
		</header>
		<div class="space-div" style="height: 90upx;"></div>
		
		<div class="borderBox datalist-div">
			<NovelBook :books="books" />
		</div>
	</div>
</template>

<script>
import {showToast,get} from '@/utils/index';
import {getBookByWordUrl} from '@/config';
import NovelBook from '@/components/novel-book/index.vue';
export default{
	data(){
		return{
			keyword: '',
			books: []
		}
	},
	components: {
		NovelBook
	},
	methods: {
		jumpPage(url){
			if(url && typeof(url)=='string'){
				uni.navigateTo({
					url: url,
					animationType: 'slide-in-bottom'
				});
			}
		},
		initData(){
			this.keyword = "";
			this.books = [];
		},
		startSearch(){
			if(!this.keyword){
				showToast('请输入搜索关键词');
				return;
			};
			this.getData();
		},
		getData(){
			get(getBookByWordUrl, {
				query: this.keyword
			})
			.then((res)=>{
				if(res.ok){
					let data = res.books;
					data.forEach((item)=>{
						item.cover = decodeURIComponent(item.cover).replace('/agent/', '');
					});
					this.books = data;
				}else{
					showToast('请求出错');
				}
			});
		}
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		uni.hideNavigationBarLoading();
		this.initData();
		this.getData();
	}
}
</script>

<style lang="less" scoped>
header.header{
	width: 100%;
	height: 90upx;
	padding: 0 30upx;
	position: fixed;
	top: 0;  left: 0;
	z-index: 99;
	background: #f8f8f8;
	.input-div{
		flex: 1;
		height: 70upx;
		position: relative;
		input{
			width: 100%;
			height: 100%;
			background: #eaebed;
			font-size: 26upx;
			border-radius: 12upx;
			padding: 0 50upx;
		}
		i{
			position: absolute;
			font-size: 45upx;
			color: #666;
			z-index: 2;
			&.search{
				left: 4upx;
			}
			&.chacha{
				right: 10upx;
			}
		}
	}
	.btn{
		margin-left: 30upx;
		color: #da3433;
	}
}
.datalist-div{
	padding: 30upx;
}
</style>
