module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'thumb',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            news_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'news_id'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}