"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require('jwt-decode')
const cloudinary = require('../utils/cloudinary')
require("dotenv").config();

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(model) {}

    static #isValidToken = (token) => {
      if (!token) {
        return false;
      }
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded?.exp > currentTime;
    };

    static findUserByToken = async (token) => {
      try {
        let isValidToken = this.#isValidToken(token);
        if (isValidToken) {
          const { users_id } = jwt.verify(token, process.env.SECRET_KEY);
          const user = await this.findOne({
            attributes: ['users_fullname', 'users_picture', 'users_role'],
            where: { users_id },
          })
          return Promise.resolve(user)
        }
      } catch (error) {
        return Promise.reject(error);
      }
    };

    generateToken = () => {
      const payload = {
        users_id: this.users_id,
        users_fullname: this.users_fullname,
        users_email: this.users_email,
      };
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
    };

    checkPassword = (password) =>
      bcrypt.compareSync(password, this.users_password);

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static async registerUser({
      users_picture,
      users_fullname,
      users_email,
      users_password,
      users_role,
    }) {
      try {
        let image = users_picture?.path ? await cloudinary.v2.uploader.upload(users_picture?.path, {upload_preset: 'dev'}) : null
        const encryptedPassword = this.#encrypt(users_password);
        return this.create({
          users_picture: image?.url,
          users_fullname,
          users_email,
          users_password: encryptedPassword,
          users_role,
        });
      } catch (error) {
        console.info(error)
        return error;
      }
    }

    static async authenticate({ users_email, users_password }) {
      try {
        const user = await this.findOne({
          where: {
             users_email: users_email 
          },
        });
        if (!user || !user.checkPassword(users_password)) {
          return Promise.reject("Invalid Email & Password");
        }
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  Users.init(
    {
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      users_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      users_fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      users_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      users_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      users_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
