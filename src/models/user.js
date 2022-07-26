import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import bcrypt from 'bcrypt';
import {getInvalidFields} from '../controllers/utils';

class User extends Model {
  static associate(models) {
    User.hasMany(models.Post, {foreignKey: 'userId'});
    User.hasMany(models.Like, {foreignKey: 'userId'});
    User.hasMany(models.Comment, {foreignKey: 'userId'});
  }
  
  static async hashPassword(password) {
    return new Promise((resolve, reject) =>
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS),
        (err, hash) => {
          if (err) reject(err);
          else resolve(hash);
        }));
  }
  
  async updateFields(data, allowedFields) {
    return new Promise(async (resolve, reject) => {
      const invalidFields = getInvalidFields(data, allowedFields);
      console.log(invalidFields);
      if (invalidFields.length) {
        reject(`[${invalidFields}] fields are not allowed for user update.
        Allowed fields are: [${allowedFields}]`);
      }
      
      const userData = {...this, ...data};  // override userData with new values if their representing fields exist in query
      userData.password = data.password ? User.hashPassword(data.password) : userData.password;
      
      resolve(await this.update(userData));
    });
  }
}

User.init({
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  userName: DataTypes.STRING,
  gender: DataTypes.ENUM('male', 'female', 'other'),
  admin: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

export {User};
