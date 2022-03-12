module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'comment',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id'
            },
            news_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'news_id'
            },
            content:{
                type: DataTypes.STRING,
                field: 'content'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}