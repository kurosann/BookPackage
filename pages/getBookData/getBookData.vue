<template>
    <view>

        <uni-collapse @change="clickColumn">
            <uni-collapse-item name="c" title="借阅数量-近7日" show-animation>
                <view class="qiun-charts" >
                    <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
                </view>
            </uni-collapse-item>
            <uni-collapse-item name="l" title="借阅数量趋势-近7日" show-animation>
                <view class="qiun-charts" >
                    <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
                </view>
            </uni-collapse-item>
            <uni-collapse-item name="p" title="借阅类型-近7日" show-animation>
                <view class="qiun-charts" >
                    <canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
                </view>
            </uni-collapse-item>
            <uni-collapse-item name="a" title="借阅数量平均-区域统计" show-animation>
                <view class="qiun-charts" >
                    <canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea"></canvas>
                </view>
            </uni-collapse-item>
        </uni-collapse>
    </view>
</template>

<script>
    import uniCollapse from "../../components/uni-collapse/uni-collapse.vue"
    import uniCollapseItem from "../../components/uni-collapse-item/uni-collapse-item.vue"
    import UniList from "../../components/uni-list/uni-list";
    import UniListItem from "../../components/uni-list-item/uni-list-item";
    import uCharts from '../../js_sdk/u-charts/u-charts/u-charts';

    let _self;
    let list = [
        {
            chart: null,
            name: 'c',
        },
        {
            chart: null,
            name: 'p',
        },
        {
            chart: null,
            name: 'a',
        },
        {
            chart: null,
            name: 'l',
        }
    ];
    export default {
        data() {
            return {
                cWidth: '',
                cHeight: '',
                pixelRatio: 1,
                serverData: '',

                chartColumnData: {
                    categories: ["", "", "", "", "", "昨天", "今天"],
                    series: [{
                        name: "您",
                        data: [15, 45, 37, 43, 34, 34, {"value": 20, "color": "#f04864"}]
                    }, {
                        name: "平均",
                        data: [30, 25, 14, 34, 18, 18, {"value": 40, "color": "#facc14"}]
                    }]
                },
                chartPieData: {
                    series: [{
                        name: "小说",
                        data: 50
                    }, {
                        name: "现代文学",
                        data: 30
                    }, {
                        name: "中国文学",
                        data: 20
                    }, {
                        name: "经典名著",
                        data: 18
                    }, {
                        name: "心理学",
                        data: 8
                    }]
                },
                chartAreaData: {
                    categories: ['2012', '2013', '2014', '2015', '2016', '昨天', '今天'],
                    series: [{
                        name: '全国',
                        data: [100, 80, 95, 150, 112, 132, 132],
                        color: '#facc14'
                    }, {
                        name: '全区',
                        data: [70, 40, 65, 100, 44, 68, 68],
                        color: '#2fc25b'
                    }, {
                        name: '个人',
                        data: [35, 20, 25, 37, 4, 20, 20],
                        color: '#1890ff'
                    }]
                }
            }
        },
        components: {UniListItem, UniList, uniCollapse, uniCollapseItem},
        onLoad() {
            _self = this;
            this.cWidth = uni.upx2px(750);
            this.cHeight = uni.upx2px(500);
            this.getServerData();
            let data = new Date();
            data.setDate(data.getDate() - 2);
            for (let i = this.chartColumnData.categories.length - 3; i >= 0; i--) {
                this.chartColumnData.categories[i] = data.getDate()+"";
                this.chartAreaData.categories[i] = data.getDate()+"";
                data.setDate(data.getDate() - 1);
            }
            // console.log(data.get);
            // data.setDate(data.getDate() - 1);
            // this.chartColumnData.categories[3] = data.getDate()+"";
            // data.setDate(data.getDate() - 1);
            // this.chartColumnData.categories[2] = data.getDate()+"";
            // data.setDate(data.getDate() - 1);
            // this.chartColumnData.categories[1] = data.getDate()+"";
            // data.setDate(data.getDate() - 1);
            // this.chartColumnData.categories[0] = data.getDate()+"";
        },
        methods: {
            clickColumn(arr) {
                console.log(arr);
                if (arr.length === 1) {
                    for (let i = 0; i < list.length; i++) {
                        if (arr[0] !== list[i].name) {
                            list[i].chart = null
                        }
                    }
                }
                if (arr.length === 0) {
                    for (let i = 0; i < list.length; i++) {
                        list[i].chart = null
                    }
                }
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < list.length; j++) {
                        if (arr[i] === list[j].name && list[j].chart === null) {
                            switch (list[j].name) {
                                case `c`:
                                    //下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
                                    _self.serverData = _self.chartColumnData;
                                    let Column = {categories: [], series: []};
                                    //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                                    Column.categories = _self.chartColumnData.categories;
                                    Column.series = _self.chartColumnData.series;
                                    _self.showColumn("canvasColumn", Column);
                                    break;
                                case 'p':
                                    let Pie = {series: []};
                                    //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                                    Pie.series = _self.chartPieData.series;
                                    _self.showPie("canvasPie", Pie);
                                    break;
                                case 'a':
                                    let Area = {categories: [], series: []};
                                    //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                                    Area.categories = _self.chartAreaData.categories;
                                    Area.series = _self.chartAreaData.series;
                                    _self.showArea("canvasArea", Area);
                                    break;
                                case 'l':
                                    let LineA = {categories: [], series: []};
                                    //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                                    LineA.categories = _self.chartColumnData.categories;
                                    LineA.series = _self.chartColumnData.series;
                                    _self.showLineA("canvasLineA", LineA);
                                    break;
                            }
                        }
                    }

                }
            },
            getServerData() {
            },
            showColumn(canvasId, chartData) {
                list[0].chart = new uCharts({
                    $this: _self,
                    canvasId: canvasId,
                    type: 'column',
                    legend: {show: true},
                    fontSize: 11,
                    background: '#FFFFFF',
                    pixelRatio: _self.pixelRatio,
                    animation: true,
                    categories: chartData.categories,
                    series: chartData.series,
                    xAxis: {
                        disableGrid: true,
                    },
                    yAxis: {
                        //disabled:true
                    },
                    dataLabel: true,
                    width: _self.cWidth * _self.pixelRatio,
                    height: _self.cHeight * _self.pixelRatio,
                    extra: {
                        column: {
                            type: 'group',
                            width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
                        }
                    }
                });

            },
            touchColumn(e) {
                list[0].chart.showToolTip(e, {
                    format: function (item, category) {
                        if (typeof item.data === 'object') {
                            return category + ' ' + item.name + ':' + item.data.value
                        } else {
                            return category + ' ' + item.name + ':' + item.data
                        }
                    }
                });
            },
            showPie(canvasId, chartData) {
                list[1].chart = new uCharts({
                    $this: _self,
                    canvasId: canvasId,
                    type: 'rose',
                    fontSize: 11,
                    legend: {show: true},
                    background: '#FFFFFF',
                    pixelRatio: _self.pixelRatio,
                    series: chartData.series,
                    animation: true,
                    width: _self.cWidth * _self.pixelRatio,
                    height: _self.cHeight * _self.pixelRatio,
                    dataLabel: true,
                    isShow: false,
                    extra: {
                        rose: {
                            type: 'area',
                            minRadius: 50,
                            activeOpacity: 0.5,
                            offsetAngle: 0,
                            labelWidth: 15
                        }
                    },
                });
            },
            touchPie(e) {
                list[1].chart.showToolTip(e, {
                    format: function (item) {
                        return item.name + ':' + item.data
                    }
                });
            },
            showArea(canvasId,chartData){
                list[2].chart=new uCharts({
                    $this:_self,
                    canvasId: canvasId,
                    type: 'area',
                    fontSize:11,
                    legend:true,
                    dataLabel:false,
                    dataPointShape:true,
                    background:'#FFFFFF',
                    pixelRatio:_self.pixelRatio,
                    categories: chartData.categories,
                    series: chartData.series,
                    animation: true,
                    xAxis: {
                        type:'grid',
                        gridColor:'#CCCCCC',
                        gridType:'dash',
                        dashLength:8
                    },
                    yAxis: {
                        gridType:'dash',
                        gridColor:'#CCCCCC',
                        dashLength:8,
                        splitNumber:5,
                        min:10,
                        max:180,
                    },
                    width: _self.cWidth*_self.pixelRatio,
                    height: _self.cHeight*_self.pixelRatio,
                    extra: {
                        area:{
                            type: 'straight',
                            opacity:0.2,
                            addLine:true,
                            width:2
                        }
                    }
                });

            },
            touchArea(e) {
                list[2].chart.showToolTip(e, {
                    format: function (item, category) {
                        return category + ' ' + item.name + ':' + item.data
                    }
                });
            },
            showLineA(canvasId, chartData) {
                list[3].chart = new uCharts({
                    $this: _self,
                    canvasId: canvasId,
                    type: 'line',
                    fontSize: 11,
                    legend: {show: true},
                    dataLabel: false,
                    dataPointShape: true,
                    background: '#FFFFFF',
                    pixelRatio: _self.pixelRatio,
                    categories: chartData.categories,
                    series: chartData.series,
                    animation: true,
                    xAxis: {
                        type: 'grid',
                        gridColor: '#CCCCCC',
                        gridType: 'dash',
                        dashLength: 8
                    },
                    yAxis: {
                        gridType: 'dash',
                        gridColor: '#CCCCCC',
                        dashLength: 8,
                        splitNumber: 5,
                        min: 10,
                        max: 180,
                        format: (val) => {
                            return val.toFixed(0) + '元'
                        }
                    },
                    width: _self.cWidth * _self.pixelRatio,
                    height: _self.cHeight * _self.pixelRatio,
                    extra: {
                        line: {
                            type: 'straight'
                        }
                    }
                });

            },
            touchLineA(e) {
                list[3].chart.showToolTip(e, {
                    format: function (item, category) {
                        return category + ' ' + item.name + ':' + item.data
                    }
                });
            }
        }
    }
</script>

<style scoped>
    page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
    .qiun-padding{padding:2%; width:96%;}
    .qiun-wrap{display:flex; flex-wrap:wrap;}
    .qiun-rows{display:flex; flex-direction:row !important;}
    .qiun-columns{display:flex; flex-direction:column !important;}
    .qiun-common-mt{margin-top:10upx;}
    .qiun-bg-white{background:#FFFFFF;}
    .qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
    .qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
    .qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
    .charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>