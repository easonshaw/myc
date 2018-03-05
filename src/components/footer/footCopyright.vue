<template>
    <div>
        <ul class="browser">
            <li><a href="http://www.google.cn/chrome/browser/desktop/index.html"><span><i class="iconfont icon-chrome"></i></span>谷歌浏览器</a></li>
            <li><a href="http://www.firefox.com.cn/"><span><i class="iconfont icon-firefox"></i></span>火狐浏览器</a></li>
            <li><a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie"><span><i class="iconfont icon-ie"></i></span>IE 浏览器</a></li>
        </ul>
        <div class="copyright">
            <p>
                © 2018 墨月城 Games. All Rights Reserved. <br>
                为了保证最佳使用体验，请您的屏幕分辨率在1280以上，並建議您使用Chrome,friefox,IE10以上的最佳浏览效果
            </p>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
    .browser{
        width: 500px;
        height: 60px;
        line-height: 60px;
        margin: 0 auto;
        list-style: none;
    }
    .browser li{
        width: 160px;
        height: 60px;
        float: left;
        margin-right: 10px;
        overflow: hidden;
    }
    .browser li:last-child{
        margin-right: 0;
    }
    .browser li a {
        display: block;
        color: #fff;
        text-decoration: none;
        font-size: 14px;
        text-align: left;
    }
    .browser li a:hover{
        text-decoration: none;
        color: #fff;
    }
    .browser li a span{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        margin-right: 10px;
    }
    .browser li:first-child a span{
        background: #56aa72;
    }
    .browser li:nth-child(2)  a span{
        background: #ea8914;
    }
    .browser li:nth-child(3)  a span{
        background: #2f6ab3;
    }
    .browser li a span i{
        font-size: 32px;
        width: 32px;
        height: 32px;
    }
    .copyright{
        width: 700px;
        margin: 0 auto;
        font-size: 12px;
        line-height: 1.6em;
        color: #fff;
        padding: 20px 0;
        text-align: center;
    }
</style>
