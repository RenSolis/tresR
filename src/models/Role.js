module.exports = (sequelize, DataType) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,            
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }   
        }
    });
    Role.associate = models => {
        Role.hasMany(models.User, { foreignKey: 'roleId' });
    };
    return Role;
}