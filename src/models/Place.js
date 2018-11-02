module.exports = (sequelize, DataType) => {
    const Place = sequelize.define('Place', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        district: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 255
            }
        },
        urbanization: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 255
            }
        },
        street: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 255
            }
        },
        reference: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 255
            }
        },
        materialId: {
            type: DataType.INTEGER,
            references: {
                model: 'Materials',
                key: 'id'
            }
        }
    });
    Place.associate = models => {
        Place.belongsTo(models.Material, { as: 'Material', foreignKey: 'materialId' });
    };
    return Place;
}