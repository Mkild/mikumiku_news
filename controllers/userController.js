const { userDao } = require("../services/userService")
const { newsDao } = require("../services/newService")
const passport = require('../config/passport_config')
const encryption = require('../lib/encryption')

module.exports = {
  users:async (ctx, next) => {
    ctx.session.news_id = ''
    await ctx.render('users', {
      title: '用户系统',
      name: ctx.session.name,
      Rmessage: ctx.session.Rmessage,
      rolename: ctx.session.rolename
    })
    ctx.session.Rmessage = '';
  },

    login:async (ctx, next) => {
      let msg = '';
      if(ctx.session.code == 201){
        msg = '账号或密码错误,请重新输入'
        ctx.session.code = ''
      }else{
        msg = ''
        ctx.session.message = ''
      }
      await ctx.render('login', {
        msg:msg,
        message:ctx.session.message
      })
      ctx.session.message = ''
    },

    register:async (ctx, next) => {
      let msg = '';
      if(ctx.session.Rcode == 201){
        msg = '未正确输入或此UserID已被使用,请重新输入'
        ctx.session.Rcode = ''
      }else{
        msg = ''
        ctx.session.Rmessage = ''
      }
      await ctx.render('register', {
        msg:msg,
        Rmessage:ctx.session.Rmessage
      })
      ctx.session.Rmessage = ''
    },

    deleteuser:async (ctx, next) => {
      let msg = '';
      if(ctx.session.Dcode == 201){
        msg = '未正确输入或此UserID不存在,请重新输入'
        ctx.session.Dcode = ''
      }
      await ctx.render('deleteuser', {
        msg:msg,
        Dmessage:ctx.session.Dmessage,
        Did:ctx.session.Did
      })
      ctx.session.Dmessage = ''
      ctx.session.Did = ''
    },

    restoreuser:async (ctx, next) => {
      let msg = '';
      if(ctx.session.Scode == 201){
        msg = '未正确输入或此UserID不存在,请重新输入'
        ctx.session.Scode = ''
      }
      await ctx.render('restoreuser', {
        msg:msg,
        Smessage:ctx.session.Smessage,
        Sid:ctx.session.Sid
      })
      ctx.session.Smessage = ''
      ctx.session.Sid = ''
    },

    updateuser:async (ctx, next) => {
      let msg = '';
      if(ctx.session.Ucode == 201){
        msg = '未正确输入或此UserID不存在,请重新输入'
        ctx.session.Ucode = ''
      }
      await ctx.render('updateuser', {
        msg:msg,
        Umessage:ctx.session.Umessage,
      })
      ctx.session.Umessage = ''
    },

checklogin:async (ctx, next) => {
  return passport.authenticate('local',async(err,user,info) => {
    if(err){
      await ctx.render('error',{
        message:'登录验证失败',
        error:err
      })
    }
    if(user){
      ctx.login(user)
      ctx.session.name = user.user_name;
      ctx.session.user_id = user.user_id;
      ctx.session.id = user.id;
      let user_id = user.user_id;
      let data = await userDao.getUserRoleInfo(user_id);
      ctx.session.rolename = data.role.role_name;
      if(ctx.session.news_id){
        let news_id = parseInt(ctx.session.news_id);
        ctx.response.redirect('/newcontent/'+news_id);
      }else{
        ctx.response.redirect('/users');
      }
    }else{
      ctx.session.code = 201;
      ctx.response.redirect('/users/login');
    }
  })(ctx)
},

checkregister:async (ctx, next) => {
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

friendlist:async (ctx, next) => {
  let data = await userDao.getUserFriends(ctx.state.user.user_id);
  await ctx.render('friendlist',{
    friendsData:data
  })
},

nopath:async (ctx, next) => {
  await ctx.render('nopath',{
    message:"没有权限"
  })
},

newcontrol:async (ctx, next) => {
  let data = await newsDao.getNewsInfo();
  await ctx.render('newcontrol',{
    data: data,
    name: ctx.session.name,
    id: ctx.session.id,
    rolename: ctx.session.rolename
  })
},

writenew:async (ctx, next) => {
  let msg = ""
  if(ctx.session.pcode == 201){
     msg = "发表失败"
  }
  if(ctx.session.pcode == 200){
    msg = "发表成功"
 }
 ctx.session.pcode = ""
  await ctx.render('writenew',{
    name: ctx.session.name,
    id: ctx.session.id,
    msg: msg
  })
},

publishnew:async (ctx, next) => {
  let {author,author_brief,category_id,title,cardtext,update_time,cover,textvalue} = ctx.request.body;
  let editor_id = ctx.session.id;
  if(editor_id && author && author_brief && category_id && title && cardtext && update_time && cover && textvalue){
  await newsDao.insertText(textvalue);
  let text = await newsDao.getText(textvalue);
  let text_id = text.id;
  if(text_id){
    await newsDao.insertNewsInfo(editor_id,author,author_brief,category_id,title,cardtext,text_id,update_time,cover);
    ctx.session.pcode = 200;
    ctx.response.redirect('/users/newcontrol/writenew');
  }else{
    ctx.session.pcode = 201;
    ctx.response.redirect('/users/newcontrol/writenew');
  }
  }else{
    ctx.session.pcode = 201;
    ctx.response.redirect('/users/newcontrol/writenew');
  }
},

updatenew:async (ctx, next) => {
  let msg = ""
  if(ctx.session.ucode == 201){
     msg = "修改失败"
  }
  if(ctx.session.ucode == 200){
    msg = "修改成功"
 }
 ctx.session.ucode = ""
  await ctx.render('updatenew',{
    name: ctx.session.name,
    id: ctx.session.id,
    msg: msg
  })
},

checkupdnew:async (ctx, next) => {
  let {id,author,author_brief,category_id,title,cardtext,update_time,cover,textvalue} = ctx.request.body;
  let editor_id = ctx.session.id;
  if(id && editor_id && author && author_brief && category_id && title && cardtext && update_time && cover && textvalue){
  let data = await newsDao.getNews(id);
  if(data){
    await newsDao.updateText(id,textvalue);
    await newsDao.updateNewsInfo(id,editor_id,author,author_brief,category_id,title,cardtext,update_time,cover);
    ctx.session.ucode = 200;
    ctx.response.redirect('/users/newcontrol/updatenew');
  }else{
    ctx.session.ucode = 201;
    ctx.response.redirect('/users/newcontrol/updatenew');
  }
  }else{
    ctx.session.ucode = 201;
    ctx.response.redirect('/users/newcontrol/updatenew');
  }
},

deletenew:async (ctx, next) => {
  let msg = ""
  if(ctx.session.dcode == 201){
     msg = "删除失败"
  }
  if(ctx.session.dcode == 200){
    msg = "删除成功"
 }
 ctx.session.dcode = ""
  await ctx.render('deletenew',{
    name: ctx.session.name,
    id: ctx.session.id,
    msg: msg
  })
},

checkdelnew:async (ctx, next) => {
  let {id} = ctx.request.body;
  if(id){
  let data = await newsDao.getNews(id);
  if(data){
    await newsDao.deleteNewsInfo(id);
    ctx.session.dcode = 200;
    ctx.response.redirect('/users/verifycontrol/deletenew');
  }else{
    ctx.session.dcode = 201;
    ctx.response.redirect('/users/verifycontrol/deletenew');
  }
  }else{
    ctx.session.dcode = 201;
    ctx.response.redirect('/users/verifycontrol/deletenew');
  }
},

verifynew:async (ctx, next) => {
  ctx.session.news_id = ''
  let data = await newsDao.getVerifiedNews();
  await ctx.render('verifynew',{
    data: data,
    name: ctx.session.name,
    id: ctx.session.id
  })
},

verifycontent:async (ctx, next) => {
  ctx.session.news_id = ''
  let id = parseInt(ctx.params.id);
  let data = await newsDao.verifyNewcontent(id);
  let thumb = await newsDao.getNewsThumb(data.id);
  let comment = await newsDao.getAllComment(data.id);
  let num = await newsDao.getCommentNum(data.id);
  let msg = '';
  if(ctx.session.comment_code == 201){
    msg = '评论失败，请输入内容！'
  }
  if(ctx.session.comment_code == 200){
    msg = '评论成功!'
  }
  ctx.session.comment_code = ""
  await ctx.render('newcontent', {
    name: ctx.session.name,
    data: data,
    thumb: thumb,
    comment: comment,
    num: num,
    msg: msg
  })
},

checkvefnew:async (ctx, next) => {
  let {id} = ctx.request.body;
  await newsDao.verifyNewsInfo(id);
  ctx.response.redirect('/users/verifycontrol/verifynew');
},

usercontrol:async (ctx, next) => {
  await ctx.render('usercontrol',{
  })
},

checkdeluser:async (ctx, next) => {
  let {user_id} = ctx.request.body;
  let data = await userDao.getUserInfo(user_id);
  if(user_id && data && data.user_state === "正常"){
    await userDao.deleteUserInfo(user_id);
    ctx.session.Did = user_id;
    ctx.session.Dmessage = "删除成功，此UserID的用户已被注销：";
    ctx.response.redirect('/users/usercontrol/deleteuser');
  }else{
    ctx.session.Dmessage = "删除失败";
    ctx.session.Dcode = 201;
    ctx.response.redirect('/users/usercontrol/deleteuser');
  }
},

checkreuser:async (ctx, next) => {
  let {user_id} = ctx.request.body;
  let data = await userDao.getUserInfo(user_id);
  if(user_id && data.user_state === "已注销"){
    await userDao.restoreUserInfo(user_id);
    ctx.session.Sid = user_id;
    ctx.session.Smessage = "恢复成功，此UserID的用户已被恢复：";
    ctx.response.redirect('/users/usercontrol/restoreuser');
  }else{
    ctx.session.Smessage = "恢复失败";
    ctx.session.Scode = 201;
    ctx.response.redirect('/users/usercontrol/restoreuser');
  }
},

checkupduser:async (ctx, next) => {
  let {user_id,username,password,role_id} = ctx.request.body;
  let data = await userDao.getUserInfo(user_id); 
  if(user_id && username && password && role_id && data && isNaN(user_id)==false){
    let salt = await encryption.getUuid();
    let enpsss = await encryption.MD5(password,salt);
    await userDao.updateUserInfo(user_id,username,enpsss,salt);
    await userDao.updateUserRoleInfo(user_id,role_id);
    ctx.session.Umessage = "修改成功";
    ctx.response.redirect('/users/usercontrol/updateuser');
  }else{
    ctx.session.Umessage = "修改失败";
    ctx.session.Ucode = 201;
    ctx.response.redirect('/users/usercontrol/updateuser');
  }
},

userlist:async (ctx, next) => {
  let data = await userDao.getAllUserInfo();
  let data2 = await userDao.getAllRoleIDInfo();
  await ctx.render('userlist',{
    userlist:data,
    roleid:data2
  })
},

loginout:async (ctx, next) => {
  ctx.logout()
  ctx.session.name = '';
  if(ctx.session.news_id){
    let news_id = parseInt(ctx.session.news_id);
    ctx.response.redirect('/newcontent/'+news_id);
  }else{
    ctx.response.redirect('/');
  }  
}

}
