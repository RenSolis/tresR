module.exports = (sequelize, DataType) => {
    const MaterialMarker = sequelize.define('MaterialMarker', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        latitude: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        longitude: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    MaterialMarker.associate = models => {
        MaterialMarker.hasMany(models.Material, { foreignKey: 'materialMarkerId' });
    };
    return MaterialMarker;
}