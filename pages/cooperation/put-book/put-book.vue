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
			<view class="cu-item" style="height: 300upx;" v-for="(item,i) in temp">
				<view class="cu-avatar radius lg" style="height: 250upx;width:180upx;" :style="'background-image:url('+item.userPic+')'"></view>
				<view class="content" style="position: absolute;left:240upx;top: 30upx;">
					<view class="text-grey">{{item.userName}}</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut">
							{{item.sub}}
						</text> 
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
				temp:[],
				list:[
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"},
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"},
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"},
					{title:"凯尔",image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",sub:"我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"}
				]
			}
		},
		onLoad() {
			var me=this;
			uni.request({
				url:"http://134.175.204.38:66/comment/getCommentByBookId?bookId=1",
				method:"GET",
				success(res) {
					me.temp = [];
					var temp = res.data.data;
					me.temp = temp;
					console.log(me.temp);
				},
				fail() {
					
				},
				complete() {
					
				}
			})
			
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
