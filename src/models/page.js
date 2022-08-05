import sequelize from './_sequelize_connection';
import {Model, DataTypes} from 'sequelize';

class Page extends Model {
  static associate(models) {
    Page.belongsTo(models.User, {foreignKey: 'userId'});
    Page.hasMany(models.PagePost, {foreignKey: 'pageId'});
  }
}

Page.init({
  userId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Page',
  tableName: 'pages'
});

export {Page};