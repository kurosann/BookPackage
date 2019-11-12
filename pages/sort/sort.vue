<template>
	<div class="sort-div">
		<header class="borderBox flex header">
			<input class='borderBox' type="text" placeholder="搜索书籍" 
				@click.stop="jumpPage('/pages/sort/search')"/>
			<i class="iconfont icon-search"></i>
		</header>
		<div class="space-div" style="height: 100upx;"></div>
		
		<!--内容区域-->
		<div class="flex contain-div">
			<div class="left-div">
				<li class="list" v-for="(item,i) in navArr" :key='i'
					:class="navIndex==i?'active': ''"
					@click.stop="navChange(i)">
					{{item.name}}
				</li>
			</div>
			<div class="flex borderBox right-div" v-if="navArr && navArr.length>0">
				<li class="flex borderBox list"
					v-for="(item,i) in navArr[navIndex].data" :key='i'
					@click.stop="handleLi(item)">
					<div class="list-l">
						<p class="name">{{item.name}}</p>
						<p class="count">{{item.bookCount}}本</p>
					</div>
					<image :src="item.coverImg" mode=""></image>
				</li>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default{
	data(){
		return{
			navIndex: 0,
		}
	},
	computed: {
		...mapGetters('novel', ['navArr']),
	},
	mounted(){
		this.$store.dispatch('novel/getAllSortList');
	},
	methods: {
		jumpPage(url){
			if(url && typeof(url)=='string'){
				uni.navigateTo({
					url: url,
					animationType: 'slide-in-top'
				});
			}
		},
		navChange(index){
			if(this.navIndex!=index){
				this.navIndex = index;
			}
		},
		//点击项目
		handleLi(item){
			let gender = this.navArr[this.navIndex].key;
			let major = item.name;
			uni.navigateTo({
				url: `/pages/sort/sort_detail?gender=${gender}&major=${major}`
			});
		}
	}
}
</script>

<style lang="less" scoped>
header.header{
	position: fixed;
	width: 100%;
	height: 100upx;
	background: #fff;
	top: 0;  left: 0;
	padding: 30upx;
	input{
		height: 70upx;
		background: #f8f8f8;
		flex: 1;
		border-radius: 20upx;
		padding-left: 60upx;
	}
	i{
		position: absolute;
		left: 40upx;
		font-size: 46upx;
	}
}
.contain-div{
	height:  calc( 100vh - 100upx);
	width: 100%;
	align-items: flex-start;
	.left-div{
		width: 140upx;
		height: 100%;
		background: #fff;
		overflow-y: auto;
		li.list{
			text-align: center;
			line-height: 70upx;
			&.active{
				background: #f8f8f8;
				position: relative;
				&:after{
					position: absolute;
					content: "";
					display: block;
					width: 6upx;
					height: 50upx;
					background: #38adfd;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	.right-div{
		flex: 1;
		height: 100%;
		overflow-y: auto;
		flex-wrap: wrap;
		padding: 20upx;
		align-items: flex-start;
		li.list{
			width: 49%;
			height: 120upx;
			padding: 0 12upx;
			background: #fff;
			border-radius: 12upx;
			.list-l{
				flex: 1;
				p.name{
					color: #57565b;
					font-size: 24upx;
				}
				p.count{
					color: #b7b7b7;
					font-size: 20upx;
				}
			}
			image{
				width: 74upx;
				height: 100upx;
			}
		}
		li.list:nth-child(2n){
			margin-left: 2%;
		}
	}
}
</style>
