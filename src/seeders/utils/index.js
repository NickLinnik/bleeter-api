import {User, Post, Likeable, Like} from '../../models';

async function findUsersPostsLikeables() {
  return {
    Chokidar: await User.findOne({where: {login: 'Chokidar'}, include: {model: Post, include: Likeable}}),
    Albertu: await User.findOne({where: {login: 'Albertu'}, include: {model: Post, include: Likeable}}),
    Gertrude: await User.findOne({where: {login: 'Gertrude'}, include: {model: Post, include: Likeable}}),
    Poncha: await User.findOne({where: {login: 'Poncha'}, include: {model: Post, include: Likeable}})
  };
}

export default findUsersPostsLikeables
