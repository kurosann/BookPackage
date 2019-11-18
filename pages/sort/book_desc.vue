<template>
	<!--小说描述-->
	<div class="books-desc-div">
		<header class="flex header">
			<image class='bg' :src="dataObj.cover" mode=""></image>
			<div class="img-div">
				<image :src="dataObj.cover" mode=""></image>
			</div>
			<div class="right-div">
				<p class="title">{{dataObj.title}}</p>
				<p class="author-info">
					<span class="author">{{dataObj.author}}</span>
					<span class="type">{{dataObj.cat||dataObj.majorCate}}</span>
				</p>
				<p class="word">{{dataObj.wordCount}}字</p>
				<p class="rate" v-if="dataObj.rating">评分：{{dataObj.rating.score}}</p>
			</div>
		</header>
		
		<!--简介-->
		<div class="borderBox longintro">
			<p class="title">简介</p>
			<div class="flex tags-div" v-if="dataObj.tags">
				<li class="list" v-for="(item,i) in dataObj.tags" :key='i'>
					{{item}}
				</li>
			</div>
			<div class="content">{{dataObj.longIntro}}</div>
		</div>
		
		<div class="items-div">
			<div class="borderBox flex item" @click.stop="jumpPage('/pages/sort/chapters?id='+id)">
				<span class="name">查看章节</span>
				<i class="iconfont icon-xiangyou"></i>
			</div>
		</div>
		
		<div class="btn add" @click.stop="addBook">加入书架</div>
	</div>
</template>

<script>
import {get,showToast} from '@/utils/index';
import {getBookDescUrl} from '@/config';
export default{
	data(){
		return{
			id: '', //小说id
			dataObj: {}
		}
	},
	mounted(){
		this.id = this.$mp.query.id;
		this.getData();
	},
	methods: {
		//设置该小说
		jumpPage(url){
			console.log(url);
			if(url && typeof(url)=='string'){
				uni.navigateBack();
				uni.navigateTo({
					url: url,
					animationType: 'zoom-out',
					success(res) {
					}
				});
			}
		},
		getData(){
			if(!this.id){
				return;
			};
			let url = getBookDescUrl + '/'+this.id;
			get(url, {})
			.then((res)=>{
				res.cover = decodeURIComponent(res.cover).replace('/agent/', '');
				this.dataObj = res;
			});
		},
		//点击添加
		addBook(){
			let tmp ={
				id: this.id,
				cover: this.cover,
				title: this.dataObj.title
			};
			this.$store.commit('novel/ADD_BOOK', tmp);
		}
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		uni.hideNavigationBarLoading();
		this.getData();
	}
}
</script>

<style lang="less" scoped>
@import 'default.less';
.books-desc-div{
	padding-bottom: 100upx;
}
header.header{
	height: 312upx;
	position: relative;
	padding: 30rpx 0 0;

	image.bg{
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		z-index: 0;
		filter: blur(10px);
		opacity: 0.3;
	}
	.img-div{
		image{
			width: 178upx;
			height: 238upx;
			margin: 0 50upx;
		}
	}
	.right-div{
		height: 238upx;
		.author-info{
			margin-top: 16upx;
			font-size: 26upx;
			span.author{
				color: #e24e4d;
			}
			span.type{
				color: #8e8d8d;
				margin-left: 30upx;
			}
		}
		p.word{
			font-size: 24upx;
			margin-top: 16upx;
			color: #8e8d8d;
		}
		p.rate{
			font-size: 26upx;
			margin-top: 16upx;
			color: #8e8d8d;
		}
	}
}
.longintro{
	padding: 30upx;
	margin-top: 30upx;
	background: #fff;
	p.title{
		line-height: 70upx;
	}
	.tags-div{
		flex-wrap: wrap;
		padding: 20upx 0;
		li.list{
			line-height: 40upx;
			font-size: 24upx;
			background: #f0eff4;
			color: #bebdc5;
			padding: 0 16upx;
			border-radius: 20upx;
			margin: 8upx;
		}
	}
	div.content{
		font-size: 28upx;
		text-indent: 56upx;
	}
}
.items-div{
	margin-top: 30upx;
	background: #fff;
	.item{
		min-height: 70upx;
		justify-content: space-between;
		padding: 30upx;
	}
	.item+.item{
		border-top: 1px solid #eee;
	}
}
.add{
	width: 80%;
	line-height: 80upx;
	position: fixed;
	left: 10%;
	bottom: 10upx;
	background: @mainColor;
	border-radius: 40upx;
	text-align: center;
	color: #fff;
}
</style>
