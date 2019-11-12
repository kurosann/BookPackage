<template name="StarComp">
    <view class="movie-score-wapper">
        <view style="display: flex;align-self: center" :key="i" v-for="i in 5" >
            <image v-if="i < Math.floor(movie.star / 2 % 5 )" class="star-icon" src="/static/icos/star-yellow.png"></image>
            <image v-else class="star-icon" src="/static/icos/star-gray.png"></image>
        </view>
        <view v-if="showNum" class="movie-score">{{movie.star == null? 0 : movie.star}}</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            movie: {
            },
            showNum: Boolean
        },
        methods: {
        }
    }
</script>

<style scoped>
    .star-icon {
        width: 20upx;
        height: 20upx;
    }

    .movie-score-wapper {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .movie-score {
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: grey;
        margin-left: 8upx;
    }
</style>