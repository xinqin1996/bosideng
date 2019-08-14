<template>
    <div id="carousel" @mouseenter="stop" @mouseleave="start">
        <div class="carousel_main">
            <div class="carousel_left carousel_slider" @click="move(-1)"></div>
            <div class="carousel_right carousel_slider" @click="move(1)"></div>
            <ul class="carousel_ul cf" :style="ulStyle" :class="{hasTransition:is_hasTrans}">
                <li class="carousel_li" v-for="(elem,i) of list" :key="i"></li>
                <!-- 这4个遍历生成 -->
                <!-- <li class="carousel_li"><router-link :to="elem.to"></router-link></li>
                <li class="carousel_li"></li>
                <li class="carousel_li"></li>
                <li class="carousel_li"></li> -->
                <li class="carousel_li"></li>
            </ul>
            <!--  :class="  idx==i?'active':''  " -->
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return {
          innerWidth:window.innerWidth,   //设置初始的屏幕宽度
          i:0,    //当前显示的是哪张图片 ，小圆点的控制和ul的margin-left由此控制
          list:[],//里面保存了5个数据 id/lg/md 
          canClick:true, //初始值true
          is_hasTrans:true,   
          timer:null,
      }
  },
  computed:{
    //计算ulStyle属性，动态绑定ul的样式
    ulStyle(){
      var width=this.innerWidth*(this.list.length+1)+"px"; 
      var marginLeft=-this.innerWidth*this.i+"px";
      return {width,marginLeft};
    }
  },
  created(){
      //为window，添加resize事件，当窗口改变时，把窗口宽度赋给this.innerWidth;
      // 必须使用()=>{},使内外this等于VueComponent;
      // 必须使用window的事件监听，动态改变innerWidth,computed计算属性不顶用;
      window.addEventListener("resize",()=>{
          this.innerWidth=window.innerWidth;
          // console.log(this)
          console.log(this.list);
      });
      this.loadCarousel();
      this.start();
  },
  methods:{
    loadCarousel(){
      var url="index/v1/header_carousel";
      this.axios.get(url).then(res=>{
        // console.log(res.data.data); 打桩
        this.list=res.data.data;
      })
    },
    move(i){
      //需要骗过用户
      if(this.canClick){
        //首先关闭开关
        this.canClick=false;
        //1
        if(this.i==0 && i==-1){
          this.is_hasTrans=false;
          setTimeout(()=>{
            this.i=this.list.length;
            setTimeout(()=>{
              this.is_hasTrans=true;
              this.i+=i;
              setTimeout(()=>{
                this.canClick=true;
              },600)
            },50) 
          },50)
        //2
        }else if(this.i==(this.list.length-1) && i==1){
          this.i+=i;
          setTimeout(()=>{
            this.is_hasTrans=false;
            setTimeout(()=>{
                this.i=0;
              setTimeout(()=>{
                this.is_hasTrans=true;
                setTimeout(()=>{
                  this.canClick=true;   //稍等片刻之后允许单击
                })
              },50)
            },50)
          },600)
        //3
        }else{
          this.i+=i;     
          setTimeout(()=>{     
            this.canClick=true;
          },600)
        }
      }
    },
    start(){
      this.timer=setInterval(()=>{
        this.move(1)
      },4000);
    },
    stop(){
      clearInterval(this.timer)
    },
  }
}
</script>
<style>
    @import url("../assets/css/carousel.css");
</style>