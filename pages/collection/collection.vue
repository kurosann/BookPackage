<template>
    <view class="page" :style="'margin-top: ' +(statusHeight+50)+'px'">

        <view class="fixed bg-white">
            <view class="cu-custom" :style="'height: '+statusHeight+'px;'">
            </view>

            <view class="cu-bar" style="height: 45px; padding-right: 0upx;">
                <navigator class="action" url="../search/search" navigateTo>
                    <text class="cuIcon-search"></text>
                    <slot name="backText"></slot>
                </navigator>
                <view class="content" style="top: 5upx">
                    <slot name="content">收藏</slot>
                </view>
                <view style="margin-right: 200upx" @click="CheckBoxIsShow">编辑</view>
            </view>
        </view>
        <view>
            <checkbox-group class="block" @change="CheckboxChange" style="margin-bottom: 200upx">
                <view class="cu-card article" v-for="(item,i) in list" :key="i">
                    <view class="cu-item shadow">
                        <view class="title" @click="showBottomModal(i)">
                            <view class="text-cut">{{item.book.bookName}}</view>
                        </view>
                        <view class="content">
                            <image :src="item.book.bookPic" @click="showBottomModal(i)"
                                   mode="aspectFill"></image>
                            <view class="desc">
                                <view class="text-content" @click="showBottomModal(i)">
                                    <view>{{item.book.bookReading}}</view>
                                    <view>发行时间:<br/>{{item.book.bookBytime}}</view>
                                </view>
                                <view>
                                    <view class="cu-tag bg-red light sm round" v-if="item.top">置顶</view>
                                    <view class="cu-tag bg-blue light sm round">在馆中</view>
                                </view>
                            </view>
                            <view style="height: 100%" v-show="isShow">
                                <!-- #ifdef MP-ALIPAY -->
                                <view class="cu-form-group margin-top">
                                    <checkbox :class="item.check?'checked':''" :checked="item.check" :data-index="i"
                                              @click="Check" value="A"></checkbox>
                                </view>
                                <!-- #endif -->
                                <!-- #ifndef MP-ALIPAY -->
                                <view class="cu-form-group">
                                    <checkbox :checked="item.check" :class="item.check?'checked':''" :data-index="i"
                                              @click="Check"
                                              class='round' value="B"></checkbox>
                                </view>
                                <!-- #endif -->
                                <!--                            <view class="cu-tag bg-green light sm round" style="display: flex;justify-content: center; align-content: center">在馆中</view>-->
                            </view>

                        </view>
                    </view>
                </view>
            </checkbox-group>

            <view class="cu-bar bg-white tabbar border shop" style="position: fixed; width: 100%;z-index:9 " :style="'bottom:'+navigationHeight+'px'" v-if="isShow">
                <form>
                    <view class="action" open-type="contact" style="width: 200upx; display: flex; justify-content: center;">
                        <switch @click="SwitchA" :class="switchA?'checked':''" :checked="switchA" style="margin-right: 10upx"></switch>
                        <view style="max-font-size: 2">{{switchA?"反选":"全选"}}</view>
                    </view>
                </form>
                <view class="bg-orange submit" @click="Top">置顶</view>
                <view class="bg-red submit" @click="showModal">删除</view>
            </view>
            <view class="cu-modal" style="z-index:10000" :class="modalName?'show':''" @click="hideModal">
                <view class="cu-dialog">
                    <view class="cu-bar bg-white justify-end">
                        <view class="content">警告</view>
                        <view class="action" @tap="hideModal">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding-xl">
                        {{dialog}}
                    </view>
                    <view class="cu-bar bg-white justify-end">
                        <view class="action">
                            <button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
                            <button class="cu-btn bg-green margin-left" @tap="hideModal" @click="Delete">确定</button>

                        </view>
                    </view>
                </view>
            </view>
            <view class="cu-modal bottom-modal" style="z-index: 10999" @click="hideBottomModal" :class="bottomName?'show':''">
            <view class="cu-dialog">
                <view>
                    <view class="cu-list menu">
                        <view class="cu-item">
                            <button class="cu-btn content" open-type="contact" @click="BottomTop">
                                <text class="cuIcon-top text-pink"></text>
                                <text class="text-grey">置顶</text>
                            </button>
                        </view>
                        <view class="cu-item">
                            <button class="cu-btn content" open-type="contact" @click="BottomDelete">
                                <text class="cuIcon-delete text-pink"></text>
                                <text class="text-grey">删除</text>
                            </button>
                        </view>
                        <view class="cu-item">
                            <button class="cu-btn content" open-type="contact" @click="Share">
                                <text class="cuIcon-share text-pink"></text>
                                <text class="text-grey">分享</text>
                            </button>
                        </view>
                        <view class="cu-item">
                            <button class="cu-btn content" open-type="contact" @click="turnDetail">
                                <text class="cuIcon-edit text-pink"></text>
                                <text class="text-grey">书籍详情</text>
                            </button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        </view>

        <view v-if="list.length === 0" style="text-align: center;display: flex;justify-content: center;align-content: center;flex-direction: column">
            <text class="cuIcon-question text-pink" style="width: 100%;font-size:100upx"></text><br/>暂未收藏任何书籍，赶紧收藏几本书吧～
        </view>
    </view>
</template>

<script>
    export default {
        name: "collection",
        data() {
            return {
                statusHeight:0,
                checkCount:0,
                navigationHeight:0,
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
                dialog: "",
                switchA: false,
                isWeixin: false,
                topCount:0,
                modalName: false,
                bottomName: false,
                choose: 0,
                updateCollectionDataUrl:"",
                list:[
                    {book:{bookPic:"",bookName:"",bookReading:"",bookBytime:""}, id:"",top:false,check: false},
                    {book:{bookPic:"",bookName:"",bookReading:"",bookBytime:""}, id:"",top:false,check: false},
                    {book:{bookPic:"",bookName:"",bookReading:"",bookBytime:""}, id:"",top:false,check: false},
                    {book:{bookPic:"",bookName:"",bookReading:"",bookBytime:""}, id:"",top:false,check: false},
                    {book:{bookPic:"",bookName:"",bookReading:"",bookBytime:""}, id:"",top:false,check: false},
                    {book:{bookPic:"",bookName:"",bookReading:"",bookBytime:""}, id:"",top:false,check: false},
                    {book:{bookPic:"",bookName:"",bookReading:"",bookBytime:""}, id:"",top:false,check: false},
                ],
                checkbox: [{
                    value: 'A',
                    checked: true
                }, {
                    value: 'B',
                    checked: true
                }, {
                    value: 'C',
                    checked: false
                }],
                isShow: false
            };
        },
        computed: {
            style() {
                var StatusBar = this.StatusBar;
                var CustomBar = this.CustomBar;
                var bgImage = this.bgImage;
                var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
                if (this.bgImage) {
                    style = `${style}background-image:url(${bgImage});`;
                }
                return style
            }
        },
		onLoad() {
            this.statusHeight = uni.getSystemInfoSync().statusBarHeight;
            this.navigationHeight = uni.getSystemInfoSync().navigationBarHeight;
            // #ifdef H5
            this.navigationHeight= 50;
            // #endif
            uni.showLoading({
                title: '加载中'
            });
            this.refresh();
		},
        // 下拉刷新响应
        onPullDownRefresh() {
            this.refresh();
        },
        methods: {
            BackPage() {
                if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
                    let url = '/' + __wxConfig.pages[0];
                    return uni.redirectTo({url})
                }
                uni.navigateBack({
                    delta: 1
                });
            },
            CheckboxChange(e) {
                var items = this.checkbox,
                    values = e.detail.value;
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    items[i].checked = false;
                    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                        if (items[i].value === values[j]) {
                            items[i].checked = true;
                            break
                        }
                    }
                }
            },
            refresh() {
                var collection = this;
                uni.showLoading({
                    mask: true
                });
                uni.request({
                    url:this.serverUrl+"/book/getSave?userId=" + this.userId,
                    method:"GET",
                    success(res) {
                        collection.list = res.data.data;
                        for (let i = 0; i < collection.list.length; i++) {
                            collection.list[i].check = false;
                            collection.list[i].top = collection.list[i].top === 1
                        }
						collection.topCount = 0;
						collection.switchA = false;
                        collection.sortByTop();
                    },
                    fail() {

                    },
                    complete() {
                        uni.stopPullDownRefresh();
                        uni.hideLoading();
                    }
                })
            },
            CheckBoxIsShow(e) {
                this.isShow = !this.isShow;
            },
            SwitchA(e) {
                this.switchA = !this.switchA;
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].check = this.switchA;
                }
            },
            Delete() {
                let data = [];
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].check) {
                        data.push({"id":this.list[i].id});
                        this.list.splice(i,1)
                    }
                }
                uni.request({
                	url: this.serverUrl + "/book/deleteSaves",
					method:"POST",
					data:data,
					success() {

					},
					fail() {

					},
					complete() {

					}
                })
            },
            sortByTop() {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].top) {
                        let temp = this.list[i];
                        this.list.splice(i,1);
                        this.list.splice(0, 0, temp)
                    }
                }
            },
            Top() {
                let data = [];
                var check = 0;
                var tmp = true;
                this.topCount = 0;
                for (let i = 0; i <this.list.length; i++) {
                    if (this.list[i].check) {
                        data.push({"id":this.list[i].id});
                        check = check+1;
                        if (this.list[i].top) {
                            this.topCount = this.topCount + 1;
                        }
                    }
                }
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].check) {
                        if (check>1) {
                            if (this.topCount === check) {
                                tmp = false;
                            }
                            this.list[i].top = tmp;
                        } else {
                            this.list[i].top = !this.list[i].top;
                        }
                    }
                }
                this.sortByTop();
                uni.request({
                	url:this.serverUrl + "/book/changeSaveTops",
					method:"POST",
					data:data,
					success() {

					},
					fail() {

					},
					complete() {

					}
                })
            },
            Check(e) {
                var index = e.target.dataset.index;
                this.list[index].check = !this.list[index].check;
				if (this.list[index].check) {
					this.checkCount++;
				} else {
					this.checkCount--;
				}
                this.switchA = (this.checkCount === this.list.length);
            },
            c() {
                let data = [];
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].check) {
                        data.push(this.list[i])
                    }
                }
                return data;
            },
            showModal(e) {
                let data = this.c();
                this.dialog = (data.length === 0 ? "未选择图书" : "是否删除选中图书?");
                this.modalName = true;
            },
            hideModal(e) {
                this.modalName = false;
            },
            showBottomModal(i) {
                this.choose = i;
                console.log(this.choose);
                this.bottomName = true;
            },
            hideBottomModal(e) {
                this.bottomName = false;
            },
            turnDetail() {
                uni.navigateTo({
                    url:'?bookId=' + this.choose.bookId
                })
            },
            BottomTop() {
                this.list[this.choose].check = !this.list[this.choose].check;
                this.Top()
            },
            BottomDelete() {
                this.list[this.choose].check = !this.list[this.choose].check;
                this.Delete()
            },
            Share() {
                uni.showShareMenu()
            },

        }
    }
</script>

<style scoped>
    .weixin{
        bottom: 0;
    }
    .nweixin{
        bottom: 100upx;
    }


</style>