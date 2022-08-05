import sequelize from './_sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import {Likeable} from './_models';

class Comment extends Model {
  static associate(models) {
    Comment.hasMany(models.Comment, {foreignKey: 'id'});
    Comment.belongsTo(models.Comment, {foreignKey: 'replyToId'})
    Comment.belongsTo(models.User, {foreignKey: 'userId'});
    Comment.belongsTo(models.Likeable, {foreignKey: 'likeableId'});
  }
}

Comment.init({
  text: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  likeableId: DataTypes.INTEGER,
  postId: DataTypes.INTEGER,
  replyToId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  
  hooks: {
    async beforeCreate(comment, options) {
      await Likeable.hooks.beforeCreate(comment, options);
    },
    async beforeBulkCreate(comments, options) {
      await Likeable.hooks.beforeBulkCreate(comments, options);
    },
    async beforeDestroy(comment, options) {
      await Likeable.hooks.beforeDestroy(comment, options);
    },
    async beforeBulkDestroy(options) {
      await Likeable.hooks.beforeBulkDestroy(Comment, options);
    }
  }
})
;

export {Comment};
