import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';
import {Likeable} from './models';

class Comment extends Model {
  static associate(models) {
    Comment.belongsTo(models.User, {foreignKey: 'userId'});
    Comment.belongsTo(models.Likeable, {foreignKey: 'likeableId'});
  }
}

Comment.init({
  text: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  likeableId: DataTypes.INTEGER,
  postId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  
  hooks: {
    async beforeCreate(comment, options) {
      const {transaction} = options;
      const likeable = await Likeable.create({}, {transaction});
      comment.likeableId = likeable.id;
    },
    async beforeBulkCreate(comments, options) {
      const {transaction} = options;
      for (const comment of comments) {
        const {id} = await Likeable.create({}, {transaction});
        comment.likeableId = id;
      }
    },
    async beforeDestroy(comment, options) {
      const {transaction} = options;
      await Likeable.destroy({where: {id: comment.likeableId}, transaction});
    },
    async beforeBulkDestroy(options) {
      const {transaction, where} = options;
      const comments = await Comment.findAll({where, transaction, attributes: ['likeableId']});
      const likeableIds = comments.map(comment => comment.likeableId);
      await Likeable.destroy({where: {id: likeableIds}});
    }
  }
});

export {Comment};
