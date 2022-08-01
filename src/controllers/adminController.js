import express from 'express';

import {adminValidate, adminValidateForCreate} from '../ajvSchemas/userSchemas';

class AdminController {
  constructor({User}) {
    this.User = User;
    this.router = express.Router();
    this.router.post('/register', this.registerUser);
    this.router.post('/update/:id', this.updateUser);
    this.router.post('/delete/:id', this.deleteUser);
  }
  
  registerUser = async (req, res) => {
    if (!adminValidateForCreate(req.body.data)) {
      return res.status(422).send({message: adminValidateForCreate.errors});
    }
    const user = await this.User.register(req.body.data);
    return res.send({user});
  };
  
  updateUser = async (req, res) => {
    if (!adminValidate(req.body.data)) {
      return res.status(422).send({message: adminValidate.errors});
    }
    const oldUser = await this.User.findOne({where: {id: req.params.id}});
    const user = await oldUser.updateFields(req.body.data);
    return res.send({user});
  };
  
  deleteUser = async (req, res) => {
    const user = await this.User.findOne({where: {id: req.params.id}});
    await user.destroy();
    return res.send();
  };
}

export default AdminController;