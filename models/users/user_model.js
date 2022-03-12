module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'user',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_name:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'user_name'
            },
            user_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id'
            }, 
            password:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            salt:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'salt'
            },
            user_state:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'user_state'
            },
        }, 
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
}
