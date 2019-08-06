<template>
    <div class=bottom_one>
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
        <select name="product_size" id="product_size" v-model="spec">
            <option>尺码</option>
            <option  v-for="(item1,i) of arrSplit(elem.spec,'-')" :key="i">{{item1}}</option>
            <!-- <option value="">170/88A</option>
            <option value="">175/92A</option>
            <option value="">180/96A</option>
            <option value="">185/100A</option>
            <option value="">190/104A</option>
            <option value="">195/108A </option>
            <option value="">200/112A </option>
            <option value="">205/116A</option> -->
        </select>
        <select name="product_color" id="product_color" v-model="color">
            <option >颜色</option>
            <option  v-for="(item2,i) of arrSplit(elem.color,'-')" :key="i">{{item2}}</option>
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
        <button class="handle_once" @click="payonce">立即购买</button>
        <button class="handle_car"  @click="addCar" :data-pid="elem.pid" :data-familyid="elem.family_id" :data-price="elem.price" :data-lname="elem.lname" :data-pichover="elem.pic_hover">加入购物车</button>
        <!-- <button class=handle_ai>加入收藏</button> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            spec:"尺码",
            color:"颜色",
            count:1,            
        }
    },
    props:{
        elem:{default:{}},
    },
    watch:{
        elem(){
            console.log(this.elem)
        }
    },
    methods:{
        //立即购买
        payonce(){
            this.$toast({
                message:"该功能未完成",
                duration:1000,
            })
        },
        //加入购物车的功能
        addCar(e){
            
            var pid=e.target.dataset.pid;
            var family_id=e.target.dataset.familyid;
            var lname=e.target.dataset.lname;
            var price=e.target.dataset.price;
            var spec=this.spec;
            var color=this.color;
            var count=this.count;
            if(spec=="尺码" || color=="颜色"){
                this.$toast({
                    message:"请选择尺码或颜色",
                    duration:1000,
                })
                return;
            }
            var pic_hover=e.target.dataset.pichover;
            var url="cart/v1/addcart";
            var obj={pid:pid,family_id:family_id,lname:lname,price:price,spec:spec,color:color,count:count,pic_hover:pic_hover}
            // console.log(obj);
            this.axios.get(url,{params:obj}).then(
                res=>{
                    console.log(111);
                    if(res.data.code==-1){
                        console.log(122);
                        this.$toast("请先登录");

                    }else{
                        console.log(133);
                        this.$toast({
                            
                            message:"添加购物车成功",
                            duration:1000
                        })
                    }
                }
            )    
        },
        // 增减函数
        addCount(e){
            this.count=this.count+e;
            if(this.count==0){this.count=1}; 
        },
        //字符串剪切函数
        arrSplit(str,str1){
            var arr=str.split(str1);
            return arr;
        },
    }
}
</script>