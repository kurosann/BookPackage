<template>
	<view class="buffer-page">
		<view class="line"></view>
		<scroll-view scroll-x class="bg-white nav">
		<view class="flex text-center">
			<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(text,index) in text" :key="index" @tap="tabSelect" :data-id="index">
				{{text}}
			</view>
		</view>
		</scroll-view>
		
		<block v-if="TabCur==0" v-for="(list,index) in lists" :key="index">
			<view class="body">
				<view class="reader-icon-view">
					<image src="../../static/icon/tushuguan.jpg" class="reader-icon"></image>
				</view>
				<view class="reader-name-view">
					<text class="reader-name">{{lists[index].id}}</text>
					<text class="reader-zan">赞了你的图书</text>
				</view>
				<view class="comment-date">
					<view class="">{{lists[index].date}}</view>
				</view>
			</view>
			
			<view class="my-comment">
				<view class="comment-context">
					<view class="comment-context2">
						<trailerStars ></trailerStars>
						<view class="me-comment">
							{{lists[index].content}}
						</view>
					</view>
					<view class="fenge"></view>
					<view class="book-name">
						书籍：书名dsadsads
					</view>
				</view>
			</view>
			<view class="line"></view>
		</block>
		
		<block v-if="TabCur==1">
			<!-- <view class="line2"></view> -->
			<view class="body">
				<view class="reader-icon-view">
					<image src="../../static/icon/tushuguan.jpg" class="reader-icon"></image>
				</view>
				<view class="reader-name-view">
					<text class="reader-name">13212313</text>
					<text class="reader-zan">赞了你的图书</text>
				</view>
				<view class="comment-date">
					<view class="">2018年10月23日</view>
				</view>
			</view>
			
			<view class="message">
				这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息
			</view>
			
			<view class="line"></view>
		</block>
		
	</view>
</template>

<script>
	import trailerStars from "../../components/trailerStars.vue"
	export default {
		data() {
			return {
				text:["书评","系统"],
				TabCur: 0,
				scrollLeft: 0,
				id:1,
				lists:[],
			}
		},
		onLoad() {
			uni.request({
				url: "http://134.175.204.38:66/comment/getCommentByBookId",
				data:{
					"bookId":this.id,			//引号内是数据库字段
				},
				method: 'GET',
				success: res => {
					//获取真实数据之前务必判断状态是否200.
					if(res.data.code == 0){
					this.lists = res.data.data;
					console.log(this.lists)
					}
				},
			})
		}
		,
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				}
			
		},
		components:{
			trailerStars
		}
	}
</script>

<style>
	@import url("buffer.css");
	.message{
		padding-right: 30upx;
		padding-left: 140upx;
	}
	.line{
		margin-top: 30upx;
	}
	.line2{
		height: 1px;
		background-color: orange;
	}
	.reader-name{
		color: #333333;
	}
</style>
