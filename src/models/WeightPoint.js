module.exports = (sequelize, DataType) => {
    const PointWeight = sequelize.define('PointWeight', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        weight: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 0
            }
        },
        totalPoints: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 0
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
    PointWeight.associate = models => {
        PointWeight.belongsTo(models.Material, { as: 'Material', foreignKey: 'materialId' });
    };
    return PointWeight;
}