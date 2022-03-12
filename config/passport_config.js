const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const { userDao } = require("../services/userService")
const config = require('../config/default.js')
const encryption = require('../lib/encryption')

passport.use(new LocalStrategy({
    usernameField:"user_id",
    passwordField:"password"
},
async function(username,password,done){
    let result = await userDao.getUserInfo(username)
    if(result){
        let enpsss = await encryption.MD5(password,result.salt);
        if(enpsss === result.password && result.user_state === "正常"){
        return done(null,result,'登录成功')
        }else{
            return done(null,false,'登录失败')
        }
    }else{
        return done(null,false,'登录失败')
    }
}
))

// serializeUser在用户登录验证成功以后将会把用户的数据存储到session中
passport.serializeUser(function (user, done){
    //保护密码
    user.password=''
    console.log('user:' + user);
    done(null, user)
})

// deserializeUser在每次请求的时候将从session中读取用户对象 
passport.deserializeUser(function (user, done){
    done(null, user)
})

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

passport.use(new JwtStrategy(opts,async(jwt_payload,done) => {
    // jwt_payload 返回的是登录时返回的数据 即payload
    const user=await userDao.getUser(jwt_payload.id);
    if(user){
        return done(null,user,'验证成功');
    }else{
        return done(null,false,'验证失败');
    }
}
))

module.exports = passport