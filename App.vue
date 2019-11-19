<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
            var userId = uni.getStorageSync("globalUser").userid;
            this.userId = userId;
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
    @import url(colorui/main.css);
    @import url(colorui/icon.css);
	/*每个页面公共css */
    .page {
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
        position: absolute;
    }
    .page-block {
        background-color: #ffffff;
    }

    ul,li{
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    .fixed {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1024;
        box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
    }
    .white_bg{
        background: #f8f8f8;
    }
    .padding10{
        padding:0 20upx;
        box-sizing: border-box;
    }.margin_top30{
         margin-top:30upx;
     }
    .borderBox{
        box-sizing: border-box;
    }
    .borderRadius{
        border-radius: 50%;
    }
    .burt_ellipsis{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .burt_ellipsis2{
         text-overflow: ellipsis;
         overflow: hidden;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         line-clamp: 2;
         -webkit-box-orient: vertical;
     }
</style>
