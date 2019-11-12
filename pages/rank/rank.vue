<template>
    <view class="page" :style="'padding-top: ' +(statusHeight+50)+'px'">
        <view class="fixed bg-white">
            <view class="cu-custom" :style="'height: '+statusHeight+'px;'">
            </view>

            <view class="cu-bar" style="height: 45px; padding-right: 0upx;">
                <view class="action" @tap="BackPage">
                    <text class="cuIcon-back"></text>
                    <slot name="backText"></slot>
                </view>
                <view class="content" style="top: 5upx">
                    <slot name="content">{{title}}</slot>
                </view>
            </view>
        </view>

        <view class="cu-card article" v-for="(item,i) in list" :key="i">
            <view class="cu-item shadow">
                <view class="title" style="display: flex; flex-direction: row">
                    {{item.bookName}}
                    <view style="position:absolute;right: 60upx;width: 80%;text-align: right;" :class="i===0?'text-red':(i===1?'text-orange':(i===2?'text-yellow':''))">
                        {{i+1}}
                    </view>
                </view>
                <view class="content">
                    <image :src="item.bookPic"
                           mode="aspectFill"></image>
                    <view class="desc">
                        <view class="text-content">
                            <view>{{item.bookReading}}</view>
                            <view>发行时间:<br/>{{item.bookBytime}}</view>
                        </view>
                        <view>
                            <view class="cu-tag bg-red light sm round" v-if="item.top">置顶</view>
                            <view class="cu-tag bg-blue light sm round">在馆中</view>
                        </view>
                    </view>

                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "rank",

        data(){
            return {
                statusHeight:0,
                title:"",
                list:[
                    {bookPic:"",bookName:"",bookReading:"",bookBytime:""},
                    {bookPic:"",bookName:"",bookReading:"",bookBytime:""},
                    {bookPic:"",bookName:"",bookReading:"",bookBytime:""},
                    {bookPic:"",bookName:"",bookReading:"",bookBytime:""},
                    {bookPic:"",bookName:"",bookReading:"",bookBytime:""},
                    {bookPic:"",bookName:"",bookReading:"",bookBytime:""},
                    {bookPic:"",bookName:"",bookReading:"",bookBytime:""},
                ],
            }
        },
        props: {
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
            refresh() {
                var rank = this;
                uni.showLoading({
                    mask: true
                });
                uni.showNavigationBarLoading();
                uni.request({
                    url: this.serverUrl + "/book/getRandomBook?limit=10",
                    method: 'GET',
                    success: (res) => {
                        rank.list = res.data.data;
                        console.log(rank.list);
                    },
                    complete(res) {
                        uni.stopPullDownRefresh();
                        uni.hideLoading();
                        uni.hideNavigationBarLoading();
                    }
                })
            },
        },
        onLoad(options) {
            this.title = options.title;
            this.refresh();
            this.statusHeight = uni.getSystemInfoSync().statusBarHeight;
            console.log(this.statusHeight)
        },
        // 下拉刷新响应
        onPullDownRefresh() {
            this.refresh();
        }

    }
</script>

<style scoped>

</style>