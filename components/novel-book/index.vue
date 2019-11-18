<template>
	<ul class="box-div">
		<li class="borderBox flex list" v-for="(item,i) in books" :key='i'
			@click.stop="jumpPage('/pages/sort/book_desc?id='+item._id)">
			<div class="img-div">
				<image :src="item.cover" mode=""></image>
			</div>
			<div class="right-div">
				<p class="name">{{item.title}}</p>
				<p class=".burt_ellipsis2 desc">{{item.shortIntro}}</p>
				<div class="flex bottom-div">
					<div class="r-l">
						作者:{{item.author}}
					</div>
					<div class="r-r">
						<span class="type">{{item.cat||item.minorCate}}</span>
					</div>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import {showToast,setLocalStorage} from '@/utils/index';
export default{
	props: {
		books: {
			default: []
		}
	},
	data(){
		return{
			
		}
	},
	computed: {
		...mapGetters('novel', ['bookStore']),
	},
	methods: {
		jumpPage(url){
			if(url && typeof(url)=='string'){
				uni.navigateTo({
					url: url,
					animationType: 'slide-in-bottom'
				});
			}
		}
	}
}
</script>

<style lang="less" scoped>
ul.box-div{
	li.list{
		background: #fff;
		padding: 20upx;
		border-radius: 16upx;
		.img-div{
			image{
				width: 156upx;
				height: 220upx;
				margin-right: 24upx;
				border-radius: 12upx;
			}
		}
		.right-div{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			p.name{
				font-size: 32upx;
			}
			.desc{
				font-size: 24upx;
				color: #919095;
				margin-top: 20upx;
			}
		}
		.bottom-div{
			justify-content: space-between;
			font-size: 24upx;
			color: #919095;
			margin-top: 16upx;
			.r-r{
				span{
					background: #f0eff4;
					line-height: 36upx;
					padding: 0 12upx;
					border-radius: 18upx;
					color: #98979c;
				}
			}
		}
		i.add{
			margin-left: 10upx;
			font-size: 46upx;
			background: #38adfd;
			color: #fff;
			border-radius: 50%;
			display: block;
			width: 60upx;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
		}
	}
	li.list+li.list{
		margin-top: 20upx;
	}
}
</style>
