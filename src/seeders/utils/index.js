import {User, Post, Comment, Likeable, Like} from '../../models';

async function findTestUsersData() {
  const include = [
    {model: Post, include: Likeable},
    {model: Comment, include: Likeable}
  ]
  return {
    Chokidar: await User.findOne({where: {login: 'Chokidar'}, include}),
    Albertu: await User.findOne({where: {login: 'Albertu'}, include}),
    Gertrude: await User.findOne({where: {login: 'Gertrude'}, include}),
    Poncha: await User.findOne({where: {login: 'Poncha'}, include})
  };
}

export default findTestUsersData
