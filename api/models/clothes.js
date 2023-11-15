'use strict';

const { Model } = require('sequelize');
const  cloudinary  = require('../utils/cloudinary')

module.exports = (sequelize, DataTypes) => {
    class Clothes extends Model {
        static associate(model) {
            model.Clothes.belongsTo(model.Types, {
                foreignKey: 'types_id',
                as: 'Types'
            })
            model.Clothes.belongsTo(model.Variants, {
                foreignKey: 'variants_id',
                as: 'Variants'
            })
        }

        static async createClothes({clothes_picture, clothes_name, clothes_price, clothes_stock, variants_id, types_id, clothes_description}) {
            try {
                let image = clothes_picture?.path ? await cloudinary.v2.uploader.upload(clothes_picture?.path, {upload_preset: 'dev'}) : null
                return this.create({ 
                     clothes_picture: image?.url,
                     clothes_name,
                     clothes_price,
                     clothes_stock,
                     variants_id,
                     types_id,
                     clothes_description
                })
            } catch (error) {
                console.info(error)
                return error
            }
            
        }
    }
    Clothes.init({
        clothes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        clothes_picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clothes_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        types_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Types',
                key: 'types_id',
                onCascade: true,
                onUpdate: true
            }
        },
        variants_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Variants',
                key: 'variants_id',
                onCascade: true,
                onUpdate: true
            }
        },
        clothes_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clothes_price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        clothes_stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Clothes'
    })
    return Clothes
}