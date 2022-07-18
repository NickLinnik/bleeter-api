'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        userName: DataTypes.STRING,
        gender: DataTypes.ENUM('male', 'female', 'other'),
        lastVisited: DataTypes.DATE,
        isSuperUser: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    });
    return User;
};