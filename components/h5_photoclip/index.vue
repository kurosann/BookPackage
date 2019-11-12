<template>
	<div class="outer-div">
		<input id='file' type="file" accept='image/*' />
		 <img id='view' class='avatar' src="" alt="">
		<!--裁剪区域-->
		<div class='clipArea-div'>
		    <div id='clipArea'></div>
		    <button id='clipBtn'>裁剪</button>
		</div>
	</div>
</template>

<script>
require('../../static/utils/h5_photoclip/jquery-2.1.3.min.js');
require('../../static/utils/h5_photoclip/iscroll-zoom.js');
require('../../static/utils/h5_photoclip/hammer.js');
require('../../static/utils/h5_photoclip/lrz.all.bundle.js');
require('../../static/utils/h5_photoclip/jquery.photoClip.js');
require('../../static/utils/h5_photoclip/mobiscroll.custom-3.0.0-beta6.min.js');

//裁剪事件
var myFile;  //裁剪后的文件
var clipArea = new bjj.PhotoClip("#clipArea", {
	size: [260, 260],
	outputSize: [330, 330],  //输出图像长款比例
	//outputType: "png", // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
	file: "#file",
	//view: "#view",
	ok: "#clipBtn",
	loadStart: function(e) {
		//console.log(e)
		$('#loading').fadeIn(1);
	},
	loadComplete: function() {
		//console.log("照片读取完成");
		$('#loading').fadeOut(1);
	},
	clipFinish: function(dataURL) {
		//console.log(dataURL);
		$('#view').attr('src',dataURL);
		$('.clipArea-div').fadeOut();
		var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		myFile = new File([u8arr], 'newfile', {type:mime});
	}
});

export default{
	data(){
		return{
			
		}
	}
}
</script>

<style lang="less" scoped>
/**裁剪**/
.clipArea-div{
	position: fixed;
	background: rgba(0,0,0,0.7);
	width: 100vw;
	height: 100vh;
	top:50px;left:0;
	display: none;
}
#clipArea {
	margin: 20px;
	height: 300px;
}
/* #file{
	opacity: 0;
	width:0; height:0;
} */
#clipBtn {
	display: block;
	border: none;
	background: #337ab7;
	color: #fff;
	line-height: 40px;
	width: 80%;
	border-radius: 8px;
	margin: 0 auto;
}
</style>
