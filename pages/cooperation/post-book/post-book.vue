<template>
	<view>
		<view>
			<view></view>
			<view >
				<navigator url="next/next">
					<button class="cu-btn round" :key="i" style="margin: 8px;">
						下一步
					</button>
				</navigator>	
			</view>
		</view>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item" style="" v-for="(item,i) in list">
				<view class="content" style="position: absolute;">
					<view class="text-grey" >{{item.title}}
					
					</view>	
				</view>
				
				<!-- 复选框 -->
				<view class="cu-form-group">
					<checkbox class='round' :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="B"></checkbox>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				number:0,
				list:[
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"},
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"},
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"},
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"}
				]
			}
		},
		
		methods: {
			
		}
	}
</script>

<style>
	.cu-list.menu-avatar {
			overflow: hidden;
		}
</style>
