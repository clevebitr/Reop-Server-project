var express = require('express');
const router = express.Router();
const ueModel = require('../models/ueModel');
// const { token } = require('morgan');
const jwt = require('jsonwebtoken');//导入token包
const SECRET_KEY = 'REOPHTMLKEY'//token密钥

//登录
router.post('/login',async(req,res,next)=>{
  try{
    const{upwd,email} = req.body;//提取用户名和密码
    const obj = JSON.parse(JSON.stringify(req.body));//json格式化
    console.log(obj)//输出收到的数据体
    const user = await ueModel.findOne({where:{email}});//查询邮箱是否存在

    //不存在该邮箱
    if(!user){
      console.log(user)
        return res.status(403).json({
          code:403,
          msg:"登录失败,检查账号或密码"
        });
    }
    //存在该邮箱
    if (user.dataValues.upwd==upwd){
      //token生成,2天后过期
      const token = jwt.sign(
        { user: { name:user.dataValues.uname, password:user.dataValues.upwd } },
        SECRET_KEY,//密钥
        { expiresIn: '2 days' }
      )

      console.log('🚀 → token:', token)//输出发出的token

      //设置登录的用户Cookie
      let str = user.dataValues.uname + "|" + user.dataValues.email //登录的用户名称和邮箱
      console.log('Login in:',str);  //输出登录的用户名称
      res.cookie('_user',str, {
          //最大失效时间
          maxAge: 1000 * 60 * 60 * 24 * 2,//2days
          //路径
          path: '/',
          signed:true //加密属性
      });

      return res.status(201).json({
        code:200,
        msg:"登录成功",
        token,
      });

    }else{
      return res.status(403).json({
        code:403,
        msg:"登录失败,检查账号或密码",
      });
    }
  }catch(err){
    next(err);
  }
});

//查询 http://localhost:3000/api/search
router.get('/search',async(req,res,next)=>{
  try{
    const result = await ueModel.findAll({raw:true});

    //读取密文Cookies,输出查询的用户名
    console.log('search user:',req.signedCookies['_user']);
    
    //返回数据
    res.status(200).json({
      code:200,
      msg:result,
    });

  }catch(err){
    next(err);
  }
})

//添加 http://localhost:3000/api/add
router.post('/add',async(req,res,next)=>{
  try{
    const{id,uname,upwd,email,admin} = req.body;
    const user = await ueModel.findOne({where:{email}});
    if (user) {
      return res.status(500).json(
        {
         code:500,
         msg:'该用户已存在'
        }
       );
    }
    await ueModel.create({id,uname,upwd,email,admin});
    res.status(201).json(
     {
      code:201,
      msg:'注册成功'
     }
    );
  }catch(err){
    next(err);
  }
});

//删除 http://localhost:3000/api/delete
router.post('/delete',async(req,res,next)=>{
  try{
    const{id} = req.body;

    //读取密文Cookies,输出删除的用户名
    console.log('search user:',req.signedCookies['_user']);

    await ueModel.destroy({where:{id}});
    res.status(201).json(
      {
       code:201,
       msg:'删除成功'
      }
     );
  }catch(err){
    next(err);
  }
});

//更新 http://localhost:3000/api/update
router.put('/update',async(req,res,next)=>{
  try{
    const{id,uname,upwd,email,admin} = req.body;//处理数据体，提取信息

    const user = await ueModel.findOne({where:{email}});
    if(!user){//查询用户是否存在
        return res.status(500).json(
          {
           code:500,
           msg:'查询失败'
          }
         );
    }

    await user.update({uname,upwd,email,admin});
    res.status(201).json(
      {
       code:201,
       msg:'更新成功'
      }
     );
  }catch(err){
    next(err);
  }
});

//Cookies处理（测试）
//设置密文Cookies
// router.get("/sendData", (req, res) => {
//   //写入缓存
//   let str = "LOGIN"  //数据
//   console.log(str);  //输出结果为周日
//   res.cookie('_user',str, {
//       //最大失效时间
//       maxAge: 1000 * 60 * 60 * 24 * 2,
//       //路径
//       path: '/',
//       signed:true //加密属性
//   });
//   res.send("写入缓存");
// });

// //读取密文Cookies
// router.get("/getcookie", (req, res) => {
//   //加密后使用
//   res.send(req.signedCookies['_user']);
// });

//错误处理
router.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({
    code:500,
    msg:"服务器发生错误"
  });
});

module.exports = router;