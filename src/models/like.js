import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';

class Like extends Model {
  static associate(models) {
    Like.belongsTo(models.User);
    Like.belongsTo(models.Likeable);
  }
}

Like.init({
  userId: DataTypes.INTEGER,
  likeableId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Like',
  tableName: 'likes'//,
  // indexes: {
  //   unique: true,
  //   fields: ['userId', 'likeableId']
  // }
});

export {Like};
