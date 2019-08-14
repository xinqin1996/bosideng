const express = require("express");
const router = express.Router();
const pool=require("../pool");

//首页animation图片
router.get("/v1/animation",(req,res)=>{
  //              编号  图片
  var sql="SELECT * FROM bsd_index_animation";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})

router.get("/v1/header_carousel",(req,res)=>{
  var sql="SELECT * FROM bsd_index_header_carousel";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})

module.exports=router;
