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
		
		<block v-if="TabCur==0">
			<!-- <view class="line2"></view> -->
			<view class="body">
				<view class="reader-icon-view">
					<image src="../../static/icon/tushuguan.jpg" class="reader-icon"></image>
				</view>
				<view class="reader-name-view">
					<text class="reader-name">13212313</text>
					<text class="reader-zan">用户回复你的推书</text>
				</view>
			</view>
			
			<view class="my-comment">
				<view class="comment-context">
					<view class="comment-context2">
						<view class="a">推荐看的这三本设计书籍</view>
						<view class="me-comment">
							我：这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内
						</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
		</block>
		
		<block v-if="TabCur==0">
			<!-- <view class="line2"></view> -->
			<view class="body">
				<view class="reader-icon-view">
					<image src="../../static/icon/tushuguan.jpg" class="reader-icon"></image>
				</view>
				<view class="reader-name-view">
					<text class="reader-name">13212313</text>
					<text class="reader-zan">用户回复你推书的评论</text>
				</view>
			</view>
			
			<view class="my-comment">
				<view class="comment-context">
					<view class="comment-context2">
						<view class="a">推荐看的这三本设计书籍</view>
						<view class="me-comment">
							我：这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内这里是书评内容,这里是书评是书评内
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
					<text class="reader-zan">用户回复你的求书</text>
				</view>
			</view>
			
			<view class="my-comment">
				<view class="comment-context">
					<view class="comment-context2">
						<view class="a">求推荐几本关于包装印刷的书</view>
						<view class="me-comment">
							我：这书用简洁的语言系统化的诠释了设计技术和商业大声说纷纷个人过我的玩...
						</view>
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
					<text class="reader-zan">用户回复你求书的评论</text>
				</view>
			</view>
			
			<view class="my-comment">
				<view class="comment-context">
					<view class="comment-context2">
						<view class="a">求推荐几本关于包装印刷的书</view>
						<view class="me-comment">
							舒淇：这书用简洁的语言系统化的诠释了设计技术和商业大声说纷纷个人过我的...
						</view>
					</view>
					<view class="fenge"></view>
					<view class="book-name">
						我：《包装印刷史册》、《包印材料工
					</view>
				</view>
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
				text:["推书","求书"],
				TabCur: 0,
				scrollLeft: 0
			}
		},
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
	@import url("message.css");
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

</style>
