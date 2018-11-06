module.exports = (sequelize, DataType) => {
    const Discount = sequelize.define('Discount', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 5,
                max: 255
            }
        },
        mount: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 0
            }
        },
        points: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 0
            }
        },
        userId: {
            type: DataType.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
       enterpriseId: {
           type: DataType.INTEGER,
           references: {
               model: 'Enterprises',
               key: 'id'
           }
       } 
    });
    Discount.associate = models => {
        Discount.belongsTo(models.Enterprise, { foreignKey: 'enterpriseId' });
        Discount.belongsTo(models.User, { foreignKey: 'userId' });    
    };
    return Discount;
}