import * as models from './_models';

for (const Model of Object.values(models)) {
  Model.associate(models);
}

export * from './_models';
export {default as sequelize} from './_sequelize_connection';