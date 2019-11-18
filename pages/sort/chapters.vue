<template>
	<scroll-view class="borderBox book-chapter" scroll-y :scroll-into-view="scrollId" 
		scroll-with-animation>
		<li class="flex list" v-for="(item,i) in dataList" :key='i' :id="'item'+i"
			:class="bookIndex==i?'active':''"
			@click.stop="seeZhangjie(i)">
			<div class="left-div">
				{{i+1}}. {{item.title}}
			</div>
			<i class="iconfont icon-xiangyou"></i>
		</li>
	</scroll-view>
</template>

<script>
import {setLocalStorage} from '@/utils/index';
import {mapGetters,mapActions} from 'vuex';

var _self;
export default{
	data(){
		return{
			id: '', //小说id
			dataList: [],
			scrollId: '',  //滚动id
		}
	},
	computed: {
		...mapGetters('novel', ['bookIndex']),
	},
	mounted(){
		this.id = this.$mp.query.id;
		this.$store.commit('novel/GET_BOOKINDEX', this.id);
		this.getData();
	},
	onLoad() {
		_self = this;
	},
	methods: {
		seeZhangjie(index){
			this.$store.commit('novel/SET_BOOKINDEX', {
				id: _self.id,
				index: index
			});
			let link = encodeURIComponent(this.dataList[index].link);
			let title = this.dataList[index].title;

			setLocalStorage('chapterLink', link);
			uni.navigateTo({
				url: '/pages/sort/chapter_reader?title='+title,
			});
		},
		getData(){
			this.$store.dispatch('novel/getNovelChapters', this.id)
			.then((data)=>{
				this.dataList = data;
				this.scrollId = `item${this.bookIndex}`;
			})
			.catch();
		},
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		uni.hideNavigationBarLoading();
		this.getData();
	}
}
</script>

<style lang="less" scoped>
.book-chapter{
	width: 100%;
	height: 100vh;
	padding: 0 30upx;
	li.list{
		min-height: 80upx;
		padding: 30upx 10upx 0;
		&.active{
			border-bottom:  1px solid #38adfd;
		}
	}
	li.list+li.list{
		border-top: 1px solid #eee;
	}
}
</style>
