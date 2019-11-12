<template>
	<!--红包查看-->
	<div class="red-bag-detail-div" v-show="isShow">
		<p class="mask"></p>
		<div class="box-div">
			<!--发红包的人的信息-->
			<div class="borderBox person-info-div">
				<image :src="redBagObj.avatar" />
				<p class="burt_ellipsis nickname">来自{{redBagObj.nickname}}</p>
				<p class="burt_ellipsis desc">{{redBagObj.desc||'恭喜发财，大吉大利'}}</p>
			</div>
			
			<!--如果你抢到了红包，显示你抢了多少， 如果没抢到就显示红包已抢完-->
			<div class="status-div" v-show="!showList">
				<div class="detail" >
					<p class="status" v-if="redBagObj.get_money">已抢到<span class="money">{{redBagObj.get_money}}元</span></p>
					<p class="status" v-else-if="!redBagObj.status">红包已抢完</p>
					<p class="open" v-else @click.stop="openRed">开</p>
				</div>
				<p class="see-detail" @click.stop="seeDetail">查看大家的手气></p>
			</div>
			<div class="borderBox datalist-div-box" v-show="showList">
				<p class="title">
					已领取{{redBagObj.get_number}}/{{redBagObj.number}}个，共{{redBagObj.totalMoney}}元
				</p>
				<div class="list-div">
					<li class="flex list" v-for="(item,i) in dataList" :key='i'>
						<div class="flex left-div">
							<div class="img-div">
								<image :src="item.userInfo.headimgurl" />
							</div>
							<div class="info-div">
								<p class="nickname">{{item.userInfo.nickname}}</p>
								<p class="time">{{item.create_time}}</p>
							</div>
						</div>
						<p class="money">{{item.money}}元</p>
					</li>
				</div>
			</div>
			 
			<i class="iconfont icon-shanchuyixuanqunchengyuanchacha" @click.stop="hide"></i>
		</div>
	</div>
</template>

<script>
import {showToast,formatTime} from '@/static/utils/index';
import {realRedbagDetail,getRealRedbag,realRedbagList} from '@/chat/js/redbag';
import {sendSocketMessage} from '@/chat/js/socket/index';
import {mapGetters,mapActions} from 'vuex';
export default {
	data(){
		return{
			id: '', //红包id
			isShow: false,  //是否显示
			redBagObj: {},
			showList: false,  //显示大家抢到的列表
			dataList: [],
		}
	},
	computed: {
		...mapGetters('outer_me', ['userInfo']),
	},
	methods: {
		/**id为红包id**/
		show(id){
			this.id = id;
			this.isShow = true;
			//发起获取红包信息
			realRedbagDetail(id)
			.then((data)=>{
				this.redBagObj = {
					nickname: data.userInfo.nickname,
					avatar: data.userInfo.headimgurl,
					status: !data.end, //是否可领取
					desc: data.desc,
					get_money: data.log?data.log.money: '',
					totalMoney: data.money,  //红包总额
					get_number: data.get_number,  //已领取的红包数
					number: data.number,  //已领取红包个数
				};
			})
			.catch();
		},
		hide(){
			this.isShow = false;
			this.redBagObj = {};
			this.showList = false;
			this.dataList = [];
		},
		//打开红包
		openRed(){
			getRealRedbag(this.id)
			.then((data)=>{
				this.redBagObj.get_number = Number(this.redBagObj.get_number)+1;
				this.redBagObj.get_money = data.money;
			})
			.catch();
		},
		//查看大家的手气
		seeDetail(){
			realRedbagList(this.id)
			.then((data)=>{
				this.showList = true;
				data.forEach((item)=>{
					item.create_time = formatTime(item.create_time);
				});
				this.dataList = data;
			})
			.catch();
		}
	}
}
</script>

<style lang="less" scoped>
.red-bag-detail-div{
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0; left: 0;
	z-index: 100;
	p.mask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	.box-div{
		position: absolute;
		width: 560upx;
		height: 848upx;
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
		background-image: url('https://qiniu.waoo.cc/burtyang/img/redBagOne.png');
		background-size: cover;
		background-position: center;
		text-align: center;
		color: #fff;
		i.iconfont{
			position: absolute;
			bottom: -80upx;
			font-size: 56upx;
			left: 50%;
			transform: translateX(-50%);
		}
		.person-info-div{
			padding-top: 236upx;
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
				border: 2px solid #fff;
			}
			p.nickname{
				font-size: 32upx;
			}
			p.desc{
				margin-top: 10upx;
				
			}
		}
		.status-div{
			margin-top: 100upx;
			p.status{
				font-size: 36upx;
				color: #fee299;
				font-weight: bold;
			}
			p.open{
				display: inline-block;
				width: 100upx;
				height: 100upx;
				line-height: 100upx;
				border: 2px solid #fee299;
				border-radius: 50%;
				font-size: 40upx;
			}
			.see-detail{
				margin-top: 100upx;
				color: #fee299;
			}
		}
	}
	/*红包详情*/
	.datalist-div-box{
		overflow: hidden;
		padding: 0 26upx;
		p.title{
			line-height: 60upx;
			text-align: left;
			font-size: 26upx;
		}
		.list-div{
			height: 350upx;
			overflow-y: auto;
			li.list{
				height: 120upx;
				border-top: 1px solid #da3a2e;
				.left-div{
					flex: 1;
					.img-div{
						image{
							width: 66upx;
							height: 66upx;
							border-radius: 50%;
							margin-right: 14upx;
						}
					}
					.info-div{
						flex: 1;
						text-align: left;
						font-size: 24upx;
					}
				}
				.money{
					color: #fef4a6;
				}
			}
		}
	}
}
</style>
