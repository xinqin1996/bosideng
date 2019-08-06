const express = require("express");
const router = express.Router();
const pool=require("../pool");

//通过uname和upwd查询uil,将结果保存在req.session里面，
router.get("/v1/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var sql="SELECT uid FROM bsd_user WHERE uname=? AND upwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:"-1",msg:"用户名或密码错误"});
    }else{
      //登录成功 1: 保存凭据在session中，2: 把成功的信息发送给脚手架
       //result=[{uid:1}]
      req.session.uid=result[0].uid;
      console.log(req.session);
      res.send({code:"1",msg:"登录成功"})
    }
  })
})

//创建成功时向服务器发起请求，查看是否存在req.session,
router.get("/v1/islogin",(req,res)=>{
  //获取uid，
  var uid = req.session.uid;
  //如果不存在，无事发生，
  if(!uid){
    res.send({code:-1,msg:"用户未登录"}); 
    return; 
  };
  var sql='SELECT uname FROM bsd_user WHERE uid = ?'
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:"-1",msg:"出现错误，没有找到uname"});
    }else{
      //登录成功 1: 保存凭据在session中，2: 把成功的信息发送给脚手架
       //result=[{uid:1}]
      res.send({code:"1",msg:"用户已经登录",data:result})
    }
  })
})

module.exports=router;
