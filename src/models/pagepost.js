import sequelize from './_sequelize_connection';
import {Model, DataTypes} from 'sequelize';

class PagePost extends Model {
  static associate(models) {
    PagePost.belongsTo(models.Page);
    PagePost.belongsTo(models.Post);
  }
}

PagePost.init({
  pageId: DataTypes.INTEGER,
  postId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'PagePost',
  tableName: 'page_posts'
});

export {PagePost};

