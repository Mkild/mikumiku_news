const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const log4js = require('./logs/log4js_config')
const passport = require('./config/passport_config')
const favicon = require('koa-favicon')

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const errorhandle = require('./middlewares/error')
const cors = require('koa2-cors')

// cors跨域处理
app.use(
  cors({
      origin: function(ctx) { //设置允许来自指定域名请求
          if (ctx.url === '/api/test') {
              return '*'; // 允许来自所有域名请求
          }
          return 'http://localhost:3000'; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

// 加载favicon.ico
app.use(favicon(__dirname + '/public/images/maria_favicon.ico'));

// session配置
const sessionConfig = {
    key: 'koa:sess', // cookie key (默认koa：sess)
    maxAge: 86400000, // cookie的过期时间,毫秒，默认为1天
    overwrite: true, // 是否覆盖    (默认default true)
    httpOnly: false, // cookie是否只有服务器端可以访问,默认为true
    signed: true, // 签名默认true
    rolling: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false, // (boolean) 会话即将到期时,续订会话
};
// 使用session
app.keys = ['secret'];
app.use(session(sessionConfig, app));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// ejs
app.use(views(path.join(__dirname,'views'),{
  map : {html:'ejs'}
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  log4js.resLogger(ctx, ms);
})

// koa-passport
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use(index.routes(), index.allowedMethods()) 
app.use(users.routes(), users.allowedMethods())
app.use(api.routes(),api.allowedMethods())
app.use(errorhandle);

// error-handling
app.on('error', (err, ctx) => {
  log4js.errLogger(ctx, err)
  console.error('server error', err, ctx)
});

module.exports = app