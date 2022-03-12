module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'address',
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
            address:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'address'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}