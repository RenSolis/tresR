module.exports = (sequelize, DataType) => {
	const Category = sequelize.define('Category', {		
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
				min: 0
			}
		}
	});
	Category.associate = models => {
		Category.hasMany(models.Product, {as: 'Category', foreignKey: 'categoryId' });
	}
	return Category;
}