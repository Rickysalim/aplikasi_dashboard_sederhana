"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    static associate(model) {
      model.Transactions.belongsTo(model.Users, {
        foreignKey: "users_id",
        as: "Users",
      });
      model.Transactions.belongsTo(model.Clothes, {
        foreignKey: "clothes_id",
        as: "Clothes",
      });
    }

    static async findAllTransactionByStatus() {
      try {
        const result = await sequelize.query(
          `
          SELECT 
          COUNT(cancel_rate.total_cancel) as "canceled_rate", 
          COUNT(pending_rate.total_pending) as "pending_rate",
          COUNT(success_rate.total_success) as "success_rate"
          FROM 
          "Transactions" t 
          LEFT JOIN 
          (SELECT 
          t2.transactions_status as total_cancel, 
          t2.transactions_id 
          FROM "Transactions" 
          t2 
          WHERE transactions_status = 3) as cancel_rate on cancel_rate.transactions_id = t.transactions_id
          LEFT JOIN  
          (SELECT  
          t2.transactions_status as total_pending, 
          t2.transactions_id 
          FROM "Transactions" 
          t2 
          WHERE transactions_status = 1) as pending_rate on pending_rate.transactions_id = t.transactions_id
          LEFT JOIN 
          (SELECT 
          t2.transactions_status as total_success, 
          t2.transactions_id 
          FROM "Transactions" 
          t2 
          WHERE transactions_status = 2) as success_rate on success_rate.transactions_id = t.transactions_id;
          `,
          {
            model: sequelize.models.Transactions,
            mapToModel: true,
          }
        );
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    static async findAllTransactionSuccess() {
      try {
        const result = await this.findAll({
          attributes: ["clothes_total_price"],
          include: [
            {
              model: sequelize.models.Users,
              as: "Users",
              attributes: ["users_id", "users_fullname"],
            },
          ],
          where: {
            transactions_status: 2,
          },
          group: [
            sequelize.literal('"Users".users_fullname'),
            sequelize.literal('"Transactions".clothes_total_price'),
            sequelize.literal('"Users".users_id'),
            sequelize.literal('"Transactions"."createdAt"'),
          ],
        });
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    static async createTransactions({
      users_id,
      transactions_status,
      clothes_id,
      clothes_quantity,
    }) {
      const tn = await sequelize.transaction();
      try {
        const clothes = await sequelize.models.Clothes.findOne({
          where: {
            clothes_id: clothes_id,
          },
        });

        if(clothes_quantity > clothes.clothes_stock) {
           await tn.rollback();
           return Promise.reject("Clothes Stock Not Enough")
        }

        const currentStock = clothes.clothes_stock - clothes_quantity;
        const totalPrice = clothes.clothes_price * clothes_quantity;

        if (transactions_status === 1 || 3) {
          const result = this.create({
            users_id,
            transactions_status,
            clothes_id,
            clothes_quantity,
            clothes_total_price: totalPrice,
          });
          await tn.commit();
          return Promise.resolve(result);
        }

        await sequelize.models.Clothes.update({
          clothes_stock: currentStock
        },{
           where: {
              clothes_id: clothes_id
           }
        })
        
        const result = this.create({
          users_id,
          transactions_status,
          clothes_id,
          clothes_quantity,
          clothes_total_price: totalPrice,
        });
        await tn.commit();
        return Promise.resolve(result);
      } catch (error) {
        await tn.rollback();
        return Promise.reject(error);
      }
    }
  }
  Transactions.init(
    {
      transactions_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "users_id",
          onCascade: true,
          onUpdate: true,
        },
      },
      transactions_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clothes_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Clothes",
          key: "clothes_id",
          onCascade: true,
          onUpdate: true,
        },
      },
      clothes_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clothes_total_price: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
