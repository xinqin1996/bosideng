const express = require("express");
const router = express.Router();
const pool=require("../pool");

//加入购物车的选项
//通过uname和upwd查询uil,将结果保存在req.session里面，
router.get("/v1/addcart",(req,res)=>{
    //1先判断用户是否登录 
    var uid=req.session.uid;
    //2没有登录  -1
    if(!uid){
        res.send({code:-1,msg:"亲爱的用户，请先登录"});
        return;
    };
    //3登录了  1
    var pid=req.query.pid;
    var family_id=req.query.family_id;
    var lname=req.query.lname;
    var price=req.query.price;
    var spec=req.query.spec;
    var color=req.query.color;
    var count=req.query.count;
    var pic_hover=req.query.pic_hover;
    var sql="SELECT cid FROM bsd_cart WHERE uid=? AND pid=? AND spec=? AND color=?";
    pool.query(sql,[uid,pid,spec,color],(err,result)=>{
        if(err) throw err;
        //4判断是否已经购买了商品
        if(result.length==0){
            //5没有购买就添加
            pool.query('INSERT INTO bsd_cart(uid,pid,family_id,lname,price,spec,color,count,pic_hover) VALUES(?,?,?,?,?,?,?,?,?)',[uid,pid,family_id,lname,price,spec,color,count,pic_hover],(err,result)=>{
                if(err) throw err;
                res.send({code:1,msg:"添加成功"});
            })
        }else{
            //6购买了就修改数量
            pool.query('UPDATE bsd_cart SET count=count+1 WHERE uid=? AND pid=? AND spec=? AND color=?',[uid,pid,spec,color],(err,result)=>{
                if(err) throw err;
                res.send({code:1,msg:"添加成功"});
            })
        }
    })  
})

//从购物车获取数据
router.get("/v1/getproduct",(req,res)=>{
    var uid=req.session.uid;
    pool.query('SELECT * FROM bsd_cart WHERE uid=?',[uid],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:"查询成功",data:result});  
    })
})

//从购物车删除（一个）数据
router.get("/v1/delproduct",(req,res)=>{
    var cid=req.query.cid;
    pool.query('DELETE FROM bsd_cart WHERE cid = ?',[cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"})
        }else{
            res.send({code:-1,msg:"删除失败"})
        }
    })
});

//从购物车删除多个数据
router.get("/v1/delproducts",(req,res)=>{
    var cids=req.query.cids;
    pool.query(`DELETE FROM bsd_cart WHERE cid in (${cids})`,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"})
        }else{
            res.send({code:-1,msg:"删除失败"})
        }
    })
})

module.exports=router;
