module.exports = (sequelize, DataType) => {
    const Claim = sequelize.define('Claim', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       
        name:{
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        dni: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 7
            }
        },
        phone: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 7
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                min: 10,
                max: 255
            }
        },
        claim: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 255 
            }
        },
        userId: {
            type: DataType.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });
    Claim.associate = models => {
        Claim.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
    };
    return Claim;
};