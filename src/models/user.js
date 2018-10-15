module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            validate: {
                defaultValue: 0,
                min: 0
            }
        }
    });
    return User;
};