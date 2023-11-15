'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Variants extends Model {
        static associate(model) {

        }
    }
    Variants.init({
        variants_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        variants_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        sequelize,
        modelName: 'Variants'
    })
    return Variants
}