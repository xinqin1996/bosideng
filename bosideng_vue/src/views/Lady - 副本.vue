<template>
  <section id="lady">
      <!-- 头部 -->
      <div class="lady_header add-tb">
          <table></table>
          <div class="header_main ">
              <span>女 装</span>
              <span>WOMEN</span>
          </div>
      </div>
      <!-- 面包屑导航 -->
      <div class="lady_title">
        <div class="title_main">
            <a href="javascript:;">首页</a>
            <span>></span>
            <a href="javascript:;">女装</a>
        </div>
          
      </div>
      <!-- 商品列表 -->
      <div class=lady_product>
        <!-- top上部 -->
        <table></table>
        <div class="product_top add-tb">    
          <div class="top_block">
            <a class="top1" href="javascript:;">
              <span>运 动 系 列</span>
            </a>
            <a class="top2" href="javascript:;">
            <span>都 市 系 列</span>
              </a>
          </div>
        </div>
        <!-- title标题-->
        <div class="product_title">
          商 品 一 览
        </div>
        <!-- bottom底部 -->
        <!-- 白色底纹 -->
        <div class="product_bottom">
          <!-- 图片容器 设固定宽度-->
          <div class="bottom_main cf">
            <!-- 图片大小 不同屏幕下固定-->
            <div class=bottom_one v-for="(elem,i) of lady_list" :key="i" >
              <a href="javascript:;" class="one_a">
                <!--1 图片部分 -->
                <div class=one_img>
                  <img class="one_img_on" :src="`http://127.0.0.1:5050/${elem.pic_on}`" alt="">
                  <img class="one_img_hover" :src="`http://127.0.0.1:5050/${elem.pic_hover}`" alt="">
                </div>
                <!-- 2 名字 -->
                <div class="one_title">{{elem.lname}}</div>
              </a>
              <!-- 3 价格 -->
              <div class="one_price">¥ 
                <span class="one_price_num">{{elem.price}}</span>
              </div>
              <!-- 5 数量颜色的选择 -->
              <div class="one_select">
                <select name="product_size" id="product_size">
                  <option value="">尺码</option>
                  <option value="" v-for="(elem1,i) of arrSplit(elem.spec,'-')" :key="i">{{elem1}}</option>
                  <!-- <option value="">170/88A</option>
                  <option value="">175/92A</option>
                  <option value="">180/96A</option>
                  <option value="">185/100A</option>
                  <option value="">190/104A</option>
                  <option value="">195/108A </option>
                  <option value="">200/112A </option>
                  <option value="">205/116A</option> -->
                </select>
                <select name="product_color" id="product_color">
                  <option value="">颜色</option>
                  <option value="" v-for="(elem2,i) of arrSplit(elem.color,'-')" :key="i">{{elem2}}</option>
                  <!-- <option value="">深绿</option>
                  <option value="">浅蓝</option>
                  <option value="">灰色</option>
                  <option value="">黑色</option> -->
                </select>
                <div class="select_num">
                  <input type="text" v-model="count">
                  <div class="select_control">
                    <div class="add" @click="addCount(1)">+</div>
                    <div class="reduce" @click="addCount(-1)">-</div>
                  </div>
                  <span class="select_sp">件</span>
                </div>
              </div>
              <!-- 4 加入购物车和爱心 -->
              <div class="one_handle">
                <button class="handle_once" @click="addCar" :data-pid="elem.pid" :data-price="elem.price" >立即购买</button>
                <button class=handle_car>加入购物车</button>
                <!-- <button class=handle_ai>加入收藏</button> -->
              </div>
            </div>
<!--             
            <div class=bottom_one>
              <a href="javascript:;" class="one_a">
 
                <div class=one_img>
                  <img class="one_img_on" src="../../public/img/lady/5bbfe9d1e663f.jpg" alt="">
                  <img class="one_img_hover" src="../../public/img/lady/5bbfe28168c57.jpg" alt="">
                </div>
           
                <div class="one_title">B80141122</div>
              </a>
      
              <div class="one_price">¥ 
                <span class="one_price_num">633</span>
              </div>
       
              <div class="one_select">
                <select name="product_size" id="product_size">
                  <option value="">尺码</option>
                  <option value="">165/84A</option>
                  <option value="">170/88A</option>
                  <option value="">175/92A</option>
                  <option value="">180/96A</option>
                  <option value="">185/100A</option>
                  <option value="">190/104A</option>
                  <option value="">195/108A </option>
                  <option value="">200/112A </option>
                  <option value="">205/116A</option>
                </select>
                <select name="product_color" id="product_color">
                  <option value="">颜色</option>
                  <option value="">深红</option>
                  <option value="">深绿</option>
                  <option value="">浅蓝</option>
                  <option value="">灰色</option>
                  <option value="">黑色</option>
                </select>
                <div class="select_num">
                  <input type="text" value="1">
                  <div class="select_control">
                    <div class="add">+</div>
                    <div class="reduce">-</div>
                  </div>
                  <span class="select_sp">件</span>
                </div>
              </div>
          
              <div class="one_handle">
                <button class="handle_once">立即购买</button>
                <button class=handle_car>加入购物车</button>
           
              </div>
            </div>
            -->
            
            <button class="bottom_load_more" @click="loadMore">{{bottomHtml}}</button>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
export default {
  data(){
    return {
      pageNum:0,
      lady_list:[],
      str:"165/84A-170/88A-175/92A-180/96A-185/100A",
      bottomHtml:"载 入 更 多",  //底部按钮的文字
      count:1,
    }
  },
  props:{
    lid:{default:""},

  },
  created(){
    this.loadMore();
    //返回一个数组
    // console.log(this.arrSplit(this.str,"-"));
    
  },
  methods:{
    addCar(){
      console.log(1);
    },
    // 增减函数
    addCount(e){
      this.count=this.count+e;
    },
    //字符串剪切函数
    arrSplit(str,str1){
      var arr=str.split(str1);
      return arr;
    },
    //载入更多的ajax函数
    loadMore(){
      var url="/product/v1/lady";
      this.pageNum++;
      var obj={pageNum:this.pageNum};
      this.axios.get(url,{params:obj}).then(
        res=>{
          //尝试打印结果
          // console.log(res.data.data);
          // console.log(res.data);
          if(res.data.data.length==0){this.bottomHtml="没 有 更 多"};
          var row=this.lady_list.concat(res.data.data);
          this.lady_list=row;
        }
      )
    }
  }
}
</script>
<style>
  @import url("../assets/css/lady.css");
</style>