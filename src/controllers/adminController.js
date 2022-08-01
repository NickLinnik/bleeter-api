import {User} from '../models';
import express from 'express';

import {adminValidate, adminValidateForCreate} from '../ajvSchemas/userSchemas';

class AdminController {
  constructor() {
    this.router = express.Router();
    this.router.post('/register', this.registerUser);
    this.router.post('/update/:id', this.updateUser);
    this.router.post('/delete/:id', this.deleteUser);
  }
  
  async registerUser(req, res) {
    if (!adminValidateForCreate(req.body.data)) {
      return res.status(422).send({message: adminValidateForCreate.errors});
    }
    const user = await User.register(req.body.data);
    return res.send({user});
  }
  
  async updateUser(req, res) {
    if (!adminValidate(req.body.data)) {
      return res.status(422).send({message: adminValidate.errors});
    }
    const oldUser = await User.findOne({where: {id: req.params.id}});
    const user = await oldUser.updateFields(req.body.data);
    return res.send({user});
  }
  
  async deleteUser(req, res) {
    const user = await User.findOne({where: {id: req.params.id}});
    await user.destroy();
    return res.send();
  }
}

export default AdminController;