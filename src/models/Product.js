module.exports = (sequelize,DataType)=>{
	const Product = sequelize.define("Product", {
		id:{
		
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		
		},

		name:{
		
			type: DataType.STRING,
			allowNull: false,
			validate:{
				notEmpty: true,
				min: 0
			}
		},

		description:{

			type: DataType.STRING,
			allowNull: false,
			validate:{
				min: 15,
				notEmpty: true
			}
		},

		price:{
			
			type: DataType.INTEGER,
			allowNull: false,
			validate:{
				min: 0,
				notEmpty: true
			}
		
		},

		stock:{

			type: DataType.INTEGER,
			allowNull: false,
			validate:{
				min:0,
				notEmpty: true
			}
		},

		categoryId:{

			type: DataType.INTEGER,
			references:{
				model: "Categories",
				key: "id"
			} 
		}



	});
	Product.associate = models=>{
		Product.belongsTo(models.Category, { as: 'Category', foreignKey: 'categoryId' });
	}
	return Product;
}