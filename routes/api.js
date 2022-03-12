const router = require('koa-router')()
const loginMiddleware = require("../middlewares/login")
const userApi = require("../controllers/api/user_api_controller")

router.prefix('/api')

router.get('/',userApi.api)

router.post('/login',userApi.login)

router.post('/register',userApi.register)

router.all('*',loginMiddleware.apiJwtCheck)

router.get('/userinfo',userApi.userinfo)

module.exports = router