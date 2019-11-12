<template>
	<!--关注公众号-->
	<div class="subscribe-div" :style="{display: isShow? 'block': 'none'}">
		<p class="mask" @click.stop="hide"></p>
		<div class="info-div">
			<image :src="shop_qrcode"></image>
			<p class="tip">请长按图片关注公众号</p>
			<i class="iconfont icon-shanchuyixuanqunchengyuanchacha" @click.stop="hide"></i>
		</div>
	</div>
</template>

<script>
import {getLocalStorage} from '@/static/utils/index';
import {mapGetters,mapActions} from 'vuex';
export default{
	data(){
		return{
			
		}
	},
	computed: {
		...mapGetters('outer_me', ['userInfo']),
		isShow(){
			if(!this.userInfo.id){  //数据个人信息还没有加载
				return false;
			};
			if(!!this.userInfo.subscribe){  //关注过了
				return false;
			}else{
				return true;
			};
		},
		shop_qrcode(){  //二维码
			let config = getLocalStorage('config');
			return config.shop_qrcode ||'';
		}
	},
	methods: {
		hide(){
			let obj = this.userInfo;
			obj.subscribe = 1;
			this.$store.commit('outer_me/SET_USERINFO', obj);
		},
	}
}
</script>

<style lang="less" scoped>
.subscribe-div{
	position: fixed;
	z-index: 9999;
	width: 100vw;
	height: 100vh;
	top: 0;  left: 0;
	display: none;
	p.mask{
		width: 100%;
		height: 100%;
		position: absolute;
		top:0; left: 0;
		z-index: 1;
		background: rgba(0,0,0,0.5);
	}
	.info-div{
		text-align: center;
		position: relative;
		top: 50%;
		z-index: 2;
		transform: translateY(-50%);
		image{
			width: 560upx;
			height: 560upx;
		}
		p.tip{
			line-height: 60upx;
			color: #fff;
		}
		i.iconfont{
			margin-top: 30upx;
			display: inline-block;
			font-size: 60upx;
			color: #fff;
		}
	}
}
</style>
