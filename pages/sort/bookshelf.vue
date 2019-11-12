<template>
	<div class="borderBox shelf-div">
		<li class="flex borderBox list" v-for="(item,i) in bookStore" :key='i'	
			@click.stop="jumpPage('/pages/sort/chapters?id='+item.id)">
			<div class="img-div">
				<image :src="item.img" mode=""></image>
			</div>
			<div class="borderBox content">
				<p class="burt_ellipsis2 title">{{item.title}}</p>
			</div>
			<i class="iconfont icon-shanchu delete" @click.stop="deleteBook(i)"></i>
		</li>
	</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import {showToast} from '@/utils/index';
export default{
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
					animationType: 'zoom-fade-out'
				});
			}
		},
		//删除小说
		deleteBook(index){
			let item = this.bookStore[index];
			uni.showModal({
				title: '删除',
				content: `确定删除${item.title}吗?`,
				confirmColor: '#ff0000',
				success: (res)=>{
					if(res.confirm){
						let books = this.bookStore;
						books.splice(index,1);
						this.$store.commit('novel/SET_BOOKSTORE', books);
						showToast('删除成功', 'success');
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.shelf-div{
	padding: 20upx;
	
	li.list{
		background: #fff;
		padding: 20upx;
		border-radius: 12upx;
		.img-div{
			image{
				width: 80upx;
				height: 120upx;
				border-radius: 10upx;
			}
		}
		.content{
			padding: 0 20upx;
			flex: 1;
		}
		i.delete{
			font-size: 40upx;
			color: #a60a0b;
		}
	}
	li.list+li.list{
		border-top: 1px solid #eee;
	}
}
</style>
