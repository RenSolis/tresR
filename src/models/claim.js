module.exports = (sequelize, DataType) => {
    const Claim = sequelize.define('Claim', {
        
        name:{
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
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

        claim: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 255 
            }
        }

    });
    return Claim;
};