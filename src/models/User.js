module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
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
                max: 255
            }
        },
        surname: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 255
            }
        },
        age: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 18,
                max: 120
            }
        },
        dni: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 7
            }
        },
        phone: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 7
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                min: 10,
                max: 255
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 5,
                max: 50
            }
        },
        points: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    });
    User.associate = models => {
        User.hasMany(models.Claim, { foreignKey: 'userId' });
    };
    return User;
};