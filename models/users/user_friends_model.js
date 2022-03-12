module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'user_friends',
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
            friend_id:{
                type: DataTypes.INTEGER,
                field: 'friend_id'
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}