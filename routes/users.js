const router = require('koa-router')()
const loginMiddleware = require("../middlewares/login")
const authMiddleware = require("../middlewares/authcheck")
const userController = require("../controllers/userController")

router.prefix('/users')

router.get('/', userController.users)

router.get('/login',userController.login)

router.get('/register',userController.register)

router.post('/checklogin',userController.checklogin)

router.post('/checkregister',userController.checkregister)

router.get('/loginout',userController.loginout)

router.all("*",loginMiddleware.loginstats)

router.get('/userinfo',userController.userinfo)

router.get('/friendlist',userController.friendlist)

router.get('/nopath',userController.nopath)

router.all("/newcontrol/*",authMiddleware.authcheck2)

router.get('/newcontrol',userController.newcontrol)

router.get('/newcontrol/writenew',userController.writenew)

router.post('/newcontrol/publishnew',userController.publishnew)

router.get('/newcontrol/updatenew',userController.updatenew)

router.post('/newcontrol/checkupdnew',userController.checkupdnew)

router.all("/verifycontrol/*",authMiddleware.authcheck3)

router.get('/verifycontrol/deletenew',userController.deletenew)

router.post('/verifycontrol/checkdelnew',userController.checkdelnew)

router.get('/verifycontrol/verifynew',userController.verifynew)

router.get('/verifycontrol/verifycontent/:id',userController.verifycontent)

router.post('/verifycontrol/checkvefnew',userController.checkvefnew)

router.all("*",authMiddleware.authcheck)

router.get('/usercontrol',userController.usercontrol)

router.get('/usercontrol/deleteuser',userController.deleteuser)

router.get('/usercontrol/restoreuser',userController.restoreuser)

router.get('/usercontrol/updateuser',userController.updateuser)

router.post('/usercontrol/checkdeluser',userController.checkdeluser)

router.post('/usercontrol/checkreuser',userController.checkreuser)

router.post('/usercontrol/checkupduser',userController.checkupduser)

router.get('/usercontrol/userlist',userController.userlist)

module.exports = router
