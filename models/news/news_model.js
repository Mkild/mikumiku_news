module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'news',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            editor_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'editor_id'
            },
            author:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'author'
            },
            author_brief:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'author_brief'
            },
            category_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'category_id'
            },
            title:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'title'
            },
            cardtext:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'cardtext'
            },
            text_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'text_id'
            },
            update_time:{
                type: DataTypes.TIME,
                field: 'update_time',
            },
            cover:{
                type: DataTypes.STRING,
                field: 'cover'
            },
            verified:{
                type: DataTypes.INTEGER,
                field: 'verified'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}