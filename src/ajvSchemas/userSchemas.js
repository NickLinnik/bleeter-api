import ajv from './Ajv';

const baseSchema = {
  type: 'object',
  properties: {
    login: {type: 'string'},
    password: {type: 'string'},
    userName: {type: 'string'},
    gender: {enum: ['male', 'female', 'other']},
    createdAt: {type: 'object', format: 'date-time'},
    updatedAt: {type: 'object', format: 'date-time'},
  },
  additionalProperties: false
};
const createSchema = {...baseSchema, required: ['login', 'password']};

const adminSchema = {...baseSchema};
adminSchema.properties.admin = {type: 'boolean'};
const adminCreateSchema = {...createSchema};
adminCreateSchema.properties.admin = {type: 'boolean'};

const validateBase = ajv.compile(baseSchema);
const validateForCreate = ajv.compile(createSchema);
const adminValidate = ajv.compile(adminSchema);
const adminValidateForCreate = ajv.compile(adminCreateSchema);

export {validateBase, validateForCreate, adminValidate, adminValidateForCreate};