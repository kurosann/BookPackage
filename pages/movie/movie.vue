<template>
    <view>
        <view class="player">
            <video
                    :src="trailerInfo.trailer"
                    :poster="trailerInfo.poster"
                    class="movie"
            controls></video>
        </view>
        <view class="movie-info">
            <image :src="trailerInfo.cover"></image>
        </view>
    </view>
</template>

<script>
    export default {
        name: "movie",
        data() {
            return {
                trailerInfo: {}
            }
        },
        props: {
            trailerid:String
        }
    }
</script>

<style scoped>
    @import url(../../pages/movie/movie.css);
</style>