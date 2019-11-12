<template>
	<view class="page page-block">
		
		<view class="line"></view>
		
		<view class="uni-list">
			<view class="uni-list-cell-db">消息通知</view>
		    <view class="uni-list-cell ">
					<switch checked  style="transform: scale(0.7)"/>
			</view>
		</view>
		
		<view class="line"></view>
		
		<view class="uni-list">
			<view class="uni-list-cell-db">更新通知</view>
		    <view class="uni-list-cell ">
					<switch checked style="transform: scale(0.7)"/>
			</view>
		</view>
		
		<view class="line"></view>
		
		<view class="uni-list">
			<view class="uni-list-cell-db">推送通知</view>
		    <view class="uni-list-cell ">
					<switch checked  style="transform: scale(0.7)"/>
			</view>
		</view>
		
		<view class="line"></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("notice.css");
	.page{
		background-color: white;
		position: absolute;
	}
</style>
