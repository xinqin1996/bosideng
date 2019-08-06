const express = require("express");
const router = express.Router();
const pool=require("../pool");

//查询所有女装
router.get("/v1/lady",(req,res)=>{
  //  pno 页码  pageSize 页大小
  var pn=req.query.pageNum;
  var ps=req.query.pageSize;
  if(!pn){pn=1}
  if(!ps){ps=6}
  var offset = (pn-1)*ps;
  ps=parseInt(ps);
  //              编号，家族编号 价格   名字  尺寸  颜色   图片   图片   
  var sql="SELECT pid,family_id,price,lname,spec,color,pic_on,pic_hover FROM bsd_product WHERE family_id LIKE '1_' LIMIT ?,?";
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})

module.exports=router;
