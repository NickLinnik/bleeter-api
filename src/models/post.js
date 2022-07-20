import sequelize from './sequelize_connection';
import {DataTypes, Model} from 'sequelize';

class Post extends Model {
    static associate(models) {
        Post.belongsTo(models.User, {foreignKey: 'userId'})
    }
}

Post.init({
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
});

export {Post};