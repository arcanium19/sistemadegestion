const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Material = sequelize.define('Material', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Projects',
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
    }
  });

  Material.associate = (models) => {
    Material.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });
  };

  return Material;
};
