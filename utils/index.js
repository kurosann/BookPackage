import {uploadFileUrl} from '@/config.js';

function request(url, method, data, showLoading=true){
    return new Promise((resolve, reject)=>{
		if(showLoading){
			uni.showLoading({
			    title: '加载中...'
			});
		};
		data = data||{};
		let header = {};
		if(method=='POST'){
			header = {
				"Content-Type": "application/json"
			};
		}else{
			header = {
				"Content-Type": "text/json;charset=utf-8"
			};
		}
		data.session_token = getLocalStorage('session_token');
        uni.request({
            url: url,
			header:header,
            data: data,
            method: method || 'GET',
            success: function(res) {
				if(showLoading){
					uni.hideLoading();
				};
                if(res.statusCode==200){
					if(res.data.code==201){ //登陆session过期
						uni.redirectTo({
							url: '/pages/login/index'
						});
					}else{
						resolve(res.data);
					};
                }else{
                    var title = res.errMsg;
                    showToast(title);  //提示信息
                    reject();
                } 
            }
        });
    })
};

//下载图片
export function downloadImg(img, showLoading=false){
	if(showLoading){
		uni.showLoading({
			title: '生成中...'
		});
	}
	return new Promise((resolve, reject)=>{
		uni.downloadFile({
			url: img,
			success(res) {
				if (res.statusCode === 200) {
					resolve(res.tempFilePath);
				}else{
					resolve();
				}
			},
			fail(){
				showToast('下载失败，请刷新重试');
			}
		})
	});
}

//检测html标签
export function checkHtml(str){
	var reg=/<\/?.+?\/?>/g;
	return reg.test(str);
}

//去除链接中带有的session_token参数  ：  sesstion_token=11111
export function deleteSessionTokenStr(url){
	return url.replace(/(session_token=\w+)[&]?/g,"");
}

//toast提示信息
export function showToast(title, icon='none'){
    uni.showToast({
        title: title.toString(),
        icon
    });
}

//modal
export function showModal(content){
	uni.showModal({
		content: content
	});
}

//提示功能开发中...
export function showTipPending(){
	showToast('功能开发中...');
}

export function get(url, data, showLoading=true){
    return request(url, 'GET', data, showLoading);
}

export function post(url, data, showLoading=true){
    return request(url, 'POST', data, showLoading);
}


//根据key获取storage
export function getLocalStorage(key){
    return uni.getStorageSync(key);
}

//根据key删除storage
export function removeLocalStorage(key){
    return uni.removeStorageSync(key);
}

//根据key value设置storage
export function setLocalStorage(key,value){
    uni.setStorageSync(key,value);
}

//将日期小于10的转为两位数，  9-> 09
export function numberDouble(num){
    return num<10? '0'+num: num;
}

//将时间戳转为日期时间
export function forMatDate(date,default_val=true){  //中国标准时间对象
    var year=date.getFullYear();
    var month=numberDouble(date.getMonth()+1);
    var dat=numberDouble(date.getDate());
    var hours=numberDouble(date.getHours());
    var min=numberDouble(date.getMinutes());
    var sen=numberDouble(date.getSeconds());
    if(default_val){
        date=year+'-'+month+'-'+dat+' '+hours+':'+min+':'+sen;
    }else{
        date=year+month+dat+hours+min+sen;
    }
    return date;
};



//复制数据
export function copyClipBoardData(data){
	return new Promise((resolve,reject)=>{
		//#ifndef H5
		uni.setClipboardData({
			data: data,
			success() {
				showToast('复制成功','success');
				resolve();
			},
			fail(){
				showToast('复制失败，请重试');
			}
		});
		//#endif
		//#ifdef H5
		/* let input = document.createElement('input');
		input.setAttribute('readonly', 'readonly');
		input.setAttribute('value', data);
		document.body.appendChild(input);
		input.setSelectionRange(0, 9999);
		if (document.execCommand('copy')) {
			document.execCommand('copy');
			showToast('复制成功','success');
		};
		document.body.removeChild(input); */
		var oInput = document.createElement('input');
		oInput.value = data;
		document.body.appendChild(oInput);
		oInput.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		oInput.className = 'oInput';
        oInput.style.display='none';
		showToast('复制成功','success');
		//#endif
	});
}


//上传单张图片
export function uploadFile(file,data={}){
	uni.showLoading({
		title: '上传中...'
	});
	return new Promise((resolve,reject)=>{
		uni.uploadFile({
            url: uploadFileUrl,
			filePath: file,
			name: 'file',
			formData: {
				session_token: getLocalStorage('session_token'),
				...data
			}, 
			success(res) {
				//console.log(res);
				uni.hideLoading();
				if(res.statusCode==200){
					let data = JSON.parse(res.data);
					if(data.code==200){
						resolve(data.data);
					}else{
						showToast(data.msg);
						reject();
					}
				}else{
					showToast(data.msg);
					reject();
				}
			},
			fail(err){
				console.log(err);
				showToast('上传失败');
				reject();
			}
		});
	});
};

//h5端上传视频
export function uploadVideo(file){
	uni.showLoading({
		title: '上传中...'
	});
	return new Promise((resolve,reject)=>{
		let formData = new FormData();
		formData.append('file', file);
		$.ajax({
            url: uploadFileUrl,
			type: 'post',
			data: formData,
			contentType: false,
			processData: false,
			success(res) {
				uni.hideLoading();
				res = JSON.parse(res);
				if(res.code==200){
					resolve({msg: 'ok', data: res.data});
				}else{
					resolve({msg: 'fail'});
				};
			},
			error(err){
				console.log(err);
				resolve({msg: 'fail'});
			}
		});
	});
}

//上传多张图片
export function uploadMulFiles(files){
	return new Promise((resolve,reject)=>{
		let filesLen = files.length;
		let count = 0;
		let pathsArr = [];  //返回的图品地址
		upload();
		function upload(){
			if(count < filesLen){
				uploadFile(files[count])
				.then((res)=>{
					if(res.msg=='ok'){
						pathsArr.push(res.data);
						count++;
						upload();
					}else{
						resolve({msg: 'fail'});
					}
				});
			}else{
				uni.hideLoading();
				resolve({msg: 'ok', data: pathsArr});
			}
		}
	});
}


//获取机型的状态栏和标题栏高度
export function getTitleBarHeight(){
	let result = uni.getSystemInfoSync();
	let totalTopHeight = 68;
	if(result.model.indexOf('iPhone X')!=-1){
		totalTopHeight = 88;
	}else if(result.model.indexOf('iPhone')!=-1){
		totalTopHeight = 64;
	};
	let titleBarHeight = totalTopHeight - result.statusBarHeight;
	return {
		totalTopHeight,   //总高度
		titleBarHeight,   //标题栏高度
		statusBarHeight: result.statusBarHeight,  //状态栏高度
		isIpx: result.model.indexOf('iPhone X')!=-1          //是否是iphoneX
	}
};


//获取机型判断是ios还是android
export function getSystemIsIOS(){
	let result = uni.getSystemInfoSync();
	return result.system.toLowerCase().indexOf('ios')!=-1;
};


//h5端判断是否是iphoneX的机型
export function isIPhoneX() {
	var u = navigator.userAgent;
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isIOS) {
		alert(screen.height);
		alert(screen.width);
		if (screen.height == 812 && screen.width == 375) {
			return true;
		}else {
			return false;
		}
	}else{
		return false;
	}
};


//支微信付函数
export function wx_pay(data){
	return new Promise((resolve,reject)=>{
		//微信小程序支付
		//#ifdef MP-WEIXIN
		uni.requestPayment({
			provider: 'wxpay',
		    timeStamp: data.timeStamp,
		    nonceStr: data.nonceStr,
		    package: data.package,
		    signType: data.signType,
		    paySign: data.paySign,
		    success (res) { 
				showToast('支付成功','success');
				resolve();
		    },
		    fail (res) {
		        showToast('支付失败,请重试');
				reject();
		    }
		});
		//#endif
		//H5+app
		//#ifdef APP-PLUS
		uni.requestPayment({
			provider: 'wxpay',
		    orderInfo: JSON.stringify(data),
		    success (res) { 
				showToast('支付成功','success');
				resolve();
		    },
		    fail (res) {
		        showToast('支付失败,请重试');
				reject();
		    }
		});
		//#endif
	});
}

//随机颜色
export function getRandomColor() {
	const rgb = []
	for (let i = 0; i < 3; ++i) {
		let color = Math.floor(Math.random() * 256).toString(16)
		color = color.length == 1 ? '0' + color : color
		rgb.push(color)
	}
	return '#' + rgb.join('')
};

//检查手机号
export function checkPhone(phone){
	if(!phone){
		return false;
	};
	if(!/^1\d{10}$/g.test(phone)){
		return false;
	};
	return true;
};



//设置底部导航栏购物车里的商品个数
export function setCartNum(num){
	num = num>1000? '999+': (num||0);
	if(num>0){
		uni.setTabBarBadge({
			index: 1,  //购物车
			text: num.toString()
		});
	}else{
		uni.removeTabBarBadge({
			index:1
		});
	}
};

//数字千位符格式化
export function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};



//格式化时间函数
//time string
export function formatTime(time){
	let _time = new Date(time);
	let day = _time.getDate();
	let now_day = new Date().getDate();
	if(day!=now_day){
		return time;
	}else{  //是今天的消息
		let hours = _time.getHours();
		hours = hours<10? '0'+hours: hours;
		let mintes = _time.getMinutes();
		mintes = mintes<10? '0'+mintes: mintes;
		return hours+':'+mintes;
	};
};


//格式化时间函数
//time string
export function formatTime2(time){
	let _time = new Date(time.replace(/-/g, '/'));
	let day = _time.getDate();
	let now_day = new Date().getDate();
	if(day==now_day){  //是今天的消息，只显示时分
		let hours = _time.getHours();
		hours = hours<10? '0'+hours: hours;
		let mintes = _time.getMinutes();
		mintes = mintes<10? '0'+mintes: mintes;
		return hours+':'+mintes;
	}else if(now_day-day ==1){  //是昨天的消息
		return '昨天';
	}else if(now_day-day ==2){  //是前天的消息
		return '前天';
	}else if(now_day-day>2 && now_day-day<7){  //是前天的消息
		let d = _time.getDay();
		let txt;
		switch(d){
			case 1: txt='星期一'; break;
			case 2: txt='星期二'; break;
			case 3: txt='星期三'; break;
			case 4: txt='星期四'; break;
			case 5: txt='星期五'; break;
			case 6: txt='星期六'; break;
			case 0: txt='星期日'; break;
		}
		return txt;
	}else{  //返回日期
		let year = _time.getFullYear();
		let month = _time.getMonth()+1;
		month = month<10? '0'+month: month;
		let date = _time.getDate();
		date = date<10? '0'+date: date;
		return year+ '-'+ month+ '-' + date;
	};
};



//发送手机验证码
export function sendCode(mobile){
	return new Promise((resolve, reject)=>{
		post(sendCodeUrl, {
			mobile: mobile
		})
		.then((res)=>{
			if(res.code==200){
				showToast('发送成功');;
				resolve();
			}else{
				showToast(res.msg);
				reject();
			}
		});
	});
};



//url转json
export function parseQueryString(url){
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {};
    if(arr_url && arr_url[1]) {
        var str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2];
        }
    }
    return ret;
}



//生成二维码
export function createQrcode(url){
	url = url.replace(/&/g,'%26');
	return createQrcodeUrl + '?text='+url;
};




//将时间S转为 1'20"形式
export function fomartTimeToSecondString(time){
	time = Number(time);
	if(time<60){
		return time + '"';
	}else{
		let min = parseInt(time/60);
		let sec = time%60;
		if(sec==0){
			return min +"'";
		}else{
			return min +"'" + sec + '"';
		};
	};
}