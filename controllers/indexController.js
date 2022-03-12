const { userDao } = require("../services/userService")
const { newsDao } = require("../services/newService")

module.exports = {
      index:async (ctx, next) => {
        ctx.session.news_id = ''
        let data = await newsDao.getAllNews();
        await ctx.render('index', {
          name: ctx.session.name,
          data: data
        })
      },

      politic:async (ctx, next) => {
        ctx.session.news_id = ''
        let data = await newsDao.getAllPolitics();
        await ctx.render('politic', {
          name: ctx.session.name,
          data: data
        })
      },

      military:async (ctx, next) => {
        ctx.session.news_id = ''
        let data = await newsDao.getAllMilitarys();
        await ctx.render('military', {
          name: ctx.session.name,
          data: data
        })
      },

      economic:async (ctx, next) => {
        ctx.session.news_id = ''
        let data = await newsDao.getAllEconomics();
        await ctx.render('economic', {
          name: ctx.session.name,
          data: data
        })
      },

      ent:async (ctx, next) => {
        ctx.session.news_id = ''
        let data = await newsDao.getAllEnts();
        await ctx.render('ent', {
          name: ctx.session.name,
          data: data
        })
      },

      culture:async (ctx, next) => {
        ctx.session.news_id = ''
        let data = await newsDao.getAllCultures();
        await ctx.render('culture', {
          name: ctx.session.name,
          data: data
        })
      },

      game:async (ctx, next) => {
        ctx.session.news_id = ''
        let data = await newsDao.getAllGames();
        await ctx.render('game', {
          name: ctx.session.name,
          data: data
        })
      },

      search:async (ctx, next) => {
        let {search} = ctx.request.body;
        if(search){
        let data = await newsDao.getSearchNews(search);
        ctx.session.data = data;
        ctx.session.search = search;
        ctx.response.redirect('/searchresult');
        }else{
          let news_id = ctx.session.news_id;
          if(news_id){
            ctx.response.redirect('/newcontent/'+news_id);
          }else{
            ctx.response.redirect('/');
          }
        }
      },

      searchresult:async (ctx, next) => {
        await ctx.render('searchresult', {
          name: ctx.session.name,
          data: ctx.session.data,
          search: ctx.session.search,
        })
      },

      newcontent:async (ctx, next) => {
        let id = parseInt(ctx.params.id);
        let data = await newsDao.getNewcontent(id);
        let thumb = await newsDao.getNewsThumb(data.id);
        let comment = await newsDao.getAllComment(data.id);
        let num = await newsDao.getCommentNum(data.id);
        ctx.session.news_id = data.id;
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

      uploadthumb:async (ctx, next) => {
        let news_id = parseInt(ctx.session.news_id);
        await newsDao.insertThumb(news_id);
        ctx.response.redirect('/newcontent/'+news_id+'#thumb');
      },

      writecomment:async (ctx, next) => {
        let {content} = ctx.request.body;
        let news_id = ctx.session.news_id;
        let user_id = ctx.session.id;
        if(content && news_id && user_id){
          await newsDao.insertComment(user_id,news_id,content);
          ctx.session.comment_code = 200;
          ctx.response.redirect('/newcontent/'+news_id+'#newid');
        }else{
          ctx.session.comment_code = 201;
          ctx.response.redirect('/newcontent/'+news_id+'#newid');
        }
      },

}