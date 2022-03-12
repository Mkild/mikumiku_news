module.exports = {
    authcheck:async(ctx,next)=>{
        if(ctx.session.rolename != "管理员"){
           await ctx.render('nopath',{
               message:"没有权限"
           })
        }else{
            await next();
        }
    },
    authcheck2:async(ctx,next)=>{
        if(ctx.session.rolename != "编辑"){
           await ctx.render('nopath',{
               message:"没有权限"
           })
        }else{
            await next();
        }
    },
    authcheck3:async(ctx,next)=>{
        if(ctx.session.rolename != "审核"){
           await ctx.render('nopath',{
               message:"没有权限"
           })
        }else{
            await next();
        }
    }
}