const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Material = sequelize.define('Material', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    budget_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Budgets',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
	total: {
		type: DataTypes.FLOAT,
		allowNull: false
	}
  });

//   Material.associate = (models) => {
//     Material.belongsTo(models.Project, {
//       foreignKey: 'budget_id',
//       as: 'project',
//     });
//   };

  return Material;
};
