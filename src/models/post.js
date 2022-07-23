import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import {Likeable} from './models';

class Post extends Model {
  static associate(models) {
    Post.belongsTo(models.User, {foreignKey: 'userId'});
    Post.belongsTo(models.Likeable, {foreignKey: 'likeableId'});
    Post.hasMany(models.Comment, {foreignKey: 'postId'});
  }
}

Post.init({
  text: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  likeableId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'posts',
  
  hooks: {
    async beforeCreate(post, options) {
      await Likeable.hooks.beforeCreate(post, options);
    },
    async beforeBulkCreate(posts, options) {
      await Likeable.hooks.beforeBulkCreate(posts, options);
    },
    async beforeDestroy(post, options) {
      await Likeable.hooks.beforeDestroy(post, options);
    },
    async beforeBulkDestroy(options) {
      await Likeable.hooks.beforeBulkDestroy(Post, options);
    }
  }
});

export {Post};
