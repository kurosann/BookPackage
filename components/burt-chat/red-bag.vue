<template>
	<!--发红包-->
	<div class="borderBox red-bag-div" id="red-bag-div3123">
		<p class="mask" v-show="isShow" @click.stop="hide"></p>
		<div class="send-red-box">
			<p class="flex title">
				<span>发红包</span>
				<i class="iconfont icon-shanchuyixuanqunchengyuanchacha"  @click.stop="hide"></i>
			</p>
			<div class="borderBox form-div">
				<div class="flex borderBox item">
					<span class="txt">总金额</span>
					<input min='0.01' type="digit" v-model.trim="money" placeholder="填写金额">
					<span class='txt'>元</span>
				</div>
				<div class="flex borderBox item">
					<span class="txt">红包个数</span>
					<input min="1" type="number" v-model.trim="num" placeholder="填写数量,最多100">
					<span class='txt'>个</span>
				</div>
				<textarea class='borderBox' v-model.trim="desc" placeholder="恭喜发财,大吉大利" />
				<p class="btn" @click="pay">塞钱进钱包</p>
				<p class="tip">未领取的红包，将于24小时退还</p>
			</div>
		</div>
	</div>
</template>

<script>
import {showToast,setLocalStorage} from '../../static/utils/index';
import {sendRealRedbag} from '../../chat/js/redbag';
import {wx_pay} from '../../static/utils/weixin_handler';
import {sendSocketMessage} from '../../chat/js/socket/index';

export default{
	data(){
		return {
			isShow: false,
			money: '',  //红包金额
			num: '',  //红包个数
			desc: '',  //红包描述
		}
	},
	mounted(){
 		$('input,textarea').blur((e)=>{
 			e.stopPropagation();
 		});
	},
	methods: {
		show() {
			this.isShow = true;
			$('#red-bag-div3123').delay(200).css({'overflow': 'visible'}).animate({ height: '400px'}, 200);
			$('html,body').css({'overflow': 'hidden'});
		},
		hide() {
			this.isShow = false;
			this.money = '';
			this.num = '';
			this.desc = '';
			$('#red-bag-div3123').css({'overflow': 'hidden'}).animate({ height: '0'}, 300);
			$('html,body').css({'overflow': 'auto'});
		},
		//微信支付
		pay(){
			if(!this.money){
				showToast('请输入金额');
				return;
			};
			if(this.money<0.01 || !Number(this.money)){
				showToast('请输入正确的金额,最小金额为0.01元');
				return;
			};
			if(!this.num){
				showToast('请输入数量');
				return;
			};
			if(this.num==0 || !/^\d+$/g.test(this.num)){
				showToast('只能输入最小为1的整数');
				return;
			};
			if(this.money/this.num < 0.01){
				showToast(`当前金额最多能发${parseInt(this.money/0.01)}个红包`);
				return;
			};
			let maxRedbagNum = 100;  //限制最多发100个红包
			if(this.num > 100){
				showToast('红包个数最多100');
				return;
			};
			let sengRedbag = {
				money: this.money,
				number: this.num,
				desc: this.desc||'恭喜发财,大吉大利'
			};
			setLocalStorage('sengRedbag', sengRedbag);
			location.href = `/m/shop1/pages/order/redict_pay`;
			
			/* sendRealRedbag({
				money: this.money,
				number: this.num,
				desc: this.desc||'恭喜发财,大吉大利'
			})
			.then((res)=>{
				let obj = res;
				//调起微信支付
				wx_pay(obj)
				.then(()=>{
					//支付成功
					this.hide();
				})
				.catch(()=>{});
			})
			.catch(()=>{}); */
		}
	}
}
</script>

<style lang="less" scoped>
.red-bag-div{
	position: absolute;
	z-index: 999;
	width: 100%;
	height: 0;
	left: 0;
	bottom: 0;
	overflow: hidden;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
	p.mask {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		bottom: 0;
		left: 0;
		z-index: 21;
	}
}
.send-red-box{
	width: 100%;
	height: 400px;
	position: relative;
	z-index: 21;
	overflow-y: auto;
	background: #f5f5f5;
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	p.title{
		height: 88upx;
		border-bottom: 1px solid #eee;
		text-align: center;
		font-size: 32upx;
		color: #000;
		position: relative;
		justify-content: center;
		i{
			position: absolute;
			right: 40upx;
			font-size: 40upx;
		}
	}
	.form-div{
		padding: 0 40upx;
		div.item{
			margin-top: 22upx;
			background: #fff;
			height: 98upx;
			justify-content: space-between;
			padding: 36upx;
			border-radius: 10upx;
			input{
				color: #333;
				flex: 1;
				text-align: right;
				padding: 0 10upx;
				box-sizing: border-box;
			}
		}
		textarea{
			width: 100%;
			padding: 24upx 40upx;
			margin-top: 22upx;
			background: #fff;
			height: 150upx;
			border-radius: 10upx;
		}
		p.btn{
			margin-top: 46upx;
			width: 100%;
			line-height: 100upx;
			border-radius: 10upx;
			color: #fff;
			background: #fb6b6a;
			text-align: center;
			font-size: 32upx;
		}
		p.tip{
			font-size: 20upx;
			color: #aeaeae;
			text-align: center;
			margin-top: 36upx;
		}
	}
}
</style>
