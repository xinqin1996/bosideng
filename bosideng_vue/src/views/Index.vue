<template>
	
    <div id="index">
        <my-header></my-header>
        <carousel></carousel>
        <nav-login></nav-login>
        <div class="index_block1"></div>
        <div class="index_block2">
            <a class="ming_title">
                <span class="sp1">明星穿搭</span>
                <span class="sp2">明 星 穿 搭</span>
                <span >进入 ></span>
            </a>
            <!--把几个重复的div包在里面-->
            <div class="ming_main ">
                <div class="ming_car cf">
                    <div class="ming_block cf" v-for="(elem,i) of 3" :key="i" >
                        <a v-for="(elem,i) of animationList" :key="i"  :style="{backgroundImage:`url(http://127.0.0.1:5050/`+`${elem.img}`+`)`}"  href="javascript:;"></a>
                        <!-- <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a> -->
                    </div>
                    <!-- <div class="ming_block cf">
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                    </div>
                    <div class="ming_block cf">
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="index_block3 ">
            <!--图片文字部分-->
            <div class="block3_main1">
                <div class="main1_blur"></div>
                <!--一共有5个图片文字-->
                <!--会变化的div active-->
                <!-- active通过block来控制图片的显示-->
                <div class="main1_content active">
                    <div class="content_it cf">
                        <div class="main1_img"></div>
                        <div class="main1_text">
                            <span class="text_sp1">品牌动态</span>
                            <span class="text_sp2">2019.5.29</span>
                            <div class="text_con">
                                <a  class="text_a" href="javascript:;">匠心精神激发品牌活力，波司登受邀亮相中国品牌日</a>
                                <span class="text_span3">5月10日， 2019 年“中国品牌日”展览在上海展览中心拉开帷幕。200余家国内顶尖品牌汇聚一堂，将中国品牌的中国品质展现在参会者面前。在活动期间举行的2019年中国品牌价值评价信息发布暨中国品牌建设高峰论坛上，由新华社、中国国际贸易促进委员会、中国品牌建</span>
                            </div>
                            <a class="text_sp4">立即阅读</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--底部选项-->
            <div class="block3_main2">
                <ul class="main2_ul cf">
                    <!-- 通过给li加active的方法是icon显示-->
                    <li class="main2_li ">
                        <div class="main2_cover"></div>
                        <div class="main2_icon">1</div>
                    </li>
                    <li class="main2_li active">
                        <div class="main2_cover"></div>
                        <div class="main2_icon">2</div>
                    </li>
                    <li class="main2_li">
                        <div class="main2_cover"></div>
                        <div class="main2_icon">3</div>
                    </li>
                    <li class="main2_li">
                        <div class="main2_cover"></div>
                        <div class="main2_icon">4</div>
                    </li>
                    <li class="main2_li">
                        <div class="main2_cover"></div>
                        <div class="main2_icon">5</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import carousel from "../components/Carousel"
    export default {
       data(){
           return {
               animationList:[],
           }
       },
       components:{
           carousel:carousel,
       },
       created(){
           this.loadAnimation();
       },
       methods:{
           loadAnimation(){
               var url="index/v1/animation";
               this.axios.get(url).then(
                   res=>{
                       console.log(res.data.data);
                       //获得首页动画部分的9张图片
                       this.animationList=res.data.data;
                   }
               )
           }
       }
   }
</script>
<style >

    @import url("../assets/css/index.css");

</style>