module.exports = (sequelize, DataType) => {
    const Material = sequelize.define('Material', {
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
        materialMarkerId: {
            type: DataType.INTEGER,
            references: {
                model : 'MaterialMarkers',
                key: 'id'
            }
        }
    });
    Material.associate = models => {
        Material.belongsTo(models.MaterialMarker, { as: 'MaterialMarker', foreignKey: 'materialMarkerId' });
        Material.hasMany(models.Place, { foreignKey: 'materialId' });
        Material.hasOne(models.WeightPoint, { foreignKey: 'materialId' });
    };
    return Material;
}