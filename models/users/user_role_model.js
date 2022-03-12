module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'user_role',
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
            role_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'role_id'
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}