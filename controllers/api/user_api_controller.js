const jwt = require('jsonwebtoken')
const encryption = require("../../lib/encryption")
const { userDao } = require('../../services/userService')
const config = require('../../config/default.js')

module.exports = {

    login:async(ctx,next) => {
        if(ctx.request.body.user_id && ctx.request.body.password){
            var user_id = ctx.request.body.user_id;
            var password = ctx.request.body.password;
            let user = await userDao.getUserInfo(user_id);
            if(!user){
                ctx.status = 401;
                ctx.body = {message: '该用户不存在'}
            }else{
                let enpsss = await encryption.MD5(password,user.salt);
                if(user.password === enpsss){
                    var payload = {id:user.id};
                    var token = jwt.sign(payload, config.secretKey,{expiresIn:3600});
                    ctx.status = 200;
                    ctx.body = {
                        message: '验证成功',
                        token: 'Bearer ' + token
                    }
                }else{
                    ctx.status = 500;
                    ctx.body = {message: '密码错误'}
                }
            }
        }else{
            ctx.status = 500;
            ctx.body = {message: '账号密码错误'};
        }
    },

    register:async (ctx, next) => {
        let {user_id,username,password} = ctx.request.body;
        let data = await userDao.getUserInfo(user_id); 
        if(user_id && username && password && !data && isNaN(user_id) == false){
          let salt = await encryption.getUuid();
          let enpsss = await encryption.MD5(password,salt);
          await userDao.insertUserInfo(user_id,username,enpsss,salt);
          await userDao.insertUserRoleInfo(user_id);
          ctx.session.Rmessage = "注册成功,请登录";
          ctx.response.redirect('/users');
        }else{
          ctx.session.Rmessage = "注册失败";
          ctx.session.Rcode = 201;
          ctx.response.redirect('/users/register');
        }
      },

    userinfo:async (ctx, next) => {
        let adData = await userDao.getUserAddress(ctx.state.user.user_id);
        let infoData = await userDao.getUserDetailedinfo(ctx.state.user.user_id);
        await ctx.render('userinfo',{
          message:"用户信息",
          name: ctx.session.name,
          rolename: ctx.session.rolename,
          adData:adData,
          infoData:infoData
        })
      },

    api:async (ctx, next) => {
        ctx.body = 'this is a api!'
    }

}
