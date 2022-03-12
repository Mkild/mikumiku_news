const passport = require("../config/passport_config");

module.exports = {
    loginstats:async(ctx,next) => {
        if(!ctx.isAuthenticated()){
            ctx.response.redirect('/users/login');
        }else{
            await next();
        }
    },

    apiJwtCheck:async(ctx,next) => {
        return passport.authenticate('jwt',{ session: false },async(err,user,info) => {
            if(err){
                ctx.status = 501;
                ctx.body = {message: 'jwt无法完成验证'};
            }
            if(!user){
                ctx.status = 401;
                ctx.body = {
                    status: ctx.status,
                    message: info + '无权访问'
                };
            }else{
                ctx.state.user = user;
                await next();
            }
        })(ctx,next)
    }
}