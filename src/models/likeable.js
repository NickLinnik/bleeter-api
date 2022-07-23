import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';

class Likeable extends Model {
  static associate(models) {
    Likeable.hasOne(models.Post, {foreignKey: 'likeableId'});
    Likeable.hasOne(models.Comment, {foreignKey: 'likeableId'});
  }
  
}

Likeable.init({}, {
  sequelize,
  modelName: 'Likeable',
  tableName: 'likeables',
  timestamps: false
});

export {Likeable};
