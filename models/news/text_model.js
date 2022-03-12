module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'text',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            text:{
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'text'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}