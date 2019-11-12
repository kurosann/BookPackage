//
import {get,post,showToast,getLocalStorage,setLocalStorage} from '@/utils/index';
import {getAllSortUrl,getBookChaptersUrl,getChapterContentUrl} from '../../config';

const state = {
	navArr: [],  //导航
	/**书架
	* {
		id: '小说id',
		ind: '该小说看到了第几章',
		img: '小说封面',
		title: '小说名'
	  }
	**/
	bookStore:  getLocalStorage('bookStore')||[],
	bookIndex: 0, //小说看的章的序列号
};

const getters = {
	navArr(state){
		return state.navArr;
	},
	bookStore(state){
		return state.bookStore;
	},
	bookIndex(state){
		return state.bookIndex;
	}
};


const mutations = {
	SET_AVARR(state, list=[]){
		state.navArr = list;
	},
	SET_BOOKSTORE(state, list=[]){
		state.bookStore = list;
		setLocalStorage('bookStore', list);
	},
	/**获取该小说看到了第几章
	* 根据小说的id，
	* 如果没有该小说就为1， 反之就去storage中取
	 * **/
	GET_BOOKINDEX(state, id){
		let books = state.bookStore;
		let index = 0;
		for(let i=0,len=books.length; i<len; i++){
			if(books[i].id == id){
				index = books[i].ind;
				break;
			}
		};
		state.bookIndex = index;
	},
	/**设置该小说看到了第几章
	* 根据小说的id，
	* 如果没有该小说就为1， 反之就去storage中取
	 * **/
	SET_BOOKINDEX(state, obj={}){
		let books = state.bookStore;
		for(let i=0,len=books.length; i<len; i++){
			if(books[i].id == obj.id){
				books[i].ind = obj.index;
				break;
			}
		};
		setLocalStorage('bookStore', books);
		state.bookIndex = obj.index;
	},
	//添加小说
	ADD_BOOK(state, obj={}){
		let id = obj.id;
		let bookStore = state.bookStore;
		let hasOne = false;
		for(let i=0,len=bookStore.length; i<len; i++){
			if(bookStore[i].id == id){
				hasOne = true;
				break;
			}
		};
		if(hasOne){
			showToast('该书已在书架中');
			return;
		};
		let tmp = {
			id: id,
			ind: 0,
			img: obj.cover,
			title: obj.title,
		};
		bookStore.push(tmp);
		state.bookStore = bookStore;
		setLocalStorage('bookStore', bookStore);
		showToast('添加成功');
	}
};


const actions = {
	//获取所有分类
	getAllSortList({state, commit, dispatch}){
		return new Promise((resolve,reject)=>{
			get(getAllSortUrl, {})
			.then((data)=>{
				if(data['ok']){
					let list = [];
					for(let key in data){
						if(key!='ok'){
							data[key].forEach((item)=>{
								item.coverImg = decodeURIComponent(item.bookCover[0]).replace('/agent/', '');
							});
							let tmpObj = {
								key: key,
								data: data[key]
							};
							let name;
							switch(key){
								case 'male':
									name = '男生';  break;
								case 'female':
									name = '女生';  break;
								case 'picture':
									name = '漫画';  break;
								case 'press':
									name = '出版';  break;
								default: 
									name = '其它';  break;
							}
							tmpObj.name = name;
							list.push(tmpObj);
						}
					}
					//console.log(list);
					commit('SET_AVARR', list);
					resolve();
				}else{
					showToast('请求出错');
					reject();
				}
			});
		});
	},
	//获取小说章节信息
	getNovelChapters({state, commit, dispatch}, id){
		return new Promise((resolve, reject)=>{
			let url = `${getBookChaptersUrl}${id}?view=chapters`;
			get(url, {})
			.then((res)=>{
				if(res.ok){
					resolve(res.mixToc.chapters);
				}else{
					showToast('网络出错');
					reject();
				}
			});
		})
	},
	//获取章节详情内容
	getChaptersContent({state, commit, dispatch}, link){
		return new Promise((resolve, reject)=>{
			let url = `${getChapterContentUrl}${link}`;
			get(url, {})
			.then((res)=>{
				if(res.ok){
					resolve(res.chapter.body);
				}else{
					showToast('网络错误');
					reject();
				}
			});
		});
	},
};


module.exports = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}