//引入Sequelize配置
const Sequelize = require("sequelize")
const db = require('../config/mysql_sequelize')

//引入sequelize对象
const sequelize = db.sequelize

//引入数据表模型
const user = require('../models/users/user_model')(sequelize,Sequelize.DataTypes)
const role = require('../models/users/role_model')(sequelize,Sequelize.DataTypes)
const user_role = require('../models/users/user_role_model')(sequelize,Sequelize.DataTypes)
const address = require('../models/users/address_model')(sequelize,Sequelize.DataTypes)
const user_info = require('../models/users/user_info_model')(sequelize,Sequelize.DataTypes)
const user_friends = require('../models/users/user_friends_model')(sequelize,Sequelize.DataTypes)
const text = require('../models/news/text_model')(sequelize,Sequelize.DataTypes)
const category = require('../models/news/category_model')(sequelize,Sequelize.DataTypes)
const news = require('../models/news/news_model')(sequelize,Sequelize.DataTypes)
const comment = require('../models/news/comment_model')(sequelize,Sequelize.DataTypes)
const thumb = require('../models/news/thumb_model')(sequelize,Sequelize.DataTypes)

//自动创建表
user.sync({ force: false });
user_role.sync({ force: false }); 
role.sync({ force: false }); 
address.sync({ force: false });
user_info.sync({ force: false });
user_friends.sync({ force: false });
text.sync({ force: false });
category.sync({ force: false });
news.sync({ force: false });
comment.sync({ force: false });
thumb.sync({ force: false });

//表关系
user.hasOne(user_role,{
    foreignKey:"user_id",
    sourceKey:'user_id'
})

role.hasMany(user_role,{
    foreignKey:"role_id",
    sourceKey:'id'
})

user_role.belongsTo(role,{
    foreignKey:"role_id",
    targetKey:'id'
})

user.hasMany(address,{
    foreignKey:"user_id",
    sourceKey:'user_id'
})

user.hasMany(user_friends,{
    foreignKey:'user_id',
    sourceKey:'user_id'
})

user_friends.belongsTo(user_info,{
    foreignKey:'friend_id',
    targetKey:'id'
})

user.hasOne(user_info,{
    foreignKey:'user_id',
    sourceKey:'user_id'
})

user.hasOne(user_info,{
    foreignKey:'user_name',
    sourceKey:'user_name'
})

news.belongsTo(text,{
    foreignKey:"text_id",
    targetKey:'id'
})

news.belongsTo(user,{
    foreignKey:"editor_id",
    targetKey:'id'
})

news.belongsTo(category,{
    foreignKey:"category_id",
    targetKey:'id'
})

comment.belongsTo(user,{
    foreignKey:"user_id",
    targetKey:'id'
})

module.exports = {user,role,user_role,address,user_friends,user_info,text,category,news,comment,thumb}