<template>
	<view>
		<!-- <view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">垂直导航</block>
			</cu-custom>
		</view> -->
		<!-- 滑动选项卡 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in fenlei" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item.catalogName}}


				</view>

			</view>
		</scroll-view>
		<!-- <block v-if="index == 0"></block> -->
		<!-- 列表 -->
		<view class="cu-list menu-avatar">
			<view class="cu-item" style="height: 300upx;" v-for="(item,i) in date">

				<view class="cu-avatar radius lg" style="height: 250upx;width:180upx;" :style="'background-image:url('+item.bookPic+')'"></view>

				<view class="content" style="position: absolute;left:240upx;top: 30upx;">
					<view class="text-grey">{{item.bookName}}</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut">
							{{item.bookTags}}
						</text>
					</view>
				</view>

			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				fenlei: [],
				page: 0,
				type: "",
				date: [],
				catalog: [{
					title: "理学",
					list: [{
						title: "dasdas",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片asdasw荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "dasdas",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片asdasw荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "dasdas",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片asdasw荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, ],
				}, {
					title: "文学",
					list: [{
						title: "凯尔asdaasd",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒asdaacaca芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaasd",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒asdaacaca芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaasd",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒asdaacaca芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaasd",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒asdaacaca芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaasd",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒asdaacaca芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaasd",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒asdaacaca芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, ],
				}, {
					title: "工学",
					list: [{
						title: "凯尔asdaw",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏asasd入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaw",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏asasd入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaw",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏asasd入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔asdaw",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏asasd入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, ],
				}, {
					title: "哲学",
					list: [{
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, ],
				}, {
					title: "法学",
					list: [{
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, ],
				}, {
					title: "...",
					list: [{
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, {
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}, ],
				}, ],

				TabCur: 0,
				scrollLeft: 0,
				title: ["理学", "文学", "工学", "哲学", "法学", "..."],
				list: [{
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					},
					{
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					},
					{
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					},
					{
						title: "凯尔",
						image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						sub: "我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。"
					}

				]
			}
		},
		onLoad() {
			var me = this;
			uni.showLoading({
				mask: true,
				title: "请稍后..."
			});

			uni.request({
				url: "http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=0&limit=20",
				success: (res) => {


					var date = res.data.data;
					me.date = date;


				}

			})



			uni.request({

				url: "http://134.175.204.38:66/book/get_catalog",
				success: (res) => {

					var fenlei = res.data.data;
					me.fenlei = fenlei;
					console.log("这里是分类数组" + me.fenlei)

					// me.trailerList = trailerList;
					//
				}
			})





			uni.hideLoading();
		},
		methods: {
			tabSelect(e) {
				var me = this;
				this.TabCur = e.currentTarget.dataset.id;
				this.page = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60

				switch (this.TabCur) {
					case 0:
						me.pinjie("中国文学")
						break;
					case 1:
						me.pinjie("外国文学")
						break;
					case 2:
						me.pinjie("儿童文学")
						break;
					case 3:
						me.pinjie("散文")
						break;
					case 4:
						me.pinjie("经典名著")
						break;
					case 5:
						me.pinjie("小说")
						break;
					case 6:
						me.pinjie("历史")
						break;
					case 7:
						me.pinjie("教育")
						break;
					case 8:
						me.pinjie("成功励志")
						break;
					case 9:
						me.pinjie("人物传记")
						break;
					case 10:
						me.pinjie("心灵鸡汤")
						break;
					case 11:
						me.pinjie("心理学")
						break;
					case 12:
						me.pinjie("管理")
						break;
					case 13:
						me.pinjie("经济")
						break;
					case 14:
						me.pinjie("理财")
						break;
					case 15:
						me.pinjie("哲学")
						break;
					case 16:
						me.pinjie("计算机")
						break;
					default:
						break;
				}

			},
			pinjie(type) {
				var me = this;
				uni.request({
					url: "http://134.175.204.38:66/book/get_book_by_catalog?catalog=" + type + "&start=0&limit=20",
					success: (res) => {

						me.date = [];
						var date = res.data.data;
						me.date = me.date.concat(date);

					}

				})

			},
			getbook(fenleiming) {
				var me = this;
				uni.request({
					url: "http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=0&limit=20",
					success: (res) => {


						var date = res.data.data;
						me.date = date;

						// me.fenlei = res.data.data
						// me.trailerList = trailerList;
						// console.log(res.data)
					}

				})
			}

		}
	}
</script>

<style>
	.cu-list.menu-avatar {
		overflow: hidden;
	}
</style>
