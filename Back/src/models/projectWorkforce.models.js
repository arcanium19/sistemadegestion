const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProjectWorkforce = sequelize.define('Project_Workforce', {
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
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Employees',
        key: 'id',
      },
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bonus_extra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    daily_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  // Hook para calcular daily_rate y subtotal antes de crear o actualizar un registro
  ProjectWorkforce.beforeCreate(async (projectWorkforce, options) => {
    const { Employee } = sequelize.models;

    // Obtener el empleado asociado para cargar la tarifa diaria
    const employee = await Employee.findByPk(projectWorkforce.employee_id);
    if (!employee) {
      throw new Error('Empleado no encontrado');
    }

    // Asignar la tarifa diaria del empleado
    projectWorkforce.daily_rate = employee.daily_rate;

    // Calcular el subtotal
    const bonusExtra = parseFloat(projectWorkforce.bonus_extra || 0);
    projectWorkforce.subtotal = projectWorkforce.days * (projectWorkforce.daily_rate + bonusExtra);
  });

  ProjectWorkforce.beforeUpdate(async (projectWorkforce, options) => {
    const bonusExtra = parseFloat(projectWorkforce.bonus_extra || 0);
    projectWorkforce.subtotal = projectWorkforce.days * (projectWorkforce.daily_rate + bonusExtra);
  });

  ProjectWorkforce.associate = (models) => {
    ProjectWorkforce.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });
    ProjectWorkforce.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      as: 'employee',
    });
  };

  return ProjectWorkforce;
};
