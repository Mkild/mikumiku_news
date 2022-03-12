module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'role',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            role_name:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'role_name'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}