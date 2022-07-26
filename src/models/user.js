import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import bcrypt from 'bcrypt';
import {getInvalidFields} from '../controllers/utils';
import {Post} from './post';
import {Likeable} from './likeable';
import {Like} from './like';
import {Comment} from './comment';

class User extends Model {
  static associate(models) {
    User.hasMany(models.Post, {foreignKey: 'userId'});
    User.hasMany(models.Like, {foreignKey: 'userId'});
    User.hasMany(models.Comment, {foreignKey: 'userId'});
  }
  
  static async findUserFullInfo(id) {
    const user = await User.findOne({
      where: {id},
      attributes: {
        exclude: ['password']
      },
      include: [
        {
          model: Post, include: {
            model: Likeable, include: Like
          }
        },
        {
          model: Comment, include: {
            model: Likeable, include: Like
          }
        }
      ]
    });
    return user.dataValues
  }
  
  static async hashPassword(password) {
    return new Promise((resolve, reject) =>
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS),
        (err, hash) => {
          if (err) reject(err);
          else resolve(hash);
        }));
  }
  
  static async register(data, allowedFields) {
    const invalidFields = getInvalidFields(data, allowedFields);
    if (invalidFields.length) {
      throw new Error(`[${invalidFields}] fields are not allowed for user registration.
        Allowed fields are: [${allowedFields}]`);
    }
    data.password = await User.hashPassword(data.password);
    const user = await User.create(data)
    const {password, ...userSafe} = user.dataValues;
    return userSafe;
  }
  
  async updateFields(data, allowedFields) {
    const invalidFields = getInvalidFields(data, allowedFields);
    if (invalidFields.length) {
      throw new Error(`[${invalidFields}] fields are not allowed for user update.
        Allowed fields are: [${allowedFields}]`);
    }
    // override userData with new values if their representing fields exist in query
    const userData = {...this, ...data};
    userData.password = data.password ? User.hashPassword(data.password) : userData.password;
    return await this.update(userData);
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
