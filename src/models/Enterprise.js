module.exports = (sequelize, DataType) => {
    const Enterprise = sequelize.define('Enterprise', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RUC: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                min: 8
            }
        },
        name: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 5,
                max: 255    
            }
        },
        phone: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 7
            }
        }
    });
    Enterprise.associate = models => {
        Enterprise.hasMany(models.Discount, { foreignKey: 'enterpriseId' });
    };
    return Enterprise;
}