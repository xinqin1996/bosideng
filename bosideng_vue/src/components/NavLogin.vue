<template>
    <div>
        <div class="nav_left">
            <div @click="login" :class="{'d-none':isLogin}">点击登录</div>
            <div  :class="{'d-none':!isLogin}">{{nav_left_login}}</div>
            <div>退出登录</div>
            <div @click="go_cart">购物车</div> 
            <div @click="go_lady">lady商城</div> 
            <div @click="go_index">首页</div> 
        </div>
        <div class="login" :class="{on:isOn}">
            <mt-field label="用户名" v-model="uname" :attr="{maxlength:10}" :placeholder="unameholder">
            </mt-field>
            <mt-field label="密码" v-model="upwd" :attr="{maxlength:10}" type="password" :placeholder="upwdholder">
            </mt-field>
            <mt-button type="primary" size="large" @click="check">登录</mt-button>
            <mt-button type="primary" size="large" class="btn_reg" >注册</mt-button>
            <mt-button  size="large" class="btn_close" @click="close">退出</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isOn:false,
            //双向绑定，获取input框里的uname,upwd
            uname:"",
            upwd:"",
            unameholder:"输入用户名",
            upwdholder:"输入密码",
            //占位nav_left_login;
            nav_left_login:"欢迎",
            isLogin:false,
        }
    },
    created(){
        //创建成功时向服务器发起请求，查看是否存在req.session,返回uname的值
        this.loadIsLogin();
    },
    methods:{
        //点击购物车时对isLogin进行判断，为false，则提示登录，true的话进入购物车
        go_cart(){
            if(this.isLogin==false){
                this.$toast({
                    message:"请先登录",
                    duration:1000
                });
                //弹出登录框
                this.isOn=true;
            }else{
                //isLogin为true，直接跳到/shoppinCar
                 this.$router.push("/shoppingCar")
            }
        },
        login(){this.isOn=true;},
        close(){this.isOn=false;},
        //跳转到lady商城
        go_lady(){ this.$router.push("/lady");},
        go_index(){ this.$router.push("/");},
        check(){
           var unameReg=/^[a-z0-9]{2,12}$/i;
           if(!this.reg(unameReg,this.uname,"用户名错误")){
               return;
           };
           var upwdReg=/^[a-z0-9]{2,12}$/i;
           if(!this.reg(unameReg,this.upwd,"密码错误")){
               return;
           };
           var uname=this.uname;
           var upwd=this.upwd;
            //正确时发起ajax请求
            var url="user/v1/login";
            var obj={uname:uname,upwd:upwd};
            this.axios.get(url,{params:obj}).then(
                res=>{
                    // console.log(res);
                    //传过来的东西在res.data里
                    if(res.data.code==1){
                        this.$toast(`登录成功,欢迎回来,${uname}`);
                        this.isOn=false;
                        this.isLogin=true;
                        this.nav_left_login=uname;
                    }else{
                        this.$toast("用户名或密码错误")
                    }
                    console.log(res.data.code)
                }
            )
        },
        reg(reg,elem,msg){
            var j=reg.test(elem);
            if(j){
                return true;
            }else{
                this.$toast({
                    message:msg,
                    duration:1000
                })
                return false;
            }
        },
        loadIsLogin(){
            var url="user/v1/isLogin";
            this.axios.get(url).then(
                res=>{
                    // console.log(res.data);
                    if(res.data.code==1){
                        this.isLogin=true;
                        this.nav_left_login=res.data.data[0].uname;
                        // console.log(res.data.data[0].uname);
                        // this.nav_left_login=res.data.data.
                    }
                }
            )
        }
    }
}
</script>
<style scoped>
.nav_left{
  position:fixed;z-index: 99;
  top:50%;right:5%;margin-top:-140px;
  font-size:24px;
  text-align: center;
  width:60px;
  border-radius:5px;
  background-color:aliceblue;
}

.btn_reg{background-color:aquamarine;margin-top:10px;}

.nav_left div{
    padding: 5px ;
    cursor:pointer;
    border: 1px solid #ccc;
}

.nav_left div:hover{
    background-color: #fff;
}

.login{
 display:none;
  width:375px;
  background-color:#fff;
  border:2px solid #eee;
  z-index: 60;
  padding:20px;
  border-radius:3px;
  position:fixed; 
  top:50%;left:50%;margin-left:-187.5px;margin-top:-140px;
}
.login.on{
    display:block !important;
}
.btn_close{
    margin-top:10px;
}
.d-none{
    display:none;
}
</style>