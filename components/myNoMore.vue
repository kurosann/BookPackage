<template>
    <div v-show='toShow' class='nomore-div'>没有更多了</div>
</template>

<script>
export default {
    data(){

    },
    props: ['toShow']
}
</script>

<style lang="less">
.nomore-div{
    height:60upx;
    line-height:60upx;
    background: rgba(0,0,0,0.4);
    color: #fff;
    text-align: center;
    position: relative;
    z-index: 1;
}
</style>