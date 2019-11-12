//接口地址
var debug = false;


if(debug){
	var host = "http://fromwhere.cn/"; //本地接口
}else{
	var host = "http://www.burtyang.top:8085/"; //线上接口
}

//发送短信验证码
const sendSmsUrl = `${host}api/v1/xxx`;
//注册
const registerUrl = `${host}api/v1/register`;
//登陆
const loginUrl = `${host}api/v1/login`;

//获取用户信息
const getUserInfoUrl = `${host}api/v1/getUserInfo`;
//修改个人资料
const modifyUserInfoUrl = `${host}api/v1/modifyUserInfo`;


//上传接口
const uploadFileUrl = `${host}api/v1/upload`;


//获取省市区数据接口
const getAreaUrl = `${host}api/v1/area`;



//搜索接口
const songsearchUrl = `${host}api/v1/songsearch`;
//获取歌曲源数据接口，，经常犯毛病
const playUrl = `${host}api/v1/play`;
//该接口获取有问题了
//const playUrl = "https://v1.itooi.cn/kugou/song";
//搜索框关键词提示接口
const searchTipUrl = `${host}api/v1/searchtip`;


//获取视频分类,视频接口不开放
const getVideoSortUrl = `${host}xxxxx`;
//获取视频列表
const getVideoListUrl = `${host}xxxxx`;




/**小说接口 start**/
const host1 = 'http://api.zhuishushenqi.com/';
//获取所有分类
const getAllSortUrl = `${host1}cats/lv2/statistics`;
//模糊搜索，根据关键词搜索
const getBookByWordUrl = `${host1}book/fuzzy-search`;
//获取分类详情
const getSortDetailUrl = `${host1}book/by-categories`;
//获取小说简介信息
const getBookDescUrl = `${host1}book`;
//获取小说章节列表
const getBookChaptersUrl = `${host1}mix-atoc/`;
//获取章节内容详情
const getChapterContentUrl = 'http://chapter2.zhuishushenqi.com/chapter/';


/**小说接口  end**/


module.exports = {
	sendSmsUrl,
	registerUrl,
	loginUrl,
	getUserInfoUrl,
	modifyUserInfoUrl,
	getAreaUrl,
	uploadFileUrl,
	
	songsearchUrl,
	playUrl,
	searchTipUrl,
	getVideoSortUrl,
	getVideoListUrl,
	
	
	/**小说 start**/
	getAllSortUrl,
	getBookByWordUrl,
	getSortDetailUrl,
	getBookDescUrl,
	getBookChaptersUrl,
	getChapterContentUrl,
	/**小说 end**/
};