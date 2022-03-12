const {user,role,user_role,address,user_friends,user_info} = require('../models/index') 

class userDao {
    static async getUser(id){
        return await user.findOne({
            where:{
                id
            }
        })
    }

    static async getUserInfo(user_id){
        return await user.findOne({
            where:{
                user_id
            }
        })
    }

    static async getAllUserInfo(){
        return await user.findAll({
            raw:true
        })
    }

    static async getAllRoleIDInfo(){
        return await role.findAll({
            include:[{
                model:user_role
            }],
            order: [
                [user_role,'id', 'ASC']
            ],
            raw:true
        })
    }
    
    static async getUserRoleInfo(user_id){
        return await user_role.findOne({
            include:[{
                model:role
            }],
            where:{
                user_id
            }
        })
    }

    static async insertUserInfo(user_id,username,password,salt){
        return await user.create({
            user_id:user_id,
            user_name:username,
            password:password,
            salt:salt,
            user_state:"正常"
        })
    }

    static async insertUserRoleInfo(user_id){
        return await user_role.create({
            user_id:user_id,
            role_id:'2'
        })
    }

    static async deleteUserRoleInfo(user_id){
        return await user_role.destroy({
            where:{
                user_id
            }
        })
    }

    static async deleteUserInfo(user_id){
        return await user.update({
            user_state:"已注销"
        },{
            'where':{
                'user_id':user_id
            }
        }
        )
    }

    static async restoreUserInfo(user_id){
        return await user.update({
            user_state:"正常"
        },{
            'where':{
                'user_id':user_id
            }
        }
        )
    }

    static async updateUserInfo(user_id,username,password,salt){
        return await user.update({
            user_name:username,
            password:password,
            salt:salt
        },{
            'where':{
                'user_id':user_id
            }
        }
        )
    }

    static async updateUserRoleInfo(user_id,role_id){
        return await user_role.update({
            role_id:role_id
        },{
            'where':{
                'user_id':user_id
            }
        }
        )
    }

    static async getUserAddress(user_id) {
        return await address.findAll({
            where: {
                user_id
            },
            raw:true
        })
    }

    static async getUserFriends(user_id){
        return await user_friends.findAll({
            include:[{
                model:user_info
            }],
            where:{
                user_id
            }
        })
    }

    static async getUserDetailedinfo(user_id){
        return await user_info.findAll({
            where:{
                user_id
            },
            raw:true
        })
    }
}

module.exports ={
    userDao
}