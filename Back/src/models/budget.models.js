const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Budget = sequelize.define('Budget', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    work_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    objective: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finish_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    accessories: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    extra_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });

  Budget.associate = (models) => {
    Budget.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
    Budget.hasOne(models.Project, {
      foreignKey: 'budget_id',
      as: 'project',
    });
  };

  return Budget;
};
