import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';

class Like extends Model {
  static associate(models) {
    Like.belongsTo(models.User, {foreignKey: 'userId'});
    Like.belongsTo(models.Likeable, {foreignKey: 'likeableId'});
  }
}

Like.init({
  userId: DataTypes.INTEGER,
  likeableId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Like',
  tableName: 'likes'
});

export {Like};
