import sequelize from './_sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import bcrypt from 'bcrypt';

import {Page, Likeable, Post, Comment, Like} from '.';

class User extends Model {
  static associate(models) {
    User.hasMany(models.Post, {foreignKey: 'userId'});
    User.hasMany(models.Like, {foreignKey: 'userId'});
    User.hasMany(models.Comment, {foreignKey: 'userId'});
    User.hasOne(models.Page, {foreignKey: 'userId'});
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
    return user.dataValues;
  }
  
  static async hashPassword(password) {
    return new Promise((resolve, reject) =>
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS),
        (err, hash) => {
          if (err) reject(err);
          else resolve(hash);
        }));
  }
  
  static async register(data) {
    data.password = await User.hashPassword(data.password);
    const user = await User.create(data);
    const {password, ...userSafe} = user.dataValues;
    return userSafe;
  }
  
  async updateFields(data) {
    // override userData with new values if their representing fields exist in query
    const userData = {...this, ...data};
    userData.password = data.password ?
      User.hashPassword(data.password) : userData.password;
    const user = await this.update(userData);
    const {password, ...userSafe} = user.dataValues;
    return userSafe;
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
  tableName: 'users',
  
  hooks: {
    async afterCreate(user, options) {
      await Page.create({userId: user.id})
    },
    
    async afterBulkCreate(users, options) {
      await Page.bulkCreate(users.map(users => ({userId: users.id})))
    }
  }
});

export {User};
