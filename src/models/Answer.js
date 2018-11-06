module.exports = (sequelize, DataType) => {
    const Answer = sequelize.define('Answer', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                min: 5, 
                max: 255,
                notEmpty: true
            }
        },
        userId: {
            type: DataType.INTEGER,
            references: {
                models: 'Users',
                key: 'id'
            }
        },
        claimId: {
            type: DataType.INTEGER,
            references: {
                models: 'Claims',
                key: 'id'
            }
        }
    });
    Answer.associate = models => {
        Answer.belongsTo(models.Claim, { as: 'Claim', foreignKey: 'claimId' });
        Answer.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Answer;
}