"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Types extends Model {
    static associate(model) {}
  }
  Types.init(
    {
      types_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      types_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Types",
    }
  );
  return Types;
};
