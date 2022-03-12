const {user,role,user_role,address,user_friends,user_info,text,category,news,comment,thumb} = require('../models/index')
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

class newsDao {
    static async getNewcontent(id){
        return await news.findOne({
            include:[
                {model:text},
                {model:user}
            ],
            where:{
                id:id,
                verified:"1"
            }
        })
    }

    static async verifyNewcontent(id){
        return await news.findOne({
            include:[
                {model:text},
                {model:user}
            ],
            where:{
                id:id,
                verified:"0"
            }
        })
    }

    static async getAllNews(){
        return await news.findAll({
            where:{
                verified:"1"
            },
            order:[
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

    static async getVerifiedNews(){
        return await news.findAll({
            where:{
                verified:"0"
            },
            order:[
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

    static async getNews(id){
        return await news.findOne({
            where:{
                id:id,
                verified:"1"
            }
        })
    }

    static async getNewsInfo(){
        return await news.findAll({
            include:[
                {model:category},
                {model:user}
            ]
        })
    }

    static async insertText(textvalue){
        return await text.create({
            text:textvalue
        })
    }

    static async getText(textvalue){
        return await text.findOne({
            where:{
                text:textvalue
            }
        })
    }

    static async updateText(id,textvalue){
        return await text.update({
            text:textvalue
        },{
            'where':{
                'id':id
            }
        }
        )
    }

    static async insertNewsInfo(editor_id,author,author_brief,category_id,title,cardtext,text_id,update_time,cover){
        return await news.create({
            editor_id: editor_id,
            author: author,
            author_brief: author_brief,
            category_id: category_id,
            title: title,
            cardtext: cardtext,
            text_id: text_id,
            update_time: update_time,
            cover: cover,
            verified: "0"
        })
    }

    static async updateNewsInfo(id,editor_id,author,author_brief,category_id,title,cardtext,update_time,cover){
        return await news.update({
            editor_id: editor_id,
            author: author,
            author_brief: author_brief,
            category_id: category_id,
            title: title,
            cardtext: cardtext,
            update_time: update_time,
            cover: cover,
            verified: "0"
        },{
            'where':{
                'id':id
            }
        }
        )
    }

    static async deleteNewsInfo(id){
        return await news.update({
            verified:"0"
        },{
            'where':{
                'id':id
            }
        }
        )
    }

    static async verifyNewsInfo(id){
        return await news.update({
            verified:"1"
        },{
            'where':{
                'id':id
            }
        }
        )
    }

    static async getSearchNews(search){
        return await news.findAll({
            where:{
                verified:"1",
                title: {
                    [Op.like]:'%' + search + '%'
                  }
            },
            order:[
                ['update_time', 'DESC']
            ],
            limit: 5,
            offset: 0
            
        })
    }

    static async getNewsEditor(editor_id){
        return await user.findOne({
            where:{
                id:editor_id
            }
        })
    }

    static async getNewsThumb(news_id){
        return await thumb.count({
            where:{
                news_id:news_id
            }
        })
    }

    static async insertThumb(news_id){
        return await thumb.create({
            news_id:news_id
        })
    }

    static async getAllComment(news_id){
        return await comment.findAll({
            include:[{
                model:user
            }],
            where:{
                news_id:news_id
            }
        })
    }

    static async getCommentNum(news_id){
        return await comment.count({
            where:{
                news_id:news_id
            }
        })
    }

    static async insertComment(user_id,news_id,content){
        return await comment.create({
            user_id:user_id,
            news_id:news_id,
            content:content
        })
    }

    static async getAllPolitics(){
        return await news.findAll({
            where:{
                verified:"1",
                category_id:"1"
            },
            order: [
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

    static async getAllMilitarys(){
        return await news.findAll({
            where:{
                verified:"1",
                category_id:"2"
            },
            order: [
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

    static async getAllEconomics(){
        return await news.findAll({
            where:{
                verified:"1",
                category_id:"3"
            },
            order: [
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

    static async getAllEnts(){
        return await news.findAll({
            where:{
                verified:"1",
                category_id:"4"
            },
            order: [
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

    static async getAllCultures(){
        return await news.findAll({
            where:{
                verified:"1",
                category_id:"5"
            },
            order: [
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

    static async getAllGames(){
        return await news.findAll({
            where:{
                verified:"1",
                category_id:"6"
            },
            order: [
                ['update_time', 'DESC']
            ],
            raw:true
        })
    }

}

module.exports ={
    newsDao
}