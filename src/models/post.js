import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import {Likeable} from './models';

class Post extends Model {
  static associate(models) {
    Post.belongsTo(models.User, {foreignKey: 'userId'});
    Post.belongsTo(models.Likeable, {foreignKey: 'likeableId'});
    // Post.hasMany(models.Comment, {foreignKey: 'postId'});
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
      const {transaction} = options;
      const likeable = await Likeable.create({}, {transaction});
      post.likeableId = likeable.id;
    },
    async beforeBulkCreate(posts, options) {
      const {transaction} = options;
      for (const post of posts) {
        const {id} = await Likeable.create({}, {transaction});
        post.likeableId = id;
      }
    },
    async beforeDestroy(post, options) {
      const {transaction} = options;
      await Likeable.destroy({where: {id: post.likeableId}, transaction});
    },
    async beforeBulkDestroy(options) {
      const {transaction, where} = options;
      const posts = await Post.findAll({where, transaction, attributes: ['likeableId']});
      const likeableIds = posts.map(post => post.likeableId);
      await Likeable.destroy({where: {id: likeableIds}});
    }
  }
});

export {Post};
