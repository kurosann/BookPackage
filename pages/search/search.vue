<template>

	<view>
		<mSearch @search="search($event,0)"></mSearch>
		<sl-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result">
		</sl-filter>

		<view class="padding bg-white">
			<view class="sing-like-movie" v-for="(movieLike,gIndex) in dd ">
				<image :src="movieLike.bookPic" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						{{movieLike.bookName}}
					</view>
					<view class="movie-info">
						{{movieLike.bookSub2}}
					</view>


					<template>
						<view>
							<template v-if="typeAll==1">


								<view class="movie-infotwo">
									<view class="flex solid-bottom  justify-between">
										<view class="movie-infotwo" @click="hot()">{{movieLike.bookName}}</view>
										<view class="movie-infotwo">
											<view class='cu-tag radius'>{{movieLike.bookReading}}</view>
										</view>
										<view class="movie-infotwo">
											<view class='cu-tag radius'>{{movieLike.tbCatalogs[0].catalogName}}</view>
										</view>

									</view>
								</view>
							</template>

							<template v-else-if="typeAll==0">

								<view class="movie-infotwo">
									<view class="flex solid-bottom  justify-between">
										<view class="movie-infotwo">{{movieLike.bookName}}</view>

										<view class="movie-infotwo">
											<view class='cu-tag radius'>{{movieLike.tbCatalogs[0].catalogName}}</view>
										</view>

									</view>
								</view>
							</template>
							<template v-else-if="typeAll==2">

								<view class="movie-infotwo">
									<view class="flex solid-bottom  justify-between">
										<view class="movie-infotwo">{{movieLike.bookName}}</view>

										<view class="movie-infotwo">
											<view class='cu-tag radius'>{{movieLike.tbCatalogs[0].catalogName}}</view>
										</view>

									</view>
								</view>
							</template>
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>



</template>

<script>
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';

	export default {
		components: {
			slFilter,
			mSearch

		},
		data() {
			return {
				start: 0,
				limit: 10,
				typeAll: 0,
				dd: [],
				taye: [],
				val0: '',
				placeholder: '动态占位内容',
				themeColor: '#000000',
				titleColor: '#666666',
				filterResult: '',
				menuList: [{
						'title': '综合排序',
						'key': 'sort',
						'isSort': true,
						'reflexTitle': true,
						'detailList': [{
								'title': '综合排序',
								'value': '0'
							},
							{
								'title': '人气最旺',
								'value': '1'
							},
							{
								'title': '评论最多',
								'value': '2'
							},
							{
								'title': '最新出版',
								'value': '3'
							}
						]
					},

					{
						'title': '收藏最多',
						'key': 'single',
						'isMutiple': false,
						'detailTitle': '请选择（单选）',
						'reflexTitle': true,
						'detailList': [{
								'title': '全部',
								'value': ''
							},
							{
								'title': '条件1',
								'value': 'test_1'
							},
							{
								'title': '条件2',
								'value': 'test_2'
							},
							{
								'title': '条件3',
								'value': 'test_3'
							},
							{
								'title': '条件4',
								'value': 'test_4'
							},
							{
								'title': '条件5',
								'value': 'test_5'
							},
							{
								'title': '条件6',
								'value': 'test_6'
							},
							{
								'title': '条件7',
								'value': 'test_7'
							},
							{
								'title': '条件8',
								'value': 'test_8'
							},

						]
					},
					{
						'title': '筛选',
						'key': 'salary',
						'detailTitle': '按需筛选',
						'isMutiple': true,
						'detailList': [{
								'title': '全部',
								'value': ''
							},
							{
								'title': '图书',
								'value': '图书'
							},
							{
								'title': '期刊',
								'value': '期刊'
							},
							{
								'title': '湖工大',
								'value': '湖工大'
							},
							{
								'title': '院分馆',
								'value': '院分馆'
							},
							{
								'title': '河西新书库',
								'value': '河西新书库'
							},
							{
								'title': '社科书库',
								'value': '社科书库'
							},
							{
								'title': '东院',
								'value': '东院'
							},
							{
								'title': '社区新书库',
								'value': '社区新书库'
							},
							{
								'title': '学生阅览室',
								'value': '学生阅览室'
							},
							{
								'title': '其他',
								'value': '其他'
							}
						]

					}

				]
			}
		},
		onReachBottom() {
			var me = this;

			me.next();



		},
		onLoad() {

			var me = this;
			me.dd = [];

			uni.request({
				url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=' + me.start + '&limit=' + me.limit,
				success: (res) => {

					var dd = res.data.data;
					var type = res.data.data.tbCatalogs
					me.taye = type;
					var yvlantu = [];
					me.dd = dd;




				}
			})

		},
		methods: {
			search(e, val) {
				uni.showLoading({
					mask: false,
					title: "正在查询。。。"
				});
				var me = this;
				this['val' + val] = e;
				console.log(e);
				me.dd = [];
				me.all(e);
				uni.hideLoading();
			},
			next() {
				var me = this;
				uni.showLoading({
					title: "正在加载。。。",
					mask: true
				})
				var me = this;
				me.start = me.start + 10;
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=' + me.start + '&limit=' + me.limit,
					success: (res) => {


						var dd = res.data.data;
						me.dd = me.dd.concat(dd);

					}
				})
				uni.hideLoading();
			},
			star() {
				var me = this 
				me.start = 0;
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=' + me.start + '&limit=' + me.limit,
					success: (res) => {

						me.dd = [];
						var dd = res.data.data;
						var type = res.data.data.tbCatalogs
						me.taye = type;
						me.dd = dd;




					}
				})
			},
			result(val) {
				var me = this;
				console.log('filter_result:' + JSON.stringify(val));
				me.filterResult = JSON.stringify(val, null, 2);
				console.log(val.sort)
				if (val.sort == 0) {
					me.typeAll = val.sort
					me.star();
				} else if (val.sort == 1) {
					me.hot();
				} else if (val.sort == 2) {
					me.hot();
				} else {

				}
			},
			all(name) {

				var me = this;
				uni.request({
					url: 'http://134.175.204.38:66/book/getBookByBookName?bookName=' + name,

					success: (res) => {

						var dd = res.data.data;
						me.dd = [];

						me.dd = me.dd.concat(dd);

					}
				})


			},
			hot() {

				var me = this;
				var renqi = [];
				renqi = me.dd;
				me.start = 0;
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=' + me.start + '&limit=' + me.limit,
					success: (res) => {
						me.dd = [];
						var dd = res.data.data;
						var type = res.data.data.tbCatalogs
						me.taye = type;
						me.dd = dd;


					}
				})

				for (var i = 0; i < renqi.length - 1; i++) {
					for (var j = i + 1; j < renqi.length; j++) {
						if (parseInt(renqi[i].bookReading) > parseInt(renqi[j].bookReading)) {
							var temp = renqi[i];

							renqi[i] = renqi[j];

							renqi[j] = temp;
						}
					}
				}
				me.typeAll = 1;
				me.dd = [];
				me.dd = me.dd.concat(renqi);





			},
			talk() {
				var me = this;
				var renqi = [];
				uni.request({
					url: 'http://134.175.204.38:66/book/get_book_by_catalog?catalog=中国文学&start=20&limit=10',
					success: (res) => {
						me.typeAll = 2;
						me.dd = [];
						renqi = me.dd;
						var dd = res.data.data;
						me.dd = me.dd.concat(renqi);





					}
				})
			}

		}
	}
</script>

<style>
	@import url("search.css");

	.text {
		margin-top: 50px;
		margin-left: 20px;
		width: 100%;
	}
</style>
