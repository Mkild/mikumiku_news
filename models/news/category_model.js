module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'category',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            tag:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'tag'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}