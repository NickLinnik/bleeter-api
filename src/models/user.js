import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
    static associate(models) {
        User.hasMany(models.Post, {foreignKey: 'userId'});
    }

    static async getPasswordHash(password) {
        return new Promise((resolve, reject) =>
            bcrypt.hash(password, Number(process.env.SALT_ROUNDS),
                (err, hash) => {
                    if (err) reject(err);
                    else resolve(hash);
                }));
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

export {User};