module.exports = async(ctx,next) => {
    try{
        await next();
        if(ctx.status === 404){
            ctx.throw(404);
        }
    }catch(err){
        console.error(err.stack);
        const stauts = err.status || 500;
        ctx.status = stauts;
        if(stauts === 404){
            await ctx.render('error',{
                message:'页面去火星了',
                error:err
            })
        }else if(stauts === 500){
            await ctx.render('error',{
                message:'服务器罢工了',
                error:err
            })
        }else{
            await ctx.render('error',{
                message:'工程师正在分析这个问题',
                error:err
            }) 
        }
    }
}