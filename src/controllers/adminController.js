import {User} from '../models';
import express from 'express';

class AdminController {
  constructor() {
    this.router = express.Router();
    this.router.post('/register', this.registerUser);
    this.router.post('/update/:id', this.updateUser);
    this.router.post('/delete/:id', this.deleteUser);
  }
  
  async registerUser(req, res) {
    const allowedFields = ['login', 'password', 'userName', 'gender', 'admin'];
    return await User.register(req.body.data, allowedFields).then(
      (user) => res.send({user}),
      (reason) => res.status(422).send({message: reason}));
  }
  
  async updateUser(req, res) {
    const user = await User.findOne({where: {id: req.params.id}});
    const allowedFields = ['login', 'password', 'userName', 'gender', 'admin'];
    return await user.updateFields(req.body.data, allowedFields)
      .then(() => res.send({user}),
        (reason) => res.status(422).send({message: reason}));
  }
  
  async deleteUser(req, res) {
    const user = await User.findOne({where: {id: req.params.id}});
    await user.destroy();
    return res.send();
  }
}

export default AdminController;