const { DataTypes } = require('sequelize')

//Corregir tools sea tomado del correspondiente modelo ademas de agregar materiales y dias de trabajo q durará la obra (opcional)
module.exports = (sequelize) => {
	return sequelize.define('Estimate', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		total_cost: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		with_vat: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		tools: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	})
}
