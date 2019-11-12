<template>
	<!--章节阅读-->
	<div class="borderBox chapter-reader-div">
		<rich-text :nodes="longTxt"></rich-text>
	</div>
</template>

<script>
import {getLocalStorage} from '@/utils/index';
import {mapGetters,mapActions} from 'vuex';
export default{
	data(){
		return{
			longTxt: '', //小说内容
			link: '',
		}
	},
	mounted(){
		let query = this.$mp.query;
		this.link = getLocalStorage('chapterLink');
		let title = query.title;
		uni.setNavigationBarTitle({
			title: title
		});
		this.getData();
	},
	methods: {
		getData(){
            console.log(this.link);
            this.$store.dispatch('novel/getChaptersContent', this.link)
			.then((data)=>{
				data = data.replace(/\n/g, "<br><br>");
                console.log(data);
                this.longTxt = data;
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
.chapter-reader-div{
	min-height: 100vh;
	padding: 20upx 30upx;
	background: #e4cba3;
	font-size: 30upx;
	line-height: 60upx;
	rich-text{
		
	}
}
</style>
