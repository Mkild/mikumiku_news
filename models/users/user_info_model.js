module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'user_info',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id:{
                type: DataTypes.INTEGER,
                field: 'user_id'
            },
            user_name:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'user_name'
            }, 
            sex:{
                type: DataTypes.STRING,
                field: 'sex'
            },
            skill:{
                type: DataTypes.STRING,
                field: 'skill'
            },
            msg:{
                type: DataTypes.STRING,
                field: 'msg'
            },
            imgurl:{
                type: DataTypes.STRING,
                field: 'imgurl'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}