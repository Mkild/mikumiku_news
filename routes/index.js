const router = require('koa-router')()
const indexController = require('../controllers/indexController')
const loginMiddleware = require("../middlewares/login")

router.get('/', indexController.index)

router.get('/politic', indexController.politic)

router.get('/military', indexController.military)

router.get('/economic', indexController.economic)

router.get('/ent', indexController.ent)

router.get('/culture', indexController.culture)

router.get('/game', indexController.game)

router.post('/search', indexController.search)

router.get('/searchresult', indexController.searchresult)

router.get('/newcontent/:id', indexController.newcontent)

router.get('/uploadthumb', indexController.uploadthumb)

router.all("/newcontent/*",loginMiddleware.loginstats)

router.post('/newcontent/writecomment', indexController.writecomment)

module.exports = router
