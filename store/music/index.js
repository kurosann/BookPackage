//个人中心
import {get,post,showToast,getLocalStorage} from '@/utils/index';
import {songsearchUrl,playUrl,searchTipUrl} from '../../config';

const state = {
	searchTipList: [],  //搜索歌曲的提示列表
	currentPage: 1,
	nomore: false,
	songList: [], //歌曲列表
	songDetail: {},  //歌曲详情
	bgAudioMannager:  uni.getBackgroundAudioManager(),  //背景音乐管理器
	isPlaying: false,  //是否在播放
	playBoxShow: false, //播放的旋转的盒子显示
};

const getters = {
	//歌曲的提示列表
	searchTipList(state){
		return state.searchTipList;
	},
	songList(state){
		return state.songList;
	},
	songDetail(state){
		return state.songDetail;
	},
	bgAudioMannager(state){
		return state.bgAudioMannager;
	},
	isPlaying(state){
		return state.isPlaying;
	},
	playBoxShow(state){
		return state.playBoxShow;
	}
};


const mutations = {
	INITDATA(state){
		state.nomore = false;
		state.currentPage = 1;
		state.songList = [];
	},
	//设置提示列表
	SET_SEARCHLIST(state, arr=[]){
		state.searchTipList = arr;
	},
	//设置歌曲列表
	SET_SONGLIST(state, arr=[]){
		state.songList = arr;
	},
	SET_NOMORE(state, status=true){
		state.nomore = status;
	},
	SET_PAGE(state, page=1){
		state.currentPage = page;
	},
	//设置歌曲详情
	SET_SONGDETAIL(state, obj={}){
		state.songDetail = obj;
	},
	//设置播放状态
	SET_PLAYSTATUS(state, status=true){
		state.isPlaying = status;
	},
	SET_PLAYBOXSHOW(state, status=true){
		state.playBoxShow = status;
	},
	
	//播放音乐
	play_music(state){
		state.playBoxShow = true;
		state.isPlaying = true;
		
		var songDetail = state.songDetail;
		state.bgAudioMannager.stop();
		/* state.bgAudioMannager.title = songDetail.singerName;
		state.bgAudioMannager.singer = songDetail.songName;
		state.bgAudioMannager.coverImgUrl = songDetail.imgUrl;
		state.bgAudioMannager.src = songDetail.url; */
		state.bgAudioMannager.title = songDetail.author_name;
		state.bgAudioMannager.singer = songDetail.song_name;
		state.bgAudioMannager.coverImgUrl = songDetail.authors.avatar;
		state.bgAudioMannager.src = songDetail.play_url;
		state.bgAudioMannager.play();
	}
};


const actions = {
	//获取提示列表
	getSearchList({state, commit, dispatch}, keyword){
		return new Promise((resolve,reject)=>{
			get(searchTipUrl, {
				keyword
			})
			.then((res)=>{
				if(res.code==200){
					commit('SET_SEARCHLIST', res.data[0].RecordDatas);
					resolve();
				}else{
					showToast(res.msg);
					reject();
				};
			})
		});
	},
	//获取歌曲列表
	getSongList({state, commit, dispatch}, obj={}){
		if(state.nomore){
			showToast('没有更多');
			return;
		};
		return new Promise((resolve,reject)=>{
			get(songsearchUrl, {
				...obj,
				page: state.currentPage,
				pagesize: 20,
				platform: "WebFilter",
				userid: -1,
				iscorrection: 1,
				privilege_filter: 0,
				filter: 2
			})
			.then((res)=>{
				if(res.code==200){
					let data = res.data;
					var pages = Math.ceil(data.total/20);
					var listData = data.lists;
					if(listData && listData.length>0){
						var songList = [...state.songList, ...listData];
						commit('SET_SONGLIST', songList);
					};
					let currentPage = state.currentPage;
					currentPage++;
					commit('SET_PAGE', currentPage);
					if(currentPage > pages){
						commit('SET_NOMORE', true);
					};
					resolve();
				}else{
					showToast(res.msg);
				}
			})
		})
	},
	//获取歌曲真实地址，
	getSongDetail({state, commit, dispatch}, hash){
		return new Promise((resolve, reject)=>{
			get(playUrl, {
				r: "play/getdata",
				hash
			})
			.then((res)=>{
				if(res.code==200){
					commit('SET_SONGDETAIL', res.data);
					resolve();
				}else{
					showToast(res.msg);
					reject();
				}
			});
			/* get(playUrl, {
				id: hash
			})
			.then((res)=>{
				if(res.code==200){
					let data = res.data;
					data.imgUrl = data.imgUrl.replace('{size}', 100);
					commit('SET_SONGDETAIL', data);
					resolve();
				}else{
					showToast(res.msg);
					reject();
				}
			}); */
		});
	}
};


module.exports = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}