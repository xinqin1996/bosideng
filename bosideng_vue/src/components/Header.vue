<template>
  <header>
      <div id="header">
          <!-- >500显示-->
          <div class="header_sm d_md960_none">
              <!-- 使用开关控制，nav的开启和关闭-->
              <div class="header_sm_nav" :class="{active:isActive}" @click="changeIsActive"></div>
              <a  class="header_sm_img" href="javascript:;"></a>
              <div class="header_sm_menu" :class="{'d-none':!isActive}">
                  <ul class="menu_ul">
                      <li class="menu_li">
                          <a  class="active" href="javascript:;">首页</a>
                      </li>
                      <li class="menu_li li_abs" :class="{active:liIsActive[0]}" @click="changeLi" data-i=0>
                          <span class="">品牌</span>
                          <ul class="menu_li_ul">
                              <li class="menu_li_item"><a href="javascript:;">品牌故事</a></li>
                              <li class="menu_li_item"><a href="javascript:;">品牌动态</a></li>
                          </ul>
                      </li>
                      <li  class="menu_li" :class="{active:liIsActive[1]}"  @click="changeLi" data-i=1>
                          <span>商品</span>
                          <ul class="menu_li_ul">
                              <li class="menu_li_item"><a href="javascript:;">女装</a></li>
                              <li class="menu_li_item"><a href="javascript:;">男装</a></li>
                              <li class="menu_li_item"><a href="javascript:;">童装</a></li>
                              <li class="menu_li_item"><a href="javascript:;">国际设计师限量款</a></li>
                          </ul>
                      </li>
                      <li  class="menu_li">
                          <span>羽绒科技</span>
                      </li>
                      <li  class="menu_li">
                          <span>明星穿塔</span>
                      </li>
                      <li  class="menu_li">
                          <span>商城</span>
                      </li>
                      <li  class="menu_li">
                          <span>会员</span>
                      </li>
                      <li  class="menu_li">
                          <span>联系我们</span>
                      </li>
                      <li  class="menu_li">
                          <span>公司信息</span>
                      </li>
                      <li  class="menu_li">
                          <span>法律声明</span>
                      </li>
                  </ul>
                  <div class="menu_search">
                      <div class="search_main">
                          <div class="search_icon"></div>
                          <input type="text" placeholder="在 bosideng.com 搜索"/>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 在960时显示-->
          <div class="d_sm256_none d_md960_block header_md">
              <!--导航栏部分  d-none-->
              <ul class="header_nav">
                  <li class="nav_li">
                      <a  class="nav_a a1" href="javascript:;" >品牌<span class="nav_span span1"></span> </a>
                      <a href="javascript:;" ></a>
                  </li>
                  <li class="nav_li">
                      <a  class="nav_a a1" href="javascript:;" >商品<span class="nav_span span1"></span> </a>
                      <a href="javascript:;" ></a>
                  </li>
                  <li class="nav_li">
                      <a  class="nav_a a1" href="javascript:;" >羽绒科技<span class="nav_span span1"></span> </a>
                      <a href="javascript:;" ></a>
                  </li>
                  <li class="nav_li">
                      <a   href="javascript:;" class="a_img1"><img src="img/logo.png" alt=""/></a>
                  </li>
                  <li class="nav_li">
                      <a  class="nav_a a1" href="javascript:;" >明星穿搭<span class="nav_span span1"></span> </a>
                      <a href="javascript:;" ></a>
                  </li>
                  <li class="nav_li">
                      <a  class="nav_a a1" href="javascript:;" >商城<span class="nav_span span1"></span> </a>
                      <a href="javascript:;" ></a>
                  </li>
                  <li class="nav_li">
                      <a  class="nav_a a1" href="javascript:;" >会员<span class="nav_span span1"></span> </a>
                      <a href="javascript:;" ></a>
                  </li>
              </ul>
              <!--搜索框部分，先设置了none-->
              <!-- 点击header_search可以开启搜索框，同时使header_nav隐藏-->
              <div class="header_search">

              </div>
              <div class="search_input">
                  <div class="input_block">
                      <input class="input_main" type="text" placeholder="在 bosideng.com 搜索"/>
                      <!-- 点击input_close 可以关闭搜索框-->
                      <div class="input_close"></div>
                  </div>
              </div>
          </div>
      </div>
  </header>
</template>
<script>
export default {
  data(){
    return{     //把所有的true防砸数组里，通过data-id俩获取对印的下标
      isActive:false,
      liIsActive:[false,false],
    }
  },
  methods:{
    changeIsActive(){
      this.isActive = (this.isActive==false) ? true:false;
    }
  },
}
</script>
<style>
  @import url("../assets/css/header.css");
</style>