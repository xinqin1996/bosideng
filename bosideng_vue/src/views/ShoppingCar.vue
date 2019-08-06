<template>
    <section id="shoppingCar">
        <nav-login></nav-login>
        <div id="car_header">
            <div class="header_block">
                <img src="../../public/img/shoppingCar/logo.png" alt="">
                <span>购物车</span>
            </div>
            <div class="header_search">
                <select name="header_search_select" id="">
                    <option value="">女装</option>
                    <option value="">男装</option>
                    <option value="">童装</option>
                    <option value="">国际设计师限量款</option>
                </select>
                <input type="text" placeholder="波司登夏季防晒系列">
                <button>搜 索</button>
            </div>
        </div>
        <div id="car_main">
            <ul class="car_main_ul">
                <li class="car_ul_li select">全部商品<span>3</span></li>
                <li class="car_ul_li">降价商品<span>0</span></li>
                <li class="car_ul_li">库存紧张<span>0</span></li>
                <div class="car_main_ul_underline"></div>
            </ul>
            <div class="car_main_line"></div>
            <table class=car_main_table>
                <thead>
                    <tr>
                        <td colspan=2><input type="checkbox" name="car_checkbox" @change="selectAll" v-model="isSelectAll"><span>全选</span></td>
                        <td>商品信息</td>
                        <td></td>
                        <td>单价</td>
                        <td>数量</td>
                        <td>金额</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(elem,i) of list" :key="i">
                        <td><input type="checkbox"  name="car_checkbox" @change="checkone"   v-model="elem.cb" /></td>
                        <td><img :src="`http://127.0.0.1:5050/`+elem.pic_hover" alt=""></td>
                        <td>
                            <span>{{elem.lname}}</span> </td>
                        <td>
                            <h3>颜色：【{{elem.color}}】</h3>
                            <h4>尺码：{{elem.spec}}</h4>
                        </td>
                        <td>
                            <span>¥{{elem.price*1.2}}</span>
                            <span>¥{{elem.price}}</span>
                        </td>
                        <td>
                            <div>
                                <!-- 通过active来控制button的disable -->
                                <!-- 在div button上加了一层div -->
                                <button  :class="{btnDisabled:elem.count<=1}" :data-iname="i" @click="subCount" >-</button>
                                <input type="text" v-model="elem.count" >
                                <button :data-iname="i" @click="addCount">+</button>
                            </div>
                        </td>
                        <td>{{elem.price*elem.count}}</td>
                        <td>
                            <a href="javascript:;">移入收藏夹</a>
                            <a href="javascript:;" :data-cid="elem.cid" @click="delItem">删除</a>
                        </td>
                    </tr> 
                    <!-- <tr>
                        <td><input type="checkbox"  name="car_checkbox"/></td>
                        <td><img src="../../public/img/shoppingCar/anli.jpg" alt=""></td>
                        <td>
                            <span>正品老夫子软膏老夫子皮肤抑菌膏买2送1 包邮 买3送2 不动号</span> </td>
                        <td>
                            <h3>颜色：【灰色+黑色】</h3>
                            <h4>尺码：31[2尺4]</h4>
                        </td>
                        <td>
                            <span>¥16.00</span>
                            <span>¥14.30</span>
                        </td>
                        <td>
                            <div>
                                 通过active来控制button的disable 
                                 在div button上加了一层div 
                                <button disabled class="btnDisabled">-</button>
                                <input type="text" value="1">
                                <button>+</button>
                            </div>
                        </td>
                        <td>￥14.30</td>
                        <td>
                            <a href="javascript:;">移入收藏夹</a>
                            <a href="javascript:;">删除</a>
                        </td>
                    </tr> -->
                  
                </tbody>
            </table>
        </div>
        <div id=car_settle class="fixedBottom">
            <div class="settle_left ">
                <div>
                    <input type="checkbox" name="car_checkbox" @change="selectAll" v-model="isSelectAll">
                    <span>全选</span>
                </div>
                <a href="javascript:;" @click="delAll">删除</a>
                <a href="javascript:;">移入收藏夹</a>
                <a href="javascript:;">分享</a>
                <span style="margin-left:30px">购物车商品数量 <span style="color:red;font-size:16px">{{$store.getters.getCartCount}} </span>个</span>
            </div>
            <div class="settle_right settleBottom">
                <a class="right_1">
                    <span>已选商品</span>
                    <span class="right_1_num">{{total.num}}</span>
                    <span>件</span>
                    <span class="right_1_icon"></span>
                </a>
                <div class="right_2">合计（不含运费）：</div>
                <div class="right_3">
                    <span>¥</span>
                    <span class="right_3_total">{{total.total}}</span>
                </div>
                <a class="right_btn" href="javascript:;" @click="pay">
                    结 算
                </a>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
      data(){
          return {
              a:"",
              list:[],  //cb checkedbox  服务器传过来的东西放在这里
              isSelectAll:false, //用来控制两个多选框的 一样变化

              total_total:0, //这两个属性，展示没有使用 gettotal(){}
              total_num:0,
          }
      },
      props:{
          // lid:{default:""}
      },
      created(){
        this.loadMore();
      },
      watch:{
        //因为无法对list进行监听，也无法使用函数调用，所以采用computed的方法；
        // list:function(){
        //   this.gettotal();
        // }
      },
      computed:{
        //计算属性，返回一个 total={num:product_num,total:product_total}
        total(){
          var product_num=0;
          var product_total=0;
          for(var elem of this.list){
            if(elem.cb==true){
              product_num+=elem.count;
              product_total=product_total+elem.price*elem.count;
            }
          };
          this.product_num=product_num;
          this.product_total=product_total;
          return {num:product_num,total:product_total}
        }
      },
      methods:{
        pay(){
          this.$messagebox.alert("余额不足").then(
            result=>{
              return;
            }
          )
        },
        //函数动态改变   可以使用，但是不用
              // total_total:0,
              // total_num:0,
        // gettotal(){
        //   var product_num=0;
        //   var product_total=0;
        //   for(var elem of this.list){
        //     if(elem.cb==true){
        //       product_num++;
        //       product_total=product_total+elem.price*elem.count;
        //     }
        //   };
        //   this.total_num=product_num;
        //   this.total_total=product_total;
        // },
        // 单选按钮
        checkone(){
          // this.gettotal();
          // console.log(this.list);
          // console.log(this.product_num);
          // console.log(this.product_total);
          for(var elem of this.list){
            if(elem.cb==false){this.isSelectAll=false;break};
            // console.log(-1);
          };
          var num=0;
          for(var elem of this.list){
            if(elem.cb==true){num++;}
          };
          if(num==this.list.length){this.isSelectAll=true;};
        },
        // 增减函数1
        subCount(e){
          //使用  :class="{btnDisabled:elem.count<=1}"  来控制样式的显示与否
          var i=e.target.dataset.iname;
          this.list[i].count=this.list[i].count-1;
          if(this.list[i].count==0){this.list[i].count=1}; 
          // this.gettotal();
        },
        // 增减函数2
        addCount(e){
          // console.log(e.target.dataset.iname);
          var i=e.target.dataset.iname;
          this.list[i].count=this.list[i].count+1; 
          // console.log(this.list);
          // this.gettotal();
        },
        // 全选按钮
        selectAll(e){
          //获取自己的checked值赋给其他人；
          var cb=e.target.checked;
          for(var elem of this.list){
            elem.cb=cb;
          }
          // this.gettotal();
        },
        //删除后清除list对应的下标的函数，在其他函数里被调用
        clearList(cid){
          for(var i=0;i<this.list.length;i++){
            if(this.list[i].cid==cid){
              // 删除该元素
              this.list.splice(i,1);
            }
          }
        },
        //删除多个商品
        delAll(){
          var url="cart/v1/delproducts";
          var cids="";
          var cidsarr=[];
          for(var elem of this.list){
            if(elem.cb==true){
              cids+=elem.cid+","
              cidsarr.push(elem.cid);
            }
          }
          if(cids==""){
            this.$messagebox("请选择要删除的商品");
            return;
          };
          cids=cids.slice(0,-1);
          // console.log(cids);
          var obj={cids};
          this.$messagebox.confirm("是否全部删除")
          .then(action=>{
            this.axios.get(url,{params:obj}).then(
              res=>{
                if(res.data.code==1){
                  this.$toast("删除成功");
                  // this.loadMore();
                  //删除成功时执行list清除操作
                  for(var i=0;i<cidsarr.length;i++){
                    //clearList函数在上面定义好了
                    this.clearList(cidsarr[i]);
                    //同时执行Vuex,没删除一个商品，执行一次
                    this.$store.commit("subItem")
                  }
                }else{
                  this.$toast("删除失败");
                }
              })
          })
          .catch(err=>{return});
        },
        //删除一个商品
        delItem(e){
          console.log(1);
          var url="cart/v1/delproduct";
          var cid=e.target.dataset.cid;
          var obj={cid:cid};
          this.$messagebox.confirm('是否删除')
          //确认删除
          .then(action=>{
            this.axios.get(url,{params:obj}).then(
              res=>{
                if(res.data.code==1){
                  //重新发起请求
                  this.$toast({
                    message:"删除成功",
                    duration:1000,
                  });
                  this.clearList(cid);
                  this.$store.commit("subItem");
                  // 这一步会刷新页面，故而注释掉
                  // this.loadMore();
                } 
              }
            )
          })
          //否 无事发生
          .catch(err=>{return});
        },
        //页面ajax请求函数
        loadMore(){
          var url="cart/v1/getproduct"
          this.axios.get(url).then(
            res=>{
              if(res.data.code==-1){
                return;
              }else{
                //1-1加载之前先清空
                this.$store.commit("clear")
                var list=res.data.data;
                //为每个elem加一个控制checkbox的属性
                for(var elem of list){
                  elem.cb=false;
                  //1-2修改购物车中的数量值vuex
                  this.$store.commit("increment");
                }
                this.list=list;
                console.log(this.list);
              }
            }
          )
        }
      }
    }
</script>
<style>
    @import url("../assets/css/shopping_car.css");
</style>