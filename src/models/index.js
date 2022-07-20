import * as models from './models'

for (const Model of Object.values(models)) {
    Model.associate(models)
}
export * from './models'