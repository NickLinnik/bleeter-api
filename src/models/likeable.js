import sequelize from './_sequelize_connection';
import {DataTypes, Model} from 'sequelize';

class Likeable extends Model {
  static hooks = {
    async beforeCreate(entity, options) {
      const {transaction} = options;
      const likeable = await Likeable.create({}, {transaction});
      entity.likeableId = likeable.id;
    },
  
    async beforeBulkCreate(entity, options) {
      const {transaction} = options;
      for (const post of entity) {
        const {id} = await Likeable.create({}, {transaction});
        post.likeableId = id;
      }
    },
  
    async beforeDestroy(entity, options) {
      const {transaction} = options;
      await Likeable.destroy({where: {id: entity.likeableId}, transaction});
    },
  
    async beforeBulkDestroy (model, options) {
      const {transaction, where} = options;
      const entities = await model.findAll({where, transaction, attributes: ['likeableId']});
      const likeableIds = entities.map(entity => entity.likeableId);
      await Likeable.destroy({where: {id: likeableIds}});
    }
  }
  
  static associate(models) {
    Likeable.hasOne(models.Post, {foreignKey: 'likeableId'});
    Likeable.hasOne(models.Comment, {foreignKey: 'likeableId'});
    Likeable.hasMany(models.Like, {foreignKey: 'id'})
  }
}

Likeable.init({}, {
  sequelize,
  modelName: 'Likeable',
  tableName: 'likeables',
  timestamps: false
});

export {Likeable};
